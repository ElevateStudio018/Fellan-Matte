/* Klackhuset: designkoncept av Elevate Studio. Ingenting skickas. */
(() => {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const ICONS = 'icons.svg';
const icon = (id, cls = '') => `<svg class="ev-icon ${cls}" aria-hidden="true"><use href="${ICONS}#${id}"/></svg>`;
const kr = n => n.toLocaleString('sv-SE').replace(/\s/g, ' ') + ' kr';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const IMG = 'img/produkt-sko.jpg';
const FREE_SHIP = 799;

/* ---------- Sortiment (påhittat) ---------- */
const S = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const PRODUCTS = [
  { id: 'vinga', name: 'Vinga chelseaboot', type: 'Chelseaboots', gender: 'Dam', price: 1495, rating: 4.7, reviews: 86, tint: 'sand', crop: '', ribbon: 'Nyhet', color: 'Konjak', material: 'Skinn', sizes: S(36, 42), sold: [36], tags: ['nyhet', 'vatten'], pop: 1, added: 9 },
  { id: 'kinnekulle', name: 'Kinnekulle snörkänga', type: 'Kängor', gender: 'Dam', price: 1695, rating: 4.8, reviews: 142, tint: 'salvia', crop: 'is-flip', ribbon: 'Populär', color: 'Konjak', material: 'Skinn', sizes: S(36, 42), sold: [], tags: ['vatten', 'fodrad'], pop: 2, added: 4 },
  { id: 'brygga', name: 'Brygga låg känga', type: 'Kängor', gender: 'Herr', price: 1395, was: 1795, rating: 4.5, reviews: 61, tint: 'himmel', crop: 'is-close', ribbon: 'Rea', color: 'Mörkbrun', material: 'Mocka', sizes: S(40, 46), sold: [40, 41], tags: ['rea'], pop: 5, added: 2 },
  { id: 'fjallbacka', name: 'Fjällbacka vinterkänga', type: 'Vinterkängor', gender: 'Dam', price: 1895, rating: 4.9, reviews: 203, tint: 'ros', crop: '', ribbon: '', color: 'Konjak', material: 'Skinn', sizes: S(36, 42), sold: [42], tags: ['vatten', 'fodrad'], pop: 3, added: 6 },
  { id: 'mollosund', name: 'Mollösund chelsea', type: 'Chelseaboots', gender: 'Herr', price: 1595, rating: 4.6, reviews: 74, tint: 'sten', crop: 'is-left', ribbon: '', color: 'Svart', material: 'Skinn', sizes: S(40, 46), sold: [], tags: ['vatten'], pop: 6, added: 5 },
  { id: 'ulricehamn', name: 'Ulricehamn kängsko', type: 'Vardagsskor', gender: 'Dam', price: 1195, rating: 4.4, reviews: 38, tint: 'lera', crop: 'is-flip', ribbon: '', color: 'Sand', material: 'Mocka', sizes: S(36, 41), sold: [], tags: [], pop: 9, added: 3 },
  { id: 'sjuhärad', name: 'Sjuhärad vegankänga', type: 'Kängor', gender: 'Dam', price: 1295, rating: 4.3, reviews: 29, tint: 'mossa', crop: '', ribbon: 'Nyhet', color: 'Grön', material: 'Vegansk', sizes: S(36, 42), sold: [38], tags: ['nyhet'], pop: 8, added: 10 },
  { id: 'viskan', name: 'Viskan stövlett', type: 'Chelseaboots', gender: 'Dam', price: 1395, rating: 4.6, reviews: 57, tint: 'dimma', crop: 'is-close', ribbon: '', color: 'Grå', material: 'Mocka', sizes: S(36, 41), sold: [], tags: [], pop: 7, added: 1 },
  { id: 'kolmarden', name: 'Kolmården vandringskänga', type: 'Kängor', gender: 'Herr', price: 1995, rating: 4.8, reviews: 118, tint: 'salvia', crop: 'is-left', ribbon: '', color: 'Mörkbrun', material: 'Skinn', sizes: S(40, 46), sold: [46], tags: ['vatten', 'fodrad'], pop: 4, added: 7 },
  { id: 'tranas', name: 'Tranås barnkänga', type: 'Barn', gender: 'Barn', price: 795, rating: 4.7, reviews: 92, tint: 'himmel', crop: 'is-flip', ribbon: '', color: 'Konjak', material: 'Skinn', sizes: S(28, 35), sold: [], tags: ['fodrad', 'vatten'], pop: 10, added: 8 },
  { id: 'hjo', name: 'Hjo fodrad chelsea', type: 'Vinterkängor', gender: 'Dam', price: 1595, was: 1895, rating: 4.5, reviews: 44, tint: 'sand', crop: 'is-close', ribbon: 'Rea', color: 'Svart', material: 'Skinn', sizes: S(36, 42), sold: [37], tags: ['rea', 'fodrad'], pop: 11, added: 2 },
  { id: 'skara', name: 'Skara mockakänga', type: 'Kängor', gender: 'Herr', price: 1495, rating: 4.2, reviews: 21, tint: 'lera', crop: '', ribbon: '', color: 'Sand', material: 'Mocka', sizes: S(40, 46), sold: [], tags: [], pop: 14, added: 3 },
  { id: 'alingsas', name: 'Alingsås vardagskänga', type: 'Vardagsskor', gender: 'Herr', price: 1295, rating: 4.4, reviews: 33, tint: 'sten', crop: 'is-flip', ribbon: '', color: 'Konjak', material: 'Skinn', sizes: S(40, 46), sold: [44], tags: [], pop: 13, added: 4 },
  { id: 'marstrand', name: 'Marstrand textilkänga', type: 'Kängor', gender: 'Dam', price: 995, rating: 4.1, reviews: 18, tint: 'dimma', crop: 'is-left', ribbon: '', color: 'Grå', material: 'Textil', sizes: S(36, 41), sold: [], tags: ['nyhet'], pop: 16, added: 9 },
  { id: 'gislaved', name: 'Gislaved vinterboot', type: 'Vinterkängor', gender: 'Herr', price: 1795, rating: 4.7, reviews: 66, tint: 'ros', crop: 'is-close', ribbon: '', color: 'Mörkbrun', material: 'Skinn', sizes: S(40, 46), sold: [], tags: ['vatten', 'fodrad'], pop: 12, added: 5 },
  { id: 'lerum', name: 'Lerum barnchelsea', type: 'Barn', gender: 'Barn', price: 695, rating: 4.5, reviews: 40, tint: 'mossa', crop: 'is-flip', ribbon: '', color: 'Grön', material: 'Vegansk', sizes: S(28, 35), sold: [30], tags: [], pop: 15, added: 6 },
  { id: 'kungalv', name: 'Kungälv spänneskänga', type: 'Kängor', gender: 'Dam', price: 1595, rating: 4.6, reviews: 51, tint: 'himmel', crop: '', ribbon: '', color: 'Konjak', material: 'Skinn', sizes: S(36, 42), sold: [], tags: ['vatten'], pop: 17, added: 1 },
  { id: 'vanersborg', name: 'Vänersborg låg chelsea', type: 'Chelseaboots', gender: 'Dam', price: 1195, was: 1495, rating: 4.3, reviews: 27, tint: 'lera', crop: 'is-close', ribbon: 'Rea', color: 'Sand', material: 'Mocka', sizes: S(36, 41), sold: [41], tags: ['rea'], pop: 18, added: 2 },
  { id: 'falkoping', name: 'Falköping arbetskänga', type: 'Kängor', gender: 'Herr', price: 2195, rating: 4.9, reviews: 77, tint: 'sand', crop: 'is-left', ribbon: '', color: 'Mörkbrun', material: 'Skinn', sizes: S(40, 46), sold: [], tags: ['vatten', 'fodrad'], pop: 19, added: 4 },
  { id: 'mark', name: 'Mark vegansk chelsea', type: 'Chelseaboots', gender: 'Herr', price: 1095, rating: 4.0, reviews: 12, tint: 'mossa', crop: '', ribbon: '', color: 'Svart', material: 'Vegansk', sizes: S(40, 46), sold: [], tags: [], pop: 21, added: 8 },
  { id: 'tidaholm', name: 'Tidaholm fodrad känga', type: 'Vinterkängor', gender: 'Dam', price: 1695, rating: 4.6, reviews: 48, tint: 'salvia', crop: 'is-close', ribbon: '', color: 'Grå', material: 'Mocka', sizes: S(36, 42), sold: [39], tags: ['fodrad'], pop: 20, added: 3 },
  { id: 'lidkoping', name: 'Lidköping promenadsko', type: 'Vardagsskor', gender: 'Dam', price: 1095, rating: 4.4, reviews: 36, tint: 'ros', crop: 'is-flip', ribbon: '', color: 'Konjak', material: 'Skinn', sizes: S(36, 42), sold: [], tags: [], pop: 22, added: 7 },
  { id: 'herrljunga', name: 'Herrljunga barnvinterkänga', type: 'Barn', gender: 'Barn', price: 895, rating: 4.8, reviews: 58, tint: 'dimma', crop: 'is-left', ribbon: 'Nyhet', color: 'Mörkbrun', material: 'Textil', sizes: S(28, 35), sold: [], tags: ['nyhet', 'fodrad', 'vatten'], pop: 23, added: 10 },
  { id: 'vara', name: 'Vara textilsko', type: 'Vardagsskor', gender: 'Herr', price: 895, rating: 4.1, reviews: 15, tint: 'sten', crop: '', ribbon: '', color: 'Grå', material: 'Textil', sizes: S(40, 46), sold: [43], tags: [], pop: 24, added: 6 }
];
const ADDONS = [
  { id: 'spray', name: 'Impregneringsspray', sub: '200 ml, för skinn och mocka', price: 149, icon: 'drop', tint: 'himmel' },
  { id: 'borste', name: 'Mockaborste', sub: 'Mässing och naturgummi', price: 129, icon: 'leaf', tint: 'sand' },
  { id: 'snoren', name: 'Vaxade skosnören', sub: '120 cm, konjak', price: 59, icon: 'box', tint: 'ros' }
];
const byId = id => PRODUCTS.find(p => p.id === id) || ADDONS.find(a => a.id === id);
const COLORS = { Konjak: '#9A5A2B', Mörkbrun: '#4A2E1E', Svart: '#1A1C1E', Sand: '#D8C3A0', Grå: '#8A8E93', Grön: '#5C6B4A' };

/* ---------- Varukorg ---------- */
const CART_KEY = 'klackhuset-varukorg';
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const setCart = c => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} renderCartUI(); };
const cartCount = () => getCart().reduce((n, l) => n + l.qty, 0);
const cartTotal = () => getCart().reduce((n, l) => { const p = byId(l.id); return n + (p ? p.price * l.qty : 0); }, 0);
function addToCart(id, size, qty = 1) {
  const c = getCart();
  const hit = c.find(l => l.id === id && l.size === size);
  if (hit) hit.qty += qty; else c.push({ id, size, qty });
  setCart(c);
  const b = $('.ev-cartbtn');
  if (b) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
}

