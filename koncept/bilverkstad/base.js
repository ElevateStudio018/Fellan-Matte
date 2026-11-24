/* Elevate Studio: gemensam grund-JS för konceptsajterna. Ingenting skickas någonstans. */
(() => {
  'use strict';

  /* ---------- Ikoner (24-rutnät, linje, rundade ändar, sy-*) ---------- */
  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    errorCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  const icon = (name, cls = '') => `<svg class="ev-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmtDate = (s, withDay = true) => { if (!s) return ''; const d = parseDate(s); const t = `${d.getDate()} ${MONTHS[d.getMonth()]}`; return withDay ? `${DAYS[d.getDay()].replace(/^./, c => c.toUpperCase())} ${t}` : t; };
  const kr = n => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr`;

  /* ---------- Mobilmeny (panel i helskärm) ---------- */
  function initMenu() {
    const btn = $('.ev-menubtn');
    const dlg = $('#meny');
    if (!btn || !dlg) return;
    btn.addEventListener('click', () => { dlg.showModal(); btn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { btn.setAttribute('aria-expanded', 'false'); btn.focus(); });
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches && dlg.open) dlg.close(); });
  }

  /* ---------- Dragspel: första öppen, en i taget (ux-faq-*) ---------- */
  function initFaq() {
    $$('.ev-faq').forEach(faq => {
      const btns = $$('.ev-faq__btn', faq);
      btns.forEach(b => b.addEventListener('click', () => {
        const open = b.getAttribute('aria-expanded') === 'true';
        btns.forEach(o => { o.setAttribute('aria-expanded', 'false'); document.getElementById(o.getAttribute('aria-controls')).hidden = true; });
        if (!open) { b.setAttribute('aria-expanded', 'true'); document.getElementById(b.getAttribute('aria-controls')).hidden = false; }
      }));
    });
  }

  /* ---------- Fast list på desktop när huvudknappen scrollat ur bild (ux-cta-folj-med) ---------- */
  function initSticky() {
    const bar = $('.ev-stickybar');
    const anchor = $('[data-sticky-anchor]');
    if (!bar || !anchor || !('IntersectionObserver' in window)) return;
    const footer = $('.ev-footer');
    let past = false, atFooter = false;
    const set = () => { const on = past && !atFooter; bar.classList.toggle('is-on', on); bar.toggleAttribute('inert', !on); };
    new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; set(); }).observe(anchor);
    if (footer) new IntersectionObserver(([e]) => { atFooter = e.isIntersecting; set(); }).observe(footer);
    set();
  }

  /* ---------- Fältvalidering (ux-fel-*): fel när man lämnar fältet, säger vad man ska göra ---------- */
  const validators = {};
  function labelOf(input) {
    const l = input.id && document.querySelector(`label[for="${input.id}"]`);
    return (input.dataset.short || (l ? l.firstChild.textContent : input.name) || '').trim().toLowerCase();
  }
  function check(input) {
    const v = (input.type === 'checkbox') ? (input.checked ? 'on' : '') : input.value.trim();
    if (input.required && !v) return input.dataset.empty || `Fyll i ${labelOf(input)}.`;
    if (!v) return '';
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Skriv e-posten som namn@exempel.se.';
    if (input.type === 'tel' && (v.replace(/\D/g, '').length < 8 || /[^\d\s+\-()]/.test(v))) return 'Skriv ett telefonnummer med minst 8 siffror, till exempel 070-123 45 67.';
    if (input.type === 'date') {
      if (input.min && v < input.min) return `Välj ${input.min === isoDate(new Date()) ? 'i dag eller ett senare datum' : 'ett senare datum'}.`;
      if (input.max && v > input.max) return input.dataset.maxMsg || 'Välj ett tidigare datum.';
    }
    if (input.dataset.validate && validators[input.dataset.validate]) return validators[input.dataset.validate](input, v) || '';
    return '';
  }
  function errorEl(input) {
    let el = document.getElementById(`${input.id}-fel`);
    if (!el) {
      el = document.createElement('p');
      el.className = 'ev-error'; el.id = `${input.id}-fel`; el.hidden = true;
      const field = input.closest('.ev-field') || input.parentElement;
      field.appendChild(el);
      const ids = (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      ids.push(el.id); input.setAttribute('aria-describedby', ids.join(' '));
    }
    return el;
  }
  function show(input, msg) {
    const el = errorEl(input);
    if (msg) { el.innerHTML = `${icon('errorCircle')}<span>${msg}</span>`; el.hidden = false; input.setAttribute('aria-invalid', 'true'); }
    else { el.hidden = true; input.removeAttribute('aria-invalid'); }
  }
  function bindField(input, onChange) {
    input.addEventListener('blur', () => { if (input.value || input.dataset.touched) show(input, check(input)); });
    input.addEventListener('input', () => {
      input.dataset.touched = '1';
      if (input.getAttribute('aria-invalid') === 'true' && !check(input)) show(input, '');
      onChange && onChange();
    });
    input.addEventListener('change', () => { if (input.type === 'checkbox' || input.type === 'date') { input.dataset.touched = '1'; show(input, check(input)); } onChange && onChange(); });
  }
  /* Grå knapp tills allt stämmer (ux-fel-inaktiv-knapp), men nåbar via aria-disabled och med en rad om vad som saknas */
  function gate(inputs, btn, missingEl) {
    const update = () => {
      const bad = inputs.filter(i => !i.disabled && check(i));
      btn.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      if (!missingEl) return bad;
      if (bad.length === 1 && bad[0].dataset.missing) { missingEl.textContent = bad[0].dataset.missing; missingEl.hidden = false; }
      else if (bad.length) {
        const names = bad.map(i => i.dataset.short || labelOf(i));
        const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} och ${names.at(-1)}` : names[0];
        missingEl.textContent = `Fyll i ${list} för att ${btn.dataset.verb || 'fortsätta'}.`;
        missingEl.hidden = false;
      } else missingEl.hidden = true;
      return bad;
    };
    return update;
  }
  function validateAll(inputs) {
    let first = null;
    inputs.forEach(i => { if (i.disabled) return; const m = check(i); show(i, m); if (m && !first) first = i; });
    if (first) { first.focus(); first.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
    return !first;
  }

  /* Ja/nej-knappar som sätter ett dolt fält (ux-val-ja-nej) */
  function initYesNo(root = document) {
    $$('.ev-yesno', root).forEach(g => {
      const hidden = document.getElementById(g.dataset.for);
      $$('button', g).forEach(b => b.addEventListener('click', () => {
        $$('button', g).forEach(o => o.setAttribute('aria-pressed', String(o === b)));
        if (hidden) { hidden.value = b.value; hidden.dispatchEvent(new Event('input', { bubbles: true })); }
      }));
    });
  }

  /* ---------- Enkelt formulär (kontakt): grå knapp, fel vid fält, tack-ruta ---------- */
  function initForms() {
    $$('form[data-ev-form]').forEach(form => {
      const inputs = $$('input, textarea, select', form).filter(i => i.type !== 'hidden' && i.type !== 'submit');
      const btn = $('[type="submit"]', form);
      const missing = $('.ev-form__missing', form);
      const update = gate(inputs, btn, missing);
      inputs.forEach(i => bindField(i, update));
      update();
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateAll(inputs)) return;
        const done = document.getElementById(form.dataset.done);
        if (done) {
          form.hidden = true; done.hidden = false;
          const h = $('h2, h3', done); if (h) { h.tabIndex = -1; h.focus(); }
        }
      });
    });
  }

  /* ---------- Stegflöde på egen sida (ux-flode-*) ---------- */
  function flow(cfg) {
    const form = $('[data-flow]');
    if (!form) return null;
    const grid = form.closest('.ev-flowgrid');
    const steps = $$('.ev-step:not([data-done])', form);
    const done = $('.ev-step[data-done]', form);
    const foot = $('.ev-flow__foot', form);
    const next = $('.ev-flow__next', form);
    const nextLabel = $('span', next);
    const missing = $('.ev-form__missing', form);
    const summary = $('[data-summary]');
    const state = {};
    let cur = 0;

    // Stegindikator vid knapparna: "Steg 2 av 4" och stegnamn med chevron emellan
    const names = steps.map(s => s.dataset.stepName);
    const ind = document.createElement('div');
    ind.className = 'ev-steps';
    ind.innerHTML = `<p class="ev-steps__count" aria-live="polite"></p><ol class="ev-steps__list">${names.map(n => `<li>${n}</li>`).join('')}</ol><span class="ev-steps__dots" aria-hidden="true">${names.map(() => '<i></i>').join('')}</span>`;
    foot.appendChild(ind);

    const fieldsOf = s => $$('input, textarea, select', s).filter(i => i.type !== 'hidden' && !i.closest('[hidden]'));
    let gateFn = () => [];
    steps.forEach(s => $$('input, textarea, select', s).forEach(i => {
      if (i.type === 'hidden') { i.addEventListener('input', () => { collect(s); render(); }); return; }
      bindField(i, () => { if (steps[cur] === s) gateFn(); collect(s); render(); });
    }));

    function collect(s) {
      $$('input, textarea, select', s).forEach(i => {
        if (!i.name) return;
        state[i.name] = i.type === 'checkbox' ? i.checked : i.value.trim();
      });
    }
    function render() {
      if (summary && cfg.rows) {
        const dl = $('dl', summary);
        dl.innerHTML = cfg.rows.map(r => { const v = r.value(state); return `<div><dt>${r.label}</dt><dd class="${v ? '' : 'is-empty'}">${v || 'Inte valt än'}</dd></div>`; }).join('');
        const tot = $('[data-total]', summary);
        if (tot && cfg.total) { const t = cfg.total(state); tot.hidden = !t; tot.innerHTML = t || ''; }
      }
      const rev = $('[data-review]', form);
      if (rev && cfg.rows) {
        rev.innerHTML = cfg.rows.filter(r => r.value(state)).map(r => `<div><dt>${r.label}</dt><dd>${r.value(state)}</dd><button type="button" class="ev-link" data-goto="${r.step}">Ändra<span class="ev-sr"> ${r.label.toLowerCase()}</span></button></div>`).join('');
      }
      cfg.onRender && cfg.onRender(state, cur);
    }
    function go(i, focus = true) {
      cur = i;
      steps.forEach((s, j) => { s.hidden = j !== i; });
      const s = steps[i];
      const auto = s.hasAttribute('data-auto');
      form.classList.toggle('is-auto', auto);
      grid && grid.classList.toggle('is-final', i === steps.length - 1);
      nextLabel.textContent = s.dataset.next || 'Fortsätt';
      next.dataset.verb = s.dataset.verb || 'fortsätta';
      // Tillbaka: textlänk med pil ovanför rubriken (ux-flode-tillbaka-*)
      const back = $('.ev-step__back', s);
      if (back) back.innerHTML = i > 0 ? `<button type="button" class="ev-link ev-link--back" data-goto="${i - 1}">${icon('back', 'ev-link__arrow')}Tillbaka</button>` : '';
      // Indikator
      $('.ev-steps__count', ind).textContent = `Steg ${i + 1} av ${steps.length}`;
      $$('.ev-steps__list li', ind).forEach((li, j) => j === i ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
      $$('.ev-steps__dots i', ind).forEach((d, j) => d.classList.toggle('is-on', j === i));
      // Valda alternativ markeras när man kommer tillbaka
      $$('.ev-choice', s).forEach(b => b.setAttribute('aria-pressed', String(state[b.name] === b.value)));
      gateFn = auto ? () => [] : gate(fieldsOf(s), next, missing);
      if (auto) next.removeAttribute('aria-disabled');
      gateFn();
      cfg.onStep && cfg.onStep(i, state, s);
      render();
      if (focus) { const h = $('h1', s); h.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
    }
    form.addEventListener('click', e => {
      const g = e.target.closest('[data-goto]');
      if (g) { e.preventDefault(); go(Number(g.dataset.goto)); }
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const s = steps[cur];
      const sub = e.submitter;
      if (!validateAll(fieldsOf(s))) return;
      collect(s);
      if (sub && sub.name && sub.classList.contains('ev-choice') && s.contains(sub)) {
        state[sub.name] = sub.value;
        state[`${sub.name}Label`] = sub.dataset.label || sub.value;
      } else if (s.hasAttribute('data-auto')) return;
      if (cur < steps.length - 1) { go(cur + 1); return; }
      // Klart: bekräftelse och en knapp vidare (ux-flode-klart)
      steps.forEach(x => { x.hidden = true; });
      foot.hidden = true;
      const close = $('.ev-flow__close', form); if (close) close.hidden = true;
      grid && grid.classList.add('is-done');
      cfg.onDone && cfg.onDone(state, done);
      done.hidden = false;
      const h = $('h1', done); h.tabIndex = -1; h.focus({ preventScroll: true }); window.scrollTo({ top: 0 });
    });
    const api = {
      state, go, render,
      set(name, value, label) { state[name] = value; if (label) state[`${name}Label`] = label; },
      field(name) { return form.elements[name]; }
    };
    go(0, false);
    if (cfg.prefill) cfg.prefill(new URLSearchParams(location.search), api);
    return api;
  }

  /* ---------- Dagens rad i öppettider ---------- */
  function initHours() {
    const d = new Date().getDay();
    $$('.ev-hours tr[data-day]').forEach(tr => { if (tr.dataset.day.split(',').map(Number).includes(d)) tr.classList.add('is-today'); });
  }

  window.EV = { icon, $, $$, pad, isoDate, parseDate, fmtDate, kr, DAYS, MONTHS, validators, flow, check, show, bindField, gate, validateAll, initYesNo };
  initMenu(); initFaq(); initSticky(); initForms(); initHours(); initYesNo();
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
