/* Elevate designquiz – del: Ikoner och symboler (nyckel symboler, id-prefix sy-).
   Alla ikoner ritas här som egen inline-SVG i ett 24-rutnät. Generatorn I() ritar
   samma ikon i olika stilar (linje, fylld, duotone, tvåfärgad, platt) så att bara
   den egenskap som frågan gäller skiljer mellan alternativen. */
(function () {
  'use strict';

  // ---------- Geometri ----------
  const r2 = n => Math.round(n * 100) / 100;
  const pt = (a, r, cx = 12, cy = 12) => { const t = a * Math.PI / 180; return r2(cx + r * Math.cos(t)) + ' ' + r2(cy + r * Math.sin(t)); };
  function gear(teeth = 8, ro = 10, ri = 7.3, tw = 8.5, bw = 13.5) {
    const step = 360 / teeth; let d = '';
    for (let i = 0; i < teeth; i++) {
      const a = i * step - 90;
      d += (i ? 'L' : 'M') + pt(a - bw, ri) + 'L' + pt(a - tw, ro) + 'L' + pt(a + tw, ro) + 'L' + pt(a + bw, ri) + 'A' + ri + ' ' + ri + ' 0 0 1 ' + pt(a + step - bw, ri);
    }
    return d + 'Z';
  }
  const STAR = []; for (let i = 0; i < 10; i++) STAR.push(pt(-90 + i * 36, i % 2 ? 4.1 : 9.6, 12, 12.7));
  const starAll = STAR.join(' ');
  const starHalf = [0, 9, 8, 7, 6, 5].map(i => STAR[i]).join(' ');

  // ---------- Ikoner ----------
  // Varje del: "<typ>[*]|<element utan slut>".
  // f = huvudform (linje, eller fylld i fyllda stilar), F = bara i fyllda stilar, L = bara i linjestilar,
  // k = detalj inuti formen (blir utskuren i fylld stil), K = utskuren yta, n = fristående linje,
  // d = punkt inuti formen, e = fristående punkt. * = accentdel i tvåfärgad stil.
  const HEART = 'M12 20s-7.5-4.6-9.2-9.3C1.7 7.6 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.1 4.2 6.2C19.5 15.4 12 20 12 20z';
  const PIN = 'M12 21.5s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z';
  const BUBBLE = 'M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.7-5.6A8.5 8.5 0 1 1 21 12z';
  const TRI = 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z';
  const EYE = 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z';
  const PHONE = 'M5 3.5h3.2l1.6 4.5-2.2 1.5a11 11 0 0 0 6.9 6.9l1.5-2.2 4.5 1.6V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z';
  const TRAY = 'M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2';
  const CLOUD = 'M7 19a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 18.6 9.6 4.7 4.7 0 0 1 17.5 19z';
  const C95 = 'circle cx="12" cy="12" r="9.5"';
  const ICONS = {
    home: ['f|path d="M9 21H3V10l9-7 9 7v11h-6"', 'K*|path d="M9 21v-6h6v6"'],
    'home-plain': ['f|path d="M3 10 12 3l9 7v11H3z"'],
    'home-chimney': ['f|path d="M9 21H3V10l9-7 4 3.1V4h3v4.4l2 1.6v11h-6"', 'K*|path d="M9 21v-6h6v6"'],
    'home-roof': ['n*|path d="M2 11 12 3l10 8"', 'f|path d="M5 9.4V21h14V9.4"'],
    search: ['n|circle cx="11" cy="11" r="7"', 'n*|path d="m20 20-4-4"'],
    'search-left': ['n|circle cx="13" cy="11" r="7"', 'n*|path d="m4 20 4-4"'],
    'search-long': ['n|circle cx="10" cy="10" r="6"', 'n*|path d="m21 21-6.8-6.8"'],
    'search-thick': ['n|circle cx="10.5" cy="10.5" r="7"', 'F*|path d="m15.6 14.2 5.6 5.6-1.4 1.4-5.6-5.6z"', 'L*|path d="m15.6 15.6 4.4 4.4"'],
    user: ['f*|circle cx="12" cy="8" r="4"', 'F|path d="M4 21a8 8 0 0 1 16 0z"', 'L|path d="M4 21a8 8 0 0 1 16 0"'],
    'user-circle': ['f|' + C95, 'k*|circle cx="12" cy="10" r="3.2"', 'k*|path d="M6.4 18.2a6.6 6.6 0 0 1 11.2 0"'],
    'user-bust': ['f|circle cx="12" cy="7.5" r="4.5"', 'f|path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z"'],
    'user-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|circle cx="12" cy="10" r="3.2"', 'k*|path d="M6.5 20a6 6 0 0 1 11 0"'],
    heart: ['f|path d="' + HEART + '"'],
    'heart-round': ['f|path d="M12 20.5c-4.5-3-9.5-6.5-9.5-11A4.8 4.8 0 0 1 7.3 4.6c2 0 3.6 1.1 4.7 2.9 1.1-1.8 2.7-2.9 4.7-2.9a4.8 4.8 0 0 1 4.8 4.9c0 4.5-5 8-9.5 11z"'],
    'heart-sharp': ['f|path d="M12 21 3.3 12.3a4.9 4.9 0 0 1 7-7L12 7l1.7-1.7a4.9 4.9 0 0 1 7 7z"'],
    bell: ['f|path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9z"', 'n*|path d="M10.2 20.5a2 2 0 0 0 3.6 0"'],
    mail: ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 7 8.5 6 8.5-6"'],
    'mail-open': ['f|path d="M3 10v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9l-9-6.5z"', 'k*|path d="m3.5 10.3 8.5 5.7 8.5-5.7"'],
    'mail-at': ['n|circle cx="12" cy="12" r="4"', 'n*|path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"'],
    'mail-flap': ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 6.5 8.5 7 8.5-7M3.8 18.3l6.4-5.4M20.2 18.3l-6.4-5.4"'],
    calendar: ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"'],
    'calendar-dots': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"', 'd*|circle cx="8" cy="14" r="DR"', 'd*|circle cx="12" cy="14" r="DR"', 'd*|circle cx="16" cy="14" r="DR"', 'd*|circle cx="8" cy="17.5" r="DR"', 'd*|circle cx="12" cy="17.5" r="DR"'],
    'calendar-check': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16M9 15.5l2 2 4-4"'],
    'calendar-plain': ['f|rect x="3" y="4" width="18" height="17" rx="RX"', 'k*|path d="M4 9.5h16"'],
    settings: ['f|path d="' + gear() + '"', 'k*|circle cx="12" cy="12" r="3"'],
    'settings-6': ['f|path d="' + gear(6, 10, 7.2, 10.5, 17) + '"', 'k*|circle cx="12" cy="12" r="3"'],
    sliders: ['n|path d="M4 7h9M18.5 7H20M4 17h2.5M12 17h8"', 'f*|circle cx="15.5" cy="7" r="2.5"', 'f*|circle cx="9" cy="17" r="2.5"'],
    'sliders-v': ['n|path d="M6 3v6M6 14v7M12 3v3M12 11v10M18 3v10M18 18v3"', 'f*|circle cx="6" cy="11.5" r="2.5"', 'f*|circle cx="12" cy="8.5" r="2.5"', 'f*|circle cx="18" cy="15.5" r="2.5"'],
    cart: ['n|path d="M2 3h2.6L7.4 16H19"', 'f|path d="M5.25 6H21l-1.6 7H6.75z"', 'f*|circle cx="9" cy="20" r="1.5"', 'f*|circle cx="17.5" cy="20" r="1.5"'],
    bag: ['f|path d="M5 8h14l1 13H4z"', 'n*|path d="M9 8V6a3 3 0 0 1 6 0v2"'],
    basket: ['f|path d="M3 10h18l-2 10H5z"', 'n*|path d="m7 10 3-6M17 10l-3-6"', 'k*|path d="M9.5 13.5v3M14.5 13.5v3"'],
    check: ['n|path d="M20 6 9 17l-5-5"'],
    'check-short': ['n|path d="m5 12.5 4.5 4.5L19 7.5"'],
    'check-circle': ['f|' + C95, 'k*|path d="m8 12.3 2.8 2.8 5.4-5.5"'],
    'check-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m8 12.3 2.8 2.8 5.4-5.5"'],
    x: ['n|path d="M18 6 6 18M6 6l12 12"'],
    'x-small': ['n|path d="M16 8l-8 8M8 8l8 8"'],
    'x-circle': ['f|' + C95, 'k*|path d="m15 9-6 6M9 9l6 6"'],
    'x-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m15 9-6 6M9 9l6 6"'],
    plus: ['n|path d="M12 5v14M5 12h14"'],
    minus: ['n|path d="M5 12h14"'],
    'plus-circle': ['f|' + C95, 'k*|path d="M12 8v8M8 12h8"'],
    'minus-circle': ['f|' + C95, 'k*|path d="M8 12h8"'],
    'plus-square': ['f|rect x="3.5" y="3.5" width="17" height="17" rx="RX"', 'k*|path d="M12 8v8M8 12h8"'],
    'minus-square': ['f|rect x="3.5" y="3.5" width="17" height="17" rx="RX"', 'k*|path d="M8 12h8"'],
    info: ['f|' + C95, 'k*|path d="M12 11v5.5"', 'd*|circle cx="12" cy="7.8" r="DR"'],
    'info-plain': ['n|path d="M10 10.5h2V19M9.5 19h5"', 'e*|circle cx="11.8" cy="5.8" r="DR"'],
    'info-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="M12 11v5.5"', 'd*|circle cx="12" cy="7.8" r="DR"'],
    alert: ['f|path d="' + TRI + '"', 'k*|path d="M12 9v4.5"', 'd*|circle cx="12" cy="17" r="DR"'],
    'alert-circle': ['f|' + C95, 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    'alert-diamond': ['f|path d="M10.6 2.6a2 2 0 0 1 2.8 0l8 8a2 2 0 0 1 0 2.8l-8 8a2 2 0 0 1-2.8 0l-8-8a2 2 0 0 1 0-2.8z"', 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    octagon: ['f|path d="M8.1 2.5h7.8l5.6 5.6v7.8l-5.6 5.6H8.1l-5.6-5.6V8.1z"', 'k*|path d="m15 9-6 6M9 9l6 6"'],
    'octagon-alert': ['f|path d="M8.1 2.5h7.8l5.6 5.6v7.8l-5.6 5.6H8.1l-5.6-5.6V8.1z"', 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    menu: ['n|path d="M4 6h16M4 12h16M4 18h16"'],
    'menu-2': ['n|path d="M4 9h16M4 15h16"'],
    'menu-short': ['n|path d="M4 6h16M4 12h16M4 18h10"'],
    'menu-right': ['n|path d="M4 6h16M10 12h10M7 18h13"'],
    'menu-dots': ['e|circle cx="5" cy="12" r="DL"', 'e|circle cx="12" cy="12" r="DL"', 'e|circle cx="19" cy="12" r="DL"'],
    'menu-grid': ['e|circle cx="6" cy="6" r="DL"', 'e|circle cx="12" cy="6" r="DL"', 'e|circle cx="18" cy="6" r="DL"', 'e|circle cx="6" cy="12" r="DL"', 'e|circle cx="12" cy="12" r="DL"', 'e|circle cx="18" cy="12" r="DL"', 'e|circle cx="6" cy="18" r="DL"', 'e|circle cx="12" cy="18" r="DL"', 'e|circle cx="18" cy="18" r="DL"'],
    pin: ['f|path d="' + PIN + '"', 'k*|circle cx="12" cy="9.5" r="2.6"'],
    'pin-plain': ['f|path d="' + PIN + '"'],
    'pin-dot': ['f|path d="' + PIN + '"', 'd*|circle cx="12" cy="9.5" r="2.3"'],
    'pin-round': ['f|circle cx="12" cy="9" r="6"', 'n*|path d="M12 15v7"', 'k*|circle cx="12" cy="9" r="2"'],
    phone: ['f|path d="' + PHONE + '"'],
    'phone-waves': ['f|path d="' + PHONE + '"', 'n*|path d="M14.5 3a6.5 6.5 0 0 1 6.5 6.5M14.5 6.5a3 3 0 0 1 3 3"'],
    mobile: ['f|rect x="6" y="2.5" width="12" height="19" rx="RX"', 'k*|path d="M11 18.5h2"'],
    'phone-circle': ['f|' + C95, 'K*|path d="M9 7.2h1.4l.8 2.2-1.1.8a5.6 5.6 0 0 0 3.3 3.3l.8-1.1 2.2.8V15a1 1 0 0 1-1 1A8 8 0 0 1 8 8.2a1 1 0 0 1 1-1z"'],
    clock: ['f|' + C95, 'k*|path d="M12 7v5l3.2 2"'],
    'clock-ticks': ['f|' + C95, 'k*|path d="M12 7.5V12l3 2"', 'k|path d="M12 3.8v.6M20.2 12h-.6M12 20.2v-.6M3.8 12h.6"'],
    'clock-plain': ['f|' + C95, 'k*|path d="M12 6.5V12h4"'],
    filter: ['f|path d="M3 4.5h18l-7 8.3V19l-4 2v-8.2z"'],
    'filter-lines': ['n|path d="M4 6h16M7 12h10M10 18h4"'],
    sort: ['n|path d="M7 4v16M3 8l4-4 4 4"', 'n*|path d="M17 20V4M21 16l-4 4-4-4"'],
    'sort-bars': ['n|path d="M4 6h16M4 12h11M4 18h6"'],
    'sort-chev': ['n|path d="m8 9 4-4 4 4"', 'n*|path d="m8 15 4 4 4-4"'],
    'sort-az': ['n|path d="M7 4v16M3 16l4 4 4-4"', 'n*|path d="M14 10V5.5a2 2 0 0 1 4 0V10M14 7.5h4M14 14h4.5L14 20h4.5"'],
    share: ['n*|path d="m8.3 10.7 7.4-4.3M8.3 13.3l7.4 4.3"', 'f|circle cx="18" cy="5" r="2.6"', 'f|circle cx="6" cy="12" r="2.6"', 'f|circle cx="18" cy="19" r="2.6"'],
    'share-box': ['n*|path d="M12 3v12M8 7l4-4 4 4"', 'n|path d="M7.5 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1.5"'],
    'share-arrow': ['n|path d="m14 5 7 7-7 7"', 'n*|path d="M21 12h-8a9 9 0 0 0-9 9"'],
    'share-plane': ['f|path d="M21.5 2.5 14.5 21.5l-3.6-8.4-8.4-3.6z"', 'k*|path d="m10.9 13.1 4.6-4.6"'],
    download: ['n*|path d="M12 3v12M7 10l5 5 5-5"', 'n|path d="' + TRAY + '"'],
    'download-plain': ['n|path d="M12 4v15M6 13l6 6 6-6"'],
    'download-line': ['n*|path d="M12 3v13M7 11l5 5 5-5"', 'n|path d="M5 21h14"'],
    'download-circle': ['f|' + C95, 'k*|path d="M12 7.5v8M8.5 12l3.5 3.5 3.5-3.5"'],
    'download-cloud': ['f|path d="' + CLOUD + '"', 'K*|path d="M12 11v6M9.5 14.5 12 17l2.5-2.5"'],
    upload: ['n*|path d="M12 15V3M7 8l5-5 5 5"', 'n|path d="' + TRAY + '"'],
    'upload-line': ['n*|path d="M12 21V8M7 13l5-5 5 5"', 'n|path d="M5 3h14"'],
    'upload-circle': ['f|' + C95, 'k*|path d="M12 16.5v-8M8.5 12l3.5-3.5 3.5 3.5"'],
    'upload-cloud': ['f|path d="' + CLOUD + '"', 'K*|path d="M12 17v-6M9.5 13.5 12 11l2.5 2.5"'],
    external: ['n*|path d="M14 4h6v6M20 4l-9 9"', 'n|path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"'],
    'external-arrow': ['n|path d="M7 17 17 7M8 7h9v9"'],
    'external-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m9.5 14.5 6-6M10 8.5h5.5V14"'],
    'external-small': ['n|path d="M9 6h9v9M18 6 6 18"'],
    lock: ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"', 'k*|path d="M12 14.5v3"'],
    'lock-open': ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M8 10.5V7a4 4 0 0 1 7.8-1.2"', 'k*|path d="M12 14.5v3"'],
    'lock-square': ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M7.5 10.5V3.5h9v7"', 'k*|path d="M12 14.5v3"'],
    'lock-keyhole': ['f|rect x="4" y="10" width="16" height="11" rx="RX"', 'n|path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3"', 'd*|circle cx="12" cy="14.6" r="1.6"', 'k*|path d="M12 15.5v2.5"'],
    shield: ['f|path d="M12 3 20 6v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"', 'k*|path d="m8.8 12 2.2 2.2 4.2-4.2"'],
    eye: ['f|path d="' + EYE + '"', 'k*|circle cx="12" cy="12" r="3"'],
    'eye-off': ['f|path d="' + EYE + '"', 'k*|circle cx="12" cy="12" r="3"', 'K|path d="M3.5 3.5l17 17"', 'n*|path d="M3.5 3.5l17 17"'],
    'eye-closed': ['n|path d="M2.5 10s3.6 5.5 9.5 5.5 9.5-5.5 9.5-5.5"', 'n*|path d="m5.3 13.3-1.8 2.4M18.7 13.3l1.8 2.4M12 15.5v3M8.4 15l-1 2.8M15.6 15l1 2.8"'],
    'eye-round': ['f|path d="M2 12c2.4-4.3 5.8-6.5 10-6.5s7.6 2.2 10 6.5c-2.4 4.3-5.8 6.5-10 6.5S4.4 16.3 2 12z"', 'd*|circle cx="12" cy="12" r="3.2"'],
    trash: ['n|path d="M3 6h18M9 6V4h6v2"', 'f|path d="M5 6h14l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"', 'k*|path d="M10 10.5v6M14 10.5v6"'],
    'trash-plain': ['n|path d="M3 6h18M9 6V4h6v2"', 'f|path d="M5 6h14l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"'],
    'trash-bin': ['n|path d="M4 6h16"', 'f|path d="M6 6h12v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"', 'k*|path d="M10 10v7M14 10v7"'],
    'trash-lid': ['n*|path d="M3.5 7.5 20 4M10 5.5l-.4-1.9 4.9-1 .4 1.9"', 'f|path d="M5 9h14l-1 11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"'],
    edit: ['f|path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z"', 'k*|path d="m14.5 5.5 3 3"'],
    'edit-line': ['f|path d="M14.5 3.5a2.12 2.12 0 0 1 3 3L7 17l-4 1 1-4z"', 'k*|path d="m12.5 5.5 3 3"', 'n*|path d="M12 21h9"'],
    'edit-square': ['n|path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"', 'f*|path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L12 14l-4 1 1-4z"'],
    'edit-pen': ['f|path d="m4 20 1-5L15.5 4.5l4 4L9 19z"', 'k*|path d="m13 7 4 4"', 'k|path d="m5 15 4 4"'],
    copy: ['f|rect x="8" y="8" width="13" height="13" rx="RX"', 'n*|path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"'],
    'copy-docs': ['n*|path d="M5 17V4a1 1 0 0 1 1-1h8"', 'f|path d="M9 7h7l4 4v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z"', 'k|path d="M16 7v4h4"'],
    'copy-stack': ['n*|rect x="3" y="3" width="13" height="13" rx="RX"', 'f|rect x="8" y="8" width="13" height="13" rx="RX"'],
    chat: ['f|path d="' + BUBBLE + '"', 'd*|circle cx="8.8" cy="12" r="DR"', 'd*|circle cx="12.5" cy="12" r="DR"', 'd*|circle cx="16.2" cy="12" r="DR"'],
    'chat-plain': ['f|path d="' + BUBBLE + '"'],
    'chat-square': ['f|path d="M6 4h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"'],
    'chat-lines': ['f|path d="M6 4h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"', 'k*|path d="M8 9h9M8 12.5h5.5"'],
    'chat-two': ['n*|path d="M15 8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6l3-2.5h3"', 'f|path d="M10 10h10a2 2 0 0 1 2 2v9l-3-2.5h-9a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z"'],
    link: ['n|path d="M10 13.5a4.5 4.5 0 0 0 6.4.4l2.8-2.8a4.5 4.5 0 0 0-6.4-6.4l-1.6 1.6"', 'n*|path d="M14 10.5a4.5 4.5 0 0 0-6.4-.4l-2.8 2.8a4.5 4.5 0 0 0 6.4 6.4l1.6-1.6"'],
    'link-h': ['n|path d="M9.5 7.5H7a4.5 4.5 0 0 0 0 9h2.5M14.5 7.5H17a4.5 4.5 0 0 1 0 9h-2.5"', 'n*|path d="M8 12h8"'],
    'link-h-open': ['n|path d="M9.5 7.5H7a4.5 4.5 0 0 0 0 9h2.5M14.5 7.5H17a4.5 4.5 0 0 1 0 9h-2.5"'],
    'link-rings': ['n|rect x="2.5" y="8" width="11" height="8" rx="4"', 'n*|rect x="10.5" y="8" width="11" height="8" rx="4"'],
    star: ['f|polygon points="' + starAll + '"'],
    bookmark: ['f|path d="M6 3h12v18l-6-4.5L6 21z"'],
    grid: ['f|rect x="3.5" y="3.5" width="7" height="7" rx="RX"', 'f|rect x="13.5" y="3.5" width="7" height="7" rx="RX"', 'f|rect x="3.5" y="13.5" width="7" height="7" rx="RX"', 'f*|rect x="13.5" y="13.5" width="7" height="7" rx="RX"'],
    list: ['n|path d="M9 6h11M9 12h11M9 18h11"', 'e*|circle cx="4.5" cy="6" r="DL"', 'e*|circle cx="4.5" cy="12" r="DL"', 'e*|circle cx="4.5" cy="18" r="DL"'],
    refresh: ['n|path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5"', 'n*|path d="M4 3.5v4h4M20 20.5v-4h-4"'],
    'arrow-right': ['n|path d="M5 12h14"', 'n*|path d="m13 6 6 6-6 6"'],
    image: ['f|rect x="3" y="4" width="18" height="16" rx="RX"', 'k*|path d="m4 18 5-5 4 4 2.5-2.5L20 19"', 'd*|circle cx="15.5" cy="9" r="1.8"'],
    camera: ['f|path d="M4 7h3.2l1.6-2.5h6.4L16.8 7H20a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"', 'k*|circle cx="12" cy="13" r="3.6"'],
    globe: ['f|' + C95, 'k*|path d="M2.5 12h19M12 2.5c2.6 2.6 3.8 6 3.8 9.5s-1.2 6.9-3.8 9.5c-2.6-2.6-3.8-6-3.8-9.5S9.4 5.1 12 2.5z"'],
    bolt: ['f|path d="M13.5 2.5 4.5 13.5H12l-1.5 8 9-11H12z"'],
    package: ['f|path d="M4 8h16v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"', 'n*|path d="M3 4h18v4H3z"', 'k*|path d="M10 12h4"'],
    layers: ['f|rect x="4" y="3.5" width="16" height="5" rx="RX"', 'f|rect x="4" y="10" width="16" height="5" rx="RX"', 'f*|rect x="4" y="16.5" width="16" height="4.5" rx="RX"'],
    doc: ['f|path d="M6 2.5h8l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V4a1.5 1.5 0 0 1 1-1.5z"', 'k|path d="M14 2.5V7.5h5"', 'k*|path d="M8.5 12.5h7M8.5 16h5"'],
    'iso-box': ['f|path d="m12 3 7.8 4.5v9L12 21l-7.8-4.5v-9z"', 'k*|path d="M4.4 7.6 12 12l7.6-4.4M12 12v8.8"'],
    'iso-layers': ['f|path d="M12 3.5 21 8.5l-9 5-9-5z"', 'n*|path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"'],
    'iso-doc': ['f|path d="m3 13.5 10-6 8 4.5-10 6z"', 'n*|path d="m3 13.5v2.5l8 4.5 10-6v-2.5"', 'k|path d="m8.5 13 5-3M10.8 14.3l3.5-2.1"'],
    // Handritade varianter (bara linje)
    'h-home': ['f|path d="M3.2 10.4C6 8 9 5.4 12.1 2.9c3 2.5 6 4.9 8.8 7.3.1 3.6 0 7.2.2 10.6-1.9.1-3.9 0-5.9.1-.1-2 .1-4-.1-6-2-.1-4.1.1-6.1 0 0 2 .1 4 0 6-2 .1-3.9-.1-5.9 0-.1-3.5.2-7 .1-10.5z"'],
    'h-search': ['f|path d="M17.6 10.6c.2 3.8-3 7-6.8 7-3.9.1-6.9-2.9-6.9-6.8C3.8 7 6.9 3.9 10.7 3.8c3.7-.1 6.8 3 6.9 6.8z"', 'n|path d="M16 16.3c1.4 1.2 2.8 2.6 4.1 4"'],
    'h-user': ['f|path d="M15.9 8.1c0 2.3-1.8 4-4 4-2.1-.1-3.9-1.9-3.8-4.1.1-2.1 1.8-3.9 4-3.9 2.1.1 3.8 1.8 3.8 4z"', 'n|path d="M4.2 20.9c-.3-4.3 3.4-7.9 7.8-7.9 4.5-.1 8.1 3.5 7.8 8"'],
    'h-heart': ['f|path d="M12 19.8c-3-1.8-8.6-5.6-9-9.6C2.6 7 4.6 4.6 7.3 4.6c2 .1 3.6 1.3 4.6 3.1 1.1-1.8 2.8-3.2 4.9-3.2 2.8 0 4.7 2.5 4.3 5.4-.6 4-6.1 8.1-9.1 9.9z"'],
    'h-bell': ['f|path d="M6.1 9.2C6 5.8 8.6 3 12 3c3.4.1 5.9 2.8 5.9 6.2 0 5.6 2.6 7.7 2.6 7.9-5.7.1-11.3-.1-17 .1 0-.2 2.7-2.4 2.6-8z"', 'n|path d="M10.3 20.3c.8 1.2 2.6 1.3 3.5.1"'],
    'h-mail': ['f|path d="M3.1 5.3c6-.3 11.9 0 17.8-.2.3 4.6 0 9.2.1 13.8-6 .2-11.9-.1-17.8.1-.2-4.6.1-9.1-.1-13.7z"', 'k|path d="M3.6 7.1c2.8 2 5.6 4.1 8.5 5.9 2.9-1.8 5.6-3.9 8.4-6"'],
    'h-calendar': ['f|path d="M3.2 5.2c5.9-.2 11.8.1 17.7-.1.2 5.3-.1 10.6.1 15.8-5.9.2-11.8-.1-17.7.1-.2-5.3.1-10.5-.1-15.8z"', 'n|path d="M8.1 2.9c-.1 1.4.1 2.8 0 4.1M15.9 3c.1 1.3-.1 2.7.1 4M4 10.1c5.3-.2 10.7.1 16-.1"'],
    'h-settings': ['f|path d="' + gear() + '"', 'k|path d="M15 12.1c-.1 1.7-1.4 3-3.1 2.9-1.6 0-2.9-1.4-2.9-3 .1-1.7 1.4-3 3.1-2.9 1.6 0 2.9 1.4 2.9 3z"'],
    // Detaljrika varianter
    'd-home': ['f|path d="M9 21H3V10l9-7 4 3.1V4h3v4.4l2 1.6v11h-6"', 'K*|path d="M9 21v-6h6v6"', 'k*|path d="M10.5 8.8h3v3h-3z"'],
    'd-search': ['n|circle cx="11" cy="11" r="7"', 'n*|path d="m20 20-4-4M7.6 9.6a3.6 3.6 0 0 1 2.6-2.4"'],
    'd-user': ['f*|circle cx="12" cy="8" r="4"', 'F|path d="M4 21a8 8 0 0 1 16 0z"', 'L|path d="M4 21a8 8 0 0 1 16 0"', 'k|path d="m9.5 13.4 2.5 3 2.5-3"'],
    'd-heart': ['f|path d="' + HEART + '"', 'k*|path d="M6.6 7.6a2.6 2.6 0 0 0-1.5 2.3"'],
    'd-bell': ['f|path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9z"', 'n*|path d="M10.2 20.5a2 2 0 0 0 3.6 0M2.3 7.5A9 9 0 0 1 4.8 3.4M21.7 7.5a9 9 0 0 0-2.5-4.1"', 'k|path d="M6.5 13.5h11"'],
    'd-mail': ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 7 8.5 6 8.5-6M3.8 18.3l6.4-5.2M20.2 18.3l-6.4-5.2"'],
    'd-calendar': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"', 'd*|circle cx="8" cy="14" r="DR"', 'd*|circle cx="12" cy="14" r="DR"', 'd*|circle cx="16" cy="14" r="DR"', 'd*|circle cx="8" cy="17.5" r="DR"', 'd*|circle cx="12" cy="17.5" r="DR"'],
    'd-settings': ['f|path d="' + gear() + '"', 'k*|circle cx="12" cy="12" r="3"', 'k|circle cx="12" cy="12" r="5.2"'],
    // Sociala former (förenklade, inga riktiga logotyper)
    'so-cam': ['f|rect x="3" y="3" width="18" height="18" rx="5.5"', 'k*|circle cx="12" cy="12" r="4"', 'd*|circle cx="17.2" cy="6.8" r="1.2"'],
    'so-f': ['n|path d="M15.5 3H13a3.5 3.5 0 0 0-3.5 3.5V21M6.5 10.5h8"'],
    'so-in': ['n|path d="M5 10v10M10.5 20V10M10.5 15a4 4 0 0 1 8 0v5"', 'e*|circle cx="5" cy="5.2" r="1.6"']
  };

  // ---------- Rendering av ikon ----------
  // o: s storlek px, w linje, st stil, c färg, c2 andrafärg, op duotone-täckning, k utskärningsfärg,
  //    cap, join, rx hörnradie, ns fast linjetjocklek oavsett storlek, gap öppna former, nok inga utskärningar, style
  function I(name, o = {}) {
    const def = ICONS[name]; if (!def) throw new Error('ikon saknas: ' + name);
    const s = o.s || 24, w = o.w != null ? o.w : 2, st = o.st || 'line';
    const C = o.c || 'currentColor';
    const C2 = o.c2 || (st === 'duo' ? C : st === 'flat' ? '#9DB0C4' : 'var(--brand)');
    const K = o.k || '#fff', op = o.op != null ? o.op : 0.2;
    const cap = o.cap || 'round', join = o.join || (cap === 'round' ? 'round' : 'miter');
    const rx = o.rx != null ? o.rx : 2;
    const dr = r2(Math.max(w * 0.62, 0.9)), dl = r2(Math.max(w * 0.8, 1.2));
    const ve = o.ns ? ' vector-effect="non-scaling-stroke"' : '';
    let out = '';
    for (const p of def) {
      const bar = p.indexOf('|'), k = p[0], acc = p[1] === '*';
      const t = p.slice(bar + 1).replace(/"RX"/g, '"' + rx + '"').replace(/"DR"/g, '"' + dr + '"').replace(/"DL"/g, '"' + dl + '"');
      const A = acc ? C2 : C;
      let a = null;
      if (st === 'line') {
        a = (k === 'F') ? null : (k === 'd' || k === 'e') ? `fill="${C}" stroke="none"` : `stroke="${C}"`;
      } else if (st === 'fill') {
        if (k === 'L') a = null;
        else if (k === 'f' || k === 'F') a = `fill="${C}" stroke="${C}"`;
        else if (k === 'k') a = o.nok ? null : `stroke="${K}"`;
        else if (k === 'K') a = o.nok ? null : `fill="${K}" stroke="${K}"`;
        else if (k === 'n') a = `stroke="${C}"`;
        else if (k === 'd') a = o.nok ? null : `fill="${K}" stroke="none"`;
        else a = `fill="${C}" stroke="none"`;
      } else if (st === 'duo') {
        if (k === 'F') a = `fill="${C2}" fill-opacity="${op}" stroke="none"`;
        else if (k === 'f') a = `fill="${C2}" fill-opacity="${op}" stroke="${C}"`;
        else if (k === 'd' || k === 'e') a = `fill="${C}" stroke="none"`;
        else a = `stroke="${C}"`;
      } else if (st === 'two') {
        if (k === 'F') a = null;
        else if (k === 'd' || k === 'e') a = `fill="${A}" stroke="none"`;
        else a = `stroke="${A}"`;
      } else if (st === 'flat') {
        if (k === 'L') a = null;
        else if (k === 'f' || k === 'F') a = `fill="${C2}" stroke="none"`;
        else if (k === 'd' || k === 'e') a = `fill="${C}" stroke="none"`;
        else if (k === 'K') a = `fill="${o.k || 'none'}" stroke="${C}"`;
        else a = `stroke="${C}"`;
      }
      if (a === null) continue;
      const g = (o.gap && (k === 'f' || k === 'L')) ? ` pathLength="100" stroke-dasharray="87 13" stroke-dashoffset="${o.gap}"` : '';
      out += `<${t} ${a}${g}${ve}/>`;
    }
    const sty = `width:${s}px;height:${s}px;display:block;flex:0 0 auto;` + (o.style || '');
    return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="${join}" aria-hidden="true" style="${sty}">${out}</svg>`;
  }

  // ---------- Små byggklossar ----------
  const fmt = n => String(n).replace('.', ',');
  const CSS = '<style>.syx-c{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px 16px;min-width:0;color:var(--sink)}.syx-g{display:grid;grid-template-columns:repeat(4,auto);justify-content:center;gap:18px 26px;align-items:center}.syx-r{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px}.syx-l{display:flex;align-items:center;gap:8px;min-width:0}.syx-w{width:100%;max-width:300px;min-width:0}.syx-dark{background:#1A1C1E;color:#fff}</style>';
  const W = (inner, style = '') => CSS + `<div class="syx-c" style="${style}">${inner}</div>`;
  const SET8 = ['home', 'search', 'user', 'heart', 'bell', 'mail', 'calendar', 'settings'];
  const grid = (o = {}, names = SET8, gs = '') => `<div class="syx-g" style="${gs}">` + names.map(n => I(n, o)).join('') + '</div>';
  const row = (o = {}, names = SET8, gs = '') => `<div class="syx-r" style="${gs}">` + names.map(n => I(n, o)).join('') + '</div>';
  const O = (l, h) => (h == null ? { l } : { l, h });
  const Q = (id, q, opts, layout = 'grid') => ({ id: 'sy-' + id, q, layout, opts });
  const btn = (inner, st = '') => `<span class="sb" style="${st}">${inner}</span>`;
  const btn2 = (inner, st = '') => `<span class="sb2" style="${st}">${inner}</span>`;
  // Tabbar längst ner: items [ikon, etikett], f(ikon, aktiv) ger SVG
  const tabbar = (f, items = [['home', 'Hem'], ['search', 'Sök'], ['heart', 'Sparat'], ['user', 'Profil']], extra = '') =>
    `<div class="syx-w" style="display:flex;justify-content:space-around;background:var(--box);border:1px solid var(--sline);padding:9px 4px 7px;border-radius:14px;${extra}">` +
    items.map((it, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;line-height:1.2;font-weight:${i ? 500 : 600};color:${i ? 'var(--smuted)' : 'var(--sink)'};min-width:0">${f(it[0], i === 0)}<span>${it[1]}</span></div>`).join('') + '</div>';

  const G = [];

  // =====================================================================
  // 1. Linjetjocklek
  // =====================================================================
  G.push({ key: 'linjetjocklek', title: 'Linjetjocklek', questions: [
    Q('linje-24', 'Hur tjock ska linjen vara på ikoner i 24 px?',
      [1, 1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje', W(grid({ w }))))),
    Q('linje-24-fin', 'Vilken av de mellanliggande tjocklekarna är bäst i 24 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px linje', W(grid({ w }))))),
    Q('linje-20', 'Hur tjock ska linjen vara på ikoner i 20 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px linje i 20 px', W(grid({ w, s: 20, ns: 1 }))))),
    Q('linje-16', 'Hur tjock ska linjen vara på små ikoner i 16 px?',
      [1.25, 1.5, 2].map(w => O(fmt(w) + ' px linje i 16 px', W(grid({ w, s: 16, ns: 1 }, SET8, 'gap:16px 22px'))))),
    Q('linje-32', 'Hur tjock ska linjen vara på ikoner i 32 px?',
      [1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje i 32 px', W(grid({ w, s: 32, ns: 1 }, SET8, 'gap:18px 22px'))))),
    Q('linje-skala', 'Hur ska linjen bete sig när samma ikon visas i olika storlekar?', [
      ['Skalar med storleken', s => 2 * s / 24],
      ['Alltid 2 px', () => 2],
      ['Växer lite med storleken', s => ({ 16: 1.75, 24: 2, 32: 2.25, 48: 2.5 })[s]]
    ].map(([l, f]) => O(l, W(['home', 'bell'].map(n => `<div class="syx-r" style="align-items:flex-end;gap:14px">${[16, 24, 32, 48].map(s => I(n, { s, w: f(s), ns: 1 })).join('')}</div>`).join(''))))),
    Q('linje-brodtext', 'Vilken linje passar bäst bredvid brödtext i 15 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px bredvid brödtext', W(`<div class="stack" style="gap:10px">${[['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12, plan 3'], ['calendar', 'Måndag till fredag']].map(([n, t]) => `<div class="syx-l">${I(n, { s: 20, w, ns: 1 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('linje-rubrik', 'Vilken linje passar bäst bredvid en fet rubrik?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px bredvid rubrik', W(`<div class="stack" style="gap:12px">${[['shield', 'Trygg betalning'], ['refresh', 'Fri retur i 30 dagar']].map(([n, t]) => `<div class="syx-l" style="gap:10px">${I(n, { s: 24, w })}<span class="h h3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('linje-knapp', 'Hur tjock ska ikonlinjen vara inne i en knapp?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px i knappen', W(`<div class="syx-r">${btn(I('download', { s: 20, w, ns: 1 }) + 'Ladda ner')}${btn2(I('share-box', { s: 20, w, ns: 1 }) + 'Dela')}</div>`)))),
    Q('linje-tabbar', 'Hur tjock ska linjen vara i en tabbar längst ner i mobilen?',
      [1.5, 1.75, 2, 2.5].map(w => O(fmt(w) + ' px i tabbaren', W(tabbar((n) => I(n, { w }))))) ),
    Q('linje-stor', 'Hur tjock ska linjen vara på stora ikoner i 48 px?',
      [1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje i 48 px', W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 48, w, ns: 1 })).join('')}</div>`)))),
    Q('linje-mork', 'Hur tjock ska linjen vara på mörk bakgrund?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px på mörk yta', W(grid({ w }), 'background:#1A1C1E;color:#fff')))),
    Q('linje-falt', 'Hur tjock ska ikonen inne i ett fält vara?',
      [1.25, 1.5, 2].map(w => O(fmt(w) + ' px i fältet', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s: 20, w, ns: 1, style: 'color:var(--smuted)' })}Sök</div><div class="inp ph" style="gap:10px">${I('mail', { s: 20, w, ns: 1, style: 'color:var(--smuted)' })}E-post</div></div>`))))
  ]});

  // =====================================================================
  // 2. Ändar och hörn
  // =====================================================================
  const SETEND = ['check', 'x', 'plus', 'menu', 'search', 'download', 'external', 'sort'];
  const SETJOIN = ['check', 'home-plain', 'mail', 'alert', 'filter', 'external-arrow', 'bookmark', 'edit'];
  G.push({ key: 'andar-och-horn', title: 'Ändar och hörn', questions: [
    Q('ande-andar', 'Hur ska linjernas ändar se ut?', [
      ['Rundade ändar', 'round', 'round'], ['Raka, avskurna ändar', 'butt', 'round'], ['Raka, förlängda ändar', 'square', 'round']
    ].map(([l, cap, join]) => O(l, W(grid({ w: 2.25, s: 36, cap, join }, SETEND, 'gap:18px 22px'))))),
    Q('ande-horn', 'Hur ska hörnen där två linjer möts se ut?', [
      ['Rundade hörn', 'round'], ['Spetsiga hörn', 'miter'], ['Fasade hörn', 'bevel']
    ].map(([l, join]) => O(l, W(grid({ w: 2.25, s: 36, cap: 'round', join }, SETJOIN, 'gap:18px 22px'))))),
    Q('ande-paket', 'Vilken helhet ska ikonernas linjer ha?', [
      ['Allt rundat', 'round', 'round', 2], ['Allt rakt och spetsigt', 'butt', 'miter', 0], ['Rundade hörn, raka ändar', 'butt', 'round', 2]
    ].map(([l, cap, join, rx]) => O(l, W(grid({ w: 2, s: 36, cap, join, rx }, ['check', 'menu', 'mail', 'external', 'calendar', 'download', 'home-plain', 'x'], 'gap:18px 22px'))))),
    Q('ande-radie', 'Hur runda ska hörnen på rektangulära former i ikonerna vara?', [
      ['Skarpa hörn (0 px)', 0], ['1,5 px hörnradie', 1.5], ['3 px hörnradie', 3], ['5 px hörnradie', 5]
    ].map(([l, rx]) => O(l, W(grid({ rx, s: 28 }, ['mail', 'calendar', 'lock', 'mobile', 'plus-square', 'image', 'check-square', 'external-square'], 'gap:18px 22px'))))),
    Q('ande-fyllda', 'Hur ska hörnen på fyllda ikoner se ut?', [
      ['Spetsiga hörn', 'miter', 1], ['Lätt rundade hörn', 'round', 1.5], ['Tydligt rundade hörn', 'round', 3.2]
    ].map(([l, join, w]) => O(l, W(grid({ st: 'fill', s: 28, w, join, cap: join === 'miter' ? 'butt' : 'round' }, ['home', 'bell', 'star', 'alert', 'filter', 'bookmark', 'chat-square', 'bolt'], 'gap:18px 22px')))))
  ]});

  // =====================================================================
  // 3. Stilar
  // =====================================================================
  const STYLES = [['Linje', { st: 'line' }], ['Fylld (glyph)', { st: 'fill' }], ['Duotone (linje med ljus fyllning)', { st: 'duo', c2: 'var(--brand)', op: 0.18 }], ['Tvåfärgad linje', { st: 'two' }], ['Platt (fyllda ytor, ingen kontur)', { st: 'flat', c: 'var(--brand)' }]];
  const offDuo = (n, o = {}) => { const s = o.s || 24; return `<span style="position:relative;display:block;width:${s}px;height:${s}px;flex:0 0 auto">${I(n, { s, st: 'flat', c: 'none', c2: o.c2 || '#C9D5E2', style: 'position:absolute;left:' + (s / 10) + 'px;top:' + (s / 10) + 'px' })}${I(n, { s, w: o.w, style: 'position:absolute;left:0;top:0' })}</span>`; };
  G.push({ key: 'stilar', title: 'Stilar', questions: [
    Q('stil-grund', 'Vilken grundstil ska ikonerna ha?', STYLES.map(([l, o]) => O(l, W(grid(o))))),
    Q('stil-verktyg', 'Vilken stil ska ikonknappar i en verktygsrad ha?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill' }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.18 }]].map(([l, o]) =>
      O(l, W(`<div class="row" style="gap:4px;background:var(--box);border:1px solid var(--sline);border-radius:10px;padding:4px;flex-wrap:wrap;justify-content:center">${['edit', 'copy', 'link', 'share', 'download', 'trash'].map(n => `<span style="display:grid;place-items:center;width:38px;height:38px">${I(n, { ...o, s: 20 })}</span>`).join('')}</div>`)))),
    Q('stil-duo-styrka', 'Hur stark ska fyllningen i duotone-ikoner vara?', [0.1, 0.2, 0.35].map(op => O('Fyllning ' + Math.round(op * 100) + ' %', W(grid({ st: 'duo', c2: 'var(--brand)', op }))))),
    Q('stil-duo-farg', 'Vilken färg ska fyllningen i duotone-ikoner ha?', [
      ['Linjens färg, ljust', 'var(--sink)', 0.14], ['Varumärkesfärg, ljust', 'var(--brand)', 0.22], ['Ljusgrå', '#9AA0A6', 0.35]
    ].map(([l, c2, op]) => O(l, W(grid({ st: 'duo', c2, op }))))),
    Q('stil-duo-forskjut', 'Var ska fyllningen sitta i duotone-ikoner?', [
      O('Exakt inom formen', W(grid({ s: 32, st: 'duo', c2: 'var(--brand)', op: 0.25 }))),
      O('Förskjuten snett nedåt', W(`<div class="syx-g">${SET8.map(n => offDuo(n, { s: 32, c2: '#BFCDDC' })).join('')}</div>`))
    ]),
    Q('stil-tvafarg', 'Vilken del ska ha accentfärgen i tvåfärgade ikoner?', [
      O('Detaljer i accentfärg', W(grid({ st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock']))),
      O('Huvudform i accentfärg', W(grid({ st: 'two', c: 'var(--brand)', c2: 'var(--sink)' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock']))),
      O('Detaljer i ljusare ton', W(grid({ st: 'two', c: 'var(--sink)', c2: '#8A9099' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock'])))
    ]),
    Q('stil-platt-kontur', 'Ska platta ikoner ha en kontur?', [
      O('Platt utan kontur', W(grid({ st: 'flat', c: 'var(--brand)', c2: '#9DB0C4' }))),
      O('Platt med mörk kontur', W(grid({ st: 'duo', c: 'var(--brand)', c2: '#9DB0C4', op: 1 })))
    ]),
    Q('stil-glyph-detalj', 'Ska fyllda ikoner ha utskurna detaljer?', [
      O('Med utskurna detaljer', W(grid({ st: 'fill' }, ['home', 'user-circle', 'bell', 'mail', 'calendar', 'settings', 'lock', 'chat']))),
      O('Helt solid siluett', W(grid({ st: 'fill', nok: 1 }, ['home', 'user-circle', 'bell', 'mail', 'calendar', 'settings', 'lock', 'chat'])))
    ]),
    Q('stil-liten', 'Vilken stil fungerar bäst för små ikoner i 16 px?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill' }]].map(([l, o]) =>
      O(l + ' i 16 px', W(`<div class="stack" style="gap:8px">${[['clock', '20 min'], ['pin', 'Centrum'], ['star', '4,8 av 5'], ['user', '2 personer']].map(([n, t]) => `<div class="syx-l small" style="gap:6px">${I(n, { ...o, s: 16, w: 2 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('stil-stor', 'Vilken stil ska stora ikoner i 48 px ha?', [['Linje', { st: 'line', w: 2, ns: 1 }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.18, w: 2, ns: 1 }], ['Fylld', { st: 'fill' }], ['Platt', { st: 'flat', c: 'var(--brand)', w: 2, ns: 1 }]].map(([l, o]) =>
      O(l + ' i 48 px', W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { ...o, s: 48 })).join('')}</div>`)))),
    Q('stil-mork', 'Vilken stil fungerar bäst på mörk bakgrund?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill', k: '#1A1C1E' }], ['Duotone', { st: 'duo', c2: '#fff', op: 0.22 }]].map(([l, o]) =>
      O(l + ' på mörk yta', W(grid(o), 'background:#1A1C1E;color:#fff')))),
    Q('stil-enhet', 'Ska samma ikonstil gälla för små och stora ikoner?', [
      ['Samma linjestil överallt', { st: 'line', w: 2, ns: 1 }], ['Duotone på de stora', { st: 'duo', c2: 'var(--brand)', op: 0.18, w: 2, ns: 1 }], ['Fyllt på de stora', { st: 'fill' }]
    ].map(([l, o]) => O(l, W(`<div class="row" style="gap:16px;justify-content:center">${['search', 'heart', 'user', 'cart'].map(n => I(n, { s: 20 })).join('')}</div><div class="divider" style="width:100%;max-width:240px"></div><div class="syx-r" style="gap:22px">${['clock', 'shield', 'refresh'].map(n => I(n, { ...o, s: 44 })).join('')}</div>`))))
  ]});

  // =====================================================================
  // 4. Stil efter läge
  // =====================================================================
  const sideMenu = (f) => `<div class="syx-w stack" style="gap:2px;background:var(--box);border-radius:12px;padding:8px;max-width:240px">${[['home', 'Översikt'], ['calendar', 'Bokningar'], ['mail', 'Meddelanden'], ['settings', 'Inställningar']].map(([n, t], i) => `<div class="syx-l" style="gap:10px;padding:8px 10px;border-radius:8px;font-size:14px;${i === 1 ? 'background:var(--tint);font-weight:600' : 'color:var(--smuted)'}">${f(n, i === 1)}<span>${t}</span></div>`).join('')}</div>`;
  const pair = (a, b, la = 'Av', lb = 'På') => `<div class="syx-r" style="gap:28px">${[[a, la], [b, lb]].map(([x, t]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${x}<span class="small muted">${t}</span></div>`).join('')}</div>`;
  const ibtn = (icon, st = '') => `<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:10px;${st}">${icon}</span>`;
  G.push({ key: 'stil-efter-lage', title: 'Stil efter läge', questions: [
    Q('lage-tabbar', 'Hur ska den aktiva fliken i tabbaren skilja sig från de andra?', [
      ['Aktiv fylld, övriga linje', (n, a) => I(n, { st: a ? 'fill' : 'line', style: a ? 'color:var(--sink)' : '' })],
      ['Alla linje, aktiv i färg', (n, a) => I(n, { style: a ? 'color:var(--brand)' : '' })],
      ['Alla linje, aktiv med tjockare linje', (n, a) => I(n, { w: a ? 2.5 : 1.75 })],
      ['Aktiv fylld och i färg', (n, a) => I(n, { st: a ? 'fill' : 'line', style: a ? 'color:var(--brand)' : '' })]
    ].map(([l, f]) => O(l, W(tabbar(f))))),
    Q('lage-sidomeny', 'Ska ikonen i en vald menyrad bytas till fylld?', [
      ['Vald rad får fylld ikon', (n, a) => I(n, { s: 20, st: a ? 'fill' : 'line', k: 'var(--tint)' })],
      ['Samma linjeikon i alla rader', (n) => I(n, { s: 20 })],
      ['Linjeikon, vald i varumärkesfärg', (n, a) => I(n, { s: 20, style: a ? 'color:var(--brand)' : '' })]
    ].map(([l, f]) => O(l, W(sideMenu(f))))),
    Q('lage-favorit', 'Hur ska en markerad favorit se ut?', [
      ['Fyllt hjärta i röd', I('heart', { s: 28, st: 'fill', c: '#C7362F' })],
      ['Fyllt hjärta i varumärkesfärg', I('heart', { s: 28, st: 'fill', c: 'var(--brand)' })],
      ['Fyllt hjärta i textfärg', I('heart', { s: 28, st: 'fill', c: 'var(--sink)' })],
      ['Linjehjärta i färg', I('heart', { s: 28, w: 2.25, c: '#C7362F' })]
    ].map(([l, on]) => O(l, W(pair(I('heart', { s: 28 }), on, 'Inte sparad', 'Sparad'))))),
    Q('lage-inaktiv', 'Hur ska en ikonknapp se ut när den inte går att använda?', [
      ['Halvgenomskinlig (40 %)', 'opacity:.4'], ['Ljusgrå ikon', 'color:#B4B8BD'], ['Grå ikon på grå platta', 'color:#9AA0A6;background:#ECEDEE']
    ].map(([l, st]) => O(l, W(`<div class="syx-r" style="gap:10px">${ibtn(I('edit', { s: 22 }), 'background:var(--box);border:1px solid var(--sline)')}${ibtn(I('copy', { s: 22 }), 'background:var(--box);border:1px solid var(--sline)')}${ibtn(I('trash', { s: 22 }), 'background:var(--box);border:1px solid var(--sline);' + st)}</div><span class="small muted">Den sista är avstängd</span>`)))),
    Q('lage-hover', 'Vad ska hända när muspekaren är över en ikonknapp?', [
      ['Rund ljus platta bakom', 'border-radius:50%;background:var(--tint)', ''],
      ['Rundad fyrkantig platta', 'border-radius:10px;background:var(--tint)', ''],
      ['Bara färgbyte på ikonen', '', 'color:var(--brand)'],
      ['Ikonen blir fylld', '', 'fill']
    ].map(([l, bg, ic]) => O(l, W(pair(ibtn(I('heart', { s: 22 })), ibtn(I('heart', { s: 22, st: ic === 'fill' ? 'fill' : 'line', style: ic === 'fill' ? '' : ic }), bg), 'Normal', 'Hovring'))))),
    Q('lage-vald-vaxel', 'Hur ska den valda ikonen i en vyväxlare (rutnät eller lista) markeras?', [
      ['Mörk platta, vit ikon', 'background:var(--brand);color:#fff', ''],
      ['Ljus tonad platta', 'background:var(--tint);color:var(--brand)', ''],
      ['Vit platta med skugga', 'background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.15);color:var(--sink)', 'background:#ECEDEE'],
      ['Bara ikonens färg', 'color:var(--brand)', '']
    ].map(([l, on, wrap]) => O(l, W(`<div style="display:inline-flex;gap:4px;padding:4px;border-radius:12px;border:1px solid var(--sline);background:var(--box);${wrap}">${ibtn(I('grid', { s: 20 }), 'width:40px;height:36px;border-radius:8px;' + on)}${ibtn(I('list', { s: 20 }), 'width:40px;height:36px;border-radius:8px;color:var(--smuted)')}</div>`)))),
    Q('lage-aktiv-markor', 'Vilken markering ska den aktiva fliken i tabbaren ha utöver ikonen?', [
      ['Ingen extra markering', ''], ['Liten punkt under', 'dot'], ['Linje ovanför', 'bar'], ['Kapsel bakom ikonen', 'pill']
    ].map(([l, m]) => O(l, W(tabbar((n, a) => {
      const ic = I(n, { st: a ? 'fill' : 'line', k: a && m === 'pill' ? 'var(--tint)' : '#fff' });
      if (m === 'pill') return `<span style="display:grid;place-items:center;width:52px;height:28px;border-radius:999px;background:${a ? 'var(--tint)' : 'transparent'}">${ic}</span>`;
      if (!a || !m) return ic;
      if (m === 'bar') return `<span style="position:relative;display:block"><span style="position:absolute;left:-6px;right:-6px;top:-9px;height:3px;border-radius:0 0 3px 3px;background:var(--sink)"></span>${ic}</span>`;
      return `<span style="position:relative;display:block">${ic}<span style="position:absolute;left:50%;bottom:-23px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--sink)"></span></span>`;
    })))))
  ]});

  // =====================================================================
  // 5. Storlek
  // =====================================================================
  const lines = (s, rows, ts = '', o = {}) => `<div class="stack" style="gap:10px">${rows.map(([n, t]) => `<div class="syx-l" style="${ts}">${I(n, { s, w: 1.75, ns: 1, ...o })}<span>${t}</span></div>`).join('')}</div>`;
  const ROWS3 = [['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12'], ['phone', '08-123 456 78']];
  G.push({ key: 'storlek', title: 'Storlek', questions: [
    Q('storlek-brodtext', 'Hur stor ska en ikon vara bredvid brödtext i 15 px?',
      [16, 20, 24].map(s => O(s + ' px bredvid brödtext', W(lines(s, ROWS3), 'align-items:flex-start')))),
    Q('storlek-smatext', 'Hur stor ska en ikon vara bredvid liten text i 13 px?',
      [14, 16, 20].map(s => O(s + ' px bredvid liten text', W(lines(s, [['clock', '20 min'], ['pin', 'Centrum'], ['user', '2 personer']], 'gap:6px;font-size:13px;color:var(--smuted)'), 'align-items:flex-start')))),
    Q('storlek-rubrik', 'Hur stor ska en ikon vara bredvid en mellanrubrik?',
      [20, 24, 32].map(s => O(s + ' px bredvid rubrik', W(`<div class="stack" style="gap:12px">${[['shield', 'Trygg betalning'], ['refresh', 'Fri retur']].map(([n, t]) => `<div class="syx-l" style="gap:10px">${I(n, { s, w: 2, ns: 1 })}<span class="h h3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('storlek-stor-rubrik', 'Hur stor ska en ikon vara ovanför en stor rubrik?',
      [24, 32, 40, 48].map(s => O(s + ' px ovanför rubrik', W(`<div class="stack" style="gap:12px">${I('chat', { s, w: 2, ns: 1 })}<span class="h h2">Rubrik som är två rader lång</span></div>`, 'align-items:flex-start')))),
    Q('storlek-knapp', 'Hur stor ska ikonen vara i en knapp?',
      [16, 20, 24].map(s => O(s + ' px i knappen', W(`<div class="syx-r">${btn(I('download', { s, w: 2, ns: 1 }) + 'Ladda ner')}${btn2(I('calendar', { s, w: 2, ns: 1 }) + 'Boka tid')}</div>`)))),
    Q('storlek-header', 'Hur stora ska ikonerna uppe till höger i sidhuvudet vara?',
      [20, 24, 28].map(s => O(s + ' px i sidhuvudet', W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--box);border-radius:12px;padding:12px 16px"><b style="font-size:17px">Logo</b><div class="row" style="gap:16px;flex-wrap:nowrap">${['search', 'user', 'cart'].map(n => I(n, { s, w: 2, ns: 1 })).join('')}</div></div>`)))),
    Q('storlek-tabbar', 'Hur stora ska ikonerna i tabbaren vara?',
      [20, 24, 28].map(s => O(s + ' px i tabbaren', W(tabbar(n => I(n, { s, w: 1.75, ns: 1 })))))),
    Q('storlek-lista', 'Hur stor ska bocken i en punktlista vara?',
      [16, 20, 24].map(s => O(s + ' px bock i listan', W(`<div class="stack" style="gap:8px">${['Fri frakt över 500 kr', 'Öppet köp i 30 dagar', 'Svar inom en dag'].map(t => `<div class="syx-l" style="gap:10px">${I('check', { s, w: 2, ns: 1, style: 'color:var(--brand)' })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('storlek-falt', 'Hur stor ska ikonen i ett fält vara?',
      [16, 20, 24].map(s => O(s + ' px i fältet', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s, w: 1.75, ns: 1 })}Sök</div><div class="inp ph" style="gap:10px">${I('calendar', { s, w: 1.75, ns: 1 })}Välj datum</div></div>`)))),
    Q('storlek-klickyta', 'Hur stor ska klickytan runt en ensam ikonknapp vara?',
      [32, 40, 48].map(s => O('Klickyta ' + s + ' px', W(`<div class="row" style="gap:8px;justify-content:center">${['heart', 'share-box', 'x'].map(n => `<span style="display:grid;place-items:center;width:${s}px;height:${s}px;border-radius:50%;background:var(--tint)">${I(n, { s: 20 })}</span>`).join('')}</div><span class="small muted">Ytan visas tonad här</span>`)))),
    Q('storlek-kort', 'Hur stor ska ikonen vara överst i ett litet informationskort?',
      [24, 32, 40, 48].map(s => O(s + ' px i kortet', W(`<div class="panel syx-w stack" style="gap:8px;max-width:220px">${I('shield', { s, w: 2, ns: 1 })}<b>Trygg betalning</b><span class="small muted">Betala först när du fått varan.</span></div>`))))
  ]});

  // =====================================================================
  // 6. Färg
  // =====================================================================
  const GRAY = '#8A9099';
  G.push({ key: 'farg', title: 'Färg', questions: [
    Q('farg-brodtext', 'Vilken färg ska en ikon bredvid brödtext ha?', [
      ['Samma som texten', { c: 'var(--sink)' }], ['Varumärkesfärg', { c: 'var(--brand)' }], ['Grå', { c: 'var(--smuted)' }], ['Tvåton (text + accent)', { st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }]
    ].map(([l, o]) => O(l, W(lines(20, [['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12'], ['calendar', 'Måndag till fredag']], '', o), 'align-items:flex-start')))),
    Q('farg-meta', 'Vilken färg ska ikon och text ha i en metarad under en rubrik?', [
      ['Grå ikon, grå text', 'var(--smuted)', 'var(--smuted)'], ['Grå ikon, mörk text', 'var(--smuted)', 'var(--sink)'], ['Varumärkesikon, mörk text', 'var(--brand)', 'var(--sink)'], ['Mörk ikon, mörk text', 'var(--sink)', 'var(--sink)']
    ].map(([l, ic, tc]) => O(l, W(`<div class="stack" style="gap:8px"><span class="h h3">Rubrik på ett kort</span><div class="row small" style="gap:14px;color:${tc}">${[['clock', '45 min'], ['pin', 'Centrum'], ['star', '4,8']].map(([n, t]) => `<span class="syx-l" style="gap:5px">${I(n, { s: 16, w: 2, ns: 1, style: 'color:' + ic })}${t}</span>`).join('')}</div></div>`, 'align-items:flex-start')))),
    Q('farg-lista', 'Vilken färg ska bockarna i en punktlista ha?', [
      ['Varumärkesfärg', 'var(--brand)'], ['Grön', 'var(--ok)'], ['Samma som texten', 'var(--sink)'], ['Grå', GRAY]
    ].map(([l, c]) => O(l, W(`<div class="stack" style="gap:8px">${['Fri frakt över 500 kr', 'Öppet köp i 30 dagar', 'Svar inom en dag'].map(t => `<div class="syx-l" style="gap:10px">${I('check', { s: 20, w: 2.25, c })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('farg-header', 'Vilken färg ska ikonerna i sidhuvudet ha?', [
      ['Samma som texten', 'var(--sink)'], ['Varumärkesfärg', 'var(--brand)'], ['Grå', 'var(--smuted)']
    ].map(([l, c]) => O(l, W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--box);border-radius:12px;padding:12px 16px"><b style="font-size:17px">Logo</b><div class="row" style="gap:16px;flex-wrap:nowrap">${['search', 'user', 'cart'].map(n => I(n, { s: 22, c })).join('')}</div></div>`)))),
    Q('farg-falt', 'Vilken färg ska ikonen i ett fält ha?', [
      ['Grå som platshållaren', 'var(--smuted)'], ['Samma som texten', 'var(--sink)'], ['Varumärkesfärg', 'var(--brand)']
    ].map(([l, c]) => O(l, W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s: 20, c })}Sök</div><div class="inp ph" style="gap:10px">${I('mail', { s: 20, c })}E-post</div></div>`)))),
    Q('farg-knapp2', 'Vilken färg ska ikonen i en sekundärknapp ha?', [
      ['Samma som knapptexten', ''], ['Mörk textfärg', 'var(--sink)'], ['Grå', GRAY]
    ].map(([l, c]) => O(l, W(`<div class="syx-r">${btn2(I('share-box', { s: 20, style: c ? 'color:' + c : '' }) + 'Dela')}${btn2(I('heart', { s: 20, style: c ? 'color:' + c : '' }) + 'Spara')}</div>`)))),
    Q('farg-status', 'Vilken färg ska statusikoner (info, varning, fel, klart) ha?', [
      ['Egen färg per status', ['var(--brand)', 'var(--warn)', 'var(--bad)', 'var(--ok)']],
      ['Alla i textfärg', ['var(--sink)', 'var(--sink)', 'var(--sink)', 'var(--sink)']],
      ['Bara fel och varning i färg', ['var(--sink)', 'var(--warn)', 'var(--bad)', 'var(--sink)']]
    ].map(([l, cs]) => O(l, W(`<div class="stack" style="gap:9px">${[['info', 'Leverans tar 2–3 dagar'], ['alert', 'Få platser kvar'], ['x-circle', 'Kortet nekades'], ['check-circle', 'Bokningen är klar']].map(([n, t], i) => `<div class="syx-l" style="gap:10px">${I(n, { s: 20, c: cs[i] })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('farg-funktion', 'Vilken färg ska stora ikoner i ett funktionsrutnät ha?', [
      ['Varumärkesfärg', { c: 'var(--brand)' }], ['Samma som texten', { c: 'var(--sink)' }], ['Tvåton', { st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }]
    ].map(([l, o]) => O(l, W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 40, w: 2, ns: 1, ...o })).join('')}</div>`)))),
    Q('farg-mork', 'Vilken färg ska ikoner på mörk bakgrund ha?', [
      ['Vit', '#FFFFFF'], ['Ljusgrå', '#B8BCC2'], ['Ljus varumärkeston', '#A9C1DA']
    ].map(([l, c]) => O(l, W(grid({ c }), 'background:#1A1C1E')))),
    Q('farg-gra', 'Hur mörk ska den grå färgen för sekundära ikoner vara?', [
      ['Mörkgrå', '#5D6166'], ['Mellangrå', '#8A9099'], ['Ljusgrå', '#B0B5BA']
    ].map(([l, c]) => O(l, W(`<div class="stack" style="gap:8px;width:100%;max-width:240px">${[['Dokument.pdf', 'download'], ['Bild.jpg', 'download']].map(([t, n]) => `<div class="syx-l" style="justify-content:space-between;background:var(--box);border-radius:8px;padding:10px 12px"><span>${t}</span><span class="row" style="gap:12px;flex-wrap:nowrap">${I('edit', { s: 18, c })}${I(n, { s: 18, c })}${I('trash', { s: 18, c })}</span></div>`).join('')}</div>`))))
  ]});

  // =====================================================================
  // 7. Platta bakom ikonen
  // =====================================================================
  const SHAPE = { circle: '50%', rsq: '28%', sq: '3px', blob: '62% 38% 56% 44% / 44% 60% 40% 56%', none: '0' };
  function plate(n, o = {}) {
    const ps = o.ps || 48, is = o.is || Math.round(ps * 0.5), f = o.f || 'tint', sh = o.sh || 'circle';
    const br = o.br != null ? o.br : SHAPE[sh];
    let bg = 'transparent', col = 'var(--brand)', bd = '';
    if (f === 'solid') { bg = 'var(--brand)'; col = '#fff'; }
    else if (f === 'tint') bg = o.tint || 'var(--tint)';
    else if (f === 'line') { bd = `border:${o.bw || 1.5}px solid ${o.bc || 'var(--sline)'};`; bg = 'var(--box)'; }
    else if (f === 'tintline') { bg = o.tint || 'var(--tint)'; bd = `border:1.5px solid ${o.bc || 'rgba(36,64,94,.35)'};`; }
    if (sh === 'none') { bg = 'transparent'; bd = ''; }
    return `<span style="display:grid;place-items:center;flex:0 0 auto;width:${ps}px;height:${ps}px;border-radius:${br};background:${bg};color:${o.col || col};${bd}${o.ex || ''}">${I(n, { s: is, ...(o.io || {}) })}</span>`;
  }
  const plates = (o, names = ['clock', 'shield', 'chat', 'refresh'], gap = 12) => `<div class="syx-r" style="gap:${gap}px">${names.map(n => plate(n, o)).join('')}</div>`;
  const feat = (ic, t, d) => `<div class="syx-l" style="gap:14px;align-items:flex-start"><span style="flex:0 0 auto">${ic}</span><div class="stack" style="gap:2px;min-width:0"><b>${t}</b><span class="small muted">${d}</span></div></div>`;
  G.push({ key: 'platta', title: 'Platta bakom ikonen', questions: [
    Q('platta-form', 'Vilken form ska plattan bakom ikonen ha?', [
      ['Ingen platta', 'none'], ['Cirkel', 'circle'], ['Rundad fyrkant', 'rsq'], ['Fyrkant', 'sq'], ['Mjuk organisk form (blob)', 'blob']
    ].map(([l, sh]) => O(l, W(plates({ sh, ps: 46, is: 24 }))))),
    Q('platta-fyllning', 'Hur ska plattan vara fylld?', [
      ['Fylld i varumärkesfärg', 'solid'], ['Ljust tonad', 'tint'], ['Bara kant', 'line'], ['Tonad med kant', 'tintline']
    ].map(([l, f]) => O(l, W(plates({ f, ps: 46, is: 24, io: f === 'solid' ? {} : {} }))))),
    Q('platta-storlek', 'Hur stor ska plattan vara bredvid en rad med rubrik och text?', [40, 48, 56, 64].map(ps =>
      O(ps + ' px platta', W(`<div class="stack syx-w" style="gap:14px">${feat(plate('clock', { ps, is: 24 }), 'Snabb leverans', 'Skickas inom en dag.')}${feat(plate('shield', { ps, is: 24 }), 'Trygg betalning', 'Betala när varan kommit.')}</div>`, 'align-items:flex-start')))),
    Q('platta-andel', 'Hur stor ska ikonen vara inne i plattan?', [
      ['Ikon 40 % av plattan', 0.4], ['Ikon 50 % av plattan', 0.5], ['Ikon 60 % av plattan', 0.6]
    ].map(([l, k]) => O(l, W(plates({ ps: 56, is: Math.round(56 * k), io: { w: 2, ns: 1 } }, ['clock', 'shield', 'chat']))))),
    Q('platta-rundning', 'Hur rundad ska en fyrkantig platta vara?', [
      ['6 px rundning', '6px'], ['10 px rundning', '10px'], ['14 px rundning', '14px'], ['18 px rundning', '18px']
    ].map(([l, br]) => O(l, W(plates({ br, ps: 52, is: 26 }, ['clock', 'shield', 'chat']))))),
    Q('platta-ton', 'Hur stark ska tonen i en ljus platta vara?', [0.06, 0.12, 0.2].map(a =>
      O('Ton ' + Math.round(a * 100) + ' %', W(plates({ tint: `rgba(36,64,94,${a})`, ps: 48, is: 24 }))))),
    Q('platta-kant', 'Hur ska kanten på en platta med bara kant se ut?', [
      ['Tunn grå kant', 1, 'var(--sline)'], ['Tunn kant i varumärkesfärg', 1, 'var(--brand)'], ['Tjock grå kant', 2, 'rgba(26,28,30,.22)']
    ].map(([l, bw, bc]) => O(l, W(plates({ f: 'line', bw, bc, ps: 48, is: 24 }))))),
    Q('platta-fylld-ikon', 'Hur ska ikonen se ut på en fylld platta?', [
      ['Vit linjeikon', { c: '#fff' }], ['Vit fylld ikon', { c: '#fff', st: 'fill', k: 'var(--brand)' }], ['Ljust tonad linjeikon', { c: '#C9D6E4' }]
    ].map(([l, io]) => O(l, W(plates({ f: 'solid', ps: 48, is: 24, io })))) ),
    Q('platta-ikonstil', 'Vilken stil ska ikonen ha på en tonad platta?', [
      ['Linje', {}], ['Fylld', { st: 'fill', k: 'var(--tint)' }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.22 }]
    ].map(([l, io]) => O(l, W(plates({ ps: 48, is: 24, io }))))),
    Q('platta-skugga', 'Ska en ljus platta ha skugga eller kant?', [
      ['Vit platta med skugga', 'background:#fff;box-shadow:0 2px 8px rgba(26,28,30,.12)'], ['Vit platta med kant', 'background:#fff;border:1px solid var(--sline)'], ['Tonad platta utan skugga', '']
    ].map(([l, ex]) => O(l, W(plates({ ps: 48, is: 24, ex, sh: 'rsq' }))))),
    Q('platta-kontakt', 'Hur ska ikonerna i en kontaktlista se ut?', [
      ['Bara ikonen', 'none'], ['Ikon i tonad cirkel', 'circle'], ['Ikon i tonad rundad fyrkant', 'rsq']
    ].map(([l, sh]) => O(l, W(`<div class="stack" style="gap:10px">${[['phone', '08-123 456 78'], ['mail', 'hej@exempel.se'], ['pin', 'Storgatan 12']].map(([n, t]) => `<div class="syx-l" style="gap:${sh === 'none' ? 10 : 12}px">${plate(n, { sh, ps: sh === 'none' ? 20 : 36, is: 18 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('platta-status', 'Hur ska ikonen i ett klart-meddelande se ut?', [
      ['Fylld grön cirkel, vit bock', plate('check', { ps: 40, is: 22, ex: 'background:var(--ok);color:#fff', io: { w: 2.5 } })],
      ['Ljusgrön cirkel, grön bock', plate('check', { ps: 40, is: 22, ex: 'background:#DDEFE3;color:var(--ok)', io: { w: 2.5 } })],
      ['Bock i cirkel utan platta', I('check-circle', { s: 26, c: 'var(--ok)' })]
    ].map(([l, ic]) => O(l, W(`<div class="panel syx-w" style="display:flex;gap:12px;align-items:center">${ic}<div class="stack" style="gap:0"><b>Bokningen är klar</b><span class="small muted">Vi har skickat en bekräftelse.</span></div></div>`))))
  ]});

  /* @@FLER@@ */

  window.QZ.part({ key: 'symboler', groups: G });
})();
