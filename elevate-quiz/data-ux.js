/* Elevate designquiz – del UX-mönster (ux-).
   Små wireframes i grundstilen. Alla alternativ i en fråga delar samma
   byggstenar; bara mönstret som frågan gäller skiljer sig.
   Delad CSS har prefixet .uxk- och följer med varje alternativ. */
(function () {
'use strict';

/* ---------------- Delad stil ---------------- */
const S = `<style>
.uxk{font-size:13px;line-height:1.4;color:var(--sink);min-width:0;width:100%}
.uxk-pad{padding:16px}
.uxk-wide{max-width:780px;margin:0 auto}
.uxk-col{display:flex;flex-direction:column;gap:8px;min-width:0}
.uxk-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0}
.uxk-nw{flex-wrap:nowrap}
.uxk-sp{flex:1 1 auto;min-width:0}
.uxk-g4{gap:5px}.uxk-g12{gap:12px}.uxk-g16{gap:16px}
.uxk-c0{align-items:center;text-align:center}
.uxk-scr{background:var(--box);border:1px solid var(--sline);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;min-width:0;position:relative;container-type:inline-size}
.uxk-top{display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid var(--sline);min-width:0;background:var(--box)}
.uxk-logo{display:block;width:30px;height:10px;border-radius:3px;background:var(--sink);opacity:.8;flex:0 0 auto}
.uxk-nav{display:flex;gap:8px;align-items:center;min-width:0;overflow:hidden}
.uxk-body{padding:14px;display:flex;flex-direction:column;gap:10px;min-width:0;flex:1 1 auto}
.uxk-l{display:block;height:7px;border-radius:4px;background:rgba(26,28,30,.12);max-width:100%;flex:0 0 auto}
.uxk-hl{height:11px;background:rgba(26,28,30,.5)}
.uxk-ml{height:8px;background:rgba(26,28,30,.26)}
.uxk-h{font-weight:700;font-size:16px;line-height:1.2;letter-spacing:-.01em;margin:0}
.uxk-h2{font-weight:700;font-size:21px;line-height:1.15;letter-spacing:-.015em;margin:0;text-wrap:balance}
.uxk-s{font-size:12px}.uxk-xs{font-size:11px}
.uxk-m{color:var(--smuted)}
.uxk-b6{font-weight:600}
.uxk-br{color:var(--brand)}
.uxk-img{display:grid;place-items:center;background:var(--accent);color:rgba(36,64,94,.5);border-radius:6px;aspect-ratio:4/3;width:100%;min-width:0}
.uxk-b{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:34px;padding:0 14px;border-radius:7px;background:var(--brand);border:1.5px solid var(--brand);color:var(--bink);font-weight:600;font-size:13px;white-space:nowrap;line-height:1;flex:0 0 auto}
.uxk-b2{background:transparent;color:var(--brand)}
.uxk-b3{background:transparent;border-color:transparent;color:var(--brand);padding:0 2px;text-decoration:underline;text-underline-offset:3px}
.uxk-bw{display:flex;width:100%}
.uxk-bs{height:28px;padding:0 10px;font-size:12px}
.uxk-i{display:flex;align-items:center;gap:7px;height:34px;padding:0 10px;border:1px solid var(--sline);border-radius:6px;background:var(--field);color:var(--smuted);font-size:13px;min-width:0;white-space:nowrap;overflow:hidden}
.uxk-i.v{color:var(--sink)}
.uxk-i>span{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}
.uxk-ta{height:54px;align-items:flex-start;padding-top:8px}
.uxk-f{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1 1 100px}
.uxk-f>b{font-size:12px;font-weight:600}
.uxk-c{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:999px;border:1px solid var(--sline);background:var(--box);font-size:12px;font-weight:500;white-space:nowrap;flex:0 0 auto;color:var(--sink)}
.uxk-c.on{background:var(--tint);border-color:var(--brand);color:var(--brand)}
.uxk-cb{display:flex;align-items:center;gap:7px;font-size:12.5px;min-width:0}
.uxk-cb>i{display:grid;place-items:center;width:15px;height:15px;border:1.5px solid rgba(26,28,30,.4);border-radius:4px;color:#fff;flex:0 0 auto;background:var(--box)}
.uxk-cb.on>i{background:var(--brand);border-color:var(--brand)}
.uxk-cb.r>i{border-radius:50%}
.uxk-cb.r.on>i{background:var(--box);border:4.5px solid var(--brand)}
.uxk-cb.x{opacity:.42}
.uxk-cb .n{color:var(--smuted);margin-left:auto;padding-left:6px}
.uxk-oc{display:flex;align-items:center;gap:8px;border:1px solid var(--sline);border-radius:8px;padding:9px 10px;background:var(--box);min-width:0;font-size:13px}
.uxk-oc.on{border-color:var(--brand);box-shadow:0 0 0 1px var(--brand)}
.uxk-ph{width:100%;max-width:200px;margin:0 auto;border:6px solid #1A1C1E;border-radius:26px;background:var(--box);overflow:hidden;aspect-ratio:9/17.5;position:relative;display:flex;flex-direction:column}
.uxk-phb{flex:1 1 auto;display:flex;flex-direction:column;gap:9px;padding:10px;min-height:0;overflow:hidden;position:relative}
.uxk-pht{display:flex;align-items:center;gap:8px;padding:12px 10px 8px;border-bottom:1px solid var(--sline);background:var(--box);position:relative}
.uxk-dim{position:absolute;inset:0;background:rgba(26,28,30,.4);z-index:3}
.uxk-ov{position:absolute;z-index:4;background:var(--box);display:flex;flex-direction:column;gap:9px;padding:12px;min-width:0}
.uxk-box{border:1px solid var(--sline);border-radius:8px;background:var(--box);padding:10px;min-width:0}
.uxk-gr{background:var(--ground)}
.uxk-pop{box-shadow:0 8px 24px rgba(26,28,30,.16)}
.uxk-ic{flex:0 0 auto;display:block}
.uxk-hr{height:1px;background:var(--sline);width:100%;flex:0 0 auto}
.uxk-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;min-width:0}
.uxk-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;min-width:0}
.uxk-g4c{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;min-width:0}
.uxk-card{display:flex;flex-direction:column;gap:5px;min-width:0}
.uxk-pr{font-weight:700;font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.uxk-ann{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--smuted);border:1px dashed rgba(26,28,30,.3);border-radius:6px;padding:3px 7px;align-self:flex-start;background:var(--box)}
.uxk-st{display:flex;align-items:center;width:100%}
.uxk-d{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--sline);font-size:11px;font-weight:700;color:var(--smuted);background:var(--box);flex:0 0 auto;position:relative;z-index:1}
.uxk-d.on{border-color:var(--brand);background:var(--brand);color:#fff}
.uxk-d.ok{border-color:var(--brand);color:var(--brand)}
.uxk-st>.ln{flex:1;height:2px;background:var(--sline);min-width:6px}
.uxk-st>.ln.ok{background:var(--brand)}
.uxk-sn{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);width:100%}
.uxk-sn>span{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:var(--smuted);position:relative;text-align:center;min-width:0}
.uxk-sn>span>em{font-style:normal;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uxk-sn>span::before{content:"";position:absolute;top:10px;left:-50%;right:50%;height:2px;background:var(--sline)}
.uxk-sn>span:first-child::before{display:none}
.uxk-sn>span.ok::before,.uxk-sn>span.on::before{background:var(--brand)}
.uxk-sn>span.on{color:var(--sink);font-weight:600}
.uxk-sn>span.lk>em{color:var(--brand);text-decoration:underline;text-underline-offset:2px}
.uxk-pb{height:4px;border-radius:2px;background:var(--sline);overflow:hidden;width:100%}
.uxk-pb>i{display:block;height:100%;background:var(--brand);border-radius:2px}
.uxk-dd{position:absolute;left:0;right:0;top:38px;z-index:5;background:var(--box);border:1px solid var(--sline);border-radius:8px;box-shadow:0 8px 24px rgba(26,28,30,.14);padding:5px;display:flex;flex-direction:column}
.uxk-dd>span{display:flex;align-items:center;gap:8px;padding:6px 7px;border-radius:5px;font-size:12.5px;min-width:0;white-space:nowrap;overflow:hidden}
.uxk-dd>span.hi{background:var(--ground)}
.uxk-dd>small{font-size:10.5px;font-weight:600;color:var(--smuted);padding:5px 7px 2px}
.uxk-rel{position:relative}
.uxk-ellip{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.uxk-tg{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:var(--brand);color:#fff;font-size:10px;font-weight:700}
</style>`;

const W = (inner, cls = 'uxk-pad') => S + `<div class="uxk ${cls}">${inner}</div>`;
const WS = inner => W(inner, 'uxk-pad uxk-wide');

/* ---------------- Ikoner ---------------- */
const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  chevU: '<path d="m18 15-6-6-6 6"/>',
  arrR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 12h11.4l2.2-8.5H6.4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5h.01"/>',
  img: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-9 8"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  sort: '<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  save: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>',
  heart: '<path d="M12 20s-8-4.6-8-10.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.6C20 15.4 12 20 12 20z"/>'
};
const ic = (n, s = 16, sw = 2) => `<svg class="uxk-ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

/* ---------------- Byggstenar ---------------- */
const L = (w = 100, c = '') => `<i class="uxk-l ${c}" style="width:${typeof w === 'number' ? w + '%' : w}"></i>`;
const HL = (w = 60) => L(w, 'uxk-hl');
const ML = (w = 50) => L(w, 'uxk-ml');
const para = (n = 3, last = 60) => `<div class="uxk-col uxk-g4">${Array.from({ length: n }, (_, i) => L(i === n - 1 ? last : 100)).join('')}</div>`;
const T = (t, c = '') => `<span class="${c}">${t}</span>`;
const B = (t, k = '', c = '') => `<span class="uxk-b${k ? ' uxk-b' + k : ''}${c ? ' ' + c : ''}">${t}</span>`;
const I = (t, v = false, icon = '', c = '') => `<span class="uxk-i${v ? ' v' : ''}${c ? ' ' + c : ''}">${icon ? ic(icon, 15) : ''}<span>${t}</span></span>`;
const F = (lab, t, v = false, c = '') => `<div class="uxk-f"><b>${lab}</b>${I(t, v, '', c)}</div>`;
const C = (t, on = false, x = false) => `<span class="uxk-c${on ? ' on' : ''}">${t}${x ? ic('x', 12, 2.4) : ''}</span>`;
const CB = (t, on = false, n = '', r = false, c = '') => `<span class="uxk-cb${on ? ' on' : ''}${r ? ' r' : ''}${c ? ' ' + c : ''}"><i>${on && !r ? ic('check', 10, 3.4) : ''}</i>${t}${n !== '' ? `<span class="n">${n}</span>` : ''}</span>`;
const OC = (t, on = false, extra = '') => `<span class="uxk-oc${on ? ' on' : ''}">${CB('', on, '', true)}<span class="uxk-sp">${t}</span>${extra}</span>`;
const IMG = (r = '4/3', s = 18) => `<div class="uxk-img" style="aspect-ratio:${r}">${ic('img', s, 1.6)}</div>`;
const CARD = (price = '495 kr', r = '4/3', w = 80) => `<div class="uxk-card">${IMG(r)}${ML(w)}${price ? `<span class="uxk-pr">${price}</span>` : ''}</div>`;
const NAV = (n = 3) => `<span class="uxk-nav">${Array.from({ length: n }, () => L('24px')).join('')}</span>`;
const HD = (right = '', nav = 3) => `<div class="uxk-top"><i class="uxk-logo"></i>${nav ? NAV(nav) : ''}<span class="uxk-sp"></span>${right}</div>`;
const SCR = (inner, head = '', c = '') => `<div class="uxk-scr ${c}">${head}<div class="uxk-body">${inner}</div></div>`;
const PHT = (right = '', left = '') => `<div class="uxk-pht">${left}<i class="uxk-logo"></i><span class="uxk-sp"></span>${right || ic('menu', 16)}</div>`;
const PH = (inner, head = PHT(), after = '') => `<div class="uxk-ph">${head}<div class="uxk-phb">${inner}</div>${after}</div>`;
const ANN = (t, icon = '') => `<span class="uxk-ann">${icon ? ic(icon, 12) : ''}${t}</span>`;
const ROW = (inner, c = '') => `<div class="uxk-row ${c}">${inner}</div>`;
const COL = (inner, c = '') => `<div class="uxk-col ${c}">${inner}</div>`;
const SP = '<span class="uxk-sp"></span>';
const HR = '<div class="uxk-hr"></div>';
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

/* Steg */
const STEPS = ['Val', 'Uppgifter', 'Leverans', 'Bekräfta'];
const dotsNum = (cur, n = 4) => `<div class="uxk-st">${rep(n, i => `${i ? `<i class="ln${i <= cur ? ' ok' : ''}"></i>` : ''}<span class="uxk-d${i === cur ? ' on' : i < cur ? ' ok' : ''}">${i < cur ? ic('check', 11, 3) : i + 1}</span>`)}</div>`;
const dotsNamed = (cur, names = STEPS, link = 'done', num = true) => `<div class="uxk-sn">${names.map((nm, i) => {
  const st = i === cur ? 'on' : i < cur ? 'ok' : '';
  const lk = (link === 'done' && i < cur) || (link === 'all' && i !== cur) ? ' lk' : '';
  return `<span class="${st}${lk}"><span class="uxk-d${i === cur ? ' on' : i < cur ? ' ok' : ''}">${num ? (i < cur ? ic('check', 11, 3) : i + 1) : ''}</span><em>${nm}</em></span>`;
}).join('')}</div>`;
const bar = (f) => `<div class="uxk-pb"><i style="width:${f}%"></i></div>`;

/* ---------------- Frågor ---------------- */
const groups = [];
let G = null;
const grp = (key, title) => { G = { key, title, questions: [] }; groups.push(G); };
const Q = (id, q, layout, opts) => G.questions.push({ id, q, layout, opts: opts.map(([l, h]) => (h ? { l, h } : { l })) });

/* Gemensamt stegs-innehåll */
const stepQ = (btns = B('Fortsätt')) => `<p class="uxk-h">Hur vill du bli kontaktad?</p>${COL(OC('E-post', true) + OC('Telefon') + OC('SMS'), 'uxk-g4')}${btns}`;
const stepRow = ROW(SP + B('Fortsätt'));

/* ======================= FLÖDEN I FLERA STEG ======================= */
grp('floden', 'Flöden i flera steg');

Q('ux-flode-uppdelning', 'Hur ska ett längre formulär delas upp?', 'grid', [
  ['Ett beslut per steg', W(SCR(`${T('Steg 2 av 6', 'uxk-xs uxk-m uxk-b6')}${stepQ(ROW(SP + B('Fortsätt')))}`))],
  ['Några fält per steg', W(SCR(`${T('Steg 1 av 3', 'uxk-xs uxk-m uxk-b6')}<p class="uxk-h">Dina uppgifter</p>${F('Namn', 'Förnamn Efternamn')}${F('E-post', 'namn@exempel.se')}${F('Telefon', '070-000 00 00')}${ROW(SP + B('Fortsätt'))}`))],
  ['Allt på en sida', W(SCR(`<p class="uxk-h">Förfrågan</p><div class="uxk-row">${F('Namn', 'Förnamn Efternamn')}${F('E-post', 'namn@exempel.se')}</div>${T('Hur vill du bli kontaktad?', 'uxk-s uxk-b6')}${ROW(CB('E-post', true, '', true) + CB('Telefon', false, '', true) + CB('SMS', false, '', true), 'uxk-g12')}${F('Meddelande', 'Skriv här…', false, 'uxk-ta')}${ROW(SP + B('Skicka'))}`))]
]);

Q('ux-flode-indikator', 'Hur ska man se var man är i ett flöde?', 'grid', [
  ['Numrerade cirklar', W(SCR(dotsNum(1) + stepQ(stepRow)))],
  ['Förloppslinje', W(SCR(bar(50) + stepQ(stepRow)))],
  ['Text: Steg 2 av 4', W(SCR(T('Steg 2 av 4', 'uxk-s uxk-m uxk-b6') + stepQ(stepRow)))],
  ['Linje och text tillsammans', W(SCR(ROW(T('Steg 2 av 4', 'uxk-s uxk-m uxk-b6')) + bar(50) + stepQ(stepRow)))],
  ['Ingen stegindikator', W(SCR(stepQ(stepRow)))]
]);

Q('ux-flode-stegnamn', 'Ska stegen ha namn i indikatorn?', 'grid', [
  ['Bara siffror', W(SCR(dotsNum(1) + stepQ(stepRow)))],
  ['Siffror och namn', W(SCR(dotsNamed(1) + stepQ(stepRow)))],
  ['Bara namn', W(SCR(`<div class="uxk-row uxk-nw uxk-s" style="gap:6px">${STEPS.map((n, i) => `<span class="${i === 1 ? 'uxk-b6' : 'uxk-m'}" style="${i === 1 ? 'color:var(--brand);border-bottom:2px solid var(--brand);padding-bottom:3px' : 'padding-bottom:5px'}">${n}</span>${i < 3 ? ic('chevR', 12) : ''}`).join('')}</div>` + stepQ(stepRow)))]
]);

Q('ux-flode-indikator-plats', 'Var ska stegindikatorn sitta?', 'stack', [
  ['Överst, ovanför rubriken', WS(SCR(`<div style="max-width:420px;width:100%;margin:0 auto" class="uxk-col uxk-g12">${dotsNamed(1)}${stepQ(stepRow)}</div>`))],
  ['Lodrät lista till vänster', WS(SCR(`<div style="display:grid;grid-template-columns:minmax(0,120px) minmax(0,1fr);gap:18px">${COL(STEPS.map((n, i) => ROW(`<span class="uxk-d${i === 1 ? ' on' : i < 1 ? ' ok' : ''}">${i < 1 ? ic('check', 11, 3) : i + 1}</span>${T(n, 'uxk-s ' + (i === 1 ? 'uxk-b6' : 'uxk-m'))}`, 'uxk-nw')).join(''), 'uxk-g12')}${COL(stepQ(stepRow))}</div>`))],
  ['Längst ner vid knapparna', WS(SCR(`<div style="max-width:420px;width:100%;margin:0 auto" class="uxk-col uxk-g12">${stepQ('')}${ROW(T('Steg 2 av 4', 'uxk-s uxk-m uxk-b6') + SP + B('Fortsätt'))}</div>`))]
]);

Q('ux-flode-indikator-mobil', 'Hur ska stegindikatorn se ut på mobil?', 'grid', [
  ['Alla steg med namn', W(PH(dotsNamed(1) + stepQ(B('Fortsätt', '', 'uxk-bw'))))],
  ['Steg 2 av 4 och linje', W(PH(ROW(T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6') + SP + T('Uppgifter', 'uxk-xs uxk-b6')) + bar(50) + stepQ(B('Fortsätt', '', 'uxk-bw'))))],
  ['Bara en linje överst', W(PH(stepQ(B('Fortsätt', '', 'uxk-bw'))).replace('<div class="uxk-phb">', `<div style="padding:0">${bar(50).replace('border-radius:2px', 'border-radius:0')}</div><div class="uxk-phb">`))],
  ['Prickar', W(PH(ROW(rep(4, i => `<i style="width:${i === 1 ? 18 : 7}px;height:7px;border-radius:4px;background:${i <= 1 ? 'var(--brand)' : 'var(--sline)'}"></i>`), 'uxk-nw" style="gap:5px;justify-content:center') + stepQ(B('Fortsätt', '', 'uxk-bw'))))]
]);

const sumPanel = (title = true) => `<div class="uxk-box uxk-gr uxk-col uxk-g4" style="padding:12px">${title ? T('Sammanfattning', 'uxk-s uxk-b6') : ''}${rep(3, i => ROW(L([40, 52, 34][i]) + SP + L('22%'), 'uxk-nw'))}${HR}${ROW(T('Totalt', 'uxk-s uxk-b6') + SP + T('1 295 kr', 'uxk-pr'), 'uxk-nw')}</div>`;
const stepMain = `${dotsNum(1)}<p class="uxk-h">Välj leverans</p>${COL(OC('Hämta själv', true, T('0 kr', 'uxk-s uxk-m')) + OC('Hemleverans', false, T('99 kr', 'uxk-s uxk-m')), 'uxk-g4')}`;
Q('ux-flode-sammanfattning', 'Var ska sammanfattningen av valen visas?', 'stack', [
  ['I sidled, bredvid stegen', WS(SCR(`<div style="display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:16px;align-items:start">${COL(stepMain + stepRow, 'uxk-g12')}${sumPanel()}</div>`))],
  ['Längst ner, före knappen', WS(SCR(`<div style="max-width:440px;width:100%;margin:0 auto" class="uxk-col uxk-g12">${stepMain}${sumPanel()}${stepRow}</div>`))],
  ['Eget granska-steg på slutet', WS(SCR(`<div style="max-width:440px;width:100%;margin:0 auto" class="uxk-col uxk-g12">${stepMain}${stepRow}${ANN('Sammanfattningen visas först i sista steget: Bekräfta', 'info')}</div>`))],
  ['Ingen sammanfattning', WS(SCR(`<div style="max-width:440px;width:100%;margin:0 auto" class="uxk-col uxk-g12">${stepMain}${stepRow}</div>`))]
]);

const phStep = `${dotsNum(1)}<p class="uxk-h">Välj leverans</p>${COL(OC('Hämta själv', true) + OC('Hemleverans'), 'uxk-g4')}`;
Q('ux-flode-sammanfattning-mobil', 'Hur ska sammanfattningen visas på mobil?', 'grid', [
  ['Hopfälld rad överst', W(PH(`${phStep}${B('Fortsätt', '', 'uxk-bw')}`).replace('<div class="uxk-phb">', `<div class="uxk-row uxk-nw uxk-gr" style="padding:8px 10px;border-bottom:1px solid var(--sline)">${T('Visa sammanfattning', 'uxk-xs uxk-b6 uxk-br')}${ic('chevD', 12)}${SP}${T('1 295 kr', 'uxk-pr')}</div><div class="uxk-phb">`))],
  ['Fast rad längst ner med total', W(PH(phStep, PHT(), `<div class="uxk-col uxk-g4" style="padding:9px 10px;border-top:1px solid var(--sline);background:var(--box)">${ROW(T('Totalt', 'uxk-xs uxk-m') + SP + T('1 295 kr', 'uxk-pr') + ic('chevU', 12), 'uxk-nw')}${B('Fortsätt', '', 'uxk-bw')}</div>`))],
  ['Längst ner på sidan', W(PH(`${phStep}${sumPanel(false)}${B('Fortsätt', '', 'uxk-bw')}`))],
  ['Ingen sammanfattning', W(PH(`${phStep}${B('Fortsätt', '', 'uxk-bw')}`))]
]);

const shortStep = `<p class="uxk-h">Dina uppgifter</p>${F('Namn', 'Förnamn Efternamn')}${F('E-post', 'namn@exempel.se')}`;
Q('ux-flode-tillbaka-plats', 'Var ska Tillbaka sitta i ett flöde?', 'grid', [
  ['Vänster om Fortsätt, nere', W(SCR(`${shortStep}${ROW(B('Tillbaka', '2') + SP + B('Fortsätt'))}`))],
  ['Textlänk ovanför rubriken', W(SCR(`${ROW(ic('chevL', 14) + T('Tillbaka', 'uxk-s uxk-b6'), 'uxk-br" style="gap:2px')}${shortStep}${ROW(SP + B('Fortsätt'))}`))],
  ['Textlänk under Fortsätt', W(SCR(`${shortStep}${B('Fortsätt', '', 'uxk-bw')}<div class="uxk-row" style="justify-content:center">${T('Tillbaka', 'uxk-s uxk-b6 uxk-br')}</div>`))],
  ['Ingen Tillbaka-knapp', W(SCR(`${shortStep}${ROW(SP + B('Fortsätt'))}`))]
]);

Q('ux-flode-tillbaka-stil', 'Hur ska Tillbaka se ut bredvid Fortsätt?', 'grid', [
  ['Sekundärknapp med kant', W(SCR(`${shortStep}${ROW(B('Tillbaka', '2') + SP + B('Fortsätt'))}`))],
  ['Textlänk med pil', W(SCR(`${shortStep}${ROW(`<span class="uxk-row uxk-br uxk-s uxk-b6" style="gap:3px">${ic('arrL', 14)}Tillbaka</span>` + SP + B('Fortsätt'))}`))],
  ['Bara pil-ikon', W(SCR(`${shortStep}${ROW(`<span class="uxk-b uxk-b2" style="width:34px;padding:0" aria-label="Tillbaka">${ic('arrL', 15)}</span>` + SP + B('Fortsätt'))}`))],
  ['Knappar lika stora, halva var', W(SCR(`${shortStep}<div class="uxk-g2">${B('Tillbaka', '2')}${B('Fortsätt')}</div>`))]
]);

Q('ux-flode-klickbara-steg', 'Ska man kunna klicka på tidigare steg i indikatorn?', 'grid', [
  ['Ja, klara steg är länkar', W(SCR(dotsNamed(2, STEPS, 'done') + `<p class="uxk-h">Välj leverans</p>${COL(OC('Hämta själv', true) + OC('Hemleverans'), 'uxk-g4')}` + ROW(B('Tillbaka', '2') + SP + B('Fortsätt'))))],
  ['Nej, bara med Tillbaka', W(SCR(dotsNamed(2, STEPS, 'none') + `<p class="uxk-h">Välj leverans</p>${COL(OC('Hämta själv', true) + OC('Hemleverans'), 'uxk-g4')}` + ROW(B('Tillbaka', '2') + SP + B('Fortsätt'))))],
  ['Ja, alla steg, även kommande', W(SCR(dotsNamed(2, STEPS, 'all') + `<p class="uxk-h">Välj leverans</p>${COL(OC('Hämta själv', true) + OC('Hemleverans'), 'uxk-g4')}` + ROW(B('Tillbaka', '2') + SP + B('Fortsätt'))))]
]);

const reviewRow = (k, v, link = true) => ROW(`<span class="uxk-col" style="gap:1px;min-width:0">${T(k, 'uxk-xs uxk-m')}${T(v, 'uxk-s uxk-b6')}</span>${SP}${link ? T('Ändra', 'uxk-s uxk-b6 uxk-br') : ''}`, 'uxk-nw');
Q('ux-flode-andra-val', 'Hur ska man ändra ett val i sista steget?', 'grid', [
  ['Ändra-länk vid varje rad', W(SCR(`${dotsNum(3)}<p class="uxk-h">Bekräfta</p>${reviewRow('Kontakt', 'E-post')}${HR}${reviewRow('Leverans', 'Hämta själv')}${HR}${reviewRow('Datum', '12 maj')}${ROW(SP + B('Skicka'))}`))],
  ['Klicka på steget i indikatorn', W(SCR(`${dotsNamed(3, STEPS, 'done')}<p class="uxk-h">Bekräfta</p>${reviewRow('Kontakt', 'E-post', false)}${HR}${reviewRow('Leverans', 'Hämta själv', false)}${HR}${reviewRow('Datum', '12 maj', false)}${ROW(SP + B('Skicka'))}`))],
  ['Gå tillbaka steg för steg', W(SCR(`${dotsNum(3)}<p class="uxk-h">Bekräfta</p>${reviewRow('Kontakt', 'E-post', false)}${HR}${reviewRow('Leverans', 'Hämta själv', false)}${HR}${reviewRow('Datum', '12 maj', false)}${ROW(B('Tillbaka', '2') + SP + B('Skicka'))}`))]
]);

Q('ux-flode-fortsatt-plats', 'Var ska Fortsätt sitta under fälten?', 'grid', [
  ['Till höger', W(SCR(`${shortStep}${ROW(SP + B('Fortsätt'))}`))],
  ['Till vänster', W(SCR(`${shortStep}${ROW(B('Fortsätt'))}`))],
  ['Full bredd', W(SCR(`${shortStep}${B('Fortsätt', '', 'uxk-bw')}`))],
  ['Centrerad', W(SCR(`${shortStep}<div class="uxk-row" style="justify-content:center">${B('Fortsätt')}</div>`))]
]);

Q('ux-flode-auto-vidare', 'Ska man gå vidare direkt när man klickat på ett alternativ?', 'grid', [
  ['Ja, direkt vidare vid klick', W(SCR(`${T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6')}<p class="uxk-h">Hur vill du bli kontaktad?</p>${COL(['E-post', 'Telefon', 'SMS'].map(t => `<span class="uxk-oc"><span class="uxk-sp">${t}</span>${ic('chevR', 14)}</span>`).join(''), 'uxk-g4')}${ANN('Klick går till nästa steg', 'info')}`))],
  ['Nej, välj och tryck Fortsätt', W(SCR(`${T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6')}${stepQ(stepRow)}`))]
]);