function thumb(p, extra = '') {
  if (p.icon) return `<span class="ev-addon__art" style="--tint:var(--tint-${p.tint})" ${extra}>${icon(p.icon)}</span>`;
  return `<span class="ev-thumb" style="--tint:var(--tint-${p.tint})" ${extra}><img src="${IMG}" alt="" class="${p.crop}" loading="lazy" width="1400" height="913"></span>`;
}

function renderCartUI() {
  const n = cartCount();
  $$('[data-cartcount]').forEach(el => { el.textContent = n > 9 ? '9+' : n; el.classList.toggle('is-zero', n === 0); });
  $$('[data-cartlabel]').forEach(el => el.setAttribute('aria-label', n === 0 ? 'Varukorgen är tom' : `Varukorg, ${n} ${n === 1 ? 'vara' : 'varor'}`));
  const mc = $('[data-minicart]');
  if (mc) {
    const list = $('[data-minicart-list]', mc);
    const c = getCart();
    if (!c.length) {
      list.innerHTML = '';
      $('[data-minicart-full]', mc).hidden = true;
      $('[data-minicart-empty]', mc).hidden = false;
    } else {
      $('[data-minicart-full]', mc).hidden = false;
      $('[data-minicart-empty]', mc).hidden = true;
      list.innerHTML = c.map(l => { const p = byId(l.id); if (!p) return ''; return `<li>${thumb(p)}<div><b>${esc(p.name)}</b><span>${l.size ? 'Storlek ' + l.size + ' · ' : ''}${l.qty} st</span></div><span class="ev-price">${kr(p.price * l.qty)}</span></li>`; }).join('');
      $('[data-minicart-sum]', mc).textContent = kr(cartTotal());
      $('[data-minicart-vat]', mc).textContent = 'varav moms ' + kr(Math.round(cartTotal() * 0.2));
    }
  }
  if (window.__checkoutRender) window.__checkoutRender();
}

/* ---------- Notis (aria-live) ---------- */
let toastTimer;
function toast(html) {
  let t = $('.ev-toast');
  if (!t) { t = document.createElement('div'); t.className = 'ev-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.innerHTML = html;
  t.classList.add('is-on');
  clearTimeout(toastTimer);
  const hide = () => { toastTimer = setTimeout(() => t.classList.remove('is-on'), 5000); };
  t.onmouseenter = t.onfocusin = () => clearTimeout(toastTimer);   /* pausas vid hover och fokus */
  t.onmouseleave = t.onfocusout = hide;
  hide();
}
const addedToast = (p, size) => toast(`${icon('check-circle')}<span>${esc(p.name)}${size ? ', storlek ' + size : ''} ligger i varukorgen.</span><a href="kassa.html">Till kassan</a>`);

/* ---------- Produktkort ---------- */
function card(p, { lazy = true } = {}) {
  const price = p.was
    ? `<span class="ev-price ev-price--sale">${kr(p.price)}</span><span class="ev-price ev-price--was"><span class="ev-sr">Ordinarie pris </span>${kr(p.was)}</span>`
    : `<span class="ev-price">${kr(p.price)}</span>`;
  const ribbon = p.ribbon && p.ribbon !== 'Rea' ? `<span class="ev-ribbon">${p.ribbon}</span>` : (p.ribbon === 'Rea' ? '<span class="ev-ribbon">Rea</span>' : '');
  const low = p.sold.length >= 2 ? '<span class="ev-card__stock">Få storlekar kvar</span>' : '';
  return `<article class="ev-card">
    <div class="ev-media" style="--tint:var(--tint-${p.tint})"><img src="${IMG}" alt="${esc(p.name)} i ${p.color.toLowerCase()} ${p.material.toLowerCase()}" class="${p.crop}" ${lazy ? 'loading="lazy"' : ''} width="1400" height="913">${ribbon}</div>
    <div class="ev-card__body">
      <h3><a href="produkt.html?id=${p.id}">${esc(p.name)}</a></h3>
      <span class="ev-card__sub">${p.material} · ${p.color}</span>
      <span class="ev-rating">${icon('star')}${p.rating.toFixed(1).replace('.', ',')}<span>· ${p.reviews} omdömen</span></span>
      <div class="ev-card__price">${price}${low}</div>
      <button class="ev-btn ev-btn--sm ev-btn--secondary" type="button" data-quickbuy="${p.id}">${icon('cart')}<span class="ev-long">Lägg i varukorgen</span><span class="ev-short">Köp</span><span class="ev-sr"> ${esc(p.name)}</span></button>
    </div>
  </article>`;
}
$$('[data-grid]').forEach(g => {
  const kind = g.dataset.grid;
  let list = [];
  if (kind === 'popular') list = [...PRODUCTS].sort((a, b) => a.pop - b.pop).slice(0, 8);
  if (kind === 'related') { const cur = currentProduct(); list = PRODUCTS.filter(p => p.id !== cur.id && (p.type === cur.type || p.gender === cur.gender)).slice(0, 4); }
  if (list.length) g.innerHTML = list.map(p => card(p)).join('');
});

/* ---------- Storleksväljare (ux-val-variant) ---------- */
function sizeButtons(p, selected) {
  return p.sizes.map(s => {
    const out = p.sold.includes(s);
    return `<button type="button" class="ev-size" data-size="${s}" aria-pressed="${s === selected}" ${out ? 'aria-disabled="true"' : ''}>${s}${out ? '<span class="ev-sr"> slutsåld</span>' : ''}</button>`;
  }).join('');
}
function wireSizes(root, onPick) {
  root.addEventListener('click', e => {
    const b = e.target.closest('.ev-size');
    if (!b || b.getAttribute('aria-disabled') === 'true') return;
    $$('.ev-size', root).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    onPick(Number(b.dataset.size));
  });
}

/* ---------- Dialoger: fokus fångas av <dialog>, Esc stänger ---------- */
function openDialog(d, opener) {
  d.__opener = opener || document.activeElement;
  d.showModal();
  d.addEventListener('close', () => { if (d.__opener && d.__opener.focus) d.__opener.focus(); }, { once: true });
}
document.addEventListener('click', e => {
  const c = e.target.closest('[data-close]');
  if (c) { const d = c.closest('dialog'); if (d) d.close(); }
});
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

/* Snabbköp från kort: bottenark med storlekar */
const qb = $('#quickbuy');
let qbState = null;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-quickbuy]');
  if (!b || !qb) return;
  const p = byId(b.dataset.quickbuy);
  qbState = { p, size: null };
  $('[data-qb-name]', qb).textContent = p.name;
  $('[data-qb-price]', qb).innerHTML = p.was ? `<span class="ev-price ev-price--sale">${kr(p.price)}</span> <span class="ev-price ev-price--was">${kr(p.was)}</span>` : `<span class="ev-price">${kr(p.price)}</span>`;
  $('[data-qb-thumb]', qb).innerHTML = thumb(p);
  $('[data-qb-link]', qb).href = `produkt.html?id=${p.id}`;
  const sz = $('[data-qb-sizes]', qb);
  sz.innerHTML = sizeButtons(p, null);
  const add = $('[data-qb-add]', qb);
  add.setAttribute('aria-disabled', 'true');
  const miss = $('[data-qb-missing]', qb);
  miss.textContent = 'Välj storlek för att lägga i varukorgen.'; miss.classList.remove('is-alert');
  openDialog(qb, b);
});
if (qb) {
  wireSizes($('[data-qb-sizes]', qb), s => {
    qbState.size = s;
    $('[data-qb-add]', qb).removeAttribute('aria-disabled');
    $('[data-qb-missing]', qb).textContent = `Storlek ${s} vald.`;
    $('[data-qb-missing]', qb).classList.remove('is-alert');
  });
  $('[data-qb-add]', qb).addEventListener('click', () => {
    if (!qbState.size) {
      const m = $('[data-qb-missing]', qb); m.textContent = 'Välj en storlek först.'; m.classList.add('is-alert');
      const first = $('.ev-size:not([aria-disabled="true"])', qb); if (first) first.focus();
      return;
    }
    addToCart(qbState.p.id, qbState.size);
    qb.close();
    addedToast(qbState.p, qbState.size);
  });
}

