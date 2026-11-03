// AI-läraren – klient. Anropar den hemliga AI-servern (worker/) och har ett
// inbyggt hjälpläge som bygger på bokens ledtrådar när ingen AI-adress finns.
import { store, book } from './store.js';
import { guardReply, HINT_LEVELS, clampHint } from '../shared/tutor-core.js';

export const hasAI = () => !!store.settings.aiEndpoint;

const endpoint = (path) => store.settings.aiEndpoint.replace(/\/$/, '') + path;
const headers = () => ({ 'content-type': 'application/json', 'x-class-code': store.classCode || '' });

/**
 * Ställer en fråga till AI-läraren och strömmar svaret.
 * mode: exercise | chapter | talk | stuck | quiz
 */
export async function ask({ mode = 'exercise', exercise = {}, chapter = {}, messages = [], onText, hintLevel = 1, explain = '', memory = {}, image = null, quiz = null, signal }) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  if (!hasAI()) return offline({ mode, exercise, chapter, messages, onText, hintLevel, explain });
  const res = await fetch(endpoint('/chat'), {
    method: 'POST',
    headers: headers(),
    signal,
    body: JSON.stringify({
      mode,
      exercise: { id: exercise.id, text: exercise.text, rule: exercise.rule, level: exercise.level, hints: exercise.hints, answer: exercise.answer },
      chapter: {
        id: chapter.id,
        title: chapter.title,
        theory: chapter.theory,
        exercises: (chapter.exercises || []).slice(0, 30).map((e) => ({ id: e.id, text: e.text, level: e.level })),
      },
      hintLevel: clampHint(hintLevel),
      explain,
      memory,
      quiz,
      image,
      studentText: lastUser,
      messages: messages.slice(-16).map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok || !res.body) throw new Error('AI-läraren svarar inte just nu (' + res.status + ').');
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let full = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const parts = buf.split('\n\n');
    buf = parts.pop();
    for (const p of parts) {
      const line = p.split('\n').find((l) => l.startsWith('data:'));
      if (!line) continue;
      let data;
      try { data = JSON.parse(line.slice(5)); } catch { continue; }
      if (data.replace) { full = data.replace; onText(full); }
      else if (data.text) { full += data.text; onText(full); }
      if (data.error) throw new Error(data.error);
    }
  }
  // Klientens eget svarsskydd: om servern inte hunnit stoppa ett avslöjat svar.
  const checked = guardReply(full, exercise, lastUser);
  if (checked.blocked) onText(checked.text);
  return checked.text;
}

/** Hämtar en ny förhörsfråga. Faller tillbaka på bokens uppgifter. */
export async function fetchQuiz({ chapterId, chapter, difficulty = 1, avoid = [], memory = {}, recent = [], moment = null }) {
  if (hasAI()) {
    try {
      const res = await fetch(endpoint('/quiz'), {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ chapterId, chapter: chapterPayload(chapter), difficulty, avoid, memory, recent, moment }),
      });
      if (res.ok) {
        const q = await res.json();
        if (q?.question && q?.answer) return { ...q, local: false };
      }
    } catch { /* faller tillbaka nedan */ }
  }
  return localQuiz({ chapterId, difficulty, avoid, moment });
}

const chapterPayload = (chapter) => (chapter ? {
  id: chapter.id,
  title: chapter.title,
  theory: chapter.theory,
  exercises: (chapter.exercises || []).slice(0, 30).map((e) => ({ id: e.id, text: e.text, level: e.level })),
} : null);

/** Förhörsfråga från boken – används utan AI och som reserv. */
export function localQuiz({ chapterId, difficulty = 1, avoid = [], moment = null }) {
  const chapters = book().chapters;
  const pool = [];
  for (const ch of chapters) {
    if (chapterId && ch.id !== chapterId) continue;
    for (const ex of ch.exercises) {
      if (!ex.answer?.length) continue;
      pool.push({ ch, ex });
    }
  }
  if (!pool.length) return null;
  const taken = new Set(avoid);
  const sameMoment = moment?.ruleName ? pool.filter((p) => p.ex.rule?.name === moment.ruleName) : [];
  const base = sameMoment.length ? sameMoment : pool;
  const byLevel = base.filter((p) => p.ex.level === difficulty);
  const near = base.filter((p) => Math.abs((p.ex.level || 1) - difficulty) <= 1);
  const candidates = (byLevel.length ? byLevel : near.length ? near : base).filter((p) => !taken.has(p.ex.id) && !taken.has(p.ex.text));
  const list = candidates.length ? candidates : pool;
  const pick = list[Math.floor(Math.random() * list.length)];
  const { ch, ex } = pick;
  return {
    question: ex.text,
    answer: ex.answer[0],
    hints: ex.hints || [],
    ruleName: ex.rule?.name || ch.title,
    ruleText: ex.rule?.text || ch.theory || '',
    explanation: '',
    difficulty: ex.level || difficulty,
    tolerance: ex.tolerance,
    kind: ex.kind,
    exerciseId: ex.id,
    chapterId: ch.id,
    chapterTitle: ch.title,
    local: true,
  };
}

