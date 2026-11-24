/* Ljungdal hudvård: designkoncept av Elevate Studio. Ingenting skickas. */
(() => {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const icon = (id, cls = '') => `<svg class="ev-icon ${cls}" aria-hidden="true"><use href="icons.svg#${id}"/></svg>`;
const kr = n => n.toLocaleString('sv-SE').replace(/\s/g, ' ') + ' kr';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const FREE_SHIP = 595;

/* ---------- Sortiment (påhittat) ---------- */
const P = [
  { id: 'rengoringsmjolk', short: 'Havre', name: 'Rengöringsmjölk med havre', kind: 'Rengöring', vol: '150 ml', price: 245, tint: 'sand', icon: 'drop', skin: ['Torr', 'Känslig', 'Normal'], rating: 4.8, reviews: 212, pop: 3, use: 'Masseras in på torr hud och torkas av med varm, fuktig handduk.' },
  { id: 'bjorksavsgele', short: 'Björksav', name: 'Skummande gelé med björksav', kind: 'Rengöring', vol: '150 ml', price: 225, tint: 'himmel', icon: 'drop', skin: ['Fet', 'Kombinerad'], rating: 4.6, reviews: 143, pop: 5, use: 'Löddras med vatten och sköljs av, morgon och kväll.' },
  { id: 'havtornsserum', short: 'Havtorn', name: 'Havtornsserum', kind: 'Serum', vol: '30 ml', price: 395, tint: 'sand', photo: true, ribbon: 'Populär', icon: 'sun', skin: ['Alla hudtyper'], rating: 4.9, reviews: 388, pop: 1, use: 'Tre droppar på ren hud innan krämen, morgon och kväll.' },
  { id: 'blabarsserum', short: 'Blåbär', name: 'Blåbärsserum med niacinamid', kind: 'Serum', vol: '30 ml', price: 385, tint: 'dimma', icon: 'leaf', skin: ['Fet', 'Kombinerad'], rating: 4.7, reviews: 176, pop: 4, use: 'Två pumptryck på ren hud, kväll eller morgon.' },
  { id: 'havreserum', short: 'Kallmossa', name: 'Lugnande serum med kallmossa', kind: 'Serum', vol: '30 ml', price: 365, tint: 'salvia', icon: 'leaf', skin: ['Känslig'], rating: 4.8, reviews: 121, pop: 6, use: 'Klappa in två pumptryck på ren hud.' },
  { id: 'lingonserum', short: 'Lingon', name: 'Lingonserum med retinal', kind: 'Serum', vol: '30 ml', price: 445, tint: 'ros', ribbon: 'Nyhet', icon: 'drop', skin: ['Normal', 'Torr', 'Kombinerad'], rating: 4.6, reviews: 58, pop: 7, use: 'Kvällstid, tre gånger i veckan till en början. Använd solskydd på dagen.' },
  { id: 'fuktkram', short: 'Fjällbjörk', name: 'Fuktkräm med fjällbjörk', kind: 'Kräm', vol: '50 ml', price: 345, tint: 'mossa', icon: 'drop', skin: ['Normal', 'Kombinerad', 'Känslig'], rating: 4.7, reviews: 264, pop: 2, use: 'En ärtstor mängd morgon och kväll, efter serum.' },
  { id: 'nattkram', short: 'Natt', name: 'Rik nattkräm med havtornsolja', kind: 'Kräm', vol: '50 ml', price: 395, tint: 'lera', icon: 'snow', skin: ['Torr'], rating: 4.8, reviews: 97, pop: 8, use: 'Kvällstid som sista steg. Extra bra när det är minusgrader.' },
  { id: 'gelekram', short: 'Gelé', name: 'Lätt gelékräm med åkerfräken', kind: 'Kräm', vol: '50 ml', price: 325, tint: 'himmel', icon: 'drop', skin: ['Fet'], rating: 4.5, reviews: 84, pop: 9, use: 'Ett tunt lager morgon och kväll. Fäster bra under smink.' },
  { id: 'ansiktsolja', short: 'Olja', name: 'Ansiktsolja med blåbärsfrö', kind: 'Olja', vol: '30 ml', price: 425, tint: 'dimma', icon: 'drop', skin: ['Torr', 'Normal'], rating: 4.7, reviews: 69, pop: 10, use: 'Två droppar i handflatan, tryck in över krämen på kvällen.' },
  { id: 'lermask', short: 'Lera', name: 'Lermask med fjällgräs', kind: 'Mask', vol: '75 ml', price: 295, tint: 'sten', icon: 'leaf', skin: ['Fet', 'Kombinerad'], rating: 4.6, reviews: 102, pop: 11, use: 'Ett tunt lager i tio minuter, en till två gånger i veckan.' },
  { id: 'lappbalsam', short: 'Bivax', name: 'Läppbalsam med bivax', kind: 'Läppar', vol: '10 ml', price: 95, tint: 'ros', icon: 'snow', skin: ['Alla hudtyper'], rating: 4.9, reviews: 301, pop: 12, use: 'När som helst. Tål kyla och vind.' }
];
const byId = id => P.find(p => p.id === id);

function label(p, small = false) {
  if (small) return `<span class="ev-swatch" style="--tint:var(--tint-${p.tint})" aria-hidden="true">${p.photo ? '<img src="img/produkt-hudvard.jpg" alt="">' : esc(p.short)}</span>`;
  if (p.photo) return `<div class="ev-label ev-label--photo" style="--tint:var(--tint-${p.tint})"><img src="img/produkt-hudvard.jpg" alt="Vit droppflaska med guldkant på en marmorbricka" loading="lazy" width="1400" height="933">${p.ribbon ? `<span class="ev-ribbon">${p.ribbon}</span>` : ''}</div>`;
  return `<div class="ev-label" style="--tint:var(--tint-${p.tint})">${p.ribbon ? `<span class="ev-ribbon">${p.ribbon}</span>` : ''}<span class="ev-label__brand">Ljungdal<b>.</b></span>${icon(p.icon, 'ev-label__line')}<div><div class="ev-label__name">${esc(p.short)}</div><div class="ev-label__kind">${p.kind} · ${p.vol}</div></div></div>`;
}

/* ---------- Varukorg ---------- */
const CART_KEY = 'ljungdal-varukorg';
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const setCart = c => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} renderCartUI(); };
const bigPrice = p => Math.round(p.price * 1.6 / 5) * 5 - 5;
const lineTotal = l => (l.big ? bigPrice(byId(l.id)) : byId(l.id).price) * l.qty;
const cartTotal = () => getCart().reduce((n, l) => n + (byId(l.id) ? lineTotal(l) : 0), 0);
function addToCart(id, qty = 1, big = false) {
  const c = getCart();
  const hit = c.find(l => l.id === id && !!l.big === big);
  if (hit) hit.qty += qty; else c.push({ id, qty, big });
  setCart(c);
  const b = $('.ev-cartbtn'); if (b) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
}
function renderCartUI() {
  const c = getCart();
  const n = c.reduce((a, l) => a + l.qty, 0);
  $$('[data-cartcount]').forEach(el => { el.textContent = n > 9 ? '9+' : n; el.classList.toggle('is-zero', n === 0); });
  $$('[data-cartlabel]').forEach(el => el.setAttribute('aria-label', n === 0 ? 'Varukorgen är tom' : `Varukorg, ${n} ${n === 1 ? 'vara' : 'varor'}`));
  const mc = $('[data-minicart]');
  if (!mc) return;
  $('[data-minicart-full]', mc).hidden = !c.length;
  $('[data-minicart-empty]', mc).hidden = !!c.length;
  $('[data-minicart-list]', mc).innerHTML = c.map((l, i) => { const p = byId(l.id); if (!p) return ''; return `<li>${label(p, true)}<div><b>${esc(p.name)}</b><span>${l.big ? 'Stor förpackning' : p.vol} · ${l.qty} st</span></div><span class="ev-price">${kr(lineTotal(l))}</span></li>`; }).join('');
  const tot = cartTotal();
  $('[data-minicart-sum]', mc).textContent = kr(tot);
  $('[data-minicart-vat]', mc).textContent = (tot >= FREE_SHIP ? 'Fri frakt · ' : `${kr(FREE_SHIP - tot)} kvar till fri frakt · `) + 'varav moms ' + kr(Math.round(tot * 0.2));
}

