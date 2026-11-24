/* Elevate designquiz: del Typsnitt (ts-).
   Vilka typsnitt som ska och aldrig ska användas till rubriker, brödtext, siffror,
   knappar, fält, etiketter och små texter. Varje fråga visar samma text i olika
   typsnitt (eller samma typsnitt i olika vikter, bredder och varianter). */
(function () {
  // ---------- Familjer ----------
  const SERIF = ['Fraunces', 'Playfair Display', 'Lora', 'Source Serif 4', 'DM Serif Display', 'Instrument Serif', 'Newsreader', 'Libre Caslon Text', 'EB Garamond', 'Cormorant'];
  const MONO = ['JetBrains Mono', 'IBM Plex Mono', 'DM Mono', 'Geist Mono'];
  const ff = n => `'${n}', ${SERIF.includes(n) ? 'Georgia, serif' : MONO.includes(n) ? 'ui-monospace, monospace' : 'system-ui, sans-serif'}`;
  // Rubrikvikt per familj när frågan inte gäller vikten. Sans 700, serifer sin naturliga rubrikvikt.
  const HW = { 'Fraunces': 600, 'Playfair Display': 700, 'Lora': 600, 'Source Serif 4': 600, 'DM Serif Display': 400, 'Instrument Serif': 400, 'Newsreader': 500, 'Libre Caslon Text': 700, 'EB Garamond': 500, 'Cormorant': 600 };
  const hw = n => HW[n] || 700;
  const st = (n, w) => `font-family:${ff(n)};font-weight:${w}`;

  // ---------- Texter (neutrala, identiska i alla alternativ) ----------
  const HT = [
    ['Rubrik på', 'två rader'],
    ['Allt samlat', 'på ett ställe'],
    ['Kom igång', 'på en minut'],
    ['Enkelt att', 'komma igång'],
    ['Tydligt och', 'lätt att läsa'],
    ['Se hur det', 'fungerar'],
    ['Planera din', 'nästa vecka'],
    ['Mer tid för', 'det viktiga'],
  ];
  const SHORT = 'En kort brödtext under rubriken, på en eller två rader.';
  const PARA = 'Det här är ett vanligt stycke brödtext. Det ska vara lätt att läsa, även när texten blir lite längre och fortsätter över flera rader.';

  // ---------- Byggstenar ----------
  // Rubrik på två rader, ibland med kort brödtext (i grundtypsnittet) under.
  function head(n, t, o = {}) {
    const w = o.w || hw(n);
    const size = o.size || 'clamp(26px, 11cqi, 40px)';
    return `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(n, w)};font-size:${size};${o.style || ''}">${t[0]}<br>${t[1]}</p>${o.body ? `<p class="muted" style="margin-top:12px;max-width:34ch">${o.bodyText || SHORT}</p>` : ''}</div>`;
  }
  const opt = (l, h) => ({ l, h });
  const fontOpts = (fams, render) => fams.map(n => opt(n, render(n)));
  const Q = (id, q, opts, layout = 'grid') => ({ id: 'ts-' + id, q, layout, opts });
  const pad2 = i => String(i + 1).padStart(2, '0');

  const groups = [];

  // =====================================================================
  // 1. Rubriker: sans, tre omgångar där varje familj möter olika motståndare
  // =====================================================================
  const SANS_ROUNDS = [
    // Omgång A: liknande familjer mot varandra
    ['Inter', 'Geist', 'Hanken Grotesk', 'Public Sans', 'Instrument Sans'],
    ['Schibsted Grotesk', 'Onest', 'Work Sans', 'Albert Sans', 'Archivo'],
    ['IBM Plex Sans', 'Roboto', 'Open Sans', 'Source Sans 3', 'Lato', 'Nunito Sans'],
    ['DM Sans', 'Manrope', 'Figtree', 'Plus Jakarta Sans', 'Outfit'],
    ['Sora', 'Montserrat', 'Poppins', 'Urbanist', 'Lexend'],
    ['Red Hat Display', 'Raleway', 'Rubik', 'Epilogue'],
    ['Space Grotesk', 'Bricolage Grotesque', 'Syne', 'Unbounded'],
    // Omgång B: blandat
    ['Inter', 'Onest', 'Lexend', 'Red Hat Display', 'Space Grotesk'],
    ['Geist', 'Work Sans', 'IBM Plex Sans', 'Raleway', 'Bricolage Grotesque'],
    ['Hanken Grotesk', 'Albert Sans', 'Roboto', 'DM Sans', 'Syne'],
    ['Public Sans', 'Archivo', 'Open Sans', 'Manrope', 'Sora'],
    ['Instrument Sans', 'Source Sans 3', 'Figtree', 'Montserrat', 'Epilogue'],
    ['Schibsted Grotesk', 'Lato', 'Plus Jakarta Sans', 'Poppins', 'Unbounded'],
    ['Nunito Sans', 'Outfit', 'Urbanist', 'Rubik'],
    // Omgång C: nya motståndare igen
    ['Figtree', 'Rubik', 'Raleway', 'Sora', 'Nunito Sans'],
    ['Instrument Sans', 'Unbounded', 'Manrope', 'Onest', 'Roboto'],
    ['IBM Plex Sans', 'Syne', 'Public Sans', 'Schibsted Grotesk', 'Space Grotesk'],
    ['Open Sans', 'Poppins', 'Red Hat Display', 'Hanken Grotesk', 'Outfit'],
    ['Geist', 'Albert Sans', 'Plus Jakarta Sans', 'Source Sans 3', 'Urbanist'],
    ['Lexend', 'Archivo', 'Bricolage Grotesque', 'Epilogue', 'Lato'],
    ['Inter', 'DM Sans', 'Work Sans', 'Montserrat'],
  ];
  groups.push({
    key: 'rubrik-sans', title: 'Rubriktypsnitt: sans',
    questions: SANS_ROUNDS.map((fams, i) => Q(`rubrik-sans-${pad2(i)}`,
      `Rubriker, omgång ${i + 1} av ${SANS_ROUNDS.length}: vilket typsnitt är bäst?`,
      fontOpts(fams, n => head(n, HT[i % HT.length], { body: i % 3 === 1 })))),
  });

  // =====================================================================
  // 2. Rubriker: serif, och serif mot sans
  // =====================================================================
  const SERIF_ROUNDS = [
    ['Fraunces', 'Playfair Display', 'DM Serif Display', 'Instrument Serif', 'Cormorant'],
    ['Lora', 'Source Serif 4', 'Newsreader', 'Libre Caslon Text', 'EB Garamond'],
    ['Playfair Display', 'Lora', 'Libre Caslon Text', 'Cormorant', 'Fraunces'],
    ['EB Garamond', 'Newsreader', 'Source Serif 4', 'DM Serif Display', 'Instrument Serif'],
    ['Instrument Serif', 'Lora', 'Source Serif 4', 'Libre Caslon Text', 'Cormorant'],
    ['Playfair Display', 'DM Serif Display', 'EB Garamond', 'Fraunces', 'Newsreader'],
  ];
  groups.push({
    key: 'rubrik-serif', title: 'Rubriktypsnitt: serif',
    questions: SERIF_ROUNDS.map((fams, i) => Q(`rubrik-serif-${pad2(i)}`,
      `Serif-rubriker, omgång ${i + 1} av ${SERIF_ROUNDS.length}: vilken är bäst?`,
      fontOpts(fams, n => head(n, HT[(i + 3) % HT.length], { body: i % 2 === 0 })))),
  });

  const MIX_ROUNDS = [
    ['Inter', 'Fraunces', 'Geist', 'Instrument Serif', 'Cormorant'],
    ['Manrope', 'Playfair Display', 'Plus Jakarta Sans', 'Newsreader', 'Space Grotesk'],
    ['Figtree', 'Source Serif 4', 'Hanken Grotesk', 'DM Serif Display', 'Bricolage Grotesque'],
    ['Schibsted Grotesk', 'Lora', 'Instrument Sans', 'EB Garamond', 'Libre Caslon Text'],
  ];
  groups.push({
    key: 'rubrik-blandat', title: 'Rubriktypsnitt: sans mot serif',
    questions: MIX_ROUNDS.map((fams, i) => Q(`rubrik-blandat-${pad2(i)}`,
      `Sans mot serif, omgång ${i + 1} av ${MIX_ROUNDS.length}: vilken rubrik är bäst?`,
      fontOpts(fams, n => head(n, HT[(i + 5) % HT.length], { body: true })))),
  });

  // =====================================================================
  // 3. Rubriker: vilka ska aldrig användas
  // =====================================================================
  const NEVER_ROUNDS = [
    ['Inter', 'Nunito Sans', 'DM Sans', 'Plus Jakarta Sans', 'Montserrat'],
    ['Geist', 'Red Hat Display', 'Lexend', 'Hanken Grotesk', 'Unbounded'],
    ['Work Sans', 'Albert Sans', 'Space Grotesk', 'Fraunces', 'Urbanist'],
    ['Cormorant', 'Syne', 'DM Serif Display', 'Roboto', 'Libre Caslon Text'],
    ['Open Sans', 'Outfit', 'Source Serif 4', 'Instrument Serif', 'IBM Plex Sans'],
    ['Bricolage Grotesque', 'Public Sans', 'Newsreader', 'Lora', 'Figtree'],
    ['Playfair Display', 'Manrope', 'Epilogue', 'Lato', 'Instrument Sans'],
    ['Rubik', 'Schibsted Grotesk', 'Archivo', 'Source Sans 3', 'Sora'],
    ['Onest', 'Raleway', 'Poppins', 'EB Garamond'],
  ];
  groups.push({
    key: 'rubrik-aldrig', title: 'Rubriktypsnitt: aldrig',
    questions: NEVER_ROUNDS.map((fams, i) => Q(`rubrik-aldrig-${pad2(i)}`,
      `Vilken av de här ska aldrig användas till rubriker? (${i + 1} av ${NEVER_ROUNDS.length})`,
      fontOpts(fams, n => head(n, HT[(i + 1) % HT.length])))),
  });

  // =====================================================================
  // 4. Brödtext: stycke på 3–4 rader i 16 px
  // =====================================================================
  function para(n, o = {}) {
    return `<div class="pad"><p style="${st(n, o.w || 400)};font-size:16px;line-height:1.55;max-width:36ch;${o.style || ''}">${o.text || PARA}</p></div>`;
  }
  const BODY_ROUNDS = [
    ['DM Sans', 'Public Sans', 'Geist', 'Instrument Sans'],
    ['Lexend', 'Epilogue', 'Outfit', 'Libre Caslon Text'],
    ['Sora', 'Urbanist', 'Source Sans 3', 'Raleway'],
    ['Space Grotesk', 'Poppins', 'IBM Plex Sans', 'Onest'],
    ['Plus Jakarta Sans', 'Albert Sans', 'Work Sans', 'Schibsted Grotesk'],
    ['Rubik', 'Hanken Grotesk', 'Inter', 'Lato'],
    ['EB Garamond', 'Fraunces', 'Lora', 'Open Sans'],
    ['Nunito Sans', 'Roboto', 'Montserrat', 'Archivo'],
    ['Source Serif 4', 'Figtree', 'Manrope', 'Newsreader'],
    ['Figtree', 'Urbanist', 'Libre Caslon Text', 'Schibsted Grotesk'],
    ['EB Garamond', 'Outfit', 'Archivo', 'Poppins'],
    ['Public Sans', 'Roboto', 'Source Sans 3', 'Work Sans'],
    ['Source Serif 4', 'Rubik', 'Lexend', 'Open Sans'],
    ['Albert Sans', 'Manrope', 'Geist', 'Raleway'],
    ['Newsreader', 'Plus Jakarta Sans', 'Space Grotesk', 'Montserrat'],
    ['DM Sans', 'Onest', 'Hanken Grotesk', 'Nunito Sans'],
    ['Inter', 'Fraunces', 'Sora', 'Instrument Sans'],
    ['Lato', 'IBM Plex Sans', 'Epilogue', 'Lora'],
  ];
  const BODY_NEVER = [
    ['Poppins', 'Montserrat', 'Raleway', 'Lexend', 'Urbanist', 'Space Grotesk'],
    ['EB Garamond', 'Fraunces', 'Sora', 'Epilogue', 'Rubik', 'Outfit'],
    ['Lato', 'Open Sans', 'Roboto', 'Nunito Sans', 'Libre Caslon Text', 'Archivo'],
  ];
  groups.push({
    key: 'brodtext', title: 'Brödtexttypsnitt',
    questions: [
      ...BODY_ROUNDS.map((fams, i) => Q(`brodtext-${pad2(i)}`,
        `Brödtext, omgång ${i + 1} av ${BODY_ROUNDS.length}: vilket stycke är lättast och trevligast att läsa?`,
        fontOpts(fams, n => para(n)))),
      ...BODY_NEVER.map((fams, i) => Q(`brodtext-aldrig-${pad2(i)}`,
        `Vilken av de här ska aldrig användas till brödtext? (${i + 1} av ${BODY_NEVER.length})`,
        fontOpts(fams, n => para(n)))),
    ],
  });

  // =====================================================================
  // 5. Siffror och priser
  // =====================================================================
  const price = n => `<div class="pad"><p class="muted small">Från</p><p style="${st(n, hw(n))};font-size:36px;line-height:1.1;letter-spacing:-0.01em;margin-top:2px">1&nbsp;495&nbsp;kr</p><p class="muted small" style="margin-top:6px">per månad</p></div>`;
  const PRICE_ROUNDS = [
    ['Inter', 'Geist', 'DM Sans', 'Manrope', 'Plus Jakarta Sans'],
    ['Space Grotesk', 'Sora', 'Outfit', 'Figtree', 'Bricolage Grotesque'],
    ['IBM Plex Sans', 'Roboto', 'Archivo', 'Schibsted Grotesk', 'Hanken Grotesk'],
    ['Montserrat', 'Poppins', 'Raleway', 'Instrument Sans', 'Onest'],
    ['Fraunces', 'Playfair Display', 'Source Serif 4', 'Newsreader', 'DM Serif Display'],
  ];
  const plist = n => {
    const rows = [['Liten', '495'], ['Mellan', '1&nbsp;495'], ['Stor', '11&nbsp;900']];
    return `<div class="pad"><div class="stack" style="gap:0">${rows.map((r, i) => `${i ? '<hr class="divider">' : ''}<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0"><span>${r[0]}</span><span style="${st(n, 600)};font-size:17px;white-space:nowrap">${r[1]}&nbsp;kr</span></div>`).join('')}</div></div>`;
  };
  const timetable = n => {
    const rows = [['07:42', '11:18', '3 h 36 min'], ['08:15', '12:04', '3 h 49 min'], ['10:30', '13:55', '3 h 25 min'], ['13:05', '16:41', '3 h 36 min']];
    const c = `font-family:${ff(n)};font-variant-numeric:tabular-nums`;
    return `<div class="pad"><div style="display:grid;grid-template-columns:auto auto 1fr;gap:8px 14px;align-items:baseline;font-size:15px;${c}"><span class="small muted" style="${c}">Avgår</span><span class="small muted" style="${c}">Framme</span><span class="small muted" style="${c};text-align:right">Restid</span>${rows.map(r => `<span style="font-weight:600">${r[0]}</span><span>${r[1]}</span><span class="muted" style="text-align:right;white-space:nowrap">${r[2]}</span>`).join('')}</div></div>`;
  };
  const TIME_ROUNDS = [
    ['Inter', 'Roboto', 'IBM Plex Sans', 'Source Sans 3', 'Public Sans'],
    ['DM Sans', 'Manrope', 'Geist', 'Work Sans', 'Figtree'],
    ['Space Grotesk', 'Archivo', 'Plus Jakarta Sans', 'Hanken Grotesk', 'Instrument Sans'],
  ];
  const stats = n => `<div class="pad" style="container-type:inline-size"><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">${[['98&nbsp;%', 'svarar inom ett dygn'], ['4,8', 'i snittbetyg']].map(s => `<div style="min-width:0"><p style="${st(n, hw(n))};font-size:clamp(30px,15cqi,48px);line-height:1;letter-spacing:-0.02em;white-space:nowrap">${s[0]}</p><p class="small muted" style="margin-top:6px">${s[1]}</p></div>`).join('')}</div></div>`;
  const STAT_ROUNDS = [
    ['Inter', 'Manrope', 'DM Sans', 'Geist', 'Plus Jakarta Sans'],
    ['Space Grotesk', 'Sora', 'Outfit', 'Bricolage Grotesque', 'Unbounded'],
    ['Fraunces', 'Playfair Display', 'Instrument Serif', 'DM Serif Display', 'Inter'],
    ['Archivo', 'Schibsted Grotesk', 'Hanken Grotesk', 'Figtree', 'Onest'],
  ];
  const digits = n => `<div class="pad"><p style="${st(n, 500)};font-size:30px;line-height:1.2;letter-spacing:0.01em">0123456789</p><p style="${st(n, 400)};font-size:16px;margin-top:8px">Ordernummer 1170 4196, kl. 11:17</p></div>`;
  groups.push({
    key: 'siffror', title: 'Siffror och priser',
    questions: [
      ...PRICE_ROUNDS.map((fams, i) => Q(`pris-${pad2(i)}`,
        `Pris, omgång ${i + 1} av ${PRICE_ROUNDS.length}: vilket typsnitt ska ”1 495 kr” ha?`,
        fontOpts(fams, n => price(n)))),
      Q('pris-lista', 'Vilket typsnitt ska priserna i en lista ha?',
        fontOpts(['Inter', 'Geist', 'DM Sans', 'Manrope', 'Space Grotesk'], plist)),
      ...TIME_ROUNDS.map((fams, i) => Q(`tidtabell-${pad2(i)}`,
        `Tidtabell, omgång ${i + 1} av ${TIME_ROUNDS.length}: vilket typsnitt är tydligast?`,
        fontOpts(fams, timetable))),
      ...STAT_ROUNDS.map((fams, i) => Q(`statistik-${pad2(i)}`,
        `Stora siffror i statistik, omgång ${i + 1} av ${STAT_ROUNDS.length}: vilket typsnitt?`,
        fontOpts(fams, stats))),
      Q('siffror-form', 'Vilka siffror är tydligast att läsa?',
        fontOpts(['Inter', 'Space Grotesk', 'IBM Plex Sans', 'Raleway', 'Sora'], digits)),
    ],
  });

  // =====================================================================
  // 6. Knapp- och menytext
  // =====================================================================
  const btns = (n, w = 600) => `<div class="pad"><div class="row"><span class="sb" style="${st(n, w)}">Boka tid</span><span class="sb2" style="${st(n, w)}">Läs mer</span></div></div>`;
  const BTN_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Figtree', 'Plus Jakarta Sans'],
    ['Geist', 'Space Grotesk', 'Outfit', 'Montserrat', 'Poppins'],
    ['Work Sans', 'IBM Plex Sans', 'Instrument Sans', 'Schibsted Grotesk', 'Hanken Grotesk'],
    ['Onest', 'Sora', 'Archivo', 'Roboto', 'Open Sans'],
  ];
  const menu = (n, w = 500) => `<div class="pad"><div class="panel" style="display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;${st(n, w)};font-size:15px"><span style="color:var(--brand);text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:2px">Start</span><span>Tjänster</span><span>Priser</span><span>Kontakt</span></div></div>`;
  const MENU_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Geist', 'Figtree'],
    ['Plus Jakarta Sans', 'Space Grotesk', 'Outfit', 'Montserrat', 'Poppins'],
    ['IBM Plex Sans', 'Instrument Sans', 'Schibsted Grotesk', 'Hanken Grotesk', 'Work Sans'],
    ['Onest', 'Sora', 'Archivo', 'Public Sans', 'Albert Sans'],
  ];
  // Knapp under en rubrik och en text: rubrikens eller brödtextens typsnitt?
  const btnCtx = (hf, bf) => `<div class="pad"><p class="h h2" style="${st(hf, hw(hf))}">Rubrik på<br>två rader</p><p class="muted" style="margin:10px 0 16px">${SHORT}</p><span class="sb" style="${st(bf, bf === hf && SERIF.includes(hf) ? hw(hf) : 600)}">Boka tid</span></div>`;
  groups.push({
    key: 'knapp-meny', title: 'Knapp- och menytext',
    questions: [
      ...BTN_ROUNDS.map((fams, i) => Q(`knapp-${pad2(i)}`,
        `Knapptext, omgång ${i + 1} av ${BTN_ROUNDS.length}: vilket typsnitt passar bäst i knappar?`,
        fontOpts(fams, n => btns(n)))),
      ...MENU_ROUNDS.map((fams, i) => Q(`meny-${pad2(i)}`,
        `Menytext, omgång ${i + 1} av ${MENU_ROUNDS.length}: vilket typsnitt passar bäst i menyn?`,
        fontOpts(fams, n => menu(n)))),
      Q('knapp-serifrubrik', 'Rubriken är serif. Vilket typsnitt ska knappen ha?', [
        opt('Knapp i brödtextens sans (Inter)', btnCtx('Fraunces', 'Inter')),
        opt('Knapp i rubrikens serif (Fraunces)', btnCtx('Fraunces', 'Fraunces')),
      ]),
      Q('knapp-sansrubrik', 'Rubriken har ett eget sans-typsnitt. Vilket ska knappen ha?', [
        opt('Knapp i brödtextens typsnitt (Inter)', btnCtx('Space Grotesk', 'Inter')),
        opt('Knapp i rubrikens typsnitt (Space Grotesk)', btnCtx('Space Grotesk', 'Space Grotesk')),
      ]),
    ],
  });

  // =====================================================================
  // 7. Fält- och etiketttext
  // =====================================================================
  const fields = n => `<div class="pad"><div class="stack" style="gap:14px;font-family:${ff(n)}"><div class="fld" style="flex:none"><span class="lbl">E-post</span><span class="inp">namn@exempel.se</span></div><div class="fld" style="flex:none"><span class="lbl">Telefon</span><span class="inp ph">070-123 45 67</span><span class="small muted">Vi ringer bara om något ändras.</span></div></div></div>`;
  const FIELD_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Geist', 'IBM Plex Sans'],
    ['Plus Jakarta Sans', 'Figtree', 'Work Sans', 'Source Sans 3', 'Public Sans'],
    ['Instrument Sans', 'Hanken Grotesk', 'Roboto', 'Onest', 'Space Grotesk'],
  ];
  const fldCtx = (hf, lf) => `<div class="pad"><p class="h h3" style="${st(hf, hw(hf))};font-size:24px">Dina uppgifter</p><div class="stack" style="gap:14px;margin-top:14px"><div class="fld" style="flex:none"><span class="lbl" style="font-family:${ff(lf)}">E-post</span><span class="inp ph" style="font-family:${ff(lf)}">namn@exempel.se</span></div><div class="fld" style="flex:none"><span class="lbl" style="font-family:${ff(lf)}">Namn</span><span class="inp ph" style="font-family:${ff(lf)}">För- och efternamn</span></div></div></div>`;
  groups.push({
    key: 'falt', title: 'Fält- och etiketttext',
    questions: [
      ...FIELD_ROUNDS.map((fams, i) => Q(`falt-${pad2(i)}`,
        `Fält och etiketter, omgång ${i + 1} av ${FIELD_ROUNDS.length}: vilket typsnitt är tydligast?`,
        fontOpts(fams, fields))),
      Q('falt-serifrubrik', 'Rubriken över formuläret är serif. Vilket typsnitt ska fälten ha?', [
        opt('Fält i brödtextens sans (Inter)', fldCtx('Fraunces', 'Inter')),
        opt('Fält i rubrikens serif (Fraunces)', fldCtx('Fraunces', 'Fraunces')),
      ]),
      Q('falt-sansrubrik', 'Rubriken har ett eget sans-typsnitt. Vilket typsnitt ska fälten ha?', [
        opt('Fält i brödtextens typsnitt (Inter)', fldCtx('Space Grotesk', 'Inter')),
        opt('Fält i rubrikens typsnitt (Space Grotesk)', fldCtx('Space Grotesk', 'Space Grotesk')),
      ]),
    ],
  });

  // =====================================================================
  // 8. Par: rubrik och brödtext ihop
  // =====================================================================
  const PAIRTEXT = 'Ett kort stycke brödtext under rubriken. Det visar hur rubriken och texten fungerar tillsammans.';
  const pair = (hf, bf, t) => `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(hf, hw(hf))};font-size:clamp(26px,10.5cqi,36px)">${t[0]}<br>${t[1]}</p><p style="font-family:${ff(bf)};font-size:16px;line-height:1.55;margin-top:12px;max-width:36ch">${PAIRTEXT}</p></div>`;
  const PAIR_ROUNDS = [
    // serif-rubrik + sans-bröd
    [['Fraunces', 'Inter'], ['Playfair Display', 'Source Sans 3'], ['Instrument Serif', 'Instrument Sans'], ['Newsreader', 'Inter']],
    [['DM Serif Display', 'DM Sans'], ['Source Serif 4', 'Source Sans 3'], ['Lora', 'Work Sans'], ['EB Garamond', 'Inter']],
    [['Fraunces', 'DM Sans'], ['Cormorant', 'Manrope'], ['Libre Caslon Text', 'Hanken Grotesk'], ['Instrument Serif', 'Inter']],
    [['Fraunces', 'Manrope'], ['Playfair Display', 'Inter'], ['Newsreader', 'Public Sans'], ['Lora', 'Figtree']],
    [['Instrument Serif', 'Geist'], ['Fraunces', 'Figtree'], ['Source Serif 4', 'Inter'], ['DM Serif Display', 'Plus Jakarta Sans']],
    // sans-rubrik + sans-bröd
    [['Space Grotesk', 'Inter'], ['Bricolage Grotesque', 'Inter'], ['Syne', 'Inter'], ['Sora', 'Inter']],
    [['Manrope', 'Inter'], ['Plus Jakarta Sans', 'Inter'], ['Outfit', 'Inter'], ['Archivo', 'Inter']],
    [['Montserrat', 'Open Sans'], ['Poppins', 'Lato'], ['Raleway', 'Roboto'], ['Red Hat Display', 'Inter']],
    [['Space Grotesk', 'IBM Plex Sans'], ['Schibsted Grotesk', 'Inter'], ['Unbounded', 'Inter'], ['Epilogue', 'Work Sans']],
    [['Bricolage Grotesque', 'DM Sans'], ['Sora', 'Manrope'], ['Outfit', 'DM Sans'], ['Space Grotesk', 'DM Sans']],
    [['Geist', 'Inter'], ['Instrument Sans', 'Inter'], ['Hanken Grotesk', 'Inter'], ['Onest', 'Inter']],
    // sans-rubrik + serif-bröd
    [['Inter', 'Source Serif 4'], ['DM Sans', 'Lora'], ['Manrope', 'Newsreader'], ['Instrument Sans', 'Libre Caslon Text']],
    // tvärs över kategorierna
    [['Fraunces', 'Inter'], ['Space Grotesk', 'Inter'], ['Instrument Serif', 'Inter'], ['Manrope', 'Inter']],
    [['Playfair Display', 'Inter'], ['Bricolage Grotesque', 'Inter'], ['Newsreader', 'Inter'], ['Plus Jakarta Sans', 'Inter']],
    [['Fraunces', 'Geist'], ['Newsreader', 'Manrope'], ['Lora', 'Inter'], ['Instrument Serif', 'DM Sans']],
    [['Syne', 'DM Sans'], ['Unbounded', 'Manrope'], ['Space Grotesk', 'Manrope'], ['Bricolage Grotesque', 'Figtree']],
  ];
  groups.push({
    key: 'par', title: 'Par: rubrik och brödtext',
    questions: PAIR_ROUNDS.map((prs, i) => Q(`par-${pad2(i)}`,
      `Typsnittspar, omgång ${i + 1} av ${PAIR_ROUNDS.length}: vilken rubrik med brödtext är bäst?`,
      prs.map(([hf, bf]) => opt(`${hf} + ${bf}`, pair(hf, bf, HT[(i + 2) % HT.length]))))),
  });

  // =====================================================================
  // 9. Samma familj för allt eller två familjer
  // =====================================================================
  const card = (hf, bf, extra = '') => `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(hf, hw(hf))};font-size:clamp(24px,10cqi,32px)">Rubrik på<br>två rader</p><p style="font-family:${ff(bf)};font-size:16px;line-height:1.55;margin:10px 0 16px;max-width:36ch">Ett kort stycke brödtext som visar hur allt fungerar ihop.</p>${extra}<span class="sb" style="${st(bf, 600)}">Boka tid</span></div>`;
  const fam = (id, base, alts) => Q(`familj-${id}`, `${base}: ett typsnitt för allt, eller ett annat till rubriken?`, [
    opt(`${base} för allt`, card(base, base)),
    ...alts.map(([hf, bf]) => opt(`${hf}-rubrik, resten ${bf}`, card(hf, bf))),
  ]);
  const priceLine = mf => `<p style="${mf ? `font-family:${ff(mf)};font-weight:500` : 'font-weight:700'};font-size:18px;margin-bottom:16px">Från 1&nbsp;495&nbsp;kr</p>`;
  groups.push({
    key: 'familj', title: 'Samma familj eller två',
    questions: [
      fam('inter', 'Inter', [['Fraunces', 'Inter'], ['Manrope', 'Inter']]),
      fam('dmsans', 'DM Sans', [['DM Serif Display', 'DM Sans'], ['Fraunces', 'DM Sans']]),
      fam('manrope', 'Manrope', [['Newsreader', 'Manrope'], ['Space Grotesk', 'Manrope']]),
      fam('geist', 'Geist', [['Instrument Serif', 'Geist'], ['Bricolage Grotesque', 'Geist']]),
      fam('jakarta', 'Plus Jakarta Sans', [['Lora', 'Plus Jakarta Sans'], ['Sora', 'Plus Jakarta Sans']]),
      fam('figtree', 'Figtree', [['Fraunces', 'Figtree'], ['Bricolage Grotesque', 'Figtree']]),
      Q('familj-instrument', 'Instrument Sans: samma familj, en serif-släkting eller ett annat typsnitt?', [
        opt('Instrument Sans för allt', card('Instrument Sans', 'Instrument Sans')),
        opt('Instrument Serif-rubrik, resten Instrument Sans', card('Instrument Serif', 'Instrument Sans')),
        opt('Instrument Serif-rubrik, resten Inter', card('Instrument Serif', 'Inter')),
      ]),
      Q('familj-space', 'Space Grotesk i rubriken: vad ska resten ha?', [
        opt('Space Grotesk för allt', card('Space Grotesk', 'Space Grotesk')),
        opt('Space Grotesk-rubrik, resten Inter', card('Space Grotesk', 'Inter')),
        opt('Space Grotesk-rubrik, resten IBM Plex Sans', card('Space Grotesk', 'IBM Plex Sans')),
      ]),
      Q('familj-antal', 'Hur många typsnittsfamiljer ska en sida ha?', [
        opt('En familj (Inter)', card('Inter', 'Inter', priceLine())),
        opt('Två familjer (Fraunces + Inter)', card('Fraunces', 'Inter', priceLine())),
        opt('Tre familjer (Fraunces + Inter + mono)', card('Fraunces', 'Inter', priceLine('JetBrains Mono'))),
      ]),
    ],
  });

  // =====================================================================
  // 10. Rubrikvikter per familj
  // =====================================================================
  const W4 = [500, 600, 700, 800], W3 = [500, 600, 700], WS = [400, 500, 600, 700];
  const WEIGHTS = [
    ['Inter', W4], ['DM Sans', W4], ['Manrope', W4], ['Figtree', W4], ['Plus Jakarta Sans', W4], ['Geist', W4],
    ['Hanken Grotesk', W4], ['Schibsted Grotesk', W4], ['Onest', W4], ['Montserrat', W4], ['Poppins', W4], ['Outfit', W4],
    ['Sora', W4], ['Work Sans', W4], ['Archivo', W4], ['Public Sans', W4], ['Albert Sans', W4], ['Bricolage Grotesque', W4],
    ['Instrument Sans', W3], ['Space Grotesk', W3], ['IBM Plex Sans', W3],
    ['Fraunces', WS], ['Source Serif 4', WS], ['Newsreader', WS], ['Playfair Display', WS],
  ];
  const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  groups.push({
    key: 'vikter', title: 'Rubrikvikter per familj',
    questions: WEIGHTS.map(([n, ws], i) => Q(`vikt-${slug(n)}`,
      `${n} i rubriker: vilken vikt?`,
      ws.map(w => opt(`${n} ${w}`, head(n, HT[i % HT.length], { w, body: true }))))),
  });

  // =====================================================================
  // 11. Bredd och karaktär
  // =====================================================================
  const wHead = (n, pct, t) => head(n, t, { style: `font-stretch:${pct}%` });
  const wBtn = (n, pct) => `<div class="pad"><div class="row"><span class="sb" style="${st(n, 600)};font-stretch:${pct}%">Boka tid</span><span class="sb2" style="${st(n, 600)};font-stretch:${pct}%">Läs mer</span></div></div>`;
  const wStat = (n, pct) => stats(n).replace(/letter-spacing:-0\.02em/g, `letter-spacing:-0.02em;font-stretch:${pct}%`);
  const wMenu = (n, pct) => menu(n).replace('font-size:15px', `font-size:15px;font-stretch:${pct}%`);
  const glyphs = n => `<div class="pad"><p style="${st(n, 600)};font-size:56px;line-height:1;letter-spacing:0.02em">R a g</p><p style="${st(n, 600)};font-size:22px;margin-top:10px">Rätt rubrik, rak rad</p></div>`;
  const il1 = n => `<div class="pad"><p style="font-family:${ff(n)};font-size:15px;line-height:1.5">Ange koden <b style="font-weight:600">Il1O0l</b> i fältet.</p><p style="font-family:${ff(n)};font-size:15px;line-height:1.5;margin-top:6px">Alla illustrationer, fil 11 av 17.</p></div>`;
  const T2 = HT[1];
  groups.push({
    key: 'karaktar', title: 'Bredd och karaktär',
    questions: [
      Q('bredd-rubrik-archivo', 'Hur bred ska rubriken vara? (samma typsnitt, olika bredd)', [
        opt('Smal (Archivo 75 %)', wHead('Archivo', 75, T2)),
        opt('Normal (Archivo 100 %)', wHead('Archivo', 100, T2)),
        opt('Bred (Archivo 125 %)', wHead('Archivo', 125, T2)),
      ]),
      Q('bredd-rubrik-instrument', 'Instrument Sans i rubriker: smal eller normal bredd?', [
        opt('Smal (Instrument Sans 75 %)', wHead('Instrument Sans', 75, HT[4])),
        opt('Halvsmal (Instrument Sans 87 %)', wHead('Instrument Sans', 87.5, HT[4])),
        opt('Normal (Instrument Sans 100 %)', wHead('Instrument Sans', 100, HT[4])),
      ]),
      Q('bredd-rubrik-bricolage', 'Bricolage Grotesque i rubriker: smal eller normal bredd?', [
        opt('Smal (Bricolage 75 %)', wHead('Bricolage Grotesque', 75, HT[6])),
        opt('Halvsmal (Bricolage 87 %)', wHead('Bricolage Grotesque', 87.5, HT[6])),
        opt('Normal (Bricolage 100 %)', wHead('Bricolage Grotesque', 100, HT[6])),
      ]),
      Q('bredd-knapp', 'Hur bred ska knapptexten vara?', [
        opt('Smal knapptext (Archivo 80 %)', wBtn('Archivo', 80)),
        opt('Normal knapptext (Archivo 100 %)', wBtn('Archivo', 100)),
        opt('Bred knapptext (Archivo 120 %)', wBtn('Archivo', 120)),
      ]),
      Q('bredd-meny', 'Hur bred ska menytexten vara?', [
        opt('Smal menytext (Roboto 75 %)', wMenu('Roboto', 75)),
        opt('Halvsmal menytext (Roboto 87 %)', wMenu('Roboto', 87.5)),
        opt('Normal menytext (Roboto 100 %)', wMenu('Roboto', 100)),
      ]),
      Q('bredd-siffror', 'Hur breda ska stora siffror vara?', [
        opt('Smala siffror (Archivo 75 %)', wStat('Archivo', 75)),
        opt('Normala siffror (Archivo 100 %)', wStat('Archivo', 100)),
        opt('Breda siffror (Archivo 125 %)', wStat('Archivo', 125)),
      ]),
      Q('stil-rubrik-1', 'Vilken grundform ska rubriktypsnittet ha?', [
        opt('Geometrisk (Outfit)', head('Outfit', HT[0], { body: true })),
        opt('Grotesk (Inter)', head('Inter', HT[0], { body: true })),
        opt('Humanistisk (Source Sans 3)', head('Source Sans 3', HT[0], { body: true })),
      ]),
      Q('stil-rubrik-2', 'Rubriker igen: geometrisk, grotesk eller humanistisk?', [
        opt('Geometrisk (Poppins)', head('Poppins', HT[3], { body: true })),
        opt('Grotesk (Hanken Grotesk)', head('Hanken Grotesk', HT[3], { body: true })),
        opt('Humanistisk (Open Sans)', head('Open Sans', HT[3], { body: true })),
      ]),
      Q('stil-brodtext', 'Vilken grundform ska brödtexten ha?', [
        opt('Geometrisk (Outfit)', para('Outfit')),
        opt('Grotesk (Public Sans)', para('Public Sans')),
        opt('Humanistisk (Source Sans 3)', para('Source Sans 3')),
      ]),
      Q('stil-knapp', 'Vilken grundform ska knapptexten ha?', [
        opt('Geometrisk (Montserrat)', btns('Montserrat')),
        opt('Grotesk (Geist)', btns('Geist')),
        opt('Humanistisk (Lato)', btns('Lato', 700)),
      ]),
      Q('sardrag-a-rubrik', 'Ska a:et i rubriker ha en eller två våningar?', [
        opt('Envånings-a (Outfit)', head('Outfit', HT[1])),
        opt('Envånings-a (Urbanist)', head('Urbanist', HT[1])),
        opt('Tvåvånings-a (Figtree)', head('Figtree', HT[1])),
        opt('Tvåvånings-a (DM Sans)', head('DM Sans', HT[1])),
      ]),
      Q('sardrag-a-brodtext', 'Ska a:et i brödtext ha en eller två våningar?', [
        opt('Envånings-a (Outfit)', para('Outfit')),
        opt('Envånings-a (Urbanist)', para('Urbanist')),
        opt('Tvåvånings-a (Figtree)', para('Figtree')),
        opt('Tvåvånings-a (Manrope)', para('Manrope')),
      ]),
      Q('sardrag-r', 'Vilket versalt R och vilka gemena a och g ser bäst ut?',
        ['Inter', 'Montserrat', 'Instrument Sans', 'Space Grotesk', 'Red Hat Display'].map(n => opt(`R, a och g i ${n}`, glyphs(n)))),
      Q('sardrag-il1', 'Hur viktigt är det att I, l och 1 går att skilja åt?', [
        opt('Raka I och l (Inter)', il1('Inter')),
        opt('l med svans (Geist)', il1('Geist')),
        opt('I med tvärslå (Lexend)', il1('Lexend')),
        opt('l med svans, I med tvärslå (IBM Plex Sans)', il1('IBM Plex Sans')),
      ]),
      Q('kontrast-serif', 'Hur stor kontrast mellan tjocka och tunna streck ska en serif-rubrik ha?', [
        opt('Hög kontrast (Playfair Display)', head('Playfair Display', HT[2], { body: true })),
        opt('Mellan (Fraunces)', head('Fraunces', HT[2], { body: true })),
        opt('Låg kontrast (Source Serif 4)', head('Source Serif 4', HT[2], { body: true })),
      ]),
    ],
  });

  // =====================================================================
  // 12. Svenska tecken och långa ord
  // =====================================================================
  const swe = n => `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(n, hw(n))};font-size:clamp(26px,10.5cqi,40px)">Översikt för<br>året som gått</p><p style="${st(n, hw(n))};font-size:26px;margin-top:12px;letter-spacing:0.06em">Å Ä Ö å ä ö</p></div>`;
  const SWE_ROUNDS = [
    ['Inter', 'Montserrat', 'Poppins', 'Space Grotesk', 'Syne'],
    ['DM Sans', 'Manrope', 'Sora', 'Unbounded', 'Outfit'],
    ['Plus Jakarta Sans', 'Figtree', 'Bricolage Grotesque', 'Lexend', 'Raleway'],
    ['Fraunces', 'Playfair Display', 'Instrument Serif', 'Cormorant', 'EB Garamond'],
  ];
  const longw = (n, txt) => `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(n, hw(n))};font-size:clamp(24px,10cqi,34px);overflow-wrap:break-word;text-wrap:wrap">${txt}</p></div>`;
  const LONG_ROUNDS = [
    [['Inter', 'Archivo', 'Montserrat', 'Plus Jakarta Sans', 'Schibsted Grotesk'], 'Leveransinformation och returvillkor'],
    [['DM Sans', 'Manrope', 'Sora', 'Instrument Sans', 'Bricolage Grotesque'], 'Kundtjänstärenden och medlemsförmåner'],
    [['Geist', 'Outfit', 'Space Grotesk', 'Fraunces', 'Unbounded'], 'Bokningsbekräftelse och avbokningsregler'],
  ];
  const longBtn = n => `<div class="pad"><span class="sb" style="${st(n, 600)}">Bekräfta beställningen</span></div>`;
  groups.push({
    key: 'svenska', title: 'Svenska tecken och långa ord',
    questions: [
      ...SWE_ROUNDS.map((fams, i) => Q(`aao-${pad2(i)}`,
        `Å, ä och ö, omgång ${i + 1} av ${SWE_ROUNDS.length}: i vilket typsnitt ser de bäst ut?`,
        fontOpts(fams, swe))),
      ...LONG_ROUNDS.map(([fams, txt], i) => Q(`langa-ord-${pad2(i)}`,
        `Långa svenska ord, omgång ${i + 1} av ${LONG_ROUNDS.length}: vilket typsnitt klarar dem bäst?`,
        fontOpts(fams, n => longw(n, txt)))),
      Q('langa-ord-knapp', 'Lång knapptext: vilket typsnitt klarar den bäst?',
        fontOpts(['Inter', 'Manrope', 'Montserrat', 'Archivo', 'Plus Jakarta Sans', 'Instrument Sans'], longBtn)),
    ],
  });

  // =====================================================================
  // 13. Små texter i 12–13 px
  // =====================================================================
  const small = (n, px) => `<div class="pad"><p style="font-family:${ff(n)};font-size:${px}px;line-height:1.45;color:var(--smuted)">Uppdaterad 14 mars · 3 min läsning</p><p style="font-family:${ff(n)};font-size:${px}px;line-height:1.45;margin-top:8px;max-width:40ch">Genom att fortsätta godkänner du villkoren. Du kan ändra dina val när som helst under Inställningar.</p></div>`;
  const SMALL_ROUNDS = [
    [13, ['Inter', 'Geist', 'IBM Plex Sans', 'Source Sans 3', 'Roboto']],
    [13, ['Open Sans', 'Lato', 'Public Sans', 'DM Sans', 'Manrope']],
    [12, ['Figtree', 'Plus Jakarta Sans', 'Work Sans', 'Hanken Grotesk', 'Instrument Sans']],
    [12, ['Onest', 'Albert Sans', 'Nunito Sans', 'Poppins', 'Montserrat']],
    [12, ['Outfit', 'Rubik', 'Lexend', 'Schibsted Grotesk', 'Archivo']],
    [12, ['Inter', 'Geist', 'IBM Plex Sans', 'Space Grotesk', 'Sora']],
  ];
  groups.push({
    key: 'sma', title: 'Små texter i 12–13 px',
    questions: [
      ...SMALL_ROUNDS.map(([px, fams], i) => Q(`sma-${pad2(i)}`,
        `Små texter i ${px} px, omgång ${i + 1} av ${SMALL_ROUNDS.length}: vilken är lättast att läsa?`,
        fontOpts(fams, n => small(n, px)))),
      Q('sma-aldrig', 'Vilket typsnitt ska aldrig användas i små texter?',
        fontOpts(['Montserrat', 'Poppins', 'Raleway', 'Syne', 'Unbounded', 'Lexend'], n => small(n, 12))),
    ],
  });

  // =====================================================================
  // 14. Versala etiketter
  // =====================================================================
  const caps = n => { const c = `font-family:${ff(n)};text-transform:uppercase`; return `<div class="pad"><div class="stack" style="gap:12px;align-items:flex-start"><span style="${c};font-size:12px;font-weight:600;letter-spacing:0.08em;color:var(--smuted)">Steg 2 av 3 · Översikt</span><p class="h h3">Rubrik på två rader under etiketten</p><span class="tag" style="${c};letter-spacing:0.06em">Nyhet</span></div></div>`; };
  const CAPS_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Geist', 'IBM Plex Sans'],
    ['Plus Jakarta Sans', 'Space Grotesk', 'Montserrat', 'Archivo', 'Work Sans'],
    ['Instrument Sans', 'Schibsted Grotesk', 'Hanken Grotesk', 'Sora', 'Outfit'],
    ['Figtree', 'Onest', 'Public Sans', 'Syne', 'Unbounded'],
    ['Lato', 'Roboto', 'Open Sans', 'Poppins', 'Rubik'],
  ];
  groups.push({
    key: 'versaler', title: 'Versala etiketter',
    questions: CAPS_ROUNDS.map((fams, i) => Q(`versaler-${pad2(i)}`,
      `Versala etiketter, omgång ${i + 1} av ${CAPS_ROUNDS.length}: vilket typsnitt?`,
      fontOpts(fams, caps))),
  });

  // =====================================================================
  // 15. Mono: när och vilken
  // =====================================================================
  const MONOS = ['JetBrains Mono', 'IBM Plex Mono', 'DM Mono', 'Geist Mono'];
  const order = n => `<div class="pad"><div class="panel stack" style="gap:4px"><span class="small muted">Ordernummer</span><span style="font-family:${ff(n)};font-size:17px;font-weight:500;letter-spacing:0.01em">SE-4821-0937</span><span class="small muted" style="margin-top:8px">Bokad 14 mars kl. 10:30</span></div></div>`;
  const ttFont = n => timetable(n);
  const monoPrice = n => price(n).replace(`font-weight:${hw(n)}`, `font-weight:${MONO.includes(n) ? 500 : 700}`);
  const capsMono = n => `<div class="pad"><div class="stack" style="gap:10px;align-items:flex-start"><span style="font-family:${ff(n)};font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--smuted)">Steg 2 av 3</span><p class="h h3">Rubrik på två rader under etiketten</p></div></div>`;
  const codeFld = n => `<div class="pad"><div class="fld" style="flex:none"><span class="lbl">Rabattkod</span><span class="inp" style="font-family:${ff(n)};letter-spacing:0.04em">VÅREN25</span></div></div>`;
  const monoHead = n => head(n, HT[0], { w: MONO.includes(n) ? 600 : 700, size: 'clamp(24px,9.5cqi,34px)', body: true });
  const monoPara = n => para(n, { style: MONO.includes(n) ? 'font-size:15px' : '' });
  groups.push({
    key: 'mono', title: 'Mono',
    questions: [
      Q('mono-ordernummer', 'Ska ordernummer och koder visas i mono?', [
        opt('Ordernummer i sans (Inter)', order('Inter')),
        opt('Ordernummer i mono (JetBrains Mono)', order('JetBrains Mono')),
      ]),
      Q('mono-val', 'Om mono används: vilken?', fontOpts(MONOS, order)),
      Q('mono-tider', 'Ska tider i en tabell vara mono eller sans?', [
        opt('Sans med jämnbreda siffror (Inter)', ttFont('Inter')),
        opt('Mono (IBM Plex Mono)', ttFont('IBM Plex Mono')),
        opt('Mono (JetBrains Mono)', ttFont('JetBrains Mono')),
      ]),
      Q('mono-val-tabell', 'Vilken mono fungerar bäst i en tabell med tider?', fontOpts(MONOS, ttFont)),
      Q('mono-pris', 'Får priser visas i mono?', [
        opt('Pris i sans (Inter)', monoPrice('Inter')),
        opt('Pris i mono (JetBrains Mono)', monoPrice('JetBrains Mono')),
        opt('Pris i mono (DM Mono)', monoPrice('DM Mono')),
      ]),
      Q('mono-etikett', 'Ska små versala etiketter vara mono?', [
        opt('Etikett i sans (Inter)', capsMono('Inter')),
        opt('Etikett i mono (JetBrains Mono)', capsMono('JetBrains Mono')),
        opt('Etikett i mono (IBM Plex Mono)', capsMono('IBM Plex Mono')),
      ]),
      Q('mono-kod-falt', 'Ska en kod i ett fält visas i mono?', [
        opt('Kod i sans (Inter)', codeFld('Inter')),
        opt('Kod i mono (JetBrains Mono)', codeFld('JetBrains Mono')),
        opt('Kod i mono (IBM Plex Mono)', codeFld('IBM Plex Mono')),
      ]),
      Q('mono-rubrik', 'Får mono användas i rubriker?', [
        opt('Rubrik i sans (Inter)', monoHead('Inter')),
        opt('Rubrik i mono (JetBrains Mono)', monoHead('JetBrains Mono')),
        opt('Rubrik i mono (IBM Plex Mono)', monoHead('IBM Plex Mono')),
      ]),
      Q('mono-brodtext', 'Får mono användas i brödtext?', [
        opt('Brödtext i sans (Inter)', monoPara('Inter')),
        opt('Brödtext i mono (IBM Plex Mono)', monoPara('IBM Plex Mono')),
        opt('Brödtext i mono (DM Mono)', monoPara('DM Mono')),
      ]),
    ],
  });

  // =====================================================================
  // 16. Rubriker i små och stora storlekar, de vanligaste typsnitten, ingress
  // =====================================================================
  const cardTitle = n => `<div class="pad"><div class="panel"><p class="h" style="${st(n, SERIF.includes(n) ? hw(n) : 600)};font-size:20px;line-height:1.25">Rubrik på ett kort</p><p class="muted" style="margin-top:6px;font-size:15px">Kort text om innehållet på kortet.</p></div></div>`;
  const CT_ROUNDS = [
    ['Inter', 'Geist', 'DM Sans', 'Manrope', 'Plus Jakarta Sans'],
    ['Figtree', 'Hanken Grotesk', 'Instrument Sans', 'Schibsted Grotesk', 'Onest'],
    ['Space Grotesk', 'Sora', 'Outfit', 'Bricolage Grotesque', 'Montserrat'],
    ['Fraunces', 'Newsreader', 'Source Serif 4', 'Instrument Serif', 'Lora'],
  ];
  const big = n => `<div class="pad" style="container-type:inline-size;padding:28px"><p class="h" style="${st(n, hw(n))};font-size:clamp(34px,8cqi,76px);line-height:1.02;letter-spacing:-0.025em">Rubrik som är<br>två rader lång</p></div>`;
  const BIG_ROUNDS = [
    ['Inter', 'Geist', 'Manrope', 'Plus Jakarta Sans'],
    ['Space Grotesk', 'Bricolage Grotesque', 'Sora', 'Syne'],
    ['Fraunces', 'Instrument Serif', 'Playfair Display', 'Newsreader'],
    ['DM Sans', 'Figtree', 'Archivo', 'Schibsted Grotesk'],
  ];
  const COMMON = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'];
  const lead = n => `<div class="pad"><p style="font-family:${ff(n)};font-size:19px;line-height:1.5;max-width:34ch">En ingress är lite större än brödtexten och sammanfattar det viktigaste.</p></div>`;
  groups.push({
    key: 'rubrik-storlek', title: 'Rubriker i olika storlekar',
    questions: [
      ...CT_ROUNDS.map((fams, i) => Q(`korttitel-${pad2(i)}`,
        `Små rubriker på kort, omgång ${i + 1} av ${CT_ROUNDS.length}: vilket typsnitt?`,
        fontOpts(fams, cardTitle))),
      ...BIG_ROUNDS.map((fams, i) => Q(`stor-rubrik-${pad2(i)}`,
        `Stora rubriker högst upp på sidan, omgång ${i + 1} av ${BIG_ROUNDS.length}: vilket typsnitt?`,
        fontOpts(fams, big), 'stack')),
    ],
  });
  groups.push({
    key: 'vanliga', title: 'De vanligaste typsnitten',
    questions: [
      Q('vanliga-rubrik', 'De vanligaste typsnitten: vilket är bäst för rubriker?', fontOpts(COMMON, n => head(n, HT[7], { body: true }))),
      Q('vanliga-rubrik-aldrig', 'De vanligaste typsnitten: vilket ska aldrig användas till rubriker?', fontOpts(COMMON, n => head(n, HT[7]))),
      Q('vanliga-brodtext', 'De vanligaste typsnitten: vilket är bäst för brödtext?', fontOpts(COMMON, n => para(n))),
      Q('vanliga-brodtext-aldrig', 'De vanligaste typsnitten: vilket ska aldrig användas till brödtext?', fontOpts(COMMON, n => para(n))),
      Q('knapp-aldrig', 'Vilket typsnitt ska aldrig användas i knappar?',
        fontOpts(['Montserrat', 'Poppins', 'Raleway', 'Syne', 'Unbounded', 'Rubik'], n => btns(n))),
      Q('pris-aldrig', 'Vilket typsnitt ska aldrig användas till priser?',
        fontOpts(['Raleway', 'Playfair Display', 'Syne', 'Unbounded', 'Cormorant', 'Montserrat'], price)),
      Q('ingress-01', 'Ingress under rubriken, omgång 1 av 2: vilket typsnitt?',
        fontOpts(['Inter', 'DM Sans', 'Manrope', 'Source Serif 4', 'Newsreader'], lead)),
      Q('ingress-02', 'Ingress under rubriken, omgång 2 av 2: vilket typsnitt?',
        fontOpts(['Geist', 'Plus Jakarta Sans', 'Figtree', 'Fraunces', 'Lora'], lead)),
    ],
  });

  // =====================================================================
  // Typsnitt som delen laddar
  // =====================================================================
  const FONTS = [
    'Inter:wght@400..800', 'DM Sans:wght@400..800', 'Manrope:wght@400..800', 'Figtree:wght@400..800',
    'Plus Jakarta Sans:wght@400..800', 'Work Sans:wght@400..800', 'IBM Plex Sans:wght@400..700', 'Space Grotesk:wght@400..700',
    'Sora:wght@400..800', 'Outfit:wght@400..800', 'Archivo:wdth,wght@62..125,400..800', 'Montserrat:wght@400..800',
    'Hanken Grotesk:wght@400..800', 'Instrument Sans:wdth,wght@75..100,400..700', 'Schibsted Grotesk:wght@400..800', 'Onest:wght@400..800',
    'Bricolage Grotesque:opsz,wdth,wght@12..96,75..100,400..800', 'Geist:wght@400..800', 'Public Sans:wght@400..800', 'Rubik:wght@400..800',
    'Lexend:wght@400..800', 'Poppins:wght@400;500;600;700;800', 'Raleway:wght@400..800', 'Nunito Sans:wght@400..800',
    'Open Sans:wght@400..800', 'Roboto:wdth,wght@75..100,400..800', 'Lato:wght@400;700;900', 'Source Sans 3:wght@400..800',
    'Albert Sans:wght@400..800', 'Urbanist:wght@400..800', 'Red Hat Display:wght@400..800', 'Epilogue:wght@400..800',
    'Syne:wght@400..800', 'Unbounded:wght@400..800',
    'Fraunces:opsz,wght@9..144,400..800', 'Playfair Display:wght@400..800', 'Lora:wght@400..700', 'Source Serif 4:opsz,wght@8..60,400..800',
    'DM Serif Display', 'Instrument Serif', 'Newsreader:opsz,wght@6..72,400..700', 'Libre Caslon Text:wght@400;700',
    'EB Garamond:wght@400..800', 'Cormorant:wght@400..700',
    'JetBrains Mono:wght@400..700', 'IBM Plex Mono:wght@400;500;600', 'DM Mono:wght@400;500', 'Geist Mono:wght@400..600',
  ];

  window.QZ.part({ key: 'typsnitt', fonts: FONTS, groups });
})();
