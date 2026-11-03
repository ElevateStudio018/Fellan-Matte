// AI-läraren som egen sida: startvy med fyra lägen, guidad problemlösning,
// ledtrådstrappa, förklaringar på olika sätt, förhör och minne.
// Bygger på samma komponenter och stilar som resten av Fellan Matte.
import { store, save, book, findExercise } from './store.js';
import { ask, fetchQuiz, hasAI, prepareImage } from './tutor.js';
import { checkAnswer } from './calc.js';
import {
  HINT_LEVELS, MAX_HINT, EXPLAIN_STYLES, clampHint, diagnose, nextDifficulty, MISTAKE_LABELS, compact,
} from '../shared/tutor-core.js';
import { esc, md, toast, $ } from './ui.js';
import { render, go } from './app.js';

const MODES = {
  chapter: { title: 'Hjälp med ett kapitel', short: 'Kapitel' },
  talk: { title: 'Prata om matte', short: 'Prata' },
  stuck: { title: 'Jag har fastnat', short: 'Fastnat' },
  quiz: { title: 'Förhör mig', short: 'Förhör' },
};

const MODE_CARDS = [
  { id: 'chapter', icon: '📖', color: '#2f5bea', title: 'Hjälp med ett kapitel', text: 'Välj kapitel och moment ur boken. Jag kan kapitlets teori, regler och uppgifter.' },
  { id: 'talk', icon: '💬', color: '#e2553a', title: 'Prata om matte', text: 'Procent, bråk, ekvationer, negativa tal … fråga vad du vill och få en fråga tillbaka.' },
  { id: 'stuck', icon: '🧩', color: '#13836f', title: 'Jag har fastnat', text: 'Beskriv uppgiften, klistra in den eller ta en bild. Vi hittar första steget tillsammans.' },
  { id: 'quiz', icon: '🎯', color: '#8a4bd8', title: 'Förhör mig', text: 'En fråga i taget, nivå efter hur det går och feedback på ditt resonemang.' },
];

let busy = false;
let pendingImage = null;

/* ---------------- Tillstånd ---------------- */

function state() {
  const s = (store.coach = store.coach || {});
  s.mode = s.mode || null;
  s.threads = s.threads || {};
  ['chapter', 'talk', 'stuck', 'quiz'].forEach((m) => { s.threads[m] = s.threads[m] || []; });
  s.hintLevel = clampHint(s.hintLevel || 1);
  s.chapterId = s.chapterId || null;
  s.exerciseId = s.exerciseId || null;
  s.mistakes = s.mistakes || [];
  s.quiz = s.quiz || {};
  const q = s.quiz;
  q.n = q.n || 0;
  q.correct = q.correct || 0;
  q.difficulty = Math.min(3, Math.max(1, q.difficulty || 1));
  q.asked = q.asked || [];
  q.recent = q.recent || [];
  q.question = q.question || null;
  q.moment = q.moment || null;
  if (q.verdict === undefined) q.verdict = null;
  s.lastMode = s.lastMode || null;
  return s;
}

const chapterFor = (s = state()) => book().chapters.find((c) => c.id === s.chapterId) || null;
const thread = (s = state()) => s.threads[s.mode] || [];

function saveSoon() {
  try { save(); } catch { /* privat läge */ }
}

/* ---------------- Startvy ---------------- */

export function view(r) {
  const s = state();
  if (r?.arg && MODES[r.arg] && s.mode !== r.arg) {
    s.mode = r.arg;
    s.hintLevel = 1;
    saveSoon();
  }
  if (!s.mode || !MODES[s.mode]) return startView(s);
  return modeView(s);
}