Q('ux-flode-forvantan', 'Vad ska man få veta innan ett flöde börjar?', 'grid', [
  ['Hur lång tid det tar', W(SCR(`<p class="uxk-h">Skicka en förfrågan</p>${para(2, 70)}${ROW(ic('clock', 14) + T('Tar ungefär 2 minuter', 'uxk-s uxk-m'), 'uxk-m" style="gap:6px')}${ROW(B('Börja'))}`))],
  ['Hur många steg det är', W(SCR(`<p class="uxk-h">Skicka en förfrågan</p>${para(2, 70)}${ROW(ic('list', 14) + T('4 korta steg', 'uxk-s uxk-m'), 'uxk-m" style="gap:6px')}${ROW(B('Börja'))}`))],
  ['Vad man behöver ha till hands', W(SCR(`<p class="uxk-h">Skicka en förfrågan</p>${T('Det här behöver du:', 'uxk-s uxk-b6')}${COL(['Personnummer', 'Adress', 'Önskat datum'].map(t => ROW(ic('check', 13, 2.4) + T(t, 'uxk-s'), 'uxk-nw" style="gap:6px')).join(''), 'uxk-g4')}${ROW(B('Börja'))}`))],
  ['Ingenting, börja direkt', W(SCR(`${T('Steg 1 av 4', 'uxk-xs uxk-m uxk-b6')}<p class="uxk-h">Hur vill du bli kontaktad?</p>${COL(OC('E-post') + OC('Telefon'), 'uxk-g4')}${stepRow}`))]
]);

