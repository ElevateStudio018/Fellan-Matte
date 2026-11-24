/* Elevate designquiz: Formulär och bokning (fo-). Byggd av hjälpfunktioner och generatorer. */
(function () {
  // ---------- Hjälpfunktioner (delas av data-formular-1.js och -2.js) ----------
  const P = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    chevU: '<path d="m18 15-6-6-6 6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    updown: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/>',
    tri: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4.5M12 8h.01"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    truck: '<path d="M1 4h14v12H1zM15 9h4l3 3v4h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    store: '<path d="M3 9 5 4h14l2 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    arrowR: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    arrowL: '<path d="M19 12H5M11 5l-7 7 7 7"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    hammer: '<path d="m15 12-8.4 8.4a2 2 0 0 1-2.8-2.8L12.2 9"/><path d="m18 15 4-4-6.5-6.5a3 3 0 0 0-4.2 0L10 5.8l3 3 2-.3 2.5 2.5z"/>',
    bath: '<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6 12V5a2 2 0 0 1 3.5-1.3M6 20l-1 2M18 20l1 2"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    roof: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/>',
    paint: '<rect x="3" y="3" width="15" height="6" rx="1.5"/><path d="M18 6h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-8v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
    drop: '<path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7z"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    car: '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 12h14"/>',
    tooth: '<path d="M12 5.5C10 4 7.5 3.5 6 4.5 3.5 6 4 9.5 5 12c.8 2 1 4 1.5 6.5.4 2 2 2.3 2.6.3L10 15c.4-1.3 1.6-1.3 2 0l.9 3.8c.6 2 2.2 1.7 2.6-.3.5-2.5.7-4.5 1.5-6.5 1-2.5 1.5-6-1-7.5-1.5-1-4-.5-6 1z"/>',
    dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    sms: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6A8 8 0 1 1 21 12z"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    bed: '<path d="M2 18V6M2 12h20v6M22 18v-4a4 4 0 0 0-4-4h-8v2"/><circle cx="6.5" cy="9.5" r="1.5"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
    bag: '<path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    party: '<path d="M4 20 9 7l8 8z"/><path d="M14 4v2M19 9h2M17.5 5.5 19 4M13 11c2-2 4-2.5 6-2"/>',
  };
  const ic = (n, s = '') => `<svg class="ico"${s ? ` style="${s}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const at = (s) => (s ? ` style="${s}"` : '');
  const L = (t, s = '') => `<span class="lbl"${at(s)}>${t}</span>`;
  const inp = (v, s = '', ph = false) => `<div class="inp${ph ? ' ph' : ''}"${at(s)}>${v}</div>`;
  const help = (t, s = '') => `<span class="small muted"${at(s)}>${t}</span>`;
  const err = (t, s = '') => `<span class="small" style="color:var(--bad);font-weight:500;${s}">${t}</span>`;
  const fld = (l, v, o = {}) => `<div class="fld"${at(o.fs)}>${l ? L(l, o.ls) : ''}${o.raw || inp(v, o.s || '', o.ph)}${o.help ? help(o.help) : ''}${o.err ? err(o.err) : ''}</div>`;
  const W = (x, s = '') => `<div class="pad stack" style="gap:14px;${s}">${x}</div>`;
  const row = (x, s = '') => `<div class="row"${at(s)}>${x}</div>`;
  const btn = (t, s = '') => `<span class="sb"${at(s)}>${t}</span>`;
  const btn2 = (t, s = '') => `<span class="sb2"${at(s)}>${t}</span>`;
  const panel = (x, s = '') => `<div class="panel stack" style="gap:14px;${s}">${x}</div>`;
  const caret = '<span style="display:inline-block;width:1.5px;height:18px;background:var(--brand);margin-left:1px;vertical-align:middle"></span>';
  const title = (t, s = '') => `<p class="h h3"${at(s)}>${t}</p>`;
  const sm = (t, s = '') => `<p class="small muted"${at(s)}>${t}</p>`;
  const sp = '<span style="flex:1"></span>';
  // Kryssruta, radio, växel
  const tick = (c = '#fff', w = 14) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
  const box = (on, o = {}) => { const z = o.sz || 20; const c = o.c || 'var(--brand)'; return `<span style="flex:0 0 auto;display:inline-grid;place-items:center;width:${z}px;height:${z}px;border-radius:${o.r ?? 4}px;border:${on ? `2px solid ${c}` : `${o.bw || 1.5}px solid rgba(26,28,30,.42)`};background:${on ? c : 'var(--field)'};margin-top:${o.mt ?? 1}px">${on ? tick(o.tc || '#fff', Math.round(z * 0.7)) : ''}</span>`; };
  const radio = (on, o = {}) => { const z = o.sz || 20; const c = o.c || 'var(--brand)'; return `<span style="flex:0 0 auto;display:inline-grid;place-items:center;width:${z}px;height:${z}px;border-radius:50%;border:${on ? `2px solid ${c}` : '1.5px solid rgba(26,28,30,.42)'};background:var(--field);margin-top:${o.mt ?? 1}px">${on ? `<span style="width:${Math.round(z * 0.5)}px;height:${Math.round(z * 0.5)}px;border-radius:50%;background:${c}"></span>` : ''}</span>`; };
  const cbx = (on, t, o = {}) => `<span style="display:flex;gap:10px;align-items:flex-start;line-height:1.4;${o.s || ''}">${box(on, o)}<span style="min-width:0">${t}</span></span>`;
  const rdx = (on, t, o = {}) => `<span style="display:flex;gap:10px;align-items:flex-start;line-height:1.4;${o.s || ''}">${radio(on, o)}<span style="min-width:0">${t}</span></span>`;
  const sw = (on, o = {}) => `<span style="flex:0 0 auto;position:relative;display:inline-block;width:40px;height:24px;border-radius:999px;background:${on ? (o.c || 'var(--brand)') : 'rgba(26,28,30,.22)'}"><span style="position:absolute;top:3px;left:${on ? 19 : 3}px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25)"></span></span>`;
  const swx = (on, t, o = {}) => `<span style="display:flex;gap:12px;align-items:center;justify-content:space-between;${o.s || ''}"><span style="min-width:0">${t}</span>${sw(on, o)}</span>`;
  // Fält med ikon
  const iinp = (icon, v, o = {}) => inp(`${ic(icon, 'color:var(--smuted);margin-right:10px')}<span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${v}</span>`, o.s || '', o.ph);
  const sel = (v, o = {}) => inp(`<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${v}</span>${ic(o.icon || 'chevD', 'width:18px;height:18px;color:var(--smuted)')}`, o.s || '', o.ph);
  // Segmenterad knapp
  const seg = (items, on, o = {}) => `<div style="display:flex;background:var(--tint);border-radius:${o.r || 10}px;padding:4px;gap:4px;${o.s || ''}">${items.map((t, i) => `<span style="flex:1 1 0;min-width:0;text-align:center;padding:8px 6px;border-radius:${(o.r || 10) - 3}px;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${i === on ? 'background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.12)' : 'color:var(--smuted)'}">${t}</span>`).join('')}</div>`;
  const chips = (items, on = [], o = {}) => `<div style="display:flex;flex-wrap:wrap;gap:8px;${o.s || ''}">${items.map((t, i) => `<span class="chip" style="${on.includes(i) ? `background:var(--brand);border-color:var(--brand);color:#fff;${o.onS || ''}` : ''}${o.cs || ''}">${t}</span>`).join('')}</div>`;
  // Avatar med initialer
  const av = (t, bg = '#C9D3DD', z = 40) => `<span style="flex:0 0 auto;display:inline-grid;place-items:center;width:${z}px;height:${z}px;border-radius:50%;background:${bg};color:#1A1C1E;font-weight:700;font-size:${Math.round(z * 0.36)}px">${t}</span>`;
  // Platshållarbild (tonad ruta) för produkter och uppladdade foton
  const tile = (g, s = '') => `<span style="flex:0 0 auto;display:block;border-radius:8px;background:${g};${s}"></span>`;
  const TG = ['linear-gradient(135deg,#C9B8A3,#8E7A64)', 'linear-gradient(135deg,#B9C4C9,#6F8590)', 'linear-gradient(135deg,#D8CFC4,#A99A88)', 'linear-gradient(135deg,#A9B7A0,#61735A)', 'linear-gradient(135deg,#E2D6C8,#BFA78E)'];
  // Kalender (december 2026, startar tisdag)
  const DOW = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
  function cal(o = {}) {
    const days = o.days || 31, off = o.off ?? 1;
    const cells = [];
    for (let i = 0; i < off; i++) cells.push('<span></span>');
    for (let d = 1; d <= days; d++) {
      const st = o.cell ? o.cell(d) : '';
      cells.push(`<span style="display:grid;place-items:center;height:${o.ch || 32}px;font-size:13px;font-variant-numeric:tabular-nums;${st}">${d}</span>`);
    }
    const head = o.head === false ? '' : `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">${o.headL || `<b style="font-size:14px">${o.month || 'December 2026'}</b>`}${o.headR || `<span style="display:flex;gap:6px;color:var(--smuted)">${ic('chevL', 'width:18px;height:18px')}${ic('chevR', 'width:18px;height:18px')}</span>`}</div>`;
    return `<div style="${o.s || ''}">${head}<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:${o.gap ?? 2}px">${DOW.map((d) => `<span style="text-align:center;font-size:11px;font-weight:600;color:var(--smuted);padding-bottom:2px">${d}</span>`).join('')}${cells.join('')}</div></div>`;
  }
  // Mobilram
  const phone = (x, s = '') => `<div style="width:100%;max-width:220px;margin:14px auto;border-radius:28px;border:7px solid #1F2023;overflow:hidden;background:var(--box);display:flex;flex-direction:column;height:400px;position:relative;${s}">${x}</div>`;
  const pbar = (t) => `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--sline);font-weight:600;font-size:13px">${ic('chevL', 'width:16px;height:16px')}<span style="flex:1;text-align:center;margin-right:24px">${t}</span></div>`;
  const ps = (x, s = '') => `<div style="flex:1;min-height:0;overflow:hidden;padding:12px;display:flex;flex-direction:column;gap:10px;font-size:13px;${s}">${x}</div>`;
  const mf = (l, v, s = '') => `<div style="display:flex;flex-direction:column;gap:3px"><span style="font-size:11px;font-weight:600">${l}</span><span style="display:flex;align-items:center;height:36px;padding:0 10px;border:1px solid var(--sline);border-radius:6px;font-size:12px;${s}">${v}</span></div>`;
  const mbtn = (t, s = '') => `<span style="display:flex;align-items:center;justify-content:center;height:40px;border-radius:8px;background:var(--brand);color:#fff;font-weight:600;font-size:13px;${s}">${t}</span>`;
  // Fråga och grupp
  const Q = (id, q, opts, layout = 'grid') => ({ id: 'fo-' + id, q, layout, opts: opts.map(([l, h]) => (h === undefined ? { l } : { l, h })) });

  // ======================= Del 1: fält, validering, val, datum, sök, kontakt, offert =======================
  const nm = (o = {}) => fld('Namn', 'Anna Berg', o);
  const em = (o = {}) => fld('E-post', 'namn@exempel.se', { ph: true, ...o });
  const two = (s, fs) => nm({ s, fs }) + em({ s, fs });
  const fl = (l, v, s = '') => `<div class="inp" style="height:56px;flex-direction:column;align-items:flex-start;justify-content:center;gap:1px;${s}">${v ? `<span style="font-size:11px;color:var(--smuted);font-weight:500;line-height:1.2">${l}</span><span style="line-height:1.3">${v}</span>` : `<span style="color:var(--smuted)">${l}</span>`}</div>`;
  const ta = (txt, h, s = '') => `<div style="height:${h}px;border:1px solid var(--sline);border-radius:var(--rf);background:var(--field);padding:12px 14px;font-size:15px;line-height:1.45;overflow:hidden;${s}">${txt}</div>`;
  const FILLED = 'background:#EDEFF2;border-color:transparent';
  const errB = 'border-color:var(--bad)';

  const gFalt = { key: 'faltstil', title: 'Fältstil', questions: [
    Q('falt-grundstil', 'Vilken grundstil ska textfälten ha?', [
      ['Tunn kant runt om', W(two(''))],
      ['Fylld grå yta utan kant', W(two(FILLED))],
      ['Bara en linje under', W(two('border:0;border-bottom:1.5px solid rgba(26,28,30,.42);border-radius:0;padding:0 2px;background:transparent'))],
      ['Fylld yta med linje under', W(two('background:#EDEFF2;border:0;border-bottom:1.5px solid rgba(26,28,30,.5);border-radius:6px 6px 0 0'))],
    ]),
    Q('falt-etikett', 'Var ska fältets etikett sitta?', [
      ['Etikett ovanför fältet', W(two(''))],
      ['Flytande etikett inuti fältet', W(fl('Namn', 'Anna Berg') + fl('E-post', ''))],
      ['Etikett till vänster om fältet', W(['Namn|Anna Berg|0', 'E-post|namn@exempel.se|1'].map((r) => { const [a, b, p] = r.split('|'); return `<div style="display:flex;align-items:center;gap:12px">${L(a, 'flex:0 0 64px')}${inp(b, 'flex:1;min-width:0', p === '1')}</div>`; }).join(''))],
      ['Ingen etikett, bara platshållare', W(inp('Namn', '', true) + inp('E-post', '', true))],
    ]),
    Q('falt-hojd', 'Hur höga ska textfälten vara?', [40, 48, 56].map((h) => [`${h} px höga fält`, W(two(`height:${h}px`))])),
    Q('falt-rundning', 'Hur rundade ska fältens hörn vara?', [
      ['Raka hörn (0 px)', W(two('border-radius:0'))],
      ['4 px rundning', W(two('border-radius:4px'))],
      ['8 px rundning', W(two('border-radius:8px'))],
      ['12 px rundning', W(two('border-radius:12px'))],
      ['Helt rundade (pill)', W(two('border-radius:999px;padding:0 20px'))],
    ]),
    Q('falt-kant', 'Hur tydlig ska fältkanten vara?', [
      ['Ljus kant (1 px, 16 %)', W(two('border-color:rgba(26,28,30,.16)'))],
      ['Mellangrå kant (1 px, 35 %)', W(two('border-color:rgba(26,28,30,.35)'))],
      ['Mörk kant (1 px, 60 %)', W(two('border-color:rgba(26,28,30,.6)'))],
      ['Tjock kant (2 px)', W(two('border:2px solid rgba(26,28,30,.35);padding:0 13px'))],
    ]),
    Q('falt-fokus', 'Hur ska fältet se ut när man skriver i det?', [
      ['Kanten får brandfärg', 'border-color:var(--brand)'],
      ['Brandkant och mjuk ring', 'border-color:var(--brand);box-shadow:0 0 0 3px rgba(36,64,94,.18)'],
      ['Tjockare kant (2 px)', 'border:2px solid var(--brand);padding:0 13px'],
      ['Ring med glipa utanför', 'box-shadow:0 0 0 2px #fff,0 0 0 4px var(--brand)'],
      ['Tonad bakgrund och brandkant', 'background:#EEF2F7;border-color:var(--brand)'],
    ].map(([l, s]) => [l, W(nm() + fld('E-post', 'anna.berg@' + caret, { s }))])),
    Q('falt-fokus-farg', 'Vilken färg ska fokusmarkeringen ha?', [
      ['Samma som brandfärgen', '#24405E', 'rgba(36,64,94,.18)'],
      ['Klar blå (#2563EB)', '#2563EB', 'rgba(37,99,235,.2)'],
      ['Nästan svart (#1A1C1E)', '#1A1C1E', 'rgba(26,28,30,.14)'],
    ].map(([l, c, r]) => [l, W(nm() + fld('E-post', 'anna.berg@' + caret.replace('var(--brand)', c), { s: `border-color:${c};box-shadow:0 0 0 3px ${r}` }))])),
    Q('falt-platshallare', 'Vad ska stå i ett tomt fält?', [
      ['Exempel: "t.ex. 070-123 45 67"', W(fld('Mobilnummer', 't.ex. 070-123 45 67', { ph: true }) + fld('E-post', 't.ex. anna@exempel.se', { ph: true }))],
      ['Instruktion: "Skriv ditt nummer"', W(fld('Mobilnummer', 'Skriv ditt mobilnummer', { ph: true }) + fld('E-post', 'Skriv din e-postadress', { ph: true }))],
      ['Format: "07X-XXX XX XX"', W(fld('Mobilnummer', '07X-XXX XX XX', { ph: true }) + fld('E-post', 'namn@domän.se', { ph: true }))],
      ['Ingen platshållare', W(fld('Mobilnummer', '&nbsp;') + fld('E-post', '&nbsp;'))],
    ]),
    Q('falt-hjalptext', 'Var ska hjälptext till ett fält stå?', [
      ['Under fältet', W(fld('Personnummer', 'ÅÅÅÅMMDD-XXXX', { ph: true, help: 'Behövs för att kunna skicka faktura.' }) + fld('Mobilnummer', '070-123 45 67'))],
      ['Mellan etikett och fält', W(`<div class="fld">${L('Personnummer')}${help('Behövs för att kunna skicka faktura.', 'margin-top:-3px')}${inp('ÅÅÅÅMMDD-XXXX', '', true)}</div>` + fld('Mobilnummer', '070-123 45 67'))],
      ['I en info-ikon vid etiketten', W(`<div class="fld" style="position:relative"><span class="lbl" style="display:flex;align-items:center;gap:6px">Personnummer ${ic('info', 'width:16px;height:16px;color:var(--smuted)')}</span><span style="position:absolute;left:96px;top:-34px;background:#1A1C1E;color:#fff;font-size:12px;padding:6px 9px;border-radius:6px;max-width:150px;line-height:1.3">Behövs för att kunna skicka faktura.</span>${inp('ÅÅÅÅMMDD-XXXX', '', true)}</div>` + fld('Mobilnummer', '070-123 45 67'), 'padding-top:46px')],
      ['Ingen hjälptext', W(fld('Personnummer', 'ÅÅÅÅMMDD-XXXX', { ph: true }) + fld('Mobilnummer', '070-123 45 67'))],
    ]),
    Q('falt-etikettstil', 'Hur ska etiketterna se ut?', [
      ['Halvfet 13 px', ''],
      ['Normal vikt 14 px', 'font-weight:400;font-size:14px'],
      ['Versaler 11 px, spärrade', 'font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:600'],
      ['Grå normal 13 px', 'font-weight:500;color:var(--smuted)'],
      ['Fet 15 px', 'font-weight:700;font-size:15px'],
    ].map(([l, s]) => [l, W(nm({ ls: s }) + em({ ls: s }))])),
    Q('falt-panel', 'Ska formuläret ligga i en egen panel?', [
      ['Direkt på sidans bakgrund', W(two('') + btn('Skicka', 'align-self:flex-start'))],
      ['Vit panel utan skugga', W(panel(two('') + btn('Skicka', 'align-self:flex-start')))],
      ['Vit panel med mjuk skugga', W(panel(two('') + btn('Skicka', 'align-self:flex-start'), 'box-shadow:0 10px 30px rgba(20,30,40,.10),0 1px 3px rgba(20,30,40,.06)'))],
      ['Panel med tunn kant', W(panel(two('') + btn('Skicka', 'align-self:flex-start'), 'border:1px solid var(--sline)'))],
    ]),
    Q('falt-ikon', 'Ska textfälten ha ikoner?', [
      ['Ingen ikon', W(fld('E-post', 'anna@exempel.se') + fld('Telefon', '070-123 45 67'))],
      ['Ikon till vänster i fältet', W(fld('E-post', '', { raw: iinp('mail', 'anna@exempel.se') }) + fld('Telefon', '', { raw: iinp('phone', '070-123 45 67') }))],
      ['Ikon i egen ruta före fältet', W([['mail', 'anna@exempel.se', 'E-post'], ['phone', '070-123 45 67', 'Telefon']].map(([i, v, l]) => fld(l, '', { raw: `<div style="display:flex;height:48px;border:1px solid var(--sline);border-radius:var(--rf);overflow:hidden;background:var(--field)"><span style="display:grid;place-items:center;width:46px;background:var(--ground);border-right:1px solid var(--sline);color:var(--smuted)">${ic(i)}</span><span style="display:flex;align-items:center;padding:0 14px;min-width:0;overflow:hidden;white-space:nowrap">${v}</span></div>` })).join(''))],
    ]),
    Q('falt-textarea', 'Hur högt ska ett meddelandefält vara från början?', [
      ['Tre rader', W(fld('Meddelande', '', { raw: ta('<span class="muted">Berätta kort vad du behöver hjälp med</span>', 92) }))],
      ['Fem rader', W(fld('Meddelande', '', { raw: ta('<span class="muted">Berätta kort vad du behöver hjälp med</span>', 136) }))],
      ['Fem rader med teckenräknare', W(fld('Meddelande', '', { raw: ta('<span class="muted">Berätta kort vad du behöver hjälp med</span>', 136) }) + help('0 / 500 tecken', 'align-self:flex-end;margin-top:-8px'))],
      ['Åtta rader', W(fld('Meddelande', '', { raw: ta('<span class="muted">Berätta kort vad du behöver hjälp med</span>', 200) }))],
    ]),
    Q('falt-inaktiv', 'Hur ska ett låst fält se ut?', [
      ['Grå bakgrund och grå text', 'background:#EFF0F1;color:#8A8E93'],
      ['Halvt genomskinligt', 'opacity:.5'],
      ['Streckad kant', 'border-style:dashed;color:var(--smuted);background:transparent'],
      ['Låsikon i fältet', 'background:#F4F5F6;color:var(--smuted)', true],
    ].map(([l, s, lock]) => [l, W(fld('Organisationsnummer', lock ? `<span style="flex:1">556677-8899</span>${ic('lock', 'width:16px;height:16px')}` : '556677-8899', { s, help: 'Hämtas från ditt konto' }) + fld('Kontaktperson', 'Johan Ek'))])),
    Q('falt-avstand', 'Hur stort avstånd ska det vara mellan fälten?', [12, 20, 28].map((g) => [`${g} px mellan fälten`, W(nm() + em() + fld('Telefon', '070-123 45 67'), `gap:${g}px`)])),
    Q('falt-textstorlek', 'Hur stor ska texten i fälten vara?', [14, 16, 17].map((z) => [`${z} px text i fälten`, W(two(`font-size:${z}px`))])),
    Q('falt-enhet', 'Hur ska enheter som kvm och kr visas?', [
      ['Enheten inuti fältet, till höger', W(fld('Boyta', '<span style="flex:1">85</span><span class="muted">kvm</span>') + fld('Budget', '<span style="flex:1">150 000</span><span class="muted">kr</span>'))],
      ['Enheten i en egen ruta', W([['Boyta', '85', 'kvm'], ['Budget', '150 000', 'kr']].map(([l, v, u]) => fld(l, '', { raw: `<div style="display:flex;height:48px;border:1px solid var(--sline);border-radius:var(--rf);overflow:hidden;background:var(--field)"><span style="flex:1;display:flex;align-items:center;padding:0 14px">${v}</span><span style="display:grid;place-items:center;padding:0 14px;background:var(--ground);border-left:1px solid var(--sline);color:var(--smuted);font-size:14px">${u}</span></div>` })).join(''))],
      ['Enheten i etiketten', W(fld('Boyta (kvm)', '85') + fld('Budget (kr)', '150 000'))],
    ]),
    Q('falt-telefon', 'Hur ska telefonfältet hantera landsnummer?', [
      ['Ett vanligt fält', W(fld('Mobilnummer', '070-123 45 67'))],
      ['Landsväljare före fältet', W(fld('Mobilnummer', '', { raw: `<div style="display:flex;gap:8px"><div class="inp" style="flex:0 0 auto;gap:6px;padding:0 10px"><span style="display:inline-block;width:20px;height:14px;border-radius:2px;background:linear-gradient(90deg,transparent 6px,#F2C200 6px,#F2C200 9px,transparent 9px),linear-gradient(0deg,#1F5AA6 5.5px,#F2C200 5.5px,#F2C200 8.5px,#1F5AA6 8.5px)"></span>+46${ic('chevD', 'width:14px;height:14px;color:var(--smuted)')}</div>${inp('70-123 45 67', 'flex:1;min-width:0')}</div>` }))],
      ['Fast prefix +46 i fältet', W(fld('Mobilnummer', '<span class="muted" style="margin-right:10px;padding-right:10px;border-right:1px solid var(--sline)">+46</span>70-123 45 67'))],
    ]),
    Q('falt-bredd', 'Hur breda ska adressfälten vara?', [
      ['Alla fält i full bredd', W(fld('Gatuadress', 'Lönngatan 12') + fld('Postnummer', '416 70') + fld('Ort', 'Göteborg'))],
      ['Bredd efter innehållet', W(fld('Gatuadress', 'Lönngatan 12') + `<div style="display:flex;gap:12px">${fld('Postnummer', '416 70', { fs: 'flex:0 0 96px' })}${fld('Ort', 'Göteborg', { fs: 'flex:1 1 0' })}</div>`)],
      ['Postnummer och ort delar lika', W(fld('Gatuadress', 'Lönngatan 12') + `<div style="display:flex;gap:12px">${fld('Postnummer', '416 70', { fs: 'flex:1 1 0' })}${fld('Ort', 'Göteborg', { fs: 'flex:1 1 0' })}</div>`)],
    ]),
    Q('falt-mork', 'Hur ska fält se ut på mörk bakgrund?', [
      ['Vita fält', 'background:#fff;border-color:transparent', '#1A1C1E'],
      ['Genomskinliga med ljus kant', 'background:transparent;border-color:rgba(255,255,255,.4);color:#fff', 'rgba(255,255,255,.65)'],
      ['Halvgenomskinlig ljus yta', 'background:rgba(255,255,255,.1);border-color:transparent;color:#fff', 'rgba(255,255,255,.6)'],
      ['Ljus linje under', 'background:transparent;border:0;border-bottom:1.5px solid rgba(255,255,255,.5);border-radius:0;padding:0 2px;color:#fff', 'rgba(255,255,255,.6)'],
    ].map(([l, s, phc]) => [l, W(`<p class="h h3" style="color:#fff">Få våra säsongsmenyer</p>${fld('Namn', 'Anna Berg', { s, ls: 'color:#fff' })}${fld('E-post', `<span style="color:${phc}">namn@exempel.se</span>`, { s, ls: 'color:#fff' })}${btn('Prenumerera', 'background:#fff;color:#1A1C1E;border-color:#fff;align-self:flex-start')}`, 'background:#1F2A35')])),
    Q('falt-hover', 'Ska fältet ändras när muspekaren är över det?', [
      ['Kanten blir mörkare', 'border-color:rgba(26,28,30,.5)'],
      ['Bakgrunden tonas lätt', 'background:#F3F5F7'],
      ['Ingen ändring', ''],
    ].map(([l, s]) => [l, W(`${fld('I vila', 'Anna Berg', { ls: 'font-weight:500;color:var(--smuted);font-size:12px' })}${fld('Med muspekaren över', '<span style="flex:1">070-123 45 67</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 3l14 8-6 2-3 6z" fill="#1A1C1E" stroke="#fff" stroke-width="1.5"/></svg>', { s, ls: 'font-weight:500;color:var(--smuted);font-size:12px' })}`)])),
  ] };

  // ---------- Validering ----------
  const emErr = (fs = '', extra = '') => fld('E-post', 'anna.berg@', { s: errB + ';' + fs }) + extra;
  const gValid = { key: 'validering', title: 'Validering och fel', questions: [
    Q('val-placering', 'Var ska felmeddelandet för ett fält visas?', [
      ['Under fältet', W(nm() + fld('E-post', 'anna.berg@', { s: errB, err: 'Ange en giltig e-postadress' }))],
      ['Bredvid etiketten, ovanför fältet', W(nm() + `<div class="fld"><span style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">${L('E-post')}${err('Ange en giltig e-post')}</span>${inp('anna.berg@', errB)}</div>`)],
      ['I en bubbla under fältet', W(nm() + `<div class="fld">${L('E-post')}${inp('anna.berg@', errB)}<span style="position:relative;align-self:flex-start;margin-top:6px;background:var(--bad);color:#fff;font-size:13px;font-weight:500;padding:6px 10px;border-radius:6px">Ange en giltig e-postadress<span style="position:absolute;top:-5px;left:16px;width:10px;height:10px;background:var(--bad);transform:rotate(45deg)"></span></span></div>`)],
      ['Samlat i en ruta överst', W(`<div style="border-radius:8px;background:#FBEAE9;color:var(--bad);font-size:14px;padding:10px 12px;font-weight:500">Kontrollera e-postadressen.</div>` + nm() + emErr())],
    ]),
    Q('val-stil', 'Hur ska ett fält med fel markeras?', [
      ['Röd kant och röd text', W(nm() + fld('E-post', 'anna.berg@', { s: errB, err: 'Ange en giltig e-postadress' }))],
      ['Röd kant, ikon och text', W(nm() + fld('E-post', '', { raw: inp(`<span style="flex:1">anna.berg@</span>${ic('alert', 'color:var(--bad)')}`, errB), err: 'Ange en giltig e-postadress' }))],
      ['Ljusröd bakgrund och text', W(nm() + fld('E-post', 'anna.berg@', { s: 'background:#FDF0EF;border-color:var(--bad)', err: 'Ange en giltig e-postadress' }))],
      ['Bara röd text under', W(nm() + fld('E-post', 'anna.berg@', { err: 'Ange en giltig e-postadress' }))],
      ['Röd linje till vänster', W(nm() + `<div class="fld" style="border-left:3px solid var(--bad);padding-left:12px">${L('E-post')}${inp('anna.berg@', errB)}${err('Ange en giltig e-postadress')}</div>`)],
    ]),
    Q('val-tidpunkt', 'När ska ett felmeddelande dyka upp?', [
      ['När man lämnar fältet'],
      ['Direkt medan man skriver'],
      ['Först när man trycker på Skicka'],
      ['Vid Skicka, sedan direkt vid rättning'],
    ]),
    Q('val-ok', 'Ska korrekt ifyllda fält få en ok-markering?', [
      ['Ingen ok-markering', W(nm() + fld('E-post', 'anna.berg@exempel.se'))],
      ['Grön bock i fältet', W(nm({ raw: inp(`<span style="flex:1">Anna Berg</span>${ic('check', 'color:var(--ok)')}`) }) + fld('E-post', '', { raw: inp(`<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">anna.berg@exempel.se</span>${ic('check', 'color:var(--ok)')}`) }))],
      ['Grön kant och bock', W(nm({ raw: inp(`<span style="flex:1">Anna Berg</span>${ic('check', 'color:var(--ok)')}`, 'border-color:var(--ok)') }) + fld('E-post', '', { raw: inp(`<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">anna.berg@exempel.se</span>${ic('check', 'color:var(--ok)')}`, 'border-color:var(--ok)') }))],
      ['Liten bock vid etiketten', W(['Namn|Anna Berg', 'E-post|anna.berg@exempel.se'].map((r) => { const [a, b] = r.split('|'); return `<div class="fld"><span class="lbl" style="display:flex;align-items:center;gap:6px">${a}<span style="display:inline-grid;place-items:center;width:16px;height:16px;border-radius:50%;background:var(--ok)">${tick('#fff', 10)}</span></span>${inp(b)}</div>`; }).join(''))],
    ]),
    Q('val-obligatorisk', 'Hur ska obligatoriska och valfria fält märkas?', [
      ['Röd asterisk på obligatoriska', W(fld('Namn <span style="color:var(--bad)">*</span>', 'Anna Berg') + fld('E-post <span style="color:var(--bad)">*</span>', 'anna@exempel.se') + fld('Telefon', '070-123 45 67'))],
      ['Mörk asterisk på obligatoriska', W(fld('Namn *', 'Anna Berg') + fld('E-post *', 'anna@exempel.se') + fld('Telefon', '070-123 45 67'))],
      ['"(valfritt)" på valfria fält', W(nm() + fld('E-post', 'anna@exempel.se') + fld('Telefon <span style="font-weight:400;color:var(--smuted)">(valfritt)</span>', '070-123 45 67'))],
      ['"(obligatoriskt)" i text', W(fld('Namn <span style="font-weight:400;color:var(--smuted)">(obligatoriskt)</span>', 'Anna Berg') + fld('E-post <span style="font-weight:400;color:var(--smuted)">(obligatoriskt)</span>', 'anna@exempel.se') + fld('Telefon', '070-123 45 67'))],
      ['Ingen märkning alls', W(nm() + fld('E-post', 'anna@exempel.se') + fld('Telefon', '070-123 45 67'))],
    ]),
    Q('val-sammanfattning', 'Hur visas fel när formuläret skickats med flera fel?', [
      ['Felruta överst med länkar', W(`<div style="border:1.5px solid var(--bad);border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:4px"><b style="font-size:14px;color:var(--bad)">2 saker behöver rättas</b><span class="link" style="color:var(--bad);font-size:14px;font-weight:500">Ange din e-postadress</span><span class="link" style="color:var(--bad);font-size:14px;font-weight:500">Välj ett datum</span></div>` + emErr())],
      ['Bara fel vid respektive fält', W(nm() + fld('E-post', '&nbsp;', { s: errB, err: 'Ange din e-postadress' }) + fld('Datum', '', { raw: sel('Välj datum', { s: errB, ph: true }), err: 'Välj ett datum' }))],
      ['Kort banner och fel vid fälten', W(`<div style="display:flex;gap:8px;align-items:center;border-radius:8px;background:#FBEAE9;color:var(--bad);font-size:14px;font-weight:500;padding:10px 12px">${ic('alert', 'width:18px;height:18px')}Två fält behöver rättas</div>` + fld('E-post', '&nbsp;', { s: errB, err: 'Ange din e-postadress' }) + fld('Datum', '', { raw: sel('Välj datum', { s: errB, ph: true }), err: 'Välj ett datum' }))],
    ]),
    Q('val-feltext', 'Hur ska felmeddelandet vara formulerat?', [
      ['Kort: "Ogiltig e-post"', 'Ogiltig e-post'],
      ['Med exempel på rätt format', 'Skriv e-postadressen som namn@exempel.se'],
      ['Konkret: säger vad som saknas', 'Adressen saknar något efter @'],
      ['Personlig och mjuk ton', 'Hmm, något ser fel ut i adressen. Kolla gärna igen.'],
    ].map(([l, t]) => [l, W(fld('E-post', 'anna.berg@', { s: errB, err: t }))])),
    Q('val-ikon', 'Ska felmeddelandet ha en ikon?', [
      ['Cirkel med utropstecken', 'alert'],
      ['Varningstriangel', 'tri'],
      ['Ingen ikon', ''],
    ].map(([l, i]) => [l, W(nm() + `<div class="fld">${L('Mobilnummer')}${inp('070-123', errB)}<span style="display:flex;gap:6px;align-items:center;color:var(--bad);font-size:13px;font-weight:500">${i ? ic(i, 'width:16px;height:16px') : ''}Numret är för kort</span></div>`)])),
    Q('val-rod', 'Vilken röd färg ska fel ha?', [
      ['Klarröd (#B3261E)', '#B3261E'],
      ['Mörkröd (#8C1D18)', '#8C1D18'],
      ['Varm röd (#D0342C)', '#D0342C'],
      ['Rödorange (#C2410C)', '#C2410C'],
    ].map(([l, c]) => [l, W(nm() + `<div class="fld">${L('E-post')}${inp('anna.berg@', `border-color:${c}`)}<span class="small" style="color:${c};font-weight:500">Ange en giltig e-postadress</span></div>`)])),
    Q('val-knapp-inaktiv', 'Hur ska skickaknappen bete sig innan allt är ifyllt?', [
      ['Alltid aktiv, fel visas vid klick', W(nm() + fld('E-post', '&nbsp;') + btn('Skicka förfrågan', 'align-self:flex-start'))],
      ['Grå och inaktiv tills allt är ifyllt', W(nm() + fld('E-post', '&nbsp;') + btn('Skicka förfrågan', 'align-self:flex-start;background:#D5D8DC;border-color:#D5D8DC;color:#7A7F85'))],
      ['Aktiv, med text om vad som saknas', W(nm() + fld('E-post', '&nbsp;') + row(btn('Skicka förfrågan') + '<span class="small muted">1 fält kvar att fylla i</span>'))],
    ]),
    Q('val-format', 'Hur hjälper vi kunden med ett format som personnummer?', [
      ['Bindestreck läggs in automatiskt', W(fld('Personnummer', '19850412-38' + caret, { help: 'Skriv bara siffrorna' }))],
      ['Exempel i hjälptexten', W(fld('Personnummer', '198504123842', { help: '12 siffror, t.ex. 19850412-3842' }))],
      ['Formatet som platshållare', W(fld('Personnummer', 'ÅÅÅÅMMDD-XXXX', { ph: true }))],
    ]),
    Q('val-skickar', 'Vad visar knappen medan formuläret skickas?', [
      ['Snurra i stället för texten', `<span class="fo-sk-s"></span>`],
      ['Texten blir "Skickar …"', 'Skickar …'],
      ['Snurra och text', `<span class="fo-sk-s"></span>Skickar …`],
      ['Förloppslinje i knappens nederkant', 'Skicka förfrågan<span class="fo-sk-bar"></span>'],
    ].map(([l, inner]) => [l, `<style>.fo-sk-s{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;animation:fo-sk-r .8s linear infinite}.fo-sk-bar{position:absolute;left:0;bottom:0;height:3px;width:40%;background:rgba(255,255,255,.75);animation:fo-sk-b 1.4s ease-in-out infinite}@keyframes fo-sk-r{to{transform:rotate(360deg)}}@keyframes fo-sk-b{0%{left:-40%}100%{left:100%}}@media (prefers-reduced-motion:reduce){.fo-sk-s,.fo-sk-bar{animation:none}}</style>` + W(nm() + em() + btn(inner, 'align-self:flex-start;min-width:190px;position:relative;overflow:hidden'))])),
    Q('val-serverfel', 'Hur visas ett fel som inte beror på kunden, t.ex. nätverksfel?', [
      ['Banner överst i formuläret', W(`<div style="display:flex;gap:10px;align-items:flex-start;background:#FBEAE9;color:#7A1A14;border-radius:8px;padding:12px;font-size:14px">${ic('alert', 'width:18px;height:18px;color:var(--bad);margin-top:1px')}<span><b>Det gick inte att skicka.</b> Försök igen om en stund.</span></div>` + nm() + btn('Skicka', 'align-self:flex-start'))],
      ['Notis nere i hörnet', W(nm() + btn('Skicka', 'align-self:flex-start') + `<div style="align-self:flex-end;display:flex;gap:10px;align-items:center;background:#1A1C1E;color:#fff;border-radius:10px;padding:10px 12px;font-size:13px;box-shadow:0 8px 20px rgba(0,0,0,.2)">Det gick inte att skicka<span style="color:#9EC1FF;font-weight:600">Försök igen</span></div>`)],
      ['Text direkt ovanför knappen', W(nm() + err('Det gick inte att skicka. Försök igen om en stund.') + btn('Skicka', 'align-self:flex-start;margin-top:-4px'))],
    ]),
    Q('val-varning', 'Hur visas en varning som inte stoppar kunden?', [
      ['Orange text under fältet', W(fld('E-post', 'anna@exempel.cm', { s: 'border-color:var(--warn)' }) + `<span class="small" style="color:var(--warn);font-weight:500;margin-top:-9px">Menade du exempel.com?</span>`)],
      ['Blå inforuta under fältet', W(fld('E-post', 'anna@exempel.cm') + `<div style="display:flex;gap:8px;align-items:center;background:#EAF1FB;color:#1D4B8F;border-radius:8px;padding:8px 10px;font-size:13px;margin-top:-6px">${ic('info', 'width:16px;height:16px')}Menade du <b>exempel.com</b>?</div>`)],
      ['Grå hjälptext med förslag som länk', W(fld('E-post', 'anna@exempel.cm') + `<span class="small muted" style="margin-top:-9px">Menade du <span class="link">anna@exempel.com</span>?</span>`)],
    ]),
    Q('val-grupp', 'Hur markeras fel i en grupp av val (t.ex. radioknappar)?', [
      ['Röd text under gruppen', W(`<span class="lbl">Hur vill du bli kontaktad?</span>${rdx(false, 'Telefon')}${rdx(false, 'E-post')}${err('Välj ett alternativ')}`, 'gap:10px')],
      ['Röd ram runt gruppen', W(`<div style="border:1.5px solid var(--bad);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px"><span class="lbl" style="font-size:13px;font-weight:600">Hur vill du bli kontaktad?</span>${rdx(false, 'Telefon')}${rdx(false, 'E-post')}</div>${err('Välj ett alternativ', 'margin-top:-6px')}`)],
      ['Röd linje till vänster', W(`<div style="border-left:3px solid var(--bad);padding-left:12px;display:flex;flex-direction:column;gap:10px"><span style="font-size:13px;font-weight:600">Hur vill du bli kontaktad?</span>${err('Välj ett alternativ')}${rdx(false, 'Telefon')}${rdx(false, 'E-post')}</div>`)],
    ]),
  ] };

  window.QZ.part({ key: 'formular', groups: [gFalt, gValid].filter(Boolean) });
})();
