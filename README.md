# Axel&Gren – hemsida

Statisk hemsida för Axel&Gren, gårdsbutiken på Stabby gård i Uppsala-Näs.
Ingen ramverkskod och inga beroenden: HTML, en CSS-fil, en JS-fil och ett litet byggskript i Node.

## Kom igång

```bash
npm run build     # bygger ./*.html från src/
npm start         # bygger och startar en lokal server på http://localhost:8080
```

Redigera bara filerna i `src/`. HTML-filerna i roten genereras av `build.mjs` och skrivs över vid varje bygge.

```
src/
  layout.html          sidmall (head, meta, schema.org)
  partials/header.html statusrad, meny, mobilmeny
  partials/footer.html sidfot
  partials/icons.svg   alla ikoner och piktogram (SVG-sprite)
  pages/*.html         en fil per sida, med en JSON-rad överst för titel och beskrivning
assets/
  css/main.css         designtokens och komponenter
  js/main.js           öppettider, meny, karusell, kontaktformulär
  img/                 landskapsillustration och favicon
```

## Öppettider inför ny säsong

Statusraden ("Öppet just nu", "nästa öppetdag …") räknas ut från listan `SEASON` överst i
`assets/js/main.js`. Lägg in de nya datumen där, och uppdatera texterna i `src/pages/aktuellt.html`
och `src/partials/header.html` (den texten syns om JavaScript är avstängt).

## Formspråk

Formspråket bygger på samma principer som Lantmännens designsystem Harvest, som byrån Hoy har tagit fram:

- **Färg:** en grön skala från `#134623` till `#d7e18c`, sand (`#efe7dc`) som lugn komplementyta och vit bakgrund.
- **Typografi:** en kraftig serif (Source Serif 4) för rubriker och brödtext, en sans (Instrument Sans) för knappar, menyer och etiketter.
- **Komponenter:** pillerformade knappar på 56 px, runda pilknappar, fotokort med vita linjepiktogram ovanpå, fotopaneler med text, tunna linjer mellan sektionerna och sandfärgade "läs mer"-paneler.
- **Navigering:** hamburgare till vänster om logotypen som öppnar en mörkgrön megameny i rutnät, transparent sidhuvud över hero-bilden på startsidan, och tillbakalänk med stor rubrik och ingress på undersidorna.
- **Tillgänglighet:** länk för att hoppa förbi menyn, tydlig fokusmarkering, semantiska landmärken, respekt för `prefers-reduced-motion` och kontrast enligt WCAG AA.

## Bilder

Fotona är hämtade från Axel&Grens nuvarande sajt och ligger i `assets/img/foto/` som WebP i två
storlekar (`namn-800.webp` och `namn-1600.webp`). På sidorna skriver man bara

```html
<img data-pic="solrosfalt" sizes="100vw" alt="Beskrivning av bilden" loading="lazy">
```

så lägger byggskriptet till `src` och `srcset`. Nya bilder: spara originalet, skala till 800 och 1600 px
bredd som WebP med samma namnmönster.

Fotografer enligt originalsajten: Ulrika Ekblom och Lisbet Spörndly (självplocksbilderna).