Q('ux-flode-spara', 'Ska ett långt flöde kunna sparas och fortsättas senare?', 'grid', [
  ['Sparas automatiskt', W(SCR(`${ROW(T('Steg 3 av 6', 'uxk-xs uxk-m uxk-b6') + SP + `<span class="uxk-row uxk-xs uxk-m" style="gap:4px">${ic('check', 12, 2.6)}Sparat</span>`)}${shortStep}${stepRow}`))],
  ['Knapp: Spara och fortsätt senare', W(SCR(`${T('Steg 3 av 6', 'uxk-xs uxk-m uxk-b6')}${shortStep}${ROW(T('Spara och fortsätt senare', 'uxk-s uxk-b6 uxk-br') + SP + B('Fortsätt'))}`))],
  ['Ingen sparning', W(SCR(`${T('Steg 3 av 6', 'uxk-xs uxk-m uxk-b6')}${shortStep}${stepRow}`))]
]);

Q('ux-flode-avbryt', 'Hur ska man kunna avbryta ett flöde?', 'grid', [
  ['Kryss uppe till höger', W(SCR(`${ROW(T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6') + SP + ic('x', 16))}${shortStep}${stepRow}`))],
  ['Textlänk Avbryt vid knapparna', W(SCR(`${T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6')}${shortStep}${ROW(T('Avbryt', 'uxk-s uxk-b6 uxk-m') + SP + B('Fortsätt'))}`))],
  ['Bara via loggan och menyn', W(SCR(`${T('Steg 2 av 4', 'uxk-xs uxk-m uxk-b6')}${shortStep}${stepRow}`, HD('', 3)))]
]);