function startView(s) {
  const saved = Object.values(s.threads).reduce((n, t) => n + t.length, 0);
  const last = [s.lastMode, ...Object.keys(s.threads)].find((m) => m && MODES[m] && s.threads[m]?.length) || null;
  return `<div class="split" style="align-items:flex-start">
      <div><div class="muted small" style="font-weight:700">AI-LÄRAREN</div>
        <h1>Vad vill du göra?</h1>
        <p class="muted" style="max-width:600px;margin:8px 0 0">Jag hjälper dig att förstå matematik – och jag ger aldrig färdiga svar. Vi tar det steg för steg med frågor, ledtrådar och exempel med andra tal.</p></div>
      <span class="badge hand">Ger aldrig svaret</span>
    </div>
    <div class="grid" style="margin-top:24px">${MODE_CARDS.map((c) => `
      <button class="card" data-act="coach-mode" data-mode="${c.id}" style="border:0">
        <div class="tile" style="background:${c.color};font-size:52px">${c.icon}</div>
        <div class="card-body"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>
      </button>`).join('')}</div>
    ${!hasAI() ? `<div class="announce" style="margin-top:20px;background:var(--surface-2);color:var(--ink)">⚙️ Inbyggt hjälpläge: jag använder bokens ledtrådar och teori. Läraren kan koppla på full AI under Inställningar.</div>` : ''}
    <div class="section"><div class="section-head"><h2>Ditt minne</h2>${saved ? '<span class="badge">Sparat lokalt</span>' : ''}</div>
      <div class="ex-card" style="padding:20px">
        <p class="muted" style="margin:0">Jag kommer ihåg kapitel, ledtrådsnivå och vilka misstag vi jobbat med – men bara i den här webbläsaren. Du bestämmer själv när det ska raderas.</p>
        ${last ? `<p class="muted small" style="margin:10px 0 0">Senast: ${esc(MODES[last].title)}${s.chapterId ? ' · kapitel ' + esc(chapterFor(s)?.title || s.chapterId) : ''}</p>` : ''}
        ${s.mistakes.length ? `<div class="btns" style="margin-top:10px">${[...new Set(s.mistakes.map((m) => m.tag))].slice(-4).map((t) => `<span class="badge">${esc(MISTAKE_LABELS[t] || t)}</span>`).join('')}</div>` : ''}
        <div class="btns" style="margin-top:14px">
          ${last ? `<button class="btn sm primary" data-act="coach-mode" data-mode="${last}">Fortsätt där du var</button>` : ''}
          <button class="btn sm ghost" data-act="coach-reset">Rensa sparad historik</button>
        </div>
      </div>
    </div>`;
}

/* ---------------- Aktivt läge ---------------- */

function modeView(s) {
  return `<div class="split">
      <div><div class="muted small" style="font-weight:700">AI-LÄRAREN</div><h1>${esc(MODES[s.mode].title)}</h1></div>
      <div class="btns"><a class="btn sm ghost" href="#/ai" data-act="coach-home">← Alla lägen</a></div>
    </div>
    <div class="ex-layout" style="margin-top:16px">
      ${chatPanel(s)}
      <aside style="display:grid;gap:20px">${s.mode === 'quiz' ? quizPanel(s) : ''}${chapterPanel(s)}${hintPanel(s)}${memoryPanel(s)}</aside>
    </div>`;
}

function chatPanel(s) {
  const t = thread(s);
  const q = s.quiz;
  const showChips = !busy;
  return `<div class="tutor">
    <div class="tutor-head"><div class="avatar">AI</div>
      <div><b>AI-läraren</b><div class="muted small">${hasAI() ? 'Ger aldrig svaret – hjälper dig dit' : 'Hjälpläge med bokens ledtrådar'}</div></div>
      <span class="badge" style="margin-left:auto">${esc(MODES[s.mode].short)}</span></div>
    <div class="msgs" id="coach-msgs">
      <div class="msg assistant">${md(greeting(s))}</div>
      ${t.map((m) => `<div class="msg ${m.role}">${md(m.content)}</div>`).join('')}
      ${busy ? '<div class="msg assistant" id="coach-live">…</div>' : ''}
    </div>
    ${showChips ? `<div class="chips">${chips(s).map((c) => `<button class="chip" data-act="${c.act}"${c.act === 'coach-chip' ? ` data-text="${esc(c.label)}"` : ''}${c.hard ? ` data-hard="${c.hard}"` : ''}>${esc(c.label)}</button>`).join('')}</div>` : ''}
    ${pendingImage && s.mode === 'stuck' ? `<div class="chips"><span class="badge">📷 Bild inläst</span><button class="chip" data-act="coach-imgclear">Ta bort bilden</button></div>` : ''}
    <form class="composer" data-form="coach-chat">
      ${s.mode === 'stuck' ? `<label class="chip" style="display:flex;align-items:center;padding:8px 12px;cursor:pointer" title="Ta en bild av uppgiften">📷<input type="file" accept="image/*" capture="environment" data-act="coach-image" hidden></label>` : ''}
      <input class="input" name="q" placeholder="${esc(placeholder(s))}" autocomplete="off" aria-label="Din fråga">
      <button class="btn primary" ${busy ? 'disabled' : ''}>Skicka</button>
    </form>
  </div>
  ${q.question && s.mode === 'quiz' && !busy ? `<p class="muted small" style="margin-top:8px">Svara i rutan ovan. Jag säger till om det stämmer, men du får hitta svaret själv.</p>` : ''}`;
}

