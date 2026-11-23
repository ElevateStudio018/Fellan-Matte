// Snälltåget – designkoncept. Ingen riktig bokning.
(function () {
  "use strict";

  // Meny på mobil
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("huvudmeny");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  // Dölj trafikinfo
  document.querySelectorAll("[data-dismiss]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-dismiss"));
      if (el) el.hidden = true;
      var main = document.getElementById("innehall");
      if (main) main.focus();
    });
  });

  // Datum: idag som förval och minsta värde
  var ut = document.getElementById("utresa");
  var hem = document.getElementById("hemresa");
  var d = new Date();
  var today = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  if (ut) { ut.min = today; ut.value = today; }
  if (hem) hem.min = today;
  if (ut && hem) {
    ut.addEventListener("change", function () {
      hem.min = ut.value || today;
      if (hem.value && hem.value < ut.value) hem.value = "";
    });
  }

  // Byt Från/Till
  var fran = document.getElementById("fran");
  var till = document.getElementById("till");
  var byt = document.getElementById("byt");
  if (byt && fran && till) {
    byt.addEventListener("click", function () {
      var tmp = fran.value;
      fran.value = till.value;
      till.value = tmp;
    });
  }

  // Resenärer
  function updateStepper(id) {
    var out = document.getElementById(id);
    var v = parseInt(out.textContent, 10);
    document.querySelectorAll('[data-target="' + id + '"]').forEach(function (b) {
      var step = parseInt(b.getAttribute("data-step"), 10);
      b.disabled = step < 0 ? v <= +out.dataset.min : v >= +out.dataset.max;
    });
  }
  document.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-target");
      var out = document.getElementById(id);
      var v = parseInt(out.textContent, 10) + parseInt(b.getAttribute("data-step"), 10);
      v = Math.max(+out.dataset.min, Math.min(+out.dataset.max, v));
      out.textContent = String(v);
      updateStepper(id);
      updatePaxSummary();
    });
  });
  ["vuxna", "barn"].forEach(function (id) { if (document.getElementById(id)) updateStepper(id); });

  function updatePaxSummary() {
    var sum = document.getElementById("pax-summary");
    if (!sum) return;
    var a = parseInt(document.getElementById("vuxna").textContent, 10);
    var b = parseInt(document.getElementById("barn").textContent, 10);
    var t = a + (a === 1 ? " vuxen" : " vuxna");
    if (b > 0) t += ", " + b + " barn";
    sum.textContent = t;
  }

  // Sök: validera och visa att det är ett koncept
  var form = document.getElementById("sokform");
  var msg = document.getElementById("sok-meddelande");

  function setError(input, text) {
    var err = document.getElementById(input.id + "-fel");
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

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var a = fran.value.trim();
      var b = till.value.trim();
      setError(fran, a ? "" : "Skriv var du reser från, till exempel Malmö C.");
      setError(till, b ? "" : "Skriv vart du vill resa, till exempel Berlin Hbf.");
      if (a && b && a.toLowerCase() === b.toLowerCase()) {
        setError(till, "Från och Till är samma station. Välj en annan station under Till.");
      }
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        msg.hidden = true;
        firstInvalid.focus();
        return;
      }
      var n = parseInt(document.getElementById("vuxna").textContent, 10) + parseInt(document.getElementById("barn").textContent, 10);
      msg.innerHTML = "";
      var strong = document.createElement("strong");
      strong.textContent = "Det här är ett designkoncept.";
      var p = document.createElement("p");
      p.textContent = "Sökningen " + a + " – " + b + " för " + n + (n === 1 ? " resenär" : " resenärer") + " görs inte på riktigt. ";
      var link = document.createElement("a");
      link.href = "https://www.snalltaget.se/";
      link.textContent = "Boka på snalltaget.se";
      p.appendChild(link);
      msg.appendChild(strong);
      msg.appendChild(p);
      msg.hidden = false;
    });
  }
})();
