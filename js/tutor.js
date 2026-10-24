// AI-läraren. Med en AI-adress (Cloudflare Worker i /worker) används Claude.
// Utan adress körs ett inbyggt hjälpstegsläge som bygger på bokens ledtrådar.
import { store } from './store.js';

export const hasAI = () => !!store.settings.aiEndpoint;

export async function ask({ exercise, chapter, messages, onText }) {
  if (!hasAI()) return offline({ exercise, messages, onText });
  const res = await fetch(store.settings.aiEndpoint.replace(/\/$/, '') + '/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-class-code': store.classCode || '' },
    body: JSON.stringify({
      exercise: { id: exercise.id, text: exercise.text, rule: exercise.rule, level: exercise.level },
      chapter: { title: chapter.title, theory: chapter.theory },
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
      const data = JSON.parse(line.slice(5));
      if (data.text) { full += data.text; onText(full); }
      if (data.error) throw new Error(data.error);
    }
  }
  return full;
}

// Inbyggt läge: trappa av ledtrådar, aldrig svaret.
async function offline({ exercise, messages, onText }) {
  const userTurns = messages.filter((m) => m.role === 'user');
  const last = (userTurns[userTurns.length - 1]?.content || '').toLowerCase();
  const n = userTurns.length - 1;
  const hints = exercise.hints || [];
  let out;
  if (/svar|facit|lösning|vad blir|ge mig/.test(last) && !/formel|regel/.test(last)) {
    out = `Jag ger aldrig själva svaret – men du är närmare än du tror! 💪\n\n**Nästa steg:** ${hints[Math.min(n, hints.length - 1)] || 'Skriv ner vad du vet och vad du ska ta reda på.'}\n\nTesta och skriv vad du får, så kollar jag tänket.`;
  } else if (/formel|regel|vilken/.test(last)) {
    out = `**Regeln heter: ${exercise.rule?.name || 'se teorin'}**\n\n${exercise.rule?.text || ''}\n\nVilka tal i uppgiften passar in var i regeln?`;
  } else if (/exempel|visa|liknande|hur gör man/.test(last)) {
    const ex = exercise.example;
    out = ex ? `Här är en **liknande uppgift med andra tal**, löst steg för steg:\n\n${ex.q}\n\n${ex.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nGör nu likadant med talen i din uppgift.` : 'Jag har inget exempel för just den här – prova regeln istället!';
  } else if (n < hints.length) {
    out = `**Ledtråd ${n + 1}:** ${hints[n]}`;
  } else {
    out = `Du har fått alla ledtrådar jag har för den här. Bra jobbat att du kämpar! 🙌\n\nSkriv gärna dina uträkningar här, eller **räck upp handen** – då ser Felix direkt vad du redan har provat.`;
  }
  out += '\n\n_Inbyggt hjälpläge. Läraren kan koppla på AI under Inställningar._';
  let shown = '';
  for (const word of out.split(/(\s+)/)) {
    shown += word;
    onText(shown);
    await new Promise((r) => setTimeout(r, 12));
  }
  return out;
}

// Läraren: fotografera en boksida → uppgifter som JSON.
export async function extractPage(file) {
  if (!hasAI()) throw new Error('Kräver AI-adress under Inställningar.');
  const b64 = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result).split(',')[1]);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
  const res = await fetch(store.settings.aiEndpoint.replace(/\/$/, '') + '/extract', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-class-code': store.classCode || '', 'x-teacher-pin': store.teacherPin || '' },
    body: JSON.stringify({ image: b64, mediaType: file.type || 'image/jpeg' }),
  });
  if (!res.ok) throw new Error('Kunde inte läsa sidan (' + res.status + ').');
  return res.json();
}

// Kort sammanfattning till läraren när eleven räcker upp handen.
export function summarizeChat(chat) {
  const mine = (chat || []).filter((m) => m.role === 'user').map((m) => m.content.trim()).filter(Boolean);
  if (!mine.length) return '';
  return mine.slice(-3).join(' · ').slice(0, 300);
}
