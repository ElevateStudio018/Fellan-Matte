/* Norrby Bad & Rör: heroformulär och prisuppskattning i steg. Exempelpriser, ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ERR = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>';
  const kr = n => Math.round(n).toLocaleString('sv-SE').replace(/\s/g, ' ') + ' kr';
  const round = n => Math.round(n / 1000) * 1000;
  const parseArea = v => { const n = Number(String(v).replace(',', '.').replace(/[^\d.]/g, '')); return n >= 1 && n <= 60 ? n : null; };
  const m2 = n => String(Math.round(n * 10) / 10).replace('.', ',') + ' m²';

  function fieldError(input, msg) {
    const id = input.id + '-fel';
    let e = document.getElementById(id);
    if (!e) {
      e = document.createElement('p'); e.className = 'ev-error'; e.id = id;
      input.closest('.ev-field').after(e);
      input.setAttribute('aria-describedby', id);
    }
    if (msg) { e.innerHTML = ERR + '<span>' + msg + '</span>'; e.hidden = false; input.setAttribute('aria-invalid', 'true'); }
    else { e.hidden = true; input.removeAttribute('aria-invalid'); }
  }

  /* ---------- Heroformulär: tomt fält går vidare till steg 1, fel visas vid fältet ---------- */
  const hero = $('[data-heroform]');
  if (hero) {
    const inp = $('input', hero);
    const ok = () => !inp.value.trim() || parseArea(inp.value);
    inp.addEventListener('blur', () => fieldError(inp, ok() ? '' : inp.dataset.error));
    inp.addEventListener('input', () => { if (inp.getAttribute('aria-invalid')) fieldError(inp, ok() ? '' : inp.dataset.error); });
    hero.addEventListener('submit', e => {
      e.preventDefault();
      if (!ok()) { fieldError(inp, inp.dataset.error); inp.focus(); return; }
      const a = parseArea(inp.value);
      location.href = 'prisuppskattning.html' + (a ? '?yta=' + encodeURIComponent(a) : '');
    });
  }

  /* ---------- Prisuppskattning ---------- */
  const flow = $('[data-flow]');
  if (!flow) return;

  // Exempelmodell: grundkostnad + pris per m². Ungefär 55 % av priset är arbete.
  const LEVELS = {
    bas: { name: 'Bas', base: 62000, perM2: 11000 },
    mellan: { name: 'Mellan', base: 78000, perM2: 14500 },
    premium: { name: 'Premium', base: 98000, perM2: 19000 }
  };
  const ADDONS = {
    golvvarme: ['Golvvärme', 9500], vagghangd: ['Vägghängd toalett', 7800], glas: ['Duschväggar i glas', 8900],
    badkar: ['Badkar', 14500], handdukstork: ['Handdukstork', 4200], spotlights: ['Spotlights i taket', 6400],
    golvbrunn: ['Flytt av golvbrunn', 11000], tvatt: ['Plats för tvättmaskin', 5600]
  };
  const LABOR = 0.55, ROT = 0.30, ROT_MAX = 50000;
  const state = { size: null, sizeLabel: '', level: null, addons: [] };

  const priceFor = (level, size = state.size, addons = state.addons) => {
    const L = LEVELS[level];
    const total = L.base + L.perM2 * size + addons.reduce((s, k) => s + ADDONS[k][1], 0);
    const rot = Math.min(total * LABOR * ROT, ROT_MAX);
    return { before: total, after: total - rot };
  };
  const range = n => kr(round(n * 0.96)).replace(' kr', '') + '–' + kr(round(n * 1.06));

  let current = 1;
  function go(n, { focus = true } = {}) {
    current = n;
    $$('[data-step]', flow).forEach(s => { s.hidden = Number(s.dataset.step) !== n; });
    const ind = $('[data-indicator]', flow);
    ind.hidden = n > 5;
    if (n <= 5) {
      $('[data-count]', ind).textContent = `Steg ${n} av 5`;
      $$('.ev-steps__list li', ind).forEach((li, i) => i === n - 1 ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
      $$('.ev-steps__dots i', ind).forEach((d, i) => d.classList.toggle('is-on', i === n - 1));
    }
    render();
    if (focus) {
      const h = $(`[data-step="${n}"] h1`, flow);
      const top = flow.getBoundingClientRect().top + scrollY - 16;
      if (scrollY > top) scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      h.focus({ preventScroll: true });
    }
  }

  function render() {
    // Steg 1: markera vald storlek
    $$('[data-size]', flow).forEach(b => b.setAttribute('aria-pressed', String(state.size !== null && b.dataset.label === state.sizeLabel)));
    // Steg 2: pris per nivå för vald storlek
    if (state.size) {
      $('[data-size-text]', flow).textContent = 'ett badrum på ' + state.sizeLabel.charAt(0).toLowerCase() + state.sizeLabel.slice(1);
      Object.keys(LEVELS).forEach(k => { $(`[data-level-price="${k}"]`, flow).textContent = 'ca ' + kr(round(priceFor(k, state.size, []).before)); });
    }
    $$('[data-level]', flow).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.level === state.level)));
    // Resultat
    const addonText = state.addons.length ? state.addons.map(k => ADDONS[k][0]).join(', ') : 'Inga';
    if (state.size && state.level) {
      const p = priceFor(state.level);
      $('[data-result-after]', flow).textContent = range(p.after);
      $('[data-result-before]', flow).textContent = range(p.before);
      $('[data-review="size"]', flow).textContent = state.sizeLabel;
      $('[data-review="level"]', flow).textContent = LEVELS[state.level].name;
      $('[data-review="addons"]', flow).textContent = addonText;
      $('[data-done-price]', flow).textContent = range(p.after);
    }
    // Sammanfattning
    const sum = (k, v, empty) => { const dd = $(`[data-sum="${k}"]`); dd.textContent = v || empty; dd.classList.toggle('is-empty', !v); };
    sum('size', state.sizeLabel, 'Inte valt än');
    sum('level', state.level && LEVELS[state.level].name, 'Inte valt än');
    sum('addons', state.addons.length ? addonText : '', 'Inga');
    const tot = $('[data-sum-total]');
    tot.hidden = !(state.size && state.level);
    if (!tot.hidden) $('[data-sum="total"]').textContent = range(priceFor(state.level).after);
  }

  // Steg 1: storlek går vidare direkt (ux-flode-auto-vidare)
  $$('[data-size]', flow).forEach(b => b.addEventListener('click', () => {
    state.size = Number(b.dataset.size); state.sizeLabel = b.dataset.label; go(2);
  }));
  const exact = $('[data-exact]', flow);
  const exactIn = $('input', exact);
  exactIn.addEventListener('blur', () => { if (exactIn.value.trim()) fieldError(exactIn, parseArea(exactIn.value) ? '' : exactIn.dataset.error); });
  exact.addEventListener('submit', e => {
    e.preventDefault();
    const a = parseArea(exactIn.value);
    if (!a) { fieldError(exactIn, exactIn.dataset.error); exactIn.focus(); return; }
    fieldError(exactIn, '');
    state.size = a; state.sizeLabel = m2(a); go(2);
  });
  // Steg 2
  $$('[data-level]', flow).forEach(b => b.addEventListener('click', () => { state.level = b.dataset.level; go(3); }));
  // Steg 3
  $$('[data-addons] input', flow).forEach(c => c.addEventListener('change', () => {
    state.addons = $$('[data-addons] input:checked', flow).map(i => i.value); render();
  }));
  // Tillbaka, Ändra och Fortsätt
  flow.addEventListener('click', e => {
    const b = e.target.closest('[data-go]');
    if (!b) return;
    const to = Number(b.dataset.go);
    if (to >= 2 && !state.size) return go(1);
    if (to >= 3 && !state.level) return go(2);
    go(to);
  });
  // Steg 5: kontakt
  evValidate($('[data-contact]', flow), {
    onValid: data => {
      const first = String(data.get('namn')).trim().split(/\s+/)[0];
      $('[data-done-name]', flow).textContent = first ? ', ' + first : '';
      $('[data-done-tel]', flow).textContent = String(data.get('telefon')).trim();
      $('[data-summary]').hidden = true;
      go(6);
    }
  });

  // Ytan från startsidan förifylls och går att ändra (ux-exempel-forifyllt)
  const yta = parseArea(new URLSearchParams(location.search).get('yta') || '');
  if (yta) { state.size = yta; state.sizeLabel = m2(yta); exactIn.value = String(yta).replace('.', ','); go(2, { focus: false }); }
  else go(1, { focus: false });
})();
