import { store, save, book, findExercise, upsert, remove, uid } from './store.js';
import { BOOK } from './content.js';
import { live, send, notifyWatch, watchTopic, connect } from './sync.js';
import { extractPage } from './tutor.js';
import { esc, md, renderMath, toast, modal, closeModal, $, dateBox, fmtDate, daysUntil, mins, clock, hhmm, qrSvg, youtubeId } from './ui.js';
import { render, go } from './app.js';

const CATS = { question: 'Förstår inte frågan', step: 'Fastnat på ett steg', check: 'Vill kolla lösning', other: 'Annat' };
const MOOD = { green: '😊', yellow: '🤔', red: '😣' };
let openEx = {};
let importPreview = null;
let sound = true;

const inSession = () => !!live.session && !live.config.ended;
const fresh = (ev) => ev.ts > Date.now() - 20000;
const joinLink = () => `${location.origin}${location.pathname}#/join/${store.classCode}`;

function lessonConfig(l) {
  return {
    lessonId: l.id, title: l.title, chapter: l.chapter, exercises: l.exercises, goal: l.goal, intro: l.intro,
    calc: l.calc, focus: !!l.focus, answerCheck: l.answerCheck !== false, ended: false,
    aiEndpoint: store.settings.aiEndpoint, watch: store.settings.watch,
  };
}

/* ---------- Vyer ---------- */
export function view(r) {
  switch (r.name) {
    case 'lektioner': return lessonsView();
    case 'lektion': return lessonEditor(r.arg);
    case 'prov': return testsView();
    case 'genomgangar': return videosView();
    case 'bok': return bookView();
    case 'installningar': return settingsView();
    default: return classroomView();
  }
}