/* ---------- Header: meny, minivarukorg och sök ---------- */
const menuBtn = $('.ev-menubtn');
const menu = $('#meny');
if (menuBtn && menu) menuBtn.addEventListener('click', () => { openDialog(menu, menuBtn); menuBtn.setAttribute('aria-expanded', 'true'); menu.addEventListener('close', () => menuBtn.setAttribute('aria-expanded', 'false'), { once: true }); });

const cartBtn = $('.ev-cartbtn');
const mini = $('[data-minicart]');
if (cartBtn && mini) {
  const close = () => { mini.hidden = true; cartBtn.setAttribute('aria-expanded', 'false'); };
  cartBtn.addEventListener('click', () => {
    const open = mini.hidden;
    mini.hidden = !open; cartBtn.setAttribute('aria-expanded', String(open));
    if (open) { const f = $('h2', mini); f.setAttribute('tabindex', '-1'); f.focus(); }
  });
  document.addEventListener('click', e => { if (!mini.hidden && !mini.contains(e.target) && !cartBtn.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mini.hidden) { close(); cartBtn.focus(); } });
  $('[data-minicart-close]', mini).addEventListener('click', () => { close(); cartBtn.focus(); });
}

const sdlg = $('#sok');
const POPULAR = ['Chelseaboots', 'Vinterkängor', 'Vattentåliga kängor', 'Barnkängor', 'Mocka'];
const RECENT_KEY = 'klackhuset-senaste';
function recent() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; } }
function saveRecent(q) { const r = [q, ...recent().filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 4); try { localStorage.setItem(RECENT_KEY, JSON.stringify(r)); } catch (e) {} }
$$('[data-open-search]').forEach(b => b.addEventListener('click', () => { if (!sdlg) return; openDialog(sdlg, b); renderSearch(''); const i = $('input', sdlg); i.value = ''; i.focus(); }));
function bold(text, q) {   /* ux-sok-forslag-markering: resten av ordet fetat */
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0 || !q) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark><strong>' + esc(text.slice(i + q.length)) + '</strong>';
}
function renderSearch(q) {
  if (!sdlg) return;
  const left = $('[data-search-left]', sdlg), right = $('[data-search-right]', sdlg);
  q = q.trim();
  if (!q) {
    const r = recent();
    left.innerHTML = (r.length ? `<div><h2>Senaste sökningar</h2><ul class="ev-sugg">${r.map(x => `<li><a href="kategori.html?q=${encodeURIComponent(x)}">${icon('clock')}${esc(x)}</a></li>`).join('')}</ul></div>` : '') +
      `<div><h2>Populära sökningar</h2><ul class="ev-sugg">${POPULAR.map(x => `<li><a href="kategori.html?q=${encodeURIComponent(x)}">${icon('search')}${esc(x)}</a></li>`).join('')}</ul></div>`;
    right.innerHTML = `<div><h2>Populärt just nu</h2><ul class="ev-sugg">${PRODUCTS.slice(0, 4).map(p => `<li><a href="produkt.html?id=${p.id}">${thumb(p)}<span>${esc(p.name)}<br><span class="ev-hint">${kr(p.price)}</span></span></a></li>`).join('')}</ul></div>`;
    return;
  }
  const terms = [...new Set([...POPULAR, ...PRODUCTS.map(p => p.type), ...PRODUCTS.map(p => p.material)])].filter(t => t.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  const hits = searchProducts(q);
  left.innerHTML = `<div><h2>Förslag</h2>${terms.length ? `<ul class="ev-sugg">${terms.map(t => `<li><a href="kategori.html?q=${encodeURIComponent(t)}">${icon('search')}<span>${bold(t, q)}</span></a></li>`).join('')}</ul>` : `<p class="ev-hint">Inga förslag.</p>`}</div>`;
  right.innerHTML = `<div><h2>${hits.length} ${hits.length === 1 ? 'produkt' : 'produkter'} för ”${esc(q)}”</h2>${hits.length ? `<ul class="ev-sugg">${hits.slice(0, 5).map(p => `<li><a href="produkt.html?id=${p.id}">${thumb(p)}<span>${bold(p.name, q)}<br><span class="ev-hint">${kr(p.price)}</span></span></a></li>`).join('')}</ul>` : `<p>Menade du <a class="ev-inline-link" href="kategori.html?q=K%C3%A4ngor">kängor</a>?</p>`}</div>`;
}
function searchProducts(q) {
  const t = q.toLowerCase().replace(/kängor$/, 'käng').replace(/boots$/, 'boot');
  return PRODUCTS.filter(p => [p.name, p.type, p.material, p.color, p.gender, p.tags.includes('vatten') ? 'vattentålig' : '', p.was ? 'rea' : '', p.tags.includes('fodrad') ? 'fodrad' : ''].join(' ').toLowerCase().includes(t.split(' ').pop()));
}
if (sdlg) {
  const i = $('input', sdlg);
  i.addEventListener('input', () => renderSearch(i.value));
  $('form', sdlg).addEventListener('submit', e => { if (!i.value.trim()) { e.preventDefault(); i.focus(); return; } saveRecent(i.value.trim()); });
}
$$('form[data-searchform]').forEach(f => f.addEventListener('submit', e => { const i = $('input', f); if (!i.value.trim()) { e.preventDefault(); i.focus(); } else saveRecent(i.value.trim()); }));

/* Storleksguide */
$$('[data-open-guide]').forEach(b => b.addEventListener('click', () => openDialog($('#storleksguide'), b)));
$$('[data-login]').forEach(b => b.addEventListener('click', () => toast(`${icon('info')}<span>Inloggning ingår inte i konceptet. Fortsätt som gäst.</span>`)));

/* ---------- Dragspel: en öppen i taget (ux-faq-*) ---------- */
$$('[data-accordion]').forEach(acc => {
  const btns = $$('.ev-faq__btn', acc);
  btns.forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    btns.forEach(x => { x.setAttribute('aria-expanded', 'false'); $('#' + x.getAttribute('aria-controls')).hidden = true; });
    b.setAttribute('aria-expanded', String(open));
    $('#' + b.getAttribute('aria-controls')).hidden = !open;
  }));
});

