# UX-referenser

Referensbank för agenten `ux-designer` (`.claude/agents/ux-designer.md`).

**Urvalet är gjort av beställaren, inte av agenten.** 41 sajter bedömdes i november 2026: 11 godkändes och 30 underkändes. Facit är SJ.se och Lantmännen. Typsnitt, färger och radier är uppmätta i renderad DOM med Playwright. Där en sajt blockerar automatiska besök står det "ej uppmätt".

---

## Smaken i en mening

**Varmt, naturnära och fotodrivet.** Riktiga människor, landskap och produkter i sitt sammanhang, jordnära färger och lugna ytor, med uppgiften (boka, söka, handla) inbyggd i bilden.

## Vad de godkända har gemensamt

1. **Fotot bär sidan.** Ett fullbreddsfoto med riktiga människor, landskap eller rum: SJ:s norrsken, Lantmännens åker, Arlas människor, Granits och Bolias interiörer, Allbirds vardagsrum och Houdinis friluftsliv.
2. **Jordnära palett.** Grönt dominerar (SJ, Vy, Lantmännen, Arla, Systembolaget, Hemnet). Annars används varma neutrala toner som sand, beige och varm off-white (Bolia, Allbirds, Houdini, Granit). Aldrig kallt grått eller rent tech-vitt som hela upplevelsen.
3. **Lugnt och självsäkert.** Få element per skärm och en stor rubrik. Varumärket får ta plats utan att skrika.
4. **Uppgiften ligger i bilden.** Bokningen eller sökningen ligger ovanpå eller direkt under fotot (SJ, Vy, DSB, Hemnet), inte i en egen app-liknande panel.
5. **Typografi med värme.** Serif för rubriker (Lantmännen, Bolia, Systembolaget) eller en mjuk, rund sans. Aldrig en kall, neutral tech-grotesk som enda röst.

## Vad de underkända har gemensamt

| Mönster | Underkända exempel |
|---|---|
| **Platt app-UI.** Vit sida med ikonrutor, kort och flikar men inga bilder som bär | Kry, Länsförsäkringar, NS, Kivra, Nordic Nest, Clas Ohlson |
| **Skrikiga platta färgfält** i lime, orange, rött eller mörkt med neon | Wise, Oda, Mathem, ICA, Oatly, Tibber |
| **Kampanjrörigt.** Procent-cirklar, Black Week, många erbjudanden som tävlar | Apoteket, IKEA, Clas Ohlson, Nordic Nest |
| **Kall lyx och tech-minimalism.** Produkt på grått eller svart, mörkt och sterilt | Apple, Polestar, Volvo Cars, Byredo, Estrid, Aesop, Arket, Muji, HAY |
| **Mörka foton med tunn text**, eller bilder som är för konstnärliga för att sälja | Norrøna, Nudie Jeans, Svenskt Tenn, Marimekko |
| **Sök i app-stil utan stämning** | Airbnb |

---

## Facit

### SJ: sj.se
- **System:** sj_sans. Svart `#000`, grön `#00AB3B` för handling, gul `#FFD700` för etiketter. Pill-knappar och 16 px kort. Rubriker 32 / 26 / 20 px.
- **Det som gör det:** Ett stämningsfoto (norrsken) direkt under menyn och "Vart vill du resa?" med bokningen. Säsongsinnehåll som "Nu tar vi dig hela vägen till Sälen" med foto.

### Lantmännen: lantmannen.se
- **System:** LMSerif (700) för rubriker och LMSans för text. Grön `#1E6E37`, off-white `#F4EEE6`, varm svart `#201E1A`. Skarpa hörn, 2 px.
- **Det som gör det:** Ett fullbreddsfoto av en åker i motljus och en serifrubrik på 192 px, "Från jord till bord". Bara fotografier.

---

## Godkända referenser

