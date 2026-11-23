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
  var DAYS = ["sön", "mån", "tis", "ons", "tors", "fre", "lör"];
  var MONTHS = ["jan", "feb", "mars", "apr", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"];

  var $ = function (id) { return document.getElementById(id); };
  var form = $("sokform");
  var fran = $("fran"), till = $("till");
  var fromValue = $("from-value"), fromChange = $("from-change"), fromField = $("from-field");
  var ut = $("utresa"), hem = $("hemresa");
  var hemSwitch = $("hem-switch");
  var nextBtn = $("bk-next"), nextText = $("bk-next-text");
  var backBtn = dialog.querySelector("[data-back]");
  var summary = $("bk-summary");
  var msg = $("sok-meddelande");
  var steps = dialog.querySelectorAll(".bk__step");

  var state = { step: 1, maxStep: 1, from: STATIONS[0], to: "", dateKey: "idag" };
  var opener = null;

  // ---- Datum ----
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function fromIso(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(s) { var d = fromIso(s); return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }
  function nextWeekday(from, wd, minAhead) {
    var d = addDays(from, minAhead);
    while (d.getDay() !== wd) d = addDays(d, 1);
    return d;
  }

  var now = new Date(); now.setHours(0, 0, 0, 0);
  var today = iso(now);
  var DATE_OPTIONS = [
    { key: "idag", label: "Idag", date: today },
    { key: "imorgon", label: "Imorgon", date: iso(addDays(now, 1)) },
    { key: "fredag", label: "Fredag", date: iso(nextWeekday(now, 5, 2)) },
    { key: "helg", label: "Nästa helg", date: iso(nextWeekday(now, 6, 2)) },
    { key: "valj", label: "Välj datum", date: "" }
  ];
  ut.min = today; hem.min = today; ut.value = today;

  var pillBox = $("date-pills");
  DATE_OPTIONS.forEach(function (o) {
    var label = document.createElement("label");
    label.className = "pill pill--radio";
    var input = document.createElement("input");
    input.type = "radio"; input.name = "datum"; input.value = o.key;
    if (o.key === state.dateKey) input.checked = true;
    var span = document.createElement("span");
    span.className = "pill__text";
    span.textContent = o.label;
    if (o.date) {
      var small = document.createElement("small");
      small.textContent = fmt(o.date);
      span.appendChild(small);
    }
    label.appendChild(input); label.appendChild(span);
    pillBox.appendChild(label);
    input.addEventListener("change", function () {
      state.dateKey = o.key;
      $("utresa-field").hidden = o.key !== "valj";
      if (o.date) ut.value = o.date;
      setError(ut, "");
      if (o.key === "valj") {
        ut.focus();
        try { ut.showPicker(); } catch (e) { /* inte alla webbläsare */ }
      }
      syncReturnMin();
      renderSummary();
    });
  });

  function syncReturnMin() {
    hem.min = ut.value || today;
    if (hemSwitch.getAttribute("aria-checked") === "true" && (!hem.value || hem.value < hem.min)) {
      hem.value = iso(addDays(fromIso(ut.value || today), 2));
    }
  }
  ut.addEventListener("change", function () { setError(ut, ""); syncReturnMin(); renderSummary(); });
  hem.addEventListener("change", function () { setError(hem, ""); renderSummary(); });

  hemSwitch.addEventListener("click", function () {
    var on = hemSwitch.getAttribute("aria-checked") !== "true";
    hemSwitch.setAttribute("aria-checked", String(on));
    $("hemresa-field").hidden = !on;
    if (on) { syncReturnMin(); } else { setError(hem, ""); }
    renderSummary();
  });

  // ---- Fel ----
  function setError(input, text) {
    var err = $(input.id + "-fel");
    if (!err) return;
    if (text) {
      input.setAttribute("aria-invalid", "true");
      err.textContent = text;
      err.hidden = false;
    } else {
      input.removeAttribute("aria-invalid");
      err.textContent = "";
      err.hidden = true;
    }
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
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) render();
        if (items.length) { active = (active + 1) % items.length; render(); }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (items.length) { active = active <= 0 ? items.length - 1 : active - 1; render(); }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (open && active >= 0) { var s = items[active]; close(); onPick(s); }
        else { close(); onPick(null); }
      } else if (e.key === "Escape" && open) {
        e.preventDefault(); e.stopPropagation(); close();
      }
    });
    input.addEventListener("blur", function () { setTimeout(close, 120); });
    var api = { close: close, isOpen: function () { return !list.hidden; } };
    combos.push(api);
    return api;
  }

  // Esc stänger först en öppen förslagslista, sedan dialogen
  dialog.addEventListener("cancel", function (e) {
    var openCombo = combos.filter(function (c) { return c.isOpen(); })[0];
    if (openCombo) { e.preventDefault(); openCombo.close(); }
  });

  // ---- Steg 1: vart ----
  function pickDestination(station) {
    var typed = till.value.trim();
    if (!station) {
      if (!typed) { setError(till, "Skriv vart du vill åka eller välj ett resmål nedan."); till.focus(); return; }
      station = findStation(typed);
      if (!station) {
        var m = matches(typed, state.from);
        if (m.length === 1) station = m[0];
      }
      if (!station) {
        setError(till, "Vi hittar ingen station som heter ”" + typed + "”. Välj en station i listan.");
        till.focus();
        return;
      }
    }
    till.value = station;
    if (station === state.from) {
      setError(till, "Du reser redan från " + state.from + ". Välj ett annat resmål eller ändra Från.");
      till.focus();
      return;
    }
    setError(till, "");
    state.to = station;
    goTo(2);
  }
  makeCombo(till, $("till-lista"), function () { return state.from; }, pickDestination);

  // Snabbval: alla stationer utom den du reser från
  var destPills = $("dest-pills");
  function renderDestPills() {
    destPills.innerHTML = "";
    STATIONS.forEach(function (st) {
      if (st === state.from) return;
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button"; b.className = "pill"; b.textContent = st;
      b.addEventListener("click", function () { pickDestination(st); });
      li.appendChild(b); destPills.appendChild(li);
    });
  }

  function setFrom(station) {
    state.from = station;
    fran.value = station;
    fromValue.textContent = station;
    renderDestPills();
  }
  function closeFromField(focusTill) {
    fromField.hidden = true;
    fromChange.setAttribute("aria-expanded", "false");
    $("from-row").hidden = false;
    if (focusTill) till.focus();
  }
  function pickFrom(station) {
    var typed = fran.value.trim();
    if (!station) station = findStation(typed) || (matches(typed, null).length === 1 ? matches(typed, null)[0] : null);
    if (!station) { setError(fran, typed ? "Vi hittar ingen station som heter ”" + typed + "”. Välj en station i listan." : "Skriv var du reser från, till exempel " + STATIONS[0] + "."); fran.focus(); return; }
    setError(fran, "");
    setFrom(station);
    if (state.to === station) { state.to = ""; till.value = ""; }
    closeFromField(true);
    renderSummary();
  }
  makeCombo(fran, $("fran-lista"), function () { return null; }, pickFrom);

  fromChange.addEventListener("click", function () {
    $("from-row").hidden = true;
    fromField.hidden = false;
    fromChange.setAttribute("aria-expanded", "true");
    fran.value = state.from;
    fran.focus();
    fran.select();
  });

  $("byt").addEventListener("click", function () {
    var to = findStation(till.value) || state.to;
    if (!to) { setError(till, "Välj ett resmål först, så kan du byta riktning."); till.focus(); return; }
    var from = state.from;
    setFrom(to);
    till.value = from;
    state.to = from;
    setError(till, "");
    renderSummary();
    till.focus();
  });

  // ---- Steg 2: när ----
  function validateDates() {
    var ok = true;
    if (!ut.value) { setError(ut, "Välj ett datum för utresan."); ok = false; }
    else if (ut.value < today) { setError(ut, "Datumet har redan varit. Välj idag eller ett senare datum."); ok = false; }
    if (hemSwitch.getAttribute("aria-checked") === "true") {
      if (!hem.value) { setError(hem, "Välj ett datum för hemresan, eller stäng av hemresa."); ok = false; }
      else if (ut.value && hem.value < ut.value) { setError(hem, "Hemresan kan inte vara före utresan. Välj " + fmt(ut.value) + " eller senare."); ok = false; }
    }
    if (!ok) {
      if (!ut.value || ut.getAttribute("aria-invalid")) { $("utresa-field").hidden = false; ut.focus(); }
      else hem.focus();
    }
    return ok;
  }

  // ---- Steg 3: resenärer ----
  function updateStepper(id) {
    var out = $(id);
    var v = parseInt(out.textContent, 10);
    dialog.querySelectorAll('[data-target="' + id + '"]').forEach(function (b) {
      var step = parseInt(b.getAttribute("data-step"), 10);
      b.disabled = step < 0 ? v <= +out.dataset.min : v >= +out.dataset.max;
    });
  }
  dialog.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-target");
      var out = $(id);
      var v = parseInt(out.textContent, 10) + parseInt(b.getAttribute("data-step"), 10);
      v = Math.max(+out.dataset.min, Math.min(+out.dataset.max, v));
      out.textContent = String(v);
      updateStepper(id);
      msg.hidden = true;
      renderSummary();
    });
  });
  updateStepper("resenarer");

  var djurSwitch = $("djur-switch");
  djurSwitch.addEventListener("click", function () {
    var on = djurSwitch.getAttribute("aria-checked") !== "true";
    djurSwitch.setAttribute("aria-checked", String(on));
    msg.hidden = true;
    renderSummary();
  });
  dialog.querySelectorAll('input[name="klass"]').forEach(function (r) {
    r.addEventListener("change", function () { msg.hidden = true; renderSummary(); });
  });

  function paxText() {
    var n = parseInt($("resenarer").textContent, 10);
    var k = dialog.querySelector('input[name="klass"]:checked');
    var t = n + (n === 1 ? " resenär" : " resenärer") + ", " + (k ? k.value : "2:a klass");
    if (djurSwitch.getAttribute("aria-checked") === "true") t += ", med djur";
    return t;
  }
  function dateText() {
    if (!ut.value) return "";
    var t = fmt(ut.value);
    if (hemSwitch.getAttribute("aria-checked") === "true" && hem.value) t += " – " + fmt(hem.value);
    return t;
  }

  // ---- Sammanfattning överst ----
  function renderSummary() {
    summary.innerHTML = "";
    var parts = [];
    if (state.to) parts.push({ step: 1, text: state.from + " → " + state.to, label: "Ändra resa, " + state.from + " till " + state.to });
    if (state.to && state.maxStep >= 2 && ut.value) parts.push({ step: 2, text: dateText(), label: "Ändra datum, " + dateText() });
    if (state.to && state.maxStep >= 3) parts.push({ step: 3, text: paxText(), label: "Ändra resenärer, " + paxText() });
    summary.hidden = !parts.length;
    parts.forEach(function (p, i) {
      if (i > 0) {
        var sep = document.createElement("span");
        sep.className = "bk__sep"; sep.setAttribute("aria-hidden", "true"); sep.textContent = "·";
        summary.appendChild(sep);
      }
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
  function goTo(n, opts) {
    opts = opts || {};
    state.step = n;
    state.maxStep = Math.max(state.maxStep, n);
    steps.forEach(function (s) { s.hidden = +s.getAttribute("data-step") !== n; });
    dialog.setAttribute("data-step", String(n));
    $("bk-stegtext").textContent = "Steg " + n + " av 3";
    backBtn.hidden = n === 1;
    nextText.textContent = n === 3 ? "Visa resor" : "Nästa";
    if (n !== 3) msg.hidden = true;
    renderSummary();
    if (opts.noFocus) return;
    if (n === 1) till.focus();
    else $("steg" + n + "-rubrik").focus();
  }

  backBtn.addEventListener("click", function () { if (state.step > 1) goTo(state.step - 1); });

  nextBtn.addEventListener("click", function () {
    if (state.step === 1) pickDestination(findStation(till.value));
    else if (state.step === 2) { if (validateDates()) goTo(3); }
    else showResult();
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  function showResult() {
    msg.innerHTML = "";
    var strong = document.createElement("strong");
    strong.textContent = "Det här är ett designkoncept.";
    var p = document.createElement("p");
    p.textContent = "Sökningen " + state.from + " → " + state.to + ", " + dateText() + ", " + paxText() + " görs inte på riktigt. ";
    if (SITE.url) {
      var link = document.createElement("a");
      link.href = SITE.url;
      link.textContent = "Till " + new URL(SITE.url).hostname.replace(/^www\./, "");
      p.appendChild(link);
    }
    msg.appendChild(strong);
    msg.appendChild(p);
    msg.hidden = false;
    msg.scrollIntoView({ block: "nearest" });
  }

  // ---- Öppna och stänga ----
  document.querySelectorAll("[data-open-booking]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      opener = el;
      var f = el.getAttribute("data-from"), t = el.getAttribute("data-to");
      dialog.showModal();
      if (f && t) {
        setFrom(f); till.value = t; state.to = t; setError(till, "");
        goTo(2);
      } else if (f) {
        setFrom(f);
        if (state.to === f) { state.to = ""; till.value = ""; }
        goTo(1);
      } else {
        goTo(1);
      }
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

  renderDestPills();
  goTo(1, { noFocus: true });
})();
