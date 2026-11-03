import { store, save, book, findExercise, uid } from './store.js';
import { live, send, notifyWatch, connect, net } from './sync.js';
import { ask, hasAI, summarizeChat } from './tutor.js';
import { checkAnswer } from './calc.js';
import { esc, md, renderMath, toast, modal, closeModal, $, dateBox, fmtDate, daysUntil, mins, levelDots, youtubeId } from './ui.js';
import { render, go } from './app.js';
import * as C from './coach.js';

let loginRole = 'student';
let openSteps = {};
let exOpenedAt = 0;
let nudged = {};
let busy = false;

const me = () => store.profile.sid;
const myHand = () => live.queue.find((q) => q.sid === me());
const inSession = () => !!live.session && !live.config.ended;
const avgHelp = () => {
  const s = live.helpStats.filter((x) => x.ms > 20000);
  return s.length ? s.reduce((a, b) => a + b.ms, 0) / s.length : 3 * 60000;
};
const isDone = (id) => !!store.progress.done[id];
const fresh = (ev) => ev.ts > Date.now() - 20000;

/* ---------- Inloggning ---------- */
export function loginView() {
  const code = store.pendingCode || '';
  const genCode = 'fm-' + Math.random().toString(36).slice(2, 8);
  const shapes = [['+', '#2f5bea'], ['%', '#e2553a'], ['x', '#13836f'], ['π', '#8a4bd8'], ['√', '#c98a00'], ['✋', '#ffc83d']];
  return `<div class="login">
    <section class="login-art">
      <a class="logo" href="#/"><span class="logo-mark">F</span>Fellan Matte</a>
      <div>
        <h1>Mindre väntan.<br>Mer matte.</h1>
        <p style="color:#bbb;max-width:460px;font-size:18px;margin-top:16px">Boken, en AI-lärare som aldrig ger svaret, och en digital hand som säger till Felix exakt var du sitter och vad du fastnat på.</p>
      </div>
      <div class="shapes">${shapes.map(([s, c]) => `<span style="background:${c};color:${c === '#ffc83d' ? '#111' : '#fff'}">${s}</span>`).join('')}</div>
    </section>
    <section class="login-form">
      <div class="seg" role="tablist">
        <button type="button" data-act="loginrole" data-role="student" class="${loginRole === 'student' ? 'on' : ''}">Elev</button>
        <button type="button" data-act="loginrole" data-role="teacher" class="${loginRole === 'teacher' ? 'on' : ''}">Lärare</button>
      </div>
      ${loginRole === 'student' ? `
      <form class="form" data-form="login-student">
        <h2>Gå med i lektionen</h2>
        <label class="f">Ditt namn<input class="input" name="name" required maxlength="40" autocomplete="name" placeholder="Förnamn Efternamn"></label>
        <div class="form two">
          <label class="f">Bänknummer<input class="input" name="seat" inputmode="numeric" maxlength="3" placeholder="t.ex. 7"></label>
          <label class="f">Klasskod<input class="input" name="code" required value="${esc(code)}" placeholder="fm-xxxxxx"></label>
        </div>
        <button class="btn primary" style="padding:14px">Starta</button>
        <p class="muted small">Klasskoden får du av din lärare. Bänknumret gör att läraren hittar dig snabbare.</p>
      </form>` : `
      <form class="form" data-form="login-teacher">
        <h2>Lärarläge</h2>
        <label class="f">Ditt namn<input class="input" name="name" required value="Felix" maxlength="40"></label>
        <label class="f">Klasskod <span class="muted small">(ny kod skapas – eller skriv din befintliga)</span><input class="input" name="code" required value="${esc(code || genCode)}"></label>
        <label class="f">Lärar-PIN<input class="input" name="pin" type="password" inputmode="numeric" required minlength="4" placeholder="minst 4 siffror"></label>
        <button class="btn dark" style="padding:14px">Öppna klassrummet</button>
        <p class="muted small">Klasskoden är kanalen som elevernas datorer och din klocka pratar på. Håll den inom klassen.</p>
      </form>`}
    </section>
  </div>`;
}