Q('ux-flode-meny', 'Ska den vanliga menyn synas under ett flöde?', 'grid', [
  ['Full meny som vanligt', W(SCR(`${dotsNum(1)}${shortStep}${stepRow}`, HD(ic('search', 15) + ic('user', 15), 4)))],
  ['Bara logga (fokusläge)', W(SCR(`${dotsNum(1)}${shortStep}${stepRow}`, `<div class="uxk-top" style="justify-content:center"><i class="uxk-logo"></i></div>`))],
  ['Logga och hjälp-telefon', W(SCR(`${dotsNum(1)}${shortStep}${stepRow}`, HD(`<span class="uxk-row uxk-xs uxk-m" style="gap:4px">${ic('phone', 12)}Behöver du hjälp?</span>`, 0)))]
]);

Q('ux-flode-klart', 'Vad ska sidan visa när flödet är klart?', 'grid', [
  ['Bekräftelse och vad som händer nu', W(SCR(`<div class="uxk-col uxk-c0">${`<span style="color:var(--ok)">${ic('ok', 30, 1.8)}</span>`}<p class="uxk-h">Tack, vi har fått din förfrågan</p></div>${T('Det här händer nu', 'uxk-s uxk-b6')}${COL(['Du får en bekräftelse via e-post', 'Vi hör av oss inom en dag', 'Vi bokar en tid tillsammans'].map((t, i) => ROW(`<span class="uxk-d ok" style="width:18px;height:18px;font-size:10px">${i + 1}</span>${T(t, 'uxk-s')}`, 'uxk-nw')).join(''), 'uxk-g4')}`))],
  ['Bara en bekräftelse', W(SCR(`<div class="uxk-col uxk-c0" style="padding:16px 0">${`<span style="color:var(--ok)">${ic('ok', 30, 1.8)}</span>`}<p class="uxk-h">Tack, vi har fått din förfrågan</p>${T('Vi hör av oss inom en dag.', 'uxk-s uxk-m')}</div>`))],
  ['Bekräftelse och sammanfattning', W(SCR(`<div class="uxk-col uxk-c0">${`<span style="color:var(--ok)">${ic('ok', 30, 1.8)}</span>`}<p class="uxk-h">Tack, vi har fått din förfrågan</p></div>${reviewRow('Kontakt', 'E-post', false)}${HR}${reviewRow('Datum', '12 maj', false)}`))],
  ['Bekräftelse och knapp vidare', W(SCR(`<div class="uxk-col uxk-c0" style="padding:8px 0">${`<span style="color:var(--ok)">${ic('ok', 30, 1.8)}</span>`}<p class="uxk-h">Tack, vi har fått din förfrågan</p>${T('Vi hör av oss inom en dag.', 'uxk-s uxk-m')}${B('Till startsidan', '2')}</div>`))]
]);

