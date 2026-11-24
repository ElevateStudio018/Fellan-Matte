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

  window.QZ.part({ key: 'pilar', groups });
})();
