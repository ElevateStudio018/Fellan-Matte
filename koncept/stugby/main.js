/* Lomvikens stugby: designkoncept av Elevate Studio. Påhittat företag med exempeldata. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Mobilmeny: <dialog> fångar fokus och stängs med Esc ---------- */
  const menu = $('#meny');
  const menuBtn = $('.ev-menubtn');
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => { menu.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    $$('[data-close]', menu).forEach(b => b.addEventListener('click', () => menu.close()));
    menu.addEventListener('click', e => { if (e.target === menu) menu.close(); });
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches && menu.open) menu.close(); });
  }

  /* ---------- Dragspel: en öppen i taget (ux-faq-flera-oppna), reserv för äldre webbläsare ---------- */
  $$('.ev-faq').forEach(faq => {
    faq.addEventListener('toggle', e => {
      if (!e.target.open) return;
      $$('details', faq).forEach(d => { if (d !== e.target) d.open = false; });
    }, true);
  });

  /* ---------- Följ med-list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('[data-stickybar]');
  const anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    const btn = $('a, button', bar);
    let pastHero = false, nearFooter = false;
    const update = () => {
      const show = pastHero && !nearFooter;
      bar.classList.toggle('is-shown', show);
      bar.setAttribute('aria-hidden', String(!show));
      btn.tabIndex = show ? 0 : -1;
      document.body.style.paddingBottom = show && window.innerWidth >= 900 ? '76px' : '';
    };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(anchor);
    const foot = $('.ev-footer');
    if (foot) new IntersectionObserver(([e]) => { nearFooter = e.isIntersecting; update(); }).observe(foot);
  }

  /* ---------- Sökfältet i heron: datum skickas vidare till bokningen (förifyllt, går att ändra) ---------- */
  const search = $('[data-search]');
  if (search) {
    search.noValidate = true;
    const pad = n => String(n).padStart(2, '0');
    const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const t = new Date();
    const inA = $('#h-ankomst'), inB = $('#h-avresa');
    inA.min = iso(t);
    const t2 = new Date(t); t2.setDate(t2.getDate() + 2); inB.min = iso(t2);
    inA.addEventListener('change', () => {
      if (!inA.value) return;
      const [y, m, d] = inA.value.split('-').map(Number);
      const min = new Date(y, m - 1, d + 2);
      inB.min = iso(min);
      if (!inB.value || inB.value < inB.min) inB.value = iso(min);
    });
    search.addEventListener('submit', () => { [inA, inB].forEach(i => { if (!i.value) i.disabled = true; }); setTimeout(() => { inA.disabled = inB.disabled = false; }, 0); });
  }

  /* ---------- Validering: fel när man lämnar fältet (ux-fel-tidpunkt) ---------- */
  const rules = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    tel: v => v.replace(/\D/g, '').length >= 8
  };
  function check(input) {
    const v = input.value.trim();
    let ok = true;
    if (input.required && !v) ok = false;
    else if (v && input.type === 'email') ok = rules.email(v);
    else if (v && input.dataset.type === 'tel') ok = rules.tel(v);
    return ok;
  }
  function show(input, ok) {
    const field = input.closest('.ev-field');
    if (!field) return;
    field.classList.toggle('is-error', !ok);
    if (ok) input.removeAttribute('aria-invalid'); else input.setAttribute('aria-invalid', 'true');
  }
  function wire(form, onChange) {
    $$('input, textarea', form).filter(i => i.closest('.ev-field') && (i.required || i.type === 'email' || i.dataset.type)).forEach(i => {
      i.addEventListener('input', () => { i.dataset.touched = '1'; if (i.closest('.is-error')) show(i, check(i)); if (onChange) onChange(); });
      i.addEventListener('blur', () => { if (i.dataset.touched || i.value) show(i, check(i)); });
    });
  }
  function validateAll(form) {
    const inputs = $$('input, textarea', form).filter(i => i.closest('.ev-field') && !i.closest('[hidden]') && (i.required || i.type === 'email' || i.dataset.type));
    let first = null;
    inputs.forEach(i => { const ok = check(i); show(i, ok); if (!ok && !first) first = i; });
    if (first) first.focus();   // vyn hoppar till första felet (ux-fel-forflyttning)
    return !first;
  }
  window.EV = { check, show, wire, validateAll };

  $$('form[data-validate]').forEach(form => {
    wire(form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateAll(form)) return;
      const sent = $('[data-sent]', form);
      const btn = $('button[type="submit"]', form);
      btn.innerHTML = '<span>Skickat</span><svg class="ev-icon" aria-hidden="true"><use href="img/ikoner.svg#bock"/></svg>';
      btn.setAttribute('aria-disabled', 'true');
      btn.classList.add('is-done');
      if (sent) { sent.hidden = false; }
    });
  });
})();
