/* Elevate Studio: gemensamma komponenter för konceptsajterna.
   Meny, dragspel, paketflikar, fältvalidering och fast list på desktop. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ICON = {
    err: '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>'
  };

  /* ---------- Mobilmeny (panel i helskärm, standard) ---------- */
  const menu = $('.ev-menu');
  const menuBtn = $('.ev-menubtn');
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => { menu.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    $$('[data-close-menu]', menu).forEach(b => b.addEventListener('click', () => menu.close()));
    $$('a', menu).forEach(a => a.addEventListener('click', () => menu.close()));
  }

  /* ---------- Dragspel: första öppen, en i taget (ux-faq-*) ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Paket som flikar på desktop (ux-pris-paket-layout) ---------- */
  $$('[data-pkgtabs]').forEach(tabs => {
    const pkgs = $('#' + tabs.dataset.pkgtabs);
    const chips = $$('[role="tab"]', tabs);
    const select = (chip, focus) => {
      chips.forEach(c => { const on = c === chip; c.setAttribute('aria-selected', on); c.tabIndex = on ? 0 : -1;
        $('#' + c.getAttribute('aria-controls')).classList.toggle('is-active', on); });
      if (focus) chip.focus();
    };
    chips.forEach((c, i) => {
      c.addEventListener('click', () => select(c));
      c.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(chips[(i + d + chips.length) % chips.length], true); }
      });
    });
    tabs.classList.add('is-ready'); pkgs.classList.add('is-tabbed');
    select(chips.find(c => c.getAttribute('aria-selected') === 'true') || chips[0]);
  });

  /* ---------- Fältvalidering (ux-fel-*) ---------- */
  const RULES = {
    required: v => v.trim().length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    tel: v => v.replace(/\D/g, '').length >= 7,
    postnr: v => /^\d{3}\s?\d{2}$/.test(v.trim()),
    omrade: v => /^3[56]\d\s?\d{2}$/.test(v.trim()),
    area: v => { const n = Number(v.replace(',', '.')); return n >= 1 && n <= 60; }
  };
  function check(el) {
    if (el.type === 'checkbox') return !el.required || el.checked;
    const v = el.value || '';
    const optional = !el.required;
    if (optional && !v.trim()) return true;
    if (!RULES.required(v)) return false;
    const t = el.dataset.rule || (el.type === 'email' ? 'email' : el.type === 'tel' ? 'tel' : '');
    return t ? RULES[t](v) : true;
  }
  function errorEl(el) {
    let e = document.getElementById(el.id + '-fel');
    if (!e) {
      e = document.createElement('p');
      e.className = 'ev-error'; e.id = el.id + '-fel'; e.hidden = true;
      (el.closest('.ev-field') || el.parentElement).appendChild(e);
      const ids = (el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      ids.push(e.id); el.setAttribute('aria-describedby', ids.join(' '));
    }
    return e;
  }
  function show(el, ok) {
    const e = errorEl(el);
    if (ok) { el.removeAttribute('aria-invalid'); e.hidden = true; e.textContent = ''; return; }
    el.setAttribute('aria-invalid', 'true');
    e.innerHTML = ICON.err + '<span>' + (el.dataset.error || 'Fyll i fältet.') + '</span>';
    e.hidden = false;
  }
  window.evValidate = function (form, { onValid } = {}) {
    const fields = $$('[data-check]', form);
    const btn = $('[data-submit]', form);
    const missing = $('[data-missing]', form);
    const touched = new Set();
    const update = () => {
      const bad = fields.filter(f => !check(f));
      if (btn) btn.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      if (missing) {
        missing.hidden = !bad.length;
        if (bad.length) missing.textContent = 'Fyll i ' + bad.map(f => (f.dataset.name || f.name).toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' och $1') + ' för att skicka.';
      }
      return bad;
    };
    fields.forEach(f => {
      f.addEventListener('blur', () => { if (f.value || touched.has(f) || f.type === 'checkbox') { touched.add(f); show(f, check(f)); } update(); });
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') show(f, check(f)); update(); });
      f.addEventListener('change', () => { if (f.type === 'checkbox' || f.tagName === 'SELECT') show(f, check(f)); update(); });
    });
    form.noValidate = true;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = update();
      if (bad.length) { bad.forEach(f => show(f, false)); bad[0].focus(); bad[0].scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return; }
      if (onValid) onValid(new FormData(form));
    });
    update();
    return { update };
  };

  // Enkla formulär på sidorna (kontakt, förfrågan)
  $$('form[data-simple-form]').forEach(form => {
    evValidate(form, {
      onValid: data => {
        const done = $('#' + form.dataset.simpleForm);
        const name = (data.get('namn') || '').toString().trim().split(' ')[0];
        const slot = done && $('[data-name]', done);
        if (slot && name) slot.textContent = ', ' + name;
        form.hidden = true;
        if (done) { done.hidden = false; const h = $('h2, h3', done); h.tabIndex = -1; h.focus(); }
      }
    });
  });

  /* ---------- Fast list på desktop när huvudknappen scrollats bort (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    const stop = $('[data-sticky-stop]');
    let past = false, atStop = false;
    const sync = () => { const on = past && !atStop; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([en]) => { past = !en.isIntersecting && en.boundingClientRect.top < 0; sync(); }).observe(anchor);
    if (stop) new IntersectionObserver(([en]) => { atStop = en.isIntersecting; sync(); }).observe(stop);
    bar.inert = true;
  }

  /* ---------- Årtal i sidfoten ---------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
