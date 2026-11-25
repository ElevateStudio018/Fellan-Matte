/* Linnea Strand Foto: gemensamt skript för startsida, portfolio och priser. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var LS = window.LS;
  var ARROW = '<svg class="ev-icon ev-link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  var ERR_ICON = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>';

  /* ---------- Mobilmeny (native dialog: fokusfälla och Esc) ---------- */
  var menu = $('[data-menu]');
  if (menu) {
    var opener = $('[data-menu-open]');
    opener.addEventListener('click', function () { menu.showModal(); });
    $('[data-menu-close]', menu).addEventListener('click', function () { menu.close(); });
    menu.addEventListener('close', function () { opener.focus(); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.close(); }); });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) { if (e.matches && menu.open) menu.close(); });
  }

  /* ---------- Hero: lediga datum i månaden ---------- */
  var free = $('[data-free]');
  var hm = null;
  if (free && LS) {
    hm = LS.heroMonth();
    if (hm.days.length) {
      $('[data-free-title]', free).innerHTML = 'Lediga datum i ' + LS.MONTHS[hm.month] + ': <span>' + hm.days.length + '</span>';
      $('[data-free-days]', free).innerHTML = hm.days.slice(0, 4).map(function (d) {
        return '<a class="ev-chip" href="boka.html?datum=' + LS.iso(d) + '" aria-label="Boka ' + LS.fmtLong(d) + '">' + LS.fmtShort(d) + '</a>';
      }).join('');
      free.hidden = false;
    }
  }

  /* ---------- Hero: bildspel som tonar över med mjuk Ken Burns ----------
     Pausas vid hover och fokus, har pausknapp och bläddring, och står stilla vid reducerad rörelse (2.2.2). */
  var hero = $('[data-hero]');
  if (hero) {
    var slides = $$('.ls-slide', hero), nSl = slides.length, cur = 0, timer = null;
    var userPaused = false, hovering = false, focused = false;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var numEl = $('[data-reel-num]', hero), capEl = $('[data-reel-cap]', hero), pauseBtn = $('[data-reel-pause]', hero);
    var two = function (i) { return (i < 10 ? '0' : '') + i; };
    var DELAY = 6500;
    var stopped = function () { return userPaused || hovering || focused || reduce.matches; };
    var schedule = function () {
      clearTimeout(timer);
      hero.classList.toggle('is-paused', stopped());
      if (!stopped()) timer = setTimeout(function () { go(cur + 1); }, DELAY);
    };
    var go = function (i) {
      var prev = slides[cur];
      cur = (i + nSl) % nSl;
      var next = slides[cur];
      if (prev !== next) {
        prev.classList.add('is-leaving');
        prev.classList.remove('is-active');
        prev.setAttribute('aria-hidden', 'true');
        setTimeout(function () { prev.classList.remove('is-leaving'); }, 1500);
        next.classList.remove('is-leaving');
        next.classList.add('is-active');
        next.removeAttribute('aria-hidden');
      }
      numEl.textContent = two(cur + 1) + ' / ' + two(nSl);
      capEl.textContent = next.dataset.caption;
      schedule();
    };
    var setPaused = function (p) {
      userPaused = p;
      pauseBtn.setAttribute('aria-label', p ? 'Spela bildspelet' : 'Pausa bildspelet');
      $('[data-icon-pause]', pauseBtn).hidden = p;
      $('[data-icon-play]', pauseBtn).hidden = !p;
      schedule();
    };
    pauseBtn.addEventListener('click', function () { setPaused(!userPaused); });
    $('[data-reel-next]', hero).addEventListener('click', function () { go(cur + 1); });
    $('[data-reel-prev]', hero).addEventListener('click', function () { go(cur - 1); });
    hero.addEventListener('mouseenter', function () { hovering = true; schedule(); });
    hero.addEventListener('mouseleave', function () { hovering = false; schedule(); });
    hero.addEventListener('focusin', function () { focused = true; schedule(); });
    hero.addEventListener('focusout', function (e) { if (!hero.contains(e.relatedTarget)) { focused = false; schedule(); } });
    if (reduce.matches) setPaused(true);
    reduce.addEventListener('change', function (e) { if (e.matches) setPaused(true); else schedule(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else schedule(); });
    schedule();
  }

  /* ---------- Vågrät bildrad: svep, dra med musen eller bläddra med knapparna ---------- */
  $$('[data-row]').forEach(function (row) {
    var prevB = $('[data-row-prev]'), nextB = $('[data-row-next]');
    var update = function () {
      var max = row.scrollWidth - row.clientWidth - 2;
      if (prevB) prevB.setAttribute('aria-disabled', row.scrollLeft <= 2 ? 'true' : 'false');
      if (nextB) nextB.setAttribute('aria-disabled', row.scrollLeft >= max ? 'true' : 'false');
    };
    var step = function (dir) {
      row.scrollBy({ left: dir * Math.max(240, row.clientWidth * 0.7), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };
    if (prevB) prevB.addEventListener('click', function () { if (prevB.getAttribute('aria-disabled') !== 'true') step(-1); });
    if (nextB) nextB.addEventListener('click', function () { if (nextB.getAttribute('aria-disabled') !== 'true') step(1); });
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    /* Dra med musen (pekskärmar sveper som vanligt) */
    var startX = 0, startLeft = 0, down = false, moved = false;
    row.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = row.scrollLeft;
    });
    row.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; row.classList.add('is-dragging'); row.setPointerCapture(e.pointerId); }
      if (moved) row.scrollLeft = startLeft - dx;
    });
    var end = function () {
      if (!down) return; down = false;
      if (moved) setTimeout(function () { row.classList.remove('is-dragging'); }, 0);
    };
    row.addEventListener('dragstart', function (e) { e.preventDefault(); });
    row.addEventListener('pointerup', end);
    row.addEventListener('pointercancel', end);
    row.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
  });

  /* ---------- Fast list på desktop när heroknappen har scrollat bort ---------- */
  var bar = $('[data-stickybar]'), anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    if (hm && hm.days.length) $('[data-sticky-text]', bar).textContent = 'Lediga datum i ' + LS.MONTHS[hm.month] + ': ' + hm.days.length + ' · Svarar oftast inom 2 timmar';
    var footer = $('.ev-footer'), contact = $('#kontakt');
    var past = false, nearEnd = false;
    var sync = function () {
      var on = past && !nearEnd;
      bar.classList.toggle('is-on', on);
      document.body.classList.toggle('has-stickybar', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      $('a', bar).tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(function (en) { past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; sync(); }).observe(anchor);
    if (contact) new IntersectionObserver(function (en) { nearEnd = en.some(function (e) { return e.isIntersecting; }); sync(); }, { rootMargin: '0px 0px -30% 0px' }).observe(contact);
    else if (footer) new IntersectionObserver(function (en) { nearEnd = en[0].isIntersecting; sync(); }).observe(footer);
  }

  /* ---------- Formulärfel: när man lämnar fältet, säger vad man ska göra ---------- */
  function fieldError(input) {
    var v = input.value.trim();
    if (input.required && !v) return input.dataset.empty || 'Fyll i ' + (input.labels[0] ? input.labels[0].textContent.trim().toLowerCase() : 'fältet') + '.';
    if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Skriv e-postadressen som namn@exempel.se.';
    if (input.type === 'tel' && v && v.replace(/\D/g, '').length < 7) return 'Skriv hela numret, till exempel 070-123 45 67.';
    return '';
  }
  function showError(input, msg) {
    var box = document.getElementById(input.id + '-fel');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (!box) return;
    box.innerHTML = msg ? ERR_ICON + '<span>' + msg + '</span>' : '';
    box.hidden = !msg;
  }
  window.LSForm = { fieldError: fieldError, showError: showError };

  var contactForm = $('[data-contact]');
  if (contactForm) {
    var btn = $('button[type="submit"]', contactForm), missing = $('[data-missing]', contactForm);
    var inputs = $$('input, textarea', contactForm);
    var touched = {};
    var labelOf = function (i) { return { namn: 'namn', epost: 'e-post', meddelande: 'meddelande' }[i.name]; };
    var check = function () {
      var bad = inputs.filter(function (i) { return fieldError(i); });
      btn.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      var names = bad.map(labelOf).filter(Boolean);
      missing.hidden = !bad.length;
      if (names.length) missing.textContent = 'Fyll i ' + names.join(names.length > 2 ? ', ' : ' och ').replace(/, ([^,]*)$/, ' och $1') + ' för att skicka.';
      else if (bad.length) missing.textContent = 'Rätta det markerade fältet för att skicka.';
      return bad;
    };
    inputs.forEach(function (i) {
      i.addEventListener('blur', function () { if (i.value.trim() || touched[i.name]) { touched[i.name] = true; showError(i, fieldError(i)); } check(); });
      i.addEventListener('input', function () { if (i.getAttribute('aria-invalid') === 'true') showError(i, fieldError(i)); check(); });
    });
    check();
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = check();
      if (bad.length) { bad.forEach(function (i) { showError(i, fieldError(i)); }); bad[0].focus(); return; }
      contactForm.hidden = true;
      var sent = $('[data-sent]'); sent.hidden = false; sent.focus();
    });
  }

  /* ---------- Portfolio: filter och ljusbox ---------- */
  var grid = $('[data-gallery]');
  if (grid) {
    var items = $$('.pf-item', grid);
    var chips = $$('[data-filter]');
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var labels = { alla: 'bilder', portratt: 'porträtt', foretag: 'företagsbilder', natur: 'naturbilder' };
    var visible = function () { return items.filter(function (li) { return !li.hidden; }); };
    var applyFilter = function (cat, push) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.filter === cat ? 'true' : 'false'); });
      items.forEach(function (li) { li.hidden = !(cat === 'alla' || li.dataset.cat === cat); });
      $$('.pf-series', grid).forEach(function (sec) { sec.hidden = !$$('.pf-item', sec).some(function (li) { return !li.hidden; }); });
      var n = visible().length;
      count.textContent = 'Visar ' + n + ' ' + (n === 1 ? 'bild' : labels[cat]);
      if (empty) empty.hidden = n > 0;
      if (push) {
        var u = new URL(location.href);
        if (cat === 'alla') u.searchParams.delete('kategori'); else u.searchParams.set('kategori', cat);
        u.searchParams.delete('bild');
        history.replaceState(null, '', u);
      }
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { applyFilter(c.dataset.filter, true); }); });

    var lb = $('[data-lightbox]');
    var lbImg = $('img', lb), lbTitle = $('[data-lb-title]', lb), lbMeta = $('[data-lb-meta]', lb), lbCount = $('[data-lb-count]', lb);
    var current = 0, lastTrigger = null;
    var show = function (idx) {
      var list = visible(); if (!list.length) return;
      current = (idx + list.length) % list.length;
      var li = list[current], img = $('img', li);
      lbImg.classList.remove('is-in'); void lbImg.offsetWidth;
      lbImg.src = img.getAttribute('src'); lbImg.alt = img.alt;
      lbImg.width = img.getAttribute('width'); lbImg.height = img.getAttribute('height');
      lbImg.classList.add('is-in');
      lbTitle.textContent = li.dataset.title;
      lbMeta.textContent = li.dataset.meta;
      lbCount.textContent = (current + 1) + ' / ' + list.length;
    };
    var open = function (li) {
      lastTrigger = $('.pf-open', li);
      show(visible().indexOf(li));
      lb.showModal();
      $('[data-lb-next]', lb).focus();
    };
    items.forEach(function (li) { $('.pf-open', li).addEventListener('click', function () { open(li); }); });
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(current - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(current + 1); });
    $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    });
    lb.addEventListener('close', function () {
      var list = visible();
      var target = list[current] ? $('.pf-open', list[current]) : lastTrigger;
      if (target) target.focus();
    });
    /* Svep på mobil */
    var sx = null;
    lbImg.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    lbImg.addEventListener('pointerup', function (e) {
      if (sx === null) return; var dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    });

    var params = new URLSearchParams(location.search);
    var cat = params.get('kategori');
    applyFilter(labels[cat] ? cat : 'alla', false);
    var startId = params.get('bild');
    if (startId) {
      var startLi = items.filter(function (li) { return li.dataset.id === startId; })[0];
      if (startLi) { if (startLi.hidden) applyFilter('alla', false); open(startLi); }
    }
  }

  /* ---------- Priser: flikar med ett paket i taget på desktop ---------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on);
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        else if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
        else if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  });

  /* ---------- Tryck: motiv, storlek och ram, priset räknas direkt ---------- */
  var cfg = $('[data-print]');
  if (cfg && LS) {
    var motif = $('#pt-motiv', cfg), prev = $('[data-print-img]', cfg), total = $('[data-print-total]', cfg), go = $('[data-print-go]', cfg), sumText = $('[data-print-sum]', cfg);
    var update = function () {
      var m = LS.MOTIFS.filter(function (x) { return x.id === motif.value; })[0];
      var sizeId = ($('input[name="storlek"]:checked', cfg) || {}).value;
      var size = LS.PRINT_SIZES.filter(function (s) { return s.id === sizeId; })[0];
      var frame = ($('input[name="ram"]:checked', cfg) || {}).value === 'ek';
      prev.src = m.img; prev.alt = 'Förhandsvisning av motivet ' + m.name;
      var price = size.price + (frame ? size.frame : 0);
      total.textContent = LS.kr(price);
      sumText.textContent = m.name + ', ' + size.name + (frame ? ', ekram' : ', utan ram');
      go.href = 'boka.html?typ=tryck&paket=en&motiv=' + m.id + '&storlek=' + size.id + '&ram=' + (frame ? 'ek' : 'ingen');
    };
    $$('input, select', cfg).forEach(function (el) { el.addEventListener('change', update); });
    update();
  }
})();