/* ---------- Notis ---------- */
let toastTimer;
function toast(html) {
  let t = $('.ev-toast');
  if (!t) { t = document.createElement('div'); t.className = 'ev-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.innerHTML = html; t.classList.add('is-on');
  clearTimeout(toastTimer);
  const hide = () => { toastTimer = setTimeout(() => t.classList.remove('is-on'), 5000); };
  t.onmouseenter = t.onfocusin = () => clearTimeout(toastTimer);
  t.onmouseleave = t.onfocusout = hide;
  hide();
}

/* ---------- Dialoger ---------- */
function openDialog(d, opener) {
  d.__opener = opener || document.activeElement;
  d.showModal();
  d.addEventListener('close', () => { if (d.__opener && d.__opener.focus) d.__opener.focus(); }, { once: true });
}
document.addEventListener('click', e => { const c = e.target.closest('[data-close]'); if (c) { const d = c.closest('dialog'); if (d) d.close(); } });
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

const menuBtn = $('.ev-menubtn'), menu = $('#meny');
if (menuBtn && menu) menuBtn.addEventListener('click', () => { openDialog(menu, menuBtn); menuBtn.setAttribute('aria-expanded', 'true'); menu.addEventListener('close', () => menuBtn.setAttribute('aria-expanded', 'false'), { once: true }); });

const cartBtn = $('.ev-cartbtn'), mini = $('[data-minicart]');
function openMini(focus = true) { mini.hidden = false; cartBtn.setAttribute('aria-expanded', 'true'); if (focus) { const h = $('h2', mini); h.setAttribute('tabindex', '-1'); h.focus(); } }
function closeMini() { mini.hidden = true; cartBtn.setAttribute('aria-expanded', 'false'); }
if (cartBtn && mini) {
  cartBtn.addEventListener('click', e => { e.stopPropagation(); if (mini.hidden) openMini(); else closeMini(); });
  document.addEventListener('click', e => { if (!mini.hidden && !mini.contains(e.target) && !cartBtn.contains(e.target) && !e.target.closest('[data-open-cart]')) closeMini(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mini.hidden) { closeMini(); cartBtn.focus(); } });
  $$('[data-minicart-close]', mini).forEach(b => b.addEventListener('click', () => { closeMini(); cartBtn.focus(); }));
  $('[data-checkout]', mini).addEventListener('click', () => toast(`${icon('info')}<span>Kassan ingår inte i det här konceptet. Ingenting skickas.</span>`));
}
$$('[data-open-cart]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); window.scrollTo({ top: 0 }); openMini(); }));

/* Dragspel: en öppen i taget */
$$('[data-accordion]').forEach(acc => {
  const btns = $$('.ev-faq__btn', acc);
  btns.forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    btns.forEach(x => { x.setAttribute('aria-expanded', 'false'); $('#' + x.getAttribute('aria-controls')).hidden = true; });
    b.setAttribute('aria-expanded', String(open));
    $('#' + b.getAttribute('aria-controls')).hidden = !open;
  }));
});