function placeholder(s) {
  if (s.mode === 'quiz') return s.quiz.question ? 'Ditt svar eller din uträkning…' : 'Skriv "kör" eller tryck Starta förhöret';
  if (s.mode === 'stuck') return 'Klistra in uppgiften eller beskriv vad du fastnat på…';
  if (s.mode === 'talk') return 'Fråga vad som helst om matte…';
  return 'Skriv din fråga eller uträkning…';
}

function greeting(s) {
  if (s.mode === 'chapter') {
    const ch = chapterFor(s);
    if (!ch) return 'Vilket kapitel jobbar du med? Välj ett i listan, så håller vi oss till kapitlets teori och regler.';
    const ex = s.exerciseId ? findExercise(s.exerciseId)?.ex : null;
    if (ex) {
      return `Vi tar **${ex.id}** i ${ch.title}.\n\n${ex.rule?.name ? `Regeln som hör hit är **${ex.rule.name}**. ` : ''}Vad har du provat hittills?`;
    }
    const theory = String(ch.theory || '').slice(0, 220);
    return `Vi håller oss till **${ch.id}. ${ch.title}**.\n\n${theory}${String(ch.theory || '').length > 220 ? ' …' : ''}\n\nVälj ett moment i listan, eller skriv din egen fråga om kapitlet.`;
  }
  if (s.mode === 'talk') return 'Vad vill du prata om? Procent, bråk, ekvationer, negativa tal, prioriteringsregler … jag förklarar och ställer en fråga så att du får tänka själv.';
  if (s.mode === 'stuck') return 'Beskriv uppgiften du fastnat på – klistra in texten, skriv med egna ord eller ta en bild. Berätta gärna vad du redan provat, så börjar vi där.';
  return 'Dags för förhör! Jag ställer en fråga i taget och anpassar nivån efter hur det går. Du får försöka igen innan jag säger något om svaret.';
}

function chips(s) {
  const q = s.quiz;
  if (s.mode === 'quiz') {
    if (!q.question) return [{ label: 'Starta förhöret', act: 'coach-quizstart' }];
    if (q.verdict !== null) {
      return [
        { label: 'Förklara varför', act: 'coach-chip' },
        { label: 'Ny liknande fråga', act: 'coach-quiznext' },
        { label: 'Svårare fråga', act: 'coach-quiznext', hard: '1' },
      ];
    }
    return [
      { label: 'Ge mig en ledtråd', act: 'coach-hint' },
      { label: 'Vad frågar uppgiften efter?', act: 'coach-chip' },
      { label: 'Jag vill försöka igen', act: 'coach-focus' },
    ];
  }
  const plain = (label) => ({ label, act: 'coach-chip' });
  if (s.mode === 'stuck') return ['Jag förstår inte frågan', 'Vad är första steget?', 'Ge mig en ledtråd', 'Förklara enklare'].map((l) => (l === 'Ge mig en ledtråd' ? { label: l, act: 'coach-hint' } : plain(l)));
  if (s.mode === 'talk') return ['Hur fungerar procent?', 'Vad är en ekvation?', 'Förklara bråk', 'Varför fungerar negativa tal?'].map(plain);
  return ['Vilken regel gäller?', 'Ge mig en ledtråd', 'Visa ett liknande exempel', 'Jag förstår inte frågan'].map((l) => (l === 'Ge mig en ledtråd' ? { label: l, act: 'coach-hint' } : plain(l)));
}

