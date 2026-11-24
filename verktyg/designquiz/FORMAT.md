# Format för quizdata

Quizet visar en fråga i taget. Beställaren väljer ett av 2–4 visuella alternativ (eller "Spelar ingen roll"). Svaren blir designregler för en UX-agent. Beställarens smak hittills: varmt, fotodrivet, resor och turism, bara sans-serif (Hanken Grotesk), mättade färger (standard skog och havre), pill-knappar, fyllda fält utan kant, text direkt på foto i hero, bokningspanel i två kolumner. Populära resor (kort med bild, typ, sträcka, kort text och pris) var omtyckt.

## Fil

En fil per del, t.ex. `data-detaljer-b.js`. Filen innehåller bara:

```js
window.QUIZ_DATA = window.QUIZ_DATA || [];
window.QUIZ_DATA.push({
  part: 'detaljer',            // 'detaljer' | 'sektioner' | 'generellt'
  groups: [
    {
      key: 'formular',          // unik, a–z och bindestreck
      title: 'Formulär',        // visas som rubrik
      questions: [
        {
          id: 'd-checkbox-form', // unik i HELA quizet: prefix d-, s- eller g- + beskrivande namn
          q: 'Hur ska kryssrutor se ut?',  // frågan, kort och konkret, svenska
          layout: 'grid',        // 'grid' (2–4 rutor bredvid varandra, ca 280 px breda) eller 'stack' (alternativ under varandra i full bredd, för hela sektioner)
          opts: [
            { l: 'Rundad fyrkant', h: '<div class="pad">…HTML…</div>' },
            { l: 'Cirkel', h: '…' }
          ]
        }
      ]
    }
  ]
});
```

- `l` är en kort etikett (1–5 ord) som beskriver alternativet. Svaret sparas som etiketten, så den måste vara begriplig utan bilden, t.ex. "Pil →" eller "Chevron ›".
- `h` är HTML som renderas inuti en `<div class="spec">`. Om `h` saknas visas bara etiketten som text.
- 2–4 alternativ per fråga. Spara inte på kvalitet: varje alternativ ska vara en riktig, välgjord variant.

## Stil

- Använd klasserna i `base.css` (läs den): `.h .h1 .h2 .h3 .eyebrow .muted .small .price .link .tag .sb .sb2 .fld .lbl .inp .ph .pad .row .stack .panel .pic .chip .divider .ico`, och CSS-variablerna (`var(--brand)`, `var(--ground)`, `var(--box)`, `var(--field)`, `var(--sink)`, `var(--smuted)`, `var(--accent)`, `var(--rb)`, `var(--rc)`, `var(--rf)`, `var(--sline)`, `var(--tint)` med flera).
- Ändra bara det frågan gäller. Allt annat ska vara som utgångsläget, så att jämförelsen blir rättvis.
- Behövs egen CSS: lägg en `<style>` inuti `h` med ett unikt klassprefix per fråga (t.ex. `.q-checkbox-a`) så att inget läcker. Inga globala selektorer, inga `body`/`html`/`*`.
- Ikoner och pilar: inline-SVG (`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ...>`), eller Unicode-tecken. Inga ikonbibliotek, inga externa resurser, inga typsnitt utöver Hanken Grotesk (redan laddat). Vill du testa ett annat typsnitt: bara dessa är laddade: Hanken Grotesk, Nunito Sans, Archivo, Manrope, Montserrat, Source Sans 3, Figtree, Bricolage Grotesque.
- Bilder: bara dessa relativa sökvägar (riktiga, licensierade foton): `img/berlin.jpg` (Brandenburger Tor, kväll), `img/stockholm.jpg` (Gamla stan från vattnet), `img/kopenhamn.jpg` (Nyhavn med cyklister), `img/fjallen.jpg` (snöigt fjäll, blå himmel), `img/vinter-skidor.jpg` (skidåkare vid lift, kvällsljus), `img/skidor-ovanifran.jpg` (skidåkare ovanifrån, ljust), `img/kupe.jpg` (två bäddar i tågkupé), `img/krogen-frukost.jpg` (frukost vid tågfönster, stående bild). Ge `<img>` en `alt`-text.
- Innehåll: svenska, realistiskt resebolagsinnehåll utan varumärkesnamn (skriv inte "Snälltåget", "SJ" osv.). Exempel som får användas: Malmö – Berlin nattåg fr. 399 kr, Malmö – Stockholm fr. 199 kr, Stockholm – Köpenhamn fr. 349 kr, Malmö – Åre vintersäsong 16 dec – 25 apr, egen kupé för två fr. 1 499 kr, Wallenbergare 169 kr, ombokning senast 24 h före avresa (50 kr), sms vid förseningar över 30 min.
- Alternativen visas i rutor som kan vara så smala som 280 px (layout `grid`) eller i full bredd ner till 340 px (layout `stack`). Allt måste fungera i de bredderna utan att flöda ut: använd flex-wrap, `min-width: 0`, procent och `max-width: 100%`. Sätt inga fasta bredder över 260 px i `grid`-frågor.
- Inget interaktivt behövs, men `:hover` får användas i egen `<style>` för att visa lägen. Inga `<script>`, inga `<form>`, inga `id`-attribut (samma alternativ kan renderas två gånger).
- Undvik det beställaren redan underkänt om det inte är själva poängen med frågan att testa igen: serif, skarpa hörn, skuggade knappar, kampanjer med procent, mörka foton, ljus panel på fotot, alla fält på en rad.

## Kontroll

Kör `node -e "global.window={};require('./data-XXX.js');const d=window.QUIZ_DATA[0];let n=0,ids=new Set();for(const g of d.groups)for(const q of g.questions){n++;if(ids.has(q.id))throw q.id;ids.add(q.id);if(q.opts.length<2||q.opts.length>4)throw q.id}console.log(n)"` i mappen och se att antalet stämmer och att inget fel kastas. Rendera gärna några frågor med Playwright för att se att de ser rätt ut (sidan `preview.html` finns i mappen när motorn är klar; annars bygg en egen enkel testsida som laddar base.css och Hanken Grotesk från Google Fonts).
