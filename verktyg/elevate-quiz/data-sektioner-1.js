/* Elevate designquiz – Sektioner och layout, del 1 av 1. Genererad av en mall: verktyg + frågor. */
(function () {
/* ---------- Gemensam verktygslåda för delen Sektioner (prefix sek-) ---------- */
const PATHS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowur: '<path d="M7 17 17 7M8 7h9v9"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  chevu: '<path d="m6 15 6-6 6 6"/>',
  chevr: '<path d="m9 6 6 6-6 6"/>',
  chevl: '<path d="m15 6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  brush: '<path d="m18 3 3 3-9 9-3-3z"/><path d="M9 12c-3 0-5 2-5 5 0 1.5-1 2.5-2 3 4 1 9 0 9-5"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  sparkle: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/>',
  truck: '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2.4.6 4 2.3 4 5.2"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  heart: '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z"/>',
  car: '<path d="M3 13l2-6h14l2 6v5H3z"/><path d="M3 13h18"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  tooth: '<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .5 3 1 6.5 3 6.5s1.5-4 4-4 2 4 4 4 2.5-3.5 3-6.5c.5-2.5 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6"/>',
  filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  coffee: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
  bed: '<path d="M3 18V6M3 13h18v5M21 18v-3a3 3 0 0 0-3-3h-7v1"/><circle cx="7" cy="10" r="2"/>',
  dumbbell: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
  cross: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  utensils: '<path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2M17 2c-2 0-3 3-3 7h3v13"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  camera: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-1 2-2 3-4 4 0-2-1-4-2-5-1 4-4 6-4 11 0 4 3 7 7 7z"/>',
  tree: '<path d="M12 22v-5"/><path d="M12 2 5 12h4l-3 5h12l-3-5h4z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 3.5 7 8 12 8zM12 8s1.5-5 4-4.5S17 8 12 8z"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  pen: '<path d="M16 3l5 5L8 21H3v-5z"/>',
  car2: '<path d="M5 17h14M6 17v2M18 17v2"/><path d="M4 17v-4l2-6h12l2 6v4"/>',
  baby: '<circle cx="12" cy="7" r="4"/><path d="M5 21c1-5 3.5-7 7-7s6 2 7 7"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>'
};
const ic = (n, cls = '', sw = 1.8) => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[n] || ''}</svg>`;
const STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/></svg>';
const stars = (n = 5, sz = 16) => `<span class="stars" style="--ss:${sz}px" role="img" aria-label="${n} av 5 stjärnor">${STAR.repeat(n)}${n < 5 ? `<span style="opacity:.25;display:inline-flex">${STAR.repeat(5 - n)}</span>` : ''}</span>`;
const im = (n, alt, cls = '', st = '') => `<img src="img/${n}.jpg" alt="${alt}" class="im ${cls}" style="object-fit:cover;${st}" loading="lazy">`;
const POR = ['portratt-1', 'portratt-2', 'portratt-3'];
const PNAME = ['Emma Lindqvist', 'Johan Berg', 'Karin Sjöberg'];
const av = (i, sz = 44, st = '') => `<img src="img/${POR[i % 3]}.jpg" alt="Porträtt av ${PNAME[i % 3]}" class="av" style="width:${sz}px;height:${sz}px;object-fit:cover;${st}" loading="lazy">`;
const ini = (txt, sz = 44) => `<span class="ini" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz * .36)}px">${txt}</span>`;
const esc2 = s => String(s).replace(/"/g, '&quot;');

/* Stiliserad karta utan externa resurser */
const MAPSVG = `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="400" fill="#E9ECE6"/><path d="M0 312c110-22 190 26 320 6s210-50 280-34v116H0z" fill="#CFDFEA"/><rect x="392" y="36" width="150" height="104" rx="10" fill="#D6E5CF"/><rect x="40" y="168" width="90" height="70" rx="8" fill="#D6E5CF"/><g fill="#DEE1DA"><rect x="24" y="24" width="72" height="70" rx="4"/><rect x="108" y="24" width="88" height="70" rx="4"/><rect x="278" y="22" width="92" height="74" rx="4"/><rect x="150" y="168" width="54" height="70" rx="4"/><rect x="282" y="176" width="100" height="58" rx="4"/><rect x="408" y="178" width="96" height="56" rx="4"/><rect x="520" y="176" width="70" height="60" rx="4"/></g><g stroke="#fff" stroke-linecap="round" fill="none"><path d="M-10 128 610 150" stroke-width="16"/><path d="M234 -10 262 410" stroke-width="14"/><path d="M0 254 600 248" stroke-width="9"/><path d="M110 0 96 300M398 0 410 300M548 0 540 300" stroke-width="7"/></g></svg>`;
const map = (st = '', pinLabel = '') => `<div class="map" style="${st}">${MAPSVG}<span class="mpin">${ic('pin', '', 2)}</span>${pinLabel ? `<span class="mlab">${pinLabel}</span>` : ''}</div>`;

/* Påhittade kundlogotyper */
const LOGOS = [
  '<span class="lg" style="font-weight:800;letter-spacing:.16em;font-size:15px">NORRVIK</span>',
  '<span class="lg" style="font-family:Georgia,serif;font-style:italic;font-size:21px">Ekholm &amp; Co</span>',
  '<span class="lg"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg><b style="font-size:17px;letter-spacing:-.02em">Bergslunda</b></span>',
  '<span class="lg" style="font-size:19px;letter-spacing:-.04em;font-weight:500">fjord<b style="font-weight:800">lab</b></span>',
  '<span class="lg" style="font-family:\'Courier New\',monospace;font-weight:700;font-size:17px">KVARN/9</span>',
  '<span class="lg"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor"/><path d="M8 7v10h8" stroke="#fff" stroke-width="2.4" fill="none"/></svg><b style="font-size:17px">Lövgren</b></span>',
  '<span class="lg" style="font-weight:300;font-size:16px;letter-spacing:.06em">TALLBO<b style="font-weight:800">ENERGI</b></span>',
  '<span class="lg"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3 22 20H2z" fill="currentColor"/></svg><b style="font-size:17px;font-weight:700">Sandvreten</b></span>',
  '<span class="lg" style="font-family:Georgia,serif;font-weight:700;font-size:19px;letter-spacing:.02em">Hallbergs</span>',
  '<span class="lg" style="font-weight:700;font-size:17px;text-transform:lowercase;letter-spacing:.02em">mira<span style="opacity:.55">.studio</span></span>'
];

/* Gemensam CSS, allt under .sek */
const KCSS = `.sek{background:var(--box);color:var(--sink);text-align:left;font-size:15px}
.sek.b-ground{background:var(--ground)}.sek.b-tint{background:var(--tint)}.sek.b-brand{background:var(--brand);color:#fff}.sek.b-dark{background:#17191B;color:#fff}
.sek .sin{padding:clamp(32px,6.5cqi,80px) clamp(18px,4.5cqi,56px)}
.sek .sw{max-width:1120px;margin:0 auto;display:flex;flex-direction:column;gap:clamp(22px,3.4cqi,44px);min-width:0}
.sek .hd{display:flex;flex-direction:column;gap:10px;max-width:640px;min-width:0}
.sek .hd.c{text-align:center;align-items:center;margin-inline:auto}
.sek .hrow{display:flex;justify-content:space-between;align-items:flex-end;gap:14px 32px;flex-wrap:wrap}
.sek .t2{font-family:var(--fh);font-weight:var(--fhw);font-size:30px;font-size:clamp(25px,3.3cqi,38px);line-height:1.12;letter-spacing:-.015em;margin:0;text-wrap:balance;color:inherit}
.sek .t3{font-family:var(--fh);font-weight:var(--fhw);font-size:18px;line-height:1.25;letter-spacing:-.005em;margin:0;color:inherit}
.sek .t4{font-weight:600;font-size:15px;line-height:1.35;margin:0}
.sek .lead{font-size:16px;font-size:clamp(15px,1.5cqi,17px);color:var(--smuted);max-width:58ch;line-height:1.55}
.sek .p{color:var(--smuted);font-size:15px;line-height:1.55}
.sek .sm{font-size:13px}
.sek.b-brand .lead,.sek.b-brand .p,.sek.b-dark .lead,.sek.b-dark .p,.sek.b-brand .eyebrow,.sek.b-dark .eyebrow,.sek.b-brand .muted,.sek.b-dark .muted{color:rgba(255,255,255,.76)}
.sek .g{display:grid;gap:clamp(14px,2cqi,24px);min-width:0}.sek .g>*{min-width:0}
.sek .g2{grid-template-columns:repeat(2,minmax(0,1fr))}.sek .g3{grid-template-columns:repeat(3,minmax(0,1fr))}.sek .g4{grid-template-columns:repeat(4,minmax(0,1fr))}.sek .g5{grid-template-columns:repeat(5,minmax(0,1fr))}.sek .g6{grid-template-columns:repeat(6,minmax(0,1fr))}
@container (max-width:900px){.sek .g4,.sek .g5{grid-template-columns:repeat(2,minmax(0,1fr))}.sek .g6{grid-template-columns:repeat(3,minmax(0,1fr))}}
@container (max-width:680px){.sek .g3,.sek .g2{grid-template-columns:minmax(0,1fr)}.sek .hs{display:none!important}}
@container (max-width:460px){.sek .g4{grid-template-columns:minmax(0,1fr)}.sek .g6,.sek .g5{grid-template-columns:repeat(2,minmax(0,1fr))}}
.sek .card{background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:clamp(18px,2.2cqi,28px);display:flex;flex-direction:column;gap:10px;min-width:0;color:var(--sink)}
.sek .ib{width:44px;height:44px;border-radius:10px;background:var(--tint);color:var(--brand);display:grid;place-items:center;flex:0 0 auto}
.sek .ib .ico{width:22px;height:22px}
.sek .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(22px,4.5cqi,64px);align-items:center;min-width:0}
.sek .split>*{min-width:0}
@container (max-width:720px){.sek .split{grid-template-columns:minmax(0,1fr)}}
.sek .im{width:100%;object-fit:cover;border-radius:var(--rc);display:block;max-width:100%}
.sek .r43{aspect-ratio:4/3}.sek .r32{aspect-ratio:3/2}.sek .r11{aspect-ratio:1}.sek .r45{aspect-ratio:4/5}.sek .r34{aspect-ratio:3/4}.sek .r169{aspect-ratio:16/9}.sek .r21{aspect-ratio:2/1}
.sek .ck{display:flex;gap:10px;align-items:flex-start}.sek .ck>.ico{color:var(--brand);margin-top:2px}
.sek .stars{display:inline-flex;gap:2px;color:#D99A06;vertical-align:middle}.sek .stars svg{width:var(--ss,16px);height:var(--ss,16px)}
.sek .av{border-radius:50%;flex:0 0 auto;display:block}
.sek .ini{display:inline-grid;place-items:center;border-radius:50%;background:var(--tint);color:var(--brand);font-weight:700;flex:0 0 auto}
.sek .acts{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.sek .num{font-variant-numeric:tabular-nums}
.sek .rule{height:1px;background:var(--sline);border:0;margin:0}
.sek .ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.sek .rw{display:flex;gap:12px;align-items:center;min-width:0}
.sek .grow{flex:1 1 auto;min-width:0}
.sek .nw{white-space:nowrap}
.sek .tl{color:var(--brand);font-weight:600;display:inline-flex;align-items:center;gap:6px;text-decoration:none}.sek .tl .ico{width:18px;height:18px}
.sek .map{position:relative;overflow:hidden;border-radius:var(--rc);background:#E9ECE6;min-height:220px}
.sek .map>svg{position:absolute;inset:0;width:100%;height:100%}
.sek .mpin{position:absolute;left:50%;top:46%;transform:translate(-50%,-100%);width:40px;height:40px;border-radius:50% 50% 50% 0;rotate:-45deg;background:var(--brand);display:grid;place-items:center;box-shadow:0 4px 12px rgba(0,0,0,.2)}
.sek .mpin .ico{rotate:45deg;color:#fff;width:18px;height:18px}
.sek .mlab{position:absolute;left:50%;top:calc(46% + 8px);transform:translateX(-50%);background:#fff;color:var(--sink);font-size:12px;font-weight:600;padding:3px 9px;border-radius:6px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.12)}
.sek .lg{display:inline-flex;align-items:center;gap:8px;color:#55595E;white-space:nowrap;line-height:1}
.sek .phone{width:100%;max-width:300px;margin:0 auto;border:8px solid #1C1E20;border-radius:30px;overflow:hidden;background:var(--box);container-type:inline-size}
.sek .fake{display:flex;align-items:center;height:46px;padding:0 14px;border:1px solid var(--sline);border-radius:var(--rf);background:var(--field);color:var(--smuted);font-size:15px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sek .fake.ta{height:96px;align-items:flex-start;padding-top:12px}
.sek .lbl2{font-size:13px;font-weight:600;margin-bottom:5px;display:block}
.sek .sb,.sek .sb2{max-width:100%}
.sek .dots{flex:1 1 auto;border-bottom:1px dotted rgba(26,28,30,.35);margin:0 8px;transform:translateY(-4px);min-width:16px}`;

/* Sektionsomslag. o.bg: box|ground|tint|brand|dark. o.css: egen CSS med frågans prefix. */
const sec = (inner, o = {}) => `<style>${KCSS}${o.css || ''}</style><div class="hx sek b-${o.bg || 'box'} ${o.cls || ''}" style="${o.st || ''}"><div class="sin" style="${o.pad || ''}"><div class="sw" style="${o.sw || ''}">${inner}</div></div></div>`;
/* Fritt omslag utan inre padding (för helsidor, foto-band med mera) */
const raw = (inner, o = {}) => `<style>${KCSS}${o.css || ''}</style><div class="hx sek b-${o.bg || 'box'} ${o.cls || ''}" style="${o.st || ''}">${inner}</div>`;
/* Sektionsrubrik */
const hd = (o) => {
  const c = o.c ? ' c' : '';
  const eye = o.eye ? `<span class="eyebrow">${o.eye}</span>` : '';
  const p = o.p ? `<p class="lead">${o.p}</p>` : '';
  const head = `<div class="hd${c}">${eye}<h2 class="t2">${o.t}</h2>${p}</div>`;
  if (o.link) return `<div class="hrow">${head}<a class="link nw">${o.link}</a></div>`;
  if (o.right) return `<div class="hrow">${head}${o.right}</div>`;
  return head;
};
const btn = (t, alt) => `<a class="${alt ? 'sb2' : 'sb'}">${t}</a>`;
const Q = (id, q, opts, layout = 'stack') => ({ id: 'se-' + id, q, layout, opts });
const O = (l, h) => ({ l, h });
const GROUPS = [];
const G = (key, title, questions) => GROUPS.push({ key, title, questions });

/* ---------- Tjänster ---------- */
{
const BYGG = [
  { i: 'home', t: 'Tillbyggnad', d: 'Vi ritar, söker bygglov och bygger klart, med en kontaktperson hela vägen.', img: 'villa', a: 'Rött trähus med vita knutar' },
  { i: 'drop', t: 'Badrumsrenovering', d: 'Totalrenovering med certifierat våtrumsarbete och fast pris.', img: 'badrum', a: 'Ljust nyrenoverat badrum' },
  { i: 'tool', t: 'Snickeri och inredning', d: 'Platsbyggda bokhyllor, garderober och trappor efter mått.', img: 'snickare', a: 'Snickare som mäter upp en bräda' },
  { i: 'ruler', t: 'Fönster och dörrar', d: 'Byte av fönster och ytterdörrar, med ROT-avdrag direkt på fakturan.', img: 'vardagsrum', a: 'Vardagsrum med stora fönster' },
  { i: 'leaf', t: 'Altan och uterum', d: 'Altaner, trädäck och uterum i trä som håller i många år.', img: 'tradgard', a: 'Trädgård med sittplats' },
  { i: 'shield', t: 'Fukt och tak', d: 'Takomläggning, dränering och åtgärder mot fukt i källare.', img: 'renovering', a: 'Hantverkare som tätar ett rör' }
];
const H = hd({ eye: 'Tjänster', t: 'Det här hjälper vi till med', p: 'Från mindre renoveringar till hela tillbyggnader i Göteborg med omnejd.' });

const iconGrid = (items, o = {}) => `<div class="g g${o.n || 3}">${items.map((s, k) => `<div class="card ${o.cc || ''}">${o.icon ? o.icon(s, k) : `<span class="ib">${ic(s.i)}</span>`}<h3 class="t3">${s.t}</h3>${o.nod ? '' : `<p class="p">${s.d}</p>`}${o.extra ? o.extra(s, k) : ''}</div>`).join('')}</div>`;
const imgCards = (items, o = {}) => `<div class="g g${o.n || 3}">${items.map(s => `<div class="${o.cc || 'tc'}">${im(s.img, s.a, o.r || 'r43')}<div class="stack" style="gap:6px;padding-top:14px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p>${o.link === false ? '' : '<a class="link">Läs mer</a>'}</div></div>`).join('')}</div>`;
const listRows = items => `<div class="g g2" style="gap:0 48px">${items.map(s => `<div class="rw" style="padding:18px 0;border-top:1px solid var(--sline);align-items:flex-start"><div class="grow stack" style="gap:4px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div>${ic('arrow')}</div>`).join('')}</div>`;
const zigzag = (items, o = {}) => items.map((s, k) => `<div class="split" style="${(o.alt !== false && k % 2) ? 'direction:rtl' : ''}"><div style="direction:ltr">${im(s.img, s.a, 'r32')}</div><div class="stack" style="direction:ltr;gap:12px"><span class="eyebrow">0${k + 1}</span><h3 class="t2" style="font-size:clamp(22px,2.6cqi,30px)">${s.t}</h3><p class="lead">${s.d} Vi går igenom allt på plats och lämnar en tydlig offert inom en vecka.</p><div><a class="link">Läs mer om ${s.t.toLowerCase()}</a></div></div></div>`).join('');

const SALONG = [
  { t: 'Klippning', d: 'Konsultation, tvätt, klippning och styling.', p: '45 min · från 650 kr', img: 'frisor', a: 'Frisör som föner en kunds hår' },
  { t: 'Färg och slingor', d: 'Helfärg, slingor eller balayage efter dina önskemål.', p: '2 tim · från 1 450 kr', img: 'frisor', a: 'Frisör som arbetar med hårfärg' },
  { t: 'Behandlingar', d: 'Inpackning och hårbottenbehandling för friskt hår.', p: '30 min · från 395 kr', img: 'spa', a: 'Lugn behandlingsmiljö' },
  { t: 'Bryn och fransar', d: 'Formning, färgning och lashlift.', p: '30 min · från 350 kr', img: 'spa', a: 'Behandling i spa' },
  { t: 'Uppsättning', d: 'Fest, bröllop eller studentuppsättning.', p: '60 min · från 900 kr', img: 'frisor', a: 'Frisör som stylar hår' }
];

G('tjanster', 'Tjänster', [
  Q('tj-grundform', 'Hur ska tjänsterna presenteras på startsidan?', [
    O('Rutnät med ikoner', sec(H + iconGrid(BYGG))),
    O('Kort med bild', sec(H + imgCards(BYGG.slice(0, 3)))),
    O('Lista med rader och pilar', sec(H + listRows(BYGG))),
    O('Zickzack med bild och text', sec(H + zigzag(BYGG.slice(0, 3))))
  ]),

  Q('tj-flikar', 'Fem tjänsteområden med olika innehåll: flikar eller allt synligt?', (() => {
    const h = hd({ eye: 'Behandlingar', t: 'Vad vill du boka?', p: 'Salong Nova på Linnégatan. Alla priser inklusive moms.' });
    const css = `.se-tjf-tabs{display:flex;gap:4px;border-bottom:1px solid var(--sline);overflow-x:auto;scrollbar-width:none}.se-tjf-tabs span{padding:12px 16px;font-weight:600;color:var(--smuted);white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-1px}.se-tjf-tabs span.on{color:var(--sink);border-color:var(--brand)}
    .se-tjf-acc{border-top:1px solid var(--sline)}.se-tjf-acc>div{border-bottom:1px solid var(--sline);padding:18px 0}.se-tjf-acc .rw{justify-content:space-between}`;
    const s = SALONG[0];
    const tabs = `<div class="se-tjf-tabs">${SALONG.map((x, k) => `<span class="${k ? '' : 'on'}">${x.t}</span>`).join('')}</div>
      <div class="split">${im(s.img, s.a, 'r32')}<div class="stack" style="gap:12px"><h3 class="t2" style="font-size:clamp(22px,2.6cqi,30px)">${s.t}</h3><p class="lead">${s.d} Vi börjar alltid med en kort konsultation så att resultatet blir som du tänkt dig.</p><p class="price">${s.p}</p><div>${btn('Boka klippning')}</div></div></div>`;
    const grid = `<div class="g g3">${SALONG.slice(0, 3).map(x => `<div class="card">${im(x.img, x.a, 'r32')}<h3 class="t3">${x.t}</h3><p class="p">${x.d}</p><p class="price sm">${x.p}</p></div>`).join('')}</div><div class="g g2">${SALONG.slice(3).map(x => `<div class="card" style="flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap"><div class="stack" style="gap:4px"><h3 class="t3">${x.t}</h3><p class="p">${x.d}</p></div><span class="price sm nw">${x.p}</span></div>`).join('')}</div>`;
    const acc = `<div class="se-tjf-acc">${SALONG.map((x, k) => `<div><div class="rw"><h3 class="t3">${x.t}</h3>${ic(k ? 'plus' : 'minus')}</div>${k ? '' : `<div class="split" style="margin-top:16px;align-items:start">${im(x.img, x.a, 'r21')}<div class="stack"><p class="p">${x.d} Vi börjar alltid med en kort konsultation.</p><p class="price">${x.p}</p><div>${btn('Boka klippning')}</div></div></div>`}</div>`).join('')}</div>`;
    return [
      O('Flikar, ett område i taget', sec(h + tabs, { css })),
      O('Allt synligt i rutnät', sec(h + grid, { css })),
      O('Dragspel, ett område öppet', sec(h + acc, { css }))
    ];
  })()),

  Q('tj-ikon', 'Hur ska ikonen se ut i tjänstekorten?', (() => {
    const E = [
      { i: 'bolt', t: 'Elinstallation', d: 'Nyinstallation och omdragning i villa, lägenhet och lokal.' },
      { i: 'car2', t: 'Laddbox', d: 'Installation av laddbox med grönt avdrag för solel och laddning.' },
      { i: 'shield', t: 'Felsökning', d: 'Vi hittar felet snabbt och åtgärdar det samma dag.' }
    ];
    const h = hd({ eye: 'Elteam Syd', t: 'Våra tjänster', p: 'Auktoriserade elinstallatörer i Malmö och Lund sedan 2009.' });
    const v = (f) => sec(h + iconGrid(E, { icon: f }));
    return [
      O('Ikon i tonad ruta', v(s => `<span class="ib">${ic(s.i)}</span>`)),
      O('Fristående ikon utan ruta', v(s => `<span style="color:var(--brand)">${ic(s.i, '', 1.6).replace('class="ico ', 'style="width:30px;height:30px" class="ico ')}</span>`)),
      O('Ikon i rund cirkel', v(s => `<span class="ib" style="border-radius:50%;width:52px;height:52px">${ic(s.i)}</span>`)),
      O('Ikon i fylld brand-ruta', v(s => `<span class="ib" style="background:var(--brand);color:#fff">${ic(s.i)}</span>`)),
      O('Nummer i stället för ikon', v((s, k) => `<span style="font-weight:700;font-size:15px;color:var(--brand)" class="num">0${k + 1}</span>`))
    ];
  })()),

  Q('tj-kortyta', 'Hur ska tjänstekorten avgränsas mot bakgrunden?', (() => {
    const K = [
      { i: 'cross', t: 'Fysioterapi', d: 'Behandling och träning vid smärta i rygg, nacke och leder.' },
      { i: 'heart', t: 'Rehabilitering', d: 'Individuell plan efter operation eller skada.' },
      { i: 'users', t: 'Företagshälsa', d: 'Ergonomi och friskvård för arbetsplatser.' }
    ];
    const h = hd({ eye: 'Kliniken Vasa', t: 'Vård som får dig i rörelse igen', p: 'Legitimerade fysioterapeuter med lång erfarenhet.' });
    const css = `.se-tjk-sh .card{border:0;box-shadow:0 1px 2px rgba(0,0,0,.05),0 8px 24px rgba(0,0,0,.07)}.se-tjk-tn .card{border:0;background:var(--tint)}.se-tjk-no .card{border:0;border-top:2px solid var(--sink);border-radius:0;background:transparent;padding:20px 0 0}`;
    return [
      O('Vita kort med tunn kant', sec(h + iconGrid(K), { bg: 'ground', css })),
      O('Kort med mjuk skugga', sec(h + iconGrid(K), { bg: 'ground', css, cls: 'se-tjk-sh' })),
      O('Tonade kort utan kant', sec(h + iconGrid(K), { css, cls: 'se-tjk-tn' })),
      O('Inga kort, bara linje överst', sec(h + iconGrid(K), { css, cls: 'se-tjk-no' }))
    ];
  })()),

  Q('tj-kolumner', 'Hur många tjänstekort per rad på dator?', (() => {
    const h = hd({ eye: 'Tjänster', t: 'Hela badrummet, från rivning till kakel', p: 'Kakel & Bad Väst renoverar badrum i hela Västra Götaland.' });
    const B = [
      { i: 'home', t: 'Totalrenovering', d: 'Vi tar hand om allt, från rivning till sista silikonfogen.' },
      { i: 'drop', t: 'Tätskikt', d: 'Certifierat våtrumsarbete enligt branschregler.' },
      { i: 'grid', t: 'Kakel och klinker', d: 'Plattsättning på vägg och golv, även storformat.' },
      { i: 'tool', t: 'VVS', d: 'Byte av rör, golvbrunn, dusch och tvättställ.' },
      { i: 'sun', t: 'Golvvärme', d: 'Elektrisk eller vattenburen golvvärme.' },
      { i: 'doc', t: 'Projektering', d: 'Ritning, materialval och fast pris innan start.' },
      { i: 'leaf', t: 'Småjobb', d: 'Byte av toalett, kran eller duschvägg.' },
      { i: 'shield', t: 'Besiktning', d: 'Fuktmätning och besiktning av befintligt badrum.' }
    ];
    return [
      O('2 per rad', sec(h + iconGrid(B.slice(0, 4), { n: 2 }))),
      O('3 per rad', sec(h + iconGrid(B.slice(0, 6), { n: 3 }))),
      O('4 per rad', sec(h + iconGrid(B, { n: 4 })))
    ];
  })()),

  Q('tj-bildtext', 'Var ska texten sitta i tjänstekort med bild?', (() => {
    const S = [
      { t: 'Massage', d: 'Klassisk, djupgående eller med varma stenar.', img: 'spa', a: 'Massage med varma stenar' },
      { t: 'Ansiktsbehandling', d: 'Rengöring, peeling och återfuktande mask.', img: 'produkt-hudvard', a: 'Flaska med ansiktsserum' },
      { t: 'Spa-paket', d: 'Halvdag med behandling, bastu och lunch.', img: 'hotellrum', a: 'Ljust rum med utsikt över vatten' }
    ];
    const h = hd({ eye: 'Lumo Spa', t: 'Behandlingar', p: 'Ta en paus från vardagen, mitt i stan.' });
    const css = `.se-tjb-ov{position:relative;border-radius:var(--rc);overflow:hidden;min-height:340px;display:flex;align-items:flex-end;color:#fff}.se-tjb-ov img{position:absolute;inset:0;height:100%;border-radius:0}.se-tjb-ov::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,0) 60%)}.se-tjb-ov>div{position:relative;z-index:1;padding:22px}.se-tjb-ov .p{color:rgba(255,255,255,.85)}
    .se-tjb-ol>div:last-child{background:var(--box);margin:-48px 16px 0;position:relative;border-radius:var(--rc);padding:18px;box-shadow:0 6px 20px rgba(0,0,0,.08)}`;
    return [
      O('Text under bilden', sec(h + `<div class="g g3">${S.map(s => `<div class="stack" style="gap:14px">${im(s.img, s.a, 'r43')}<div class="stack" style="gap:6px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div></div>`).join('')}</div>`, { css })),
      O('Text på bilden med mörk toning', sec(h + `<div class="g g3">${S.map(s => `<div class="se-tjb-ov">${im(s.img, s.a)}<div class="stack" style="gap:6px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div></div>`).join('')}</div>`, { css })),
      O('Textruta som överlappar bilden', sec(h + `<div class="g g3">${S.map(s => `<div class="se-tjb-ol"><div>${im(s.img, s.a, 'r43')}</div><div class="stack" style="gap:6px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div></div>`).join('')}</div>`, { css, bg: 'ground' })),
      O('Text i kort med bild överst', sec(h + `<div class="g g3">${S.map(s => `<div class="card" style="padding:0;overflow:hidden;gap:0">${im(s.img, s.a, 'r43', 'border-radius:0')}<div class="stack" style="gap:6px;padding:18px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div></div>`).join('')}</div>`, { css, bg: 'ground' }))
    ];
  })()),

  Q('tj-bildformat', 'Vilket bildformat i tjänstekort med bild?', [
    ['4:3, klassiskt', 'r43'], ['1:1, kvadrat', 'r11'], ['3:4, stående', 'r34'], ['16:9, brett', 'r169']
  ].map(([l, r]) => O(l, sec(H + imgCards(BYGG.slice(0, 3), { r }))))),

  Q('tj-lank', 'Hur går man vidare från ett tjänstekort?', (() => {
    const T = BYGG.slice(0, 3);
    const card = (s, end) => `<div class="card">${im(s.img, s.a, 'r43')}<h3 class="t3">${s.t}</h3><p class="p">${s.d}</p>${end}</div>`;
    const css = `.se-tjl-c .card{position:relative}.se-tjl-c .se-tjl-ar{position:absolute;top:28px;right:28px;width:40px;height:40px;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--sink);box-shadow:0 2px 8px rgba(0,0,0,.15)}`;
    return [
      O('Textlänk "Läs mer" i kortet', sec(H + `<div class="g g3">${T.map(s => card(s, '<div style="margin-top:auto;padding-top:4px"><a class="link">Läs mer</a></div>')).join('')}</div>`)),
      O('Hela kortet klickbart, pil i hörnet', sec(H + `<div class="g g3 se-tjl-c">${T.map(s => card(s, `<span class="se-tjl-ar">${ic('arrowur')}</span>`)).join('')}</div>`, { css })),
      O('Knapp i varje kort', sec(H + `<div class="g g3">${T.map(s => card(s, `<div style="margin-top:auto;padding-top:6px">${btn('Läs mer', 1)}</div>`)).join('')}</div>`)),
      O('En knapp under alla kort', sec(H + `<div class="g g3">${T.map(s => card(s, '')).join('')}</div><div>${btn('Se alla tjänster')}</div>`))
    ];
  })()),

  Q('tj-pris', 'Ska tjänstekorten visa pris?', (() => {
    const h = hd({ eye: 'Salong Nova', t: 'Behandlingar', p: 'Boka direkt online, dygnet runt.' });
    const S = SALONG.slice(0, 3);
    const v = f => sec(h + `<div class="g g3">${S.map(s => `<div class="card">${im(s.img, s.a, 'r32')}<h3 class="t3">${s.t}</h3><p class="p">${s.d}</p>${f(s)}</div>`).join('')}</div>`);
    return [
      O('Inget pris i kortet', v(() => '<div><a class="link">Läs mer</a></div>')),
      O('"Från"-pris i kortet', v(s => `<p class="price">Från ${s.p.split('från ')[1]}</p>`)),
      O('Tid och pris i kortet', v(s => `<div class="rw" style="justify-content:space-between;border-top:1px solid var(--sline);padding-top:12px;margin-top:auto"><span class="muted sm rw" style="gap:6px">${ic('clock')}${s.p.split(' · ')[0]}</span><span class="price">${s.p.split('från ')[1]}</span></div>`))
    ];
  })()),

  Q('tj-zickzack', 'Zickzack med bild och text: hur ska raderna växla?', (() => {
    const A = [
      { t: 'Varumärke och identitet', d: 'Logotyp, typografi och färger som håller i alla kanaler.', img: 'mote', a: 'Team i möte vid ett bord' },
      { t: 'Webbplatser', d: 'Snabba, tillgängliga sajter som är lätta att uppdatera själv.', img: 'laptop', a: 'Laptop på ett skrivbord' },
      { t: 'Innehåll och foto', d: 'Text, foto och film som förklarar vad ni gör och varför.', img: 'kontor-team', a: 'Kollegor som arbetar tillsammans' }
    ];
    const h = hd({ eye: 'Studio Fält', t: 'Vad vi gör' });
    const css = `.se-tjz-b{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:stretch;background:var(--box)}.se-tjz-b+.se-tjz-b{margin-top:0}.se-tjz-b>div{min-width:0}.se-tjz-b .im{height:100%;min-height:280px;border-radius:0}.se-tjz-b .tx{padding:clamp(24px,5cqi,64px);display:flex;flex-direction:column;justify-content:center;gap:12px}.se-tjz-b.r{direction:rtl}.se-tjz-b.r>*{direction:ltr}@container (max-width:720px){.se-tjz-b{grid-template-columns:minmax(0,1fr)}.se-tjz-b .im{min-height:200px}}`;
    const txt = (s, k) => `<span class="eyebrow">0${k + 1}</span><h3 class="t2" style="font-size:clamp(22px,2.6cqi,30px)">${s.t}</h3><p class="lead">${s.d}</p><div><a class="link">Se exempel</a></div>`;
    return [
      O('Bilden byter sida varje rad', sec(h + A.map((s, k) => `<div class="split" style="${k % 2 ? 'direction:rtl' : ''}"><div style="direction:ltr">${im(s.img, s.a, 'r32')}</div><div class="stack" style="direction:ltr;gap:12px">${txt(s, k)}</div></div>`).join(''))),
      O('Bilden alltid till vänster', sec(h + A.map((s, k) => `<div class="split"><div>${im(s.img, s.a, 'r32')}</div><div class="stack" style="gap:12px">${txt(s, k)}</div></div>`).join(''))),
      O('Bilden går ut i kanten, utan luft', raw(`<div class="sin" style="padding-bottom:clamp(20px,3cqi,32px)"><div class="sw">${h}</div></div>` + A.map((s, k) => `<div class="se-tjz-b ${k % 2 ? 'r' : ''}"><div>${im(s.img, s.a)}</div><div class="tx">${txt(s, k)}</div></div>`).join(''), { css, bg: 'ground' }))
    ];
  })()),

  Q('tj-lista', 'Tjänster som lista: vilken stil?', (() => {
    const R = [
      ['Löpande bokföring', 'Vi bokför löpande och du ser siffrorna i realtid.'],
      ['Bokslut och årsredovisning', 'Klart i tid, med genomgång av resultatet.'],
      ['Lön', 'Lönekörning, skattedeklarationer och semesterlöner.'],
      ['Moms och skatt', 'Momsredovisning och deklarationer för företag och ägare.'],
      ['Rådgivning', 'Budget, prognoser och bolagsstruktur.'],
      ['Bolagsbildning', 'Vi startar aktiebolaget och sätter upp allt från dag ett.']
    ];
    const h = hd({ eye: 'Kvadrat Redovisning', t: 'Tjänster för små och växande bolag' });
    const css = `.se-tjli-n{counter-reset:n}.se-tjli-n>div{display:grid;grid-template-columns:56px minmax(0,1fr);gap:4px 16px;padding:20px 0;border-top:1px solid var(--sline)}.se-tjli-n .nr{font-weight:700;color:var(--brand);font-size:15px;padding-top:2px}`;
    return [
      O('Två kolumner med bockar', sec(`<div class="split" style="align-items:start">${h}<ul class="ul" style="gap:18px">${R.map(r => `<li class="ck">${ic('check', '', 2.2)}<div><p class="t4">${r[0]}</p><p class="p">${r[1]}</p></div></li>`).join('')}</ul></div>`)),
      O('Rader med linje och pil', sec(h + `<div>${R.map(r => `<div class="rw" style="padding:20px 0;border-top:1px solid var(--sline);justify-content:space-between"><div class="grow" style="display:flex;flex-wrap:wrap;gap:4px 32px;align-items:baseline"><h3 class="t3" style="flex:0 0 min(100%,300px)">${r[0]}</h3><p class="p grow">${r[1]}</p></div>${ic('arrow')}</div>`).join('')}</div>`)),
      O('Numrerad lista med beskrivning', sec(h + `<div class="g g2 se-tjli-n" style="gap:0 48px">${R.map((r, k) => `<div><span class="nr num">0${k + 1}</span><div class="stack" style="gap:4px"><h3 class="t3">${r[0]}</h3><p class="p">${r[1]}</p></div></div>`).join('')}</div>`, { css }))
    ];
  })()),

  Q('tj-manga', 'Tolv olika tjänster: hur visas de på startsidan?', (() => {
    const V = [['wheel', 'Däckbyte'], ['tool', 'Service'], ['shield', 'Bromsar'], ['sun', 'AC-service'], ['car', 'Besiktningsfix'], ['bolt', 'Batteri'], ['search', 'Felsökning'], ['drop', 'Oljebyte'], ['refresh', 'Hjulinställning'], ['layers', 'Avgassystem'], ['key', 'Kamrem'], ['sparkle', 'Rekond']];
    const h = hd({ eye: 'Bergs Bil & Däck', t: 'Allt för bilen, på ett ställe', p: 'Alla bilmärken. Lånebil ingår vid service.' });
    const css = `.se-tjm-t{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--sline);border-radius:var(--rc);background:var(--box);font-weight:600}.se-tjm-t .ico{color:var(--brand)}`;
    const cats = [['Underhåll', ['Service', 'Oljebyte', 'Kamrem', 'AC-service']], ['Reparation', ['Bromsar', 'Avgassystem', 'Batteri', 'Felsökning']], ['Däck och hjul', ['Däckbyte', 'Hjulinställning', 'Däckhotell', 'Rekond']]];
    return [
      O('Alla tolv i kompakt rutnät', sec(h + `<div class="g g4" style="gap:12px">${V.map(v => `<div class="se-tjm-t">${ic(v[0])}${v[1]}</div>`).join('')}</div>`, { css })),
      O('De sex viktigaste och länk till alla', sec(hd({ eye: 'Bergs Bil & Däck', t: 'Allt för bilen, på ett ställe', link: 'Alla tjänster (12)' }) + iconGrid(V.slice(0, 6).map(v => ({ i: v[0], t: v[1], d: 'Fast pris och klart samma dag i de flesta fall.' }))), { css })),
      O('Grupperade i tre kategorier', sec(h + `<div class="g g3">${cats.map(c => `<div class="stack" style="gap:12px"><h3 class="t3">${c[0]}</h3><ul class="ul" style="border-top:1px solid var(--sline)">${c[1].map(x => `<li class="rw" style="justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--sline)">${x}${ic('chevr')}</li>`).join('')}</ul></div>`).join('')}</div>`, { css }))
    ];
  })()),

  Q('tj-huvudtjanst', 'Ska en huvudtjänst lyftas fram större än de andra?', (() => {
    const D = [
      { i: 'tooth', t: 'Allmäntandvård', d: 'Undersökning, lagning och tandhygienist. Vi tar emot nya patienter.', img: 'tandlakare', a: 'Tandläkare som undersöker en patient' },
      { i: 'sparkle', t: 'Tandblekning', d: 'Skonsam blekning hos oss eller hemma.' },
      { i: 'smile', t: 'Implantat', d: 'Fast ersättning för en eller flera tänder.' },
      { i: 'heart', t: 'Tandvårdsrädsla', d: 'Lugnt tempo och extra tid för dig som är nervös.' }
    ];
    const h = hd({ eye: 'Tandkliniken Ljus', t: 'Behandlingar' });
    const css = `.se-tjhv{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(14px,2cqi,24px)}.se-tjhv>*{min-width:0}@container (max-width:760px){.se-tjhv{grid-template-columns:minmax(0,1fr)}}`;
    return [
      O('Alla tjänster lika stora', sec(h + iconGrid(D, { n: 4 }), { css })),
      O('En stor och tre mindre', sec(h + `<div class="se-tjhv"><div class="card" style="padding:0;overflow:hidden">${im(D[0].img, D[0].a, 'r32', 'border-radius:0')}<div class="stack" style="padding:clamp(18px,2.4cqi,28px);gap:10px"><span class="tag">Tar emot nya patienter</span><h3 class="t2" style="font-size:clamp(22px,2.4cqi,28px)">${D[0].t}</h3><p class="p">${D[0].d}</p><div>${btn('Boka undersökning')}</div></div></div><div class="stack" style="gap:clamp(14px,2cqi,24px)">${D.slice(1).map(s => `<div class="card" style="flex-direction:row;gap:14px"><span class="ib">${ic(s.i)}</span><div class="stack" style="gap:4px"><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div></div>`).join('')}</div></div>`, { css })),
      O('Stor bild med lista bredvid', sec(`<div class="split">${im(D[0].img, D[0].a, 'r43')}<div class="stack" style="gap:18px">${h}<ul class="ul" style="border-top:1px solid var(--sline)">${D.map(s => `<li class="rw" style="padding:16px 0;border-bottom:1px solid var(--sline);align-items:flex-start"><span style="color:var(--brand)">${ic(s.i)}</span><div class="grow"><p class="t4">${s.t}</p><p class="p">${s.d}</p></div></li>`).join('')}</ul></div></div>`, { css }))
    ];
  })()),

  Q('tj-hover', 'Vad händer när man håller musen över ett tjänstekort?', (() => {
    const T = BYGG.slice(0, 3);
    const mk = (cls, css) => sec(H + `<div class="g g3 ${cls}">${T.map((s, k) => `<div class="card ${k === 1 ? 'on' : ''}" style="transition:all .2s ease"><div style="overflow:hidden;border-radius:var(--rc)">${im(s.img, s.a, 'r43', 'transition:transform .4s ease')}</div><h3 class="t3">${s.t}</h3><p class="p">${s.d}</p></div>`).join('')}</div><p class="muted sm" style="text-align:center">Mittenkortet visas i hovrat läge.</p>`, { css: css + '@media (prefers-reduced-motion:reduce){.sek .card,.sek .card img{transition:none!important}}' });
    return [
      O('Ingen effekt', mk('se-tjho-a', '')),
      O('Kortet lyfts med skugga', mk('se-tjho-b', '.se-tjho-b .card.on,.se-tjho-b .card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,.1)}')),
      O('Kanten får brand-färg', mk('se-tjho-c', '.se-tjho-c .card.on,.se-tjho-c .card:hover{border-color:var(--brand);box-shadow:0 0 0 1px var(--brand)}')),
      O('Bilden zoomar in lätt', mk('se-tjho-d', '.se-tjho-d .card.on img,.se-tjho-d .card:hover img{transform:scale(1.06)}'))
    ];
  })()),

  Q('tj-flikstil', 'Om tjänsterna visas i flikar: vilken flikstil?', (() => {
    const h = hd({ eye: 'Kliniken Vasa', t: 'Behandlingar' });
    const tabsN = ['Fysioterapi', 'Massage', 'Rehab', 'Företag'];
    const body = `<div class="split" style="align-items:start">${im('klinik', 'Fysioterapeut i samtal med patient', 'r32')}<div class="stack" style="gap:12px"><h3 class="t2" style="font-size:clamp(22px,2.4cqi,28px)">Fysioterapi</h3><p class="lead">Undersökning, behandling och ett träningsprogram som passar din vardag. Ingen remiss behövs.</p><p class="price">Första besöket 60 min · 795 kr</p><div>${btn('Boka tid')}</div></div></div>`;
    const css = `.se-tjfs-u{display:flex;gap:4px;border-bottom:1px solid var(--sline);overflow-x:auto;scrollbar-width:none}.se-tjfs-u span{padding:12px 16px;font-weight:600;color:var(--smuted);white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-1px}.se-tjfs-u .on{color:var(--sink);border-color:var(--brand)}
    .se-tjfs-p{display:flex;gap:8px;flex-wrap:wrap}.se-tjfs-p span{padding:9px 18px;border-radius:999px;font-weight:600;background:var(--tint);color:var(--sink)}.se-tjfs-p .on{background:var(--brand);color:#fff}
    .se-tjfs-s{display:inline-flex;gap:4px;padding:4px;border-radius:12px;background:var(--ground);border:1px solid var(--sline);flex-wrap:wrap}.se-tjfs-s span{padding:9px 16px;border-radius:8px;font-weight:600;color:var(--smuted)}.se-tjfs-s .on{background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.12)}
    .se-tjfs-v{display:grid;grid-template-columns:200px minmax(0,1fr);gap:clamp(20px,4cqi,48px);align-items:start}.se-tjfs-v .nav{display:flex;flex-direction:column;border-left:1px solid var(--sline)}.se-tjfs-v .nav span{padding:10px 16px;font-weight:600;color:var(--smuted);border-left:2px solid transparent;margin-left:-1px}.se-tjfs-v .nav .on{color:var(--sink);border-color:var(--brand)}.se-tjfs-v .split{grid-template-columns:minmax(0,1fr)}@container (max-width:720px){.se-tjfs-v{grid-template-columns:minmax(0,1fr)}.se-tjfs-v .nav{flex-direction:row;overflow-x:auto;border-left:0;border-bottom:1px solid var(--sline)}.se-tjfs-v .nav span{border-left:0;border-bottom:2px solid transparent;margin:0 0 -1px;white-space:nowrap}}`;
    const t = cls => `<div class="${cls}">${tabsN.map((x, k) => `<span class="${k ? '' : 'on'}">${x}</span>`).join('')}</div>`;
    return [
      O('Understrukna flikar', sec(h + t('se-tjfs-u') + body, { css })),
      O('Pillerknappar', sec(h + t('se-tjfs-p') + body, { css })),
      O('Segmentväljare', sec(h + `<div>${t('se-tjfs-s')}</div>` + body, { css })),
      O('Vertikala flikar till vänster', sec(h + `<div class="se-tjfs-v"><div class="nav">${tabsN.map((x, k) => `<span class="${k ? '' : 'on'}">${x}</span>`).join('')}</div>${body}</div>`, { css }))
    ];
  })()),

  Q('tj-mobil', 'Hur ska tjänstekorten visas i mobilen?', (() => {
    const T = BYGG.slice(0, 4);
    const ph = inner => raw(`<div style="padding:20px 12px"><div class="phone"><div style="padding:22px 16px;display:flex;flex-direction:column;gap:14px"><span class="eyebrow">Tjänster</span><h2 class="t2" style="font-size:24px">Det här hjälper vi till med</h2>${inner}</div></div></div>`, { bg: 'ground' });
    const css = `.se-tjmo-sc{display:flex;gap:12px;overflow:hidden;margin-right:-16px}.se-tjmo-sc>div{flex:0 0 78%}`;
    return [
      O('Staplade kort med bild', ph(T.slice(0, 2).map(s => `<div class="card" style="padding:0;overflow:hidden;gap:0">${im(s.img, s.a, 'r32', 'border-radius:0')}<div class="stack" style="padding:14px;gap:4px"><h3 class="t3" style="font-size:17px">${s.t}</h3><p class="p sm">${s.d}</p></div></div>`).join(''))),
      O('Svepbar rad med kort', ph(`<div class="se-tjmo-sc">${T.slice(0, 2).map(s => `<div class="card" style="padding:0;overflow:hidden;gap:0">${im(s.img, s.a, 'r43', 'border-radius:0')}<div class="stack" style="padding:14px;gap:4px"><h3 class="t3" style="font-size:17px">${s.t}</h3><p class="p sm">${s.d}</p></div></div>`).join('')}</div><div class="rw" style="gap:6px;justify-content:center"><span style="width:18px;height:6px;border-radius:3px;background:var(--sink)"></span><span style="width:6px;height:6px;border-radius:3px;background:var(--sline)"></span><span style="width:6px;height:6px;border-radius:3px;background:var(--sline)"></span></div>`).replace('<style>', `<style>${css}`)),
      O('Kompakt lista med ikoner', ph(`<div style="border-top:1px solid var(--sline)">${BYGG.map(s => `<div class="rw" style="padding:13px 0;border-bottom:1px solid var(--sline)"><span class="ib" style="width:38px;height:38px">${ic(s.i)}</span><span class="grow t4">${s.t}</span>${ic('chevr')}</div>`).join('')}</div>`))
    ];
  })(), 'grid'),

  Q('tj-textmangd', 'Hur mycket text ska varje tjänstekort ha?', (() => {
    const E = [
      { i: 'bolt', t: 'Elinstallation', d: 'Nyinstallation och omdragning i villa, lägenhet och lokal.', x: ['Fast pris efter platsbesök', 'Elsäkerhetsintyg ingår'] },
      { i: 'car2', t: 'Laddbox', d: 'Installation av laddbox för hemmet eller bostadsrättsföreningen.', x: ['Grönt avdrag direkt på fakturan', 'Klart på en dag'] },
      { i: 'search', t: 'Felsökning', d: 'Vi hittar felet snabbt och åtgärdar det samma dag om det går.', x: ['Jour dygnet runt', 'Svar inom en timme'] }
    ];
    const h = hd({ eye: 'Elteam Syd', t: 'Våra tjänster' });
    return [
      O('Bara rubrik', sec(h + `<div class="g g3">${E.map(s => `<div class="card" style="flex-direction:row;align-items:center"><span class="ib">${ic(s.i)}</span><h3 class="t3 grow">${s.t}</h3>${ic('arrow')}</div>`).join('')}</div>`)),
      O('Rubrik och en mening', sec(h + iconGrid(E))),
      O('Rubrik, text och punktlista', sec(h + iconGrid(E, { extra: s => `<ul class="ul" style="gap:8px;margin-top:4px">${s.x.map(x => `<li class="ck sm">${ic('check', '', 2.2)}${x}</li>`).join('')}</ul>` })))
    ];
  })())
]);
}

window.QZ.part({ key: 'sektioner', groups: GROUPS });
})();
