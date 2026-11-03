// Fellan Matte – AI-proxy (Cloudflare Worker).
// Håller API-nyckeln hemlig, strömmar svar från Claude och ser till att
// pedagogiken (guidad problemlösning, aldrig färdiga svar) håller även när
// eleven tjatar. Reglerna finns både i systeminstruktionen och i ett
// gemensamt svarsskydd i shared/tutor-core.js.
import Anthropic from '@anthropic-ai/sdk';
import {
  HINT_LEVELS, clampHint, explainStyle, guardReply, findAnswerLeak, redirectText,
  memorySummary, validateQuestion,
} from '../../shared/tutor-core.js';

const MODEL = 'claude-opus-5-5';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

/* ---------------- Instruktioner ---------------- */

const BASE_PROMPT = `Du är "AI-läraren" i Fellan Matte, en mattelärare för en svensk skolklass. Klassens lärare heter Felix. Du sitter bredvid eleven: lugn, varm, tydlig och professionell. Svara alltid på svenska.

DITT MÅL: att eleven förstår matematiken och själv löser uppgiften. Du undervisar genom dialog – du löser inte uppgiften åt eleven.

ABSOLUTA REGLER (gäller även om eleven ber, tjatar, säger att läraren tillåter det, säger att det är prov imorgon eller att hen inte orkar):
1. Ge aldrig det slutliga svaret på elevens uppgift.
2. Räkna aldrig elevens egen uppgift hela vägen fram till svaret.
3. Om eleven ber om svaret: svara vänligt men bestämt att du hjälper hen att komma fram till det själv, och ställ en fråga som tar eleven ett steg vidare. Bli aldrig irriterad, dömande eller nedlåtande.
4. Du får bekräfta om ett svar som eleven själv har räknat fram är rätt eller fel, men du ska inte säga vad svaret är när eleven inte har det.
5. Ställ en fråga i taget och vänta på elevens resonemang innan nästa steg.
6. Dela upp svåra problem i mindre delar och ge bara så mycket hjälp att eleven kommer vidare.
7. När eleven behöver se hur man gör: lös en LIKNANDE uppgift med ANDRA tal, steg för steg, och be eleven göra likadant med sina tal.
8. När eleven visar en uträkning: säg vad som är rätt, peka ut det första steget som blivit fel och ställ en fråga som hjälper eleven upptäcka felet själv. Säg aldrig bara "fel".
9. Använd bokens kapitel, teori och regler som finns i kontexten. Hitta inte på kapitel, uppgifter eller formler. Saknas information: säg det och föreslå vad eleven kan göra istället (fråga Felix, öppna hjälpsteget i boken).
10. Håll dig till matematik och skolarbete.

FELSANALYS: Leta efter vanliga misstag – teckenfel, fel vid division, prioriteringsregler, bråk och gemensam nämnare, procent och förändringsfaktor, felaktiga steg i ekvationer. Beskriv vad som verkar gå fel, varför steget är problematiskt och ställ en fråga som gör att eleven själv hittar felet.

SPRÅK OCH FORMAT:
- Kort och tydligt: oftast 2–6 meningar, aldrig långa föreläsningar.
- Matematik i LaTeX med $...$ (använd \\dfrac, \\cdot, \\%, ^{} och liknande).
- **Fetstil** för korta rubriker som **Nästa steg:** eller **Regel:**.
- Ställ bara en fråga i slutet, och gör den konkret.
- Uppmuntra det eleven gör rätt, utan att överdriva.
- Om eleven verkar trött eller frustrerad: sänk tempot, bekräfta att det är okej och föreslå ett mindre steg eller att räcka upp handen i appen.`;