/* ---------- Produktkort ---------- */
function card(p) {
  return `<article class="ev-card">
    ${label(p)}
    <div class="ev-card__body">
      <h3><a href="produkt.html?id=${p.id}">${esc(p.name)}</a></h3>
      <span class="ev-card__sub">${p.kind} · ${p.vol} · ${p.skin.join(', ').toLowerCase()}</span>
      <span class="ev-rating">${icon('star')}${p.rating.toFixed(1).replace('.', ',')}<span>· ${p.reviews} omdömen</span></span>
      <div class="ev-card__price"><span class="ev-price">${kr(p.price)}</span></div>
      <button class="ev-btn ev-btn--sm ev-btn--secondary" type="button" data-add="${p.id}">${icon('cart')}<span class="ev-long">Lägg i varukorgen</span><span class="ev-short">Köp</span><span class="ev-sr"> ${esc(p.name)}</span></button>
    </div>
  </article>`;
}
const PROMO = `<div class="ev-promo"><div><h3 class="ev-dot">Vet du inte var du ska börja</h3><p>Fyra frågor om din hud, så sätter vi ihop en rutin. Det tar två minuter.</p></div><div class="ev-actions"><a class="ev-btn" href="quiz.html"><span>Gör hudtestet</span>${icon('arrow', 'ev-btn__arrow')}</a></div></div>`;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  const p = byId(b.dataset.add);
  addToCart(p.id);
  toast(`${icon('check-circle')}<span>${esc(p.name)} ligger i varukorgen.</span><button type="button" data-open-cart style="background:none;border:0;color:#fff;font:600 15px/1 var(--ev-font);text-decoration:underline;cursor:pointer;white-space:nowrap">Visa varukorgen</button>`);
  $('.ev-toast [data-open-cart]').addEventListener('click', ev => { ev.stopPropagation(); openMini(); });
});
$$('[data-grid]').forEach(g => {
  const k = g.dataset.grid;
  let list = [];
  if (k === 'popular') list = [...P].sort((a, b) => a.pop - b.pop).slice(0, 4);
  if (k === 'related') { const cur = currentProduct(); list = P.filter(p => p.id !== cur.id && p.kind !== cur.kind).sort((a, b) => a.pop - b.pop).slice(0, 4); }
  g.innerHTML = list.map(card).join('');
});

