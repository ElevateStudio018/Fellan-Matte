/* Linnea Strand Foto: gemensam exempeldata för startsidan, priser och bokningen.
   Lediga dagar räknas fram ur datumet, så heron, kalendern och sammanfattningen alltid visar samma sak. */
(function () {
  'use strict';

  var MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  var MONTHS_SHORT = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  var DAYS_SHORT = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];
  var HOLIDAYS = ['12-24', '12-25', '12-26', '12-31', '01-01', '01-06'];
  var TIMES = ['09.00', '10.30', '13.00', '14.30', '16.00'];
  var LEAD_DAYS = 3;   /* tidigast tre dagar fram, så att det finns tid för samtalet innan */

  function hash(n) {
    n = (n ^ 61) ^ (n >>> 16); n = Math.imul(n, 9); n ^= n >>> 4;
    n = Math.imul(n, 0x27d4eb2d); n ^= n >>> 15; return (n >>> 0) / 4294967296;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function today() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function earliest() { var t = today(); t.setDate(t.getDate() + LEAD_DAYS); return t; }

  /* December är högsäsong för porträtt, så där är det glesare. */
  function isFree(d) {
    if (!d || d < earliest() || d.getDay() === 0) return false;
    if (HOLIDAYS.indexOf(pad(d.getMonth() + 1) + '-' + pad(d.getDate())) > -1) return false;
    var key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return hash(key + 51 * 7919) < (d.getMonth() === 11 ? 0.14 : 0.34);
  }
  function freeDays(year, month) {
    var out = [], n = new Date(year, month + 1, 0).getDate();
    for (var i = 1; i <= n; i++) { var d = new Date(year, month, i); if (isFree(d)) out.push(d); }
    return out;
  }
  function freeTimes(d) {
    if (!isFree(d)) return [];
    var key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var out = TIMES.filter(function (t, i) { return hash(key * 7 + i * 131) > 0.42; });
    return out.length >= 2 ? out : TIMES.slice(1, 4);
  }
  /* Månaden som heron visar: innevarande om det finns lediga dagar kvar, annars nästa. */
  function heroMonth() {
    var t = earliest();
    var cur = freeDays(t.getFullYear(), t.getMonth());
    if (cur.length) return { year: t.getFullYear(), month: t.getMonth(), days: cur };
    var n = new Date(t.getFullYear(), t.getMonth() + 1, 1);
    return { year: n.getFullYear(), month: n.getMonth(), days: freeDays(n.getFullYear(), n.getMonth()) };
  }
  function fmtShort(d) { return DAYS_SHORT[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()]; }
  function fmtLong(d) { return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  function kr(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr'; }

  var TYPES = {
    portratt: { name: 'Porträtt', desc: 'För dig själv, till jobbet eller för familjen.', from: 1495, vat: 'inkl. moms' },
    foretag: { name: 'Företag', desc: 'Profilbilder, team och miljöbilder hos er.', from: 2900, vat: 'exkl. moms' },
    tryck: { name: 'Tryck', desc: 'Landskap på fine art-papper, med eller utan ram.', from: 895, vat: 'inkl. moms' }
  };

  var PACKAGES = {
    portratt: [
      { id: 'kort', name: 'Kort', price: 1495, desc: '30 minuter och 5 redigerade bilder.', items: ['30 minuter i studio eller utomhus', '5 redigerade bilder', 'Webbgalleri i 3 månader'] },
      { id: 'klassisk', name: 'Klassisk', price: 2495, rec: true, desc: '60 minuter och 12 redigerade bilder.', items: ['60 minuter i studio eller utomhus', '12 redigerade bilder', 'Byte av kläder en gång', 'Webbgalleri i 12 månader'] },
      { id: 'hel', name: 'Hel session', price: 3995, desc: '2 timmar, två miljöer och 25 bilder.', items: ['2 timmar, studio och utomhus', '25 redigerade bilder', 'Fria klädbyten', 'Ett tryck 30 × 40 cm ingår'] }
    ],
    foretag: [
      { id: 'profil', name: 'Profilbilder', price: 2900, desc: 'Upp till 5 personer hos er.', items: ['Upp till 5 personer', 'En vald bild per person', 'Enkel studio i ert mötesrum', 'Fri användning på webb och i tryck'] },
      { id: 'team', name: 'Team och miljö', price: 6500, rec: true, desc: 'Halvdag med profilbilder och 30 miljöbilder.', items: ['Halvdag, upp till 15 personer', 'En vald bild per person', '30 miljöbilder från ert arbete', 'Samma ljus för nyanställda senare'] },
      { id: 'heldag', name: 'Heldag', price: 11500, desc: 'Hela dagen och cirka 100 bilder.', items: ['Hela dagen, obegränsat antal personer', 'Cirka 100 redigerade bilder', 'Två platser samma dag', 'Bilder för årsredovisning och rekrytering'] }
    ],
    tryck: [
      { id: 'en', name: 'En tavla', price: 895, from: true, desc: 'Valfritt motiv, 30 × 40 till 100 × 140 cm.', items: ['Valfritt motiv ur portfolion', 'Fem storlekar', 'Ekram som tillval'] },
      { id: 'serie', name: 'Serie med tre', price: 3900, from: true, rec: true, desc: 'Tre motiv som hör ihop, 50 × 70 cm med ekram.', items: ['Tre motiv som hör ihop', '50 × 70 cm med ekram', 'Hjälp att välja i studion'] },
      { id: 'vagg', name: 'Väggen hos företaget', price: 9500, from: true, desc: 'Urval, tryck och upphängning hos er.', items: ['Urval för er lokal', 'Tryck i valfria storlekar', 'Leverans och upphängning'] }
    ]
  };

  var PLACES = {
    portratt: [
      { id: 'studio', name: 'Studio', desc: 'Studion i Stenstan i Sundsvall. Fast ljus, spegel och kaffe.' },
      { id: 'ute', name: 'Utomhus', desc: 'Inom tre mil från Sundsvall. Du väljer plats, eller så föreslår jag en.' }
    ],
    foretag: [
      { id: 'foretag', name: 'Hos företaget', desc: 'Jag ställer upp en enkel studio i ett mötesrum och tar miljöbilder där ni arbetar.' },
      { id: 'studio', name: 'Studio', desc: 'Ni kommer till studion i Stenstan. Passar för en eller ett par personer.' },
      { id: 'ute', name: 'Utomhus', desc: 'Till exempel vid kajen, i Stenstan eller vid er arbetsplats ute.' }
    ],
    tryck: [
      { id: 'studio', name: 'Studio', desc: 'Du hämtar tavlan i Stenstan och kan se provtryck i flera storlekar först.' },
      { id: 'foretag', name: 'Hos företaget', desc: 'Jag levererar och hänger upp tavlorna i er lokal.' }
    ]
  };

  var PRINT_SIZES = [
    { id: '30x40', name: '30 × 40 cm', price: 895, frame: 495 },
    { id: '40x50', name: '40 × 50 cm', price: 1195, frame: 595 },
    { id: '50x70', name: '50 × 70 cm', price: 1695, frame: 695 },
    { id: '70x100', name: '70 × 100 cm', price: 2495, frame: 995 },
    { id: '100x140', name: '100 × 140 cm', price: 3995, frame: 1495 }
  ];

  var MOTIFS = [
    { id: 'hostskog', name: 'Höst över dalen', img: 'img/tag-hostskog.jpg' },
    { id: 'stugor-sjo', name: 'Stugorna vid sjön', img: 'img/stugor-sjo.jpg' },
    { id: 'skog-sjo', name: 'Bryggan i augusti', img: 'img/skog-sjo.jpg' },
    { id: 'fjallen', name: 'Fjället i mars', img: 'img/fjallen.jpg' },
    { id: 'skidor', name: 'Spår i nysnö', img: 'img/skidor-ovanifran.jpg' },
    { id: 'gardar', name: 'Gårdarna i kvällsljus', img: 'img/gardar-kvall.jpg' }
  ];

  window.LS = {
    MONTHS: MONTHS, DAYS: DAYS, DAYS_SHORT: DAYS_SHORT, TYPES: TYPES, PACKAGES: PACKAGES, PLACES: PLACES,
    PRINT_SIZES: PRINT_SIZES, MOTIFS: MOTIFS,
    iso: iso, parse: parse, today: today, earliest: earliest, isFree: isFree, freeDays: freeDays,
    freeTimes: freeTimes, heroMonth: heroMonth, fmtShort: fmtShort, fmtLong: fmtLong, kr: kr
  };
})();