/* ======================= SÖK ======================= */
grp('sok', 'Sök');

const srch = (t = 'Sök', w = '') => `<span class="uxk-i" style="${w}">${ic('search', 14)}<span>${t}</span></span>`;
Q('ux-sok-placering', 'Var ska sökfältet sitta i headern på desktop?', 'stack', [
  ['Brett fält i mitten', WS(`<div class="uxk-scr"><div class="uxk-top" style="gap:14px"><i class="uxk-logo"></i><span class="uxk-sp" style="max-width:420px;margin:0 auto">${srch('Sök', 'height:30px')}</span>${ic('user', 15)}${ic('cart', 15)}</div><div class="uxk-body">${HL(40)}${para(2, 50)}</div></div>`)],
  ['Litet fält till höger', WS(`<div class="uxk-scr">${HD(`${srch('Sök', 'height:30px;width:130px')}${ic('user', 15)}${ic('cart', 15)}`, 4)}<div class="uxk-body">${HL(40)}${para(2, 50)}</div></div>`)],
  ['Bara en sökikon', WS(`<div class="uxk-scr">${HD(`${ic('search', 15)}${ic('user', 15)}${ic('cart', 15)}`, 4)}<div class="uxk-body">${HL(40)}${para(2, 50)}</div></div>`)],
  ['Fält på egen rad under menyn', WS(`<div class="uxk-scr">${HD(`${ic('user', 15)}${ic('cart', 15)}`, 4)}<div style="padding:8px 12px;border-bottom:1px solid var(--sline)">${srch('Sök', 'height:30px')}</div><div class="uxk-body">${HL(40)}${para(2, 50)}</div></div>`)]
]);

const phCont = `${IMG('16/10')}${HL(70)}${para(2, 60)}`;
Q('ux-sok-mobil', 'Hur ska sök visas på mobil?', 'grid', [
  ['Ikon i headern', W(PH(phCont, PHT(ic('search', 16) + ic('menu', 16))))],
  ['Synligt fält under headern', W(PH(phCont, PHT() + `<div style="padding:8px 10px;border-bottom:1px solid var(--sline)">${srch('Sök', 'height:30px')}</div>`))],
  ['I en bottenmeny', W(PH(phCont, PHT(), `<div class="uxk-row uxk-nw" style="justify-content:space-around;padding:8px 6px 10px;border-top:1px solid var(--sline)">${['Hem', 'Sök', 'Konto'].map((t, i) => `<span class="uxk-col uxk-c0 uxk-xs ${i === 1 ? 'uxk-br uxk-b6' : 'uxk-m'}" style="gap:2px">${ic(['grid', 'search', 'user'][i], 16)}${t}</span>`).join('')}</div>`))]
]);

const typed = (t = 'sto') => `<span class="uxk-i v uxk-sel" style="border-color:var(--brand);box-shadow:0 0 0 1px var(--brand)">${ic('search', 14)}<span>${t}<i style="display:inline-block;width:1px;height:14px;background:var(--sink);vertical-align:middle;margin-left:1px"></i></span></span>`;
Q('ux-sok-oppna', 'Vad ska hända när man klickar på sökikonen?', 'grid', [
  ['Fältet växer ut i headern', W(`<div class="uxk-scr"><div class="uxk-top"><i class="uxk-logo"></i><span class="uxk-sp">${typed('')}</span>${ic('x', 15)}</div><div class="uxk-body">${HL(50)}${para(3, 60)}</div></div>`)],
  ['Överlägg över hela sidan', W(`<div class="uxk-scr" style="min-height:190px">${HD(ic('search', 15), 2)}<div class="uxk-body">${HL(50)}${para(3, 60)}</div><div class="uxk-ov" style="inset:0;padding:14px">${ROW(`<span class="uxk-sp">${typed('')}</span>${ic('x', 16)}`, 'uxk-nw')}${T('Populära sökningar', 'uxk-xs uxk-m uxk-b6')}${ROW(C('Lampor') + C('Stolar') + C('Mattor'))}</div></div>`)],
  ['Panel fälls ner under headern', W(`<div class="uxk-scr" style="min-height:190px">${HD(ic('search', 15), 2)}<div class="uxk-body">${HL(50)}${para(3, 60)}</div><div class="uxk-dim" style="top:37px"></div><div class="uxk-ov uxk-pop" style="left:0;right:0;top:37px">${ROW(`<span class="uxk-sp">${typed('')}</span>${B('Sök', '', 'uxk-bs')}`, 'uxk-nw')}</div></div>`)]
]);

