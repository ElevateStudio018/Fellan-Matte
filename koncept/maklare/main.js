/* Strand & Holm Mäklare: designkoncept av Elevate Studio. Påhittat företag med exempeldata. Ingenting skickas. */
(() => {
  'use strict';

  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    err: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    door: '<path d="M6 20.5V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 18 5v15.5M3.5 20.5h17"/><circle cx="14.5" cy="12" r=".9"/>',
    area: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 4v3M14 4v3M4 9h3M4 14h3"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    sort: '<path d="M8 4v16M4.5 7.5 8 4l3.5 3.5M16 20V4M12.5 16.5 16 20l3.5-3.5"/>'
  };
  const icon = (n, cls = '') => `<svg class="ev-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nb = s => s.replace(/\s/g, ' ');
  const kr = n => nb(`${Math.round(n).toLocaleString('sv-SE')} kr`);
  const mkr = n => nb(`${(n / 1e6).toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} milj. kr`);
  const DATA = window.LISTINGS || [];
  const byId = id => DATA.find(o => o.id === id);
  const listWords = arr => arr.length <= 1 ? arr.join('') : `${arr.slice(0, -1).join(', ')} och ${arr[arr.length - 1]}`;

  /* ---------- Mobilmeny ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">
        <a class="ev-logo" href="index.html"><b>Strand &amp; Holm</b><small>Mäklare i Kalmar län</small></a>
        <button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button>
      </div>
      <nav aria-label="Huvudmeny"><ul>${links}<li><a href="index.html#vardering">Boka värdering${icon('arrow')}</a></li></ul></nav>
      <div class="ev-menu__foot">
        <p class="ev-iconline">${icon('phone')}<span><a href="tel:+46100000000">010-000 00 00</a>. Vardagar 08–18.</span></p>
        <p class="ev-iconline">${icon('pin')}<span>Stortorget 3, Kalmar</span></p>
      </div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); });
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { dlg.close(); menuBtn.focus(); }
      const a = e.target.closest('nav a');
      if (a) { dlg.close(); if (a.getAttribute('href') === 'index.html#vardering' && flows.vardering) { e.preventDefault(); flows.vardering.open(); } }
    });
  }

  /* ---------- Fast list på desktop ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let past = false, atFoot = false;
    const upd = () => { const on = past && !atFoot; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; upd(); }).observe(anchor);
    new IntersectionObserver(([e]) => { atFoot = e.isIntersecting; upd(); }).observe($('.ev-footer'));
  }

  /* ---------- Toast ---------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = `${icon('checkCircle')}<span>${msg}</span>`;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 5000);
  }
  if (toastEl) {
    toastEl.addEventListener('mouseenter', () => clearTimeout(toastTimer));
    toastEl.addEventListener('mouseleave', () => { toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2000); });
  }

  /* ---------- Fältvalidering (ux-fel-*) ---------- */
  function fieldError(input) {
    const v = input.value.trim();
    if (input.required && !v) return input.dataset.msg;
    if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return input.dataset.msg;
    if (v && input.dataset.minDigits && v.replace(/\D/g, '').length < +input.dataset.minDigits) return input.dataset.msg;
    if (v && input.name === 'adress' && v.length < 5) return input.dataset.msg;
    return '';
  }
  function showError(input, msg) {
    const box = document.getElementById(`${input.id}-fel`);
    if (!box) return;
    if (msg) {
      box.innerHTML = `${icon('err')}<span>${msg}</span>`;
      box.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', box.id);
    } else {
      box.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }
  const labelOf = i => (document.querySelector(`label[for="${i.id}"]`)?.childNodes[0].textContent || i.name).trim().toLowerCase();

  /* ---------- Kort ---------- */
  function cardHtml(o) {
    const visning = o.visning ? `<p class="ev-card__visning">${icon('cal')}Visning ${o.visning.toLowerCase().replace(/^(\w+)/, m => m)}</p>` : '';
    return `<article class="ev-card">
      <div class="ev-media"><img src="img/${o.img}" alt="${esc(o.alt)}" style="object-position:${o.pos}" loading="lazy" width="1400" height="933">${o.ribbon ? `<span class="ev-ribbon">${o.ribbon}</span>` : ''}</div>
      <h3><a href="bostad.html?id=${o.id}">${o.address}</a></h3>
      <p class="ev-card__area">${o.type} i ${o.area}</p>
      <div class="ev-meta"><span>${icon('door')}${o.rooms} rum</span><span>${icon('area')}${o.kvm} m²</span></div>
      <div class="ev-card__foot"><span class="ev-price">${kr(o.price)}</span>${o.status ? `<span class="ev-tag ev-tag--warn">${o.status}</span>` : ''}</div>
      ${visning}
      <span class="ev-link" aria-hidden="true">Se bostaden${icon('arrow', 'ev-link__arrow')}</span>
    </article>`;
  }
  $$('[data-listings="latest"]').forEach(el => {
    el.innerHTML = [...DATA].sort((a, b) => a.added - b.added).slice(0, +el.dataset.limit || 4).map(cardHtml).join('');
  });
  $$('[data-count-all]').forEach(el => { el.textContent = DATA.length; });

  /* ================= Bostadslistan med filter ================= */
  const app = $('[data-listing-app]');
  if (app) {
    const GROUPS = {
      typ: { label: 'Typ', options: ['Villa', 'Radhus', 'Lägenhet', 'Fritidshus'] },
      omrade: { label: 'Område', options: ['Kvarnholmen', 'Berga', 'Lindsdal', 'Stensö', 'Färjestaden', 'Ljungbyholm'] },
      rum: { label: 'Rum', options: [1, 2, 3, 4, 5] },
      pris: { label: 'Pris' }
    };
    const PMIN = 1000000, PMAX = 7000000, PSTEP = 250000;
    const SORTS = { nyast: 'Nyast', billigast: 'Billigast', dyrast: 'Dyrast', storst: 'Störst' };
    const QUICK = { nyhet: o => o.ribbon === 'Nyhet', helg: o => o.weekend, vatten: o => o.water, under2: o => o.price < 2000000 };
    const blank = () => ({ typ: new Set(), omrade: new Set(), rum: 0, pmin: PMIN, pmax: PMAX });
    const clone = f => ({ typ: new Set(f.typ), omrade: new Set(f.omrade), rum: f.rum, pmin: f.pmin, pmax: f.pmax });
    let F = blank();
    const quick = new Set();
    let sort = 'nyast', shown = 8;

    const match = (o, f, skip) =>
      (skip === 'typ' || !f.typ.size || f.typ.has(o.type)) &&
      (skip === 'omrade' || !f.omrade.size || f.omrade.has(o.area)) &&
      (skip === 'rum' || o.rooms >= f.rum) &&
      (skip === 'pris' || (o.price >= f.pmin && (f.pmax >= PMAX || o.price <= f.pmax))) &&
      [...quick].every(k => QUICK[k](o));
    const results = f => DATA.filter(o => match(o, f));
    const sorted = list => [...list].sort({
      nyast: (a, b) => a.added - b.added, billigast: (a, b) => a.price - b.price,
      dyrast: (a, b) => b.price - a.price, storst: (a, b) => b.kvm - a.kvm
    }[sort]);
    const nBost = n => `${n} ${n === 1 ? 'bostad' : 'bostäder'}`;
    const activeCount = f => f.typ.size + f.omrade.size + (f.rum ? 1 : 0) + (f.pmin > PMIN || f.pmax < PMAX ? 1 : 0);

    function groupBody(key, f) {
      if (key === 'pris') {
        const pct = v => ((v - PMIN) / (PMAX - PMIN)) * 100;
        return `<div class="ev-range" data-range>
            <span class="ev-range__track"></span><span class="ev-range__fill" style="left:${pct(f.pmin)}%;right:${100 - pct(f.pmax)}%"></span>
            <input type="range" min="${PMIN}" max="${PMAX}" step="${PSTEP}" value="${f.pmin}" data-pmin aria-label="Lägsta pris" aria-valuetext="${mkr(f.pmin)}">
            <input type="range" min="${PMIN}" max="${PMAX}" step="${PSTEP}" value="${f.pmax}" data-pmax aria-label="Högsta pris" aria-valuetext="${f.pmax >= PMAX ? 'Inget tak' : mkr(f.pmax)}">
          </div>
          <div class="ev-range__vals"><span>${mkr(f.pmin)}</span><span>${f.pmax >= PMAX ? 'Inget tak' : mkr(f.pmax)}</span></div>`;
      }
      const g = GROUPS[key];
      const opts = g.options.map(v => {
        const probe = clone(f);
        let n, on;
        if (key === 'rum') { probe.rum = v; n = DATA.filter(o => match(o, probe)).length; on = f.rum === v; }
        else { n = DATA.filter(o => match(o, f, key) && (key === 'typ' ? o.type : o.area) === v).length; on = f[key].has(v); }
        const label = key === 'rum' ? `${v}+` : v;
        return `<button type="button" class="ev-tile" data-tile="${key}" data-val="${v}" aria-pressed="${on}" ${n === 0 && !on ? 'disabled' : ''}>${label}${key === 'rum' ? `<span class="ev-sr"> rum eller fler, ${n} träffar</span>` : `<small>${n}<span class="ev-sr"> träffar</span></small>`}</button>`;
      });
      const many = opts.length > 5 && !app.dataset[`all_${key}`];
      return `<div class="ev-tiles ${key === 'rum' ? 'ev-tiles--rooms' : ''}">${(many ? opts.slice(0, 5) : opts).join('')}</div>`
        + (many ? `<button type="button" class="ev-link ev-link--more" style="margin-top:10px" data-more-opts="${key}">Visa ${opts.length - 5} till${icon('chevD')}</button>` : '');
    }
    function handleGroupInput(e, f, rerender) {
      const t = e.target.closest('[data-tile]');
      if (t && !t.disabled) {
        const key = t.dataset.tile, v = t.dataset.val;
        if (key === 'rum') f.rum = f.rum === +v ? 0 : +v;
        else f[key].has(v) ? f[key].delete(v) : f[key].add(v);
        rerender(t.dataset.tile, v);
        return true;
      }
      const m = e.target.closest('[data-more-opts]');
      if (m) { app.dataset[`all_${m.dataset.moreOpts}`] = '1'; rerender(); return true; }
      return false;
    }
    function handleRange(e, f, paintVals) {
      const r = e.target.closest('[data-range]'); if (!r) return;
      const lo = $('[data-pmin]', r), hi = $('[data-pmax]', r);
      let a = +lo.value, b = +hi.value;
      if (a > b - PSTEP) { if (e.target === lo) a = b - PSTEP; else b = a + PSTEP; lo.value = a; hi.value = b; }
      f.pmin = a; f.pmax = b;
      const pct = v => ((v - PMIN) / (PMAX - PMIN)) * 100;
      $('.ev-range__fill', r).style.cssText = `left:${pct(a)}%;right:${100 - pct(b)}%`;
      lo.setAttribute('aria-valuetext', mkr(a)); hi.setAttribute('aria-valuetext', b >= PMAX ? 'Inget tak' : mkr(b));
      const vals = r.nextElementSibling;
      vals.innerHTML = `<span>${mkr(a)}</span><span>${b >= PMAX ? 'Inget tak' : mkr(b)}</span>`;
      paintVals();
    }

    /* Desktop: rad med rullgardiner, sortering först till vänster (ux-filter-placering, ux-sort-placering) */
    const desk = $('[data-desk-filters]', app);
    const groupActive = key => key === 'pris' ? (F.pmin > PMIN || F.pmax < PMAX) : key === 'rum' ? !!F.rum : F[key].size > 0;
    const groupBtnLabel = key => {
      const g = GROUPS[key];
      if (key === 'pris' && groupActive('pris')) return `${g.label}: ${(F.pmin / 1e6).toLocaleString('sv-SE')}–${F.pmax >= PMAX ? '' : (F.pmax / 1e6).toLocaleString('sv-SE')} milj.`;
      if (key === 'rum' && F.rum) return `${F.rum}+ rum`;
      if (key !== 'pris' && key !== 'rum' && F[key].size) return `${g.label} (${F[key].size})`;
      return g.label;
    };
    function renderDesk() {
      desk.innerHTML = `
        <div class="ev-dd"><button type="button" class="ev-ddbtn ev-ddbtn--sort" data-dd="sort" aria-expanded="false" aria-haspopup="menu">${icon('sort')}<span class="ev-sr">Sortera: </span>${SORTS[sort]}${icon('chevD', 'ev-chev')}</button></div>
        ${Object.keys(GROUPS).map(k => `<div class="ev-dd"><button type="button" class="ev-ddbtn ${groupActive(k) ? 'is-active' : ''}" data-dd="${k}" aria-expanded="false">${groupBtnLabel(k)}${icon('chevD', 'ev-chev')}</button></div>`).join('')}`;
    }
    let openPop = null, pending = null;
    function closePop(focusBtn = true) {
      if (!openPop) return;
      const { pop, btn } = openPop;
      pop.remove(); btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus();
      openPop = null; pending = null;
    }
    function popApplyLabel() { return `Visa ${nBost(results(pending).length)}`; }
    function renderPop(key, focusSel) {
      const { pop } = openPop;
      pop.innerHTML = `<div class="ev-pop__head"><b id="pop-h">${GROUPS[key].label}</b><button type="button" class="ev-link" data-pop-clear>Rensa</button></div>
        <div data-pop-body>${groupBody(key, pending)}</div>
        <div class="ev-pop__foot"><button type="button" class="ev-btn ev-btn--block ev-btn--sm" data-pop-apply><span>${popApplyLabel()}</span>${icon('arrow', 'ev-btn__arrow')}</button></div>`;
      if (focusSel) $(focusSel, pop)?.focus();
    }
    desk.addEventListener('click', e => {
      const btn = e.target.closest('[data-dd]'); if (!btn) return;
      const key = btn.dataset.dd;
      const was = openPop && openPop.btn === btn;
      closePop(false);
      if (was) return;
      const pop = document.createElement('div');
      pop.className = `ev-pop${key === 'sort' ? ' ev-pop--menu' : ''}`;
      btn.after(pop); btn.setAttribute('aria-expanded', 'true');
      openPop = { pop, btn, key };
      if (key === 'sort') {
        pop.setAttribute('role', 'menu');
        pop.setAttribute('aria-label', 'Sortera');
        pop.innerHTML = Object.entries(SORTS).map(([k, v]) => `<button type="button" role="menuitemradio" class="ev-menuitem" data-sort="${k}" aria-checked="${k === sort}">${v}${icon('check')}</button>`).join('');
        $('[aria-checked="true"]', pop).focus();
      } else {
        pop.setAttribute('role', 'dialog');
        pop.setAttribute('aria-labelledby', 'pop-h');
        pending = clone(F);
        renderPop(key);
        $('.ev-tile:not(:disabled), input', pop)?.focus();
      }
    });
    desk.addEventListener('click', e => {
      if (!openPop) return;
      const { pop, key } = openPop;
      if (!pop.contains(e.target)) return;
      const s = e.target.closest('[data-sort]');
      if (s) { sort = s.dataset.sort; closePop(); shown = 8; render(); return; }
      if (e.target.closest('[data-pop-apply]')) { F = pending; closePop(false); shown = 8; render(); $(`[data-dd="${key}"]`, desk).focus(); return; }
      if (e.target.closest('[data-pop-clear]')) { const b = blank(); if (key === 'pris') { pending.pmin = b.pmin; pending.pmax = b.pmax; } else pending[key] = b[key]; renderPop(key, '[data-pop-clear]'); return; }
      handleGroupInput(e, pending, (k, v) => renderPop(key, k ? `[data-tile="${k}"][data-val="${v}"]` : '.ev-tile:last-child'));
    });
    desk.addEventListener('input', e => { if (openPop && pending) handleRange(e, pending, () => { $('[data-pop-apply] span', openPop.pop).textContent = popApplyLabel(); }); });
    document.addEventListener('click', e => { if (openPop && !openPop.pop.contains(e.target) && !openPop.btn.contains(e.target)) closePop(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && openPop) { e.preventDefault(); closePop(); } });
    desk.addEventListener('keydown', e => {
      if (!openPop || openPop.key !== 'sort' || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const items = $$('[data-sort]', openPop.pop); const i = items.indexOf(document.activeElement);
      items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
    });

    /* Mobil: bottenark för Filter och Sortera (ux-filter-mobil, ux-sort-mobil) */
    const fSheet = $('[data-sheet="filter"]'), sSheet = $('[data-sheet="sort"]');
    const sheetGroups = $('[data-sheet-groups]', fSheet);
    const openGroups = new Set();
    function renderSheet(focusSel) {
      sheetGroups.innerHTML = Object.keys(GROUPS).map(k => {
        const n = k === 'pris' ? ((pending.pmin > PMIN || pending.pmax < PMAX) ? 1 : 0) : k === 'rum' ? (pending.rum ? 1 : 0) : pending[k].size;
        const open = openGroups.has(k);
        return `<div class="ev-fgroup">
          <h3><button type="button" class="ev-fgroup__btn" data-fgroup="${k}" aria-expanded="${open}" aria-controls="fg-${k}"><span>${GROUPS[k].label}${n ? `<small>${n} valt</small>` : ''}</span>${icon('plus')}</button></h3>
          <div class="ev-fgroup__panel" id="fg-${k}" ${open ? '' : 'hidden'}>${groupBody(k, pending)}</div>
        </div>`;
      }).join('');
      $('[data-sheet-apply] span', fSheet).textContent = `Visa ${nBost(results(pending).length)}`;
      if (focusSel) $(focusSel, sheetGroups)?.focus();
    }
    $$('[data-open-sheet]', app).forEach(b => b.addEventListener('click', () => {
      if (b.dataset.openSheet === 'filter') { pending = clone(F); openGroups.clear(); renderSheet(); fSheet.showModal(); }
      else {
        $('[data-sort-options]', sSheet).innerHTML = Object.entries(SORTS).map(([k, v]) => `<button type="button" class="ev-menuitem" data-sort="${k}" aria-pressed="${k === sort}" aria-checked="${k === sort}">${v}${icon('check')}</button>`).join('');
        sSheet.showModal();
      }
    }));
    fSheet.addEventListener('click', e => {
      if (e.target.closest('[data-sheet-close]')) { fSheet.close(); return; }
      if (e.target.closest('[data-sheet-clear]')) { pending = blank(); renderSheet(); return; }
      if (e.target.closest('[data-sheet-apply]')) { F = pending; fSheet.close(); shown = 8; render(); return; }
      const g = e.target.closest('[data-fgroup]');
      if (g) { const k = g.dataset.fgroup; openGroups.has(k) ? openGroups.delete(k) : openGroups.add(k); renderSheet(`[data-fgroup="${k}"]`); return; }
      handleGroupInput(e, pending, (k, v) => renderSheet(k ? `[data-tile="${k}"][data-val="${v}"]` : null));
    });
    fSheet.addEventListener('input', e => handleRange(e, pending, () => { $('[data-sheet-apply] span', fSheet).textContent = `Visa ${nBost(results(pending).length)}`; }));
    sSheet.addEventListener('click', e => {
      if (e.target.closest('[data-sheet-close]')) { sSheet.close(); return; }
      const s = e.target.closest('[data-sort]'); if (s) { sort = s.dataset.sort; sSheet.close(); shown = 8; render(); }
    });
    [fSheet, sSheet].forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

    /* Snabbval, aktiva filter, vy, visa fler */
    $('[data-quick]', app).addEventListener('click', e => {
      const c = e.target.closest('[data-quick-key]'); if (!c) return;
      const k = c.dataset.quickKey;
      quick.has(k) ? quick.delete(k) : quick.add(k);
      c.setAttribute('aria-pressed', quick.has(k));
      shown = 8; render();
    });
    $('[data-active]', app).addEventListener('click', e => {
      const c = e.target.closest('[data-rm]'); if (!c) return;
      const [k, v] = c.dataset.rm.split('|');
      if (k === 'pris') { F.pmin = PMIN; F.pmax = PMAX; } else if (k === 'rum') F.rum = 0; else F[k].delete(v);
      render();
      ($('[data-rm]', app) || $('[data-count]', app).closest('p')).focus?.();
    });
    $('[data-clear-all]', app).addEventListener('click', () => {
      F = blank(); quick.clear(); $$('[data-quick-key]', app).forEach(c => c.setAttribute('aria-pressed', 'false')); render();
    });
    $$('[data-view]', app).forEach(b => b.addEventListener('click', () => {
      $$('[data-view]', app).forEach(x => x.setAttribute('aria-pressed', x === b));
      $('[data-listings="all"]', app).classList.toggle('is-list', b.dataset.view === 'list');
    }));
    $('[data-show-more]', app).addEventListener('click', () => {
      const before = shown; shown += 8; render();
      const cards = $$('[data-listings="all"] .ev-card h3 a', app); cards[before]?.focus();
    });

    function render() {
      const list = sorted(results(F));
      const grid = $('[data-listings="all"]', app);
      grid.innerHTML = list.slice(0, shown).map(cardHtml).join('');
      $('[data-count]', app).textContent = nBost(list.length);
      $('[data-empty]', app).hidden = list.length > 0;
      const more = $('[data-more]', app);
      more.hidden = list.length === 0;
      $('[data-showing]', app).textContent = `Visar ${Math.min(shown, list.length)} av ${list.length}`;
      $('[data-show-more]', app).hidden = shown >= list.length;
      const chips = [
        ...[...F.typ].map(v => ['typ', v, v]), ...[...F.omrade].map(v => ['omrade', v, v]),
        ...(F.rum ? [['rum', F.rum, `${F.rum}+ rum`]] : []),
        ...(F.pmin > PMIN || F.pmax < PMAX ? [['pris', '', `${mkr(F.pmin)}–${F.pmax >= PMAX ? '' : mkr(F.pmax)}`]] : [])
      ];
      $('[data-active]', app).innerHTML = chips.map(([k, v, l]) => `<li><button type="button" class="ev-chip" data-rm="${k}|${v}">${l}${icon('close')}<span class="ev-sr"> (ta bort filtret)</span></button></li>`).join('');
      const n = activeCount(F);
      $('[data-filter-label]', app).textContent = n ? `Filter (${n})` : 'Filter';
      $('[data-sort-label]', app).textContent = SORTS[sort];
      renderDesk();
    }
    render();
  }

  /* ================= Objektsidan ================= */
  const objectPage = $('[data-object]');
  if (objectPage) {
    const id = new URLSearchParams(location.search).get('id');
    const o = byId(id) || byId('ekbacksvagen-7');
    if (o.id !== 'ekbacksvagen-7') {
      const set = (k, v) => $$(`[data-o="${k}"]`).forEach(el => { if (el.tagName === 'IMG') { el.src = `img/${o.img}`; el.style.objectPosition = o.pos; if (el.alt) el.alt = o.alt; } else el.innerHTML = v; });
      set('address', o.address); set('type', o.type); set('area', o.area); set('img');
      set('price', kr(o.price)); set('kvm', `${o.kvm} m²`); set('rooms', `${o.rooms}`);
      set('year', o.year); set('fee', nb(`${o.fee.toLocaleString('sv-SE')} kr/mån`)); set('energy', o.energy);
      set('ppm', kr(o.price / o.kvm));
      if (o.plot) set('plot', nb(`${o.plot.toLocaleString('sv-SE')} m²`)); else $('[data-o="plot"]').parentElement.hidden = true;
      if (o.ribbon) set('ribbon', o.ribbon); else $('[data-o="ribbon"]').hidden = true;
      $$('.ev-gallery__item').slice(1).forEach(f => f.remove());
      $('[data-gallery]').classList.add('is-single');
      $('.ev-object__text').innerHTML = `<h2 class="ev-dot">Om bostaden</h2><p>${o.type === 'Lägenhet' ? 'Bostadsrätt' : o.type} om ${o.rooms} rum och ${o.kvm} m² i ${o.area}, byggd ${o.year}. Fler bilder, planritning och en utförlig beskrivning finns i objektbeskrivningen. Det här är ett exempelobjekt i ett designkoncept.</p>`;
      $$('[data-fav]').forEach(b => { b.dataset.fav = o.id; });
      document.title = `${o.address}, ${o.area} – ${o.type.toLowerCase()} till salu – Strand & Holm Mäklare`;
    }
    $$('[data-listings="similar"]').forEach(el => {
      el.innerHTML = DATA.filter(x => x.id !== o.id).sort((a, b) => (b.type === o.type) - (a.type === o.type) || a.added - b.added).slice(0, 4).map(cardHtml).join('');
    });

    // Galleri: svep, prickar och räknare
    const track = $('.ev-gallery__track');
    const dots = $$('.ev-gallery__dots i');
    const idx = $('[data-gallery-index]');
    track.addEventListener('scroll', () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, j) => d.classList.toggle('is-on', j === i));
      if (idx) idx.textContent = i + 1;
    }, { passive: true });
    track.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      track.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
    });

    // Spara (fyllt hjärta i varumärkesfärg) och dela
    $$('[data-fav]').forEach(b => {
      const saved = () => { try { return JSON.parse(localStorage.getItem('sh-fav') || '[]'); } catch { return []; } };
      const paint = () => { const on = saved().includes(b.dataset.fav); b.setAttribute('aria-pressed', on); $('[data-fav-label]', b).textContent = on ? 'Sparad' : 'Spara'; };
      paint();
      b.addEventListener('click', () => {
        let s = saved();
        s = s.includes(b.dataset.fav) ? s.filter(x => x !== b.dataset.fav) : [...s, b.dataset.fav];
        try { localStorage.setItem('sh-fav', JSON.stringify(s)); } catch { /* privat läge */ }
        paint();
        toast(s.includes(b.dataset.fav) ? 'Bostaden är sparad.' : 'Bostaden är borttagen från sparade.');
      });
    });
    $('[data-share]')?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); toast('Länken är kopierad.'); }
      catch { toast('Kopiera adressen i webbläsarens adressfält för att dela.'); }
    });
    $$('[data-demo-doc]').forEach(b => b.addEventListener('click', () => toast('Exempeldokument. Filen finns inte i designkonceptet.')));
  }

  /* ================= Flöden i dialog ================= */
  const flows = {};
  function makeFlow(dlg, cfg) {
    const steps = $$('[data-step]', dlg);
    const total = steps.length;
    const S = { step: 1, data: {} };
    const nextBtn = $('[data-next]', dlg), missing = $('[data-flow-missing]', dlg), foot = $('[data-flow-foot]', dlg), confirm = $('[data-confirm]', dlg);
    const fields = () => $$('[data-form] input, [data-form] select, [data-form] textarea', dlg);
    const val = n => { const el = $(`[data-form] [name="${n}"]`, dlg); if (!el) return ''; return el.type === 'checkbox' ? (el.checked ? el.value : '') : el.value.trim(); };
    const stepEl = n => steps[n - 1];
    const required = n => $$('[data-msg]', stepEl(n));
    const problem = () => {
      const bad = required(S.step).filter(i => fieldError(i));
      if (bad.length) return `Fyll i ${listWords(bad.map(labelOf))} för att fortsätta.`;
      return cfg.problem?.(S.step, S.data) || '';
    };
    const isAuto = n => !!$('[data-choice]', stepEl(n));
    function updateFoot() {
      const p = problem();
      nextBtn.hidden = isAuto(S.step);
      nextBtn.setAttribute('aria-disabled', p ? 'true' : 'false');
      $('span', nextBtn).textContent = S.step === total ? cfg.finalLabel : 'Fortsätt';
      missing.textContent = isAuto(S.step) ? '' : p;
      missing.hidden = !missing.textContent;
      $('[data-steps-count]', dlg).textContent = `Steg ${S.step} av ${total}`;
      $$('.ev-steps__list li', dlg).forEach((li, i) => i === S.step - 1 ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
      $$('.ev-steps__dots i', dlg).forEach((d, i) => d.classList.toggle('is-on', i === S.step - 1));
    }
    function summary() {
      const sums = cfg.summary(S.data, val);
      Object.entries(sums).forEach(([k, v]) => { const el = $(`[data-sum="${k}"]`, dlg); if (!el) return; if (el.dataset.empty === undefined) el.dataset.empty = el.textContent; el.innerHTML = v || el.dataset.empty; el.classList.toggle('is-empty', !v); });
    }
    function go(n) {
      S.step = n;
      steps.forEach((s, i) => { s.hidden = i !== n - 1; });
      dlg.classList.toggle('is-final', n === total);
      if (n === total) {
        $('[data-review]', dlg).innerHTML = cfg.review(S.data, val).map(([k, v, s]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd><button type="button" class="ev-link" data-edit="${s}">Ändra<span class="ev-sr"> ${k.toLowerCase()}</span></button></div>`).join('');
      }
      cfg.onEnter?.(n, S.data, api);
      summary(); updateFoot();
      const h = $('h2', stepEl(n));
      $('.ev-dialog__main', dlg).scrollTop = 0;
      h.focus();
    }
    function finish() {
      steps.forEach(s => { s.hidden = true; });
      foot.hidden = true;
      dlg.classList.remove('is-final'); dlg.classList.add('is-done');
      $('[data-confirm-text]', confirm).innerHTML = cfg.confirmText(S.data, val);
      confirm.hidden = false;
      $('h2', confirm).focus();
    }
    const api = {
      data: S.data, update: () => { summary(); updateFoot(); },
      open(prefill = {}) {
        Object.keys(S.data).forEach(k => delete S.data[k]);
        fields().forEach(f => { if (f.type === 'checkbox') f.checked = false; else f.value = f.tagName === 'SELECT' ? f.options[0].value : ''; showError(f, ''); delete f.dataset.touched; });
        Object.entries(prefill).forEach(([k, v]) => { const f = $(`[data-form] [name="${k}"]`, dlg); if (f) f.value = v; });
        $$('[data-choice]', dlg).forEach(b => b.setAttribute('aria-pressed', 'false'));
        dlg.classList.remove('is-done', 'is-final');
        confirm.hidden = true; foot.hidden = false;
        cfg.onOpen?.(S.data, api);
        dlg.showModal();
        go(1);
      }
    };
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-flow-cancel]')) { dlg.close(); return; }
      if (e.target.closest('[data-back]')) { go(S.step - 1); return; }
      const ed = e.target.closest('[data-edit]'); if (ed) { go(+ed.dataset.edit); return; }
      const c = e.target.closest('[data-choice]');
      if (c) {
        S.data[c.dataset.choice] = c.value;
        $$(`[data-choice="${c.dataset.choice}"]`, dlg).forEach(b => b.setAttribute('aria-pressed', b === c));
        summary();
        go(S.step + 1);
      }
    });
    nextBtn.addEventListener('click', () => {
      if (nextBtn.getAttribute('aria-disabled') === 'true') {
        const bad = required(S.step).filter(i => { const m = fieldError(i); showError(i, m); return m; });
        if (bad.length) bad[0].focus(); else cfg.focusProblem?.(S.step, dlg);
        missing.hidden = false;
        return;
      }
      if (S.step < total) go(S.step + 1); else finish();
    });
    $$('[data-form]', dlg).forEach(form => {
      form.addEventListener('submit', e => { e.preventDefault(); nextBtn.click(); });
      $$('[data-msg]', form).forEach(i => {
        i.addEventListener('blur', () => { if (i.value.trim() || i.dataset.touched) showError(i, fieldError(i)); i.dataset.touched = '1'; updateFoot(); });
        i.addEventListener('input', () => { if (i.getAttribute('aria-invalid') === 'true') showError(i, fieldError(i)); updateFoot(); summary(); });
      });
      form.addEventListener('input', () => summary());
    });
    dlg.addEventListener('close', () => { const t = api.opener; if (t && document.contains(t)) t.focus(); });
    $$(`[data-open-flow="${dlg.dataset.flow}"]`).forEach(b => b.addEventListener('click', () => { api.opener = b; api.open(); }));
    return api;
  }

  /* --- Kalender med en dag (ux-val-dag) och tidsrutnät (ux-val-tid) --- */
  const MON = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const DAY_L = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  const fmtLong = d => `${DAY_L[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  function makeCal(el, { selected, onPick }) {
    let view = new Date((selected || today).getFullYear(), (selected || today).getMonth(), 1);
    let focusD = null;
    const disabled = d => d <= today || d.getDay() === 0 || d > new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    function render(focus) {
      const y = view.getFullYear(), m = view.getMonth();
      const lead = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
      const atStart = y === today.getFullYear() && m === today.getMonth();
      let rows = '', cells = '';
      for (let i = 0; i < lead; i++) cells += '<td></td>';
      let firstOk = null;
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d), off = disabled(date);
        if (!off && !firstOk) firstOk = date;
        const on = selected && +date === +selected;
        cells += `<td class="${on ? 'is-start is-end' : ''}"><button type="button" data-date="${iso(date)}" aria-pressed="${on}" aria-label="${fmtLong(date)}${off ? ', inga tider' : ''}" ${off ? 'disabled' : ''} tabindex="-1">${d}</button></td>`;
        if ((lead + d) % 7 === 0) { rows += `<tr>${cells}</tr>`; cells = ''; }
      }
      if (cells) rows += `<tr>${cells}</tr>`;
      el.innerHTML = `<div class="ev-cal__head"><b id="${el.id || 'cal'}-m" aria-live="polite">${MON[m][0].toUpperCase() + MON[m].slice(1)} ${y}</b>
        <div class="ev-cal__nav"><button type="button" data-prev aria-label="Föregående månad" ${atStart ? 'aria-disabled="true"' : ''}>${icon('chevL')}</button><button type="button" data-nextm aria-label="Nästa månad">${icon('chevR')}</button></div></div>
        <table role="grid" aria-labelledby="${el.id || 'cal'}-m"><thead><tr>${['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((d, i) => `<th scope="col" abbr="${DAY_L[(i + 1) % 7]}">${d}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
      const tabTarget = (focusD && $(`[data-date="${iso(focusD)}"]:not(:disabled)`, el)) || (selected && $(`[data-date="${iso(selected)}"]`, el)) || (firstOk && $(`[data-date="${iso(firstOk)}"]`, el));
      if (tabTarget) tabTarget.tabIndex = 0;
      if (focus && tabTarget) tabTarget.focus();
    }
    el.addEventListener('click', e => {
      if (e.target.closest('[data-prev]')) { if (e.target.closest('[aria-disabled="true"]')) return; view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); return; }
      if (e.target.closest('[data-nextm]')) { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); return; }
      const b = e.target.closest('[data-date]'); if (!b || b.disabled) return;
      const [Y, M, D] = b.dataset.date.split('-').map(Number);
      selected = new Date(Y, M - 1, D); focusD = selected; render(true); onPick(selected);
    });
    el.addEventListener('keydown', e => {
      const b = e.target.closest('[data-date]'); const mv = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (!b || !mv) return;
      e.preventDefault();
      const [Y, M, D] = b.dataset.date.split('-').map(Number);
      const d = new Date(Y, M - 1, D + mv);
      if (d < today) return;
      focusD = d; if (d.getMonth() !== view.getMonth()) view = new Date(d.getFullYear(), d.getMonth(), 1);
      render(false);
      const t = $(`[data-date="${iso(d)}"]`, el); if (t) { $$('[data-date]', el).forEach(x => { x.tabIndex = -1; }); t.tabIndex = 0; t.focus(); }
    });
    return { render, reset() { selected = null; focusD = null; view = new Date(today.getFullYear(), today.getMonth(), 1); render(); } };
  }

  /* --- Värdering --- */
  const vDlg = $('[data-flow="vardering"]');
  if (vDlg) {
    const TIMES = ['09.00', '10.30', '13.00', '14.30', '16.00', '17.30'];
    const timesEl = $('[data-times]', vDlg);
    let cal;
    const renderTimes = d => {
      if (!d.dag) { timesEl.innerHTML = '<h3>Tid</h3><p>Välj en dag först, så visas lediga tider.</p>'; return; }
      const date = new Date(d.dag);
      const seed = date.getDate() + date.getMonth();
      const list = date.getDay() === 6 ? TIMES.slice(0, 3) : TIMES;
      timesEl.innerHTML = `<h3>Lediga tider ${date.getDate()} ${MON[date.getMonth()]}</h3><div class="ev-timegrid" role="group" aria-label="Tider">${list.map((t, i) => {
        const full = (seed + i) % 4 === 0;
        return `<button type="button" class="ev-time" data-time="${t}" aria-pressed="${d.tid === t}" ${full ? 'disabled aria-label="' + t + ', bokad"' : ''}>${t}</button>`;
      }).join('')}</div>`;
    };
    flows.vardering = makeFlow(vDlg, {
      finalLabel: 'Boka värdering',
      onOpen(d) { if (cal) cal.reset(); renderTimes(d); },
      onEnter(n, d, api) {
        if (n === 3) {
          if (!cal) cal = makeCal($('[data-cal]', vDlg), { onPick(date) { d.dag = +date; d.tid = ''; renderTimes(d); api.update(); } });
          cal.render(); renderTimes(d);
        }
      },
      problem(n, d) { if (n === 3) { if (!d.dag) return 'Välj en dag för att fortsätta.'; if (!d.tid) return 'Välj en tid för att fortsätta.'; } return ''; },
      focusProblem(n, dlg) { if (n === 3) ($('[data-time]:not(:disabled)', dlg) || $('[data-date][tabindex="0"]', dlg))?.focus(); },
      summary(d, val) {
        return {
          typ: d.typ || '',
          adress: esc(val('adress')),
          tid: d.dag && d.tid ? `${fmtLong(new Date(d.dag))}<br>kl. ${d.tid}` : (d.dag ? fmtLong(new Date(d.dag)) : '')
        };
      },
      review(d, val) {
        const size = [val('yta') && `${val('yta').replace(/\s*m²?$/, '')} m²`, val('rum') && `${val('rum')} rum`].filter(Boolean).join(', ');
        const rows = [['Bostad', d.typ, 1], ['Adress', val('adress') + (size ? ` (${size})` : ''), 2], ['Tid', `${fmtLong(new Date(d.dag))} kl. ${d.tid}`, 3], ['Kontakt', `${val('namn')}, ${val('mobil')}, ${val('epost')}`, 4]];
        if (val('nar')) rows.push(['Vill sälja', val('nar'), 4]);
        return rows;
      },
      confirmText(d, val) { return `Vi ses <b>${fmtLong(new Date(d.dag))} kl. ${d.tid}</b> på ${esc(val('adress'))}. Mäklaren ringer ${esc(val('mobil'))} dagen innan, och en bekräftelse är på väg till ${esc(val('epost'))}.`; }
    });
    timesEl.addEventListener('click', e => {
      const t = e.target.closest('[data-time]'); if (!t || t.disabled) return;
      flows.vardering.data.tid = t.dataset.time;
      $$('[data-time]', timesEl).forEach(b => b.setAttribute('aria-pressed', b === t));
      flows.vardering.update();
    });
    const addr = $('[data-addr-form]');
    if (addr) addr.addEventListener('submit', e => { e.preventDefault(); flows.vardering.opener = $('button', addr); flows.vardering.open({ adress: $('input', addr).value.trim() }); });
    const openFromHash = () => { if (location.hash === '#vardering') { history.replaceState(null, '', location.pathname); flows.vardering.open(); } };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  /* --- Visning --- */
  const sDlg = $('[data-flow="visning"]');
  if (sDlg) {
    flows.visning = makeFlow(sDlg, {
      finalLabel: 'Anmäl mig',
      summary(d) { return { visning: d.visning ? esc(d.visning) : '' }; },
      review(d, val) {
        const rows = [['Visning', d.visning, 1], ['Kontakt', `${val('namn')}, ${val('epost')}, ${val('mobil')}`, 2]];
        if (val('fraga')) rows.push(['Fråga', val('fraga'), 2]);
        if (val('saljer')) rows.push(['Värdering', 'Ja, kontakta mig om en värdering', 2]);
        return rows;
      },
      confirmText(d, val) {
        const addr = $('h1[data-o="address"]').textContent;
        return d.visning.startsWith('Ingen')
          ? `Erik ringer dig på ${esc(val('mobil'))} inom en arbetsdag och bokar en egen visning av ${esc(addr)}.`
          : `Du är anmäld till visningen av ${esc(addr)}, <b>${esc(d.visning.toLowerCase())}</b>. Bekräftelsen är på väg till ${esc(val('epost'))}, och vi skickar en påminnelse dagen innan.`;
      }
    });
  }
})();
