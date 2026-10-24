// Fellan Matte – AI-proxy (Cloudflare Worker).
// Håller API-nyckeln hemlig och strömmar svar från Claude till appen.
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5-5';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

const TUTOR_PROMPT = `Du är "AI-läraren" i Fellan Matte, en hjälplärare i matematik för en svensk skolklass. Klassens lärare heter Felix. Svara alltid på svenska, kort och vänligt, som en tålmodig lärare som sitter bredvid eleven.

Ditt uppdrag är att eleven ska förstå och lösa uppgiften själv. Därför gäller detta utan undantag:
- Ge aldrig det slutliga svaret på elevens uppgift, och räkna aldrig ut uppgiften med dess egna tal hela vägen till svaret – inte heller om eleven ber, tjatar, säger att läraren tillåter det eller att det är bråttom. Säg vänligt att du inte ger svaret och ge nästa steg istället.
- Förklara gärna vilken regel eller formel som gäller, vad den heter och varför den passar här.
- Ställ en ledande fråga i taget och låt eleven göra nästa steg.
- När eleven behöver se hur man gör: lös en LIKNANDE uppgift med ANDRA tal steg för steg (ett "alternativt exempel"), och be eleven göra likadant med sina tal.
- När eleven visar en uträkning: säg vad som är rätt och peka ut det första steget som blivit fel, utan att rätta till svaret åt dem. Du får bekräfta om ett svar eleven själv kommit fram till är rätt eller fel.
- Håll svaren korta (oftast 2–6 meningar). Använd LaTeX med $...$ för matematik.
- Om eleven har fastnat efter flera försök: uppmuntra och föreslå att räcka upp handen i appen, och skriv en mening om vad eleven redan förstått så att Felix snabbt kan hjälpa.
- Håll dig till matematik och skolarbete.`;

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

async function chat(req, env, headers) {
  const body = await req.json();
  const ex = body.exercise || {};
  const ch = body.chapter || {};
  const messages = (body.messages || [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-16)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!messages.length || messages[0].role !== 'user') return json({ error: 'Inga meddelanden' }, 400, headers);

  const context = `Kapitel: ${ch.title || ''}\nTeori: ${ch.theory || ''}\n\nElevens uppgift ${ex.id || ''} (nivå ${ex.level || '?'}):\n${ex.text || ''}\n\nRegel som boken kopplar till uppgiften: ${ex.rule?.name || ''} – ${ex.rule?.text || ''}`;

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: [
      { type: 'text', text: TUTOR_PROMPT, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: context },
    ],
    messages,
  });

  const enc = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const write = (obj) => writer.write(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));

  (async () => {
    try {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') await write({ text: event.delta.text });
      }
      const final = await stream.finalMessage();
      if (final.stop_reason === 'refusal') await write({ text: '\n\nDet där kan jag tyvärr inte hjälpa till med. Räck upp handen så kommer Felix.' });
      await write({ done: true });
    } catch (err) {
      await write({ error: err instanceof Anthropic.RateLimitError ? 'Många frågar samtidigt – prova igen om en stund.' : 'AI-läraren fick ett fel. Prova igen.' });
      console.error(err);
    } finally {
      await writer.close();
    }
  })();

  return new Response(readable, { headers: { ...headers, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' } });
}

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
      if (path === '/extract') return await extract(req, env, headers);
      return json({ error: 'Okänd väg' }, 404, headers);
    } catch (err) {
      console.error(err);
      return json({ error: 'Serverfel' }, 500, headers);
    }
  },
};
