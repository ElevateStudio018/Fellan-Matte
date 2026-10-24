// Realtid via ntfy (https://ntfy.sh eller egen server). Samma kanal används av
// lärarens iPhone-app → Apple Watch. BroadcastChannel gör att demo i två flikar
// i samma webbläsare fungerar även utan nätverk.
import { store } from './store.js';

const listeners = new Set();
const seen = new Set();
let es = null;
let lastId = 'all';
let bc = null;
export const net = { status: 'offline' };

const topics = () => {
  const c = store.classCode;
  return { data: c, teacher: c + '-l', watch: c + '-klocka' };
};

export function newState() {
  return {
    session: null, sessionStart: 0,
    config: { lessonId: null, title: '', calc: 'basic', focus: false, answerCheck: true },
    students: {}, queue: [], helping: null, coming: {}, groups: [], announcements: [],
    focusLog: [], peers: [], helpStats: [], contentUpdates: [], exits: [],
  };
}
export const live = newState();

function student(sid, ev) {
  const s = live.students[sid] || (live.students[sid] = { sid, name: '', seat: '', ex: null, mood: null, away: false, awaySince: 0, awayCount: 0, awayTotal: 0, lastSeen: 0, helper: false, done: [] });
  if (ev.name) s.name = ev.name;
  if (ev.seat !== undefined && ev.seat !== '') s.seat = ev.seat;
  s.lastSeen = Math.max(s.lastSeen, ev.ts || 0);
  return s;
}

function reduce(ev) {
  const sid = ev.sid;
  switch (ev.t) {
    case 'start': {
      const keepContent = live.contentUpdates;
      Object.assign(live, newState(), { session: ev.session, sessionStart: ev.ts, config: { ...live.config, ...ev.config }, contentUpdates: keepContent });
      break;
    }
    case 'state': live.config = { ...live.config, ...ev.config }; break;
    case 'end': live.config = { ...live.config, ended: true }; live.queue = []; live.helping = null; break;
    case 'hello': student(sid, ev); break;
    case 'status': {
      const s = student(sid, ev);
      if (ev.ex !== undefined) s.ex = ev.ex;
      if (ev.mood !== undefined) s.mood = ev.mood;
      if (ev.done) s.done = ev.done;
      if (ev.helper !== undefined) s.helper = ev.helper;
      break;
    }
    case 'raise': {
      student(sid, ev);
      const prev = live.queue.find((q) => q.sid === sid);
      const item = { sid, name: ev.name, seat: ev.seat, ex: ev.ex, cat: ev.cat, note: ev.note, ai: ev.ai, tried: ev.tried, ts: prev ? prev.ts : ev.ts };
      live.queue = live.queue.filter((q) => q.sid !== sid).concat(item).sort((a, b) => a.ts - b.ts);
      break;
    }
    case 'lower':
      live.queue = live.queue.filter((q) => q.sid !== sid);
      delete live.coming[sid];
      if (live.helping?.sid === sid) live.helping = null;
      break;
    case 'coming': live.coming[sid] = ev.ts; live.helping = { sid, since: ev.ts }; break;
    case 'done': {
      const q = live.queue.find((x) => x.sid === sid);
      if (live.helping?.sid === sid) live.helpStats.push({ sid, ms: ev.ts - live.helping.since, ex: q?.ex });
      live.queue = live.queue.filter((x) => x.sid !== sid);
      delete live.coming[sid];
      if (live.helping?.sid === sid) live.helping = null;
      break;
    }
    case 'focus': {
      const s = student(sid, ev);
      if (ev.state === 'left') { s.away = true; s.awaySince = ev.ts; s.awayCount++; }
      else { if (s.away) s.awayTotal += ev.ts - s.awaySince; s.away = false; }
      live.focusLog.unshift({ sid, name: s.name, seat: s.seat, state: ev.state, ts: ev.ts, why: ev.why });
      live.focusLog = live.focusLog.slice(0, 60);
      break;
    }
    case 'group':
      live.groups.unshift({ ex: ev.ex, sids: ev.sids, text: ev.text, ts: ev.ts });
      live.queue = live.queue.filter((q) => !ev.sids.includes(q.sid));
      break;
    case 'announce': live.announcements.unshift({ text: ev.text, ts: ev.ts }); break;
    case 'peer': live.peers.unshift({ helper: ev.helper, sid: ev.sidFor, ex: ev.ex, ts: ev.ts }); break;
    case 'content': live.contentUpdates.push(ev); break;
    case 'exit': live.exits = live.exits.filter((x) => x.sid !== sid).concat({ sid, name: ev.name, mood: ev.mood, hard: ev.hard, ts: ev.ts }); break;
    default: break;
  }
}

