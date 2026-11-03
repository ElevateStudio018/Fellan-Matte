// Delad pedagogisk kärna för Fellan Mattes AI-lärare.
// Används av klienten (js/) och av AI-servern (worker/) så att reglerna är
// identiska på båda ställena. Ren JavaScript utan beroenden och utan DOM.

/* ---------------- Ledtrådstrappa ---------------- */

export const HINT_LEVELS = [
  {
    level: 1,
    name: 'Liten ledtråd',
    instruction: 'Ge bara en kort antydan eller en fråga som får eleven att tänka själv. Avslöja inte metodens namn om det inte behövs.',
  },
  {
    level: 2,
    name: 'Tydligare ledtråd',
    instruction: 'Berätta vilken regel eller metod som gäller och varför den passar, men låt eleven göra beräkningen.',
  },
  {
    level: 3,
    name: 'Vägledning',
    instruction: 'Visa ett liknande exempel med andra tal, steg för steg, och be eleven göra likadant med sina egna tal.',
  },
  {
    level: 4,
    name: 'Extra pedagogisk hjälp',
    instruction: 'Dela upp problemet i mycket små steg med enkla kontrollfrågor, ett steg i taget. Även nu utan det slutliga svaret.',
  },
];

export const MAX_HINT = HINT_LEVELS.length;

export const clampHint = (n) => Math.min(MAX_HINT, Math.max(1, Number(n) || 1));

/* ---------------- Förklara på olika sätt ---------------- */

export const EXPLAIN_STYLES = [
  { id: 'enkel', label: 'Enklare förklaring', prompt: 'Förklara det här enklare', instruction: 'Förklara med vardagligt språk och korta meningar. Undvik facktermer, eller förklara dem direkt.' },
  { id: 'steg', label: 'Steg för steg', prompt: 'Visa det steg för steg', instruction: 'Dela upp resonemanget i numrerade steg. Stanna före sista steget och låt eleven räkna det.' },
  { id: 'visuell', label: 'Visuell förklaring', prompt: 'Visa det visuellt', instruction: 'Rita/visa uppställningen med LaTeX, till exempel en tabell, tallinje eller uppställning. Beskriv bilden med ord också.' },
  { id: 'vardag', label: 'Vardagsexempel', prompt: 'Ge ett vardagsexempel', instruction: 'Koppla matematiken till en konkret vardagssituation med andra tal än i uppgiften.' },
  { id: 'metod', label: 'Annan metod', prompt: 'Visa en annan metod', instruction: 'Visa en alternativ matematisk metod än den eleven redan sett. Jämför metoderna kort.' },
];

export const explainStyle = (id) => EXPLAIN_STYLES.find((s) => s.id === id) || null;

/* ---------------- Normalisering av svar ---------------- */

const LATEX_WORDS = /\\[a-zA-Z]+/g;

/** Gör text jämförbar: tar bort LaTeX, enheter och mellanslag. */
export function compact(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/\\[,;:! ]/g, ' ')
    .replace(/\\cdot|\\times/g, '*')
    .replace(LATEX_WORDS, ' ')
    .replace(/[${}]/g, ' ')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/[·×⋅]/g, '*')
    .replace(/÷/g, '/')
    .replace(/[−–]/g, '-')
    .replace(/\s+/g, '');
}

const UNITS = /(kr|cm2|cm²|cm|m2|m²|m|dm|mm|grader|°|%|timmar|tim|minuter|min|sekunder|sek|år|mån|st)$/i;

/** Alla godtagbara skrivsätt för ett facit, utan enheter och utan "x=". */
export function answerVariants(answer) {
  const out = new Set();
  const add = (v) => {
    const c = compact(v).replace(/^[a-z]=/, '').replace(UNITS, '');
    if (c) out.add(c);
  };
  add(answer);
  // 36% räknas även som 36 och tvärtom
  const pct = String(answer).match(/^(.+?)\s*%$/);
  if (pct) add(pct[1]);
  // 0,5 och 0.5
  if (/\d,\d/.test(String(answer))) add(String(answer).replace(',', '.'));
  // 12+2x är samma uttryck som 2x+12
  const expr = compact(answer).replace(/^[a-z]=/, '').replace(UNITS, '');
  const plus = expr.split('+');
  if (plus.length === 2 && /[a-z]/.test(expr)) out.add([plus[1], plus[0]].join('+'));
  return [...out].filter((v) => v.length > 0);
}

export const exerciseAnswers = (exercise) => (exercise?.answer || []).flatMap(answerVariants);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function valueHit(text, value) {
  const v = escapeRe(value);
  const re = new RegExp(`(?:^|[^\\d.])${v}(?!\\d|\\.\\d)`, 'i');
  return re.test(text);
}

/**
 * Letar efter ett otillåtet avslöjande av det slutliga svaret.
 * Returnerar det värde som läcker, annars null.
 * `studentText` = det eleven själv skrivit. Om eleven redan skrivit svaret själv
 * får läraren bekräfta det (det är inte ett avslöjande).
 */