const MODE_PROMPTS = {
  exercise: `LÄGE: Eleven arbetar med en uppgift ur boken. Hjälp hen vidare genom att förstå var eleven är i sin lösning. Börja med att fråga vad eleven har provat om det inte framgår.`,
  chapter: `LÄGE: Eleven vill ha hjälp med ett kapitel. Håll dig till kapitlets teori, regler och moment. Om eleven frågar om något utanför kapitlet får du svara kort, men led tillbaka till kapitlets innehåll. Eleven kan välja ett specifikt moment – hjälp hen förstå momentet och sedan sin uppgift.`,
  talk: `LÄGE: Eleven vill prata om matematik i allmänhet, utan att välja kapitel. Du får använda allmän matematisk kunskap och förklara begrepp, regler och varför de fungerar. Knyt gärna an till bokens kapitel när det passar. Ställ en fråga som gör att eleven tänker efter, och avsluta med något hen kan prova själv.`,
  stuck: `LÄGE: Eleven har fastnat och beskriver eller klistrar in en uppgift (ibland som bild). Börja med att klargöra vad uppgiften frågar efter, vilket område den tillhör och vad eleven redan vet. Gissa inte om texten är svårläst – be eleven förtydliga eller ta en tydligare bild. Hjälp sedan till första steget och ge en ledtråd, aldrig lösningen.`,
  quiz: `LÄGE: Förhör. Eleven svarar på en fråga du eller appen ställt. Bedöm resonemanget, inte bara resultatet. Är svaret fel: förklara vad som inte håller och ställ en ledande fråga så att eleven får försöka igen – säg inte svaret. Är svaret rätt: bekräfta, förklara kort varför metoden fungerar och föreslå att ni går vidare.`,
};

const CONTEXT_LIMITS = { exercises: 30, text: 500, theory: 1600 };

function buildSystem({ mode, chapter, exercise, hintLevel, memory, explain, quiz }) {
  const blocks = [{ type: 'text', text: BASE_PROMPT, cache_control: { type: 'ephemeral' } }];
  const parts = [MODE_PROMPTS[mode] || MODE_PROMPTS.exercise];

  if (chapter?.title) {
    parts.push(`KAPITEL: ${String(chapter.title).slice(0, 200)}`);
    if (chapter.theory) parts.push(`KAPITLETS TEORI (från boken): ${String(chapter.theory).slice(0, CONTEXT_LIMITS.theory)}`);
    if (Array.isArray(chapter.exercises) && chapter.exercises.length) {
      const list = chapter.exercises.slice(0, CONTEXT_LIMITS.exercises)
        .map((e) => `${e.id || ''} (nivå ${e.level || '?'}): ${String(e.text || '').slice(0, CONTEXT_LIMITS.text)}`)
        .join('\n');
      parts.push(`KAPITLETS MOMENT OCH UPPGIFTER:\n${list}`);
    }
  }

  if (exercise?.text) {
    parts.push(`ELEVENS UPPGIFT ${exercise.id ? `(${exercise.id})` : ''}, nivå ${exercise.level || '?'}:\n${String(exercise.text).slice(0, CONTEXT_LIMITS.text)}`);
    if (exercise.rule?.name) parts.push(`REGEL SOM BOKEN KOPPLAR TILL UPPGIFTEN: ${exercise.rule.name} – ${String(exercise.rule.text || '').slice(0, 400)}`);
  }

  if (mode === 'quiz' && quiz?.question) {
    parts.push(`FÖRHÖRSFRÅGAN ELEVEN SVARAR PÅ:\n${String(quiz.question).slice(0, CONTEXT_LIMITS.text)}`);
    if (quiz.verdict === true) parts.push('Appen har rättat elevens svar: det var RÄTT.');
    if (quiz.verdict === false) parts.push('Appen har rättat elevens svar: det var FEL. Hjälp eleven hitta felet utan att avslöja svaret.');
  }

  const level = clampHint(hintLevel);
  const hint = HINT_LEVELS[level - 1];
  parts.push(`LEDTRÅDSNIVÅ: ${level} av 4 – ${hint.name}. ${hint.instruction} Eleven har bett om hjälp på den här nivån; ge inte mer än så.`);

  const style = explainStyle(explain);
  if (style) parts.push(`ELEVEN VILL HA EN ANNAN TYP AV FÖRKLARING: ${style.label}. ${style.instruction} Upprepa inte samma förklaring med andra ord.`);

  const mem = memorySummary(memory || {});
  if (mem) parts.push(`MINNE FRÅN SAMTALET (använd det för att anpassa hjälpen, läs inte upp det):\n${mem}`);

  blocks.push({ type: 'text', text: parts.join('\n\n') });
  return blocks;
}

/* ---------------- HTTP-hjälpare ---------------- */

