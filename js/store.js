import { BOOK, DEFAULTS } from './content.js';

const KEY = 'fellan-matte-v1';

const initial = () => ({
  role: null, // 'student' | 'teacher'
  profile: { sid: 's' + Math.random().toString(36).slice(2, 10), name: '', seat: '' },
  classCode: '',
  teacherPin: '',
  settings: {
    server: 'https://ntfy.sh',
    aiEndpoint: '',
    watch: { raise: true, focus: true, stuck: false },
  },
  content: { lessons: DEFAULTS.lessons, tests: DEFAULTS.tests, videos: DEFAULTS.videos, book: null },
  progress: { done: {}, attempts: {}, hintsUsed: {}, lastEx: null },
  chats: {},
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial();
    const s = JSON.parse(raw);
    const base = initial();
    return { ...base, ...s, settings: { ...base.settings, ...s.settings, watch: { ...base.settings.watch, ...(s.settings?.watch || {}) } }, content: { ...base.content, ...s.content }, progress: { ...base.progress, ...s.progress } };
  } catch {
    return initial();
  }
}

export const store = load();

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* privat läge */ }
}

export function resetAll() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  location.href = location.pathname;
}

export function book() {
  return store.content.book || BOOK;
}

export function findExercise(id) {
  for (const ch of book().chapters) {
    const ex = ch.exercises.find((e) => e.id === id);
    if (ex) return { ex, ch };
  }
  return null;
}

export function upsert(kind, item) {
  const list = store.content[kind];
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list[i] = item; else list.push(item);
  save();
}

export function remove(kind, id) {
  store.content[kind] = store.content[kind].filter((x) => x.id !== id);
  save();
}

export const uid = (p = 'id') => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