function classroomView() {
  if (!inSession()) {
    const lessons = [...store.content.lessons].sort((a, b) => Math.abs(new Date(a.date) - Date.now()) - Math.abs(new Date(b.date) - Date.now()));
    const exits = live.config.ended ? live.exits : [];
    return `<h1>Klassrummet</h1><p class="muted">Starta en lektion så ansluter elevernas datorer automatiskt.</p>
      <div class="cols" style="margin-top:20px">
        <div class="ex-card"><h2>Starta lektion</h2>
          ${lessons.length ? `<form class="form" data-form="start" style="margin-top:14px">
            <label class="f">Lektion<select class="input" name="lesson">${lessons.map((l) => `<option value="${l.id}">${esc(l.title)} – ${fmtDate(l.date)}</option>`).join('')}</select></label>
            <div class="btns"><button class="btn dark" style="padding:13px 22px">▶ Starta lektionen</button><a class="btn ghost" href="#/lektion/ny">+ Ny lektion</a></div>
          </form>` : `<p class="muted">Du har inga lektioner ännu.</p><a class="btn dark" href="#/lektion/ny">+ Planera en lektion</a>`}
        </div>
        <div class="ex-card"><h2>Elever går med här</h2>
          <div style="display:flex;gap:16px;align-items:center;margin-top:12px;flex-wrap:wrap">
            <div style="width:140px;background:#fff;border-radius:12px;padding:6px">${qrSvg(joinLink())}</div>
            <div style="min-width:0;flex:1"><div class="muted small" style="font-weight:700">KLASSKOD</div><div style="font-size:28px;font-weight:900">${esc(store.classCode)}</div>
            <div class="kbd small" style="display:inline-block;margin-top:6px">${esc(joinLink())}</div></div>
          </div></div>
      </div>
      ${exits.length ? `<div class="section"><h2>Exit tickets från förra lektionen</h2>
        <div class="stats" style="margin:12px 0">${['green', 'yellow', 'red'].map((m) => `<div class="stat"><b>${exits.filter((e) => e.mood === m).length}</b><span>${MOOD[m]} ${m === 'green' ? 'fattade' : m === 'yellow' ? 'typ' : 'behöver mer hjälp'}</span></div>`).join('')}</div>
        <div class="list">${exits.filter((e) => e.hard).map((e) => `<div class="list-item"><b>${esc(e.name)}</b><span class="grow muted">${esc(e.hard)}</span>${MOOD[e.mood] || ''}</div>`).join('')}</div></div>` : ''}`;
  }

  const c = live.config;
  const q = live.queue;
  const students = Object.values(live.students);
  const away = students.filter((s) => s.away);
  const helpAvg = live.helpStats.length ? live.helpStats.reduce((a, b) => a + b.ms, 0) / live.helpStats.length : 0;
  const longest = q.length ? Date.now() - Math.min(...q.map((x) => x.ts)) : 0;
  const byEx = {};
  q.forEach((x) => { if (x.ex) (byEx[x.ex] = byEx[x.ex] || []).push(x); });
  const groups = Object.entries(byEx).filter(([, xs]) => xs.length >= 2).sort((a, b) => b[1].length - a[1].length);

  return `<div class="split"><div><div class="muted small" style="font-weight:700">● PÅGÅR · startade ${hhmm(live.sessionStart)}</div><h1>${esc(c.title || 'Lektion')}</h1></div>
      <div class="btns"><button class="btn ghost sm" data-act="announce">📣 Meddela klassen</button><button class="btn ghost sm" data-act="end">Avsluta lektion</button></div></div>
    <div class="ex-card" style="margin-top:16px;padding:16px 20px;display:flex;gap:18px;flex-wrap:wrap;align-items:center">
      <div><div class="muted small" style="font-weight:700;margin-bottom:4px">RÄKNARE</div><div class="seg">${[['off', 'Av'], ['basic', 'Enkel'], ['sci', 'Vetenskaplig']].map(([k, l]) => `<button data-act="calcmode" data-v="${k}" class="${c.calc === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <label class="check"><input type="checkbox" data-act="toggle" data-k="focus" ${c.focus ? 'checked' : ''}> Fokusläge (helskärm)</label>
      <label class="check"><input type="checkbox" data-act="toggle" data-k="answerCheck" ${c.answerCheck !== false ? 'checked' : ''}> Facitkoll</label>
      <label class="check"><input type="checkbox" data-act="sound" ${sound ? 'checked' : ''}> Ljud vid handuppräckning</label>
    </div>
    <div class="stats" style="margin-top:16px">
      <div class="stat"><b>${q.length}</b><span>✋ i kön</span></div>
      <div class="stat"><b data-since="${q.length ? Math.min(...q.map((x) => x.ts)) : 0}">${q.length ? mins(longest) : '–'}</b><span>längsta väntan</span></div>
      <div class="stat"><b>${helpAvg ? mins(helpAvg) : '–'}</b><span>snittid per hjälp</span></div>
      <div class="stat" style="${away.length ? 'background:var(--bad-bg)' : ''}"><b>${away.length}</b><span>utanför appen nu</span></div>
    </div>
    ${groups.map(([ex, xs]) => `<div class="group-banner" style="margin-top:16px"><div><b>${xs.length} elever</b> har fastnat på <b>${esc(ex)}</b> – ${xs.map((x) => esc(x.name.split(' ')[0])).join(', ')}</div>
      <button class="btn hand sm" data-act="group" data-ex="${esc(ex)}">Samla dem vid tavlan</button></div>`).join('')}
    <div class="cols" style="margin-top:20px">
      <div><div class="section-head"><h2>Kön</h2><span class="muted small">äldst först</span></div>
        <div class="list">${q.length ? q.map((x, i) => queueItem(x, i)).join('') : `<div class="empty">Ingen räcker upp handen just nu. 🎉</div>`}</div>
        ${live.peers.length ? `<div class="section" style="margin-top:24px"><h3>Kompishjälp</h3><div class="log" style="margin-top:8px">${live.peers.slice(0, 8).map((p) => `<div><time>${hhmm(p.ts)}</time>${esc(live.students[p.helper]?.name || '?')} hjälper ${esc(live.students[p.sid]?.name || '?')} med ${esc(p.ex || '')}</div>`).join('')}</div></div>` : ''}
      </div>
      <div style="display:grid;gap:20px">
        <div class="ex-card" style="padding:20px"><div class="split"><h3>Klassrummet</h3><span class="muted small">${students.length} anslutna</span></div>
          <div class="map" style="margin-top:12px">${seatMap(students)}</div>
          <div class="btns small muted" style="margin-top:10px;gap:12px"><span>🟨 hand uppe</span><span>🟥 utanför appen</span><span>🟩 bra</span><span>🟧 sådär</span></div></div>
        <div class="ex-card" style="padding:20px"><h3>Fokuslogg</h3><div class="log" style="margin-top:10px">${live.focusLog.length ? live.focusLog.slice(0, 20).map((f) => `<div><time>${hhmm(f.ts)}</time><span>${f.state === 'left' ? '🔴' : '🟢'} <b>${esc(f.name)}</b> ${f.state === 'left' ? esc(f.why || 'lämnade appen') : 'tillbaka'}</span></div>`).join('') : '<span class="muted small">Inga avvikelser.</span>'}</div></div>
        <div class="ex-card" style="padding:20px"><h3>Elever</h3><div class="log" style="margin-top:10px;max-height:340px">${students.sort((a, b) => (a.seat || 99) - (b.seat || 99)).map((s) => `<div style="justify-content:space-between"><span>${s.mood ? MOOD[s.mood] : '·'} <b>${esc(s.name)}</b> <span class="muted small">${s.seat ? 'bänk ' + esc(s.seat) : ''}</span></span><span class="muted small">${s.ex ? 'på ' + esc(s.ex) : ''} · ${(s.done || []).length} klara${s.awayCount ? ' · ⚠️' + s.awayCount : ''}</span></div>`).join('') || '<span class="muted small">Väntar på elever…</span>'}</div></div>
      </div>
    </div>`;
}

function queueItem(x, i) {
  const coming = live.coming[x.sid];
  const helping = live.helping?.sid === x.sid;
  const f = x.ex && findExercise(x.ex);
  const peers = Object.values(live.students).filter((s) => s.sid !== x.sid && s.helper && s.done?.includes(x.ex));
  return `<div class="q-item ${coming ? 'coming' : ''}">
    <div class="q-top"><span class="q-pos">${i + 1}</span><span class="q-name">${esc(x.name)}</span>
      ${x.seat ? `<span class="badge">Bänk ${esc(x.seat)}</span>` : ''}
      ${x.ex ? `<button class="badge" style="border:0;cursor:pointer" data-act="showex" data-ex="${esc(x.ex)}">Uppg ${esc(x.ex)} ▾</button>` : ''}
      <span class="badge hand">${esc(CATS[x.cat] || '')}</span>
      <span class="muted small" style="margin-left:auto">${helping ? `⏱ <b data-clock="${live.helping.since}">${clock(Date.now() - live.helping.since)}</b>` : `väntat <b data-since="${x.ts}">${mins(Date.now() - x.ts)}</b>`}</span></div>
    ${openEx[x.ex] && f ? `<div class="q-note">${md(f.ex.text)}<div class="muted small" style="margin-top:4px">Regel: ${esc(f.ex.rule?.name || '–')}</div></div>` : ''}
    ${x.note ? `<div class="q-note">💬 ${esc(x.note)}</div>` : ''}
    ${x.ai ? `<div class="q-note">🤖 Frågat AI: ${esc(x.ai)}</div>` : ''}
    ${x.tried ? `<div class="muted small">Har öppnat ${x.tried.hints} hjälpsteg · ${x.tried.attempts} felaktiga svar</div>` : ''}
    <div class="btns">${helping ? `<button class="btn ok sm" data-act="done" data-sid="${x.sid}">✓ Klar</button>` : `<button class="btn primary sm" data-act="coming" data-sid="${x.sid}">Jag kommer</button><button class="btn ghost sm" data-act="done" data-sid="${x.sid}">Klar</button>`}
      ${peers.slice(0, 2).map((p) => `<button class="btn ghost sm" data-act="peer" data-helper="${p.sid}" data-sid="${x.sid}" data-ex="${esc(x.ex)}">🤝 ${esc(p.name.split(' ')[0])} kan hjälpa</button>`).join('')}</div>
  </div>`;
}

function seatMap(students) {
  const bySeat = {};
  students.forEach((s) => { if (s.seat) bySeat[s.seat] = s; });
  const max = Math.max(30, ...Object.keys(bySeat).map(Number).filter(Boolean));
  const cells = [];
  for (let n = 1; n <= Math.ceil(max / 6) * 6; n++) {
    const s = bySeat[n];
    const hand = s && live.queue.some((q) => q.sid === s.sid);
    const cls = !s ? '' : s.away ? 'away' : hand ? 'hand' : s.mood || '';
    cells.push(`<div class="seat ${cls}" title="${s ? esc(s.name) : 'Bänk ' + n}">${s ? `<b>${esc(s.name.split(' ')[0])}</b>${hand ? '✋' : esc(s.ex || '')}` : n}</div>`);
  }
  const noSeat = students.filter((s) => !s.seat);
  return cells.join('') + (noSeat.length ? `<div class="small muted" style="grid-column:1/-1">Utan bänk: ${noSeat.map((s) => esc(s.name)).join(', ')}</div>` : '');
}

function lessonsView() {
  const ls = [...store.content.lessons].sort((a, b) => new Date(a.date) - new Date(b.date));
  return `<div class="split"><div><h1>Lektioner</h1><p class="muted">Planera uppgifter, räknare, fokusläge och genomgångar per lektion.</p></div><a class="btn dark" href="#/lektion/ny">+ Ny lektion</a></div>
    <div class="list" style="margin-top:20px">${ls.map((l) => {
      const ch = book().chapters.find((c) => c.id === l.chapter);
      return `<a class="list-item" href="#/lektion/${l.id}" style="text-decoration:none;color:inherit">${dateBox(l.date)}<div class="grow"><h3>${esc(l.title)}</h3>
        <div class="muted small">${fmtDate(l.date)} · ${ch ? esc(ch.title) : ''} · ${(l.exercises || []).length} uppgifter</div>
        <div class="btns" style="margin-top:6px"><span class="badge">${l.calc === 'off' ? 'Ingen räknare' : l.calc === 'sci' ? 'Vetenskaplig räknare' : 'Enkel räknare'}</span>${l.focus ? '<span class="badge">Fokusläge</span>' : ''}${l.answerCheck !== false ? '<span class="badge">Facitkoll</span>' : ''}</div></div><span>→</span></a>`;
    }).join('') || '<div class="empty">Inga lektioner ännu.</div>'}</div>`;
}

function toLocalInput(iso) {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function lessonEditor(id) {
  const l = store.content.lessons.find((x) => x.id === id) || { id: '', title: '', date: new Date().toISOString(), chapter: book().chapters[0]?.id, exercises: [], calc: 'basic', focus: true, answerCheck: true, goal: '', intro: '', videoIds: [] };
  return `<a href="#/lektioner" class="muted small" style="text-decoration:none;font-weight:700">← Lektioner</a>
    <h1 style="margin:10px 0 20px">${l.id ? 'Redigera lektion' : 'Ny lektion'}</h1>
    <form class="form ex-card" data-form="lesson" data-id="${esc(l.id)}">
      <div class="form two"><label class="f">Titel<input class="input" name="title" required value="${esc(l.title)}"></label>
        <label class="f">Datum och tid<input class="input" type="datetime-local" name="date" required value="${toLocalInput(l.date)}"></label></div>
      <div class="form two"><label class="f">Huvudkapitel<select class="input" name="chapter">${book().chapters.map((c) => `<option value="${c.id}" ${c.id === l.chapter ? 'selected' : ''}>${esc(c.id)}. ${esc(c.title)}</option>`).join('')}</select></label>
        <label class="f">Räknare<select class="input" name="calc">${[['off', 'Ingen räknare'], ['basic', 'Enkel räknare'], ['sci', 'Vetenskaplig räknare']].map(([k, t]) => `<option value="${k}" ${l.calc === k ? 'selected' : ''}>${t}</option>`).join('')}</select></label></div>
      <div class="btns" style="gap:20px"><label class="check"><input type="checkbox" name="focus" ${l.focus ? 'checked' : ''}> Fokusläge (helskärm, varning om eleven lämnar)</label>
        <label class="check"><input type="checkbox" name="answerCheck" ${l.answerCheck !== false ? 'checked' : ''}> Facitkoll (rätt/fel utan att visa svaret)</label></div>
      <label class="f">Mål för lektionen<input class="input" name="goal" value="${esc(l.goal)}" placeholder="Eleverna ska kunna…"></label>
      <label class="f">Instruktion till eleverna<textarea class="input" name="intro">${esc(l.intro)}</textarea></label>
      <div class="f"><b class="small">Uppgifter</b>${book().chapters.map((c) => `<details ${c.id === l.chapter || c.exercises.some((e) => l.exercises.includes(e.id)) ? 'open' : ''} style="margin-top:6px"><summary style="font-weight:700;cursor:pointer">${esc(c.id)}. ${esc(c.title)}</summary>
        <div class="btns" style="margin:8px 0 0 4px">${c.exercises.map((e) => `<label class="check small" style="background:var(--surface-2);padding:6px 10px;border-radius:999px"><input type="checkbox" name="ex" value="${esc(e.id)}" ${l.exercises.includes(e.id) ? 'checked' : ''}>${esc(e.id)}</label>`).join('')}</div></details>`).join('')}</div>
      ${store.content.videos.length ? `<div class="f"><b class="small">Genomgångar</b><div class="btns">${store.content.videos.map((v) => `<label class="check small" style="background:var(--surface-2);padding:6px 10px;border-radius:999px"><input type="checkbox" name="vid" value="${v.id}" ${(l.videoIds || []).includes(v.id) ? 'checked' : ''}>${esc(v.title)}</label>`).join('')}</div></div>` : ''}
      <div class="btns"><button class="btn dark" name="go" value="save">Spara</button><button class="btn primary" name="go" value="start">Spara och starta nu</button>
        ${l.id ? `<button type="button" class="btn ghost" data-act="dellesson" data-id="${l.id}">Ta bort</button>` : ''}</div>
    </form>`;
}

function testsView() {
  const ts = [...store.content.tests].sort((a, b) => new Date(a.date) - new Date(b.date));
  return `<div class="split"><div><h1>Prov</h1><p class="muted">Eleverna ser datum, innehåll, tips och övningslänkar.</p></div><button class="btn dark" data-act="edittest">+ Nytt prov</button></div>
    <div class="list" style="margin-top:20px">${ts.map((t) => `<div class="list-item">${dateBox(t.date)}<div class="grow"><h3>${esc(t.title)}</h3>
      <div class="muted small">${fmtDate(t.date)} · kapitel ${(t.chapters || []).join(', ')} · ${daysUntil(t.date) >= 0 ? 'om ' + daysUntil(t.date) + ' dagar' : 'har varit'}</div></div>
      <button class="btn sm ghost" data-act="edittest" data-id="${t.id}">Redigera</button></div>`).join('') || '<div class="empty">Inga prov inlagda.</div>'}</div>`;
}

function videosView() {
  const vs = store.content.videos;
  return `<div class="split"><div><h1>Genomgångar</h1><p class="muted">Lägg in YouTube-länkar eller videofiler per kapitel.</p></div><button class="btn dark" data-act="editvideo">+ Ny genomgång</button></div>
    <div class="list" style="margin-top:20px">${vs.map((v) => `<div class="list-item"><span style="font-size:24px">${youtubeId(v.url) || v.url ? '▶' : '○'}</span><div class="grow"><h3>${esc(v.title)}</h3>
      <div class="muted small">Kapitel ${esc(v.chapter)} · ${v.url ? esc(v.url) : 'ingen länk än'}</div></div><button class="btn sm ghost" data-act="editvideo" data-id="${v.id}">Redigera</button></div>`).join('') || '<div class="empty">Inga genomgångar.</div>'}</div>`;
}

function bookView() {
  const b = book();
  const n = b.chapters.reduce((a, c) => a + c.exercises.length, 0);
  return `<h1>Boken</h1><p class="muted">${esc(b.title)} · ${b.chapters.length} kapitel · ${n} uppgifter${store.content.book ? ' · <b>egen bok</b>' : ' · exempelbok'}</p>
    <div class="grid" style="margin-top:20px">
      <div class="ex-card"><h3>📷 Fotografera sidor</h3><p class="muted small">AI:n skriver av uppgifterna ordagrant, föreslår regel och ledtrådar. Kräver AI-adress och lärar-PIN i workern.</p>
        <input type="file" accept="image/*" capture="environment" multiple data-act="photo" class="input"></div>
      <div class="ex-card"><h3>📋 Klistra in text</h3><p class="muted small">Format: <span class="kbd"># 2 Procent</span> för kapitel, <span class="kbd">2134 Beräkna …</span> för uppgifter, <span class="kbd">Svar: 36</span>, <span class="kbd">Ledtråd: …</span>, <span class="kbd">Regel: Namn – text</span>.</p>
        <button class="btn ghost" data-act="paste">Klistra in…</button></div>
      <div class="ex-card"><h3>⬆️ Ladda upp / ⬇️ exportera</h3><p class="muted small">Exportera <span class="kbd">book.json</span> och lägg den i mappen <span class="kbd">data/</span> i repot – då får alla elever boken.</p>
        <div class="btns"><label class="btn ghost">Ladda upp JSON<input type="file" accept="application/json" data-act="uploadjson" hidden></label><button class="btn ghost" data-act="export">Exportera</button>${store.content.book ? '<button class="btn ghost" data-act="resetbook">Återställ exempelbok</button>' : ''}</div></div>
    </div>
    ${importPreview ? `<div class="section ex-card"><div class="split"><h2>Förhandsgranska import</h2><div class="btns"><button class="btn primary" data-act="applyimport">Lägg till i boken</button><button class="btn ghost" data-act="cancelimport">Avbryt</button></div></div>
      ${importPreview.chapters.map((c) => `<h3 style="margin-top:14px">${esc(c.id)}. ${esc(c.title)} <span class="muted small">(${c.exercises.length} uppgifter)</span></h3>
      <div class="ex-list" style="margin-top:8px">${c.exercises.map((e) => `<div class="ex-item"><span class="ex-num">${esc(e.id)}</span><span style="flex:1">${md(e.text)}</span><span class="badge">${e.answer?.length ? 'facit ✓' : 'inget facit'}</span></div>`).join('')}</div>`).join('')}</div>` : ''}
    <div class="section"><h2 style="margin-bottom:12px">Innehåll</h2><div class="list">${b.chapters.map((c) => `<div class="list-item"><span class="badge" style="background:${c.color};color:#fff">${esc(c.id)}</span><div class="grow"><b>${esc(c.title)}</b><div class="muted small">${c.exercises.map((e) => e.id).join(' · ')}</div></div></div>`).join('')}</div></div>
    <p class="muted small" style="margin-top:20px">Upphovsrätt: läs bara in material som skolan har licens för och använd det inom klassen. Fråga förlaget om digital användning om ni är osäkra.</p>`;
}

function settingsView() {
  const s = store.settings;
  const wt = watchTopic();
  const wurl = `${s.server.replace(/\/$/, '')}/${wt}`;
  return `<h1>Inställningar</h1>
    <div class="grid" style="margin-top:20px;grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">
      <div class="ex-card"><h2>⌚ Apple Watch</h2>
        <ol style="padding-left:20px;color:var(--ink-2)">
          <li>Installera appen <b>ntfy</b> från App Store på din iPhone.</li>
          <li>Tryck <b>+</b>, välj servern <span class="kbd">${esc(s.server.replace(/^https?:\/\//, ''))}</span> och prenumerera på kanalen nedan (eller skanna koden).</li>
          <li>Tillåt notiser. Klockan speglar iPhonens notiser automatiskt (Watch-appen → Notiser → ntfy).</li>
          <li>På klockan kan du trycka <b>Jag kommer</b> direkt i notisen – eleven ser det på sin skärm.</li>
        </ol>
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="width:120px;background:#fff;border-radius:12px;padding:6px">${qrSvg(wurl)}</div><div><div class="muted small" style="font-weight:700">KANAL</div><div class="kbd">${esc(wt)}</div></div></div>
        <div class="btns" style="margin-top:14px"><button class="btn dark" data-act="testwatch">Skicka testnotis</button></div>
        <div style="margin-top:16px;display:grid;gap:8px"><b class="small">Skicka till klockan när…</b>
          <label class="check"><input type="checkbox" data-act="watchpref" data-k="raise" ${s.watch.raise ? 'checked' : ''}> någon räcker upp handen</label>
          <label class="check"><input type="checkbox" data-act="watchpref" data-k="focus" ${s.watch.focus ? 'checked' : ''}> någon lämnar appen i fokusläge (efter 5 s)</label></div></div>
      <div class="ex-card"><h2>🤖 AI-läraren</h2><p class="muted small">Adress till er Cloudflare Worker (se <span class="kbd">worker/</span> i repot). Utan adress körs inbyggt hjälpläge med bokens ledtrådar.</p>
        <form class="form" data-form="settings"><label class="f">AI-adress<input class="input" name="ai" value="${esc(s.aiEndpoint)}" placeholder="https://fellan-matte-ai.namn.workers.dev"></label>
        <label class="f">Realtidsserver (ntfy)<input class="input" name="server" value="${esc(s.server)}"></label>
        <p class="muted small">ntfy.sh är gratis men har gränser per IP-adress. För en hel skola: kör en egen ntfy-server och skriv adressen här.</p>
        <button class="btn dark">Spara</button></form></div>
      <div class="ex-card"><h2>🏫 Klassen</h2><div class="muted small" style="font-weight:700">KLASSKOD</div><div style="font-size:26px;font-weight:900">${esc(store.classCode)}</div>
        <p class="muted small">Länk för eleverna:</p><div class="kbd">${esc(joinLink())}</div>
        <div class="btns" style="margin-top:14px"><button class="btn ghost" data-act="publishall">Skicka om allt innehåll till klassen</button><button class="btn ghost" data-act="logout">Logga ut</button></div></div>
    </div>`;
}

/* ---------- Efter rendering ---------- */
export function mount() {}

export function tick() {
  document.querySelectorAll('[data-since]').forEach((el) => { const t = +el.dataset.since; if (t) el.textContent = mins(Date.now() - t); });
  document.querySelectorAll('[data-clock]').forEach((el) => {
    const ms = Date.now() - +el.dataset.clock;
    el.textContent = clock(ms);
    el.style.color = ms > 5 * 60000 ? 'var(--bad)' : ms > 3 * 60000 ? 'var(--warn)' : '';
  });
}

let audio;
function ping() {
  if (!sound) return;
  try {
    audio = audio || new AudioContext();
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.15, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.4);
    o.connect(g).connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + 0.4);
  } catch { /* inget ljud */ }
}

export function onLive(ev) {
  if (!fresh(ev)) return;
  if (ev.t === 'raise') {
    ping();
    if (document.hidden && 'Notification' in window && Notification.permission === 'granted') new Notification(`✋ ${ev.name}`, { body: `${ev.ex ? 'Uppg ' + ev.ex : ''} ${CATS[ev.cat] || ''}` });
  }
  if (ev.t === 'focus' && ev.state === 'left') toast(`⚠️ ${ev.name} ${ev.why || 'lämnade appen'}`);
}

/* ---------- Klick ---------- */
function publish(kind, item) { send('content', { kind, item }); }

export function action(act, el) {
  const c = live.config;
  switch (act) {
    case 'calcmode': send('state', { config: { calc: el.dataset.v } }); break;
    case 'toggle': send('state', { config: { [el.dataset.k]: el.checked } }); break;
    case 'sound': sound = el.checked; break;
    case 'coming': send('coming', { sid: el.dataset.sid }); break;
    case 'done': send('done', { sid: el.dataset.sid }); break;
    case 'peer': send('peer', { helper: el.dataset.helper, sidFor: el.dataset.sid, ex: el.dataset.ex }); send('done', { sid: el.dataset.sid }); toast('Kompisen har fått en fråga om att hjälpa.'); break;
    case 'showex': openEx[el.dataset.ex] = !openEx[el.dataset.ex]; render(); break;
    case 'group': {
      const sids = live.queue.filter((q) => q.ex === el.dataset.ex).map((q) => q.sid);
      send('group', { ex: el.dataset.ex, sids, text: `Felix samlar alla som fastnat på ${el.dataset.ex} vid tavlan nu – ta med boken.` });
      toast('Gruppen är kallad – deras händer är nere.');
      break;
    }
    case 'announce': {
      const text = prompt('Meddelande till hela klassen:');
      if (text) send('announce', { text: text.slice(0, 200) });
      break;
    }
    case 'end': if (confirm('Avsluta lektionen? Eleverna får en exit ticket.')) send('end', {}); break;
    case 'dellesson': if (confirm('Ta bort lektionen?')) { remove('lessons', el.dataset.id); send('content', { kind: 'lessons', id: el.dataset.id, del: true }); go('#/lektioner'); } break;
    case 'edittest': testModal(el.dataset.id); break;
    case 'editvideo': videoModal(el.dataset.id); break;
    case 'testwatch': notifyWatch({ title: '✋ Testnotis från Fellan Matte', message: 'Så här ser det ut när någon räcker upp handen.', tags: ['raised_hand'] }).then(() => toast('Testnotis skickad.')); break;
    case 'watchpref':
      store.settings.watch[el.dataset.k] = el.checked;
      save();
      if (inSession()) send('state', { config: { watch: store.settings.watch } });
      break;
    case 'publishall':
      ['lessons', 'tests', 'videos'].forEach((k) => store.content[k].forEach((it) => publish(k, it)));
      toast('Innehållet är skickat till klassen.');
      break;
    case 'paste': pasteModal(); break;
    case 'export': {
      const blob = new Blob([JSON.stringify(book(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'book.json';
      a.click();
      break;
    }
    case 'resetbook': if (confirm('Återställa exempelboken?')) { store.content.book = null; save(); render(); } break;
    case 'applyimport': mergeBook(importPreview); importPreview = null; render(); toast('Boken är uppdaterad.'); break;
    case 'cancelimport': importPreview = null; render(); break;
    default: break;
  }
  void c;
}

// Filfält triggar change, inte click.
document.addEventListener('change', async (e) => {
  const el = e.target;
  if (store.role !== 'teacher') return;
  if (el.dataset.act === 'uploadjson' && el.files[0]) {
    try {
      const b = JSON.parse(await el.files[0].text());
      if (!b.chapters) throw new Error();
      importPreview = b;
      render();
    } catch { toast('Filen är inte en giltig book.json.'); }
  }
  if (el.dataset.act === 'photo' && el.files.length) {
    const files = [...el.files];
    const chapters = [];
    for (const [i, file] of files.entries()) {
      toast(`Läser sida ${i + 1} av ${files.length}…`, 60000);
      try {
        const res = await extractPage(file);
        let ch = chapters.find((c) => c.title === res.chapterTitle);
        if (!ch) { ch = { id: String(book().chapters.length + chapters.length + 1), title: res.chapterTitle || 'Nytt kapitel', theory: res.theory, color: pickColor(chapters.length), exercises: [] }; chapters.push(ch); }
        ch.exercises.push(...res.exercises.map((x) => ({ id: x.id, text: x.text, level: x.level, answer: x.answer ? [x.answer] : [], rule: { name: x.ruleName, text: x.ruleText }, hints: x.hints })));
      } catch (err) { toast(err.message, 6000); return; }
    }
    importPreview = { chapters };
    toast('Klart! Granska och lägg till.');
    render();
  }
});

const COLORS = ['#2f5bea', '#e2553a', '#13836f', '#8a4bd8', '#c98a00', '#d43d7a', '#0f7ea8'];
const pickColor = (i) => COLORS[(book().chapters.length + i) % COLORS.length];

function mergeBook(add) {
  const b = JSON.parse(JSON.stringify(store.content.book || BOOK));
  if (add.title) b.title = add.title;
  for (const ch of add.chapters) {
    const ex = b.chapters.find((c) => c.id === ch.id || c.title === ch.title);
    if (ex) {
      for (const e of ch.exercises) { const i = ex.exercises.findIndex((x) => x.id === e.id); if (i >= 0) ex.exercises[i] = e; else ex.exercises.push(e); }
    } else b.chapters.push({ color: pickColor(0), ...ch });
  }
  store.content.book = b;
  save();
}

function parseText(txt) {
  const chapters = [];
  let ch = null;
  let ex = null;
  for (const raw of txt.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    let m;
    if ((m = line.match(/^#+\s*(?:kapitel\s*)?(\d+)?[.:]?\s*(.*)$/i))) {
      ch = { id: m[1] || String(chapters.length + 1), title: m[2] || 'Kapitel ' + (m[1] || ''), color: pickColor(chapters.length), theory: '', exercises: [] };
      chapters.push(ch);
      ex = null;
    } else if ((m = line.match(/^svar\s*:\s*(.+)$/i)) && ex) ex.answer.push(...m[1].split(/\s*(?:;|eller)\s*/));
    else if ((m = line.match(/^ledtråd\s*:\s*(.+)$/i)) && ex) ex.hints.push(m[1]);
    else if ((m = line.match(/^regel\s*:\s*([^–-]+)[–-]\s*(.+)$/i)) && ex) ex.rule = { name: m[1].trim(), text: m[2] };
    else if ((m = line.match(/^teori\s*:\s*(.+)$/i)) && ch) ch.theory += m[1] + ' ';
    else if ((m = line.match(/^(\d{1,2}[.:]\d{1,3}|\d{3,4}[a-z]?)[.)]?\s+(.+)$/))) {
      if (!ch) { ch = { id: String(chapters.length + 1), title: 'Importerat', color: pickColor(0), theory: '', exercises: [] }; chapters.push(ch); }
      ex = { id: m[1].replace(':', '.'), text: m[2], level: 1, answer: [], hints: [] };
      ch.exercises.push(ex);
    } else if (ex) ex.text += ' ' + line;
    else if (ch) ch.theory += line + ' ';
  }
  return { chapters };
}

function pasteModal() {
  modal(`<h2>Klistra in uppgifter</h2><p class="muted small">Klistra in text från bokens digitala version eller skriv själv.</p>
    <form id="pasteform" class="form" style="margin-top:12px"><textarea class="input" name="t" style="min-height:260px" placeholder="# 2 Procent&#10;Teori: Procent betyder hundradelar.&#10;2101 Hur mycket är 15 % av 240 kr?&#10;Svar: 36&#10;Ledtråd: Skriv 15 % som decimaltal.&#10;Regel: Delen = andelen · det hela – multiplicera"></textarea>
    <div class="btns"><button class="btn primary">Förhandsgranska</button><button type="button" class="btn ghost" data-close>Avbryt</button></div></form>`, (el) => {
    $('#pasteform', el).addEventListener('submit', (e) => {
      e.preventDefault();
      importPreview = parseText(new FormData(e.target).get('t'));
      closeModal();
      render();
    });
  });
}

function testModal(id) {
  const t = store.content.tests.find((x) => x.id === id) || { id: '', title: '', date: new Date(Date.now() + 7 * 864e5).toISOString(), chapters: [], info: '', tips: [] };
  modal(`<h2>${t.id ? 'Redigera prov' : 'Nytt prov'}</h2>
    <form id="tform" class="form" style="margin-top:14px">
      <label class="f">Titel<input class="input" name="title" required value="${esc(t.title)}"></label>
      <label class="f">Datum och tid<input class="input" type="datetime-local" name="date" required value="${toLocalInput(t.date)}"></label>
      <div class="f"><b class="small">Kapitel</b><div class="btns">${book().chapters.map((c) => `<label class="check small"><input type="checkbox" name="ch" value="${c.id}" ${t.chapters.includes(c.id) ? 'checked' : ''}>${esc(c.id)}. ${esc(c.title)}</label>`).join('')}</div></div>
      <label class="f">Information<textarea class="input" name="info">${esc(t.info)}</textarea></label>
      <label class="f">Tips (ett per rad)<textarea class="input" name="tips">${esc((t.tips || []).join('\n'))}</textarea></label>
      <div class="btns"><button class="btn dark">Spara</button>${t.id ? '<button type="button" class="btn ghost" id="tdel">Ta bort</button>' : ''}<button type="button" class="btn ghost" data-close>Avbryt</button></div>
    </form>`, (el) => {
    $('#tdel', el)?.addEventListener('click', () => { remove('tests', t.id); send('content', { kind: 'tests', id: t.id, del: true }); closeModal(); render(); });
    $('#tform', el).addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const item = { id: t.id || uid('t'), title: fd.get('title'), date: new Date(fd.get('date')).toISOString(), chapters: fd.getAll('ch'), info: fd.get('info'), tips: String(fd.get('tips')).split('\n').map((x) => x.trim()).filter(Boolean) };
      upsert('tests', item);
      publish('tests', item);
      closeModal();
      render();
    });
  });
}

function videoModal(id) {
  const v = store.content.videos.find((x) => x.id === id) || { id: '', title: '', chapter: book().chapters[0]?.id, url: '', minutes: '' };
  modal(`<h2>${v.id ? 'Redigera genomgång' : 'Ny genomgång'}</h2>
    <form id="vform" class="form" style="margin-top:14px">
      <label class="f">Titel<input class="input" name="title" required value="${esc(v.title)}"></label>
      <label class="f">Länk (YouTube eller videofil)<input class="input" name="url" value="${esc(v.url)}" placeholder="https://youtu.be/…"></label>
      <div class="form two"><label class="f">Kapitel<select class="input" name="chapter">${book().chapters.map((c) => `<option value="${c.id}" ${c.id === v.chapter ? 'selected' : ''}>${esc(c.id)}. ${esc(c.title)}</option>`).join('')}</select></label>
      <label class="f">Längd (min)<input class="input" name="minutes" type="number" min="1" value="${esc(v.minutes)}"></label></div>
      <div class="btns"><button class="btn dark">Spara</button>${v.id ? '<button type="button" class="btn ghost" id="vdel">Ta bort</button>' : ''}<button type="button" class="btn ghost" data-close>Avbryt</button></div>
    </form>`, (el) => {
    $('#vdel', el)?.addEventListener('click', () => { remove('videos', v.id); send('content', { kind: 'videos', id: v.id, del: true }); closeModal(); render(); });
    $('#vform', el).addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const item = { id: v.id || uid('v'), title: fd.get('title'), url: fd.get('url'), chapter: fd.get('chapter'), minutes: +fd.get('minutes') || null };
      upsert('videos', item);
      publish('videos', item);
      closeModal();
      render();
    });
  });
}

/* ---------- Formulär ---------- */
export function submit(f, e) {
  const fd = new FormData(f);
  if (f.dataset.form === 'start') {
    const l = store.content.lessons.find((x) => x.id === fd.get('lesson'));
    if (l) startLesson(l);
  } else if (f.dataset.form === 'lesson') {
    const item = {
      id: f.dataset.id || uid('l'), title: fd.get('title'), date: new Date(fd.get('date')).toISOString(), chapter: fd.get('chapter'),
      exercises: fd.getAll('ex'), calc: fd.get('calc'), focus: !!fd.get('focus'), answerCheck: !!fd.get('answerCheck'),
      goal: fd.get('goal'), intro: fd.get('intro'), videoIds: fd.getAll('vid'),
    };
    upsert('lessons', item);
    publish('lessons', item);
    const start = (e?.submitter || document.activeElement)?.value === 'start';
    if (start) startLesson(item); else { toast('Lektionen är sparad.'); go('#/lektioner'); }
  } else if (f.dataset.form === 'settings') {
    store.settings.aiEndpoint = String(fd.get('ai')).trim();
    const server = String(fd.get('server')).trim() || 'https://ntfy.sh';
    const changed = server !== store.settings.server;
    store.settings.server = server;
    save();
    if (changed) connect();
    if (inSession()) send('state', { config: { aiEndpoint: store.settings.aiEndpoint } });
    toast('Sparat.');
  }
}

function startLesson(l) {
  send('start', { session: uid('s'), config: lessonConfig(l) });
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  go('#/');
}

export { renderMath };