/* Öppet nu (pi-et-oppet) */
$$('[data-open-now]').forEach(el => {
  const d = new Date(), day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
  const hours = { 0: [12, 16], 6: [10, 16] }[day] || [10, 18];
  const open = h >= hours[0] && h < hours[1];
  el.textContent = open ? `Öppet nu till ${hours[1]}.00` : 'Stängt just nu';
  el.className = open ? 'ev-open' : '';
  const row = $(`[data-day="${day}"]`); if (row) row.classList.add('is-today');
});

/* ---------- Kategorisida: filter, sortering och vy ---------- */
function currentProduct() { const id = new URLSearchParams(location.search).get('id'); return byId(id) && !byId(id).icon ? byId(id) : PRODUCTS[0]; }

const listing = $('[data-listing]');
if (listing) {
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const PAGE = 8;
  const SORTS = { pop: 'Populärast', new: 'Nyast', low: 'Billigast', high: 'Dyrast', rating: 'Bäst betyg' };
  const state = { size: [], color: [], material: [], price: [600, 2200], quick: [], sort: 'pop', shown: PAGE, view: 'grid' };
  let pending = null;
  const typ = ['Herr', 'Barn'].includes(params.get('typ')) ? params.get('typ') : 'Dam';
  const base = q ? searchProducts(q) : PRODUCTS.filter(p => p.gender === typ);
  const navHref = q ? null : (typ === 'Dam' ? 'kategori.html' : 'kategori.html?typ=' + typ);
  $$('.ev-nav a, .ev-menu a').forEach(a => { if (a.getAttribute('href') === navHref) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (!q && typ !== 'Dam') {
    $('[data-list-title]').textContent = typ === 'Herr' ? 'Kängor och boots för herr' : 'Barnskor';
    $('[data-list-lead]').textContent = typ === 'Herr' ? 'Kängor, chelseaboots och vardagsskor i storlek 40–46. Byt gratis inom 60 dagar.' : 'Kängor i storlek 28–35 med gott om tåplats. Byt gratis när foten växer, inom 60 dagar.';
    $('[data-crumb-parent]').textContent = typ; $('[data-crumb-parent]').href = navHref;
    $('[data-crumb-current]').textContent = typ === 'Herr' ? 'Kängor och boots' : 'Alla barnskor';
  }
  if (q) { $('[data-list-title]').innerHTML = `Sökresultat för ”${esc(q)}”`; $('[data-list-lead]').textContent = `Du sökte på ${q}. Filtrera vidare eller sök på något annat.`; $('[data-crumb-current]').textContent = 'Sök'; }

  const matches = (p, s, skip) => (skip === 'size' || !s.size.length || s.size.some(x => p.sizes.includes(x) && !p.sold.includes(x)))
    && (skip === 'color' || !s.color.length || s.color.includes(p.color))
    && (skip === 'material' || !s.material.length || s.material.includes(p.material))
    && (skip === 'price' || (p.price >= s.price[0] && p.price <= s.price[1]))
    && (!s.quick.length || s.quick.every(t => t === 'rea' ? !!p.was : p.tags.includes(t)));
  const filtered = s => base.filter(p => matches(p, s));
  const activeCount = s => s.size.length + s.color.length + s.material.length + ((s.price[0] > 600 || s.price[1] < 2200) ? 1 : 0);
  const clone = s => JSON.parse(JSON.stringify(s));

  const GROUPS = {
    size: { label: 'Storlek', opts: () => [...new Set(base.flatMap(p => p.sizes))].sort((a, b) => a - b) },
    color: { label: 'Färg', opts: () => Object.keys(COLORS).filter(c => base.some(p => p.color === c)) },
    material: { label: 'Material', opts: () => ['Skinn', 'Mocka', 'Vegansk', 'Textil'] },
    price: { label: 'Pris' }
  };
  function groupHTML(key, s, uid) {
    if (key === 'price') {
      const pct = v => ((v - 600) / 1600) * 100;
      return `<div class="ev-range" data-range>
        <div class="ev-range__track"></div><div class="ev-range__fill" style="left:${pct(s.price[0])}%;right:${100 - pct(s.price[1])}%"></div>
        <input type="range" min="600" max="2200" step="100" value="${s.price[0]}" aria-label="Lägsta pris" data-min>
        <input type="range" min="600" max="2200" step="100" value="${s.price[1]}" aria-label="Högsta pris" data-max>
      </div><div class="ev-range__vals"><span>${kr(s.price[0])}</span><span>${kr(s.price[1])}</span></div>`;
    }
    const g = GROUPS[key];
    const opts = g.opts();
    const many = key !== 'size' && opts.length > 5;
    return `<div class="ev-opts ${key === 'size' ? 'ev-opts--sizes' : ''}" role="group" aria-label="${g.label}">${opts.map((o, i) => {
      const test = clone(s); test[key] = [o];
      const n = base.filter(p => matches(p, test)).length;
      const checked = s[key].includes(o);
      const sw = key === 'color' ? `<span class="ev-opt__swatch" style="background:${COLORS[o]}"></span>` : '';
      return `<label class="ev-opt" ${many && i >= 5 ? 'hidden' : ''}><input type="checkbox" value="${o}" data-key="${key}" ${checked ? 'checked' : ''} ${n === 0 && !checked ? 'disabled' : ''}><span class="ev-opt__name">${sw}${o}</span><small>${n}<span class="ev-sr"> träffar</span></small></label>`;
    }).join('')}</div>${many ? `<button class="ev-link ev-link--more" type="button" data-showall style="margin-top:10px">Visa fler${icon('chevron-down')}</button>` : ''}`;
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-showall]'); if (!b) return; const g = b.previousElementSibling; $$('[hidden]', g).forEach(x => x.hidden = false); const f = $('label:nth-child(6) input', g); b.remove(); if (f) f.focus(); }, true);
  function wireGroup(root, s, after) {
    root.addEventListener('change', e => {
      const t = e.target;
      if (t.dataset.key) { const arr = s[t.dataset.key]; const v = t.dataset.key === 'size' ? Number(t.value) : t.value; if (t.checked) arr.push(v); else arr.splice(arr.indexOf(v), 1); after(); }
    });
    root.addEventListener('input', e => {
      const t = e.target;
      if (t.matches('[data-min],[data-max]')) {
        const r = t.closest('[data-range]');
        let a = Number($('[data-min]', r).value), b = Number($('[data-max]', r).value);
        if (a > b - 100) { if (t.matches('[data-min]')) a = b - 100; else b = a + 100; $('[data-min]', r).value = a; $('[data-max]', r).value = b; }
        s.price = [a, b];
        const pct = v => ((v - 600) / 1600) * 100;
        $('.ev-range__fill', r).style.cssText = `left:${pct(a)}%;right:${100 - pct(b)}%`;
        const vals = r.nextElementSibling.children; vals[0].textContent = kr(a); vals[1].textContent = kr(b);
        after(true);
      }
    });
  }

  /* Desktop: rad med rullgardiner ovanför listan (ux-filter-placering) */
  let openPop = null;
  function closePop(focusBtn) { if (!openPop) return; openPop.pop.hidden = true; openPop.btn.setAttribute('aria-expanded', 'false'); if (focusBtn) openPop.btn.focus(); openPop = null; pending = null; }
  $$('[data-dd]').forEach(dd => {
    const btn = $('.ev-ddbtn', dd), pop = $('.ev-pop', dd), key = dd.dataset.dd;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const was = openPop && openPop.pop === pop;
      closePop();
      if (was) return;
      btn.setAttribute('aria-expanded', 'true'); pop.hidden = false; openPop = { pop, btn };
      if (key === 'sort') { renderSortMenu(pop); $('[aria-checked="true"]', pop).focus(); return; }
      pending = clone(state);
      const draw = () => {
        pop.innerHTML = `<div data-g>${groupHTML(key, pending)}</div><div class="ev-pop__foot"><button class="ev-link" type="button" data-pop-clear>Rensa</button><button class="ev-btn ev-btn--sm" type="button" data-pop-apply><span>Visa ${filtered(pending).length}</span></button></div>`;
      };
      draw();
      wireGroup(pop, pending, (soft) => { if (soft) { $('[data-pop-apply] span', pop).textContent = `Visa ${filtered(pending).length}`; } else { const f = document.activeElement && document.activeElement.value; draw(); const again = f && $(`input[value="${CSS.escape(String(f))}"]`, pop); if (again) again.focus(); } });
      pop.onclick = ev => {
        ev.stopPropagation();
        if (ev.target.closest('[data-pop-apply]')) { Object.assign(state, pending, { shown: PAGE }); closePop(true); render(); }
        if (ev.target.closest('[data-pop-clear]')) { if (key === 'price') pending.price = [600, 2200]; else pending[key] = []; draw(); }
      };
      const first = $('input:not(:disabled)', pop); if (first) first.focus();
    });
  });
  document.addEventListener('click', e => { if (openPop && !openPop.pop.contains(e.target)) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && openPop) closePop(true); });

  function renderSortMenu(pop) {
    pop.innerHTML = `<div role="menu" aria-label="Sortera">${Object.entries(SORTS).map(([k, v]) => `<button type="button" role="menuitemradio" aria-checked="${state.sort === k}" data-sort="${k}">${v}${icon('check')}</button>`).join('')}</div>`;
    pop.onclick = ev => { const b = ev.target.closest('[data-sort]'); if (!b) return; ev.stopPropagation(); state.sort = b.dataset.sort; state.shown = PAGE; closePop(true); render(); };
  }

  /* Mobil: bottenark för Filter och Sortera (ux-filter-mobil, ux-sort-mobil) */
  const fs = $('#filterark'), ss = $('#sorteraark');
  $('[data-open-filter]').addEventListener('click', e => {
    pending = clone(state);
    const body = $('[data-filter-body]', fs);
    const open = {};
    const draw = () => {
      body.innerHTML = `<div class="ev-sheet__clear"><span class="ev-hint">${activeCount(pending)} filter valda</span><button class="ev-link" type="button" data-clear-all>Rensa alla</button></div>` +
        Object.keys(GROUPS).map(k => {
          const n = k === 'price' ? ((pending.price[0] > 600 || pending.price[1] < 2200) ? 1 : 0) : pending[k].length;
          return `<div class="ev-fgroup"><h3><button type="button" class="ev-fgroup__btn" aria-expanded="${!!open[k]}" aria-controls="fg-${k}" data-fg="${k}"><span>${GROUPS[k].label}${n ? `<small>(${n})</small>` : ''}</span>${icon('plus')}</button></h3><div class="ev-fgroup__panel" id="fg-${k}" ${open[k] ? '' : 'hidden'}>${groupHTML(k, pending)}</div></div>`;
        }).join('');
      $('[data-filter-apply] span', fs).textContent = `Visa ${filtered(pending).length}`;
    };
    draw();
    body.onclick = ev => {
      const g = ev.target.closest('[data-fg]');
      if (g) { open[g.dataset.fg] = !open[g.dataset.fg]; draw(); $(`[data-fg="${g.dataset.fg}"]`, body).focus(); }
      if (ev.target.closest('[data-clear-all]')) { Object.assign(pending, { size: [], color: [], material: [], price: [600, 2200] }); draw(); $('[data-clear-all]', body).focus(); }
    };
    if (!fs.__wired) {
      fs.__wired = true;
      wireGroup(body, { get size() { return pending.size; }, get color() { return pending.color; }, get material() { return pending.material; }, set price(v) { pending.price = v; } }, soft => {
        if (soft) $('[data-filter-apply] span', fs).textContent = `Visa ${filtered(pending).length}`;
        else { const f = document.activeElement && document.activeElement.value; draw(); const again = f && $(`input[value="${CSS.escape(String(f))}"]`, body); if (again) again.focus(); }
      });
      $('[data-filter-apply]', fs).addEventListener('click', () => { Object.assign(state, pending, { shown: PAGE }); fs.close(); render(); });
    }
    openDialog(fs, e.currentTarget);
  });
  $('[data-open-sort]').addEventListener('click', e => {
    $('[data-sort-body]', ss).innerHTML = `<ul class="ev-sortlist" role="menu" aria-label="Sortera">${Object.entries(SORTS).map(([k, v]) => `<li><button type="button" role="menuitemradio" aria-checked="${state.sort === k}" data-sort="${k}">${v}${icon('check')}</button></li>`).join('')}</ul>`;
    $('[data-sort-body]', ss).onclick = ev => { const b = ev.target.closest('[data-sort]'); if (!b) return; state.sort = b.dataset.sort; state.shown = PAGE; ss.close(); render(); };
    openDialog(ss, e.currentTarget);
  });

  /* Snabbval ovanför listan (ux-filter-snabbval) */
  $$('[data-quick]').forEach(c => c.addEventListener('click', () => {
    const t = c.dataset.quick, on = c.getAttribute('aria-pressed') !== 'true';
    c.setAttribute('aria-pressed', String(on));
    state.quick = on ? [...state.quick, t] : state.quick.filter(x => x !== t);
    state.shown = PAGE; render();
  }));

  /* Rutnät eller lista */
  $$('[data-view]').forEach(b => b.addEventListener('click', () => {
    state.view = b.dataset.view;
    $$('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    listing.classList.toggle('is-list', state.view === 'list');
  }));

  $('[data-more]').addEventListener('click', () => {
    const before = state.shown; state.shown += PAGE; render();
    const next = $$('.ev-card h3 a', listing)[before]; if (next) next.focus();
  });

  function render() {
    const list = filtered(state);
    const sorter = { pop: (a, b) => a.pop - b.pop, new: (a, b) => b.added - a.added, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating }[state.sort];
    list.sort(sorter);
    const shown = list.slice(0, state.shown);
    listing.innerHTML = shown.map(p => card(p)).join('');
    $('[data-count]').textContent = `${list.length} ${list.length === 1 ? 'produkt' : 'produkter'}`;
    const n = activeCount(state);
    $('[data-filter-count]').textContent = n ? `(${n})` : '';
    $$('[data-dd]').forEach(dd => {
      const k = dd.dataset.dd; if (k === 'sort') return;
      const c = k === 'price' ? ((state.price[0] > 600 || state.price[1] < 2200) ? 1 : 0) : state[k].length;
      $('.ev-ddbtn', dd).classList.toggle('is-active', c > 0);
      $('[data-dd-count]', dd).textContent = c ? ` (${c})` : '';
    });
    $$('[data-sort-label]').forEach(el => el.textContent = SORTS[state.sort]);
    const more = $('[data-more-wrap]');
    more.hidden = list.length <= state.shown;
    $('[data-more-text]').textContent = `Visar ${shown.length} av ${list.length}`;
    $('[data-more-bar]').style.width = (shown.length / Math.max(list.length, 1) * 100) + '%';
    $('[data-empty]').hidden = list.length > 0;
  }
  /* Skelett i listans form en kort stund (ux-ladd-lista) */
  listing.innerHTML = Array.from({ length: 8 }, () => '<div class="ev-skel" aria-hidden="true"><i></i><i></i><i></i><i></i></div>').join('');
  setTimeout(render, 350);
  $('[data-empty-reset]').addEventListener('click', () => { Object.assign(state, { size: [], color: [], material: [], price: [600, 2200], quick: [] }); $$('[data-quick]').forEach(c => c.setAttribute('aria-pressed', 'false')); render(); });
}