export function login(f) {
  const d = Object.fromEntries(new FormData(f));
  const code = String(d.code || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  if (code.length < 4) { toast('Klasskoden ska vara minst 4 tecken.'); return; }
  if (f.dataset.form === 'login-student') {
    store.role = 'student';
    store.profile.name = String(d.name).trim();
    store.profile.seat = String(d.seat || '').trim();
  } else {
    store.role = 'teacher';
    store.profile.name = String(d.name).trim();
    store.teacherPin = String(d.pin);
  }
  store.classCode = code;
  delete store.pendingCode;
  save();
  connect();
  location.hash = '#/';
  render();
}

/* ---------- Header-knapp ---------- */
export function handButton() {
  const h = myHand();
  if (!h) return `<button class="hand-btn" data-act="hand">✋ <span>Räck upp</span></button>`;
  const pos = live.queue.findIndex((q) => q.sid === me()) + 1;
  const coming = live.coming[me()];
  return `<button class="hand-btn up" data-act="hand">${coming ? '🏃 Felix kommer' : `✋ #${pos} i kön`}</button>`;
}

/* ---------- Vyer ---------- */
export function view(r) {
  switch (r.name) {
    case 'bok': return bookView();
    case 'kapitel': return chapterView(r.arg);
    case 'uppgift': return exerciseView(r.arg);
    case 'ai': return C.view(r);
    case 'genomgangar': return videosView();
    case 'video': return videoView(r.arg);
    case 'prov': return testsView();
    default: return homeView();
  }
}

function currentLesson() {
  if (inSession() && live.config.lessonId) {
    return store.content.lessons.find((l) => l.id === live.config.lessonId) || live.config;
  }
  return null;
}

function nextExercise(ids) {
  return ids.find((id) => !isDone(id)) || ids[0];
}

function exCard(id) {
  const f = findExercise(id);
  if (!f) return '';
  const { ex, ch } = f;
  return `<a class="card" href="#/uppgift/${ex.id}">
    <div class="tile" style="background:${ch.color};font-size:48px">${esc(ex.id)}
      <span class="badge dark">${isDone(ex.id) ? '✓ Klar' : 'Nivå ' + ex.level}</span></div>
    <div class="card-body"><h3>${esc(ch.title)}</h3><p>${esc(stripMath(ex.text)).slice(0, 70)}</p></div></a>`;
}

const stripMath = (s) => String(s).replace(/\$([^$]+)\$/g, (_, m) => m.replace(/\\(dfrac|frac)\{([^}]*)\}\{([^}]*)\}/g, '$2/$3').replace(/\\cdot/g, '·').replace(/\\,|\\%|\\/g, (x) => (x === '\\%' ? '%' : '')).replace(/[{}^]/g, ''));

function chapterProgress(ch) {
  const n = ch.exercises.length;
  const d = ch.exercises.filter((e) => isDone(e.id)).length;
  return { n, d, pct: n ? Math.round((d / n) * 100) : 0 };
}

function homeView() {
  const lesson = currentLesson();
  const ann = inSession() ? live.announcements[0] : null;
  const chapters = book().chapters;
  const tests = [...store.content.tests].filter((t) => daysUntil(t.date) >= 0).sort((a, b) => new Date(a.date) - new Date(b.date));
  const videos = store.content.videos;
  let hero;
  if (lesson) {
    const ch = chapters.find((c) => c.id === lesson.chapter) || chapters[0];
    const ids = lesson.exercises || [];
    const done = ids.filter(isDone).length;
    const nxt = nextExercise(ids);
    hero = `<div class="hero">
      <div class="hero-art" style="background:${ch.color}"><span class="big">${esc(ch.id)}</span>
        <span class="badge dark" style="align-self:flex-start;margin-bottom:12px">● Pågår nu</span>
        <h1>${esc(lesson.title)}</h1></div>
      <div class="hero-side">
        ${lesson.goal ? `<div><div class="muted small" style="font-weight:700">MÅL</div><div style="font-weight:600">${esc(lesson.goal)}</div></div>` : ''}
        ${lesson.intro ? `<p style="margin:0;color:var(--ink-2)">${esc(lesson.intro)}</p>` : ''}
        <div><div class="split small" style="font-weight:700"><span>${done} av ${ids.length} uppgifter</span><span>${ids.length ? Math.round((done / ids.length) * 100) : 0} %</span></div>
        <div class="progress" style="margin-top:6px"><i style="width:${ids.length ? (done / ids.length) * 100 : 0}%"></i></div></div>
        <div class="btns">${nxt ? `<a class="btn primary" href="#/uppgift/${nxt}">Fortsätt med ${esc(nxt)}</a>` : ''}
          <span class="badge">${live.config.calc === 'off' ? 'Ingen räknare' : live.config.calc === 'sci' ? 'Vetenskaplig räknare' : 'Räknare tillåten'}</span></div>
        <div><div class="muted small" style="font-weight:700;margin-bottom:6px">HUR GÅR DET?</div>
          <div class="mood">${[['green', '😊 Bra'], ['yellow', '🤔 Sådär'], ['red', '😣 Kört fast']].map(([k, l]) => `<button data-act="mood" data-mood="${k}" class="${live.students[me()]?.mood === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      </div></div>`;
  } else {
    const last = store.progress.lastEx && findExercise(store.progress.lastEx);
    const ch = last ? last.ch : chapters[0];
    hero = `<div class="hero">
      <div class="hero-art" style="background:${ch.color}"><span class="big">${esc(ch.id)}</span><h1>Hej ${esc(store.profile.name.split(' ')[0])}!</h1></div>
      <div class="hero-side">
        <h2>${last ? 'Fortsätt där du var' : 'Kom igång'}</h2>
        <p class="muted" style="margin:0">${last ? `Uppgift ${esc(last.ex.id)} i ${esc(ch.title)}.` : 'Välj ett kapitel i boken. Ingen lektion pågår just nu.'}</p>
        <div class="btns">${last ? `<a class="btn primary" href="#/uppgift/${last.ex.id}">Fortsätt med ${esc(last.ex.id)}</a>` : `<a class="btn primary" href="#/bok">Öppna boken</a>`}</div>
        <label class="check small"><input type="checkbox" data-act="helper" ${live.students[me()]?.helper ? 'checked' : ''}> Jag kan hjälpa kompisar med uppgifter jag klarat</label>
      </div></div>`;
  }
  return `
    ${ann && Date.now() - ann.ts < 30 * 60000 ? `<div class="announce" style="margin-bottom:16px">📣 ${esc(ann.text)}</div>` : ''}
    ${hero}
    ${lesson && lesson.exercises?.length ? `<div class="section"><div class="section-head"><h2>Dagens uppgifter</h2></div><div class="row">${lesson.exercises.map(exCard).join('')}</div></div>` : ''}
    <div class="section"><div class="section-head"><h2>Boken</h2><a href="#/bok">Alla kapitel →</a></div>
      <div class="row">${chapters.map(chapterCard).join('')}</div></div>
    ${tests.length ? `<div class="section"><div class="section-head"><h2>Kommande prov</h2><a href="#/prov">Alla →</a></div><div class="list">${tests.slice(0, 2).map(testItem).join('')}</div></div>` : ''}
    ${videos.length ? `<div class="section"><div class="section-head"><h2>Genomgångar</h2><a href="#/genomgangar">Alla →</a></div><div class="row">${videos.map(videoCard).join('')}</div></div>` : ''}`;
}