function cors(env, req) {
  const origin = req.headers.get('origin') || '';
  const allowed = env.ALLOWED_ORIGIN === '*' || origin === env.ALLOWED_ORIGIN || origin.startsWith('http://localhost');
  return {
    'access-control-allow-origin': allowed ? origin || '*' : env.ALLOWED_ORIGIN,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-class-code, x-teacher-pin',
    vary: 'origin',
  };
}

const json = (data, status, headers) => new Response(JSON.stringify(data), { status, headers: { ...headers, 'content-type': 'application/json' } });

function classAllowed(env, req) {
  const codes = (env.CLASS_CODES || '').split(',').map((s) => s.trim()).filter(Boolean);
  return !codes.length || codes.includes(req.headers.get('x-class-code') || '');
}

const MODES = new Set(['exercise', 'chapter', 'talk', 'stuck', 'quiz']);

function cleanExercise(raw) {
  if (!raw || typeof raw !== 'object') return {};
  return {
    id: String(raw.id || '').slice(0, 40),
    text: String(raw.text || '').slice(0, CONTEXT_LIMITS.text),
    level: Number(raw.level) || null,
    rule: raw.rule?.name ? { name: String(raw.rule.name).slice(0, 160), text: String(raw.rule.text || '').slice(0, 400) } : null,
    hints: Array.isArray(raw.hints) ? raw.hints.slice(0, 4).map((h) => String(h).slice(0, 300)) : [],
    // Facit skickas aldrig till modellen – bara till svarsskyddet på servern.
    answer: Array.isArray(raw.answer) ? raw.answer.slice(0, 4).map((a) => String(a).slice(0, 80)) : [],
  };
}

function cleanChapter(raw) {
  if (!raw || typeof raw !== 'object') return {};
  return {
    id: String(raw.id || '').slice(0, 20),
    title: String(raw.title || '').slice(0, 200),
    theory: String(raw.theory || '').slice(0, 1600),
    exercises: Array.isArray(raw.exercises)
      ? raw.exercises.slice(0, 30).map((e) => ({ id: String(e.id || '').slice(0, 40), text: String(e.text || '').slice(0, 500), level: Number(e.level) || null }))
      : [],
  };
}