/* ---------- Produktsida ---------- */
const pdp = $('[data-pdp]');
if (pdp) {
  const p = currentProduct();
  document.title = `${p.name} – Klackhuset`;
  $$('[data-p-name]').forEach(el => el.textContent = p.name);
  $('[data-p-crumb-type]').textContent = p.type;
  $('[data-p-crumb-type]').href = `kategori.html?typ=${encodeURIComponent(p.type)}`;
  $('[data-p-rating]').innerHTML = `${icon('star')}${p.rating.toFixed(1).replace('.', ',')}<span>· <a class="ev-inline-link" href="#omdomen">${p.reviews} omdömen</a></span>`;
  $('[data-p-price]').innerHTML = p.was ? `<span class="ev-price ev-price--sale">${kr(p.price)}</span><span class="ev-price ev-price--was"><span class="ev-sr">Ordinarie pris </span>${kr(p.was)}</span>` : `<span class="ev-price">${kr(p.price)}</span>`;
  $('[data-p-meta]').textContent = `${p.material} · ${p.color} · ${p.gender}`;
  const LEADS = {
    Chelseaboots: 'Resårkil på båda sidor och gummisula med grepp. Sulan är sydd, så den går att byta när den är sliten.',
    Kängor: 'Snörning hela vägen ner och vadderad krage. Sulan är sydd, så den går att byta när den är sliten.',
    Vinterkängor: 'Fodrad med ull och vattentålig ända upp till skaftet. Grov sula som greppar på is och snö.',
    Vardagsskor: 'Lätt och följsam, med mjuk innersula som går att ta ur. Gjord för att gå i hela dagen.',
    Barn: 'Gott om tåplats, kardborre som barnet klarar själv och reflex baktill. Tål pulka och vattenpölar.'
  };
  $('[data-p-lead]').textContent = (p.material === 'Mocka' ? 'Mjuk mocka. ' : p.material === 'Vegansk' ? 'Veganskt material utan skinn. ' : '') + LEADS[p.type];
  $$('[data-p-sticky-price]').forEach(el => el.textContent = kr(p.price));
  const sticky = $('[data-sticky-thumb]'); if (sticky) sticky.outerHTML = thumb(p);

  /* Galleri: samma foto på fyra färgade ytor */
  const tints = [p.tint, ...['sand', 'salvia', 'himmel', 'ros', 'sten', 'lera'].filter(t => t !== p.tint).slice(0, 3)];
  const crops = [p.crop, 'is-close', 'is-flip', 'is-left'];
  const views = ['framifrån', 'detalj av sulan', 'från andra sidan', 'snett från sidan'];
  const track = $('[data-gallery-track]');
  track.innerHTML = tints.map((t, i) => `<div class="ev-gallery__slide" style="--tint:var(--tint-${t})" role="group" aria-roledescription="bild" aria-label="Bild ${i + 1} av 4"><img src="${IMG}" class="ev-media-img ${crops[i] === p.crop && i ? '' : crops[i]}" alt="${esc(p.name)}, ${views[i]}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1400" height="913"></div>`).join('');
  $$('.ev-gallery__slide img', track).forEach(img => { const c = img.className.replace('ev-media-img', '').trim(); if (c === 'is-flip') img.style.transform = 'scaleX(-1)'; if (c === 'is-close') { img.style.objectPosition = '70% 70%'; img.style.transform = 'scale(1.35)'; } if (c === 'is-left') { img.style.objectPosition = '20% 80%'; img.style.transform = 'scale(1.2)'; } });
  const thumbs = $('[data-gallery-thumbs]');
  thumbs.innerHTML = tints.map((t, i) => `<li><button type="button" aria-label="Visa bild ${i + 1}" aria-current="${i === 0}"><span class="ev-thumb" style="--tint:var(--tint-${t})"><img src="${IMG}" alt="" style="${$$('.ev-gallery__slide img', track)[i].style.cssText}" width="1400" height="913"></span></button></li>`).join('');
  const dots = $('[data-gallery-dots]');
  dots.innerHTML = tints.map((_, i) => `<i class="${i ? '' : 'is-on'}"></i>`).join('');
  const go = i => { track.scrollTo({ left: track.clientWidth * i, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  $$('button', thumbs).forEach((b, i) => b.addEventListener('click', () => go(i)));
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    $$('i', dots).forEach((d, j) => d.classList.toggle('is-on', i === j));
    $$('button', thumbs).forEach((b, j) => b.setAttribute('aria-current', String(i === j)));
    $('[data-gallery-count]').textContent = `Bild ${i + 1} av 4`;
  }, { passive: true });
  if (p.ribbon) $('[data-gallery-ribbon]').outerHTML = `<span class="ev-ribbon">${p.ribbon}</span>`; else $('[data-gallery-ribbon]').remove();

  /* Storlek */
  let size = null;
  const sizes = $('[data-p-sizes]');
  sizes.innerHTML = sizeButtons(p, null);
  const add = $('[data-p-add]'), miss = $('[data-p-missing]'), sadd = $('[data-sticky-add]');
  wireSizes(sizes, s => {
    size = s;
    add.removeAttribute('aria-disabled');
    miss.textContent = `Storlek ${s} vald. ${p.sold.length ? '' : ''}Skickas i dag om du beställer före 15.00.`;
    miss.classList.remove('is-alert');
    $('[data-p-size-label]').textContent = `: ${s}`;
  });
  const doAdd = () => {
    if (!size) {
      miss.textContent = 'Välj en storlek först.'; miss.classList.add('is-alert');
      sizes.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const f = $('.ev-size:not([aria-disabled="true"])', sizes); if (f) f.focus({ preventScroll: true });
      return;
    }
    addToCart(p.id, size);
    addedToast(p, size);
    const label = $('span', add); const old = label.textContent;
    add.classList.add('is-saved'); label.textContent = 'Tillagd';
    const ic = $('use', add); ic.setAttribute('href', ICONS + '#check');
    setTimeout(() => { add.classList.remove('is-saved'); label.textContent = old; ic.setAttribute('href', ICONS + '#cart'); }, 2200);
  };
  add.addEventListener('click', doAdd);
  if (sadd) sadd.addEventListener('click', doAdd);

  /* Favorit */
  const fav = $('[data-fav]');
  fav.addEventListener('click', () => { const on = fav.getAttribute('aria-pressed') !== 'true'; fav.setAttribute('aria-pressed', String(on)); $('span', fav).textContent = on ? 'Sparad' : 'Spara'; });


  /* Fast list när köpknappen har scrollat ur bild (ux-cta-folj-med, bara desktop) */
  const bar = $('.ev-stickybar');
  if (bar && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { bar.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0); }).observe(add);
  }
}

