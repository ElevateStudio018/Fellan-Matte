/* Gränd: sidornas beteende. Kräver data.js och core.js. */
(function () {
  'use strict';
  var E = window.EV, S = window.EV_SITE, P = S.products, ST = window.EV_STORES;
  var $ = E.$, $$ = E.$$, kr = E.kr, esc = E.esc;
  var STAR = '<svg class="ev-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6l-5.2 2.9L8 13.7l-4.4-4 5.9-.7z"/></svg>';
  var ARROW = '<svg class="ev-icon ev-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  var CARR = '<svg class="ev-icon ev-choice__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  var TRASH = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.9 12.1A1.5 1.5 0 0 0 8.9 20.5h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7M10 11v5.5M14 11v5.5"/></svg>';
  var EXT = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></svg>';
  var SWATCH = { Natur: '#ECE6DA', Rost: '#9C4A2C', Benvit: '#EFEBE3', Havre: '#D6C6AE', 'Mörkbrun': '#4A3428', Kalk: '#F2F0EA', Plommon: '#5A2A4C', Kamel: '#B58B5E' };
  var DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  var MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  function byId(id) { return P.filter(function (p) { return p.id === id; })[0]; }
  function store(id) { return ST.filter(function (s) { return s.id === id; })[0]; }
  function param(k) { return new URLSearchParams(location.search).get(k); }
  function stockIn(p, sid, size) { return p.stock[sid][p.sizes.indexOf(size)] || 0; }
  function total(p, size) { return ST.reduce(function (s, st) { return s + stockIn(p, st.id, size); }, 0); }
  function hoursToday(s, d) { d = d || new Date(); return s.hours[(d.getDay() + 6) % 7]; }
  function openNow(s) { var n = new Date(), h = hoursToday(s, n), t = n.getHours() + n.getMinutes() / 60; return h && t >= h[0] && t < h[1]; }
  function todayText(s) {
    var h = hoursToday(s);
    if (!h) return 'Stängt i dag';
    return (openNow(s) ? '<span class="ev-open">Öppet nu</span>, ' : '') + 'i dag ' + h[0] + '–' + h[1];   /* pi-et-oppet */
  }

  /* ---------- Produktkort ---------- */
  function card(p) {
    var price = p.was ? '<span class="ev-price--sale">' + kr(p.price) + '</span><s><span class="ev-sr">Ordinarie pris </span>' + kr(p.was) + '</s>' : kr(p.price);
    return '<li class="ev-pcard"><div class="ev-media">' + p.media + (p.ribbon ? '<span class="ev-ribbon">' + p.ribbon + '</span>' : '') + '</div>' +
      '<h3 class="ev-pcard__name"><a href="' + p.url + '">' + esc(p.name) + '</a></h3><p class="ev-pcard__sub">' + esc(p.sub) + '</p>' +
      '<p class="ev-pcard__rating">' + STAR + p.rating + ' <span>· ' + p.reviews + ' omdömen</span></p><p class="ev-pcard__price ev-price">' + price + '</p>' +
      '<a class="ev-btn ev-btn--sm" href="reservera.html?plagg=' + p.id + '" aria-label="Reservera ' + esc(p.name) + ' i butik"><span>Reservera</span>' + ARROW + '</a></li>';
  }
  $$('[data-products]').forEach(function (ul) { ul.innerHTML = ul.getAttribute('data-products').split(',').map(function (id) { return card(byId(id)); }).join(''); });
  $$('[data-today]').forEach(function (el) { el.innerHTML = todayText(store(el.getAttribute('data-today'))); });

  /* ===================================================================== Produkt */
  var reserveBtns = $$('[data-reserve]');
  if (reserveBtns.length) (function () {
    var p = byId(param('id') || 'ida') || byId('ida'), size = null;
    if (p.id !== 'ida') {
      $('[data-p-name]').textContent = p.name; $('[data-p-crumb]').textContent = p.name; $('[data-sb-name]').textContent = p.name;
      $('[data-p-sub]').textContent = p.sub + '.';
      $('[data-p-rating]').innerHTML = p.rating + ' · <a href="#omdomen">' + p.reviews + ' omdömen</a> (exempel)';
      $('[data-g-main]').innerHTML = p.media.replace(' loading="lazy"', '');
      document.title = p.name + ' | Gränd';
    }
    $('[data-p-color]').textContent = p.color; $('[data-p-swatch]').style.setProperty('--c', SWATCH[p.color] || '#ddd');
    $('[data-p-price]').innerHTML = $('[data-sb-price]').innerHTML = p.was ? '<span class="ev-price--sale">' + kr(p.price) + '</span><s><span class="ev-sr">Ordinarie pris </span>' + kr(p.was) + '</s>' : kr(p.price);
    $('[data-sizes]').innerHTML = p.sizes.map(function (s) {
      var none = !total(p, s);
      return '<label class="ev-size"' + (p.sizes.length === 1 ? ' style="grid-column:span 2"' : '') + '><input type="radio" name="storlek" value="' + s + '"' + (none ? ' disabled' : '') + '><span>' + s + (none ? '<span class="ev-sr"> (slut)</span>' : '') + '</span></label>';
    }).join('');
    function update() {
      reserveBtns.forEach(function (b) {
        if (size) { b.removeAttribute('aria-disabled'); b.href = 'reservera.html?plagg=' + p.id + '&storlek=' + encodeURIComponent(size); }
        else b.setAttribute('aria-disabled', 'true');
      });
      $('[data-missing]').hidden = !!size;
      $('[data-size-picked]').textContent = size || '';
      $('[data-sb-var]').textContent = size ? 'Storlek ' + size : '';
      $('[data-avail]').innerHTML = size ? ST.map(function (s) {
        var n = stockIn(p, s.id, size);
        return '<li><span>' + s.short + '</span><span class="' + (n ? '' : 'ev-hint') + '">' + (n ? (n === 1 ? 'Sista i ' + size : n + ' kvar i ' + size) : 'Slut i ' + size) + '</span></li>';
      }).join('') : '';
    }
    document.addEventListener('change', function (e) { if (e.target.name === 'storlek') { size = e.target.value; update(); } });
    reserveBtns.forEach(function (b) {
      b.addEventListener('click', function (e) {
        if (b.getAttribute('aria-disabled') === 'true') {
          e.preventDefault();
          var f = $('input[name=storlek]:not(:disabled)'); f.focus({ preventScroll: true }); f.closest('fieldset').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
    $('[data-addhome]').addEventListener('click', function () {
      if (!size) { $('input[name=storlek]:not(:disabled)').focus(); $('[data-missing]').textContent = 'Välj storlek först, sedan kan du reservera eller beställa hem.'; return; }
      E.cart.add({ id: p.id, name: p.name, variant: p.color + ', ' + size, price: p.price });
      E.showMini({ name: p.name, variant: p.color + ', ' + size, price: p.price, thumb: p.thumb });
    });
    var track = $('[data-gallery]'), dots = $('[data-dots]'), slides = track.children;
    dots.innerHTML = Array.prototype.map.call(slides, function (s, i) { return '<button type="button" aria-label="Bild ' + (i + 1) + ' av ' + slides.length + '"' + (i ? '' : ' aria-current="true"') + '><i></i></button>'; }).join('');
    dots.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { var i = Array.prototype.indexOf.call(dots.children, b); track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' }); } });
    track.addEventListener('scroll', function () { var i = Math.round(track.scrollLeft / track.clientWidth); Array.prototype.forEach.call(dots.children, function (d, j) { if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); }); }, { passive: true });
    update();
  })();

  /* ===================================================================== Butiker */
  var cards = $('[data-storecards]');
  if (cards) {
    var today = (new Date().getDay() + 6) % 7;
    cards.innerHTML = ST.map(function (s) {
      var rows = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'].map(function (d, i) {
        var h = s.hours[i];
        return '<div' + (i === today ? ' class="is-today"' : '') + '><dt>' + d + (i === today ? ' (i dag)' : '') + '</dt><dd>' + (h ? h[0] + '–' + h[1] : 'Stängt') + '</dd></div>';
      }).join('');
      return '<article class="gr-storecard" id="' + s.id + '" aria-labelledby="h-' + s.id + '"><h2 id="h-' + s.id + '">' + s.short + '</h2>' +
        '<p class="ev-iconline"><svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span>' + s.addr + '<br><a class="ev-link" style="font-size:14px" href="https://www.openstreetmap.org/search?query=' + encodeURIComponent(s.addr) + '" target="_blank" rel="noopener">Visa på kartan' + EXT + '<span class="ev-sr">(öppnas i ny flik)</span></a></span></p>' +
        '<p>' + todayText(s) + '</p><dl>' + rows + '</dl>' +
        '<div class="ev-actions"><a class="ev-btn' + (s.id === 'uppsala' ? '' : ' ev-btn--secondary') + '" href="reservera.html?butik=' + s.id + '"><span>Reservera i ' + s.short + '</span>' + (s.id === 'uppsala' ? ARROW : '') + '</a></div></article>';
    }).join('');
  }

  /* ===================================================================== Reservera */
  var steps = $$('[data-step]');
  if (steps.length) (function () {
    var sel = { plagg: param('plagg'), size: param('storlek'), butik: param('butik') };
    if (sel.plagg && !byId(sel.plagg)) sel.plagg = null;
    function p() { return byId(sel.plagg); }
    function plaggList() {
      $('[data-plagg-list]').innerHTML = P.map(function (x) {
        return '<button class="ev-choice ev-choice--media" type="button" data-plagg="' + x.id + '">' + x.thumb + '<span class="ev-choice__title">' + esc(x.name) + '</span><span class="ev-choice__desc">' + esc(x.color) + ', ' + kr(x.price) + '</span>' + CARR + '</button>';
      }).join('');
    }
    function sizeList() {
      var x = p();
      $('[data-size-list]').innerHTML = x.sizes.map(function (s) {
        var n = total(x, s);
        return '<button class="ev-choice" type="button" data-size="' + s + '"' + (n ? '' : ' aria-disabled="true"') + '><span class="ev-choice__title">' + s + '</span><span class="ev-choice__desc">' + (n ? n + ' i butik' : 'Slut') + '</span></button>';
      }).join('');
    }
    function storeList() {
      var x = p();
      $('[data-store-list]').innerHTML = ST.map(function (s) {
        var n = stockIn(x, s.id, sel.size);
        return '<button class="ev-choice" type="button" data-store="' + s.id + '"' + (n ? '' : ' aria-disabled="true"') + '><span class="ev-choice__title">' + s.short + ', ' + s.addr.split(',')[0] + '</span><span class="ev-choice__desc">' +
          (n ? (n === 1 ? 'Sista i ' + sel.size : n + ' kvar i ' + sel.size) : 'Slut i ' + sel.size) + ' · ' + todayText(s) + '</span>' + CARR + '</button>';
      }).join('');
    }
    function aside() {
      var x = p(), s = store(sel.butik);
      $('[data-s-thumb]').innerHTML = x ? x.thumb.replace('class="ev-thumb"', 'class="ev-thumb" style="width:72px;height:90px;border-radius:12px"') : '';
      $('[data-s-plagg]').textContent = x ? x.name : 'Inte valt';
      $('[data-s-size]').textContent = sel.size || 'Inte vald';
      $('[data-s-store]').textContent = s ? s.short : 'Inte vald';
      $('[data-s-price]').innerHTML = x ? kr(x.price) : '–';
    }
    function until() {
      var d = new Date(Date.now() + 48 * 3600 * 1000), s = store(sel.butik), h = hoursToday(s, d);
      return DAYS[d.getDay()].replace(/^./, function (c) { return c.toUpperCase(); }) + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + (h ? ' kl. ' + h[1] : '');
    }
    function show(n, push) {
      if (n >= 2 && !p()) n = 1;
      if (n >= 3 && !sel.size) n = 2;
      if (n >= 4 && !sel.butik) n = 3;
      if (n === 2) sizeList();
      if (n === 3) storeList();
      if (n === 4) {
        $('[data-r-plagg]').textContent = p().name + ', ' + p().color.toLowerCase();
        $('[data-r-size]').textContent = sel.size;
        $('[data-r-store]').textContent = store(sel.butik).name + ', ' + store(sel.butik).addr.split(',')[0];
      }
      steps.forEach(function (s) { s.hidden = s.getAttribute('data-step') !== String(n); });
      $('[data-aside]').hidden = n === 5;
      aside();
      $('[data-step="' + n + '"] h1').focus({ preventScroll: true });
      window.scrollTo(0, 0);
      if (push) history.pushState({ steg: n, sel: sel }, '', '?steg=' + n);
    }
    window.addEventListener('popstate', function (e) { if (e.state) { sel = e.state.sel || sel; show(e.state.steg, false); } });
    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]'); if (g) { e.preventDefault(); show(+g.getAttribute('data-goto'), true); return; }
      var a = e.target.closest('[data-plagg]');
      if (a) { if (sel.plagg !== a.getAttribute('data-plagg')) sel.size = null; sel.plagg = a.getAttribute('data-plagg'); show(2, true); return; }
      var z = e.target.closest('[data-size]');
      if (z && z.getAttribute('aria-disabled') !== 'true') { sel.size = z.getAttribute('data-size'); show(sel.butik && stockIn(p(), sel.butik, sel.size) ? 4 : 3, true); return; }
      var s = e.target.closest('[data-store]');
      if (s && s.getAttribute('aria-disabled') !== 'true') { sel.butik = s.getAttribute('data-store'); show(4, true); }
    });
    $('[data-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!E.validate(e.target)) return;
      var s = store(sel.butik), x = p();
      $('[data-d-nr]').textContent = 'R-' + (2000 + Math.floor(Math.random() * 900));
      $('[data-d-plagg]').textContent = x.name + ', ' + sel.size;
      $('[data-d-store]').textContent = s.name + ', ' + s.addr.split(',')[0];
      $('[data-d-until]').textContent = until();
      $('[data-d-lead]').textContent = 'Vi skickar ett sms till ' + $('#mobil').value + ' när plagget ligger undan i ' + s.short + ', oftast inom en timme.';
      $('[data-d-link]').href = 'butiker.html#' + s.id;
      show(5, true);
    });
    plaggList();
    var start = sel.plagg ? (sel.size ? (sel.butik ? 4 : 3) : 2) : 1;
    history.replaceState({ steg: start, sel: sel }, '', location.pathname + location.search);
    show(start, false);
    if (start === 1) window.scrollTo(0, 0);
  })();

  /* ===================================================================== Varukorg */
  var lines = $('[data-lines]');
  if (lines) (function () {
    var rmIndex = -1;
    function render() {
      var items = E.cart.items(), sum = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0), ship = sum >= 499 || !sum ? 0 : 49;
      $('[data-empty]').hidden = !!items.length; $('[data-sum]').hidden = !items.length; lines.hidden = !items.length;
      lines.innerHTML = items.map(function (it, i) {
        var x = byId(it.id) || {};
        return '<li class="gr-line">' + (x.thumb || '') + '<div><h2>' + esc(it.name) + '</h2><p class="ev-hint">' + esc(it.variant) + (it.qty > 1 ? ' · ' + it.qty + ' st' : '') + '</p><p class="ev-price" style="margin-top:6px">' + kr(it.price * it.qty) + '</p></div>' +
          '<button class="ev-link" style="color:var(--ev-ink-2);font-weight:500" type="button" data-rm="' + i + '">' + TRASH.replace('ev-icon', 'ev-icon" style="width:20px;height:20px') + 'Ta bort<span class="ev-sr"> ' + esc(it.name) + '</span></button></li>';
      }).join('');
      $('[data-s-items]').innerHTML = kr(sum); $('[data-s-ship]').innerHTML = ship ? kr(ship) : 'Fri';
      $('[data-s-total]').innerHTML = kr(sum + ship); $('[data-s-vat]').innerHTML = kr((sum + ship) * 0.2);
    }
    lines.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rm]'); if (!b) return;
      rmIndex = +b.getAttribute('data-rm'); $('[data-rm-name]').textContent = E.cart.items()[rmIndex].name; E.openDialog($('#tabort'), b);
    });
    $('[data-rm-confirm]').addEventListener('click', function () {
      var items = E.cart.items(), gone = items.splice(rmIndex, 1)[0]; E.cart.set(items);
      var d = $('#tabort'); d._opener = null; E.closeDialog(d); render();
      E.toast(gone.name + ' är borttagen ur varukorgen.');
      var n = $('[data-rm]') || $('[data-empty] .ev-btn'); if (n) n.focus();
    });
    $('[data-checkout]').addEventListener('click', function () { var n = $('[data-checkout-note]'); n.hidden = false; n.setAttribute('role', 'status'); });
    render();
  })();
})();