/* ---------------- Inbyggt hjälpläge (utan AI) ---------------- */

const ASK_FOR_ANSWER = /(ge mig|bara)?\s*(svaret|facit|lösningen|hela lösningen|rätt svar)|lös den åt mig|skriv hela|orkar inte|vad blir (det|resultatet)|säg svaret/i;

const CHAPTER_HINTS = [
  { keys: /procent|rabatt|förändringsfaktor|hur mycket är \d+\s*%/, chapter: '2', q: 'Vad är det hela, och vilken andel letar du efter?' },
  { keys: /ekvation|x\s*\+|=|lös ut|vågprincip/, chapter: '3', q: 'Vad behöver du göra på båda sidor för att få x ensamt?' },
  { keys: /bråk|nämnare|täljare|förläng|förkorta/, chapter: '1', q: 'Vilken gemensam nämnare kan båda bråken få?' },
  { keys: /prioriter|parentes|räkneordning|potens/, chapter: '1', q: 'Vad ska räknas först – parentes, potens eller gånger?' },
  { keys: /negativt tal|negativa tal|minus gånger|teckenregel/, chapter: '1', q: 'Har talen lika eller olika tecken? Vad säger teckenregeln då?' },
  { keys: /pythagoras|hypotenusa|katet/, chapter: '4', q: 'Vilken sida är hypotenusan, och vilka är kateter?' },
  { keys: /area|omkrets|triangel|rektangel|cirkel|radie|volym/, chapter: '4', q: 'Vilken formel hör till figuren – och vilka mått ska in i den?' },
  { keys: /vinkel/, chapter: '4', q: 'Hur stor är vinkelsumman i figuren du räknar på?' },
  { keys: /funktion|lutning|y\s*=|f\(x\)|linjär/, chapter: '5', q: 'Vad betyder k respektive m i y = kx + m?' },
  { keys: /sannolikhet|chans/, chapter: '', q: 'Hur många gynnsamma utfall finns det, och hur många utfall finns det totalt?' },
];

async function typeOut(text, onText) {
  let shown = '';
  for (const word of text.split(/(\s+)/)) {
    shown += word;
    onText(shown);
    await new Promise((r) => setTimeout(r, 10));
  }
  return text;
}

const offlineNote = '\n\n_Inbyggt hjälpläge. Läraren kan koppla på AI under Inställningar._';

function findChapter(text) {
  const hit = CHAPTER_HINTS.find((h) => h.keys.test(text));
  return hit ? { hint: hit, chapter: book().chapters.find((c) => c.id === hit.chapter) } : null;
}

