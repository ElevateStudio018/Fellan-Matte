import { store, save, book, resetAll } from './store.js';
import { BOOK } from './content.js';
import { connect, onEvent, onNet, net, live, send } from './sync.js';
import { initFocus, needsLock, enterFullscreen, focusWanted } from './focus.js';
import { esc, renderMath, calculator, closeCalculator, toast, $ } from './ui.js';
import * as S from './student.js';
import * as T from './teacher.js';

const app = $('#app');

export const go = (hash) => { if (location.hash === hash) render(); else location.hash = hash; };

const STUDENT_NAV = [
  ['#/', 'Hem', '⌂'], ['#/bok', 'Boken', '▤'], ['#/ai', 'AI-läraren', '✦'], ['#/genomgangar', 'Genomgångar', '▶'], ['#/prov', 'Prov', '◷'],
];
const TEACHER_NAV = [
  ['#/', 'Klassrum', '◉'], ['#/lektioner', 'Lektioner', '▤'], ['#/prov', 'Prov', '◷'], ['#/genomgangar', 'Genomgångar', '▶'], ['#/bok', 'Boken', '✎'], ['#/installningar', 'Inställningar', '⚙'],
];

function route() {
  const parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
  return { name: parts[0] || '', arg: decodeURIComponent(parts[1] || '') };
}

export const calcMode = () => (store.role === 'teacher' ? 'sci' : live.session && !live.config.ended ? live.config.calc : 'basic');

function header(r) {
  const nav = store.role === 'teacher' ? TEACHER_NAV : STUDENT_NAV;
  const cur = '#/' + r.name;
  const isOn = (h) => (h === '#/' ? r.name === '' : cur.startsWith(h));
  const calc = calcMode();
  const right = store.role === 'teacher'
    ? `<button class="icon-btn" data-act="calc" title="Räknare">±</button><span class="icon-btn" title="Anslutning"><i class="net-dot ${net.status}"></i>${esc(store.classCode)}</span>`
    : `${calc !== 'off' ? '<button class="icon-btn" data-act="calc" title="Räknare">±</button>' : ''}
       <span class="icon-btn" title="Anslutning"><i class="net-dot ${net.status}"></i>${esc(store.profile.name.split(' ')[0])}</span>
       ${S.handButton()}`;
  return `<header class="bar"><div class="bar-in">
      <a class="logo" href="#/"><span class="logo-mark">F</span><span class="txt">Fellan Matte</span></a>
      <nav class="nav">${nav.map(([h, l]) => `<a href="${h}" class="${isOn(h) ? 'on' : ''}">${l}</a>`).join('')}</nav>
      <div class="bar-right">${right}</div>
    </div></header>
    <nav class="tabbar">${nav.slice(0, 5).map(([h, l, i]) => `<a href="${h}" class="${isOn(h) ? 'on' : ''}"><span class="ico">${i}</span>${l}</a>`).join('')}</nav>`;
}

function lockScreen() {
  return `<div class="lock"><div>
    <div class="logo-mark" style="margin:0 auto 18px;width:56px;height:56px;font-size:30px;border-radius:16px">F</div>
    <h1>Fokusläge</h1>
    <p>${esc(live.config.title || 'Lektionen')} pågår i helskärm. Om du lämnar appen ser Felix det direkt.</p>
    <button class="btn hand" data-act="fullscreen" style="font-size:18px;padding:14px 28px">Fortsätt i helskärm</button>
  </div></div>`;
}

export function render() {
  const r = route();
  if (!store.role) { app.innerHTML = S.loginView(r); bindCommon(); return; }
  if (focusWanted() && needsLock()) { app.innerHTML = lockScreen(); bindCommon(); return; }
  const view = store.role === 'teacher' ? T.view(r) : S.view(r);
  app.innerHTML = header(r) + `<main>${view}</main>`;
  renderMath(app);
  bindCommon();
  (store.role === 'teacher' ? T.mount : S.mount)(r);
}

function bindCommon() {
  app.onclick = (e) => {
    const a = e.target.closest('[data-act]');
    if (!a) return;
    const act = a.dataset.act;
    if (act === 'calc') calculator(calcMode());
    else if (act === 'fullscreen') enterFullscreen();
    else if (act === 'logout') { if (confirm('Logga ut från den här datorn?')) resetAll(); }
    else (store.role === 'teacher' ? T.action : S.action)(act, a, e);
  };
  app.onsubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    if (!store.role) S.login(f); else (store.role === 'teacher' ? T.submit : S.submit)(f, e);
  };
}

// Uppdatera bara om användaren inte skriver i ett fält.
let pending = false;
export function softRender() {
  const ae = document.activeElement;
  if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && app.contains(ae)) { pending = true; return; }
  render();
}
document.addEventListener('focusout', () => { if (pending) { pending = false; setTimeout(softRender, 50); } });

async function boot() {
  // Klassens egen bok (data/book.json) ersätter exempelboken om den finns.
  try {
    const res = await fetch('data/book.json', { cache: 'no-cache' });
    if (res.ok) { const b = await res.json(); if (b?.chapters?.length) Object.assign(BOOK, b); }
  } catch { /* ingen egen bok */ }

  const join = location.hash.match(/^#\/join\/([\w-]+)/);
  if (join && store.role !== 'teacher') { store.pendingCode = join[1]; }

  window.addEventListener('hashchange', () => { closeCalculator(); render(); window.scrollTo(0, 0); });
  onNet(() => { const d = $('.net-dot'); if (d) d.className = 'net-dot ' + net.status; });
  onEvent((ev) => {
    if (store.role === 'student') S.onLive(ev); else if (store.role === 'teacher') T.onLive(ev);
    softRender();
  });
  initFocus(() => softRender());
  if (store.role) connect();
  render();
  setInterval(() => { if (store.role === 'teacher') T.tick(); else if (store.role === 'student') S.tick(); }, 1000);
}

export function startSession() { save(); connect(); }
export { book, send, toast };

boot();
