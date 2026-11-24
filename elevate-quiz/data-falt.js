/* Elevate designquiz: del "Fält och kontroller" (falt, prefix fa-).
   Frågorna byggs med små hjälpfunktioner. Varje fråga visar samma kontroll
   där bara den egenskap som frågan gäller skiljer sig. */
(function () {
  // ---------- Ikoner ----------
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M10 4.2A9 9 0 0 1 12 4c6.4 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6C3.9 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M14.1 14.1a3 3 0 1 1-4.2-4.2M3 3l18 18"/>',
    cal: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    updown: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    upload: '<path d="M12 15V4M7 9l5-5 5 5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    cloud: '<path d="M7 19a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 10a4.5 4.5 0 0 1 0 9"/><path d="M12 20v-7M9.5 15.5 12 13l2.5 2.5"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/>',
    minus: '<path d="M5 12h14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>',
    map: '<path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z"/><path d="M9 4v13.5M15 6.5V20"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    cursor: '<path d="M5 3l14 7-6 2-2 6-6-15Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  };
  const ic = (n, o = {}) => `<svg class="ico" viewBox="0 0 24 24" fill="${o.fill || 'none'}" stroke="currentColor" stroke-width="${o.sw || 2}" stroke-linecap="${o.cap || 'round'}" stroke-linejoin="${o.join || 'round'}" aria-hidden="true" style="width:${o.s || 20}px;height:${o.s || 20}px;${o.st || ''}">${P[n]}</svg>`;

  // ---------- Grundbitar ----------
  const MUT = 'var(--smuted)';
  const LINE = 'var(--sline)';
  const MID = 'rgba(26,28,30,.45)';
  const GREY = '#EEF0F2';
  const W = (inner, st = '') => `<div class="pad stack" style="background:var(--box);flex:1;justify-content:center;gap:14px;${st}">${inner}</div>`;
  const cap = t => `<span style="font-size:12px;color:${MUT}">${t}</span>`;
  const caret = `<span style="display:inline-block;width:1.5px;height:1.15em;background:var(--sink);vertical-align:-0.2em;margin-left:1px"></span>`;
  const NAME = { lbl: 'Namn', val: 'Anna Berg' };
  const EMAIL = { lbl: 'E-post', val: 'anna@exempel.se' };
  const EMAILPH = { lbl: 'E-post', ph: 'namn@exempel.se' };
  const TEL = { lbl: 'Telefon', val: '070-123 45 67' };

  // Textfält. o: lbl, pos (top|left|float|none), val, ph, phc, phs, caret, req, left, right,
  // is (stil på .inp), ls (stil på etikett), fs (stil på .fld), above, below, help
  function F(o = {}) {
    const lbl = 'lbl' in o ? o.lbl : 'E-post';
    const pos = o.pos || 'top';
    const txt = o.ph != null ? `<span style="color:${o.phc || MUT};${o.phs || ''}">${o.ph}</span>` : (o.val != null ? o.val : 'anna@exempel.se');
    const cr = o.caret ? caret : '';
    const req = o.req || '';
    let mid = `<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${o.ts || ''}">${txt}${cr}</span>`;
    if (pos === 'float') mid = `<span style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;line-height:1.25"><span style="font-size:12px;color:${MUT};${o.ls || ''}">${lbl}${req}</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${o.ts || ''}">${txt}${cr}</span></span>`;
    const inp = `<div class="inp" style="gap:10px;${pos === 'float' ? 'height:56px;' : ''}${o.is || ''}">${o.left || ''}${mid}${o.right || ''}</div>`;
    const below = o.below || (o.help ? `<span class="small muted">${o.help}</span>` : '');
    if (pos === 'left') return `<div class="fld" style="flex:none;flex-direction:row;align-items:center;gap:12px;${o.fs || ''}"><span class="lbl" style="flex:0 0 64px;${o.ls || ''}">${lbl}${req}</span><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:5px">${inp}${below}</div></div>`;
    const lab = lbl && pos === 'top' ? `<span class="lbl" style="${o.ls || ''}">${lbl}${req}</span>` : '';
    return `<div class="fld" style="flex:none;${o.fs || ''}">${lab}${o.above || ''}${inp}${below}</div>`;
  }
  const two = (x = {}) => F({ ...NAME, ...x }) + F({ ...EMAILPH, ...x });

  // Fältstilar
  const S = {
    out1: 'border:1px solid var(--sline);',
    out2: 'border:2px solid var(--sline);',
    fill: `border:0;background:${GREY};`,
    fillu: `border:0;border-bottom:1px solid ${MID};background:${GREY};border-radius:var(--rf) var(--rf) 0 0;`,
    line: `border:0;border-bottom:1px solid ${MID};background:transparent;border-radius:0;padding:0;`,
    shad: 'border:1px solid var(--sline);box-shadow:0 1px 3px rgba(26,28,30,.10);',
  };
  const errMsg = (t, x = '') => `<span style="display:flex;gap:6px;align-items:center;font-size:13px;color:var(--bad);${x}">${ic('alert', { s: 16 })}${t}</span>`;

  // Kryssruta. o: s, r, on (true|'mixed'), mode (fill|outline|dark), col, bw, bc, sw (px), cap
  function cbox(o = {}) {
    const s = o.s || 20, r = o.r != null ? o.r : 4, mode = o.mode || 'fill', col = o.col || 'var(--brand)';
    const bw = o.bw || 1.5, bc = o.bc || MID;
    let bg = 'var(--box)', bd = `${bw}px solid ${bc}`, mark = '';
    if (o.on) {
      if (mode === 'fill') { bg = col; bd = `${bw}px solid ${col}`; }
      if (mode === 'dark') { bg = 'var(--sink)'; bd = `${bw}px solid var(--sink)`; }
      if (mode === 'outline') bd = `${bw}px solid ${col}`;
      const m = Math.round(s * 0.72);
      const swv = ((o.sw || 2) * 24 / m).toFixed(2);
      const mc = mode === 'outline' ? col : '#fff';
      const path = o.on === 'mixed' ? (o.mixed === 'square' ? '<rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" stroke="none"/>' : '<path d="M6 12h12"/>') : P.check;
      mark = `<svg viewBox="0 0 24 24" fill="none" stroke="${mc}" stroke-width="${swv}" stroke-linecap="${o.cap || 'round'}" stroke-linejoin="${o.cap === 'square' || o.cap === 'butt' ? 'miter' : 'round'}" style="width:${m}px;height:${m}px;color:${mc}" aria-hidden="true">${path}</svg>`;
    }
    return `<span style="display:inline-grid;place-items:center;flex:0 0 auto;width:${s}px;height:${s}px;border-radius:${r}px;background:${bg};border:${bd};${o.st || ''}">${mark}</span>`;
  }
  const crow = (box, text, x = '') => `<div style="display:flex;align-items:center;gap:10px;font-size:15px;${x}">${box}<span style="min-width:0">${text}</span></div>`;

  // Frågebyggare
  const Q = (id, q, opts, layout) => ({ id: 'fa-' + id, q, layout: layout || 'grid', opts: opts.map(([l, h]) => (h == null ? { l } : { l, h })) });
  const G = [];
  const group = (key, title, questions) => G.push({ key, title, questions });

  // =====================================================================
  // Textfält: stil
  // =====================================================================
  group('textfalt-stil', 'Textfält: stil', [
    Q('stil-grund', 'Vilken grundstil ska textfälten ha?', [
      ['Kant runt om', W(two({ is: S.out1 }))],
      ['Fylld utan kant', W(two({ is: S.fill }))],
      ['Fylld med underkant', W(two({ is: S.fillu }))],
      ['Bara underlinje', W(two({ is: S.line }))],
      ['Kant och mjuk skugga', W(two({ is: S.shad }))],
    ]),
    Q('stil-kant', 'Hur tjock ska kanten runt fältet vara?', [
      ['1 px kant', W(two({ is: 'border:1px solid rgba(26,28,30,.22);' }))],
      ['1,5 px kant', W(two({ is: 'border:1.5px solid rgba(26,28,30,.22);' }))],
      ['2 px kant', W(two({ is: 'border:2px solid rgba(26,28,30,.22);' }))],
    ]),
    Q('stil-kantfarg', 'Hur mörk ska fältets kant vara i viloläge?', [
      ['Ljusgrå kant (16 %)', W(two({ is: 'border-color:rgba(26,28,30,.16);' }))],
      ['Mellangrå kant (30 %)', W(two({ is: 'border-color:rgba(26,28,30,.30);' }))],
      ['Mörkgrå kant (50 %)', W(two({ is: 'border-color:rgba(26,28,30,.50);' }))],
    ]),
    Q('stil-skugga', 'Ska fältet ha en skugga?', [
      ['Ingen skugga', W(two({ is: S.out1 }))],
      ['Hårfin skugga under', W(two({ is: S.out1 + 'box-shadow:0 1px 2px rgba(26,28,30,.08);' }))],
      ['Mjuk skugga', W(two({ is: S.out1 + 'box-shadow:0 3px 10px rgba(26,28,30,.09);' }))],
      ['Inre skugga', W(two({ is: S.out1 + 'box-shadow:inset 0 1px 3px rgba(26,28,30,.10);' }))],
    ]),
    Q('stil-fylld-ton', 'Hur mörk ska fyllningen vara i ett fyllt fält?', [
      ['Mycket ljus fyllning', W(two({ is: 'border:0;background:#F5F6F7;' }))],
      ['Ljusgrå fyllning', W(two({ is: 'border:0;background:#EDEFF1;' }))],
      ['Mellangrå fyllning', W(two({ is: 'border:0;background:#E3E6E9;' }))],
    ]),
    Q('stil-fylld-horn', 'Hur ska hörnen se ut på ett fyllt fält med underkant?', [
      ['Bara övre hörn rundade', W(two({ is: S.fillu }))],
      ['Raka hörn', W(two({ is: S.fillu + 'border-radius:0;' }))],
      ['Alla hörn rundade', W(two({ is: S.fillu + 'border-radius:var(--rf);' }))],
    ]),
    Q('stil-linje-tjocklek', 'Hur tjock ska linjen vara i ett fält med bara underlinje?', [
      ['1 px underlinje', W(two({ is: S.line }))],
      ['1,5 px underlinje', W(two({ is: S.line + `border-bottom-width:1.5px;` }))],
      ['2 px underlinje', W(two({ is: S.line + `border-bottom-width:2px;` }))],
    ]),
    Q('stil-linje-indrag', 'Var ska texten börja i ett fält med bara underlinje?', [
      ['I linje med etiketten', W(two({ is: S.line }))],
      ['Indragen 12 px', W(two({ is: S.line + 'padding:0 12px;' }))],
    ]),
    Q('stil-pa-gra', 'Hur ska fältet se ut när det ligger på en grå yta?', [
      ['Vitt med kant', W(two({ is: S.out1 }), 'background:var(--ground)')],
      ['Vitt utan kant', W(two({ is: 'border:0;' }), 'background:var(--ground)')],
      ['Genomskinligt med kant', W(two({ is: 'border:1px solid rgba(26,28,30,.24);background:transparent;' }), 'background:var(--ground)')],
      ['Mörkare grå fyllning', W(two({ is: 'border:0;background:#E8E8E5;' }), 'background:var(--ground)')],
    ]),
    Q('stil-ikon', 'Ska e-postfältet visa en ikon?', [
      ['Ingen ikon', W(F({ ...EMAIL }) + F({ ...EMAILPH }))],
      ['Ikon till vänster', W(F({ ...EMAIL, left: ic('mail', { st: 'color:var(--smuted)' }) }) + F({ ...EMAILPH, left: ic('mail', { st: 'color:var(--smuted)' }) }))],
      ['Ikon till höger', W(F({ ...EMAIL, right: ic('mail', { st: 'color:var(--smuted)' }) }) + F({ ...EMAILPH, right: ic('mail', { st: 'color:var(--smuted)' }) }))],
    ]),
    Q('stil-ikonfarg', 'Vilken färg ska ikonen inuti fältet ha?', [
      ['Grå ikon', W(F({ ...EMAIL, left: ic('mail', { st: 'color:var(--smuted)' }) }) + F({ ...EMAILPH, left: ic('mail', { st: 'color:var(--smuted)' }) }))],
      ['Ikon i textfärg', W(F({ ...EMAIL, left: ic('mail', { st: 'color:var(--sink)' }) }) + F({ ...EMAILPH, left: ic('mail', { st: 'color:var(--sink)' }) }))],
      ['Ikon i märkesfärg', W(F({ ...EMAIL, left: ic('mail', { st: 'color:var(--brand)' }) }) + F({ ...EMAILPH, left: ic('mail', { st: 'color:var(--brand)' }) }))],
    ]),
    Q('stil-ikonstorlek', 'Hur stor ska ikonen inuti fältet vara?', [16, 18, 20, 22].map(s =>
      [`${s} px ikon`, W(F({ ...EMAIL, left: ic('mail', { s, st: 'color:var(--smuted)' }) }) + F({ ...EMAILPH, left: ic('mail', { s, st: 'color:var(--smuted)' }) }))])),
    Q('stil-enhet', 'Hur ska en enhet, till exempel kr, visas i fältet?', [
      ['Grå enhet inuti till höger', W(F({ lbl: 'Belopp', val: '1 500', right: `<span style="color:${MUT}">kr</span>` }))],
      ['Enhet i egen grå ruta', W(F({ lbl: 'Belopp', val: '1 500', is: 'padding-right:0;', right: `<span style="align-self:stretch;display:flex;align-items:center;padding:0 14px;background:#F2F3F4;border-left:1px solid var(--sline);color:${MUT}">kr</span>` }))],
      ['Enhet i etiketten', W(F({ lbl: 'Belopp (kr)', val: '1 500' }))],
    ]),
    Q('stil-hover', 'Ska fältet ändras när muspekaren är över det?', [
      ['Ingen ändring', W(cap('Viloläge') + F({ lbl: null, ph: 'Namn' }) + cap('Muspekare över') + F({ lbl: null, ph: 'Namn' }), 'gap:6px')],
      ['Mörkare kant', W(cap('Viloläge') + F({ lbl: null, ph: 'Namn' }) + cap('Muspekare över') + F({ lbl: null, ph: 'Namn', is: 'border-color:rgba(26,28,30,.48);' }), 'gap:6px')],
      ['Ljusgrå bakgrund', W(cap('Viloläge') + F({ lbl: null, ph: 'Namn' }) + cap('Muspekare över') + F({ lbl: null, ph: 'Namn', is: 'background:#F4F5F6;' }), 'gap:6px')],
      ['Lätt skugga', W(cap('Viloläge') + F({ lbl: null, ph: 'Namn' }) + cap('Muspekare över') + F({ lbl: null, ph: 'Namn', is: 'box-shadow:0 2px 8px rgba(26,28,30,.10);' }), 'gap:6px')],
    ]),
  ]);

  // =====================================================================
  // Textfält: form och storlek
  // =====================================================================
  group('textfalt-form', 'Textfält: form och storlek', [
    Q('rundning', 'Hur runda ska textfältens hörn vara?', [
      ['0 px (raka hörn)', W(two({ is: 'border-radius:0;' }))],
      ['4 px rundning', W(two({ is: 'border-radius:4px;' }))],
      ['8 px rundning', W(two({ is: 'border-radius:8px;' }))],
      ['12 px rundning', W(two({ is: 'border-radius:12px;' }))],
      ['16 px rundning', W(two({ is: 'border-radius:16px;' }))],
      ['Helt runda ändar (pill)', W(two({ is: 'border-radius:999px;padding:0 20px;' }))],
    ]),
    Q('rundning-knapp', 'Hur ska fältets rundning förhålla sig till knappens?', [
      ['Samma rundning (8 px)', W(F({ ...EMAILPH, is: 'border-radius:8px;' }) + '<span class="sb" style="border-radius:8px">Skicka</span>')],
      ['Fält 4 px, knapp 8 px', W(F({ ...EMAILPH, is: 'border-radius:4px;' }) + '<span class="sb" style="border-radius:8px">Skicka</span>')],
      ['Fält 8 px, knapp helt rund', W(F({ ...EMAILPH, is: 'border-radius:8px;' }) + '<span class="sb" style="border-radius:999px">Skicka</span>')],
    ]),
    Q('hojd', 'Hur höga ska textfälten vara?', [40, 44, 48, 52, 56, 60].map(h => [`${h} px hög`, W(two({ is: `height:${h}px;` }))])),
    Q('utfyllnad', 'Hur stor ska den inre utfyllnaden i sidled vara?', [10, 14, 18, 22].map(p => [`${p} px utfyllnad`, W(two({ is: `padding:0 ${p}px;` }))])),
    Q('textstorlek', 'Hur stor ska texten i fältet vara?', [14, 15, 16, 17, 18].map(s => [`${s} px text`, W(two({ is: `font-size:${s}px;` }))])),
    Q('textvikt', 'Vilken vikt ska inskriven text ha?', [
      ['Normal (400)', W(two({ is: 'font-weight:400;' }))],
      ['Medium (500)', W(two({ is: 'font-weight:500;' }))],
    ]),
    Q('bakgrund', 'Vilken bakgrund ska fältet ha (med kant)?', [
      ['Vit bakgrund', W(two())],
      ['Ljusgrå bakgrund', W(two({ is: 'background:#F4F5F6;' }))],
      ['Ljust tonad bakgrund', W(two({ is: 'background:#EEF2F6;' }))],
    ]),
    Q('bredd', 'Hur breda ska fälten vara på stor skärm?', [
      ['Alla fält i full bredd', W(F({ lbl: 'Gatuadress', val: 'Storgatan 12' }) + F({ lbl: 'Postnummer', val: '123 45' }) + F({ lbl: 'Ort', val: 'Stockholm' }), 'max-width:560px;width:100%;margin:0 auto')],
      ['Bredd efter förväntat innehåll', W(F({ lbl: 'Gatuadress', val: 'Storgatan 12' }) + F({ lbl: 'Postnummer', val: '123 45', fs: 'width:140px;max-width:100%' }) + F({ lbl: 'Ort', val: 'Stockholm', fs: 'width:65%' }), 'max-width:560px;width:100%;margin:0 auto')],
    ], 'stack'),
  ]);

  // =====================================================================
  // Etiketter
  // =====================================================================
  group('etiketter', 'Etiketter', [
    Q('etikett-plats', 'Var ska fältets etikett sitta?', [
      ['Ovanför fältet', W(F(NAME) + F(EMAIL))],
      ['Inuti fältet (flytande)', W(F({ ...NAME, pos: 'float' }) + F({ ...EMAIL, pos: 'float' }))],
      ['Till vänster om fältet', W(F({ ...NAME, pos: 'left' }) + F({ ...EMAIL, pos: 'left' }))],
      ['Bara platshållare, ingen etikett', W(F({ lbl: null, ph: 'Namn' }) + F({ lbl: null, ph: 'E-post' }))],
    ]),
    Q('etikett-storlek', 'Hur stor ska etiketten vara?', [12, 13, 14, 15].map(s => [`${s} px etikett`, W(two({ ls: `font-size:${s}px;` }))])),
    Q('etikett-vikt', 'Vilken vikt ska etiketten ha?', [
      ['Normal (400)', W(two({ ls: 'font-weight:400;' }))],
      ['Medium (500)', W(two({ ls: 'font-weight:500;' }))],
      ['Halvfet (600)', W(two({ ls: 'font-weight:600;' }))],
      ['Fet (700)', W(two({ ls: 'font-weight:700;' }))],
    ]),
    Q('etikett-farg', 'Vilken färg ska etiketten ha?', [
      ['Textfärg', W(two({ ls: 'color:var(--sink);' }))],
      ['Grå', W(two({ ls: 'color:var(--smuted);' }))],
      ['Märkesfärg', W(two({ ls: 'color:var(--brand);' }))],
    ]),
    Q('etikett-versaler', 'Ska etiketten skrivas med versaler?', [
      ['Vanlig text', W(two())],
      ['Små versaler, spärrade', W(two({ ls: 'text-transform:uppercase;letter-spacing:.07em;font-size:12px;' }))],
    ]),
    Q('etikett-avstand', 'Hur stort ska avståndet mellan etikett och fält vara?', [4, 6, 8, 10].map(g => [`${g} px avstånd`, W(two({ fs: `gap:${g}px;` }))])),
    Q('etikett-flytande', 'Hur ska en flytande etikett se ut när fältet är ifyllt?', [
      ['Liten etikett överst inuti fältet', W(F({ ...NAME, pos: 'float' }) + F({ ...EMAIL, pos: 'float' }))],
      ['Etikett ovanpå kanten', W([NAME, EMAIL].map(f => `<div class="fld" style="flex:none"><div class="inp" style="position:relative;overflow:visible;height:52px;border-color:rgba(26,28,30,.30)"><span style="position:absolute;left:10px;top:-8px;font-size:12px;line-height:16px;padding:0 4px;background:var(--box);color:${MUT}">${f.lbl}</span>${f.val}</div></div>`).join(''), 'gap:18px')],
    ]),
    Q('etikett-vanster', 'Hur ska etiketter till vänster om fältet justeras?', [
      ['Vänsterjusterade', W(F({ ...NAME, pos: 'left' }) + F({ ...EMAIL, pos: 'left' }) + F({ ...TEL, pos: 'left' }))],
      ['Högerjusterade mot fältet', W(F({ ...NAME, pos: 'left', ls: 'text-align:right;' }) + F({ ...EMAIL, pos: 'left', ls: 'text-align:right;' }) + F({ ...TEL, pos: 'left', ls: 'text-align:right;' }))],
    ]),
    Q('etikett-kolon', 'Ska etiketten sluta med kolon?', [
      ['Utan kolon', W(two())],
      ['Med kolon', W(F({ ...NAME, lbl: 'Namn:' }) + F({ ...EMAILPH, lbl: 'E-post:' }))],
    ]),
  ]);

  // =====================================================================
  // Platshållare och hjälptext
  // =====================================================================
  const infoI = `<span style="display:inline-flex;vertical-align:-3px;margin-left:5px;color:${MUT}">${ic('info', { s: 16 })}</span>`;
  group('hjalptext', 'Platshållare och hjälptext', [
    Q('ph-innehall', 'Vad ska platshållartexten i ett tomt fält innehålla?', [
      ['Ett exempel', W(F({ lbl: 'E-post', ph: 'namn@exempel.se' }) + F({ lbl: 'Telefon', ph: '070-123 45 67' }))],
      ['En instruktion', W(F({ lbl: 'E-post', ph: 'Skriv din e-postadress' }) + F({ lbl: 'Telefon', ph: 'Skriv ditt nummer' }))],
      ['Ingen platshållare', W(F({ lbl: 'E-post', ph: '' }) + F({ lbl: 'Telefon', ph: '' }))],
    ]),
    Q('ph-farg', 'Hur ljus ska platshållartexten vara?', [
      ['Ljusgrå platshållare', W(F({ ...NAME }) + F({ ...EMAILPH, phc: '#9CA1A7' }))],
      ['Mellangrå platshållare', W(F({ ...NAME }) + F({ ...EMAILPH, phc: '#757A80' }))],
      ['Mörkgrå platshållare', W(F({ ...NAME }) + F({ ...EMAILPH, phc: '#55595E' }))],
    ]),
    Q('ph-stil', 'Ska platshållartexten vara kursiv?', [
      ['Rak platshållare', W(F({ ...NAME }) + F({ ...EMAILPH }))],
      ['Kursiv platshållare', W(F({ ...NAME }) + F({ ...EMAILPH, phs: 'font-style:italic;' }))],
    ]),
    Q('hjalp-plats', 'Var ska hjälptexten till ett fält stå?', [
      ['Under fältet', W(F({ ...TEL, help: 'Vi ringer bara om något ändras.' }))],
      ['Mellan etikett och fält', W(F({ ...TEL, above: '<span class="small muted" style="margin-top:-2px">Vi ringer bara om något ändras.</span>' }))],
      ['Bakom en info-ikon', W(F({ ...TEL, lbl: 'Telefon' + infoI }))],
    ]),
    Q('hjalp-storlek', 'Hur stor ska hjälptexten under fältet vara?', [12, 13, 14].map(s => [`${s} px hjälptext`, W(F({ ...TEL, below: `<span class="muted" style="font-size:${s}px">Vi ringer bara om något ändras.</span>` }))])),
    Q('hjalp-ikon', 'Ska hjälptexten under fältet ha en ikon?', [
      ['Utan ikon', W(F({ ...TEL, help: 'Vi ringer bara om något ändras.' }))],
      ['Med info-ikon', W(F({ ...TEL, below: `<span class="small muted" style="display:flex;gap:6px;align-items:center">${ic('info', { s: 15 })}Vi ringer bara om något ändras.</span>` }))],
    ]),
    Q('hjalp-format', 'Var ska ett krav på format, som ÅÅÅÅ-MM-DD, visas?', [
      ['I platshållaren', W(F({ lbl: 'Datum', ph: 'ÅÅÅÅ-MM-DD' }))],
      ['I hjälptexten under', W(F({ lbl: 'Datum', ph: '', help: 'Skriv som ÅÅÅÅ-MM-DD' }))],
      ['I etiketten', W(F({ lbl: `Datum <span style="font-weight:400;color:${MUT}">(ÅÅÅÅ-MM-DD)</span>`, ph: '' }))],
    ]),
  ]);

  // =====================================================================
  // Obligatoriska fält
  // =====================================================================
  const reqForm = (r, opt) => W(F({ ...NAME, req: r }) + F({ ...EMAILPH, req: r }) + F({ lbl: 'Telefon', ph: '070-123 45 67', req: opt || '' }));
  const star = (c = 'var(--bad)', x = '') => `<span style="color:${c};margin-left:2px;${x}" aria-hidden="true">*</span>`;
  group('obligatoriska', 'Obligatoriska fält', [
    Q('obl-markering', 'Hur ska obligatoriska fält markeras?', [
      ['Asterisk *', reqForm(star())],
      ['Texten (obligatoriskt)', reqForm(`<span style="font-weight:400;color:${MUT}"> (obligatoriskt)</span>`)],
      ['Markera valfria i stället', reqForm('', `<span style="font-weight:400;color:${MUT}"> (valfritt)</span>`)],
      ['Ingen markering', reqForm('')],
    ]),
    Q('obl-asterisk-farg', 'Vilken färg ska asterisken ha?', [
      ['Röd asterisk', reqForm(star('var(--bad)'))],
      ['Asterisk i textfärg', reqForm(star('var(--sink)'))],
      ['Grå asterisk', reqForm(star('var(--smuted)'))],
    ]),
    Q('obl-asterisk-plats', 'Hur ska asterisken placeras?', [
      ['Direkt efter ordet', reqForm(star('var(--bad)', 'margin-left:1px'))],
      ['Efter ett mellanrum', reqForm(star('var(--bad)', 'margin-left:5px'))],
      ['Liten och upphöjd', reqForm(star('var(--bad)', 'margin-left:1px;font-size:.8em;vertical-align:.35em;line-height:0'))],
    ]),
    Q('obl-forklaring', 'Ska formuläret förklara vad asterisken betyder?', [
      ['Ingen förklaring', W(F({ ...NAME, req: star() }) + F({ ...EMAILPH, req: star() }) + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
      ['Rad överst i formuläret', W(`<span class="small muted">Fält med ${star('var(--bad)', 'margin:0')} måste fyllas i.</span>` + F({ ...NAME, req: star() }) + F({ ...EMAILPH, req: star() }) + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
      ['Rad ovanför knappen', W(F({ ...NAME, req: star() }) + F({ ...EMAILPH, req: star() }) + `<span class="small muted">Fält med ${star('var(--bad)', 'margin:0')} måste fyllas i.</span>` + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
    ]),
    Q('obl-valfri-stil', 'Hur ska markeringen av ett valfritt fält se ut?', [
      ['Grå text, normal vikt', W(F({ ...NAME }) + F({ lbl: 'Telefon', ph: '070-123 45 67', req: `<span style="font-weight:400;color:${MUT}"> (valfritt)</span>` }))],
      ['Samma stil som etiketten', W(F({ ...NAME }) + F({ lbl: 'Telefon', ph: '070-123 45 67', req: ' (valfritt)' }))],
      ['Liten grå tagg', W(F({ ...NAME }) + F({ lbl: 'Telefon', ph: '070-123 45 67', req: `<span style="margin-left:6px;font-size:11px;font-weight:600;color:${MUT};background:#EFF0F1;padding:1px 7px;border-radius:999px">Valfritt</span>` }))],
    ]),
  ]);

  // =====================================================================
  // Fokusläge
  // =====================================================================
  const BR = 'var(--brand)';
  const foc = (fis, x = {}) => W(F({ ...NAME, ...(x.base || {}) }) + F({ lbl: 'E-post', val: 'anna@exem', caret: true, is: fis, ...(x.f || {}) }));
  group('fokus', 'Fokusläge', [
    Q('fokus-typ', 'Hur ska ett textfält se ut när det har fokus?', [
      ['Färgad kant, 1 px', foc(`border-color:${BR};`)],
      ['Färgad kant, 2 px', foc(`border:2px solid ${BR};padding:0 13px;`)],
      ['Färgad kant och ljus ring', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);`)],
      ['Ring med mellanrum', foc(`box-shadow:0 0 0 2px #fff,0 0 0 4px ${BR};`)],
      ['Mjuk färgad skugga', foc(`border-color:${BR};box-shadow:0 2px 12px rgba(36,64,94,.28);`)],
    ]),
    Q('fokus-farg', 'Vilken färg ska fokusmarkeringen ha?', [
      ['Märkesfärg', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);`)],
      ['Klarblå', foc('border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.20);')],
      ['Svart', foc('border-color:#1A1C1E;box-shadow:0 0 0 3px rgba(26,28,30,.14);')],
    ]),
    Q('fokus-ringbredd', 'Hur bred ska fokusringen runt fältet vara?', [2, 3, 4].map(w => [`${w} px ring`, foc(`border-color:${BR};box-shadow:0 0 0 ${w}px rgba(36,64,94,.18);`)])),
    Q('fokus-ringstyrka', 'Hur stark ska fokusringen vara?', [
      ['Svag ring (12 %)', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.12);`)],
      ['Mellanstark ring (25 %)', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.25);`)],
      ['Stark ring (50 %)', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.5);`)],
    ]),
    Q('fokus-etikett', 'Ska etiketten byta färg när fältet har fokus?', [
      ['Etiketten är oförändrad', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);`)],
      ['Etiketten får märkesfärg', foc(`border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);`, { f: { ls: `color:${BR};` } })],
    ]),
    Q('fokus-fylld', 'Hur ska ett fyllt fält visa fokus?', [
      ['Färgad underkant, 2 px', foc(`border:0;background:${GREY};box-shadow:inset 0 -2px 0 ${BR};border-radius:var(--rf) var(--rf) 0 0;`, { base: { is: S.fill } })],
      ['Blir vitt med färgad kant', foc(`border:1px solid ${BR};background:#fff;`, { base: { is: S.fill } })],
      ['Färgad ring runt', foc(`border:0;background:${GREY};box-shadow:0 0 0 2px ${BR};`, { base: { is: S.fill } })],
    ]),
    Q('fokus-linje', 'Hur ska ett fält med bara underlinje visa fokus?', [
      ['Linjen blir färgad', foc(S.line + `border-bottom-color:${BR};`, { base: { is: S.line } })],
      ['Linjen blir färgad och 2 px', foc(S.line + `border-bottom:2px solid ${BR};`, { base: { is: S.line } })],
      ['Linjen blir svart och 2 px', foc(S.line + `border-bottom:2px solid var(--sink);`, { base: { is: S.line } })],
    ]),
    Q('fokus-ph', 'Ska platshållaren synas när ett tomt fält har fokus?', [
      ['Syns tills man börjar skriva', W(F({ ...NAME }) + F({ lbl: 'E-post', ph: `${caret}namn@exempel.se`, is: `border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);` }))],
      ['Försvinner direkt vid fokus', W(F({ ...NAME }) + F({ lbl: 'E-post', val: '', caret: true, is: `border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);` }))],
    ]),
  ]);

  // =====================================================================
  // Felläge
  // =====================================================================
  const BAD = 'var(--bad)';
  const errT = (t = 'Ange en giltig e-postadress', x = '') => `<span style="font-size:13px;color:${BAD};${x}">${t}</span>`;
  const errF = (o = {}) => F({ lbl: 'E-post', val: 'anna@exempel', ...o });
  const errI = (s = 18) => `<span style="display:inline-flex;color:${BAD}">${ic('alert', { s })}</span>`;
  const errFill = s => `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px;flex:0 0 auto"><circle cx="12" cy="12" r="10" fill="var(--bad)"/><path d="M12 7v6M12 16.5v.01" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`;
  group('fel', 'Felläge', [
    Q('fel-markering', 'Hur ska ett fält med fel markeras?', [
      ['Röd kant', W(F(NAME) + errF({ is: `border-color:${BAD};`, below: errT() }))],
      ['Röd kant och ljusröd bakgrund', W(F(NAME) + errF({ is: `border-color:${BAD};background:#FDF3F2;`, below: errT() }))],
      ['Röd kant och ikon i fältet', W(F(NAME) + errF({ is: `border-color:${BAD};`, right: errI(), below: errT() }))],
      ['Bara texten under, kanten som vanligt', W(F(NAME) + errF({ below: errT() }))],
    ]),
    Q('fel-kant', 'Hur tjock ska den röda kanten vara?', [
      ['1 px röd kant', W(F(NAME) + errF({ is: `border-color:${BAD};`, below: errT() }))],
      ['2 px röd kant', W(F(NAME) + errF({ is: `border:2px solid ${BAD};padding:0 13px;`, below: errT() }))],
    ]),
    Q('fel-plats', 'Var ska felmeddelandet stå?', [
      ['Under fältet', W(errF({ is: `border-color:${BAD};`, below: errT() }))],
      ['Mellan etikett och fält', W(errF({ is: `border-color:${BAD};`, above: errT('Ange en giltig e-postadress', 'margin-top:-2px') }))],
      ['I etikettraden till höger', W(errF({ is: `border-color:${BAD};`, lbl: `<span style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><span>E-post</span>${errT('Ogiltig adress', 'font-weight:500')}</span>` }))],
      ['Inuti fältet till höger', W(errF({ is: `border-color:${BAD};`, right: errT('Ogiltig', 'flex:0 0 auto') }))],
      ['I en bubbla under fältet', W(errF({ is: `border-color:${BAD};`, below: `<span style="position:relative;align-self:flex-start;margin-top:6px;background:${BAD};color:#fff;font-size:13px;padding:6px 10px;border-radius:6px">Ange en giltig e-postadress<span style="position:absolute;left:16px;top:-5px;width:10px;height:10px;background:${BAD};transform:rotate(45deg)"></span></span>` }))],
    ]),
    Q('fel-ikon', 'Ska felmeddelandet ha en ikon?', [
      ['Ingen ikon', W(errF({ is: `border-color:${BAD};`, below: errT() }))],
      ['Ikon med kontur', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
      ['Fylld ikon', W(errF({ is: `border-color:${BAD};`, below: `<span style="display:flex;gap:6px;align-items:center;font-size:13px;color:${BAD}">${errFill(16)}Ange en giltig e-postadress</span>` }))],
    ]),
    Q('fel-ikon-plats', 'Var ska felikonen sitta?', [
      ['Före meddelandet', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
      ['Inuti fältet till höger', W(errF({ is: `border-color:${BAD};`, right: errI(), below: errT() }))],
      ['På båda ställena', W(errF({ is: `border-color:${BAD};`, right: errI(), below: errMsg('Ange en giltig e-postadress') }))],
    ]),
    Q('fel-textfarg', 'Vilken färg ska felmeddelandets text ha?', [
      ['Röd text', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
      ['Mörk text med röd ikon', W(errF({ is: `border-color:${BAD};`, below: `<span style="display:flex;gap:6px;align-items:center;font-size:13px;color:var(--sink)"><span style="display:inline-flex;color:${BAD}">${ic('alert', { s: 16 })}</span>Ange en giltig e-postadress</span>` }))],
    ]),
    Q('fel-storlek', 'Hur stor ska felmeddelandets text vara?', [12, 13, 14].map(s => [`${s} px feltext`, W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress', `font-size:${s}px`) }))])),
    Q('fel-vikt', 'Vilken vikt ska felmeddelandet ha?', [
      ['Normal (400)', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress', 'font-weight:400') }))],
      ['Medium (500)', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress', 'font-weight:500') }))],
      ['Halvfet (600)', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress', 'font-weight:600') }))],
    ]),
    Q('fel-etikett', 'Ska etiketten bli röd när fältet har fel?', [
      ['Etiketten är oförändrad', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
      ['Etiketten blir röd', W(errF({ is: `border-color:${BAD};`, ls: `color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
    ]),
    Q('fel-ruta', 'Hur ska felmeddelandet under fältet framhävas?', [
      ['Bara text', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }))],
      ['Text i ljusröd ruta', W(errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress', `background:#FDF0EF;padding:7px 10px;border-radius:6px`) }))],
      ['Röd linje till vänster om fältet', W(`<div style="border-left:3px solid ${BAD};padding-left:12px">${errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') })}</div>`)],
    ]),
    Q('fel-sammanfattning', 'Ska formuläret sammanfatta felen när man trycker på skicka?', [
      ['Ingen sammanfattning', W(F({ lbl: 'Namn', ph: '', is: `border-color:${BAD};`, below: errMsg('Fyll i ditt namn') }) + errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }) + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
      ['Ruta överst med lista', W(`<div style="border:1px solid ${BAD};background:#FDF3F2;border-radius:8px;padding:10px 12px;font-size:13px"><b style="color:${BAD}">Två fält behöver rättas</b><div style="margin-top:2px">Namn · E-post</div></div>` + F({ lbl: 'Namn', ph: '', is: `border-color:${BAD};`, below: errMsg('Fyll i ditt namn') }) + errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }) + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
      ['Kort rad ovanför knappen', W(F({ lbl: 'Namn', ph: '', is: `border-color:${BAD};`, below: errMsg('Fyll i ditt namn') }) + errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }) + `<span style="font-size:13px;color:${BAD};font-weight:600">Två fält behöver rättas.</span>` + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
    ]),
  ]);

  // =====================================================================
  // Felmeddelanden: ton
  // =====================================================================
  const tone = (fo, msg) => W(F({ ...fo, is: `border-color:${BAD};`, below: errMsg(msg) }));
  group('felmeddelanden', 'Felmeddelanden: formulering', [
    Q('felton-typ', 'Hur ska ett felmeddelande formuleras?', [
      ['Kort konstaterande', tone({ lbl: 'E-post', val: 'annaexempel.se' }, 'Ogiltig e-post')],
      ['Uppmaning', tone({ lbl: 'E-post', val: 'annaexempel.se' }, 'Ange en giltig e-postadress')],
      ['Förklaring med exempel', tone({ lbl: 'E-post', val: 'annaexempel.se' }, 'Adressen saknar @, till exempel namn@exempel.se')],
      ['Lättsam ton', tone({ lbl: 'E-post', val: 'annaexempel.se' }, 'Hoppsan! Något ser fel ut här.')],
    ]),
    Q('felton-tomt', 'Vad ska stå när ett obligatoriskt fält är tomt?', [
      ['”Obligatoriskt”', tone({ lbl: 'Namn', ph: '' }, 'Obligatoriskt')],
      ['”Fyll i ditt namn”', tone({ lbl: 'Namn', ph: '' }, 'Fyll i ditt namn')],
      ['”Namn saknas”', tone({ lbl: 'Namn', ph: '' }, 'Namn saknas')],
      ['”Det här fältet är obligatoriskt”', tone({ lbl: 'Namn', ph: '' }, 'Det här fältet är obligatoriskt')],
    ]),
    Q('felton-form', 'Vilken form ska felmeddelandet ha?', [
      ['Uppmaning: ”Ange …”', tone({ lbl: 'Telefon', ph: '' }, 'Ange ditt telefonnummer')],
      ['Passiv: ”… måste anges”', tone({ lbl: 'Telefon', ph: '' }, 'Telefonnummer måste anges')],
      ['Du-form: ”Du behöver …”', tone({ lbl: 'Telefon', ph: '' }, 'Du behöver ange ditt telefonnummer')],
    ]),
    Q('felton-punkt', 'Ska felmeddelanden sluta med punkt?', [
      ['Utan punkt', tone({ lbl: 'E-post', val: 'anna@exempel' }, 'Ange en giltig e-postadress')],
      ['Med punkt', tone({ lbl: 'E-post', val: 'anna@exempel' }, 'Ange en giltig e-postadress.')],
    ]),
    Q('felton-datum', 'Hur ska ett datum som inte går att välja förklaras?', [
      ['”Ogiltigt datum”', tone({ lbl: 'Datum', val: '2026-11-20' }, 'Ogiltigt datum')],
      ['Säger vad som gäller', tone({ lbl: 'Datum', val: '2026-11-20' }, 'Välj ett datum från och med i morgon')],
      ['Säger vad som är fel', tone({ lbl: 'Datum', val: '2026-11-20' }, 'Datumet har redan passerat')],
    ]),
  ]);

  // =====================================================================
  // Godkänt, inaktivt och skrivskyddat
  // =====================================================================
  const OK = 'var(--ok)';
  const okI = (k = 'plain', s = 18) => k === 'fill'
    ? `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px;flex:0 0 auto"><circle cx="12" cy="12" r="10" fill="var(--ok)"/><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : k === 'ring' ? `<span style="display:inline-flex;color:${OK}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${s}px;height:${s}px"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8 5.2-5.6"/></svg></span>`
    : `<span style="display:inline-flex;color:${OK}">${ic('check', { s })}</span>`;
  const dis = (is, ls = '') => W(F({ ...NAME }) + F({ ...EMAIL, is, ls }));
  group('ok-inaktivt', 'Godkänt, inaktivt och skrivskyddat', [
    Q('ok-visning', 'Hur ska ett korrekt ifyllt fält visas?', [
      ['Ingen markering', W(F(NAME) + F(EMAIL))],
      ['Grön bock i fältet', W(F({ ...NAME, right: okI() }) + F({ ...EMAIL, right: okI() }))],
      ['Grön kant och bock', W(F({ ...NAME, right: okI(), is: `border-color:${OK};` }) + F({ ...EMAIL, right: okI(), is: `border-color:${OK};` }))],
      ['Grön text under', W(F({ ...NAME }) + F({ ...EMAIL, below: `<span style="font-size:13px;color:${OK};display:flex;gap:6px;align-items:center">${ic('check', { s: 15 })}Ser bra ut</span>` }))],
    ]),
    Q('ok-bock', 'Hur ska bocken i ett godkänt fält se ut?', [
      ['Bara en bock', W(F({ ...NAME, right: okI() }) + F({ ...EMAIL, right: okI() }))],
      ['Bock i fylld cirkel', W(F({ ...NAME, right: okI('fill') }) + F({ ...EMAIL, right: okI('fill') }))],
      ['Bock i ring', W(F({ ...NAME, right: okI('ring', 20) }) + F({ ...EMAIL, right: okI('ring', 20) }))],
    ]),
    Q('inaktivt', 'Hur ska ett inaktivt fält se ut?', [
      ['Grå bakgrund och grå text', dis('background:#F1F2F3;color:#8A8F95;')],
      ['Hela fältet blekt', dis('opacity:.45;', 'opacity:.45;')],
      ['Streckad kant och grå text', dis('border-style:dashed;border-color:rgba(26,28,30,.28);color:#8A8F95;')],
      ['Grå bakgrund utan kant', dis('border-color:transparent;background:#F1F2F3;color:#8A8F95;')],
    ]),
    Q('inaktivt-etikett', 'Ska etiketten också tonas ned när fältet är inaktivt?', [
      ['Etiketten är oförändrad', dis('background:#F1F2F3;color:#8A8F95;')],
      ['Etiketten blir grå', dis('background:#F1F2F3;color:#8A8F95;', 'color:#8A8F95;')],
    ]),
    Q('skrivskyddat', 'Hur ska ett skrivskyddat fält se ut?', [
      ['Som vanlig text utan ram', dis('border:0;padding:0;height:auto;background:transparent;')],
      ['Grå fyllning utan kant', dis('border-color:transparent;background:#F1F2F3;')],
      ['Vanligt fält med lås-ikon', W(F({ ...NAME }) + F({ ...EMAIL, right: ic('lock', { s: 18, st: 'color:var(--smuted)' }) }))],
      ['Grå fyllning med kant', dis('background:#F1F2F3;')],
    ]),
    Q('inaktivt-forklaring', 'Ska ett låst fält förklara varför det inte går att ändra?', [
      ['Ingen förklaring', dis('background:#F1F2F3;color:#8A8F95;')],
      ['Hjälptext under fältet', W(F({ ...NAME }) + F({ ...EMAIL, is: 'background:#F1F2F3;color:#8A8F95;', help: 'Kontakta oss för att byta e-post.' }))],
      ['Lås-ikon i etiketten', W(F({ ...NAME }) + F({ ...EMAIL, lbl: `<span style="display:inline-flex;gap:5px;align-items:center">E-post ${ic('lock', { s: 14, st: 'color:var(--smuted)' })}</span>`, is: 'background:#F1F2F3;color:#8A8F95;' }))],
    ]),
  ]);

  // =====================================================================
  // Textarea
  // =====================================================================
  const MSG = 'Hej! Jag undrar om det går att boka en tid nästa vecka, helst på förmiddagen. Tack på förhand.';
  const TA = (o = {}) => {
    const rows = o.rows || 4, lh = o.lh || 1.5;
    const h = Math.round(rows * 15 * lh + 24);
    return `<div class="fld" style="flex:none"><span class="lbl">Meddelande</span><div class="inp" style="position:relative;height:${h}px;align-items:flex-start;padding:12px 14px;white-space:normal;line-height:${lh};${o.is || ''}"><span style="min-width:0;flex:1">${o.txt != null ? o.txt : MSG}</span>${o.inner || ''}</div>${o.below || ''}</div>`;
  };
  const grip = `<svg viewBox="0 0 10 10" aria-hidden="true" style="position:absolute;right:4px;bottom:4px;width:10px;height:10px"><path d="M9 2 2 9M9 6 6 9" stroke="rgba(26,28,30,.4)" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  group('textarea', 'Textarea (meddelandefält)', [
    Q('ta-hojd', 'Hur högt ska meddelandefältet vara från början?', [
      ['3 rader', W(TA({ rows: 3 }))],
      ['5 rader', W(TA({ rows: 5 }))],
      ['8 rader', W(TA({ rows: 8 }))],
    ]),
    Q('ta-raknare', 'Ska meddelandefältet visa en teckenräknare?', [
      ['Ingen räknare', W(TA())],
      ['”96 / 500” under till höger', W(TA({ below: `<span class="small muted" style="align-self:flex-end;font-variant-numeric:tabular-nums">96 / 500</span>` }))],
      ['”404 tecken kvar” under', W(TA({ below: `<span class="small muted">404 tecken kvar</span>` }))],
      ['Inuti fältet nere till höger', W(TA({ rows: 5, inner: `<span class="small muted" style="position:absolute;right:12px;bottom:8px;font-variant-numeric:tabular-nums">96 / 500</span>` }))],
    ]),
    Q('ta-grans', 'Hur ska räknaren se ut när gränsen närmar sig?', [
      ['Grå hela tiden', W(TA({ below: `<span class="small muted" style="align-self:flex-end;font-variant-numeric:tabular-nums">492 / 500</span>` }))],
      ['Orange nära gränsen', W(TA({ below: `<span class="small" style="align-self:flex-end;font-weight:600;color:var(--warn);font-variant-numeric:tabular-nums">492 / 500</span>` }))],
      ['Visas först nära gränsen', W(TA({ below: `<span class="small muted">8 tecken kvar</span>` }))],
    ]),
    Q('ta-storlek', 'Hur ska meddelandefältets höjd fungera?', [
      ['Handtag för att ändra storlek', W(TA({ inner: grip }))],
      ['Växer automatiskt med texten', W(TA({ rows: 4 }) + cap('Fältet blir högre ju mer man skriver'))],
      ['Fast höjd med rullning', W(TA({ rows: 3, txt: MSG + ' Eftermiddag går också bra om det passar bättre.', is: 'overflow:hidden;padding-right:22px;', inner: '<span style="position:absolute;right:5px;top:8px;width:4px;height:34px;border-radius:2px;background:rgba(26,28,30,.25)"></span>' }))],
    ]),
    Q('ta-radavstand', 'Vilket radavstånd ska text i meddelandefältet ha?', [
      ['1,4 radavstånd', W(TA({ lh: 1.4 }))],
      ['1,5 radavstånd', W(TA({ lh: 1.5 }))],
      ['1,7 radavstånd', W(TA({ lh: 1.7 }))],
    ]),
  ]);

  // =====================================================================
  // Rullgardiner
  // =====================================================================
  const tri = s => `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px;flex:0 0 auto;color:var(--smuted)"><path d="M6 9.5h12l-6 6.5Z" fill="currentColor"/></svg>`;
  const chev = (o = {}) => ic(o.n || 'down', { s: o.s || 18, sw: o.sw || 2, st: `color:${o.c || 'var(--smuted)'}` });
  const SEL = (right, x = {}) => F({ lbl: 'Land', val: 'Sverige', right, ...x });
  const ROWS = ['Danmark', 'Finland', 'Norge', 'Sverige'];
  function dlist(o = {}) {
    const rows = o.rows || ROWS;
    const body = rows.map((t, i) => {
      const s = i === o.sel ? (o.selSt || '') : i === o.hov ? (o.hovSt || '') : '';
      const pre = i === o.sel && o.pre ? o.pre : (o.pad ? '<span style="width:18px;flex:0 0 auto"></span>' : '');
      const post = i === o.sel && o.post ? o.post : '';
      return `<div style="display:flex;align-items:center;gap:8px;height:${o.rh || 38}px;padding:0 10px;border-radius:${o.rr != null ? o.rr : 6}px;${o.rowSt || ''}${s}">${pre}<span style="flex:1;min-width:0">${t}</span>${post}</div>`;
    }).join('');
    return `<div style="background:var(--box);border:${o.bd || '1px solid var(--sline)'};border-radius:${o.r != null ? o.r : 10}px;box-shadow:${o.sh || '0 8px 24px rgba(26,28,30,.12)'};padding:${o.p != null ? o.p : 6}px;margin-top:${o.mt != null ? o.mt : 2}px;font-size:${o.fz || 15}px;${o.st || ''}">${o.head || ''}${body}</div>`;
  }
  const openSel = (lo, fx = {}) => W(SEL(chev({ n: 'up' }), { is: `border-color:${BR};`, ...fx, below: dlist(lo) }), 'justify-content:flex-start');
  const ck = (c = BR) => `<span style="display:inline-flex;color:${c}">${ic('check', { s: 18 })}</span>`;
  group('rullgardin', 'Rullgardiner', [
    Q('rg-pil', 'Vilken pil ska rullgardinen ha?', [
      ['Tunn chevron', W(SEL(chev({ sw: 1.5 })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ sw: 1.5 }) }))],
      ['Kraftig chevron', W(SEL(chev({ sw: 2.5 })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ sw: 2.5 }) }))],
      ['Fylld triangel', W(SEL(tri(18)) + F({ lbl: 'Antal', val: '2 personer', right: tri(18) }))],
      ['Dubbelpil upp och ned', W(SEL(chev({ n: 'updown', s: 16 })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ n: 'updown', s: 16 }) }))],
    ]),
    Q('rg-pilstorlek', 'Hur stor ska rullgardinens pil vara?', [14, 18, 22].map(s => [`${s} px pil`, W(SEL(chev({ s })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ s }) }))])),
    Q('rg-pilfarg', 'Vilken färg ska rullgardinens pil ha?', [
      ['Grå pil', W(SEL(chev()) + F({ lbl: 'Antal', val: '2 personer', right: chev() }))],
      ['Pil i textfärg', W(SEL(chev({ c: 'var(--sink)' })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ c: 'var(--sink)' }) }))],
      ['Pil i märkesfärg', W(SEL(chev({ c: BR })) + F({ lbl: 'Antal', val: '2 personer', right: chev({ c: BR }) }))],
    ]),
    Q('rg-avdelare', 'Ska pilen avgränsas från texten med en linje?', [
      ['Utan linje', W(SEL(chev()) + F({ lbl: 'Antal', val: '2 personer', right: chev() }))],
      ['Med lodrät linje', W([SEL, v => F({ lbl: 'Antal', val: '2 personer', right: v })].map(f => f(`<span style="align-self:stretch;display:flex;align-items:center;border-left:1px solid var(--sline);padding-left:12px;margin:8px 0">${chev()}</span>`)).join(''))],
    ]),
    Q('rg-ph', 'Vad ska en rullgardin visa innan något är valt?', [
      ['”Välj …”', W(SEL(chev(), { val: undefined, ph: 'Välj …' }))],
      ['”Välj land”', W(SEL(chev(), { val: undefined, ph: 'Välj land' }))],
      ['Tomt fält', W(SEL(chev(), { val: undefined, ph: '' }))],
    ]),
    Q('rg-inbyggd', 'Ska rullgardinen använda webbläsarens lista eller en egen?', [
      ['Webbläsarens inbyggda lista', W(SEL(chev(), {
        below: `<div style="margin-top:2px;border:1px solid #A7A7A7;background:#fff;font:13px system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.2)">${ROWS.map(t => `<div style="padding:3px 8px;${t === 'Sverige' ? 'background:#1A6FE0;color:#fff' : ''}">${t}</div>`).join('')}</div>`,
      }), 'justify-content:flex-start')],
      ['Egen lista i samma stil', openSel({ sel: 3, selSt: 'background:var(--tint);font-weight:600;', post: ck() })],
    ]),
    Q('rg-vald', 'Hur ska det valda alternativet markeras i en öppen lista?', [
      ['Bock till höger', openSel({ sel: 3, post: ck() })],
      ['Tonad bakgrund', openSel({ sel: 3, selSt: 'background:var(--tint);' })],
      ['Fet text', openSel({ sel: 3, selSt: 'font-weight:700;' })],
      ['Bock till vänster', openSel({ sel: 3, pad: true, pre: ck() })],
    ]),
    Q('rg-hover', 'Hur ska raden under muspekaren markeras?', [
      ['Ljusgrå bakgrund', openSel({ sel: 3, post: ck(), hov: 1, hovSt: 'background:#F1F2F3;' })],
      ['Tonad bakgrund', openSel({ sel: 3, post: ck(), hov: 1, hovSt: 'background:var(--tint);' })],
      ['Märkesfärg med vit text', openSel({ sel: 3, post: ck(), hov: 1, hovSt: `background:${BR};color:#fff;` })],
    ]),
    Q('rg-lyft', 'Hur ska den öppna listan skiljas från sidan?', [
      ['Skugga utan kant', openSel({ sel: 3, post: ck(), bd: '1px solid transparent' })],
      ['Bara kant', openSel({ sel: 3, post: ck(), sh: 'none' })],
      ['Kant och skugga', openSel({ sel: 3, post: ck() })],
    ]),
    Q('rg-avstand', 'Hur ska den öppna listan sitta mot fältet?', [
      ['Ihop med fältet', W(SEL(chev({ n: 'up' }), { is: `border-color:${BR};border-radius:var(--rf) var(--rf) 0 0;`, fs: 'gap:0', below: dlist({ sel: 3, post: ck(), mt: -1, r: 0, st: `border-color:${BR};border-radius:0 0 var(--rf) var(--rf);`, sh: '0 8px 24px rgba(26,28,30,.10)' }) }), 'justify-content:flex-start')],
      ['4 px mellanrum', openSel({ sel: 3, post: ck(), mt: -1 })],
      ['8 px mellanrum', openSel({ sel: 3, post: ck(), mt: 3 })],
    ]),
    Q('rg-sok', 'Hur ska man hitta i en lång lista?', [
      ['Bara rulla', openSel({ sel: 3, post: ck(), rows: ['Belgien', 'Danmark', 'Estland', 'Sverige'] })],
      ['Sökfält överst i listan', openSel({ sel: 3, post: ck(), rows: ['Belgien', 'Danmark', 'Estland', 'Sverige'], head: `<div style="display:flex;align-items:center;gap:8px;height:38px;padding:0 10px;margin-bottom:4px;border-bottom:1px solid var(--sline);color:${MUT}">${ic('search', { s: 16 })}Sök land</div>` })],
      ['Skriv direkt i fältet', W(F({ lbl: 'Land', val: 'Sve', caret: true, right: chev({ n: 'up' }), is: `border-color:${BR};`, below: dlist({ rows: ['<b>Sve</b>rige'], sel: 0, selSt: 'background:#F1F2F3;' }) }), 'justify-content:flex-start')],
    ]),
  ]);

  // =====================================================================
  // Sökfält
  // =====================================================================
  const sIco = (s = 20) => ic('search', { s, st: 'color:var(--smuted)' });
  const SF = (x = {}) => F({ lbl: null, ph: 'Sök', left: sIco(), ...x });
  const clearX = k => k === 'circle'
    ? `<span style="display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#D5D8DC;color:#fff;flex:0 0 auto">${ic('x', { s: 12, sw: 3 })}</span>`
    : k === 'text' ? `<span style="font-size:13px;font-weight:600;color:${BR};flex:0 0 auto">Rensa</span>`
    : `<span style="display:inline-flex;color:${MUT}">${ic('x', { s: 18 })}</span>`;
  const sugg = (rows, o = {}) => dlist({ rows, rh: 36, ...o });
  const SUG = ['Leveranstid', 'Leveransadress', 'Leverans och retur'];
  const SFopen = (list, x = {}) => W(SF({ val: 'Leverans', ph: undefined, caret: true, is: `border-color:${BR};`, right: clearX(), below: list, ...x }), 'justify-content:flex-start');
  const kbd = t => `<span style="flex:0 0 auto;font-size:12px;font-weight:600;color:${MUT};border:1px solid var(--sline);border-radius:5px;padding:1px 6px;line-height:1.4">${t}</span>`;
  group('sok', 'Sökfält', [
    Q('sok-ikon', 'Var ska sökikonen sitta?', [
      ['Ikon till vänster', W(SF())],
      ['Ikon till höger', W(SF({ left: '', right: sIco() }))],
      ['Ingen ikon', W(SF({ left: '' }))],
    ]),
    Q('sok-knapp', 'Hur ska man starta sökningen?', [
      ['Ingen knapp, bara Enter', W(SF())],
      ['Textknapp inuti fältet', W(SF({ is: 'padding-right:5px;', right: '<span class="sb" style="height:38px;padding:0 16px;font-size:14px;border-radius:6px">Sök</span>' }))],
      ['Knapp bredvid fältet', W(`<div style="display:flex;gap:8px;align-items:center">${SF({ fs: 'flex:1 1 auto' })}<span class="sb" style="padding:0 18px">Sök</span></div>`)],
      ['Ikonknapp inuti fältet', W(SF({ left: '', is: 'padding-right:5px;', right: `<span class="sb" style="height:38px;width:38px;padding:0;border-radius:6px">${ic('search', { s: 18 })}</span>` }))],
    ]),
    Q('sok-rundning', 'Hur runt ska sökfältet vara?', [
      ['4 px rundning', W(SF({ is: 'border-radius:4px;' }))],
      ['8 px rundning', W(SF({ is: 'border-radius:8px;' }))],
      ['12 px rundning', W(SF({ is: 'border-radius:12px;' }))],
      ['Helt runda ändar (pill)', W(SF({ is: 'border-radius:999px;padding:0 18px;' }))],
    ]),
    Q('sok-bakgrund', 'Hur ska sökfältet se ut i viloläge?', [
      ['Vitt med kant', W(SF())],
      ['Grått utan kant', W(SF({ is: S.fill }))],
      ['Vitt med skugga', W(SF({ is: 'border-color:transparent;box-shadow:0 2px 10px rgba(26,28,30,.12);' }))],
    ]),
    Q('sok-hojd', 'Hur högt ska sökfältet vara?', [40, 48, 56].map(h => [`${h} px högt`, W(SF({ is: `height:${h}px;` }))])),
    Q('sok-ph', 'Vad ska sökfältets platshållare säga?', [
      ['”Sök”', W(SF({ ph: 'Sök' }))],
      ['”Sök …”', W(SF({ ph: 'Sök …' }))],
      ['”Vad letar du efter?”', W(SF({ ph: 'Vad letar du efter?' }))],
    ]),
    Q('sok-rensa', 'Hur ska knappen som tömmer sökfältet se ut?', [
      ['Kryss', W(SF({ val: 'Leverans', ph: undefined, right: clearX() }))],
      ['Kryss i grå cirkel', W(SF({ val: 'Leverans', ph: undefined, right: clearX('circle') }))],
      ['Texten ”Rensa”', W(SF({ val: 'Leverans', ph: undefined, right: clearX('text') }))],
      ['Ingen rensa-knapp', W(SF({ val: 'Leverans', ph: undefined }))],
    ]),
    Q('sok-kortkommando', 'Ska sökfältet visa ett kortkommando?', [
      ['Inget kortkommando', W(SF())],
      ['Märke med ⌘K', W(SF({ right: kbd('⌘K') }))],
      ['Märke med /', W(SF({ right: kbd('/') }))],
    ]),
    Q('sok-forslag', 'Hur ska förslagslistan under sökfältet se ut?', [
      ['Bara text', SFopen(sugg(SUG))],
      ['Sökikon på varje rad', SFopen(sugg(SUG.map(t => `<span style="display:flex;gap:10px;align-items:center"><span style="display:inline-flex;color:${MUT}">${ic('search', { s: 16 })}</span>${t}</span>`)))],
      ['Grupperad under rubriker', SFopen(sugg(SUG.slice(0, 2), { head: `<div style="font-size:12px;font-weight:600;color:${MUT};padding:4px 10px 2px">Sidor</div>` }) .replace(/<\/div>$/, `<div style="font-size:12px;font-weight:600;color:${MUT};padding:8px 10px 2px">Frågor</div><div style="display:flex;align-items:center;height:36px;padding:0 10px">Hur lång är leveranstiden?</div></div>`))],
      ['Med kategori till höger', SFopen(sugg(SUG.map((t, i) => `<span style="display:flex;justify-content:space-between;gap:8px"><span>${t}</span><span style="font-size:13px;color:${MUT}">${['Sida', 'Sida', 'Fråga'][i]}</span></span>`)))],
    ]),
    Q('sok-fetstil', 'Vilken del av ett förslag ska vara fet?', [
      ['Det man har skrivit', SFopen(sugg(['<b>Leverans</b>tid', '<b>Leverans</b>adress', '<b>Leverans</b> och retur']))],
      ['Resten av ordet', SFopen(sugg(['Leverans<b>tid</b>', 'Leverans<b>adress</b>', 'Leverans<b> och retur</b>']))],
      ['Ingen fetstil', SFopen(sugg(SUG))],
    ]),
    Q('sok-senaste', 'Hur ska senaste sökningar visas när fältet får fokus?', [
      ['Lista med klockikon', W(SF({ caret: true, is: `border-color:${BR};`, below: sugg(['Leveranstid', 'Öppettider', 'Kontakt'].map(t => `<span style="display:flex;gap:10px;align-items:center"><span style="display:inline-flex;color:${MUT}">${ic('history', { s: 16 })}</span>${t}</span>`)) }), 'justify-content:flex-start')],
      ['Som chips', W(SF({ caret: true, is: `border-color:${BR};`, below: `<div style="margin-top:4px"><div style="font-size:12px;font-weight:600;color:${MUT};margin-bottom:6px">Senaste</div><div class="row" style="gap:6px">${['Leveranstid', 'Öppettider', 'Kontakt'].map(t => `<span class="chip" style="height:30px;font-size:13px">${t}</span>`).join('')}</div></div>` }), 'justify-content:flex-start')],
      ['Visas inte', W(SF({ caret: true, is: `border-color:${BR};` }), 'justify-content:flex-start')],
    ]),
    Q('sok-tom', 'Vad ska förslagslistan visa när inget matchar?', [
      ['Bara ”Inga träffar”', W(SF({ val: 'Levrans', ph: undefined, caret: true, is: `border-color:${BR};`, right: clearX(), below: dlist({ rows: [`<span style="color:${MUT}">Inga träffar</span>`] }) }), 'justify-content:flex-start')],
      ['Ordet och ett tips', W(SF({ val: 'Levrans', ph: undefined, caret: true, is: `border-color:${BR};`, right: clearX(), below: dlist({ rows: [], head: `<div style="padding:8px 10px;font-size:14px"><b>Inga träffar för ”Levrans”</b><div class="muted" style="font-size:13px">Kontrollera stavningen eller prova ett annat ord.</div></div>` }) }), 'justify-content:flex-start')],
      ['Förslag på närliggande ord', W(SF({ val: 'Levrans', ph: undefined, caret: true, is: `border-color:${BR};`, right: clearX(), below: dlist({ rows: SUG.slice(0, 2), head: `<div style="font-size:13px;color:${MUT};padding:6px 10px 2px">Menade du <b style="color:var(--sink)">leverans</b>?</div>` }) }), 'justify-content:flex-start')],
    ]),
  ]);

  // =====================================================================
  // Kryssrutor
  // =====================================================================
  const KROWS = [['E-post', true], ['Sms', false], ['Telefon', true]];
  const khead = '<span class="lbl" style="font-size:13px;font-weight:600">Hur vill du bli kontaktad?</span>';
  const klist = (bo = {}, rx = '', gap = 12) => W(khead + `<div class="stack" style="gap:${gap}px">${KROWS.map(([t, on]) => crow(cbox({ ...bo, on }), t, rx)).join('')}</div>`, 'gap:12px');
  group('kryssrutor', 'Kryssrutor', [
    Q('kr-form', 'Vilken form ska kryssrutan ha?', [
      ['Fyrkant med raka hörn', klist({ r: 0 })],
      ['Lätt rundad (3 px)', klist({ r: 3 })],
      ['Tydligt rundad (6 px)', klist({ r: 6 })],
      ['Cirkel', klist({ r: 99 })],
    ]),
    Q('kr-storlek', 'Hur stor ska kryssrutan vara?', [16, 18, 20, 24].map(s => [`${s} px ruta`, klist({ s, r: Math.round(s / 5) })])),
    Q('kr-vald', 'Hur ska en ikryssad ruta se ut?', [
      ['Fylld med vit bock', klist({ mode: 'fill' })],
      ['Vit med färgad kant och bock', klist({ mode: 'outline' })],
      ['Ljust tonad med färgad bock', KROWS && W(khead + `<div class="stack" style="gap:12px">${KROWS.map(([t, on]) => crow(on ? cbox({ on, mode: 'outline', st: 'background:var(--tint)' }) : cbox(), t)).join('')}</div>`, 'gap:12px')],
    ]),
    Q('kr-farg', 'Vilken färg ska en ikryssad ruta ha?', [
      ['Märkesfärg', klist({ col: BR })],
      ['Svart', klist({ col: '#1A1C1E' })],
      ['Klarblå', klist({ col: '#2563EB' })],
    ]),
    Q('kr-bock-tjocklek', 'Hur tjock ska bocken vara?', [1.5, 2, 2.5, 3].map(sw => [`${String(sw).replace('.', ',')} px bock`, klist({ sw })])),
    Q('kr-bock-andar', 'Hur ska bockens ändar se ut?', [
      ['Rundade ändar', klist({ sw: 2.5 })],
      ['Raka, spetsiga ändar', klist({ sw: 2.5, cap: 'butt' })],
    ]),
    Q('kr-kant', 'Hur ska en tom kryssruta ramas in?', [
      ['1 px ljusgrå kant', klist({ bw: 1, bc: 'rgba(26,28,30,.30)' })],
      ['1,5 px mellangrå kant', klist({ bw: 1.5, bc: MID })],
      ['2 px mörk kant', klist({ bw: 2, bc: 'rgba(26,28,30,.70)' })],
    ]),
    Q('kr-avstand', 'Hur stort ska avståndet mellan ruta och text vara?', [8, 10, 12].map(g => [`${g} px avstånd`, W(khead + `<div class="stack" style="gap:12px">${KROWS.map(([t, on]) => crow(cbox({ on }), t, `gap:${g}px`)).join('')}</div>`, 'gap:12px')])),
    Q('kr-radavstand', 'Hur tätt ska kryssrutorna i en lista ligga?', [8, 12, 16].map(g => [`${g} px mellan raderna`, klist({}, '', g)])),
    Q('kr-tvarad', 'Hur ska rutan linjera mot en etikett på två rader?', [
      ['Mot första raden', W('<div style="max-width:220px">' + crow(cbox({ on: true }), 'Jag vill få påminnelser inför bokade tider via e-post', 'align-items:flex-start;line-height:1.4').replace('display:inline-grid', 'margin-top:1px;display:inline-grid') + '</div>')],
      ['Centrerad mot texten', W('<div style="max-width:220px">' + crow(cbox({ on: true }), 'Jag vill få påminnelser inför bokade tider via e-post', 'align-items:center;line-height:1.4') + '</div>')],
    ]),
    Q('kr-delvis', 'Hur ska en delvis markerad ruta se ut?', ['line', 'outline', 'square'].map((k, i) => [
      ['Streck i fylld ruta', 'Streck i ruta med kant', 'Liten fylld fyrkant'][i],
      W(crow(cbox({ on: 'mixed', mode: k === 'line' ? 'fill' : 'outline', mixed: k === 'square' ? 'square' : 'line', sw: 2 }), '<b style="font-weight:600">Välj alla</b>') + `<div class="stack" style="gap:12px;padding-left:30px">${KROWS.map(([t, on]) => crow(cbox({ on }), t)).join('')}</div>`, 'gap:12px')])),
    Q('kr-hover', 'Hur ska en kryssruta reagera när muspekaren är över?', [
      ['Ingen ändring', W(cap('Viloläge') + crow(cbox(), 'Sms') + cap('Muspekare över') + crow(cbox(), 'Sms'), 'gap:8px')],
      ['Mörkare kant', W(cap('Viloläge') + crow(cbox(), 'Sms') + cap('Muspekare över') + crow(cbox({ bc: BR }), 'Sms'), 'gap:8px')],
      ['Ljus cirkel bakom', W(cap('Viloläge') + crow(cbox(), 'Sms') + cap('Muspekare över') + crow(cbox({ st: 'box-shadow:0 0 0 8px rgba(36,64,94,.10)' }), 'Sms'), 'gap:8px')],
    ]),
    Q('kr-fokus', 'Hur ska kryssrutan visa fokus från tangentbordet?', [
      ['Ring tätt intill', W(crow(cbox({ on: true }), 'E-post') + crow(cbox({ st: `box-shadow:0 0 0 2px ${BR}` }), 'Sms'))],
      ['Ring med mellanrum', W(crow(cbox({ on: true }), 'E-post') + crow(cbox({ st: `box-shadow:0 0 0 2px #fff,0 0 0 4px ${BR}` }), 'Sms'))],
      ['Ljus halo', W(crow(cbox({ on: true }), 'E-post') + crow(cbox({ bc: BR, st: 'box-shadow:0 0 0 4px rgba(36,64,94,.20)' }), 'Sms'))],
      ['Ring runt rad och text', W(crow(cbox({ on: true }), 'E-post', 'padding:2px 6px;margin:-2px -6px') + crow(cbox(), 'Sms', `padding:4px 8px;margin:-4px -8px;border-radius:6px;box-shadow:0 0 0 2px ${BR};align-self:flex-start`))],
    ]),
    Q('kr-kort', 'Hur ska kryssrutor med längre val visas?', [
      ['Vanlig lista', W(khead + `<div class="stack" style="gap:12px">${KROWS.map(([t, on]) => crow(cbox({ on }), t)).join('')}</div>`, 'gap:12px')],
      ['Kort med kant', W(khead + `<div class="stack" style="gap:8px">${KROWS.map(([t, on]) => crow(cbox({ on }), t, `border:1px solid ${on ? BR : 'var(--sline)'};border-radius:10px;padding:12px 14px`)).join('')}</div>`, 'gap:12px')],
      ['Kort som tonas när valt', W(khead + `<div class="stack" style="gap:8px">${KROWS.map(([t, on]) => crow(cbox({ on }), t, `border:1px solid ${on ? BR : 'var(--sline)'};background:${on ? 'var(--tint)' : 'transparent'};border-radius:10px;padding:12px 14px`)).join('')}</div>`, 'gap:12px')],
    ]),
    Q('kr-lank', 'Hur ska en länk i kryssrutans text se ut?', [
      ['Understruken i märkesfärg', W(crow(cbox(), `Jag godkänner <span style="color:${BR};text-decoration:underline;text-underline-offset:3px">villkoren</span>`))],
      ['Understruken i textfärg', W(crow(cbox(), 'Jag godkänner <span style="text-decoration:underline;text-underline-offset:3px">villkoren</span>'))],
      ['Halvfet utan understrykning', W(crow(cbox(), `Jag godkänner <span style="color:${BR};font-weight:600">villkoren</span>`))],
    ]),
  ]);

  // =====================================================================
  // Radioknappar
  // =====================================================================
  function rad(o = {}) {
    const s = o.s || 20, mode = o.mode || 'dot', col = o.col || BR, bw = o.bw || 1.5;
    const base = `display:inline-grid;place-items:center;flex:0 0 auto;width:${s}px;height:${s}px;border-radius:50%;`;
    if (!o.on) return `<span style="${base}border:${bw}px solid ${MID};background:var(--box)"></span>`;
    if (mode === 'fill') { const d = o.d || Math.round(s * .36); return `<span style="${base}background:${col}"><span style="width:${d}px;height:${d}px;border-radius:50%;background:#fff"></span></span>`; }
    if (mode === 'thick') return `<span style="${base}border:${Math.round(s * .3)}px solid ${col};background:#fff"></span>`;
    if (mode === 'check') return `<span style="${base}background:${col};color:#fff">${ic('check', { s: Math.round(s * .7), sw: 3 })}</span>`;
    const d = o.d || Math.round(s * .45);
    return `<span style="${base}border:${bw}px solid ${col};background:var(--box)"><span style="width:${d}px;height:${d}px;border-radius:50%;background:${col}"></span></span>`;
  }
  const RROWS = [['E-post', 'Svar inom en arbetsdag', true], ['Telefon', 'Vi ringer upp dig', false], ['Sms', 'Ett kort besked', false]];
  const rlist = (ro = {}, gap = 12) => W(khead + `<div class="stack" style="gap:${gap}px">${RROWS.map(([t, , on]) => crow(rad({ ...ro, on }), t)).join('')}</div>`, 'gap:12px');
  const rcard = (on, inner, st) => `<div style="display:flex;align-items:center;gap:12px;border-radius:10px;padding:12px 14px;position:relative;${st(on)}">${inner}</div>`;
  const rtxt = (t, d) => `<span style="min-width:0;flex:1;line-height:1.3"><span style="display:block;font-weight:600">${t}</span><span class="small muted">${d}</span></span>`;
  const cardSel = on => `border:${on ? '2px solid ' + BR : '1px solid var(--sline)'};padding:${on ? '11px 13px' : '12px 14px'};`;
  group('radio', 'Radioknappar', [
    Q('ra-vald', 'Hur ska en vald radioknapp se ut?', [
      ['Prick i ring', rlist({ mode: 'dot' })],
      ['Fylld med vit prick', rlist({ mode: 'fill' })],
      ['Tjock färgad ring', rlist({ mode: 'thick' })],
      ['Bock i fylld cirkel', rlist({ mode: 'check' })],
    ]),
    Q('ra-prick', 'Hur stor ska pricken i en vald radioknapp vara?', [
      ['Liten prick', rlist({ d: 6 })],
      ['Mellanstor prick', rlist({ d: 9 })],
      ['Stor prick', rlist({ d: 12 })],
    ]),
    Q('ra-storlek', 'Hur stor ska radioknappen vara?', [16, 20, 24].map(s => [`${s} px radioknapp`, rlist({ s })])),
    Q('ra-kort', 'Hur ska radioknappar med förklaring visas?', [
      ['Vanlig lista', W(khead + `<div class="stack" style="gap:14px">${RROWS.map(([t, d, on]) => crow(rad({ on }), rtxt(t, d), 'align-items:flex-start')).join('')}</div>`, 'gap:12px')],
      ['Kort med radioknapp', W(khead + `<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, rad({ on }) + rtxt(t, d), cardSel)).join('')}</div>`, 'gap:12px')],
      ['Kort utan radioknapp', W(khead + `<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, rtxt(t, d), cardSel)).join('')}</div>`, 'gap:12px')],
      ['Kort med bock i hörnet', W(khead + `<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, rtxt(t, d) + (on ? rad({ on, mode: 'check', s: 20 }) : ''), cardSel)).join('')}</div>`, 'gap:12px')],
    ]),
    Q('ra-kort-vald', 'Hur ska ett valt kort markeras?', [
      ['Färgad kant, 2 px', W(`<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, rad({ on }) + rtxt(t, d), cardSel)).join('')}</div>`)],
      ['Färgad kant och tonad bakgrund', W(`<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, rad({ on }) + rtxt(t, d), o => `border:1px solid ${o ? BR : 'var(--sline)'};background:${o ? 'var(--tint)' : 'transparent'};`)).join('')}</div>`)],
      ['Mörkt fyllt kort', W(`<div class="stack" style="gap:8px">${RROWS.map(([t, d, on]) => rcard(on, (on ? rad({ on, col: '#fff' }).replace('background:var(--box)', 'background:transparent') : rad()) + (on ? rtxt(t, d).replace('small muted', 'small" style="opacity:.8') : rtxt(t, d)), o => o ? `background:${BR};color:#fff;border:1px solid ${BR};` : 'border:1px solid var(--sline);')).join('')}</div>`)],
    ]),
    Q('ra-riktning', 'Hur ska två eller tre korta val placeras?', [
      ['Under varandra', rlist()],
      ['Bredvid varandra på en rad', W(khead + `<div class="row" style="gap:20px">${RROWS.map(([t, , on]) => crow(rad({ on }), t)).join('')}</div>`, 'gap:12px')],
    ]),
    Q('ra-avstand', 'Hur tätt ska radioknapparna i en lista ligga?', [8, 12, 16].map(g => [`${g} px mellan raderna`, rlist({}, g)])),
    Q('ra-beskrivning', 'Hur ska en kort förklaring till ett val visas?', [
      ['Grå text under valet', W(`<div class="stack" style="gap:14px">${RROWS.map(([t, d, on]) => crow(rad({ on }), `<span style="line-height:1.3"><span style="display:block">${t}</span><span class="small muted">${d}</span></span>`, 'align-items:flex-start')).join('')}</div>`)],
      ['Grå text på samma rad', W(`<div class="stack" style="gap:12px">${RROWS.map(([t, d, on]) => crow(rad({ on }), `${t} <span class="muted" style="font-size:14px">· ${d}</span>`)).join('')}</div>`)],
      ['Ingen förklaring', W(`<div class="stack" style="gap:12px">${RROWS.map(([t, , on]) => crow(rad({ on }), t)).join('')}</div>`)],
    ]),
  ]);

  // =====================================================================
  // Switchar
  // =====================================================================
  function sw(o = {}) {
    const w = o.w || 40, h = o.h || 22, p = o.p != null ? o.p : 2, on = o.on, col = o.col || BR;
    const k = o.k || (h - 2 * p), r = o.r != null ? o.r : h / 2;
    const bg = on ? col : (o.off || '#C9CDD2');
    const bd = o.bd && !on ? o.bd : 'none';
    const left = on ? w - k - (k > h ? 0 : p) : (k > h ? 0 : p);
    const kr = o.kr != null ? o.kr + 'px' : '50%';
    const kbg = on ? (o.kon || '#fff') : (o.koff || '#fff');
    const sh = o.ksh != null ? o.ksh : '0 1px 2px rgba(26,28,30,.3)';
    let icon = '';
    if (o.icon === 'check' && on) icon = `<span style="color:${col};display:inline-flex">${ic('check', { s: Math.round(k * .62), sw: 3 })}</span>`;
    if (o.icon === 'both') icon = `<span style="color:${on ? col : '#9AA0A6'};display:inline-flex">${ic(on ? 'check' : 'x', { s: Math.round(k * .62), sw: 3 })}</span>`;
    const txt = o.icon === 'text' ? `<span style="position:absolute;top:0;bottom:0;${on ? 'left:7px' : 'right:6px'};display:flex;align-items:center;font-size:10px;font-weight:700;color:${on ? '#fff' : '#5D6166'}">${on ? 'PÅ' : 'AV'}</span>` : '';
    return `<span style="position:relative;display:inline-block;flex:0 0 auto;width:${w}px;height:${h}px;border-radius:${r}px;background:${bg};${bd !== 'none' ? 'box-shadow:inset 0 0 0 1.5px ' + bd + ';' : ''}">${txt}<span style="position:absolute;top:${(h - k) / 2}px;left:${left}px;width:${k}px;height:${k}px;border-radius:${kr};background:${kbg};box-shadow:${sh};display:grid;place-items:center">${icon}</span></span>`;
  }
  const SROWS = [['Påminnelser via e-post', true], ['Påminnelser via sms', false]];
  const swRow = (s, t, x = '') => `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:15px;${x}"><span style="min-width:0">${t}</span>${s}</div>`;
  const slist = (so = {}) => W(SROWS.map(([t, on]) => swRow(sw({ ...so, on }), t)).join('<hr class="divider">'));
  group('switchar', 'Switchar', [
    Q('sw-form', 'Vilken form ska switchen ha?', [
      ['Helt rund (pill)', slist()],
      ['Rundad rektangel', slist({ r: 6, kr: 4 })],
      ['Smalt spår, större knopp', slist({ w: 36, h: 14, k: 20, ksh: '0 1px 3px rgba(26,28,30,.35)', col: 'rgba(36,64,94,.4)', kon: BR })],
    ]),
    Q('sw-storlek', 'Hur stor ska switchen vara?', [
      ['Liten (32 × 18 px)', slist({ w: 32, h: 18 })],
      ['Mellan (40 × 22 px)', slist({ w: 40, h: 22 })],
      ['Stor (48 × 28 px)', slist({ w: 48, h: 28, p: 3 })],
    ]),
    Q('sw-ikon', 'Ska switchen ha en symbol?', [
      ['Ingen symbol', slist({ w: 44, h: 24 })],
      ['Bock i knoppen när på', slist({ w: 44, h: 24, icon: 'check' })],
      ['Bock och kryss', slist({ w: 44, h: 24, icon: 'both' })],
      ['Texten PÅ och AV', slist({ w: 52, h: 24, icon: 'text' })],
    ]),
    Q('sw-farg', 'Vilken färg ska switchen ha när den är på?', [
      ['Märkesfärg', slist({ col: BR })],
      ['Grön', slist({ col: '#1E7A45' })],
      ['Svart', slist({ col: '#1A1C1E' })],
    ]),
    Q('sw-av', 'Hur ska switchen se ut när den är av?', [
      ['Grått spår, vit knopp', slist()],
      ['Vitt spår med kant, grå knopp', slist({ off: '#fff', bd: 'rgba(26,28,30,.35)', koff: '#8A8F95', ksh: 'none' })],
      ['Ljusgrått spår, vit knopp', slist({ off: '#E4E6E9' })],
    ]),
    Q('sw-skugga', 'Ska switchens knopp ha skugga?', [
      ['Knopp med skugga', slist()],
      ['Platt knopp utan skugga', slist({ ksh: 'none' })],
    ]),
    Q('sw-etikett', 'Var ska switchen sitta i förhållande till texten?', [
      ['Text till vänster, switch längst ut', slist()],
      ['Switch före texten', W(SROWS.map(([t, on]) => `<div style="display:flex;align-items:center;gap:12px;font-size:15px">${sw({ on })}<span>${t}</span></div>`).join('<hr class="divider">'))],
      ['Switch direkt efter texten', W(SROWS.map(([t, on]) => `<div style="display:flex;align-items:center;gap:12px;font-size:15px"><span>${t}</span>${sw({ on })}</div>`).join('<hr class="divider">'))],
    ]),
    Q('sw-status', 'Ska switchen visa sitt läge i text?', [
      ['Ingen text', slist()],
      ['”På” eller ”Av” bredvid', W(SROWS.map(([t, on]) => swRow(`<span style="display:flex;align-items:center;gap:8px"><span class="small muted">${on ? 'På' : 'Av'}</span>${sw({ on })}</span>`, t)).join('<hr class="divider">'))],
    ]),
    Q('sw-anvandning', 'När ska en switch användas i stället för en kryssruta?', [
      ['Bara när ändringen gäller direkt'],
      ['För alla ja/nej-val'],
      ['Aldrig, använd alltid kryssruta'],
    ]),
  ]);

  // =====================================================================
  // Segmenterad kontroll
  // =====================================================================
  function seg(o = {}) {
    const items = o.items || ['Dag', 'Vecka', 'Månad'], sel = o.sel != null ? o.sel : 1;
    const h = o.h || 40, r = o.r != null ? o.r : 8, st = o.st || 'plate';
    const eq = o.eq !== false;
    const wrap = { plate: `background:#ECEEF0;padding:3px;`, dark: `background:#ECEEF0;padding:3px;`, outline: `border:1px solid ${BR};`, line: `border-bottom:1px solid var(--sline);` }[st];
    const cells = items.map((t, i) => {
      const on = i === sel;
      const ir = st === 'outline' ? 0 : Math.max(r - 3, 0);
      let cs = `display:flex;align-items:center;justify-content:center;gap:6px;padding:0 14px;font-size:14px;font-weight:${on ? 600 : 500};white-space:nowrap;${eq ? 'flex:1 1 0;min-width:0' : 'flex:0 0 auto'};border-radius:${r >= 99 ? 999 : ir}px;`;
      if (st === 'plate' && on) cs += 'background:#fff;box-shadow:0 1px 3px rgba(26,28,30,.15);';
      if (st === 'dark' && on) cs += `background:${BR};color:#fff;`;
      if (st === 'outline') cs += (on ? `background:${BR};color:#fff;` : `color:${BR};`) + (i ? `border-left:1px solid ${BR};` : '');
      if (st === 'line') cs += on ? `box-shadow:inset 0 -2px 0 ${BR};color:var(--sink);border-radius:0;` : `color:${MUT};`;
      if (o.div && i && !on && i - 1 !== sel) cs += 'border-left:1px solid rgba(26,28,30,.15);';
      const lab = o.icons ? (o.icons === 'only' ? ic(o.ico[i], { s: 18 }) : ic(o.ico[i], { s: 16 }) + t) : t;
      return `<span style="${cs}">${lab}</span>`;
    }).join('');
    const ih = st === 'plate' || st === 'dark' ? h - 6 : h;
    return `<div style="display:${eq ? 'flex' : 'inline-flex'};align-self:${eq ? 'stretch' : 'flex-start'};max-width:100%;height:${h}px;border-radius:${r}px;overflow:hidden;${wrap}">${cells.replace(/<span style="display:flex/g, `<span style="height:${ih}px;display:flex`)}</div>`;
  }
  group('segment', 'Segmenterad kontroll', [
    Q('seg-stil', 'Hur ska det valda läget i en segmenterad kontroll se ut?', [
      ['Vit platta på grå botten', W(seg({ st: 'plate' }))],
      ['Fylld platta på grå botten', W(seg({ st: 'dark' }))],
      ['Kant runt, valt läge fyllt', W(seg({ st: 'outline' }))],
      ['Understrykning', W(seg({ st: 'line' }))],
    ]),
    Q('seg-rundning', 'Hur rund ska den segmenterade kontrollen vara?', [
      ['4 px rundning', W(seg({ r: 4 }))],
      ['8 px rundning', W(seg({ r: 8 }))],
      ['Helt runda ändar (pill)', W(seg({ r: 999 }))],
    ]),
    Q('seg-hojd', 'Hur hög ska den segmenterade kontrollen vara?', [32, 40, 48].map(h => [`${h} px hög`, W(seg({ h }))])),
    Q('seg-avdelare', 'Ska det finnas linjer mellan de ovalda lägena?', [
      ['Utan linjer', W(seg({ items: ['Dag', 'Vecka', 'Månad', 'År'], sel: 0 }))],
      ['Tunna linjer mellan', W(seg({ items: ['Dag', 'Vecka', 'Månad', 'År'], sel: 0, div: true }))],
    ]),
    Q('seg-bredd', 'Hur breda ska lägena vara?', [
      ['Lika breda, fyller raden', W(seg({ items: ['Dag', 'Vecka', 'Kvartal'] }))],
      ['Efter textens längd', W(seg({ items: ['Dag', 'Vecka', 'Kvartal'], eq: false }))],
    ]),
    Q('seg-ikon', 'Ska lägena ha ikoner?', [
      ['Bara text', W(seg({ items: ['Lista', 'Rutnät', 'Karta'], sel: 0 }))],
      ['Ikon och text', W(seg({ items: ['Lista', 'Rutnät', 'Karta'], sel: 0, icons: 'both', ico: ['list', 'grid', 'map'] }))],
      ['Bara ikon', W(seg({ items: ['Lista', 'Rutnät', 'Karta'], sel: 0, icons: 'only', ico: ['list', 'grid', 'map'], eq: false }))],
    ]),
  ]);

  // =====================================================================
  // Reglage
  // =====================================================================
  const KS = {
    white: 'border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(26,28,30,.35);',
    fill: `border-radius:50%;background:${BR};`,
    ring: `border-radius:50%;background:#fff;border:2px solid ${BR};`,
  };
  function slider(o = {}) {
    const t = o.t || 4, k = o.k || 20, col = BR;
    const from = o.v2 != null ? o.v : 0, to = o.v2 != null ? o.v2 : (o.v != null ? o.v : 60);
    const kst = o.ks === 'bar' ? `border-radius:3px;background:${BR};width:6px;margin-left:-3px;` : `width:${k}px;margin-left:-${k / 2}px;` + KS[o.ks || 'white'];
    const kh = o.ks === 'bar' ? Math.round(k * 1.2) : k;
    const knob = (p, lab) => `<span style="position:absolute;left:${p}%;top:50%;margin-top:-${kh / 2}px;height:${kh}px;${kst}">${o.bubble ? `<span style="position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--sink);color:#fff;font-size:12px;font-weight:600;padding:3px 7px;border-radius:5px;white-space:nowrap">${lab}</span>` : ''}</span>`;
    const fill = o.fill === false ? '' : `<span style="position:absolute;left:${from}%;width:${to - from}%;top:0;bottom:0;background:${col};border-radius:${t}px"></span>`;
    const ticks = o.ticks ? [0, 25, 50, 75, 100].map(p => `<span style="position:absolute;left:${p}%;top:50%;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:50%;background:${p <= to && p >= from ? '#fff' : 'rgba(26,28,30,.35)'}"></span>`).join('') : '';
    const knobs = (o.v2 != null ? knob(from, o.l1 || '') : '') + knob(to, o.l2 || '');
    return `<div style="position:relative;height:${Math.max(kh, t)}px;margin:${o.bubble ? 30 : 0}px ${k / 2}px 0"><span style="position:absolute;left:0;right:0;top:50%;height:${t}px;margin-top:-${t / 2}px;background:#DDE0E4;border-radius:${t}px">${fill}${ticks}</span>${knobs}</div>`;
  }
  const slHead = (r = '') => `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><span class="lbl" style="font-size:13px;font-weight:600">Pris</span>${r}</div>`;
  const slv = t => `<span style="font-size:14px;font-weight:600;font-variant-numeric:tabular-nums">${t}</span>`;
  const SL = (so = {}, r = slv('600 kr'), after = '') => W(slHead(r) + slider(so) + after, 'gap:12px');
  group('reglage', 'Reglage (slider)', [
    Q('sl-spar', 'Hur tjockt ska reglagets spår vara?', [2, 4, 6, 8].map(t => [`${t} px spår`, SL({ t })])),
    Q('sl-knopp', 'Hur ska reglagets knopp se ut?', [
      ['Vit med skugga', SL({ ks: 'white' })],
      ['Fylld i märkesfärg', SL({ ks: 'fill' })],
      ['Vit med färgad kant', SL({ ks: 'ring' })],
      ['Smal stav', SL({ ks: 'bar' })],
    ]),
    Q('sl-knopp-storlek', 'Hur stor ska reglagets knopp vara?', [16, 20, 24, 28].map(k => [`${k} px knopp`, SL({ k })])),
    Q('sl-varde', 'Hur ska reglagets värde visas?', [
      ['Inget värde', SL({}, '')],
      ['I etikettraden till höger', SL()],
      ['Bubbla ovanför knoppen', SL({ bubble: true, l2: '600 kr' }, '')],
      ['I ett litet fält bredvid', W(slHead() + `<div style="display:flex;align-items:center;gap:12px"><div style="flex:1;min-width:0">${slider()}</div><span class="inp" style="height:36px;width:84px;flex:0 0 auto;padding:0 10px;font-size:14px">600 kr</span></div>`, 'gap:12px')],
    ]),
    Q('sl-fyllt', 'Ska spåret fyllas fram till knoppen?', [
      ['Fyllt fram till knoppen', SL()],
      ['Ofyllt spår', SL({ fill: false })],
    ]),
    Q('sl-intervall', 'Hur ska ett reglage för intervall (från–till) visa värdena?', [
      ['Text i etikettraden', SL({ v: 30, v2: 75 }, slv('300–750 kr'))],
      ['Bubblor ovanför knopparna', SL({ v: 30, v2: 75, bubble: true, l1: '300 kr', l2: '750 kr' }, '')],
      ['Två fält under reglaget', SL({ v: 30, v2: 75 }, '', `<div style="display:flex;align-items:center;gap:8px"><span class="inp" style="flex:1;min-width:0;height:40px;font-size:14px">300 kr</span><span class="muted">–</span><span class="inp" style="flex:1;min-width:0;height:40px;font-size:14px">750 kr</span></div>`)],
    ]),
    Q('sl-steg', 'Ska reglagets steg markeras?', [
      ['Inga stegmarkeringar', SL({ v: 50 }, slv('500 kr'))],
      ['Prickar på spåret', SL({ v: 50, t: 6, ticks: true }, slv('500 kr'))],
      ['Siffror under spåret', SL({ v: 50 }, slv('500 kr'), `<div style="display:flex;justify-content:space-between;font-size:12px;color:${MUT};font-variant-numeric:tabular-nums"><span>0</span><span>250</span><span>500</span><span>750</span><span>1 000</span></div>`)],
    ]),
    Q('sl-minmax', 'Ska reglagets lägsta och högsta värde visas?', [
      ['Nej', SL()],
      ['Ja, under spårets ändar', SL({}, slv('600 kr'), `<div style="display:flex;justify-content:space-between;font-size:12px;color:${MUT}"><span>0 kr</span><span>1 000 kr</span></div>`)],
    ]),
  ]);

  // =====================================================================
  // Antalsväljare
  // =====================================================================
  function stepper(o = {}) {
    const h = o.h || 44, r = o.r != null ? o.r : 8, n = o.n != null ? o.n : 2, st = o.st || 'box';
    const b = (i, dis) => {
      const fill = o.btn === 'grey' ? 'background:#EEF0F2;' : o.btn === 'brand' && i === 'plus' ? `background:${BR};color:#fff;` : '';
      const ico = dis === 'trash' ? 'trash' : i;
      const c = dis === true ? 'color:rgba(26,28,30,.28);' : '';
      if (st === 'round') return `<span style="display:grid;place-items:center;width:${h - 8}px;height:${h - 8}px;border-radius:50%;border:1px solid var(--sline);${fill}${c}">${ic(ico, { s: 18 })}</span>`;
      if (st === 'bare') return `<span style="display:grid;place-items:center;width:${h - 12}px;height:${h - 12}px;color:${BR};${c}">${ic(ico, { s: 20 })}</span>`;
      const ir = Math.max(0, Math.min(r, h / 2) - 4);
      return `<span style="display:grid;place-items:center;width:${h - 8}px;height:${h - 8}px;border-radius:${r >= 99 ? 999 : ir}px;${fill}${c}">${ic(ico, { s: 18 })}</span>`;
    };
    const num = `<span style="min-width:28px;text-align:center;font-weight:600;font-variant-numeric:tabular-nums">${n}</span>`;
    const minus = b('minus', n <= 1 ? (o.min || false) : false);
    if (st === 'box') return `<span style="display:inline-flex;align-items:center;gap:4px;height:${h}px;padding:0 3px;border:1px solid var(--sline);border-radius:${r}px;background:#fff">${minus}${num}${b('plus')}</span>`;
    if (st === 'arrows') return `<span class="inp" style="display:inline-flex;width:120px;height:${h}px;padding:0 0 0 14px;border-radius:${r}px"><span style="flex:1;font-weight:600">${n}</span><span style="display:flex;flex-direction:column;align-self:stretch;border-left:1px solid var(--sline)"><span style="flex:1;display:grid;place-items:center;padding:0 8px;border-bottom:1px solid var(--sline)">${ic('up', { s: 14 })}</span><span style="flex:1;display:grid;place-items:center;padding:0 8px">${ic('down', { s: 14 })}</span></span></span>`;
    return `<span style="display:inline-flex;align-items:center;gap:8px">${minus}${num}${b('plus')}</span>`;
  }
  const stRow = (s, t = 'Antal personer') => W(`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><span style="font-size:15px">${t}</span>${s}</div>`);
  group('antal', 'Antalsväljare', [
    Q('an-stil', 'Hur ska antalsväljaren se ut?', [
      ['Knappar och siffra i en ram', stRow(stepper({ st: 'box' }))],
      ['Separata runda knappar', stRow(stepper({ st: 'round' }))],
      ['Fält med små pilar', stRow(stepper({ st: 'arrows' }))],
      ['Bara ikoner, ingen ram', stRow(stepper({ st: 'bare' }))],
    ]),
    Q('an-rundning', 'Hur rund ska antalsväljarens ram vara?', [
      ['4 px rundning', stRow(stepper({ r: 4 }))],
      ['8 px rundning', stRow(stepper({ r: 8 }))],
      ['Helt runda ändar (pill)', stRow(stepper({ r: 999 }))],
    ]),
    Q('an-knappar', 'Hur ska minus- och plusknapparna se ut?', [
      ['Bara ikonen', stRow(stepper())],
      ['Grå platta bakom', stRow(stepper({ btn: 'grey' }))],
      ['Plus fyllt i märkesfärg', stRow(stepper({ btn: 'brand' }))],
    ]),
    Q('an-min', 'Hur ska minusknappen se ut vid lägsta värdet?', [
      ['Utgråad', stRow(stepper({ n: 1, min: true }), 'Antal')],
      ['Oförändrad', stRow(stepper({ n: 1 }), 'Antal')],
      ['Blir en papperskorg', stRow(stepper({ n: 1, min: 'trash' }), 'Antal')],
    ]),
    Q('an-storlek', 'Hur hög ska antalsväljaren vara?', [32, 40, 48].map(h => [`${h} px hög`, stRow(stepper({ h }))])),
  ]);

  // =====================================================================
  // Datumväljare
  // =====================================================================
  const SELD = `background:${BR};color:#fff;font-weight:600;border-radius:50%;`;
  function cal(o = {}) {
    const off = 1, days = [];
    for (let i = 0; i < off; i++) days.push(null);
    for (let d = 1; d <= 31; d++) days.push(d);
    while (days.length % 7) days.push(null);
    const wd = o.wd || ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
    const cols = o.wk ? '22px repeat(7,minmax(0,1fr))' : 'repeat(7,minmax(0,1fr))';
    let g = (o.wk ? '<span></span>' : '') + wd.map(t => `<span style="text-align:center;font-size:11px;font-weight:600;color:${MUT};padding-bottom:4px">${t}</span>`).join('');
    days.forEach((d, i) => {
      const col = i % 7;
      if (o.wk && col === 0) g += `<span style="display:grid;place-items:center;font-size:10px;color:${MUT}">${49 + i / 7}</span>`;
      let cell = '', dot = '', extra = '';
      if (d) {
        if (o.past && d < o.past) dot += o.pastSt || 'color:rgba(26,28,30,.3);';
        if (o.wkend && col >= 5) dot += o.wkend;
        if (o.range && d >= o.range[0] && d <= o.range[1]) { const r = o.rangeFn(d, o.range[0], o.range[1]); cell += r.cell || ''; dot += r.dot || ''; }
        if (d === o.today) { dot += o.todaySt || ''; if (o.todayMark) extra = o.todayMark; }
        if (d === o.sel) dot += o.selSt || SELD;
      }
      g += `<span style="display:grid;place-items:center;padding:1px 0;${cell}"><span style="position:relative;display:grid;place-items:center;width:min(30px,100%);aspect-ratio:1;font-size:13px;font-variant-numeric:tabular-nums;${dot}">${d || ''}${d ? extra : ''}</span></span>`;
    });
    const t = '<span style="font-weight:600;font-size:14px">December 2026</span>';
    const L = `<span style="display:inline-flex;color:var(--sink)">${ic('left', { s: 18 })}</span>`, R = `<span style="display:inline-flex;color:var(--sink)">${ic('right', { s: 18 })}</span>`;
    const pillSel = x => `<span style="display:inline-flex;align-items:center;gap:2px;font-weight:600;font-size:13px;border:1px solid var(--sline);border-radius:6px;padding:2px 4px 2px 8px">${x}${ic('down', { s: 14 })}</span>`;
    const nav = o.nav === 'right' ? `${t}<span style="display:flex;gap:10px">${L}${R}</span>` : o.nav === 'select' ? `<span style="display:flex;gap:6px">${pillSel('Dec')}${pillSel('2026')}</span><span style="display:flex;gap:10px">${L}${R}</span>` : `${L}${t}${R}`;
    return `<div style="border:1px solid var(--sline);border-radius:12px;padding:12px 10px;background:#fff;box-shadow:0 6px 20px rgba(26,28,30,.08);${o.st || ''}">${o.top || ''}<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:8px;padding:0 4px">${nav}</div><div style="display:grid;grid-template-columns:${cols};row-gap:2px">${g}</div></div>`;
  }
  const C = (o = {}) => W(cal({ sel: 17, today: 10, ...o }), 'padding:14px 12px');
  const band = 'var(--tint)';
  const RF = {
    band: (d, a, b) => ({ cell: d === a ? `background:linear-gradient(90deg,transparent 50%,${band} 50%);` : d === b ? `background:linear-gradient(90deg,${band} 50%,transparent 50%);` : `background:${band};`, dot: d === a || d === b ? SELD : '' }),
    tiles: (d, a, b) => ({ dot: d === a || d === b ? `background:${BR};color:#fff;font-weight:600;border-radius:6px;` : `background:${band};border-radius:6px;` }),
    square: (d, a, b) => ({ cell: `background:${d === a || d === b ? BR : band};`, dot: d === a || d === b ? 'color:#fff;font-weight:600;' : '' }),
  };
  function dchips(k, sel = 2) {
    const D = [['Mån', 7], ['Tis', 8], ['Ons', 9], ['Tor', 10], ['Fre', 11]];
    if (k === 'pill') return `<div class="row" style="gap:6px">${D.map(([w, n], i) => `<span class="chip" style="height:34px;font-size:13px;${i === sel ? `background:${BR};border-color:${BR};color:#fff;font-weight:600` : ''}">${w.toLowerCase()} ${n} dec</span>`).join('')}</div>`;
    if (k === 'circle') return `<div style="display:flex;gap:4px">${D.map(([w, n], i) => `<span style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font-size:11px;font-weight:600;color:${MUT}">${w}</span><span style="display:grid;place-items:center;width:36px;max-width:100%;aspect-ratio:1;border-radius:50%;font-weight:600;font-size:14px;${i === sel ? `background:${BR};color:#fff` : 'border:1px solid var(--sline)'}">${n}</span></span>`).join('')}</div>`;
    return `<div style="display:flex;gap:6px">${D.map(([w, n], i) => `<span style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;height:58px;border-radius:10px;${i === sel ? `background:${BR};color:#fff;border:1px solid ${BR}` : 'border:1px solid var(--sline)'}"><span style="font-size:11px;font-weight:600;${i === sel ? '' : `color:${MUT}`}">${w}</span><span style="font-size:17px;font-weight:700">${n}</span></span>`).join('')}</div>`;
  }
  group('datum', 'Datumväljare', [
    Q('da-vald', 'Hur ska den valda dagen i kalendern markeras?', [
      ['Fylld cirkel', C()],
      ['Fylld rundad fyrkant', C({ selSt: `background:${BR};color:#fff;font-weight:600;border-radius:8px;` })],
      ['Fylld fyrkant med raka hörn', C({ selSt: `background:${BR};color:#fff;font-weight:600;border-radius:0;` })],
      ['Ring runt siffran', C({ selSt: `box-shadow:inset 0 0 0 2px ${BR};color:${BR};font-weight:700;border-radius:50%;` })],
    ]),
    Q('da-idag', 'Hur ska dagens datum markeras?', [
      ['Tunn ring', C({ todaySt: 'box-shadow:inset 0 0 0 1px rgba(26,28,30,.4);border-radius:50%;' })],
      ['Prick under siffran', C({ todayMark: `<span style="position:absolute;bottom:3px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:${BR}"></span>` })],
      ['Fet siffra i märkesfärg', C({ todaySt: `color:${BR};font-weight:700;` })],
      ['Ingen markering', C()],
    ]),
    Q('da-intervall', 'Hur ska ett valt datumintervall visas?', [
      ['Band mellan två fyllda cirklar', C({ sel: 0, range: [14, 18], rangeFn: RF.band })],
      ['Varje dag som egen tonad ruta', C({ sel: 0, range: [14, 18], rangeFn: RF.tiles })],
      ['Rakt band med fyllda ändar', C({ sel: 0, range: [14, 18], rangeFn: RF.square })],
    ]),
    Q('da-veckodagar', 'Hur ska veckodagarna skrivas i kalendern?', [
      ['En bokstav: M T O', C()],
      ['Två bokstäver: må ti on', C({ wd: ['må', 'ti', 'on', 'to', 'fr', 'lö', 'sö'] })],
      ['Tre bokstäver: Mån Tis', C({ wd: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'] })],
    ]),
    Q('da-veckonummer', 'Ska kalendern visa veckonummer?', [
      ['Utan veckonummer', C()],
      ['Med veckonummer', C({ wk: true })],
    ]),
    Q('da-passerade', 'Hur ska dagar som inte går att välja visas?', [
      ['Ljusgrå siffror', C({ past: 10, today: 0 })],
      ['Överstrukna', C({ past: 10, today: 0, pastSt: 'color:rgba(26,28,30,.38);text-decoration:line-through;' })],
      ['Grå med prickad bakgrund', C({ past: 10, today: 0, pastSt: 'color:rgba(26,28,30,.35);background:repeating-linear-gradient(135deg,#F1F2F3 0 3px,#fff 3px 6px);border-radius:6px;' })],
    ]),
    Q('da-helg', 'Ska lördag och söndag skilja sig från vardagar?', [
      ['Som övriga dagar', C()],
      ['Grå siffror', C({ wkend: `color:${MUT};` })],
      ['Röda siffror', C({ wkend: 'color:#B3261E;' })],
    ]),
    Q('da-navigering', 'Hur ska man byta månad i kalendern?', [
      ['Pilar på var sin sida', C()],
      ['Båda pilarna till höger', C({ nav: 'right' })],
      ['Listor för månad och år', C({ nav: 'select' })],
    ]),
    Q('da-snabbval', 'Ska kalendern ha snabbval?', [
      ['Inga snabbval', C()],
      ['Chips ovanför kalendern', C({ top: `<div class="row" style="gap:6px;margin-bottom:10px">${['I dag', 'I morgon', 'Nästa vecka'].map(t => `<span class="chip" style="height:28px;font-size:12px;padding:0 10px">${t}</span>`).join('')}</div>` })],
    ]),
    Q('da-falt', 'Hur ska ett datumfält se ut när det är stängt?', [
      ['Kalenderikon till höger', W(F({ lbl: 'Datum', val: '2026-12-17', right: ic('cal', { s: 18, st: 'color:var(--smuted)' }) }))],
      ['Kalenderikon till vänster', W(F({ lbl: 'Datum', val: '2026-12-17', left: ic('cal', { s: 18, st: 'color:var(--smuted)' }) }))],
      ['Tre fält: dag, månad, år', W(`<div class="fld" style="flex:none"><span class="lbl">Datum</span><div style="display:flex;gap:8px">${[['Dag', '17', 1], ['Månad', '12', 1], ['År', '2026', 1.6]].map(([l, v, f]) => `<div style="flex:${f} 1 0;min-width:0;display:flex;flex-direction:column;gap:3px"><span class="inp">${v}</span><span style="font-size:12px;color:${MUT}">${l}</span></div>`).join('')}</div></div>`)],
      ['Skrivet datum utan ikon', W(F({ lbl: 'Datum', val: 'tor 17 december 2026' }))],
    ]),
    Q('da-chips', 'Hur ska man välja när det bara finns ett fåtal dagar?', [
      ['Vanlig kalender', C({ sel: 9, today: 0, past: 7, pastSt: 'color:rgba(26,28,30,.3);' })],
      ['Rad med dagar som chips', W(`<span class="lbl" style="font-size:13px;font-weight:600">Välj dag</span>` + dchips('two'), 'gap:10px')],
      ['Rullgardin med dagar', W(F({ lbl: 'Välj dag', val: 'Onsdag 9 december', right: chev() }))],
    ]),
    Q('da-chip-stil', 'Hur ska dagarna se ut när de visas som chips?', [
      ['Ruta med veckodag och siffra', W(dchips('two'))],
      ['Pill med text på en rad', W(dchips('pill'))],
      ['Cirkel med veckodag ovanför', W(dchips('circle'))],
    ]),
  ]);

  // =====================================================================
  // Tidsval
  // =====================================================================
  const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00'];
  const tgrid = (fn, times = TIMES) => `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">${times.map((t, i) => fn(t, i)).join('')}</div>`;
  const tbtn = (t, i, k = 'out', busy = []) => {
    const on = i === 2, b = busy.includes(i);
    let s = `display:grid;place-items:center;height:40px;font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;border-radius:${k === 'pill' ? 999 : 8}px;`;
    if (on) s += `background:${BR};color:#fff;border:1px solid ${BR};`;
    else if (k === 'grey') s += 'background:#EEF0F2;border:1px solid transparent;';
    else s += 'border:1px solid var(--sline);';
    return `<span style="${s}">${t}</span>`;
  };
  group('tid', 'Tidsval', [
    Q('ti-typ', 'Hur ska man välja en tid?', [
      ['Knappar i rutnät', W('<span class="lbl" style="font-size:13px;font-weight:600">Välj tid</span>' + tgrid((t, i) => tbtn(t, i)), 'gap:10px')],
      ['Lista med tider', W('<span class="lbl" style="font-size:13px;font-weight:600">Välj tid</span>' + `<div style="border:1px solid var(--sline);border-radius:10px;overflow:hidden">${TIMES.slice(0, 4).map((t, i) => `<div style="display:flex;justify-content:space-between;align-items:center;height:40px;padding:0 12px;font-variant-numeric:tabular-nums;${i ? 'border-top:1px solid var(--sline);' : ''}${i === 2 ? `background:var(--tint);font-weight:600` : ''}">${t}${i === 2 ? ck() : ''}</div>`).join('')}</div>`, 'gap:10px')],
      ['Rullgardin', W(F({ lbl: 'Välj tid', val: '10:00', right: chev() }))],
      ['Skriv tiden i ett fält', W(F({ lbl: 'Tid', val: '10:00', right: ic('clock', { s: 18, st: 'color:var(--smuted)' }) }))],
    ]),
    Q('ti-knapp', 'Hur ska tidsknapparna se ut?', [
      ['Vit med kant', W(tgrid((t, i) => tbtn(t, i, 'out')))],
      ['Grå utan kant', W(tgrid((t, i) => tbtn(t, i, 'grey')))],
      ['Pill med kant', W(tgrid((t, i) => tbtn(t, i, 'pill')))],
    ]),
    Q('ti-upptagen', 'Hur ska upptagna tider visas?', [
      ['Överstrukna och grå', W(tgrid((t, i) => [1, 4].includes(i) ? `<span style="display:grid;place-items:center;height:40px;font-size:14px;border-radius:8px;border:1px solid rgba(26,28,30,.08);color:rgba(26,28,30,.35);text-decoration:line-through;font-variant-numeric:tabular-nums">${t}</span>` : tbtn(t, i)))],
      ['Grå utan kant', W(tgrid((t, i) => [1, 4].includes(i) ? `<span style="display:grid;place-items:center;height:40px;font-size:14px;border-radius:8px;background:#F1F2F3;color:rgba(26,28,30,.35);font-variant-numeric:tabular-nums">${t}</span>` : tbtn(t, i)))],
      ['Dolda helt', W(tgrid((t, i) => tbtn(t, i === 0 ? 0 : i === 1 ? 2 : 9), ['09:00', '10:00', '10:30', '13:00']))],
    ]),
    Q('ti-format', 'Hur ska klockslag skrivas?', [
      ['09:00', W(tgrid((t, i) => tbtn(t, i)))],
      ['9:00', W(tgrid((t, i) => tbtn(t.replace(/^0/, ''), i)))],
      ['9.00', W(tgrid((t, i) => tbtn(t.replace(/^0/, '').replace(':', '.'), i)))],
      ['kl. 9.00', W(tgrid((t, i) => tbtn('kl. ' + t.replace(/^0/, '').replace(':', '.'), i)))],
    ]),
  ]);

  // =====================================================================
  // Filuppladdning
  // =====================================================================
  const dz = (o = {}) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:22px 14px;border-radius:12px;border:${o.bd || '1.5px dashed rgba(26,28,30,.3)'};background:${o.bg || 'transparent'}">${o.ico === '' ? '' : `<span style="display:inline-flex;color:${o.ic || MUT}">${ic(o.ico || 'upload', { s: 26, sw: 1.75 })}</span>`}<span style="font-size:14px"><b style="color:${BR}">Välj fil</b> eller dra hit</span><span style="font-size:12px;color:${MUT}">PDF eller JPG, max 10 MB</span></div>`;
  const fileRow = (x = '', extra = '') => `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--sline);border-radius:10px;${x}"><span style="display:inline-flex;color:${MUT}">${ic('doc', { s: 20 })}</span><span style="flex:1;min-width:0;line-height:1.3"><span style="display:block;font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">underlag.pdf</span>${extra || `<span style="font-size:12px;color:${MUT}">1,2 MB</span>`}</span><span style="display:inline-flex;color:${MUT}">${ic('x', { s: 18 })}</span></div>`;
  const ulab = '<span class="lbl" style="font-size:13px;font-weight:600">Bifoga fil</span>';
  group('uppladdning', 'Filuppladdning', [
    Q('up-typ', 'Hur ska filuppladdning se ut?', [
      ['Dropzon att dra filer till', W(ulab + dz(), 'gap:8px')],
      ['Knapp ”Välj fil”', W(ulab + `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="sb2" style="height:40px;padding:0 16px;font-size:14px">${ic('upload', { s: 18 })}Välj fil</span><span class="small muted">Ingen fil vald</span></div>`, 'gap:8px')],
      ['Fält med bläddra-knapp', W(ulab + `<div class="inp" style="padding-right:4px;gap:10px"><span style="flex:1;min-width:0;color:${MUT}">Ingen fil vald</span><span style="height:38px;display:flex;align-items:center;padding:0 12px;border-radius:6px;background:#EEF0F2;font-size:14px;font-weight:600">Bläddra</span></div>`, 'gap:8px')],
    ]),
    Q('up-kant', 'Hur ska dropzonens kant se ut?', [
      ['Streckad kant', W(dz())],
      ['Prickad kant', W(dz({ bd: '2px dotted rgba(26,28,30,.3)' }))],
      ['Heldragen tunn kant', W(dz({ bd: '1px solid var(--sline)' }))],
      ['Grå yta utan kant', W(dz({ bd: '1px solid transparent', bg: '#F1F2F3' }))],
    ]),
    Q('up-ikon', 'Vilken ikon ska dropzonen ha?', [
      ['Pil uppåt', W(dz({ ico: 'upload' }))],
      ['Moln med pil', W(dz({ ico: 'cloud' }))],
      ['Dokument', W(dz({ ico: 'doc' }))],
      ['Ingen ikon', W(dz({ ico: '' }))],
    ]),
    Q('up-drag', 'Hur ska dropzonen se ut när en fil dras över den?', [
      ['Färgad kant och tonad yta', W(dz({ bd: `1.5px dashed ${BR}`, bg: 'var(--tint)', ic: BR }))],
      ['Bara färgad kant', W(dz({ bd: `1.5px dashed ${BR}`, ic: BR }))],
      ['Heldragen färgad kant, 2 px', W(dz({ bd: `2px solid ${BR}`, ic: BR }))],
    ]),
    Q('up-fil', 'Hur ska en uppladdad fil visas?', [
      ['Rad med ikon, namn och kryss', W(ulab + fileRow(), 'gap:8px')],
      ['Chip med namn och kryss', W(ulab + `<span class="chip" style="align-self:flex-start;gap:8px;max-width:100%">${ic('doc', { s: 16 })}underlag.pdf<span style="display:inline-flex;color:${MUT}">${ic('x', { s: 14 })}</span></span>`, 'gap:8px')],
      ['Bara länkat filnamn', W(ulab + `<span style="display:flex;gap:10px;align-items:center;font-size:14px"><span class="link">underlag.pdf</span><span class="small muted">1,2 MB</span><span class="small" style="color:${BAD};font-weight:600">Ta bort</span></span>`, 'gap:8px')],
    ]),
    Q('up-forlopp', 'Hur ska en pågående uppladdning visas?', [
      ['Linje under filnamnet', W(fileRow('', `<span style="display:block;height:4px;border-radius:2px;background:#E4E6E9;margin-top:6px"><span style="display:block;width:64%;height:100%;border-radius:2px;background:${BR}"></span></span>`))],
      ['Procent i text', W(fileRow('', `<span style="font-size:12px;color:${MUT}">Laddar upp … 64 %</span>`))],
      ['Fylls som bakgrund', W(fileRow(`background:linear-gradient(90deg,var(--tint) 64%,transparent 64%)`, `<span style="font-size:12px;color:${MUT}">64 %</span>`))],
    ]),
  ]);

  // =====================================================================
  // Telefonfält
  // =====================================================================
  const flag = '<svg viewBox="0 0 16 10" aria-hidden="true" style="width:20px;height:13px;border-radius:2px;flex:0 0 auto"><rect width="16" height="10" fill="#006AA7"/><path d="M5 0h2v10H5zM0 4h16v2H0z" fill="#FECC00"/></svg>';
  const cc = (inner, div = true) => `<span style="display:flex;align-items:center;gap:6px;align-self:stretch;margin-left:-4px;padding-right:12px;${div ? 'border-right:1px solid var(--sline);' : ''}flex:0 0 auto">${inner}${ic('down', { s: 14, st: 'color:var(--smuted)' })}</span>`;
  const telF = (left, val = '70-123 45 67', x = {}) => W(F({ lbl: 'Telefon', val, left, ...x }));
  group('telefon', 'Telefonfält', [
    Q('te-landskod', 'Hur ska landskoden visas i telefonfältet?', [
      ['Flagga och kod i en meny', telF(cc(flag + '<span>+46</span>'))],
      ['Bara koden i en meny', telF(cc('<span>+46</span>'))],
      ['Ingen meny, skriv +46 själv', telF('', '+46 70-123 45 67')],
      ['Ingen landskod alls', telF('', '070-123 45 67')],
    ]),
    Q('te-avdelare', 'Ska landskoden skiljas från numret med en linje?', [
      ['Med lodrät linje', telF(cc(flag + '<span>+46</span>'))],
      ['Utan linje', telF(cc(flag + '<span>+46</span>', false))],
      ['Som egen ruta bredvid', W(`<div class="fld" style="flex:none"><span class="lbl">Telefon</span><div style="display:flex;gap:8px"><span class="inp" style="flex:0 0 auto;gap:6px;padding:0 10px">${flag}+46${ic('down', { s: 14, st: 'color:var(--smuted)' })}</span><span class="inp" style="flex:1;min-width:0">70-123 45 67</span></div></div>`)],
    ]),
    Q('te-format', 'Hur ska numret formateras medan man skriver?', [
      ['Som man skriver det', telF('', '0701234567')],
      ['Med bindestreck och mellanslag', telF('', '070-123 45 67')],
      ['Bara mellanslag', telF('', '070 123 45 67')],
    ]),
    Q('te-ph', 'Vad ska ett tomt telefonfält visa?', [
      ['Ett exempelnummer', telF('', undefined, { ph: '070-123 45 67' })],
      ['Ordet ”Telefonnummer”', telF('', undefined, { ph: 'Telefonnummer' })],
      ['Inget', telF('', undefined, { ph: '' })],
    ]),
  ]);

  // =====================================================================
  // Lösenordsfält
  // =====================================================================
  const PW = '••••••••••';
  const eyeB = k => k === 'text' ? `<span style="font-size:13px;font-weight:600;color:${BR};flex:0 0 auto">Visa</span>`
    : k === 'both' ? `<span style="display:flex;align-items:center;gap:5px;font-size:13px;font-weight:600;color:${BR};flex:0 0 auto">${ic('eye', { s: 16 })}Visa</span>`
    : `<span style="display:inline-flex;color:${MUT}">${ic('eye', { s: 20 })}</span>`;
  const pwF = (x = {}) => F({ lbl: 'Lösenord', val: `<span style="letter-spacing:2px">${PW}</span>`, right: eyeB(), ...x });
  const meter = (k, lvl = 3) => {
    const cols = { 1: '#B3261E', 2: '#9A5B00', 3: '#1E7A45', 4: '#1E7A45' };
    const c = k === 'brand' ? BR : k === 'mono' ? '#1A1C1E' : cols[lvl];
    const word = ['', 'Svagt', 'Okej', 'Starkt', 'Mycket starkt'][lvl];
    if (k === 'line') return `<div style="display:flex;flex-direction:column;gap:5px"><span style="height:4px;border-radius:2px;background:#E4E6E9"><span style="display:block;height:100%;width:75%;border-radius:2px;background:${cols[lvl]}"></span></span><span style="font-size:12px;color:${MUT}">Lösenordet är <b style="color:${cols[lvl]}">${word.toLowerCase()}</b></span></div>`;
    if (k === 'text') return `<span style="font-size:13px;color:${MUT}">Styrka: <b style="color:${cols[lvl]}">${word}</b></span>`;
    if (k === 'list') return `<div style="display:flex;flex-direction:column;gap:3px;font-size:13px">${[['Minst 8 tecken', 1], ['En siffra', 1], ['Ett specialtecken', 0]].map(([t, ok]) => `<span style="display:flex;gap:6px;align-items:center;color:${ok ? 'var(--ok)' : MUT}">${ok ? ic('check', { s: 15 }) : '<span style="width:15px;display:inline-grid;place-items:center"><span style="width:5px;height:5px;border-radius:50%;background:currentColor"></span></span>'}${t}</span>`).join('')}</div>`;
    return `<div style="display:flex;flex-direction:column;gap:5px"><span style="display:flex;gap:4px">${[1, 2, 3, 4].map(i => `<span style="flex:1;height:4px;border-radius:2px;background:${i <= lvl ? c : '#E4E6E9'}"></span>`).join('')}</span><span style="font-size:12px;color:${MUT}">Lösenordet är <b style="color:${k === 'seg' ? cols[lvl] : c}">${word.toLowerCase()}</b></span></div>`;
  };
  group('losenord', 'Lösenordsfält', [
    Q('pw-visa', 'Hur ska knappen för att visa lösenordet se ut?', [
      ['Öga-ikon', W(pwF())],
      ['Texten ”Visa”', W(pwF({ right: eyeB('text') }))],
      ['Ikon och text', W(pwF({ right: eyeB('both') }))],
      ['Ingen visa-knapp', W(pwF({ right: '' }))],
    ]),
    Q('pw-styrka', 'Hur ska lösenordets styrka visas?', [
      ['Stapel i fyra delar', W(pwF({ below: meter('seg') }))],
      ['Sammanhängande linje', W(pwF({ below: meter('line') }))],
      ['Bara text', W(pwF({ below: meter('text') }))],
      ['Lista med krav som bockas av', W(pwF({ below: meter('list') }))],
    ]),
    Q('pw-styrka-farg', 'Vilka färger ska styrkemätaren ha?', [
      ['Röd, orange, grön efter styrka', W(pwF({ below: meter('seg', 2) }) + pwF({ lbl: 'Lösenord (starkt)', below: meter('seg', 4) }))],
      ['Alltid märkesfärg', W(pwF({ below: meter('brand', 2) }) + pwF({ lbl: 'Lösenord (starkt)', below: meter('brand', 4) }))],
      ['Alltid svart', W(pwF({ below: meter('mono', 2) }) + pwF({ lbl: 'Lösenord (starkt)', below: meter('mono', 4) }))],
    ]),
    Q('pw-krav', 'När ska kraven på lösenordet visas?', [
      ['Alltid under fältet', W(pwF({ val: '', ph: '', below: `<span class="small muted">Minst 8 tecken, varav en siffra.</span>` }))],
      ['När fältet får fokus', W(pwF({ val: '', ph: '', caret: true, is: `border-color:${BR};box-shadow:0 0 0 3px rgba(36,64,94,.18);`, below: meter('list') }))],
      ['Först om något är fel', W(pwF({ val: '<span style="letter-spacing:2px">•••••</span>', is: `border-color:${BAD};`, below: errMsg('Minst 8 tecken, varav en siffra') }))],
    ]),
    Q('pw-upprepa', 'Ska man skriva ett nytt lösenord två gånger?', [
      ['Ett fält med visa-knapp', W(pwF({ lbl: 'Nytt lösenord' }))],
      ['Två fält: skriv och upprepa', W(pwF({ lbl: 'Nytt lösenord', right: '' }) + pwF({ lbl: 'Upprepa lösenord', right: '' }))],
    ]),
    Q('pw-glomt', 'Var ska länken ”Glömt lösenord?” sitta?', [
      ['I etikettraden till höger', W(F({ ...EMAIL }) + pwF({ lbl: `<span style="display:flex;justify-content:space-between;gap:8px"><span>Lösenord</span><span class="link" style="font-size:13px">Glömt lösenord?</span></span>` }) + '<span class="sb">Logga in</span>')],
      ['Under fältet', W(F({ ...EMAIL }) + pwF({ below: '<span class="link" style="font-size:13px;align-self:flex-start">Glömt lösenord?</span>' }) + '<span class="sb">Logga in</span>')],
      ['Under knappen', W(F({ ...EMAIL }) + pwF() + '<span class="sb">Logga in</span><span class="link" style="font-size:13px;align-self:center">Glömt lösenord?</span>')],
    ]),
  ]);

  // =====================================================================
  // Fältgrupper och layout
  // =====================================================================
  const g2 = (a, b) => `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">${a}${b}</div>`;
  const wide = 'max-width:600px;width:100%;margin:0 auto';
  const TA2 = `<div class="fld" style="flex:none"><span class="lbl">Meddelande</span><div class="inp" style="height:84px"></div></div>`;
  const stackGap = (g, inner) => `<div class="stack" style="gap:${g}px">${inner}</div>`;
  const grpH = (t, k) => k === 'line' ? `<div style="display:flex;flex-direction:column;gap:8px"><span class="h h3" style="font-size:16px;font-weight:600">${t}</span><hr class="divider"></div>` : `<span class="h h3" style="font-size:16px;font-weight:600">${t}</span>`;
  const grpForm = k => {
    const a = [F({ ...NAME }), F({ ...EMAIL })].join(''), b = [F({ lbl: 'Gatuadress', val: 'Storgatan 12' }), F({ lbl: 'Ort', val: 'Stockholm' })].join('');
    if (k === 'box') return W([['Kontaktuppgifter', a], ['Adress', b]].map(([t, f]) => `<div style="border:1px solid var(--sline);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px">${grpH(t)}${f}</div>`).join(''), 'gap:16px');
    if (k === 'none') return W(stackGap(12, a) + stackGap(12, b), 'gap:32px');
    return W([['Kontaktuppgifter', a], ['Adress', b]].map(([t, f]) => `<div style="display:flex;flex-direction:column;gap:12px">${grpH(t, k)}${f}</div>`).join(''), 'gap:28px');
  };
  group('faltgrupper', 'Fältgrupper och layout', [
    Q('gr-kolumner', 'Ska formuläret ha en eller två kolumner på stor skärm?', [
      ['En kolumn', W(F({ lbl: 'Förnamn', val: 'Anna' }) + F({ lbl: 'Efternamn', val: 'Berg' }) + F({ ...EMAIL }) + F({ ...TEL }) + TA2, wide)],
      ['Två kolumner för korta fält', W(g2(F({ lbl: 'Förnamn', val: 'Anna' }), F({ lbl: 'Efternamn', val: 'Berg' })) + g2(F({ ...EMAIL }), F({ ...TEL })) + TA2, wide)],
    ], 'stack'),
    Q('gr-avstand', 'Hur stort ska avståndet mellan fälten vara?', [12, 16, 20, 24, 32].map(g => [`${g} px mellan fälten`, W(stackGap(g, F(NAME) + F(EMAIL) + F(TEL)))])),
    Q('gr-rubriker', 'Hur ska fälten delas upp i grupper?', [
      ['Rubrik ovanför varje grupp', grpForm('head')],
      ['Rubrik med linje under', grpForm('line')],
      ['Varje grupp i en egen ruta', grpForm('box')],
      ['Bara större avstånd, ingen rubrik', grpForm('none')],
    ]),
    Q('gr-adress', 'Hur ska postnummer och ort placeras?', [
      ['På var sin rad', W(F({ lbl: 'Postnummer', val: '123 45' }) + F({ lbl: 'Ort', val: 'Stockholm' }))],
      ['Bredvid, postnummer smalt', W(`<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:12px">${F({ lbl: 'Postnummer', val: '123 45' })}${F({ lbl: 'Ort', val: 'Stockholm' })}</div>`)],
      ['Bredvid, lika breda', W(g2(F({ lbl: 'Postnummer', val: '123 45' }), F({ lbl: 'Ort', val: 'Stockholm' })))],
    ]),
    Q('gr-namn', 'Ska namnet vara ett eller två fält?', [
      ['Ett fält: Namn', W(F({ ...NAME }))],
      ['Två fält bredvid varandra', W(g2(F({ lbl: 'Förnamn', val: 'Anna' }), F({ lbl: 'Efternamn', val: 'Berg' })))],
      ['Två fält under varandra', W(F({ lbl: 'Förnamn', val: 'Anna' }) + F({ lbl: 'Efternamn', val: 'Berg' }))],
    ]),
    Q('gr-yta', 'Var ska formuläret ligga?', [
      ['Direkt på sidans bakgrund', `<div class="pad stack" style="flex:1;justify-content:center;gap:14px">${F(NAME)}${F(EMAILPH)}<span class="sb" style="align-self:flex-start">Skicka</span></div>`],
      ['På ett vitt kort med kant', `<div class="pad" style="flex:1;display:flex;flex-direction:column;justify-content:center"><div class="panel stack" style="gap:14px;border:1px solid var(--sline)">${F(NAME)}${F(EMAILPH)}<span class="sb" style="align-self:flex-start">Skicka</span></div></div>`],
      ['På ett vitt kort med skugga', `<div class="pad" style="flex:1;display:flex;flex-direction:column;justify-content:center"><div class="panel stack" style="gap:14px;box-shadow:0 4px 18px rgba(26,28,30,.10)">${F(NAME)}${F(EMAILPH)}<span class="sb" style="align-self:flex-start">Skicka</span></div></div>`],
    ]),
  ]);

  // =====================================================================
  // Skicka-knappen
  // =====================================================================
  const spinCss = '<style>.fa-sk-spin{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;animation:fa-sk-rot .8s linear infinite;flex:0 0 auto}@keyframes fa-sk-rot{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){.fa-sk-spin{animation-duration:2.4s}}</style>';
  const form2 = (btns, x = '') => W(F(NAME) + F(EMAIL) + `<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;${x}">${btns}</div>`);
  group('skicka', 'Formulärets skicka-knapp', [
    Q('sk-bredd', 'Hur bred ska formulärets skicka-knapp vara?', [
      ['Full bredd', W(F(NAME) + F(EMAIL) + '<span class="sb" style="width:100%">Skicka</span>')],
      ['Efter texten', form2('<span class="sb">Skicka</span>')],
    ]),
    Q('sk-plats', 'Var ska en smal skicka-knapp placeras?', [
      ['Vänster, i linje med fälten', form2('<span class="sb">Skicka</span>')],
      ['Till höger', form2('<span class="sb">Skicka</span>', 'justify-content:flex-end')],
      ['Centrerad', form2('<span class="sb">Skicka</span>', 'justify-content:center')],
    ]),
    Q('sk-avstand', 'Hur stort ska avståndet mellan sista fältet och knappen vara?', [16, 24, 32].map(g => [`${g} px ovanför knappen`, W(F(NAME) + F(EMAIL) + `<span class="sb" style="align-self:flex-start;margin-top:${g - 14}px">Skicka</span>`)])),
    Q('sk-avbryt', 'Hur ska ”Avbryt” visas bredvid skicka-knappen?', [
      ['Som sekundärknapp', form2('<span class="sb">Spara</span><span class="sb2">Avbryt</span>')],
      ['Som textlänk', form2(`<span class="sb">Spara</span><span style="font-weight:600;color:${BR};padding:0 8px">Avbryt</span>`)],
      ['Ingen avbryt-knapp', form2('<span class="sb">Spara</span>')],
    ]),
    Q('sk-ordning', 'I vilken ordning ska knapparna stå när de ligger till höger?', [
      ['Huvudknappen ytterst till höger', form2('<span class="sb2">Avbryt</span><span class="sb">Spara</span>', 'justify-content:flex-end')],
      ['Huvudknappen först', form2('<span class="sb">Spara</span><span class="sb2">Avbryt</span>', 'justify-content:flex-end')],
    ]),
    Q('sk-laddar', 'Hur ska knappen se ut medan formuläret skickas?', [
      ['Snurra och ”Skickar …”', W(spinCss + F(NAME) + F(EMAIL) + '<span class="sb" style="align-self:flex-start"><span class="fa-sk-spin"></span>Skickar …</span>')],
      ['Bara snurra, samma bredd', W(spinCss + F(NAME) + F(EMAIL) + '<span class="sb" style="align-self:flex-start;min-width:110px"><span class="fa-sk-spin"></span></span>')],
      ['Blekt med ”Skickar …”', W(F(NAME) + F(EMAIL) + '<span class="sb" style="align-self:flex-start;opacity:.55">Skickar …</span>')],
    ]),
    Q('sk-inaktiv', 'Ska skicka-knappen vara inaktiv tills allt är ifyllt?', [
      ['Alltid aktiv, fel visas vid klick', W(F(NAME) + F({ ...EMAILPH, req: star() }) + '<span class="sb" style="align-self:flex-start">Skicka</span>')],
      ['Inaktiv tills allt är ifyllt', W(F(NAME) + F({ ...EMAILPH, req: star() }) + '<span class="sb" style="align-self:flex-start;background:#E1E3E6;border-color:#E1E3E6;color:#8A8F95">Skicka</span>')],
    ]),
  ]);

  // =====================================================================
  // Validering
  // =====================================================================
  group('validering', 'Inline-validering kontra vid skick', [
    Q('va-tidpunkt', 'När ska ett fält kontrolleras och visa fel?', [
      ['Medan man skriver'],
      ['När man lämnar fältet'],
      ['Först när man trycker på skicka'],
      ['Vid skick, sedan direkt medan man rättar'],
    ]),
    Q('va-rattat', 'Vad ska hända när man har rättat ett fel?', [
      ['Felet byts mot en grön bock', W(cap('Före') + errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }) + cap('Efter rättning') + F({ ...EMAIL, right: okI() }), 'gap:6px')],
      ['Felet försvinner bara', W(cap('Före') + errF({ is: `border-color:${BAD};`, below: errMsg('Ange en giltig e-postadress') }) + cap('Efter rättning') + F({ ...EMAIL }), 'gap:6px')],
    ]),
    Q('va-skick', 'Vad ska hända om man skickar ett formulär med fel?', [
      ['Hoppa till första felet och fokusera det'],
      ['Visa sammanfattning överst med länkar'],
      ['Bara markera fälten, ingen förflyttning'],
    ]),
  ]);

  // =====================================================================
  // Autofyll
  // =====================================================================
  group('autofyll', 'Autofyll', [
    Q('af-utseende', 'Hur ska fält som webbläsaren har fyllt i automatiskt se ut?', [
      ['Webbläsarens ljusblå färg', W(F({ ...NAME, is: 'background:#E8F0FE;' }) + F({ ...EMAIL, is: 'background:#E8F0FE;' }))],
      ['Ljust tonad i märkesfärg', W(F({ ...NAME, is: 'background:var(--tint);' }) + F({ ...EMAIL, is: 'background:var(--tint);' }))],
      ['Ingen skillnad mot vanliga fält', W(F(NAME) + F(EMAIL))],
    ]),
    Q('af-adress', 'Hur ska adressförslag visas medan man skriver?', [
      ['Gata och ort på två rader', W(F({ lbl: 'Gatuadress', val: 'Storg', caret: true, is: `border-color:${BR};`, below: dlist({ rh: 50, rows: ['Storgatan 12', 'Storgatan 14'].map(t => `<span style="display:block;line-height:1.3"><b style="font-weight:600">${t}</b><span style="display:block;font-size:13px;color:${MUT}">123 45 Stockholm</span></span>`) }) }), 'justify-content:flex-start')],
      ['Allt på en rad', W(F({ lbl: 'Gatuadress', val: 'Storg', caret: true, is: `border-color:${BR};`, below: dlist({ rows: ['Storgatan 12', 'Storgatan 14'].map(t => `<span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t}, <span style="color:${MUT}">123 45 Stockholm</span></span>`) }) }), 'justify-content:flex-start')],
      ['Med kartnål före', W(F({ lbl: 'Gatuadress', val: 'Storg', caret: true, is: `border-color:${BR};`, below: dlist({ rows: ['Storgatan 12', 'Storgatan 14'].map(t => `<span style="display:flex;gap:8px;align-items:center;min-width:0"><span style="display:inline-flex;color:${MUT}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:16px;height:16px"><path d="M12 21s-7-6.3-7-11.5a7 7 0 0 1 14 0C19 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t}, Stockholm</span></span>`) }) }), 'justify-content:flex-start')],
    ]),
  ]);

  // __MER__

  window.QZ.part({ key: 'falt', groups: G });
})();
