/* Ekbacka hem: produktdata (påhittad). Läses före core.js. */
(function () {
  /* Linjeteckningar i ikonstilen (rundade ändar, slutna former) för produkter utan foto. viewBox 0 0 48 48 */
  var ART = {
    lampa: '<path d="M16 6h16l5 13H11z"/><path d="M24 19v21M16 41h16"/>',
    hylla: '<rect x="11" y="4" width="26" height="40" rx="3"/><path d="M11 14h26M11 24h26M11 34h26M16 9v5M19 9v5M28 28v6M31 18v6"/>',
    skank: '<rect x="4" y="14" width="40" height="18" rx="3"/><path d="M17.3 14v18M30.7 14v18M8 32v6M40 32v6M14 23h1M33 23h1"/>',
    pall: '<ellipse cx="24" cy="16" rx="14" ry="5"/><path d="M10 16v6c0 2.8 6.3 5 14 5s14-2.2 14-5v-6M15 26l-2 12M33 26l2 12"/>',
    pendel: '<path d="M24 4v10"/><circle cx="24" cy="26" r="12"/><path d="M20 15h8"/>',
    matta: '<rect x="8" y="10" width="32" height="28" rx="3"/><rect x="14" y="16" width="20" height="16" rx="3"/><path d="M8 6v4M14 6v4M20 6v4M26 6v4M32 6v4M38 6v4M8 38v4M14 38v4M20 38v4M26 38v4M32 38v4M38 38v4"/>',
    kudde: '<path d="M10 10c5 2 23 2 28 0-2 5-2 23 0 28-5-2-23-2-28 0 2-5 2-23 0-28z"/><path d="M18 24h12"/>',
    spegel: '<circle cx="24" cy="20" r="14"/><path d="M17 15a9 9 0 0 1 5-4M18 34l-4 10M30 34l4 10"/>',
    bank: '<rect x="4" y="18" width="40" height="7" rx="3"/><path d="M8 25v15M40 25v15M8 34h32"/>',
    sidobord: '<ellipse cx="24" cy="12" rx="13" ry="4"/><path d="M24 16v24M16 42h16"/><path d="M14 27h20"/>',
    fatolj: '<path d="M13 30V12a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v18"/><rect x="7" y="22" width="34" height="12" rx="3"/><path d="M13 30h22M10 34v8M38 34v8"/>',
    soffa: '<path d="M8 26v-9a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v9"/><rect x="3" y="22" width="42" height="12" rx="3"/><path d="M9 28h30M24 22v6M7 34v6M41 34v6"/>'
  };
  function art(name, bg, ink, label) {
    return '<div class="ev-art" style="--art:' + bg + ';--art-ink:' + (ink || '#1A1C1E') + '" role="img" aria-label="' + label + '"><svg viewBox="0 0 48 48" aria-hidden="true">' + ART[name] + '</svg></div>';
  }
  function photo(pos, scale, alt) {
    return '<img src="img/' + pos.src + '" alt="' + alt + '" loading="lazy" width="1400" height="' + (pos.src === 'produkt-stol.jpg' ? 1750 : 933) + '" style="object-position:' + pos.at + (scale ? ';transform:scale(' + scale + ');transform-origin:' + pos.at : '') + '">';
  }
  var P = [
    { id: 'ask', name: 'Fåtölj Ask', sub: 'Bouclé och oljad ek', price: 6495, cat: 'fatoljer', color: 'Ljus', mat: 'Tyg', rating: '4,8', reviews: 126, ribbon: 'Nyhet',
      media: photo({ src: 'produkt-stol.jpg', at: '40% 75%' }, 1.25, 'Fåtölj Ask i ljus bouclé med armstöd i ek') },
    { id: 'lunden', name: 'Soffa Lunden 3-sits', sub: 'Linneklädsel som går att tvätta', price: 14900, cat: 'soffor', color: 'Ljus', mat: 'Tyg', rating: '4,7', reviews: 88, ribbon: 'Populär',
      media: photo({ src: 'vardagsrum.jpg', at: '92% 78%' }, 1.5, 'Vit linnesoffa med mjuka kuddar') },
    { id: 'masur', name: 'Soffbord Masur', sub: 'Ø 80 cm, björkmasur', price: 5290, cat: 'bord', color: 'Brun', mat: 'Trä', rating: '4,6', reviews: 41,
      media: photo({ src: 'vardagsrum.jpg', at: '48% 92%' }, 1.9, 'Runt soffbord i ljus masurbjörk') },
    { id: 'granit', name: 'Soffa Granit 2-sits', sub: 'Ullblandning, grå', price: 9195, was: 11495, cat: 'soffor', color: 'Grå', mat: 'Tyg', rating: '4,5', reviews: 63,
      media: photo({ src: 'vardagsrum.jpg', at: '0% 76%' }, 1.6, 'Grå soffa med ljusa kuddar') },
    { id: 'stav', name: 'Golvlampa Stav', sub: 'Mässing och linneskärm', price: 2195, cat: 'belysning', color: 'Ljus', mat: 'Metall', rating: '4,7', reviews: 52,
      media: art('lampa', '#EAE2D7', '', 'Golvlampa Stav, teckning') },
    { id: 'bred', name: 'Bokhylla Bred', sub: 'Ek, fem hyllplan', price: 4990, cat: 'forvaring', color: 'Brun', mat: 'Trä', rating: '4,6', reviews: 37,
      media: art('hylla', '#E8D5CC', '', 'Bokhylla Bred, teckning') },
    { id: 'skank', name: 'Skänk Sommen', sub: 'Valnöt, 160 cm', price: 8900, cat: 'forvaring', color: 'Brun', mat: 'Trä', rating: '4,9', reviews: 29, ribbon: 'Nyhet',
      media: art('skank', '#3B3530', '#FFFFFF', 'Skänk Sommen, teckning') },
    { id: 'knopp', name: 'Pall Knopp', sub: 'Bouclé, Ø 45 cm', price: 1495, cat: 'fatoljer', color: 'Ljus', mat: 'Tyg', rating: '4,4', reviews: 74,
      media: art('pall', '#DDE3E8', '', 'Pall Knopp, teckning') },
    { id: 'klot', name: 'Taklampa Klot', sub: 'Opalglas, Ø 40 cm', price: 1795, cat: 'belysning', color: 'Ljus', mat: 'Glas', rating: '4,6', reviews: 58,
      media: art('pendel', '#E7E7E4', '', 'Taklampa Klot, teckning') },
    { id: 'vav', name: 'Matta Väv', sub: 'Ull, 200 × 300 cm', price: 6995, cat: 'textil', color: 'Ljus', mat: 'Ull', rating: '4,5', reviews: 33,
      media: art('matta', '#EAE2D7', '', 'Matta Väv, teckning') },
    { id: 'tuva', name: 'Kuddfodral Tuva', sub: 'Linne, 50 × 50 cm', price: 295, cat: 'textil', color: 'Röd', mat: 'Tyg', rating: '4,8', reviews: 211,
      media: art('kudde', '#F0DCD2', '', 'Kuddfodral Tuva, teckning') },
    { id: 'rund', name: 'Spegel Rund', sub: 'Ø 70 cm, ram i ek', price: 1990, cat: 'inredning', color: 'Brun', mat: 'Trä', rating: '4,7', reviews: 45,
      media: art('spegel', '#DDE3E8', '', 'Spegel Rund, teckning') },
    { id: 'smedja', name: 'Bänk Smedja', sub: 'Ek och svart stål', price: 3495, cat: 'forvaring', color: 'Svart', mat: 'Metall', rating: '4,5', reviews: 19,
      media: art('bank', '#E7E7E4', '', 'Bänk Smedja, teckning') },
    { id: 'ring', name: 'Sidobord Ring', sub: 'Svart stål, Ø 40 cm', price: 1295, cat: 'bord', color: 'Svart', mat: 'Metall', rating: '4,3', reviews: 27,
      media: art('sidobord', '#E8D5CC', '', 'Sidobord Ring, teckning') },
    { id: 'askhog', name: 'Fåtölj Ask hög rygg', sub: 'Ull och oljad ek', price: 7495, cat: 'fatoljer', color: 'Blå', mat: 'Ull', rating: '4,6', reviews: 22,
      media: art('fatolj', '#DDE3E8', '', 'Fåtölj Ask hög rygg, teckning') },
    { id: 'hornlunden', name: 'Hörnsoffa Lunden', sub: 'Linne, vänster eller höger', price: 22900, cat: 'soffor', color: 'Ljus', mat: 'Tyg', rating: '4,7', reviews: 31,
      media: art('soffa', '#EAE2D7', '', 'Hörnsoffa Lunden, teckning') }
  ];
  P.forEach(function (p) {
    p.url = 'produkt.html' + (p.id === 'ask' ? '' : '?id=' + p.id);
    p.thumb = '<span class="ev-thumb" aria-hidden="true">' + p.media.replace(/ loading="lazy"/, '') + '</span>';
    p.tags = p.cat + ' ' + p.mat + ' ' + p.color;
  });
  window.EV_ART = ART;
  window.EV_SITE = {
    key: 'ekbacka',
    products: P,
    popular: ['fåtölj', 'soffa', 'soffbord', 'golvlampa', 'matta'],
    words: ['fåtöljer', 'soffor', 'sofflock', 'sidobord', 'skänk', 'spegel', 'bokhylla', 'bänk', 'taklampa', 'kuddfodral', 'pall']
  };
})();
