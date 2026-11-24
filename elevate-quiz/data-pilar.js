/* Elevate designquiz: Pilar och småbitar (nyckel pilar, prefix pi-).
   Frågorna byggs med små generatorer. Varje fråga visar samma detalj i varianter
   där bara den egenskap frågan gäller skiljer sig. */
(function () {
  // ---------- Ikoner ----------
  const PATHS = {
    arrow: 'M4 12h16|M14 6l6 6-6 6',
    arrowS: 'M5 12h14|M15 8l4 4-4 4',
    arrowL: 'M20 12H4|M10 6l-6 6 6 6',
    arrowD: 'M12 4v16|M6 14l6 6 6-6',
    arrowU: 'M12 20V4|M6 10l6-6 6 6',
    chev: 'M9 5l7 7-7 7',
    chevL: 'M15 5l-7 7 7 7',
    chevD: 'M5 9l7 7 7-7',
    chevU: 'M5 15l7-7 7 7',
    dchev: 'M5 6l6 6-6 6|M12 6l6 6-6 6',
    dchevD: 'M6 5l6 6 6-6|M6 12l6 6 6-6',
    diag: 'M7 17L17 7|M9 7h8v8',
    long: 'M2 12h35|M31 6l6 6-6 6',
    longD: 'M12 2v35|M6 31l6 6 6-6',
    plus: 'M12 5v14|M5 12h14',
    minus: 'M5 12h14',
    x: 'M6.5 6.5l11 11|M17.5 6.5l-11 11',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    ext: 'M14 4h6v6|M20 4l-9 9|M19 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H10',
    updown: 'M7 9l5-5 5 5|M7 15l5 5 5-5',
    bag: 'M6 8h12l-1 12H7L6 8z|M9 8V6a3 3 0 0 1 6 0v2',
    bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z|M10 20.5a2 2 0 0 0 4 0',
    star: 'M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M12 11v5|M12 7.5v.01',
    help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3|M12 17v.01',
    trash: 'M4 7h16|M9 7V5h6v2|M6 7l1 13h10l1-13',
    tag: 'M3 12V4h8l9 9-8 8-9-9z|M7.5 7.5v.01',
    pin: 'M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z|M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M12 7v5l3 2',
    cal: 'M4 6h16v14H4z|M4 10h16|M8 3v4|M16 3v4',
    bolt: 'M13 3L5 14h6l-1 7 8-11h-6l1-7z',
    dots: 'M5 12h.01|M12 12h.01|M19 12h.01'
  };
  const WIDE = { long: '0 0 40 24', longD: '0 0 24 40' };
  // a(namn, {s: storlek, w: linje i px, cap, join, fill, st: extra stil, c: färg})
  function a(k, o = {}) {
    const s = o.s || '1em', w = o.w == null ? 2 : o.w;
    const vb = WIDE[k] || '0 0 24 24';
    const wd = k === 'long' ? `calc(${s} * 1.67)` : s, ht = k === 'longD' ? `calc(${s} * 1.67)` : s;
    const filled = k === 'tri' || k === 'triD' || o.fill;
    let inner;
    if (k === 'tri') inner = '<path d="M8.5 5.5l9 6.5-9 6.5z"/>';
    else if (k === 'triD') inner = '<path d="M5.5 8.5l6.5 9 6.5-9z"/>';
    else inner = PATHS[k].split('|').map(d => `<path vector-effect="non-scaling-stroke" d="${d}"/>`).join('');
    const fill = k === 'tri' || k === 'triD' ? 'currentColor' : (o.fill || 'none');
    const stroke = k === 'tri' || k === 'triD' ? 'none' : 'currentColor';
    return `<svg viewBox="${vb}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="${o.cap || 'round'}" stroke-linejoin="${o.join || 'round'}" aria-hidden="true" style="width:${wd};height:${ht};flex:0 0 auto;display:inline-block;vertical-align:middle${o.c ? ';color:' + o.c : ''}${o.st ? ';' + o.st : ''}">${inner}</svg>`;
  }

  // ---------- Små byggstenar ----------
  const pad = (x, st = '') => `<div class="pad"${st ? ` style="${st}"` : ''}>${x}</div>`;
  const cen = (x, st = '') => `<div class="pad" style="display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;${st}">${x}</div>`;
  const lk = (t, after = '', before = '', st = '') => `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;${st}">${before}${t}${after}</span>`;
  const sb = (t, after = '', st = '', cls = 'sb') => `<span class="${cls}"${st ? ` style="${st}"` : ''}>${t}${after}</span>`;
  const panel = (x, st = '') => `<div class="panel"${st ? ` style="${st}"` : ''}>${x}</div>`;
  const box = (st = '') => `<div style="background:var(--accent);border-radius:var(--rc);aspect-ratio:4/3;${st}"></div>`;
  const line = (w = '100%', h = 10, st = '') => `<div style="height:${h}px;width:${w};max-width:100%;background:var(--accent);border-radius:4px;${st}"></div>`;
  const txt = 'Kort text som beskriver innehållet i två rader.';
  const Q = (id, q, opts, layout = 'grid') => ({ id, q, layout, opts: opts.map(([l, h]) => (h == null ? { l } : { l, h })) });
  const G = (key, title, questions) => ({ key, title, questions });
  const reduce = sel => `@media (prefers-reduced-motion: reduce){${sel}{animation:none!important;transition:none!important}}`;

  // Klickbart kort med rubrik och valfri detalj
  const card = (detail = '', st = '') => `<div class="pad"><div class="panel" style="position:relative;display:flex;flex-direction:column;gap:6px;${st}"><div class="h h3">Rubrik på kortet</div><p class="muted small">${txt}</p>${detail}</div></div>`;

  // Listrader med detalj till höger
  const rows = right => pad(`<div class="panel" style="padding:4px 16px">${['Inställningar', 'Betalning', 'Adress'].map((t, i) => `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span>${t}</span>${right}</div>`).join('')}</div>`);

  const groups = [];

  // =====================================================================
  // PILARNAS FORM
  // =====================================================================
  const forms = [
    ['Pil med skaft →', 'arrow'],
    ['Chevron ›', 'chev'],
    ['Triangel ▸', 'tri'],
    ['Dubbel chevron »', 'dchev'],
    ['Diagonal pil ↗', 'diag'],
    ['Lång tunn pil', 'long']
  ];
  groups.push(G('pil-form', 'Pilarnas form', [
    Q('pi-form-lasmer', 'Vilken pil ska sitta efter en "Läs mer"-länk?',
      forms.map(([l, k]) => [l, cen(lk('Läs mer', a(k, { s: k === 'long' ? '1em' : '1.05em', w: k === 'long' ? 1.25 : 2 })))])),
    Q('pi-form-knapp', 'Vilken pil ska sitta i en primärknapp?',
      [['Pil med skaft →', 'arrow'], ['Chevron ›', 'chev'], ['Lång tunn pil', 'long'], ['Diagonal pil ↗', 'diag'], ['Ingen pil', '']].map(([l, k]) => [l, cen(sb('Fortsätt', k ? a(k, { s: '18px', w: k === 'long' ? 1.5 : 2 }) : ''))])),
    Q('pi-form-lista', 'Vilken pil ska sitta till höger i en klickbar listrad?',
      [['Chevron ›', 'chev'], ['Pil med skaft →', 'arrow'], ['Triangel ▸', 'tri'], ['Ingen pil', '']].map(([l, k]) => [l, rows(k ? a(k, { s: '18px', c: 'var(--smuted)' }) : '')])),
    Q('pi-form-kort', 'Vilken pil ska visa att ett helt kort är klickbart?',
      [['Pil med skaft →', 'arrow'], ['Chevron ›', 'chev'], ['Diagonal pil ↗', 'diag'], ['Ingen pil', '']].map(([l, k]) => [l, card(k ? `<div style="position:absolute;top:18px;right:18px;color:var(--brand)">${a(k, { s: '20px' })}</div>` : '', 'padding-right:46px')])),
    Q('pi-form-huvud', 'Hur ska pilhuvudet se ut på en pil med skaft?', [
      ['Öppen vinkel, normal', 'M4 12h16|M14 6l6 6-6 6'],
      ['Liten öppen vinkel', 'M4 12h16|M16 8l4 4-4 4'],
      ['Stor öppen vinkel', 'M4 12h16|M12 4l8 8-8 8'],
      ['Fylld triangel', null]
    ].map(([l, d]) => {
      const svgx = d ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:56px;height:56px">${d.split('|').map(p => `<path vector-effect="non-scaling-stroke" d="${p}"/>`).join('')}</svg>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:56px;height:56px"><path d="M4 12h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M14 7l7 5-7 5z" fill="currentColor"/></svg>`;
      return [l, cen(`<span style="color:var(--sink)">${svgx}</span>${lk('Läs mer', svgx.replace(/56px/g, '1.05em'))}`)];
    })),
    Q('pi-form-chevronvinkel', 'Hur spetsig ska en chevron vara?', [
      ['Trubbig chevron', 'M10 4l5 8-5 8'], ['Rät vinkel', 'M9 5l7 7-7 7'], ['Spetsig chevron', 'M8 8l8 4-8 4']
    ].map(([l, d]) => {
      const s = sz => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${sz};height:${sz};flex:0 0 auto"><path vector-effect="non-scaling-stroke" d="${d}"/></svg>`;
      return [l, cen(`${s('52px')}<span style="display:inline-flex;align-items:center;gap:8px">Inställningar ${s('18px')}</span>`)];
    })),
    Q('pi-form-andar', 'Ska pilarnas linjeändar vara rundade eller raka?', [
      ['Rundade ändar', 'round', 'round'], ['Raka ändar och spetsiga hörn', 'butt', 'miter']
    ].map(([l, cap, join]) => [l, cen(`${a('arrow', { s: '52px', w: 3, cap, join })}${a('chev', { s: '52px', w: 3, cap, join })}${lk('Läs mer', a('arrow', { s: '1.05em', cap, join }))}`)])),
    Q('pi-form-tecken', 'Ska pilen vara ett tecken i typsnittet eller en ritad ikon?', [
      ['Typsnittets tecken →', lk('Läs mer', ' →', '', 'gap:0')],
      ['Ritad pil (ikon)', lk('Läs mer', a('arrow', { s: '1.05em' }))]
    ].map(([l, h]) => [l, cen(`<div class="stack" style="align-items:center;gap:14px">${h}<span class="sb">Fortsätt${h.includes('<svg') ? a('arrow', { s: '18px' }) : '<span>→</span>'}</span></div>`)])),
    Q('pi-form-langd', 'Hur lång ska pilen med skaft vara i en länk?', [
      ['Kort pil', 'M8 12h10|M14 8l4 4-4 4', '1.05em'],
      ['Normal pil', 'M4 12h16|M14 6l6 6-6 6', '1.05em'],
      ['Lång tunn pil', 'M2 12h35|M31 6l6 6-6 6', 'long']
    ].map(([l, d, s]) => {
      const vb = s === 'long' ? '0 0 40 24' : '0 0 24 24', w = s === 'long' ? 'calc(1.05em * 1.67)' : '1.05em';
      return [l, cen(lk('Se alla', `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="${s === 'long' ? 1.25 : 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${w};height:1.05em;flex:0 0 auto">${d.split('|').map(p => `<path vector-effect="non-scaling-stroke" d="${p}"/>`).join('')}</svg>`))];
    })),
    Q('pi-form-ring', 'Ska pilen i en länk ha en form runt sig?', [
      ['Bara pilen', ''],
      ['Pil i tunn ring', 'border:1.5px solid currentColor;border-radius:50%'],
      ['Pil i fylld cirkel', 'background:var(--brand);color:#fff;border-radius:50%'],
      ['Pil i rundad fyrkant', 'background:var(--brand);color:#fff;border-radius:7px']
    ].map(([l, st]) => [l, cen(lk('Läs mer', st ? `<span style="display:inline-grid;place-items:center;width:28px;height:28px;${st}">${a('arrow', { s: '15px' })}</span>` : a('arrow', { s: '1.05em' }), '', 'gap:10px'))])),
    Q('pi-form-ner', 'Hur ska en pil som uppmanar att scrolla ner se ut?',
      [['Chevron ner', 'chevD', '28px'], ['Pil med skaft ner', 'arrowD', '28px'], ['Dubbel chevron ner', 'dchevD', '28px'], ['Lång tunn pil ner', 'longD', '24px']].map(([l, k, s]) => [l, cen(`<div class="stack" style="align-items:center;gap:8px"><span class="small muted">Scrolla</span>${a(k, { s, w: k === 'longD' ? 1.25 : 2 })}</div>`)])),
    Q('pi-form-upp', 'Hur ska knappen "Till toppen" se ut?', [
      ['Rund knapp med pil upp', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--brand);color:#fff">${a('arrowU', { s: '20px' })}</span>`],
      ['Rund knapp med chevron upp', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--brand);color:#fff">${a('chevU', { s: '20px' })}</span>`],
      ['Rundad fyrkant med chevron', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:var(--rb);background:var(--brand);color:#fff">${a('chevU', { s: '20px' })}</span>`],
      ['Textlänk "Till toppen ↑"', lk('Till toppen', a('arrowU', { s: '1em' }))]
    ].map(([l, h]) => [l, pad(`<div style="display:flex;justify-content:flex-end;align-items:flex-end;min-height:90px">${h}</div>`)]))
  ]));

  // =====================================================================
  // TJOCKLEK OCH STORLEK
  // =====================================================================
  groups.push(G('pil-storlek', 'Pilarnas tjocklek och storlek', [
    Q('pi-tj-lank', 'Hur tjock ska pilen i en textlänk vara?',
      [['Tunn linje 1,25 px', 1.25], ['Normal linje 1,75 px', 1.75], ['Kraftig linje 2,5 px', 2.5]].map(([l, w]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.05em', w })) + lk('Visa alla', a('chev', { s: '1.05em', w })))])),
    Q('pi-tj-knapp', 'Hur tjock ska pilen i en knapp vara?',
      [['Tunn linje 1,5 px', 1.5], ['Normal linje 2 px', 2], ['Kraftig linje 2,5 px', 2.5]].map(([l, w]) => [l, cen(sb('Fortsätt', a('arrow', { s: '18px', w })) + sb('Fortsätt', a('arrow', { s: '18px', w }), '', 'sb2'))])),
    Q('pi-tj-lankstorlek', 'Hur stor ska pilen vara jämfört med länktexten?',
      [['Mindre än texten', '0.8em'], ['Lika stor som texten', '1.05em'], ['Större än texten', '1.35em']].map(([l, s]) => [l, cen(lk('Läs mer', a('arrow', { s })))])),
    Q('pi-tj-listchevron', 'Hur stor ska chevronen i en listrad vara?',
      [['Liten 14 px', '14px'], ['Mellan 18 px', '18px'], ['Stor 22 px', '22px']].map(([l, s]) => [l, rows(a('chev', { s, c: 'var(--smuted)' }))])),
    Q('pi-tj-listfarg', 'Vilken färg ska chevronen i en listrad ha?',
      [['Samma som texten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)'], ['Ljusgrå', 'rgba(26,28,30,.32)'], ['Märkesfärgen', 'var(--brand)']].map(([l, c]) => [l, rows(a('chev', { s: '18px', c }))])),
    Q('pi-tj-avstand', 'Hur långt från texten ska pilen sitta?',
      [['Tätt, 4 px', 4], ['Normalt, 8 px', 8], ['Luftigt, 12 px', 12]].map(([l, g]) => [l, cen(`<div class="stack" style="align-items:center;gap:14px">${lk('Läs mer', a('arrow', { s: '1.05em' }), '', `gap:${g}px`)}${sb('Fortsätt', a('arrow', { s: '18px' }), `gap:${g}px`)}</div>`)])),
    Q('pi-tj-pilfarg', 'Vilken färg ska pilen i en textlänk ha?',
      [['Samma som länktexten', 'var(--brand)'], ['Mörk som brödtexten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)']].map(([l, c]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.05em', c })))]))
  ]));

  // =====================================================================
  // PILAR I LÄNKAR OCH KNAPPAR
  // =====================================================================
  groups.push(G('pil-lankar', 'Pilar i länkar och knappar', [
    Q('pi-lank-placering', 'Var ska pilen sitta i en "Läs mer"-länk?', [
      ['Efter texten', lk('Läs mer', a('arrow', { s: '1.05em' }))],
      ['Före texten', lk('Läs mer', '', a('arrow', { s: '1.05em' }))],
      ['Ingen pil', lk('Läs mer')]
    ].map(([l, h]) => [l, pad(`<div class="stack"><div class="h h3">Rubrik på avsnittet</div><p class="muted">${txt}</p>${h}</div>`)])),
    Q('pi-lank-understrykning', 'Ska en "Läs mer"-länk med pil vara understruken?', [
      ['Ingen understrykning', 'text-decoration:none'],
      ['Bara texten understruken', 'text-decoration:underline;text-underline-offset:4px'],
      ['Linje under text och pil', 'border-bottom:1.5px solid currentColor;padding-bottom:3px']
    ].map(([l, st]) => [l, cen(st.startsWith('border') ? lk('Läs mer', a('arrow', { s: '1.05em' }), '', st) : `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600"><span style="${st}">Läs mer</span>${a('arrow', { s: '1.05em' })}</span>`)])),
    Q('pi-lank-versaler', 'Hur ska texten i en pil-länk skrivas?', [
      ['Vanlig skrift', ''],
      ['Versaler med spärrning', 'text-transform:uppercase;letter-spacing:.08em;font-size:13px']
    ].map(([l, st]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.1em' }), '', st))])),
    Q('pi-lank-lista', 'Hur ska pilarna sitta i en lista med länkar?', [
      ['Pil längst till höger', 'end'], ['Pil direkt efter texten', 'after'], ['Pil före texten', 'before'], ['Ingen pil', 'none']
    ].map(([l, m]) => [l, pad(`<div class="panel" style="padding:4px 16px">${['Priser', 'Vanliga frågor', 'Kontakt'].map((t, i) => {
      const arr = a('arrow', { s: '1.05em' });
      const inner = m === 'end' ? `<span>${t}</span>${arr}` : m === 'after' ? `<span style="display:inline-flex;align-items:center;gap:6px">${t}${arr}</span>` : m === 'before' ? `<span style="display:inline-flex;align-items:center;gap:8px">${arr}${t}</span>` : `<span>${t}</span>`;
      return `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;color:var(--brand);font-weight:600;${i ? 'border-top:1px solid var(--sline)' : ''}">${inner}</div>`;
    }).join('')}</div>`)])),
    Q('pi-lank-lopande', 'Ska länkar inne i löptext ha en pil?', [
      ['Bara understrykning', '<span class="link">våra villkor</span>'],
      ['Understrykning och pil', `<span class="link">våra villkor</span><span style="color:var(--brand)"> ${a('arrow', { s: '.95em' })}</span>`],
      ['Pil utan understrykning', `<span style="color:var(--brand);font-weight:600">våra villkor ${a('arrow', { s: '.95em' })}</span>`]
    ].map(([l, h]) => [l, pad(`<p>Innan du bokar kan du läsa ${h} och hur avbokning går till.</p>`)])),
    Q('pi-knapp-placering', 'Var ska pilen sitta i en bred knapp?', [
      ['Direkt efter texten', sb('Fortsätt', a('arrow', { s: '18px' }), 'width:100%')],
      ['Längst till höger', sb('Fortsätt', a('arrow', { s: '18px' }), 'width:100%;justify-content:space-between')],
      ['Ingen pil', sb('Fortsätt', '', 'width:100%')]
    ].map(([l, h]) => [l, pad(h)])),
    Q('pi-knapp-sekundar', 'Vilka knappar ska ha pil när två sitter bredvid varandra?', [
      ['Båda knapparna', sb('Boka tid', a('arrow', { s: '18px' })) + sb('Läs mer', a('arrow', { s: '18px' }), '', 'sb2')],
      ['Bara primärknappen', sb('Boka tid', a('arrow', { s: '18px' })) + sb('Läs mer', '', '', 'sb2')],
      ['Bara sekundärknappen', sb('Boka tid') + sb('Läs mer', a('arrow', { s: '18px' }), '', 'sb2')],
      ['Ingen av dem', sb('Boka tid') + sb('Läs mer', '', '', 'sb2')]
    ].map(([l, h]) => [l, pad(`<div class="row">${h}</div>`)])),
    Q('pi-knapp-pildel', 'Hur ska pilen sitta i knappen?', [
      ['Pil direkt efter texten', sb('Fortsätt', a('arrow', { s: '18px' }))],
      ['Pil i egen cirkel i knappen', sb('Fortsätt', `<span style="display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#fff;color:var(--brand);margin-right:-16px">${a('arrow', { s: '16px' })}</span>`)],
      ['Pil i egen ruta bredvid', `<span style="display:inline-flex;gap:3px">${sb('Fortsätt', '', 'border-top-right-radius:3px;border-bottom-right-radius:3px')}${sb('', a('arrow', { s: '18px' }), 'padding:0;width:48px;border-top-left-radius:3px;border-bottom-left-radius:3px')}</span>`]
    ].map(([l, h]) => [l, cen(h)])),
    Q('pi-knapp-barapil', 'Hur ska skicka-knappen i ett sökfält se ut?', [
      ['Rund knapp med pil', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--brand);color:#fff;flex:0 0 auto">${a('arrow', { s: '18px' })}</span>`],
      ['Rundad fyrkant med pil', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;border-radius:6px;background:var(--brand);color:#fff;flex:0 0 auto">${a('arrow', { s: '18px' })}</span>`],
      ['Bara pil utan bakgrund', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;color:var(--brand);flex:0 0 auto">${a('arrow', { s: '20px' })}</span>`],
      ['Textknapp "Sök"', `<span class="sb" style="height:38px;padding:0 16px;font-size:14px;border-radius:6px">Sök</span>`]
    ].map(([l, h]) => [l, pad(`<div class="inp" style="padding:0 5px 0 14px;justify-content:space-between;gap:8px"><span class="muted" style="overflow:hidden;text-overflow:ellipsis">Sök</span>${h}</div>`)]))
  ]));

  // =====================================================================
  // KARUSELLKNAPPAR
  // =====================================================================
  // Rad med platshållarkort och två knappar. pos: 'sides' | 'top' | 'bottomc' | 'bottomr'
  const rb = (k, st, s = 40, ic = '18px') => `<span style="display:inline-grid;place-items:center;width:${s}px;height:${s}px;flex:0 0 auto;${st}">${a(k, { s: ic })}</span>`;
  const KB = {
    rundfylld: 'border-radius:50%;background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06)',
    rundfyllning: 'border-radius:50%;background:var(--brand);color:#fff',
    fyrkant: 'border-radius:8px;background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06)',
    kontur: 'border-radius:50%;border:1.5px solid var(--sline);color:var(--sink);background:transparent',
    bara: 'color:var(--sink)'
  };
  function kar(prev, next, pos = 'top') {
    const tiles = `<div style="display:flex;gap:10px;overflow:hidden">${box('flex:0 0 58%')}${box('flex:0 0 58%')}</div>`;
    const btns = `<div style="display:flex;gap:8px">${prev}${next}</div>`;
    if (pos === 'top') return pad(`<div class="stack" style="gap:12px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div class="h h3">Rubrik</div>${btns}</div>${tiles}</div>`);
    if (pos === 'sides') return pad(`<div class="stack" style="gap:12px"><div class="h h3">Rubrik</div><div style="position:relative">${tiles}<div style="position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 8px;pointer-events:none">${prev}${next}</div></div></div>`);
    const just = pos === 'bottomc' ? 'center' : 'flex-end';
    return pad(`<div class="stack" style="gap:12px"><div class="h h3">Rubrik</div>${tiles}<div style="display:flex;justify-content:${just}">${btns}</div></div>`);
  }
  const kpair = (st, s, ic, k = 'chev') => [rb(k === 'chev' ? 'chevL' : 'arrowL', st, s, ic), rb(k, st, s, ic)];
  groups.push(G('pil-karusell', 'Karusellknappar', [
    Q('pi-kar-form', 'Hur ska karusellens pilknappar se ut?', [
      ['Rund vit knapp med skugga', KB.rundfylld], ['Rund knapp i märkesfärg', KB.rundfyllning], ['Rundad fyrkant', KB.fyrkant], ['Rund konturknapp', KB.kontur], ['Bara pil utan bakgrund', KB.bara]
    ].map(([l, st]) => [l, kar(...kpair(st), 'top')])),
    Q('pi-kar-placering', 'Var ska karusellens pilknappar sitta?', [
      ['Över bilderna, på sidorna', 'sides'], ['Uppe till höger vid rubriken', 'top'], ['Under raden, i mitten', 'bottomc'], ['Under raden, till höger', 'bottomr']
    ].map(([l, p]) => [l, kar(...kpair(KB.rundfylld), p)])),
    Q('pi-kar-storlek', 'Hur stora ska karusellknapparna vara?',
      [['Små, 32 px', 32, '16px'], ['Mellan, 40 px', 40, '18px'], ['Stora, 48 px', 48, '20px']].map(([l, s, ic]) => [l, kar(...kpair(KB.rundfylld, s, ic), 'top')])),
    Q('pi-kar-pil', 'Vilken pil ska karusellknapparna ha?',
      [['Chevron ‹ ›', 'chev'], ['Pil med skaft ← →', 'arrow']].map(([l, k]) => [l, kar(...kpair(KB.rundfylld, 40, '18px', k), 'top')])),
    Q('pi-kar-inaktiv', 'Hur ska bakåtknappen se ut när karusellen står i början?', [
      ['Nedtonad', `<span style="opacity:.4;display:inline-flex">${rb('chevL', KB.rundfylld)}</span>`],
      ['Dold', ''],
      ['Lika tydlig som framåt', rb('chevL', KB.rundfylld)]
    ].map(([l, prev]) => [l, kar(prev, rb('chev', KB.rundfylld), 'top')])),
    Q('pi-kar-glapp', 'Hur nära varandra ska de två pilknapparna sitta?',
      [['Tätt ihop, 4 px', 4], ['Normalt, 8 px', 8], ['Luftigt, 16 px', 16]].map(([l, g]) => [l, kar(...kpair(KB.kontur), 'top').replace('display:flex;gap:8px', `display:flex;gap:${g}px`)])),
    Q('pi-kar-skugga', 'Hur ska pilknappar ovanpå en bild se ut?', [
      ['Vit knapp med skugga', 'background:#fff;color:var(--sink);box-shadow:0 2px 10px rgba(0,0,0,.25)'],
      ['Vit knapp utan skugga', 'background:#fff;color:var(--sink)'],
      ['Mörk genomskinlig knapp', 'background:rgba(0,0,0,.45);color:#fff'],
      ['Bara vit pil med skugga', 'color:#fff;filter:drop-shadow(0 1px 3px rgba(0,0,0,.6))']
    ].map(([l, st]) => [l, pad(`<div style="position:relative;border-radius:var(--rc);overflow:hidden"><img class="pic" src="img/stadsgata.jpg" alt="Gata i en stad" style="border-radius:0"><div style="position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 10px">${rb('chevL', 'border-radius:50%;' + st)}${rb('chev', 'border-radius:50%;' + st)}</div></div>`)]))
  ]));

  // =====================================================================
  // DRAGSPEL OCH RULLGARDIN
  // =====================================================================
  const acc = (closedIcon, openIcon, left = false, st = '') => {
    const row = (t, ic, open) => `<div style="padding:14px 0;${st}"><div style="display:flex;align-items:center;gap:12px;${left ? '' : 'justify-content:space-between'};font-weight:600">${left ? ic + `<span>${t}</span>` : `<span>${t}</span>` + ic}</div>${open ? `<p class="muted small" style="margin-top:6px;${left ? 'padding-left:32px' : ''}">${txt}</p>` : ''}</div>`;
    return pad(`<div class="panel" style="padding:2px 16px">${row('Hur bokar jag?', openIcon, true)}<div class="divider"></div>${row('Kan jag avboka?', closedIcon, false)}</div>`);
  };
  const ic = (k, st = '') => `<span style="display:inline-grid;place-items:center;flex:0 0 auto;${st}">${a(k, { s: '20px' })}</span>`;
  groups.push(G('pil-dragspel', 'Dragspel och rullgardin', [
    Q('pi-drag-ikon', 'Vilken ikon ska ett dragspel ha?', [
      ['Chevron ner', 'chevD', 'chevU'], ['Plus och minus', 'plus', 'minus'], ['Pil med skaft ner', 'arrowD', 'arrowU'], ['Triangel', 'tri', 'triD']
    ].map(([l, c, o]) => [l, acc(ic(c), ic(o))])),
    Q('pi-drag-oppet', 'Hur ska ikonen visa att en rad är öppen?', [
      ['Chevron vänds uppåt', ic('chevD'), ic('chevU')],
      ['Plus blir minus', ic('plus'), ic('minus')],
      ['Plus vrids till kryss', ic('plus'), ic('x')],
      ['Chevron höger blir ner', ic('chev'), ic('chevD')]
    ].map(([l, c, o]) => [l, acc(c, o)])),
    Q('pi-drag-placering', 'Var ska dragspelets ikon sitta?',
      [['Till höger', false], ['Till vänster, före texten', true]].map(([l, left]) => [l, acc(ic('chevD'), ic('chevU'), left)])),
    Q('pi-drag-platta', 'Ska dragspelets ikon ha en form runt sig?', [
      ['Bara ikonen', ''],
      ['I tunn ring', 'width:30px;height:30px;border-radius:50%;border:1.5px solid var(--sline)'],
      ['I tonad cirkel', 'width:30px;height:30px;border-radius:50%;background:var(--tint);color:var(--brand)'],
      ['I rundad fyrkant', 'width:30px;height:30px;border-radius:7px;background:var(--tint);color:var(--brand)']
    ].map(([l, st]) => [l, acc(ic('plus', st), ic('minus', st))])),
    Q('pi-drag-rorelse', 'Hur ska chevronen röra sig när raden öppnas?', [
      ['Vrids mjukt 180°', 'pi-drag-rorelse-a', '@keyframes pi-drag-rorelse-a{0%,35%{transform:rotate(0)}50%,85%{transform:rotate(180deg)}100%{transform:rotate(0)}}', 'chevD'],
      ['Byter direkt utan rörelse', 'pi-drag-rorelse-b', '@keyframes pi-drag-rorelse-b{0%,49%{transform:rotate(0)}50%,99%{transform:rotate(180deg)}100%{transform:rotate(0)}}', 'chevD'],
      ['Vrids 90° från höger till ner', 'pi-drag-rorelse-c', '@keyframes pi-drag-rorelse-c{0%,35%{transform:rotate(0)}50%,85%{transform:rotate(90deg)}100%{transform:rotate(0)}}', 'chev']
    ].map(([l, c, kf, k]) => [l, `<style>${kf}.${c}{display:inline-grid;animation:${c} 2.8s ${c.endsWith('b') ? 'step-end' : 'cubic-bezier(.4,0,.2,1)'} infinite}${reduce('.' + c)}</style>` + pad(`<div class="panel" style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;font-weight:600"><span>Hur bokar jag?</span><span class="${c}">${a(k, { s: '20px' })}</span></div>`)])),
    Q('pi-rull-ikon', 'Vilken pil ska en rullgardinslista ha?', [
      ['Chevron ner', a('chevD', { s: '18px' })], ['Liten triangel', a('triD', { s: '14px' })], ['Dubbelpil upp och ner', a('updown', { s: '18px' })], ['Pil med skaft ner', a('arrowD', { s: '18px' })]
    ].map(([l, i]) => [l, pad(`<div class="fld"><span class="lbl">Antal personer</span><div class="inp" style="justify-content:space-between;gap:8px"><span>2 personer</span><span style="color:var(--smuted);display:inline-flex">${i}</span></div></div>`)])),
    Q('pi-rull-avskild', 'Ska pilen i rullgardinen vara avskild från texten?', [
      ['Bara pilen', ''], ['Med tunn avdelare', 'border-left:1px solid var(--sline);padding-left:12px;height:24px'], ['I egen grå ruta', 'background:var(--ground);margin-right:-14px;padding:0 14px;height:100%;border-left:1px solid var(--sline)']
    ].map(([l, st]) => [l, pad(`<div class="fld"><span class="lbl">Antal personer</span><div class="inp" style="justify-content:space-between;gap:8px"><span>2 personer</span><span style="color:var(--smuted);display:inline-flex;align-items:center;${st}">${a('chevD', { s: '18px' })}</span></div></div>`)])),
    Q('pi-rull-textmeny', 'Hur ska en liten rullgardin i löptext se ut, som "Sortera"?', [
      ['Text och chevron', `<span style="display:inline-flex;align-items:center;gap:4px;font-weight:600">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['Text, chevron och understrykning', `<span style="display:inline-flex;align-items:center;gap:4px;font-weight:600;border-bottom:1.5px solid currentColor">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['I en liten ruta med kant', `<span style="display:inline-flex;align-items:center;gap:6px;font-weight:600;border:1px solid var(--sline);border-radius:var(--rf);padding:5px 10px;background:var(--field)">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['I en pill med kant', `<span class="chip" style="gap:6px;font-weight:600">Populärast ${a('chevD', { s: '16px' })}</span>`]
    ].map(([l, h]) => [l, cen(`<span class="muted">Sortera:</span>${h}`, 'gap:8px')]))
  ]));

  // =====================================================================
  // TILLBAKA, EXTERN LÄNK, BRÖDSMULOR, STEG OCH VISA FLER
  // =====================================================================
  const crumbs = (sep, sepSt = 'color:var(--smuted)') => cen(`<nav style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:14px"><span style="color:var(--brand)">Start</span><span style="${sepSt};display:inline-flex">${sep}</span><span style="color:var(--brand)">Tjänster</span><span style="${sepSt};display:inline-flex">${sep}</span><span style="font-weight:600">Rubrik</span></nav>`);
  groups.push(G('pil-nav', 'Tillbaka, externa länkar och brödsmulor', [
    Q('pi-tillbaka-form', 'Hur ska en "Tillbaka"-länk se ut?', [
      ['Chevron och text', lk('Tillbaka', '', a('chevL', { s: '1.05em' }), 'gap:4px')],
      ['Pil med skaft och text', lk('Tillbaka', '', a('arrowL', { s: '1.05em' }))],
      ['Pil i ring och text', lk('Tillbaka', '', `<span style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1.5px solid var(--sline)">${a('arrowL', { s: '15px' })}</span>`, 'gap:10px')],
      ['Bara text', lk('Tillbaka')]
    ].map(([l, h]) => [l, pad(`<div class="stack" style="gap:14px">${h}<div class="h h2">Rubrik på sidan</div></div>`)])),
    Q('pi-tillbaka-farg', 'Vilken färg ska "Tillbaka"-länken ha?', [
      ['Länkfärg', 'var(--brand)'], ['Mörk som texten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)']
    ].map(([l, c]) => [l, pad(`<div class="stack" style="gap:14px">${lk('Tillbaka', '', a('chevL', { s: '1.05em' }), `gap:4px;color:${c}`)}<div class="h h2">Rubrik på sidan</div></div>`)])),
    Q('pi-extern-ikon', 'Hur ska en länk till en annan webbplats markeras?', [
      ['Diagonal pil ↗', a('diag', { s: '.95em' })], ['Ruta med pil ut', a('ext', { s: '.95em' })], ['Pil med skaft →', a('arrow', { s: '.95em' })], ['Ingen markering', '']
    ].map(([l, i]) => [l, cen(`<div class="stack" style="gap:12px">${lk('Se karta', i, '', 'gap:5px')}<p>Läs mer i <span class="link">guiden${i ? ' ' + i : ''}</span>.</p></div>`)])),
    Q('pi-extern-storlek', 'Hur stor ska ikonen för extern länk vara?', [
      ['Liten och upphöjd', 'width:.7em;height:.7em;vertical-align:.35em'], ['Lika stor som texten', 'width:.95em;height:.95em;vertical-align:-.1em']
    ].map(([l, st]) => [l, pad(`<p>Läs mer i <span class="link">guiden</span><span style="color:var(--brand)"> ${a('diag', { s: '.95em', st })}</span> innan du bokar.</p>`)])),
    Q('pi-brod-tecken', 'Vilket tecken ska skilja brödsmulorna åt?', [
      ['Chevron ›', a('chev', { s: '14px' })], ['Snedstreck /', '/'], ['Pil →', a('arrow', { s: '14px' })], ['Punkt ·', '·']
    ].map(([l, s]) => [l, crumbs(s)])),
    Q('pi-brod-ton', 'Hur tydligt ska brödsmulornas skiljetecken synas?', [
      ['Lika mörkt som texten', 'color:var(--sink)'], ['Dämpad grå', 'color:var(--smuted)'], ['Mycket ljust', 'color:rgba(26,28,30,.3)']
    ].map(([l, st]) => [l, crumbs(a('chev', { s: '14px' }), st)])),
    Q('pi-steg-riktning', 'Hur ska ett stegflöde visa vägen mellan stegen?', [
      ['Chevron mellan stegen', 'chev'], ['Pil med skaft mellan', 'arrow'], ['Linje mellan stegen', 'line'], ['Pilformade block', 'blocks']
    ].map(([l, m]) => {
      const st = ['Välj', 'Uppgifter', 'Betala'];
      if (m === 'blocks') return [l, cen(`<div style="display:flex;width:100%;max-width:340px">${st.map((t, i) => `<span style="flex:1;min-width:0;text-align:center;font-size:13px;font-weight:600;padding:8px 6px 8px ${i ? 16 : 8}px;margin-left:${i ? -6 : 0}px;background:${i === 0 ? 'var(--brand)' : 'var(--tint)'};color:${i === 0 ? '#fff' : 'var(--sink)'};clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%${i ? ',10px 50%' : ''})">${t}</span>`).join('')}</div>`)];
      const sep = m === 'line' ? '<span style="flex:1;min-width:12px;height:1px;background:var(--sline)"></span>' : `<span style="color:var(--smuted);display:inline-flex">${a(m, { s: '16px' })}</span>`;
      return [l, cen(`<div style="display:flex;align-items:center;gap:10px;font-size:14px;width:100%;max-width:340px;justify-content:center">${st.map((t, i) => `<span style="${i === 0 ? 'font-weight:700' : 'color:var(--smuted)'};white-space:nowrap">${t}</span>`).join(sep)}</div>`)];
    })),
    Q('pi-nasta-foreg', 'Hur ska "Föregående" och "Nästa" längst ner på en sida se ut?', [
      ['Pilar och text', `${lk('Föregående', '', a('arrowL', { s: '1.05em' }))}${lk('Nästa', a('arrow', { s: '1.05em' }))}`],
      ['Chevrons och text', `${lk('Föregående', '', a('chevL', { s: '1.05em' }), 'gap:3px')}${lk('Nästa', a('chev', { s: '1.05em' }), '', 'gap:3px')}`],
      ['Bara text', `${lk('Föregående')}${lk('Nästa')}`],
      ['Runda pilknappar', `${rb('arrowL', KB.kontur)}${rb('arrow', KB.kontur)}`]
    ].map(([l, h]) => [l, pad(`<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;border-top:1px solid var(--sline);padding-top:16px">${h}</div>`)]))
  ]));

  // =====================================================================
  // PILENS RÖRELSE VID HOVER (visas som slinga)
  // =====================================================================
  // Varje alternativ: egen klass och keyframes. Slingan visar vila → hover → vila.
  const loop = (c, kf, dur = '2.4s', ease = 'cubic-bezier(.4,0,.2,1)') => `<style>@keyframes ${c}{${kf}}.${c}{display:inline-flex;animation:${c} ${dur} ${ease} infinite}${reduce('.' + c)}</style>`;
  const hoverNote = '<span class="small muted" style="display:block;text-align:center;margin-top:10px">Visar läget vid hover i en slinga</span>';
  groups.push(G('pil-hover', 'Pilens rörelse vid hover', [
    Q('pi-hv-lank', 'Hur ska pilen röra sig när man håller musen över "Läs mer"?', [
      ['Ingen rörelse', '', ''],
      ['Glider 4 px åt höger', 'pi-hv-lank-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}'],
      ['Glider 8 px åt höger', 'pi-hv-lank-c', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(8px)}100%{transform:translateX(0)}'],
      ['Tonas in från dold', 'pi-hv-lank-d', '0%,30%{opacity:0;transform:translateX(-6px)}45%,80%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(-6px)}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Läs mer', `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-skaft', 'Ska pilens skaft växa vid hover?', [
      ['Pilen står still', '', ''],
      ['Hela pilen flyttas', 'pi-hv-skaft-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(5px)}100%{transform:translateX(0)}'],
      ['Skaftet blir längre', 'pi-hv-skaft-c', '0%,30%{width:16px}45%,80%{width:26px}100%{width:16px}']
    ].map(([l, c, kf]) => {
      const arr = c === 'pi-hv-skaft-c'
        ? `<span class="${c}" style="position:relative;display:inline-block;height:16px;width:16px"><span style="position:absolute;left:0;right:1px;top:7px;height:2px;border-radius:2px;background:currentColor"></span><span style="position:absolute;right:1px;top:3px;width:9px;height:9px;border-top:2px solid currentColor;border-right:2px solid currentColor;border-radius:1px;transform:translate(0,.5px) rotate(45deg);transform-origin:center"></span></span>`
        : `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '16px' })}</span>`;
      return [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Se alla', arr)}${hoverNote}</div>`)];
    })),
    Q('pi-hv-knapp', 'Vad ska pilen i en knapp göra vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider åt höger', 'pi-hv-knapp-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}'],
      ['Glider ut och kommer tillbaka', 'pi-hv-knapp-c', '0%,30%{transform:translateX(0);opacity:1}40%{transform:translateX(14px);opacity:0}41%{transform:translateX(-14px);opacity:0}52%,100%{transform:translateX(0);opacity:1}'],
      ['Dyker upp vid hover', 'pi-hv-knapp-d', '0%,30%{max-width:0;opacity:0;margin-left:-8px}45%,80%{max-width:20px;opacity:1;margin-left:0}100%{max-width:0;opacity:0;margin-left:-8px}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${sb('Fortsätt', `<span class="${c}" style="display:inline-flex;overflow:hidden">${a('arrow', { s: '18px' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-hastighet', 'Hur snabbt ska pilen glida vid hover?', [
      ['Snabbt, 120 ms', 'pi-hv-hast-a', '.12s'], ['Mellan, 200 ms', 'pi-hv-hast-b', '.2s'], ['Långsamt, 350 ms', 'pi-hv-hast-c', '.35s']
    ].map(([l, c, d]) => {
      const ms = parseFloat(d) * 1000, T = 2400, p = v => (v / T * 100).toFixed(1) + '%';
      const kf = `0%,${p(800)}{transform:translateX(0)}${p(800 + ms)},${p(1800)}{transform:translateX(6px)}${p(1800 + ms)},100%{transform:translateX(0)}`;
      return [l, loop(c, kf, '2.4s', 'linear') + cen(`<div style="text-align:center">${lk('Läs mer', `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)];
    })),
    Q('pi-hv-kort', 'Vad ska hörnpilen på ett kort göra vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider snett uppåt', 'pi-hv-kort-b', '0%,30%{transform:translate(0,0)}45%,80%{transform:translate(3px,-3px)}100%{transform:translate(0,0)}', 'diag'],
      ['Vrids från → till ↗', 'pi-hv-kort-c', '0%,30%{transform:rotate(0)}45%,80%{transform:rotate(-45deg)}100%{transform:rotate(0)}', 'arrow'],
      ['Ringen fylls i', 'pi-hv-kort-d', '0%,30%{background:transparent;color:var(--brand)}45%,80%{background:var(--brand);color:#fff}100%{background:transparent;color:var(--brand)}', 'diag']
    ].map(([l, c, kf, k = 'diag']) => {
      const ring = c === 'pi-hv-kort-d';
      return [l, (c ? loop(c, kf) : '') + card(`<div style="position:absolute;top:14px;right:14px;color:var(--brand)"><span class="${c}" style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;${ring ? 'border:1.5px solid var(--brand)' : ''}">${a(k, { s: '18px' })}</span></div>`, 'padding-right:52px') + hoverNote];
    })),
    Q('pi-hv-karusell', 'Vad ska hända med en karusellknapp vid hover?', [
      ['Ingenting', '', ''],
      ['Bakgrunden mörknar', 'pi-hv-kar-b', '0%,30%{background:var(--box)}45%,80%{background:#E4E6E8}100%{background:var(--box)}'],
      ['Knappen fylls med märkesfärg', 'pi-hv-kar-c', '0%,30%{background:var(--box);color:var(--sink)}45%,80%{background:var(--brand);color:#fff}100%{background:var(--box);color:var(--sink)}'],
      ['Pilen glider lite', 'pi-hv-kar-d', '0%,30%{padding-left:0}45%,80%{padding-left:6px}100%{padding-left:0}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="display:flex;flex-direction:column;align-items:center"><div style="display:flex;gap:8px">${rb('chevL', KB.rundfylld)}<span class="${c}" style="display:inline-grid;place-items:center;width:40px;height:40px;${KB.rundfylld}">${a('chev', { s: '18px' })}</span></div>${hoverNote}</div>`)])),
    Q('pi-hv-tillbaka', 'Ska tillbakapilen röra sig vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider åt vänster', 'pi-hv-tb-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(-4px)}100%{transform:translateX(0)}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Tillbaka', '', `<span class="${c}" style="display:inline-flex">${a('arrowL', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-understrykning', 'Vad ska hända med texten i en pil-länk vid hover?', [
      ['Bara pilen rör sig', 'pi-hv-us-a', 'u0'],
      ['Understrykning dyker upp', 'pi-hv-us-b', 'u1'],
      ['Understrykning växer fram', 'pi-hv-us-c', 'u2']
    ].map(([l, c, m]) => {
      const arrC = c + '-p';
      const css = `<style>@keyframes ${arrC}{0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}}.${arrC}{display:inline-flex;animation:${arrC} 2.4s cubic-bezier(.4,0,.2,1) infinite}`
        + (m === 'u1' ? `@keyframes ${c}{0%,37%{text-decoration-color:transparent}38%,80%{text-decoration-color:currentColor}81%,100%{text-decoration-color:transparent}}.${c}{text-decoration:underline;text-underline-offset:4px;animation:${c} 2.4s step-end infinite}` : '')
        + (m === 'u2' ? `@keyframes ${c}{0%,30%{background-size:0 1.5px}45%,80%{background-size:100% 1.5px}100%{background-size:0 1.5px}}.${c}{background:linear-gradient(currentColor,currentColor) left bottom/0 1.5px no-repeat;padding-bottom:2px;animation:${c} 2.4s cubic-bezier(.4,0,.2,1) infinite}` : '')
        + reduce(`.${c},.${arrC}`) + '</style>';
      return [l, css + cen(`<div><span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600"><span class="${c}">Läs mer</span><span class="${arrC}">${a('arrow', { s: '1.05em' })}</span></span>${hoverNote}</div>`)];
    }))
  ]));

  // =====================================================================
  // ETIKETTER OCH MÄRKEN
  // =====================================================================
  const BADGE = 'display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;line-height:1;padding:5px 9px;white-space:nowrap;';
  const STY = {
    fylld: 'background:var(--brand);color:#fff;',
    tonad: 'background:var(--tint);color:var(--brand);',
    kontur: 'background:var(--box);color:var(--brand);box-shadow:inset 0 0 0 1px currentColor;',
    vit: 'background:#fff;color:var(--sink);'
  };
  const bdg = (t, st = '') => `<span style="${BADGE}border-radius:999px;${STY.fylld}${st}">${t}</span>`;
  // Produktkort med platshållarbild. tl = innehåll uppe till vänster på bilden osv.
  const pcard = ({ tl = '', tr = '', above = '', price = '', imgSt = '', inner = '' } = {}) => `<div class="pad"><div style="max-width:240px;margin:0 auto"><div style="position:relative;overflow:hidden;border-radius:var(--rc)">${box('border-radius:0;' + imgSt)}${tl ? `<div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;flex-wrap:wrap">${tl}</div>` : ''}${tr ? `<div style="position:absolute;top:10px;right:10px">${tr}</div>` : ''}${inner}</div><div style="padding-top:10px;display:flex;flex-direction:column;gap:4px">${above}<div style="font-weight:600">Produktnamn</div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="price">495 kr</span>${price}</div></div></div></div>`;
  groups.push(G('etiketter', 'Etiketter och märken', [
    Q('pi-et-form', 'Vilken form ska en etikett som "Nyhet" ha?', [
      ['Pill, helt rund', bdg('Nyhet')],
      ['Rundad fyrkant', bdg('Nyhet', 'border-radius:5px')],
      ['Skarpa hörn', bdg('Nyhet', 'border-radius:0')],
      ['Hörnband', 'band']
    ].map(([l, b]) => [l, b === 'band'
      ? pcard({ inner: `<div style="position:absolute;top:14px;left:-34px;width:120px;text-align:center;transform:rotate(-45deg);${BADGE}justify-content:center;${STY.fylld}">Nyhet</div>` })
      : pcard({ tl: b })])),
    Q('pi-et-stil', 'Hur ska en etikett vara färgad?', [
      ['Fylld', STY.fylld], ['Tonad', STY.tonad], ['Kontur', STY.kontur], ['Vit på bilden', STY.vit]
    ].map(([l, st]) => [l, pcard({ tl: `<span style="${BADGE}border-radius:999px;${st}">Populär</span>` })])),
    Q('pi-et-storlek', 'Hur stor ska etiketten vara?', [
      ['Liten, 11 px text', 'font-size:11px;padding:4px 7px'], ['Mellan, 12 px text', ''], ['Stor, 14 px text', 'font-size:14px;padding:6px 12px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-versaler', 'Ska texten i etiketter skrivas med versaler?', [
      ['Vanlig skrift', ''], ['Versaler med spärrning', 'text-transform:uppercase;letter-spacing:.07em;font-size:11px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-vikt', 'Hur fet ska texten i en etikett vara?', [
      ['Medium (500)', 'font-weight:500'], ['Halvfet (600)', 'font-weight:600'], ['Fet (700)', '']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-luft', 'Hur mycket luft ska det vara i etiketten?', [
      ['Tät', 'padding:3px 6px'], ['Normal', ''], ['Luftig', 'padding:7px 13px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-placering', 'Var ska etiketten sitta på ett kort?', [
      ['Uppe till vänster på bilden', { tl: bdg('Nyhet') }],
      ['Uppe till höger på bilden', { tr: bdg('Nyhet') }],
      ['Ovanför namnet, under bilden', { above: `<div>${bdg('Nyhet')}</div>` }],
      ['Bredvid priset', { price: bdg('Nyhet') }]
    ].map(([l, o]) => [l, pcard(o)])),
    Q('pi-et-inset', 'Hur långt in från bildens hörn ska etiketten sitta?', [
      ['Nära kanten, 6 px', 6], ['Normalt, 10 px', 10], ['Luftigt, 16 px', 16]
    ].map(([l, n]) => [l, pcard({ inner: `<div style="position:absolute;top:${n}px;left:${n}px">${bdg('Nyhet')}</div>` })])),
    Q('pi-et-flera', 'Hur ska två etiketter på samma kort sitta?', [
      ['Bredvid varandra', 'row'], ['Under varandra', 'col'], ['Bara den viktigaste', 'one']
    ].map(([l, m]) => [l, pcard({ inner: `<div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;${m === 'col' ? 'flex-direction:column;align-items:flex-start' : ''}">${bdg('Nyhet')}${m === 'one' ? '' : bdg('−20 %', 'background:var(--bad)')}</div>` })])),
    Q('pi-et-rabattfarg', 'Vilken färg ska en rabattetikett "−20 %" ha?', [
      ['Röd fylld', 'background:var(--bad);color:#fff'], ['Mörk fylld', 'background:var(--sink);color:#fff'], ['Märkesfärg', ''], ['Tonad röd', 'background:#FBE9E7;color:var(--bad)']
    ].map(([l, st]) => [l, pcard({ tl: bdg('−20 %', st) })])),
    Q('pi-et-rabattform', 'Hur ska en rabatt visas på ett kort?', [
      ['Pill på bilden', pcard({ tl: bdg('−20 %', 'background:var(--bad)') })],
      ['Rund klisterlapp på bilden', pcard({ tr: `<span style="display:inline-grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--bad);color:#fff;font-size:13px;font-weight:800">−20%</span>` })],
      ['Rött pris och överstruket', pcard({ price: '<s class="muted small">620 kr</s>' }).replace('<span class="price">495 kr</span>', '<span class="price" style="color:var(--bad)">495 kr</span>')],
      ['Liten etikett bredvid priset', pcard({ price: bdg('−20 %', 'background:var(--bad);font-size:11px;padding:4px 7px') })]
    ]),
    Q('pi-et-slutsald', 'Hur ska "Slutsåld" visas på ett kort?', [
      ['Etikett och nedtonad bild', pcard({ tl: bdg('Slutsåld', 'background:var(--sink)'), imgSt: 'opacity:.45' })],
      ['Bara etikett', pcard({ tl: bdg('Slutsåld', 'background:var(--sink)') })],
      ['Band över bilden', pcard({ inner: `<div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);background:rgba(26,28,30,.78);color:#fff;text-align:center;font-weight:700;font-size:13px;padding:8px">Slutsåld</div>` })],
      ['Text vid priset', pcard({ price: '<span class="small" style="color:var(--bad);font-weight:600">Slutsåld</span>' })]
    ]),
    Q('pi-et-oppet', 'Hur ska "Öppet nu" visas som etikett?', [
      ['Grön prick och text', `<span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--sink)"><span style="width:8px;height:8px;border-radius:50%;background:var(--ok)"></span>Öppet nu</span>`],
      ['Tonad grön pill', `<span style="${BADGE}border-radius:999px;background:#E3F1E8;color:var(--ok)">Öppet nu</span>`],
      ['Tonad pill med prick', `<span style="${BADGE}border-radius:999px;background:#E3F1E8;color:var(--ok)"><span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>Öppet nu</span>`],
      ['Fylld grön pill', `<span style="${BADGE}border-radius:999px;background:var(--ok);color:#fff">Öppet nu</span>`],
      ['Bara grön text', `<span style="font-size:13px;font-weight:600;color:var(--ok)">Öppet nu</span>`]
    ].map(([l, h]) => [l, pad(`<div class="panel stack" style="gap:6px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><span class="h h3">Rubrik</span>${h}</div><span class="muted small">Storgatan 12 · Stänger 18.00</span></div>`)])),
    Q('pi-et-ikon', 'Ska en etikett ha en liten ikon?', [
      ['Bara text', ''], ['Ikon före texten', a('bolt', { s: '12px', fill: 'currentColor', w: 0 })], ['Prick före texten', '<span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>']
    ].map(([l, i]) => [l, pcard({ tl: bdg(i + 'Populär') })])),
    Q('pi-et-pabild', 'Hur ska en etikett synas ovanpå ett foto?', [
      ['Vit etikett', STY.vit], ['Mörk etikett', 'background:var(--sink);color:#fff;'], ['Genomskinlig mörk', 'background:rgba(0,0,0,.45);color:#fff;backdrop-filter:blur(6px);'], ['Märkesfärg', STY.fylld]
    ].map(([l, st]) => [l, `<div class="pad"><div style="position:relative;max-width:240px;margin:0 auto"><img class="pic" src="img/vardagsrum.jpg" alt="Vardagsrum"><span style="position:absolute;top:10px;left:10px;${BADGE}border-radius:999px;${st}">Nyhet</span></div></div>`])),
    Q('pi-et-status', 'Hur ska statusetiketter i en lista se ut?', [
      ['Tonade färger', 'tonad'], ['Fyllda färger', 'fylld'], ['Kontur i färg', 'kontur'], ['Prick och text', 'prick']
    ].map(([l, m]) => {
      const st = [['Bekräftad', 'var(--ok)', '#E3F1E8'], ['Väntar', 'var(--warn)', '#F8EEDC'], ['Avbokad', 'var(--bad)', '#FBE9E7']];
      const one = ([t, c, bg]) => m === 'prick' ? `<span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:${c}"></span>${t}</span>`
        : `<span style="${BADGE}border-radius:999px;${m === 'tonad' ? `background:${bg};color:${c}` : m === 'fylld' ? `background:${c};color:#fff` : `color:${c};box-shadow:inset 0 0 0 1px ${c};background:var(--box)`}">${t}</span>`;
      return [l, pad(`<div class="panel" style="padding:4px 16px">${st.map((s, i) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span class="small">Bokning ${i + 1}</span>${one(s)}</div>`).join('')}</div>`)];
    })),
    Q('pi-et-tonkant', 'Ska tonade etiketter ha en kant?', [
      ['Utan kant', ''], ['Tunn kant i samma ton', 'box-shadow:inset 0 0 0 1px rgba(36,64,94,.25)']
    ].map(([l, st]) => [l, cen(['Nyhet', 'Populär', 'Tre kvar'].map(t => `<span style="${BADGE}border-radius:999px;${STY.tonad}${st}">${t}</span>`).join(''), 'gap:8px')])),
    Q('pi-et-meny', 'Hur ska "Ny" markeras bredvid en menypunkt?', [
      ['Liten pill efter texten', bdg('Ny', 'font-size:10px;padding:3px 6px')],
      ['Tonad pill efter texten', `<span style="${BADGE}border-radius:999px;${STY.tonad}font-size:10px;padding:3px 6px">Ny</span>`],
      ['Bara en prick', '<span style="width:7px;height:7px;border-radius:50%;background:var(--brand)"></span>'],
      ['Upphöjd text', '<sup style="font-size:10px;font-weight:700;color:var(--brand);align-self:flex-start">Ny</sup>']
    ].map(([l, b]) => [l, cen(`<div style="display:flex;gap:22px;font-weight:500;font-size:15px;flex-wrap:wrap"><span>Tjänster</span><span style="display:inline-flex;align-items:center;gap:6px">Priser${b}</span><span>Kontakt</span></div>`)]))
  ]));

  window.QZ.part({ key: 'pilar', groups });
})();
