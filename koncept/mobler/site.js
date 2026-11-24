/* Ekbacka hem: sidornas beteende. Kräver data.js och core.js. */
(function () {
  'use strict';
  var E = window.EV, S = window.EV_SITE, P = S.products;
  var $ = E.$, $$ = E.$$, kr = E.kr, svg = E.svg, esc = E.esc, NB = E.NB;
  var STAR = '<svg class="ev-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6l-5.2 2.9L8 13.7l-4.4-4 5.9-.7z"/></svg>';
  var CARTI = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.5L20.5 8H6.1"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>';
  var CHEV = '<svg class="ev-icon ek-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var TRASH = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.9 12.1A1.5 1.5 0 0 0 8.9 20.5h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7M10 11v5.5M14 11v5.5"/></svg>';
  var PLUS = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var MINUS = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';
  var PIN = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
  function byId(id) { return P.filter(function (p) { return p.id === id; })[0]; }
  function param(k) { return new URLSearchParams(location.search).get(k); }

  var DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  var MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function dateText(iso) { if (!iso) return ''; var d = new Date(iso + 'T12:00:00'); return cap(DAYS[d.getDay()]) + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  var DELIV = { dorr: 'Till dörren', inbarning: 'Inbärning', montering: 'Inbärning och montering' };
  function itemsTotal(items) { return items.reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function delivPrice(key, sum) { return key === 'dorr' ? (sum >= 5000 ? 0 : 395) : key === 'inbarning' ? 295 : key === 'montering' ? 795 : 0; }

  /* ---------- Produktkort (ux-lista-*) ---------- */
  function card(p) {
    var price = p.was
      ? '<span class="ev-price--sale">' + kr(p.price) + '</span><s><span class="ev-sr">Ordinarie pris </span>' + kr(p.was) + '</s>'
      : kr(p.price);
    return '<li class="ev-pcard"><div class="ev-media">' + p.media + (p.ribbon ? '<span class="ev-ribbon">' + p.ribbon + '</span>' : '') + '</div>' +
      '<h3 class="ev-pcard__name"><a href="' + p.url + '">' + esc(p.name) + '</a></h3>' +
      '<p class="ev-pcard__sub">' + esc(p.sub) + '</p>' +
      '<p class="ev-pcard__rating">' + STAR + p.rating + ' <span>· ' + p.reviews + ' omdömen</span></p>' +
      '<p class="ev-pcard__price ev-price">' + price + '</p>' +
      '<button class="ev-btn ev-btn--sm" type="button" data-add="' + p.id + '" aria-label="Köp ' + esc(p.name) + '">' + CARTI + '<span>Köp</span></button></li>';
  }
  $$('[data-products]').forEach(function (ul) {
    ul.innerHTML = ul.getAttribute('data-products').split(',').map(function (id) { return card(byId(id)); }).join('');
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    var p = byId(b.getAttribute('data-add'));
    E.cart.add({ id: p.id, name: p.name, variant: p.sub, price: p.price });
    E.showMini({ name: p.name, variant: p.sub, price: p.price, thumb: p.thumb });
  });

  /* Showroomets öppettider: "Öppet nu" som grön text (pi-et-oppet) */
  $$('[data-open-status]').forEach(function (el) {
    var n = new Date(), d = n.getDay(), h = n.getHours() + n.getMinutes() / 60;
    var open = (d >= 2 && d <= 5 && h >= 11 && h < 18) || (d === 6 && h >= 10 && h < 15);
    el.innerHTML = open ? '<span class="ev-open">Öppet nu</span><br>' : 'Stängt just nu<br>';
  });

  /* ===================================================================== Kategori */
  var catalog = $('[data-catalog]');
  if (catalog) (function () {
    var CATS = [['alla', 'Alla'], ['soffor', 'Soffor'], ['fatoljer', 'Fåtöljer och pallar'], ['bord', 'Bord'], ['forvaring', 'Förvaring'], ['belysning', 'Belysning'], ['textil', 'Textil'], ['inredning', 'Inredning']];
    var LEADS = { alla: 'Soffor, fåtöljer, bord och lampor. Allt kan levereras samma dag, och vi monterar om du vill.',
      soffor: 'Soffor med klädsel du kan tvätta eller byta. Leverans och montering på den dag du väljer.',
      fatoljer: 'Fåtöljer och pallar i bouclé, linne och ull, med ram i oljad ek.',
      bord: 'Soffbord och sidobord i trä och stål.', forvaring: 'Bokhyllor, skänkar och bänkar som håller ordning.',
      belysning: 'Golvlampor och taklampor med varmt, bländfritt ljus.', textil: 'Mattor och kuddfodral i ull och linne.', inredning: 'Speglar och detaljer.' };
    var COLORS = ['Ljus', 'Grå', 'Brun', 'Svart', 'Blå', 'Röd'], MATS = ['Tyg', 'Ull', 'Trä', 'Metall', 'Glas'];
    var SORTS = [['pop', 'Populärast'], ['low', 'Billigast'], ['high', 'Dyrast'], ['new', 'Nyast'], ['rating', 'Bäst betyg']];
    var PMAX = 25000;
    var st = { kat: param('kat') || 'alla', color: [], mat: [], min: 0, max: PMAX, sort: 'pop', shown: 12 };
    if (!CATS.some(function (c) { return c[0] === st.kat; })) st.kat = 'alla';

    function match(p, f) {
      return (f.kat === 'alla' || p.cat === f.kat) && (!f.color.length || f.color.indexOf(p.color) > -1) &&
        (!f.mat.length || f.mat.indexOf(p.mat) > -1) && p.price >= f.min && p.price <= f.max;
    }
    function list(f) {
      var r = P.filter(function (p) { return match(p, f); });
      var s = f.sort;
      r.sort(function (a, b) {
        return s === 'low' ? a.price - b.price : s === 'high' ? b.price - a.price : s === 'rating' ? parseFloat(b.rating.replace(',', '.')) - parseFloat(a.rating.replace(',', '.')) :
          s === 'new' ? (b.ribbon === 'Nyhet') - (a.ribbon === 'Nyhet') : b.reviews - a.reviews;
      });
      return r;
    }
    function clone(o) { return JSON.parse(JSON.stringify(o)); }
    function activeCount(f) { return f.color.length + f.mat.length + (f.min > 0 || f.max < PMAX ? 1 : 0); }

    function render() {
      var r = list(st), cat = CATS.filter(function (c) { return c[0] === st.kat; })[0];
      $('[data-cat-title]').textContent = st.kat === 'alla' ? 'Vardagsrum' : cat[1];
      $('[data-cat-lead]').textContent = LEADS[st.kat];
      document.title = (st.kat === 'alla' ? 'Vardagsrum' : cat[1]) + ' | Ekbacka hem';
      $('[data-count]').textContent = r.length;
      catalog.innerHTML = r.slice(0, st.shown).map(card).join('');
      var foot = $('[data-listfoot]');
      if (!r.length) {
        foot.innerHTML = '<div class="ek-empty"><h2>Inga möbler matchar filtren</h2><p class="ev-hint" style="margin-top:8px">Ta bort ett filter eller rensa alla för att se fler.</p><div class="ev-actions"><button class="ev-btn" type="button" data-clear-all><span>Rensa alla filter</span></button></div></div>';
      } else if (r.length > st.shown) {
        foot.innerHTML = '<p>Visar ' + st.shown + ' av ' + r.length + '</p><button class="ev-link ev-link--more" type="button" data-more aria-expanded="false">Visa fler<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>';
      } else {
        foot.innerHTML = '<p>Visar ' + r.length + ' av ' + r.length + '</p><a class="ev-link" href="#top">Till toppen<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4M6 10l6-6 6 6"/></svg></a>';
      }
      $$('[data-quick] .ev-chip').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-kat') === st.kat ? 'true' : 'false'); });
      var n = activeCount(st);
      $('[data-filter-label]').textContent = n ? 'Filter (' + n + ')' : 'Filter';   /* sy-lage-filter-aktiv */
      var srt = SORTS.filter(function (s) { return s[0] === st.sort; })[0][1];
      $('[data-sort-label]').textContent = srt;
      renderDesk();
      renderSortList();
    }

    /* Snabbval (ux-filter-snabbval) */
    $('[data-quick]').innerHTML = CATS.map(function (c) {
      return '<li><button class="ev-chip" type="button" data-kat="' + c[0] + '" aria-pressed="false">' + c[1] + '</button></li>';
    }).join('');
    $('[data-quick]').addEventListener('click', function (e) {
      var c = e.target.closest('[data-kat]'); if (!c) return;
      st.kat = c.getAttribute('data-kat'); st.shown = 12;
      history.replaceState(null, '', st.kat === 'alla' ? 'kategori.html' : 'kategori.html?kat=' + st.kat);
      render();
    });

    function boxes(group, values, f) {
      return '<div class="ek-boxes" role="group" aria-label="' + group + '">' + values.map(function (v) {
        var key = group === 'Färg' ? 'color' : 'mat';
        var probe = clone(f); probe[key] = [v];
        var cnt = P.filter(function (p) { return match(p, probe); }).length;
        var on = f[key].indexOf(v) > -1;
        return '<button type="button" class="ek-box" data-box="' + key + '" data-val="' + v + '" aria-pressed="' + on + '"' + (!cnt && !on ? ' aria-disabled="true"' : '') + '>' + v + '<span>' + cnt + '</span></button>';
      }).join('') + '</div>';
    }
    function range(f, id) {
      return '<div class="ek-range"><div class="ek-range__vals"><span data-rmin>' + kr(f.min) + '</span><span data-rmax>' + kr(f.max) + '</span></div><div class="ek-range__track"><span class="ek-range__fill" style="left:' + (f.min / PMAX * 100) + '%;right:' + (100 - f.max / PMAX * 100) + '%"></span>' +
        '<input type="range" min="0" max="' + PMAX + '" step="500" value="' + f.min + '" data-rng="min" aria-label="Lägsta pris" id="' + id + '-min">' +
        '<input type="range" min="0" max="' + PMAX + '" step="500" value="' + f.max + '" data-rng="max" aria-label="Högsta pris" id="' + id + '-max"></div></div>';
    }
    /* Pågående val i en panel. Slår igenom först med "Visa N" (ux-filter-direkt). */
    function panelLogic(root, pending, onApply, rerender) {
      root.addEventListener('click', function (e) {
        var b = e.target.closest('[data-box]');
        if (b && b.getAttribute('aria-disabled') !== 'true') {
          var k = b.getAttribute('data-box'), v = b.getAttribute('data-val'), arr = pending[k], i = arr.indexOf(v);
          if (i > -1) arr.splice(i, 1); else arr.push(v);
          rerender(); var nb = root.querySelector('[data-box="' + k + '"][data-val="' + v + '"]'); if (nb) nb.focus();
        }
        if (e.target.closest('[data-apply]')) onApply();
        if (e.target.closest('[data-clear]')) { pending.color = []; pending.mat = []; pending.min = 0; pending.max = PMAX; rerender(); }
      });
      root.addEventListener('input', function (e) {
        var r = e.target.closest('[data-rng]'); if (!r) return;
        var v = +r.value;
        if (r.getAttribute('data-rng') === 'min') pending.min = Math.min(v, pending.max - 500); else pending.max = Math.max(v, pending.min + 500);
        r.value = r.getAttribute('data-rng') === 'min' ? pending.min : pending.max;
        root.querySelector('[data-rmin]').textContent = kr(pending.min);
        root.querySelector('[data-rmax]').textContent = kr(pending.max);
        var fill = root.querySelector('.ek-range__fill'); fill.style.left = pending.min / PMAX * 100 + '%'; fill.style.right = 100 - pending.max / PMAX * 100 + '%';
        updateApply(root, pending);
      });
    }
    function updateApply(root, pending) {
      var n = list(pending).length;
      $$('[data-apply] span', root).forEach(function (s) { s.textContent = 'Visa ' + n; });
    }

    /* Desktop: rad med rullgardiner (ux-filter-placering). Sortering till vänster bredvid filtren (ux-sort-placering). */
    var openDD = null, pend = null;
    var DD = [['sort', 'Sortera'], ['color', 'Färg'], ['mat', 'Material'], ['price', 'Pris']];
    function renderDesk() {
      var host = $('[data-desktools]');
      host.innerHTML = DD.map(function (d) {
        var k = d[0], label = d[1], active = false, icon = '';
        if (k === 'sort') { label = SORTS.filter(function (s) { return s[0] === st.sort; })[0][1]; icon = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20V4M4 8l4-4 4 4M16 4v16M12 16l4 4 4-4"/></svg>'; }
        if (k === 'color' && st.color.length) { label += ' (' + st.color.length + ')'; active = true; }
        if (k === 'mat' && st.mat.length) { label += ' (' + st.mat.length + ')'; active = true; }
        if (k === 'price' && (st.min > 0 || st.max < PMAX)) { label += ' (1)'; active = true; }
        var aria = k === 'sort' ? ' aria-label="Sortera: ' + label + '"' : '';
        return '<div class="ek-dd"><button class="ek-ddbtn' + (active ? ' is-active' : '') + '" type="button" aria-expanded="' + (openDD === k) + '" aria-controls="dd-' + k + '" data-dd="' + k + '"' + aria + '>' + icon + '<span>' + label + '</span>' + CHEV + '</button>' +
          '<div class="ek-panel' + (k === 'sort' ? ' ek-panel--sort' : '') + '" id="dd-' + k + '" ' + (openDD === k ? '' : 'hidden') + ' data-panel="' + k + '"></div></div>';
      }).join('');
      if (openDD) fillPanel(openDD);
    }
    function fillPanel(k) {
      var p = $('[data-panel="' + k + '"]');
      if (k === 'sort') {
        p.innerHTML = '<ul class="ek-sortlist" role="radiogroup" aria-label="Sortera efter">' + SORTS.map(function (s) {
          return '<li><button type="button" role="radio" aria-checked="' + (st.sort === s[0]) + '" data-sort="' + s[0] + '">' + s[1] + '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></li>';
        }).join('') + '</ul>';
        return;
      }
      var inner = k === 'color' ? boxes('Färg', COLORS, pend) : k === 'mat' ? boxes('Material', MATS, pend) : range(pend, 'dd');
      p.innerHTML = '<div class="ek-panel__top"><span>' + DD.filter(function (d) { return d[0] === k; })[0][1] + '</span><button class="ev-link" type="button" data-clear>Rensa alla</button></div>' + inner +
        '<button class="ev-btn" type="button" data-apply><span>Visa ' + list(pend).length + '</span><svg class="ev-icon ev-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg></button>';
    }
    var desk = $('[data-desktools]');
    desk.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dd]');
      if (b) {
        var k = b.getAttribute('data-dd');
        openDD = openDD === k ? null : k; pend = clone(st);
        renderDesk();
        var nb = $('[data-dd="' + k + '"]'); nb.focus();
        if (openDD) { var first = $('[data-panel="' + k + '"] button, [data-panel="' + k + '"] input'); if (first && k !== 'price') first.focus(); }
        return;
      }
      var s = e.target.closest('[data-sort]');
      if (s) { st.sort = s.getAttribute('data-sort'); openDD = null; render(); $('[data-dd="sort"]').focus(); }
    });
    panelLogic(desk, { get color() { return pend.color; }, set color(v) { pend.color = v; }, get mat() { return pend.mat; }, set mat(v) { pend.mat = v; },
      get min() { return pend.min; }, set min(v) { pend.min = v; }, get max() { return pend.max; }, set max(v) { pend.max = v; } },
      function () { var k = openDD; st.color = pend.color; st.mat = pend.mat; st.min = pend.min; st.max = pend.max; st.shown = 12; openDD = null; render(); $('[data-dd="' + k + '"]').focus(); },
      function () { fillPanel(openDD); });
    document.addEventListener('click', function (e) { if (openDD && !e.target.closest('.ek-dd')) { openDD = null; renderDesk(); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openDD) { var k = openDD; openDD = null; renderDesk(); $('[data-dd="' + k + '"]').focus(); } });

    /* Mobil: bottenark för filter och sortering (ux-filter-mobil, ux-sort-mobil) */
    var sheet = $('#filterark'), spend = clone(st);
    function renderSheet() {
      $('[data-sheet-groups]', sheet).innerHTML = [['Färg', boxes('Färg', COLORS, spend), spend.color.length], ['Material', boxes('Material', MATS, spend), spend.mat.length], ['Pris', range(spend, 'ark'), (spend.min > 0 || spend.max < PMAX) ? 1 : 0]].map(function (g) {
        var wasOpen = sheet.querySelector('details[data-g="' + g[0] + '"]');
        return '<details class="ek-group" data-g="' + g[0] + '"' + (wasOpen && wasOpen.open ? ' open' : '') + '><summary>' + g[0] + (g[2] ? ' (' + g[2] + ')' : '') + PLUS.replace('ev-icon', 'ev-icon') + '</summary><div>' + g[1] + '</div></details>';
      }).join('');
      updateApply(sheet, spend);
    }
    $('[data-dialog-open="filterark"]').addEventListener('click', function () { spend = clone(st); proxy.t = spend; renderSheet(); });
    var proxy = { t: spend };
    panelLogic(sheet, { get color() { return proxy.t.color; }, set color(v) { proxy.t.color = v; }, get mat() { return proxy.t.mat; }, set mat(v) { proxy.t.mat = v; },
      get min() { return proxy.t.min; }, set min(v) { proxy.t.min = v; }, get max() { return proxy.t.max; }, set max(v) { proxy.t.max = v; } },
      function () { st.color = spend.color; st.mat = spend.mat; st.min = spend.min; st.max = spend.max; st.shown = 12; E.closeDialog(sheet); render(); },
      renderSheet);
    function renderSortList() {
      $('[data-sortlist]').innerHTML = SORTS.map(function (s) {
        return '<li><button type="button" role="radio" aria-checked="' + (st.sort === s[0]) + '" data-msort="' + s[0] + '">' + s[1] + '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></li>';
      }).join('');
    }
    $('[data-sortlist]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-msort]'); if (!b) return;
      st.sort = b.getAttribute('data-msort'); E.closeDialog($('#sortark')); render();
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-more]')) { var prev = st.shown; st.shown = 99; render(); var cards = $$('.ev-pcard__name a', catalog); if (cards[prev]) cards[prev].focus(); }
      if (e.target.closest('[data-clear-all]')) { st.color = []; st.mat = []; st.min = 0; st.max = PMAX; st.kat = 'alla'; render(); }
      var v = e.target.closest('[data-view]');
      if (v) {
        $$('[data-view]').forEach(function (b) { b.setAttribute('aria-pressed', b === v ? 'true' : 'false'); });
        catalog.classList.toggle('is-list', v.getAttribute('data-view') === 'list');
      }
    });
    render();
  })();

  /* ===================================================================== Produkt */
  var buyBtns = $$('[data-buy]');
  if (buyBtns.length) (function () {
    var FAB = {
      boucle: { name: 'Bouclé', colors: [['Havre', '#D9CFC2'], ['Kritvit', '#EEEAE2'], ['Lera', '#B9876B', '#fff'], ['Grafit', '#4B4B4B', '#fff']] },
      linne: { name: 'Linne', colors: [['Natur', '#D8CCB6'], ['Dimblå', '#A9B8C4'], ['Rost', '#A4523A', '#fff'], ['Mörkgrå', '#5A5A5A', '#fff', true]] },
      ull: { name: 'Ull', colors: [['Kamel', '#B08A5B', '#fff'], ['Dimblå', '#8FA3B5'], ['Plommon', '#6E3B4E', '#fff'], ['Grafit', '#3F4144', '#fff']] }
    };
    var p = byId(param('id') || 'ask') || byId('ask');
    var hasOpts = p.mat === 'Tyg' || p.mat === 'Ull';
    var sel = { tyg: null, extra: 0, color: null };
    if (p.id !== 'ask') {
      $('[data-p-name]').textContent = p.name; $('[data-p-crumb]').textContent = p.name;
      $('[data-sb-name]').textContent = p.name;
      $('[data-p-sub]').textContent = p.sub + '. Tillverkad för Ekbacka hem i Tranås.';
      document.title = p.name + ' | Ekbacka hem';
      $('[data-g-main]').innerHTML = p.media.replace(' loading="lazy"', '');
      if (!hasOpts) { $('[data-options]').hidden = true; $('[data-swatchtile]').remove(); }
    }
    function price() { return p.price + sel.extra; }
    function variant() { return hasOpts ? FAB[sel.tyg].name + ', ' + sel.color : p.sub; }
    function update() {
      var ready = !hasOpts || (sel.tyg && sel.color);
      $$('[data-p-price], [data-sb-price]').forEach(function (el) { el.innerHTML = kr(price()); });
      buyBtns.forEach(function (b) { if (ready) b.removeAttribute('aria-disabled'); else b.setAttribute('aria-disabled', 'true'); });
      var miss = $('[data-missing]');
      miss.textContent = ready ? '' : !sel.tyg ? 'Välj tyg och färg för att lägga i varukorgen.' : 'Välj färg för att lägga i varukorgen.';
      miss.hidden = ready;
      $('[data-sb-var]').textContent = ready && hasOpts ? variant() : '';
      $('[data-fabric-picked]').textContent = sel.tyg ? FAB[sel.tyg].name : '';
      $('[data-color-picked]').textContent = sel.color || '';
    }
    function swatches() {
      var host = $('[data-swatches]');
      if (!sel.tyg) { host.innerHTML = '<p class="ev-hint">Välj tyg först, så visas färgerna.</p>'; return; }
      host.innerHTML = FAB[sel.tyg].colors.map(function (c, i) {
        return '<label class="ek-swatch"><input type="radio" name="farg" value="' + c[0] + '"' + (c[3] ? ' disabled' : '') + (sel.color === c[0] ? ' checked' : '') + ' data-i="' + i + '"><span style="--c:' + c[1] + '">' + c[0] + (c[3] ? '<span class="ev-sr"> (slut i lager)</span>' : '') + '</span></label>';
      }).join('');
    }
    function tile() {
      var t = $('[data-swatchtile]'); if (!t) return;
      if (sel.tyg && sel.color) {
        var c = FAB[sel.tyg].colors.filter(function (x) { return x[0] === sel.color; })[0];
        t.style.setProperty('--fabric', c[1]); t.style.setProperty('--fabric-ink', c[2] || '#1A1C1E');
        $('[data-swatch-name]').textContent = FAB[sel.tyg].name + ' ' + c[0].toLowerCase();
        $('[data-swatch-sub]').textContent = 'Tygprov i verklig färg. Fotot visar bouclé havre.';
      }
    }
    document.addEventListener('change', function (e) {
      if (e.target.name === 'tyg') {
        sel.tyg = e.target.value; sel.extra = +e.target.getAttribute('data-extra');
        if (sel.color && !FAB[sel.tyg].colors.some(function (c) { return c[0] === sel.color && !c[3]; })) sel.color = null;
        swatches(); tile(); update();
      }
      if (e.target.name === 'farg') { sel.color = e.target.value; tile(); update(); }
    });
    buyBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-disabled') === 'true') {
          var target = !sel.tyg ? $('input[name=tyg]') : $('input[name=farg]:not(:disabled)');
          if (target) { target.focus({ preventScroll: true }); target.closest('fieldset').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
        E.cart.add({ id: p.id, name: p.name, variant: variant(), price: price() });
        E.showMini({ name: p.name, variant: variant(), price: price(), thumb: p.thumb });
      });
    });
    var save = $('[data-save]');
    save.addEventListener('click', function () {
      var on = save.getAttribute('aria-pressed') !== 'true';
      save.setAttribute('aria-pressed', on ? 'true' : 'false');
      save.querySelector('span').textContent = on ? 'Sparad' : 'Spara';
    });
    /* Bildbläddring med prickar på mobil (ux-mobil-bildbladdring) */
    var track = $('[data-gallery]'), dots = $('[data-dots]'), slides = track.children;
    dots.innerHTML = Array.prototype.map.call(slides, function (s, i) { return '<button type="button" aria-label="Bild ' + (i + 1) + ' av ' + slides.length + '"' + (i === 0 ? ' aria-current="true"' : '') + '><i></i></button>'; }).join('');
    dots.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var i = Array.prototype.indexOf.call(dots.children, b);
      track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    });
    track.addEventListener('scroll', function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      Array.prototype.forEach.call(dots.children, function (d, j) { if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }, { passive: true });
    swatches(); update();
  })();

  /* ===================================================================== Varukorg */
  var cartPage = $('[data-cart-page]');
  if (cartPage) (function () {
    var order = E.load('order', {});
    var rmIndex = -1;
    function render() {
      var items = E.cart.items(), sum = itemsTotal(items);
      var empty = !items.length;
      $('[data-cart-body]').hidden = empty; $('[data-cart-empty]').hidden = !empty; $('[data-cart-sum]').hidden = empty;
      $('[data-lines]').innerHTML = items.map(function (it, i) {
        var p = byId(it.id) || {};
        return '<li class="ek-line">' + (p.thumb || '<span class="ev-thumb"></span>') + '<div><div class="ek-line__top"><div><h2><a href="' + (p.url || '#') + '">' + esc(it.name) + '</a></h2><p class="ek-line__var">' + esc(it.variant || '') + '</p></div><p class="ev-price">' + kr(it.price * it.qty) + '</p></div>' +
          '<div class="ek-line__row"><div class="ev-qty" role="group" aria-label="Antal ' + esc(it.name) + '"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Minska antal"' + (it.qty <= 1 ? ' aria-disabled="true"' : '') + '>' + MINUS + '</button><output aria-live="polite">' + it.qty + '</output><button type="button" data-q="1" data-i="' + i + '" aria-label="Öka antal">' + PLUS + '</button></div>' +
          '<button class="ek-remove" type="button" data-rm="' + i + '">' + TRASH + 'Ta bort<span class="ev-sr"> ' + esc(it.name) + '</span></button></div></div></li>';
      }).join('');
      var dk = order.deliv;
      $$('input[name=leverans]').forEach(function (r) { r.checked = r.value === dk; });
      $('[data-dprice="dorr"]').innerHTML = sum >= 5000 ? 'Fri' : kr(395);
      var pct = Math.min(100, Math.round(sum / 5000 * 100));
      $('[data-fs-bar]').style.width = pct + '%';
      $('[data-fs-pct]').innerHTML = pct + NB + '%';
      $('[data-fs-text]').innerHTML = sum >= 5000 ? 'Du har fri leverans till dörren' : kr(5000 - sum) + ' kvar till fri leverans till dörren';
      var dp = dk ? delivPrice(dk, sum) : 0, total = sum + dp;
      $('[data-s-items]').innerHTML = kr(sum);
      $('[data-s-deliv]').innerHTML = dk ? (dp ? kr(dp) : 'Fri') : 'Välj ovan';
      $('[data-s-total]').innerHTML = kr(total);
      $('[data-s-vat]').innerHTML = kr(total * 0.2);
      var df = $('[data-datefield]');
      if (order.date) { df.removeAttribute('data-empty'); $('#dag-varde').textContent = dateText(order.date); } else { df.setAttribute('data-empty', ''); $('#dag-varde').textContent = 'Välj dag'; }
      var ready = order.date && dk, go = $('[data-go]');
      if (ready) go.removeAttribute('aria-disabled'); else go.setAttribute('aria-disabled', 'true');
      var miss = !order.date && !dk ? 'Välj leveransdag och leveranssätt för att gå vidare.' : !order.date ? 'Välj leveransdag för att gå vidare.' : !dk ? 'Välj leveranssätt för att gå vidare.' : '';
      $('[data-go-missing]').textContent = miss; $('[data-go-missing]').hidden = !miss;
      var inCart = items.map(function (i) { return i.id; });
      $('[data-suggest-list]').innerHTML = ['tuva', 'knopp', 'stav', 'klot'].filter(function (id) { return inCart.indexOf(id) < 0; }).slice(0, 2).map(function (id) {
        var p = byId(id); return '<li>' + p.thumb + '<a href="' + p.url + '">' + esc(p.name) + '</a><span class="ev-price">' + kr(p.price) + '</span></li>';
      }).join('');
    }
    cartPage.addEventListener('click', function (e) {
      var q = e.target.closest('[data-q]');
      if (q) {
        if (q.getAttribute('aria-disabled') === 'true') return;
        var items = E.cart.items(), i = +q.getAttribute('data-i');
        items[i].qty = Math.max(1, items[i].qty + +q.getAttribute('data-q'));
        E.cart.set(items); render();
        var again = $('[data-q="' + q.getAttribute('data-q') + '"][data-i="' + i + '"]'); if (again) again.focus();
        return;
      }
      var rm = e.target.closest('[data-rm]');
      if (rm) {   /* ux-bekr-ta-bort: fråga först */
        rmIndex = +rm.getAttribute('data-rm');
        $('[data-rm-name]').textContent = E.cart.items()[rmIndex].name;
        E.openDialog($('#tabort'), rm);
        return;
      }
      var go = e.target.closest('[data-go]');
      if (go && go.getAttribute('aria-disabled') === 'true') {
        e.preventDefault();
        if (!order.date) $('[data-datefield]').focus(); else $('input[name=leverans]').focus();
      }
    });
    $('[data-rm-confirm]').addEventListener('click', function () {
      var items = E.cart.items(), gone = items.splice(rmIndex, 1)[0];
      E.cart.set(items);
      var d = $('#tabort'); d._opener = null; E.closeDialog(d);
      render();
      E.toast(gone.name + ' är borttagen ur varukorgen.');
      var next = $('.ek-remove') || $('[data-cart-empty] .ev-btn'); if (next) next.focus();
    });
    cartPage.addEventListener('change', function (e) {
      if (e.target.name === 'leverans') { order.deliv = e.target.value; E.save('order', order); render(); }
    });

    /* Kalender: fält som öppnar en kalender (ux-val-dag) */
    var HOL = ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-01', '2027-01-06'];
    var FIRST = new Date('2026-12-01T12:00:00'), LAST = new Date('2027-02-26T12:00:00');
    var view = order.date ? new Date(order.date.slice(0, 7) + '-01T12:00:00') : new Date(FIRST);
    function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    function available(d) { var w = d.getDay(); return w >= 2 && w <= 5 && d >= FIRST && d <= LAST && HOL.indexOf(iso(d)) < 0; }
    function cal() {
      var y = view.getFullYear(), m = view.getMonth();
      $('[data-cal-month]').textContent = cap(MONTHS[m]) + ' ' + y;
      var first = new Date(y, m, 1, 12), lead = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
      var html = ['mån', 'tis', 'ons', 'tor', 'fre', 'lör', 'sön'].map(function (d, i) { return '<abbr title="' + ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'][i] + '">' + d + '</abbr>'; }).join('');
      for (var i = 0; i < lead; i++) html += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var dt = new Date(y, m, d, 12), ok = available(dt), id = iso(dt);
        html += '<button type="button" data-day="' + id + '" aria-label="' + dateText(id) + (ok ? '' : ', inte ledig') + '"' + (ok ? '' : ' disabled') + ' aria-pressed="' + (order.date === id) + '">' + d + '</button>';
      }
      $('[data-cal-grid]').innerHTML = html;
      var prev = $('[data-cal-prev]'), next = $('[data-cal-next]');
      var atStart = y === FIRST.getFullYear() && m === FIRST.getMonth(), atEnd = y === LAST.getFullYear() && m === LAST.getMonth();
      atStart ? prev.setAttribute('aria-disabled', 'true') : prev.removeAttribute('aria-disabled');
      atEnd ? next.setAttribute('aria-disabled', 'true') : next.removeAttribute('aria-disabled');
    }
    $('[data-datefield]').addEventListener('click', function () {
      cal();
      setTimeout(function () { var t = $('[data-cal-grid] [aria-pressed="true"]') || $('[data-cal-grid] button:not(:disabled)'); if (t) t.focus(); }, 30);
    });
    $('#kalender').addEventListener('click', function (e) {
      var p = e.target.closest('[data-cal-prev]'), n = e.target.closest('[data-cal-next]'), day = e.target.closest('[data-day]');
      if (p && p.getAttribute('aria-disabled') !== 'true') { view.setMonth(view.getMonth() - 1); cal(); }
      if (n && n.getAttribute('aria-disabled') !== 'true') { view.setMonth(view.getMonth() + 1); cal(); }
      if (day) { order.date = day.getAttribute('data-day'); E.save('order', order); E.closeDialog($('#kalender')); render(); }
    });
    render();
  })();

  /* ===================================================================== Kassa */
  var steps = $$('[data-step]');
  if (steps.length) (function () {
    var order = E.load('order', {}), items = E.cart.items(), sum = itemsTotal(items);
    var promo = 0;
    function total() { return sum + (order.deliv ? delivPrice(order.deliv, sum) : 0) - promo; }
    function fillSummary() {
      $('[data-k-lines]').innerHTML = items.map(function (it) {
        var p = byId(it.id) || {};
        return '<li>' + (p.thumb || '') + '<span>' + esc(it.name) + (it.qty > 1 ? ' × ' + it.qty : '') + '<br><span class="ev-hint">' + esc(it.variant || '') + '</span></span><span class="ev-price">' + kr(it.price * it.qty) + '</span></li>';
      }).join('') || '<li><span></span><span class="ev-hint">Varukorgen är tom.</span></li>';
      var dp = order.deliv ? delivPrice(order.deliv, sum) : 0;
      $('[data-k-date]').textContent = order.date ? dateText(order.date) : 'Inte vald';
      $('[data-k-deliv]').innerHTML = order.deliv ? DELIV[order.deliv] + ', ' + (dp ? kr(dp) : 'fri') : 'Inte vald';
      $('[data-k-total]').innerHTML = kr(total());
      $('[data-k-vat]').innerHTML = kr(total() * 0.2);
      $('[data-k-promo-row]').hidden = !promo; $('[data-k-promo]').innerHTML = '−' + kr(promo);
    }
    function show(n, push) {
      steps.forEach(function (s) { s.hidden = s.getAttribute('data-step') !== String(n); });
      if (n === 4) review();
      var h = $('[data-step="' + n + '"] h1'); h.focus({ preventScroll: true });
      window.scrollTo(0, 0);
      if (push) history.pushState({ steg: n }, '', '?steg=' + n);
    }
    window.addEventListener('popstate', function (e) { show((e.state && e.state.steg) || 1, false); });
    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]');
      if (g) { e.preventDefault(); show(+g.getAttribute('data-goto'), true); }
      var a = e.target.closest('[data-account]');
      if (a) {   /* ux-flode-auto-vidare + ux-exempel-forifyllt */
        if (a.getAttribute('data-account') === 'konto') {
          $('#epost').value = 'maria.lind@exempel.se'; $('#namn').value = 'Maria Lind'; $('#mobil').value = '070-123 45 67';
          $('[data-prefilled-note]').textContent = 'Vi har fyllt i uppgifterna från ditt konto. Ändra dem om något har ändrats.';
        }
        show(2, true);
      }
    });
    $$('form[data-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!E.validate(f)) return;
        var n = +f.getAttribute('data-form');
        if (n < 4) { show(n + 1, true); return; }
        var o = { nr: 'EK-' + (48000 + Math.floor(Math.random() * 999)), mail: $('#epost').value, date: order.date, deliv: order.deliv, addr: $('#adress').value, total: total() };
        E.save('last', o); E.cart.set([]); E.save('order', {});
        location.href = 'bekraftelse.html';
      });
    });
    function review() {
      var dp = order.deliv ? delivPrice(order.deliv, sum) : 0;
      $('[data-r-date]').textContent = order.date ? dateText(order.date) : 'Inte vald';
      $('[data-r-deliv]').innerHTML = order.deliv ? DELIV[order.deliv] + ', ' + (dp ? kr(dp) : 'fri') : 'Inte vald';
      $('[data-r-contact]').innerHTML = $('#namn').value ? esc($('#namn').value) + '<br>' + esc($('#epost').value) + ', ' + esc($('#mobil').value) : 'Inte ifyllt';
      $('[data-r-addr]').innerHTML = $('#adress').value ? esc($('#adress').value) + ($('#vaning').value ? '<br>' + esc($('#vaning').value) : '') : 'Inte ifylld';
      $('[data-r-monthly]').innerHTML = kr(Math.ceil(total() / 12) + 29);
    }
    /* Betalsätt: ett öppet, resten hopfällda (ux-kassa-betalsatt) */
    document.addEventListener('change', function (e) {
      if (e.target.name === 'betal') $$('[data-paybody]').forEach(function (r) { document.getElementById(r.getAttribute('data-paybody')).hidden = !r.checked; });
    });
    $('[data-promo]').addEventListener('click', function () {
      var v = $('#rabatt').value.trim().toUpperCase(), msg = $('[data-promo-msg]');
      if (v === 'VINTER26') { promo = 500; msg.textContent = 'Koden gäller. Du får 500 kr rabatt.'; msg.style.color = 'var(--ev-ok)'; }
      else { promo = 0; msg.textContent = 'Vi hittar inte koden. Kontrollera stavningen och försök igen.'; msg.style.color = 'var(--ev-bad)'; }
      fillSummary(); review();
    });
    /* Adress: ett fält med förslag (ux-kassa-adress) */
    var ADDR = ['Storgatan 12, 573 31 Tranås', 'Storgatan 41, 573 32 Tranås', 'Stora Torget 3, 553 20 Jönköping', 'Storgatan 8, 582 23 Linköping', 'Sveavägen 44, 111 34 Stockholm', 'Södra Vägen 21, 412 54 Göteborg', 'Stortorget 9, 211 22 Malmö', 'Åsgatan 5, 573 33 Tranås'];
    var inp = $('#adress'), lb = $('#adresslista'), act = -1;
    function suggest() {
      var q = inp.value.trim().toLowerCase();
      var hits = q.length < 2 ? [] : ADDR.filter(function (a) { return a.toLowerCase().split(/[\s,]+/).some(function (w) { return w.indexOf(q.split(' ')[0]) === 0; }) && a.toLowerCase().indexOf(q.split(' ').slice(1).join(' ')) > -1; }).slice(0, 5);
      act = -1;
      lb.innerHTML = hits.map(function (a, i) { return '<li role="option" id="adr-' + i + '" aria-selected="false">' + PIN + esc(a) + '</li>'; }).join('');
      lb.hidden = !hits.length; inp.setAttribute('aria-expanded', hits.length ? 'true' : 'false');
      inp.removeAttribute('aria-activedescendant');
    }
    function pick(li) { inp.value = li.textContent; lb.hidden = true; inp.setAttribute('aria-expanded', 'false'); E.check(inp); }
    inp.addEventListener('input', suggest);
    inp.addEventListener('keydown', function (e) {
      var opts = $$('li', lb); if (lb.hidden || !opts.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
        opts.forEach(function (o, i) { o.setAttribute('aria-selected', i === act ? 'true' : 'false'); });
        inp.setAttribute('aria-activedescendant', opts[act].id);
      } else if (e.key === 'Enter' && act > -1) { e.preventDefault(); pick(opts[act]); }
      else if (e.key === 'Escape') { lb.hidden = true; inp.setAttribute('aria-expanded', 'false'); }
    });
    lb.addEventListener('mousedown', function (e) { var li = e.target.closest('li'); if (li) { e.preventDefault(); pick(li); } });
    inp.addEventListener('blur', function () { setTimeout(function () { lb.hidden = true; inp.setAttribute('aria-expanded', 'false'); }, 120); });

    fillSummary();
    var start = +(param('steg') || 1);
    history.replaceState({ steg: start }, '', start > 1 ? '?steg=' + start : location.pathname);
    steps.forEach(function (s) { s.hidden = s.getAttribute('data-step') !== String(start); });
    if (start === 4) review();
  })();

  /* ===================================================================== Bekräftelse */
  var done = $('[data-o-nr]');
  if (done) (function () {
    var o = E.load('last', null);
    if (o) {
      done.textContent = o.nr;
      $('[data-o-mail]').textContent = o.mail || 'din e-post';
      $('[data-o-date]').textContent = o.date ? dateText(o.date) : 'Vi kontaktar dig';
      $('[data-o-deliv]').textContent = o.deliv ? DELIV[o.deliv] : '–';
      $('[data-o-addr]').textContent = o.addr || '–';
      $('[data-o-total]').innerHTML = kr(o.total);
    }
    $('#klar-rubrik').focus({ preventScroll: true });
    var mk = $('[data-make-account]');
    mk.addEventListener('click', function () {   /* ux-notis-typ: knappen blir "Sparat ✓" */
      mk.classList.add('is-saved');
      mk.innerHTML = '<span>Sparat</span><svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
      E.toast('Kontot är skapat. Vi har skickat en inloggningslänk till din e-post.');
    });
  })();
})();

