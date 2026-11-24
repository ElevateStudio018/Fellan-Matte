// Del: Textdetaljer (nyckel text, prefix tx-). Byggs med små generatorer.
(function () {
  // ---------- Hjälpfunktioner ----------
  const Q = (id, q, opts, layout) => ({ id, q, layout: layout || 'grid', opts: opts.map(([l, h]) => (h === undefined ? { l } : { l, h })) });
  const at = st => (st ? ` style="${st}"` : '');
  const pad = (x, st) => `<div class="pad"${at(st)}>${x}</div>`;
  const hd = (L, st, txt) => `<div class="h h${L}"${at(st)}>${txt}</div>`;
  const p = (txt, st) => `<p${at(st)}>${txt}</p>`;
  const mob = x => `<div style="max-width:390px">${x}</div>`;
  const fmt = n => String(n).replace('.', ',');
  const em = n => (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n)) + ' em';

  // ---------- Neutral exempeltext ----------
  const H1T = 'En rubrik som får ta två rader';
  const H2T = 'En rubrik för en ny sektion på sidan';
  const H3T = 'En mindre rubrik som behöver två rader';
  const P = 'Det här är brödtext som visar hur ett vanligt stycke ser ut. Den ska gå att läsa i flera rader utan att ögat tappar bort sig.';
  const P2 = 'Ett andra stycke fortsätter resonemanget med några meningar till, så att avståndet mellan styckena syns.';
  const PS = 'En kort text på två rader som beskriver innehållet.';
  const LEAD = 'En kort ingress som sammanfattar innehållet i en eller två meningar.';
  const Title = s => s.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  const under = (x, gap) => `<div style="margin-top:${gap || 12}px;max-width:60ch">${x}</div>`;

  const groups = [];
  const G = (key, title, questions) => groups.push({ key, title, questions });

  // ---------- Rubriker per nivå ----------
  const LV = {
    1: { t: H1T, desk: [40, 48, 56, 64, 72], mob: [28, 32, 36, 40], lh: [0.95, 1.05, 1.15, 1.3], ls: [-0.04, -0.02, -0.01, 0, 0.02], mw: [['10 tecken', '10ch'], ['14 tecken', '14ch'], ['18 tecken', '18ch'], ['Ingen gräns', 'none']], deskLayout: 'stack' },
    2: { t: H2T, desk: [26, 30, 36, 44], mob: [22, 24, 28, 32], lh: [1.0, 1.1, 1.2, 1.3], ls: [-0.03, -0.02, -0.01, 0, 0.02], mw: [['14 tecken', '14ch'], ['20 tecken', '20ch'], ['28 tecken', '28ch'], ['Ingen gräns', 'none']], deskLayout: 'stack' },
    3: { t: H3T, desk: [17, 19, 21, 24], mob: [16, 17, 18, 20], lh: [1.1, 1.2, 1.3], ls: [-0.02, -0.01, 0, 0.01], deskLayout: 'grid' },
  };
  for (const L of [1, 2, 3]) {
    const c = LV[L], T = c.t, H = 'H' + L, qs = [];
    const body = under(p(P, L === 3 ? 'font-size:15px' : 'font-size:16px'), L === 3 ? 6 : 12);
    qs.push(Q(`tx-h${L}-storlek-desktop`, `Hur stor ska ${H} vara på desktop?`,
      c.desk.map(px => [`${px} px på desktop`, pad(hd(L, `font-size:${px}px`, T) + body)]), c.deskLayout));
    qs.push(Q(`tx-h${L}-storlek-mobil`, `Hur stor ska ${H} vara på mobil?`,
      c.mob.map(px => [`${px} px på mobil`, pad(mob(hd(L, `font-size:${px}px`, T) + under(p(P, 'font-size:16px'), L === 3 ? 6 : 10)))])));
    qs.push(Q(`tx-h${L}-vikt`, `Hur tung ska ${H} vara?`,
      [[500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)'], [800, 'Extrafet (800)']].map(([w, l]) => [l, pad(hd(L, `font-weight:${w}`, T))])));
    qs.push(Q(`tx-h${L}-radavstand`, `Vilket radavstånd ska ${H} ha?`,
      c.lh.map(v => [`Radavstånd ${fmt(v.toFixed(2))}`, pad(hd(L, `line-height:${v};max-width:${L === 3 ? '15ch' : '12ch'}`, T))])));
    qs.push(Q(`tx-h${L}-sparrning`, `Hur ska ${H} vara spärrad?`,
      c.ls.map(v => [`Spärrning ${em(v)}`, pad(hd(L, `letter-spacing:${v}em`, T))])));
    qs.push(Q(`tx-h${L}-versaler`, `Hur ska ${H} versaliseras?`, [
      ['Meningsform', pad(hd(L, '', T))],
      ['Varje Ord Stort', pad(hd(L, '', Title(T)))],
      ['VERSALER, lätt spärrade', pad(hd(L, 'text-transform:uppercase;letter-spacing:0.02em', T))],
    ]));
    if (L < 3) {
      qs.push(Q(`tx-h${L}-punkt`, `Ska ${H} sluta med punkt?`, [
        ['Utan punkt', pad(hd(L, '', T) + body)],
        ['Med punkt', pad(hd(L, '', T + '.') + body)],
      ]));
      qs.push(Q(`tx-h${L}-maxbredd`, `Hur bred får ${H} bli innan den bryts?`,
        c.mw.map(([l, v]) => [`Max ${l}`.replace('Max Ingen gräns', 'Ingen maxbredd'), pad(hd(L, `max-width:${v};font-size:${L === 1 ? 48 : 32}px`, L === 1 ? 'En längre rubrik som behöver flera rader för att få plats' : 'En längre sektionsrubrik som kanske behöver två rader'))]), 'stack'));
      const bt = L === 1 ? 'En rubrik som nästan får plats' : 'Rubriken som nästan får plats';
      qs.push(Q(`tx-h${L}-balans`, `Hur ska raderna i ${H} brytas?`, [
        ['Balanserade rader', pad(hd(L, `text-wrap:balance;width:${L === 1 ? 410 : 315}px;max-width:100%`, bt))],
        ['Vanlig brytning, fyll raden', pad(hd(L, `text-wrap:wrap;width:${L === 1 ? 410 : 315}px;max-width:100%`, bt))],
      ], 'stack'));
    }
    qs.push(Q(`tx-h${L}-farg`, `Vilken färg ska ${H} ha?`, [
      ['Svart (#000)', pad(hd(L, 'color:#000', T) + body)],
      ['Mjukt svart (#1A1C1E)', pad(hd(L, 'color:var(--sink)', T) + body)],
      ['Varumärkesfärg', pad(hd(L, 'color:var(--brand)', T) + body)],
    ]));
    G(`rubrik-h${L}`, `Rubriker: ${H}`, qs);
  }

  // ---------- Ingress ----------
  const ingBlock = (st, opt) => pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:19px;line-height:1.45;max-width:52ch;${st || ''}">${LEAD}</p>` + (opt && opt.nobody ? '' : `<p style="margin-top:14px;font-size:16px;max-width:60ch">${P}</p>`));
  G('ingress', 'Ingress', [
    Q('tx-ingress-storlek', 'Hur stor ska ingressen vara?', [17, 19, 21, 24].map(px => [`Ingress ${px} px`, ingBlock(`font-size:${px}px`)])),
    Q('tx-ingress-storlek-mobil', 'Hur stor ska ingressen vara på mobil?', [16, 17, 18, 20].map(px => [`Ingress ${px} px på mobil`, pad(mob(hd(2, 'font-size:26px', H2T) + `<p style="margin-top:10px;font-size:${px}px;line-height:1.45">${LEAD}</p><p style="margin-top:12px;font-size:16px">${P}</p>`))])),
    Q('tx-ingress-vikt', 'Hur tung ska ingressen vara?', [[300, 'Lätt (300)'], [400, 'Normal (400)'], [500, 'Medium (500)']].map(([w, l]) => [l, ingBlock(`font-weight:${w}`)])),
    Q('tx-ingress-farg', 'Vilken färg ska ingressen ha?', [
      ['Samma som rubriken', ingBlock('color:var(--sink)')],
      ['Mörkgrå (#3A3D41)', ingBlock('color:#3A3D41')],
      ['Grå (#5D6166)', ingBlock('color:var(--smuted)')],
    ]),
    Q('tx-ingress-skillnad', 'Hur ska ingressen skilja sig från brödtexten?', [
      ['Större storlek', ingBlock('font-size:20px')],
      ['Samma storlek, halvfet', ingBlock('font-size:16px;font-weight:600')],
      ['Större och grå', ingBlock('font-size:20px;color:var(--smuted)')],
    ]),
    Q('tx-ingress-radavstand', 'Vilket radavstånd ska ingressen ha?', [1.3, 1.45, 1.6].map(v => [`Radavstånd ${fmt(v)}`, ingBlock(`line-height:${v};max-width:34ch`, { nobody: true })])),
    Q('tx-ingress-bredd', 'Hur bred får ingressen bli?', [['40 tecken', '40ch'], ['55 tecken', '55ch'], ['70 tecken', '70ch']].map(([l, v]) => [`Max ${l}`, pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:19px;line-height:1.45;max-width:${v}">En ingress som är lite längre än vanligt och sammanfattar innehållet i två meningar. Den visar hur bred texten får bli innan den bryts.</p>`)]), 'stack'),
    Q('tx-ingress-finnas', 'Ska en sektion ha en ingress mellan rubrik och brödtext?', [
      ['Med ingress', ingBlock('')],
      ['Utan ingress, direkt brödtext', pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:16px;max-width:60ch">${P}</p><p style="margin-top:12px;font-size:16px;max-width:60ch">${P2}</p>`)],
    ], 'stack'),
  ]);

  // ---------- Brödtext ----------
  const bodyBlock = (st, wrapSt) => pad(`<div style="font-size:16px;line-height:1.55;${st || ''}">${p(P)}${p(P2, 'margin-top:0.9em')}</div>`, wrapSt);
  G('brodtext', 'Brödtext', [
    Q('tx-brod-storlek', 'Hur stor ska brödtexten vara på desktop?', [15, 16, 17, 18, 19].map(px => [`Brödtext ${px} px`, bodyBlock(`font-size:${px}px`)])),
    Q('tx-brod-storlek-mobil', 'Hur stor ska brödtexten vara på mobil?', [15, 16, 17, 18].map(px => [`${px} px på mobil`, pad(mob(`<div style="font-size:${px}px;line-height:1.55">${p(P)}${p(P2, 'margin-top:0.9em')}</div>`))])),
    Q('tx-brod-radavstand', 'Vilket radavstånd ska brödtexten ha?', [1.4, 1.5, 1.6, 1.7, 1.8].map(v => [`Radavstånd ${fmt(v)}`, bodyBlock(`line-height:${v}`)])),
    Q('tx-brod-radlangd', 'Hur lång får en rad brödtext bli?', [45, 60, 70, 85].map(n => [`Max ${n} tecken per rad`, bodyBlock(`max-width:${n}ch`)]), 'stack'),
    Q('tx-brod-styckeavstand', 'Hur ska stycken skiljas åt?', [
      ['Halv rad mellan stycken', pad(`<div style="font-size:16px;line-height:1.55">${p(P)}${p(P2, 'margin-top:0.5em')}</div>`)],
      ['Hel rad mellan stycken', pad(`<div style="font-size:16px;line-height:1.55">${p(P)}${p(P2, 'margin-top:1em')}</div>`)],
      ['1,5 rad mellan stycken', pad(`<div style="font-size:16px;line-height:1.55">${p(P)}${p(P2, 'margin-top:1.5em')}</div>`)],
      ['Indrag, inget mellanrum', pad(`<div style="font-size:16px;line-height:1.55">${p(P)}${p(P2, 'text-indent:1.5em')}</div>`)],
    ]),
    Q('tx-brod-farg', 'Vilken gråton ska brödtexten ha?', [
      ['Svart (#000)', bodyBlock('color:#000')],
      ['Mjukt svart (#1A1C1E)', bodyBlock('color:var(--sink)')],
      ['Mörkgrå (#3A3D41)', bodyBlock('color:#3A3D41')],
      ['Grå (#5D6166)', bodyBlock('color:var(--smuted)')],
    ]),
    Q('tx-brod-justering', 'Hur ska brödtexten ställas?', [
      ['Vänsterställd', bodyBlock('text-align:left')],
      ['Centrerad', bodyBlock('text-align:center')],
      ['Marginaljusterad', bodyBlock('text-align:justify')],
    ]),
    Q('tx-brod-vikt', 'Vilken vikt ska brödtexten ha?', [[300, 'Lätt (300)'], [400, 'Normal (400)'], [500, 'Medium (500)']].map(([w, l]) => [l, bodyBlock(`font-weight:${w}`)])),
  ]);

  // ---------- Eyebrow och överrubrik ----------
  const EB = 'Så fungerar det';
  const dash = '<span style="display:inline-block;width:24px;height:2px;background:currentColor;vertical-align:middle;margin-right:10px;position:relative;top:-1px"></span>';
  const dot = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;vertical-align:middle;margin-right:8px;position:relative;top:-1px"></span>';
  const ebCaps = 'text-transform:uppercase;letter-spacing:0.08em;font-size:12px';
  const ebBlock = (st, pre, gap) => pad(`<div class="eyebrow" style="${st || ''}">${pre || ''}${EB}</div>` + hd(2, `margin-top:${gap === undefined ? 8 : gap}px`, H2T) + `<p style="margin-top:12px;font-size:16px;max-width:52ch">${PS}</p>`);
  G('eyebrow', 'Eyebrow och överrubrik', [
    Q('tx-eyebrow-finnas', 'Ska sektionsrubriker ha en överrubrik (eyebrow)?', [
      ['Med överrubrik', ebBlock('')],
      ['Utan överrubrik', pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:16px;max-width:52ch">${PS}</p>`)],
    ]),
    Q('tx-eyebrow-form', 'Hur ska överrubriken skrivas?', [
      ['VERSALER, spärrade', ebBlock(ebCaps)],
      ['Meningsform', ebBlock('')],
    ]),
    Q('tx-eyebrow-sparrning', 'Hur mycket ska en överrubrik i versaler spärras?', [0.04, 0.08, 0.12, 0.18].map(v => [`Spärrning ${em(v)}`, ebBlock(`text-transform:uppercase;font-size:12px;letter-spacing:${v}em`)])),
    Q('tx-eyebrow-storlek', 'Hur stor ska överrubriken vara?', [11, 12, 13, 14].map(px => [`Överrubrik ${px} px`, ebBlock(`font-size:${px}px`)])),
    Q('tx-eyebrow-farg', 'Vilken färg ska överrubriken ha?', [
      ['Grå', ebBlock('color:var(--smuted)')],
      ['Samma som rubriken', ebBlock('color:var(--sink)')],
      ['Varumärkesfärg', ebBlock('color:var(--brand)')],
    ]),
    Q('tx-eyebrow-vikt', 'Hur tung ska överrubriken vara?', [[500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, ebBlock(`font-weight:${w}`)])),
    Q('tx-eyebrow-prefix', 'Ska överrubriken ha något framför sig?', [
      ['Ingenting framför', ebBlock('')],
      ['Kort streck framför', ebBlock('', dash)],
      ['Prick framför', ebBlock('', dot)],
      ['Nummer framför (01)', ebBlock('', '<span style="margin-right:10px;font-variant-numeric:tabular-nums">01</span>')],
    ]),
    Q('tx-eyebrow-avstand', 'Hur långt ska det vara mellan överrubrik och rubrik?', [4, 8, 12, 20].map(g => [`${g} px till rubriken`, ebBlock('', '', g)])),
    Q('tx-eyebrow-platta', 'Ska överrubriken stå fritt eller i en etikett?', [
      ['Fri text', ebBlock('')],
      ['I en rundad etikett', pad(`<span class="tag" style="font-size:13px;font-weight:600;padding:3px 11px">${EB}</span>` + hd(2, 'margin-top:10px', H2T) + `<p style="margin-top:12px;font-size:16px;max-width:52ch">${PS}</p>`)],
      ['Med tunn linje under', pad(`<div class="eyebrow" style="padding-bottom:8px;border-bottom:1px solid var(--sline)">${EB}</div>` + hd(2, 'margin-top:12px', H2T) + `<p style="margin-top:12px;font-size:16px;max-width:52ch">${PS}</p>`)],
    ]),
  ]);

  // ---------- Etiketter och hjälptexter ----------
  const fld = (o = {}) => `<div class="fld" style="max-width:300px;${o.gap !== undefined ? `gap:${o.gap}px` : ''}"><span class="lbl" style="${o.lbl || ''}">${o.label || 'E-post'}${o.after || ''}</span>${o.mid || ''}<span class="inp ph">namn@exempel.se</span>${o.help || ''}</div>`;
  const help = (st, t) => `<span style="font-size:13px;color:var(--smuted);${st || ''}">${t || 'Vi skickar bekräftelsen hit.'}</span>`;
  const meta = `<div class="row" style="gap:6px;font-size:13px;color:var(--smuted)">`;
  G('etiketter', 'Etiketter och hjälptexter', [
    Q('tx-etikett-storlek', 'Hur stor ska fältets etikett vara?', [12, 13, 14, 15].map(px => [`Etikett ${px} px`, pad(fld({ lbl: `font-size:${px}px` }))])),
    Q('tx-etikett-vikt', 'Hur tung ska fältets etikett vara?', [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, pad(fld({ lbl: `font-weight:${w}` }))])),
    Q('tx-etikett-versaler', 'Ska etiketter skrivas med versaler?', [
      ['Meningsform', pad(fld())],
      ['VERSALER, spärrade', pad(fld({ lbl: 'text-transform:uppercase;letter-spacing:0.06em;font-size:12px' }))],
    ]),
    Q('tx-etikett-avstand', 'Hur långt ska det vara mellan etikett och fält?', [4, 6, 8, 10].map(g => [`${g} px till fältet`, pad(fld({ gap: g }))])),
    Q('tx-etikett-obligatoriskt', 'Hur ska obligatoriska fält märkas?', [
      ['Röd asterisk efter', pad(`<div class="stack">${fld({ after: ' <span style="color:var(--bad)">*</span>' })}${fld({ label: 'Telefon' })}</div>`)],
      ['Asterisk i textfärg', pad(`<div class="stack">${fld({ after: ' *' })}${fld({ label: 'Telefon' })}</div>`)],
      ['Ordet (obligatoriskt)', pad(`<div class="stack">${fld({ after: ' <span style="font-weight:400;color:var(--smuted)">(obligatoriskt)</span>' })}${fld({ label: 'Telefon' })}</div>`)],
      ['Valfria märks (valfritt)', pad(`<div class="stack">${fld()}${fld({ label: 'Telefon', after: ' <span style="font-weight:400;color:var(--smuted)">(valfritt)</span>' })}</div>`)],
    ]),
    Q('tx-hjalptext-placering', 'Var ska hjälptexten till ett fält stå?', [
      ['Under fältet', pad(fld({ help: help() }))],
      ['Mellan etikett och fält', pad(fld({ mid: help('margin-top:-2px') }))],
      ['Efter etiketten, på samma rad', pad(fld({ after: ' ' + help('font-weight:400') }))],
    ]),
    Q('tx-hjalptext-stil', 'Hur ska hjälptexten se ut?', [
      ['12 px grå', pad(fld({ help: help('font-size:12px') }))],
      ['13 px grå', pad(fld({ help: help('font-size:13px') }))],
      ['14 px grå', pad(fld({ help: help('font-size:14px') }))],
      ['13 px i textfärg', pad(fld({ help: help('color:var(--sink)') }))],
    ]),
    Q('tx-etikett-varde', 'Hur ska en etikett och ett värde visas (till exempel i en sammanställning)?', [
      ['Etikett ovanför värdet', pad(`<div class="stack" style="gap:14px"><div><div class="small muted">Datum</div><div style="font-weight:600">24 nov 2026</div></div><div><div class="small muted">Antal</div><div style="font-weight:600">2 personer</div></div></div>`)],
      ['Etikett: värde på en rad', pad(`<div class="stack" style="gap:8px"><div><span class="muted">Datum:</span> <b style="font-weight:600">24 nov 2026</b></div><div><span class="muted">Antal:</span> <b style="font-weight:600">2 personer</b></div></div>`)],
      ['Etikett vänster, värde höger', pad(`<div class="stack" style="gap:8px;max-width:280px"><div style="display:flex;justify-content:space-between;gap:12px"><span class="muted">Datum</span><b style="font-weight:600">24 nov 2026</b></div><div class="divider"></div><div style="display:flex;justify-content:space-between;gap:12px"><span class="muted">Antal</span><b style="font-weight:600">2 personer</b></div></div>`)],
    ]),
    Q('tx-metarad-skiljetecken', 'Hur ska delarna i en metadatarad skiljas åt?', [
      ['Mittpunkt ·', pad(hd(3, '', 'En rubrik i ett kort') + `<div style="margin-top:6px;font-size:13px;color:var(--smuted)">24 nov · 5 min · Nyheter</div>`)],
      ['Lodstreck |', pad(hd(3, '', 'En rubrik i ett kort') + `<div style="margin-top:6px;font-size:13px;color:var(--smuted)">24 nov | 5 min | Nyheter</div>`)],
      ['Snedstreck /', pad(hd(3, '', 'En rubrik i ett kort') + `<div style="margin-top:6px;font-size:13px;color:var(--smuted)">24 nov / 5 min / Nyheter</div>`)],
      ['Bara mellanrum', pad(hd(3, '', 'En rubrik i ett kort') + `<div style="margin-top:6px;font-size:13px;color:var(--smuted);word-spacing:0.6em">24&nbsp;nov 5&nbsp;min Nyheter</div>`)],
    ]),
    Q('tx-metarad-placering', 'Var ska metadata (datum, tid) stå i ett kort?', [
      ['Ovanför rubriken', pad(`<div class="small muted">24 nov · 5 min</div>` + hd(3, 'margin-top:4px', 'En rubrik i ett kort') + p(PS, 'margin-top:6px'))],
      ['Direkt under rubriken', pad(hd(3, '', 'En rubrik i ett kort') + `<div class="small muted" style="margin-top:4px">24 nov · 5 min</div>` + p(PS, 'margin-top:6px'))],
      ['Längst ned, efter texten', pad(hd(3, '', 'En rubrik i ett kort') + p(PS, 'margin-top:6px') + `<div class="small muted" style="margin-top:10px">24 nov · 5 min</div>`)],
    ]),
  ]);

  // ---------- Bildtext och finstilt ----------
  const IMG = '<img src="img/skog-sjo.jpg" alt="Skog vid en sjö" style="width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:8px">';
  const CAP = 'Bildtext som beskriver vad fotot visar.';
  const fig = (st, o = {}) => pad(`<div style="max-width:340px">${IMG}<div style="margin-top:${o.gap || 8}px;font-size:13px;color:var(--smuted);line-height:1.45;${st || ''}">${o.pre || ''}${o.text || CAP}</div></div>`);
  const FINE = 'Priset gäller vid bokning senast 30 dagar i förväg. Avbokning kan göras utan kostnad fram till 48 timmar innan.';
  const fine = (st) => pad(`<div style="max-width:340px">${p(P, 'font-size:16px')}<p style="margin-top:14px;font-size:12px;color:var(--smuted);line-height:1.5;${st || ''}">${FINE}</p></div>`);
  G('bildtext', 'Bildtext och finstilt', [
    Q('tx-bildtext-storlek', 'Hur stor ska bildtexten vara?', [12, 13, 14].map(px => [`Bildtext ${px} px`, fig(`font-size:${px}px`)])),
    Q('tx-bildtext-farg', 'Vilken färg ska bildtexten ha?', [
      ['Grå', fig('color:var(--smuted)')],
      ['Samma som brödtext', fig('color:var(--sink)')],
    ]),
    Q('tx-bildtext-kursiv', 'Ska bildtexten vara kursiv?', [
      ['Rak', fig('font-style:normal')],
      ['Kursiv', fig('font-style:italic')],
    ]),
    Q('tx-bildtext-avstand', 'Hur långt ska det vara mellan bild och bildtext?', [4, 8, 14].map(g => [`${g} px under bilden`, fig('', { gap: g })])),
    Q('tx-bildtext-markering', 'Hur ska bildtexten markeras?', [
      ['Ren text', fig('')],
      ['Streck före texten', fig('', { pre: '— ' })],
      ['Linje till vänster', fig('border-left:2px solid var(--sline);padding-left:10px')],
      ['Fet inledning', fig('', { pre: '<b style="font-weight:600;color:var(--sink)">Bild:</b> ' })],
    ]),
    Q('tx-bildtext-foto', 'Var ska fotografens namn stå?', [
      ['Sist i bildtexten', fig('', { text: CAP + ' Foto: Namn Efternamn' })],
      ['På egen rad i versaler', fig('', { text: CAP + '<div style="margin-top:2px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em">Foto: Namn Efternamn</div>' })],
      ['Litet i bildens hörn', pad(`<div style="max-width:340px"><div style="position:relative">${IMG}<span style="position:absolute;right:8px;bottom:6px;font-size:10px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6)">Foto: Namn Efternamn</span></div><div style="margin-top:8px;font-size:13px;color:var(--smuted);line-height:1.45">${CAP}</div></div>`)],
    ]),
    Q('tx-finstilt-storlek', 'Hur stort ska finstilt vara?', [11, 12, 13].map(px => [`Finstilt ${px} px`, fine(`font-size:${px}px`)])),
    Q('tx-finstilt-farg', 'Vilken färg ska finstilt ha?', [
      ['Grå (#5D6166)', fine('color:var(--smuted)')],
      ['Ljusare grå (#80858B)', fine('color:#80858B')],
      ['Samma som brödtext', fine('color:var(--sink)')],
    ]),
    Q('tx-fotnot', 'Hur ska en hänvisning till finstilt märkas?', [
      ['Asterisk *', pad(`<div><span class="price" style="font-size:22px">495 kr*</span><p style="margin-top:10px;font-size:12px;color:var(--smuted)">* Gäller vid bokning senast 30 dagar i förväg.</p></div>`)],
      ['Upphöjd siffra ¹', pad(`<div><span class="price" style="font-size:22px">495 kr<sup style="font-size:0.55em">1</sup></span><p style="margin-top:10px;font-size:12px;color:var(--smuted)"><sup>1</sup> Gäller vid bokning senast 30 dagar i förväg.</p></div>`)],
      ['Ingen markering, text under', pad(`<div><span class="price" style="font-size:22px">495 kr</span><p style="margin-top:10px;font-size:12px;color:var(--smuted)">Gäller vid bokning senast 30 dagar i förväg.</p></div>`)],
    ]),
  ]);

  // ---------- Länkar i text ----------
  const LT = (a, cls) => `<p style="font-size:16px;line-height:1.6;max-width:44ch">Det här är en mening med <span class="link${cls ? ' ' + cls : ''}"${at(a)}>en länk i texten</span> som leder vidare till mer information.</p>`;
  const LP = (a, cls) => pad(LT(a, cls));
  const states = (rest, hover) => pad(`<div class="stack" style="gap:14px"><div><div class="small muted" style="margin-bottom:4px">I vila</div>${LT(rest)}</div><div><div class="small muted" style="margin-bottom:4px">Vid hover</div>${LT(hover)}</div></div>`);
  const dark = x => `<div class="pad" style="background:#1A1C1E;color:#fff">${x}</div>`;
  G('lankar', 'Länkar i text', [
    Q('tx-lank-understrykning', 'När ska länkar i löptext vara understrukna?', [
      ['Alltid understrukna', states('', 'color:var(--brand-d);text-decoration-thickness:2px')],
      ['Understrykning vid hover', states('text-decoration:none', '')],
      ['Aldrig understrukna', states('text-decoration:none', 'text-decoration:none;color:var(--brand-d)')],
    ]),
    Q('tx-lank-tjocklek', 'Hur tjock ska understrykningen vara?', [[1, '1 px'], [1.5, '1,5 px'], [2, '2 px'], [3, '3 px']].map(([v, l]) => [`Understrykning ${l}`, LP(`text-decoration-thickness:${v}px`)])),
    Q('tx-lank-avstand', 'Hur långt under texten ska understrykningen ligga?', [1, 3, 5, 7].map(v => [`${v} px under texten`, LP(`text-underline-offset:${v}px`)])),
    Q('tx-lank-farg', 'Vilken färg ska länkar i löptext ha?', [
      ['Varumärkesfärg', LP('')],
      ['Samma som texten', LP('color:var(--sink)')],
      ['Klassisk länkblå', LP('color:#0B57D0')],
    ]),
    Q('tx-lank-vikt', 'Hur tung ska en länk i löptext vara?', [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, LP(`font-weight:${w}`)])),
    Q('tx-lank-linjefarg', 'Vilken färg ska själva understrykningen ha?', [
      ['Samma som länktexten', LP('')],
      ['Ljusare än texten', LP('text-decoration-color:rgba(36,64,94,.35)')],
      ['Grå linje', LP('text-decoration-color:var(--sline)')],
    ]),
    Q('tx-lank-hover', 'Vad ska hända när man håller muspekaren över en länk?', [
      ['Färgen mörknar', states('', 'color:#0F1D2C')],
      ['Linjen blir tjockare', states('', 'text-decoration-thickness:3px')],
      ['Linjen försvinner', states('', 'text-decoration:none')],
      ['Ljus bakgrund bakom', states('', 'background:var(--tint);border-radius:3px;box-shadow:0 0 0 2px var(--tint)')],
    ]),
    Q('tx-lank-nedstaplar', 'Hur ska understrykningen möta nedstaplar (g, p, j)?', [
      ['Linjen bryts vid nedstaplar', pad(`<p style="font-size:18px">Läs mer om <span class="link" style="text-underline-offset:2px;text-decoration-skip-ink:auto">tjänsten och priser</span> på sidan.</p>`)],
      ['Linjen går rakt igenom', pad(`<p style="font-size:18px">Läs mer om <span class="link" style="text-underline-offset:2px;text-decoration-skip-ink:none">tjänsten och priser</span> på sidan.</p>`)],
    ]),
    Q('tx-lank-stil', 'Vilken stil ska understrykningen ha?', [
      ['Hel linje', LP('text-decoration-style:solid')],
      ['Prickad linje', LP('text-decoration-style:dotted;text-decoration-thickness:2px')],
      ['Streckad linje', LP('text-decoration-style:dashed')],
    ]),
    Q('tx-lank-fristaende', 'Hur ska en fristående textlänk under ett stycke se ut?', [
      ['Understruken', pad(hd(3, '', 'En rubrik i ett kort') + p(PS, 'margin-top:6px') + `<div style="margin-top:12px"><span class="link">Läs mer</span></div>`)],
      ['Ej understruken, halvfet', pad(hd(3, '', 'En rubrik i ett kort') + p(PS, 'margin-top:6px') + `<div style="margin-top:12px"><span class="link" style="text-decoration:none">Läs mer</span></div>`)],
      ['Versaler, spärrad', pad(hd(3, '', 'En rubrik i ett kort') + p(PS, 'margin-top:6px') + `<div style="margin-top:12px"><span class="link" style="text-decoration:none;text-transform:uppercase;letter-spacing:0.08em;font-size:13px">Läs mer</span></div>`)],
    ]),
    Q('tx-lank-besokt', 'Ska besökta länkar se annorlunda ut?', [
      ['Samma som obesökta', pad(`<div class="stack" style="gap:6px">${LT('')}${'<p class="small muted">Övre: obesökt. Nedre: besökt.</p>'}${LT('')}</div>`)],
      ['Besökta blir lila', pad(`<div class="stack" style="gap:6px">${LT('')}${'<p class="small muted">Övre: obesökt. Nedre: besökt.</p>'}${LT('color:#6B3FA0')}</div>`)],
      ['Besökta blir dämpade', pad(`<div class="stack" style="gap:6px">${LT('')}${'<p class="small muted">Övre: obesökt. Nedre: besökt.</p>'}${LT('color:var(--smuted)')}</div>`)],
    ]),
    Q('tx-lank-mork-yta', 'Hur ska länkar se ut på mörk yta?', [
      ['Vit och understruken', dark(LT('color:#fff'))],
      ['Ljusblå och understruken', dark(LT('color:#9CC3F0'))],
      ['Vit, fet, ingen linje', dark(LT('color:#fff;font-weight:700;text-decoration:none'))],
    ]),
    Q('tx-lank-kontakt', 'Hur ska telefonnummer och e-post visas som länkar?', [
      ['Understrukna som länkar', pad(`<div class="stack" style="gap:6px"><span class="link">08-123 456 78</span><span class="link">info@exempel.se</span></div>`)],
      ['Halvfet utan linje', pad(`<div class="stack" style="gap:6px"><span style="font-weight:600">08-123 456 78</span><span style="font-weight:600">info@exempel.se</span></div>`)],
      ['Vanlig text i textfärg', pad(`<div class="stack" style="gap:6px"><span>08-123 456 78</span><span>info@exempel.se</span></div>`)],
    ]),
    Q('tx-lank-finstilt', 'Hur ska en länk i finstilt se ut?', [
      ['Grå och understruken', pad(`<p style="font-size:12px;color:var(--smuted);max-width:40ch">Genom att fortsätta godkänner du <span style="text-decoration:underline;text-underline-offset:2px">villkoren</span> och vår <span style="text-decoration:underline;text-underline-offset:2px">integritetspolicy</span>.</p>`)],
      ['Varumärkesfärg, understruken', pad(`<p style="font-size:12px;color:var(--smuted);max-width:40ch">Genom att fortsätta godkänner du <span class="link" style="font-weight:500;text-underline-offset:2px">villkoren</span> och vår <span class="link" style="font-weight:500;text-underline-offset:2px">integritetspolicy</span>.</p>`)],
      ['Mörkare grå, ingen linje', pad(`<p style="font-size:12px;color:var(--smuted);max-width:40ch">Genom att fortsätta godkänner du <span style="color:var(--sink);font-weight:600">villkoren</span> och vår <span style="color:var(--sink);font-weight:600">integritetspolicy</span>.</p>`)],
    ]),
  ]);

  // ---------- Priser ----------
  const card = (inner, st) => pad(`<div class="panel" style="max-width:260px;${st || ''}"><div class="h h3" style="font-size:17px">Produktnamn</div><div style="margin-top:8px">${inner}</div></div>`);
  const pr = (txt, st) => `<span class="price" style="font-size:24px;${st || ''}">${txt}</span>`;
  const sm = (txt, st) => `<span style="font-size:0.6em;font-weight:500;${st || ''}">${txt}</span>`;
  const strike = (txt, st) => `<s style="color:var(--smuted);font-weight:400;font-size:16px;${st || ''}">${txt}</s>`;
  const prRow = x => `<div class="row" style="gap:10px;align-items:baseline">${x}</div>`;
  G('priser', 'Priser', [
    Q('tx-pris-valuta', 'Hur ska valutan skrivas efter priset?', [
      ['495 kr', card(pr('495 kr'))],
      ['495:-', card(pr('495:-'))],
      ['495,-', card(pr('495,-'))],
      ['495 SEK', card(pr('495 SEK'))],
    ]),
    Q('tx-pris-valuta-placering', 'Var ska valutan stå?', [
      ['Efter beloppet (495 kr)', card(pr('495 kr'))],
      ['Före beloppet (kr 495)', card(pr('kr 495'))],
      ['Kod före (SEK 495)', card(pr('SEK 495'))],
    ]),
    Q('tx-pris-valuta-storlek', 'Hur stor ska valutan vara jämfört med beloppet?', [
      ['Lika stor', card(pr('495 kr'))],
      ['Mindre', card(pr('495 ' + sm('kr')))],
      ['Mindre och grå', card(pr('495 ' + sm('kr', 'color:var(--smuted)')))],
      ['Mindre och upphöjd', card(pr('495' + sm('kr', 'vertical-align:0.55em;margin-left:3px')))],
    ]),
    Q('tx-pris-fran', 'Hur ska "från" skrivas framför ett pris?', [
      ['Från 495 kr', card(pr('Från 495 kr'))],
      ['Fr. 495 kr', card(pr('Fr. 495 kr'))],
      ['Litet "från" före', card(`<span style="font-size:14px;color:var(--smuted);margin-right:4px">från</span>` + pr('495 kr'))],
      ['Litet "från" ovanför', card(`<div style="font-size:13px;color:var(--smuted)">Från</div>` + pr('495 kr'))],
    ]),
    Q('tx-pris-ordinarie-placering', 'Var ska det överstrukna ordinarie priset stå?', [
      ['Före nya priset', card(prRow(strike('695 kr') + pr('495 kr', 'color:var(--bad)')))],
      ['Efter nya priset', card(prRow(pr('495 kr', 'color:var(--bad)') + strike('695 kr')))],
      ['Ovanför nya priset', card(`<div>${strike('695 kr')}</div>` + pr('495 kr', 'color:var(--bad)'))],
    ]),
    Q('tx-pris-ordinarie-stil', 'Hur ska det överstrukna ordinarie priset se ut?', [
      ['Grå, mindre', card(prRow(pr('495 kr', 'color:var(--bad)') + strike('695 kr')))],
      ['Grå, lika stort', card(prRow(pr('495 kr', 'color:var(--bad)') + strike('695 kr', 'font-size:24px')))],
      ['Textfärg, mindre', card(prRow(pr('495 kr', 'color:var(--bad)') + strike('695 kr', 'color:var(--sink)')))],
      ['Grå med "Ord. pris"', card(prRow(pr('495 kr', 'color:var(--bad)') + `<span style="color:var(--smuted);font-size:14px">Ord. pris <s>695 kr</s></span>`))],
    ]),
    Q('tx-pris-rea-farg', 'Vilken färg ska ett nedsatt pris ha?', [
      ['Röd', card(prRow(pr('495 kr', 'color:var(--bad)') + strike('695 kr')))],
      ['Varumärkesfärg', card(prRow(pr('495 kr', 'color:var(--brand)') + strike('695 kr')))],
      ['Samma som vanliga priser', card(prRow(pr('495 kr') + strike('695 kr')))],
    ]),
    Q('tx-pris-tusental', 'Hur ska tusental skrivas i priser?', [
      ['Mellanslag (12 495 kr)', card(pr('12&#8239;495 kr'))],
      ['Ingen avgränsare (12495 kr)', card(pr('12495 kr'))],
      ['Punkt (12.495 kr)', card(pr('12.495 kr'))],
    ]),
    Q('tx-pris-decimaler', 'Ska hela kronor visas med decimaler?', [
      ['Inga decimaler (495 kr)', card(pr('495 kr'))],
      ['Två nollor (495,00 kr)', card(pr('495,00 kr'))],
      ['Tankstreck (495,– kr)', card(pr('495,– kr'))],
    ]),
    Q('tx-pris-ore', 'Hur ska ett pris med ören skrivas?', [
      ['Komma (49,90 kr)', card(pr('49,90 kr'))],
      ['Kolon (49:90)', card(pr('49:90'))],
      ['Upphöjda ören', card(pr('49<span style="font-size:0.55em;vertical-align:0.6em;margin-left:1px">90</span> kr'))],
    ]),
    Q('tx-pris-moms-placering', 'Var ska momstexten stå?', [
      ['Efter priset', card(prRow(pr('495 kr') + '<span style="font-size:13px;color:var(--smuted)">inkl. moms</span>'))],
      ['Under priset', card(pr('495 kr') + '<div style="font-size:13px;color:var(--smuted);margin-top:2px">inkl. moms</div>')],
      ['Ingen momstext', card(pr('495 kr'))],
    ]),
    Q('tx-pris-moms-text', 'Hur ska momsen formuleras?', [
      ['inkl. moms', card(pr('495 kr') + '<div style="font-size:13px;color:var(--smuted);margin-top:2px">inkl. moms</div>')],
      ['inklusive moms', card(pr('495 kr') + '<div style="font-size:13px;color:var(--smuted);margin-top:2px">inklusive moms</div>')],
      ['inkl. 25 % moms', card(pr('495 kr') + '<div style="font-size:13px;color:var(--smuted);margin-top:2px">inkl. 25&nbsp;% moms</div>')],
      ['Pris inkl. moms', card(pr('495 kr') + '<div style="font-size:13px;color:var(--smuted);margin-top:2px">Pris inkl. moms</div>')],
    ]),
    Q('tx-pris-vikt', 'Hur tungt ska priset vara?', [[500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)'], [800, 'Extrafet (800)']].map(([w, l]) => [l, card(pr('495 kr', `font-weight:${w}`))])),
    Q('tx-pris-storlek', 'Hur stort ska priset vara i ett kort?', [18, 22, 28, 36].map(px => [`Pris ${px} px`, card(pr('495 kr', `font-size:${px}px`) + '<p class="small muted" style="margin-top:6px">En kort beskrivning på en rad.</p>')])),
    Q('tx-pris-period', 'Hur ska ett pris per månad skrivas?', [
      ['295 kr/mån', card(pr('295 kr/mån'))],
      ['295 kr per månad', card(pr('295 kr') + ' <span style="font-size:15px;color:var(--smuted)">per månad</span>')],
      ['295 kr / mån, litet', card(pr('295 kr') + ' <span style="font-size:15px;color:var(--smuted)">/ mån</span>')],
      ['295 kr i månaden', card(pr('295 kr') + ' <span style="font-size:15px;color:var(--smuted)">i månaden</span>')],
    ]),
    Q('tx-pris-intervall', 'Hur ska ett prisintervall skrivas?', [
      ['495–895 kr', card(pr('495–895 kr'))],
      ['495 kr – 895 kr', card(pr('495 kr – 895 kr'))],
      ['495 – 895 kr', card(pr('495 – 895 kr'))],
    ]),
    Q('tx-pris-gratis', 'Hur ska ett pris på noll kronor skrivas?', [
      ['0 kr', card(pr('0 kr'))],
      ['Gratis', card(pr('Gratis'))],
      ['Kostnadsfritt', card(pr('Kostnadsfritt'))],
      ['Ingår', card(pr('Ingår'))],
    ]),
    Q('tx-pris-rabatt', 'Hur ska en rabatt skrivas?', [
      ['−20 %', card(prRow(pr('495 kr', 'color:var(--bad)') + '<span class="tag" style="background:#FBE9E7;color:var(--bad)">−20&nbsp;%</span>'))],
      ['Spara 100 kr', card(prRow(pr('495 kr', 'color:var(--bad)') + '<span class="tag" style="background:#FBE9E7;color:var(--bad)">Spara 100 kr</span>'))],
      ['20 % rabatt', card(prRow(pr('495 kr', 'color:var(--bad)') + '<span class="tag" style="background:#FBE9E7;color:var(--bad)">20&nbsp;% rabatt</span>'))],
    ]),
    Q('tx-prislista', 'Hur ska en prislista ställas upp?', [
      ['Pris längst till höger', pad(`<div class="stack" style="gap:10px;max-width:360px">${['Första tjänsten|495 kr', 'Andra tjänsten|1&#8239;295 kr', 'Tredje tjänsten|895 kr'].map(r => { const [a, b] = r.split('|'); return `<div style="display:flex;justify-content:space-between;gap:12px"><span>${a}</span><span class="price">${b}</span></div>`; }).join('')}</div>`)],
      ['Prickad linje till priset', pad(`<div class="stack" style="gap:10px;max-width:360px">${['Första tjänsten|495 kr', 'Andra tjänsten|1&#8239;295 kr', 'Tredje tjänsten|895 kr'].map(r => { const [a, b] = r.split('|'); return `<div style="display:flex;align-items:baseline;gap:8px"><span>${a}</span><span style="flex:1;border-bottom:2px dotted var(--sline);min-width:12px"></span><span class="price">${b}</span></div>`; }).join('')}</div>`)],
      ['Priset under namnet', pad(`<div class="stack" style="gap:12px;max-width:360px">${['Första tjänsten|495 kr', 'Andra tjänsten|1&#8239;295 kr', 'Tredje tjänsten|895 kr'].map(r => { const [a, b] = r.split('|'); return `<div><div>${a}</div><div class="price">${b}</div></div>`; }).join('')}</div>`)],
    ]),
    Q('tx-pris-farg', 'Vilken färg ska priset ha?', [
      ['Samma som texten', card(pr('495 kr'))],
      ['Varumärkesfärg', card(pr('495 kr', 'color:var(--brand)'))],
    ]),
    Q('tx-pris-summa', 'Hur ska en totalsumma framhävas?', [
      ['Större och fet', pad(`<div class="stack" style="gap:8px;max-width:300px"><div style="display:flex;justify-content:space-between"><span>Delsumma</span><span>990 kr</span></div><div style="display:flex;justify-content:space-between"><span>Frakt</span><span>49 kr</span></div><div class="divider"></div><div style="display:flex;justify-content:space-between;align-items:baseline;font-size:20px;font-weight:700"><span>Totalt</span><span class="price">1&#8239;039 kr</span></div></div>`)],
      ['Samma storlek, fet', pad(`<div class="stack" style="gap:8px;max-width:300px"><div style="display:flex;justify-content:space-between"><span>Delsumma</span><span>990 kr</span></div><div style="display:flex;justify-content:space-between"><span>Frakt</span><span>49 kr</span></div><div class="divider"></div><div style="display:flex;justify-content:space-between;font-weight:700"><span>Totalt</span><span class="price">1&#8239;039 kr</span></div></div>`)],
      ['Fet med dubbel linje', pad(`<div class="stack" style="gap:8px;max-width:300px"><div style="display:flex;justify-content:space-between"><span>Delsumma</span><span>990 kr</span></div><div style="display:flex;justify-content:space-between"><span>Frakt</span><span>49 kr</span></div><div style="border-top:3px double var(--sink);padding-top:8px;display:flex;justify-content:space-between;font-weight:700"><span>Totalt</span><span class="price">1&#8239;039 kr</span></div></div>`)],
    ]),
    Q('tx-pris-forfragan', 'Hur ska det stå när priset inte är fast?', [
      ['Pris på förfrågan', card(pr('Pris på förfrågan', 'font-size:18px'))],
      ['Offert', card(pr('Offert', 'font-size:18px'))],
      ['Kontakta oss för pris', card(pr('Kontakta oss för pris', 'font-size:18px'))],
    ]),
  ]);

  // ---------- Siffror, datum och tid ----------
  const rowsNum = ['1&#8239;111', '8&#8239;480', '12&#8239;099', '407'];
  const numTable = st => pad(`<div style="max-width:240px;${st}">${['Januari', 'Februari', 'Mars', 'April'].map((m, i) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--sline)"><span>${m}</span><span style="font-weight:600">${rowsNum[i]} kr</span></div>`).join('')}</div>`);
  const stat = (o = {}) => pad(`<div class="row" style="gap:28px;align-items:flex-start">${(o.items || [['98', '%', 'Andel som svarat']]).map(([n, u, l]) => `<div style="min-width:0">${o.top ? `<div class="small muted" style="margin-bottom:4px">${l}</div>` : ''}<div style="font-size:${o.size || 44}px;font-weight:${o.w || 700};line-height:1;letter-spacing:-0.02em;font-variant-numeric:tabular-nums;color:${o.c || 'var(--sink)'}">${n}${u ? (o.unit ? o.unit(u) : '&nbsp;' + u) : ''}</div>${o.top ? '' : `<div class="small muted" style="margin-top:6px">${l}</div>`}</div>`).join('')}</div>`);
  const dt = t => pad(`<div style="font-size:22px;font-weight:600;font-variant-numeric:tabular-nums">${t}</div><p class="muted" style="margin-top:4px">Rubrik för en händelse</p>`);
  G('siffror', 'Siffror, datum och tid', [
    Q('tx-siffror-tabell', 'Ska siffror i kolumner vara lika breda?', [
      ['Tabellsiffror (lika breda)', numTable('font-variant-numeric:tabular-nums')],
      ['Proportionella siffror', numTable('font-variant-numeric:proportional-nums')],
    ]),
    Q('tx-statistik-storlek', 'Hur stora ska statistiksiffror vara?', [32, 44, 56, 72].map(px => [`Siffror ${px} px`, stat({ size: px })])),
    Q('tx-statistik-vikt', 'Hur tunga ska statistiksiffror vara?', [[300, 'Lätt (300)'], [500, 'Medium (500)'], [700, 'Fet (700)'], [800, 'Extrafet (800)']].map(([w, l]) => [l, stat({ w })])),
    Q('tx-statistik-enhet', 'Hur stor ska enheten vara bredvid en statistiksiffra?', [
      ['Lika stor (98 %)', stat()],
      ['Mindre', stat({ unit: u => `<span style="font-size:0.5em;margin-left:4px">${u}</span>` })],
      ['Mindre och grå', stat({ unit: u => `<span style="font-size:0.5em;margin-left:4px;color:var(--smuted)">${u}</span>` })],
    ]),
    Q('tx-statistik-etikett', 'Var ska förklaringen till en statistiksiffra stå?', [
      ['Under siffran', stat()],
      ['Ovanför siffran', stat({ top: true })],
    ]),
    Q('tx-statistik-farg', 'Vilken färg ska statistiksiffror ha?', [
      ['Samma som texten', stat()],
      ['Varumärkesfärg', stat({ c: 'var(--brand)' })],
    ]),
    Q('tx-datum-kort', 'Hur ska ett datum skrivas i korthet?', [
      ['24 nov', dt('24 nov')],
      ['24 nov.', dt('24 nov.')],
      ['24/11', dt('24/11')],
      ['2026-11-24', dt('2026-11-24')],
      ['24.11', dt('24.11')],
    ]),
    Q('tx-datum-ar', 'Hur ska ett datum med år skrivas?', [
      ['24 november 2026', dt('24 november 2026')],
      ['24 nov 2026', dt('24 nov 2026')],
      ['2026-11-24', dt('2026-11-24')],
    ]),
    Q('tx-datum-veckodag', 'Hur ska ett datum med veckodag skrivas?', [
      ['tis 24 nov', dt('tis 24 nov')],
      ['Tis 24 nov', dt('Tis 24 nov')],
      ['tisdag 24 november', dt('tisdag 24 november')],
      ['Tisdag 24/11', dt('Tisdag 24/11')],
    ]),
    Q('tx-klockslag', 'Hur ska klockslag skrivas?', [
      ['07.30', dt('07.30')],
      ['07:30', dt('07:30')],
      ['7.30', dt('7.30')],
      ['kl. 07.30', dt('kl. 07.30')],
    ]),
    Q('tx-tidsintervall', 'Hur ska ett tidsintervall skrivas?', [
      ['07.30–16.00', dt('07.30–16.00')],
      ['07.30 – 16.00', dt('07.30 – 16.00')],
      ['7.30–16', dt('7.30–16')],
      ['07.30 till 16.00', dt('07.30 till 16.00')],
    ]),
    Q('tx-datumblock', 'Hur ska datum visas i en lista med händelser?', [
      ['Datumruta: dag stor, månad liten', pad(`<div class="stack" style="gap:12px">${[['24', 'nov'], ['3', 'dec']].map(([d, m]) => `<div style="display:flex;gap:14px;align-items:center"><div style="width:52px;text-align:center;border:1px solid var(--sline);border-radius:8px;padding:6px 0;background:var(--box)"><div style="font-size:20px;font-weight:700;line-height:1">${d}</div><div class="small muted" style="text-transform:uppercase;letter-spacing:0.06em;font-size:11px;margin-top:2px">${m}</div></div><div style="font-weight:600">Rubrik för en händelse</div></div>`).join('')}</div>`)],
      ['Datum på en rad före', pad(`<div class="stack" style="gap:12px">${['24 nov', '3 dec'].map(d => `<div style="display:flex;gap:14px;align-items:baseline"><div style="width:56px;flex:0 0 auto;font-weight:600;font-variant-numeric:tabular-nums">${d}</div><div>Rubrik för en händelse</div></div>`).join('')}</div>`)],
      ['Datum ovanför rubriken', pad(`<div class="stack" style="gap:14px">${['tis 24 nov', 'tor 3 dec'].map(d => `<div><div class="small muted">${d}</div><div style="font-weight:600">Rubrik för en händelse</div></div>`).join('')}</div>`)],
    ]),
    Q('tx-procent', 'Hur ska procent skrivas?', [
      ['25 % (med mellanrum)', dt('25&nbsp;%')],
      ['25% (utan mellanrum)', dt('25%')],
      ['25 procent', dt('25 procent')],
    ]),
    Q('tx-telefon', 'Hur ska telefonnummer skrivas?', [
      ['08-123 456 78', dt('08-123 456 78')],
      ['08 123 456 78', dt('08 123 456 78')],
      ['+46 8 123 456 78', dt('+46 8 123 456 78')],
      ['08-12345678', dt('08-12345678')],
    ]),
    Q('tx-stora-tal', 'Hur ska stora tal skrivas i statistik?', [
      ['1 200 000', stat({ items: [['1&#8239;200&#8239;000', '', 'Genomförda']] })],
      ['1,2 milj.', stat({ items: [['1,2&nbsp;milj.', '', 'Genomförda']] })],
      ['1,2 M', stat({ items: [['1,2&nbsp;M', '', 'Genomförda']] })],
    ]),
    Q('tx-intervall-streck', 'Vilket streck ska stå i intervall och minustal?', [
      ['Tankstreck och minus (10–12, −5)', dt('10–12 st · −5 °C')],
      ['Bindestreck (10-12, -5)', dt('10-12 st · -5 °C')],
    ]),
    Q('tx-siffror-lopande', 'Hur ska små tal skrivas i löptext?', [
      ['Med bokstäver (tre steg)', pad(p('Processen tar tre steg och ungefär fem minuter att gå igenom från början till slut.', 'font-size:16px;max-width:44ch'))],
      ['Med siffror (3 steg)', pad(p('Processen tar 3 steg och ungefär 5 minuter att gå igenom från början till slut.', 'font-size:16px;max-width:44ch'))],
    ]),
  ]);

  // ---------- Listor ----------
  const ITEMS = ['Första punkten i listan', 'En andra punkt som är lite längre och därför bryts över två rader', 'Tredje punkten'];
  const mk = x => `<span style="height:1.5em;display:flex;align-items:center;justify-content:center;flex:0 0 auto;min-width:10px">${x}</span>`;
  const DOT = (s = 6, c = 'currentColor') => `<span style="width:${s}px;height:${s}px;border-radius:50%;background:${c}"></span>`;
  const DASH = c => `<span style="width:10px;height:2px;background:${c || 'currentColor'}"></span>`;
  const CHECK = c => `<svg class="ico" style="width:18px;height:18px;color:${c || 'var(--brand)'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
  const CHECKC = `<span style="width:20px;height:20px;border-radius:50%;background:var(--brand);color:#fff;display:inline-grid;place-items:center"><svg viewBox="0 0 24 24" style="width:13px;height:13px" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
  const CHECKB = `<span style="width:18px;height:18px;border-radius:4px;border:1.5px solid var(--brand);color:var(--brand);display:inline-grid;place-items:center"><svg viewBox="0 0 24 24" style="width:12px;height:12px" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
  const list = (marker, o = {}) => `<div style="display:flex;flex-direction:column;gap:${o.gap === undefined ? 8 : o.gap}px;font-size:${o.fs || 16}px;line-height:1.5;padding-left:${o.indent || 0}px;max-width:340px">${ITEMS.map((t, i) => `${o.div && i ? '<div class="divider"></div>' : ''}<div style="display:flex;gap:${o.mgap || 12}px">${mk(typeof marker === 'function' ? marker(i) : marker)}<span style="min-width:0">${o.text ? o.text(t, i) : t}</span></div>`).join('')}</div>`;
  const nm = (fn) => i => fn(i + 1);
  const li = (m, t) => `<div style="display:flex;gap:12px">${mk(m)}<span style="min-width:0">${t}</span></div>`;
  const nested = sub => `<div style="display:flex;flex-direction:column;gap:8px;font-size:16px;line-height:1.5;max-width:340px">${li(DOT(), 'Första punkten i listan')}${li(DOT(), 'Andra punkten, som har underpunkter')}<div style="display:flex;flex-direction:column;gap:6px;padding-left:22px">${li(sub, 'En underpunkt')}${li(sub, 'En till underpunkt')}</div>${li(DOT(), 'Tredje punkten')}</div>`;
  G('listor', 'Listor', [
    Q('tx-lista-punkt', 'Vilken punkt ska en vanlig punktlista ha?', [
      ['Prick', pad(list(DOT()))],
      ['Streck', pad(list(DASH()))],
      ['Bock', pad(list(CHECK()))],
      ['Bock i fylld cirkel', pad(list(CHECKC))],
    ]),
    Q('tx-lista-punktfarg', 'Vilken färg ska punkterna ha?', [
      ['Samma som texten', pad(list(DOT(6, 'var(--sink)')))],
      ['Varumärkesfärg', pad(list(DOT(6, 'var(--brand)')))],
      ['Grå', pad(list(DOT(6, '#9A9EA3')))],
    ]),
    Q('tx-lista-punktstorlek', 'Hur stor ska pricken vara?', [4, 6, 8].map(s => [`Prick ${s} px`, pad(list(DOT(s)))])),
    Q('tx-lista-bock', 'Hur ska bockar i en lista se ut?', [
      ['Ren bock', pad(list(CHECK()))],
      ['Bock i fylld cirkel', pad(list(CHECKC))],
      ['Bock i ruta', pad(list(CHECKB))],
    ]),
    Q('tx-lista-nummer', 'Hur ska numrerade listor numreras?', [
      ['1.', pad(list(nm(n => `<span style="font-variant-numeric:tabular-nums">${n}.</span>`)))],
      ['1)', pad(list(nm(n => `<span style="font-variant-numeric:tabular-nums">${n})</span>`)))],
      ['Siffra i cirkel', pad(list(nm(n => `<span style="width:22px;height:22px;border-radius:50%;background:var(--tint);color:var(--brand);font-size:12px;font-weight:700;display:inline-grid;place-items:center">${n}</span>`)))],
      ['01, 02, 03', pad(list(nm(n => `<span style="font-variant-numeric:tabular-nums">0${n}</span>`)))],
    ]),
    Q('tx-lista-nummerstil', 'Hur ska siffrorna i en numrerad lista se ut?', [
      ['Som texten', pad(list(nm(n => `${n}.`)))],
      ['Fet', pad(list(nm(n => `<b style="font-weight:700">${n}.</b>`)))],
      ['Fet i varumärkesfärg', pad(list(nm(n => `<b style="font-weight:700;color:var(--brand)">${n}.</b>`)))],
      ['Grå', pad(list(nm(n => `<span style="color:var(--smuted)">${n}.</span>`)))],
    ]),
    Q('tx-lista-indrag', 'Hur mycket ska en lista dras in jämfört med texten ovanför?', [0, 16, 28].map(v => [v ? `${v} px indrag` : 'Inget indrag', pad(p('Ett stycke text som står ovanför listan.', 'font-size:16px;margin-bottom:10px') + list(DOT(), { indent: v }))])),
    Q('tx-lista-avstand', 'Hur långt ska det vara mellan punkterna?', [2, 6, 10, 16].map(g => [`${g} px mellan punkter`, pad(list(DOT(), { gap: g }))])),
    Q('tx-lista-radbrytning', 'Var ska andra raden i en punkt börja?', [
      ['Indragen under texten', pad(list(DOT()))],
      ['Under punkten', pad(`<ul style="list-style:disc inside;padding:0;margin:0;font-size:16px;line-height:1.5;max-width:340px;display:flex;flex-direction:column;gap:8px">${ITEMS.map(t => `<li>${t}</li>`).join('')}</ul>`)],
    ]),
    Q('tx-lista-linjer', 'Ska punkterna skiljas åt med linjer?', [
      ['Utan linjer', pad(list(CHECK(), { gap: 10 }))],
      ['Tunn linje mellan', pad(list(CHECK(), { gap: 10, div: true }))],
    ]),
    Q('tx-lista-rubrik', 'Hur ska punkter med en egen rubrik se ut?', [
      ['Fet början på samma rad', pad(list(DOT(), { text: t => `<b style="font-weight:600">Rubrik.</b> ${t}` }))],
      ['Fet rad, text under', pad(list(DOT(), { gap: 12, text: t => `<b style="font-weight:600;display:block">Rubrik</b><span class="muted">${t}</span>` }))],
      ['Fet med tankstreck', pad(list(DOT(), { text: t => `<b style="font-weight:600">Rubrik</b> – ${t}` }))],
    ]),
    Q('tx-lista-niva', 'Hur ska en underlista markeras?', [
      ['Prick, sedan ring', pad(nested(`<span style="width:6px;height:6px;border-radius:50%;border:1.5px solid currentColor"></span>`))],
      ['Prick, sedan streck', pad(nested(DASH()))],
      ['Prick, sedan mindre grå prick', pad(nested(DOT(4, 'var(--smuted)')))],
    ]),
    Q('tx-lista-storlek', 'Hur stor ska listtexten vara jämfört med brödtexten?', [
      ['Samma som brödtexten', pad(p('Ett stycke brödtext ovanför listan.', 'font-size:16px;margin-bottom:10px') + list(DOT(), { fs: 16 }))],
      ['Något mindre', pad(p('Ett stycke brödtext ovanför listan.', 'font-size:16px;margin-bottom:10px') + list(DOT(), { fs: 15 }))],
    ]),
  ]);

  // ---------- Citat ----------
  const QT = 'Det här är ett citat som är två eller tre rader långt och visar hur stilen fungerar.';
  const who = '<div style="margin-top:12px;font-size:14px"><b style="font-weight:600">Förnamn Efternamn</b><span class="muted">, titel</span></div>';
  const qmark = (c, s) => `<div aria-hidden="true" style="font-size:${s || 64}px;line-height:1;height:${(s || 64) * 0.45}px;color:${c || 'var(--brand)'};font-weight:700;font-family:Georgia,serif">”</div>`;
  const quote = (o = {}) => pad(`<div style="max-width:380px;${o.box || ''}">${o.pre || ''}<p style="font-size:${o.fs || 20}px;line-height:1.4;font-weight:${o.w || 500};font-style:${o.it ? 'italic' : 'normal'};${o.st || ''}">${o.q ? o.q[0] : ''}${QT}${o.q ? o.q[1] : ''}</p>${o.who === undefined ? who : o.who}</div>`);
  const SVQ = ['”', '”'];
  G('citat', 'Citat', [
    Q('tx-citat-stil', 'Hur ska ett citat markeras?', [
      ['Stort citattecken ovanför', quote({ pre: qmark() })],
      ['Linje till vänster', quote({ box: 'border-left:3px solid var(--brand);padding-left:18px', q: SVQ })],
      ['Bara kursiv text', quote({ it: true, q: SVQ })],
      ['Ljus platta bakom', quote({ box: 'background:var(--box);border-radius:12px;padding:20px', q: SVQ })],
    ]),
    Q('tx-citattecken', 'Vilka citattecken ska användas?', [
      ['Svenska ”…”', quote({ q: ['”', '”'] })],
      ['Raka "…"', quote({ q: ['"', '"'] })],
      ['Franska »…«', quote({ q: ['»', '«'] })],
      ['Engelska “…”', quote({ q: ['“', '”'] })],
    ]),
    Q('tx-citat-kursiv', 'Ska citattexten vara kursiv?', [
      ['Rak', quote({ q: SVQ })],
      ['Kursiv', quote({ q: SVQ, it: true })],
    ]),
    Q('tx-citat-storlek', 'Hur stor ska citattexten vara?', [17, 20, 24, 30].map(px => [`Citat ${px} px`, quote({ q: SVQ, fs: px })])),
    Q('tx-citat-vikt', 'Hur tung ska citattexten vara?', [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)']].map(([w, l]) => [l, quote({ q: SVQ, w })])),
    Q('tx-citat-avsandare', 'Hur ska avsändaren av ett citat visas?', [
      ['— Namn, titel på en rad', quote({ q: SVQ, who: '<div style="margin-top:12px;font-size:14px" class="muted">— Förnamn Efternamn, titel</div>' })],
      ['Namn fet, titel grå under', quote({ q: SVQ, who: '<div style="margin-top:12px;font-size:14px"><div style="font-weight:600">Förnamn Efternamn</div><div class="muted">Titel</div></div>' })],
      ['Med porträtt', quote({ q: SVQ, who: '<div style="margin-top:12px;font-size:14px;display:flex;gap:10px;align-items:center"><img src="img/portratt-1.jpg" alt="Porträtt" style="width:40px;height:40px;border-radius:50%;object-fit:cover"><div><div style="font-weight:600">Förnamn Efternamn</div><div class="muted">Titel</div></div></div>' })],
    ]),
    Q('tx-citat-tecken-farg', 'Hur ska det stora citattecknet se ut?', [
      ['Stort, varumärkesfärg', quote({ pre: qmark('var(--brand)', 64) })],
      ['Stort, ljusgrått', quote({ pre: qmark('#C9CCD0', 64) })],
      ['Mindre, varumärkesfärg', quote({ pre: qmark('var(--brand)', 40) })],
    ]),
    Q('tx-citat-linje', 'Hur ska linjen till vänster om ett citat se ut?', [
      ['2 px, varumärkesfärg', quote({ q: SVQ, box: 'border-left:2px solid var(--brand);padding-left:18px' })],
      ['4 px, varumärkesfärg', quote({ q: SVQ, box: 'border-left:4px solid var(--brand);padding-left:18px' })],
      ['2 px, grå', quote({ q: SVQ, box: 'border-left:2px solid var(--sline);padding-left:18px' })],
    ]),
    Q('tx-citat-hangande', 'Var ska det inledande citattecknet stå?', [
      ['Hängande i marginalen', quote({ q: ['<span style="margin-left:-0.42em">”</span>', '”'], box: 'padding-left:8px' })],
      ['I textflödet', quote({ q: SVQ, box: 'padding-left:8px' })],
    ]),
    Q('tx-citat-justering', 'Hur ska ett fristående citat ställas?', [
      ['Vänsterställt', quote({ pre: qmark(), box: 'text-align:left' })],
      ['Centrerat', quote({ pre: qmark(), box: 'text-align:center;margin:0 auto' })],
    ]),
  ]);

  // ---------- Betoning ----------
  const EMP = (open, close, st) => pad(`<p style="font-size:16px;line-height:1.6;max-width:44ch;${st || ''}">Det här är ett stycke där ${open}en viktig del${close} av meningen ska betonas för läsaren.</p>`);
  G('betoning', 'Betoning', [
    Q('tx-betoning-vikt', 'Hur fet ska betonad text i ett stycke vara?', [[500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)'], [800, 'Extrafet (800)']].map(([w, l]) => [l, EMP(`<b style="font-weight:${w}">`, '</b>')])),
    Q('tx-betoning-satt', 'Hur ska ord betonas i brödtext?', [
      ['Fetstil', EMP('<b style="font-weight:600">', '</b>')],
      ['Kursiv', EMP('<i>', '</i>')],
      ['Fet och kursiv', EMP('<b style="font-weight:600;font-style:italic">', '</b>')],
    ]),
    Q('tx-markering', 'Hur ska text markeras med bakgrund?', [
      ['Hel bakgrund bakom ordet', EMP('<mark style="background:#FFF1A8;color:inherit;padding:0 2px;border-radius:2px">', '</mark>')],
      ['Överstrykning nedtill', EMP('<mark style="background:linear-gradient(transparent 58%, #FFE36E 58%);color:inherit;padding:0 1px">', '</mark>')],
      ['Tjock linje under', EMP('<span style="text-decoration:underline;text-decoration-color:#FFD43B;text-decoration-thickness:4px;text-underline-offset:2px">', '</span>')],
      ['Ingen markering', EMP('', '')],
    ]),
    Q('tx-markering-farg', 'Vilken färg ska en markering med bakgrund ha?', [
      ['Gul', EMP('<mark style="background:#FFF1A8;color:inherit;padding:0 2px;border-radius:2px">', '</mark>')],
      ['Ljus varumärkeston', EMP('<mark style="background:var(--tint);color:inherit;padding:0 2px;border-radius:2px">', '</mark>')],
      ['Ljusgrön', EMP('<mark style="background:#D9F2E1;color:inherit;padding:0 2px;border-radius:2px">', '</mark>')],
    ]),
    Q('tx-betoning-farg', 'Ska betonad text få en annan färg?', [
      ['Samma färg, bara fet', EMP('<b style="font-weight:600">', '</b>')],
      ['Fet i varumärkesfärg', EMP('<b style="font-weight:600;color:var(--brand)">', '</b>')],
      ['Fet och svart, resten grå', EMP('<b style="font-weight:600;color:#000">', '</b>', 'color:var(--smuted)')],
    ]),
    Q('tx-rubrik-betonat-ord', 'Hur ska ett betonat ord i en rubrik markeras?', [
      ['Varumärkesfärg', pad(hd(1, '', 'En rubrik med <span style="color:var(--brand)">ett ord</span> som sticker ut'))],
      ['Kursiv', pad(hd(1, '', 'En rubrik med <em>ett ord</em> som sticker ut'))],
      ['Understruket', pad(hd(1, '', 'En rubrik med <span style="text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:6px;text-decoration-color:var(--brand)">ett ord</span> som sticker ut'))],
      ['Ingen betoning', pad(hd(1, '', 'En rubrik med ett ord som sticker ut'))],
    ]),
    Q('tx-rubrik-tva-vikter', 'Ska en rubrik kunna blanda två vikter?', [
      ['En vikt i hela rubriken', pad(hd(1, '', 'En rubrik med två delar som hör ihop'))],
      ['Första delen fet, resten lätt', pad(hd(1, '', 'En rubrik med två delar <span style="font-weight:400">som hör ihop</span>'))],
      ['Andra delen grå', pad(hd(1, '', 'En rubrik med två delar <span style="color:var(--smuted)">som hör ihop</span>'))],
    ]),
    Q('tx-forkortning', 'Hur ska förkortningar i versaler sättas?', [
      ['Vanliga versaler (SMS, PDF)', pad(p('Du får en bekräftelse via SMS och kvittot som PDF direkt efter bokningen.', 'font-size:16px;max-width:42ch'))],
      ['Mindre versaler, lätt spärrade', pad(p('Du får en bekräftelse via <span style="font-size:0.86em;letter-spacing:0.04em">SMS</span> och kvittot som <span style="font-size:0.86em;letter-spacing:0.04em">PDF</span> direkt efter bokningen.', 'font-size:16px;max-width:42ch'))],
      ['Gemener (sms, pdf)', pad(p('Du får en bekräftelse via sms och kvittot som pdf direkt efter bokningen.', 'font-size:16px;max-width:42ch'))],
    ]),
  ]);

  // ---------- Text på foto ----------
  const photo = (o = {}) => `<div style="position:relative;min-height:260px;display:flex;flex-direction:column;justify-content:${o.top ? 'flex-start' : 'flex-end'};color:${o.color || '#fff'};overflow:hidden"><img src="img/${o.img || 'stadsgata'}.jpg" alt="${{ stadsgata: 'Gata i en stad', 'skog-sjo': 'Skog vid en sjö', vardagsrum: 'Vardagsrum' }[o.img || 'stadsgata']}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none">${o.sh ? `<div style="position:absolute;inset:0;background:${o.sh}"></div>` : ''}<div style="position:relative;padding:22px;min-width:0;${o.box || ''}"><div style="${o.boxIn || ''}"><div class="h" style="font-size:28px;color:inherit;font-weight:${o.w || 700};${o.ts ? 'text-shadow:' + o.ts : ''}">Rubrik på ett foto</div><p style="margin-top:8px;font-size:15px;max-width:34ch;${o.ts ? 'text-shadow:' + o.ts : ''}">En kort text som ska gå att läsa ovanpå bilden.</p></div></div></div>`;
  G('foto', 'Text på foto', [
    Q('tx-foto-metod', 'Hur ska text på ett foto bli läsbar?', [
      ['Textskugga', photo({ ts: '0 1px 3px rgba(0,0,0,.55), 0 0 18px rgba(0,0,0,.35)' })],
      ['Jämn mörkläggning', photo({ sh: 'rgba(0,0,0,.45)' })],
      ['Toning nedifrån', photo({ sh: 'linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 65%)' })],
      ['Platta bakom texten', photo({ color: 'var(--sink)', boxIn: 'background:#fff;padding:16px;border-radius:10px;max-width:300px' })],
    ]),
    Q('tx-foto-morklaggning', 'Hur mörk ska en jämn mörkläggning vara?', [20, 35, 50, 65].map(v => [`Mörkläggning ${v} %`, photo({ sh: `rgba(0,0,0,.${v})` })])),
    Q('tx-foto-toning', 'Hur ska en toning bakom texten gå?', [
      ['Nedifrån och upp', photo({ sh: 'linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 65%)' })],
      ['Från vänster', photo({ sh: 'linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,0) 80%)' })],
      ['Uppifrån, text överst', photo({ top: true, sh: 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,0) 65%)' })],
    ]),
    Q('tx-foto-platta', 'Hur ska en platta bakom texten se ut?', [
      ['Vit platta', photo({ color: 'var(--sink)', boxIn: 'background:#fff;padding:16px;border-radius:10px;max-width:300px' })],
      ['Mörk, halvgenomskinlig', photo({ boxIn: 'background:rgba(20,22,24,.72);padding:16px;border-radius:10px;max-width:300px' })],
      ['Suddig, frostat glas', photo({ boxIn: 'background:rgba(255,255,255,.18);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);padding:16px;border-radius:10px;max-width:300px;text-shadow:0 1px 2px rgba(0,0,0,.4)' })],
      ['Platta i varumärkesfärg', photo({ boxIn: 'background:var(--brand);padding:16px;border-radius:10px;max-width:300px' })],
    ]),
    Q('tx-foto-skugga', 'Hur stark ska textskuggan vara?', [
      ['Mjuk och diskret', photo({ img: 'skog-sjo', ts: '0 1px 2px rgba(0,0,0,.35)' })],
      ['Tydlig', photo({ img: 'skog-sjo', ts: '0 1px 3px rgba(0,0,0,.6), 0 0 16px rgba(0,0,0,.4)' })],
      ['Bred glöd', photo({ img: 'skog-sjo', ts: '0 0 28px rgba(0,0,0,.65), 0 0 8px rgba(0,0,0,.4)' })],
    ]),
    Q('tx-foto-textfarg', 'Vilken färg ska text på mörklagt foto ha?', [
      ['Helvit', photo({ sh: 'rgba(0,0,0,.45)', color: '#FFFFFF' })],
      ['Bruten vit', photo({ sh: 'rgba(0,0,0,.45)', color: '#F1EEE8' })],
    ]),
    Q('tx-foto-vikt', 'Hur tung ska en rubrik på foto vara?', [[600, 'Halvfet (600)'], [700, 'Fet (700)'], [800, 'Extrafet (800)']].map(([w, l]) => [l, photo({ sh: 'rgba(0,0,0,.4)', w })])),
    Q('tx-foto-kort', 'Hur ska rubriken sitta i ett kort med foto?', [
      ['Över fotot, med toning', pad(`<div style="max-width:300px;border-radius:12px;overflow:hidden">${photo({ img: 'vardagsrum', sh: 'linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 65%)' }).replace('min-height:260px', 'min-height:220px')}</div>`)],
      ['Under fotot', pad(`<div style="max-width:300px;border-radius:12px;overflow:hidden;background:var(--box)"><img src="img/vardagsrum.jpg" alt="Vardagsrum" style="width:100%;aspect-ratio:16/10;object-fit:cover"><div style="padding:16px"><div class="h" style="font-size:22px">Rubrik på ett foto</div><p style="margin-top:6px;font-size:15px">En kort text som ska gå att läsa ovanpå bilden.</p></div></div>`)],
    ]),
  ]);

  // ---------- Avstånd ----------
  const BTN = '<span class="sb">Läs mer</span>';
  G('avstand', 'Avstånd i text', [
    Q('tx-avstand-rubrik-text', 'Hur långt ska det vara mellan en rubrik och texten under?', [4, 8, 12, 16, 24].map(g => [`${g} px under rubriken`, pad(hd(2, '', H2T) + p(P, `margin-top:${g}px;font-size:16px;max-width:52ch`))])),
    Q('tx-avstand-text-knapp', 'Hur långt ska det vara mellan text och knapp?', [16, 24, 32, 40].map(g => [`${g} px till knappen`, pad(hd(2, '', H2T) + p(PS, 'margin-top:12px;font-size:16px;max-width:52ch') + `<div style="margin-top:${g}px">${BTN}</div>`)])),
    Q('tx-avstand-kort', 'Hur långt ska det vara mellan rubrik och text i ett kort?', [4, 6, 10, 14].map(g => [`${g} px i kortet`, pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}${p(PS, `margin-top:${g}px`)}</div>`)])),
    Q('tx-avstand-ingress-brod', 'Hur långt ska det vara mellan ingress och brödtext?', [12, 20, 32].map(g => [`${g} px efter ingressen`, pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:19px;line-height:1.45;max-width:52ch">${LEAD}</p>` + p(P, `margin-top:${g}px;font-size:16px;max-width:60ch`))])),
    Q('tx-avstand-fore-mellanrubrik', 'Hur mycket luft ska det vara ovanför en rubrik mitt i en text?', [24, 32, 48, 64].map(g => [`${g} px ovanför rubriken`, pad(p(P, 'font-size:16px;max-width:60ch') + hd(3, `margin-top:${g}px;font-size:21px`, 'En mellanrubrik i texten') + p(P2, 'margin-top:8px;font-size:16px;max-width:60ch'))])),
    Q('tx-avstand-h1-ingress', 'Hur långt ska det vara mellan en stor rubrik och ingressen?', [8, 16, 24].map(g => [`${g} px under H1`, pad(hd(1, 'font-size:44px', H1T) + `<p style="margin-top:${g}px;font-size:19px;line-height:1.45;max-width:46ch">${LEAD}</p>`)]), 'stack'),
    Q('tx-avstand-lista', 'Hur mycket luft ska det vara runt en lista i löptext?', [6, 12, 20].map(g => [`${g} px före och efter`, pad(p('Ett stycke text som leder in i listan.', 'font-size:16px') + `<div style="margin:${g}px 0">${list(DOT(), { gap: 6 })}</div>` + p('Ett stycke text som följer efter listan.', 'font-size:16px'))])),
    Q('tx-avstand-pris-knapp', 'Hur långt ska det vara mellan pris och knapp i ett kort?', [8, 16, 24].map(g => [`${g} px till knappen`, card(pr('495 kr') + `<div style="margin-top:${g}px"><span class="sb" style="width:100%">Boka tid</span></div>`)])),
    Q('tx-avstand-knapp-finstilt', 'Hur långt ska det vara mellan en knapp och finstilt under den?', [6, 10, 16].map(g => [`${g} px under knappen`, pad(`<div style="max-width:280px"><span class="sb" style="width:100%">Fortsätt</span><p style="margin-top:${g}px;font-size:12px;color:var(--smuted);text-align:center">Ingen bindningstid. Avsluta när du vill.</p></div>`)])),
  ]);

  // ---------- Centrerat eller vänsterställt ----------
  const ICON = '<svg class="ico" style="width:28px;height:28px;color:var(--brand)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const STATS = ['98&nbsp;%|Andel som svarat', '2&#8239;400|Genomförda', '24&nbsp;h|Svarstid'];
  G('justering', 'Centrerat eller vänsterställt', [
    Q('tx-just-sektionsintro', 'Hur ska en sektions rubrik och ingress ställas?', [
      ['Vänsterställt', pad(hd(2, '', H2T) + `<p style="margin-top:12px;font-size:18px;line-height:1.45;max-width:52ch">${LEAD}</p>`)],
      ['Centrerat', pad(`<div style="text-align:center">${hd(2, '', H2T)}<p style="margin:12px auto 0;font-size:18px;line-height:1.45;max-width:52ch">${LEAD}</p></div>`)],
    ], 'stack'),
    Q('tx-just-hero', 'Hur ska en stor rubrik med ingress och knapp ställas (utan bild)?', [
      ['Vänsterställt', pad(hd(1, 'font-size:44px;max-width:16ch', H1T) + `<p style="margin-top:14px;font-size:19px;line-height:1.45;max-width:46ch">${LEAD}</p><div style="margin-top:24px">${BTN}</div>`, 'padding:36px 24px')],
      ['Centrerat', pad(`<div style="text-align:center">${hd(1, 'font-size:44px;max-width:16ch;margin:0 auto', H1T)}<p style="margin:14px auto 0;font-size:19px;line-height:1.45;max-width:46ch">${LEAD}</p><div style="margin-top:24px">${BTN}</div></div>`, 'padding:36px 24px')],
    ], 'stack'),
    Q('tx-just-kort', 'Hur ska text i ett kort med ikon ställas?', [
      ['Vänsterställt', pad(`<div class="panel" style="max-width:280px">${ICON}${hd(3, 'margin-top:12px', 'En rubrik i ett kort')}${p(PS, 'margin-top:6px')}</div>`)],
      ['Centrerat', pad(`<div class="panel" style="max-width:280px;text-align:center"><div style="display:flex;justify-content:center">${ICON}</div>${hd(3, 'margin-top:12px', 'En rubrik i ett kort')}${p(PS, 'margin-top:6px')}</div>`)],
    ]),
    Q('tx-just-statistik', 'Hur ska en rad med statistiksiffror ställas?', [
      ['Vänsterställt', pad(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:20px">${STATS.map(s => { const [n, l] = s.split('|'); return `<div><div style="font-size:36px;font-weight:700;line-height:1;letter-spacing:-0.02em">${n}</div><div class="small muted" style="margin-top:6px">${l}</div></div>`; }).join('')}</div>`)],
      ['Centrerat', pad(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:20px;text-align:center">${STATS.map(s => { const [n, l] = s.split('|'); return `<div><div style="font-size:36px;font-weight:700;line-height:1;letter-spacing:-0.02em">${n}</div><div class="small muted" style="margin-top:6px">${l}</div></div>`; }).join('')}</div>`)],
    ], 'stack'),
    Q('tx-just-cta', 'Hur ska ett avslutande block med rubrik och knapp ställas?', [
      ['Vänsterställt', pad(`<div class="panel" style="padding:28px">${hd(2, '', 'En avslutande uppmaning')}${p(PS, 'margin-top:10px;font-size:16px')}<div style="margin-top:20px">${BTN}</div></div>`)],
      ['Centrerat', pad(`<div class="panel" style="padding:28px;text-align:center">${hd(2, '', 'En avslutande uppmaning')}${p(PS, 'margin-top:10px;font-size:16px')}<div style="margin-top:20px">${BTN}</div></div>`)],
      ['Text vänster, knapp höger', pad(`<div class="panel" style="padding:28px;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between"><div style="min-width:0;flex:1 1 240px">${hd(2, '', 'En avslutande uppmaning')}${p(PS, 'margin-top:10px;font-size:16px')}</div>${BTN}</div>`)],
    ], 'stack'),
    Q('tx-just-mobil', 'Hur ska rubrik och ingress ställas på mobil?', [
      ['Vänsterställt på mobil', pad(mob(hd(1, 'font-size:32px', H1T) + `<p style="margin-top:12px;font-size:17px;line-height:1.45">${LEAD}</p><div style="margin-top:20px">${BTN}</div>`))],
      ['Centrerat på mobil', pad(mob(`<div style="text-align:center">${hd(1, 'font-size:32px', H1T)}<p style="margin-top:12px;font-size:17px;line-height:1.45">${LEAD}</p><div style="margin-top:20px">${BTN}</div></div>`))],
    ]),
    Q('tx-just-bredd', 'Hur bred får centrerad text bli?', [['40 tecken', '40ch'], ['55 tecken', '55ch'], ['70 tecken', '70ch']].map(([l, v]) => [`Max ${l}`, pad(`<div style="text-align:center">${hd(2, '', H2T)}<p style="margin:12px auto 0;font-size:17px;line-height:1.5;max-width:${v}">${P} ${P2}</p></div>`)]), 'stack'),
  ]);

  // ---------- Avstavning och långa ord ----------
  const LONG = 'Bokningsbekräftelsen skickas av kundtjänstmedarbetarna tillsammans med försäkringsvillkoren och en sammanfattning.';
  const LONGS = 'Bok&shy;nings&shy;be&shy;kräf&shy;tel&shy;sen skickas av kund&shy;tjänst&shy;med&shy;ar&shy;be&shy;tar&shy;na tillsammans med för&shy;säk&shy;rings&shy;vill&shy;ko&shy;ren och en sam&shy;man&shy;fatt&shy;ning.';
  const narrow = (txt, st) => pad(`<p lang="sv" style="width:190px;max-width:100%;font-size:16px;line-height:1.5;${st || ''}">${txt}</p>`);
  const ORPH = 'Det här är ett kort stycke som slutar med ett ord på egen rad i';
  G('avstavning', 'Avstavning och långa ord', [
    Q('tx-avstavning-smal', 'Hur ska långa ord hanteras i en smal spalt?', [
      ['Avstavas med bindestreck', narrow(LONGS, 'hyphens:manual')],
      ['Ingen avstavning', narrow(LONG, 'hyphens:none')],
      ['Marginaljusterat och avstavat', narrow(LONGS, 'hyphens:manual;text-align:justify')],
    ]),
    Q('tx-langt-ord-rubrik', 'Vad ska hända när ett långt ord inte får plats i en rubrik på mobil?', [
      ['Ordet avstavas', pad(`<div class="h h1" lang="sv" style="font-size:32px;width:240px;max-width:100%;hyphens:manual">Boknings&shy;bekräftelsen kommer strax</div>`)],
      ['Ordet bryts utan streck', pad(`<div class="h h1" style="font-size:32px;width:240px;max-width:100%;overflow-wrap:anywhere;hyphens:none">Bokningsbekräftelsen kommer strax</div>`)],
      ['Rubriken blir mindre', pad(`<div class="h h1" style="font-size:24px;width:240px;max-width:100%">Bokningsbekräftelsen kommer strax</div>`)],
    ]),
    Q('tx-lang-adress', 'Hur ska en lång e-postadress eller länk brytas?', [
      ['Bryts var som helst', narrow('Skriv till <span class="link" style="overflow-wrap:anywhere">fornamn.efternamn@exempeladressen.se</span> så svarar vi.')],
      ['Bryts vid @ och punkt', narrow('Skriv till <span class="link">fornamn.<wbr>efternamn<wbr>@exempeladressen.<wbr>se</span> så svarar vi.')],
      ['Kortas med …', narrow('Skriv till <span class="link" style="display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:bottom">fornamn.efternamn@exempeladressen.se</span> så svarar vi.')],
    ]),
    Q('tx-trunkering', 'Hur ska för lång text i ett kort kortas?', [
      ['Två rader och …', pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}<p style="margin-top:6px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden">${P} ${P2}</p></div>`)],
      ['Tre rader och …', pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}<p style="margin-top:6px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-clamp:3;overflow:hidden">${P} ${P2}</p></div>`)],
      ['Hela texten visas', pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}<p style="margin-top:6px">${P} ${P2}</p></div>`)],
    ]),
    Q('tx-ensamt-ord', 'Får sista raden i ett stycke bestå av ett enda ord?', [
      ['Ett ord på sista raden går bra', pad(`<p style="width:240px;max-width:100%;font-size:16px;line-height:1.5;text-wrap:wrap">${ORPH} slutet.</p>`)],
      ['Minst två ord på sista raden', pad(`<p style="width:240px;max-width:100%;font-size:16px;line-height:1.5;text-wrap:wrap">${ORPH.replace(/ i$/, '')} i&nbsp;slutet.</p>`)],
    ]),
  ]);

  // ---------- Hela textblock ----------
  const block = (h1, lead, body) => pad(hd(1, `font-size:${h1}px`, H1T) + `<p style="margin-top:14px;font-size:${lead}px;line-height:1.45;max-width:52ch">${LEAD}</p><p style="margin-top:16px;font-size:${body}px;line-height:1.6;max-width:62ch">${P} ${P2}</p>`);
  const scale = (a, b, c) => pad(hd(1, `font-size:${a}px`, 'Sidans rubrik') + p(PS, 'margin-top:10px;font-size:16px') + hd(2, `margin-top:24px;font-size:${b}px`, 'En sektionsrubrik') + p(PS, 'margin-top:8px;font-size:16px') + hd(3, `margin-top:18px;font-size:${c}px`, 'En mindre rubrik') + p(PS, 'margin-top:6px;font-size:16px'));
  const darkB = a => `<div class="pad" style="background:#1A1C1E;color:#fff">${hd(2, 'color:#fff', H2T)}<p style="margin-top:12px;font-size:16px;line-height:1.6;max-width:56ch;color:rgba(255,255,255,${a})">${P}</p></div>`;
  G('textblock', 'Hela textblock', [
    Q('tx-block-kontrast', 'Hur stor skillnad ska det vara mellan rubrik, ingress och brödtext?', [
      ['Liten skillnad', block(30, 17, 16)],
      ['Mellanstor skillnad', block(42, 19, 16)],
      ['Stor skillnad', block(58, 21, 16)],
    ], 'stack'),
    Q('tx-block-skala', 'Vilken storleksskala ska rubriknivåerna följa?', [
      ['Tät skala: 30 / 23 / 19 px', scale(30, 23, 19)],
      ['Mellan: 36 / 25 / 20 px', scale(36, 25, 20)],
      ['Tydlig: 44 / 28 / 21 px', scale(44, 28, 21)],
      ['Dramatisk: 60 / 36 / 24 px', scale(60, 36, 24)],
    ], 'stack'),
    Q('tx-block-hierarki', 'Hur ska rubrik och metadata skiljas åt i ett kort?', [
      ['Med storlek', pad(`<div class="panel" style="max-width:280px"><div style="font-size:19px;font-weight:600;line-height:1.25">En rubrik i ett kort</div><div style="margin-top:4px;font-size:13px">24 nov · 5 min</div></div>`)],
      ['Med vikt', pad(`<div class="panel" style="max-width:280px"><div style="font-size:16px;font-weight:700;line-height:1.25">En rubrik i ett kort</div><div style="margin-top:4px;font-size:16px;font-weight:400">24 nov · 5 min</div></div>`)],
      ['Med färg', pad(`<div class="panel" style="max-width:280px"><div style="font-size:16px;font-weight:500;line-height:1.25">En rubrik i ett kort</div><div style="margin-top:4px;font-size:16px;color:var(--smuted)">24 nov · 5 min</div></div>`)],
      ['Med storlek, vikt och färg', pad(`<div class="panel" style="max-width:280px"><div style="font-size:19px;font-weight:700;line-height:1.25">En rubrik i ett kort</div><div style="margin-top:4px;font-size:13px;color:var(--smuted)">24 nov · 5 min</div></div>`)],
    ]),
    Q('tx-block-mellanrubrik', 'Hur ska en liten mellanrubrik i löptext se ut?', [
      ['Fet, brödtextens storlek', pad(p(P, 'font-size:16px;max-width:56ch') + `<div style="margin-top:22px;font-size:16px;font-weight:700">En liten mellanrubrik</div>` + p(P2, 'margin-top:4px;font-size:16px;max-width:56ch'))],
      ['Lite större, halvfet', pad(p(P, 'font-size:16px;max-width:56ch') + `<div style="margin-top:22px;font-size:19px;font-weight:600">En liten mellanrubrik</div>` + p(P2, 'margin-top:4px;font-size:16px;max-width:56ch'))],
      ['Små versaler, spärrade', pad(p(P, 'font-size:16px;max-width:56ch') + `<div style="margin-top:22px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">En liten mellanrubrik</div>` + p(P2, 'margin-top:6px;font-size:16px;max-width:56ch'))],
    ]),
    Q('tx-block-mork-yta', 'Hur ljus ska brödtexten vara på mörk yta?', [
      ['70 % vit', darkB(0.7)],
      ['85 % vit', darkB(0.85)],
      ['Helvit', darkB(1)],
    ]),
    Q('tx-block-faq', 'Hur ska fråga och svar ställas upp i text?', [
      ['Fråga halvfet, svar under', pad(`<div class="stack" style="gap:18px;max-width:420px">${[0, 1].map(() => `<div><div style="font-size:17px;font-weight:600">Hur lång tid tar det?</div><p style="margin-top:4px">${PS}</p></div>`).join('')}</div>`)],
      ['Fråga större, svar grå', pad(`<div class="stack" style="gap:18px;max-width:420px">${[0, 1].map(() => `<div><div style="font-size:19px;font-weight:600">Hur lång tid tar det?</div><p style="margin-top:4px;color:var(--smuted)">${PS}</p></div>`).join('')}</div>`)],
      ['Med linje mellan', pad(`<div class="stack" style="gap:14px;max-width:420px">${[0, 1].map(i => `${i ? '<div class="divider"></div>' : ''}<div><div style="font-size:17px;font-weight:600">Hur lång tid tar det?</div><p style="margin-top:4px">${PS}</p></div>`).join('')}</div>`)],
    ]),
    Q('tx-block-anfang', 'Ska långa texter börja med en stor första bokstav (anfang)?', [
      ['Ingen anfang', pad(`<p style="font-size:16px;line-height:1.6;max-width:56ch">${P} ${P2}</p>`)],
      ['Anfang över tre rader', pad(`<p style="font-size:16px;line-height:1.6;max-width:56ch"><span style="float:left;font-size:62px;line-height:0.85;font-weight:700;margin:4px 8px 0 0;color:var(--brand)">D</span>${(P + ' ' + P2).slice(1)}</p>`)],
      ['Första raden i versaler', pad(`<p style="font-size:16px;line-height:1.6;max-width:56ch"><span style="text-transform:uppercase;letter-spacing:0.06em;font-weight:600;font-size:14px">Det här är brödtext</span>${P.slice('Det här är brödtext'.length)} ${P2}</p>`)],
    ]),
  ]);

  // ---------- Fler frågor i befintliga grupper ----------
  const tbl = st => `<div style="max-width:320px;font-size:15px"><div style="display:flex;justify-content:space-between;padding:0 0 8px;border-bottom:1px solid var(--sline);${st}"><span>Beskrivning</span><span>Belopp</span></div>${['Första raden|495 kr', 'Andra raden|1&#8239;295 kr', 'Tredje raden|90 kr'].map(r => { const [a, b] = r.split('|'); return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--sline)"><span>${a}</span><span style="font-variant-numeric:tabular-nums">${b}</span></div>`; }).join('')}</div>`;
  const gq = k => groups.find(g => g.key === k).questions;
  gq('brodtext').push(
    Q('tx-brod-kort-storlek', 'Hur stor ska texten i kort och listor vara?', [14, 15, 16].map(px => [`Korttext ${px} px`, pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}<p style="margin-top:6px;font-size:${px}px">${PS} Den har en mening till.</p></div>`)])),
    Q('tx-brod-kort-radavstand', 'Vilket radavstånd ska kort text i kort ha?', [1.35, 1.45, 1.6].map(v => [`Radavstånd ${fmt(v)} i kort`, pad(`<div class="panel" style="max-width:280px">${hd(3, '', 'En rubrik i ett kort')}<p style="margin-top:6px;line-height:${v}">${PS} Den har en mening till.</p></div>`)])),
  );
  gq('bildtext').push(
    Q('tx-bildtext-justering', 'Hur ska bildtexten ställas?', [
      ['Vänsterställd', fig('text-align:left')],
      ['Centrerad', fig('text-align:center')],
    ]),
  );
  gq('etiketter').push(
    Q('tx-tabellhuvud', 'Hur ska kolumnrubriker i en tabell se ut?', [
      ['Små versaler, grå', pad(tbl('font-size:11px;text-transform:uppercase;letter-spacing:0.07em;color:var(--smuted);font-weight:600'))],
      ['Meningsform, halvfet', pad(tbl('font-size:14px;font-weight:600'))],
      ['Meningsform, grå', pad(tbl('font-size:13px;color:var(--smuted);font-weight:500'))],
    ]),
  );
  gq('siffror').push(
    Q('tx-belopp-justering', 'Hur ska belopp i en tabell ställas?', [
      ['Högerställda', numTable('font-variant-numeric:tabular-nums')],
      ['Vänsterställda', numTable('font-variant-numeric:tabular-nums').replace(/justify-content:space-between/g, 'justify-content:flex-start;gap:0').replace(/<span>(Januari|Februari|Mars|April)<\/span>/g, '<span style="width:110px">$1</span>')],
    ]),
    Q('tx-datum-relativ', 'Hur ska en nyligen inträffad tidpunkt skrivas?', [
      ['Relativt (för 2 timmar sedan)', dt('För 2 timmar sedan')],
      ['Idag 07.30', dt('Idag 07.30')],
      ['Datum och tid (24 nov 07.30)', dt('24 nov 07.30')],
    ]),
  );

  gq('etiketter').push(
    Q('tx-etikett-kolon', 'Ska etiketter avslutas med kolon?', [
      ['Utan kolon', pad(`<div class="stack">${fld()}${fld({ label: 'Telefon' })}</div>`)],
      ['Med kolon', pad(`<div class="stack">${fld({ label: 'E-post:' })}${fld({ label: 'Telefon:' })}</div>`)],
    ]),
  );
  gq('siffror').push(
    Q('tx-postnummer', 'Hur ska postnummer skrivas?', [
      ['Med mellanrum (123 45)', dt('123&nbsp;45 Ort')],
      ['Utan mellanrum (12345)', dt('12345 Ort')],
    ]),
    Q('tx-ellips', 'Vilket tecken ska användas för uteslutning (…)?', [
      ['Ellipstecken …', pad(p('Läs mer om hur det går till…', 'font-size:20px'))],
      ['Tre punkter ...', pad(p('Läs mer om hur det går till...', 'font-size:20px'))],
    ]),
  );

  /*NEXT*/

  window.QZ.part({
    key: 'text',
    fonts: ['Inter:wght@300;400;500;600;700;800'],
    groups,
  });
})();
