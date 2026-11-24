/* Gränd: plagg, butiker och lager (påhittat). Läses före core.js. */
(function () {
  /* Linjeteckningar i ikonstilen för plagg utan foto. viewBox 0 0 48 48 */
  var ART = {
    byxa: '<path d="M14 6h20l3 36h-9l-4-24-4 24h-9z"/><path d="M14 11h20M24 11v7"/>',
    mossa: '<path d="M10 32a14 14 0 0 1 28 0"/><rect x="8" y="31" width="32" height="8" rx="3"/><circle cx="24" cy="14" r="3"/><path d="M18 31v8M24 31v8M30 31v8"/>',
    halsduk: '<path d="M14 8h20v8c0 4-4 6-10 6s-10-2-10-6z"/><path d="M16 20v20h8V22M28 21v15h7V18"/><path d="M16 44v-4M20 44v-4M24 44v-4M28 40v-4M31.5 40v-4M35 40v-4"/>',
    skjorta: '<path d="M18 6 9 10l-4 12 6 2 2-5v23h22V19l2 5 6-2-4-12-9-4"/><path d="M18 6l6 6 6-6M24 12v28M21 18h1M21 26h1M21 34h1"/>'
  };
  function art(name, bg, ink, label) {
    return '<div class="ev-art" style="--art:' + bg + ';--art-ink:' + (ink || '#1A1C1E') + '" role="img" aria-label="' + label + '"><svg viewBox="0 0 48 48" aria-hidden="true">' + ART[name] + '</svg></div>';
  }
  function crop(at, scale, alt) {
    return '<img src="img/kladstall.jpg" alt="' + alt + '" loading="lazy" width="1400" height="1050" style="object-position:' + at + ';transform:scale(' + scale + ');transform-origin:' + at + '">';
  }
  var STORES = [
    { id: 'uppsala', name: 'Gränd Uppsala', short: 'Uppsala', addr: 'Svartbäcksgatan 12, 753 20 Uppsala', hours: [[10, 19], [10, 19], [10, 19], [10, 19], [10, 19], [10, 17], [11, 16]], text: 'Mån–fre 10–19, lör 10–17, sön 11–16' },
    { id: 'vasteras', name: 'Gränd Västerås', short: 'Västerås', addr: 'Stora Gatan 30, 722 12 Västerås', hours: [[10, 18], [10, 18], [10, 18], [10, 19], [10, 18], [10, 16], null], text: 'Mån–fre 10–18, tor 10–19, lör 10–16, sön stängt' },
    { id: 'orebro', name: 'Gränd Örebro', short: 'Örebro', addr: 'Drottninggatan 18, 702 10 Örebro', hours: [[10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [10, 17], [12, 16]], text: 'Mån–fre 10–18, lör 10–17, sön 12–16' }
  ];
  var SIZES = ['XS', 'S', 'M', 'L', 'XL'];
  var P = [
    { id: 'ida', name: 'Flätstickad kofta Ida', color: 'Natur', sub: 'Ull från Gotland, natur', price: 1295, rating: '4,8', reviews: 214, ribbon: 'Nyhet',
      media: crop('64% 55%', 2.4, 'Naturvit flätstickad kofta på galge'), stock: { uppsala: [2, 3, 0, 1, 2], vasteras: [0, 1, 2, 0, 1], orebro: [1, 0, 1, 0, 0] } },
    { id: 'sigrid', name: 'Mohairtröja Sigrid', color: 'Rost', sub: 'Mohair och ull, rost', price: 995, rating: '4,7', reviews: 132, ribbon: 'Populär',
      media: crop('75% 50%', 2.8, 'Rostbrun mohairtröja på galge'), stock: { uppsala: [1, 2, 2, 1, 0], vasteras: [1, 1, 0, 2, 1], orebro: [0, 2, 1, 1, 0] } },
    { id: 'vide', name: 'Teddyjacka Vide', color: 'Benvit', sub: 'Återvunnen pile, benvit', price: 1695, rating: '4,6', reviews: 88,
      media: crop('96% 55%', 2.6, 'Benvit teddyjacka på galge'), stock: { uppsala: [0, 1, 1, 1, 1], vasteras: [1, 0, 1, 0, 0], orebro: [0, 1, 0, 1, 1] } },
    { id: 'elin', name: 'Ribbstickad tröja Elin', color: 'Havre', sub: 'Merinoull, havre', price: 895, was: 1195, rating: '4,5', reviews: 61,
      media: crop('50% 50%', 2.6, 'Havrefärgad ribbstickad tröja på galge'), stock: { uppsala: [1, 1, 2, 0, 0], vasteras: [0, 2, 1, 1, 0], orebro: [1, 1, 0, 0, 1] } },
    { id: 'hedda', name: 'Vida byxor Hedda', color: 'Mörkbrun', sub: 'Ull och lyocell, mörkbrun', price: 1095, rating: '4,6', reviews: 47,
      media: art('byxa', '#E6D9CB', '', 'Vida byxor Hedda, teckning'), stock: { uppsala: [1, 2, 1, 1, 0], vasteras: [1, 1, 1, 0, 0], orebro: [0, 1, 1, 1, 0] } },
    { id: 'maj', name: 'Linneskjorta Maj', color: 'Kalk', sub: 'Tvättat linne, kalkvit', price: 795, rating: '4,4', reviews: 39,
      media: art('skjorta', '#ECE8E1', '', 'Linneskjorta Maj, teckning'), stock: { uppsala: [2, 2, 1, 1, 1], vasteras: [1, 0, 2, 1, 0], orebro: [1, 1, 1, 0, 0] } },
    { id: 'lo', name: 'Mössa Lo', color: 'Plommon', sub: 'Lammull, plommon', price: 349, rating: '4,9', reviews: 156,
      media: art('mossa', '#5A2A4C', '#FFFFFF', 'Mössa Lo, teckning'), sizes: ['One size'], stock: { uppsala: [4], vasteras: [2], orebro: [0] } },
    { id: 'ylva', name: 'Halsduk Ylva', color: 'Kamel', sub: 'Babyalpacka, kamel', price: 495, rating: '4,7', reviews: 73,
      media: art('halsduk', '#E3CDB4', '', 'Halsduk Ylva, teckning'), sizes: ['One size'], stock: { uppsala: [3], vasteras: [0], orebro: [2] } }
  ];
  P.forEach(function (p) {
    p.sizes = p.sizes || SIZES;
    p.url = 'produkt.html' + (p.id === 'ida' ? '' : '?id=' + p.id);
    p.thumb = '<span class="ev-thumb" aria-hidden="true">' + p.media.replace(/ loading="lazy"/, '') + '</span>';
    p.tags = 'stickat ' + p.color;
  });
  window.EV_STORES = STORES;
  window.EV_SITE = {
    key: 'grand',
    products: P,
    popular: ['kofta', 'stickad tröja', 'byxor', 'mössa', 'linneskjorta'],
    words: ['koftor', 'kofta ida', 'mohair', 'merino', 'mössor', 'halsduk', 'teddyjacka', 'tröja']
  };
})();