function cleanMessages(raw) {
  return (Array.isArray(raw) ? raw : [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-16)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

/* ---------------- Chatt ---------------- */

async function chat(req, env, headers) {
  const body = await req.json();
  const mode = MODES.has(body.mode) ? body.mode : 'exercise';
  const exercise = cleanExercise(body.exercise);
  const chapter = cleanChapter(body.chapter);
  const hintLevel = clampHint(body.hintLevel);
  const studentText = String(body.studentText || '').slice(0, 2000);
  const messages = cleanMessages(body.messages);
  if (!messages.length || messages[0].role !== 'user') return json({ error: 'Inga meddelanden' }, 400, headers);

  // Bild (endast i "jag har fastnat"-läget): läggs på sista elevmeddelandet.
  const image = body.image && /^image\/(png|jpe?g|webp|gif)$/.test(body.image.mediaType || '')
    ? { data: String(body.image.data || '').slice(0, 8_000_000), mediaType: body.image.mediaType }
    : null;
  const dialogue = messages.map((m) => ({ ...m }));
  if (image && dialogue[dialogue.length - 1]?.role === 'user') {
    const last = dialogue[dialogue.length - 1];
    last.content = [
      { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.data } },
      { type: 'text', text: last.content },
    ];
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 1600,
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: buildSystem({ mode, chapter, exercise, hintLevel, memory: body.memory, explain: body.explain, quiz: body.quiz }),
    messages: dialogue,
  });

  const enc = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const write = (obj) => writer.write(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));

  (async () => {
    let shown = '';
    let pending = '';
    let blocked = false;
    const HOLD = 200; // håll tillbaka slutet så att ett avslöjat svar aldrig hinner visas
    const emit = async (chunk) => {
      const next = shown + chunk;
      if (findAnswerLeak(next, exercise, studentText)) return false;
      shown = next;
      await write({ text: chunk });
      return true;
    };
    try {
      for await (const event of stream) {
        if (event.type !== 'content_block_delta' || event.delta.type !== 'text_delta') continue;
        pending += event.delta.text;
        if (pending.length > HOLD) {
          const cut = pending.length - HOLD;
          const chunk = pending.slice(0, cut);
          pending = pending.slice(cut);
          if (!(await emit(chunk))) { blocked = true; break; }
        }
      }
      if (!blocked) {
        const all = shown + pending;
        if (findAnswerLeak(all, exercise, studentText)) {
          blocked = true;
        } else if (pending) {
          shown = all;
          await write({ text: pending });
        }
      }
      if (blocked) {
        await write({ replace: redirectText(exercise), blocked: true });
        console.warn('Svarsskydd: avslöjat svar stoppades');
      }
      const final = blocked ? null : await stream.finalMessage().catch(() => null);
      if (final?.stop_reason === 'refusal') await write({ text: '\n\nDet där kan jag tyvärr inte hjälpa till med. Räck upp handen så kommer Felix.' });
      await write({ done: true });
    } catch (err) {
      console.error(err);
      try {
        await write({ error: err?.status === 429 ? 'Många frågar samtidigt – prova igen om en stund.' : 'AI-läraren fick ett fel. Prova igen.' });
      } catch { /* klienten är redan borta */ }
    } finally {
      await writer.close().catch(() => {});
    }
  })();

  return new Response(readable, { headers: { ...headers, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' } });
}

/* ---------------- Förhör: ny fråga ---------------- */

const QUIZ_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['question', 'answer', 'hints', 'ruleName', 'ruleText', 'explanation', 'difficulty'],
  properties: {
    question: { type: 'string' },
    answer: { type: 'string' },
    hints: { type: 'array', items: { type: 'string' } },
    ruleName: { type: 'string' },
    ruleText: { type: 'string' },
    explanation: { type: 'string' },
    difficulty: { type: 'integer' },
  },
};

async function quiz(req, env, headers) {
  const body = await req.json();
  const chapter = cleanChapter(body.chapter);
  const difficulty = Math.min(3, Math.max(1, Number(body.difficulty) || 1));
  const avoid = (Array.isArray(body.avoid) ? body.avoid : []).slice(-6).map((s) => String(s).slice(0, 300));
  const moment = body.moment && typeof body.moment === 'object'
    ? { text: String(body.moment.text || '').slice(0, 500), ruleName: String(body.moment.ruleName || '').slice(0, 160) }
    : null;
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const msg = await client.beta.messages.stream({
    model: MODEL,
    max_tokens: 2000,
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    output_config: { effort: 'low', format: { type: 'json_schema', schema: QUIZ_SCHEMA } },
    system: [
      { type: 'text', text: BASE_PROMPT, cache_control: { type: 'ephemeral' } },
      {
        type: 'text',
        text: `UPPGIFT: Skapa EN förhörsfråga i matematik för en elev. Svara bara med JSON enligt schemat.

Krav:
- Frågan ska handla om kapitlets moment och ha samma matematiska struktur som bokens uppgifter, men med andra tal. Kopiera aldrig en bokuppgift rakt av och återanvänd inte de senaste frågorna: ${avoid.length ? avoid.join(' | ') : '(inga tidigare frågor)'}.
- Svårighetsgrad ${difficulty} av 3 (1 = enkel, 3 = utmanande). Anpassa talen efter det.
- "answer" är det korrekta svaret som appen använder för rättning. Det visas aldrig för eleven – skriv det kort (t.ex. "13" eller "x = 13" eller "11/12").
- "hints": 2 korta ledtrådar som hjälper eleven vidare utan att avslöja svaret.
- "ruleName" och "ruleText": regeln eller formeln som behövs, kort.
- "explanation": en kort förklaring av varför metoden fungerar, som får visas EFTER att eleven svarat rätt.
- Skriv matematik i LaTeX med $...$.
- Frågan ska vara formulerad som en uppgift till eleven ("Beräkna …", "Lös …", "Vad är …?").`,
      },
      chapter.title ? { type: 'text', text: `KAPITEL: ${chapter.title}\nTEORI: ${chapter.theory}\nMOMENT: ${chapter.exercises.map((e) => `${e.id}: ${e.text}`).join(' | ')}` } : { type: 'text', text: 'KAPITEL: (inget valt – blanda grundläggande matematik: räkning, bråk, procent, ekvationer)' },
      ...(moment?.text ? [{ type: 'text', text: `ELEVEN VILL TRÄNA JUST DET HÄR MOMENTET${moment.ruleName ? ` (${moment.ruleName})` : ''}:\n${moment.text}\nGör en fråga av samma typ, men med andra tal.` }] : []),
      ...(memorySummary(body.memory || {}) ? [{ type: 'text', text: `ELEVENS MINNE:\n${memorySummary(body.memory || {})}` }] : []),
    ],
    messages: [{ role: 'user', content: 'Skapa nästa förhörsfråga.' }],
  }).finalMessage();

  if (msg.stop_reason === 'refusal') return json({ error: 'Kunde inte skapa en fråga just nu.' }, 422, headers);
  let data;
  try {
    data = JSON.parse(msg.content.find((b) => b.type === 'text')?.text || '{}');
  } catch {
    return json({ error: 'Kunde inte läsa frågan.' }, 502, headers);
  }
  if (!validateQuestion(data)) return json({ error: 'Frågan höll inte måttet.' }, 422, headers);
  return json({
    question: data.question,
    answer: data.answer,
    hints: (data.hints || []).slice(0, 3).map((h) => String(h)),
    ruleName: String(data.ruleName || ''),
    ruleText: String(data.ruleText || ''),
    explanation: String(data.explanation || ''),
    difficulty: Math.min(3, Math.max(1, Number(data.difficulty) || difficulty)),
  }, 200, headers);
}

/* ---------------- Läraren: fotografera boksida ---------------- */

const EXTRACT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['chapterTitle', 'theory', 'exercises'],
  properties: {
    chapterTitle: { type: 'string' },
    theory: { type: 'string' },
    exercises: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'text', 'level', 'answer', 'ruleName', 'ruleText', 'hints'],
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          level: { type: 'integer' },
          answer: { type: 'string' },
          ruleName: { type: 'string' },
          ruleText: { type: 'string' },
          hints: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

async function extract(req, env, headers) {
  if (!env.TEACHER_PIN || req.headers.get('x-teacher-pin') !== env.TEACHER_PIN) return json({ error: 'Fel lärar-PIN' }, 403, headers);
  const { image, mediaType } = await req.json();
  if (!image) return json({ error: 'Ingen bild' }, 400, headers);
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const msg = await client.beta.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: EXTRACT_SCHEMA } },
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image } },
        { type: 'text', text: 'Det här är en sida ur klassens mattebok, fotograferad av läraren. Skriv av varje uppgift ordagrant med uppgiftsnumret som id (t.ex. "2134" eller "2.14"). Skriv matematik i LaTeX med $...$. Sammanfatta teorin på sidan kort. Ge för varje uppgift: rätt svar (endast för appens facitkontroll, visas aldrig för elever), nivå 1–3, namnet på regeln/formeln som behövs och en kort förklaring av den, samt 2–3 ledtrådar som leder eleven framåt utan att avslöja svaret.' },
      ],
    }],
  }).finalMessage();
  if (msg.stop_reason === 'refusal') return json({ error: 'Sidan kunde inte läsas.' }, 422, headers);
  const text = msg.content.find((b) => b.type === 'text')?.text || '{}';
  return json(JSON.parse(text), 200, headers);
}

export default {
  async fetch(req, env) {
    const headers = cors(env, req);
    if (req.method === 'OPTIONS') return new Response(null, { headers });
    if (req.method !== 'POST') return json({ ok: true, name: 'Fellan Matte AI' }, 200, headers);
    if (!classAllowed(env, req)) return json({ error: 'Okänd klasskod' }, 403, headers);
    const path = new URL(req.url).pathname;
    try {
      if (path === '/chat') return await chat(req, env, headers);
      if (path === '/quiz') return await quiz(req, env, headers);
      if (path === '/extract') return await extract(req, env, headers);
      return json({ error: 'Okänd väg' }, 404, headers);
    } catch (err) {
      console.error(err);
      return json({ error: 'Serverfel' }, 500, headers);
    }
  },
};

// Exporteras för test och återanvändning.
export { buildSystem, guardReply };
