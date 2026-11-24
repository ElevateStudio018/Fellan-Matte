/* Balans redovisning: designkoncept av Elevate Studio. Påhittad byrå med exempeldata. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kr = n => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr`;
  const ICON = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    err: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>'
  };
  const svg = (n, c = '') => `<svg class="ev-icon ${c}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

  /* ---------- Mobilmeny: helskärmspanel i <dialog> (fångar fokus, Esc stänger) ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const nav = $('.ev-nav');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    const links = $$('a', nav).map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.textContent}${svg('arrow')}</a></li>`).join('');
    dlg.innerHTML = `<div class="ev-menu__top">${$('.ev-logo').outerHTML}<button class="ev-iconbtn" type="button" aria-label="Stäng menyn" data-close>${svg('close')}</button></div>
      <ul>${links}</ul>
      <div class="ev-menu__foot"><p class="ev-hint">Telefon vardagar 8–17</p><a class="ev-btn ev-btn--block" href="tel:+46100000000"><span>Ring 010-000 00 00</span></a></div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => dlg.showModal());
    dlg.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.closest('a[href^="#"], a[href*="#"]')) dlg.close(); });
    dlg.addEventListener('close', () => menuBtn.focus());
  }

  /* ---------- Dragspel: en öppen i taget (ux-faq-*) ---------- */
  $$('[data-faq]').forEach(faq => {
    faq.addEventListener('click', e => {
      const btn = e.target.closest('.ev-faq__btn');
      if (!btn) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      $$('.ev-faq__btn', faq).forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    });
  });

  /* ---------- Fast list på desktop när huvudknappen scrollats förbi (ux-cta-folj-med) ---------- */
  const bar = $('[data-stickybar]');
  const anchor = $('.ev-hero') || $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    const barBtn = $('a', bar);
    new IntersectionObserver(([en]) => {
      const on = !en.isIntersecting && en.boundingClientRect.top < 0;
      bar.classList.toggle('is-on', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      barBtn.tabIndex = on ? 0 : -1;
    }).observe(anchor);
  }

  /* ---------- Fältfel (ux-fel-*): visas när man lämnar fältet ---------- */
  const check = input => {
    const v = input.value.trim();
    if (input.dataset.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (input.dataset.type === 'tel') return v.replace(/\D/g, '').length >= 8;
    if (input.type === 'number') return v !== '' && +v >= 1;
    return v.length >= 2;
  };
  const showErr = (input, ok) => {
    const err = $('#' + input.getAttribute('aria-describedby'));
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (!err) return;
    if (ok) { err.hidden = true; return; }
    if (!err.children.length) err.innerHTML = `${svg('err')}<span>${input.dataset.msg}</span>`;
    err.hidden = false;
  };

  /* ---------- Prismodell (påhittad) ---------- */
  const BASE = { ab: [1195, 1795, 2795, 4295], ef: [795, 1295, 2195, 3495], hb: [995, 1495, 2395, 3795], fo: [695, 1095, 1895, 2995] };
  const BOLAG = { ab: 'Aktiebolag', ef: 'Enskild firma', hb: 'Handelsbolag', fo: 'Ideell förening' };
  const BANDS = ['Upp till 20', '21–50', '51–100', 'Fler än 100'];
  const SVC = {
    lon: { name: 'Lön', price: () => 195, per: true },
    bokslut: { name: b => b === 'ef' ? 'Förenklat årsbokslut' : 'Bokslut och årsredovisning', price: b => b === 'ef' ? 295 : 595 },
    dekl: { name: 'Deklaration', price: b => b === 'ab' ? 295 : 195 },
    fakt: { name: 'Kundfakturering', price: () => 295 },
    rad: { name: 'Rådgivning', price: () => 245 }
  };
  const KONSULT = { ab: 'Anna Ekholm', ef: 'Sara Lindqvist', hb: 'Jonas Berglund', fo: 'Sara Lindqvist' };

  /* ---------- Hero (ny): minikalkylator. Bolagsform och verifikationer → månadspris direkt, sedan till flödet ---------- */
  const calc = $('[data-herocalc]');
  if (calc) {
    const range = $('input[type="range"]', calc);
    const priceEl = $('[data-calc-price]', calc);
    const PORTRATT = { 'Anna Ekholm': 'img/portratt-3.jpg', 'Jonas Berglund': 'img/portratt-2.jpg', 'Sara Lindqvist': 'img/portratt-1.jpg' };
    const bandOf = v => v <= 20 ? 0 : v <= 50 ? 1 : v <= 100 ? 2 : 3;
    let last = '';
    const update = () => {
      const bolag = $('input[name="bolag"]:checked', calc).value;
      const v = +range.value, max = +range.max, band = bandOf(v);
      const verText = v >= max ? `${max} eller fler` : String(v);
      const price = kr(BASE[bolag][band]);
      range.style.setProperty('--p', `${((v - range.min) / (max - range.min)) * 100}%`);
      range.setAttribute('aria-valuetext', `${verText} verifikationer, ${price} i månaden`);
      $('[data-calc-ver]', calc).textContent = v >= max ? `${max}+` : v;
      if (price !== last) {                         // texten byts bara när priset ändras, så skärmläsaren inte pratar vid varje steg
        priceEl.textContent = price;
        if (last) { priceEl.classList.remove('is-bump'); void priceEl.offsetWidth; priceEl.classList.add('is-bump'); }
        last = price;
      }
      $('[data-calc-note]', calc).textContent = `${BOLAG[bolag]} med ${BANDS[band].toLowerCase()} verifikationer. Bokföring och moms ingår. Priset är exklusive moms.`;
      const who = KONSULT[bolag];
      $('[data-calc-konsult]', calc).textContent = who;
      $('[data-calc-img]', calc).src = PORTRATT[who];
    };
    calc.addEventListener('input', update);
    calc.addEventListener('change', update);
    update();
  }

  /* ---------- Prislistan (priser.html) ---------- */
  const ptable = $('[data-pricetable]');
  if (ptable) {
    let bolag = 'ab', inkl = false;
    const render = () => {
      const f = inkl ? 1.25 : 1;
      $$('[data-band]', ptable).forEach(td => { td.textContent = kr(BASE[bolag][+td.dataset.band] * f); });
      $$('[data-addon]').forEach(el => {
        const s = SVC[el.dataset.addon];
        el.textContent = kr(s.price(bolag) * f) + (s.per ? ' per anställd' : '');
      });
      $$('[data-addon-name]').forEach(el => { const n = SVC[el.dataset.addonName].name; el.textContent = typeof n === 'function' ? n(bolag) : n; });
      $('[data-caption-bolag]').textContent = BOLAG[bolag].toLowerCase();
      $$('[data-moms-text]').forEach(el => { el.textContent = inkl ? 'inklusive moms' : 'exklusive moms'; });
      const cta = $('[data-price-cta]');
      if (cta) cta.href = `rakna.html?bolag=${bolag}`;
    };
    $$('[data-set-bolag]').forEach(b => b.addEventListener('click', () => {
      bolag = b.dataset.setBolag;
      $$('[data-set-bolag]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      render();
    }));
    $$('[data-set-moms]').forEach(b => b.addEventListener('click', () => {
      inkl = b.dataset.setMoms === 'inkl';
      $$('[data-set-moms]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      render();
    }));
    render();
  }

  /* ==========================================================================
     Flödet: räkna ut pris och boka samtal (ux-flode-*)
     ========================================================================== */
  const flow = $('[data-flow]');
  if (!flow) return;

  const params = new URLSearchParams(location.search);
  const state = { step: 1, bolag: null, ver: null, svc: new Set(), anst: 1 };
  const TOTAL_STEPS = 5;
  const steps = $$('[data-step]', flow);
  const nextBtn = $('[data-next]', flow);
  const nextLabel = $('[data-next-label]', flow);
  const missing = $('[data-missing]', flow);
  const back = $('[data-back]', flow);
  const stepsEl = $('[data-steps]', flow);
  const summary = $('[data-summary]');
  const form = $('[data-contact]', flow);
  const fields = $$('input[required]', form);

  // Förval från startsidan eller prislistan: visas som utgångspunkt, inte tyst förval
  const heroVer = parseInt(params.get('ver'), 10);
  if (heroVer > 0) {
    const band = heroVer <= 20 ? 0 : heroVer <= 50 ? 1 : heroVer <= 100 ? 2 : 3;
    const note = $('[data-ver-note]');
    $('span', note).textContent = `Du angav ${heroVer} verifikationer på startsidan. Det motsvarar ${BANDS[band].toLowerCase()}.`;
    note.hidden = false;
    $(`[data-choices="ver"] [data-value="${band}"]`).setAttribute('aria-pressed', 'true');
  }
  if (params.get('bolag') && BOLAG[params.get('bolag')]) {
    $(`[data-choices="bolag"] [data-value="${params.get('bolag')}"]`).setAttribute('aria-pressed', 'true');
  }

  const total = () => {
    if (!state.bolag || state.ver === null) return null;
    let t = BASE[state.bolag][state.ver];
    state.svc.forEach(k => { t += SVC[k].price(state.bolag) * (SVC[k].per ? state.anst : 1); });
    return t;
  };
  const svcNames = () => ['Löpande bokföring och moms', ...[...state.svc].map(k => {
    const n = SVC[k].name; const name = typeof n === 'function' ? n(state.bolag) : n;
    return k === 'lon' ? `${name} (${state.anst} ${state.anst === 1 ? 'anställd' : 'anställda'})` : name;
  })];

  const renderPrices = () => {
    const b = state.bolag || 'ab';
    $('[data-base-price]').textContent = state.ver !== null ? kr(BASE[b][state.ver]) : '';
    $$('[data-svc-price]').forEach(el => {
      const s = SVC[el.dataset.svcPrice];
      el.textContent = `+${kr(s.price(b))}${s.per ? '/anst.' : ''}`;
    });
    $('[data-bokslut-name]').textContent = SVC.bokslut.name(b);
    const t = total();
    $$('[data-total]').forEach(el => { el.textContent = t === null ? '–' : `${kr(t)}/mån`; });
    // Sammanfattning
    const set = (k, v) => { const dd = $(`[data-sum="${k}"]`); dd.textContent = v || 'Inte valt än'; dd.classList.toggle('is-empty', !v); };
    set('bolag', state.bolag && BOLAG[state.bolag]);
    set('ver', state.ver !== null && BANDS[state.ver]);
    set('tjanster', svcNames().join(', '));
  };

  const contactValid = () => fields.every(check) && !!$('input[name="tid"]:checked', form);
  const missingText = () => {
    const miss = [];
    fields.forEach(f => { if (!check(f)) miss.push(f.labels[0].textContent.trim().toLowerCase()); });
    if (!$('input[name="tid"]:checked', form)) miss.push('tid för samtalet');
    if (!miss.length) return '';
    const list = miss.length > 1 ? miss.slice(0, -1).join(', ') + ' och ' + miss.at(-1) : miss[0];
    return `Fyll i ${list} för att gå vidare.`;
  };

  const updateFoot = () => {
    const s = state.step;
    nextBtn.hidden = s < 3 || s > TOTAL_STEPS;
    nextLabel.textContent = s === 5 ? 'Boka samtal' : 'Fortsätt';
    if (s === 4) {
      const ok = contactValid();
      nextBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
      missing.textContent = missingText();
      missing.hidden = ok;
    } else {
      nextBtn.setAttribute('aria-disabled', 'false');
      missing.hidden = true;
    }
  };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const go = (n, focus = true) => {
    state.step = n;
    steps.forEach(s => { s.hidden = +s.dataset.step !== n; });
    back.hidden = n === 1;
    $('.ev-steps__count', stepsEl).textContent = `Steg ${n} av ${TOTAL_STEPS}`;
    $$('.ev-steps__list li', stepsEl).forEach((li, i) => { if (i + 1 === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', stepsEl).forEach((d, i) => d.classList.toggle('is-on', i + 1 === n));
    if (n === 5) {
      const d = new FormData(form);
      // Värden från fälten escapas innan de skrivs ut
      ['namn', 'foretag', 'tel', 'epost'].forEach(k => form.elements[k].dataset.safe = esc(d.get(k) || ''));
      renderReviewSafe();
    }
    renderPrices();
    updateFoot();
    if (focus) {
      const h = $(`[data-step="${n}"] h1`, flow);
      if (flow.getBoundingClientRect().top < 0) flow.scrollIntoView({ block: 'start' });
      h.focus({ preventScroll: true });
    }
  };
  const renderReviewSafe = () => {
    const g = k => form.elements[k].dataset.safe;
    const tid = $('input[name="tid"]:checked', form)?.value || '';
    const rows = [
      ['Bolagsform', BOLAG[state.bolag], 1],
      ['Verifikationer per månad', BANDS[state.ver], 2],
      ['Tjänster', svcNames().join(', '), 3],
      ['Kontakt', `${g('namn')}${g('foretag') ? ', ' + g('foretag') : ''}<br>${g('tel')} · ${g('epost')}`, 4],
      ['Samtal', `${tid}, nästa vardag`, 4]
    ];
    $('[data-review]').innerHTML = rows.map(([t, v, n]) =>
      `<div><dt>${t}</dt><dd>${v}</dd><button class="ev-link" type="button" data-goto="${n}">Ändra<span class="ev-sr"> ${t.toLowerCase()}</span></button></div>`).join('');
  };

  // Val som går vidare direkt
  $$('[data-choices]', flow).forEach(group => {
    group.addEventListener('click', e => {
      const btn = e.target.closest('.ev-choice');
      if (!btn) return;
      $$('.ev-choice', group).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      if (group.dataset.choices === 'bolag') state.bolag = btn.dataset.value;
      else state.ver = +btn.dataset.value;
      go(state.step + 1);
    });
  });

  // Tjänster
  $$('[data-svc]', flow).forEach(cb => cb.addEventListener('change', () => {
    cb.checked ? state.svc.add(cb.value) : state.svc.delete(cb.value);
    if (cb.value === 'lon') $('[data-lon-extra]').hidden = !cb.checked;
    renderPrices();
  }));
  const qtyOut = $('[data-qty-out]');
  const minus = $('[data-qty="-1"]');
  const syncQty = () => { qtyOut.textContent = state.anst; minus.setAttribute('aria-disabled', String(state.anst <= 1)); renderPrices(); };
  $$('[data-qty]', flow).forEach(b => b.addEventListener('click', () => {
    const v = state.anst + +b.dataset.qty;
    if (v < 1 || v > 50) return;
    state.anst = v; syncQty();
  }));
  syncQty();

  // Kontaktfält: fel när man lämnar fältet, rättas medan man skriver
  fields.forEach(f => {
    f.addEventListener('blur', () => { if (f.value.trim() !== '' || f.dataset.touched) showErr(f, check(f)); f.dataset.touched = '1'; updateFoot(); });
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') showErr(f, check(f)); updateFoot(); });
  });
  form.addEventListener('change', e => {
    if (e.target.name === 'tid') { const err = $('#f-tid-fel'); err.hidden = true; }
    updateFoot();
  });
  form.addEventListener('submit', e => { e.preventDefault(); nextBtn.click(); });

  nextBtn.addEventListener('click', () => {
    const s = state.step;
    if (s === 4 && !contactValid()) {
      // Visa felen vid fälten och hoppa till det första (ux-fel-forflyttning)
      fields.forEach(f => showErr(f, check(f)));
      const tidErr = $('#f-tid-fel');
      if (!$('input[name="tid"]:checked', form)) { tidErr.innerHTML = `${svg('err')}<span>Välj när det passar att vi ringer.</span>`; tidErr.hidden = false; }
      const first = fields.find(f => !check(f)) || $('input[name="tid"]', form);
      first.focus();
      return;
    }
    if (s === 5) return finish();
    go(s + 1);
  });

  back.addEventListener('click', e => { e.preventDefault(); if (state.step > 1) go(state.step - 1); });
  flow.addEventListener('click', e => { const g = e.target.closest('[data-goto]'); if (g) go(+g.dataset.goto); });

  const nextWorkday = () => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    const days = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
    const months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  };

  const finish = () => {
    const d = new FormData(form);
    const tid = (d.get('tid') || '').toLowerCase();
    const when = tid === 'när som helst' ? 'någon gång mellan 8 och 17' : tid === 'förmiddag' ? 'på förmiddagen' : 'på eftermiddagen';
    steps.forEach(s => { s.hidden = true; });
    back.hidden = true;
    $('[data-foot]', flow).hidden = true;
    summary.classList.add('is-hidden');
    const done = $('[data-done]', flow);
    $('[data-done-text]', done).textContent = `${KONSULT[state.bolag]} ringer dig ${nextWorkday()} ${when} från 010\u2011000\u00a000\u00a000. Uppskattat pris: ${kr(total())} i månaden exklusive moms.`;
    $('[data-done-mail]', done).textContent = `Vi har skickat en bekräftelse till ${d.get('epost')}. I det här konceptet skickas ingenting på riktigt.`;
    done.hidden = false;
    $('h1', done).focus();
    flow.scrollIntoView({ block: 'start' });
  };

  go(1, false);
})();