/* ---------------- Paneler ---------------- */

function chapterPanel(s) {
  const ch = chapterFor(s);
  if (!ch) {
    return `<div class="ex-card" style="padding:20px" id="coach-kapitel">
      <h3>${s.mode === 'quiz' ? 'Välj kapitel att bli förhörd på' : 'Välj kapitel'}</h3>
      <p class="muted small" style="margin:6px 0 12px">Jag använder bokens eget innehåll.</p>
      <div class="ex-list">${book().chapters.map((c) => `<button class="ex-item" data-act="coach-chapter" data-id="${esc(c.id)}" style="border:0;cursor:pointer;text-align:left;width:100%">
        <span class="badge" style="background:${c.color};color:#fff">${esc(c.id)}</span>
        <span class="ex-text">${esc(c.title)}</span><span class="muted small">${c.exercises.length} uppg.</span></button>`).join('')}</div>
      ${s.mode === 'quiz' ? `<div class="btns" style="margin-top:12px"><button class="btn sm ghost" data-act="coach-quizmixed">Blandade frågor från hela boken</button></div>` : ''}
    </div>`;
  }
  const exs = s.mode === 'quiz' ? [] : (ch.exercises || []).slice(0, 12);
  return `<div class="ex-card" style="padding:20px" id="coach-kapitel">
    <div class="split"><h3>Kapitel ${esc(ch.id)}</h3><button class="btn sm ghost" data-act="coach-chapter" data-id="">Byt</button></div>
    <div style="font-weight:800;font-size:18px;margin-top:4px">${esc(ch.title)}</div>
    ${ch.theory ? `<p class="muted small" style="margin:8px 0 0">${md(String(ch.theory).slice(0, 200))}${String(ch.theory).length > 200 ? '…' : ''}</p>` : ''}
    ${exs.length ? `<div class="ex-list" style="margin-top:14px">${exs.map((ex) => `<button class="ex-item" data-act="coach-exercise" data-id="${esc(ex.id)}" style="border:0;cursor:pointer;text-align:left;width:100%;${s.exerciseId === ex.id ? 'outline:2px solid var(--ink)' : ''}">
      <span class="ex-num" style="min-width:44px">${esc(ex.id)}</span><span class="ex-text">${esc(stripMath(ex.text)).slice(0, 60)}</span></button>`).join('')}</div>` : ''}
    <div class="btns" style="margin-top:12px">
      <button class="btn sm ${s.mode === 'quiz' ? 'dark' : 'ghost'}" data-act="coach-quizchapter">Förhör mig på kapitlet</button>
      ${s.mode === 'chapter' && s.exerciseId ? '<button class="btn sm ghost" data-act="coach-quizmoment">Förhör mig på momentet</button>' : ''}
    </div>
  </div>`;
}

const stripMath = (s) => String(s || '').replace(/\$([^$]+)\$/g, (_, m) => m.replace(/\\(dfrac|frac)\{([^}]*)\}\{([^}]*)\}/g, '$2/$3').replace(/\\cdot/g, '·').replace(/\\,|\\%|\\/g, (x) => (x === '\\%' ? '%' : '')).replace(/[{}^]/g, ''));

function hintPanel(s) {
  const level = s.hintLevel;
  const chapter = chapterFor(s);
  const practice = s.mode === 'quiz' || !chapter ? ''
    : s.exerciseId
      ? '<button class="btn sm ghost" data-act="coach-quizmoment">Testa en liknande uppgift</button>'
      : '<button class="btn sm ghost" data-act="coach-quizchapter">Förhör mig på kapitlet</button>';
  return `<div class="ex-card" style="padding:20px">
    <div class="split"><h3>Ledtrådstrappa</h3><span class="badge">Nivå ${level} av ${MAX_HINT}</span></div>
    <p class="muted small" style="margin:6px 0 10px">${esc(HINT_LEVELS[level - 1].name)} – jag ger aldrig mer hjälp än du behöver.</p>
    <div class="progress"><i style="width:${(level / MAX_HINT) * 100}%"></i></div>
    <div class="btns" style="margin-top:12px"><button class="btn sm dark" data-act="coach-hint">Ge mig en ledtråd</button>${practice}</div>
    <div class="f" style="margin-top:14px"><b class="small">Förklara på ett annat sätt</b>
      <div class="btns" style="margin-top:8px">${EXPLAIN_STYLES.map((st) => `<button class="chip" data-act="coach-explain" data-style="${st.id}">${esc(st.label)}</button>`).join('')}</div>
    </div>
  </div>`;
}

