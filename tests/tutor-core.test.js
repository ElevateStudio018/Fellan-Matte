// Tester för den pedagogiska kärnan: svarsskyddet får aldrig läcka facit,
// men ska inte heller stoppa ledtrådar eller bekräftelser av elevens eget svar.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HINT_LEVELS, MAX_HINT, clampHint, answerVariants, findAnswerLeak, guardReply,
  diagnose, nextDifficulty, validateQuestion, memorySummary, EXPLAIN_STYLES,
} from '../shared/tutor-core.js';

const ex101 = {
  id: '1.01',
  text: 'Beräkna 3 · (4 + 5) - 6.',
  answer: ['21'],
  hints: ['Vad står inom parentesen? Räkna den först.'],
};

const ex303 = { id: '3.03', text: 'Lös 3x - 4 = 2x + 9.', answer: ['13', 'x=13'], hints: ['Det finns x på båda sidor.'] };
const ex103 = { id: '1.03', text: 'Beräkna 2/3 + 1/4.', answer: ['11/12'], hints: [] };

test('ledtrådstrappan har fyra nivåer och klämmer värden', () => {
  assert.equal(MAX_HINT, 4);
  assert.equal(HINT_LEVELS.length, 4);
  assert.equal(clampHint(0), 1);
  assert.equal(clampHint(9), 4);
  assert.equal(clampHint('3'), 3);
  assert.equal(clampHint(undefined), 1);
});

test('svarsvarianter hanterar x=, procent och omkastade uttryck', () => {
  const v = answerVariants('x=13');
  assert.ok(v.includes('13'));
  assert.ok(answerVariants('36%').includes('36'));
  assert.ok(answerVariants('2x+12').includes('12+2x'));
  assert.ok(answerVariants('1 200').includes('1200'));
});

test('svarsskyddet stoppar ett tydligt avslöjat svar', () => {
  assert.equal(findAnswerLeak('Svaret är 21.', ex101), '21');
  assert.equal(findAnswerLeak('Alltså 21.', ex101), '21');
  assert.equal(findAnswerLeak('Svaret blir x = 13.', ex303), '13');
  assert.equal(findAnswerLeak('Då får du 11/12.', ex103), '11/12');
});

test('svarsskyddet stoppar inte ledtrådar och mellansteg', () => {
  assert.equal(findAnswerLeak('Vad står inom parentesen? Räkna den först.', ex101), null);
  assert.equal(findAnswerLeak('Parentesen blir 9. Vad gör du sedan?', ex101), null);
  assert.equal(findAnswerLeak('Subtrahera 5 på båda sidor. Vad händer med högerledet?', ex303), null);
  assert.equal(findAnswerLeak('Nämnaren 12 fungerar för båda bråken.', ex103), null);
});

test('svarsskyddet tillåter bekräftelse när eleven själv skrivit svaret', () => {
  assert.equal(findAnswerLeak('Ja, 21 stämmer!', ex101, 'jag fick 21'), null);
  assert.equal(findAnswerLeak('Ja, 21 stämmer!', ex101, 'vet inte'), '21');
});

test('guardReply ersätter läckta svar med en omdirigering utan facit', () => {
  const out = guardReply('Svaret är 21. Klart!', ex101);
  assert.equal(out.blocked, true);
  assert.ok(!out.text.includes('21'));
  assert.ok(out.text.includes('Nästa steg:'));
  const ok = guardReply('Börja med parentesen. Vad får du då?', ex101);
  assert.equal(ok.blocked, false);
  assert.equal(ok.text, 'Börja med parentesen. Vad får du då?');
});

test('felanalys pekar ut teckenfel och feltaktorer utan att avslöja svaret', () => {
  const d = diagnose('-13', { answer: ['13'] });
  assert.equal(d.tag, 'sign');
  assert.ok(!d.why.includes('13'));
  assert.equal(diagnose('13', { answer: ['13'] }), null);
  assert.equal(diagnose('5200', { answer: ['52'] })?.tag, 'scale');
  assert.equal(diagnose('tex', { answer: ['13'] }), null);
});

test('svårighetsgraden anpassas efter de senaste svaren', () => {
  assert.equal(nextDifficulty(2, [true, true]), 3);
  assert.equal(nextDifficulty(1, [true, true]), 2);
  assert.equal(nextDifficulty(3, [false, false]), 2);
  assert.equal(nextDifficulty(2, [true, false, true]), 2);
  assert.equal(nextDifficulty(1, [false, false]), 1);
});

test('en genererad förhörsfråga måste vara komplett och inte avslöja svaret', () => {
  assert.equal(validateQuestion({ question: 'Beräkna 12 + 9.', answer: '21' }), true);
  assert.equal(validateQuestion({ question: 'Beräkna 12 + 9. Svaret är 21.', answer: '21' }), false);
  assert.equal(validateQuestion({ question: 'Kort?', answer: '21' }), false);
  assert.equal(validateQuestion({ question: 'Beräkna 12 + 9.', answer: '' }), false);
  assert.equal(validateQuestion(null), false);
});

test('minnessammanfattningen är kort och innehåller inga hemligheter', () => {
  const m = memorySummary({ chapterTitle: 'Procent', hintLevel: 2, mistakes: ['sign', 'sign', 'percent'], verdict: false, solved: 3 });
  assert.ok(m.includes('Procent'));
  assert.ok(m.includes('Ledtrådsnivå: 2'));
  assert.ok(m.includes('Teckenfel'));
  assert.ok(!m.includes('undefined'));
});

test('förklara på olika sätt har fem unika stilar', () => {
  assert.equal(EXPLAIN_STYLES.length, 5);
  assert.equal(new Set(EXPLAIN_STYLES.map((s) => s.id)).size, 5);
  assert.ok(EXPLAIN_STYLES.every((s) => s.prompt && s.instruction));
});