async function offline({ mode, exercise, chapter, messages, onText, hintLevel = 1, explain = '' }) {
  const last = ([...messages].reverse().find((m) => m.role === 'user')?.content || '').toLowerCase();
  const level = clampHint(hintLevel);
  const hints = exercise?.hints || [];
  const ch = chapter?.exercises?.length ? chapter : book().chapters.find((c) => c.id === chapter?.id) || null;
  let out;

  if (ASK_FOR_ANSWER.test(last) && mode !== 'talk') {
    out = `${redirectFor(exercise)}${offlineNote}`;
  } else if (mode === 'talk' || (!exercise?.text && mode === 'chapter')) {
    const found = findChapter(last);
    if (found?.chapter) {
      const c = found.chapter;
      out = `**${c.id}. ${c.title}** – så säger boken:\n\n${c.theory}\n\n${found.hint.q} Vill du att vi tar ett exempel med andra tal?${offlineNote}`;
    } else if (mode === 'talk') {
      out = `I det inbyggda hjälpläget kan jag bara utgå från bokens kapitel. Välj ett kapitel – till exempel ${book().chapters.slice(0, 3).map((c) => `**${c.id}. ${c.title}**`).join(', ')} – så hjälper jag dig vidare därifrån. Ställer du en fråga om något av kapitlen svarar jag med bokens regel och en fråga tillbaka.${offlineNote}`;
    } else {
      out = `Välj ett moment i kapitlet först, så hjälper jag dig steg för steg.${offlineNote}`;
    }
  } else if (explain === 'metod' || explain === 'visuell') {
    out = `**Regeln: ${exercise?.rule?.name || 'se teorin'}**\n\n${exercise?.rule?.text || ''}\n\n${visuellFor(exercise)}Vilket tal i din uppgift sätter du in först?${offlineNote}`;
  } else if (explain === 'vardag') {
    out = `Tänk dig att du delar en pizza eller handlar med rabatt – samma räknesätt som i uppgiften.\n\n**Regeln att luta sig mot:** ${exercise?.rule?.name || 'se teorin'} – ${exercise?.rule?.text || ''}\n\nVar i din uppgift ser du samma situation?${offlineNote}`;
  } else if (level >= 3 && exercise?.example) {
    out = `Här är en **liknande uppgift med andra tal**, löst steg för steg:\n\n${exercise.example.q}\n\n${exercise.example.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nGör nu likadant med talen i din uppgift. Vilket blir ditt första steg?${offlineNote}`;
  } else if (level >= 2 && exercise?.rule) {
    out = `**Regeln heter: ${exercise.rule.name}**\n\n${exercise.rule.text}\n\nVilka tal i uppgiften passar in var i regeln?${offlineNote}`;
  } else if (level === 4) {
    out = `Vi tar det i pyttesmå steg. ${hints[0] ? `**Först:** ${hints[0]}` : 'Vad vet du säkert om uppgiften?'}\n\nVad får du när du gör bara det?${offlineNote}`;
  } else if (hints.length) {
    out = `**Ledtråd ${Math.min(level, hints.length)}:** ${hints[Math.min(level, hints.length) - 1]}\n\nVad tror du blir nästa steg?${offlineNote}`;
  } else if (ch) {
    out = `**${ch.id}. ${ch.title}** – ${ch.theory}\n\nVad har du provat hittills?${offlineNote}`;
  } else {
    out = `Berätta vilken uppgift du jobbar med, eller välj ett kapitel, så hjälper jag dig vidare.${offlineNote}`;
  }
  return typeOut(out, onText);
}

function redirectFor(exercise) {
  const hint = (exercise?.hints || [])[0];
  return `Jag kan hjälpa dig hela vägen, men jag vill att du ska förstå hur man gör också! Vi tar ett steg i taget. ${hint ? `\n\n**Nästa steg:** ${hint}` : ''}\n\nVad tror du är det första vi behöver göra?`;
}

const visuellFor = (exercise) => (exercise?.example?.q ? `**Uppställning att jämföra med:** ${exercise.example.q}\n\n` : '');

/* ---------------- Bilder ---------------- */

/** Skalar ned och läser in en bild av en uppgift. */
export function prepareImage(file) {
  if (!file) return Promise.reject(new Error('Ingen bild vald.'));
  if (!/^image\//.test(file.type)) return Promise.reject(new Error('Välj en bild (jpg, png eller liknande).'));
  if (file.size > 12 * 1024 * 1024) return Promise.reject(new Error('Bilden är för stor. Ta en ny bild med kameran.'));
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Kunde inte läsa bilden.'));
    fr.onload = () => {
      const url = String(fr.result);
      const img = new Image();
      img.onerror = () => resolve({ data: url.split(',')[1], mediaType: file.type });
      img.onload = () => {
        try {
          const max = 1600;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          const out = canvas.toDataURL('image/jpeg', 0.85);
          resolve({ data: out.split(',')[1], mediaType: 'image/jpeg', preview: out });
        } catch {
          resolve({ data: url.split(',')[1], mediaType: file.type, preview: url });
        }
      };
      img.src = url;
    };
    fr.readAsDataURL(file);
  });
}

/* ---------------- Läraren: fotografera en boksida → uppgifter som JSON ---------------- */

export async function extractPage(file) {
  if (!hasAI()) throw new Error('Kräver AI-adress under Inställningar.');
  const b64 = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result).split(',')[1]);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
  const res = await fetch(endpoint('/extract'), {
    method: 'POST',
    headers: { ...headers(), 'x-teacher-pin': store.teacherPin || '' },
    body: JSON.stringify({ image: b64, mediaType: file.type || 'image/jpeg' }),
  });
  if (!res.ok) throw new Error('Kunde inte läsa sidan (' + res.status + ').');
  return res.json();
}

/** Kort sammanfattning till läraren när eleven räcker upp handen. */
export function summarizeChat(chat) {
  const mine = (chat || []).filter((m) => m.role === 'user').map((m) => m.content.trim()).filter(Boolean);
  if (!mine.length) return '';
  return mine.slice(-3).join(' · ').slice(0, 300);
}

export { HINT_LEVELS };