/* ---------- Kassa ---------- */
const flow = $('[data-checkout]');
if (flow) {
  const NAMES = ['Varukorg', 'Uppgifter', 'Leverans', 'Betalning'];
  const SHIP = { ombud: { name: 'Till ombud', sub: 'Närmaste ombud: Coop Norrby, Borås. 1–3 vardagar.', price: 49, icon: 'store' }, hem: { name: 'Hemleverans', sub: 'Kvällsleverans 17–22, 1–2 vardagar.', price: 79, icon: 'truck' }, butik: { name: 'Hämta i butiken', sub: 'Österlånggatan 14, Borås. Klart om 2 timmar.', price: 0, icon: 'pin' } };
  const data = { ship: null, pay: 'kort' };
  let step = 0;
  const steps = $$('[data-step]', flow);
  const back = $('[data-back]', flow);
  const shipCost = () => { if (!data.ship) return null; const base = SHIP[data.ship].price; return cartTotal() >= FREE_SHIP && data.ship !== 'butik' ? 0 : base; };

  function show(i, focus = true) {
    step = i;
    steps.forEach((s, j) => s.hidden = j !== i);
    const done = i === 4;
    $('[data-flow-foot]').hidden = done;
    back.hidden = i === 0 || done;
    $('[data-close-flow]').hidden = done;
    $('.ev-steps__count', flow).textContent = `Steg ${i + 1} av 4`;
    $$('.ev-steps__list li', flow).forEach((li, j) => { if (j === i) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', flow).forEach((d, j) => d.classList.toggle('is-on', j === i));
    $('[data-summary]').hidden = done;
    $('[data-summary]').classList.toggle('is-cart', i === 0);
    if (i === 3) fillReview();
    if (focus) { const h = $('h1', steps[i]); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'auto' }); }
    history.replaceState(null, '', done ? '#klart' : '#' + NAMES[i].toLowerCase());
  }
  back.addEventListener('click', e => { e.preventDefault(); show(Math.max(0, step - 1)); });

  /* Steg 1: varukorg */
  let removeTarget = null;
  window.__checkoutRender = () => {
    const c = getCart();
    const lines = $('[data-lines]');
    const empty = $('[data-cart-empty]');
    const has = c.length > 0;
    empty.hidden = has;
    $$('[data-cart-has]').forEach(el => el.hidden = !has);
    lines.innerHTML = c.map((l, idx) => {
      const p = byId(l.id); if (!p) return '';
      return `<li class="ev-line">${p.icon ? thumb(p) : `<a href="produkt.html?id=${p.id}" tabindex="-1" aria-hidden="true">${thumb(p)}</a>`}
        <div><div class="ev-line__name">${p.icon ? esc(p.name) : `<a href="produkt.html?id=${p.id}">${esc(p.name)}</a>`}</div><div class="ev-line__meta">${l.size ? `Storlek ${l.size} · ${p.color}` : esc(p.sub)}</div></div>
        <div class="ev-line__price ev-price">${kr(p.price * l.qty)}</div>
        <div class="ev-line__ctrl">
          <div class="ev-qty" role="group" aria-label="Antal ${esc(p.name)}">
            <button type="button" data-qty="-1" data-i="${idx}" aria-label="Minska antal" ${l.qty <= 1 ? 'aria-disabled="true"' : ''}>${icon('minus')}</button>
            <output aria-live="polite">${l.qty}</output>
            <button type="button" data-qty="1" data-i="${idx}" aria-label="Öka antal">${icon('plus')}</button>
          </div>
          <button type="button" class="ev-textbtn" data-remove="${idx}">${icon('trash')}<span>Ta bort</span><span class="ev-sr"> ${esc(p.name)}</span></button>
        </div></li>`;
    }).join('');
    const tot = cartTotal();
    const left = Math.max(0, FREE_SHIP - tot);
    $('[data-free-text]').innerHTML = left > 0 ? `Handla för <b>${kr(left)}</b> till så får du fri frakt` : '<b>Du har fri frakt</b>';
    const pct = Math.min(100, Math.round(tot / FREE_SHIP * 100));
    $('[data-free-pct]').textContent = pct + ' %';
    $('[data-free-bar]').style.width = pct + '%';
    $('[data-free-bar]').parentElement.setAttribute('aria-valuenow', pct);
    /* Förslag efter knappen */
    $('[data-addons]').innerHTML = ADDONS.filter(a => !c.some(l => l.id === a.id)).map(a => `<div class="ev-addon">${thumb(a)}<div><b>${a.name}</b><span>${a.sub} · ${kr(a.price)}</span></div><button type="button" class="ev-btn ev-btn--sm ev-btn--secondary" data-addon="${a.id}">${icon('plus')}<span>Lägg till</span><span class="ev-sr"> ${a.name}</span></button></div>`).join('');
    $('[data-addons-wrap]').hidden = !has || !$('[data-addons]').innerHTML;
    renderSummary();
  };
  flow.addEventListener('click', e => {
    const q = e.target.closest('[data-qty]');
    if (q && q.getAttribute('aria-disabled') !== 'true') {
      const c = getCart(); const l = c[q.dataset.i]; l.qty = Math.max(1, l.qty + Number(q.dataset.qty)); setCart(c);
      const again = $(`[data-qty="${q.dataset.qty}"][data-i="${q.dataset.i}"]`); if (again) again.focus();
    }
    const r = e.target.closest('[data-remove]');
    if (r) { removeTarget = Number(r.dataset.remove); const p = byId(getCart()[removeTarget].id); $('[data-remove-name]').textContent = p.name; openDialog($('#tabort'), r); }
    const a = e.target.closest('[data-addon]');
    if (a) { addToCart(a.dataset.addon, null); toast(`${icon('check-circle')}<span>${esc(byId(a.dataset.addon).name)} ligger i varukorgen.</span>`); }
  });
  $('[data-confirm-remove]').addEventListener('click', () => {
    const c = getCart(); const gone = c.splice(removeTarget, 1)[0]; setCart(c); $('#tabort').__opener = null; $('#tabort').close();
    toast(`${icon('check-circle')}<span>${esc(byId(gone.id).name)} är borttagen.</span>`);
    const h = $('h1', steps[0]); h.setAttribute('tabindex', '-1'); h.focus();
  });
  $('[data-to-checkout]').addEventListener('click', () => show(1));

  /* Steg 2: uppgifter. Fel visas när man lämnar fältet (ux-fel-tidpunkt) */
  const RULES = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Skriv din e-post, till exempel namn@exempel.se.',
    namn: v => v.trim().split(/\s+/).length >= 2 || 'Skriv både för- och efternamn.',
    adress: v => v.trim().length >= 4 || 'Skriv gatuadress och nummer, eller välj ett förslag.',
    postnr: v => /^\d{3}\s?\d{2}$/.test(v.trim()) || 'Skriv postnumret med fem siffror, till exempel 503 30.',
    ort: v => v.trim().length >= 2 || 'Skriv vilken ort du bor på.',
    tel: v => /^[\d\s+-]{8,}$/.test(v.trim()) || 'Skriv ditt mobilnummer så att vi kan avisera leveransen.',
    kort: v => v.replace(/\s/g, '').length === 16 || 'Skriv de 16 siffrorna på kortets framsida.',
    giltig: v => /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(v.trim()) || 'Skriv månad och år som MM/ÅÅ, till exempel 08/28.',
    cvc: v => /^\d{3}$/.test(v.trim()) || 'Skriv de tre siffrorna på kortets baksida.',
    swish: v => /^07\d[\d\s-]{7,}$/.test(v.trim()) || 'Skriv mobilnumret som är kopplat till Swish, till exempel 070-123 45 67.',
    pnr: v => /^\d{6,8}[-\s]?\d{4}$/.test(v.trim()) || 'Skriv personnumret med tio eller tolv siffror.',
    villkor: (v, el) => el.checked || 'Kryssa i rutan för att godkänna köpvillkoren.'
  };
  function check(el, show) {
    const rule = RULES[el.name]; if (!rule) return true;
    const res = rule(el.type === 'checkbox' ? '' : el.value, el);
    const err = $('#' + el.name + '-fel');
    const ok = res === true;
    if (show || el.dataset.touched) {
      el.setAttribute('aria-invalid', String(!ok));
      if (err) { err.hidden = ok; $('span', err).textContent = ok ? '' : res; }
    }
    return ok;
  }
  $$('input[name]', flow).forEach(el => {
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') { el.dataset.touched = '1'; check(el, true); } updateGate(); });
    el.addEventListener('input', () => { if (el.dataset.touched) check(el, true); updateGate(); });
    el.addEventListener('change', () => { if (el.type === 'checkbox') { el.dataset.touched = '1'; check(el, true); } updateGate(); });
  });
  const visibleFields = scope => $$('input[name]', scope).filter(el => RULES[el.name] && !el.closest('[hidden]'));
  const LABELS = { email: 'e-post', namn: 'namn', adress: 'adress', postnr: 'postnummer', ort: 'ort', tel: 'mobilnummer', kort: 'kortnummer', giltig: 'giltighetstid', cvc: 'CVC', swish: 'Swish-nummer', pnr: 'personnummer', villkor: 'godkänn villkoren' };
  function gate(btnSel, scope, missSel) {
    const missing = visibleFields(scope).filter(el => !check(el, false));
    const btn = $(btnSel);
    if (missing.length) btn.setAttribute('aria-disabled', 'true'); else btn.removeAttribute('aria-disabled');
    const m = $(missSel);
    if (m) m.textContent = missing.length ? 'Fyll i ' + missing.map(el => LABELS[el.name]).slice(0, 3).join(', ') + (missing.length > 3 ? ' med mera' : '') + ' för att gå vidare.' : '';
    return missing;
  }
  function updateGate() { gate('[data-to-ship]', steps[1], '[data-miss-1]'); gate('[data-pay]', steps[3], '[data-miss-3]'); }
  function tryGo(btnSel, scope, missSel, ok) {
    const missing = gate(btnSel, scope, missSel);
    if (missing.length) {
      missing.forEach(el => { el.dataset.touched = '1'; check(el, true); });
      missing[0].focus(); missing[0].scrollIntoView({ block: 'center' });   /* ux-fel-forflyttning */
      return;
    }
    ok();
  }
  $('[data-to-ship]').addEventListener('click', () => tryGo('[data-to-ship]', steps[1], '[data-miss-1]', () => show(2)));

  /* Adressfält med förslag (ux-kassa-adress) */
  const ADDR = [['Österlånggatan 14', '503 31', 'Borås'], ['Österlånggatan 3', '503 30', 'Borås'], ['Allégatan 22', '503 32', 'Borås'], ['Älvsborgsgatan 9', '506 30', 'Borås'], ['Ålgårdsvägen 5', '507 32', 'Brämhult'], ['Åsboholmsgatan 18', '504 51', 'Borås'], ['Sandgärdsgatan 7', '503 34', 'Borås'], ['Storgatan 40', '411 38', 'Göteborg']];
  const ai = $('#adress'), sl = $('#adress-forslag');
  let ix = -1;
  const drawSug = () => {
    const v = ai.value.trim().toLowerCase();
    const hits = v.length < 2 ? [] : ADDR.filter(a => a[0].toLowerCase().startsWith(v) || a[0].toLowerCase().includes(' ' + v)).slice(0, 5);
    sl.innerHTML = hits.map((a, i) => `<li role="option" id="as-${i}" aria-selected="${i === ix}" data-a="${i}">${icon('pin')}<div>${esc(a[0])} <span>${a[1]} ${a[2]}</span></div></li>`).join('');
    sl.hidden = !hits.length; ai.setAttribute('aria-expanded', String(!!hits.length));
    sl.__hits = hits;
    if (ix >= 0 && hits[ix]) ai.setAttribute('aria-activedescendant', 'as-' + ix); else ai.removeAttribute('aria-activedescendant');
  };
  const pick = i => { const a = sl.__hits[i]; if (!a) return; ai.value = a[0]; $('#postnr').value = a[1]; $('#ort').value = a[2]; ['adress', 'postnr', 'ort'].forEach(n => { const el = $('#' + n); el.dataset.touched = '1'; check(el, true); }); sl.hidden = true; ai.setAttribute('aria-expanded', 'false'); ix = -1; updateGate(); };
  ai.addEventListener('input', () => { ix = -1; drawSug(); });
  ai.addEventListener('keydown', e => {
    if (sl.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); ix = Math.min(ix + 1, sl.__hits.length - 1); drawSug(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); ix = Math.max(ix - 1, 0); drawSug(); }
    if (e.key === 'Enter' && ix >= 0) { e.preventDefault(); pick(ix); }
    if (e.key === 'Escape') { sl.hidden = true; ai.setAttribute('aria-expanded', 'false'); }
  });
  sl.addEventListener('mousedown', e => { const li = e.target.closest('[data-a]'); if (li) { e.preventDefault(); pick(Number(li.dataset.a)); } });
  ai.addEventListener('blur', () => setTimeout(() => { sl.hidden = true; ai.setAttribute('aria-expanded', 'false'); }, 120));

  /* Steg 3: leverans. Ett val går vidare direkt (ux-flode-auto-vidare) */
  $$('[data-ship]', flow).forEach(b => b.addEventListener('click', () => {
    data.ship = b.dataset.ship;
    $$('[data-ship]', flow).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderSummary();
    setTimeout(() => show(3), 180);
  }));
  const updateShipPrices = () => $$('[data-ship]', flow).forEach(b => { const k = b.dataset.ship; const free = cartTotal() >= FREE_SHIP && k !== 'butik'; const pr = SHIP[k].price; $('.ev-choice__price', b).textContent = pr === 0 ? '0 kr' : (free ? '0 kr' : kr(pr)); });

  /* Steg 4: betalning */
  $$('input[name="betalsatt"]', flow).forEach(r => r.addEventListener('change', () => {
    data.pay = r.value;
    $$('[data-pay-body]', flow).forEach(b => b.hidden = b.dataset.payBody !== r.value);
    updateGate();
  }));
  const rk = $('[data-rabatt-btn]');
  rk.addEventListener('click', () => { const open = rk.getAttribute('aria-expanded') !== 'true'; rk.setAttribute('aria-expanded', String(open)); $('#rabatt-panel').hidden = !open; if (open) $('#rabattkod').focus(); });
  $('[data-rabatt-apply]').addEventListener('click', () => {
    const v = $('#rabattkod'), err = $('#rabattkod-fel');
    const ok = v.value.trim().toUpperCase() === 'HÖST10';
    err.hidden = ok; v.setAttribute('aria-invalid', String(!ok));
    $('span', err).textContent = ok ? '' : 'Koden fungerar inte. Kontrollera stavningen, eller prova HÖST10 i det här konceptet.';
    if (ok) { data.discount = 0.1; renderSummary(); $('[data-rabatt-ok]').hidden = false; }
  });
  function fillReview() {
    const val = n => $(`[name="${n}"]`).value.trim();
    $('[data-r-contact]').textContent = `${val('namn')}, ${val('email')}, ${val('tel')}`;
    $('[data-r-address]').textContent = `${val('adress')}, ${val('postnr')} ${val('ort')}`;
    $('[data-r-ship]').textContent = data.ship ? `${SHIP[data.ship].name} · ${shipCost() === 0 ? '0 kr' : kr(shipCost())}` : '';
    const items = getCart().reduce((n, l) => n + l.qty, 0);
    $('[data-r-cart]').textContent = `${items} ${items === 1 ? 'vara' : 'varor'} · ${kr(cartTotal())}`;
    updateGate();
  }
  $$('[data-edit]', flow).forEach(a => a.addEventListener('click', e => { e.preventDefault(); show(Number(a.dataset.edit)); }));
  $('[data-pay]').addEventListener('click', () => tryGo('[data-pay]', steps[3], '[data-miss-3]', () => {
    const b = $('[data-pay]'); $('span', b).textContent = 'Slutför köp …';
    setTimeout(() => {
      const nr = 'KH-' + (104000 + Math.floor(Math.random() * 900));
      $('[data-order-nr]').textContent = nr;
      $('[data-order-mail]').textContent = $('[name="email"]').value.trim();
      $('[data-order-total]').textContent = kr(grandTotal());
      $('[data-order-ship]').textContent = SHIP[data.ship].name.toLowerCase();
      $('[data-order-pay]').textContent = { kort: 'kort', swish: 'Swish', faktura: 'faktura' }[data.pay];
      setCart([]);
      show(4);
    }, 600);
  }));
  const grandTotal = () => { const sub = cartTotal(); const d = data.discount ? Math.round(sub * data.discount) : 0; return sub - d + (shipCost() || 0); };

  function renderSummary() {
    const c = getCart();
    const sub = cartTotal();
    const d = data.discount ? Math.round(sub * data.discount) : 0;
    $('[data-sum-items]').innerHTML = c.map(l => { const p = byId(l.id); return p ? `<li>${thumb(p)}<div><b>${esc(p.name)}</b><span>${l.size ? 'Storlek ' + l.size + ' · ' : ''}${l.qty} st</span></div><span class="ev-price">${kr(p.price * l.qty)}</span></li>` : ''; }).join('');
    $('[data-sum-sub]').textContent = kr(sub);
    $('[data-sum-discount-row]').hidden = !d;
    $('[data-sum-discount]').textContent = '−' + kr(d);
    const sc = shipCost();
    $('[data-sum-ship]').textContent = sc === null ? (sub >= FREE_SHIP ? '0 kr' : 'från 0 kr') : (sc === 0 ? '0 kr' : kr(sc));
    const tot = sub - d + (sc || 0);
    $('[data-sum-total]').textContent = kr(tot);
    $('[data-sum-vat]').textContent = kr(Math.round(tot * 0.2));
    $$('[data-pay-total]').forEach(el => el.textContent = kr(tot));
    updateShipPrices();
  }
  $('[data-account]').addEventListener('click', e => { const b = e.currentTarget; b.classList.add('is-saved'); b.innerHTML = `${icon('check')}<span>Konto skapat</span>`; });

  window.__checkoutRender();
  const startHash = { '#uppgifter': 1, '#leverans': 2, '#betalning': 3 }[location.hash];
  show(startHash && getCart().length ? startHash : 0, false);
}

renderCartUI();
})();