function chapterCard(ch) {
  const p = chapterProgress(ch);
  return `<a class="card" href="#/kapitel/${ch.id}"><div class="tile" style="background:${ch.color}">${esc(ch.id)}<span class="badge dark">${p.d}/${p.n} klara</span></div>
    <div class="card-body"><h3>${esc(ch.title)}</h3><div class="progress" style="margin-top:10px"><i style="width:${p.pct}%"></i></div></div></a>`;
}

function videoCard(v) {
  const ch = book().chapters.find((c) => c.id === v.chapter);
  const yt = youtubeId(v.url);
  return `<a class="card" href="#/video/${v.id}"><div class="tile" style="background:${yt ? `#000 url(https://img.youtube.com/vi/${yt}/hqdefault.jpg)` : ch?.color || '#333'};background-size:cover;background-position:center">
    <span class="play">▶</span><span class="badge dark">${v.minutes ? v.minutes + ' min' : 'Genomgång'}</span></div>
    <div class="card-body"><h3>${esc(v.title)}</h3><p>${ch ? 'Kapitel ' + esc(ch.id) + ' · ' + esc(ch.title) : ''}</p></div></a>`;
}

function testItem(t) {
  const d = daysUntil(t.date);
  const chs = book().chapters.filter((c) => (t.chapters || []).includes(c.id));
  return `<div class="list-item">${dateBox(t.date)}<div class="grow">
    <div class="split"><h3>${esc(t.title)}</h3><span class="badge ${d <= 3 ? 'bad' : d <= 7 ? 'warn' : ''}">${d === 0 ? 'Idag' : d === 1 ? 'Imorgon' : 'om ' + d + ' dagar'}</span></div>
    <div class="muted small">${fmtDate(t.date)}${chs.length ? ' · Kapitel ' + chs.map((c) => c.id).join(', ') : ''}</div>
    ${t.info ? `<p style="margin:6px 0 0;color:var(--ink-2)">${esc(t.info)}</p>` : ''}
    ${t.tips?.length ? `<ul style="margin:6px 0 0;padding-left:20px;color:var(--ink-2)">${t.tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${chs.length ? `<div class="btns" style="margin-top:10px">${chs.map((c) => `<a class="btn sm ghost" href="#/kapitel/${c.id}">Öva ${esc(c.title)} (${chapterProgress(c).pct} %)</a>`).join('')}</div>` : ''}
  </div></div>`;
}

function bookView() {
  return `<h1>${esc(book().title)}</h1><p class="muted">Välj ett kapitel. Varje uppgift har ledtrådar, regel, liknande exempel och AI-läraren.</p>
    <div class="grid" style="margin-top:20px">${book().chapters.map(chapterCard).join('')}</div>`;
}

function chapterView(id) {
  const ch = book().chapters.find((c) => c.id === id);
  if (!ch) return `<div class="empty">Kapitlet finns inte.</div>`;
  const vids = store.content.videos.filter((v) => v.chapter === ch.id);
  return `<a href="#/bok" class="muted small" style="text-decoration:none;font-weight:700">← Boken</a>
    <div class="hero" style="margin-top:10px"><div class="hero-art" style="background:${ch.color};min-height:200px"><span class="big">${esc(ch.id)}</span><h1>${esc(ch.title)}</h1></div>
    <div class="hero-side"><h3>Teori i korthet</h3><p style="margin:0;color:var(--ink-2)">${md(ch.theory || '')}</p>
    <div class="btns"><button class="btn sm ghost" data-act="coach-chapter-open" data-id="${esc(ch.id)}">✦ Fråga AI-läraren</button>${vids.map((v) => `<a class="btn sm ghost" href="#/video/${v.id}">▶ ${esc(v.title)}</a>`).join('')}</div></div></div>
    <div class="section"><div class="section-head"><h2>Uppgifter</h2><span class="muted small">${chapterProgress(ch).d} av ${ch.exercises.length} klara</span></div>
    <div class="ex-list">${ch.exercises.map((ex) => `<a class="ex-item" href="#/uppgift/${ex.id}">
      <span class="ex-num">${esc(ex.id)}</span><span class="ex-text">${esc(stripMath(ex.text))}</span>${levelDots(ex.level || 1)}
      <span class="badge ${isDone(ex.id) ? 'ok' : ''}">${isDone(ex.id) ? '✓' : '–'}</span></a>`).join('')}</div></div>`;
}

function exerciseView(id) {
  const f = findExercise(id);
  if (!f) return `<div class="empty">Uppgiften finns inte.</div>`;
  const { ex, ch } = f;
  const all = book().chapters.flatMap((c) => c.exercises.map((e) => e.id));
  const i = all.indexOf(ex.id);
  const prev = all[i - 1];
  const next = all[i + 1];
  const checkOn = !inSession() || live.config.answerCheck !== false;
  const used = store.progress.hintsUsed[ex.id] || 0;
  const steps = [
    ...(ex.hints || []).map((h, k) => ({ title: `Ledtråd ${k + 1}`, body: md(h) })),
    ex.rule && { title: `Regel: ${ex.rule.name}`, body: md(ex.rule.text) },
    ex.example && { title: 'Liknande exempel med andra tal', body: `<p>${md(ex.example.q)}</p><ol style="margin:0;padding-left:20px">${ex.example.steps.map((s) => `<li>${md(s)}</li>`).join('')}</ol>` },
  ].filter(Boolean);
  const h = myHand();
  const chat = store.chats[ex.id] || [];
  return `<div class="split" style="margin-bottom:12px"><a href="#/kapitel/${ch.id}" class="muted small" style="text-decoration:none;font-weight:700">← ${esc(ch.id)}. ${esc(ch.title)}</a>
    <div class="btns">${prev ? `<a class="btn sm ghost" href="#/uppgift/${prev}">← ${esc(prev)}</a>` : ''}${next ? `<a class="btn sm ghost" href="#/uppgift/${next}">${esc(next)} →</a>` : ''}</div></div>
  <div class="ex-layout">
    <div class="ex-card">
      <div class="split"><div style="display:flex;align-items:center;gap:12px"><span class="badge" style="background:${ch.color};color:#fff;font-size:15px;padding:6px 14px">${esc(ex.id)}</span>${levelDots(ex.level || 1)}</div>
        ${isDone(ex.id) ? '<span class="badge ok">✓ Klar</span>' : ''}</div>
      <div class="ex-q">${md(ex.text)}</div>
      ${checkOn && ex.answer?.length ? `<form data-form="answer" data-ex="${esc(ex.id)}"><div class="answer-row">
        <input class="input" name="a" placeholder="Ditt svar" autocomplete="off" aria-label="Ditt svar">
        <button class="btn dark">Kolla</button></div></form><div id="fb"></div>` : `<p class="muted small">Facitkollen är avstängd under den här lektionen.</p>`}
      <div class="ladder">
        <div class="muted small" style="font-weight:700">HJÄLPSTEG – ÖPPNA ETT I TAGET</div>
        ${steps.map((s, k) => {
          const open = openSteps[ex.id + k] ?? k < used;
          const locked = k > used;
          return `<div class="step ${locked ? 'locked' : ''}"><button data-act="step" data-k="${k}" data-ex="${esc(ex.id)}" ${locked ? 'disabled' : ''}>
            <span>${esc(s.title)}</span><span>${locked ? '🔒' : open ? '−' : '+'}</span></button>
            ${open ? `<div class="step-body">${s.body}</div>` : ''}</div>`;
        }).join('')}
      </div>
      <div class="btns" style="margin-top:22px">
        ${h ? `<button class="btn hand" data-act="hand">✋ Du är #${live.queue.indexOf(h) + 1} i kön</button>` : `<button class="btn hand" data-act="hand" data-ex="${esc(ex.id)}">✋ Räck upp handen</button>`}
        ${next ? `<a class="btn ghost" href="#/uppgift/${next}">Nästa uppgift</a>` : ''}
      </div>
    </div>
    <aside class="tutor">
      <div class="tutor-head"><div class="avatar">AI</div><div><b>AI-läraren</b><div class="muted small">${hasAI() ? 'Ger aldrig svaret – hjälper dig dit' : 'Hjälpläge med bokens ledtrådar'}</div></div></div>
      <div class="msgs" id="msgs">
        <div class="msg assistant">Hej! Jag hjälper dig med <b>${esc(ex.id)}</b>. Jag ger inte svaret, men jag visar vilken regel som gäller, ger ledtrådar och kan visa en liknande uppgift. Vad har du provat hittills?</div>
        ${chat.map((m) => `<div class="msg ${m.role}">${md(m.content)}</div>`).join('')}
      </div>
      <div class="chips">${['Vilken regel gäller?', 'Ge mig en ledtråd', 'Visa ett liknande exempel', 'Jag förstår inte frågan'].map((c) => `<button class="chip" data-act="chip" data-text="${esc(c)}">${esc(c)}</button>`).join('')}</div>
      <form class="composer" data-form="chat" data-ex="${esc(ex.id)}"><input class="input" name="q" placeholder="Skriv din fråga eller uträkning…" autocomplete="off"><button class="btn primary" ${busy ? 'disabled' : ''}>Skicka</button></form>
    </aside>
  </div>`;
}

function videosView() {
  const vids = store.content.videos;
  return `<h1>Genomgångar</h1><p class="muted">Korta filmer från Felix. Titta igen när du vill.</p>
    ${vids.length ? `<div class="grid" style="margin-top:20px">${vids.map(videoCard).join('')}</div>` : '<div class="empty">Inga genomgångar ännu.</div>'}`;
}

function videoView(id) {
  const v = store.content.videos.find((x) => x.id === id);
  if (!v) return `<div class="empty">Genomgången finns inte.</div>`;
  const yt = youtubeId(v.url);
  const ch = book().chapters.find((c) => c.id === v.chapter);
  return `<a href="#/genomgangar" class="muted small" style="text-decoration:none;font-weight:700">← Genomgångar</a>
    <h1 style="margin:10px 0 16px">${esc(v.title)}</h1>
    ${yt ? `<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/${yt}" allow="encrypted-media; picture-in-picture" allowfullscreen title="${esc(v.title)}"></iframe>`
      : v.url ? `<video class="video-frame" src="${esc(v.url)}" controls></video>` : `<div class="empty">Felix har inte lagt in filmen än.</div>`}
    ${ch ? `<div class="btns" style="margin-top:16px"><a class="btn primary" href="#/kapitel/${ch.id}">Öva på ${esc(ch.title)}</a></div>` : ''}`;
}

function testsView() {
  const tests = [...store.content.tests].sort((a, b) => new Date(a.date) - new Date(b.date));
  const up = tests.filter((t) => daysUntil(t.date) >= 0);
  const past = tests.filter((t) => daysUntil(t.date) < 0);
  return `<h1>Prov</h1><p class="muted">Vad som kommer, vad det handlar om och vad du ska öva på.</p>
    <div class="list" style="margin-top:20px">${up.length ? up.map(testItem).join('') : '<div class="empty">Inga kommande prov.</div>'}</div>
    ${past.length ? `<div class="section"><h2 style="margin-bottom:12px">Tidigare</h2><div class="list" style="opacity:.6">${past.map(testItem).join('')}</div></div>` : ''}`;
}

/* ---------- Efter rendering ---------- */
export function mount(r) {
  if (r.name === 'uppgift') {
    const ex = findExercise(r.arg)?.ex;
    if (ex) {
      if (store.progress.lastEx !== ex.id) { store.progress.lastEx = ex.id; save(); exOpenedAt = Date.now(); }
      if (!exOpenedAt) exOpenedAt = Date.now();
      statusSoon({ ex: ex.id });
      const m = $('#msgs');
      if (m) m.scrollTop = m.scrollHeight;
    }
  }
  if (r.name === 'ai') C.mount(r);
}

let statusTimer = null;
let statusPayload = {};
function statusSoon(p) {
  statusPayload = { ...statusPayload, ...p };
  if (!inSession()) return;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    send('status', { sid: me(), name: store.profile.name, seat: store.profile.seat, done: Object.keys(store.progress.done).slice(-40), ...statusPayload });
    statusPayload = {};
  }, 8000);
}

/* ---------- Händelser från klassen ---------- */
export function onLive(ev) {
  if (ev.t === 'start' || ev.t === 'state') {
    if (ev.config?.aiEndpoint !== undefined && ev.config.aiEndpoint !== store.settings.aiEndpoint) { store.settings.aiEndpoint = ev.config.aiEndpoint; save(); }
  }
  if (ev.t === 'content') applyContent(ev);
  if (!fresh(ev)) return;
  if (ev.t === 'coming' && ev.sid === me()) { toast('🏃 Felix är på väg till dig!', 6000); navigator.vibrate?.(200); }
  if (ev.t === 'done' && ev.sid === me()) toast('Handen är nere. Lycka till med nästa! 💪');
  if (ev.t === 'announce') toast('📣 ' + ev.text, 8000);
  if (ev.t === 'group' && ev.sids?.includes(me())) toast(`👥 ${ev.text}`, 10000);
  if (ev.t === 'peer' && ev.helper === me()) toast(`🤝 ${live.students[ev.sidFor]?.name || 'En kompis'} vill ha hjälp med ${ev.ex}${live.students[ev.sidFor]?.seat ? ' (bänk ' + live.students[ev.sidFor].seat + ')' : ''}`, 10000);
  if (ev.t === 'start') { store.helloFor = null; toast('Lektionen har startat!'); }
  if (ev.t === 'end') setTimeout(exitTicket, 300);
}

function applyContent(ev) {
  const list = store.content[ev.kind];
  if (!list) return;
  if (ev.del) store.content[ev.kind] = list.filter((x) => x.id !== ev.id);
  else if (ev.item) { const i = list.findIndex((x) => x.id === ev.item.id); if (i >= 0) list[i] = ev.item; else list.push(ev.item); }
  save();
}

export function tick() {
  if (inSession() && net.status === 'online' && store.helloFor !== live.session) {
    store.helloFor = live.session;
    save();
    send('hello', { sid: me(), name: store.profile.name, seat: store.profile.seat });
  }
  // Uppdatera köplats/väntetid i rubriken
  const hb = $('.hand-btn');
  if (hb) hb.outerHTML = handButton();
  // Fastnat-knuff efter 7 minuter på samma uppgift
  const r = location.hash.match(/^#\/uppgift\/(.+)/);
  if (r && inSession() && exOpenedAt && Date.now() - exOpenedAt > 7 * 60000 && !nudged[r[1]] && !isDone(r[1]) && !myHand()) {
    nudged[r[1]] = true;
    toast('Har du fastnat? Öppna nästa hjälpsteg, fråga AI-läraren – eller räck upp handen ✋', 8000);
  }
}

/* ---------- Handuppräckning ---------- */
const CATS = [
  ['question', 'Förstår inte frågan', 'Vet inte vad jag ska göra'],
  ['step', 'Fastnat på ett steg', 'Har börjat men kommer inte vidare'],
  ['check', 'Vill kolla min lösning', 'Tror jag har svaret'],
  ['other', 'Något annat', 'Dator, material, annat'],
];

function handSheet(exId) {
  const h = myHand();
  if (h) {
    const pos = live.queue.indexOf(h) + 1;
    const wait = Math.max(0, pos - 1) * avgHelp();
    const peers = Object.values(live.students).filter((s) => s.sid !== me() && s.helper && s.done?.includes(h.ex));
    const nxt = nextUnfinished(h.ex);
    modal(`<h2>${live.coming[me()] ? '🏃 Felix är på väg!' : `Du är #${pos} i kön`}</h2>
      <p class="muted">${live.coming[me()] ? 'Ha din uträkning redo.' : `Ungefärlig väntan: ${mins(wait)}.`} Uppgift ${esc(h.ex || '–')} · ${esc(CATS.find((c) => c[0] === h.cat)?.[1] || '')}</p>
      <h3 style="margin-top:18px">Medan du väntar</h3>
      <div class="list" style="margin-top:10px">
        ${h.ex ? `<a class="list-item" href="#/uppgift/${esc(h.ex)}" data-close style="text-decoration:none;color:inherit"><span>💡</span><div class="grow"><b>Öppna nästa hjälpsteg</b><div class="muted small">eller fråga AI-läraren om ${esc(h.ex)}</div></div></a>` : ''}
        ${nxt ? `<a class="list-item" href="#/uppgift/${esc(nxt)}" data-close style="text-decoration:none;color:inherit"><span>⏭️</span><div class="grow"><b>Hoppa till ${esc(nxt)} så länge</b><div class="muted small">Du behåller din plats i kön</div></div></a>` : ''}
        ${peers.map((p) => `<button class="list-item" data-peer="${esc(p.sid)}" style="border:0;text-align:left;cursor:pointer;width:100%"><span>🤝</span><div class="grow"><b>Fråga ${esc(p.name)}</b><div class="muted small">har klarat ${esc(h.ex)}${p.seat ? ' · bänk ' + esc(p.seat) : ''}</div></div></button>`).join('')}
      </div>
      <div class="btns" style="margin-top:18px"><button class="btn ok" data-lower="solved">Jag löste det själv 🎉</button><button class="btn ghost" data-lower="cancel">Ta ner handen</button><button class="btn ghost" data-close>Stäng</button></div>`, (el) => {
      el.addEventListener('click', (e) => {
        const l = e.target.closest('[data-lower]');
        if (l) { send('lower', { sid: me(), reason: l.dataset.lower }); closeModal(); if (l.dataset.lower === 'solved') toast('Snyggt! 🎉'); }
        const p = e.target.closest('[data-peer]');
        if (p) { send('peer', { helper: p.dataset.peer, sidFor: me(), ex: h.ex }); toast('Kompisen har fått en fråga om att hjälpa dig.'); closeModal(); }
      });
    });
    return;
  }
  const lastEx = exId || location.hash.match(/^#\/uppgift\/(.+)/)?.[1] || store.progress.lastEx || '';
  const used = store.progress.hintsUsed[lastEx] || 0;
  const asked = (store.chats[lastEx] || []).some((m) => m.role === 'user');
  let cat = 'step';
  modal(`<h2>Räck upp handen</h2><p class="muted">Ju mer Felix vet innan han kommer, desto snabbare går det.</p>
    <form class="form" id="handform" style="margin-top:14px">
      <label class="f">Uppgift<input class="input" name="ex" value="${esc(lastEx)}" placeholder="t.ex. 2.03"></label>
      <div class="opt-grid">${CATS.map(([k, t, s]) => `<button type="button" class="opt ${k === cat ? 'on' : ''}" data-cat="${k}">${t}<small>${s}</small></button>`).join('')}</div>
      <label class="f">Vad har du provat? <span class="muted small">(valfritt)</span><textarea class="input" name="note" maxlength="300" placeholder="t.ex. Jag fick 3x = 12 men vet inte hur jag går vidare"></textarea></label>
      ${asked ? `<label class="check small"><input type="checkbox" name="ai" checked> Visa Felix vad jag frågat AI-läraren</label>` : ''}
      ${!used && !asked && lastEx ? `<div class="announce small" style="background:var(--surface-2);color:var(--ink)">💡 Tips: öppna Ledtråd 1 eller fråga AI-läraren medan du väntar – du behåller din plats.</div>` : ''}
      <div class="btns"><button class="btn hand" style="padding:13px 22px">✋ Räck upp</button><button type="button" class="btn ghost" data-close>Avbryt</button></div>
    </form>`, (el) => {
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      cat = b.dataset.cat;
      el.querySelectorAll('[data-cat]').forEach((x) => x.classList.toggle('on', x === b));
    });
    $('#handform', el).addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const d = Object.fromEntries(new FormData(e.target));
      const ex = String(d.ex || '').trim();
      const ai = d.ai ? summarizeChat(store.chats[ex]) : '';
      const tried = { hints: store.progress.hintsUsed[ex] || 0, attempts: store.progress.attempts[ex] || 0 };
      const { name, seat } = store.profile;
      send('raise', { sid: me(), name, seat, ex, cat, note: String(d.note || '').slice(0, 300), ai, tried });
      if (live.config.watch?.raise !== false) {
        const catName = CATS.find((c) => c[0] === cat)?.[1] || '';
        notifyWatch({ title: `✋ ${name}${seat ? ' · bänk ' + seat : ''}`, message: `${ex ? 'Uppg ' + ex + ' · ' : ''}${catName}${d.note ? '\n' + d.note : ''}`, tags: ['raised_hand'], priority: 4, comingFor: me() });
      }
      closeModal();
      toast('✋ Handen är uppe. Felix ser dig.');
    });
  });
}

function nextUnfinished(after) {
  const all = book().chapters.flatMap((c) => c.exercises.map((e) => e.id));
  const ids = currentLesson()?.exercises?.length ? currentLesson().exercises : all;
  const i = ids.indexOf(after);
  return ids.slice(i + 1).find((id) => !isDone(id));
}

function exitTicket() {
  if (store.exitFor === live.session) return;
  let mood = null;
  modal(`<h2>Lektionen är slut 👋</h2><p class="muted">Två snabba frågor till Felix.</p>
    <div class="mood" style="margin:14px 0">${[['green', '😊 Jag fattade'], ['yellow', '🤔 Typ'], ['red', '😣 Behöver mer hjälp']].map(([k, l]) => `<button type="button" data-m="${k}">${l}</button>`).join('')}</div>
    <form class="form" id="exitform"><label class="f">Vad var svårast idag?<input class="input" name="hard" maxlength="200"></label>
    <div class="btns"><button class="btn primary">Skicka</button><button type="button" class="btn ghost" data-close>Hoppa över</button></div></form>`, (el) => {
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]');
      if (!b) return;
      mood = b.dataset.m;
      el.querySelectorAll('[data-m]').forEach((x) => x.classList.toggle('on', x === b));
    });
    $('#exitform', el).addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      send('exit', { sid: me(), name: store.profile.name, mood, hard: new FormData(e.target).get('hard') });
      store.exitFor = live.session;
      save();
      closeModal();
      toast('Tack! Ha en bra dag.');
    });
  });
}

/* ---------- Klick och formulär ---------- */
export function action(act, el) {
  if (act.startsWith('coach-')) return C.action(act, el);
  if (act === 'loginrole') { loginRole = el.dataset.role; render(); }
  else if (act === 'hand') handSheet(el.dataset.ex);
  else if (act === 'mood') { statusSoon({ mood: el.dataset.mood }); live.students[me()] = { ...(live.students[me()] || {}), mood: el.dataset.mood }; render(); }
  else if (act === 'helper') statusSoon({ helper: el.checked });
  else if (act === 'step') {
    const k = +el.dataset.k;
    const id = el.dataset.ex;
    const used = store.progress.hintsUsed[id] || 0;
    if (k === used) { store.progress.hintsUsed[id] = used + 1; save(); openSteps[id + k] = true; }
    else openSteps[id + k] = !(openSteps[id + k] ?? k < used);
    render();
  } else if (act === 'chip') {
    const f = $('form[data-form="chat"]');
    f.q.value = el.dataset.text;
    submit(f);
  }
}

export function submit(f) {
  if (f.dataset.form === 'coach-chat') { C.submit(f); return; }
  if (f.dataset.form === 'answer') {
    const id = f.dataset.ex;
    const { ex } = findExercise(id);
    const res = checkAnswer(f.a.value, ex);
    if (res === null) return;
    const fb = $('#fb');
    if (res) {
      const first = !store.progress.done[id];
      store.progress.done[id] = Date.now();
      save();
      fb.innerHTML = `<div class="feedback ok">Rätt! 🎉 ${first ? 'Uppgiften är markerad som klar.' : ''}</div>`;
      statusSoon({ ex: id });
      const h = myHand();
      if (h && h.ex === id) { send('lower', { sid: me(), reason: 'solved' }); toast('Du löste den själv – handen är nere. Snyggt!'); }
      setTimeout(render, 1400);
    } else {
      store.progress.attempts[id] = (store.progress.attempts[id] || 0) + 1;
      save();
      const n = store.progress.attempts[id];
      fb.innerHTML = `<div class="feedback bad">Inte riktigt. ${n >= 2 ? 'Öppna nästa hjälpsteg eller visa AI-läraren din uträkning.' : 'Kolla din uträkning en gång till.'}</div>`;
    }
    return;
  }
  if (f.dataset.form === 'chat') {
    const q = f.q.value.trim();
    if (!q || busy) return;
    const id = f.dataset.ex;
    const { ex, ch } = findExercise(id);
    const chat = (store.chats[id] = store.chats[id] || []);
    chat.push({ role: 'user', content: q });
    f.q.value = '';
    const box = $('#msgs');
    box.insertAdjacentHTML('beforeend', `<div class="msg user">${md(q)}</div><div class="msg assistant" id="live-msg">…</div>`);
    box.scrollTop = box.scrollHeight;
    const out = $('#live-msg');
    busy = true;
    ask({ exercise: ex, chapter: ch, messages: chat, onText: (t) => { out.innerHTML = md(t); box.scrollTop = box.scrollHeight; } })
      .then((full) => { chat.push({ role: 'assistant', content: full }); })
      .catch((err) => { out.textContent = err.message; chat.pop(); })
      .finally(() => { busy = false; save(); out.removeAttribute('id'); renderMath(out); });
  }
}

export { uid };