export function findAnswerLeak(text, exercise, studentText = '') {
  const answers = exerciseAnswers(exercise);
  if (!answers.length) return null;
  const scan = compact(text);
  const own = compact(studentText);
  for (const value of answers) {
    if (!valueHit(scan, value)) continue;
    if (own && valueHit(own, value)) continue;
    const v = escapeRe(value);
    const patterns = [
      // "svaret är 8", "svar: 8", "lösningen blir 8"
      new RegExp(`(svaret|svar|lösningen|resultatet|slutsatsen)(är|blir|=|:)?[^a-z]{0,3}${v}(?!\\d|\\.\\d)`),
      // "alltså 8", "då får du 8", "det blir 8"
      new RegExp(`(alltså|dåfårdu|dufår|detblir|detger|såblirdet)[^a-z]{0,8}${v}(?!\\d|\\.\\d)`),
      // "x = 8", "m = 5"
      new RegExp(`(?:^|[^a-z])[a-z]=${v}(?!\\d|\\.\\d)`),
      // sista steget i en uträkning: "... = 8"
      new RegExp(`(?:=|blir|är|ger)${v}(?:[.!?)]*)$`),
      // "21 stämmer", "21 är rätt"
      new RegExp(`${v}(?:stämmer|ärrätt|ärkorrekt)`),
    ];
    if (patterns.some((re) => re.test(scan))) return value;
  }
  return null;
}

/** Kort, vänlig omdirigering som aldrig avslöjar svaret. */
export function redirectText(exercise) {
  const hint = (exercise?.hints || [])[0];
  return `Jag stannar innan sista steget – själva svaret ska du få hitta själv. 💪\n\n${hint ? `**Nästa steg:** ${hint}` : 'Berätta vad du kommit fram till hittills, så hjälper jag dig vidare.'}\n\nVill du att jag förklarar enklare eller visar ett liknande exempel med andra tal?`;
}

/** Server- och klientsidans gemensamma svarsskydd. */
export function guardReply(text, exercise, studentText = '') {
  const leak = findAnswerLeak(text, exercise, studentText);
  if (!leak) return { text, blocked: false, leak: null };
  return { text: redirectText(exercise), blocked: true, leak };
}

/* ---------------- Felanalys ---------------- */

export const MISTAKE_LABELS = {
  sign: 'Teckenfel',
  percent: 'Procentfaktor',
  half: 'Glömde dela med 2',
  scale: 'Faktor fel',
  fraction: 'Bråkfel',
  precedence: 'Prioriteringsfel',
  expression: 'Ofullständig förenkling',
};

/** Plockar ut ett tal eller ett bråk ur ett elevsvar. */
export function toNumber(input) {
  const s = compact(input).replace(/^[a-z]=/, '').replace(UNITS, '');
  if (!s) return null;
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Jämför elevens svar med facit och pekar ut en trolig typ av misstag.
 * Beskriver aldrig vad rätt svar är.
 */
export function diagnose(input, exercise) {
  const given = toNumber(input);
  const target = toNumber((exercise?.answer || [])[0]);
  if (given === null || target === null || Math.abs(given - target) < 1e-9) return null;
  const same = Math.abs(Math.abs(given) - Math.abs(target)) < 1e-6;
  if (same && given !== target) {
    return { tag: 'sign', label: MISTAKE_LABELS.sign, why: 'Du har räknat rätt, men tecknet blev fel. Vad händer med tecknet när du tar minus gånger minus – eller när du flyttar ett led över likhetstecknet?' };
  }
  if (same && Math.abs(given * 100 - target) < 1e-6) {
    return { tag: 'percent', label: MISTAKE_LABELS.percent, why: 'Du har gjort om till procent en gång för mycket (eller för lite). Ska svaret vara i procent eller som andel?' };
  }
  if (Math.abs(Math.abs(given) / Math.abs(target) - 2) < 1e-6) {
    return { tag: 'half', label: MISTAKE_LABELS.half, why: 'Det ser ut som att faktorn 2 blev kvar. Delade du med 2 där formeln säger det?' };
  }
  return { tag: 'scale', label: MISTAKE_LABELS.scale, why: 'Talet har rätt sorts storlek men blir inte riktigt rätt. Gå igenom räknesättet en gång till – multiplicerade du där du skulle dividera?' };
}

/** Svårighetsgrad utifrån de senaste svaren (true = rätt). */
export function nextDifficulty(current, recent = []) {
  const last = recent.slice(-3);
  if (!last.length) return Math.min(3, Math.max(1, current || 1));
  const right = last.filter(Boolean).length;
  let d = current || 1;
  if (right === last.length && last.length >= 2) d += 1;
  else if (right <= last.length - 2) d -= 1;
  return Math.min(3, Math.max(1, d));
}

/* ---------------- Förhör ---------------- */

/** Kontrollerar att en AI-genererad förhörsfråga är användbar och inte avslöjar svaret. */
export function validateQuestion(q) {
  if (!q || typeof q !== 'object') return false;
  if (typeof q.question !== 'string' || q.question.trim().length < 8) return false;
  if (typeof q.answer !== 'string' || !q.answer.trim()) return false;
  if (q.question.length > 600) return false;
  if (findAnswerLeak(q.question, { answer: [q.answer] })) return false;
  return true;
}

/* ---------------- Minne ---------------- */

/** Kort, integritetssnäll sammanfattning som får skickas med till AI:n. */
export function memorySummary(memory = {}) {
  const parts = [];
  if (memory.chapterTitle) parts.push(`Kapitel: ${memory.chapterTitle}`);
  if (memory.exerciseId) parts.push(`Uppgift: ${memory.exerciseId}`);
  if (memory.hintLevel) parts.push(`Ledtrådsnivå: ${memory.hintLevel}`);
  const mistakes = (memory.mistakes || []).slice(-5).map((m) => MISTAKE_LABELS[m] || m);
  if (mistakes.length) parts.push(`Återkommande misstag i samtalet: ${[...new Set(mistakes)].join(', ')}`);
  if (memory.verdict === true) parts.push('Elevens senaste svar i förhöret var rätt.');
  if (memory.verdict === false) parts.push('Elevens senaste svar i förhöret var fel – hen behöver hjälp med resonemanget.');
  if (memory.solved) parts.push(`Uppgifter eleven löst själv: ${memory.solved}`);
  return parts.join('\n');
}
