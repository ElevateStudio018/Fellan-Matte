// Säker uttrycksparser (ingen eval). Används av kalkylatorn och facitkollen.
// Stöd: + - * / ^ ( ) , decimalkomma, %, π, e, sqrt, sin, cos, tan (grader), log, ln, x (som variabel).

const FUNCS = {
  sqrt: Math.sqrt,
  sin: (d) => Math.sin((d * Math.PI) / 180),
  cos: (d) => Math.cos((d * Math.PI) / 180),
  tan: (d) => Math.tan((d * Math.PI) / 180),
  log: Math.log10,
  ln: Math.log,
  abs: Math.abs,
};

function tokenize(src) {
  const s = src
    .replace(/\s+/g, '')
    .replace(/·|×|⋅/g, '*')
    .replace(/÷|:/g, '/')
    .replace(/−|–/g, '-')
    .replace(/√/g, 'sqrt')
    .replace(/π|pi/gi, 'π')
    .replace(/(\d),(\d)/g, '$1.$2');
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      out.push({ t: 'num', v: parseFloat(s.slice(i, j)) });
      i = j;
    } else if (/[a-zA-Zπ]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Zπ]/.test(s[j])) j++;
      let word = s.slice(i, j);
      // Dela upp t.ex. "πx" eller "xsqrt"
      while (word) {
        const f = Object.keys(FUNCS).find((k) => word.toLowerCase().startsWith(k));
        if (f) { out.push({ t: 'fn', v: f }); word = word.slice(f.length); continue; }
        const ch = word[0];
        if (ch === 'π') out.push({ t: 'num', v: Math.PI });
        else if (ch === 'e') out.push({ t: 'num', v: Math.E });
        else out.push({ t: 'var', v: ch.toLowerCase() });
        word = word.slice(1);
      }
      i = j;
    } else if ('+-*/^()%'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
    } else {
      throw new Error('Okänt tecken: ' + c);
    }
  }
  // Implicit multiplikation: 2x, 2(…), )(, x(…), 3π
  const res = [];
  for (let k = 0; k < out.length; k++) {
    const a = res[res.length - 1];
    const b = out[k];
    const aEnds = a && (a.t === 'num' || a.t === 'var' || (a.t === 'op' && (a.v === ')' || a.v === '%')));
    const bStarts = b.t === 'num' || b.t === 'var' || b.t === 'fn' || (b.t === 'op' && b.v === '(');
    if (aEnds && bStarts) res.push({ t: 'op', v: '*' });
    res.push(b);
  }
  return res;
}

export function evaluate(src, vars = {}) {
  const toks = tokenize(String(src));
  let p = 0;
  const peek = () => toks[p];
  const eat = (v) => {
    const t = toks[p];
    if (!t || t.v !== v) throw new Error('Förväntade ' + v);
    p++;
  };
  function expr() {
    let v = term();
    while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) {
      const op = toks[p++].v;
      const r = term();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }
  function term() {
    let v = unary();
    while (peek() && peek().t === 'op' && (peek().v === '*' || peek().v === '/')) {
      const op = toks[p++].v;
      const r = unary();
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  function unary() {
    if (peek() && peek().t === 'op' && peek().v === '-') { p++; return -unary(); }
    if (peek() && peek().t === 'op' && peek().v === '+') { p++; return unary(); }
    return power();
  }
  function power() {
    let b = postfix();
    if (peek() && peek().t === 'op' && peek().v === '^') { p++; return Math.pow(b, unary()); }
    return b;
  }
  function postfix() {
    let v = atom();
    while (peek() && peek().t === 'op' && peek().v === '%') { p++; v = v / 100; }
    return v;
  }
  function atom() {
    const t = toks[p++];
    if (!t) throw new Error('Uttrycket tog slut');
    if (t.t === 'num') return t.v;
    if (t.t === 'var') {
      if (!(t.v in vars)) throw new Error('Okänd variabel ' + t.v);
      return vars[t.v];
    }
    if (t.t === 'fn') {
      if (peek() && peek().v === '(') { p++; const v = expr(); eat(')'); return FUNCS[t.v](v); }
      return FUNCS[t.v](power());
    }
    if (t.v === '(') { const v = expr(); eat(')'); return v; }
    throw new Error('Oväntat ' + t.v);
  }
  const v = expr();
  if (p < toks.length) throw new Error('Oväntat ' + toks[p].v);
  return v;
}

export function format(n) {
  if (!isFinite(n)) return 'Fel';
  const r = Math.round(n * 1e10) / 1e10;
  return String(r).replace('.', ',');
}

// Kollar ett elevsvar mot facit utan att någonsin visa facit.
export function checkAnswer(input, exercise) {
  const clean = (s) => String(s).toLowerCase().replace(/\s+/g, '').replace(/^[a-z]=/, '').replace(/kr|cm²|cm2|cm|grader|°/g, '');
  const given = clean(input);
  if (!given) return null;
  const answers = exercise.answer || [];
  for (const a of answers) {
    const target = clean(a);
    if (given === target) return true;
    if (exercise.kind === 'expression') {
      // Jämför uttryck i några x-värden
      try {
        const ok = [-2, 0.5, 3, 7].every((x) => Math.abs(evaluate(given, { x }) - evaluate(target, { x })) < 1e-9);
        if (ok) return true;
      } catch { /* ogiltigt uttryck */ }
      continue;
    }
    try {
      const g = evaluate(given.replace(/%$/, ''));
      const t = evaluate(target.replace(/%$/, ''));
      if (Math.abs(g - t) <= (exercise.tolerance ?? 1e-6)) return true;
    } catch { /* ogiltigt tal */ }
  }
  return false;
}
