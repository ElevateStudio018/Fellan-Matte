// Designkoncept av Elevate Studio. Ingen riktig bokning.
// Varumärket hämtas från data-brand och data-brand-url på <html>, aldrig hårdkodat här.
(function () {
  "use strict";

  // ---------- Meny på mobil: en vanlig knapp med aria-expanded, Esc stänger ----------
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("huvudmeny");
  if (toggle && nav) {
    var setMenu = function (open, focusToggle) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (!open && focusToggle) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });
    // Länkar som öppnar bokningen eller hoppar inom sidan stänger menyn
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { if (toggle.getAttribute("aria-expanded") === "true") setMenu(false); });
    });
  }

  // ---------- Dölj trafikinfo (gäller resten av besöket, på alla sidor) ----------
  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* privat läge */ } }
  };
  document.querySelectorAll("[data-dismiss]").forEach(function (btn) {
    var id = btn.getAttribute("data-dismiss");
    var target = document.getElementById(id);
    if (target && store.get("dold-" + id) === "1") target.hidden = true;
    btn.addEventListener("click", function () {
      var el = document.getElementById(id);
      if (el) el.hidden = true;
      store.set("dold-" + id, "1");
      var main = document.getElementById("innehall");
      if (main) main.focus();
    });
  });

  // ---------- Sidhuvudets foto: saknas filen blir sidhuvudet havre med mörk text ----------
  // (img har även onerror i HTML, så att det fungerar innan det här skriptet har körts)
  document.querySelectorAll(".phead__img").forEach(function (img) {
    var head = img.closest(".phead");
    if (!head) return;
    function fail() { head.classList.add("phead--noimg"); }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
    img.addEventListener("load", function () { if (img.naturalWidth > 0) head.classList.remove("phead--noimg"); });
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

  // ---------- Kundtjänst: filtrera frågorna medan man skriver ----------
  (function faqFilter() {
    var input = document.getElementById("faq-sok");
    var cats = document.querySelectorAll("[data-faqcat]");
    var status = document.getElementById("faq-status");
    var empty = document.getElementById("faq-empty");
    if (!input || !cats.length) return;
    var form = input.closest("form");
    var items = [];
    cats.forEach(function (cat) {
      cat.querySelectorAll(".faq__item").forEach(function (d) {
        var sum = d.querySelector("summary");
        var label = sum.firstChild && sum.firstChild.nodeType === 3 ? sum.firstChild : null;
        items.push({ el: d, cat: cat, label: label, text: label ? label.nodeValue : "", hay: norm(d.textContent) });
      });
    });
    var total = items.length;
    function norm(s) { return s.toLowerCase().replace(/\s+/g, " ").trim(); }
    function updateCounts() {
      document.querySelectorAll("[data-catcount]").forEach(function (c) {
        var cat = document.getElementById(c.getAttribute("data-catcount"));
        if (cat) c.textContent = cat.querySelectorAll(".faq__item:not([hidden])").length;
      });
    }
    function highlight(it, q) {
      if (!it.label) return;
      var span = it.el.querySelector("summary .hitwrap");
      if (span) span.remove();
      it.label.nodeValue = it.text;
      if (!q) return;
      var i = it.text.toLowerCase().indexOf(q);
      if (i < 0) return;
      // Markera träffen i frågan med <mark>
      var wrap = document.createElement("span");
      wrap.className = "hitwrap";
      wrap.appendChild(document.createTextNode(it.text.slice(0, i)));
      var m = document.createElement("mark"); m.className = "hit"; m.textContent = it.text.slice(i, i + q.length);
      wrap.appendChild(m);
      wrap.appendChild(document.createTextNode(it.text.slice(i + q.length)));
      it.label.nodeValue = "";
      it.label.parentNode.insertBefore(wrap, it.label);
    }
    var timer = null;
    function run() {
      var q = norm(input.value), words = q ? q.split(" ") : [], shown = 0;
      items.forEach(function (it) {
        var ok = words.every(function (w) { return it.hay.indexOf(w) >= 0; });
        it.el.hidden = !ok;
        if (ok) shown++;
        highlight(it, q);
      });
      cats.forEach(function (cat) { cat.hidden = !cat.querySelector(".faq__item:not([hidden])"); });
      if (empty) {
        empty.hidden = shown > 0;
        var e = empty.querySelector("[data-query]");
        if (e) e.textContent = input.value.trim();
      }
      updateCounts();
      clearTimeout(timer);
      // Vänta lite så att skärmläsaren inte läser upp varje tangenttryckning
      timer = setTimeout(function () {
        if (!status) return;
        status.textContent = !q ? total + " frågor och svar" : shown === 0 ? "Inga frågor matchar sökningen." : shown === 1 ? "1 fråga matchar ”" + input.value.trim() + "”." : shown + " frågor matchar ”" + input.value.trim() + "”.";
      }, 350);
    }
    input.addEventListener("input", run);
    input.addEventListener("search", run);
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      run();
      var target = document.getElementById("fragor");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
    document.querySelectorAll("[data-clear-search]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = ""; run(); input.focus(); });
    });
    run();
  })();

  // ---------- Biljetter: förseningskalkylator (räknar bara lokalt) ----------
  (function delayCalc() {
    var calc = document.getElementById("kalkylator");
    if (!calc) return;
    var price = document.getElementById("pris");
    var out = document.getElementById("ersattning");
    var rule = document.getElementById("ersattning-regel");
    var err = document.getElementById("pris-fel");
    function kronor(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr"; }
    function update() {
      var raw = price.value.replace(/\s/g, "").replace(",", ".");
      var val = raw === "" ? NaN : Number(raw);
      var picked = calc.querySelector('input[name="forsening"]:checked');
      var pct = picked ? Number(picked.value) : 0;
      var bad = raw !== "" && (isNaN(val) || val < 0);
      price.setAttribute("aria-invalid", bad ? "true" : "false");
      if (!bad) price.removeAttribute("aria-invalid");
      err.hidden = !bad;
      err.textContent = bad ? "Skriv priset i hela kronor, till exempel 450." : "";
      if (bad || raw === "") {
        out.textContent = "– kr";
        rule.textContent = "Fyll i vad biljetten kostade.";
        return;
      }
      out.textContent = kronor(val * pct / 100);
      rule.textContent = pct === 0 ? "Under 60 minuter ger ingen ersättning." : pct + " % av " + kronor(val) + ".";
    }
    calc.addEventListener("input", update);
    calc.addEventListener("change", update);
    calc.addEventListener("submit", function (e) { e.preventDefault(); update(); });
    update();
  })();

  // ---------- Grupp: förfrågan (KONCEPT: ingenting skickas, bekräftelsen visas bara här) ----------
  (function groupForm() {
    var form = document.getElementById("gruppform");
    if (!form) return;
    var notice = document.getElementById("grupp-meddelande");
    var rules = [
      { id: "g-namn", test: function (v) { return v.trim().length > 1; }, msg: "Skriv ditt namn." },
      { id: "g-epost", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: "Skriv en e-postadress, till exempel namn@foretag.se." },
      { id: "g-antal", test: function (v) { var n = Number(v); return v !== "" && n >= 1 && n <= 500 && Math.floor(n) === n; }, msg: "Skriv hur många ni är, med siffror." },
      { id: "g-till", test: function (v) { var f = document.getElementById("g-fran"); return !f || !v || v !== f.value; }, msg: "Välj en annan station än den ni reser från." }
    ];
    function check(rule) {
      var el = document.getElementById(rule.id), errEl = document.getElementById(rule.id + "-fel");
      if (!el) return true;
      var ok = rule.test(el.value);
      if (ok) { el.removeAttribute("aria-invalid"); if (errEl) { errEl.hidden = true; errEl.textContent = ""; } }
      else { el.setAttribute("aria-invalid", "true"); if (errEl) { errEl.textContent = rule.msg; errEl.hidden = false; } }
      return ok;
    }
    rules.forEach(function (r) {
      var el = document.getElementById(r.id);
      if (el) el.addEventListener("change", function () { if (el.getAttribute("aria-invalid")) check(r); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      rules.forEach(function (r) { if (!check(r) && !firstBad) firstBad = document.getElementById(r.id); });
      if (firstBad) { notice.hidden = true; firstBad.focus(); return; }
      var name = document.getElementById("g-namn").value.trim().split(" ")[0];
      var n = document.getElementById("g-antal").value;
      notice.innerHTML = "";
      var strong = document.createElement("strong");
      strong.textContent = "Det här är ett koncept. Ingenting har skickats.";
      var p1 = document.createElement("p");
      p1.textContent = "Tack " + name + ". I skarp drift hade förfrågan för " + n + (n === "1" ? " person" : " personer") + " gått till kundtjänst. Vill du fråga på riktigt, ring eller mejla.";
      notice.appendChild(strong); notice.appendChild(p1);
      if (SITE.url) {
        var p2 = document.createElement("p");
        var a = document.createElement("a");
        a.href = SITE.url;
        a.textContent = "Till " + new URL(SITE.url).hostname.replace(/^www\./, "");
        p2.appendChild(a); notice.appendChild(p2);
      }
      notice.hidden = false;
      notice.setAttribute("tabindex", "-1");
      notice.focus();
    });
  })();

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
      if (el.hasAttribute("data-pets")) djurSwitch.setAttribute("aria-checked", "true");
      var k = el.getAttribute("data-klass");
      if (k) dialog.querySelectorAll('input[name="klass"]').forEach(function (r) { r.checked = r.value === k; });
      if (f && STATIONS.indexOf(f) >= 0) setFrom(f); else f = null;
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