const ddWrap = (field, dd) => `<div class="uxk-rel" style="padding-bottom:178px">${field}${dd}</div>`;
Q('ux-sok-forslag', 'Ska förslag visas medan man skriver?', 'grid', [
  ['Ja, sökförslag i text', W(ddWrap(typed(), `<div class="uxk-dd">${['stol', 'stolar i ek', 'stoldyna', 'stolsben'].map((t, i) => `<span class="${i ? '' : 'hi'}">${ic('search', 12)}<span><b>sto</b>${t.slice(3)}</span></span>`).join('')}</div>`))],
  ['Ja, träffar med bild och pris', W(ddWrap(typed(), `<div class="uxk-dd">${rep(3, i => `<span><span style="width:30px;flex:0 0 30px">${IMG('1/1', 12)}</span><span class="uxk-col" style="gap:3px;flex:1;min-width:0">${ML([70, 55, 62][i])}<span class="uxk-pr">${['495 kr', '1 290 kr', '249 kr'][i]}</span></span></span>`)}<span class="uxk-br uxk-b6" style="justify-content:center">Visa alla 24 träffar</span></div>`))],
  ['Både förslag och träffar', W(ddWrap(typed(), `<div class="uxk-dd">${['stol', 'stolar i ek'].map(t => `<span>${ic('search', 12)}<span><b>sto</b>${t.slice(3)}</span></span>`).join('')}<small>Produkter</small>${rep(2, i => `<span><span style="width:26px;flex:0 0 26px">${IMG('1/1', 11)}</span><span class="uxk-col" style="gap:3px;flex:1;min-width:0">${ML([70, 55][i])}<span class="uxk-pr">${['495 kr', '1 290 kr'][i]}</span></span></span>`)}</div>`))],
  ['Nej, först efter Enter', W(`<div style="padding-bottom:178px">${typed()}</div>`)]
]);

Q('ux-sok-forslag-markering', 'Hur ska det man skrivit markeras i förslagen?', 'grid', [
  ['Det man skrivit är fetat', W(ddWrap(typed(), `<div class="uxk-dd">${['stol', 'stolar i ek', 'stoldyna', 'stolsben'].map(t => `<span>${ic('search', 12)}<span><b>sto</b>${t.slice(3)}</span></span>`).join('')}</div>`))],
  ['Resten av ordet är fetat', W(ddWrap(typed(), `<div class="uxk-dd">${['stol', 'stolar i ek', 'stoldyna', 'stolsben'].map(t => `<span>${ic('search', 12)}<span>sto<b>${t.slice(3)}</b></span></span>`).join('')}</div>`))],
  ['Ingen markering', W(ddWrap(typed(), `<div class="uxk-dd">${['stol', 'stolar i ek', 'stoldyna', 'stolsben'].map(t => `<span>${ic('search', 12)}<span>${t}</span></span>`).join('')}</div>`))]
]);

const focused = `<span class="uxk-i" style="border-color:var(--brand);box-shadow:0 0 0 1px var(--brand)">${ic('search', 14)}<span>Sök</span></span>`;
const recent = ['lampa', 'stol ek', 'matta grå'].map(t => `<span>${ic('clock', 12)}<span class="uxk-sp">${t}</span>${ic('x', 11)}</span>`).join('');
const popular = ['Nyheter', 'Rea', 'Presentkort'].map(t => `<span>${ic('trend', 12)}<span>${t}</span></span>`).join('');
Q('ux-sok-tomt-falt', 'Vad ska visas när man klickar i ett tomt sökfält?', 'grid', [
  ['Senaste sökningar', W(ddWrap(focused, `<div class="uxk-dd"><small>Senaste sökningar</small>${recent}</div>`))],
  ['Populära sökningar', W(ddWrap(focused, `<div class="uxk-dd"><small>Populärt just nu</small>${popular}</div>`))],
  ['Både senaste och populära', W(ddWrap(focused, `<div class="uxk-dd"><small>Senaste</small>${['lampa', 'stol ek'].map(t => `<span>${ic('clock', 12)}<span class="uxk-sp">${t}</span>${ic('x', 11)}</span>`).join('')}<small>Populärt</small>${['Nyheter', 'Rea'].map(t => `<span>${ic('trend', 12)}<span>${t}</span></span>`).join('')}</div>`))],
  ['Ingenting förrän man skriver', W(`<div style="padding-bottom:178px">${focused}</div>`)]
]);

Q('ux-sok-skicka', 'Hur ska man skicka iväg en sökning?', 'grid', [
  ['Ikon-knapp inne i fältet', W(`<span class="uxk-i v" style="padding-right:3px"><span>stol</span><span class="uxk-b" style="height:26px;width:30px;padding:0;border-radius:5px">${ic('search', 14)}</span></span>`)],
  ['Separat knapp med texten Sök', W(ROW(`<span class="uxk-sp">${I('stol', true)}</span>${B('Sök')}`, 'uxk-nw'))],
  ['Bara Enter, ikon till vänster', W(I('stol', true, 'search'))]
]);

const resHead = ROW(T('24 träffar för ”stol”', 'uxk-s uxk-b6'));
Q('ux-sok-resultat-vy', 'Hur ska sökresultat visas?', 'grid', [
  ['Lista med text', W(SCR(`${resHead}${rep(3, i => `<div class="uxk-col uxk-g4">${ML([60, 48, 66][i])}${L(90)}${L(55)}</div>${i < 2 ? HR : ''}`)}`))],
  ['Lista med liten bild', W(SCR(`${resHead}${rep(3, i => `<div class="uxk-row uxk-nw" style="align-items:flex-start"><span style="width:52px;flex:0 0 52px">${IMG('1/1', 13)}</span><div class="uxk-col uxk-g4 uxk-sp">${ML([60, 48, 66][i])}${L(80)}<span class="uxk-pr">${['495 kr', '1 290 kr', '249 kr'][i]}</span></div></div>`)}`))],
  ['Rutnät med bilder', W(SCR(`${resHead}<div class="uxk-g2">${rep(4, i => CARD(['495 kr', '1 290 kr', '249 kr', '890 kr'][i], '4/3', 75))}</div>`))]
]);

Q('ux-sok-antal-traffar', 'Hur ska sökresultatet sammanfattas överst?', 'grid', [
  ['Antal träffar och sökordet', W(SCR(`${T('24 träffar för ”stol”', 'uxk-h')}<div class="uxk-g2">${rep(2, () => CARD())}</div>`))],
  ['Bara sökordet som rubrik', W(SCR(`${T('”stol”', 'uxk-h')}<div class="uxk-g2">${rep(2, () => CARD())}</div>`))],
  ['Sökordet i fältet, ingen rubrik', W(SCR(`${I('stol', true, 'search')}<div class="uxk-g2">${rep(2, () => CARD())}</div>`))]
]);

Q('ux-sok-inga-traffar', 'Vad ska visas när en sökning inte ger några träffar?', 'grid', [
  ['Tips och populära förslag', W(SCR(`<p class="uxk-h">Inga träffar för ”stoll”</p>${T('Kontrollera stavningen eller prova ett bredare ord.', 'uxk-s uxk-m')}${T('Populärt just nu', 'uxk-xs uxk-b6')}${ROW(C('Stolar') + C('Lampor') + C('Mattor'))}`))],
  ['Menade du …?', W(SCR(`<p class="uxk-h">Inga träffar för ”stoll”</p>${T('Menade du <span class="uxk-br uxk-b6" style="text-decoration:underline">stol</span>?', 'uxk-s')}`))],
  ['Visar närmaste träffar direkt', W(SCR(`${T('Inga exakta träffar för ”stoll”. Visar träffar för ”stol”.', 'uxk-s uxk-m')}<div class="uxk-g2">${rep(2, () => CARD())}</div>`))],
  ['Bara ett meddelande', W(SCR(`<p class="uxk-h">Inga träffar för ”stoll”</p>`))]
]);

Q('ux-sok-kategori', 'Ska man kunna avgränsa sökningen till en kategori?', 'grid', [
  ['Rullgardin före fältet', W(`<span class="uxk-i v" style="padding:0"><span class="uxk-row uxk-nw uxk-s uxk-b6" style="flex:0 0 auto;gap:3px;padding:0 9px;border-right:1px solid var(--sline);height:100%">Allt${ic('chevD', 12)}</span><span style="padding-left:2px">stol</span></span>`)],
  ['Flikar ovanför resultaten', W(COL(`${I('stol', true, 'search')}<div class="uxk-row uxk-nw uxk-s" style="gap:14px;border-bottom:1px solid var(--sline)">${['Allt (24)', 'Produkter (18)', 'Artiklar (6)'].map((t, i) => `<span class="${i ? 'uxk-m' : 'uxk-b6 uxk-br'}" style="padding-bottom:6px;${i ? '' : 'border-bottom:2px solid var(--brand);margin-bottom:-1px'}">${t}</span>`).join('')}</div>${L(80)}${L(60)}`))],
  ['Ingen uppdelning', W(COL(`${I('stol', true, 'search')}${L(80)}${L(60)}`))]
]);