### Vy: vy.no
- **System:** Vy Sans och Vy Display. Mörkgrön `#00685E`, mint `#CCEAE4`, text `#2B2B2C`. Radie 30 px på fält och 18 px på kort.
- **Ta med:** Hälsningen "Hei, hvor vil du reise?" med Från/Till direkt under. Kampanjkort med stora foton (julmarknad, vinter). Grönt i två toner.

### DSB: dsb.dk
- **System:** via_office. Röd `#B41730`. Radie 8 och 16 px.
- **Ta med:** Bokningen ("Find rejse og pris") ligger ovanpå ett fullbreddsfoto. Trafikmeddelanden som stängbara rader överst.

### Hemnet: hemnet.se (ej uppmätt)
- **Ta med:** Sökningen är hela startsidan, med bostadsfoton som drömmar. Grönt varumärke.

### Klarna: klarna.com/se (delvis uppmätt)
- **System:** Klarna Title. Nästan svart `#0B051D`, varm off-white `#F9F8F5`. Pill-knappar.
- **Ta med:** Stora livsstilsfoton och en varm off-white i stället för kallt vitt.

### Arla: arla.se
- **System:** Arla InterFace och Arla Life. Mörkgrön `#02462F`, skiffer `#384241`. Radie 4 px.
- **Ta med:** Fullbreddsfoto med riktiga människor och stor rubrik. Recept med matfoto i fasta proportioner och användarens fråga som rubrik ("Vad ska vi äta idag?").

### Systembolaget: systembolaget.se
- **System:** Inter Variable för text och eget displaytypsnitt. Nästan svart `#262626`, mjuk grön `#C7E5CE`. Radie 4–8 px.
- **Ta med:** Lugnet. Mjukt grönt och ett vänligt tilltal även i tvingande steg ("Hej, får vi be om legitimation?"). Säsongsstyrt innehåll.

### Granit: granit.com
- **System:** Euclid Circular B. Vitt och varmgrått `#E5E4E1`, skarpa 2 px.
- **Ta med:** Fullbreddsfoto av ett rum med erbjudandet i stor text över bilden. Produktnamn med material och mått. Betyget "4,4 av 5" i toppraden.

### Bolia: bolia.com/sv-se
- **System:** Cormorant (serif) för rubriker och Montserrat för text. Varm beige `#F7F4EA`, sand `#EAE4D4`, vinröd `#57363B`. Skarpa 1–2 px.
- **Ta med:** Den varma beige grunden och serifrubriker. Möblerna visas i riktiga rum. Närmast Lantmännen i känsla bland e-handlarna.

### Houdini: houdinisportswear.com
- **System:** Helvetica. Vitt, varmt `#F1EFEA` och svart. Skarpa 2 px.
- **Ta med:** Fullbreddsfoto och en kort rubrik med tre små knappar (Reuse, Rent, Repair). Hållbarhet som tjänster.

### Allbirds: allbirds.com
- **System:** Geograph. Sand `#E0DACF` och `#ECE9E2`, mörk `#212121`. Pill-knappar och 16 px kort.
- **Ta med:** Ett livsstilsfoto i vardagsmiljö med rubrik och två knappar ovanpå bilden. Sandtoner som grund.
- **Ta inte med:** Rabattpopupen som täcker sidan.

### Patagonia: patagonia.com (ej uppmätt)
- **Ta med:** Landskap och människor i rörelse. Uppdraget (miljö) får lika stor plats som produkterna.

---

## Regler för agenten som följer av urvalet

- Börja varje startsida med **ett stort, varmt foto** av människor, landskap eller produkten i användning. Ingen startsida utan bild.
- Välj **grönt eller en jordnära ton** som varumärkesfärg om kunden inte redan har en. Grunden är varm off-white eller beige, inte kall `#fff` med grå kort.
- **Lägg uppgiften i bilden**: bokningsruta eller sök ovanpå eller direkt under fotot.
- **Serif eller mjuk sans** för rubriker.
- **Undvik** ikonrutnät som huvudinnehåll, platta färgfält i signalfärg, kampanjcirklar, mörk lyxminimalism och produkt på grått.