function handle(ev, fromNet) {
  if (!ev || !ev.eid || seen.has(ev.eid)) return;
  seen.add(ev.eid);
  reduce(ev);
  listeners.forEach((fn) => fn(ev, fromNet));
}

export function onEvent(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function connect() {
  disconnect();
  if (!store.classCode) return;
  const t = topics();
  try {
    bc = new BroadcastChannel('fellan-' + store.classCode);
    bc.onmessage = (m) => handle(m.data, false);
  } catch { /* stöds inte */ }
  const open = () => {
    const since = lastId === 'all' ? '12h' : lastId;
    const url = `${store.settings.server.replace(/\/$/, '')}/${t.data},${t.teacher}/sse?since=${encodeURIComponent(since)}`;
    es = new EventSource(url);
    net.status = 'connecting';
    notifyNet();
    es.onopen = () => { net.status = 'online'; notifyNet(); };
    es.onmessage = (m) => {
      try {
        const msg = JSON.parse(m.data);
        if (msg.event !== 'message') return;
        lastId = msg.id;
        const ev = JSON.parse(msg.message);
        if (!ev.ts) ev.ts = msg.time * 1000;
        handle(ev, true);
      } catch { /* inte vårt format */ }
    };
    es.onerror = () => {
      net.status = 'offline';
      notifyNet();
      es.close();
      setTimeout(open, 4000);
    };
  };
  open();
}

export function disconnect() {
  if (es) { es.onerror = null; es.close(); es = null; }
  if (bc) { bc.close(); bc = null; }
}

const netListeners = new Set();
export const onNet = (fn) => netListeners.add(fn);
const notifyNet = () => netListeners.forEach((fn) => fn(net.status));

// Skicka en händelse. Elever skickar på data-kanalen, läraren på lärarkanalen.
export async function send(t, payload = {}) {
  const ev = { t, ...payload, eid: Math.random().toString(36).slice(2) + Date.now().toString(36), ts: Date.now() };
  handle(ev, false);
  try { bc?.postMessage(ev); } catch { /* ignore */ }
  const tp = topics();
  const topic = store.role === 'teacher' ? tp.teacher : tp.data;
  try {
    await fetch(store.settings.server.replace(/\/$/, '') + '/', {
      method: 'POST',
      body: JSON.stringify({ topic, message: JSON.stringify(ev) }),
    });
  } catch { /* offline – BroadcastChannel tar det lokalt */ }
  return ev;
}

// Notis till lärarens klocka (ntfy-appen på iPhone speglas till Apple Watch).
export async function notifyWatch({ title, message, tags = [], priority = 4, comingFor }) {
  const tp = topics();
  const server = store.settings.server.replace(/\/$/, '');
  const body = { topic: tp.watch, title, message, tags, priority };
  if (comingFor) {
    const ev = { t: 'coming', sid: comingFor, eid: 'w' + Math.random().toString(36).slice(2), ts: 0 };
    body.actions = [{
      action: 'http', label: 'Jag kommer', url: server + '/', method: 'POST', clear: true,
      body: JSON.stringify({ topic: tp.teacher, message: JSON.stringify(ev) }),
    }];
  }
  try { await fetch(server + '/', { method: 'POST', body: JSON.stringify(body) }); } catch { /* offline */ }
}

export const watchTopic = () => topics().watch;
