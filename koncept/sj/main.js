/* SJ – designkoncept av Elevate Studio. Inte SJ:s officiella webbplats.
   Meny, bokningsflöde (native <dialog>), fast list på desktop, filter och vanliga frågor.
   Avgångar, restider och priser i bokningsflödet är EXEMPEL och märks så i gränssnittet. */
(function () {
  "use strict";

  var BRAND = document.documentElement.getAttribute("data-brand") || "SJ";
  var BRAND_URL = document.documentElement.getAttribute("data-brand-url") || "#";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function icon(name, cls) {
    return '<svg class="ev-icon' + (cls ? " " + cls : "") + '" aria-hidden="true" viewBox="0 0 24 24"><use href="#i-' + name + '"/></svg>';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function kr(n) { return Math.round(n).toLocaleString("sv-SE") + " kr"; }

  /* ---------- Mobilmeny (panel i helskärm) ---------- */
  (function menu() {
    var btn = document.querySelector(".ev-menu-toggle");
    var panel = document.getElementById("mobilmeny");
    if (!btn || !panel) return;
    function set(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Stäng menyn" : "Öppna menyn");
      panel.hidden = !open;
      document.body.classList.toggle("ev-menu-open", open);
      if (open) { var first = panel.querySelector("a"); if (first) first.focus(); }
    }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
    });
    panel.addEventListener("click", function (e) { if (e.target.closest("[data-open-booking]")) set(false); });
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function (m) { if (m.matches) set(false); });
  })();

  /* ---------- Stationer och exempeldata ---------- */
  var STATIONS = [
    ["Stockholm C", "Stockholm"], ["Göteborg C", "Göteborg"], ["Malmö C", "Malmö"], ["Oslo S", "Norge"],
    ["Köpenhamn H", "Danmark, byte i Malmö eller Lund"], ["Åre", "Jämtland"], ["Duved", "Jämtland"], ["Östersund C", "Jämtland"],
    ["Sundsvall C", "Västernorrland"], ["Umeå C", "Västerbotten"], ["Luleå C", "Norrbotten"], ["Kiruna C", "Norrbotten"],
    ["Abisko Östra", "Norrbotten"], ["Narvik", "Norge"], ["Mora", "Dalarna, buss vidare till Sälen"], ["Karlstad C", "Värmland"],
    ["Västerås C", "Västmanland"], ["Linköping C", "Östergötland"], ["Gävle C", "Gävleborg"], ["Lund C", "Skåne"],
    ["Hamburg Hbf", "Tyskland, SJ EuroNight"], ["Berlin Hbf", "Tyskland, SJ EuroNight"]
  ];
  var NAMES = STATIONS.map(function (s) { return s[0]; });
  var NIGHT = ["Narvik", "Abisko Östra", "Kiruna C", "Luleå C"];
  var EURONIGHT = ["Hamburg Hbf", "Berlin Hbf"];

  /* Kända uppgifter ur FAKTA.md (restider och särskilda avgångar). Allt annat är exempel. */
  var KNOWN = {
    "Stockholm C|Göteborg C": { durs: [181, 195, 190, 205, 199], fact: "Snabbaste avgången tar cirka 3 h 01 min. Restiden är cirka 3–3,5 timmar med snabbtåg." },
    "Stockholm C|Malmö C": { durs: [268, 275, 282, 270, 290], fact: "Restiden är cirka 4,5 timmar." },
    "Göteborg C|Malmö C": { durs: [138, 138, 145, 140, 150], fact: "Snabbaste restiden är 2 h 18 min." },
    "Stockholm C|Oslo S": { durs: [320, 335, 345, 330, 350], times: ["06.15", "08.40", "11.20", "14.35", "17.10"], fact: "Det går 5 avgångar per riktning på vardagar, 3 på lördagar och 4 på söndagar. Restiden är cirka 5–6 timmar." },
    "Stockholm C|Åre": { fixed: [["16.50", "23.21", "SJ Snabbtåg"]], fact: "Snabbtåget går dagligen 16.50 och är framme i Åre 23.21. Det är SJ:s egna tider." },
    "Stockholm C|Östersund C": { fixed: [["16.50", "22.05", "SJ Snabbtåg"]], fact: "Snabbtåget går dagligen 16.50 och är framme i Östersund 22.05. Det är SJ:s egna tider." },
    "Stockholm C|Mora": { fixed: [["09.44", "13.31", "SJ Snabbtåg"]], fact: "Söndagar 17 januari–4 april 2027, med anslutningsbuss till Sälen. Från 590 kr enkel enligt SJ." },
    "Stockholm C|Köpenhamn H": { change: "1 byte i Malmö", fact: "Direkttågen är tillfälligt inställda. Du byter till Öresundståg i Malmö eller Lund." },
    "Stockholm C|Narvik": { night: true, fact: "Nattåget går dagligen via Umeå, Luleå, Kiruna och Abisko, med sov- och liggvagn hela vägen. Restiden är cirka 18 timmar." }
  };
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function fmtDur(m) { var h = Math.floor(m / 60), mm = m % 60; return h + " h " + (mm < 10 ? "0" : "") + mm + " min"; }
  function addMin(t, m) {
    var p = t.split("."), total = (+p[0]) * 60 + (+p[1]) + m, day = Math.floor(total / 1440); total %= 1440;
    var h = Math.floor(total / 60), mm = total % 60;
    return (h < 10 ? "0" : "") + h + "." + (mm < 10 ? "0" : "") + mm + (day ? " +" + day : "");
  }
  function departures(from, to) {
    var key = from + "|" + to, rev = to + "|" + from;
    var k = KNOWN[key] || KNOWN[rev] || null;
    /* Fasta tider (Åre, Östersund, Mora) gäller bara i den riktning SJ angett. Åt andra hållet: samma restid, exempeltider. */
    if (k && k.fixed && !KNOWN[key]) {
      var f0 = k.fixed[0], a = f0[0].split("."), b = f0[1].split(".");
      k = { durs: [(+b[0] * 60 + +b[1]) - (+a[0] * 60 + +a[1])], times: ["07.05", "11.40"], fact: null };
    }
    var seed = hash([from, to].sort().join("|"));
    var isNight = NIGHT.indexOf(to) > -1 || NIGHT.indexOf(from) > -1;
    var isEN = EURONIGHT.indexOf(to) > -1 || EURONIGHT.indexOf(from) > -1;
    var type = isEN ? "SJ EuroNight" : isNight ? "SJ Nattåg" : (/Västerås|Linköping|Gävle/.test(from + to) ? "SJ Regional" : "SJ Snabbtåg");
    var list = [];
    if (k && k.fixed && KNOWN[key]) {
      k.fixed.forEach(function (f) {
        var p1 = f[0].split("."), p2 = f[1].split(".");
        list.push({ dep: f[0], arr: f[1], dur: (+p2[0] * 60 + +p2[1]) - (+p1[0] * 60 + +p1[1]), type: f[2], change: "Inga byten", known: true });
      });
    } else if (isNight || isEN || (k && k.night)) {
      var base = isEN ? 900 + seed % 120 : (k && k.night ? 1080 : 600 + seed % 300);
      ["17.45", "19.10"].slice(0, isEN ? 1 : 2).forEach(function (t, i) {
        list.push({ dep: t, arr: addMin(t, base + i * 25), dur: base + i * 25, type: type, change: "Inga byten" });
      });
    } else {
      var times = (k && k.times) || ["06.10", "07.25", "09.10", "12.40", "15.10", "17.25"];
      var baseDur = 90 + seed % 260;
      times.forEach(function (t, i) {
        var d = k && k.durs ? k.durs[i % k.durs.length] : baseDur + ((seed >> i) % 4) * 9;
        list.push({ dep: t, arr: addMin(t, d), dur: d, type: type, change: (k && k.change) || "Inga byten" });
      });
    }
    list.forEach(function (d, i) {
      var p = 195 + Math.round(d.dur * 1.15 / 5) * 5 + ((seed >> (i + 2)) % 5) * 40;
      d.price = (k && /590 kr/.test(k.fact || "") && KNOWN[key]) ? 590 : p;
    });
    return { list: list, fact: k ? k.fact : null };
  }

  /* ---------- Bokningsdialog ---------- */
  var STEP_NAMES = ["Från", "Till", "Datum", "Avgång", "Bekräfta"];
  var TRAVELLERS = [
    ["vuxen", "Vuxen", "", 0], ["barn", "Barn", "0–15 år, 15 % rabatt i 2 klass", .15],
    ["ungdom", "Ungdom eller student", "Upp till 25 år, 15 % rabatt i 2 klass", .15], ["pensionar", "Pensionär", "10 % rabatt i 2 klass", .10]
  ];

  function stationStep(id, n, title, hint) {
    return '<section class="bk__step" data-step="' + n + '" hidden aria-labelledby="bk-h' + n + '">' +
      (n > 1 ? backLink() : "") +
      '<h2 id="bk-h' + n + '" tabindex="-1">' + title + '</h2>' +
      '<p class="bk__hint">' + hint + '</p>' +
      (n === 1 ? '<p class="bk__time">' + icon("clock") + 'Fem korta steg, tar ungefär en minut.</p>' : "") +
      '<div class="bk__content">' +
      '<div class="ev-field"><label class="ev-label" for="bk-q' + n + '">Station</label>' +
      '<div class="ev-field__wrap">' + icon("search") +
      '<input class="ev-input ev-input--icon" id="bk-q' + n + '" type="search" autocomplete="off" placeholder="Till exempel Göteborg" aria-describedby="bk-c' + n + '" data-filter="' + id + '"></div></div>' +
      '<p class="ev-sr" id="bk-c' + n + '" aria-live="polite"></p>' +
      '<ul class="bk__list" data-list="' + id + '"></ul>' +
      '</div>' + foot(n, false) + '</section>';
  }
  function backLink() {
    return '<button type="button" class="ev-link ev-link--back bk__back" data-back>' + icon("arrow-left", "ev-link__arrow") + 'Tillbaka</button>';
  }
  function foot(n, button) {
    var dots = "", items = "";
    for (var i = 1; i <= 5; i++) {
      dots += '<i' + (i === n ? ' class="is-on"' : "") + '></i>';
      items += '<li' + (i === n ? ' aria-current="step"' : "") + '>' + STEP_NAMES[i - 1] + '</li>';
    }
    return '<div class="bk__foot">' + (button || "") +
      '<div class="ev-steps"><p class="ev-steps__count">Steg ' + n + ' av 5</p>' +
      '<ol class="ev-steps__list" aria-label="Steg i bokningen">' + items + '</ol>' +
      '<span class="ev-steps__dots" aria-hidden="true">' + dots + '</span></div></div>';
  }
  function buildDialog() {
    var today = new Date(); var iso = today.toISOString().slice(0, 10);
    var trav = TRAVELLERS.map(function (t) {
      return '<li><div><span id="bk-t-' + t[0] + '">' + t[1] + '</span>' + (t[2] ? '<small>' + t[2] + '</small>' : "") + '</div>' +
        '<div class="ev-qty" data-qty="' + t[0] + '">' +
        '<button type="button" data-dec aria-label="Färre, ' + t[1].toLowerCase() + '">' + icon("minus") + '</button>' +
        '<output aria-live="polite" aria-labelledby="bk-t-' + t[0] + '">0</output>' +
        '<button type="button" data-inc aria-label="Fler, ' + t[1].toLowerCase() + '">' + icon("plus") + '</button></div></li>';
    }).join("");
    var arrowBtn = function (txt, attr) { return '<button type="button" class="ev-btn ev-btn--block" ' + attr + '><span>' + txt + '</span>' + icon("arrow", "ev-btn__arrow") + '</button>'; };

    var html =
      '<dialog class="bk" id="boka" aria-labelledby="bk-title">' +
      '<div class="bk__layout"><div class="bk__main">' +
      '<div class="bk__top"><p class="bk__brand" id="bk-title">Sök resa<span class="ev-sr"> med ' + esc(BRAND) + '</span></p></div>' +
      '<button type="button" class="bk__close" data-close aria-label="Avbryt bokningen">' + icon("close") + '</button>' +
      stationStep("from", 1, "Varifrån reser du?", "Välj en station så går du vidare.") +
      stationStep("to", 2, "Vart vill du åka?", "Välj en station så går du vidare.") +
      '<section class="bk__step" data-step="3" hidden aria-labelledby="bk-h3">' + backLink() +
      '<h2 id="bk-h3" tabindex="-1">När och hur många?</h2>' +
      '<p class="bk__hint">Biljetter är oftast billigast när de precis har släppts.</p>' +
      '<form class="bk__content bk__fields" id="bk-form3" novalidate>' +
      '<div class="ev-field"><label class="ev-label" for="bk-date">Datum</label>' +
      '<input class="ev-input" id="bk-date" type="date" min="' + iso + '" value="' + iso + '" required aria-describedby="bk-date-err">' +
      '<p class="ev-error" id="bk-date-err" hidden>' + icon("error") + '<span>Välj ett datum från och med i dag.</span></p></div>' +
      '<fieldset class="bk__fs"><legend class="ev-label">Resenärer</legend><ul class="bk__travellers">' + trav + '</ul>' +
      '<p class="ev-error" id="bk-trav-err" hidden>' + icon("error") + '<span></span></p></fieldset>' +
      foot(3, '<button type="submit" class="ev-btn ev-btn--block"><span>Visa avgångar</span>' + icon("arrow", "ev-btn__arrow") + '</button>') +
      '</form></section>' +
      '<section class="bk__step" data-step="4" hidden aria-labelledby="bk-h4">' + backLink() +
      '<h2 id="bk-h4" tabindex="-1">Välj avgång</h2>' +
      '<p class="bk__hint">Välj en avgång så går du vidare.</p>' +
      '<div class="bk__notice" role="note">' + icon("warning") + '<p>Avgångar och priser i konceptet är exempel.</p></div>' +
      '<div data-fact></div>' +
      '<ul class="bk__deps" data-deps></ul>' + foot(4, false) + '</section>' +
      '<section class="bk__step" data-step="5" hidden aria-labelledby="bk-h5">' + backLink() +
      '<h2 id="bk-h5" tabindex="-1">Stämmer det här?</h2>' +
      '<p class="bk__hint">Kontrollera resan innan du går vidare till betalning.</p>' +
      '<div class="bk__content"><dl class="bk__review" data-review></dl>' +
      '<p class="bk__total"><span>Totalt <span class="ev-tag ev-tag--example">Exempel</span></span><span data-total class="ev-num"></span></p></div>' +
      foot(5, arrowBtn("Gå till betalning", "data-pay")) + '</section>' +
      '<section class="bk__step bk__done" data-step="6" hidden aria-labelledby="bk-h6">' +
      '<svg class="ev-icon bk__done-icon" aria-hidden="true" viewBox="0 0 24 24"><path vector-effect="non-scaling-stroke" d="M5 12.5l4.5 4.5L19 7.5"/></svg>' +
      '<h2 id="bk-h6" tabindex="-1">Resan är redo för betalning</h2>' +
      '<p>Här slutar konceptet. Ingen biljett är bokad och inga pengar dras. I skarp drift kommer betalningen i det här steget.</p>' +
      '<div class="ev-actions"><a class="ev-btn ev-btn--ext" href="' + esc(BRAND_URL) + '" target="_blank" rel="noopener"><span>Boka på sj.se</span>' + icon("arrow-diag", "ev-btn__arrow") + '<span class="ev-sr">(öppnas i ny flik)</span></a></div>' +
      '</section>' +
      '</div>' +
      '<aside class="bk__summary" aria-labelledby="bk-sum-h"><h2 id="bk-sum-h">Din resa</h2><dl data-summary></dl>' +
      '<span class="ev-tag ev-tag--example" data-sum-tag hidden>Avgång och pris är exempel</span>' +
      '<p>Ingen biljett bokas i det här konceptet.</p></aside>' +
      '</div></dialog>';
    document.body.insertAdjacentHTML("beforeend", html);
    return document.getElementById("boka");
  }

  var dialog = buildDialog();
  var state, opener = null, current = 1;
  function reset() {
    state = { from: null, to: null, date: null, trav: { vuxen: 1, barn: 0, ungdom: 0, pensionar: 0 }, dep: null, toQuery: "" };
  }
  reset();

  function renderList(id) {
    var input = dialog.querySelector('[data-filter="' + id + '"]');
    var ul = dialog.querySelector('[data-list="' + id + '"]');
    var count = input.getAttribute("aria-describedby");
    var q = input.value.trim().toLowerCase();
    var exclude = id === "from" ? state.to : state.from;
    var items = STATIONS.filter(function (s) {
      if (s[0] === exclude) return false;
      if (!q) return true;
      return s[0].toLowerCase().indexOf(q) > -1 || s[1].toLowerCase().indexOf(q) > -1;
    });
    ul.innerHTML = items.map(function (s) {
      return '<li><button type="button" class="ev-choice" data-pick="' + id + '" value="' + esc(s[0]) + '"><span>' + esc(s[0]) +
        '<small>' + esc(s[1]) + '</small></span>' + icon("arrow") + '</button></li>';
    }).join("") || '<li class="bk__none">Ingen station matchar ”' + esc(input.value) + '”. Skriv början av namnet, till exempel Göt för Göteborg.</li>';
    document.getElementById(count).textContent = items.length + (items.length === 1 ? " station" : " stationer");
  }
  ["from", "to"].forEach(function (id) {
    dialog.querySelector('[data-filter="' + id + '"]').addEventListener("input", function () { renderList(id); });
  });
  dialog.addEventListener("click", function (e) {
    var pick = e.target.closest("[data-pick]");
    if (pick) {
      state[pick.getAttribute("data-pick")] = pick.value;
      state.dep = null;
      if (pick.getAttribute("data-pick") === "from") go(state.to ? 3 : 2); else go(3);
      return;
    }
    var dep = e.target.closest("[data-dep]");
    if (dep) { state.dep = currentDeps.list[+dep.getAttribute("data-dep")]; go(5); return; }
    if (e.target.closest("[data-back]")) { go(prevStep()); return; }
    var ed = e.target.closest("[data-edit]");
    if (ed) { go(+ed.getAttribute("data-edit")); return; }
    if (e.target.closest("[data-pay]")) { go(6); return; }
    if (e.target.closest("[data-close]")) { dialog.close(); return; }
    if (e.target === dialog) dialog.close();
  });
  function prevStep() {
    if (current === 3 && state.to && !visited2) return 1;
    return Math.max(1, current - 1);
  }
  var visited2 = false;

  /* Resenärer */
  function totalTrav() { var t = state.trav; return t.vuxen + t.barn + t.ungdom + t.pensionar; }
  function renderQty() {
    dialog.querySelectorAll("[data-qty]").forEach(function (q) {
      var k = q.getAttribute("data-qty"), v = state.trav[k];
      q.querySelector("output").textContent = v;
      var dec = q.querySelector("[data-dec]");
      var min = (totalTrav() <= 1 && v > 0) ? v : 0;
      dec.setAttribute("aria-disabled", String(v <= min));
      q.querySelector("[data-inc]").setAttribute("aria-disabled", String(totalTrav() >= 9));
    });
  }
  dialog.querySelectorAll("[data-qty]").forEach(function (q) {
    var k = q.getAttribute("data-qty");
    q.querySelector("[data-dec]").addEventListener("click", function () {
      if (this.getAttribute("aria-disabled") === "true") return;
      state.trav[k]--; renderQty(); renderSummary(); validateTrav(false);
    });
    q.querySelector("[data-inc]").addEventListener("click", function () {
      if (this.getAttribute("aria-disabled") === "true") return;
      state.trav[k]++; renderQty(); renderSummary(); validateTrav(false);
    });
  });
  function travText() {
    var t = state.trav, parts = [];
    if (t.vuxen) parts.push(t.vuxen + (t.vuxen === 1 ? " vuxen" : " vuxna"));
    if (t.barn) parts.push(t.barn + " barn");
    if (t.ungdom) parts.push(t.ungdom + (t.ungdom === 1 ? " ungdom eller student" : " ungdomar eller studenter"));
    if (t.pensionar) parts.push(t.pensionar + (t.pensionar === 1 ? " pensionär" : " pensionärer"));
    return parts.join(", ");
  }
  var dateInput = dialog.querySelector("#bk-date");
  var dateErr = dialog.querySelector("#bk-date-err");
  function validateDate() {
    var ok = dateInput.value && dateInput.value >= dateInput.min;
    dateErr.hidden = !!ok;
    dateInput.setAttribute("aria-invalid", String(!ok));
    if (ok) state.date = dateInput.value;
    return !!ok;
  }
  dateInput.addEventListener("blur", validateDate);
  dateInput.addEventListener("change", function () { if (validateDate()) renderSummary(); });
  var travErr = dialog.querySelector("#bk-trav-err");
  function validateTrav(show) {
    var t = state.trav, msg = "";
    if (t.vuxen + t.ungdom + t.pensionar === 0 && t.barn > 0) msg = "Lägg till en vuxen. Barn till och med 6 år får inte resa ensamma.";
    if (msg && show !== false) { travErr.querySelector("span").textContent = msg; travErr.hidden = false; }
    else if (!msg) travErr.hidden = true;
    return !msg;
  }
  dialog.querySelector("#bk-form3").addEventListener("submit", function (e) {
    e.preventDefault();
    var a = validateDate(), b = validateTrav(true);
    if (!a) { dateInput.focus(); return; }
    if (!b) { dialog.querySelector('[data-qty="vuxen"] [data-inc]').focus(); return; }
    go(4);
  });

  /* Avgångar */
  var currentDeps = { list: [] };
  function factor() {
    var t = state.trav, sum = 0;
    TRAVELLERS.forEach(function (tr) { sum += t[tr[0]] * (1 - tr[3]); });
    return sum;
  }
  function renderDeps() {
    currentDeps = departures(state.from, state.to);
    var f = dialog.querySelector("[data-fact]");
    f.innerHTML = currentDeps.fact ? '<div class="bk__notice bk__notice--info">' + icon("info") + '<p><strong>Från SJ:</strong> ' + esc(currentDeps.fact) + '</p></div>' : "";
    dialog.querySelector("[data-deps]").innerHTML = currentDeps.list.map(function (d, i) {
      var label = d.dep + " till " + d.arr + ", " + fmtDur(d.dur) + ", " + d.type + ", " + d.change + ", " + kr(d.price) + " per vuxen, exempel";
      return '<li><button type="button" class="bk__dep" data-dep="' + i + '" aria-label="' + esc(label) + '">' +
        '<span class="bk__dep-times">' + d.dep + icon("arrow") + d.arr + '</span>' +
        '<span class="bk__dep-price"><span>' + kr(d.price) + '<small>per vuxen, exempel</small></span>' + icon("arrow") + '</span>' +
        '<span class="ev-meta"><span>' + icon("clock") + fmtDur(d.dur) + '</span><span>' + icon("train") + d.type + '</span><span>' + d.change + '</span></span>' +
        '</button></li>';
    }).join("");
  }

  /* Sammanfattning */
  function dateText(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T12:00:00");
    var s = d.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function renderSummary() {
    var rows = [
      ["Från", state.from], ["Till", state.to], ["Datum", dateText(state.date)], ["Resenärer", travText()],
      ["Avgång", state.dep ? { html: state.dep.dep + icon("arrow", "ev-icon--16") + state.dep.arr + ", " + state.dep.type } : ""]
    ];
    if (state.dep) rows.push(["Pris", kr(state.dep.price * factor()) + " (exempel)"]);
    dialog.querySelector("[data-summary]").innerHTML = rows.map(function (r) {
      var v = r[1] && r[1].html ? r[1].html : esc(r[1] || "Inte valt än");
      return '<div><dt>' + r[0] + '</dt><dd' + (r[1] ? "" : ' class="is-empty"') + '>' + v + '</dd></div>';
    }).join("");
    dialog.querySelector("[data-sum-tag]").hidden = !state.dep;
  }
  function renderReview() {
    var rows = [
      ["Från", state.from, 1], ["Till", state.to, 2], ["Datum", dateText(state.date), 3], ["Resenärer", travText(), 3],
      ["Avgång", { html: state.dep.dep + icon("arrow", "ev-icon--16") + state.dep.arr + ", " + fmtDur(state.dep.dur) + ", " + state.dep.type + ", 2 klass" }, 4]
    ];
    dialog.querySelector("[data-review]").innerHTML = rows.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + (r[1].html || esc(r[1])) + '</dd><button type="button" class="ev-link" data-edit="' + r[2] + '">Ändra<span class="ev-sr"> ' + r[0].toLowerCase() + '</span></button></div>';
    }).join("");
    dialog.querySelector("[data-total]").textContent = kr(state.dep.price * factor());
  }

  function go(n) {
    if (n === 2) visited2 = true;
    if (n === 4 && (!state.from || !state.to)) n = state.from ? 2 : 1;
    if (n === 5 && !state.dep) n = 4;
    current = n;
    if (n === 1 || n === 2) { var id = n === 1 ? "from" : "to"; renderList(id); }
    if (n === 2 && state.toQuery) { dialog.querySelector('[data-filter="to"]').value = state.toQuery; renderList("to"); state.toQuery = ""; }
    if (n === 3) { renderQty(); }
    if (n === 4) renderDeps();
    if (n === 5) renderReview();
    dialog.querySelectorAll(".bk__step").forEach(function (s) { s.hidden = +s.getAttribute("data-step") !== n; });
    dialog.querySelector(".bk__summary").hidden = n === 6;
    renderSummary();
    var main = dialog.querySelector(".bk__main"), layout = dialog.querySelector(".bk__layout");
    main.scrollTop = 0; layout.scrollTop = 0;
    var h = dialog.querySelector("#bk-h" + n);
    if (h) h.focus({ preventScroll: true });
  }

  function openBooking(opts, trigger) {
    opener = trigger || document.activeElement;
    reset(); visited2 = false;
    dialog.querySelectorAll("[data-filter]").forEach(function (i) { i.value = ""; });
    dateInput.value = dateInput.min; state.date = dateInput.min; dateErr.hidden = true; dateInput.removeAttribute("aria-invalid"); travErr.hidden = true;
    opts = opts || {};
    if (opts.from && NAMES.indexOf(opts.from) > -1) state.from = opts.from;
    if (opts.to && NAMES.indexOf(opts.to) > -1 && opts.to !== state.from) state.to = opts.to;
    if (opts.query) state.toQuery = opts.query;
    dialog.showModal();
    go(state.from && state.to ? 3 : state.from ? 2 : 1);
  }
  dialog.addEventListener("close", function () {
    if (opener && typeof opener.focus === "function" && document.contains(opener)) opener.focus();
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-booking]");
    if (!t) return;
    e.preventDefault();
    openBooking({ from: t.getAttribute("data-from"), to: t.getAttribute("data-to") }, t);
  });

  /* Sökfältet i heron: matchar resmålet mot en station, annars förs texten vidare till steget Till */
  document.querySelectorAll("[data-hero-search]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = form.querySelector("input").value.trim();
      var lq = q.toLowerCase(), match = null;
      if (lq) STATIONS.forEach(function (s) { if (!match && (s[0].toLowerCase().indexOf(lq) === 0 || s[0].toLowerCase().split(" ")[0] === lq)) match = s[0]; });
      openBooking({ to: match, query: match ? "" : q }, form.querySelector("button"));
    });
  });

  /* ---------- Fast list nertill på desktop (visas när sidans första block har passerats) ---------- */
  (function stickybar() {
    var bar = document.querySelector(".ev-stickybar");
    var hero = document.querySelector(".ev-hero, .ev-pagehero");
    var footer = document.querySelector(".ev-footer");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;
    var heroOut = false, footIn = false;
    function upd() {
      var show = heroOut && !footIn;
      bar.classList.toggle("is-visible", show);
      document.body.classList.toggle("has-stickybar", show);
    }
    new IntersectionObserver(function (en) { heroOut = !en[0].isIntersecting; upd(); }).observe(hero);
    if (footer) new IntersectionObserver(function (en) { footIn = en[0].isIntersecting; upd(); }).observe(footer);
  })();

  /* ---------- Filterchips (resmål och vanliga frågor) ---------- */
  document.querySelectorAll("[data-chips]").forEach(function (group) {
    var target = document.getElementById(group.getAttribute("data-chips"));
    var countEl = document.getElementById(group.getAttribute("data-count"));
    var noun = group.getAttribute("data-noun") || "";
    var items = target.querySelectorAll("[data-cat]");
    var total = items.length;
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".ev-chip");
      if (!chip) return;
      group.querySelectorAll(".ev-chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      var f = chip.getAttribute("data-filter-value"), shown = 0;
      items.forEach(function (it) {
        var ok = f === "alla" || it.getAttribute("data-cat").split(" ").indexOf(f) > -1;
        it.hidden = !ok; if (ok) shown++;
      });
      if (countEl) countEl.textContent = "Visar " + shown + " av " + total + " " + noun;
      // Första synliga frågan öppen (ux-faq-forsta-oppen)
      if (target.classList.contains("ev-faq")) {
        var first = null;
        items.forEach(function (it) { it.open = false; if (!first && !it.hidden) first = it; });
        if (first) first.open = true;
      }
    });
  });

  /* ---------- Vanliga frågor: en öppen i taget (reserv om name-attributet inte stöds) ---------- */
  document.querySelectorAll(".ev-faq").forEach(function (faq) {
    faq.addEventListener("toggle", function (e) {
      if (!e.target.open) return;
      faq.querySelectorAll("details[open]").forEach(function (d) { if (d !== e.target) d.open = false; });
    }, true);
  });

  /* Trafikradens höjd används av heron så att sökfältet syns utan scroll */
  var tr = document.querySelector(".ev-traffic");
  function setTraffic() { document.documentElement.style.setProperty("--ev-traffic-h", (tr ? tr.offsetHeight : 0) + "px"); }
  setTraffic(); window.addEventListener("resize", setTraffic);
  if (reduceMotion) document.documentElement.classList.add("reduce-motion");
})();