/* ======================= FILTER ======================= */
grp('filter', 'Filter');

const fGroup = (title, items, open = true) => `<div class="uxk-col uxk-g4">${ROW(T(title, 'uxk-xs uxk-b6') + SP + ic(open ? 'chevU' : 'chevD', 12), 'uxk-nw')}${open ? items : ''}</div>`;
const fItems = (on = [0], n = 3, counts = false, names = ['Alternativ A', 'Alternativ B', 'Alternativ C', 'Alternativ D', 'Alternativ E', 'Alternativ F']) => rep(n, i => CB(names[i], on.includes(i), counts ? [12, 8, 5, 3, 2, 1][i] : '', false, 'uxk-xs'));
const cards = (n = 6, cols = 3) => `<div style="display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:8px">${rep(n, i => CARD(['495 kr', '1 290 kr', '249 kr', '890 kr', '349 kr', '1 090 kr', '590 kr', '790 kr'][i % 8], '4/3', 70))}</div>`;

Q('ux-filter-placering', 'Var ska filtren sitta på desktop?', 'stack', [
  ['Sidopanel till vänster', WS(SCR(`<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);gap:14px">${COL(fGroup('Kategori', fItems([0])) + HR + fGroup('Storlek', fItems([1], 2, false, ['S', 'M'])) + HR + fGroup('Pris', fItems([], 2, false, ['Under 500 kr', '500–1 000 kr'])), 'uxk-g12')}${cards(6, 3)}</div>`))],
  ['Rad med rullgardiner ovanför', WS(SCR(`${ROW(['Kategori', 'Storlek', 'Pris', 'Färg'].map(t => `<span class="uxk-c">${t}${ic('chevD', 11)}</span>`).join(''))}${cards(8, 4)}`))],
  ['Knapp som öppnar en panel', WS(SCR(`${ROW(`<span class="uxk-b uxk-b2 uxk-bs">${ic('sliders', 14)}Filter</span>${SP}${T('24 produkter', 'uxk-xs uxk-m')}`)}${cards(8, 4)}`))]
]);

const phList = `${ROW(T('24 produkter', 'uxk-xs uxk-m'))}<div class="uxk-g2">${rep(4, () => CARD('495 kr', '1/1', 70))}</div>`;
const fPanel = `${fGroup('Kategori', fItems([0]))}${HR}${fGroup('Storlek', fItems([1], 3, false, ['S', 'M', 'L']))}`;
Q('ux-filter-mobil', 'Hur ska filtren öppnas på mobil?', 'grid', [
  ['Utdragslåda från sidan', W(PH(phList, PHT(), `<div class="uxk-dim"></div><div class="uxk-ov" style="top:0;bottom:0;right:0;width:82%">${ROW(T('Filter', 'uxk-s uxk-b6') + SP + ic('x', 14), 'uxk-nw')}${fPanel}<span class="uxk-sp"></span>${B('Visa 24 resultat', '', 'uxk-bw uxk-bs')}</div>`))],
  ['Bottenark', W(PH(phList, PHT(), `<div class="uxk-dim"></div><div class="uxk-ov" style="left:0;right:0;bottom:0;border-radius:14px 14px 0 0;padding-top:6px"><i style="width:30px;height:4px;border-radius:2px;background:var(--sline);align-self:center"></i>${ROW(T('Filter', 'uxk-s uxk-b6') + SP + ic('x', 14), 'uxk-nw')}${fPanel}${B('Visa 24 resultat', '', 'uxk-bw uxk-bs')}</div>`))],
  ['Helsida', W(PH(phList, PHT(), `<div class="uxk-ov" style="inset:0">${ROW(ic('x', 14) + T('Filter', 'uxk-s uxk-b6') + SP + T('Rensa', 'uxk-xs uxk-br uxk-b6'), 'uxk-nw')}${HR}${fPanel}${HR}${fGroup('Pris', '', false)}${HR}${fGroup('Färg', '', false)}<span class="uxk-sp"></span>${B('Visa 24 resultat', '', 'uxk-bw uxk-bs')}</div>`))],
  ['Chipsrad som går att svepa', W(PH(`<div class="uxk-row uxk-nw" style="overflow:hidden;margin-right:-10px">${`<span class="uxk-c">${ic('sliders', 12)}Filter</span>` + C('Kategori') + C('Storlek') + C('Pris')}</div>${phList}`))]
]);

