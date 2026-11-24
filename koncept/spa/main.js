/* Ljung dagspa: designkoncept av Elevate Studio. Påhittat spa med exempeldata. Ingenting skickas. */
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
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.4c2 .8 3.5 2.9 3.5 5.6"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4.5" rx="1.5"/><path d="M5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6.5M12 8v12.5M12 8c-1.5-3.5-5.5-3.5-5-1 .3 1 2.5 1 5 1zm0 0c1.5-3.5 5.5-3.5 5-1-.3 1-2.5 1-5 1z"/>',
    leaf: '<path d="M5 19c0-8.3 5.3-14 15-14 0 9.7-5.7 15-14 15z"/><path d="M5 19l8-8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5 12 13.5l8.5-6"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M3 10h18M7 15h3"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    errorCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
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
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Exempeldata ---------- */
  // Öppettider i minuter, söndag = 0, måndag stängt
  const HOURS = { 0: [540, 1080], 1: null, 2: [540, 1260], 3: [540, 1260], 4: [540, 1260], 5: [540, 1260], 6: [540, 1080] };
  const PACKAGES = [
    { id: 'kvall', name: 'Kvällsbad', price: 595, desc: 'Tre timmar med bad, bastu och te', times: [1020, 1050, 1080, 1110], days: [2, 3, 4, 5], dur: 180 },
    { id: 'spadag', name: 'Spadag', price: 1295, desc: 'Hela dagen med lunch och 25 minuters massage', times: [540, 600, 660], days: [0, 2, 3, 4, 5, 6], dur: 480 },
    { id: 'ljungdag', name: 'Ljungdagen', price: 2195, desc: 'Spadag med ansiktsbehandling, massage och bubbel', times: [540, 600], days: [0, 2, 3, 4, 5, 6], dur: 480 }
  ];
  const ADDONS = [
    { id: 'ansikte', name: 'Ansiktsbehandling', desc: '30 min, rengöring, mask och massage', price: 595 },
    { id: 'massage', name: 'Helkroppsmassage', desc: '50 min, klassisk eller lugn', price: 795 },
    { id: 'fot', name: 'Fotbad och fotmassage', desc: '25 min', price: 395 },
    { id: 'ost', name: 'Bubbel och ostbricka', desc: 'Alkoholfritt finns', price: 245 }
  ];
  const CARDS = [
    { id: 'v500', name: 'Värdebevis 500 kr', desc: 'Räcker till en fotbehandling eller ett kvällsbad', price: 500, group: 'Värdebevis' },
    { id: 'v1000', name: 'Värdebevis 1 000 kr', desc: 'Räcker till en ansiktsbehandling eller massage', price: 1000, group: 'Värdebevis' },
    { id: 'v2000', name: 'Värdebevis 2 000 kr', desc: 'Räcker till en spadag med behandling', price: 2000, group: 'Värdebevis' },
    { id: 'p-spadag', name: 'Spadag för en', desc: 'Lunch och 25 minuters massage ingår', price: 1295, group: 'Spapaket' },
    { id: 'p-spadag2', name: 'Spadag för två', desc: 'Samma dag och tid för båda', price: 2590, group: 'Spapaket' },
    { id: 'p-ljung', name: 'Ljungdagen för en', desc: 'Med ansiktsbehandling och bubbel', price: 2195, group: 'Spapaket' }
  ];
  const byId = (list, id) => list.find(x => x.id === id);

  /* ---------- Öppet nu (pi-et-oppet) ---------- */
  (function openStatus() {
    const now = new Date();
    const h = HOURS[now.getDay()];
    const m = now.getHours() * 60 + now.getMinutes();
    $$('[data-open-status]').forEach(el => {
      el.className = 'ev-closed';
      if (h && m >= h[0] && m < h[1]) { el.className = 'ev-open'; el.textContent = `Öppet nu, till ${fmtTime(h[1])}`; return; }
      if (h && m < h[0]) { el.textContent = `Stängt, öppnar ${fmtTime(h[0])}`; return; }
      const d = new Date(now); let g = 0;
      do { d.setDate(d.getDate() + 1); g++; } while (!HOURS[d.getDay()] && g < 7);
      el.textContent = `Stängt, öppnar ${g === 1 ? 'i morgon' : DAYS[d.getDay()]} ${fmtTime(HOURS[d.getDay()][0])}`;
    });
    $$('.ev-hours tr[data-days]').forEach(tr => { if (tr.dataset.days.split(',').map(Number).includes(now.getDay())) tr.classList.add('is-today'); });
  })();

  /* ---------- Mobilmeny ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}${a.dataset.open ? ` data-open="${a.dataset.open}"` : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">
        <a class="ev-logo" href="index.html">Ljung<b>.</b></a>
        <button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button>
      </div>
      <nav aria-label="Huvudmeny"><ul>${links}</ul></nav>
      <div class="ev-menu__foot">
        <p class="ev-iconline">${icon('phone', 'ev-icon--20')}<span><a href="tel:+46100000000">010-000 00 00</a>. Vi svarar 9–17.</span></p>
        <p class="ev-iconline">${icon('pin', 'ev-icon--20')}<span>Slaggatan 6, Falun</span></p>
      </div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); if (!document.querySelector('.ev-dialog[open]')) menuBtn.focus(); });
    dlg.addEventListener('click', e => { if (e.target.closest('[data-close], [data-open]')) dlg.close(); });
  }

  /* ---------- Dragspel ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Paketflikar på desktop (ux-pris-paket-layout) ---------- */
  const tabList = $('.ev-pkgtabs');
  if (tabList) {
    const tabs = $$('[role="tab"]', tabList);
    const pkgs = $('.ev-pkgs');
    const mq = matchMedia('(min-width: 900px)');
    const select = (tab, focus) => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).classList.toggle('is-active', on);
      });
      if (focus) tab.focus();
    };
    const apply = () => {
      const on = mq.matches;
      tabList.classList.add('is-ready');
      pkgs.classList.toggle('is-tabbed', on);
      $$('.ev-pkg', pkgs).forEach(p => { if (on) { p.setAttribute('role', 'tabpanel'); p.tabIndex = 0; } else { p.removeAttribute('role'); p.removeAttribute('tabindex'); } });
      tabList.hidden = !on;
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true); }
      });
    });
    select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
    mq.addEventListener('change', apply);
    apply();
  }

  /* ---------- Filterchips på behandlingssidan ---------- */
  const chipGroup = $('[data-cat-filter]');
  if (chipGroup) {
    const chips = $$('.ev-chip', chipGroup);
    const cats = $$('.ev-cat');
    const status = $('[data-filter-status]');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      cats.forEach(g => { g.hidden = c.dataset.cat !== 'alla' && g.dataset.cat !== c.dataset.cat; });
      const n = cats.filter(g => !g.hidden).reduce((a, g) => a + $$('.ev-tlist li', g).length, 0);
      if (status) status.textContent = `${n} behandlingar`;
    }));
  }

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  const footer = $('.ev-footer');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let past = false, atFooter = false;
    const upd = () => { const on = past && !atFooter; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([en]) => { past = !en.isIntersecting && en.boundingClientRect.top < 0; upd(); }).observe(anchor);
    if (footer) new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; upd(); }).observe(footer);
    upd();
  }

  /* ---------- Formulärfel: när man lämnar fältet (ux-fel-*) ---------- */
  function fieldError(el) {
    if (el.type === 'radio') return $$(`input[name="${el.name}"]`, el.form || document).some(r => r.checked) ? '' : el.closest('fieldset').dataset.error;
    if (el.type === 'checkbox') return el.required && !el.checked ? el.dataset.error : '';
    const v = el.value.trim();
    if (el.required && !v) return el.dataset.error || 'Fyll i fältet.';
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Skriv e-postadressen som namn@exempel.se.';
    if (el.type === 'tel' && v.replace(/[^\d]/g, '').length < 8) return 'Skriv mobilnumret med riktnummer, till exempel 070-123 45 67.';
    return '';
  }
  function showError(el, msg) {
    const box = el.type === 'radio' ? el.closest('fieldset') : el.closest('.ev-field');
    let err = $(':scope > .ev-error', box);
    if (!err) {
      err = document.createElement('p');
      err.className = 'ev-error';
      err.id = (el.type === 'radio' ? el.name : el.id) + '-fel';
      box.append(err);
    }
    const targets = el.type === 'radio' ? $$(`input[name="${el.name}"]`, box) : [el];
    if (msg) {
      err.innerHTML = icon('errorCircle') + `<span>${msg}</span>`;
      err.hidden = false;
      targets.forEach(t => { t.setAttribute('aria-invalid', 'true'); t.setAttribute('aria-describedby', err.id); });
    } else {
      err.hidden = true;
      targets.forEach(t => t.removeAttribute('aria-invalid'));
    }
  }
  function validator(root, { submit, missingEl }) {
    const uniq = () => { const seen = new Set(); return $$('input, textarea', root).filter(f => { const k = f.type === 'radio' ? f.name : f; if (seen.has(k)) return false; seen.add(k); return true; }); };
    const touched = new Set();
    const key = f => f.type === 'radio' ? f.name : f;
    const refresh = () => {
      const bad = uniq().filter(f => fieldError(f));
      submit.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      const names = bad.map(f => f.type === 'radio' ? f.closest('fieldset').dataset.name : f.dataset.name);
      missingEl.textContent = bad.length ? `${names.length > 1 ? cap(names.slice(0, -1).join(', ')) + ' och ' + names.at(-1) : cap(names[0])} saknas.` : '';
      missingEl.hidden = !bad.length;
      return bad;
    };
    root.addEventListener('focusout', e => {
      const f = e.target;
      if (!f.matches('input, textarea')) return;
      if (f.type === 'radio') {
        setTimeout(() => { if (!f.closest('fieldset').contains(document.activeElement)) { touched.add(key(f)); showError(f, fieldError(f)); } }, 0);
        return;
      }
      if (f.type === 'checkbox') return;
      if (f.value.trim() || f.required) { touched.add(f); showError(f, fieldError(f)); }
    });
    const onChange = e => {
      const f = e.target;
      if (f.type === 'radio' || f.type === 'checkbox') showError(f, fieldError(f));
      else if (touched.has(f) && f.getAttribute('aria-invalid') === 'true') showError(f, fieldError(f));
      refresh();
    };
    root.addEventListener('input', onChange);
    root.addEventListener('change', onChange);
    const attempt = () => {
      const bad = refresh();
      if (!bad.length) return true;
      bad.forEach(f => { touched.add(key(f)); showError(f, fieldError(f)); });
      bad[0].focus();
      bad[0].scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
      return false;
    };
    refresh();
    return { attempt };
  }

  /* =========================================================
     Dialog: boka spapaket eller köp presentkort
     ========================================================= */
  const FLOWS = {
    paket: { steps: ['Paket', 'Datum', 'Tillägg', 'Uppgifter', 'Bekräfta'], label: 'Boka spapaket' },
    presentkort: { steps: ['Presentkort', 'Hälsning', 'Leverans', 'Betala'], label: 'Köp presentkort' }
  };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDay = new Date(today); lastDay.setDate(lastDay.getDate() + 90);
  const blank = () => ({
    flow: 'paket', step: 1, returnTo: null,
    pkg: null, guests: 2, date: null, time: null, addons: [], name: '', phone: '', email: '', note: '',
    card: null, to: '', from: '', msg: '', delivery: null, gEmail: '', addr: '', pay: null, terms: false
  });
  let state = blank();
  let dlg, opener, calMonth = null, calOpen = false, host, foot, stepsEl;

  function freeTimes(date) {
    const p = byId(PACKAGES, state.pkg);
    if (!p || date < today || date > lastDay || !p.days.includes(date.getDay()) || !HOURS[date.getDay()]) return [];
    const nowM = sameDay(date, now) ? now.getHours() * 60 + now.getMinutes() + 60 : -1;
    return p.times.filter(t => {
      if (t <= nowM) return false;
      let h = 3;
      for (const c of isoDay(date) + p.id + t + state.guests) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const busy = date.getDay() === 6 || date.getDay() === 0 ? 5 : 2;
      return h % 10 >= busy;
    });
  }
  function firstFreeDay() {
    const d = new Date(today);
    for (let i = 0; i < 90; i++) { if (freeTimes(d).length) return new Date(d); d.setDate(d.getDate() + 1); }
    return null;
  }
  const pkgTotal = () => {
    const p = byId(PACKAGES, state.pkg);
    if (!p) return 0;
    return state.guests * (p.price + state.addons.reduce((a, id) => a + byId(ADDONS, id).price, 0));
  };
  const cardTotal = () => { const c = byId(CARDS, state.card); return c ? c.price + (state.delivery === 'post' ? 39 : 0) : 0; };

  function buildDialog() {
    dlg = document.createElement('dialog');
    dlg.className = 'ev-dialog';
    dlg.setAttribute('aria-labelledby', 'flode-rubrik');
    dlg.innerHTML = `
      <div class="ev-dialog__grid">
        <div class="ev-dialog__main">
          <p id="flode-rubrik" class="ev-sr"></p>
          <button class="ev-iconbtn ev-dialog__close" type="button" data-cancel>${icon('close')}</button>
          <div data-step-host></div>
          <div class="ev-flow__foot">
            <div data-foot-action></div>
            <div class="ev-steps">
              <p class="ev-steps__count" aria-live="polite"></p>
              <ol class="ev-steps__list"></ol>
              <span class="ev-steps__dots" aria-hidden="true"></span>
            </div>
          </div>
        </div>
        <aside class="ev-summary" aria-labelledby="sum-rubrik">
          <h2 id="sum-rubrik"></h2>
          <dl data-sum></dl>
          <p class="ev-summary__total" data-total hidden><span>Att betala</span><span class="ev-price" data-total-v></span></p>
          <p class="ev-summary__note" data-sum-note></p>
        </aside>
      </div>`;
    document.body.append(dlg);
    host = $('[data-step-host]', dlg);
    foot = $('[data-foot-action]', dlg);
    stepsEl = $('.ev-steps', dlg);
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-cancel]') || e.target === dlg) dlg.close();
    });
    dlg.addEventListener('close', () => {
      if (state.step > FLOWS[state.flow].steps.length) state = blank();
      document.documentElement.style.overflow = '';
      if (/^#(boka|presentkort)$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
      if (opener && document.contains(opener)) opener.focus();
    });
  }

  function openFlow(flow, trigger, preset = {}) {
    if (!dlg) buildDialog();
    opener = trigger || document.activeElement;
    if (state.flow !== flow || state.step > FLOWS[state.flow].steps.length) { state = blank(); calMonth = null; calOpen = false; }
    state.flow = flow;
    if (preset.pkg && byId(PACKAGES, preset.pkg)) {
      if (state.pkg !== preset.pkg) { state.time = null; }
      state.pkg = preset.pkg; state.step = Math.max(state.step, 2);
    }
    if (preset.card && byId(CARDS, preset.card)) { state.card = preset.card; state.step = Math.max(state.step, 2); }
    $('#flode-rubrik', dlg).textContent = FLOWS[flow].label + ' hos Ljung dagspa';
    $('[data-cancel]', dlg).setAttribute('aria-label', flow === 'paket' ? 'Avbryt bokningen' : 'Avbryt köpet');
    $('.ev-steps__list', dlg).innerHTML = FLOWS[flow].steps.map(s => `<li>${s}</li>`).join('');
    $('.ev-steps__dots', dlg).innerHTML = FLOWS[flow].steps.map(() => '<i></i>').join('');
    render();
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    focusHeading();
  }
  function focusHeading() { const h = $('h2', host); if (h) { h.tabIndex = -1; h.focus(); } }
  function valid(step) {
    if (state.flow === 'paket') {
      if (step >= 2 && !state.pkg) return 1;
      if (step >= 3 && (!state.date || state.time == null)) return 2;
      if (step >= 5 && !(state.name && state.phone && state.email)) return 4;
    } else {
      if (step >= 2 && !state.card) return 1;
      if (step >= 3 && !(state.to && state.from)) return 2;
      if (step >= 4 && !state.delivery) return 3;
    }
    return step;
  }
  function go(step) {
    state.step = valid(step);
    render();
    focusHeading();
    $('.ev-dialog__main', dlg).scrollTop = 0;
    $('.ev-dialog__grid', dlg).scrollTop = 0;
  }
  function next(from) {
    if (state.returnTo && valid(state.returnTo) === state.returnTo) { const r = state.returnTo; state.returnTo = null; go(r); }
    else go(from + 1);
  }

  function updateChrome() {
    const steps = FLOWS[state.flow].steps;
    const s = state.step, done = s > steps.length;
    $('.ev-steps__count', dlg).textContent = `Steg ${Math.min(s, steps.length)} av ${steps.length}`;
    $$('.ev-steps__list li', dlg).forEach((li, i) => { if (i === s - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', dlg).forEach((d, i) => d.classList.toggle('is-on', i === s - 1));
    stepsEl.hidden = done;
    dlg.classList.toggle('is-done', done);
    dlg.classList.toggle('is-first', s === 1);

    const empty = 'Inte valt än';
    let rows = [], total = 0, note = '';
    if (state.flow === 'paket') {
      const p = byId(PACKAGES, state.pkg);
      rows = [
        ['leaf', 'Paket', p ? `${p.name}, ${kr(p.price)} per person` : ''],
        ['users', 'Gäster', p ? `${state.guests} ${state.guests === 1 ? 'person' : 'personer'}` : ''],
        ['cal', 'Ankomst', state.date && state.time != null ? `${fmtDate(state.date)}, kl. ${fmtTime(state.time)}` : ''],
        ['plus', 'Tillägg', s >= 3 && p ? (state.addons.length ? state.addons.map(id => byId(ADDONS, id).name).join(', ') : 'Inga') : '']
      ];
      total = pkgTotal();
      note = 'Du betalar på plats. Avboka gratis senast 48 timmar innan.';
      $('#sum-rubrik', dlg).textContent = 'Din bokning';
    } else {
      const c = byId(CARDS, state.card);
      rows = [
        ['gift', 'Presentkort', c ? c.name : ''],
        ['users', 'Till', state.to ? esc(state.to) : ''],
        ['mail', 'Leverans', state.delivery ? (state.delivery === 'post' ? 'Hemskickat i kuvert, 39 kr' : 'Som pdf till din e-post') : '']
      ];
      total = cardTotal();
      note = 'Presentkortet gäller i två år och kan användas till allt hos oss.';
      $('#sum-rubrik', dlg).textContent = 'Ditt presentkort';
    }
    $('[data-sum]', dlg).innerHTML = rows.map(([ic, dt, dd]) => `<div>${icon(ic)}<span><dt>${dt}</dt><dd class="${dd ? '' : 'is-empty'}">${dd || empty}</dd></span></div>`).join('');
    $('[data-total]', dlg).hidden = !total;
    $('[data-total-v]', dlg).textContent = kr(total);
    $('[data-sum-note]', dlg).textContent = note;
  }

  const backLink = () => `<button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>`;
  const arrowBtn = (text, attrs = '') => `<button class="ev-btn ev-btn--block" ${attrs}><span>${text}</span>${icon('arrow', 'ev-btn__arrow')}</button>`;
  const field = (id, label, attrs, opt = false) => `<div class="ev-field"><label for="${id}">${label}${opt ? ' <span class="ev-opt">(valfritt)</span>' : ''}</label><input class="ev-input" id="${id}" ${attrs}></div>`;

  function render() {
    foot.innerHTML = '';
    if (state.flow === 'paket') renderPaket(); else renderPresent();
    updateChrome();
    const back = $('[data-back]', host);
    if (back) back.addEventListener('click', () => { state.returnTo = null; go(state.step - 1); });
  }

  function renderPaket() {
    const s = state.step;
    const p = byId(PACKAGES, state.pkg);
    if (s === 1) {
      host.innerHTML = `
        <section class="ev-step">
          <h2>Vilket paket vill du boka?</h2>
          <p class="ev-hint">Det tar ungefär två minuter. Välj ett paket så går du vidare.</p>
          <div class="ev-step__body ev-optlist">
            ${PACKAGES.map(x => `<button type="button" class="ev-opt-btn" data-pkg="${x.id}" aria-pressed="${state.pkg === x.id}"><b>${x.name}</b><small>${x.desc}</small><span class="ev-price">${kr(x.price)}<span class="ev-sr"> per person</span></span></button>`).join('')}
          </div>
          <p class="ev-step__more">Priset gäller per person. Kvällsbad finns tisdag–fredag.</p>
        </section>`;
      $$('[data-pkg]', host).forEach(b => b.addEventListener('click', () => {
        if (state.pkg !== b.dataset.pkg) { state.time = null; }
        state.pkg = b.dataset.pkg; next(1);
      }));
    }
    if (s === 2) {
      if (!state.date || !freeTimes(state.date).length) { state.date = firstFreeDay(); state.time = null; }
      const d = state.date;
      const times = d ? freeTimes(d) : [];
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>När vill ni komma?</h2>
          <p class="ev-hint">${p.name}. Välj antal och dag, och välj sedan en ankomsttid så går du vidare.</p>
          <div class="ev-step__body">
            <div class="ev-qtyrow">
              <span class="ev-label" id="gaster-etikett">Antal gäster<small>Högst 6 i samma bokning</small></span>
              <div class="ev-qty" role="group" aria-labelledby="gaster-etikett">
                <button type="button" data-qty="-1" aria-label="En gäst färre" aria-disabled="${state.guests <= 1}">${icon('minus')}</button>
                <output aria-live="polite">${state.guests}</output>
                <button type="button" data-qty="1" aria-label="En gäst till" aria-disabled="${state.guests >= 6}">${icon('plus')}</button>
              </div>
            </div>
            <div class="ev-field ev-datefield">
              <span class="ev-label" id="datum-etikett">Datum</span>
              <button type="button" class="ev-input ev-datebtn" aria-labelledby="datum-etikett datum-varde" aria-expanded="${calOpen}" aria-controls="datum-pop" data-datebtn>
                <span>${icon('cal')}<span id="datum-varde">${d ? fmtDate(d) : 'Välj dag'}</span></span>${icon('chevD', 'ev-chev')}
              </button>
              <div class="ev-datepop" id="datum-pop" ${calOpen ? '' : 'hidden'} data-cal></div>
            </div>
            <div class="ev-times">
              <h2 id="ankomst">Ankomsttid</h2>
              ${times.length ? `<div class="ev-timegrid" role="group" aria-labelledby="ankomst">${times.map(t => `<button type="button" class="ev-time" data-time="${t}" aria-pressed="${state.time === t}">${fmtTime(t)}</button>`).join('')}</div>`
                : '<p>Det finns inga lediga tider för så många gäster de närmaste månaderna. Ring oss på <a class="ev-inline-link" href="tel:+46100000000">010-000 00 00</a>.</p>'}
            </div>
            <p class="ev-step__more">${p.id === 'kvall' ? 'Kvällsbadet varar i tre timmar från ankomsten.' : 'Ni stannar till 18.00. Lunchen serveras 12.00–14.00.'}</p>
          </div>
        </section>`;
      $$('[data-qty]', host).forEach(b => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        state.guests += Number(b.dataset.qty);
        state.time = null;
        render();
        $(`[data-qty="${b.dataset.qty}"]`, host).focus();
      }));
      const dbtn = $('[data-datebtn]', host), pop = $('[data-cal]', host);
      if (calOpen) drawCal(pop);
      dbtn.addEventListener('click', () => {
        calOpen = !calOpen;
        dbtn.setAttribute('aria-expanded', String(calOpen));
        pop.hidden = !calOpen;
        if (calOpen) { drawCal(pop); const sel = $('[aria-pressed="true"]', pop) || $('td button:not(:disabled)', pop); if (sel) sel.focus(); }
      });
      pop.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); calOpen = false; pop.hidden = true; dbtn.setAttribute('aria-expanded', 'false'); dbtn.focus(); } });
      $$('[data-time]', host).forEach(b => b.addEventListener('click', () => { state.time = Number(b.dataset.time); calOpen = false; next(2); }));
    }
    if (s === 3) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vill du lägga till något?</h2>
          <p class="ev-hint">Valfritt. Tilläggen gäller för varje gäst och bokas i samma tid som paketet.</p>
          <div class="ev-step__body ev-checks" role="group" aria-label="Tillägg">
            ${ADDONS.map(a => `<label class="ev-checkcard"><input type="checkbox" value="${a.id}"${state.addons.includes(a.id) ? ' checked' : ''}><b>${a.name}</b><small>${a.desc}</small><span class="ev-price">+${kr(a.price)}</span></label>`).join('')}
          </div>
        </section>`;
      foot.innerHTML = arrowBtn('Fortsätt', 'type="button" data-continue');
      $$('input', host).forEach(i => i.addEventListener('change', () => {
        state.addons = $$('input:checked', host).map(x => x.value);
        updateChrome();
      }));
      $('[data-continue]', foot).addEventListener('click', () => next(3));
    }
    if (s === 4) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vem bokar?</h2>
          <p class="ev-hint">Vi skickar bekräftelsen med sms och e-post.</p>
          <div class="ev-step__body ev-form" data-form>
            ${field('p-namn', 'Namn', 'autocomplete="name" placeholder="Anna Svensson" required data-name="namn" data-error="Skriv ditt namn så vet vi vem bokningen gäller."')}
            ${field('p-tel', 'Mobilnummer', 'type="tel" inputmode="tel" autocomplete="tel" placeholder="070-123 45 67" required data-name="mobilnummer" data-error="Skriv ditt mobilnummer så att vi kan skicka bekräftelsen."')}
            ${field('p-epost', 'E-post', 'type="email" autocomplete="email" placeholder="anna@exempel.se" required data-name="e-post" data-error="Skriv din e-postadress, till exempel anna@exempel.se."')}
            <div class="ev-field"><label for="p-note">Önskemål <span class="ev-opt">(valfritt)</span></label>
              <textarea class="ev-input" id="p-note" rows="3" placeholder="Allergier, graviditet eller något annat vi ska veta"></textarea></div>
          </div>
        </section>`;
      foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="p-saknas"')}<p class="ev-form__missing" id="p-saknas"></p>`;
      const map = { name: '#p-namn', phone: '#p-tel', email: '#p-epost', note: '#p-note' };
      Object.entries(map).forEach(([k, sel]) => { $(sel, host).value = state[k]; });
      const form = $('[data-form]', host), cont = $('[data-continue]', foot);
      const v = validator(form, { submit: cont, missingEl: $('#p-saknas', foot) });
      form.addEventListener('input', () => Object.entries(map).forEach(([k, sel]) => { state[k] = $(sel, host).value.trim(); }));
      cont.addEventListener('click', () => { if (v.attempt()) { state.returnTo = null; go(5); } });
      form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); cont.click(); } });
    }
    if (s === 5) {
      const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Stämmer det här?</h2>
          <p class="ev-hint">Titta igenom bokningen innan du bokar.</p>
          <div class="ev-step__body">
            <dl class="ev-review">
              ${row('Paket', `${p.name}<br><span>${state.guests} ${state.guests === 1 ? 'person' : 'personer'} à ${kr(p.price)}</span>`, 1, 'paket')}
              ${row('Ankomst', `${fmtDate(state.date)}<br><span>kl. ${fmtTime(state.time)}</span>`, 2, 'datum och tid')}
              ${row('Tillägg', state.addons.length ? state.addons.map(id => byId(ADDONS, id).name).join(', ') : '<span>Inga tillägg</span>', 3, 'tillägg')}
              ${row('Uppgifter', `${esc(state.name)}<br><span>${esc(state.phone)} · ${esc(state.email)}</span>`, 4, 'uppgifter')}
              <div><dt>Att betala på plats</dt><dd class="ev-price">${kr(pkgTotal())}</dd></div>
            </dl>
            <p class="ev-policy">Badrock, handduk och tofflor ingår. Avboka utan kostnad senast 48 timmar innan via länken i bekräftelsen.</p>
          </div>
        </section>`;
      foot.innerHTML = arrowBtn('Boka spadagen', 'type="button" data-confirm');
      $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { state.returnTo = 5; go(Number(b.dataset.edit)); }));
      $('[data-confirm]', foot).addEventListener('click', e => confirmBtn(e.currentTarget, 'Bokar …'));
    }
    if (s === 6) {
      host.innerHTML = `
        <section class="ev-step" role="status">
          <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
          <h2>Spadagen är bokad</h2>
          <p style="margin-top:12px">${p.name} för ${state.guests} ${state.guests === 1 ? 'person' : 'personer'}, ${fmtDate(state.date).toLowerCase()} kl. ${fmtTime(state.time)}. Bekräftelsen skickas till ${esc(state.email)}.</p>
          <p style="margin-top:8px">Ta med badkläder. Allt annat finns här.</p>
          <p class="ev-hint" style="margin-top:12px">Det här är ett designkoncept. Ingen bokning skickas på riktigt.</p>
        </section>`;
      foot.innerHTML = `<div class="ev-actions" style="margin-top:0"><button class="ev-btn" type="button" data-ics><span>Lägg till i kalendern</span>${icon('download')}</button><button class="ev-link" type="button" data-cancel>Stäng</button></div>`;
      $('[data-ics]', foot).addEventListener('click', e => {
        const d = state.date, st = m => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
        const end = Math.min(state.time + p.dur, HOURS[d.getDay()][1]);
        download('ljung-spadag.ics', 'text/calendar', ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ljung koncept//SV', 'BEGIN:VEVENT', `UID:${Date.now()}@ljungspa.example`,
          `DTSTART:${st(state.time)}`, `DTEND:${st(end)}`, `SUMMARY:${p.name}, Ljung dagspa`, 'LOCATION:Slaggatan 6\\, Falun', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n'));
        saved(e.currentTarget);
      });
    }
  }

  function renderPresent() {
    const s = state.step;
    const c = byId(CARDS, state.card);
    if (s === 1) {
      const groups = ['Värdebevis', 'Spapaket'];
      host.innerHTML = `
        <section class="ev-step">
          <h2>Vilket presentkort vill du ge?</h2>
          <p class="ev-hint">Det tar ungefär två minuter. Välj ett presentkort så går du vidare.</p>
          <div class="ev-step__body">
            ${groups.map(g => `<div class="ev-optgroup"><h2>${g}</h2><div class="ev-optlist">
              ${CARDS.filter(x => x.group === g).map(x => `<button type="button" class="ev-opt-btn" data-card="${x.id}" aria-pressed="${state.card === x.id}"><b>${x.name}</b><small>${x.desc}</small><span class="ev-price">${kr(x.price)}</span></button>`).join('')}
            </div></div>`).join('')}
          </div>
        </section>`;
      $$('[data-card]', host).forEach(b => b.addEventListener('click', () => { state.card = b.dataset.card; next(1); }));
    }
    if (s === 2) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vem är presentkortet till?</h2>
          <p class="ev-hint">Namnen och hälsningen står på presentkortet.</p>
          <div class="ev-step__body ev-form" data-form>
            <div class="ev-form__row">
              ${field('g-till', 'Till', 'autocomplete="off" placeholder="Maria" required data-name="till" data-error="Skriv vem presentkortet är till."')}
              ${field('g-fran', 'Från', 'autocomplete="name" placeholder="Anna och Erik" required data-name="från" data-error="Skriv vem presentkortet är från."')}
            </div>
            <div class="ev-field"><label for="g-msg">Hälsning <span class="ev-opt">(valfritt)</span></label>
              <textarea class="ev-input" id="g-msg" rows="3" maxlength="160" placeholder="Grattis på 40-årsdagen. Nu får du ta det lugnt en hel dag." aria-describedby="g-msg-antal"></textarea>
              <span class="ev-counter" id="g-msg-antal">0 av 160 tecken</span></div>
          </div>
        </section>`;
      foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="g-saknas"')}<p class="ev-form__missing" id="g-saknas"></p>`;
      const map = { to: '#g-till', from: '#g-fran', msg: '#g-msg' };
      Object.entries(map).forEach(([k, sel]) => { $(sel, host).value = state[k]; });
      const form = $('[data-form]', host), cont = $('[data-continue]', foot), cnt = $('#g-msg-antal', host);
      const v = validator(form, { submit: cont, missingEl: $('#g-saknas', foot) });
      const upd = () => { Object.entries(map).forEach(([k, sel]) => { state[k] = $(sel, host).value.trim(); }); cnt.textContent = `${$('#g-msg', host).value.length} av 160 tecken`; };
      upd();
      form.addEventListener('input', () => { upd(); updateChrome(); });
      cont.addEventListener('click', () => { if (v.attempt()) next(2); });
      form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); cont.click(); } });
    }
    if (s === 3) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Hur ska presentkortet komma fram?</h2>
          <p class="ev-hint">Välj ett sätt så går du vidare.</p>
          <div class="ev-step__body ev-optlist">
            <button type="button" class="ev-opt-btn" data-del="pdf" aria-pressed="${state.delivery === 'pdf'}"><b>Som pdf till din e-post</b><small>Direkt efter köpet. Skriv ut eller skicka vidare</small><span class="ev-price">0&nbsp;kr</span></button>
            <button type="button" class="ev-opt-btn" data-del="post" aria-pressed="${state.delivery === 'post'}"><b>Hemskickat i kuvert</b><small>Tryckt kort med posten, 2–3 vardagar</small><span class="ev-price">39&nbsp;kr</span></button>
          </div>
        </section>`;
      $$('[data-del]', host).forEach(b => b.addEventListener('click', () => { state.delivery = b.dataset.del; next(3); }));
    }
    if (s === 4) {
      const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Betala</h2>
          <p class="ev-hint">Kontrollera presentkortet och fyll i dina uppgifter.</p>
          <div class="ev-step__body">
            <dl class="ev-review">
              ${row('Presentkort', `${c.name}<br><span>${kr(c.price)}</span>`, 1, 'presentkort')}
              ${row('Hälsning', `Till ${esc(state.to)}, från ${esc(state.from)}${state.msg ? `<br><span>”${esc(state.msg)}”</span>` : ''}`, 2, 'hälsning')}
              ${row('Leverans', state.delivery === 'post' ? 'Hemskickat i kuvert<br><span>39 kr</span>' : 'Som pdf till din e-post<br><span>0 kr</span>', 3, 'leverans')}
              <div><dt>Att betala</dt><dd class="ev-price">${kr(cardTotal())}</dd></div>
            </dl>
            <div class="ev-form" data-form style="margin-top:24px">
              ${field('g-epost', 'Din e-post', 'type="email" autocomplete="email" placeholder="anna@exempel.se" required data-name="e-post" data-error="Skriv din e-postadress så att vi kan skicka kvittot."')}
              ${state.delivery === 'post' ? field('g-adr', 'Adress', 'autocomplete="street-address" placeholder="Storgatan 1, 791 71 Falun" required data-name="adress" data-error="Skriv gatuadress, postnummer och ort."') : ''}
              <fieldset class="ev-fieldset" data-name="betalsätt" data-error="Välj hur du vill betala.">
                <legend>Betalsätt</legend>
                <div class="ev-radiocards">
                  <label class="ev-radiocard"><input type="radio" name="g-pay" value="kort"${state.pay === 'kort' ? ' checked' : ''}><span><b>Kort</b><span>Visa eller Mastercard</span></span></label>
                  <label class="ev-radiocard"><input type="radio" name="g-pay" value="swish"${state.pay === 'swish' ? ' checked' : ''}><span><b>Swish</b><span>Öppna appen och godkänn</span></span></label>
                </div>
              </fieldset>
              <div class="ev-field"><label class="ev-check"><input type="checkbox" id="g-villkor" required data-name="villkoren" data-error="Godkänn villkoren för att slutföra köpet."${state.terms ? ' checked' : ''}><span>Jag godkänner <a class="ev-inline-link" href="presentkort.html#villkor">villkoren för presentkort</a></span></label></div>
            </div>
          </div>
        </section>`;
      foot.innerHTML = `${arrowBtn('Slutför köp', 'type="button" data-confirm aria-describedby="g-saknas2"')}<p class="ev-form__missing" id="g-saknas2"></p><p class="ev-secure">${icon('lock')}Säker betalning. Vi sparar inga kortuppgifter.</p>`;
      const form = $('[data-form]', host), cont = $('[data-confirm]', foot);
      $('#g-epost', host).value = state.gEmail;
      if ($('#g-adr', host)) $('#g-adr', host).value = state.addr;
      const v = validator(form, { submit: cont, missingEl: $('#g-saknas2', foot) });
      form.addEventListener('input', () => {
        state.gEmail = $('#g-epost', host).value.trim();
        if ($('#g-adr', host)) state.addr = $('#g-adr', host).value.trim();
        const r = $('input[name="g-pay"]:checked', host); state.pay = r ? r.value : null;
        state.terms = $('#g-villkor', host).checked;
      });
      form.addEventListener('change', () => form.dispatchEvent(new Event('input')));
      $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { state.returnTo = 4; go(Number(b.dataset.edit)); }));
      cont.addEventListener('click', e => { if (cont.dataset.busy) return; if (v.attempt()) confirmBtn(e.currentTarget, 'Betalar …'); });
    }
    if (s === 5) {
      const code = `LJUNG-${String(1000 + (Date.now() % 9000)).slice(0, 4)}-${state.to.slice(0, 1).toUpperCase() || 'X'}${(Date.now() % 90) + 10}`;
      host.innerHTML = `
        <section class="ev-step" role="status">
          <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
          <h2>Presentkortet är köpt</h2>
          <p style="margin-top:12px">${c.name} till ${esc(state.to)}. ${state.delivery === 'post' ? 'Kortet skickas i dag och är framme inom 2–3 vardagar.' : `Pdf:en och kvittot skickas till ${esc(state.gEmail)}.`}</p>
          <p style="margin-top:16px">Presentkortets kod<br><span class="ev-code">${code}</span></p>
          <p class="ev-hint" style="margin-top:12px">Det här är ett designkoncept. Inget köp genomförs på riktigt.</p>
        </section>`;
      foot.innerHTML = `<div class="ev-actions" style="margin-top:0"><button class="ev-btn" type="button" data-dl><span>Ladda ner presentkortet</span>${icon('download')}</button><button class="ev-link" type="button" data-cancel>Stäng</button></div>`;
      $('[data-dl]', foot).addEventListener('click', e => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" rx="36" fill="#F3E6EE"/><text x="56" y="96" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700" fill="#3B1E33">Ljung<tspan fill="#6E3A5E">.</tspan></text><text x="56" y="250" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#6E3A5E">Presentkort till ${esc(state.to)}</text><text x="56" y="320" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700" fill="#3B1E33">${esc(c.name)}</text><text x="56" y="440" font-family="Inter, Arial, sans-serif" font-size="22" fill="#3B1E33">Från ${esc(state.from)} · Kod ${code} · Gäller i två år</text></svg>`;
        download('ljung-presentkort.svg', 'image/svg+xml', svg);
        saved(e.currentTarget);
      });
    }
  }

  function confirmBtn(b, busyText) {
    if (b.dataset.busy) return;
    b.dataset.busy = '1';
    b.setAttribute('aria-disabled', 'true');
    b.querySelector('span').textContent = busyText;
    setTimeout(() => go(state.step + 1), 600);
  }
  function download(name, type, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.append(a); a.click(); a.remove();
  }
  function saved(b) {
    b.classList.add('is-saved');
    b.innerHTML = `<span>Sparat</span><svg class="ev-icon ev-draw" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
  }

  function drawCal(pop) {
    const base = calMonth || state.date || today;
    const y = base.getFullYear(), m = base.getMonth();
    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const daysIn = new Date(y, m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<td></td>';
    for (let day = 1; day <= daysIn; day++) {
      const dt = new Date(y, m, day);
      const free = freeTimes(dt).length > 0;
      const out = dt < today || dt > lastDay;
      const lbl = `${fmtDate(dt)}${sameDay(dt, today) ? ', i dag' : ''}${!out && !free ? (HOURS[dt.getDay()] ? ', fullbokat' : ', stängt') : ''}`;
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
        <p class="ev-hint" style="margin-top:8px">Överstrukna dagar är stängda eller fullbokade. Vi har stängt på måndagar.</p>
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
      ($('.ev-time', host) || $('[data-datebtn]', host)).focus();
    }));
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open]');
    if (!t) return;
    e.preventDefault();
    const inMenu = t.closest('.ev-menu');
    openFlow(t.dataset.open, inMenu ? menuBtn : t, { pkg: t.dataset.paket, card: t.dataset.kort });
  });
  if (location.hash === '#boka') setTimeout(() => openFlow('paket', null), 50);
  if (location.hash === '#presentkort') setTimeout(() => openFlow('presentkort', null), 50);
})();
