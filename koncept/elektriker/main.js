/* Elevate-konceptsajt: meny, fast list, dragspel, formulär och stegflöde.
   Ingenting skickas någonstans. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobilmeny ---------- */
  const menu = $('#meny');
  $$('[data-menu-open]').forEach(btn => btn.addEventListener('click', () => {
    if (!menu) return;
    menu.showModal();
    btn.setAttribute('aria-expanded', 'true');
  }));
  if (menu) {
    menu.addEventListener('close', () => $$('[data-menu-open]').forEach(b => { b.setAttribute('aria-expanded', 'false'); }));
    $$('[data-menu-close], a', menu).forEach(el => el.addEventListener('click', () => menu.close()));
  }

  /* ---------- Öppet nu (bara grön text, ingen prick: pi-et-oppet) ---------- */
  $$('[data-open]').forEach(el => {
    const [from, to] = (el.dataset.open || '7-17').split('-').map(Number);
    const now = new Date();
    const day = now.getDay();
    const h = now.getHours() + now.getMinutes() / 60;
    const weekday = day >= 1 && day <= 5;
    if (weekday && h >= from && h < to) {
      el.textContent = 'Öppet nu';
      el.className = 'ev-open';
    } else {
      el.textContent = `Stängt just nu. Vi svarar från klockan ${String(from).padStart(2, '0')}.00 ${weekday && h < from ? 'i dag' : 'nästa vardag'}.`;
      el.className = '';
    }
  });
  $$('.ev-hours tr[data-day]').forEach(tr => { if (Number(tr.dataset.day) === new Date().getDay()) tr.classList.add('is-today'); });

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  const footer = $('.ev-footer');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let pastAnchor = false, footerVisible = false;
    const update = () => {
      const on = pastAnchor && !footerVisible;
      bar.classList.toggle('is-on', on);
      bar.inert = !on;
      document.documentElement.classList.toggle('has-bar', on);
    };
    new IntersectionObserver(([e]) => { pastAnchor = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(anchor);
    if (footer) new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; update(); }).observe(footer);
  }

  /* ---------- Dragspel: en öppen i taget (ux-faq-flera-oppna) ---------- */
  $$('.ev-faq').forEach(faq => {
    const items = $$('details', faq);
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    }));
  });

  /* ---------- Fältvalidering: fel när man lämnar fältet (ux-fel-tidpunkt) ---------- */
  const rules = {
    required: v => v.trim().length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    tel: v => v.replace(/[\s\-+()]/g, '').length >= 7 && /^[\d\s\-+()]+$/.test(v.trim()),
    postnr: v => /^\d{3}\s?\d{2}$/.test(v.trim()),
    date: v => v.trim().length > 0,
    weekday: v => { const d = new Date(v + 'T12:00'); return !isNaN(d) && d.getDay() % 6 !== 0; }
  };
  function fieldValid(input) {
    const v = input.value || '';
    const optional = input.dataset.optional === 'true';
    if (!v.trim()) return optional;
    const kind = input.dataset.rule;
    return kind && rules[kind] ? rules[kind](v) : true;
  }
  function showFieldError(input, show) {
    const field = input.closest('.ev-field');
    if (!field) return;
    const err = $('.ev-field__error', field);
    if (err) {
      const msgEl = $('span', err);
      if (msgEl) msgEl.textContent = !input.value.trim() ? (input.dataset.msgEmpty || 'Fyll i fältet.') : (input.dataset.msgFormat || input.dataset.msgEmpty || 'Kontrollera fältet.');
    }
    field.classList.toggle('has-error', show);
    if (show) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  function validateField(input) {
    const ok = fieldValid(input);
    showFieldError(input, !ok);
    return ok;
  }
  $$('[data-rule], [data-optional]').forEach(input => {
    input.addEventListener('blur', () => { if (input.value.trim() || input.dataset.touched) validateField(input); input.dataset.touched = '1'; });
    input.addEventListener('input', () => { if (input.closest('.ev-field')?.classList.contains('has-error')) validateField(input); });
  });
  function validateGroup(scope) {
    const inputs = $$('[data-rule]', scope).filter(i => !i.closest('[hidden]'));
    let first = null;
    inputs.forEach(i => { if (!validateField(i) && !first) first = i; });
    $$('[data-radio-required]', scope).forEach(fs => {
      const ok = !!$('input:checked', fs);
      fs.classList.toggle('has-error', !ok);
      const err = $('.ev-field__error', fs.parentElement);
      if (err) err.parentElement.classList.toggle('has-error', !ok);
      if (!ok && !first) first = $('input', fs);
    });
    if (first) {
      first.focus({ preventScroll: true });
      first.closest('.ev-field, fieldset, .ev-upload')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }
    return !first;
  }
  window.EV = { validateGroup, fieldValid };

  /* Enkla formulär (kontakt): vyn hoppar till första felet och allt ligger kvar */
  $$('form[data-simple-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateGroup(form)) return;
      const btn = $('button[type="submit"]', form);
      const label = $('span', btn);
      const w = btn.offsetWidth;
      btn.style.minWidth = w + 'px';
      label.textContent = 'Skickar …';
      setTimeout(() => {
        label.textContent = 'Skickat';
        btn.classList.add('is-saved');
        const arrow = $('.ev-btn__arrow', btn);
        if (arrow) arrow.innerHTML = '<path d="M5 12.5l4.5 4.5L19 7.5"/>';
        const done = $('[data-form-done]', form);
        if (done) { done.hidden = false; }
      }, 700);
    });
  });

  /* ---------- Filuppladdning med bekräftad borttagning (ux-bekr-ta-bort) ---------- */
  const files = [];
  const thumbs = $('[data-thumbs]');
  const fileInput = $('[data-file]');
  const drop = $('.ev-upload__drop');
  const confirmDlg = $('#ta-bort');
  let pendingRemove = -1;
  function renderThumbs() {
    if (!thumbs) return;
    thumbs.innerHTML = '';
    files.forEach((f, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${f.url}" alt="Uppladdad bild ${i + 1}"><button type="button" aria-label="Ta bort ${f.name.replace(/"/g, '')}"><svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/></svg></button><span>${f.name.replace(/</g, '&lt;')}</span>`;
      $('button', li).addEventListener('click', () => {
        pendingRemove = i;
        if (confirmDlg) confirmDlg.showModal(); else removeFile();
      });
      thumbs.appendChild(li);
    });
    const count = $('[data-file-count]');
    if (count) count.textContent = files.length ? `${files.length} av 5 bilder tillagda.` : 'Högst 5 bilder, gärna på elcentralen eller platsen för jobbet.';
    document.dispatchEvent(new CustomEvent('ev:files', { detail: files }));
  }
  function addFiles(list) {
    Array.from(list).filter(f => f.type.startsWith('image/')).slice(0, 5 - files.length)
      .forEach(f => files.push({ name: f.name, url: URL.createObjectURL(f) }));
    renderThumbs();
  }
  function removeFile() {
    if (pendingRemove < 0) return;
    const [f] = files.splice(pendingRemove, 1);
    if (f) URL.revokeObjectURL(f.url);
    pendingRemove = -1;
    renderThumbs();
    fileInput?.focus();
  }
  if (fileInput) {
    fileInput.addEventListener('change', () => { addFiles(fileInput.files); fileInput.value = ''; });
    ['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
    drop.addEventListener('drop', e => addFiles(e.dataTransfer.files));
  }
  if (confirmDlg) {
    $('[data-confirm-yes]', confirmDlg).addEventListener('click', () => { confirmDlg.close(); removeFile(); });
    $$('[data-confirm-no]', confirmDlg).forEach(b => b.addEventListener('click', () => { confirmDlg.close(); pendingRemove = -1; }));
  }
  window.EV.files = files;

  /* Radioval: felet försvinner när man väljer */
  $$('[data-radio-required]').forEach(fs => fs.addEventListener('change', () => {
    fs.classList.remove('has-error');
    const err = $('.ev-field__error', fs.parentElement);
    if (err) err.parentElement.classList.remove('has-error');
  }));

  /* ---------- Pris för privatperson eller företag (ux-pris-moms) ---------- */
  const priceBtns = $$('[data-price]');
  priceBtns.forEach(b => b.addEventListener('click', () => {
    const mode = b.dataset.price;
    priceBtns.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    $$('[data-privat]').forEach(el => { el.innerHTML = el.dataset[mode === 'privat' ? 'privat' : 'foretag']; });
    const note = $('[data-price-note]');
    if (note) note.textContent = mode === 'privat' ? 'Inklusive moms och efter ROT-avdrag.' : 'Exklusive moms. ROT-avdrag gäller inte företag.';
  }));

  /* ---------- Paket: flikar på desktop, staplade på mobil (ux-pris-paket-layout) ---------- */
  $$('[data-tabs]').forEach(box => {
    const tabs = $$('[role="tab"]', box);
    const select = t => {
      tabs.forEach(o => {
        const on = o === t;
        o.setAttribute('aria-selected', String(on));
        o.tabIndex = on ? 0 : -1;
        $('#' + o.getAttribute('aria-controls')).classList.toggle('is-active', on);
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const n = tabs[(i + d + tabs.length) % tabs.length];
        select(n); n.focus();
      });
    });
  });

  /* ---------- Stegflöde ---------- */
  const flow = $('[data-flow]');
  if (!flow) return;
  const cfg = window.EV_FLOW || { rows: [] };
  const dialog = flow.closest('dialog');
  const steps = $$('.ev-step', flow);
  const named = steps.filter(s => s.dataset.name);
  const state = {};
  let current = 0;
  let editing = false;

  const ind = $('.ev-steps', flow);
  const indCount = ind && $('.ev-steps__count', ind);
  const indList = ind && $('.ev-steps__list', ind);
  const indDots = ind && $('.ev-steps__dots', ind);
  if (indList) indList.innerHTML = named.map(s => `<li>${s.dataset.name}</li>`).join('');
  if (indDots) indDots.innerHTML = named.map(() => '<i></i>').join('');
  const foot = $('[data-flow-indicator]', flow);
  const summary = $('[data-summary]');
  const baseTitle = document.title;

  function collect(step) {
    $$('input, textarea, select', step).forEach(el => {
      if (!el.name || el.type === 'file') return;
      if (el.type === 'radio') { if (el.checked) state[el.name] = el.value; return; }
      if (el.type === 'checkbox') { state[el.name] = el.checked; return; }
      state[el.name] = el.value.trim();
    });
  }
  function rowValue(r) {
    const v = typeof r.get === 'function' ? r.get(state, files) : state[r.key];
    return v && String(v).trim() ? v : '';
  }
  function renderSummary() {
    if (!summary) return;
    const dl = $('dl', summary);
    dl.innerHTML = cfg.rows.filter(r => !r.reviewOnly).map(r => {
      const v = rowValue(r);
      return `<div><dt>${r.label}</dt><dd class="${v ? '' : 'is-empty'}">${v ? esc(v) : 'Inte valt ännu'}</dd></div>`;
    }).join('');
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function renderReview() {
    const dl = $('[data-review]', flow);
    if (!dl) return;
    dl.innerHTML = cfg.rows.map(r => {
      const v = rowValue(r);
      const thumbsHtml = r.thumbs && files.length ? `<span class="ev-review__thumbs">${files.map((f, i) => `<img src="${f.url}" alt="Bild ${i + 1}">`).join('')}</span>` : '';
      return `<div><dt>${r.label}</dt><dd>${v ? esc(v) : '<span class="ev-muted">Inget angivet</span>'}${thumbsHtml}</dd><button type="button" class="ev-link" data-edit="${r.step}">Ändra<span class="ev-sr"> ${r.label.toLowerCase()}</span></button></div>`;
    }).join('');
    $$('[data-edit]', dl).forEach(b => b.addEventListener('click', () => {
      editing = true;
      go(steps.findIndex(s => s.dataset.step === b.dataset.edit));
    }));
  }
  function updateIndicator() {
    const step = steps[current];
    const idx = named.indexOf(step);
    if (foot) foot.hidden = idx < 0;
    if (idx < 0) return;
    if (indCount) indCount.textContent = `Steg ${idx + 1} av ${named.length}`;
    if (indList) $$('li', indList).forEach((li, i) => { if (i === idx) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    if (indDots) $$('i', indDots).forEach((d, i) => d.classList.toggle('is-on', i === idx));
  }
  function updateGate() {
    const step = steps[current];
    const btn = $('[data-next][data-gate]', step);
    if (!btn) return;
    const missing = $$('[data-rule]', step).filter(i => !fieldValid(i)).map(i => i.dataset.short || i.name);
    btn.setAttribute('aria-disabled', missing.length ? 'true' : 'false');
    const line = $('[data-missing]', step);
    if (line) {
      line.hidden = !missing.length;
      line.textContent = missing.length ? `Fyll i ${listJoin(missing)} för att fortsätta.` : '';
    }
  }
  function listJoin(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1]; }

  function go(i, push = true) {
    if (i < 0 || i >= steps.length) return;
    steps.forEach((s, n) => { s.hidden = n !== i; });
    current = i;
    const step = steps[i];
    if (step.dataset.step === 'granska') renderReview();
    if (step.dataset.step === 'klart') { if (summary) summary.hidden = true; }
    else if (summary) summary.hidden = false;
    updateIndicator();
    updateGate();
    renderSummary();
    const backLink = $('[data-back]', step);
    if (backLink) backLink.hidden = i === 0;
    const h = $('h1, h2.ev-flow__title', step);
    if (h) {
      h.setAttribute('tabindex', '-1');
      h.focus({ preventScroll: true });
      if (!dialog) document.title = `${h.textContent} – ${baseTitle}`;
    }
    if (dialog) { $('.ev-dialog__scroll', dialog)?.scrollTo(0, 0); }
    else window.scrollTo({ top: 0, behavior: 'auto' });
    if (push && !dialog) history.pushState({ step: i }, '', `#${step.dataset.step}`);
    document.dispatchEvent(new CustomEvent('ev:step', { detail: { step: step.dataset.step, state } }));
  }
  function next() {
    const step = steps[current];
    collect(step);
    if (editing) { editing = false; go(steps.findIndex(s => s.dataset.step === 'granska')); return; }
    go(current + 1);
  }

  flow.addEventListener('click', e => {
    const choice = e.target.closest('.ev-choice[data-set]');
    if (choice) {
      e.preventDefault();
      state[choice.dataset.set] = choice.dataset.label || choice.textContent.trim();
      state[choice.dataset.set + 'Value'] = choice.value;
      $$(`.ev-choice[data-set="${choice.dataset.set}"]`, flow).forEach(c => c.classList.toggle('is-selected', c === choice));
      document.dispatchEvent(new CustomEvent('ev:choice', { detail: { key: choice.dataset.set, value: choice.value, state } }));
      next();
      return;
    }
    const nx = e.target.closest('[data-next]');
    if (nx) {
      e.preventDefault();
      if (!validateGroup(steps[current])) { updateGate(); return; }
      next();
      return;
    }
    const bk = e.target.closest('[data-back]');
    if (bk) {
      e.preventDefault();
      collect(steps[current]);
      if (editing) { editing = false; go(steps.findIndex(s => s.dataset.step === 'granska')); return; }
      go(current - 1);
      return;
    }
    const sb = e.target.closest('[data-submit]');
    if (sb) {
      e.preventDefault();
      const label = $('span', sb);
      sb.style.minWidth = sb.offsetWidth + 'px';
      label.textContent = 'Skickar …';
      sb.setAttribute('aria-disabled', 'true');
      setTimeout(() => {
        label.textContent = sb.dataset.label || label.textContent;
        sb.removeAttribute('aria-disabled');
        go(steps.findIndex(s => s.dataset.step === 'klart'));
      }, 700);
    }
  });
  flow.addEventListener('input', () => { collect(steps[current]); updateGate(); renderSummary(); });
  flow.addEventListener('change', () => { collect(steps[current]); updateGate(); renderSummary(); });
  flow.addEventListener('submit', e => e.preventDefault());
  document.addEventListener('ev:files', () => renderSummary());

  window.addEventListener('popstate', e => {
    if (dialog) return;
    const i = e.state && typeof e.state.step === 'number' ? e.state.step : 0;
    const doneIdx = steps.findIndex(s => s.dataset.step === 'klart');
    if (current === doneIdx) return;
    go(Math.min(i, doneIdx - 1), false);
  });

  function reset() {
    Object.keys(state).forEach(k => delete state[k]);
    $$('input, textarea', flow).forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false; else if (el.type !== 'file') el.value = '';
      el.removeAttribute('aria-invalid');
      delete el.dataset.touched;
    });
    $$('.has-error', flow).forEach(f => f.classList.remove('has-error'));
    $$('.ev-choice', flow).forEach(c => c.classList.remove('is-selected'));
    files.splice(0, files.length);
    renderThumbs();
    editing = false;
  }
  window.EV.flow = { go, state, reset, steps, collect, renderSummary, updateGate };

  if (dialog) {
    $$('[data-flow-open]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      reset();
      const pre = btn.closest('form');
      if (pre) {
        $$('input[name]', pre).forEach(inp => {
          const target = $(`[name="${inp.name}"]`, flow);
          if (target && inp.value.trim()) { target.value = inp.value.trim(); state[inp.name] = inp.value.trim(); }
        });
      }
      dialog.showModal();
      go(0, false);
    }));
    $$('[data-flow-close]', dialog).forEach(b => b.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  } else {
    const startHash = location.hash.slice(1);
    history.replaceState({ step: 0 }, '', location.pathname + location.search + '#' + steps[0].dataset.step);
    go(0, false);
    if (startHash && startHash !== steps[0].dataset.step) { /* börja alltid från början: flödet sparas inte */ }
    const pre = new URLSearchParams(location.search);
    pre.forEach((v, k) => {
      const choice = $(`.ev-choice[data-set="${k}"][value="${CSS.escape(v)}"]`, flow);
      if (choice && current === 0) choice.click();
    });
  }
})();
