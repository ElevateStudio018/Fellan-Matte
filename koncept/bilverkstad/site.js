/* Bergqvists Bil: registreringsnummer, prislista med moms och flödet Boka service. Påhittade exempeldata. */
(() => {
  'use strict';
  const { $, $$, isoDate, parseDate, fmtDate, kr, validators, bindField, check, show } = window.EV;

  /* ---------- Validering ---------- */
  const normReg = v => v.toUpperCase().replace(/[\s-]/g, '');
  const fmtReg = v => { const n = normReg(v); return n.length === 6 ? `${n.slice(0, 3)} ${n.slice(3)}` : n; };
  validators.regnr = (input, v) => /^[A-ZÅÄÖ]{3}\d{2}[A-Z0-9]$/.test(normReg(v)) ? '' : 'Skriv registreringsnumret som tre bokstäver och tre tecken, till exempel ABC 123 eller ABC 12A.';
  validators.mil = (input, v) => /^\d[\d\s]{0,7}(mil)?$/i.test(v.trim()) ? '' : 'Skriv mätarställningen i mil med siffror, till exempel 12 400.';
  validators.vardag = (input, v) => { const d = parseDate(v).getDay(); return (d === 0 || d === 6) ? 'Verkstaden har stängt på helger. Välj en dag måndag–fredag.' : ''; };

  /* ---------- Hero: registreringsnummer startar bokningen ---------- */
  const hero = $('[data-regform]');
  if (hero) {
    const inp = $('input', hero);
    bindField(inp);
    hero.addEventListener('submit', e => {
      const m = check(inp); show(inp, m);
      if (m) { e.preventDefault(); inp.focus(); return; }
      inp.value = normReg(inp.value);
    });
  }

  /* ---------- Öppet nu (bara grön text, pi-et-oppet) ---------- */
  const open = $('[data-open-now]');
  if (open) {
    const n = new Date(), d = n.getDay(), m = n.getHours() * 60 + n.getMinutes();
    const close = d >= 1 && d <= 4 ? 17 * 60 : d === 5 ? 16 * 60 : 0;
    if (close && m >= 7 * 60 && m < close) { open.className = 'ev-open'; open.textContent = 'Öppet nu'; $('[data-open-detail]').textContent = `till ${close / 60}.00`; }
    else { open.style.fontWeight = '600'; open.textContent = 'Stängt'; $('[data-open-detail]').textContent = (d >= 1 && d <= 5 && m < 7 * 60) ? 'öppnar 07.00' : (d >= 1 && d <= 4) ? 'öppnar 07.00 i morgon' : 'öppnar 07.00 på måndag'; }
  }

  /* ---------- Prislista: privat eller företag (ux-pris-moms) ---------- */
  const moms = $('[data-moms]');
  if (moms) {
    moms.addEventListener('click', e => {
      const b = e.target.closest('[data-moms-val]'); if (!b) return;
      $$('[data-moms-val]', moms).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const ex = b.dataset.momsVal === 'foretag';
      $$('[data-inkl]').forEach(el => {
        const from = el.textContent.trim().startsWith('från');
        const v = ex ? Math.round(Number(el.dataset.inkl) / 1.25) : Number(el.dataset.inkl);
        el.innerHTML = `${from ? 'från ' : ''}${kr(v)}${ex ? '<small>exkl. moms</small>' : ''}`;
      });
    });
  }

  /* ---------- Flödet Boka service ---------- */
  const SERVICES = [
    { id: 'liten', name: 'Liten service', desc: 'Olja, filter och 40 kontrollpunkter', price: 1995, from: true, time: '2–3 timmar' },
    { id: 'stor', name: 'Stor service', desc: 'Liten service plus tändstift och bromsvätska', price: 3495, from: true, time: '4–6 timmar' },
    { id: 'dack', name: 'Däckbyte', desc: 'Skifte av fyra hjul på fälg', price: 495, from: false, time: '30 minuter' },
    { id: 'bromsar', name: 'Bromsar', desc: 'Skivor och klossar, fram eller bak', price: 2495, from: true, time: '2 timmar' },
    { id: 'felsokning', name: 'Felsökning', desc: 'Varningslampa, missljud eller annat', price: 695, from: false, time: '1 timme' },
    { id: 'ac', name: 'AC-service', desc: 'Köldmedia, läcktest och desinficering', price: 995, from: false, time: '1 timme' },
    { id: 'besiktning', name: 'Kontroll inför besiktning', desc: 'Det besiktningen kontrollerar', price: 495, from: false, time: '45 minuter' },
    { id: 'annat', name: 'Något annat', desc: 'Beskriv i nästa steg, vi ringer med ett pris', price: 0, from: false, time: 'efter kontroll' }
  ];
  const svc = id => SERVICES.find(s => s.id === id);
  const priceTxt = s => s.price ? `${s.from ? 'från ' : ''}${kr(s.price)}` : 'offert';
  const TIMES = ['07.00', '07.30', '08.00', '08.30', '09.00', '10.00', '13.00', '14.00'];
  const hash = s => { let h = 11; for (const c of s) h = (h * 33 + c.charCodeAt(0)) % 10007; return h; };

  if ($('[data-flow]')) {
    $('[data-services]').innerHTML = SERVICES.map(s => `<button class="ev-choice" name="tjanst" value="${s.id}" data-label="${s.name}"><b>${s.name}</b><small>${s.desc}</small><span class="ev-price">${priceTxt(s)}</span></button>`).join('');
    const dag = $('#dag');
    const t = new Date(); t.setDate(t.getDate() + 1);
    while (t.getDay() === 0 || t.getDay() === 6) t.setDate(t.getDate() + 1);
    const max = new Date(); max.setDate(max.getDate() + 42);
    dag.min = isoDate(new Date(Date.now() + 864e5)); dag.max = isoDate(max); dag.value = isoDate(t);   // förifyllt med första lediga vardag
    let api = null;
    const renderTimes = () => {
      const grid = $('[data-times]'); const v = dag.value; const ok = v && !check(dag);
      $('[data-times-title]').textContent = ok ? `Lediga tider ${fmtDate(v).toLowerCase()}` : 'Lediga tider';
      grid.innerHTML = ok ? TIMES.map(tm => { const taken = hash(v + tm) % 3 === 0;
        return `<button class="ev-choice ev-time" name="tid" value="${tm}" data-label="${tm}"${taken ? ' disabled' : ''} aria-pressed="${api && api.state.tid === tm && api.state.dag === v}">${tm}${taken ? '<span class="ev-sr"> (bokad)</span>' : ''}</button>`; }).join('')
        : '<p class="ev-hint" style="grid-column:1/-1">Välj en vardag för att se lediga tider.</p>';
    };
    dag.addEventListener('change', () => { if (api) { api.set('tid', ''); api.render(); } renderTimes(); });
    dag.addEventListener('input', renderTimes);
    $('#regnr').addEventListener('blur', e => { if (!check(e.target)) e.target.value = fmtReg(e.target.value); });

    api = window.EV.flow({
      rows: [
        { label: 'Bil', step: 0, value: s => s.regnr ? fmtReg(s.regnr) + (s.matare ? `, ${s.matare.replace(/\s*mil$/i, '')} mil` : '') : '' },
        { label: 'Tjänst', step: 1, value: s => s.tjanst ? `${svc(s.tjanst).name}, ${priceTxt(svc(s.tjanst))}` : '' },
        { label: 'Lämna bilen', step: 2, value: s => s.tid ? `${fmtDate(s.dag)} klockan ${s.tid}` : '' },
        { label: 'Namn', step: 3, value: s => s.namn || '' },
        { label: 'Mobilnummer', step: 3, value: s => s.mobil || '' },
        { label: 'E-post', step: 3, value: s => s.epost || '' },
        { label: 'Meddelande', step: 3, value: s => s.medd || '' },
        { label: 'Lånebil', step: 3, value: s => s.lanebil === 'ja' ? 'Ja, 195 kr per dag' : s.lanebil === 'nej' ? 'Nej' : '' }
      ],
      total: s => s.tjanst ? `<span>Pris</span><span class="ev-price">${svc(s.tjanst).price ? priceTxt(svc(s.tjanst)) : 'Offert efter kontroll'}</span>` : '',
      onStep(i) { if (i === 2) renderTimes(); },
      onRender(s) {
        const p = $('[data-pay]'); if (!p || !s.tjanst) return;
        const x = svc(s.tjanst);
        p.innerHTML = x.price
          ? `Priset är <b style="font-weight:600">${priceTxt(x)}</b>${s.lanebil === 'ja' ? ' plus 195&nbsp;kr för lånebilen' : ''}. Arbetet tar ungefär ${x.time}. Du betalar när du hämtar bilen, och vi ringer innan vi gör något som kostar mer.`
          : 'Vi tittar på bilen och ringer med ett fast pris innan vi börjar. Kontrollen är kostnadsfri om du låter oss göra jobbet.';
      },
      prefill(params, a) {
        const r = params.get('regnr'); const tj = params.get('tjanst');
        if (tj && svc(tj)) a.set('tjanst', tj, svc(tj).name);
        if (r) {
          const inp = a.field('regnr'); inp.value = fmtReg(r); inp.dataset.touched = '1';
          const m = check(inp);
          if (m) { show(inp, m); a.go(0, false); }
          else { a.set('regnr', normReg(r)); a.go(tj && svc(tj) ? 2 : 1, false); }
        }
        a.render();
      },
      onDone(s, done) {
        $('[data-done-text]', done).textContent = `Lämna bilen ${fmtDate(s.dag).toLowerCase()} klockan ${s.tid} på Verkstadsgatan 12. Vi skickar en bekräftelse till ${s.mobil} och ${s.epost}, och ett sms när bilen är klar.`;
      }
    });
  }
})();
