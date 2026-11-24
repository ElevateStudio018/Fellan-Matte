/* Passa: designkoncept av Elevate Studio. Påhittat SaaS-verktyg med exempeldata. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kr = n => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ICON = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    err: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>'
  };
  const svg = (n, c = '') => `<svg class="ev-icon ${c}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
  const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const trialEnd = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; })();
  $$('[data-trial-end]').forEach(el => { el.textContent = trialEnd; });

  /* ---------- Mobilmeny ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    const links = $$('.ev-nav a').filter(a => !a.href.includes('provperiod')).map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.textContent}${svg('arrow')}</a></li>`).join('');
    dlg.innerHTML = `<div class="ev-menu__top">${$('.ev-logo').outerHTML}<button class="ev-iconbtn" type="button" aria-label="Stäng menyn" data-close>${svg('close')}</button></div>
      <ul>${links}</ul>
      <div class="ev-menu__foot"><p class="ev-hint">Gratis i 30 dagar, inget kort behövs.</p><a class="ev-btn ev-btn--block" href="provperiod.html"><span>Starta provperiod</span>${svg('arrow', 'ev-btn__arrow')}</a></div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => dlg.showModal());
    dlg.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.closest('a[href*="#"]')) dlg.close(); });
    dlg.addEventListener('close', () => menuBtn.focus());
  }

  /* ---------- Dragspel ---------- */
  $$('[data-faq]').forEach(faq => faq.addEventListener('click', e => {
    const btn = e.target.closest('.ev-faq__btn');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') === 'true';
    $$('.ev-faq__btn', faq).forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
    if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
  }));

  /* ---------- Fast list på desktop ---------- */
  const bar = $('[data-stickybar]');
  const anchor = $('.ev-hero');
  if (bar && anchor && 'IntersectionObserver' in window) {
    const barBtn = $('a', bar);
    new IntersectionObserver(([en]) => {
      const on = !en.isIntersecting && en.boundingClientRect.top < 0;
      bar.classList.toggle('is-on', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      barBtn.tabIndex = on ? 0 : -1;
    }).observe(anchor);
  }

  /* ---------- Fältfel ---------- */
  const check = input => {
    const v = input.value.trim();
    if (input.dataset.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (input.dataset.type === 'pass') return input.value.length >= 8;
    return v.length >= 2;
  };
  const showErr = (input, ok) => {
    const id = input.getAttribute('aria-describedby').split(' ').find(x => x.endsWith('-fel'));
    const err = $('#' + id);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (ok) { err.hidden = true; return; }
    err.innerHTML = `${svg('err')}<span>${input.dataset.msg}</span>`;
    err.hidden = false;
  };

  /* ---------- Hero: e-post → provperiod ---------- */
  const hero = $('[data-heroform]');
  if (hero) {
    const inp = $('input', hero);
    inp.addEventListener('blur', () => { if (inp.value.trim() !== '') showErr(inp, check(inp)); });
    inp.addEventListener('input', () => { if (inp.getAttribute('aria-invalid') === 'true') showErr(inp, check(inp)); });
    hero.addEventListener('submit', e => {
      if (inp.value.trim() === '') return;
      if (!check(inp)) { e.preventDefault(); showErr(inp, false); inp.focus(); }
    });
  }

  /* ---------- Period: månadsvis eller årsvis (ux-pris-period) ---------- */
  let yearly = false;
  const periodListeners = [];
  $$('[data-period]').forEach(sw => sw.addEventListener('click', () => {
    yearly = !yearly;
    $$('[data-period]').forEach(s => s.setAttribute('aria-checked', String(yearly)));
    $$('[data-m]').forEach(el => { el.textContent = kr(yearly ? el.dataset.y : el.dataset.m); });
    $$('[data-period-note]').forEach(el => { el.textContent = yearly ? 'Betalas årsvis, exklusive moms.' : 'Betalas månadsvis, exklusive moms.'; });
    periodListeners.forEach(f => f());
  }));
  $$('.ps-period label').forEach(l => l.addEventListener('click', e => { e.preventDefault(); $('#' + l.htmlFor).click(); }));

  /* ---------- Planflikar på desktop (ux-pris-paket-layout) ---------- */
  const tabs = $('[data-plantabs]');
  const plans = $('[data-plans]');
  if (tabs && plans) {
    tabs.classList.add('is-ready');
    const mq = matchMedia('(min-width: 900px)');
    const syncMode = () => {
      plans.classList.toggle('is-tabbed', mq.matches);
      $$('.ps-plan', plans).forEach(p => { if (mq.matches) p.setAttribute('role', 'tabpanel'); else p.removeAttribute('role'); });
    };
    mq.addEventListener('change', syncMode); syncMode();
    const select = btn => {
      $$('[role="tab"]', tabs).forEach(t => { const on = t === btn; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      $$('.ps-plan', plans).forEach(p => p.classList.toggle('is-active', p.dataset.plan === btn.dataset.tab));
    };
    tabs.addEventListener('click', e => { const t = e.target.closest('[role="tab"]'); if (t) select(t); });
    tabs.addEventListener('keydown', e => {
      const list = $$('[role="tab"]', tabs);
      const i = list.indexOf(document.activeElement);
      if (i < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length;
      list[n].focus(); select(list[n]);
    });
  }

  /* ==========================================================================
     Flödet: starta provperiod (ux-flode-*)
     ========================================================================== */
  const flow = $('[data-flow]');
  if (!flow) return;
  const PLAN = { start: { name: 'Start', m: 39, y: 33 }, team: { name: 'Team', m: 59, y: 50 }, foretag: { name: 'Företag', m: 89, y: 76 } };
  const params = new URLSearchParams(location.search);
  const state = { step: 1, plan: null, anst: 10 };
  const TOTAL = 4;
  const steps = $$('[data-step]', flow);
  const nextBtn = $('[data-next]', flow);
  const nextLabel = $('[data-next-label]', flow);
  const missing = $('[data-missing]', flow);
  const back = $('[data-back]', flow);
  const stepsEl = $('[data-steps]', flow);
  const summary = $('[data-summary]');
  const forms = { 2: $('[data-form="2"]', flow), 3: $('[data-form="3"]', flow) };
  const req = n => $$('input[required]', forms[n]);
  const terms = $('[data-terms]', flow);

  // Förval från startsidan och prissidan: visas, användaren bekräftar själv
  if (params.get('epost')) $('#f-epost').value = params.get('epost');
  if (PLAN[params.get('plan')]) $(`[data-choices="plan"] [data-value="${params.get('plan')}"]`).setAttribute('aria-pressed', 'true');

  const price = () => state.plan ? PLAN[state.plan][yearly ? 'y' : 'm'] * state.anst : null;
  const render = () => {
    const p = price();
    $$('[data-total]').forEach(el => { el.textContent = p === null ? '–' : `${kr(p)}/mån`; });
    const note = $('[data-total-note]');
    if (note && state.plan) note.textContent = `${state.anst} anställda × ${kr(PLAN[state.plan][yearly ? 'y' : 'm'])}, ${yearly ? 'betalas årsvis' : 'betalas månadsvis'}, exkl. moms.`;
    const set = (k, v, empty) => { const dd = $(`[data-sum="${k}"]`); dd.textContent = v || empty; dd.classList.toggle('is-empty', !v); };
    set('plan', state.plan && PLAN[state.plan].name, 'Inte vald än');
    set('period', yearly ? 'Årsvis, 15 % rabatt' : 'Månadsvis', '');
    set('anst', String(state.anst), '');
  };
  periodListeners.push(() => { render(); if (state.step === 4) renderReview(); });

  const missingText = n => {
    const miss = req(n).filter(f => !check(f)).map(f => f.labels[0].textContent.trim().toLowerCase());
    if (n === 4 && !terms.checked) return 'Godkänn villkoren för att starta provperioden.';
    if (!miss.length) return '';
    return `Fyll i ${miss.length > 1 ? miss.slice(0, -1).join(', ') + ' och ' + miss.at(-1) : miss[0]} för att gå vidare.`;
  };
  const stepValid = n => n === 4 ? terms.checked : (forms[n] ? req(n).every(check) : true);
  const updateFoot = () => {
    const s = state.step;
    nextBtn.hidden = s < 2;
    nextLabel.textContent = s === 4 ? 'Starta provperiod' : 'Fortsätt';
    const ok = stepValid(s);
    nextBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    missing.textContent = ok ? '' : missingText(s);
    missing.hidden = ok;
  };
  const renderReview = () => {
    const f2 = new FormData(forms[2]), f3 = new FormData(forms[3]);
    const rows = [
      ['Plan', `${PLAN[state.plan].name}, ${yearly ? 'årsvis betalning' : 'månadsvis betalning'}`, 1],
      ['Arbetsplats', `${esc(f2.get('foretag'))}, ${esc(f2.get('bransch')).toLowerCase()}, ${state.anst} anställda`, 2],
      ['Konto', `${esc(f3.get('namn'))}<br>${esc(f3.get('epost'))}`, 3]
    ];
    $('[data-review]').innerHTML = rows.map(([t, v, n]) => `<div><dt>${t}</dt><dd>${v}</dd><button class="ev-link" type="button" data-goto="${n}">Ändra<span class="ev-sr"> ${t.toLowerCase()}</span></button></div>`).join('');
  };
  const go = (n, focus = true) => {
    state.step = n;
    steps.forEach(s => { s.hidden = +s.dataset.step !== n; });
    back.hidden = n === 1;
    $('.ev-steps__count', stepsEl).textContent = `Steg ${n} av ${TOTAL}`;
    $$('.ev-steps__list li', stepsEl).forEach((li, i) => { if (i + 1 === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', stepsEl).forEach((d, i) => d.classList.toggle('is-on', i + 1 === n));
    if (n === 4) renderReview();
    render(); updateFoot();
    if (focus) {
      if (flow.getBoundingClientRect().top < 0) flow.scrollIntoView({ block: 'start' });
      $(`[data-step="${n}"] h1`, flow).focus({ preventScroll: true });
    }
  };

  $('[data-choices="plan"]', flow).addEventListener('click', e => {
    const b = e.target.closest('.ev-choice');
    if (!b) return;
    $$('.ev-choice', flow).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    state.plan = b.dataset.value;
    go(2);
  });

  const qtyOut = $('[data-qty-out]', flow);
  const minus = $('[data-qty="-1"]', flow);
  const syncQty = () => { qtyOut.textContent = state.anst; minus.setAttribute('aria-disabled', String(state.anst <= 1)); render(); };
  $$('[data-qty]', flow).forEach(b => b.addEventListener('click', () => {
    const v = state.anst + +b.dataset.qty;
    if (v < 1 || v > 500) return;
    state.anst = v; syncQty();
  }));
  syncQty();

  [2, 3].forEach(n => {
    req(n).forEach(f => {
      f.addEventListener('blur', () => { if (f.value.trim() !== '') showErr(f, check(f)); updateFoot(); });
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') showErr(f, check(f)); updateFoot(); });
    });
    forms[n].addEventListener('submit', e => { e.preventDefault(); nextBtn.click(); });
  });
  terms.addEventListener('change', () => { if (terms.checked) $('#villkor-fel').hidden = true; updateFoot(); });

  const eye = $('[data-eye]', flow);
  eye.addEventListener('click', () => {
    const inp = $('#f-losen');
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    eye.setAttribute('aria-pressed', String(show));
    eye.setAttribute('aria-label', show ? 'Dölj lösenordet' : 'Visa lösenordet');
    eye.innerHTML = svg(show ? 'eyeOff' : 'eye');
  });

  nextBtn.addEventListener('click', () => {
    const s = state.step;
    if (!stepValid(s)) {
      if (s === 4) {
        const err = $('#villkor-fel');
        err.innerHTML = `${svg('err')}<span>Kryssa i rutan för att godkänna villkoren.</span>`;
        err.hidden = false; terms.focus();
      } else {
        req(s).forEach(f => showErr(f, check(f)));
        req(s).find(f => !check(f)).focus();
      }
      return;
    }
    if (s === 4) return finish();
    go(s + 1);
  });
  back.addEventListener('click', e => { e.preventDefault(); if (state.step > 1) go(state.step - 1); });
  flow.addEventListener('click', e => { const g = e.target.closest('[data-goto]'); if (g) go(+g.dataset.goto); });

  const finish = () => {
    const f2 = new FormData(forms[2]), f3 = new FormData(forms[3]);
    steps.forEach(s => { s.hidden = true; });
    back.hidden = true;
    $('[data-foot]', flow).hidden = true;
    summary.classList.add('is-hidden');
    const done = $('[data-done]', flow);
    $('[data-done-text]', done).textContent = `${f2.get('foretag')} har nu Passa ${PLAN[state.plan].name} gratis till ${trialEnd}. Vi har lagt upp ett exempelschema för ${state.anst} anställda som du kan ändra eller rensa.`;
    $('[data-done-mail]', done).textContent = `En länk för att logga in har skickats till ${f3.get('epost')}. I det här konceptet skickas ingenting på riktigt.`;
    done.hidden = false;
    $('h1', done).focus();
    flow.scrollIntoView({ block: 'start' });
  };

  go(1, false);
})();
