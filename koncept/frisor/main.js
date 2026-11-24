/* Hårfin frisörer: designkoncept av Elevate Studio. Påhittad salong med exempeldata. Ingenting skickas. */
(() => {
  'use strict';

  /* ---------- Ikoner (24-rutnät, linje, rundade ändar) ---------- */
  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.4c2 .8 3.5 2.9 3.5 5.6"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    scissors: '<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M8.6 8.4 19 17M8.6 15.6 19 7"/>',
    tag: '<path d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8.5" cy="8.5" r="1.5"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5 12 13.5l8.5-6"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    errorCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  const icon = (name, cls = '') => `<svg class="ev-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name]}</svg>`;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const fmtTime = m => `${pad(Math.floor(m / 60))}.${pad(m % 60)}`;
  const DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fmtDate = d => `${cap(DAYS[d.getDay()])} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const isoDay = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const sameDay = (a, b) => a && b && isoDay(a) === isoDay(b);
  const kr = n => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.toLowerCase().normalize('NFC').trim();
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Exempeldata ---------- */
  const CATS = { klipp: 'Klippning', farg: 'Färg', styling: 'Styling och vård', skagg: 'Skägg' };
  const TREATMENTS = [
    { id: 'klipp-kort', cat: 'klipp', name: 'Klippning, kort hår', desc: 'Tvätt, klippning och enkel styling', min: 45, price: 595, pop: 1, kw: 'dam klipp' },
    { id: 'klipp-langt', cat: 'klipp', name: 'Klippning, långt hår', desc: 'Tvätt, klippning och föning', min: 60, price: 695, pop: 2, kw: 'dam klipp' },
    { id: 'herr', cat: 'klipp', name: 'Herrklippning', desc: 'Klippning med maskin eller sax, tvätt ingår', min: 30, price: 450, pop: 3, kw: 'kille man klipp' },
    { id: 'barn', cat: 'klipp', name: 'Barnklippning, upp till 12 år', desc: 'Vi tar den tid som behövs', min: 30, price: 350, kw: 'barn junior klipp' },
    { id: 'lugg', cat: 'klipp', name: 'Luggklippning', desc: 'Mellan klippningarna, utan tvätt', min: 15, price: 150, kw: 'lugg klipp' },
    { id: 'slingor', cat: 'farg', name: 'Slingor med folie', desc: 'Inklusive toning, klippning och styling', min: 150, price: 1695, pop: 4, kw: 'blond färg slingor' },
    { id: 'balayage', cat: 'farg', name: 'Balayage', desc: 'Frihandsmålade slingor, toning och klippning', min: 180, price: 2295, kw: 'färg blond ljus' },
    { id: 'helfarg', cat: 'farg', name: 'Helfärg och klippning', desc: 'En färg från bottnen till topparna', min: 120, price: 1650, kw: 'färg grått' },
    { id: 'utvaxt', cat: 'farg', name: 'Utväxtfärg', desc: 'Färg på utväxten, upp till 3 cm', min: 75, price: 895, kw: 'färg grått' },
    { id: 'toning', cat: 'farg', name: 'Toning och glans', desc: 'Friskar upp färgen och ger glans', min: 45, price: 595, kw: 'färg glans' },
    { id: 'fon', cat: 'styling', name: 'Tvätt och fön', desc: 'Volym, lockar eller rakt', min: 30, price: 395, kw: 'styling föning' },
    { id: 'uppsattning', cat: 'styling', name: 'Uppsättning för fest', desc: 'Bröllop, studenten eller fest. Provning ingår inte', min: 60, price: 795, kw: 'styling bröllop fest' },
    { id: 'inpackning', cat: 'styling', name: 'Inpackning och hårbottenmassage', desc: 'Återfuktande inpackning med 15 minuters massage', min: 30, price: 395, kw: 'vård massage' },
    { id: 'skaggtrim', cat: 'skagg', name: 'Skäggtrim', desc: 'Form, längd och konturer med kniv', min: 20, price: 250, kw: 'skägg man' },
    { id: 'herr-skagg', cat: 'skagg', name: 'Herrklippning och skägg', desc: 'Klippning, tvätt och skäggtrim', min: 45, price: 650, pop: 5, kw: 'skägg man klipp' }
  ];
  const STAFF = [
    { id: 'sara', name: 'Sara Lindqvist', role: 'Frisör, färgspecialist', img: 'img/portratt-1.jpg', days: [2, 3, 4, 5, 6], daysTxt: 'tisdag–lördag' },
    { id: 'jonas', name: 'Jonas Ek', role: 'Frisör och ägare', img: 'img/portratt-2.jpg', days: [1, 2, 3, 4, 5], daysTxt: 'måndag–fredag' },
    { id: 'annika', name: 'Annika Holm', role: 'Seniorfrisör', img: 'img/portratt-3.jpg', days: [1, 2, 3, 4], daysTxt: 'måndag–torsdag' }
  ];
  // Öppettider i minuter, söndag = 0
  const HOURS = { 0: null, 1: [540, 1140], 2: [540, 1140], 3: [540, 1140], 4: [540, 1140], 5: [540, 1080], 6: [540, 960] };
  const byId = (list, id) => list.find(x => x.id === id);

  /* ---------- Öppet nu (pi-et-oppet: bara grön text) ---------- */
  (function openStatus() {
    const now = new Date();
    const h = HOURS[now.getDay()];
    const m = now.getHours() * 60 + now.getMinutes();
    $$('[data-open-status]').forEach(el => {
      if (h && m >= h[0] && m < h[1]) { el.className = 'ev-open'; el.textContent = `Öppet nu, till ${fmtTime(h[1])}`; }
      else {
        let d = new Date(now), guard = 0;
        if (h && m < h[0]) { el.className = 'ev-closed'; el.textContent = `Stängt, öppnar ${fmtTime(h[0])}`; return; }
        do { d.setDate(d.getDate() + 1); guard++; } while (!HOURS[d.getDay()] && guard < 7);
        el.className = 'ev-closed';
        el.textContent = `Stängt, öppnar ${guard === 1 ? 'i morgon' : DAYS[d.getDay()]} ${fmtTime(HOURS[d.getDay()][0])}`;
      }
    });
    $$('.ev-hours tr[data-days]').forEach(tr => {
      if (tr.dataset.days.split(',').map(Number).includes(now.getDay())) tr.classList.add('is-today');
    });
  })();

  /* ---------- Mobilmeny (panel i helskärm) ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">
        <a class="ev-logo" href="index.html">Hårfin<b>.</b></a>
        <button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button>
      </div>
      <nav aria-label="Huvudmeny"><ul>${links}</ul></nav>
      <div class="ev-menu__foot">
        <p class="ev-iconline">${icon('phone', 'ev-icon--20')}<span><a href="tel:+46100000000">010-000 00 00</a>. Vi svarar när salongen är öppen.</span></p>
        <p class="ev-iconline">${icon('pin', 'ev-icon--20')}<span>Stora Gatan 18, Västerås</span></p>
      </div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    dlg.addEventListener('click', e => { if (e.target.closest('[data-close]')) dlg.close(); });
  }

  /* ---------- Dragspel: första öppen, en öppen i taget ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Filterchips på prissidan ---------- */
  const chipGroup = $('[data-cat-filter]');
  if (chipGroup) {
    const chips = $$('.ev-chip', chipGroup);
    const groups = $$('.ev-price-group');
    const status = $('[data-filter-status]');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      const cat = c.dataset.cat;
      groups.forEach(g => { g.hidden = cat !== 'alla' && g.dataset.cat !== cat; });
      const n = groups.filter(g => !g.hidden).reduce((a, g) => a + $$('.ev-rows li', g).length, 0);
      if (status) status.textContent = `${n} behandlingar`;
    }));
  }

  /* ---------- Sökfält i heron med förslag (ux-sok-forslag, ux-sok-forslag-markering) ---------- */
  function matches(q) {
    const n = norm(q);
    if (!n) return [];
    return TREATMENTS.filter(t => norm(`${t.name} ${CATS[t.cat]} ${t.kw}`).includes(n));
  }
  // Det man har skrivit står normalt och resten av ordet är fetat
  function highlight(name, q) {
    const i = norm(name).indexOf(norm(q));
    if (i < 0 || !q.trim()) return `<b>${esc(name)}</b>`;
    const a = name.slice(0, i), m = name.slice(i, i + q.trim().length), b = name.slice(i + q.trim().length);
    return `${a ? `<b>${esc(a)}</b>` : ''}${esc(m)}${b ? `<b>${esc(b)}</b>` : ''}`;
  }
  $$('[data-search]').forEach(form => {
    const input = $('input', form);
    const list = $('.ev-search__list', form);
    let items = [], active = -1;
    const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; };
    const draw = () => {
      const q = input.value;
      const found = q.trim() ? matches(q).slice(0, 6) : TREATMENTS.filter(t => t.pop).sort((a, b) => a.pop - b.pop);
      items = found;
      if (!found.length) {
        list.innerHTML = `<li class="ev-search__head" role="presentation">Ingen behandling heter så. Tryck på Sök så visar vi alla.</li>`;
      } else {
        list.innerHTML = (q.trim() ? '' : '<li class="ev-search__head" role="presentation">Populära behandlingar</li>') +
          found.map((t, i) => `<li role="option" id="sok-${i}" data-i="${i}" aria-selected="false"><span>${q.trim() ? highlight(t.name, q) : esc(t.name)}</span><span>från ${kr(t.price)}</span></li>`).join('');
      }
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      active = -1;
    };
    const setActive = i => {
      const opts = $$('[role="option"]', list);
      if (!opts.length) return;
      active = (i + opts.length) % opts.length;
      opts.forEach((o, k) => o.setAttribute('aria-selected', String(k === active)));
      input.setAttribute('aria-activedescendant', opts[active].id);
    };
    const pick = i => { location.href = `boka.html?behandling=${items[i].id}`; };
    input.addEventListener('input', draw);
    input.addEventListener('focus', draw);
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) draw(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Escape') { if (!list.hidden) { e.preventDefault(); close(); } }
      else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); pick(active); }
    });
    list.addEventListener('mousedown', e => e.preventDefault());
    list.addEventListener('click', e => { const li = e.target.closest('[role="option"]'); if (li) pick(Number(li.dataset.i)); });
    input.addEventListener('blur', () => setTimeout(close, 100));
  });

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  const footer = $('.ev-footer');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let pastAnchor = false, atFooter = false;
    const upd = () => { const on = pastAnchor && !atFooter; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([en]) => { pastAnchor = !en.isIntersecting && en.boundingClientRect.top < 0; upd(); }).observe(anchor);
    if (footer) new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; upd(); }).observe(footer);
    upd();
  }

  /* ---------- Formulärfel: när man lämnar fältet (ux-fel-*) ---------- */
  function fieldError(el) {
    const v = el.value.trim();
    if (el.required && !v) return el.dataset.error || 'Fyll i fältet.';
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Skriv e-postadressen som namn@exempel.se.';
    if (el.type === 'tel' && v.replace(/[^\d]/g, '').length < 8) return 'Skriv mobilnumret med riktnummer, till exempel 070-123 45 67.';
    return '';
  }
  function showError(el, msg) {
    const box = el.closest('.ev-field');
    let err = $('.ev-error', box);
    if (!err) {
      err = document.createElement('p');
      err.className = 'ev-error';
      err.id = el.id + '-fel';
      box.append(err);
    }
    if (msg) {
      err.innerHTML = icon('errorCircle') + `<span>${msg}</span>`;
      err.hidden = false;
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
    } else {
      err.hidden = true;
      el.removeAttribute('aria-invalid');
    }
  }
  function validator(root, { submit, missingEl }) {
    const fields = () => $$('input, textarea', root);
    const touched = new Set();
    const refresh = () => {
      const bad = fields().filter(f => fieldError(f));
      submit.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      const names = bad.map(f => f.dataset.name);
      missingEl.textContent = bad.length ? `Fyll i ${names.length > 1 ? names.slice(0, -1).join(', ') + ' och ' + names.at(-1) : names[0]} för att gå vidare.` : '';
      missingEl.hidden = !bad.length;
      return bad;
    };
    root.addEventListener('focusout', e => {
      const f = e.target;
      if (!f.matches('input, textarea')) return;
      if (f.value.trim() || f.required) { touched.add(f); showError(f, fieldError(f)); }
    });
    root.addEventListener('input', e => {
      const f = e.target;
      if (touched.has(f) && f.getAttribute('aria-invalid') === 'true') showError(f, fieldError(f));
      refresh();
    });
    const attempt = () => {
      const bad = refresh();
      if (!bad.length) return true;
      bad.forEach(f => { touched.add(f); showError(f, fieldError(f)); });
      bad[0].focus();
      bad[0].scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
      return false;
    };
    refresh();
    return { attempt };
  }

  /* =========================================================
     Tidsbokning: Behandling, Frisör, Tid, Uppgifter, Bekräfta
     ========================================================= */
  const flow = $('[data-flow]');
  if (!flow) return;

  const STEPS = ['Behandling', 'Frisör', 'Tid', 'Uppgifter', 'Bekräfta'];
  const host = $('[data-step-host]', flow);
  const foot = $('[data-foot-action]', flow);
  const stepsEl = $('.ev-steps', flow);
  const book = $('.ev-book');
  const params = new URLSearchParams(location.search);
  const state = { t: null, s: null, date: null, time: null, name: '', phone: '', email: '', note: '', step: 1, q: params.get('q') || '', returnTo: null };
  if (byId(TREATMENTS, params.get('behandling'))) state.t = params.get('behandling');
  if (params.get('frisor') === 'alla' || byId(STAFF, params.get('frisor'))) state.s = params.get('frisor');
  let calMonth = null, calOpen = false;

  // Krysset tar dig tillbaka dit du kom ifrån (ux-flode-avbryt)
  const closeLink = $('.ev-flow__close');
  try {
    const ref = document.referrer && new URL(document.referrer);
    if (ref && ref.origin === location.origin && !ref.pathname.endsWith('boka.html')) closeLink.href = ref.href;
  } catch (e) { /* behåll index.html */ }

  /* Lediga tider (exempel, samma resultat varje gång för samma dag) */
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDay = new Date(today); lastDay.setDate(lastDay.getDate() + 56);
  function staffFree(staff, date, t, min) {
    let h = 7;
    for (const c of isoDay(date) + staff.id + t) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const weekDayBusy = date.getDay() === 6 || date.getDay() === 5 ? 6 : 4;
    return h % 10 >= weekDayBusy - (min > 90 ? 0 : 1);
  }
  function slotsFor(date) {
    const hrs = HOURS[date.getDay()];
    if (!hrs || date < today || date > lastDay) return [];
    const tr = byId(TREATMENTS, state.t);
    const min = tr ? tr.min : 45;
    const staffList = state.s && state.s !== 'alla' ? [byId(STAFF, state.s)] : STAFF;
    const working = staffList.filter(s => s.days.includes(date.getDay()));
    const nowM = sameDay(date, now) ? now.getHours() * 60 + now.getMinutes() + 45 : -1;
    const out = [];
    for (let t = hrs[0]; t + min <= hrs[1]; t += 30) {
      if (t <= nowM) continue;
      if (working.some(s => staffFree(s, date, t, min))) out.push(t);
    }
    return out;
  }
  function firstFreeDay(from = today) {
    const d = new Date(from);
    for (let i = 0; i < 60; i++) { if (slotsFor(d).length) return new Date(d); d.setDate(d.getDate() + 1); }
    return null;
  }

  /* Sammanfattning bredvid stegen */
  function updateSummary() {
    const tr = byId(TREATMENTS, state.t);
    const st = state.s === 'alla' ? { name: 'Första lediga frisör' } : byId(STAFF, state.s);
    const set = (k, v) => { const dd = $(`[data-sum="${k}"]`); if (!dd) return; dd.textContent = v || 'Inte valt än'; dd.classList.toggle('is-empty', !v); };
    set('t', tr ? `${tr.name}, ${tr.min} min` : '');
    set('s', st ? st.name : '');
    set('time', state.date && state.time != null ? `${fmtDate(state.date)}, kl. ${fmtTime(state.time)}` : '');
    set('price', tr ? `från ${kr(tr.price)}` : '');
  }

  function updateSteps() {
    const s = Math.min(state.step, 5);
    $('.ev-steps__count', stepsEl).textContent = `Steg ${s} av ${STEPS.length}`;
    $$('.ev-steps__list li', stepsEl).forEach((li, i) => { if (i === s - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', stepsEl).forEach((d, i) => d.classList.toggle('is-on', i === s - 1));
    stepsEl.hidden = state.step > 5;
    book.classList.toggle('is-done', state.step > 5);
    book.dataset.step = state.step;
  }

  function valid(step) {
    if (step >= 2 && !state.t) return 1;
    if (step >= 3 && !state.s) return 2;
    if (step >= 4 && (!state.date || state.time == null)) return 3;
    if (step >= 5 && !(state.name && state.phone && state.email)) return 4;
    return step;
  }

  function go(step, { push = true, focus = true } = {}) {
    step = valid(step);
    state.step = step;
    render();
    if (push) history.pushState({ step }, '', `?steg=${step}`);
    if (focus) {
      const h = $('h1', host);
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }
  // Efter Ändra kommer man tillbaka till sista steget om allt annat fortfarande gäller
  function next(from) {
    if (state.returnTo && valid(state.returnTo) === state.returnTo) { const r = state.returnTo; state.returnTo = null; go(r); }
    else go(from + 1);
  }
  window.addEventListener('popstate', e => { if (e.state && e.state.step) go(e.state.step, { push: false }); });

  const backLink = () => `<button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>`;
  const arrowBtn = (text, attrs = '') => `<button class="ev-btn ev-btn--block" ${attrs}><span>${text}</span>${icon('arrow', 'ev-btn__arrow')}</button>`;

  function render() {
    const s = state.step;
    foot.innerHTML = '';
    updateSteps();
    updateSummary();

    if (s === 1) {
      const q = state.q.trim();
      const found = q ? matches(q) : [];
      const list = q && found.length ? found : TREATMENTS;
      const groups = Object.keys(CATS).map(c => [c, list.filter(t => t.cat === c)]).filter(([, l]) => l.length);
      host.innerHTML = `
        <section class="ev-step">
          <h1>Vad vill du boka?</h1>
          <p class="ev-hint">Det tar ungefär en minut. Välj en behandling så går du vidare.</p>
          <div class="ev-step__body">
            ${q ? `<p class="ev-search-note" role="status">${found.length ? `Visar ${found.length} av ${TREATMENTS.length} behandlingar för ”${esc(q)}”.` : `Vi hittade ingen behandling för ”${esc(q)}”. Här är alla.`}
              ${found.length ? '<button class="ev-link" type="button" data-clear-q>Visa alla behandlingar</button>' : ''}</p>` : ''}
            ${groups.map(([c, l]) => `
              <div class="ev-optgroup">
                <h2>${CATS[c]}</h2>
                <div class="ev-optlist">
                  ${l.map(t => `<button type="button" class="ev-opt-btn" data-t="${t.id}" aria-pressed="${state.t === t.id}"><b>${t.name}</b><small>${t.min} min · ${t.desc}</small><span class="ev-price"><span class="ev-sr">Pris </span>från ${kr(t.price)}</span></button>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </section>`;
      $$('[data-t]', host).forEach(b => b.addEventListener('click', () => {
        if (state.t !== b.dataset.t) state.time = null;
        state.t = b.dataset.t; next(1);
      }));
      const clr = $('[data-clear-q]', host);
      if (clr) clr.addEventListener('click', () => { state.q = ''; render(); $('h1', host).focus(); });
    }

    if (s === 2) {
      const tr = byId(TREATMENTS, state.t);
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h1>Vem vill du gå till?</h1>
          <p class="ev-hint">${tr.name}, ${tr.min} minuter. Välj en frisör så går du vidare.</p>
          <div class="ev-step__body ev-optlist">
            <button type="button" class="ev-opt-btn ev-opt-btn--person" data-s="alla" aria-pressed="${state.s === 'alla'}"><span class="ev-avatar">${icon('users')}</span><b>Första lediga frisör</b><small>Flest lediga tider</small></button>
            ${STAFF.map(p => `<button type="button" class="ev-opt-btn ev-opt-btn--person" data-s="${p.id}" aria-pressed="${state.s === p.id}"><img src="${p.img}" alt="" width="56" height="56"><b>${p.name}</b><small>${p.role}. Jobbar ${p.daysTxt}</small></button>`).join('')}
          </div>
        </section>`;
      $$('[data-s]', host).forEach(b => b.addEventListener('click', () => {
        if (state.s !== b.dataset.s) state.time = null;
        state.s = b.dataset.s; next(2);
      }));
    }

    if (s === 3) {
      const tr = byId(TREATMENTS, state.t);
      const st = state.s === 'alla' ? null : byId(STAFF, state.s);
      if (!state.date || !slotsFor(state.date).length) { state.date = firstFreeDay(); state.time = null; }
      const d = state.date;
      const slots = d ? slotsFor(d) : [];
      const parts = [['Förmiddag', t => t < 720], ['Eftermiddag', t => t >= 720 && t < 1020], ['Kväll', t => t >= 1020]]
        .map(([n, f]) => [n, slots.filter(f)]).filter(([, l]) => l.length);
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h1>När passar det?</h1>
          <p class="ev-hint">${tr.name} ${st ? `hos ${st.name.split(' ')[0]}` : 'hos första lediga frisör'}. Välj en tid så går du vidare.</p>
          <div class="ev-step__body">
            <div class="ev-field ev-datefield">
              <span class="ev-label" id="datum-etikett">Datum</span>
              <button type="button" class="ev-input ev-datebtn" aria-labelledby="datum-etikett datum-varde" aria-expanded="${calOpen}" aria-controls="datum-pop" data-datebtn>
                <span>${icon('cal')}<span id="datum-varde">${d ? fmtDate(d) : 'Välj dag'}</span></span>${icon('chevD', 'ev-chev')}
              </button>
              <div class="ev-datepop" id="datum-pop" ${calOpen ? '' : 'hidden'} data-cal></div>
            </div>
            <div class="ev-times" aria-live="polite">
              ${parts.length ? parts.map(([n, l], gi) => `
                <h2 id="tid-${gi}">${n}</h2>
                <div class="ev-timegrid" role="group" aria-labelledby="tid-${gi}">
                  ${l.map(t => `<button type="button" class="ev-time" data-time="${t}" aria-pressed="${state.time === t}" aria-label="kl. ${fmtTime(t)} till ${fmtTime(t + tr.min)}">${fmtTime(t)}</button>`).join('')}
                </div>`).join('') : '<p>Det finns inga lediga tider de närmaste veckorna. Ring oss på <a class="ev-inline-link" href="tel:+46100000000">010-000 00 00</a> så hittar vi en tid.</p>'}
            </div>
            <p class="ev-step__more">Behandlingen tar ${tr.min} minuter. Hittar du ingen tid? Välj en annan frisör eller ring oss.</p>
          </div>
        </section>`;
      const dbtn = $('[data-datebtn]', host);
      const pop = $('[data-cal]', host);
      if (calOpen) drawCal(pop);
      dbtn.addEventListener('click', () => {
        calOpen = !calOpen;
        dbtn.setAttribute('aria-expanded', String(calOpen));
        pop.hidden = !calOpen;
        if (calOpen) { drawCal(pop); const sel = $('[aria-pressed="true"]', pop) || $('td button:not(:disabled)', pop); if (sel) sel.focus(); }
      });
      pop.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); calOpen = false; pop.hidden = true; dbtn.setAttribute('aria-expanded', 'false'); dbtn.focus(); } });
      $$('[data-time]', host).forEach(b => b.addEventListener('click', () => { state.time = Number(b.dataset.time); next(3); }));
    }

    if (s === 4) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h1>Vem kommer?</h1>
          <p class="ev-hint">Vi skickar bekräftelsen med sms och en påminnelse dagen innan.</p>
          <div class="ev-step__body ev-form" data-form>
            <div class="ev-field"><label for="b-namn">Namn</label>
              <input class="ev-input" id="b-namn" autocomplete="name" placeholder="Anna Svensson" required data-name="namn" data-error="Skriv ditt namn så vet vi vem tiden är till."></div>
            <div class="ev-field"><label for="b-tel">Mobilnummer</label>
              <input class="ev-input" id="b-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="070-123 45 67" required data-name="mobilnummer" data-error="Skriv ditt mobilnummer så att vi kan skicka bekräftelsen."></div>
            <div class="ev-field"><label for="b-epost">E-post</label>
              <input class="ev-input" id="b-epost" type="email" autocomplete="email" placeholder="anna@exempel.se" required data-name="e-post" data-error="Skriv din e-postadress, till exempel anna@exempel.se."></div>
            <div class="ev-field"><label for="b-note">Till frisören <span class="ev-opt">(valfritt)</span></label>
              <textarea class="ev-input" id="b-note" rows="3" placeholder="Till exempel om du vill prova något nytt eller har känslig hårbotten"></textarea></div>
          </div>
        </section>`;
      foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="b-saknas"')}<p class="ev-form__missing" id="b-saknas"></p>`;
      const form = $('[data-form]', host);
      const f = { name: '#b-namn', phone: '#b-tel', email: '#b-epost', note: '#b-note' };
      Object.entries(f).forEach(([k, sel]) => { $(sel, host).value = state[k]; });
      const cont = $('[data-continue]', foot);
      const v = validator(form, { submit: cont, missingEl: $('#b-saknas', foot) });
      form.addEventListener('input', () => Object.entries(f).forEach(([k, sel]) => { state[k] = $(sel, host).value.trim(); }));
      cont.addEventListener('click', () => { if (v.attempt()) { state.returnTo = null; go(5); } });
      form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); cont.click(); } });
    }

    if (s === 5) {
      const tr = byId(TREATMENTS, state.t);
      const st = state.s === 'alla' ? null : byId(STAFF, state.s);
      const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h1>Stämmer det här?</h1>
          <p class="ev-hint">Titta igenom bokningen innan du bokar.</p>
          <div class="ev-step__body">
            <dl class="ev-review">
              ${row('Behandling', `${tr.name}<br><span>${tr.min} min, från ${kr(tr.price)}</span>`, 1, 'behandling')}
              ${row('Frisör', st ? st.name : 'Första lediga frisör', 2, 'frisör')}
              ${row('Tid', `${fmtDate(state.date)}<br><span>kl. ${fmtTime(state.time)}–${fmtTime(state.time + tr.min)}</span>`, 3, 'tid')}
              ${row('Uppgifter', `${esc(state.name)}<br><span>${esc(state.phone)} · ${esc(state.email)}</span>`, 4, 'uppgifter')}
              ${state.note ? row('Till frisören', `<span>${esc(state.note)}</span>`, 4, 'meddelandet till frisören') : ''}
            </dl>
            <p class="ev-policy">Du betalar i salongen med kort eller Swish. Avboka eller flytta tiden utan kostnad senast 24 timmar innan, via länken i sms:et.</p>
          </div>
        </section>`;
      foot.innerHTML = arrowBtn('Boka tid', 'type="button" data-confirm');
      $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { state.returnTo = 5; go(Number(b.dataset.edit)); }));
      $('[data-confirm]', foot).addEventListener('click', e => {
        const b = e.currentTarget;
        if (b.getAttribute('aria-disabled') === 'true') return;
        b.setAttribute('aria-disabled', 'true');
        b.querySelector('span').textContent = 'Bokar …';
        setTimeout(() => go(6), 600);
      });
    }

    if (s === 6) {
      const tr = byId(TREATMENTS, state.t);
      const st = state.s === 'alla' ? STAFF.find(p => p.days.includes(state.date.getDay())) : byId(STAFF, state.s);
      host.innerHTML = `
        <section class="ev-step" role="status">
          <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
          <h1>Tiden är bokad</h1>
          <p style="margin-top:12px;max-width:52ch">${tr.name} hos ${st.name.split(' ')[0]}, ${fmtDate(state.date).toLowerCase()} kl. ${fmtTime(state.time)}. Bekräftelsen skickas till ${esc(state.phone)} och ${esc(state.email)}.</p>
          <p class="ev-hint" style="margin-top:12px">Det här är ett designkoncept. Ingen bokning skickas på riktigt.</p>
        </section>`;
      foot.innerHTML = `<div class="ev-actions" style="margin-top:0"><button class="ev-btn" type="button" data-ics><span>Lägg till i kalendern</span>${icon('download')}</button><a class="ev-link" href="index.html">Till startsidan${icon('arrow', 'ev-link__arrow')}</a></div>`;
      $('[data-ics]', foot).addEventListener('click', () => downloadIcs(tr, st));
    }

    const back = $('[data-back]', host);
    if (back) back.addEventListener('click', () => { state.returnTo = null; go(state.step - 1); });
  }

  function drawCal(pop) {
    const base = calMonth || state.date || today;
    const y = base.getFullYear(), m = base.getMonth();
    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7;
    const daysIn = new Date(y, m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<td></td>';
    for (let day = 1; day <= daysIn; day++) {
      const dt = new Date(y, m, day);
      const free = slotsFor(dt).length > 0;
      const out = dt < today || dt > lastDay;
      const lbl = `${fmtDate(dt)}${sameDay(dt, today) ? ', i dag' : ''}${!out && !free ? (HOURS[dt.getDay()] ? ', inga lediga tider' : ', stängt') : ''}`;
      cells += `<td><button type="button" data-date="${isoDay(dt)}" aria-label="${lbl}" aria-pressed="${sameDay(dt, state.date)}" class="${sameDay(dt, today) ? 'is-today' : ''}"${!free ? ' disabled' : ''}>${day}</button></td>`;
      if ((offset + day) % 7 === 0 && day < daysIn) cells += '</tr><tr>';
    }
    const prevOk = new Date(y, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
    const nextOk = new Date(y, m + 1, 1) <= lastDay;
    pop.innerHTML = `
      <div class="ev-cal">
        <div class="ev-cal__head">
          <b aria-live="polite">${cap(MONTHS[m])} ${y}</b>
          <div class="ev-cal__nav">
            <button type="button" data-month="-1" aria-label="Föregående månad" aria-disabled="${!prevOk}">${icon('chevL')}</button>
            <button type="button" data-month="1" aria-label="Nästa månad" aria-disabled="${!nextOk}">${icon('chevR')}</button>
          </div>
        </div>
        <table aria-label="${cap(MONTHS[m])} ${y}">
          <thead><tr>${['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((d, i) => `<th scope="col"><span aria-hidden="true">${d}</span><span class="ev-sr">${cap(DAYS[(i + 1) % 7])}</span></th>`).join('')}</tr></thead>
          <tbody><tr>${cells}</tr></tbody>
        </table>
        <p class="ev-hint" style="margin-top:8px">Överstrukna dagar är stängda eller fullbokade.</p>
      </div>`;
    $$('[data-month]', pop).forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-disabled') === 'true') return;
      calMonth = new Date(y, m + Number(b.dataset.month), 1);
      drawCal(pop);
      $(`[data-month="${b.dataset.month}"]`, pop).focus();
    }));
    $$('[data-date]', pop).forEach(b => b.addEventListener('click', () => {
      const [yy, mm, dd] = b.dataset.date.split('-').map(Number);
      state.date = new Date(yy, mm - 1, dd);
      state.time = null;
      calOpen = false;
      render();
      const t = $('.ev-time', host);
      (t || $('[data-datebtn]', host)).focus();
    }));
  }

  function downloadIcs(tr, st) {
    const d = state.date;
    const stamp = m => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Harfin koncept//SV', 'BEGIN:VEVENT',
      `UID:${Date.now()}@harfin.example`, `DTSTART:${stamp(state.time)}`, `DTEND:${stamp(state.time + tr.min)}`,
      `SUMMARY:${tr.name} hos ${st.name.split(' ')[0]}, Hårfin`, 'LOCATION:Stora Gatan 18\\, Västerås', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'harfin-bokning.ics';
    document.body.append(a); a.click(); a.remove();
    const b = $('[data-ics]', foot);
    b.classList.add('is-saved');
    b.innerHTML = `<span>Sparat</span><svg class="ev-icon ev-draw" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
  }

  // Starta på rätt steg utifrån länken (behandling och frisör har besökaren valt på förra sidan)
  const start = state.t ? (state.s ? 3 : 2) : 1;
  history.replaceState({ step: start }, '');
  go(start, { push: false, focus: start > 1 });
})();
