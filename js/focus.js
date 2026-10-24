// Fokusläge: helskärm + rapport till läraren när eleven lämnar appen.
// En webbsida kan inte helt låsa datorn, men den kan märka varje gång eleven
// byter flik, minimerar eller lämnar helskärm – och säga till direkt.
import { store } from './store.js';
import { live, send, notifyWatch } from './sync.js';

let active = false;
let awaySince = 0;
let watchTimer = null;
let onChange = () => {};

const isFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement);

export const focusWanted = () => store.role === 'student' && live.session && live.config.focus && !live.config.ended;
export const needsLock = () => focusWanted() && (!isFs() || document.hidden);

export async function enterFullscreen() {
  const el = document.documentElement;
  try {
    if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  } catch { /* t.ex. iPhone utan stöd */ }
  back();
  onChange();
}

function left(why) {
  if (!focusWanted() || awaySince) return;
  awaySince = Date.now();
  const { name, seat } = store.profile;
  send('focus', { sid: store.profile.sid, name, seat, state: 'left', why });
  clearTimeout(watchTimer);
  // Bara klocknotis om eleven är borta mer än 5 sekunder.
  watchTimer = setTimeout(() => {
    if (awaySince && live.config.watch?.focus !== false) {
      notifyWatch({ title: `${name} lämnade appen`, message: `${seat ? 'Bänk ' + seat + ' · ' : ''}${why}`, tags: ['warning'], priority: 3 });
    }
  }, 5000);
  onChange();
}

function back() {
  if (!awaySince) return;
  const dur = Date.now() - awaySince;
  awaySince = 0;
  clearTimeout(watchTimer);
  send('focus', { sid: store.profile.sid, name: store.profile.name, seat: store.profile.seat, state: 'back', dur });
  onChange();
}

export function initFocus(changed) {
  onChange = changed;
  if (active) return;
  active = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) left('bytte flik eller app');
    else if (isFs()) back();
    onChange();
  });
  const fsChange = () => {
    if (!isFs()) left('lämnade helskärm');
    else back();
    onChange();
  };
  document.addEventListener('fullscreenchange', fsChange);
  document.addEventListener('webkitfullscreenchange', fsChange);
  window.addEventListener('blur', () => {
    // Klick i en inbäddad video räknas inte.
    setTimeout(() => {
      if (document.activeElement?.tagName === 'IFRAME') return;
      if (!document.hasFocus()) left('klickade utanför appen');
    }, 300);
  });
  window.addEventListener('focus', () => { if (isFs() && !document.hidden) back(); });
}
