/* Elevate designquiz: Navigering och menyer (nyckel navigering, prefix na-).
   Frågorna byggs med små generatorer. Varje alternativ får en unik klass (nv…)
   för sin egen CSS, och en gemensam grundstil med prefixet .nvb som är lika i alla alternativ. */
(function () {
  const NAV = ['Tjänster', 'Priser', 'Om oss', 'Kontakt'];
  let N = 0;
  const uid = () => 'nv' + (++N).toString(36);

  // ---------- Ikoner ----------
  const P = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    menu2: '<path d="M4 9h16M4 15h16"/>',
    menuS: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    chevU: '<path d="M6 15l6-6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowU: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    camera: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    play: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
    bubble: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  };
  const ic = (k, s = 20, sw = 2, st = '') => `<svg class="ico" style="width:${s}px;height:${s}px${st ? ';' + st : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k]}</svg>`;
  const caret = (s = 12) => `<svg class="ico" style="width:${s}px;height:${s}px" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9h12l-6 7z" fill="currentColor"/></svg>`;
  const cursor = (st) => `<svg class="nvb-cur" style="${st}" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l13 8.5-5.6 1.2L10 18.5z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

  // ---------- Grundstil (lika i alla alternativ) ----------
  const BASE = `.nvb{container-type:inline-size;background:var(--ground);min-width:0;width:100%;text-align:left;position:relative}
.nvb a{color:inherit;text-decoration:none;cursor:default}
.nvb-h{display:flex;align-items:center;flex-wrap:wrap;gap:10px 28px;min-height:var(--hh,72px);padding:0 var(--hp,32px);background:var(--hbg,#fff);color:var(--hc,var(--sink));border-bottom:var(--hbd,1px solid var(--sline));box-shadow:var(--hsh,none);position:relative;z-index:3}
.nvb-logo{font-family:var(--fh);font-weight:800;font-size:var(--ls,20px);letter-spacing:-.02em;line-height:1;white-space:nowrap}
.nvb-m{display:flex;align-items:center;flex-wrap:wrap;gap:6px var(--mg,28px);font-size:var(--ms,15px);font-weight:var(--mw,500);color:var(--mc,inherit);min-width:0}
.nvb-m a{white-space:nowrap;position:relative;display:inline-flex;align-items:center;gap:4px}
.nvb-sp{flex:1 1 0;min-width:0}
.nvb-r{display:flex;align-items:center;gap:var(--rg,16px);flex-wrap:wrap;min-width:0}
.nvb-cta{height:var(--ch,40px);padding:0 18px;font-size:14px}
.nvb-lc,.nvb-cl{display:grid;grid-template-columns:1fr auto 1fr}
.nvb-lc>.nvb-r,.nvb-cl>.nvb-r{justify-self:end}.nvb-lc>.nvb-l,.nvb-cl>.nvb-l{justify-self:start}
.nvb-cl>.nvb-logo{justify-self:center}
.nvb-ul{flex-direction:column;align-items:stretch;gap:0;padding:0}
.nvb-ur{display:flex;align-items:center;gap:16px;min-height:var(--hh,72px);padding:0 var(--hp,32px);flex-wrap:wrap}
.nvb-un{display:flex;align-items:center;min-height:48px;padding:0 var(--hp,32px)}
.nvb-pg{padding:22px var(--hp,32px) 26px;display:flex;flex-direction:column;gap:6px}
.nvb-pg .h{font-size:24px}
.nvb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;color:inherit;white-space:nowrap}
.nvb-cur{position:absolute;width:18px;height:18px;z-index:9;pointer-events:none}
.nvb-hero{position:relative;min-height:280px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff}
.nvb-hero>.nvb-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}
.nvb-hero>.nvb-sh{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.45),rgba(0,0,0,.05) 60%)}
.nvb-hero>.nvb-h{position:absolute;top:0;left:0;right:0}
.nvb-ht{position:relative;padding:28px var(--hp,32px)}
.nvb-ht .h{color:#fff;font-size:30px}
.nvb-ph{width:100%;max-width:228px;margin:16px auto;border:7px solid #1F2124;border-radius:30px;overflow:hidden;background:var(--ground);aspect-ratio:9/15.5;display:flex;flex-direction:column;position:relative;font-size:14px;container-type:normal}
.nvb-mh{display:flex;align-items:center;gap:10px;height:var(--mhh,56px);padding:0 14px;background:#fff;border-bottom:1px solid var(--sline);flex:0 0 auto;position:relative;z-index:2;color:var(--sink)}
.nvb-mh .nvb-logo{font-size:17px}.nvb-msp{flex:1 1 0;min-width:0}
.nvb-mb{flex:1;padding:18px 14px;display:flex;flex-direction:column;gap:9px;min-height:0}
.nvb-mb i{display:block;height:8px;border-radius:4px;background:#DCDEE1}
.nvb-mb .h{font-size:19px}
.nvb-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px}
.nvb-fr{border:1px solid var(--sline);border-radius:10px;overflow:hidden;background:#fff;min-width:0;display:flex;flex-direction:column}
.nvb-one{grid-template-columns:1fr}
.nvb-cap{font-size:12px;font-weight:600;color:var(--smuted);padding:0 2px 6px}
.nvb-dd{position:absolute;left:-14px;top:var(--ddt,calc(100% + (var(--hh,72px) - 22px) / 2 + var(--ddg,8px)));min-width:210px;background:#fff;border-radius:var(--ddr,10px);box-shadow:var(--dds,0 8px 28px rgba(20,22,24,.12));border:var(--ddb,1px solid var(--sline));padding:6px;display:flex;flex-direction:column;font-weight:400;font-size:15px;color:var(--sink);z-index:6;text-align:left}
.nvb-ddi{position:relative;display:flex;align-items:center;gap:10px;min-height:var(--ddh,40px);padding:0 12px;border-radius:6px;white-space:nowrap}
.nvb-nub{position:absolute;top:-7px;left:28px;width:12px;height:12px;background:#fff;border-left:var(--ddb,1px solid var(--sline));border-top:var(--ddb,1px solid var(--sline));transform:rotate(45deg)}
.nvb-dim{position:absolute;inset:0;background:rgba(20,22,24,.45);z-index:3}
.nvb-pan{position:absolute;top:0;bottom:0;background:#fff;z-index:4;display:flex;flex-direction:column;color:var(--sink);overflow:hidden}
.nvb-pb{display:flex;align-items:center;gap:10px;height:var(--mhh,56px);padding:0 14px 0 18px;flex:0 0 auto}
.nvb-ml{display:flex;flex-direction:column;padding:6px 18px 10px}
.nvb-ml>span{display:flex;align-items:center;min-height:var(--mvh,52px);font-size:var(--mvs,18px);font-weight:var(--mvw,600);color:var(--sink);border-bottom:1px solid var(--sline);line-height:1.2}
.nvb-mx{display:flex;flex-direction:column;gap:8px;padding:10px 18px;font-size:13px;color:var(--smuted)}
.nvb-mx>span{display:inline-flex;align-items:center;gap:8px}
@container (max-width:680px){.nvb>*{--hp:16px}.nvb-h{padding:10px 16px;gap:10px 18px}.nvb-lc,.nvb-cl{display:flex}.nvb-m{order:9;flex-basis:100%}.nvb-sp{display:none}.nvb-r{margin-left:auto}.nvb-l{margin-left:0}.nvb-cl>.nvb-logo{order:-1}.nvb-cl>.nvb-l{order:2;flex-basis:100%}.nvb-cl .nvb-m{order:0;flex-basis:auto}.nvb-pg,.nvb-ht{padding-inline:16px}.nvb-ur,.nvb-un{padding-inline:16px}.nvb-ul{padding:0}.nvb-two{grid-template-columns:1fr}}`;

  // Ett alternativ: unik klass, egen CSS där & byts mot klassen.
  const opt = (inner, css = '', vars = '', cls = '') => {
    const u = uid();
    return `<style>${BASE}${css.replace(/&/g, '.' + u)}</style><div class="nvb ${u}${cls ? ' ' + cls : ''}"${vars ? ` style="${vars}"` : ''}>${inner}</div>`;
  };

  const LOGO = '<span class="nvb-logo">Företaget</span>';
  const CTA = '<span class="sb nvb-cta">Boka tid</span>';
  const PAGE = '<div class="nvb-pg"><p class="h">Rubrik på sidan</p><p class="muted">Kort text som visar var sidan börjar.</p></div>';
  const menu = (o = {}) => {
    const items = o.items || NAV;
    return `<nav class="nvb-m${o.mcls ? ' ' + o.mcls : ''}">${items.map((t, i) => `<a${i === o.on ? ' class="on"' : ''}>${o.pre ? o.pre(i) : ''}${t}${o.post ? o.post(i) : ''}</a>`).join('')}</nav>`;
  };

  // Header i full bredd. o.lay: lr, ll, lc, cl, ul, ulc. o.cta (false = ingen), o.extra före knappen.
  const head = (o = {}) => {
    const nav = o.nav !== undefined ? o.nav : menu(o);
    const logo = o.logo || LOGO;
    const cta = o.cta === false ? '' : (o.cta || CTA);
    const right = (o.extra || '') + cta;
    const R = right ? `<div class="nvb-r">${right}</div>` : '';
    const lay = o.lay || 'lr';
    let inner;
    if (lay === 'lr') inner = `${o.left || ''}${logo}<span class="nvb-sp"></span>${nav}${R}`;
    else if (lay === 'll') inner = `${logo}${nav}<span class="nvb-sp"></span>${R}`;
    else if (lay === 'lc') inner = `<div class="nvb-r nvb-l">${o.left || ''}${logo}</div>${nav}${R || '<span></span>'}`;
    else if (lay === 'cl') {
      const items = o.items || NAV;
      inner = `<div class="nvb-r nvb-l">${o.left !== undefined ? o.left : menu({ ...o, items: items.slice(0, 2) })}</div>${logo}<div class="nvb-r">${o.rightNav !== undefined ? o.rightNav : menu({ ...o, items: items.slice(2), on: o.on !== undefined ? o.on - 2 : undefined })}${right}</div>`;
    } else if (lay === 'ul' || lay === 'ulc') {
      const c = lay === 'ulc';
      inner = `<div class="nvb-ur" style="${c ? 'justify-content:center;position:relative' : ''}">${logo}${c ? '' : '<span class="nvb-sp"></span>'}${R && !c ? R : ''}</div><div class="nvb-un"${o.unStyle || c ? ` style="${c ? 'justify-content:center;' : ''}${o.unStyle || ''}"` : ''}>${nav}</div>`;
    }
    return `${o.top || ''}<header class="nvb-h nvb-${lay === 'ulc' ? 'ul' : lay}"${o.hstyle ? ` style="${o.hstyle}"` : ''}>${inner}</header>`;
  };
  // Header + sida
  const H = (o = {}) => opt(head(o) + (o.page === false ? '' : (o.page || PAGE)), o.css || '', o.vars || '', o.cls || '');
  // Header ovanpå foto
  const HERO = (o = {}, img = 'stadsgata', alt = 'Gata i en stad') =>
    `<div class="nvb-hero"><img class="nvb-bg" src="img/${img}.jpg" alt="${alt}">${o.noShade ? '' : '<div class="nvb-sh"></div>'}${o.over ? head(o) : ''}<div class="nvb-ht"><p class="h">Rubrik på sidan</p></div></div>`;

  // ---------- Mobil ----------
  const burger = (k = 'menu', s = 24, sw = 2) => `<span class="nvb-btn">${ic(k, s, sw)}</span>`;
  const mhead = (o = {}) => {
    const btn = o.btn !== undefined ? o.btn : burger();
    const left = o.leftBtn ? btn : '';
    const right = o.leftBtn ? (o.right || '') : `${o.right || ''}${btn}`;
    return `<div class="nvb-mh"${o.mstyle ? ` style="${o.mstyle}"` : ''}>${left}${o.logo || LOGO}<span class="nvb-msp"></span>${right}</div>`;
  };
  const MBODY = '<div class="nvb-mb"><p class="h">Rubrik på sidan</p><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i><i style="width:40%;height:34px;border-radius:8px;margin-top:6px;background:#C9CDD2"></i></div>';
  const phone = (inner, css = '', vars = '') => opt(`<div class="nvb-ph">${inner}</div>`, css, vars);
  const M = (o = {}) => phone(mhead(o) + (o.body || MBODY), o.css || '', o.vars || '');

  // ---------- Frågor ----------
  const G = [];
  let cur;
  const group = (key, title) => { cur = { key, title, questions: [] }; G.push(cur); };
  const q = (id, text, layout, opts) => cur.questions.push({ id: 'na-' + id, q: text, layout, opts: opts.map(([l, h]) => (h ? { l, h } : { l })) });
  const S = 'stack', GR = 'grid';
  const wbtn = '<span class="sb nvb-cta" style="background:#fff;border-color:#fff;color:var(--brand)">Boka tid</span>';

  /* ===== Header: layout ===== */
  group('header-layout', 'Header: layout');
  q('hl-layout', 'Hur ska headern vara uppbyggd?', S, [
    ['Logo vänster, meny höger', H({ lay: 'lr' })],
    ['Logo och meny vänster, knapp höger', H({ lay: 'll', vars: '--mg:28px' })],
    ['Logo vänster, meny i mitten', H({ lay: 'lc' })],
    ['Logo i mitten, meny på båda sidor', H({ lay: 'cl' })],
    ['Meny på egen rad under logon', H({ lay: 'ul' })]
  ]);
  q('hl-mittlogo', 'Om logon står i mitten, hur ska resten fördelas?', S, [
    ['Menyn delad på båda sidor', H({ lay: 'cl' })],
    ['Meny vänster, knapp höger', H({ lay: 'cl', left: menu(), rightNav: '' })],
    ['Menyknapp vänster, knapp höger', H({ lay: 'cl', left: `<span class="nvb-btn" style="font-weight:600;font-size:15px">${ic('menu', 22)}Meny</span>`, rightNav: '' })]
  ]);
  q('hl-under', 'Om menyn ligger på en egen rad, hur ska den ställas?', S, [
    ['Logo och meny vänsterställda', H({ lay: 'ul', unStyle: 'border-top:1px solid var(--sline)' })],
    ['Logo och meny centrerade', H({ lay: 'ulc', cta: false, unStyle: 'border-top:1px solid var(--sline)' })]
  ]);
  q('hl-under-rad', 'Hur ska menyraden under logon skiljas av?', S, [
    ['Ingen avgränsning', H({ lay: 'ul' })],
    ['Tunn linje mellan raderna', H({ lay: 'ul', unStyle: 'border-top:1px solid var(--sline)' })],
    ['Menyraden på ljusgrå yta', H({ lay: 'ul', unStyle: 'background:var(--ground);border-top:1px solid var(--sline)' })]
  ]);
  q('hl-marginal', 'Hur långt in från kanten ska headerns innehåll börja?', S, [
    ['16 px från kanten', H({ vars: '--hp:16px' })],
    ['40 px från kanten', H({ vars: '--hp:40px' })],
    ['Samma bredd som innehållet (max 960 px)', H({ css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}' })]
  ]);
  q('hl-logostorlek', 'Hur stor ska ordlogon vara i headern?', S, [
    ['18 px', H({ vars: '--ls:18px' })],
    ['22 px', H({ vars: '--ls:22px' })],
    ['26 px', H({ vars: '--ls:26px' })]
  ]);
  q('hl-logoavstand', 'Hur stort avstånd ska det vara mellan logo och meny när båda står till vänster?', S, [
    ['32 px', H({ lay: 'll', hstyle: 'column-gap:32px' })],
    ['48 px', H({ lay: 'll', hstyle: 'column-gap:48px' })],
    ['72 px', H({ lay: 'll', hstyle: 'column-gap:72px' })]
  ]);

  /* ===== Header: höjd ===== */
  group('header-hojd', 'Header: höjd');
  q('hh-hojd', 'Hur hög ska headern vara på dator?', S, [56, 64, 72, 80, 96].map(h => [`${h} px hög`, H({ vars: `--hh:${h}px` })]));
  q('hh-mobil', 'Hur hög ska headern vara i mobilen?', GR, [48, 56, 64, 72].map(h => [`${h} px hög`, M({ vars: `--mhh:${h}px` })]));

  /* ===== Header: bakgrund ===== */
  group('header-bakgrund', 'Header: bakgrund');
  q('hb-ton', 'Vilken bakgrund ska headern ha?', S, [
    ['Vit', H({})],
    ['Samma ljusgrå som sidan', H({ vars: '--hbg:var(--ground)' })],
    ['Färgad (huvudfärgen)', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Mörk', H({ vars: '--hbg:var(--sink);--hc:#fff;--hbd:0', cta: wbtn })]
  ]);
  q('hb-bild', 'Hur ska headern se ut när sidan börjar med en stor bild?', S, [
    ['Genomskinlig med vit text', opt(HERO({ over: true }), '', '--hbg:transparent;--hc:#fff;--hbd:0')],
    ['Vit header ovanför bilden', opt(head({}) + HERO({}))],
    ['Halvgenomskinlig mörk platta', opt(HERO({ over: true }), '', '--hbg:rgba(20,22,24,.55);--hc:#fff;--hbd:0')],
    ['Frostat glas med mörk text', opt(HERO({ over: true }), '& .nvb-h{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}', '--hbg:rgba(255,255,255,.72);--hbd:0')]
  ]);
  q('hb-toning', 'Ska en genomskinlig header över bild ha en mörk toning bakom sig?', S, [
    ['Ingen extra toning', opt(HERO({ over: true }), '', '--hbg:transparent;--hc:#fff;--hbd:0')],
    ['Mörk toning uppifrån', opt(HERO({ over: true }), '', '--hbg:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,0));--hc:#fff;--hbd:0')]
  ]);
  q('hb-fargknapp', 'Vilken knapp ska sitta i en färgad header?', S, [
    ['Vit fylld knapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Vit konturknapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: '<span class="sb2 nvb-cta" style="border-color:#fff;color:#fff">Boka tid</span>' })],
    ['Mörk fylld knapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: '<span class="sb nvb-cta" style="background:var(--sink);border-color:var(--sink)">Boka tid</span>' })]
  ]);
  q('hb-fargmeny', 'Hur ska menytexten se ut i en färgad header?', S, [
    ['Helvit på alla menyval', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn, on: 0 })],
    ['Svagare vit, aktiv sida helvit', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn, on: 0, css: '& .nvb-m a{color:rgba(255,255,255,.72)}& .nvb-m a.on{color:#fff}' })]
  ]);

  /* ===== Header: avgränsning ===== */
  group('header-avgransning', 'Header: avgränsning');
  const W = '--ground:#fff;';
  q('ha-typ', 'Hur ska headern skiljas från sidan under?', S, [
    ['Tunn linje', H({ vars: W })],
    ['Mjuk skugga', H({ vars: W + '--hbd:0;--hsh:0 4px 16px rgba(20,22,24,.08)' })],
    ['Ingen avgränsning', H({ vars: W + '--hbd:0' })],
    ['Linje och skugga', H({ vars: W + '--hsh:0 4px 16px rgba(20,22,24,.06)' })]
  ]);
  q('ha-linje', 'Hur stark ska linjen under headern vara?', S, [
    ['Mycket ljus linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.07)' })],
    ['Ljusgrå linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.16)' })],
    ['Mörkare grå linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.32)' })]
  ]);
  q('ha-skugga', 'Hur tydlig ska skuggan under headern vara?', S, [
    ['Knappt synlig', H({ vars: W + '--hbd:0;--hsh:0 1px 4px rgba(20,22,24,.06)' })],
    ['Mjuk', H({ vars: W + '--hbd:0;--hsh:0 4px 16px rgba(20,22,24,.09)' })],
    ['Tydlig', H({ vars: W + '--hbd:0;--hsh:0 6px 22px rgba(20,22,24,.18)' })]
  ]);
  q('ha-linjebredd', 'Hur bred ska linjen under headern vara?', S, [
    ['Kant till kant', H({ vars: W, css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}' })],
    ['Bara lika bred som innehållet', H({ vars: W + '--hbd:0', css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}& .nvb-h::after{content:"";position:absolute;bottom:0;height:1px;background:var(--sline);left:max(16px,calc((100% - 960px) / 2));right:max(16px,calc((100% - 960px) / 2))}' })]
  ]);
  const FRAMECSS = '& .nvb-h{--hp:16px;min-height:52px;column-gap:18px}& .nvb-logo{font-size:16px}& .nvb-m{font-size:13px;--mg:16px}& .nvb-cta{height:32px;padding:0 12px;font-size:12px}& .nvb-pg{padding:16px}& .nvb-pg .h{font-size:17px}& .nvb-sc{font-size:13px;color:var(--smuted);padding:12px 16px}@container (max-width:680px){& .nvb-m{display:none}}';
  const twoStates = (a, b) => `<div class="nvb-two"><div><p class="nvb-cap">Överst på sidan</p><div class="nvb-fr">${a}</div></div><div><p class="nvb-cap">Efter scroll</p><div class="nvb-fr">${b}</div></div></div>`;
  const SCR = '<div class="nvb-sc">… sidans innehåll har scrollat förbi …</div>';
  q('ha-scroll', 'När ska avgränsningen under headern synas?', S, [
    ['Alltid linje', opt(twoStates(head({ items: NAV.slice(0, 3) }) + PAGE, head({ items: NAV.slice(0, 3) }) + SCR), FRAMECSS, W)],
    ['Linje först efter scroll', opt(twoStates(head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent' }) + PAGE, head({ items: NAV.slice(0, 3) }) + SCR), FRAMECSS, W)],
    ['Skugga först efter scroll', opt(twoStates(head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent' }) + PAGE, head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent;box-shadow:0 4px 16px rgba(20,22,24,.1)' }) + SCR), FRAMECSS, W)]
  ]);

  /* ===== Header: knapp ===== */
  group('header-knapp', 'Header: knapp');
  q('hc-finns', 'Ska headern ha en knapp?', S, [
    ['Ingen knapp', H({ cta: false })],
    ['Fylld knapp', H({})],
    ['Textlänk med pil', H({ cta: `<span class="nvb-btn" style="color:var(--brand);font-weight:600;font-size:15px">Boka tid ${ic('arrowR', 18)}</span>` })]
  ]);
  q('hc-stil', 'Vilken stil ska knappen i headern ha?', S, [
    ['Fylld i huvudfärgen', H({})],
    ['Kontur', H({ cta: '<span class="sb2 nvb-cta">Boka tid</span>' })],
    ['Ljust tonad', H({ cta: '<span class="sb nvb-cta" style="background:var(--tint);border-color:var(--tint);color:var(--brand)">Boka tid</span>' })],
    ['Mörk fylld', H({ cta: '<span class="sb nvb-cta" style="background:var(--sink);border-color:var(--sink)">Boka tid</span>' })]
  ]);
  q('hc-storlek', 'Hur hög ska knappen i headern vara?', S, [36, 40, 44, 48].map(h => [`${h} px hög`, H({ vars: `--ch:${h}px` })]));
  q('hc-rundning', 'Hur rund ska knappen i headern vara?', S, [
    ['4 px rundning', H({ vars: '--rb:4px' })],
    ['8 px rundning', H({ vars: '--rb:8px' })],
    ['Helt rund (pill)', H({ vars: '--rb:999px' })]
  ]);
  q('hc-avstand', 'Hur mycket luft ska det vara mellan menyn och knappen?', S, [16, 32, 56].map(g => [`${g} px`, H({ css: `& .nvb-r{margin-left:${g - 28}px}` })]));
  q('hc-avdelare', 'Ska knappen skiljas från menyn med en avdelare?', S, [
    ['Ingen avdelare', H({})],
    ['Tunt lodstreck före knappen', H({ extra: '<span style="width:1px;height:24px;background:var(--sline)"></span>', vars: '--rg:24px' })]
  ]);
  q('hc-tva', 'Hur många handlingar ska stå till höger i headern?', S, [
    ['En knapp', H({})],
    ['Textlänk och knapp', H({ extra: '<span style="font-weight:600;font-size:15px">Logga in</span>' })],
    ['Konturknapp och fylld knapp', H({ extra: '<span class="sb2 nvb-cta">Logga in</span>', vars: '--rg:10px' })]
  ]);
  q('hc-pil', 'Ska knappen i headern ha en ikon?', S, [
    ['Bara text', H({})],
    ['Pil efter texten', H({ cta: `<span class="sb nvb-cta">Boka tid ${ic('arrowR', 16)}</span>` })],
    ['Ikon före texten', H({ cta: `<span class="sb nvb-cta">${ic('cal', 16)} Boka tid</span>` })]
  ]);
  q('hc-mobil', 'Ska knappen synas i mobilens header?', GR, [
    ['Bara menyknappen', M({})],
    ['Liten knapp bredvid menyknappen', M({ right: '<span class="sb" style="height:34px;padding:0 12px;font-size:13px">Boka tid</span>' })],
    ['Ikonknapp bredvid menyknappen', M({ right: `<span class="nvb-btn" style="width:36px;height:36px;border-radius:999px;background:var(--brand);color:#fff">${ic('phone', 17)}</span>` })]
  ]);

  /* ===== Header: telefon och ikoner ===== */
  group('header-ikoner', 'Header: telefon och ikoner');
  const TEL = '08-123 456 78';
  q('hi-telefon', 'Ska telefonnumret synas i headern?', S, [
    ['Inget telefonnummer', H({})],
    ['Nummer med ikon', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:15px">${ic('phone', 17)}${TEL}</span>` })],
    ['Bara telefonikon', H({ extra: `<span class="nvb-btn">${ic('phone', 20)}</span>` })],
    ['Nummer i ett fält ovanför', H({ top: `<div style="background:var(--ground);border-bottom:1px solid var(--sline);font-size:13px;display:flex;justify-content:flex-end;align-items:center;gap:6px;min-height:34px;padding:0 var(--hp,32px)">${ic('phone', 14)}${TEL}</div>` })]
  ]);
  q('hi-telstil', 'Hur ska telefonnumret i headern se ut?', S, [
    ['Vanlig text med ikon', H({ extra: `<span class="nvb-btn" style="font-size:15px">${ic('phone', 17)}${TEL}</span>` })],
    ['Fet text med ikon', H({ extra: `<span class="nvb-btn" style="font-size:15px;font-weight:700">${ic('phone', 17)}${TEL}</span>` })],
    ['Två rader: "Ring oss" över numret', H({ extra: `<span style="display:flex;flex-direction:column;line-height:1.2"><span class="small muted">Ring oss</span><b style="font-size:15px">${TEL}</b></span>` })],
    ['Som konturknapp', H({ extra: `<span class="sb2 nvb-cta">${ic('phone', 16)}${TEL}</span>`, vars: '--rg:10px' })]
  ]);
  const IC2 = (f) => f('search', 'Sök') + f('user', 'Konto');
  q('hi-ikontext', 'Ska ikonerna i headern ha text?', S, [
    ['Bara ikoner', H({ extra: IC2((k) => `<span class="nvb-btn">${ic(k, 20)}</span>`) })],
    ['Text under ikonen', H({ extra: IC2((k, t) => `<span class="nvb-btn" style="flex-direction:column;gap:2px;font-size:11px;font-weight:500">${ic(k, 20)}${t}</span>`) })],
    ['Text bredvid ikonen', H({ extra: IC2((k, t) => `<span class="nvb-btn" style="font-size:14px;font-weight:500">${ic(k, 18)}${t}</span>`) })]
  ]);
  q('hi-ikonstorlek', 'Hur stora ska ikonerna i headern vara?', S, [18, 20, 24].map(s => [`${s} px`, H({ extra: IC2((k) => `<span class="nvb-btn">${ic(k, s)}</span>`) })]));
  q('hi-ikonplatta', 'Ska ikonerna i headern ligga på en platta?', S, [
    ['Fri ikon', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px">${ic(k, 20)}</span>`), vars: '--rg:6px' })],
    ['Rund ljus platta', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px;border-radius:999px;background:var(--tint)">${ic(k, 20)}</span>`), vars: '--rg:8px' })],
    ['Rund kontur', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px;border-radius:999px;border:1px solid var(--sline)">${ic(k, 20)}</span>`), vars: '--rg:8px' })]
  ]);
  q('hi-sprak', 'Hur ska språkvalet se ut i headern?', S, [
    ['Inget språkval', H({})],
    ['"SV" med liten pil', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:14px;gap:2px">SV${ic('chevD', 16)}</span>` })],
    ['Jordglob och SV', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:14px">${ic('globe', 18)}SV</span>` })],
    ['"SV | EN" bredvid varandra', H({ extra: '<span style="font-size:14px;display:inline-flex;gap:6px"><b>SV</b><span class="muted">|</span><span class="muted">EN</span></span>' })]
  ]);

  /* ===== Menytext ===== */
  group('menytext', 'Menytext');
  q('mt-storlek', 'Hur stor ska menytexten vara?', S, [14, 15, 16, 17].map(s => [`${s} px`, H({ vars: `--ms:${s}px` })]));
  q('mt-vikt', 'Hur tung ska menytexten vara?', S, [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, H({ vars: `--mw:${w}` })]));
  q('mt-avstand', 'Hur stort avstånd ska det vara mellan menyvalen?', S, [20, 28, 36, 48].map(g => [`${g} px mellan`, H({ vars: `--mg:${g}px` })]));
  q('mt-versaler', 'Ska menytexten skrivas med versaler?', S, [
    ['Vanlig text', H({})],
    ['Versaler, 13 px, spärrade', H({ css: '& .nvb-m{text-transform:uppercase;font-size:13px;letter-spacing:.08em;font-weight:600}' })],
    ['Versaler, 15 px, lätt spärrade', H({ css: '& .nvb-m{text-transform:uppercase;letter-spacing:.04em}' })]
  ]);
  q('mt-farg', 'Vilken färg ska menytexten ha?', S, [
    ['Samma som brödtexten', H({})],
    ['Mörkgrå', H({ vars: '--mc:var(--smuted)' })],
    ['Huvudfärgen', H({ vars: '--mc:var(--brand)' })]
  ]);
  q('mt-avdelare', 'Ska det finnas avdelare mellan menyvalen?', S, [
    ['Inga avdelare', H({})],
    ['Tunna lodstreck', H({ css: '& .nvb-m a+a::before{content:"";position:absolute;left:-14px;top:50%;height:16px;margin-top:-8px;width:1px;background:var(--sline)}' })],
    ['Små prickar', H({ css: '& .nvb-m a+a::before{content:"";position:absolute;left:-16px;top:50%;width:4px;height:4px;margin-top:-2px;border-radius:50%;background:var(--smuted)}' })]
  ]);
  q('mt-ikoner', 'Ska menyvalen ha ikoner?', S, [
    ['Bara text', H({})],
    ['Liten ikon före texten', H({ pre: (i) => ic(['grid', 'tag', 'info', 'chat'][i], 17), vars: '--mg:28px', css: '& .nvb-m a{gap:7px}' })]
  ]);

  /* ===== Aktiv sida ===== */
  group('aktiv-sida', 'Aktiv sida i menyn');
  const ON = 1; // "Priser" är aktiv sida
  const ul = (t = 2, o = 6, c = 'var(--brand)', ex = '') => `& .nvb-m a.on::after{content:"";position:absolute;left:0;right:0;bottom:-${o + t}px;height:${t}px;background:${c};border-radius:${t > 2 ? t : 0}px;${ex}}`;
  const AH = (css, vars = '', x = {}) => H({ on: ON, css, vars, ...x });
  const PILL = '& .nvb-m{--mg:4px}& .nvb-m a{padding:7px 12px;border-radius:999px}';
  q('as-markering', 'Hur ska menyn visa vilken sida man är på?', S, [
    ['Understrykning', AH(ul())],
    ['Fetstil', AH('& .nvb-m a.on{font-weight:700}')],
    ['Ljus pill-bakgrund', AH(PILL + '& .nvb-m a.on{background:var(--tint);color:var(--brand);font-weight:600}')],
    ['Liten prick under', AH('& .nvb-m a.on::after{content:"";position:absolute;left:50%;bottom:-10px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--brand)}')],
    ['Huvudfärgen på texten', AH('& .nvb-m a.on{color:var(--brand);font-weight:600}')]
  ]);
  q('as-tjocklek', 'Hur tjock ska understrykningen för aktiv sida vara?', S, [1, 2, 3, 4].map(t => [`${t} px`, AH(ul(t))]));
  q('as-avstand', 'Hur långt under texten ska understrykningen sitta?', S, [
    ['2 px under texten', AH(ul(2, 2))],
    ['6 px under texten', AH(ul(2, 6))],
    ['10 px under texten', AH(ul(2, 10))],
    ['I headerns underkant', AH(`& .nvb-m a.on::after{content:"";position:absolute;left:0;right:0;height:2px;background:var(--brand);bottom:calc((var(--hh,72px) - 22px) / -2)}@container (max-width:680px){& .nvb-m a.on::after{bottom:-8px}}`)]
  ]);
  q('as-bredd', 'Hur bred ska understrykningen vara?', S, [
    ['Lika bred som ordet', AH(ul())],
    ['Kort streck i mitten', AH(ul(2, 6, 'var(--brand)', 'left:50%;right:auto;width:16px;margin-left:-8px'))],
    ['Lite bredare än ordet', AH(ul(2, 6, 'var(--brand)', 'left:-8px;right:-8px'))]
  ]);
  q('as-farg', 'Vilken färg ska markeringen för aktiv sida ha?', S, [
    ['Huvudfärgen', AH(ul())],
    ['Svart som texten', AH(ul(2, 6, 'var(--sink)'))]
  ]);
  q('as-pill', 'Hur ska en pill-markering för aktiv sida se ut?', S, [
    ['Ljust tonad, färgad text', AH(PILL + '& .nvb-m a.on{background:var(--tint);color:var(--brand)}')],
    ['Fylld i huvudfärgen, vit text', AH(PILL + '& .nvb-m a.on{background:var(--brand);color:#fff}')],
    ['Tunn kontur', AH(PILL + '& .nvb-m a{border:1px solid transparent}& .nvb-m a.on{border-color:var(--sline)}')],
    ['Ljusgrå', AH(PILL + '& .nvb-m a.on{background:#ECEDEE}')]
  ]);
  q('as-pillform', 'Hur rund ska pill-markeringen vara?', S, [
    ['6 px rundning', AH(PILL + '& .nvb-m a{border-radius:6px}& .nvb-m a.on{background:var(--tint);color:var(--brand)}')],
    ['Helt rund', AH(PILL + '& .nvb-m a.on{background:var(--tint);color:var(--brand)}')]
  ]);
  q('as-prick', 'Var ska prickarna för aktiv sida sitta?', S, [
    ['Under texten', AH('& .nvb-m a.on::after{content:"";position:absolute;left:50%;bottom:-10px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--brand)}')],
    ['Före texten', AH('& .nvb-m a.on::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--brand);margin-right:4px}')]
  ]);
  q('as-grad', 'Hur ska övriga menyval se ut bredvid den aktiva?', S, [
    ['Alla svarta, aktiv understruken', AH(ul())],
    ['Övriga grå, aktiv svart och understruken', AH(ul(2, 6, 'var(--sink)') + '& .nvb-m a{color:var(--smuted)}& .nvb-m a.on{color:var(--sink)}')],
    ['Övriga grå, bara aktiv svart', AH('& .nvb-m a{color:var(--smuted)}& .nvb-m a.on{color:var(--sink);font-weight:600}')]
  ]);
  q('as-kombo', 'Ska understrykningen kombineras med fetstil?', S, [
    ['Bara understrykning', AH(ul())],
    ['Understrykning och halvfet text', AH(ul() + '& .nvb-m a.on{font-weight:650}')]
  ]);
  q('as-forelder', 'Ska huvudvalet vara markerat när man står på en undersida?', S, [
    ['Ja, huvudvalet markeras', H({ on: 0, css: ul(), page: '<div class="nvb-pg"><p class="small muted">Tjänster › Undersida</p><p class="h">Undersida</p></div>' })],
    ['Nej, ingen markering i menyn', H({ page: '<div class="nvb-pg"><p class="small muted">Tjänster › Undersida</p><p class="h">Undersida</p></div>' })]
  ]);

  /* ===== Hover ===== */
  group('hover', 'Hover på menyval');
  const CUR = cursor('left:calc(100% - 6px);top:calc(100% - 2px)');
  const HV = (css, x = {}) => H({ post: (i) => (i === 1 ? CUR : ''), css: '& .nvb-m a:nth-child(2){}' + css, ...x });
  const hv = (r) => `& .nvb-m a:nth-child(2){${r}}`;
  q('ho-typ', 'Vad ska hända när man pekar på ett menyval?', S, [
    ['Understrykning visas', HV('& .nvb-m a:nth-child(2)::after{content:"";position:absolute;left:0;right:0;bottom:-8px;height:2px;background:var(--brand)}')],
    ['Texten byter till huvudfärgen', HV(hv('color:var(--brand)'))],
    ['Ljus platta bakom', HV(PILL + '& .nvb-m a{border-radius:8px}' + hv('background:var(--tint)'))],
    ['Övriga menyval tonas ner', HV('& .nvb-m a{opacity:.45}' + hv('opacity:1'))]
  ]);
  const anim = (k, from, to, dur = 1800) => `@keyframes ${k}{0%,8%{${from}}${Math.round(8 + 300 / dur * 100)}%,70%{${to}}${Math.round(70 + 300 / dur * 100)}%,100%{${from}}}`;
  const hvAnim = (name, base, from, to, ms) => {
    const k = 'nvk' + (++N);
    const grow = Math.round(ms / 2400 * 100);
    return `& .nvb-m a:nth-child(2)::after{content:"";position:absolute;left:0;right:0;bottom:-8px;height:2px;background:var(--brand);${base};animation:${k} 2.4s infinite}@keyframes ${k}{0%,15%{${from}}${15 + grow}%,70%{${to}}${70 + grow}%,100%{${from}}}@media (prefers-reduced-motion:reduce){& .nvb-m a:nth-child(2)::after{animation:none;${to}}}`;
  };
  q('ho-rorelse', 'Hur ska understrykningen dyka upp vid hover?', S, [
    ['Växer fram från vänster', HV(hvAnim('l', 'transform-origin:left', 'transform:scaleX(0)', 'transform:scaleX(1)', 250))],
    ['Växer fram från mitten', HV(hvAnim('c', 'transform-origin:center', 'transform:scaleX(0)', 'transform:scaleX(1)', 250))],
    ['Tonar in', HV(hvAnim('f', '', 'opacity:0', 'opacity:1', 250))],
    ['Syns direkt utan rörelse', HV('& .nvb-m a:nth-child(2)::after{content:"";position:absolute;left:0;right:0;bottom:-8px;height:2px;background:var(--brand)}')]
  ]);
  q('ho-fart', 'Hur snabb ska hover-övergången i menyn vara?', S, [[120, 'Snabb (120 ms)'], [250, 'Mellan (250 ms)'], [450, 'Lugn (450 ms)']].map(([ms, l]) => [l, HV(hvAnim('s', 'transform-origin:left', 'transform:scaleX(0)', 'transform:scaleX(1)', ms))]));
  q('ho-platta', 'Hur rund ska hover-plattan bakom menyvalet vara?', S, [
    ['Raka hörn', HV(PILL + '& .nvb-m a{border-radius:2px}' + hv('background:var(--tint)'))],
    ['6 px rundning', HV(PILL + '& .nvb-m a{border-radius:6px}' + hv('background:var(--tint)'))],
    ['Helt rund', HV(PILL + hv('background:var(--tint)'))]
  ]);
  q('ho-cta', 'Vad ska hända med headerns knapp vid hover?', S, [
    ['Blir mörkare', H({ cta: `<span class="sb nvb-cta" style="background:var(--brand-d);border-color:var(--brand-d);position:relative">Boka tid${cursor('right:6px;top:22px')}</span>` })],
    ['Lyfts med en skugga', H({ cta: `<span class="sb nvb-cta" style="position:relative;transform:translateY(-2px);box-shadow:0 6px 16px rgba(20,22,24,.22)">Boka tid${cursor('right:6px;top:22px')}</span>` })],
    ['Blir en konturknapp', H({ cta: `<span class="sb2 nvb-cta" style="position:relative">Boka tid${cursor('right:6px;top:22px')}</span>` })]
  ]);
  q('ho-mork', 'Hur ska hover synas i en mörk header?', S, [
    ['Svag vit platta', HV(PILL + '& .nvb-m a{border-radius:8px}' + hv('background:rgba(255,255,255,.14)'), { vars: '--hbg:var(--sink);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Vit understrykning', HV('& .nvb-m a:nth-child(2)::after{content:"";position:absolute;left:0;right:0;bottom:-8px;height:2px;background:#fff}', { vars: '--hbg:var(--sink);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Övriga tonas ner', HV('& .nvb-m a{opacity:.55}' + hv('opacity:1'), { vars: '--hbg:var(--sink);--hc:#fff;--hbd:0', cta: wbtn })]
  ]);

  /* ===== Dropdown ===== */
  group('dropdown', 'Dropdown och megameny');
  const DDI = ['Översikt', 'Undersida ett', 'Undersida två', 'Undersida tre'];
  const DDP = '<div class="nvb-pg" style="min-height:250px"><p class="h">Rubrik på sidan</p><p class="muted">Kort text som visar var sidan börjar.</p></div>';
  const ddList = (o = {}) => `<span class="nvb-dd"${o.st ? ` style="${o.st}"` : ''}>${o.nub ? '<span class="nvb-nub"></span>' : ''}${(o.items || DDI).map((t, i) => `<span class="nvb-ddi${i === o.hov ? ' hv' : ''}">${o.ico ? o.ico(i) : ''}${o.desc ? `<span style="display:flex;flex-direction:column;line-height:1.3;padding:4px 0"><b style="font-weight:600">${t}</b><span class="small muted">Kort beskrivning av sidan</span></span>` : t}${i === o.hov ? cursor('left:70%;top:55%') : ''}</span>`).join('')}</span>`;
  const chev = (i, k = 'chev') => (i === 0 || i === 2 ? (k === 'chev' ? ic('chevD', 16) : k === 'up' && i === 0 ? ic('chevU', 16) : k === 'up' ? ic('chevD', 16) : k === 'tri' ? caret(11) : k === 'plus' ? ic('plus', 14) : '') : '');
  const DD = (o = {}) => H({ lay: 'll', page: DDP, on: o.on, post: (i) => chev(i, o.arrow || (o.open === false ? 'chev' : 'up')) + (i === 0 && o.open !== false ? (o.panel || ddList(o)) : ''), css: (o.css || ''), vars: o.vars || '' });
  const MEGA = (o = {}) => {
    const col = (t, items) => `<div class="nvb-mc"><p class="nvb-mt">${t}</p>${items.map((x, i) => o.desc ? `<span class="nvb-mi"><b>${x}</b><span class="small muted">Kort beskrivning av sidan</span></span>` : `<span class="nvb-mi">${x}</span>`).join('')}</div>`;
    const cols = col('Grupp ett', ['Undersida ett', 'Undersida två', 'Undersida tre']) + col('Grupp två', ['Undersida fyra', 'Undersida fem', 'Undersida sex']) + (o.img ? '' : col('Grupp tre', ['Undersida sju', 'Undersida åtta', 'Undersida nio']));
    const img = o.img ? `<div class="nvb-mc"><img src="img/kontor-team.jpg" alt="Personer i ett möte" style="width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px"><span class="small" style="font-weight:600">Utvald undersida</span></div>` : '';
    const foot = o.foot === 'link' ? `<div class="nvb-mf"><span class="link" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Se alla tjänster ${ic('arrowR', 16)}</span></div>` : o.foot === 'box' ? `<div class="nvb-mf" style="background:var(--ground);display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:space-between"><span><b>Osäker på vad du behöver?</b> <span class="muted">Vi hjälper dig att välja.</span></span><span class="sb" style="height:40px;font-size:14px;padding:0 18px">Kontakta oss</span></div>` : '';
    return `<div class="nvb-mega"><div class="nvb-mg">${cols}${img}</div>${foot}</div>`;
  };
  const MEGACSS = '& .nvb-mega{position:absolute;left:0;right:0;top:100%;background:#fff;border-top:1px solid var(--sline);box-shadow:0 12px 28px rgba(20,22,24,.1);z-index:6;font-weight:400}& .nvb-mg{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:20px 32px;padding:24px var(--hp,32px)}& .nvb-mc{display:flex;flex-direction:column;gap:10px;min-width:0}& .nvb-mt{font-size:13px;font-weight:600;color:var(--smuted)}& .nvb-mi{display:flex;flex-direction:column;font-size:15px;line-height:1.35}& .nvb-mi b{font-weight:600}& .nvb-mf{padding:14px var(--hp,32px);border-top:1px solid var(--sline);font-size:14px}@container (max-width:680px){& .nvb-mc:nth-child(n+3){display:none}& .nvb-mg{padding:18px 16px}}';
  const MH = (o = {}) => H({ lay: 'll', page: '<div class="nvb-pg" style="min-height:' + (o.h || 190) + 'px"><p class="h">Rubrik på sidan</p></div>', post: (i) => chev(i, i === 0 ? 'up' : 'chev'), extra: '', css: MEGACSS, hstyle: 'position:relative', nav: undefined, ...o, top: '' }).replace('</header>', MEGA(o) + '</header>');
  q('dd-typ', 'Hur ska en undermeny med många sidor visas?', S, [
    ['Enkel lista under menyvalet', DD({})],
    ['Megameny med kolumner', MH({})],
    ['Megameny med beskrivningar', MH({ desc: true, h: 240 })]
  ]);
  q('dd-pil', 'Hur ska menyval med undermeny märkas?', S, [
    ['Liten chevron', DD({ open: false, arrow: 'chev' })],
    ['Fylld liten triangel', DD({ open: false, arrow: 'tri' })],
    ['Plustecken', DD({ open: false, arrow: 'plus' })],
    ['Ingen markering', DD({ open: false, arrow: 'none' })]
  ].map(([l, h]) => [l, h.replace('min-height:250px', 'min-height:0')]));
  q('dd-pil-oppen', 'Vad ska pilen göra när undermenyn är öppen?', S, [
    ['Vänds uppåt', DD({})],
    ['Står still', DD({ arrow: 'chev' })]
  ]);
  q('dd-skugga', 'Hur ska undermenyn skiljas från sidan bakom?', S, [
    ['Bara tunn kant', DD({ vars: '--dds:none' })],
    ['Mjuk skugga utan kant', DD({ vars: '--ddb:0;--dds:0 8px 28px rgba(20,22,24,.12)' })],
    ['Tydlig skugga utan kant', DD({ vars: '--ddb:0;--dds:0 12px 36px rgba(20,22,24,.24)' })],
    ['Kant och mjuk skugga', DD({})]
  ]);
  q('dd-rundning', 'Hur runda ska undermenyns hörn vara?', S, [[0, 'Raka hörn'], [6, '6 px rundning'], [12, '12 px rundning'], [18, '18 px rundning']].map(([r, l]) => [l, DD({ vars: `--ddr:${r}px` })]));
  q('dd-pekare', 'Ska undermenyn ha en liten pekare upptill?', S, [
    ['Utan pekare', DD({})],
    ['Med pekare mot menyvalet', DD({ nub: true })]
  ]);
  q('dd-avstand', 'Var ska undermenyn börja?', S, [
    ['Tätt under menyvalet', DD({ vars: '--ddt:calc(100% + 10px)' })],
    ['Precis vid headerns kant', DD({ vars: '--ddg:0px;--ddr:0 0 10px 10px' })],
    ['En bit under headern', DD({ vars: '--ddg:10px' })]
  ]);
  q('dd-radhojd', 'Hur höga ska raderna i undermenyn vara?', S, [32, 40, 48].map(h => [`${h} px per rad`, DD({ vars: `--ddh:${h}px` })]));
  q('dd-beskrivning', 'Ska valen i undermenyn ha en kort beskrivning?', S, [
    ['Bara namnet', DD({})],
    ['Namn och kort beskrivning', DD({ desc: true }).replace('min-height:250px', 'min-height:340px')]
  ]);
  q('dd-ikoner', 'Ska valen i undermenyn ha ikoner?', S, [
    ['Utan ikoner', DD({})],
    ['Ikon före namnet', DD({ ico: (i) => ic(['grid', 'doc', 'star', 'clock'][i], 18) })],
    ['Ikon i ljus platta', DD({ ico: (i) => `<span class="nvb-btn" style="width:30px;height:30px;border-radius:8px;background:var(--tint);color:var(--brand)">${ic(['grid', 'doc', 'star', 'clock'][i], 16)}</span>`, vars: '--ddh:46px' })]
  ]);
  q('dd-linjer', 'Ska det vara linjer mellan valen i undermenyn?', S, [
    ['Inga linjer', DD({})],
    ['Tunna linjer mellan valen', DD({ css: '& .nvb-ddi+.nvb-ddi{border-top:1px solid var(--sline);border-radius:0}' })]
  ]);
  q('dd-hover', 'Hur ska ett val i undermenyn se ut när man pekar på det?', S, [
    ['Ljus platta', DD({ hov: 2, css: '& .nvb-ddi.hv{background:var(--tint)}' })],
    ['Texten blir färgad', DD({ hov: 2, css: '& .nvb-ddi.hv{color:var(--brand);font-weight:500}' })],
    ['Streck till vänster', DD({ hov: 2, css: '& .nvb-ddi{border-radius:0}& .nvb-ddi.hv{box-shadow:inset 3px 0 0 var(--brand);background:var(--ground)}' })]
  ]);
  q('dd-megabild', 'Ska megamenyn ha en bild?', S, [
    ['Bara länkar', MH({})],
    ['Länkar och en bild', MH({ img: true, h: 290 })]
  ]);
  q('dd-megafot', 'Vad ska finnas längst ner i megamenyn?', S, [
    ['Ingenting extra', MH({})],
    ['Länken "Se alla tjänster →"', MH({ foot: 'link', h: 240 })],
    ['Ljus rad med knapp', MH({ foot: 'box', h: 260 })]
  ]);
  q('dd-oppna', 'Hur ska undermenyer öppnas på dator?', GR, [
    ['När man pekar på menyvalet'],
    ['När man klickar på menyvalet']
  ]);

  /* ===== Antal menyval ===== */
  group('antal-menyval', 'Antal menyval och menytexter');
  const ALL = ['Tjänster', 'Priser', 'Om oss', 'Vanliga frågor', 'Nyheter', 'Jobb', 'Kontakt'];
  const pick = (n) => ({ 3: ['Tjänster', 'Om oss', 'Kontakt'], 4: NAV, 5: ['Tjänster', 'Priser', 'Om oss', 'Vanliga frågor', 'Kontakt'], 6: ['Tjänster', 'Priser', 'Om oss', 'Vanliga frågor', 'Nyheter', 'Kontakt'], 7: ALL }[n]);
  q('am-antal', 'Hur många menyval ska headern ha som mest?', S, [3, 4, 5, 6, 7].map(n => [`${n} menyval`, H({ items: pick(n) })]));
  q('am-form', 'Hur ska menytexterna vara formulerade?', S, [
    ['Korta ord', H({})],
    ['Längre fraser', H({ items: ['Våra tjänster', 'Se priser', 'Om företaget', 'Kontakta oss'] })],
    ['Uppmaningar med verb', H({ items: ['Se tjänster', 'Jämför priser', 'Lär känna oss', 'Hör av dig'] })]
  ]);
  q('am-kontakt', 'Hur ska "Kontakt" finnas i headern?', S, [
    ['Som vanligt menyval', H({ cta: false })],
    ['Som knapp', H({ items: NAV.slice(0, 3), cta: '<span class="sb nvb-cta">Kontakt</span>' })],
    ['Menyval och en annan knapp', H({})]
  ]);
  q('am-hem', 'Ska menyn ha ett "Hem"-val?', S, [
    ['Nej, logon leder hem', H({})],
    ['Ja, "Hem" först i menyn', H({ items: ['Hem', ...NAV] })]
  ]);
  q('am-mer', 'Hur ska många menyval hanteras?', S, [
    ['Alla syns i headern', H({ items: ALL, vars: '--mg:24px' })],
    ['Några syns, resten under "Mer"', H({ items: ['Tjänster', 'Priser', 'Om oss', 'Kontakt', 'Mer'], post: (i) => (i === 4 ? ic('chevD', 16) : '') })]
  ]);
  q('am-sekundar', 'Var ska mindre viktiga länkar som "Hjälp" och "Jobb" ligga?', S, [
    ['I ett smalt fält ovanför headern', H({ top: '<div style="background:var(--ground);border-bottom:1px solid var(--sline);font-size:13px;display:flex;justify-content:flex-end;align-items:center;gap:20px;min-height:34px;padding:0 var(--hp,32px)"><span>Hjälp</span><span>Jobb</span><span>Logga in</span></div>' })],
    ['I huvudmenyn med de andra', H({ items: ['Tjänster', 'Priser', 'Om oss', 'Kontakt', 'Hjälp', 'Jobb'] })],
    ['Bara i sidfoten', H({ page: '<div class="nvb-pg"><p class="h">Rubrik på sidan</p><p class="muted">Hjälp och Jobb finns längst ner i sidfoten.</p></div>' })]
  ]);

  /* ===== Sticky-header ===== */
  group('sticky', 'Sticky-header och scroll');
  const states = (caps, frames) => `<div class="nvb-two">${frames.map((f, i) => `<div><p class="nvb-cap">${caps[i]}</p><div class="nvb-fr">${f}</div></div>`).join('')}</div>`;
  const FH = (o = {}) => head({ items: NAV.slice(0, 3), ...o });
  const CONT = '<div class="nvb-sc" style="display:flex;flex-direction:column;gap:8px"><i style="display:block;height:8px;border-radius:4px;background:#E2E4E6;width:80%"></i><i style="display:block;height:8px;border-radius:4px;background:#E2E4E6;width:65%"></i><i style="display:block;height:8px;border-radius:4px;background:#E2E4E6;width:72%"></i><i style="display:block;height:8px;border-radius:4px;background:#E2E4E6;width:50%"></i></div>';
  const SF = (frames, caps = ['Överst på sidan', 'Efter scroll'], css = '') => opt(states(caps, frames), FRAMECSS + css, W);
  const DOWNUP = ['Scrollar nedåt', 'Scrollar uppåt'];
  q('st-sticky', 'Ska headern följa med när man scrollar?', S, [
    ['Följer alltid med', SF([FH() + CONT, FH() + CONT], DOWNUP)],
    ['Scrollar bort med sidan', SF([CONT + CONT, CONT + CONT], DOWNUP)],
    ['Visas igen när man scrollar uppåt', SF([CONT + CONT, FH() + CONT], DOWNUP)]
  ]);
  q('st-krympt', 'Ska en sticky-header krympa när man scrollar?', S, [
    ['Samma höjd hela tiden', SF([FH({ hstyle: 'min-height:64px' }) + PAGE, FH({ hstyle: 'min-height:64px' }) + CONT])],
    ['Krymper i höjd', SF([FH({ hstyle: 'min-height:64px' }) + PAGE, FH({ hstyle: 'min-height:46px' }) + CONT])],
    ['Krymper och logon blir mindre', SF([FH({ hstyle: 'min-height:64px' }) + PAGE, FH({ hstyle: 'min-height:46px', logo: '<span class="nvb-logo" style="font-size:13px">Företaget</span>' }) + CONT])]
  ]);
  const MINIHERO = (o = {}) => `<div class="nvb-hero" style="min-height:170px"><img class="nvb-bg" src="img/stadsgata.jpg" alt="Gata i en stad"><div class="nvb-sh"></div>${o.h || ''}<div class="nvb-ht" style="padding:14px 16px"><p class="h" style="font-size:18px">Rubrik på sidan</p></div></div>`;
  q('st-transparent', 'Hur ska en header över bild bete sig vid scroll?', S, [
    ['Genomskinlig överst, vit efter scroll', SF([MINIHERO({ h: FH({ hstyle: 'background:transparent;color:#fff;border-bottom:0' }) }), FH() + CONT])],
    ['Vit hela tiden', SF([FH() + MINIHERO(), FH() + CONT])]
  ]);
  q('st-knapp', 'Ska knappen i headern synas hela tiden?', S, [
    ['Knappen syns alltid', SF([FH() + PAGE, FH() + CONT])],
    ['Knappen dyker upp efter scroll', SF([FH({ cta: false }) + PAGE, FH() + CONT])]
  ]);
  q('st-progress', 'Ska headern visa hur långt man har läst på långa sidor?', S, [
    ['Ingen läsindikator', SF([FH() + CONT])].map(x => x)[0],
    ['Tunn linje som fylls på', SF([FH({ hstyle: 'box-shadow:inset 0 -3px 0 0 transparent' }).replace('</header>', '<span style="position:absolute;left:0;bottom:-1px;height:3px;width:42%;background:var(--brand)"></span></header>') + CONT])]
  ].map(([l, h]) => [l, h.replace('nvb-two', 'nvb-two nvb-one')]), );
  q('st-toppfalt', 'Vad ska hända med toppfältet när man scrollar?', S, [
    ['Följer med headern', SF([TOPF() + FH() + PAGE, TOPF() + FH() + CONT])],
    ['Scrollar bort, headern stannar', SF([TOPF() + FH() + PAGE, FH() + CONT])]
  ]);

  /* ===== Toppfält ===== */
  group('toppfalt', 'Toppfält ovanför headern');
  function TOPF(o = {}) {
    const c = o.kind || 'kontakt';
    const icn = o.icons === false ? () => '' : (k) => ic(k, 13);
    let inner;
    if (c === 'kontakt') inner = `<span style="display:inline-flex;gap:18px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:6px">${icn('phone')}${TEL}</span><span style="display:inline-flex;align-items:center;gap:6px">${icn('mail')}info@foretaget.se</span></span><span class="nvb-sp"></span><span style="display:inline-flex;gap:18px"><span>Hjälp</span><span>Logga in</span></span>`;
    else if (c === 'right') inner = `<span class="nvb-sp"></span><span style="display:inline-flex;gap:18px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:6px">${icn('phone')}${TEL}</span><span>Hjälp</span><span>Logga in</span></span>`;
    else inner = `<span style="flex:1;text-align:center">Nya öppettider från 1 december${o.link === 'arrow' ? ` <b style="display:inline-flex;align-items:center;gap:4px;margin-left:6px">Läs mer ${ic('arrowR', 13)}</b>` : o.link === 'ul' ? ' <u style="margin-left:6px;text-underline-offset:3px">Läs mer</u>' : ''}</span>${o.close ? `<span class="nvb-btn" style="position:absolute;right:var(--hp,32px)">${ic('x', 15)}</span>` : ''}`;
    return `<div class="nvb-tb" style="position:relative;display:flex;align-items:center;flex-wrap:wrap;gap:4px 18px;min-height:${o.h || 36}px;padding:4px var(--hp,32px);font-size:${o.fs || 13}px;line-height:1.3;${o.st || 'background:var(--sink);color:#fff'}">${inner}</div>`;
  }
  const TF = (o = {}) => H({ top: TOPF(o), css: '@container (max-width:680px){& .nvb-tb{padding-inline:16px}}' });
  q('tf-finns', 'Ska det finnas ett smalt fält ovanför headern?', S, [
    ['Inget toppfält', H({})],
    ['Toppfält med kontaktuppgifter', TF({})],
    ['Toppfält med ett kort meddelande', TF({ kind: 'msg', link: 'arrow' })]
  ]);
  q('tf-stil', 'Hur ska toppfältet se ut?', S, [
    ['Mörkt', TF({})],
    ['Huvudfärgen', TF({ st: 'background:var(--brand);color:#fff' })],
    ['Ljusgrått', TF({ st: 'background:#ECEDEE;color:var(--sink)' })],
    ['Vitt med linje under', TF({ st: 'background:#fff;color:var(--smuted);border-bottom:1px solid var(--sline)' })]
  ]);
  q('tf-hojd', 'Hur högt ska toppfältet vara?', S, [28, 36, 44].map(h => [`${h} px`, TF({ h })]));
  q('tf-text', 'Hur stor ska texten i toppfältet vara?', S, [12, 13, 14].map(f => [`${f} px`, TF({ fs: f })]));
  q('tf-innehall', 'Hur ska innehållet i toppfältet placeras?', S, [
    ['Kontakt vänster, länkar höger', TF({})],
    ['Allt samlat till höger', TF({ kind: 'right' })],
    ['Ett meddelande i mitten', TF({ kind: 'msg', link: 'arrow' })]
  ]);
  q('tf-stang', 'Ska ett meddelande i toppfältet gå att stänga?', S, [
    ['Utan stängknapp', TF({ kind: 'msg', link: 'arrow' })],
    ['Med kryss till höger', TF({ kind: 'msg', link: 'arrow', close: true })]
  ]);
  q('tf-ikoner', 'Ska kontaktuppgifterna i toppfältet ha ikoner?', S, [
    ['Bara text', TF({ icons: false })],
    ['Små ikoner framför', TF({})]
  ]);
  q('tf-lank', 'Hur ska länken i ett toppfältsmeddelande se ut?', S, [
    ['Fet text med pil', TF({ kind: 'msg', link: 'arrow' })],
    ['Understruken text', TF({ kind: 'msg', link: 'ul' })],
    ['Ingen länk, hela fältet klickbart', TF({ kind: 'msg' })]
  ]);

  /* ===== Mobilmeny: knappen ===== */
  group('mobil-knapp', 'Mobilmeny: knappen');
  const mtxt = (t, k, after) => `<span class="nvb-btn" style="font-weight:600;font-size:14px;gap:6px">${after ? '' : (k ? ic(k, 22) : '')}${t}${after && k ? ic(k, 22) : ''}</span>`;
  q('mk-typ', 'Hur ska menyknappen i mobilen se ut?', GR, [
    ['Tre streck', M({})],
    ['Två streck', M({ btn: burger('menu2') })],
    ['Ordet "Meny"', M({ btn: mtxt('Meny') })],
    ['Streck och ordet "Meny"', M({ btn: mtxt('Meny', 'menu') })]
  ]);
  q('mk-plats', 'Var ska menyknappen sitta i mobilen?', GR, [
    ['Till höger', M({})],
    ['Till vänster', M({ leftBtn: true })]
  ]);
  q('mk-streck', 'Hur ska strecken i menyknappen vara?', GR, [
    ['Lika långa', M({})],
    ['Nedersta kortare', M({ btn: burger('menuS') })],
    ['Mittersta kortare', M({ btn: `<span class="nvb-btn"><svg class="ico" style="width:24px;height:24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M10 12h10M4 18h16"/></svg></span>` })]
  ]);
  q('mk-tjocklek', 'Hur tjocka ska strecken i menyknappen vara?', GR, [[1.5, '1,5 px'], [2, '2 px'], [2.5, '2,5 px']].map(([w, l]) => [l, M({ btn: burger('menu', 24, w) })]));
  q('mk-platta', 'Ska menyknappen ha en ram eller platta?', GR, [
    ['Fri ikon', M({})],
    ['Ruta med tunn kant', M({ btn: `<span class="nvb-btn" style="width:38px;height:38px;border:1px solid var(--sline);border-radius:8px">${ic('menu', 20)}</span>` })],
    ['Fylld rund knapp', M({ btn: `<span class="nvb-btn" style="width:38px;height:38px;border-radius:999px;background:var(--brand);color:#fff">${ic('menu', 20)}</span>` })]
  ]);
  q('mk-storlek', 'Hur stor ska menyikonen vara?', GR, [20, 24, 28].map(s => [`${s} px`, M({ btn: burger('menu', s) })]));
  q('mk-ordning', 'Var ska ordet "Meny" stå i förhållande till ikonen?', GR, [
    ['Ikon före ordet', M({ btn: mtxt('Meny', 'menu') })],
    ['Ikon efter ordet', M({ btn: mtxt('Meny', 'menu', true) })]
  ]);
  q('mk-andar', 'Ska strecken i menyknappen ha rundade ändar?', GR, [
    ['Rundade ändar', M({ btn: burger('menu', 26, 2.5) })],
    ['Raka ändar', M({ btn: `<span class="nvb-btn"><svg class="ico" style="width:26px;height:26px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" aria-hidden="true">${P.menu}</svg></span>` })]
  ]);

  /* ===== Mobilmeny: typ ===== */
  group('mobilmeny-typ', 'Mobilmeny: typ och uppbyggnad');
  const MI = ['Tjänster', 'Priser', 'Om oss', 'Kontakt'];
  const XB = (s = 24) => `<span class="nvb-btn">${ic('x', s)}</span>`;
  const MM = (o = {}) => {
    const t = o.type || 'full';
    const li = o.li || ((x, i) => `<span${i === o.on ? ' class="on"' : ''}>${o.pre ? o.pre(i) : ''}<span style="flex:1">${x}</span>${o.post ? o.post(i) : ''}</span>`);
    const list = `${o.before || ''}<div class="nvb-ml">${(o.items || MI).map(li).join('')}</div>${o.after || ''}`;
    const close = o.close !== undefined ? o.close : XB();
    const bar = `<div class="nvb-pb">${o.logoIn === false ? '' : '<span class="nvb-logo" style="font-size:17px">Företaget</span>'}<span class="nvb-msp"></span>${close}</div>`;
    let ov;
    if (t === 'full') ov = `<div class="nvb-pan" style="inset:0;${o.pst || ''}">${o.bar !== undefined ? o.bar : bar}${list}</div>`;
    else if (t === 'right' || t === 'left') ov = `<div class="nvb-dim"${o.dim ? ` style="${o.dim}"` : ''}></div><div class="nvb-pan" style="${t}:0;width:${o.w || '82%'};${o.pst || ''}">${o.bar !== undefined ? o.bar : `<div class="nvb-pb">${t === 'left' ? '<span class="nvb-logo" style="font-size:17px">Företaget</span><span class="nvb-msp"></span>' + close : '<span class="nvb-msp"></span>' + close}</div>`}${list}</div>`;
    else if (t === 'down') ov = `<div class="nvb-dim" style="top:var(--mhh,56px);${o.dim || ''}"></div><div class="nvb-pan" style="top:var(--mhh,56px);left:0;right:0;bottom:auto;border-bottom:1px solid var(--sline);box-shadow:0 10px 24px rgba(20,22,24,.12);${o.pst || ''}">${list}</div>`;
    else if (t === 'sheet') ov = `<div class="nvb-dim"${o.dim ? ` style="${o.dim}"` : ''}></div><div class="nvb-pan" style="top:auto;bottom:0;left:0;right:0;border-radius:18px 18px 0 0;padding-top:${o.handle === false ? 12 : 6}px;${o.pst || ''}">${o.handle === false ? '' : '<span style="align-self:center;width:36px;height:4px;border-radius:2px;background:#C9CDD2;margin:4px 0 6px"></span>'}${list}<div style="height:12px"></div></div>`;
    const hd = t === 'down' ? mhead({ btn: close }) : mhead({});
    return phone(hd + MBODY + ov, o.css || '', o.vars || '');
  };
  q('mm-typ', 'Hur ska mobilmenyn öppnas?', GR, [
    ['Helskärm', MM({})],
    ['Låda från höger', MM({ type: 'right' })],
    ['Låda från vänster', MM({ type: 'left' })],
    ['Fälls ner under headern', MM({ type: 'down' })],
    ['Bottenark nerifrån', MM({ type: 'sheet' })]
  ]);
  q('mm-bredd', 'Hur bred ska en utdragslåda vara?', GR, [['75 %', '75%'], ['85 %', '85%'], ['Hela bredden', '100%']].map(([l, w]) => [l, MM({ type: 'right', w })]));
  q('mm-bakom', 'Hur ska sidan bakom en öppen låda se ut?', GR, [
    ['Mörkt tonad', MM({ type: 'right' })],
    ['Oförändrad', MM({ type: 'right', dim: 'background:transparent', pst: 'box-shadow:-8px 0 24px rgba(20,22,24,.14)' })],
    ['Suddig och ljust tonad', MM({ type: 'right', dim: 'background:rgba(246,246,244,.4);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)', pst: 'box-shadow:-8px 0 24px rgba(20,22,24,.1)' })]
  ]);
  q('mm-ton', 'Vilken bakgrund ska en helskärmsmeny ha?', GR, [
    ['Vit', MM({})],
    ['Huvudfärgen', MM({ pst: 'background:var(--brand);color:#fff', css: '& .nvb-ml>span{color:#fff;border-color:rgba(255,255,255,.2)}' })],
    ['Mörk', MM({ pst: 'background:var(--sink);color:#fff', css: '& .nvb-ml>span{color:#fff;border-color:rgba(255,255,255,.2)}' })]
  ]);
  q('mm-justering', 'Hur ska menyvalen ställas i en helskärmsmeny?', GR, [
    ['Vänsterställda', MM({})],
    ['Centrerade', MM({ css: '& .nvb-ml>span{justify-content:center;text-align:center}' })]
  ]);
  const subLi = (post) => (x, i) => `<span${i === 0 ? ' style="border-bottom:0"' : ''}><span style="flex:1">${x}</span>${post(i)}</span>${i === 0 ? '<span class="nvb-sub">Undersida ett</span><span class="nvb-sub">Undersida två</span><span class="nvb-sub" style="border-bottom:1px solid var(--sline);padding-bottom:10px;min-height:38px">Undersida tre</span>' : ''}`;
  const SUBCSS = '& .nvb-ml>span.nvb-sub{min-height:30px;font-size:15px;font-weight:400;color:var(--smuted);padding-left:12px;border-bottom:0}';
  q('mm-under', 'Hur ska undersidor visas i mobilmenyn?', GR, [
    ['Fälls ut, chevron till höger', MM({ li: subLi((i) => (i === 0 ? ic('chevU', 18) : i === 2 ? ic('chevD', 18) : '')), css: SUBCSS })],
    ['Fälls ut, plus och minus', MM({ li: subLi((i) => (i === 0 ? ic('minus', 18) : i === 2 ? ic('plus', 18) : '')), css: SUBCSS })],
    ['Ny panel med "Tillbaka"', MM({ bar: `<div class="nvb-pb"><span class="nvb-btn" style="font-weight:600;font-size:14px;gap:4px">${ic('chevL', 18)}Tillbaka</span><span class="nvb-msp"></span>${XB()}</div><p style="padding:6px 18px 0;font-size:13px;font-weight:600;color:var(--smuted)">Tjänster</p>`, items: ['Översikt', 'Undersida ett', 'Undersida två', 'Undersida tre'] })]
  ]);
  q('mm-handtag', 'Ska ett bottenark ha ett litet handtag upptill?', GR, [
    ['Med handtag', MM({ type: 'sheet' })],
    ['Utan handtag', MM({ type: 'sheet', handle: false })]
  ]);
  q('mm-logo', 'Vad ska synas överst i en öppen helskärmsmeny?', GR, [
    ['Logo och stängknapp', MM({})],
    ['Bara stängknapp', MM({ logoIn: false })]
  ]);
  const CONTACT = `<div class="nvb-mx"><span>${ic('phone', 15)}${TEL}</span><span>${ic('mail', 15)}info@foretaget.se</span></div>`;
  const SOME = `<div class="nvb-mx" style="flex-direction:row;gap:14px">${['camera', 'play', 'bubble'].map(k => ic(k, 20)).join('')}</div>`;
  q('mm-extra', 'Vad ska finnas längst ner i mobilmenyn?', GR, [
    ['Inget mer', MM({})],
    ['Kontaktuppgifter', MM({ after: CONTACT })],
    ['Sociala ikoner', MM({ after: SOME })]
  ]);
  q('mm-sok', 'Ska mobilmenyn ha ett sökfält?', GR, [
    ['Utan sökfält', MM({})],
    ['Sökfält överst i menyn', MM({ before: `<div style="padding:4px 18px 0"><span class="inp ph" style="height:40px;gap:8px;font-size:14px">${ic('search', 16)}Sök</span></div>` })]
  ]);

  /* ===== Mobilmeny: menyvalen ===== */
  group('mobilmeny-val', 'Mobilmeny: menyvalen');
  q('mv-storlek', 'Hur stor ska texten i mobilmenyn vara?', GR, [16, 18, 22, 26].map(s => [`${s} px`, MM({ vars: `--mvs:${s}px` })]));
  q('mv-vikt', 'Hur tung ska texten i mobilmenyn vara?', GR, [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, MM({ vars: `--mvw:${w}` })]));
  q('mv-avgr', 'Hur ska menyvalen i mobilmenyn skiljas åt?', GR, [
    ['Tunna linjer', MM({})],
    ['Inga linjer', MM({ css: '& .nvb-ml>span{border-bottom:0}' })],
    ['Varje val i egen ruta', MM({ css: '& .nvb-ml{gap:8px}& .nvb-ml>span{border:0;background:var(--ground);border-radius:10px;padding:0 14px}' })]
  ]);
  q('mv-hojd', 'Hur hög ska varje rad i mobilmenyn vara?', GR, [44, 52, 60].map(h => [`${h} px`, MM({ vars: `--mvh:${h}px` })]));
  q('mv-chevron', 'Ska menyvalen i mobilmenyn ha en pil till höger?', GR, [
    ['Utan pil', MM({})],
    ['Chevron till höger', MM({ post: () => `<span style="color:var(--smuted);display:inline-flex">${ic('chevR', 18)}</span>` })]
  ]);
  q('mv-ikoner', 'Ska menyvalen i mobilmenyn ha ikoner?', GR, [
    ['Bara text', MM({})],
    ['Ikon före texten', MM({ pre: (i) => `<span style="display:inline-flex;margin-right:12px;color:var(--smuted)">${ic(['grid', 'tag', 'info', 'chat'][i], 20)}</span>` })]
  ]);
  q('mv-aktiv', 'Hur ska aktiv sida visas i mobilmenyn?', GR, [
    ['Fetstil', MM({ on: 1, vars: '--mvw:500', css: '& .nvb-ml>span.on{font-weight:800}' })],
    ['Streck till vänster', MM({ on: 1, css: '& .nvb-ml>span.on{box-shadow:inset 3px 0 0 var(--brand);padding-left:12px;margin-left:-12px}' })],
    ['Ljus platta', MM({ on: 1, css: '& .nvb-ml>span.on{background:var(--tint);border-radius:8px;padding:0 10px;margin:0 -10px;border-color:transparent}' })],
    ['Färgad text', MM({ on: 1, css: '& .nvb-ml>span.on{color:var(--brand)}' })]
  ]);
  const MCTA = '<div style="padding:4px 18px"><span class="sb" style="width:100%;height:46px">Boka tid</span></div>';
  q('mv-cta', 'Ska mobilmenyn ha en knapp?', GR, [
    ['Ingen knapp', MM({})],
    ['Knapp direkt efter menyvalen', MM({ after: MCTA })],
    ['Knapp fast längst ner', MM({ after: '<div style="margin-top:auto;padding:14px 18px 18px;border-top:1px solid var(--sline)"><span class="sb" style="width:100%;height:46px">Boka tid</span></div>' })]
  ]);
  q('mv-cta-stil', 'Hur ska knappen i mobilmenyn se ut?', GR, [
    ['En fylld knapp', MM({ after: MCTA })],
    ['Fylld och konturknapp', MM({ after: '<div style="padding:4px 18px;display:flex;flex-direction:column;gap:8px"><span class="sb" style="width:100%;height:44px">Boka tid</span><span class="sb2" style="width:100%;height:44px">Ring oss</span></div>' })],
    ['En konturknapp', MM({ after: '<div style="padding:4px 18px"><span class="sb2" style="width:100%;height:46px">Boka tid</span></div>' })]
  ]);
  q('mv-sekundar', 'Hur ska mindre viktiga länkar visas i mobilmenyn?', GR, [
    ['Samma stil som övriga', MM({ items: [...MI, 'Hjälp', 'Logga in'], vars: '--mvh:44px' })],
    ['Mindre och grå under', MM({ vars: '--mvh:44px', after: '<div class="nvb-mx" style="gap:10px;font-size:14px"><span>Hjälp</span><span>Logga in</span></div>' })]
  ]);

  /* ===== Mobilmeny: stäng ===== */
  group('mobil-stang', 'Mobilmeny: stängknappen');
  q('ms-ikon', 'Hur ska stängknappen i mobilmenyn se ut?', GR, [
    ['Kryss', MM({})],
    ['Ordet "Stäng"', MM({ close: '<span class="nvb-btn" style="font-weight:600;font-size:14px">Stäng</span>' })],
    ['Kryss och "Stäng"', MM({ close: `<span class="nvb-btn" style="font-weight:600;font-size:14px">Stäng${ic('x', 20)}</span>` })]
  ]);
  q('ms-plats', 'Var ska stängknappen sitta?', GR, [
    ['Där menyknappen satt', MM({})],
    ['Uppe till vänster', MM({ bar: `<div class="nvb-pb">${XB()}<span class="nvb-msp"></span><span class="nvb-logo" style="font-size:17px">Företaget</span></div>` })],
    ['Rund knapp längst ner', MM({ close: '', after: `<span class="nvb-btn" style="margin:auto auto 22px;width:48px;height:48px;border-radius:999px;border:1px solid var(--sline)">${ic('x', 22)}</span>` })]
  ]);
  q('ms-platta', 'Ska stängknappen ha en platta?', GR, [
    ['Fritt kryss', MM({})],
    ['Ljus rund platta', MM({ close: `<span class="nvb-btn" style="width:38px;height:38px;border-radius:999px;background:var(--tint)">${ic('x', 20)}</span>` })],
    ['Rund kontur', MM({ close: `<span class="nvb-btn" style="width:38px;height:38px;border-radius:999px;border:1px solid var(--sline)">${ic('x', 20)}</span>` })]
  ]);
  q('ms-storlek', 'Hur stort ska krysset vara?', GR, [20, 24, 28].map(s => [`${s} px`, MM({ close: XB(s) })]));

  /* ===== Bottennavigering ===== */
  group('bottennav', 'Bottennavigering i mobilen');
  const BNI = [['home', 'Hem'], ['grid', 'Tjänster'], ['cal', 'Boka'], ['chat', 'Kontakt'], ['user', 'Konto']];
  const BN = (o = {}) => {
    const items = BNI.slice(0, o.n || 4);
    const it = items.map(([k, t], i) => `<span class="nvb-bi${i === 0 ? ' on' : ''}">${o.lab === 'text' ? '' : `<span class="nvb-bk">${ic(k, 22)}</span>`}${o.lab === 'icon' ? '' : `<span>${t}</span>`}</span>`);
    if (o.mid) it.splice(2, 0, `<span class="nvb-bi"><span class="nvb-btn" style="width:48px;height:48px;border-radius:999px;background:var(--brand);color:#fff;margin-top:-22px;box-shadow:0 4px 12px rgba(20,22,24,.2)">${ic('plus', 24)}</span><span>Boka</span></span>`);
    const nav = `<div class="nvb-bn" style="${o.st || ''}">${it.join('')}</div>`;
    return phone(mhead({}) + MBODY + nav, '& .nvb-bn{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-around;align-items:center;background:#fff;border-top:1px solid var(--sline);padding:8px 4px 12px;z-index:3}& .nvb-bi{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;font-weight:500;color:var(--smuted);min-width:0;flex:1}& .nvb-bi.on{color:var(--brand)}& .nvb-bk{display:inline-grid;place-items:center;position:relative}' + (o.css || ''));
  };
  q('bn-finns', 'Ska mobilen ha en meny längst ner på skärmen?', GR, [
    ['Ingen bottenmeny', M({})],
    ['Bottenmeny med ikoner och text', BN({})]
  ]);
  q('bn-etikett', 'Hur ska valen i bottenmenyn visas?', GR, [
    ['Ikon och text', BN({})],
    ['Bara ikoner', BN({ lab: 'icon' })],
    ['Bara text', BN({ lab: 'text', css: '& .nvb-bi{font-size:13px;padding:6px 0}' })]
  ]);
  q('bn-aktiv', 'Hur ska det aktiva valet i bottenmenyn markeras?', GR, [
    ['Färgad ikon och text', BN({})],
    ['Ljus pill bakom ikonen', BN({ css: '& .nvb-bi.on .nvb-bk{background:var(--tint);border-radius:999px;padding:3px 16px}' })],
    ['Streck ovanför', BN({ css: '& .nvb-bi.on{position:relative}& .nvb-bi.on::before{content:"";position:absolute;top:-9px;width:28px;height:3px;border-radius:2px;background:var(--brand)}' })],
    ['Prick under texten', BN({ css: '& .nvb-bi.on::after{content:"";width:4px;height:4px;border-radius:50%;background:var(--brand)}& .nvb-bi::after{content:"";height:4px}' })]
  ]);
  q('bn-antal', 'Hur många val ska bottenmenyn ha?', GR, [3, 4, 5].map(n => [`${n} val`, BN({ n })]));
  q('bn-stil', 'Hur ska bottenmenyn se ut?', GR, [
    ['Vit med linje ovanför', BN({})],
    ['Vit med skugga', BN({ st: 'border-top:0;box-shadow:0 -4px 16px rgba(20,22,24,.08)' })],
    ['Flytande rundad list', BN({ st: 'left:10px;right:10px;bottom:10px;border:1px solid var(--sline);border-radius:18px;box-shadow:0 6px 18px rgba(20,22,24,.12);padding:8px 2px' })]
  ]);
  q('bn-mitt', 'Ska bottenmenyn ha en upphöjd knapp i mitten?', GR, [
    ['Alla val lika', BN({})],
    ['Upphöjd rund knapp i mitten', BN({ mid: true })]
  ]);

  /* ===== Brödsmulor ===== */
  group('brodsmulor', 'Brödsmulor');
  const crumbs = (o = {}) => {
    const it = o.items || ['Hem', 'Tjänster', 'Undersida'];
    const sep = o.sep !== undefined ? o.sep : '›';
    const last = it.length - 1;
    const parts = it.map((t, i) => {
      if (i === last && o.cur === 'hide') return '';
      const home = i === 0 && o.home === 'icon' ? `<span class="nvb-btn" aria-label="Hem">${ic('home', (o.fs || 13) + 3)}</span>` : t;
      return `<span class="${i === last ? 'nvb-bc-c' : 'nvb-bc-l'}">${home}</span>`;
    }).filter(Boolean);
    return `<nav class="nvb-bc" style="font-size:${o.fs || 13}px">${parts.join(`<span class="nvb-bc-s" aria-hidden="true">${sep}</span>`)}</nav>`;
  };
  const BCCSS = '& .nvb-bc{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;color:var(--smuted);line-height:1.4}& .nvb-bc-c{color:var(--sink);font-weight:500}& .nvb-bc-s{color:var(--smuted);opacity:.8}';
  const SUB = (cr, css = '', below = false) => opt(`<div class="pad" style="background:var(--box)"><div class="stack" style="gap:8px">${below ? '' : cr}<p class="h h2">Undersida</p>${below ? cr : ''}<p class="muted">Kort text om vad sidan handlar om.</p></div></div>`, BCCSS + css);
  q('bs-finns', 'Ska undersidor ha brödsmulor?', S, [
    ['Utan brödsmulor', H({ on: 0, page: '<div class="nvb-pg" style="background:#fff"><p class="h">Undersida</p><p class="muted">Kort text om vad sidan handlar om.</p></div>' })],
    ['Brödsmulor över rubriken', H({ on: 0, css: BCCSS, page: `<div class="nvb-pg" style="background:#fff">${crumbs()}<p class="h">Undersida</p><p class="muted">Kort text om vad sidan handlar om.</p></div>` })]
  ]);
  q('bs-avgransare', 'Vilket tecken ska skilja stegen i brödsmulorna?', GR, [['›', 'Vinkel ›'], ['/', 'Snedstreck /'], ['→', 'Pil →'], ['·', 'Punkt ·']].map(([s, l]) => [l, SUB(crumbs({ sep: s }))]));
  q('bs-storlek', 'Hur stor ska texten i brödsmulorna vara?', GR, [12, 13, 14, 15].map(f => [`${f} px`, SUB(crumbs({ fs: f }))]));
  q('bs-plats', 'Var ska brödsmulorna ligga?', S, [
    ['Precis över rubriken', H({ on: 0, css: BCCSS, page: `<div class="nvb-pg" style="background:#fff">${crumbs()}<p class="h">Undersida</p><p class="muted">Kort text om vad sidan handlar om.</p></div>` })],
    ['I ett eget fält under headern', H({ on: 0, css: BCCSS, page: `<div style="padding:10px var(--hp,32px);border-bottom:1px solid var(--sline);background:var(--ground)">${crumbs()}</div><div class="nvb-pg" style="background:#fff"><p class="h">Undersida</p><p class="muted">Kort text om vad sidan handlar om.</p></div>` })],
    ['Under rubriken', H({ on: 0, css: BCCSS, page: `<div class="nvb-pg" style="background:#fff"><p class="h">Undersida</p>${crumbs()}<p class="muted">Kort text om vad sidan handlar om.</p></div>` })]
  ]);
  q('bs-hem', 'Hur ska startsidan visas i brödsmulorna?', GR, [
    ['Ordet "Hem"', SUB(crumbs())],
    ['Liten husikon', SUB(crumbs({ home: 'icon' }))],
    ['Utan startsidan', SUB(crumbs({ items: ['Tjänster', 'Undersida'] }))]
  ]);
  q('bs-aktuell', 'Hur ska den aktuella sidan visas i brödsmulorna?', GR, [
    ['Mörkare än stegen före', SUB(crumbs())],
    ['Fetstil', SUB(crumbs(), '& .nvb-bc-c{font-weight:700}')],
    ['Utelämnad', SUB(crumbs({ cur: 'hide' }) .replace('</nav>', '<span class="nvb-bc-s">›</span></nav>'))]
  ]);
  q('bs-lankar', 'Hur ska de klickbara stegen i brödsmulorna se ut?', GR, [
    ['Grå text', SUB(crumbs())],
    ['Huvudfärgen', SUB(crumbs(), '& .nvb-bc-l{color:var(--brand);font-weight:500}')],
    ['Understrukna', SUB(crumbs(), '& .nvb-bc-l{text-decoration:underline;text-underline-offset:3px}')]
  ]);
  const PB = (cr) => phone(mhead({}) + `<div class="nvb-mb" style="background:#fff">${cr}<p class="h">Undersida</p><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i></div>`, BCCSS);
  q('bs-mobil', 'Hur ska brödsmulorna visas i mobilen?', GR, [
    ['Hela kedjan', PB(crumbs())],
    ['Bara ett steg tillbaka', PB(`<nav class="nvb-bc" style="font-size:13px"><span class="nvb-btn" style="gap:2px">${ic('chevL', 15)}Tjänster</span></nav>`)],
    ['Inga brödsmulor', PB('')]
  ]);
  q('bs-lang', 'Hur ska en lång kedja av brödsmulor visas?', GR, [
    ['Alla steg syns', SUB(crumbs({ items: ['Hem', 'Tjänster', 'Grupp ett', 'Undersida ett', 'Detaljer'] }))],
    ['Mitten kortas till …', SUB(crumbs({ items: ['Hem', '…', 'Undersida ett', 'Detaljer'] }))]
  ]);

  /* ===== Flikar ===== */
  group('flikar', 'Flikar');
  const TABS = ['Översikt', 'Detaljer', 'Priser', 'Frågor'];
  const TAB = (css, o = {}) => opt(`<div class="pad" style="background:var(--box)"><div class="nvb-tabs">${(o.items || TABS).map((t, i) => `<span class="nvb-tab${i === 0 ? ' on' : ''}">${o.pre ? o.pre(i) : ''}${t}${o.post ? o.post(i) : ''}</span>`).join('')}</div><div class="nvb-tp"><p class="h h3">Översikt</p><p class="muted">Innehållet för den valda fliken visas här.</p></div></div>`, '& .nvb-tabs{display:flex;flex-wrap:wrap;gap:4px 24px;font-size:var(--tfs,15px);font-weight:500;color:var(--smuted)}& .nvb-tab{position:relative;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}& .nvb-tab.on{color:var(--sink)}& .nvb-tp{padding-top:20px;display:flex;flex-direction:column;gap:4px}' + css, o.vars || '');
  const T_UL = (t = 2) => `& .nvb-tabs{border-bottom:1px solid var(--sline)}& .nvb-tab{padding:10px 0}& .nvb-tab.on::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:${t}px;background:var(--brand)}`;
  const T_PILL = '& .nvb-tabs{gap:6px}& .nvb-tab{padding:8px 16px;border-radius:999px}& .nvb-tab.on{background:var(--brand);color:#fff}';
  const T_SEG = (r = '10px') => `& .nvb-tabs{gap:2px;background:#ECEDEE;padding:4px;border-radius:${r};display:inline-flex}& .nvb-tab{padding:8px 16px;border-radius:calc(${r} - 3px)}& .nvb-tab.on{background:#fff;box-shadow:0 1px 3px rgba(20,22,24,.12)}`;
  const T_CARD = '& .nvb-tabs{gap:4px;border-bottom:1px solid var(--sline)}& .nvb-tab{padding:10px 16px;border:1px solid transparent;border-bottom:0;border-radius:8px 8px 0 0;margin-bottom:-1px}& .nvb-tab.on{border-color:var(--sline);background:var(--box);box-shadow:0 1px 0 var(--box)}& .nvb-tabs .nvb-tab:not(.on){background:var(--ground)}';
  q('fl-stil', 'Hur ska flikar se ut?', S, [
    ['Understrukna', TAB(T_UL())],
    ['Pill-knappar', TAB(T_PILL)],
    ['Segment i en grå list', TAB(T_SEG())],
    ['Kortflikar mot ytan', TAB(T_CARD)]
  ]);
  q('fl-tjocklek', 'Hur tjock ska linjen under den aktiva fliken vara?', S, [2, 3, 4].map(t => [`${t} px`, TAB(T_UL(t))]));
  q('fl-baslinje', 'Ska understrukna flikar ha en grå linje under alla flikar?', S, [
    ['Med grå linje under alla', TAB(T_UL())],
    ['Bara linjen under den aktiva', TAB(T_UL() + '& .nvb-tabs{border-bottom-color:transparent}')]
  ]);
  q('fl-justering', 'Hur ska flikraden ställas?', S, [
    ['Vänsterställd', TAB(T_UL())],
    ['Centrerad', TAB(T_UL() + '& .nvb-tabs{justify-content:center}& .nvb-tp{align-items:center;text-align:center}')],
    ['Fyller hela bredden', TAB(T_UL() + '& .nvb-tabs{gap:0}& .nvb-tab{flex:1;justify-content:center}')]
  ]);
  q('fl-storlek', 'Hur stor ska texten i flikarna vara?', S, [14, 15, 16].map(f => [`${f} px`, TAB(T_UL(), { vars: `--tfs:${f}px` })]));
  q('fl-vikt', 'Hur ska textvikten skilja aktiv flik från övriga?', S, [
    ['Alla medium, aktiv mörkare', TAB(T_UL())],
    ['Aktiv halvfet, övriga normala', TAB(T_UL() + '& .nvb-tabs{font-weight:400}& .nvb-tab.on{font-weight:600}')],
    ['Alla halvfeta', TAB(T_UL() + '& .nvb-tabs{font-weight:600}')]
  ]);
  q('fl-pill', 'Hur ska den aktiva pill-fliken se ut?', S, [
    ['Fylld i huvudfärgen', TAB(T_PILL)],
    ['Ljust tonad', TAB(T_PILL + '& .nvb-tab.on{background:var(--tint);color:var(--brand)}')],
    ['Mörk', TAB(T_PILL + '& .nvb-tab.on{background:var(--sink);color:#fff}')],
    ['Kontur', TAB(T_PILL + '& .nvb-tab{border:1px solid transparent}& .nvb-tab.on{background:transparent;color:var(--sink);border-color:var(--sink)}')]
  ]);
  q('fl-segment', 'Hur rund ska en segmentkontroll vara?', S, [['6 px rundning', '6px'], ['10 px rundning', '10px'], ['Helt rund', '999px']].map(([l, r]) => [l, TAB(T_SEG(r))]));
  q('fl-ikoner', 'Ska flikarna ha ikoner?', S, [
    ['Bara text', TAB(T_UL())],
    ['Ikon före texten', TAB(T_UL(), { pre: (i) => ic(['grid', 'doc', 'tag', 'chat'][i], 17) })]
  ]);
  q('fl-antal', 'Ska flikarna visa antal?', S, [
    ['Utan antal', TAB(T_UL(), { items: ['Alla', 'Aktuella', 'Avslutade', 'Utkast'] })],
    ['Antal i en liten bricka', TAB(T_UL(), { items: ['Alla', 'Aktuella', 'Avslutade', 'Utkast'], post: (i) => `<span style="font-size:12px;font-weight:600;background:${i === 0 ? 'var(--tint)' : '#ECEDEE'};color:${i === 0 ? 'var(--brand)' : 'var(--smuted)'};border-radius:999px;padding:0 7px;line-height:1.6">${[24, 8, 14, 2][i]}</span>` })]
  ]);
  const PT = (inner, css) => phone(mhead({}) + `<div class="nvb-mb" style="background:#fff;gap:12px;padding-inline:0"><p class="h" style="padding:0 14px">Rubrik</p>${inner}<div style="padding:0 14px;display:flex;flex-direction:column;gap:9px"><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i></div></div>`, css);
  const PTCSS = '& .nvb-tr{display:flex;gap:18px;overflow:hidden;white-space:nowrap;border-bottom:1px solid var(--sline);padding:0 14px;font-size:14px;font-weight:500;color:var(--smuted)}& .nvb-tr span{padding:9px 0;position:relative}& .nvb-tr .on{color:var(--sink)}& .nvb-tr .on::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--brand)}';
  q('fl-mobil', 'Hur ska många flikar visas i mobilen?', GR, [
    ['Raden går att svepa i sidled', PT(`<div class="nvb-tr"><span class="on">Översikt</span><span>Detaljer</span><span>Priser</span><span>Frågor</span></div>`, PTCSS + '& .nvb-tr{-webkit-mask-image:linear-gradient(90deg,#000 80%,transparent);mask-image:linear-gradient(90deg,#000 80%,transparent)}')],
    ['Väljs i en rullgardin', PT(`<div style="padding:0 14px"><span class="inp" style="height:42px;justify-content:space-between;font-size:14px;font-weight:500">Översikt${ic('chevD', 18)}</span></div>`, PTCSS)],
    ['Bryts på flera rader', PT(`<div class="nvb-tr" style="flex-wrap:wrap;row-gap:0;column-gap:16px"><span class="on">Översikt</span><span>Detaljer</span><span>Priser</span><span>Frågor</span></div>`, PTCSS)]
  ]);

  /* ===== Sidnumrering ===== */
  group('sidnumrering', 'Sidnumrering och fler resultat');
  const CARDS = '<div class="nvb-cards">' + '<span></span>'.repeat(3) + '</div>';
  const PGCSS = '& .nvb-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:22px}& .nvb-cards span{height:56px;border-radius:10px;background:#fff;border:1px solid var(--sline)}& .nvb-pgr{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;font-size:14px;font-weight:500}& .nvb-pn{min-width:var(--pgs,40px);height:var(--pgs,40px);display:inline-flex;align-items:center;justify-content:center;border-radius:var(--pgr,8px);padding:0 6px;border:1px solid var(--sline);background:#fff}& .nvb-pn.on{background:var(--brand);border-color:var(--brand);color:#fff}& .nvb-pn.e{border:0;background:transparent;min-width:20px}& .nvb-pa{display:inline-flex;align-items:center;gap:6px;height:var(--pgs,40px);padding:0 12px;font-weight:600}';
  const nums = (list, cur = 4) => list.map(n => n === '…' ? '<span class="nvb-pn e">…</span>' : `<span class="nvb-pn${n === cur ? ' on' : ''}">${n}</span>`).join('');
  const PG = (inner, css = '', vars = '', cards = true) => opt(`<div class="pad">${cards ? CARDS : ''}<div class="nvb-pgr">${inner}</div></div>`, PGCSS + css, vars);
  const PREV = (k = 'both') => `<span class="nvb-pa">${k !== 'text' ? ic('chevL', 16) : ''}${k !== 'icon' ? 'Föregående' : ''}</span>`;
  const NEXT = (k = 'both') => `<span class="nvb-pa">${k !== 'icon' ? 'Nästa' : ''}${k !== 'text' ? ic('chevR', 16) : ''}</span>`;
  const STD = [1, '…', 3, 4, 5, '…', 10];
  q('sn-typ', 'Hur ska man komma till fler resultat i en lista?', S, [
    ['Sidnummer', PG(PREV('icon') + nums(STD) + NEXT('icon'))],
    ['Bara föregående och nästa', PG(PREV() + '<span class="muted" style="font-weight:400;padding:0 10px">Sida 4 av 10</span>' + NEXT())],
    ['Knappen "Visa fler"', PG('<span class="sb2" style="height:44px">Visa fler</span>')],
    ['Laddar fler automatiskt vid scroll', PG(`<span class="nvb-btn muted" style="gap:10px;font-weight:400"><span class="nvb-spin"></span>Laddar fler …</span>`, '& .nvb-spin{width:18px;height:18px;border-radius:50%;border:2px solid var(--sline);border-top-color:var(--brand);animation:nvspin 1s linear infinite}@keyframes nvspin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){& .nvb-spin{animation:none}}')]
  ]);
  q('sn-aktiv', 'Hur ska den aktuella sidan markeras i sidnumreringen?', S, [
    ['Fylld ruta', PG(nums(STD))],
    ['Mörk kontur', PG(nums(STD), '& .nvb-pn.on{background:#fff;color:var(--sink);border:2px solid var(--sink)}')],
    ['Understruken siffra', PG(nums(STD), '& .nvb-pn{border-color:transparent;background:transparent}& .nvb-pn.on{background:transparent;color:var(--sink);border-color:transparent;box-shadow:inset 0 -2px 0 var(--brand);border-radius:0}')],
    ['Ljust tonad', PG(nums(STD), '& .nvb-pn.on{background:var(--tint);border-color:var(--tint);color:var(--brand);font-weight:700}')]
  ]);
  q('sn-form', 'Vilken form ska sidnumren ha?', S, [
    ['Rutor med 8 px rundning', PG(nums(STD))],
    ['Runda', PG(nums(STD), '', '--pgr:999px')],
    ['Utan ram', PG(nums(STD), '& .nvb-pn:not(.on){border-color:transparent;background:transparent}')]
  ]);
  q('sn-pilar', 'Hur ska föregående och nästa visas bredvid sidnumren?', S, [
    ['Bara pilar', PG(PREV('icon') + nums(STD) + NEXT('icon'))],
    ['Pil och text', PG(PREV() + nums(STD) + NEXT())],
    ['Bara text', PG(PREV('text') + nums(STD) + NEXT('text'))]
  ]);
  q('sn-urval', 'Vilka sidnummer ska visas?', S, [
    ['Början, runt aktuell och slutet', PG(PREV('icon') + nums(STD) + NEXT('icon'))],
    ['De första sidorna och sista', PG(PREV('icon') + nums([1, 2, 3, 4, 5, '…', 10]) + NEXT('icon'))],
    ['Bara "Sida 4 av 10"', PG(PREV('icon') + '<span style="padding:0 12px">Sida 4 av 10</span>' + NEXT('icon'), '& .nvb-pa{border:1px solid var(--sline);border-radius:8px;width:40px;justify-content:center;padding:0;background:#fff}')]
  ]);
  q('sn-visafler', 'Hur ska knappen "Visa fler" se ut?', S, [
    ['Konturknapp', PG('<span class="sb2" style="height:44px">Visa fler</span>')],
    ['Textlänk med pil ner', PG(`<span class="nvb-btn" style="color:var(--brand);font-weight:600">Visa fler ${ic('chevD', 18)}</span>`)],
    ['Knapp med "Visar 12 av 48"', PG('<span style="display:flex;flex-direction:column;align-items:center;gap:10px"><span class="muted small" style="font-weight:400">Visar 12 av 48</span><span class="sb2" style="height:44px">Visa fler</span></span>')],
    ['Knapp med förloppslinje', PG('<span style="display:flex;flex-direction:column;align-items:center;gap:10px"><span class="muted small" style="font-weight:400">Visar 12 av 48</span><span style="width:160px;height:3px;border-radius:2px;background:var(--sline);position:relative;overflow:hidden"><span style="position:absolute;left:0;top:0;bottom:0;width:25%;background:var(--brand)"></span></span><span class="sb2" style="height:44px">Visa fler</span></span>')]
  ]);
  q('sn-justering', 'Var ska sidnumreringen stå?', S, [
    ['Centrerad', PG(PREV() + nums(STD) + NEXT())],
    ['Vänsterställd', PG(PREV() + nums(STD) + NEXT(), '& .nvb-pgr{justify-content:flex-start}')],
    ['Föregående och nästa i kanterna', PG(PREV() + `<span style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">${nums(STD)}</span>` + NEXT(), '& .nvb-pgr{justify-content:space-between}')]
  ]);
  q('sn-storlek', 'Hur stora ska sidnumren vara?', S, [32, 40, 48].map(s => [`${s} px`, PG(PREV('icon') + nums(STD) + NEXT('icon'), '', `--pgs:${s}px`)]));

  /* ===== Innehåll och ankarlänkar ===== */
  group('ankarlankar', 'Innehållsförteckning och sidomeny');
  const SEC = ['Inledning', 'Så går det till', 'Vad det kostar', 'Vanliga frågor'];
  const ARTCSS = '& .nvb-art{display:flex;flex-direction:column;gap:9px;min-width:0;flex:1}& .nvb-art i{display:block;height:8px;border-radius:4px;background:#DCDEE1}& .nvb-art .h{font-size:20px}& .nvb-art .h3{font-size:16px;margin-top:8px}& .nvb-toc{display:flex;flex-direction:column;gap:2px;font-size:14px;color:var(--smuted);min-width:0}& .nvb-toc>span{padding:6px 0 6px 14px;border-left:2px solid var(--sline);line-height:1.3}& .nvb-toc>span.on{color:var(--sink);border-left-color:var(--brand);font-weight:600}& .nvb-toc .sub{padding-left:28px;font-size:13px}& .nvb-tt{font-size:12px;font-weight:600;color:var(--sink);margin-bottom:6px}& .nvb-lay{display:flex;gap:36px;padding:24px var(--hp,32px);background:#fff;align-items:flex-start}& .nvb-side{flex:0 0 200px;position:relative}@container (max-width:680px){& .nvb-lay{flex-direction:column;gap:18px}& .nvb-side{flex:none;width:100%}}';
  const ART = (pre = '') => `<div class="nvb-art"><p class="h">Rubrik på sidan</p>${pre}<i style="width:94%"></i><i style="width:88%"></i><i style="width:60%"></i><p class="h h3">Så går det till</p><i style="width:92%"></i><i style="width:84%"></i><i style="width:70%"></i></div>`;
  const TOC = (o = {}) => `<nav class="nvb-toc${o.cls ? ' ' + o.cls : ''}">${o.title === false ? '' : '<p class="nvb-tt">På den här sidan</p>'}${(o.items || SEC).map((t, i) => `<span class="${i === (o.on !== undefined ? o.on : 1) ? 'on' : ''}${o.subs && (i === 2) ? ' sub' : ''}">${o.num ? `${i + 1}. ` : ''}${t}</span>`).join('')}</nav>`;
  const LAY = (side, right = false, css = '') => opt(`<div class="nvb-lay">${right ? '' : `<div class="nvb-side">${side}</div>`}${ART()}${right ? `<div class="nvb-side">${side}</div>` : ''}</div>`, ARTCSS + css);
  q('al-toc', 'Ska långa sidor ha en innehållsförteckning?', S, [
    ['Ingen innehållsförteckning', opt(`<div class="nvb-lay">${ART()}</div>`, ARTCSS)],
    ['Lista överst på sidan', opt(`<div class="nvb-lay">${ART(`<div style="background:var(--ground);border-radius:10px;padding:12px 16px;margin:4px 0 8px">${TOC({ on: -1 })}</div>`)}</div>`, ARTCSS + '& .nvb-toc>span{border-left:0;padding:3px 0;color:var(--brand)}')],
    ['Sticky sidomeny bredvid texten', LAY(TOC())]
  ]);
  q('al-stil', 'Hur ska innehållsförteckningen se ut?', S, [
    ['Lista med linje till vänster', LAY(TOC())],
    ['Numrerad lista utan linje', LAY(TOC({ num: true }), false, '& .nvb-toc>span{border-left:0;padding-left:0}& .nvb-toc>span.on{color:var(--brand)}')],
    ['Rad med chips över texten', opt(`<div class="nvb-lay" style="flex-direction:column;gap:18px"><div style="display:flex;gap:8px;flex-wrap:wrap">${SEC.map((t, i) => `<span class="chip"${i === 1 ? ' style="background:var(--brand);color:#fff;border-color:var(--brand)"' : ''}>${t}</span>`).join('')}</div>${ART()}</div>`, ARTCSS)]
  ]);
  q('al-aktiv', 'Hur ska avsnittet man läser markeras i sidomenyn?', S, [
    ['Streck till vänster', LAY(TOC())],
    ['Fetstil', LAY(TOC(), false, '& .nvb-toc>span.on{border-left-color:var(--sline)}')],
    ['Huvudfärgen', LAY(TOC(), false, '& .nvb-toc>span.on{border-left-color:var(--sline);color:var(--brand)}')],
    ['Ljus platta', LAY(TOC(), false, '& .nvb-toc>span{border-left:0;padding:6px 10px;border-radius:6px}& .nvb-toc>span.on{background:var(--tint);color:var(--brand)}')]
  ]);
  q('al-plats', 'Var ska sidomenyn med innehållet stå?', S, [
    ['Till vänster om texten', LAY(TOC())],
    ['Till höger om texten', LAY(TOC(), true)]
  ]);
  q('al-rubrik', 'Ska sidomenyn ha en rubrik?', S, [
    ['Med rubriken "På den här sidan"', LAY(TOC())],
    ['Utan rubrik', LAY(TOC({ title: false }))]
  ]);
  q('al-indrag', 'Hur ska underrubriker visas i innehållsförteckningen?', S, [
    ['Indragna under huvudrubriken', LAY(TOC({ items: ['Inledning', 'Så går det till', 'Steg för steg', 'Vanliga frågor'], subs: true }))],
    ['Alla på samma nivå', LAY(TOC({ items: ['Inledning', 'Så går det till', 'Steg för steg', 'Vanliga frågor'] }))]
  ]);
  const SN = (css) => opt(`<div class="pad" style="background:#fff"><nav class="nvb-sn"><span>Översikt</span><span class="on">Undersida ett</span><span>Undersida två</span><span>Undersida tre</span></nav></div>`, '& .nvb-sn{display:flex;flex-direction:column;gap:2px;font-size:15px;max-width:240px}& .nvb-sn span{padding:9px 12px;border-radius:8px}' + css);
  q('al-sidomeny', 'Hur ska en sidomeny mellan undersidor se ut?', GR, [
    ['Lista, aktiv i ljus platta', SN('& .nvb-sn .on{background:var(--tint);color:var(--brand);font-weight:600}')],
    ['Lista, aktiv med streck', SN('& .nvb-sn span{border-radius:0;border-left:2px solid var(--sline)}& .nvb-sn .on{border-left-color:var(--brand);font-weight:600}')],
    ['Lista i en ruta med linjer', SN('& .nvb-sn{gap:0;border:1px solid var(--sline);border-radius:10px;overflow:hidden}& .nvb-sn span{border-radius:0}& .nvb-sn span+span{border-top:1px solid var(--sline)}& .nvb-sn .on{font-weight:700;background:var(--ground)}')]
  ]);
  q('al-toppen', 'Ska långa sidor ha en knapp för att komma till toppen?', S, [
    ['Ingen knapp', opt(`<div class="nvb-lay">${ART()}</div>`, ARTCSS)],
    ['Rund flytande knapp', opt(`<div class="nvb-lay" style="position:relative">${ART()}<span class="nvb-btn" style="position:absolute;right:20px;bottom:20px;width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid var(--sline);box-shadow:0 4px 14px rgba(20,22,24,.12)">${ic('arrowU', 20)}</span></div>`, ARTCSS)],
    ['Textlänk i slutet', opt(`<div class="nvb-lay" style="flex-direction:column">${ART()}<span class="nvb-btn" style="color:var(--brand);font-weight:600;font-size:14px">Till toppen ${ic('arrowU', 16)}</span></div>`, ARTCSS)]
  ]);
  q('al-mobil', 'Hur ska innehållsförteckningen visas i mobilen?', GR, [
    ['Svepbar rad med chips', phone(mhead({}) + `<div style="display:flex;gap:6px;overflow:hidden;padding:8px 12px;background:#fff;border-bottom:1px solid var(--sline);white-space:nowrap">${SEC.map((t, i) => `<span class="chip" style="height:28px;font-size:12px;padding:0 10px;flex:0 0 auto${i === 1 ? ';background:var(--brand);color:#fff;border-color:var(--brand)' : ''}">${t}</span>`).join('')}</div>` + MBODY)],
    ['Rullgardin "På den här sidan"', phone(mhead({}) + `<div style="padding:8px 12px;background:#fff;border-bottom:1px solid var(--sline)"><span class="inp" style="height:36px;font-size:13px;justify-content:space-between;font-weight:500">På den här sidan${ic('chevD', 16)}</span></div>` + MBODY)],
    ['Lista överst i texten', phone(mhead({}) + `<div class="nvb-mb" style="background:#fff"><p class="h">Rubrik</p><div style="background:var(--ground);border-radius:8px;padding:8px 10px;display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--brand);font-weight:500">${SEC.map(t => `<span>${t}</span>`).join('')}</div><i style="width:92%"></i><i style="width:80%"></i></div>`)]
  ]);

  /* ===== Tillbaka-länk ===== */
  group('tillbaka', 'Tillbaka-länk');
  const BK = (inner, css = '') => opt(`<div class="pad" style="background:var(--box)"><div class="stack" style="gap:10px;align-items:flex-start">${inner}<p class="h h2">Undersida</p><p class="muted">Kort text om vad sidan handlar om.</p></div></div>`, '& .nvb-bk2{display:inline-flex;align-items:center;gap:6px;font-size:var(--bks,14px);font-weight:600;color:var(--bkc,var(--brand))}' + css);
  const bk = (t = 'Tillbaka', k = 'arrowL') => `<span class="nvb-bk2">${ic(k, 16)}${t}</span>`;
  q('tb-stil', 'Hur ska en tillbaka-länk se ut?', GR, [
    ['Pil och "Tillbaka"', BK(bk())],
    ['Chevron och "Tillbaka"', BK(bk('Tillbaka', 'chevL'))],
    ['Pil och föräldersidans namn', BK(bk('Tillbaka till Tjänster'))],
    ['Rund ikonknapp', BK(`<span class="nvb-btn" style="width:40px;height:40px;border-radius:999px;border:1px solid var(--sline);background:#fff">${ic('arrowL', 18)}</span>`)]
  ]);
  q('tb-farg', 'Vilken färg ska tillbaka-länken ha?', GR, [
    ['Huvudfärgen', BK(bk())],
    ['Svart', BK(bk(), '', '').replace('class="nvb ', 'style="--bkc:var(--sink)" class="nvb ')],
    ['Grå', BK(bk()).replace('class="nvb ', 'style="--bkc:var(--smuted)" class="nvb ')]
  ]);
  q('tb-storlek', 'Hur stor ska tillbaka-länken vara?', GR, [13, 14, 15, 16].map(s => [`${s} px`, BK(bk()).replace('class="nvb ', `style="--bks:${s}px" class="nvb `)]));
  q('tb-understruken', 'Ska tillbaka-länken vara understruken?', GR, [
    ['Utan understrykning', BK(bk())],
    ['Understruken text', BK('<span class="nvb-bk2">' + ic('arrowL', 16) + '<u style="text-underline-offset:3px">Tillbaka</u></span>')]
  ]);
  q('tb-mobil', 'Var ska tillbaka-länken sitta i mobilen?', GR, [
    ['Över rubriken på sidan', phone(mhead({}) + `<div class="nvb-mb" style="background:#fff"><span class="nvb-btn" style="justify-content:flex-start;font-size:13px;font-weight:600;color:var(--brand);gap:4px">${ic('arrowL', 15)}Tillbaka</span><p class="h">Undersida</p><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i></div>`)],
    ['I headern till vänster', phone(mhead({ leftBtn: true, btn: `<span class="nvb-btn">${ic('chevL', 24)}</span>`, right: burger() }) + `<div class="nvb-mb" style="background:#fff"><p class="h">Undersida</p><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i></div>`)]
  ]);

  /* ===== Sök ===== */
  group('sok', 'Sök i headern');
  const SICON = `<span class="nvb-btn">${ic('search', 20)}</span>`;
  const SFLD = (st = 'border-radius:999px', w = 220) => `<span class="inp ph nvb-sf" style="height:40px;gap:8px;font-size:14px;width:${w}px;max-width:100%;${st}">${ic('search', 16)}Sök</span>`;
  const SUGG = (k) => `<div class="nvb-sg">${k === 'pop' ? '<p class="nvb-tt" style="font-size:12px;color:var(--smuted)">Populära sökningar</p><span>Priser</span><span>Öppettider</span><span>Boka tid</span>' : `<p class="nvb-tt" style="font-size:12px;color:var(--smuted)">Senaste sökningar</p><span>${ic('clock', 15)}Öppettider</span><span>${ic('clock', 15)}Kontakt</span>`}</div>`;
  const SGCSS = '& .nvb-sg{position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid var(--sline);border-radius:10px;box-shadow:0 8px 24px rgba(20,22,24,.1);padding:10px 12px;display:flex;flex-direction:column;gap:2px;font-size:14px;z-index:6;color:var(--sink)}& .nvb-sg span{display:flex;align-items:center;gap:8px;padding:5px 0}& .nvb-sw{position:relative;display:inline-flex}';
  q('so-typ', 'Hur ska sökningen fungera i headern?', S, [
    ['Ikon som öppnar ett fält i headern', H({ nav: '', extra: `<span class="inp nvb-sf" style="height:40px;gap:8px;font-size:14px;width:min(420px,100%);border-radius:999px;border-color:var(--brand)">${ic('search', 16)}<span class="muted" style="flex:1">Sök</span>${ic('x', 16)}</span>` })],
    ['Fält som alltid syns', H({ extra: SFLD() })],
    ['Ikon som öppnar helskärmssök', opt(`<div style="background:#fff;padding:28px var(--hp,32px) 40px;display:flex;flex-direction:column;gap:16px;min-height:200px"><div style="display:flex;align-items:center;gap:12px"><span class="nvb-logo">Företaget</span><span class="nvb-sp"></span>${XB()}</div><div style="display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--sink);padding:10px 0;font-size:24px;color:var(--smuted)">${ic('search', 26)}Vad letar du efter?</div></div>`)]
  ]);
  q('so-ikontext', 'Ska sökikonen i headern ha text?', S, [
    ['Bara ikon', H({ extra: SICON })],
    ['Ikon och ordet "Sök"', H({ extra: `<span class="nvb-btn" style="font-size:15px;font-weight:500">${ic('search', 18)}Sök</span>` })]
  ]);
  q('so-falt', 'Hur ska sökfältet i headern se ut?', S, [
    ['Helt runt', H({ extra: SFLD() })],
    ['8 px rundning', H({ extra: SFLD('border-radius:8px') })],
    ['Grått fält utan kant', H({ extra: SFLD('border-radius:8px;border-color:transparent;background:#EEEFF0') })],
    ['Bara linje under', H({ extra: SFLD('border-radius:0;border-width:0 0 1px;padding-left:2px') })]
  ]);
  q('so-oppnad', 'Var ska sökfältet visas när man klickar på sökikonen?', S, [
    ['Fältet ersätter menyn', H({ nav: '', extra: `<span class="inp nvb-sf" style="height:40px;gap:8px;font-size:14px;width:min(420px,100%);border-radius:999px;border-color:var(--brand)">${ic('search', 16)}<span class="muted" style="flex:1">Sök</span>${ic('x', 16)}</span>` })],
    ['Fältet fälls ner under headern', H({ extra: `<span class="nvb-btn">${ic('x', 20)}</span>`, page: `<div style="background:#fff;border-bottom:1px solid var(--sline);padding:14px var(--hp,32px)"><span class="inp" style="height:46px;gap:10px;border-color:var(--brand)">${ic('search', 18)}<span class="muted">Sök</span></span></div>` + PAGE })]
  ]);
  q('so-helskarm', 'Hur ska helskärmssöket se ut?', S, [
    ['Vit yta över hela sidan', opt(`<div style="background:#fff;padding:24px var(--hp,32px) 40px;display:flex;flex-direction:column;gap:16px;min-height:220px"><div style="display:flex;align-items:center"><span class="nvb-sp"></span>${XB()}</div><div style="display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--sink);padding:10px 0;font-size:24px;color:var(--smuted)">${ic('search', 26)}Vad letar du efter?</div></div>`)],
    ['Mörkt tonad sida, fält överst', opt(`<div style="position:relative;min-height:260px">${head({})}${PAGE}<div style="position:absolute;inset:0;background:rgba(20,22,24,.5);z-index:4"></div><div style="position:absolute;left:0;right:0;top:0;z-index:5;background:#fff;padding:18px var(--hp,32px);display:flex;align-items:center;gap:12px;box-shadow:0 8px 24px rgba(20,22,24,.15)"><span class="inp" style="flex:1;height:48px;gap:10px;border-color:var(--brand)">${ic('search', 18)}<span class="muted">Vad letar du efter?</span></span>${XB()}</div></div>`)]
  ]);
  q('so-forslag', 'Vad ska visas under sökfältet innan man har skrivit något?', S, [
    ['Ingenting', H({ extra: SFLD('border-radius:999px;border-color:var(--brand);color:var(--sink)'), page: '<div class="nvb-pg" style="min-height:190px"><p class="h">Rubrik på sidan</p></div>' })],
    ['Populära sökningar', H({ css: SGCSS, extra: `<span class="nvb-sw">${SFLD('border-radius:999px;border-color:var(--brand)')}${SUGG('pop')}</span>`, page: '<div class="nvb-pg" style="min-height:190px"><p class="h">Rubrik på sidan</p></div>' })],
    ['Senaste sökningar', H({ css: SGCSS, extra: `<span class="nvb-sw">${SFLD('border-radius:999px;border-color:var(--brand)')}${SUGG('rec')}</span>`, page: '<div class="nvb-pg" style="min-height:190px"><p class="h">Rubrik på sidan</p></div>' })]
  ]);
  q('so-mobil', 'Hur ska sök visas i mobilen?', GR, [
    ['Ikon i headern', M({ right: `<span class="nvb-btn" style="margin-right:6px">${ic('search', 22)}</span>` })],
    ['Fält under headern', M({ body: `<div style="padding:10px 12px;background:#fff;border-bottom:1px solid var(--sline)"><span class="inp ph" style="height:38px;gap:8px;font-size:13px;border-radius:999px">${ic('search', 15)}Sök</span></div>` + MBODY })],
    ['Bara inne i menyn', M({})]
  ]);

  /*SLUT*/
  window.QZ.part({ key: 'navigering', groups: G });
})();
