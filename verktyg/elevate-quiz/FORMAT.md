# Elevate designquiz: format för frågor

Quizet tar fram designreglerna för **Elevates UX-agent**. Frågorna gäller **designdetaljer och UX**, alltså hur gränssnittets byggstenar ska se ut och bete sig: typsnitt (vilka som ska och aldrig ska användas), knappar, ikoner och symboler, pilar, fält, kort, rundning, skuggor, menyer, lägen och mönster. Precis som i ett designsystem.

**Det här ska frågorna INTE vara:**
- Branschfrågor som "hur ska ett bageri se ut" eller "vilken hero passar en frisör".
- Färgpalettfrågor som "vilka färger passar ihop".
- Stämnings- eller personlighetsfrågor.

Beställaren svarar på en fråga i taget. Hen väljer ett eller två alternativ, och det första valet väger tyngst. Varje fråga visar **samma byggsten i 2–6 varianter**, där bara den egenskap som frågan gäller skiljer sig. Allt annat är identiskt. Alternativen ska vara tydligt olika och alla rimliga, och halmgubbar ska inte finnas. Svaren ska bli konkreta regler, till exempel "primärknapp: 8 px rundning, 600 i vikt, 48 px hög", "ikoner: 2 px linje, rundade ändar" eller "Montserrat ska aldrig användas".

Ställ hellre många små, precisa frågor än få breda. Exempel:
- "Hur rund ska primärknappen vara?"
- "Ska knapptexten ha versaler?"
- "Var ska pilen sitta i en länk?"
- "Hur tjock ska ikonlinjen vara?"
- "Vilken av de här är bäst för rubriker?"
- "Hur ska ett fält se ut när det har fokus?"

Det här är en **ny, neutral omgång**: utgå inte från tidigare smak. Utgångsläget i `base.css` är medvetet neutralt.

## Fil

En fil per del: `data-<del>.js`. Blir den större än cirka 600 kB delar du upp den i `data-<del>-1.js`, `data-<del>-2.js` och så vidare. Filen anropar:

```js
window.QZ.part({
  key: 'typsnitt',                  // delens nyckel (given i ditt uppdrag)
  fonts: ['Fraunces:opsz,wght@9..144,400;9..144,700', 'DM Sans:wght@400;500;700'], // Google Fonts som delen använder (valfritt), i css2-format utan "family="
  groups: [
    {
      key: 'rubriker',              // unik inom delen, a–z och bindestreck
      title: 'Rubriker',            // visas ovanför frågan
      questions: [
        {
          id: 'ts-rubrik-vikt',     // unikt i HELA quizet: delprefix + beskrivande namn
          q: 'Hur tunga ska stora rubriker vara?',  // kort, konkret fråga på svenska
          layout: 'grid',           // 'grid' (rutor bredvid varandra, minst ca 260 px breda) eller 'stack' (full bredd, för hela sektioner eller sidor)
          opts: [
            { l: 'Normal (400)', h: '<div class="pad">…</div>' },
            { l: 'Halvfet (600)', h: '…' },
            { l: 'Fet (800)', h: '…' }
          ]
        }
      ]
    }
  ]
});
```

Fler fält än dessa används inte.

- **Delprefix för id:** typsnitt `ts-`, text `tx-`, knappar `kn-`, symboler `sy-`, pilar `pi-`, falt `fa-`, ytor `yt-`, navigering `na-`, lagen `la-`, ux `ux-`.
- **Alternativ:** 2–6 per fråga, oftast 3–4.
- **`l`** är en kort etikett på 1–6 ord. Den är det som sparas som svaret, så den måste gå att förstå utan bilden, till exempel "8 px rundning", "Pil →", "Fotot fyller hela bredden" eller "Mörk text på ljus yta". Max 48 tecken.
- **`h`** är HTML som renderas i en `<div class="spec">`. Utan `h` visas bara etiketten som en textruta. Det passar för frågor om ord, ton och principer, men använd det sparsamt: de flesta frågor ska visa något.
- Bygg gärna frågorna med hjälpfunktioner och mallar i JavaScript i filen, så kallade generatorer. Det är så du hinner med många frågor. Men varje fråga måste vara meningsfull och visuellt korrekt. Ingen utfyllnad och inga dubbletter av samma fråga med andra ord.

## Stil

