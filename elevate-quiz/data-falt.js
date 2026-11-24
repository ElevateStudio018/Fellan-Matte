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

  // __MER__

  window.QZ.part({ key: 'falt', groups: G });
})();