function quizPanel(s) {
  const q = s.quiz;
  const ch = chapterFor(s);
  return `<div class="ex-card" style="padding:20px">
    <div class="split"><h3>Förhör</h3><span class="badge">Nivå ${q.difficulty} av 3</span></div>
    <div class="stats" style="grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
      <div class="stat" style="padding:12px 14px"><b>${q.n}</b><span>frågor</span></div>
      <div class="stat" style="padding:12px 14px"><b>${q.correct}</b><span>rätt</span></div>
    </div>
    <p class="muted small" style="margin:10px 0 0">${ch ? 'Kapitel: ' + esc(ch.title) : 'Blandade frågor från boken'}</p>
    <div class="btns" style="margin-top:12px">
      ${!q.question ? `<button class="btn sm dark" data-act="coach-quizstart" ${busy ? 'disabled' : ''}>Starta förhöret</button>` : `<button class="btn sm ghost" data-act="coach-quiznext" ${busy ? 'disabled' : ''}>Ny fråga</button>`}
    </div>
  </div>`;
}

function memoryPanel(s) {
  const tags = [...new Set(s.mistakes.map((m) => m.tag))].slice(-4);
  return `<div class="ex-card" style="padding:20px">
    <h3>Vad jag minns</h3>
    <p class="muted small" style="margin:6px 0 10px">Bara i den här webbläsaren, och bara sådant som hjälper undervisningen.</p>
    ${tags.length ? `<div class="btns">${tags.map((t) => `<span class="badge warn">${esc(MISTAKE_LABELS[t] || t)}</span>`).join('')}</div>` : '<p class="muted small" style="margin:0">Inget sparat om misstag ännu.</p>'}
    ${s.mistakes.filter((m) => m.why).slice(-1).map((m) => `<p class="muted small" style="margin:10px 0 0">Senaste analysen: ${esc(m.why)}</p>`).join('')}
    <div class="btns" style="margin-top:12px"><button class="btn sm ghost" data-act="coach-reset">Rensa historik</button></div>
  </div>`;
}

/* ---------------- Samtal ---------------- */

function context(s = state()) {
  if (s.mode === 'quiz') {
    const q = s.quiz.question;
    return {
      exercise: q ? {
        id: q.exerciseId || 'förhör',
        text: q.question,
        level: q.difficulty,
        rule: q.ruleName ? { name: q.ruleName, text: q.ruleText } : null,
        hints: q.hints || [],
        answer: q.answer ? [q.answer] : [],
        tolerance: q.tolerance,
      } : {},
      chapter: chapterFor(s) || {},
    };
  }
  if (s.mode === 'chapter') {
    const ch = chapterFor(s) || {};
    const ex = s.exerciseId ? findExercise(s.exerciseId)?.ex || {} : {};
    return { exercise: ex, chapter: ch };
  }
  if (s.mode === 'stuck') {
    const ex = s.stuckExercise || {};
    return { exercise: ex, chapter: ex._chapter || {} };
  }
  return { exercise: {}, chapter: {} };
}

function memory(s = state()) {
  const ctx = context(s);
  return {
    chapterTitle: ctx.chapter?.title,
    exerciseId: ctx.exercise?.id,
    hintLevel: s.hintLevel,
    mistakes: s.mistakes.map((m) => m.tag),
    verdict: s.quiz.verdict,
    solved: s.quiz.correct,
  };
}