- **Grundklasser i `base.css` (läs den):** `.h .h1 .h2 .h3 .eyebrow .muted .small .price .link .tag .sb .sb2 .fld .lbl .inp .ph .pad .row .stack .panel .pic .chip .divider .ico`, och för hero/fotoytor `.hx .hx-photo .bg .sh .hx-in .hx-t .hx-xl .hx-l .hx-m .hx-s .hx-p .hx-acts .hx-two .hx-img`.
- **CSS-variabler:** `--brand --brand-d --bink --ground --box --field --sink --smuted --accent --tint --sline --rb --rc --rf --fh --fhw --fb --ok --warn --bad`. Byt variabler på en wrapper (`style="--brand:#0E5E4E;--rb:999px"`) i stället för att skriva om allt.
- **Ändra bara det frågan gäller.** Allt annat ska vara som utgångsläget, så att jämförelsen blir rättvis.
- **Egen CSS:** lägg en `<style>` inuti `h` med ett unikt klassprefix per fråga, till exempel `.ty-rv-a`, så att inget läcker. Inga globala selektorer och inga `body`, `html` eller `*`. Inga `id`-attribut, inga `<script>` och inga `<form>`, eftersom samma alternativ kan renderas flera gånger.
- **Ikoner:** inline-SVG, till exempel `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">…</svg>`. Inga ikonbibliotek och inga externa resurser, utom Google Fonts via `fonts`.
- **Rörelse:** får visas med CSS-animationer i egen `<style>`, till exempel för laddning eller hover-lägen med `:hover`. Respektera `@media (prefers-reduced-motion: reduce)`.
- **Bredd:** alternativen visas i rutor som kan vara så smala som 260 px (`grid`), eller i full bredd ner till 340 px (`stack`). Allt måste få plats utan att flöda ut: använd flex-wrap, `min-width: 0`, procent och `max-width: 100%`. Sätt inga fasta bredder över 240 px i `grid`. För sektioner och hela sidor: `layout: 'stack'` och container queries (`.hx` har `container-type: inline-size`).
- **Bilder:** bara relativa sökvägar `img/<namn>.jpg` från listan nedan. Ge varje `<img>` en `alt`-text, och använd `object-fit: cover`.
  - Resor och Sverige: `berlin stockholm kopenhamn fjallen fjallen-vandring vinter-skidor skidor-ovanifran kupe krogen-frukost barn-tag berlin-domen nattag-sovvagn sovvagn-korridor tag-rapsfalt tag-hostskog stugor-sjo station-vinter dukat-bord gardar-kvall perrong-fjall langbord`.
  - Övriga motiv: `restaurang-interior restaurang-ratt kafe-kaffe bageri snickare renovering badrum elektriker frisor spa klinik tandlakare kontor-team mote laptop produkt-sko produkt-hudvard produkt-stol kladstall hotellrum villa vardagsrum tradgard gym bilverkstad stadsgata skog-sjo portratt-1 portratt-2 portratt-3`.
- **Innehåll:** neutralt och generiskt. Byggstenen ska stå i fokus, inte sammanhanget. Använd korta allmänna texter, till exempel "Boka tid", "Läs mer", "Skicka", "Fortsätt", "Rubrik som är två rader lång", "Från 495 kr", "E-post" eller "Sök". Använd inga påhittade företag eller branscher som tema. Visa byggstenen på en neutral yta, eller i ett minimalt sammanhang när sammanhanget behövs för att bedöma den, till exempel en knapp under en kort text eller en ikon bredvid en rad. Inga riktiga varumärken.
- **Bilder:** bara när frågan gäller något med bild, till exempel kort med bild, bildrundning eller text på foto. Annars ingen bild.
- **Färg:** håll grundfärgerna från `base.css`. Färgfrågor bara när färgen är själva detaljen, till exempel fokusringens färg, felröd eller länkfärg. Aldrig paletter.

## Kontroll

Kör `node check.cjs data-<del>.js` i mappen. Det ska skriva antalet frågor utan fel. Kör sedan `python3 build.py` och se att din del räknas.

Titta på resultatet:
1. Starta en lokal server på en egen port, till exempel `python3 -m http.server <port>` i mappen, som bakgrundsprocess.
2. Rendera med Playwright: öppna `http://localhost:<port>/`, välj din del och bläddra med →, eller sätt `localStorage['elevate-quiz-v1']` till `{"part":"<del>","view":"quiz","pos":{"<del>":N}}` och ladda om.
3. Kontrollera stickprov i 1280 och 390 px bredd: att inget flödar ut, att typsnitt laddas och att alternativen syns tydligt. Titta på skärmdumparna med Read.
4. Döda servern när du är klar.

Committa inte.
