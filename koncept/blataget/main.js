// Designkoncept av Elevate Studio. Ingen riktig bokning.
// Varumärket hämtas från data-brand och data-brand-url på <html>, aldrig hårdkodat här.
(function () {
  "use strict";

  // ---------- Meny på mobil ----------
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("huvudmeny");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  // ---------- Dölj trafikinfo ----------
  document.querySelectorAll("[data-dismiss]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-dismiss"));
      if (el) el.hidden = true;
      var main = document.getElementById("innehall");
      if (main) main.focus();
    });
  });

  var SITE = {
    brand: document.documentElement.getAttribute("data-brand") || "",
    url: document.documentElement.getAttribute("data-brand-url") || ""
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Hero-film: inbäddad från YouTube, stillbild tills den spelar ----------
  (function heroVideo() {
    var hero = document.querySelector(".hero[data-video-id]");
    if (!hero || reduceMotion) return;
    var id = hero.getAttribute("data-video-id");
    var box = hero.querySelector(".hero__video");
    var btn = document.getElementById("video-toggle");
    if (!id || !box || !btn) return;
    var params = "autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&enablejsapi=1";
    if (location.protocol.indexOf("http") === 0) params += "&origin=" + encodeURIComponent(location.origin);
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?" + params;
    iframe.title = "Bakgrundsfilm";
    iframe.setAttribute("tabindex", "-1");
    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("loading", "eager");
    box.appendChild(iframe);

    var playing = false, paused = false;
    function send(func) {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: [] }), "*");
    }
    iframe.addEventListener("load", function () {
      // Be spelaren skicka sina tillstånd hit
      iframe.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    });
    window.addEventListener("message", function (e) {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;
      var data; try { data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (err) { return; }
      var st = data && data.info && typeof data.info.playerState === "number" ? data.info.playerState : null;
      if (st === 1 && !playing) {
        playing = true;
        hero.classList.add("is-playing");
        btn.hidden = false;
      }
    });
    btn.addEventListener("click", function () {
      paused = !paused;
      send(paused ? "pauseVideo" : "playVideo");
      btn.setAttribute("aria-pressed", String(paused));
      btn.classList.toggle("is-paused", paused);
      btn.querySelector(".hero__pause-text").textContent = paused ? "Spela filmen" : "Pausa filmen";
    });
  })();

  // ---------- Vanliga frågor: visa alla ----------
  var faqToggle = document.querySelector(".faq__toggle");
  if (faqToggle) {
    faqToggle.addEventListener("click", function () {
      var more = document.getElementById(faqToggle.getAttribute("aria-controls"));
      var open = faqToggle.getAttribute("aria-expanded") === "true";
      faqToggle.setAttribute("aria-expanded", String(!open));
      more.hidden = open;
      faqToggle.querySelector(".faq__toggle-text").textContent = open ? "Visa alla frågor" : "Visa färre frågor";
      if (!open) { var first = more.querySelector("summary"); if (first) first.focus(); }
    });
  }

  // ---------- Bokning: ett beslut i taget ----------
  var dialog = document.getElementById("boka");
  if (!dialog || typeof dialog.showModal !== "function") return;

  // Stationer enligt bokningsformuläret på den officiella webbplatsen (november 2026)
  var STATIONS = ["Göteborg C", "Alingsås", "Skövde C", "Hallsberg", "Stockholm C"];
  // EXEMPEL: minuter från Göteborg C. Tidtabellen är inte publicerad.
  var OFFSET = { "Göteborg C": 0, "Alingsås": 28, "Skövde C": 88, "Hallsberg": 148, "Stockholm C": 235 };
  // EXEMPEL: avgångar från ändstationen (minuter efter midnatt), lika i båda riktningarna.
  var DEPARTURES = [6 * 60 + 5, 9 * 60 + 40, 14 * 60 + 10, 17 * 60 + 35];
  // EXEMPEL: priser per person för hela sträckan, och en lägsta nivå för korta resor.
  var PRICE = { "2:a klass": { min: 145, full: 395 }, "1:a klass": { min: 245, full: 645 } };
  var PRICE_STEP = [0, 40, 60, 20];

  var DAYS = ["sön", "mån", "tis", "ons", "tors", "fre", "lör"];
  var DAYS_LONG = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
  var MONTHS = ["jan", "feb", "mars", "apr", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"];

  var $ = function (id) { return document.getElementById(id); };
  var form = $("sokform");
  var fran = $("fran"), till = $("till");
  var fromValue = $("from-value"), fromChange = $("from-change"), fromField = $("from-field");
  var ut = $("utresa"), hem = $("hemresa");
  var hemSwitch = $("hem-switch"), djurSwitch = $("djur-switch");
  var nextBtn = $("bk-next"), nextText = $("bk-next-text"), bar = $("bk-bar");
  var backBtn = dialog.querySelector("[data-back]");
  var summary = $("bk-summary");
  var msg = $("sok-meddelande");
  var steps = dialog.querySelectorAll(".bk__step");

  var state = { step: 1, maxStep: 1, from: STATIONS[0], to: "", trip: null };
  var opener = null;

  // ---- Hjälpfunktioner ----
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function fromIso(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(s) { var d = fromIso(s); return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }
  function clock(min) { min = ((min % 1440) + 1440) % 1440; return pad(Math.floor(min / 60)) + "." + pad(min % 60); }
  function duration(min) { var h = Math.floor(min / 60), m = min % 60; return (h ? h + " h " : "") + (m ? m + " min" : ""); }
  function kr(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr"; }
  function klass() { var k = dialog.querySelector('input[name="klass"]:checked'); return k ? k.value : "2:a klass"; }
  function travellers() { return parseInt($("resenarer").textContent, 10); }
  function withPets() { return djurSwitch.getAttribute("aria-checked") === "true"; }

  var now = new Date(); now.setHours(0, 0, 0, 0);
  var today = iso(now);
  ut.min = today; hem.min = today; ut.value = today;

  // ---- Fel ----
  function setError(input, text) {
    var err = $(input.id + "-fel");
    if (!err) return;
    if (text) { input.setAttribute("aria-invalid", "true"); err.textContent = text; err.hidden = false; }
    else { input.removeAttribute("aria-invalid"); err.textContent = ""; err.hidden = true; }
  }

  // ---- Steg 1: stationer som en sträcka ----
  var destList = $("dest-list");
  function renderStations() {
    destList.innerHTML = "";
    STATIONS.forEach(function (st) {
      var li = document.createElement("li");
      li.className = "stations__item" + (st === state.from ? " is-from" : "") + (st === state.to ? " is-to" : "");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "stations__btn";
      var dot = document.createElement("span"); dot.className = "stations__dot"; dot.setAttribute("aria-hidden", "true");
      var name = document.createElement("span"); name.className = "stations__name"; name.textContent = st;
      b.appendChild(dot); b.appendChild(name);
      if (st === state.from) {
        b.disabled = true;
        var tag = document.createElement("span"); tag.className = "stations__tag"; tag.textContent = "Du reser härifrån";
        b.appendChild(tag);
      } else {
        b.addEventListener("click", function () { pickDestination(st); });
      }
      li.appendChild(b);
      destList.appendChild(li);
    });
  }

  // ---- Stationsförslag (combobox) ----
  function norm(s) { return s.toLowerCase().trim(); }
  function findStation(q) {
    q = norm(q);
    for (var i = 0; i < STATIONS.length; i++) if (norm(STATIONS[i]) === q) return STATIONS[i];
    return null;
  }
  function matches(q, exclude) {
    q = norm(q);
    if (!q) return [];
    return STATIONS.filter(function (s) {
      if (s === exclude) return false;
      var n = norm(s);
      return n.indexOf(q) === 0 || n.split(/[\s-]/).some(function (w) { return w.indexOf(q) === 0; });
    }).slice(0, 6);
  }
  var combos = [];
  function makeCombo(input, list, getExclude, onPick) {
    var active = -1, items = [];
    function close() {
      list.hidden = true; list.innerHTML = ""; active = -1; items = [];
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }
    function render() {
      items = matches(input.value, getExclude());
      list.innerHTML = "";
      if (!items.length || findStation(input.value) === input.value) { close(); return; }
      items.forEach(function (s, i) {
        var li = document.createElement("li");
        li.id = list.id + "-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", i === active ? "true" : "false");
        li.className = "combo__option" + (i === active ? " is-active" : "");
        li.textContent = s;
        li.addEventListener("mousedown", function (e) { e.preventDefault(); });
        li.addEventListener("click", function () { close(); onPick(s); });
        list.appendChild(li);
      });
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      if (active >= 0) input.setAttribute("aria-activedescendant", list.id + "-" + active);
      else input.removeAttribute("aria-activedescendant");
    }
    input.addEventListener("input", function () { active = -1; setError(input, ""); render(); });
    input.addEventListener("keydown", function (e) {
      var open = !list.hidden;
      if (e.key === "ArrowDown") { e.preventDefault(); if (!open) render(); if (items.length) { active = (active + 1) % items.length; render(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (items.length) { active = active <= 0 ? items.length - 1 : active - 1; render(); } }
      else if (e.key === "Enter") { e.preventDefault(); if (open && active >= 0) { var s = items[active]; close(); onPick(s); } else { close(); onPick(null); } }
      else if (e.key === "Escape" && open) { e.preventDefault(); e.stopPropagation(); close(); }
    });
    input.addEventListener("blur", function () { setTimeout(close, 120); });
    var api = { close: close, isOpen: function () { return !list.hidden; } };
    combos.push(api);
    return api;
  }
  dialog.addEventListener("cancel", function (e) {
    var openCombo = combos.filter(function (c) { return c.isOpen(); })[0];
    if (openCombo) { e.preventDefault(); openCombo.close(); }
  });

  function pickDestination(station) {
    var typed = till.value.trim();
    if (!station) {
      if (!typed) { setError(till, "Skriv vart du vill åka eller välj en station på sträckan."); till.focus(); return; }
      station = findStation(typed);
      if (!station) { var m = matches(typed, state.from); if (m.length === 1) station = m[0]; }
      if (!station) { setError(till, "Vi hittar ingen station som heter ”" + typed + "”. Välj en station på sträckan."); till.focus(); return; }
    }
    till.value = station;
    if (station === state.from) { setError(till, "Du reser redan från " + state.from + ". Välj en annan station eller ändra Från."); till.focus(); return; }
    setError(till, "");
    state.to = station;
    renderStations();
    goTo(2);
  }
  makeCombo(till, $("till-lista"), function () { return state.from; }, pickDestination);

  function setFrom(station) {
    state.from = station; fran.value = station; fromValue.textContent = station;
    if (state.to === station) { state.to = ""; till.value = ""; }
    renderStations();
  }
  function closeFromField(focusTill) {
    fromField.hidden = true; fromChange.setAttribute("aria-expanded", "false"); $("from-row").hidden = false;
    if (focusTill) till.focus();
  }
  function pickFrom(station) {
    var typed = fran.value.trim();
    if (!station) station = findStation(typed) || (matches(typed, null).length === 1 ? matches(typed, null)[0] : null);
    if (!station) { setError(fran, typed ? "Vi hittar ingen station som heter ”" + typed + "”. Välj en station i listan." : "Skriv var du reser från, till exempel " + STATIONS[0] + "."); fran.focus(); return; }
    setError(fran, ""); setFrom(station); closeFromField(true); renderSummary();
  }
  makeCombo(fran, $("fran-lista"), function () { return null; }, pickFrom);
  fromChange.addEventListener("click", function () {
    $("from-row").hidden = true; fromField.hidden = false; fromChange.setAttribute("aria-expanded", "true");
    fran.value = state.from; fran.focus(); fran.select();
  });
  $("byt").addEventListener("click", function () {
    var to = findStation(till.value) || state.to;
    if (!to) { setError(till, "Välj ett resmål först, så kan du byta riktning."); till.focus(); return; }
    var from = state.from;
    state.to = from; till.value = from; setFrom(to); state.to = from; till.value = from;
    setError(till, ""); renderStations(); renderSummary(); till.focus();
  });

  // ---- Steg 2: datum som en vecka ----
  var grid = $("date-grid");
  for (var i = 0; i < 8; i++) {
    (function (i) {
      var isOther = i === 7;
      var d = addDays(now, i);
      var label = document.createElement("label");
      label.className = "day" + (isOther ? " day--other" : "");
      var input = document.createElement("input");
      input.type = "radio"; input.name = "datum"; input.value = isOther ? "annat" : iso(d);
      if (i === 0) input.checked = true;
      var top = document.createElement("span"); top.className = "day__top";
      var num = document.createElement("span"); num.className = "day__num";
      var bottom = document.createElement("span"); bottom.className = "day__bottom";
      if (isOther) {
        top.textContent = "Annat"; num.textContent = "…"; bottom.textContent = "datum";
        input.setAttribute("aria-label", "Annat datum");
      } else {
        top.textContent = i === 0 ? "Idag" : i === 1 ? "Imorgon" : DAYS[d.getDay()];
        num.textContent = d.getDate(); bottom.textContent = MONTHS[d.getMonth()];
        input.setAttribute("aria-label", (i === 0 ? "Idag, " : i === 1 ? "Imorgon, " : "") + DAYS_LONG[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]);
      }
      num.setAttribute("aria-hidden", "true"); top.setAttribute("aria-hidden", "true"); bottom.setAttribute("aria-hidden", "true");
      label.appendChild(input); label.appendChild(top); label.appendChild(num); label.appendChild(bottom);
      grid.appendChild(label);
      input.addEventListener("change", function () {
        $("utresa-field").hidden = !isOther;
        setError(ut, "");
        if (isOther) { ut.focus(); try { ut.showPicker(); } catch (e) { /* inte alla webbläsare */ } }
        else ut.value = input.value;
        syncReturnMin(); renderSummary();
      });
    })(i);
  }
  function syncReturnMin() {
    hem.min = ut.value || today;
    if (hemSwitch.getAttribute("aria-checked") === "true" && (!hem.value || hem.value < hem.min)) hem.value = iso(addDays(fromIso(ut.value || today), 2));
  }
  ut.addEventListener("change", function () { setError(ut, ""); syncReturnMin(); renderSummary(); });
  hem.addEventListener("change", function () { setError(hem, ""); renderSummary(); });
  hemSwitch.addEventListener("click", function () {
    var on = hemSwitch.getAttribute("aria-checked") !== "true";
    hemSwitch.setAttribute("aria-checked", String(on));
    $("hemresa-field").hidden = !on;
    if (on) syncReturnMin(); else setError(hem, "");
    renderSummary();
  });
  function validateDates() {
    var ok = true;
    if (!ut.value) { setError(ut, "Välj ett datum för utresan."); ok = false; }
    else if (ut.value < today) { setError(ut, "Datumet har redan varit. Välj idag eller ett senare datum."); ok = false; }
    if (hemSwitch.getAttribute("aria-checked") === "true") {
      if (!hem.value) { setError(hem, "Välj ett datum för hemresan, eller stäng av hemresa."); ok = false; }
      else if (ut.value && hem.value < ut.value) { setError(hem, "Hemresan kan inte vara före utresan. Välj " + fmt(ut.value) + " eller senare."); ok = false; }
    }
    if (!ok) { if (!ut.value || ut.getAttribute("aria-invalid")) { $("utresa-field").hidden = false; ut.focus(); } else hem.focus(); }
    return ok;
  }

  // ---- Steg 3: klass, resenärer, djur ----
  function updateStepper(id) {
    var out = $(id), v = parseInt(out.textContent, 10);
    dialog.querySelectorAll('[data-target="' + id + '"]').forEach(function (b) {
      var st = parseInt(b.getAttribute("data-step"), 10);
      b.disabled = st < 0 ? v <= +out.dataset.min : v >= +out.dataset.max;
    });
  }
  dialog.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-target"), out = $(id);
      var v = parseInt(out.textContent, 10) + parseInt(b.getAttribute("data-step"), 10);
      out.textContent = String(Math.max(+out.dataset.min, Math.min(+out.dataset.max, v)));
      updateStepper(id); renderSummary();
    });
  });
  updateStepper("resenarer");
  djurSwitch.addEventListener("click", function () {
    djurSwitch.setAttribute("aria-checked", String(!withPets())); renderSummary();
  });
  dialog.querySelectorAll('input[name="klass"]').forEach(function (r) { r.addEventListener("change", renderSummary); });

  function paxText() {
    var n = travellers();
    var t = n + (n === 1 ? " resenär" : " resenärer") + ", " + klass();
    if (withPets()) t += ", med djur";
    return t;
  }
  function dateText() {
    if (!ut.value) return "";
    var t = fmt(ut.value);
    if (hemSwitch.getAttribute("aria-checked") === "true" && hem.value && hem.value >= ut.value) t += " – " + fmt(hem.value);
    return t;
  }

  // ---- Steg 4: avgångar (EXEMPEL) ----
  function exampleTrips() {
    var a = OFFSET[state.from], b = OFFSET[state.to];
    var forward = b > a, ride = Math.abs(b - a), full = OFFSET["Stockholm C"];
    var startOffset = forward ? a : full - a;
    var p = PRICE[klass()], frac = ride / full;
    return DEPARTURES.map(function (dep, i) {
      var leave = dep + startOffset;
      var each = Math.round((p.min + (p.full - p.min) * frac + PRICE_STEP[i]) / 5) * 5;
      return { leave: leave, arrive: leave + ride, ride: ride, each: each, meal: leave < 11 * 60 ? "Frukost" : "Middag" };
    });
  }
  function renderTrips() {
    var q = $("result-query");
    q.innerHTML = "";
    [state.from + " → " + state.to, dateText(), paxText()].forEach(function (part, i) {
      if (i) q.appendChild(document.createTextNode(" · "));
      var span = document.createElement("span");
      span.className = "nowrap";
      span.textContent = part;
      q.appendChild(span);
    });
    var list = $("trips");
    list.innerHTML = "";
    exampleTrips().forEach(function (t) {
      var li = document.createElement("li");
      li.className = "trip";
      li.setAttribute("data-exempel", "");
      li.innerHTML =
        '<div class="trip__times"><span class="trip__time">' + clock(t.leave) + '</span>' +
        '<span class="trip__line" aria-hidden="true"></span>' +
        '<span class="trip__time">' + clock(t.arrive) + '</span></div>' +
        '<p class="trip__meta"><span>' + duration(t.ride) + '</span><span class="trip__tag">Restaurangvagn</span></p>' +
        '<p class="trip__price"><span class="trip__from">' + klass() + '</span><strong>' + kr(t.each) + '</strong></p>';
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn btn--secondary btn--small trip__pick";
      b.textContent = "Välj";
      b.setAttribute("aria-label", "Välj avgång " + clock(t.leave) + ", framme " + clock(t.arrive) + ", " + kr(t.each) + " per person, exempel");
      b.addEventListener("click", function () { state.trip = t; goTo(5); });
      li.appendChild(b);
      list.appendChild(li);
    });
  }

  // ---- Steg 5: bekräftelse ----
  function renderConfirm() {
    var t = state.trip, n = travellers();
    var rows = [
      ["Resa", state.from + " → " + state.to],
      ["Datum", dateText()],
      ["Avgång", clock(t.leave) + ", framme " + clock(t.arrive) + " (" + duration(t.ride) + ")"],
      ["Klass", klass()],
      ["Resenärer", n + (n === 1 ? " resenär" : " resenärer") + (withPets() ? ", med djur" : "")]
    ];
    var dl = $("confirm"); dl.innerHTML = "";
    rows.forEach(function (r) {
      var div = document.createElement("div");
      var dt = document.createElement("dt"); dt.textContent = r[0];
      var dd = document.createElement("dd"); dd.textContent = r[1];
      div.appendChild(dt); div.appendChild(dd); dl.appendChild(div);
    });
    $("confirm-total").textContent = kr(t.each * n);
    msg.hidden = true;
  }
  function showPayMessage() {
    msg.innerHTML = "";
    var strong = document.createElement("strong");
    strong.textContent = "Det här är ett designkoncept.";
    var p = document.createElement("p");
    p.textContent = "Ingen betalning görs och tiderna är exempel. ";
    if (SITE.url) {
      var link = document.createElement("a");
      link.href = SITE.url;
      link.textContent = "Till " + new URL(SITE.url).hostname.replace(/^www\./, "");
      p.appendChild(link);
    }
    msg.appendChild(strong); msg.appendChild(p);
    msg.hidden = false;
    msg.scrollIntoView({ block: "nearest" });
  }

  // ---- Sammanfattning i det blå bandet ----
  function renderSummary() {
    summary.innerHTML = "";
    var parts = [];
    if (state.to) parts.push({ step: 1, text: state.from + " → " + state.to, label: "Ändra resa, " + state.from + " till " + state.to });
    else parts.push({ step: 1, text: "Från " + state.from, label: "Ändra resa, från " + state.from });
    if (state.to && state.maxStep >= 2 && ut.value) parts.push({ step: 2, text: dateText(), label: "Ändra datum, " + dateText() });
    if (state.to && state.maxStep >= 3) parts.push({ step: 3, text: paxText(), label: "Ändra hur du reser, " + paxText() });
    parts.forEach(function (p, i) {
      if (i > 0) { var sep = document.createElement("span"); sep.className = "bk__sep"; sep.setAttribute("aria-hidden", "true"); sep.textContent = "·"; summary.appendChild(sep); }
      var b = document.createElement("button");
      b.type = "button";
      b.className = "bk__chip" + (p.step === state.step ? " is-current" : "");
      b.textContent = p.text;
      b.setAttribute("aria-label", p.label);
      if (p.step === state.step) b.setAttribute("aria-current", "step");
      b.addEventListener("click", function () { goTo(p.step); });
      summary.appendChild(b);
    });
  }

  // ---- Stegbyte ----
  var STEP_TEXT = { 1: "Steg 1 av 3", 2: "Steg 2 av 3", 3: "Steg 3 av 3", 4: "Avgångar", 5: "Bekräfta" };
  function goTo(n, opts) {
    opts = opts || {};
    if (n >= 4 && !state.to) n = 1;
    if (n === 5 && !state.trip) n = 4;
    state.step = n;
    state.maxStep = Math.max(state.maxStep, Math.min(n, 3));
    steps.forEach(function (s) { s.hidden = +s.getAttribute("data-step") !== n; });
    dialog.setAttribute("data-step", String(n));
    $("bk-stegtext").textContent = STEP_TEXT[n];
    backBtn.hidden = n === 1;
    bar.hidden = n === 4;
    nextText.textContent = n === 3 ? "Visa resor" : n === 5 ? "Fortsätt till betalning" : "Nästa";
    if (n === 4) renderTrips();
    if (n === 5) renderConfirm();
    renderSummary();
    dialog.querySelector(".bk__body").scrollTop = 0;
    if (opts.noFocus) return;
    if (n === 1) till.focus();
    else $("steg" + n + "-rubrik").focus();
  }
  backBtn.addEventListener("click", function () { if (state.step > 1) goTo(state.step - 1); });
  dialog.querySelectorAll("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { goTo(+b.getAttribute("data-goto")); });
  });
  nextBtn.addEventListener("click", function () {
    if (state.step === 1) pickDestination(findStation(till.value));
    else if (state.step === 2) { if (validateDates()) goTo(3); }
    else if (state.step === 3) goTo(4);
    else if (state.step === 5) showPayMessage();
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  // ---- Öppna och stänga ----
  document.querySelectorAll("[data-open-booking]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      opener = el;
      var f = el.getAttribute("data-from"), t = el.getAttribute("data-to");
      dialog.showModal();
      if (f) setFrom(f);
      if (f && t) { till.value = t; state.to = t; setError(till, ""); renderStations(); goTo(2); }
      else goTo(1);
    });
  });
  dialog.querySelectorAll("[data-close-booking]").forEach(function (el) {
    el.addEventListener("click", function () { dialog.close(); });
  });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", function () {
    combos.forEach(function (c) { c.close(); });
    if (opener) opener.focus();
  });

  renderStations();
  goTo(1, { noFocus: true });
})();