function noteMistake(input, exercise) {
  const s = state();
  if (!exercise?.answer?.length) return;
  const d = diagnose(input, exercise);
  if (!d) return;
  s.mistakes.push({ tag: d.tag, why: d.why, ts: Date.now() });
  s.mistakes = s.mistakes.slice(-12);
  saveSoon();
}

async function sendMessage(text, { explain = '', image = null } = {}) {
  const s = state();
  if (!s.mode || busy) return;
  const q = String(text || '').trim();
  if (!q && !image) return;
  const ctx = context(s);
  const t = thread(s);
  t.push({ role: 'user', content: q || 'Här är en bild av uppgiften.' });
  if (t.length > 40) t.splice(0, t.length - 40);
  const img = image;
  pendingImage = null;
  const level = s.hintLevel;
  saveSoon();
  busy = true;
  render();
  scrollChat();
  let live = $('#coach-live');
  if (!live) {
    live = document.createElement('div');
    live.className = 'msg assistant';
    live.id = 'coach-live';
    live.textContent = '…';
    $('#coach-msgs')?.appendChild(live);
    scrollChat();
  }
  try {
    const full = await ask({
      mode: s.mode,
      exercise: ctx.exercise,
      chapter: ctx.chapter,
      messages: t,
      hintLevel: level,
      explain,
      memory: memory(s),
      quiz: { question: s.quiz.question?.question, verdict: s.quiz.verdict },
      image: img,
      onText: (shown) => {
        const el = $('#coach-live');
        if (el) { el.innerHTML = md(shown); scrollChat(); }
      },
    });
    t.push({ role: 'assistant', content: String(full).slice(0, 6000) });
    noteMistake(q, ctx.exercise);
  } catch (err) {
    t.pop();
    toast(err?.message || 'Nätverksfel. Prova igen.', 6000);
  } finally {
    busy = false;
    saveSoon();
    render();
    scrollChat();
  }
}

function scrollChat() {
  const box = $('#coach-msgs');
  if (box) box.scrollTop = box.scrollHeight;
}

function requestHint() {
  const s = state();
  s.hintLevel = clampHint(s.hintLevel + 1);
  saveSoon();
  sendMessage(`Ge mig en ledtråd (nivå ${s.hintLevel})`);
}

/* ---------------- Förhör ---------------- */

async function startQuiz({ chapterId, moment = null } = {}) {
  const s = state();
  if (chapterId !== undefined) s.chapterId = chapterId;
  s.quiz = { ...s.quiz, n: 0, correct: 0, difficulty: s.quiz.difficulty || 1, asked: [], recent: [], question: null, verdict: null, moment };
  s.mode = 'quiz';
  s.lastMode = 'quiz';
  s.threads.quiz = [];
  saveSoon();
  await nextQuestion();
}

async function nextQuestion() {
  const s = state();
  if (busy) return;
  busy = true;
  render();
  try {
    const q = await fetchQuiz({
      chapterId: s.chapterId,
      chapter: chapterFor(s),
      difficulty: s.quiz.difficulty,
      avoid: s.quiz.asked,
      recent: s.quiz.recent,
      memory: memory(s),
      moment: s.quiz.moment,
    });
    if (!q?.question) { toast('Det finns inga uppgifter att förhöra på i boken ännu.'); return; }
    s.quiz.question = q;
    s.quiz.n += 1;
    s.quiz.verdict = null;
    s.quiz.asked = [...s.quiz.asked, q.exerciseId || q.question.slice(0, 160), q.question.slice(0, 160)].filter(Boolean).slice(-12);
    if (q.chapterId && !s.chapterId) s.chapterId = q.chapterId;
    thread(s).push({ role: 'assistant', content: `**Fråga ${s.quiz.n}** (nivå ${q.difficulty}/3):\n\n${q.question}\n\nVad tror du? Skriv ditt svar eller din uträkning.` });
  } catch (err) {
    toast(err?.message || 'Kunde inte skapa en fråga. Prova igen.', 6000);
  } finally {
    busy = false;
    saveSoon();
    render();
    scrollChat();
  }
}

function focusComposer() {
  const input = $('form[data-form="coach-chat"] input[name="q"]');
  input?.focus();
}