/* ---------- Sortiment: snabbval och sortering ---------- */
const listing = $('[data-listing]');
if (listing) {
  const SORTS = { pop: 'Populärast', low: 'Billigast', high: 'Dyrast', rating: 'Bäst betyg' };
  const state = { kind: 'Alla', skin: null, sort: 'pop' };
  const render = () => {
    let list = P.filter(p => (state.kind === 'Alla' || p.kind === state.kind) && (!state.skin || p.skin.includes(state.skin) || p.skin.includes('Alla hudtyper')));
    list.sort({ pop: (a, b) => a.pop - b.pop, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating }[state.sort]);
    const html = list.map(card);
    if (html.length >= 4 && state.kind === 'Alla') html.splice(4, 0, PROMO);
    listing.innerHTML = html.join('');
    $('[data-count]').textContent = `${list.length} ${list.length === 1 ? 'produkt' : 'produkter'}`;
    $$('[data-sort-label]').forEach(el => el.textContent = SORTS[state.sort]);
    $('[data-empty]').hidden = list.length > 0;
  };
  $$('[data-kind]').forEach(c => c.addEventListener('click', () => { state.kind = c.dataset.kind; $$('[data-kind]').forEach(x => x.setAttribute('aria-pressed', String(x === c))); render(); }));
  const skinSel = $('[data-skin]');
  skinSel.addEventListener('change', () => { state.skin = skinSel.value || null; render(); });
  const dd = $('[data-sortdd]'), btn = $('.ev-ddbtn', dd), pop = $('.ev-pop', dd);
  const close = (f) => { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (f) btn.focus(); };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (!pop.hidden) return close();
    pop.innerHTML = `<div role="menu" aria-label="Sortera">${Object.entries(SORTS).map(([k, v]) => `<button type="button" role="menuitemradio" aria-checked="${state.sort === k}" data-sort="${k}">${v}${icon('check')}</button>`).join('')}</div>`;
    pop.hidden = false; btn.setAttribute('aria-expanded', 'true');
    $('[aria-checked="true"]', pop).focus();
  });
  pop.addEventListener('click', e => { const b = e.target.closest('[data-sort]'); if (!b) return; e.stopPropagation(); state.sort = b.dataset.sort; close(true); render(); });
  document.addEventListener('click', e => { if (!pop.hidden && !dd.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) close(true); });
  $('[data-empty-reset]').addEventListener('click', () => { state.kind = 'Alla'; state.skin = null; skinSel.value = ''; $$('[data-kind]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.kind === 'Alla'))); render(); });
  render();
}

/* ---------- Produktsida ---------- */
function currentProduct() { return byId(new URLSearchParams(location.search).get('id')) || byId('havtornsserum'); }
const pdp = $('[data-pdp]');
if (pdp) {
  const p = currentProduct();
  document.title = `${p.name} – Ljungdal hudvård`;
  $$('[data-p-name]').forEach(el => el.textContent = p.name);
  $('[data-p-kind]').textContent = p.kind;
  $('[data-p-img]').innerHTML = p.photo ? `<div class="ev-pdp__img"><img src="img/produkt-hudvard.jpg" alt="Vit droppflaska med guldkant på marmorbricka" fetchpriority="high" width="1400" height="933">${p.ribbon ? `<span class="ev-ribbon">${p.ribbon}</span>` : ''}</div>` : label(p).replace('ev-label"', 'ev-label" style="aspect-ratio:1"').replace(/style="--tint/, 'style="aspect-ratio:1;--tint');
  $('[data-p-rating]').innerHTML = `${icon('star')}${p.rating.toFixed(1).replace('.', ',')}<span>· <a class="ev-inline-link" href="#omdomen">${p.reviews} omdömen</a></span>`;
  $('[data-p-skin]').innerHTML = p.skin.map(s => `<span class="ev-tag">${s}</span>`).join('');
  $('[data-p-use]').textContent = p.use;
  const vols = $('[data-p-vols]');
  const bigVol = { '30 ml': '50 ml', '50 ml': '100 ml', '150 ml': '300 ml', '75 ml': '150 ml', '10 ml': '2 × 10 ml' }[p.vol];
  vols.innerHTML = `<button type="button" class="ev-volume" aria-pressed="true" data-big="0">${p.vol}<small>${kr(p.price)}</small></button><button type="button" class="ev-volume" aria-pressed="false" data-big="1">${bigVol}<small>${kr(bigPrice(p))}</small></button>`;
  let big = false;
  const priceEl = $('[data-p-price]');
  const setPrice = () => priceEl.innerHTML = `<span class="ev-price">${kr(big ? bigPrice(p) : p.price)}</span><small>${big ? bigVol : p.vol}</small>`;
  setPrice();
  vols.addEventListener('click', e => { const b = e.target.closest('.ev-volume'); if (!b) return; big = b.dataset.big === '1'; $$('.ev-volume', vols).forEach(x => x.setAttribute('aria-pressed', String(x === b))); setPrice(); });
  const add = $('[data-p-add]');
  add.addEventListener('click', () => {
    addToCart(p.id, 1, big);
    toast(`${icon('check-circle')}<span>${esc(p.name)} ligger i varukorgen.</span>`);
    const s = $('span', add), u = $('use', add), old = s.textContent;
    add.classList.add('is-saved'); s.textContent = 'Tillagd'; u.setAttribute('href', 'icons.svg#check');
    setTimeout(() => { add.classList.remove('is-saved'); s.textContent = old; u.setAttribute('href', 'icons.svg#cart'); }, 2200);
  });
}

/* ---------- Hudtestet ---------- */
const quiz = $('[data-quiz]');
if (quiz) {
  const NAMES = ['Känsla', 'Känslighet', 'Mål', 'Rutin'];
  const A = { feel: null, sens: null, goals: [], length: null };
  const FEEL = { torr: 'Stram och torr', tzon: 'Blank i pannan och på näsan', fet: 'Blank överallt', normal: 'Varken eller' };
  const GOALS = { torrhet: 'Torrhet', finnar: 'Finnar och porer', rodnad: 'Rodnad', linjer: 'Fina linjer', glans: 'Trött och glanslös' };
  const LEN = { enkel: 'Enkel, tre steg', komplett: 'Komplett, fem steg' };
  const steps = $$('[data-q]', quiz);
  const back = $('[data-back]', quiz);
  let step = 0, routine = [], removed = new Set();

  function show(i) {
    step = i;
    steps.forEach((s, j) => s.hidden = j !== i);
    const isStep = i < 4;
    $('[data-q-foot]').hidden = !isStep;
    back.hidden = i === 0 || i === 5;
    $('[data-close-quiz]').hidden = i === 5;
    if (isStep) {
      $('.ev-steps__count', quiz).textContent = `Steg ${i + 1} av 4`;
      $$('.ev-steps__list li', quiz).forEach((li, j) => { if (j === i) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
      $$('.ev-steps__dots i', quiz).forEach((d, j) => d.classList.toggle('is-on', j === i));
    }
    $('[data-answers]').hidden = i === 5;
    if (i === 4) buildResult();
    const h = $('h1', steps[i]); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    renderAnswers();
  }
  back.addEventListener('click', e => { e.preventDefault(); show(step - 1); });

  function renderAnswers() {
    const set = (k, v) => { const d = $(`[data-a="${k}"]`); d.textContent = v || 'Inte besvarad än'; d.classList.toggle('is-empty', !v); };
    set('feel', A.feel && FEEL[A.feel]);
    set('sens', A.sens === null ? null : (A.sens ? 'Ja, reagerar lätt' : 'Nej'));
    set('goals', A.goals.map(g => GOALS[g]).join(', '));
    set('length', A.length && LEN[A.length]);
  }
  /* Enkla val går vidare direkt (ux-flode-auto-vidare) */
  quiz.addEventListener('click', e => {
    const b = e.target.closest('[data-pick]');
    if (!b) return;
    const [k, v] = b.dataset.pick.split(':');
    A[k] = k === 'sens' ? v === 'ja' : v;
    $$(`[data-pick^="${k}:"]`, quiz).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderAnswers();
    setTimeout(() => show(step + 1), 180);
  });
  /* Flerval med Fortsätt */
  const goalBtn = $('[data-goals-next]');
  const updGoals = () => {
    A.goals = $$('input[name="mal"]:checked', quiz).map(x => x.value);
    if (A.goals.length) goalBtn.removeAttribute('aria-disabled'); else goalBtn.setAttribute('aria-disabled', 'true');
    $('[data-goals-miss]').textContent = A.goals.length ? `${A.goals.length} valda.` : 'Välj minst ett mål för att gå vidare.';
    $('[data-goals-miss]').classList.remove('is-alert');
    renderAnswers();
  };
  $$('input[name="mal"]', quiz).forEach(x => x.addEventListener('change', updGoals));
  goalBtn.addEventListener('click', () => {
    if (!A.goals.length) { const m = $('[data-goals-miss]'); m.textContent = 'Välj minst ett mål, till exempel torrhet.'; m.classList.add('is-alert'); $('input[name="mal"]', quiz).focus(); return; }
    show(3);
  });

  function skinType() {
    const base = { torr: 'Torr', tzon: 'Kombinerad', fet: 'Fet', normal: 'Normal' }[A.feel];
    return A.sens ? `${base} och känslig` : base;
  }
  function buildResult() {
    const t = A.feel;
    const cleanser = (t === 'fet' || t === 'tzon') && !A.sens ? 'bjorksavsgele' : 'rengoringsmjolk';
    const g = A.goals[0];
    const serum = A.sens && (g === 'linjer') ? 'havreserum' : ({ torrhet: 'havtornsserum', finnar: 'blabarsserum', rodnad: 'havreserum', linjer: 'lingonserum', glans: 'havtornsserum' }[g]);
    const cream = { torr: 'nattkram', tzon: 'fuktkram', fet: 'gelekram', normal: 'fuktkram' }[t];
    routine = [cleanser, serum, cream];
    if (A.length === 'komplett') {
      const second = A.goals[1] && ({ torrhet: 'havtornsserum', finnar: 'blabarsserum', rodnad: 'havreserum', linjer: 'lingonserum', glans: 'havtornsserum' }[A.goals[1]]);
      routine.push(second && !routine.includes(second) ? second : (t === 'torr' || t === 'normal' ? 'ansiktsolja' : 'lermask'));
      routine.push(t === 'fet' || t === 'tzon' ? (routine.includes('lermask') ? 'lappbalsam' : 'lermask') : (routine.includes('ansiktsolja') ? 'lappbalsam' : 'ansiktsolja'));
    }
    routine = [...new Set(routine)];
    removed = new Set();
    $('[data-r-type]').textContent = skinType();
    const why = {
      torr: 'Din hud behöver mer fett och fukt än den gör själv, särskilt när det är kallt ute.',
      tzon: 'Pannan och näsan blir blanka medan kinderna kan bli torra. Rutinen balanserar utan att torka ut.',
      fet: 'Huden gör mycket talg. Lätta texturer och milda syror håller porerna rena utan att torka ut.',
      normal: 'Huden är i balans. Rutinen håller den så, och skyddar mot kyla och torr inomhusluft.'
    }[t];
    $('[data-r-why]').textContent = why + (A.sens ? ' Alla produkter är parfymfria och testade på känslig hud.' : '');
    const STEPNAME = { Rengöring: 'Rengör', Serum: 'Behandla', Kräm: 'Återfukta', Olja: 'Skydda', Mask: 'En gång i veckan', Läppar: 'Vid behov' };
    $('[data-routine]').innerHTML = routine.map(id => { const p = byId(id); return `<li data-id="${id}">${label(p, true)}<div><span class="ev-routine__step">${STEPNAME[p.kind]}</span><b>${esc(p.name)}</b><p>${esc(p.use)}</p></div><span class="ev-price">${kr(p.price)}</span><div class="ev-routine__ctrl"><span class="ev-hint">${p.vol}</span><button type="button" class="ev-textbtn" data-toggle="${id}" aria-pressed="false">${icon('close')}<span>Ta bort ur rutinen</span><span class="ev-sr"> ${esc(p.name)}</span></button></div></li>`; }).join('');
    updTotal();
  }
  function updTotal() {
    const keep = routine.filter(id => !removed.has(id));
    const sum = keep.reduce((n, id) => n + byId(id).price, 0);
    $('[data-r-total]').textContent = kr(sum);
    $('[data-r-count]').textContent = `${keep.length} ${keep.length === 1 ? 'produkt' : 'produkter'}`;
    const add = $('[data-r-add]');
    $('span', add).textContent = keep.length ? `Lägg ${keep.length} i varukorgen` : 'Lägg i varukorgen';
    if (keep.length) add.removeAttribute('aria-disabled'); else add.setAttribute('aria-disabled', 'true');
    $('[data-r-miss]').textContent = keep.length ? (sum >= FREE_SHIP ? 'Fri frakt ingår.' : `${kr(FREE_SHIP - sum)} kvar till fri frakt.`) : 'Lägg tillbaka minst en produkt för att fortsätta.';
  }
  quiz.addEventListener('click', e => {
    const t = e.target.closest('[data-toggle]');
    if (!t) return;
    const id = t.dataset.toggle, li = t.closest('li');
    const off = !removed.has(id);
    if (off) removed.add(id); else removed.delete(id);
    li.classList.toggle('is-removed', off);
    t.setAttribute('aria-pressed', String(off));
    t.innerHTML = off ? `${icon('plus')}<span>Lägg tillbaka</span><span class="ev-sr"> ${esc(byId(id).name)}</span>` : `${icon('close')}<span>Ta bort ur rutinen</span><span class="ev-sr"> ${esc(byId(id).name)}</span>`;
    updTotal();
  });
  $('[data-r-add]').addEventListener('click', () => {
    const keep = routine.filter(id => !removed.has(id));
    if (!keep.length) return;
    keep.forEach(id => addToCart(id));
    $('[data-done-type]').textContent = skinType().toLowerCase();
    $('[data-done-list]').innerHTML = keep.map(id => { const p = byId(id); return `<li>${label(p, true)}<div><b>${esc(p.name)}</b><span>${p.vol}</span></div><span class="ev-price">${kr(p.price)}</span></li>`; }).join('');
    $('[data-done-sum]').textContent = `${keep.length} ${keep.length === 1 ? 'produkt' : 'produkter'} för ${kr(keep.reduce((n, id) => n + byId(id).price, 0))}`;
    show(5);
  });
  $('[data-restart]').addEventListener('click', () => {
    Object.assign(A, { feel: null, sens: null, goals: [], length: null });
    $$('[aria-pressed="true"][data-pick]', quiz).forEach(x => x.setAttribute('aria-pressed', 'false'));
    $$('input[name="mal"]', quiz).forEach(x => { x.checked = false; }); updGoals();
    show(0);
  });
  renderAnswers();
  steps.forEach((s, j) => s.hidden = j !== 0);
}

renderCartUI();
})();