/* Hero (ny): "shop the look"-punkter. Klick växlar kortet, Esc stänger, ett kort i taget. */
(function () {
  'use strict';
  var spots = Array.prototype.slice.call(document.querySelectorAll('.ek-spot'));
  if (!spots.length) return;
  function setOpen(spot, on) {
    spot.classList.toggle('is-open', on);
    spot.querySelector('.ek-spot__btn').setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  function closeAll(except) { spots.forEach(function (s) { if (s !== except) setOpen(s, false); }); }
  spots.forEach(function (spot) {
    var btn = spot.querySelector('.ek-spot__btn');
    btn.addEventListener('click', function () {
      var on = !spot.classList.contains('is-open');
      closeAll(spot); setOpen(spot, on);
      spot.classList.remove('is-dismissed');
    });
    spot.addEventListener('mouseleave', function () { spot.classList.remove('is-dismissed'); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.ek-spot')) closeAll(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = spots.filter(function (s) { return s.classList.contains('is-open') || s.matches(':hover'); });
    open.forEach(function (s) {
      var hadFocus = s.contains(document.activeElement);
      setOpen(s, false); s.classList.add('is-dismissed');
      if (hadFocus) s.querySelector('.ek-spot__btn').focus();
    });
  });
  /* På dator visas ett kort från början, så att man ser att punkterna går att använda */
  if (window.matchMedia('(min-width: 900px)').matches) {
    var first = document.querySelector('.ek-spot[data-start]') || spots[spots.length - 1];
    setOpen(first, true);
  }
})();
