/* Elevate-grund: gemensamt beteende för konceptsajten.
   Meny, sököverlägg, varukorg i localStorage, fältvalidering, dialoger, fast list och notiser.
   Sajten sätter window.EV_SITE före den här filen. */
(function () {
  'use strict';
  var SITE = window.EV_SITE || { key: 'ev', products: [], popular: [] };
  var NB = ' ';

  var I = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    cart: '<path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.5L20.5 8H6.1"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    xcircle: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    trend: '<path d="M4 16l5-5 4 4 7-7M15 8h5v5"/>'
  };
  function svg(name, cls) {
    return '<svg class="ev-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + I[name] + '</svg>';
  }
  function kr(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + 'kr';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Lagring ---------- */
  function load(k, fb) { try { var v = JSON.parse(localStorage.getItem(SITE.key + ':' + k)); return v == null ? fb : v; } catch (e) { return fb; } }
  function save(k, v) { try { localStorage.setItem(SITE.key + ':' + k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- Varukorg ---------- */
  var cart = {
    items: function () { return load('cart', []); },
    set: function (items) { save('cart', items); cart.render(); },
    count: function () { return cart.items().reduce(function (s, i) { return s + i.qty; }, 0); },
    add: function (item) {
      var items = cart.items();
      var key = item.id + '|' + (item.variant || '');
      var hit = items.filter(function (i) { return i.id + '|' + (i.variant || '') === key; })[0];
      if (hit) hit.qty += item.qty || 1; else items.push(Object.assign({ qty: 1 }, item));
      cart.set(items);
      return items;
    },
    render: function () {
      var n = cart.count();
      $$('[data-cart-count]').forEach(function (el) {
        el.textContent = n > 9 ? '9+' : String(n);   /* pi-bd-stora */
        if (n) el.removeAttribute('data-empty'); else el.setAttribute('data-empty', '');
      });
      $$('[data-cart-label]').forEach(function (el) {
        el.setAttribute('aria-label', 'Varukorg, ' + (n === 1 ? '1 vara' : n + ' varor'));
      });
    }
  };

  /* ---------- Dialoger ---------- */
  function openDialog(d, opener) {
    if (!d) return;
    d._opener = opener || document.activeElement;
    if (!d.open) d.showModal();
  }
  function closeDialog(d) { if (d && d.open) d.close(); }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-dialog-open]');
    if (o) { e.preventDefault(); openDialog(document.getElementById(o.getAttribute('data-dialog-open')), o); return; }
    var c = e.target.closest('[data-dialog-close]');
    if (c) { e.preventDefault(); closeDialog(c.closest('dialog')); return; }
    if (e.target.tagName === 'DIALOG' && e.target.open) {
      var r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(e.target);
    }
  });
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () {
      var mb = $('.ev-menubtn'); if (d.id === 'meny' && mb) mb.setAttribute('aria-expanded', 'false');
      if (d._opener && d._opener.focus) d._opener.focus();
    });
  });

  /* Meny */
  var menubtn = $('.ev-menubtn');
  if (menubtn) menubtn.addEventListener('click', function () {
    menubtn.setAttribute('aria-expanded', 'true');
    openDialog(document.getElementById('meny'), menubtn);
  });

  /* ---------- Sök (ux-sok-*) ---------- */
  var sdlg = document.getElementById('sok');
  function renderSearch(q) {
    var out = $('[data-search-results]', sdlg);
    if (!out) return;
    q = (q || '').trim().toLowerCase();
    var html = '';
    if (!q) {
      var recent = load('recent', []);
      if (recent.length) {
        html += '<h2>Senaste sökningar</h2><ul class="ev-sugg">' + recent.map(function (r) {
          return '<li><button type="button" data-q="' + esc(r) + '">' + svg('clock') + esc(r) + '</button></li>';
        }).join('') + '</ul>';
      }
      html += '<h2>Populära sökningar</h2><ul class="ev-sugg">' + (SITE.popular || []).map(function (r) {
        return '<li><button type="button" data-q="' + esc(r) + '">' + svg('trend') + esc(r) + '</button></li>';
      }).join('') + '</ul>';
      out.innerHTML = html;
      return;
    }
    var words = [];
    (SITE.popular || []).concat(SITE.words || []).forEach(function (w) {
      if (w.toLowerCase().indexOf(q) === 0 && words.indexOf(w) < 0) words.push(w);
    });
    var hits = (SITE.products || []).filter(function (p) {
      return (p.name + ' ' + (p.sub || '') + ' ' + (p.tags || '')).toLowerCase().indexOf(q) > -1;
    });
    if (words.length) {
      html += '<h2>Förslag</h2><ul class="ev-sugg">' + words.slice(0, 4).map(function (w) {
        /* ux-sok-forslag-markering: resten av ordet är fetat */
        return '<li><button type="button" data-q="' + esc(w) + '">' + svg('search') + '<span><mark>' + esc(w.slice(0, q.length)) + '</mark><b>' + esc(w.slice(q.length)) + '</b></span></button></li>';
      }).join('') + '</ul>';
    }
    html += '<h2>' + hits.length + (hits.length === 1 ? ' träff' : ' träffar') + ' på ”' + esc(q) + '”</h2>';
    if (hits.length) {
      html += '<ul class="ev-sugg">' + hits.map(function (p) {
        return '<li><a href="' + p.url + '">' + p.thumb + '<span>' + esc(p.name) + '<br><span class="ev-hint">' + esc(p.sub || '') + '</span></span><span class="ev-price">' + kr(p.price) + '</span></a></li>';
      }).join('') + '</ul>';
    } else {
      var guess = (SITE.popular || [])[0];
      html += '<p>Vi hittade inget på det. Menade du <button type="button" class="ev-link" data-q="' + esc(guess) + '">' + esc(guess) + '</button>?</p>';
    }
    out.innerHTML = html;
  }
  function openSearch(q, opener) {
    if (!sdlg) return;
    var inp = $('input', sdlg);
    inp.value = q || '';
    renderSearch(inp.value);
    openDialog(sdlg, opener);
    inp.focus();
  }
  if (sdlg) {
    var sinp = $('input', sdlg);
    sinp.addEventListener('input', function () { renderSearch(sinp.value); });
    $('form', sdlg).addEventListener('submit', function (e) {
      e.preventDefault();
      var v = sinp.value.trim(); if (!v) return;
      var rec = load('recent', []).filter(function (r) { return r !== v; }); rec.unshift(v); save('recent', rec.slice(0, 3));
      renderSearch(v);
    });
    sdlg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-q]');
      if (b) { sinp.value = b.getAttribute('data-q'); renderSearch(sinp.value); sinp.focus(); }
    });
  }
  $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openSearch('', b); }); });
  $$('form[data-search-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); openSearch($('input', f).value, $('button', f)); });
  });

  /* ---------- Minivarukorg (ux-vagn-lagg-till, ux-vagn-typ) ---------- */
  var mini = $('.ev-minicart');
  function showMini(item) {
    if (!mini) return;
    $('[data-mini-item]', mini).innerHTML = (item.thumb || '') + '<div><p><strong>' + esc(item.name) + '</strong></p><p class="ev-hint">' + esc(item.variant || '') + '</p><p class="ev-price">' + kr(item.price) + '</p></div>';
    var hb = $('.ev-header').getBoundingClientRect().bottom;
    mini.classList.toggle('is-fixed', hb < 0);
    mini.hidden = false;
    var live = $('[data-live]'); if (live) live.textContent = item.name + ' ligger i varukorgen.';
    var first = $('a, button', mini); if (first) first.focus({ preventScroll: true });
  }
  if (mini) {
    document.addEventListener('click', function (e) {
      if (!mini.hidden && !mini.contains(e.target) && !e.target.closest('[data-add], [data-buy], [data-addhome]')) mini.hidden = true;
      if (e.target.closest('[data-mini-close]')) { mini.hidden = true; var c = $('[data-cart-label]'); if (c) c.focus(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mini.hidden) { mini.hidden = true; var c = $('[data-cart-label]'); if (c) c.focus(); }
    });
  }

  /* ---------- Fältvalidering (ux-fel-*) ---------- */
  var MSG = {
    required: 'Fyll i fältet.',
    email: 'Skriv e-postadressen som namn@exempel.se.',
    tel: 'Skriv telefonnumret med siffror, till exempel 070-123 45 67.',
    check: 'Kryssa i rutan för att gå vidare.'
  };
  function errEl(inp) {
    var id = inp.id + '-fel';
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('p');
      el.className = 'ev-error'; el.id = id;
      var chk = inp.closest('.ev-check'), fld = inp.closest('.ev-field');
      if (chk) chk.after(el); else if (fld) fld.appendChild(el); else inp.after(el);
    }
    var d = (inp.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    if (d.indexOf(id) < 0) { d.push(id); inp.setAttribute('aria-describedby', d.join(' ')); }
    return el;
  }
  function check(inp) {
    var v = (inp.value || '').trim(), msg = '';
    if (inp.type === 'checkbox') { if (inp.required && !inp.checked) msg = inp.dataset.error || MSG.check; }
    else if (inp.required && !v) msg = inp.dataset.error || MSG.required;
    else if (v && inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = MSG.email;
    else if (v && inp.type === 'tel' && !/^[\d\s+()-]{7,}$/.test(v)) msg = MSG.tel;
    var el = errEl(inp);
    if (msg) {
      inp.setAttribute('aria-invalid', 'true');
      el.innerHTML = svg('xcircle') + '<span>' + esc(msg) + '</span>';
      el.classList.add('is-on');
      return false;
    }
    inp.removeAttribute('aria-invalid');
    el.classList.remove('is-on'); el.textContent = '';
    return true;
  }
  function fieldsOf(scope) { return $$('input[required], input[type=email], input[type=tel], textarea[required], select[required]', scope).filter(function (i) { return !i.closest('[hidden]'); }); }
  function validate(scope) {
    var bad = fieldsOf(scope).filter(function (i) { return !check(i); });
    if (bad.length) { bad[0].focus({ preventScroll: true }); bad[0].scrollIntoView({ block: 'center', behavior: 'smooth' }); }  /* ux-fel-forflyttning */
    return !bad.length;
  }
  document.addEventListener('focusout', function (e) {
    var t = e.target;
    if (t.matches && t.matches('input, textarea, select') && t.closest('[data-validate]') && (t.value || t.type === 'checkbox' || t.dataset.touched)) {
      t.dataset.touched = '1';
      if (t.type !== 'checkbox') check(t);   /* fel när man lämnar fältet */
    }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute('aria-invalid') === 'true') check(t);
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.type === 'checkbox' && t.getAttribute('aria-invalid') === 'true') check(t);
  });

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  var bar = $('[data-stickybar]'), anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      var past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      bar.classList.toggle('is-on', past);
      bar.inert = !past;
    }).observe(anchor);
    bar.inert = true;
  }

  /* ---------- Notis ---------- */
  var toastT;
  function toast(msg) {
    var t = $('.ev-toast');
    if (!t) { t = document.createElement('div'); t.className = 'ev-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = svg('check') + '<span>' + esc(msg) + '</span>';
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.hidden = true; }, 4000);
  }

  /* Dragspel: en öppen i taget (ux-faq-flera-oppna). Fallback om name-attributet saknar stöd. */
  $$('.ev-faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      $$('details', d.parentNode).forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  cart.render();
  window.EV = { svg: svg, kr: kr, esc: esc, $: $, $$: $$, cart: cart, load: load, save: save, openDialog: openDialog, closeDialog: closeDialog,
    showMini: showMini, check: check, validate: validate, toast: toast, NB: NB };
})();