const activeChips = (x = true) => ROW(C('Alternativ A', true, x) + C('Storlek M', true, x) + C('Under 500 kr', true, x));
Q('ux-filter-aktiva', 'Hur ska aktiva filter visas?', 'grid', [
  ['Chips med kryss ovanför resultaten', W(SCR(`${ROW(`<span class="uxk-b uxk-b2 uxk-bs">${ic('sliders', 14)}Filter</span>`)}${activeChips()}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))],
  ['Antal på filterknappen', W(SCR(`${ROW(`<span class="uxk-b uxk-b2 uxk-bs">${ic('sliders', 14)}Filter<span class="uxk-tg">3</span></span>`)}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))],
  ['Bara ibockade i panelen', W(SCR(`<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:10px">${COL(fGroup('Kategori', fItems([0], 2)) + fGroup('Storlek', CB('M', true, '', false, 'uxk-xs') + CB('L', false, '', false, 'uxk-xs')), 'uxk-g12')}<div class="uxk-g2" style="align-content:start">${rep(2, () => CARD('495 kr', '1/1', 70))}</div></div>`))],
  ['Text: Filtrerat på A, M …', W(SCR(`${ROW(`<span class="uxk-b uxk-b2 uxk-bs">${ic('sliders', 14)}Filter</span>`)}${T('Filtrerat på: Alternativ A, Storlek M, Under 500 kr', 'uxk-xs uxk-m')}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))]
]);

Q('ux-filter-rensa', 'Var ska Rensa alla sitta?', 'grid', [
  ['Sist i raden med aktiva filter', W(SCR(`${ROW(C('Alternativ A', true, true) + C('Storlek M', true, true) + T('Rensa alla', 'uxk-xs uxk-b6 uxk-br" style="text-decoration:underline'))}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))],
  ['Överst i filterpanelen', W(SCR(`${ROW(T('Filter', 'uxk-s uxk-b6') + SP + T('Rensa alla', 'uxk-xs uxk-b6 uxk-br'), 'uxk-nw')}${HR}${fGroup('Kategori', fItems([0], 3))}${fGroup('Storlek', CB('M', true, '', false, 'uxk-xs'))}`))],
  ['Längst ner bredvid Visa', W(SCR(`${ROW(T('Filter', 'uxk-s uxk-b6'))}${HR}${fGroup('Kategori', fItems([0], 3))}${fGroup('Storlek', CB('M', true, '', false, 'uxk-xs'))}${HR}<div class="uxk-g2">${B('Rensa alla', '2', 'uxk-bs')}${B('Visa 24', '', 'uxk-bs')}</div>`))],
  ['Inget Rensa alla', W(SCR(`${ROW(C('Alternativ A', true, true) + C('Storlek M', true, true))}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))]
]);

Q('ux-filter-direkt', 'När ska ett filterval slå igenom?', 'grid', [
  ['Direkt vid varje val', W(PH(`${ROW(T('Filter', 'uxk-s uxk-b6') + SP + ic('x', 14), 'uxk-nw')}${fPanel}${HR}${fGroup('Pris', '', false)}${ANN('Listan uppdateras direkt', 'info')}`, PHT()))],
  ['Knapp: Visa resultat', W(PH(`${ROW(T('Filter', 'uxk-s uxk-b6') + SP + ic('x', 14), 'uxk-nw')}${fPanel}${HR}${fGroup('Pris', '', false)}<span class="uxk-sp"></span>${B('Visa resultat', '', 'uxk-bw')}`, PHT()))],
  ['Knapp med antal: Visa 24', W(PH(`${ROW(T('Filter', 'uxk-s uxk-b6') + SP + ic('x', 14), 'uxk-nw')}${fPanel}${HR}${fGroup('Pris', '', false)}<span class="uxk-sp"></span>${B('Visa 24 resultat', '', 'uxk-bw')}`, PHT()))]
]);

Q('ux-filter-grupper', 'Hur ska filtergrupperna i panelen visas från början?', 'grid', [
  ['Alla grupper öppna', W(SCR(`${fGroup('Kategori', fItems([], 3))}${HR}${fGroup('Storlek', fItems([], 2, false, ['S', 'M']))}${HR}${fGroup('Pris', fItems([], 2, false, ['Under 500 kr', '500–1 000 kr']))}`))],
  ['Alla hopfällda', W(SCR(`${fGroup('Kategori', '', false)}${HR}${fGroup('Storlek', '', false)}${HR}${fGroup('Pris', '', false)}${HR}${fGroup('Färg', '', false)}${HR}${fGroup('Material', '', false)}`))],
  ['Första öppen, resten stängda', W(SCR(`${fGroup('Kategori', fItems([], 3))}${HR}${fGroup('Storlek', '', false)}${HR}${fGroup('Pris', '', false)}${HR}${fGroup('Färg', '', false)}`))]
]);

Q('ux-filter-manga-val', 'Hur ska en filtergrupp med många val visas?', 'grid', [
  ['Fem val och Visa fler', W(SCR(fGroup('Märke', fItems([], 5) + T('+ Visa 12 till', 'uxk-xs uxk-b6 uxk-br'))))],
  ['Alla val synliga', W(SCR(fGroup('Märke', fItems([], 6) + rep(3, i => CB('Alternativ ' + 'GHI'[i], false, '', false, 'uxk-xs')))))],
  ['Rullbar lista', W(SCR(fGroup('Märke', `<div class="uxk-col uxk-g4" style="height:104px;overflow:hidden;border:1px solid var(--sline);border-radius:6px;padding:6px 8px;position:relative">${fItems([], 6)}<i style="position:absolute;right:3px;top:6px;width:4px;height:36px;border-radius:2px;background:rgba(26,28,30,.25)"></i></div>`)))],
  ['Sökfält i gruppen', W(SCR(fGroup('Märke', I('Sök märke', false, 'search', 'uxk-bs" style="height:28px') + fItems([], 4))))]
]);

Q('ux-filter-antal-per-val', 'Ska antal träffar stå vid varje filterval?', 'grid', [
  ['Ja, antal till höger', W(SCR(fGroup('Kategori', fItems([0], 5, true))))],
  ['Ja, antal inom parentes', W(SCR(fGroup('Kategori', rep(5, i => CB(['Alternativ A', 'Alternativ B', 'Alternativ C', 'Alternativ D', 'Alternativ E'][i] + ` <span class="uxk-m">(${[12, 8, 5, 3, 2][i]})</span>`, i === 0, '', false, 'uxk-xs')))))],
  ['Nej, inga antal', W(SCR(fGroup('Kategori', fItems([0], 5))))]
]);

Q('ux-filter-kontroll', 'Hur ska filtervalen se ut?', 'grid', [
  ['Kryssrutor', W(SCR(fGroup('Storlek', rep(4, i => CB(['S', 'M', 'L', 'XL'][i], i === 1, '', false, 'uxk-xs')))))],
  ['Chips som går att markera', W(SCR(fGroup('Storlek', ROW(rep(4, i => C(['S', 'M', 'L', 'XL'][i], i === 1)), 'uxk-g4" style="gap:6px'))))],
  ['Länkar, ett val i taget', W(SCR(fGroup('Storlek', rep(4, i => T(['S', 'M', 'L', 'XL'][i] + (i === 1 ? ' ✓' : ''), 'uxk-s ' + (i === 1 ? 'uxk-b6' : 'uxk-br" style="text-decoration:underline;text-underline-offset:2px'))))))],
  ['Rutor i ett rutnät', W(SCR(fGroup('Storlek', `<div class="uxk-g4c" style="gap:5px">${rep(4, i => `<span class="uxk-oc${i === 1 ? ' on' : ''}" style="justify-content:center;padding:6px 0;font-size:12px">${['S', 'M', 'L', 'XL'][i]}</span>`)}</div>`)))]
]);

Q('ux-filter-pris', 'Hur ska man filtrera på pris?', 'grid', [
  ['Reglage med två handtag', W(SCR(fGroup('Pris', `<div style="position:relative;height:18px;margin:2px 7px"><i style="position:absolute;left:0;right:0;top:8px;height:3px;border-radius:2px;background:var(--sline)"></i><i style="position:absolute;left:18%;right:35%;top:8px;height:3px;background:var(--brand)"></i>${['18%', '65%'].map(l => `<i style="position:absolute;left:${l};top:2px;width:15px;height:15px;margin-left:-7px;border-radius:50%;background:var(--box);border:2px solid var(--brand)"></i>`).join('')}</div>${ROW(T('300 kr', 'uxk-xs') + SP + T('1 300 kr', 'uxk-xs'), 'uxk-nw')}`)))],
  ['Två fält: Från och Till', W(SCR(fGroup('Pris', ROW(`<span class="uxk-sp">${I('300', true, '', 'uxk-bs" style="height:30px')}</span>${T('–', 'uxk-m')}<span class="uxk-sp">${I('1 300', true, '', 'uxk-bs" style="height:30px')}</span>`, 'uxk-nw') + ROW(B('OK', '2', 'uxk-bs')))))],
  ['Fasta prisintervall', W(SCR(fGroup('Pris', fItems([1], 4, false, ['Under 300 kr', '300–700 kr', '700–1 500 kr', 'Över 1 500 kr']))))],
  ['Reglage och fält tillsammans', W(SCR(fGroup('Pris', `<div style="position:relative;height:18px;margin:2px 7px"><i style="position:absolute;left:0;right:0;top:8px;height:3px;border-radius:2px;background:var(--sline)"></i><i style="position:absolute;left:18%;right:35%;top:8px;height:3px;background:var(--brand)"></i>${['18%', '65%'].map(l => `<i style="position:absolute;left:${l};top:2px;width:15px;height:15px;margin-left:-7px;border-radius:50%;background:var(--box);border:2px solid var(--brand)"></i>`).join('')}</div>${ROW(`<span class="uxk-sp">${I('300', true, '', '" style="height:30px')}</span>${T('–', 'uxk-m')}<span class="uxk-sp">${I('1 300', true, '', '" style="height:30px')}</span>`, 'uxk-nw')}`)))]
]);

Q('ux-filter-noll-traffar', 'Hur ska filterval som ger noll träffar visas?', 'grid', [
  ['Gråade, går inte att välja', W(SCR(fGroup('Färg', rep(4, i => CB(['Svart', 'Vit', 'Grön', 'Röd'][i], false, [12, 8, 0, 0][i], false, 'uxk-xs' + (i > 1 ? ' x' : ''))))))],
  ['Dolda', W(SCR(fGroup('Färg', rep(2, i => CB(['Svart', 'Vit'][i], false, [12, 8][i], false, 'uxk-xs'))) ))],
  ['Visas som vanligt', W(SCR(fGroup('Färg', rep(4, i => CB(['Svart', 'Vit', 'Grön', 'Röd'][i], false, [12, 8, 0, 0][i], false, 'uxk-xs')))))]
]);

Q('ux-filter-snabbval', 'Ska de vanligaste filtren ligga som snabbval ovanför listan?', 'grid', [
  ['Ja, en rad med snabbval', W(SCR(`${ROW(`<span class="uxk-c">${ic('sliders', 12)}Alla filter</span>` + C('Nyheter') + C('Rea', true) + C('I lager'))}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))],
  ['Nej, bara i filterpanelen', W(SCR(`${ROW(`<span class="uxk-c">${ic('sliders', 12)}Alla filter</span>`)}<div class="uxk-g3">${rep(3, () => CARD('495 kr', '1/1', 70))}</div>`))]
]);

/* ---------------- Registrera ---------------- */
window.QZ.part({ key: 'ux', groups });
})();
