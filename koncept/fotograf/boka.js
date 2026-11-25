/* Linnea Strand Foto: bokningsflödet. Ett beslut per steg, direkt vidare vid enkla val (ux-flode-auto-vidare),
   sammanfattning bredvid på desktop och längst ner på mobil, Ändra-länkar i sista steget. Sparas inte (ux-flode-spara). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var LS = window.LS, F = window.LSForm;
  var flow = $('[data-flow]');
  if (!flow || !LS) return;

  var ARROW = '<svg class="ev-icon ev-link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  var STEP_NAMES = ['Typ', 'Paket', 'Datum', 'Plats', 'Uppgifter'];
  var state = { type: null, pkg: null, date: null, time: null, flex: false, place: null, print: null };
  var step = 1;

  /* ---------- Startvärden från länkar (hero, priser, tryck) ---------- */
  var q = new URLSearchParams(location.search);
  if (LS.TYPES[q.get('typ')]) state.type = q.get('typ');
  if (state.type && pkgOf(q.get('paket'))) state.pkg = q.get('paket');
  var qd = LS.parse(q.get('datum'));
  if (qd && LS.isFree(qd)) state.date = qd;
  if (state.type === 'tryck' && state.pkg === 'en') {
    var m = LS.MOTIFS.filter(function (x) { return x.id === q.get('motiv'); })[0];
    var sz = LS.PRINT_SIZES.filter(function (x) { return x.id === q.get('storlek'); })[0];
    if (m && sz) state.print = { motif: m, size: sz, frame: q.get('ram') === 'ek' };
  }

  function pkgOf(id) { return state.type ? LS.PACKAGES[state.type].filter(function (p) { return p.id === id; })[0] : null; }
  function placeOf(id) { return state.type ? LS.PLACES[state.type].filter(function (p) { return p.id === id; })[0] : null; }
  function isPrint() { return state.type === 'tryck'; }
  function needsTime() { return !isPrint(); }
  function price() {
    var p = pkgOf(state.pkg); if (!p) return null;
    if (state.print) return { n: state.print.size.price + (state.print.frame ? state.print.size.frame : 0), from: false };
    return { n: p.price, from: !!p.from };
  }
  function firstOpenStep() {
    if (!state.type) return 1;
    if (!state.pkg) return 2;
    if (!state.flex && !(state.date && (!needsTime() || state.time))) return 3;
    if (!placeOf(state.place)) return 4;
    return 5;
  }

  /* ---------- Rendering av steg ---------- */
  function choice(value, name, desc, side, current, img) {
    return '<button class="ev-choice' + (img ? ' ev-choice--img' : '') + (current ? ' is-current' : '') + '" name="v" value="' + value + '">' +
      (img ? '<img src="' + img + '" alt="" width="64" height="64">' : '') +
      '<b>' + name + (current ? '<span class="ev-sr"> (ditt val)</span>' : '') + '</b><small>' + desc + '</small><span class="ev-choice__side">' + side + ARROW + '</span></button>';
  }
  function renderPackages() {
    var t = LS.TYPES[state.type];
    $('[data-choices="pkg"]').innerHTML = LS.PACKAGES[state.type].map(function (p) {
      var side = (p.rec ? '<span class="ev-tag">Rekommenderas</span>' : '') + '<span>' + (p.from ? 'Från ' : '') + LS.kr(p.price) + '</span>';
      return choice(p.id, p.name, p.desc, side, state.pkg === p.id);
    }).join('');
    $('[data-s2-hint]').textContent = 'Välj ett paket så går du vidare. Priserna är ' + t.vat + '.';
  }
  function renderPlaces() {
    $('[data-choices="place"]').innerHTML = LS.PLACES[state.type].map(function (p) { return choice(p.id, p.name, p.desc, '', state.place === p.id); }).join('');
    $('[data-s4-title]').textContent = isPrint() ? 'Var vill du ta emot tavlan?' : 'Var vill du fotografera?';
  }
  function renderDateStep() {
    $('[data-s3-title]').textContent = isPrint() ? 'När vill du ha tavlan?' : 'När vill du fotografera?';
    $('[data-s3-hint]').textContent = isPrint()
      ? 'Välj en dag då du vill hämta eller få tavlan levererad. Tryck tar ungefär en vecka.'
      : 'Välj en ledig dag och en tid. Lediga dagar är markerade i kalendern.';
    $('[data-date-label]').textContent = isPrint() ? 'Önskad dag' : 'Dag';
    var val = $('[data-date-value]');
    val.textContent = state.date ? cap(LS.fmtLong(state.date)) : 'Välj en dag i kalendern';
    val.classList.toggle('is-empty', !state.date);
    renderTimes();
    syncDateForm();
  }
  function renderTimes() {
    var wrap = $('[data-times-field]'), box = $('[data-times]');
    if (!state.date || !needsTime()) { wrap.hidden = true; box.innerHTML = ''; return; }
    var times = LS.freeTimes(state.date);
    if (state.time && times.indexOf(state.time) < 0) state.time = null;
    box.innerHTML = times.map(function (t) {
      return '<button class="bk-time" type="button" aria-pressed="' + (state.time === t ? 'true' : 'false') + '" value="' + t + '">' + t + '</button>';
    }).join('');
    wrap.hidden = false;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function syncDateForm() {
    var form = $('[data-dateform]'), btn = $('button[type="submit"]', form), miss = $('[data-date-missing]');
    var msg = !state.date ? (needsTime() ? 'Välj en dag och en tid för att fortsätta.' : 'Välj en dag för att fortsätta.')
      : (needsTime() && !state.time ? 'Välj en tid för att fortsätta.' : '');
    btn.setAttribute('aria-disabled', msg ? 'true' : 'false');
    miss.textContent = msg; miss.hidden = !msg;
    if (state.date) setErr('bk-datum', '');
    if (state.time) setErr('bk-tid', '');
    return msg;
  }
  function setErr(id, msg) {
    var box = document.getElementById(id + '-fel'), el = document.getElementById(id);
    if (el && el.classList.contains('bk-datefield')) el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (!box) return;
    box.innerHTML = msg ? '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg><span>' + msg + '</span>' : '';
    box.hidden = !msg;
  }

  /* ---------- Sammanfattning ---------- */
  function renderSummary() {
    var p = pkgOf(state.pkg), pl = placeOf(state.place), t = LS.TYPES[state.type];
    var editable = step === 5;
    var pkgText = p ? p.name : '';
    if (p && state.print) pkgText = p.name + ': ' + state.print.motif.name + ', ' + state.print.size.name + (state.print.frame ? ', ekram' : ', utan ram');
    var dateText = state.flex ? 'Flexibelt, vi bestämmer dag när vi pratas vid'
      : state.date ? cap(LS.fmtLong(state.date)) + (state.time ? ' kl. ' + state.time : '') : '';
    var rows = [
      { label: 'Typ', val: t ? t.name : '', step: 1 },
      { label: 'Paket', val: pkgText, step: 2 },
      { label: isPrint() ? 'Önskad dag' : 'Datum och tid', val: dateText, step: 3 },
      { label: 'Plats', val: pl ? pl.name : '', step: 4 }
    ];
    $('[data-sum]').innerHTML = rows.map(function (r) {
      return '<div class="bk-sum__row"><dt>' + r.label + '</dt><dd class="' + (r.val ? '' : 'is-empty') + '">' + (r.val || 'Inte valt än') + '</dd>' +
        (editable && r.val ? '<button class="ev-link" type="button" data-edit="' + r.step + '" style="border:0;background:none;padding:0;cursor:pointer">Ändra<span class="ev-sr"> ' + r.label.toLowerCase() + '</span></button>' : '') + '</div>';
    }).join('');
    var pr = price();
    $('[data-sum-total]').hidden = !pr;
    if (pr) $('[data-sum-price]').textContent = (pr.from ? 'från ' : '') + LS.kr(pr.n) + ' ' + t.vat;
    var imgWrap = $('[data-sum-img]');
    var img = state.print ? state.print.motif.img : null;
    imgWrap.hidden = !img;
    if (img) { var el = $('img', imgWrap); el.src = img; el.alt = 'Motivet ' + state.print.motif.name; }
  }

  /* ---------- Byte av steg ---------- */
  function go(n, push) {
    step = n;
    $$('.bk-step').forEach(function (s) { s.hidden = +s.dataset.step !== n; });
    if (n === 1) $$('[data-choices="type"] .ev-choice').forEach(function (b) { b.classList.toggle('is-current', b.value === state.type); });
    if (n === 2) renderPackages();
    if (n === 3) renderDateStep();
    if (n === 4) renderPlaces();
    if (n === 5) { $('[data-company]').hidden = state.type !== 'foretag'; $('#bk-foretag').required = state.type === 'foretag'; syncDetails(); }
    var done = n === 6;
    $('[data-back]').hidden = n === 1 || done;
    $('[data-foot]').hidden = done;
    $('.ev-flow__close').hidden = done;
    $('[data-steps-count]').textContent = 'Steg ' + n + ' av 5';
    $$('.ev-steps__list li').forEach(function (li, i) { if (i === n - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i').forEach(function (d, i) { d.classList.toggle('is-on', i === n - 1); });
    document.title = (done ? 'Förfrågan skickad' : STEP_NAMES[n - 1] + ', steg ' + n + ' av 5') + ' – Boka fotografering – Linnea Strand Foto';
    renderSummary();
    if (push) history.pushState({ step: n }, '');
    var h = $('.bk-step[data-step="' + n + '"] h1');
    if (push !== null) { h.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'auto' }); }
  }
  window.addEventListener('popstate', function (e) {
    var n = e.state && e.state.step;
    if (n && n <= firstOpenStep() && step !== 6) go(n, false);
  });
  $('[data-back]').addEventListener('click', function (e) { e.preventDefault(); history.back(); });

  /* Direkt vidare vid val: knapparna skickar formuläret (3.2.2, texten säger att man går vidare) */
  $$('[data-choices]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = e.submitter && e.submitter.value; if (!v) return;
      var kind = form.dataset.choices;
      if (kind === 'type') {
        if (state.type !== v) { state.pkg = null; state.place = null; state.print = null; if (v === 'tryck' || state.type === 'tryck') state.time = null; }
        state.type = v; go(2, true);
      } else if (kind === 'pkg') {
        if (state.pkg !== v) state.print = null;
        state.pkg = v; go(3, true);
      } else if (kind === 'place') { state.place = v; go(5, true); }
    });
  });

  /* Datumsteg */
  $('[data-times]').addEventListener('click', function (e) {
    var b = e.target.closest('.bk-time'); if (!b) return;
    state.time = b.value; state.flex = false;
    $$('.bk-time').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    syncDateForm(); renderSummary();
  });
  $('[data-dateform]').addEventListener('submit', function (e) {
    e.preventDefault();
    if (syncDateForm()) {
      if (!state.date) { setErr('bk-datum', 'Välj en dag i kalendern. Lediga dagar har ring och fet siffra.'); $('#bk-datum').focus(); }
      else { setErr('bk-tid', 'Välj en av de lediga tiderna.'); $('.bk-time').focus(); }
      return;
    }
    state.flex = false; go(4, true);
  });
  $('[data-flexform]').addEventListener('submit', function (e) {
    e.preventDefault(); state.flex = true; state.date = null; state.time = null; go(4, true);
  });

  /* ---------- Kalender i native dialog ---------- */
  var cal = $('[data-cal]'), calBody = $('[data-cal-body]'), view = null, pick = null;
  var minMonth = new Date(LS.earliest().getFullYear(), LS.earliest().getMonth(), 1);
  var maxMonth = new Date(minMonth.getFullYear(), minMonth.getMonth() + 6, 1);
  function renderCal(focusDate) {
    var y = view.getFullYear(), mo = view.getMonth();
    $('[data-cal-title]').textContent = LS.MONTHS[mo] + ' ' + y;
    var first = new Date(y, mo, 1), offset = (first.getDay() + 6) % 7, n = new Date(y, mo + 1, 0).getDate();
    var html = '', d = 1;
    var free = LS.freeDays(y, mo);
    var tabDay = pick && pick.getMonth() === mo && pick.getFullYear() === y ? pick.getDate() : (free[0] ? free[0].getDate() : 1);
    if (focusDate && focusDate.getMonth() === mo) tabDay = focusDate.getDate();
    for (var r = 0; d <= n; r++) {
      html += '<tr>';
      for (var c = 0; c < 7; c++) {
        if ((r === 0 && c < offset) || d > n) { html += '<td></td>'; continue; }
        var date = new Date(y, mo, d), ok = LS.isFree(date);
        var sel = pick && LS.iso(pick) === LS.iso(date);
        html += '<td><button class="cal__day" type="button" data-day="' + LS.iso(date) + '" tabindex="' + (d === tabDay ? 0 : -1) + '"' +
          ' aria-label="' + cap(LS.fmtLong(date)) + (ok ? ', ledig' : ', inte ledig') + '"' +
          (ok ? ' aria-pressed="' + (sel ? 'true' : 'false') + '"' : ' aria-disabled="true"') + '>' + d + '</button></td>';
        d++;
      }
      html += '</tr>';
    }
    calBody.innerHTML = html;
    var prev = $('[data-cal-prev]'), next = $('[data-cal-next]');
    prev.setAttribute('aria-disabled', view <= minMonth ? 'true' : 'false');
    next.setAttribute('aria-disabled', view >= maxMonth ? 'true' : 'false');
    $('[data-cal-legend]').textContent = free.length
      ? 'Lediga dagar har ring och fet siffra. ' + cap(LS.MONTHS[mo]) + ' har ' + free.length + ' lediga ' + (free.length === 1 ? 'dag' : 'dagar') + '.'
      : 'Inga lediga dagar i ' + LS.MONTHS[mo] + '. Bläddra till nästa månad.';
    if (focusDate) { var f = $('[data-day="' + LS.iso(focusDate) + '"]', calBody); if (f) f.focus(); }
  }
  $('[data-date-open]').addEventListener('click', function () {
    pick = state.date;
    var base = state.date || LS.heroMonth().days[0] || LS.earliest();
    view = new Date(base.getFullYear(), base.getMonth(), 1);
    if (view < minMonth) view = new Date(minMonth);
    renderCal();
    cal.showModal();
    var t = $('[tabindex="0"]', calBody); if (t) t.focus();
  });
  $('[data-cal-prev]').addEventListener('click', function () { if (view > minMonth) { view.setMonth(view.getMonth() - 1); renderCal(); } });
  $('[data-cal-next]').addEventListener('click', function () { if (view < maxMonth) { view.setMonth(view.getMonth() + 1); renderCal(); } });
  calBody.addEventListener('click', function (e) {
    var b = e.target.closest('.cal__day'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
    pick = LS.parse(b.dataset.day);
    $$('.cal__day[aria-pressed]', calBody).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
  });
  calBody.addEventListener('dblclick', function (e) { var b = e.target.closest('.cal__day'); if (b && b.getAttribute('aria-disabled') !== 'true') $('[data-cal-ok]').click(); });
  calBody.addEventListener('keydown', function (e) {
    var b = e.target.closest('.cal__day'); if (!b) return;
    var delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!delta) return;
    e.preventDefault();
    var d = LS.parse(b.dataset.day); d.setDate(d.getDate() + delta);
    var m0 = new Date(d.getFullYear(), d.getMonth(), 1);
    if (m0 < minMonth || m0 > maxMonth) return;
    if (d.getMonth() !== view.getMonth()) { view = m0; renderCal(d); return; }
    b.tabIndex = -1;
    var t = $('[data-day="' + LS.iso(d) + '"]', calBody); t.tabIndex = 0; t.focus();
  });
  $('[data-cal-cancel]').addEventListener('click', function () { cal.close(); });
  $('[data-cal-ok]').addEventListener('click', function () {
    if (!pick) { $('[data-cal-legend]').textContent = 'Välj en ledig dag först. Lediga dagar har ring och fet siffra.'; return; }
    if (!state.date || LS.iso(state.date) !== LS.iso(pick)) state.time = null;
    state.date = pick; state.flex = false;
    cal.close();
    renderDateStep(); renderSummary();
    if (needsTime()) { var first = $('.bk-time'); if (first) first.focus(); }
  });
  cal.addEventListener('close', function () { if (document.activeElement === document.body || cal.contains(document.activeElement)) $('#bk-datum').focus(); });

  /* ---------- Uppgifter ---------- */
  var details = $('[data-details]');
  var detailInputs = function () { return $$('input', details).filter(function (i) { return i.required; }); };
  function syncDetails() {
    var bad = detailInputs().filter(function (i) { return F.fieldError(i); });
    var btn = $('button[type="submit"]', details), miss = $('[data-details-missing]');
    btn.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
    var names = bad.map(function (i) { return { namn: 'namn', foretag: 'företag', epost: 'e-post', telefon: 'telefon' }[i.name]; });
    miss.hidden = !bad.length;
    if (bad.length) miss.textContent = 'Fyll i ' + (names.length > 1 ? names.slice(0, -1).join(', ') + ' och ' + names[names.length - 1] : names[0]) + ' för att skicka.';
    return bad;
  }
  $$('input, textarea', details).forEach(function (i) {
    i.addEventListener('blur', function () { if (i.required && (i.value.trim() || i.dataset.touched)) { i.dataset.touched = '1'; F.showError(i, F.fieldError(i)); } syncDetails(); });
    i.addEventListener('input', function () { if (i.getAttribute('aria-invalid') === 'true') F.showError(i, F.fieldError(i)); syncDetails(); });
  });
  details.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = syncDetails();
    if (bad.length) { bad.forEach(function (i) { i.dataset.touched = '1'; F.showError(i, F.fieldError(i)); }); bad[0].focus(); return; }
    var first = $('#bk-namn').value.trim().split(/\s+/)[0];
    $('[data-done-title]').textContent = 'Tack ' + first + ', förfrågan är skickad';
    $('[data-done-text]').textContent = 'Jag ringer dig på ' + $('#bk-tel').value.trim() + ' eller mejlar till ' + $('#bk-epost').value.trim() +
      ' inom 2 timmar på vardagar för att bekräfta' + (state.flex ? ' och hitta en dag som passar.' : ' tiden.');
    go(6, true);
  });

  /* Ändra-länkar i sista steget */
  $('[data-sum]').addEventListener('click', function (e) {
    var b = e.target.closest('[data-edit]'); if (!b) return;
    go(+b.dataset.edit, true);
  });

  /* Start: hoppa till första steget som saknar val om man kom via en länk */
  var start = firstOpenStep();
  history.replaceState({ step: 1 }, '');
  if (start > 1) { for (var i = 2; i <= start; i++) history.pushState({ step: i }, ''); }
  go(start, null);
})();