function quizAnswer(input) {
  const s = state();
  const q = s.quiz.question;
  if (!q) return false;
  const verdict = checkAnswer(input, { answer: [q.answer], tolerance: q.tolerance ?? 1e-6, kind: q.kind });
  if (verdict === null) { toast('Skriv ditt svar först.'); return true; }
  const t = thread(s);
  t.push({ role: 'user', content: input });
  s.quiz.recent = [...s.quiz.recent, verdict].slice(-6);
  s.quiz.verdict = verdict;
  if (verdict) s.quiz.correct += 1;
  else noteMistake(input, { answer: [q.answer] });
  s.quiz.difficulty = nextDifficulty(s.quiz.difficulty, s.quiz.recent);
  t.push({ role: 'assistant', content: quizFeedback(verdict, q, input) });
  saveSoon();
  render();
  scrollChat();
  return true;
}

function quizFeedback(correct, q, input) {
  if (correct) {
    const why = q.ruleText ? `\n\n**Varför det funkar:** ${q.ruleText}` : '';
    const extra = q.explanation ? `\n\n${q.explanation}` : '';
    return `Rätt! 🎉 Bra jobbat – och du hittade det själv.${why}${extra}\n\nVill du testa en liknande fråga, eller ska vi höja nivån?`;
  }
  const d = diagnose(input, { answer: [q.answer] });
  const hint = q.hints?.[0] || 'Vad vet du säkert om uppgiften?';
  return `Inte riktigt – men felet är sådant vi kan rätta till. ${d ? d.why : 'Läs uppgiften en gång till och fundera på vilket räknesätt som passar.'}\n\n**Ledtråd:** ${hint}\n\nFörsök igen. Du behöver inte skriva svaret exakt som facit, bara visa hur du tänker.`;
}

/* ---------------- Händelser ---------------- */

export function action(act, el) {
  const s = state();
  switch (act) {
    case 'coach-home':
      s.mode = null;
      busy = false;
      pendingImage = null;
      saveSoon();
      if (location.hash !== '#/ai') go('#/ai'); else render();
      break;
    case 'coach-mode':
      s.mode = el.dataset.mode;
      s.lastMode = s.mode;
      s.hintLevel = 1;
      s.exerciseId = null;
      busy = false;
      pendingImage = null;
      saveSoon();
      if (location.hash !== '#/ai') go('#/ai'); else render();
      break;
    case 'coach-chapter': {
      s.chapterId = el.dataset.id || null;
      s.exerciseId = null;
      s.hintLevel = 1;
      s.threads[s.mode] = [];
      if (s.mode === 'quiz') { startQuiz({ chapterId: s.chapterId }); break; }
      s.mode = 'chapter';
      saveSoon();
      render();
      break;
    }
    case 'coach-chapter-open':
      s.mode = 'chapter';
      s.lastMode = 'chapter';
      s.chapterId = el.dataset.id || null;
      s.exerciseId = null;
      s.hintLevel = 1;
      s.threads.chapter = [];
      saveSoon();
      go('#/ai');
      break;
    case 'coach-exercise':
      chooseExercise(el.dataset.id);
      break;
    case 'coach-chip':
      sendMessage(el.dataset.text);
      break;
    case 'coach-hint':
      if (s.mode === 'quiz' && !s.quiz.question) { toast('Starta förhöret först, så ger jag en ledtråd till frågan.'); break; }
      requestHint();
      break;
    case 'coach-explain': {
      const style = EXPLAIN_STYLES.find((x) => x.id === el.dataset.style);
      if (style) sendMessage(style.prompt, { explain: style.id });
      break;
    }
    case 'coach-quizstart':
      startQuiz();
      break;
    case 'coach-quiznext':
      if (el.dataset.hard === '1') s.quiz.difficulty = Math.min(3, s.quiz.difficulty + 1);
      nextQuestion();
      break;
    case 'coach-quizchapter':
      startQuiz({ chapterId: s.chapterId });
      break;
    case 'coach-quizmixed':
      startQuiz({ chapterId: null });
      break;
    case 'coach-quizmoment': {
      const ex = s.exerciseId ? findExercise(s.exerciseId)?.ex : null;
      startQuiz({ chapterId: s.chapterId, moment: ex ? { id: ex.id, text: ex.text, ruleName: ex.rule?.name || '', level: ex.level || 1 } : null });
      break;
    }
    case 'coach-imgclear':
      pendingImage = null;
      render();
      break;
    case 'coach-focus':
      focusComposer();
      break;
    case 'coach-reset':
      if (!confirm('Rensa AI-lärarens sparade historik i den här webbläsaren?')) break;
      store.coach = {};
      busy = false;
      pendingImage = null;
      saveSoon();
      render();
      toast('Historiken är rensad.');
      break;
    default:
      break;
  }
}

