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

  /*NEXT*/

  window.QZ.part({
    key: 'text',
    fonts: ['Inter:wght@300;400;500;600;700;800'],
    groups,
  });
})();