function chooseExercise(id) {
  const s = state();
  const f = findExercise(id);
  if (!f) return;
  s.mode = 'chapter';
  s.lastMode = 'chapter';
  s.exerciseId = id;
  s.chapterId = f.ch.id;
  s.hintLevel = 1;
  s.threads.chapter = [{
    role: 'assistant',
    content: `Vi tar **${f.ex.id}**: ${f.ex.text}\n\nVad har du provat hittills? Om du inte kommit igång: vilken regel tror du hör hit?`,
  }];
  saveSoon();
  if (location.hash !== '#/ai') go('#/ai'); else render();
}

export function submit(f) {
  if (f.dataset.form !== 'coach-chat') return false;
  const s = state();
  const text = f.q.value.trim();
  if (!text && !pendingImage) return true;
  f.q.value = '';
  if (s.mode === 'quiz' && s.quiz.question && !isQuestion(text)) {
    if (quizAnswer(text)) return true;
  }
  if (s.mode === 'quiz' && !s.quiz.question && /^(kör|starta|börja|ja|ok)$/i.test(text)) {
    startQuiz();
    return true;
  }
  sendMessage(text, { image: pendingImage ? { data: pendingImage.data, mediaType: pendingImage.mediaType } : null });
  return true;
}

const isQuestion = (text) => /\?\s*$/.test(text) || /^(vad|hur|varför|vilken|vilket|kan du|jag förstår|förklara|menar du|är det)/i.test(text.trim());

/** Kopplar en inklistrad uppgift till bokens uppgift om texten matchar. */
function matchExercise(text) {
  const clean = (s) => compact(s).replace(/[.,;:!?]/g, '');
  const needle = clean(text);
  if (needle.length < 12) return null;
  for (const ch of book().chapters) {
    for (const ex of ch.exercises) {
      const hay = clean(ex.text);
      if (hay.length >= 12 && (hay.includes(needle) || needle.includes(hay))) return { ex, ch };
    }
  }
  return null;
}

// Bilder: byts ut i filväljaren, inte vid klick.
document.addEventListener('change', async (e) => {
  const el = e.target;
  if (store.role !== 'student' || el.dataset.act !== 'coach-image' || !el.files?.[0]) return;
  try {
    pendingImage = await prepareImage(el.files[0]);
    render();
    toast('Bilden är inläst. Skriv gärna vad du fastnat på och tryck Skicka.');
  } catch (err) {
    toast(err?.message || 'Kunde inte läsa bilden.', 5000);
  }
});

/** Efter rendering: koppla ihop inklistrad uppgift med boken och scrolla. */
export function mount(r) {
  if (r?.name !== 'ai') return;
  const s = state();
  if (s.mode === 'stuck') {
    const last = [...thread(s)].reverse().find((m) => m.role === 'user');
    if (last && s.stuckExercise?._src !== last.content) {
      const hit = matchExercise(last.content);
      if (hit) {
        s.stuckExercise = { ...hit.ex, _src: last.content, _chapter: { id: hit.ch.id, title: hit.ch.title, theory: hit.ch.theory, exercises: hit.ch.exercises } };
        s.chapterId = hit.ch.id;
        s.exerciseId = hit.ex.id;
      } else {
        s.stuckExercise = { text: last.content, _src: last.content };
        s.exerciseId = null;
      }
      saveSoon();
    }
  }
  scrollChat();
}

export { MAX_HINT };
