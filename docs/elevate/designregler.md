# Elevate Studio: designregler

Härledda ur beställarens designquiz 2026-11-24 (720 svar i delarna Knappar, Ikoner och symboler, Pilar och småbitar, UX-mönster och 20 frågor om Textdetaljer). Källan står inom parentes som frågans id i `docs/elevate/quiz-svar-2026-11-24.json`. Frågornas HTML finns i `verktyg/elevate-quiz/data-*.js`.

Det här är en ny omgång. Ingen tidigare smak (skog och havre, Hanken Grotesk, gröna symboler och liknande) gäller längre.

## Så läses reglerna

| Märkning | Betyder |
|---|---|
| (utan märkning) | **Regel.** Beställarens förstahandsval. Följ den. |
| **Reserv:** | Andrahandsvalet. Tillåten variant när regeln inte fungerar i sammanhanget. Inte likvärdig. |
| **Härlett:** | Inte frågat rakt ut, men följer av flera svar eller av hur alternativet såg ut i quizet. |
| **Standard tills beställaren svarat** | Neutralt, vedertaget val där quizet saknar svar. Ska ersättas när svaren kommer. |
| **Fritt** | Beställaren svarade "Spelar ingen roll". Välj det som passar sidan, inom resten av systemet. |

Px för ikonlinjer avser renderad tjocklek. Quizet ritade ikonerna med `vector-effect: non-scaling-stroke`, så "2 px" betyder 2 px på skärmen oavsett ikonens storlek.

---

## Sammanfattning: de 24 viktigaste reglerna

1. **Primärknappen är pill**, 52 px hög (40 px liten, 56 px stor), 20 px sidoutfyllnad, minst 96 px bred, text 16 px i vikt 500 (kn-rund-oversikt, kn-hojd, kn-hojd-liten, kn-hojd-stor, kn-sidopad-pill, kn-minbredd, kn-vikt, kn-textstorlek).
2. **Helfylld i varumärkesfärgen med vit text.** Ingen skugga, ingen kant, ingen gradient (kn-fyllning, kn-farg-primar, kn-textkontrast, kn-skugga, kn-kant).
3. **Primärknappen har en pil → efter texten**: 20 px, 6 px avstånd, fritt stående. Sekundärknappen har ingen pil (kn-ikon-plats, kn-ikon-typ, kn-ikon-storlek, kn-ikon-avstand, kn-ikon-behallare, kn-par-ikon, kn-sek-ikon).
4. **Hover gör knappen tydligt mörkare på 100 ms**, nedtryckt blir den ännu mörkare och pilen glider 6 px (kn-hover-typ, kn-hover-styrka, kn-hover-fart, kn-tryck-typ, kn-hover-pil).
5. **Sekundärknappen är en kontur på 1,5 px i mörk textfärg**, lika hög och lika rund som primären. På vit yta blir den tonad, på ljusgrå yta vit utan kant och på foto en vit halvgenomskinlig kontur (kn-sek-typ, kn-sek-kontur-tjocklek, kn-sek-kontur-farg, kn-sek-hojd, kn-sek-pa-vitt, kn-sek-pa-gra, kn-sek-spok-foto, kn-sek-spok-kant).
6. **En primärknapp per sektion.** En andra handling blir en textlänk. Primären står först, 8 px mellan och 16 px från texten ovanför (ux-cta-antal, kn-par-storlek, kn-par-ordning, kn-par-avstand, kn-par-avstand-text).
7. **På mobil har primären full bredd med textlänken under**, 12 px emellan. Ingen fast knapp nertill (kn-mob-stapling, ux-mobil-knappbredd, kn-mob-avstand, ux-mobil-fast-knapp).
8. **Ikoner är linjeikoner**: geometriska, enkla, slutna, platta och helt rundade (ändar och hörn). Samma linjestil i alla storlekar och ingen skugga (sy-stil-grund, sy-ande-paket, sy-sprak-geometrisk, sy-sprak-detalj, sy-sprak-oppna, sy-sprak-perspektiv, sy-stil-enhet, sy-sprak-skugga).
9. **Linjen växer lite med storleken**: 1,5 px i 16 px, 1,75 px i 20 px, 2 px i 24 px och 2,5 px i 48 px. Bredvid brödtext, i knappar och i fält är linjen 2 px (sy-linje-skala, sy-linje-16, sy-linje-20, sy-linje-24, sy-linje-stor, sy-linje-brodtext, sy-linje-knapp, sy-linje-falt).
10. **Ikonstorlekar**: 20 px bredvid text och i knappar, 24 px i sidhuvud, tabbar och fält, 32 px vid mellanrubrik och i infokort. Större på mobil (sy-storlek-*).
11. **Ikoner har samma färg som texten bredvid.** Statusikoner har en egen färg per status, och på mörk yta är ikonerna vita (sy-farg-brodtext, sy-farg-lista, sy-farg-header, sy-farg-falt, sy-farg-funktion, sy-farg-status, sy-farg-mork).
12. **Ingen platta bakom ikoner** i listor, rutnät, kontaktuppgifter och sociala ikoner (sy-platta-form, sy-rut-platta, sy-platta-kontakt, sy-soc-form).
13. **Aldrig emoji.** Använd alltid ritade ikoner (sy-emoji-*).
14. **Pilen är en ritad pil med skaft →** med rundade ändar, i länkar, knappar, listrader, klickbara kort och mellan platser ("Malmö → Lund"). Chevron används bara där något fälls ut, i steg och i bläddring (pi-form-lasmer, pi-form-knapp, pi-form-lista, pi-form-kort, pi-form-frantill, pi-form-tecken, pi-form-andar).
15. **Textlänkknappen** ("Läs mer"-typen) har varumärkesfärg, 15 px, vikt 600 och är aldrig understruken. Pilen är lika stor som texten, 1,75 px, och glider 4 px vid hover på 200 ms. Länkar i löptext är understrukna och har ingen pil (kn-ter-farg, kn-ter-storlek, kn-ter-vikt, kn-ter-understrykning, pi-tj-lank, pi-tj-lankstorlek, pi-hv-lank, pi-hv-hastighet, pi-lank-lopande).
16. **Chips är pill och 34 px höga.** Ovalda är vita med 1 px kant, valda fyllda i varumärkesfärg utan bock. 8 px mellan dem och en svepbar rad på mobil (pi-chip-*).
17. **Etiketter skrivs i vanlig skrift, 12 px, vikt 600 och utan ikon.** På bilder är etiketten ett vitt hörnband uppe till vänster. Statusetiketter i listor är tonade och utan kant (pi-et-*).
18. **Inga dekorativa markeringar i rubriker.** Inga överstrykningar, understrykningar eller färgade ord. Den enda accenten är en prick i varumärkesfärg efter rubriken (pi-mk-stil, pi-mk-*, pi-ac-rubrik, pi-ac-overrubrik).
19. **H1 är halvfet (600) och skrivs i meningsform.** Tilltalet är du. Knapptext är verb och sak i neutral form, till exempel "Boka tid" (tx-h1-vikt, tx-h1-versaler, ux-mc-du-ni, kn-textlangd, ux-mc-knapp-person).
20. **Heron**: foto i hela skärmhöjden med texten på bilden, även på mobil. En mening under rubriken och ett sökfält. Inget under, ingen scrollpil och ingen knapp i headern (ux-hero-*, ux-cta-header).
21. **Flöden i flera steg**: några fält per steg och "Steg 2 av 4" med stegnamn vid knapparna. Tillbaka är en textlänk med pil ovanför rubriken, Fortsätt har full bredd, man avbryter med ett kryss uppe till höger och går vidare direkt när man väljer ett alternativ (ux-flode-*).
22. **Formulär**: exempeltext i fältet och "(valfritt)" på valfria fält. Fel visas när man lämnar fältet och säger vad man ska göra. Det ifyllda ligger kvar, och vyn hoppar till första felet (ux-exempel-*, ux-fel-*).
23. **Listor och rutnät**: fyra kort per rad på desktop och två på mobil. Hela kortet är klickbart och knappen sitter under priset. Använd rutnät med "Visa alla" i stället för karusell (ux-lista-*, ux-karusell-eller-rutnat).
24. **Räknare är svarta, aldrig röda.** På varukorgen står siffran bredvid ikonen (pi-bd-farg, sy-nav-markning, ux-vagn-lagg-till).

---

## 1. Knappar

### Primärknapp: form och mått
- Rundning: **pill** i alla storlekar (kn-rund-oversikt, kn-rund-mjuk, kn-rund-skalning). **Reserv:** 12 px rundning (kn-rund-oversikt). Om en knapp någon gång måste vara nästan skarp: 4 px, och för mellanrundning 8 px (kn-rund-skarp, kn-rund-mellan). Det gäller bara om pill inte kan användas.
- Knapp och fält bredvid varandra: **båda pill** (kn-rund-mot-falt). **Reserv:** båda 8 px.
- Ikonknapp bredvid primärknappen har **samma rundning**, alltså en cirkel när den är kvadratisk (kn-rund-ikonknapp, sy-knapp-ikonknapp).
- Höjd: **52 px** som standard, **40 px** liten (i rader och listor), **56 px** stor (överst på en sida) (kn-hojd, kn-hojd-liten, kn-hojd-stor). Mobilhöjden är fri (kn-mobil-hojd).
- Sidoutfyllnad i pill: **20 px** (kn-sidopad-pill). **Reserv:** 28 px. På ikonsidan är utfyllnaden mindre: 16 px när knappen har 20 px (kn-ikon-utfyllnad, **härlett** ur quizets 24/18 px).
- Minsta bredd **96 px** (kn-minbredd). **Reserv:** bredd efter texten.
- Får texten inte plats blir **knappen bredare**. Texten bryts aldrig och kortas aldrig med … (kn-textbrytning).
- Knapp i kort: **fast bredd 180 px** (kn-bredd).
- Skicka-knapp under ett formulär: **bredd efter innehållet, vänsterställd** (kn-bredd-formular). I flöden gäller i stället full bredd (ux-flode-fortsatt-plats).
- Knapp bredvid ett fält: **knappen är lägre än fältet**, till exempel fält 52 px och knapp 40 px, med 8 px glapp (kn-hojd-falt). **Reserv:** lika höga. Knappen ska inte ligga inuti fältet och inte vara sammanfogad med det.

### Primärknapp: text
- **16 px, vikt 500** (kn-textstorlek, kn-vikt). **Reserv:** 15 px och 600.
- Längden är **verb och sak**: "Skicka förfrågan", "Boka tid" (kn-textlangd, ux-mc-knapp-person). Se konflikten om knapptext under Konflikter.
- Skiftläge och spärrning är fria (kn-versaler, kn-sparrning-gemen), men versaler undviks i resten av systemet (tx-h1-versaler, pi-et-versaler, kn-ter-versaler). Använd därför meningsform.
- Knapp i full bredd: **texten centrerad med pilen direkt efter** (kn-textjust-full, kn-ikon-full-placering, pi-knapp-placering).

### Primärknapp: ikon
- **Ikonen sitter efter texten** (kn-ikon-plats, sy-knapp-sida). Ikonen är **pil →** (kn-ikon-typ, pi-form-knapp) och står fritt, utan cirkel eller ruta (kn-ikon-behallare, pi-knapp-pildel).
- Ikonen är **20 px** med **6 px** avstånd till texten (kn-ikon-storlek, sy-storlek-knapp, kn-ikon-avstand, sy-knapp-gap).
- Linjen är **2 px renderad** (sy-linje-knapp). Se konflikten om pilens tjocklek.
- Ikonen har **samma färg som texten** (kn-ikon-farg, sy-farg-knapp2). Det är en linjeikon, inte fylld (sy-knapp-ikonstil).
- Undantag med ikon före texten: **plus** för "Lägg till" (kn-ikon-plus), **kundvagn** för "Lägg i varukorgen" (kn-ikon-varukorg) och **pil vänster** för "Tillbaka" (kn-ikon-tillbaka).
- Ikon efter texten: **nedåtpil** för nedladdning (kn-ikon-nedladdning) och **diagonal pil ↗** för en knapp som öppnar en annan webbplats (kn-ikon-extern).
- Även små knappar (36–40 px) har ikon (sy-knapp-liten).

### Primärknapp: yta
- **Hel fyllning** i **varumärkesfärgen** med **vit text på mörk yta** (kn-fyllning, kn-farg-primar, kn-textkontrast). Varumärkesfärgen måste därför vara så mörk att vit text når 4,5:1. Är den inte det används en mörkare ton av den i knappen.
- **Ingen skugga, ingen synlig kant och ingen gradient** (kn-skugga, kn-kant, kn-gradient-typ, kn-skugga-styrka, kn-skugga-ton). Svaret "2 px djup" (kn-3d-djup) gällde bara om knappen hade 3D-skugga, vilket den inte har.
- På foto: **vit knapp med mörk text** (**härlett** ur hur quizet visade primären på foto i kn-sek-spok-foto).

### Sekundärknapp
- Standard: **kontur 1,5 px** med **mörk kant och mörk text** (textfärgen, inte varumärkesfärgen) (kn-sek-typ, kn-sek-kontur-tjocklek, kn-sek-kontur-farg). **Reserv:** bara text.
- Den är **lika hög** som primären och har samma form (kn-sek-hojd). Textvikten är **500** (kn-sek-vikt) och den har **ingen pil** (kn-sek-ikon).
- Efter yta:
  - **På vit yta: tonad yta** med varumärkesfärgen 16 % mot vitt och mörk text (kn-sek-pa-vitt, kn-sek-tonad-styrka "Mellan" = #DCE3EA mot quizets #24405E, kn-sek-tonad-text).
  - **På ljusgrå yta: vit yta utan kant** (kn-sek-pa-gra).
  - **På foto: vit kontur 1,5 px med halvgenomskinlig kant** (rgba(255,255,255,.5)) och vit text (kn-sek-spok-foto, kn-sek-spok-kant).
  - Kontur 1,5 px mörk gäller på övriga ytor och när sekundären står ensam.
- Är sekundären bara text: **utan understrykning** (kn-sek-textknapp). Den villkorade följdfrågan (kn-sek-understrykning) gäller därför inte.
- Neutral sekundär, om den används: vit yta med hårfin kant (kn-sek-gra).
- Hover: konturknappen **fylls helt** (mörk yta, vit text), och fyllningen **tonar in** (kn-hover-sek, kn-hover-fyllning).

### Tertiär- och textlänkknappar
- "Läs mer" och liknande: **färgad text utan dekor** (kn-ter-stil). **Reserv:** text med pil. Längst ner i ett kort: **textlänk med pil** (kn-ter-i-kort).
- **Varumärkesfärg, 15 px, vikt 600, vanlig skrift, aldrig understruken** (kn-ter-farg, kn-ter-storlek, kn-ter-vikt, kn-ter-versaler, kn-ter-understrykning, pi-lank-understrykning).
- Pilen är **pil →** med **4 px** CSS-avstånd till texten (kn-ter-pil-typ, kn-ter-pil-avstand). Se konflikten om avståndet.
- "Avbryt" bredvid "Spara" i ett formulär är en **textknapp** (kn-ter-avbryt).

### Knappar bredvid varandra
- **Primären först, sekundären efter** (kn-par-ordning), med **8 px** emellan (kn-par-avstand). **Reserv:** 12 px.
- Sekundären är oftast en **textlänk** (kn-par-storlek). **Reserv:** lika stora knappar.
- **Bredden följer innehållet**, så knapparna är inte lika breda (kn-par-bredd).
- **Bara mellanrum** mellan knapparna, inte ordet "eller" (kn-par-eller).
- **16 px** från texten ovanför till knapparna (kn-par-avstand-text). **Reserv:** 24 px.
- En tredje handling läggs i en **meny (…)** (kn-par-tredje).
- **Dialog**: två **lika breda knappar som delar bredden**, Avbryt till vänster och Spara till höger. Det gäller även på mobil (kn-par-dialog, kn-mob-dialog, ux-bekr-knappordning). **Reserv på mobil:** staplade med Spara överst.

### Mobil
- **Primären har full bredd och textlänken står under** (kn-mob-stapling, ux-mobil-knappbredd). **Reserv:** staplade knappar i full bredd.
- Primären står **överst**, med **12 px** mellan staplade knappar (kn-mob-ordning, kn-mob-avstand). **Reserv:** 8 px.
- En knapp som inte har full bredd står **centrerad** (kn-mob-justering). **Reserv:** vänsterställd.
- Knappen ligger i innehållet, direkt under det den hör till, och sitter inte fast nertill (ux-mobil-fast-knapp, ux-mobil-tumzon).

### Lägen
- Hover: **tydligt mörkare** (quizet: #24405E till #10202F, alltså cirka 50 % mot svart) på **100 ms** (kn-hover-typ, kn-hover-styrka, kn-hover-fart). Knappen lyfts inte och får ingen skugga.
- Pilen i primärknappen **flyttar sig 6 px** åt höger vid hover (kn-hover-pil).
- Nedtryckt: **ännu mörkare** (cirka 62 % mot svart). Knappen krymper inte och får ingen innerskugga (kn-tryck-typ).
- Ikonknapp vid hover: **ikonen mörknar** (kn-hover-ikonknapp). Se konflikten med sy-lage-hover.
- Spökknapp på foto vid hover: inget av de visade alternativen (kn-hover-foto). **Härlett beslut:** kanten blir helvit. Den fylls inte och tonas inte.
- Inaktiv skicka-knapp: grå tills formuläret är rätt ifyllt (ux-fel-inaktiv-knapp). Se Tillgänglighet om hur det görs utan att stänga ute någon.

### Ikonknappar och specialknappar
- Knapp med bara ikon: **cirkel** (sy-knapp-ikonknapp). **Reserv:** ingen bakgrund. Klickytan är **40 px** (sy-storlek-klickyta).
- Små åtgärdsknappar: **ikon med text under** (sy-knapp-sekundar-etikett). **Reserv:** bara ikon.
- Flytande "Ny"-knapp på mobil: **kapsel med plus och text** (sy-knapp-flytande).
- En handling som inte går att ångra: **röd knapp med ikon**, till exempel papperskorg (ux-bekr-farlig-knapp).

---

## 2. Ikoner och symboler

### Stil
- Grundstil: **linje** (sy-stil-grund, sy-stil-verktyg, sy-stil-liten, sy-stil-stor, sy-stil-mork, sy-rut-stil, sy-platta-ikonstil, sy-knapp-ikonstil). **Reserv:** duotone, alltså linje med ljus fyllning. Den får användas på stora ikoner (48 px) men aldrig på mörk yta.
  - Duotone, om den används: **10 %** fyllning (**reserv:** 20 %) i **ljus varumärkesfärg**, **förskjuten snett nedåt** från formen (sy-stil-duo-styrka, sy-stil-duo-farg, sy-stil-duo-forskjut).
- **Samma linjestil överallt**, i små och stora storlekar (sy-stil-enhet).
- Ändar och hörn: **allt rundat** (sy-ande-andar, sy-ande-paket, pi-form-andar). Rektanglar inne i ikoner har **3 px hörnradie** (sy-ande-radie). **Reserv:** 5 px.
- Fyllda ikoner, där de förekommer: lätt rundade hörn och utskärningar på 1,25 px (sy-ande-fyllda, sy-stil-utskuren).
- Platta ikoner, om de någon gång används: med mörk kontur (sy-stil-platt-kontur).
- Ikonspråk: **enkla med få linjer, geometriska, platta och rakt framifrån, med slutna former** (sy-sprak-detalj, sy-sprak-geometrisk, sy-sprak-perspektiv, sy-sprak-oppna). Ikonerna **förenklas i 16 px** (sy-sprak-forenkla). Symboler i ram har **runda ramar** (sy-sprak-grundform).
- Luft: ikonen fyller **18 av 24 px** (sy-sprak-luft). **Reserv:** 20 av 24.
- **Ingen skugga** på ikoner (sy-sprak-skugga).

### Linjetjocklek (renderad)
| Sammanhang | Linje | Källa |
|---|---|---|
| 16 px | 1,5 px | sy-linje-16 |
| 20 px, fristående | 1,75 px | sy-linje-20 |
| 20 px bredvid brödtext | 2 px | sy-linje-brodtext |
| 24 px | 2 px (reserv 2,5) | sy-linje-24, sy-linje-24-fin |
| 32 px | fritt (använd 2,25) | sy-linje-32 |
| 48 px | 2,5 px (reserv 2) | sy-linje-stor |
| I knapp | 2 px | sy-linje-knapp |
| I fält | 2 px (reserv 1,5) | sy-linje-falt |
| På mörk yta | 2 px (reserv 2,5) | sy-linje-mork |
| Tabbar, aktiv | 2,5 px | sy-linje-tabbar, sy-lage-tabbar |
| Tabbar, inaktiv | 1,75 px | sy-lage-tabbar |

Principen är att linjen **växer lite med storleken**. Den skalar inte proportionellt och är inte alltid 2 px (sy-linje-skala).

### Storlek
- Bredvid brödtext (15–16 px) och bredvid liten text (13 px): **20 px** (sy-storlek-brodtext, sy-storlek-smatext).
- I knapp: **20 px** (sy-storlek-knapp). Bock i punktlista: **20 px** (sy-storlek-lista). I meddelanderuta: **20 px** (sy-storlek-status, **reserv:** 24 px).
- I sidhuvudet: **24 px** (sy-storlek-header). I tabbar: **24 px** (sy-storlek-tabbar, **reserv:** 20 px). I fält: **24 px** (sy-storlek-falt, **reserv:** 20 px). I funktionsrutnät: **24 px** (sy-rut-storlek).
- Bredvid mellanrubrik: **32 px** (sy-storlek-rubrik). Överst i ett litet informationskort: **32 px** (sy-storlek-kort).
- Ovanför en stor rubrik: fritt (sy-storlek-stor-rubrik).
- **Större på mobil** (sy-storlek-mobil). **Härlett:** ett steg upp under 640 px, så 20 blir 24 och 24 blir 28.
- Betygsstjärnor bredvid liten text: **16 px** (sy-sym-stjarna-storlek).

### Färg
- **Samma som texten** bredvid: brödtext, punktlistor, sidhuvud, fält, funktionsrutnät och ledande ikoner i textlänkar som nedladdning och extern länk (sy-farg-brodtext, sy-farg-lista, sy-farg-header, sy-farg-falt, sy-farg-funktion, sy-farg-lank-ikon). **Reserv i sidhuvudet:** grå.
- I sekundärknapp: samma som knapptexten (sy-farg-knapp2).
- Metarad: **grå ikon och mörk text** (sy-farg-meta). Grå för sekundära ikoner är **mörkgrå** (sy-farg-gra), **reserv:** mellangrå.
- Statusikoner (info, varning, fel och klart): **egen färg per status** (sy-farg-status). **Reserv:** alla i textfärg.
- På mörk yta: **vit** (sy-farg-mork).
- Favorit: **fyllt hjärta i varumärkesfärg** (sy-lage-favorit).
- Betygsstjärnor: **gula** (sy-sym-stjarna-farg, pi-sj-farg). Det är det enda stället där gult används.

### Platta bakom ikonen
- Standard: **ingen platta** (sy-platta-form, sy-rut-platta, sy-platta-kontakt, sy-soc-form). **Reserv:** cirkel.
- Om en cirkelplatta används: **48 px**, ikonen **50 %** (24 px), **ljust tonad** med varumärkesfärgen **12 %**, linjeikon och **12 px** till texten bredvid (**reserv:** 16 px) (sy-platta-storlek, sy-platta-andel, sy-platta-fyllning, sy-platta-ton, sy-platta-ikonstil, sy-platta-avstand).
- Fylld platta: vit linjeikon (sy-platta-fylld-ikon). Platta med bara kant: tunn grå kant (sy-platta-kant). Vit platta på tonad yta: vit med skugga (sy-platta-skugga).
- I kort sitter plattan **centrerad överst** (sy-platta-kort).
- Klart-meddelande: **bock i cirkel utan platta** (sy-platta-status). **Reserv:** fylld grön cirkel med vit bock.

### Ikon och text bredvid varandra
- **8 px** mellan ikon och text (sy-it-avstand). **12 px** mellan ikon och rubrik (sy-it-rubrik-avstand). **12 px** mellan flera ikon- och textpar på samma rad (sy-it-meta-avstand).
- Linjering: **ikonens och textens överkanter i linje** (sy-it-linjering, **reserv:** centrerad mot texten). Vid två rader text linjerar ikonen med första raden (sy-it-flerrad).
- I textlänkar står ikonen **efter** texten (sy-it-sida).

### Ikoner i listor
- Punktlista med fördelar: **punkt** som markör (sy-lista-markor). Se konflikten om bockar.
- Det som inte ingår i en jämförelse: **grått kryss** (sy-lista-negativ). **Reserv:** grå överstruken text.
- Fördelslista med ikoner: **en egen ikon per rad**, inte samma bock på alla (sy-lista-olika).
- Kontaktuppgifter: **både ikon och ord**, till exempel ikon + "Telefon" + nummer (sy-lista-kontakt).
- Nedladdningslista: **dokumentikon** (sy-lista-fil), och dessutom filtyp och storlek i länken (ux-lank-filer).

### Ikoner i navigering
- Toppmenyn har **bara text** (sy-nav-toppmeny). Sidomenyn och rullgardinsmenyer har **ikon och text** (sy-nav-sidomeny, sy-nav-rullgardin).
- Åtgärderna uppe till höger i sidhuvudet är **bara ikoner** (sy-nav-header-hoger), med text för skärmläsare.
- Sök i sidhuvudet på datorn: **sökikon och ordet "Sök"** (sy-nav-sok). **Reserv:** bara ikon. Se konflikten om sök.
- Menyknappen på mobil är **bara en ikon** med tre lika streck (sy-nav-menyknapp, sy-sym-meny).
- Tabbaren på mobil: **bara ikon** (sy-nav-tabbar, **reserv:** ikon och text). Alla flikar är linjeikoner, och den aktiva har **tjockare linje** (2,5 px mot 1,75 px) och mörk färg. Den har **ingen extra markering** (sy-lage-tabbar, sy-lage-aktiv-markor). **Reserv:** kapsel bakom ikonen.
- Vald rad i sidomenyn: **samma linjeikon** som i övriga rader (sy-lage-sidomeny).
- Brödsmulans första steg är en **hemikon** (sy-nav-brodsmula).
- Inloggad användare i sidhuvudet visas med **personikon** (sy-sym-inloggad).
- Språkväljare: **jordglob och språkkod** (sy-sym-sprak).

### Ikoner i funktionsrutnät
- **24 px linjeikon bredvid texten**, ikon och text **centrerade** i cellen och **ingen platta** (sy-rut-storlek, sy-rut-placering, sy-rut-justering, sy-rut-platta, sy-rut-stil).

### Lägen för ikoner
- Inaktiv ikonknapp: **40 % opacitet** (sy-lage-inaktiv). **Reserv:** ljusgrå ikon.
- Vald ikon i en vyväxlare (rutnät eller lista): **platta i varumärkesfärg med vit ikon** (sy-lage-vald-vaxel).
- Utfällning: **plus vrids till kryss** (sy-lage-utfall).
- Filterknapp med valda filter: **antalet i texten**, "Filter (3)" (sy-lage-filter-aktiv).
- Kopierat: **en bock ersätter ikonen** (sy-lage-kopierad). **Reserv:** bock och ordet "Kopierat".
- Valt filterchip får ingen bock, bara färg (sy-lage-chip-vald).

### Symbollexikon
| Betydelse | Utseende | Källa |
|---|---|---|
| Bock | kort och bred | sy-sym-bock |
| Stäng | stort kryss utan ram | sy-sym-kryss |
| Info | i i cirkel | sy-sym-info |
| Varning | utropstecken i triangel | sy-sym-varning |
| Fel | kryss i cirkel | sy-sym-fel |
| Statusikoner i meddelanden | linje, inte fyllda | sy-sym-status-fylld |
| Plus och minus i antalsväljare, "Lägg till" | rena tecken utan ram | sy-sym-plusminus, sy-sym-plus-lagg-till |
| Sök | förstoringsglas med handtag nere till höger (reserv: kraftigt handtag) | sy-sym-sok |
| Meny | tre lika streck | sy-sym-meny |
| Fler val | tre punkter vågrätt | sy-sym-mer |
| Filter | vågräta reglage | sy-sym-filter |
| Sortera | pil upp och pil ner | sy-sym-sortera |
| Dela | pappersflygplan (reserv: pil upp ur ruta) | sy-sym-dela |
| Ladda ner / upp | pil ner i bricka / pil upp ur bricka | sy-sym-ladda-ner, sy-sym-ladda-upp |
| Extern länk (ikon) | pil ut ur ruta | sy-sym-extern, pi-extern-ikon |
| Redigera | penna | sy-sym-redigera |
| Kopiera | två rutor, den bakre bruten | sy-sym-kopiera |
| Radera | papperskorg med lock och ränder | sy-sym-radera |
| Inställningar | kugghjul med 8 kuggar | sy-sym-installningar |
| Länk | kedja, diagonal | sy-sym-lank |
| Visa / dölj lösenord | öga / överstruket öga | sy-sym-oga |
| Användare | huvud och axlar | sy-sym-anvandare |
| Varukorg | kundvagn (reserv: kasse) | sy-sym-kundvagn |
| Hjärta | klassiskt | sy-sym-hjarta |
| Plats | nål med hål | sy-sym-plats |
| Telefon | telefonlur | sy-sym-telefon |
| Mejl | kuvert med flik | sy-sym-mejl |
| Tid | klocka med två visare | sy-sym-klocka |
| Datum | kalender med ringar | sy-sym-kalender |
| Hem | hus med dörr | sy-sym-hem |
| Säkert | hänglås med rund bygel och streck | sy-sym-las |
| Chatt | fyrkantig bubbla med textrader | sy-sym-chatt |
| Notiser | enkel klocka | sy-sym-notis |
| Spara till senare | bokmärke | sy-sym-spara |
| Hjälp | bara frågetecken | sy-sym-hjalp |
| Logga ut | pil ut genom öppning | sy-sym-logga-ut |
| Bild | ram med berg | sy-sym-bild |
| Leverans | lastbil | sy-sym-leverans |
| Betalning | kort med magnetremsa | sy-sym-betala |
| Uppdatera | två pilar i cirkel | sy-sym-uppdatera |
| Bifoga | gem, snett | sy-sym-bifoga |
| Spela video | spetsig triangel | sy-sym-spela |
| Töm sökfält | grått kryss | sy-sym-rensa |
| Förklaring vid fältetikett | frågetecken i grå cirkel | sy-sym-info-etikett |

- Fält för e-post och lösenord har **ikon till vänster** (sy-sym-falt-ikon).
- Sociala ikoner är **monokroma, fyllda och utan platta**. Storleken är fri (sy-soc-farg, sy-soc-stil, sy-soc-form, sy-soc-storlek).
- Betygsstjärnor: **gula**, tomma stjärnor **ljusgrå och fyllda** och **2 px** mellanrum (sy-sym-stjarna-farg, sy-sym-stjarna-tom, pi-sj-tom, pi-sj-avstand). När man själv sätter betyg: **stora konturstjärnor** (pi-sj-satta), **reserv:** stora grå stjärnor. Se konflikterna om stjärnans form och halva betyg.

### Rörelse i ikoner
- Ikoner som vill ha uppmärksamhet får **en kort rörelse ibland**, inte en ständig (sy-anim-grund).
- Klart: **bocken ritas fram** (sy-anim-klar). Favorit: **hjärtat studsar till** (sy-anim-hjarta). Meny: **strecken glider ihop till ett kryss** (sy-anim-meny).
- Ikoner i funktionsrutnät **svävar lätt**, cirka 5 px upp och ner (sy-anim-funktion). Rörelsen stannar efter högst 5 sekunder (WCAG 2.2.2) och stängs av vid `prefers-reduced-motion`.
- Ikonanimationer tar **0,6 s** (sy-anim-hastighet). **Reserv:** 1,2 s.

---

## 3. Pilar och småbitar

### Pilarnas form
- **Pil med skaft →** efter "Läs mer", i primärknappar, till höger i klickbara listrader, på klickbara kort och mellan två platser eller tider: "Malmö → Lund", "08.10 → 09.45" (pi-form-lasmer, pi-form-knapp, pi-form-lista, pi-form-kort, pi-form-frantill).
- Pilen är **en ritad SVG-ikon**, inte typsnittets tecken (pi-form-tecken). Den har **normal längd** (pi-form-langd) och **rundade ändar** (pi-form-andar). Pilhuvudets form är fri (pi-form-huvud).
- Pilen står **utan form runt sig** (pi-form-ring).
- Chevron: **rät vinkel** (pi-form-chevronvinkel).
- Scrollpil: dubbel chevron ner (pi-form-ner). Den används sällan, eftersom heron inte ska ha någon scrollpil (ux-hero-scrolltips).
- "Till toppen": **textlänken "Till toppen ↑"** i slutet av sidan (pi-form-upp, ux-sid-till-toppen). **Reserv:** rund knapp med pil upp.

### Tjocklek, storlek och färg
- Pil i textlänk: **1,75 px**, **lika stor som texten** (1em), i **samma färg som länktexten** (pi-tj-lank, pi-tj-lankstorlek, pi-tj-pilfarg).
- Pil i knapp: **2 px** (se Konflikter).
- Chevron i listrad: **14 px**, i **dämpad grå** (pi-tj-listchevron, pi-tj-listfarg).
- Avstånd från text till pil i länk: **4 px** CSS-avstånd med en pil som börjar 4 enheter in i 24-rutan, så att det syns som cirka 7–8 px (kn-ter-pil-avstand, pi-tj-avstand). Se Konflikter.

### Pilar i länkar och knappar
- Pilen står **efter** texten (pi-lank-placering). Pil-länken är **inte understruken** och skrivs i **vanlig skrift** (pi-lank-understrykning, pi-lank-versaler).
- Lista med länkar: **pilen längst till höger** på raden (pi-lank-lista). **Reserv:** ingen pil.
- Länkar i löptext: **bara understrykning**, ingen pil (pi-lank-lopande).
- Bred knapp: pilen **direkt efter texten** (pi-knapp-placering).
- Skicka-knapp i sökfält: **textknappen "Sök"** (pi-knapp-barapil). Se konflikten om sök.

### Karusell (när den ändå används)
- Standard är rutnät, inte karusell (ux-karusell-eller-rutnat).
- Pilknappar: **runda, 40 px, i varumärkesfärg** med **pil med skaft ← →** (pi-kar-form, pi-kar-storlek, pi-kar-pil). **Reserv:** bara pil utan bakgrund.
- De sitter **under raden, i mitten**, med **8 px** emellan (pi-kar-placering, pi-kar-glapp).
- Bakåtknappen är **lika tydlig som framåt** även i början (pi-kar-inaktiv).
- Pilknappar ovanpå en bild: **bara en vit pil med skugga**, utan knappyta (pi-kar-skugga).
- Hover: **pilen glider lite** (pi-hv-karusell).
- **Två hela kort** syns och nästa kort sticker inte in (ux-karusell-kant).
- Bildspel byter bild automatiskt (ux-karusell-auto), men se Tillgänglighet: det krävs ett sätt att pausa.

### Dragspel och rullgardin
- Dragspel (till exempel vanliga frågor): **plus som vrids till kryss** när raden öppnas (pi-drag-oppet, sy-lage-utfall). Ikonen står **till höger** (ux-faq-ikon-sida) och **utan form runt sig** (pi-drag-platta). Se konflikten med chevron.
- Rullgardinslista: **chevron ner** som står fritt, utan avdelare eller egen ruta (pi-rull-ikon, pi-rull-avskild). När den öppnas **vrids chevronen mjukt 180°** (pi-drag-rorelse). **Reserv:** dubbelpil upp och ner.
- Liten rullgardin i löptext, som "Sortera": **text och chevron** (pi-rull-textmeny).
- Chip som öppnar en meny: **chevron ner efter texten** (pi-chip-meny).

### Tillbaka, extern länk, brödsmulor och bläddring
- Tillbaka-länk: **pil med skaft och text**, i **mörk textfärg** (pi-tillbaka-form, pi-tillbaka-farg). **Reserv:** dämpad grå. Vid hover glider pilen åt vänster (pi-hv-tillbaka).
- Länk till en annan webbplats: **ruta med pil ut**, lika stor som texten (pi-extern-ikon, pi-extern-storlek). Den öppnas i en ny flik och ikonen visar det (ux-lank-ny-flik). För en knapp till en annan webbplats gäller diagonal pil ↗ (kn-ikon-extern).
- Brödsmulor: **snedstreck /** som är **lika mörkt som texten** (pi-brod-tecken, pi-brod-ton). **Reserv:** chevron ›.
- Stegflöde: **chevron mellan stegnamnen** (pi-steg-riktning). **Reserv:** pil med skaft.
- "Föregående" och "Nästa" längst ner på en sida: **chevrons och text** (pi-nasta-foreg).

### Pilens rörelse vid hover
- "Läs mer": **pilen glider 4 px åt höger**. Texten får ingen understrykning, bara pilen rör sig (pi-hv-lank, pi-hv-understrykning).
- Glidningen tar **200 ms** (pi-hv-hastighet). **Reserv:** 120 ms.
- Pil i primärknapp: **6 px** (kn-hover-pil). Se Konflikter.
- Hörnpil på kort: **glider snett uppåt** (pi-hv-kort).

### Etiketter och märken
- Etikett på bild ("Nyhet", "Populär"): **hörnband**, ett diagonalt band i 45° uppe till vänster, **vitt med mörk text** (pi-et-form, pi-et-stil, pi-et-pabild, pi-et-placering). **Reserv för färgen:** tonad. **Reserv för platsen:** bredvid priset.
- Text: **12 px, vikt 600, vanlig skrift och ingen ikon eller prick** (pi-et-storlek, pi-et-vikt, pi-et-versaler, pi-et-ikon). Luft: **normal**, 5 × 9 px (pi-et-luft).
- Två etiketter på samma kort står **under varandra** (pi-et-flera). **Härlett:** det andra bandet läggs parallellt under det första, och blir det trångt flyttas den andra etiketten till raden vid priset.
- Rabatt: **rött pris och det ordinarie priset överstruket** (pi-et-rabattform). Rabattetikettens färg är fri (pi-et-rabattfarg).
- Slutsåld: **text vid priset** (pi-et-slutsald). Slutsåld variant i en väljare visas **överstruken** (ux-val-slutsalt).
- "Öppet nu": **bara grön text**, ingen prick och ingen pill (pi-et-oppet). "Stängt" har ingen prick (pi-st-stangt).
- Statusetiketter i listor: **tonade färger utan kant**, i pill-form (pi-et-status, pi-et-tonkant). Quizets toner var #E3F1E8 (ok), #F8EEDC (varning) och #FBE9E7 (fel), med statusfärgen som text.
- "Ny" vid en menypunkt: **liten pill efter texten** (pi-et-meny).
- Taggar (ämnesord): **tonade pills** (pi-tag-amne). **Reserv:** text med #.

### Chips
- **Pill, 34 px höga** (pi-chip-form, pi-chip-storlek).
- Ovalda: **vit yta med 1 px kant** (pi-chip-ovald, pi-chip-kant). Valda: **fyllda i varumärkesfärg med vit text och ingen bock** (pi-chip-vald, pi-chip-bock, sy-lage-chip-vald). **Reserv för valda:** tonad utan kant.
- Chips har en **ikon före texten** när det finns en meningsfull ikon (pi-chip-ikon).
- Aktivt filter som går att ta bort: **kryss efter texten** (pi-chip-kryss). Inget antal i chipet (pi-chip-antal).
- **8 px** mellan chips (pi-chip-glapp). På mobil står de i **en rad som går att svepa** (pi-chip-mobil).

### Avdelare
- **1 px, ljus, heldragen och i hela bredden**, med **12 px** luft (pi-avd-tjocklek, pi-avd-ton, pi-avd-stil, pi-avd-indrag, pi-avd-luft). **Reserv:** bara mellanrum, eller en linje som börjar efter ikonen.
- "Eller": **linjer på båda sidor om ordet "eller"** i gemener (pi-avd-eller).
- Tabeller och prislistor: **linje mellan raderna**, inte varannan rad tonad (pi-avd-zebra).
- Saker på samma rad (till exempel länkar i sidfoten): **prick** (pi-avd-vertikal, **reserv:** lodrät linje), med **8 px** luft runt pricken (pi-meta-avstand).
- Liten grupprubrik: **linje under rubriken** (pi-avd-rubriklinje).
- Hur två avsnitt skiljs åt är fritt (pi-avd-sektion).

### Metadata
- Metadata står **under rubriken** i kortet, med **en ikon före varje del** och **bara mellanrum** emellan (12 px mellan paren) (pi-meta-placering, pi-meta-ikoner, pi-meta-tecken, sy-it-meta-avstand). **Reserv:** lodstreck.
- Skiljetecken som ändå används är **lika mörka som texten** (pi-meta-tecken-ton).
- Betyg skrivs **"4,8 · 120 omdömen"** (pi-meta-betyg).

### Prickar, räknare och badges
- Status utan text i en lista: **fylld prick** (pi-st-ensam). Tillgänglig på profilbild: prick **nere till höger med vit kant** (pi-st-avatar).
- Räknare på varukorgen: **siffran bredvid ikonen** (sy-nav-markning). Se Konflikter.
- Räknare som ligger på en ikon (notiser): **en prick utan siffra** som **överlappar hörnet** och har en **ring i bakgrundsfärgen** (pi-bd-notis, pi-bd-position, pi-bd-ring). En räknare med siffra är **14 px** (pi-bd-storlek, **reserv:** 18 px).
- Färg: **svart** (pi-bd-farg). **Reserv:** varumärkesfärg. Aldrig röd.
- Stora antal: **9+** (pi-bd-stora). Tom varukorg: **grå nolla** (pi-bd-noll).
- Antal i meny eller flik: **dämpad siffra** (pi-bd-meny). **Reserv:** fylld pill.

### Steg och siffror
- **Stegvisare** (vågrät): **bara siffran** utan form, i varumärkesfärg, med **heldragen linje** mellan stegen. Ett klart steg får **en bock i en fylld cirkel** (pi-sg-form, pi-sg-linje, pi-sg-klar, sy-siffra-linje, sy-siffra-klar). Aktivt och kommande steg, storlek, stegnamn och linjefyllning är fria (pi-sg-aktiv, pi-sg-kommande, pi-sg-storlek, pi-sg-etikett, pi-sg-linjefyll). På smal skärm visas **alla steg med siffror** (pi-sg-mobil).
- **Lodrät lista med steg** ("Så går det till"): **siffror i fyllda cirklar på 28 px** i varumärkesfärg, siffran skriven "1" och **en 2 px linje** mellan cirklarna (pi-sg-lodrat, sy-siffra-linje). **Härlett:** svaret "Ingen av dem" på sy-siffra-form, sy-siffra-fyllning, sy-siffra-storlek och sy-siffra-format kom på en lista utan förbindelselinje. Linjen är det som avgör.
- Siffrans färg och vikt är fria (sy-siffra-farg, sy-siffra-vikt).
- Formulärflödets stegindikator beskrivs under UX-mönster.

### Karusellprickar och bildräknare
- **Prickar på 8 px**. Den aktiva pricken är **utdragen till en pill** (pi-si-typ, pi-si-storlek, pi-si-aktiv). **Reserv:** streck, eller 10 px prickar.
- De sitter **på bilden, nere i mitten** (pi-si-placering). På foto ligger prickarna **i en mörk pill** (pi-si-pabild).
- Bildräknare: **"2 / 5"** (pi-si-siffror).

### Rullningslister och vågräta rader
- Vågrät rad med kort: **rullningslisten är dold** (pi-rl-synlig). Att raden går att rulla syns genom att **sista kortet sticker ut** (pi-rl-ledtrad).
- Långa listor och menyer: **dold** rullningslist (pi-rl-lodrat). **Reserv:** tunn och rundad.

### Tooltip
- **Mörk med vit text, 12 px rundning och en pil på 8 px**, visas **ovanför** (pi-tt-farg, pi-tt-rundning, pi-tt-pil, pi-tt-sida).
- Utlösare: **i i en cirkel** (pi-tt-utlosare). Vid fältetiketter gäller frågetecken i grå cirkel (sy-sym-info-etikett).

### Citat
- **Lodrät linje till vänster** (pi-ct-stil). **Reserv:** ett stort citattecken (56 px, i varumärkesfärg i ljus ton, stort och ljust bakom texten) (pi-ct-storlek, pi-ct-farg, pi-ct-placering).
- **Svenska citattecken ”…”** (pi-ct-tecken).

### Visa mer, trunkering och skelett
- "Visa fler" under en lista: **en länk med chevron ner** (pi-vm-form). Ovanför står **"Visar 12 av 36"** (pi-vm-antal).
- "Se alla" för en rad med kort: **uppe till höger vid rubriken** (pi-vm-sealla).
- Avkortad text med länk: **tre punkter och länken direkt efter**, "… Läs mer" (pi-vm-langtext). Avkortad text utan länk **tonas ut** (pi-tr-slut). Långa filnamn kortas **i mitten** (pi-tr-mitten), och långa namn i smala listor kortas med … (pi-tr-tabell). Rubrikrader och beskrivningsrader i kort är fria (pi-tr-rubrik, pi-tr-text).
- Skelett: **textrader i pill-form, ljusgrå, rad för rad som innehållet**, med en **kortare sista rad** (pi-sk-form, pi-sk-farg, pi-sk-detalj, pi-sk-sistarad). Rörelsen är en **mjuk puls** (pi-sk-rorelse). Se Konflikter.

### Antalsväljare
- **Bara − och + utan ram och utan linjer**, 32 px hög (pi-kv-form, pi-kv-knappar, pi-kv-avdelare, pi-kv-storlek, pi-kv-tecken). **Reserv:** grå yta utan kant, 40 px. Klickytan måste ändå vara minst 24 × 24 px.
- Vid antal 1 är minus **nedtonad** (pi-kv-minst). **Reserv:** byts mot papperskorg.

### Progress
- Stapel: **8 px tjock, helt runda ändar, ljusgrått spår och fyllning i varumärkesfärg**, med procenten **ovanför till höger** (pi-pb-tjocklek, pi-pb-rundning, pi-pb-spar, pi-pb-farg, pi-pb-etikett). Den är **hel**, inte uppdelad per steg (pi-pb-segment).
- Fristående framsteg (till exempel profil eller uppladdning): **ring med procent** (pi-pb-cirkel). Stapeln används i flöden och för fri frakt (ux-vagn-fri-frakt).

### Rubrikaccenter
- Den enda accenten är **en prick i varumärkesfärg efter rubriken**, "Våra tjänster." där punkten har märkesfärg (pi-ac-rubrik). Använd den sparsamt, på avsnittsrubriker och inte på varje rubrik.
- Överrubriker har **ingen detalj** före sig (pi-ac-overrubrik). Streck, lodrätt streck och accentfärg är fria följdfrågor (pi-ac-streck, pi-ac-lodrat, pi-ac-farg). De blir inte aktuella eftersom regeln är pricken.
- Nyckelord i rubriker markeras **inte** (pi-mk-stil).

### Hörn på kort och kortsignal
- Ett klickbart kort signaleras med **länken "Läs mer →" längst ner** (pi-kh-signal, pi-form-kort, kn-ter-i-kort). Skriv gärna mer beskrivande länktext (ux-mc-lanktext).
- **Reserv** för kort utan textlänk (bildkort, länkkort): en **diagonal pil ↗ i hörnet**, bara pilen utan form, som glider snett uppåt vid hover (pi-kh-detalj, pi-kh-platta, pi-hv-kort). Hörnet är fritt (pi-kh-position).

---

## 4. Text

Bara 20 frågor är besvarade och 18 av dem är "Spelar ingen roll". Det som är bestämt:

- **H1: halvfet (600)** (tx-h1-vikt). Medium, fet och extrafet valdes bort.
- **H1 i meningsform**: inte Varje Ord Stort och inte VERSALER (tx-h1-versaler).
- Fritt: H1:s storlek, radavstånd, spärrning, punkt, maxbredd, radbrytning och färg. Allt om H2 och H3:s storlek (tx-h1-*, tx-h2-*, tx-h3-storlek-desktop).
- Etiketter, textlänkar, pil-länkar och etiketter i knappar skrivs **utan versaler** (pi-et-versaler, kn-ter-versaler, pi-lank-versaler).
- Rubriker får en **prick i varumärkesfärg** som accent (pi-ac-rubrik).

**Standard tills beställaren svarat:**
- En sans-serif-familj: **Inter** (variabel, 400/500/600). Quizet renderades i Inter, så alla svar bedömdes i den. En kunds egen sans-serif får ersätta den.
- Brödtext 16 px med radhöjd 1,5 och högst cirka 70 tecken per rad. Liten text 14 px och finstilt 13 px.
- Rubriker i 600: H1 56 / 36 px (desktop / mobil), H2 36 / 28 px, H3 22 / 19 px. Radhöjd 1,1 på H1 och 1,2 på H2–H3. Spärrning −0,01 em på H1 och H2. Balanserade rader (`text-wrap: balance`).
- Text i mjukt svart #1A1C1E och sekundär text i mörkgrått (se Tillgänglighet).
- Priser med `font-variant-numeric: tabular-nums`. Skriv "1 295 kr" med hårt mellanslag.

---

## 5. UX-mönster

### Flöden i flera steg
- **Några fält per steg** (ux-flode-uppdelning).
- Indikatorn är **texten "Steg 2 av 4"** med **bara stegnamn**, inte siffror i cirklar (ux-flode-indikator, ux-flode-stegnamn). **Reserv:** linje och text tillsammans. Namnen skiljs med **chevron** (pi-steg-riktning). Det aktuella namnet är fetat och de andra dämpade.
- Den sitter **längst ner vid knapparna** (ux-flode-indikator-plats). **Reserv:** en lodrät lista till vänster.
- På mobil: **prickar**, med texten "Steg 2 av 4" kvar för skärmläsare (ux-flode-indikator-mobil).
- Sammanfattningen av valen står **i sidled bredvid stegen** på desktop och **längst ner** på mobil (ux-flode-sammanfattning, ux-flode-sammanfattning-mobil). **Reserv på desktop:** längst ner, före knappen.
- Tillbaka: **textlänk med pil ovanför rubriken** (ux-flode-tillbaka-plats, ux-flode-tillbaka-stil).
- Tidigare steg i indikatorn är **inte klickbara**. Man går tillbaka med Tillbaka (ux-flode-klickbara-steg).
- I sista steget finns en **Ändra-länk vid varje rad** (ux-flode-andra-val).
- Fortsätt har **full bredd** (ux-flode-fortsatt-plats). **Reserv:** till höger.
- Vid enkla val går man **direkt vidare vid klick** (ux-flode-auto-vidare). Det gäller bara val med ett enda svar, inte flerval och inte fält.
- Före flödet: säg **hur lång tid det tar** (ux-flode-forvantan).
- Flödet sparas inte (ux-flode-spara). Man avbryter med **ett kryss uppe till höger** (ux-flode-avbryt). Den **vanliga menyn syns** som vanligt (ux-flode-meny).
- När flödet är klart: **bekräftelse och en knapp vidare** (ux-flode-klart). **Reserv:** bekräftelse och sammanfattning.

### Sök
- Header på desktop: **bara en sökikon** (ux-sok-placering) med ordet "Sök" (sy-nav-sok). På mobil: ikon i headern (ux-sok-mobil).
- Klick öppnar **ett överlägg över hela sidan** (ux-sok-oppna).
- Medan man skriver visas **både förslag och träffar** (ux-sok-forslag), och **resten av ordet är fetat** (ux-sok-forslag-markering).
- I ett tomt fält visas **både senaste och populära** sökningar (ux-sok-tomt-falt).
- Skicka: **knapp inne i fältet** (ux-sok-skicka). Se Konflikter.
- Resultat: **lista med liten bild** (ux-sok-resultat-vy). Överst står **antal träffar och sökordet** (ux-sok-antal-traffar).
- Inga träffar: **"Menade du …?"** (ux-sok-inga-traffar). **Reserv:** närmaste träffar direkt.
- Kategorier: **flikar ovanför resultaten** (ux-sok-kategori).

### Filter och sortering
- Desktop: **en rad med rullgardiner ovanför** listan (ux-filter-placering). **Reserv:** en knapp som öppnar en panel.
- Mobil: **bottenark** (ux-filter-mobil). Mobil har **två knappar, Filter och Sortera** (ux-sort-mobil).
- Aktiva filter: **antalet på filterknappen** (ux-filter-aktiva, sy-lage-filter-aktiv).
- **Rensa alla överst i filterpanelen** (ux-filter-rensa).
- Filter slår igenom med **en knapp med antal: "Visa 24"** (ux-filter-direkt).
- Grupper är **hopfällda** från början (ux-filter-grupper). Många val visar **fem val och "Visa fler"** (ux-filter-manga-val).
- **Antal träffar till höger** vid varje val (ux-filter-antal-per-val).
- Valen är **rutor i ett rutnät** (ux-filter-kontroll). Pris filtreras med **ett reglage med två handtag** (ux-filter-pris). Val med noll träffar är **gråade och går inte att välja** (ux-filter-noll-traffar).
- **En rad med snabbval** ovanför listan (ux-filter-snabbval).
- Sortering: **en ikon som öppnar en meny**, **till vänster bredvid Filter**, märkt med **ikon och värde** (ux-sort-kontroll, ux-sort-placering, ux-sort-etikett). Pris skrivs **"Billigast" och "Dyrast"** (ux-sort-pris-text).

### Listor, rutnät och bläddring
- **Fyra kort per rad** på desktop (**reserv:** tre) och **två per rad** på mobil (ux-lista-per-rad, ux-lista-per-rad-mobil).
- Man kan **växla mellan rutnät och lista** med två ikonknappar (ux-lista-vaxla-vy).
- Kortet visar **bild, namn, pris, betyg, etikett och knapp** (ux-lista-info-mangd). Köpknappen sitter **under priset** (ux-lista-kop-pa-kort). **Hela kortet är klickbart** (ux-lista-klickyta).
- Antal står ovanför: **"24 produkter"** (ux-lista-antal).
- Jämförbara uppgifter visas som **en lista med en rad per post** (ux-lista-tabell). En bred tabell blir **ett kort per rad** på mobil (ux-lista-tabell-mobil).
- Fler objekt: **"Visa fler" med hur många som är kvar** (ux-sid-typ, ux-sid-visa-fler-text, pi-vm-antal). **Reserv:** oändlig scroll.
- Om sidnumrering används: **siffror med pilar**, **både ovanför och under** listan och ett fast antal per sida. På mobil: **‹ 2 / 8 ›** (ux-sid-stil, ux-sid-placering, ux-sid-per-sida, ux-sid-mobil).
- Långa sidor har **"Till toppen" som textlänk i slutet** (ux-sid-till-toppen).
- Många objekt: **rutnät med "Visa alla"** (ux-karusell-eller-rutnat).

### Val och alternativ
- 2–4 alternativ: **kort med radioknapp** (ux-val-fa-alternativ). 12 eller fler: **en sökbar lista** (ux-val-manga-alternativ).
- **Inget är förvalt** (ux-val-forvalt). En rullgardin visar ändå **det vanligaste värdet** från början (ux-val-rullgardin-start). Det är en visad utgångspunkt, inte ett tyst förval. **Reserv:** "Välj …".
- Antal väljs med **minus och plus** (ux-val-antal). Dag väljs i **ett fält som öppnar en kalender** (ux-val-dag). Tid väljs i **ett rutnät med lediga tider** (ux-val-tid).
- Ja/nej: **två knappar, Ja och Nej** (ux-val-ja-nej). Flerval: **kort med bock** (ux-val-flerval). Variant och storlek: **rutor med alla storlekar** (ux-val-variant).

### Bekräftelser och ångra
- Borttagning: **fråga först i en dialog** (ux-bekr-ta-bort). Knapparna är **lika breda bredvid varandra** (ux-bekr-knappordning), och bekräftelsen säger **"Ja, ta bort"** (ux-bekr-knapptext) på **en röd knapp med ikon** (ux-bekr-farlig-knapp).
- Stora beslut (radera kontot): **en kod skickas till e-posten** (ux-bekr-stort-beslut). **Reserv:** skriv RADERA.
- Ångra-notisen syns **i cirka 5 sekunder** (ux-bekr-angra-tid). Se Tillgänglighet.
- Man varnas **inte** när man lämnar osparade ändringar (ux-bekr-lamna-sida).

### Varukorg och kassa
- Lägg i varukorgen: **notis och siffra vid ikonen** (ux-vagn-lagg-till). Varukorgen visas som **en ruta under ikonen** (ux-vagn-typ).
- Fortsätt handla: **sekundärknapp under** Till kassan (ux-vagn-fortsatt-handla). Ta bort: **papperskorgsikon** (ux-vagn-ta-bort).
- Fri frakt: **förloppslinje** (ux-vagn-fri-frakt). Förslag visas **efter knappen Till kassan** (ux-vagn-forslag). Summering: **totalt och moms** (ux-vagn-summering).
- Kassan är **en sida där avsnitten öppnas i tur** (ux-kassa-uppbyggnad). Man **väljer att logga in eller handla som gäst** (ux-kassa-gast), och konto erbjuds **på tack-sidan** (ux-kassa-skapa-konto).
- Adress: **ett fält med adressförslag** (ux-kassa-adress). Betalsätt: **ett öppet val och resten hopfällda** (ux-kassa-betalsatt).
- **En rad med lås under köpknappen** (ux-kassa-trygghet). Köpknappen säger **"Slutför köp"** (ux-kassa-kopknapp). Rabattkod är **hopfälld: "Har du en rabattkod?"** (ux-kassa-rabattkod). Villkoren godkänns med **en kryssruta före knappen** (ux-kassa-villkor).

### Inloggning
- **Länk via e-post som standard och lösenord som val** (ux-login-metod). **E-post först, sedan lösenord** (ux-login-steg).
- **Ögonikon i fältet** för att visa lösenordet (ux-login-visa-losenord). **"Glömt lösenord" under fältet till höger** (ux-login-glomt).
- Skapa konto: **en textlänk under knappen** (ux-login-skapa-konto). När länken är skickad visas **adressen och "Skicka igen"** (ux-login-lank-skickad).
- Lösenordskrav: **en rad text under fältet** (ux-login-losenordskrav).

### Kontakt
- Kontaktsidan visar **formuläret med kontaktuppgifterna bredvid** (ux-kontakt-vagar).
- Formuläret har **namn, e-post, telefon, ärende och meddelande** (ux-kontakt-formular-langd). Telefonfältet öppnar sifferknapparna på mobil (`type="tel"`, ux-mobil-tangentbord).
- **Svarstid och öppettider vid varje kontaktväg** (ux-kontakt-svarstid). På mobil finns **en knapp: "Ring oss"** (ux-kontakt-telefon-mobil). Adressen har **en liten karta bredvid** (ux-kontakt-karta).
- **En rund kontaktknapp nere till höger** (ux-kontakt-fast-knapp). En chatt är **en bubbla utan automatiskt meddelande** (ux-kontakt-chatt).

### Uppmaningar (CTA)
- **En primärknapp per sektion** (ux-cta-antal). **Reserv:** en primär och en sekundär.
- **Ingen knapp i headern**, bara menylänkar (ux-cta-header).
- Knappen står **under texten, vänsterställd** (ux-cta-plats-sektion). **Reserv:** centrerad.
- På desktop följer huvudknappen med **i en list längst ner** när man scrollar (ux-cta-folj-med). På mobil gör den det inte (ux-mobil-fast-knapp). Om huvudknappen upprepas längre ner är fritt (ux-cta-upprepa).

### Priser och paket
- Visa **från-pris** (ux-pris-synligt). **Reserv:** fast pris.
- Paket på desktop: **flikar med ett paket i taget** (ux-pris-paket-layout). **Reserv:** kolumner. På mobil: **staplade** (ux-pris-mobil).
- **Tre paket**. Det rekommenderade har **mörk bakgrund**, och **bara det har en primärknapp** (ux-pris-antal-paket, ux-pris-rekommenderat, ux-pris-knappar).
- Månads- och årspris växlas med **ett reglage** (ux-pris-period). Moms växlas med **privat / företag** (ux-pris-moms).
- Detaljjämförelse: **en länk, "Jämför alla funktioner"** (ux-pris-jamfor).

### Hero och startsida
- Heron har **rubrik, en mening och ett sökfält**, med **texten på bilden** och **hela skärmens höjd** (ux-hero-innehall, ux-hero-undertext, ux-hero-text-och-bild, ux-hero-hojd). **Reserv:** cirka två tredjedelar av höjden, eller bara rubrik och knapp.
- Mobil: **texten på bilden** (ux-hero-mobil).
- **Inget under knappen eller fältet** och **ingen scrollpil** (ux-hero-under-knapp, ux-hero-scrolltips). Justeringen är fri (ux-hero-justering).
- Startsidan har **sex till sju block** (ux-start-langd). Ordningen, vad som kommer efter heron, var omdömen ligger och hur sidan slutar är fritt (ux-start-*).

### Innehåll och vanliga frågor
- Tjänstesidor är **utförliga med mellanrubriker** (ux-innehall-mangd). Långa texter kortas med **en länk till en egen sida** (ux-innehall-korta-ner).
- Fördelar visas som **en punktlista** (ux-innehall-fordelar). Se konflikten om bockar.
- Vanliga frågor: **dragspel** med **första frågan öppen**, **en öppen i taget**, ikonen **till höger** och inget sökfält (ux-faq-typ, ux-faq-forsta-oppen, ux-faq-flera-oppna, ux-faq-ikon-sida, ux-faq-sok). Innehållsförteckning är fritt (ux-innehall-innehallsforteckning).

### Mobil
- Val och detaljer öppnas i **ett bottenark** (ux-mobil-panel). **Reserv:** en dialog i mitten.
- Bilder bläddras genom att **svepa, med prickar under** (ux-mobil-bildbladdring).
- I listor är **hela raden** tryckyta (ux-mobil-tryckyta).
- Vad som syns ovanför vecket och hur bild och text staplas är fritt (ux-mobil-ovan-vecket, ux-mobil-stapling).

### Popups och kakor
- Nyhetsbrev: **en dialog i mitten**, **efter en stund på sidan**, ingen popup när besökaren är på väg att lämna och **bara ett kryss** för att stänga. På mobil är det ett bottenark (ux-popup-nyhetsbrev, ux-popup-tidpunkt, ux-popup-lamna, ux-popup-stang, ux-popup-mobil).
- Kakor: **en ruta i hörnet**. Godkänn är primär och Neka sekundär, med **reglage direkt i rutan**, **två meningar och en länk**, och valet ändras via **en länk i sidfoten** (ux-cookie-*). **Härlett:** rutan sitter nere till vänster, så att den inte krockar med kontaktknappen nere till höger.

### Länkar
- Länkar till andra webbplatser öppnas **i en ny flik med en ikon** som visar det (ux-lank-ny-flik).
- Länkar till filer visar **filtyp och storlek**: "Prislista (PDF, 240 kB)" (ux-lank-filer).

### Fält och formulär (UX-delen)
- **Exempeltext inne i fältet** (ux-exempel-platshallare). Etiketten står ändå alltid synlig utanför fältet. Exemplet ersätter inte etiketten.
- **Förifyllt där det går, och det går att ändra** (ux-exempel-forifyllt).
- **"(valfritt)" på valfria fält**, ingen stjärna (ux-exempel-obligatoriskt).
- Fel: visas **när man lämnar fältet**, **bara vid fälten**, vyn **hoppar till första felet**, meddelandet **säger vad man ska göra** och **allt ligger kvar** (ux-fel-tidpunkt, ux-fel-flera, ux-fel-forflyttning, ux-fel-formulering, ux-fel-bevara).
- Skicka är **grå tills allt är rätt ifyllt** (ux-fel-inaktiv-knapp). Se Tillgänglighet.

### Laddning och notiser
- Listor laddar med **ett skelett i listans form** (ux-ladd-lista). Bilder laddar med **en suddig förhandsbild** (ux-ladd-bilder).
- Korta notiser visas **nere i mitten** på desktop och **längst upp** på mobil (ux-notis-plats-desktop, ux-notis-plats-mobil). Flera notiser **slås ihop med antal** (ux-notis-flera).
- Efter sparande: **knappen blir "Sparat ✓"**, med en ritad bock (ux-notis-typ, sy-emoji-status).

### Text och tilltal (microcopy)
- **Du**, inte ni (ux-mc-du-ni).
- Knapptext i **neutral form**: "Boka tid", inte "Boka min tid" (ux-mc-knapp-person).
- Fältetiketter är **korta substantiv**: "E-post" (ux-mc-etiketter).
- Länktext är **beskrivande**: "Se alla priser", inte "Klicka här" (ux-mc-lanktext).
- Systemfel har **en lättsam ton**, men fältfel säger alltid vad man ska göra (ux-mc-fel-ton, ux-fel-formulering).
- En tom lista **förklarar och visar nästa steg** (ux-mc-tomt). Bekräftelser är **sakliga** (ux-mc-bekraftelse). **Reserv:** korta och glada.

---

## 6. Övrigt

### Tillgänglighet (WCAG 2.2 AA gäller alltid, även när ett svar pekar åt ett annat håll)
- Fokus: **en diskret ring** (ux-a11y-fokus). Quizet visade 1 px i 45 % varumärkesfärg. Det klarar inte kontrastkravet 3:1 (1.4.11), så **beslut:** en ring på 2 px i full varumärkesfärg med 2 px avstånd, som bara visas vid `:focus-visible`. Den är fortfarande diskret.
- Hjälptext och grå text: **mörkgrå med hög kontrast**, minst 4,5:1 och helst över 7:1 (ux-a11y-kontrast).
- Ikonknappar ska ha **ikon och text** (ux-a11y-ikonknappar). Undantagen är sidhuvudets åtgärder, tabbaren och menyknappen, som är bara ikon (sy-nav-header-hoger, sy-nav-tabbar, sy-nav-menyknapp). De ska alltid ha `aria-label`.
- Textstorlek: inga egna knappar, webbläsarens zoom räcker (ux-a11y-textstorlek). Layouten ska klara 200 % zoom och 320 px bredd.
- Rörelse: fritt enligt beställaren (ux-a11y-rorelse), men `prefers-reduced-motion` respekteras ändå. Svävande ikoner, puls och automatiskt bildspel stängs av där.
- Automatiskt bildspel "utan kontroller" (ux-karusell-auto) bryter mot 2.2.2. **Beslut:** det byter bild automatiskt men pausas vid hover och fokus, har en liten pausknapp och står stilla vid reducerad rörelse.
- Grå skicka-knapp tills allt är klart (ux-fel-inaktiv-knapp): använd `aria-disabled="true"` i stället för `disabled`, så att knappen går att nå. Visa en rad som säger vad som saknas ("Fyll i e-post för att skicka"), och visa felen vid fälten om någon ändå trycker.
- Ångra-notis på 5 sekunder (ux-bekr-angra-tid): tiden pausas vid hover och fokus, och samma ångra-möjlighet ska gå att nå på annat sätt (2.2.1).
- Textlänkknappar utan understrykning är bara tillåtna utanför löptext. I löptext är länkar alltid understrukna (pi-lank-lopande).
- Klickytor är minst 24 × 24 px (2.5.8). Ikonknappar har 40 px (sy-storlek-klickyta) och 44 px på mobil (**härlett** ur sy-storlek-mobil).

### Färg och tokens
- **Inga paletter i quizet, med avsikt.** Varumärkesfärgen kommer från kunden. Den används i primärknappar, textlänkar, valda chips, karusellknappar, progress, rubrikprick och citatlinje.
- Mörkt (textfärg eller varumärkets mörkaste ton) används för sekundärkontur, badges, tooltip och rekommenderat paket.
- Hover blir cirka 50 % mot svart och nedtryckt cirka 62 % mot svart (kn-hover-styrka, kn-tryck-typ).
- Tonade ytor: 12 % varumärkesfärg mot vitt för plattor och taggar (sy-platta-ton) och 16 % för en tonad sekundärknapp (kn-sek-tonad-styrka).
- Status: egen färg per status (sy-farg-status). **Standard tills beställaren svarat:** ok #1E7A45, varning #9A5B00 och fel #B3261E, med toner #E3F1E8, #F8EEDC och #FBE9E7 (från quizets base.css och pi-et-status).
- Gult används bara i betygsstjärnor (sy-sym-stjarna-farg). Rött används bara för fel, rabattpris och farliga handlingar.

### Rörelse
- Knappens bakgrund byts på 100 ms (kn-hover-fart). Pilar glider på 200 ms (pi-hv-hastighet). Ikonanimationer tar 0,6 s (sy-anim-hastighet).
- Konturknappens fyllning tonar in (kn-hover-fyllning). Chevronen i en rullgardin vrids 180° (pi-drag-rorelse). Plus vrids 45° till kryss (pi-drag-oppet).

### Standard tills beställaren svarat (de obesvarade delarna)
Dessa delar finns i quizet men är inte besvarade. Använd värdena tills svaren kommer, och byt dem då.

- **Typsnitt:** Inter 400/500/600, en familj och ingen serif tills vidare. Ett mono-typsnitt används inte.
- **Fält och kontroller:** fält 52 px höga. Enradiga fält är pill (**härlett** ur kn-rund-mot-falt "Båda pill"). Textarea har 16 px rundning. Vit yta och 1 px kant i #858A90, som klarar 3:1. Etiketten står ovanför i 14 px och vikt 600, med 6 px till fältet. Kryssrutor 20 px med 4 px rundning. Radioknappar 20 px. Switch 44 × 24 px.
- **Ytor, kort och former:** kortradie 16 px, ingen skugga, en vit yta på ljusgrå sida eller en 1 px linje. Bilder i 4:3 eller 3:2. Maxbredd 1200 px. Sidomarginal 16 px på mobil och 32 px på desktop. Avstånd i 4 px-steg: 4, 8, 12, 16, 24, 32, 48, 64 och 96. Skugga bara på det som svävar: dialoger, menyer och den fasta listen.
- **Navigering och menyer:** header 72 px på desktop och 60 px på mobil, vit med 1 px linje nertill. Logga till vänster, textlänkar (sy-nav-toppmeny) och ikoner till höger. Aktiv sida markeras med vikt 600 och 2 px linje under. Mobilmenyn är en panel i helskärm. Sidfoten har länkar med prick emellan (pi-avd-vertikal) och kakinställningar (ux-cookie-andra-val).
- **Lägen och återkoppling:** fokusring som ovan. Inaktiva element har 40 % opacitet (härlett ur sy-lage-inaktiv). Laddning i knapp: texten byts till "Skickar …" och knappen behåller bredden. Toast med mörk yta, vit text och 12 px rundning (som tooltipen). Dialog med 16 px rundning, högst 480 px bred och mjuk skugga.

---

## Konflikter och hur de lösts

1. **Knapptext: verb och sak eller bara verb.** Svaret kn-textlangd valde "Skicka förfrågan" och valde bort "Skicka". Svaret ux-mc-knapp-ordklass valde "Skicka" och valde bort verb och sak. **Beslut:** verb och sak ("Boka tid", "Slutför köp", "Ja, ta bort"), eftersom det stöds av kn-textlangd, ux-mc-knapp-person, ux-kassa-kopknapp och ux-bekr-knapptext. Ett ensamt verb är okej när saken redan står i rubriken precis ovanför.
2. **Pilens tjocklek i knappen.** kn-ikon-linje valde 2,5 i viewBox, vilket blir cirka 1,9 px renderat i en 18 px ikon. pi-tj-knapp valde 1,5 px renderat, med 2 px som reserv. sy-linje-knapp valde 2 px renderat. **Beslut:** 2 px renderat.
3. **Pilens rörelse i knappen vid hover.** kn-hover-pil valde 6 px, men pi-hv-knapp valde ingen rörelse. pi-hv-skaft valde "står still" i en länk, men pi-hv-lank valde 4 px för samma typ av länk. **Beslut:** pilarna rör sig, eftersom majoriteten av svaren pekar dit (pi-hv-lank, pi-hv-tillbaka, pi-hv-kort, pi-hv-karusell, pi-hv-understrykning och kn-hover-pil). Det blir 6 px i knappar och 4 px i länkar.
4. **Vilken knapp i ett par som har pil.** kn-par-ikon valde bara primären, pi-knapp-sekundar bara sekundären. **Beslut:** bara primären, med stöd av kn-sek-ikon, kn-ikon-plats och sy-knapp-primar.
5. **Ikonens färg i en fylld knapp.** kn-ikon-farg valde samma som texten, sy-knapp-ikonfarg valde lite ljusare. **Beslut:** samma som texten, eftersom det stämmer med sy-farg-knapp2 och mönstret att ikoner har textens färg.
6. **Pilens avstånd i en textlänk.** kn-ter-pil-avstand valde 4 px, pi-tj-avstand valde 8 px med 4 px som reserv. **Beslut:** 4 px CSS-avstånd. Pilens egen luft i 24-rutan gör att det syns som cirka 7–8 px, så båda svaren tillgodoses.
7. **Sekundärknappens grundform.** kn-sek-typ valde kontur, men frågorna om specifika ytor gav tonad (vit yta), vit utan kant (ljusgrå yta) och vit kontur (foto). **Beslut:** det mest specifika gäller per yta. Konturen är standard på övriga ytor.
8. **Dragspelets ikon.** pi-drag-ikon valde chevron ner. pi-drag-oppet och sy-lage-utfall valde plus som vrids till kryss, och pi-drag-oppet valde bort "chevron vänds uppåt". **Beslut:** dragspel får plus till kryss. Chevron ner med 180° vridning används för rullgardiner och "Visa fler" (pi-rull-ikon, pi-drag-rorelse, pi-vm-form).
9. **Bockar i fördelslistor.** sy-lista-markor valde punkt och valde bort alla bockar. ux-innehall-fordelar valde "punktlista med bockar". sy-lista-olika valde en egen ikon per rad. **Beslut:** punkt som standard, en egen linjeikon per rad när raderna har olika innehåll, och bock bara i listor över vad som ingår, med grått kryss för det som inte ingår.
10. **Stegmarkörer.** sy-siffra-form, sy-siffra-fyllning, sy-siffra-storlek och sy-siffra-format fick "Ingen av dem" på en lodrät lista utan linje. pi-sg-lodrat valde cirklar med linje. **Beslut:** den lodräta listan har 28 px cirklar med linje. Den vågräta stegvisaren har bara siffran (pi-sg-form). Formulärflödet har text och stegnamn (ux-flode-indikator). Det är tre olika komponenter.
11. **Kortsignal.** pi-kh-signal valde "Läs mer →" och valde bort pil i hörnet, men pi-kh-detalj valde en diagonal pil ↗ i hörnet. **Beslut:** "Läs mer →" är standard, och hörnpilen är reserv för kort utan textlänk.
12. **Extern länk.** kn-ikon-extern valde diagonal pil ↗, men sy-sym-extern och pi-extern-ikon valde pil ut ur ruta och valde bort den diagonala pilen. **Beslut:** knappar har ↗ och länkar och ikoner har pil ut ur ruta, eftersom sammanhangen skiljer sig.
13. **Räknare på varukorgen.** pi-bd-form valde en prick, men sy-nav-markning valde siffra bredvid ikonen och valde bort pricken. **Beslut:** siffra bredvid ikonen, eftersom den står som andrahandsval i pi-bd-form och stöds av pi-bd-noll, pi-bd-stora och ux-vagn-lagg-till. Pricken används för notiser (pi-bd-notis).
14. **Betygsstjärnans form och halva betyg.** sy-sym-stjarna-form valde rundade uddar, men pi-sj-form valde smala, långa uddar och valde bort rundade spetsar. sy-sym-stjarna-halv valde en halvfylld stjärna, men pi-sj-halv valde avrundning. **Beslut:** smala, långa uddar med rundade linjeskarvar som övriga ikoner. Betyget visas som **en stjärna och en siffra**, "★ 4,8 · 120 omdömen", eftersom det är det gemensamma andrahandsvalet. Rader med fem stjärnor finns bara i omdömesavsnitt och använder halvfyllda stjärnor.
15. **Skelettets rörelse.** pi-sk-rorelse valde mjuk puls och valde bort glans. ux-ladd-skelett-rorelse valde skimmer och valde bort puls. **Beslut:** mjuk puls, eftersom skelettgruppen har det mest detaljerade underlaget. Skimmer är tillåtet om ett befintligt system redan använder det. Beställaren bör avgöra.
16. **"Visa fler" eller "Ladda fler".** pi-vm-text valde "Ladda fler" och valde bort "Visa fler". ux-sid-visa-fler-text valde "Visa fler". **Beslut:** "Visa fler", med stöd av ux-sid-typ och pi-vm-form. Beställaren bör avgöra.
17. **Avkortad text.** pi-tr-slut valde att tona ut och valde bort tre punkter. pi-vm-langtext valde tre punkter och en länk. **Beslut:** med en länk används "… Läs mer", och utan länk tonas texten ut.
18. **Karusellens pilar.** ux-karusell-kontroller valde pilar på sidorna, men pi-kar-placering valde under raden i mitten och valde bort pilar över bilderna på sidorna. **Beslut:** under raden i mitten, eftersom det är den specifika frågan om placering.
19. **Nästa kort vid kanten.** ux-karusell-kant valde två hela kort, men pi-rl-ledtrad valde att sista kortet sticker ut. **Beslut:** en karusell med knappar visar hela kort. En svepbar rad utan knappar, oftast på mobil, låter sista kortet sticka ut.
20. **Hover på ikonknapp.** kn-hover-ikonknapp valde att ikonen mörknar och valde bort en grå rund bakgrund. sy-lage-hover valde en rundad fyrkantig platta. **Beslut:** en fristående ikonknapp utan yta mörknar. En ikonknapp i verktygsrad eller tabell får en tonad, rundad fyrkantig platta vid hover, med 10 px rundning som i quizet.
21. **Tabbarens linje.** sy-linje-tabbar valde 2,5 px. sy-lage-tabbar visade 1,75 px på inaktiva och 2,5 px på den aktiva. **Beslut:** 1,75 px inaktiv och 2,5 px aktiv, eftersom det tydliggör läget.
22. **Sök i headern.** ux-sok-placering valde bara ikon, sy-nav-sok valde ikon och ordet "Sök". **Beslut:** ikon och "Sök" på desktop, eftersom det också stöds av ux-a11y-ikonknappar. På mobil bara ikon.
23. **Skicka-knappen i sökfältet.** ux-sok-skicka valde en ikonknapp inne i fältet, pi-knapp-barapil valde textknappen "Sök". **Beslut:** knappen ligger inne i fältet och har texten "Sök". Förstoringsglaset står till vänster i fältet.
24. **Ikonknappar med text.** ux-a11y-ikonknappar valde ikon och text, men headerns åtgärder, tabbaren och menyknappen valdes som bara ikon. **Beslut:** det specifika gäller där. Annars har ikonknappar text.
25. **Progress som stapel eller ring.** pi-pb-cirkel valde ring, men stapelfrågorna och ux-vagn-fri-frakt utgår från en stapel. **Beslut:** ring för fristående framsteg och stapel i flöden och för fri frakt.
26. **Förklaringsikon.** pi-tt-utlosare valde i i cirkel, sy-sym-info-etikett valde frågetecken i grå cirkel och valde bort i i grå cirkel. **Beslut:** vid fältetiketter ? och annars i.
27. **Länktext "Läs mer".** ux-mc-lanktext valde beskrivande länktext och valde bort "Läs mer", men flera kortfrågor visade "Läs mer →". **Beslut:** skriv beskrivande, till exempel "Läs om takbyten →". Där det inte får plats står "Läs mer" med objektets namn som dold text för skärmläsare.
28. **Etikettens form och två etiketter.** pi-et-form valde hörnband, pi-et-flera valde under varandra och pi-et-inset 10 px, vilket gäller en pill. **Beslut:** hörnband för den första etiketten, och en eventuell andra flyttas till prisraden (reserv i pi-et-placering).

---

## Undvik

Detta valdes bort i quizet. "Ingen av dem" anges med (ingen av dem).

**Knappar**
- Gradient på knappar (kn-fyllning, kn-gradient-typ: ingen av dem för alla gradienttyper).
- Skuggor på knappar: hårfin, mjuk, hård eller i knappens färg (kn-skugga, kn-skugga-styrka och kn-skugga-ton: ingen av dem).
- Att knappen lyfts med skugga eller tonas vid hover. Knappen ska inte krympa eller få innerskugga när den trycks ner (kn-hover-typ, kn-tryck-typ).
- Synlig kant eller ljus innerkant på fylld knapp (kn-kant).
- Konturknapp som primär (kn-fyllning). Nästan svart primärknapp (kn-farg-primar).
- Skarpa eller nästan skarpa hörn: 0, 2 och 4 px. Rundning som växer med storleken (kn-rund-oversikt, kn-rund-skalning).
- Knapp inne i fältet eller sammanfogad med fältet (kn-hojd-falt).
- Knapptext som bryts eller kortas med … (kn-textbrytning). Fet (700) eller extrafet (800) knapptext (kn-vikt).
- Pil i cirkel eller ruta i knappen. Chevron, diagonal pil eller lång tunn pil som knapppil (kn-ikon-behallare, kn-ikon-typ, pi-knapp-pildel).
- Sekundär som är mindre eller lägre än primären (kn-par-storlek, kn-sek-hojd). Grå sekundärknapp (kn-sek-typ). Pil på sekundären (kn-sek-ikon).
- Spökknapp på foto i frostat glas eller halvgenomskinligt mörk (kn-sek-spok-foto). Hover som fyller spökknappen vit, halvvit eller mörk (kn-hover-foto: ingen av dem).
- Ordet "eller" mellan knappar (kn-par-eller). Tre knappar i rad (kn-par-tredje).
- Understruken textlänkknapp, även vid hover. Versaler i textlänkar (kn-ter-understrykning, kn-ter-versaler).
- Knapp i headern (ux-cta-header).

**Ikoner och symboler**
- Fyllda glyfikoner, tvåfärgade ikoner och platta ikoner som grundstil (sy-stil-grund). Fyllda ikoner både med utskurna detaljer och som solid siluett (sy-stil-glyph-detalj: ingen av dem). Accentfärg i ikoner (sy-stil-tvafarg: ingen av dem).
- Raka eller förlängda linjeändar och spetsiga hörn (sy-ande-andar, sy-ande-paket).
- Linjer på 1 px eller 1,25 px (sy-linje-24, sy-linje-24-fin, sy-linje-16, sy-linje-20). Linje som alltid är 2 px eller som skalar proportionellt (sy-linje-skala).
- Handritade ikoner, ikoner med öppna former och glapp och ikoner med skugga (sy-sprak-geometrisk, sy-sprak-oppna, sy-sprak-skugga).
- Plattor bakom ikoner: rundad fyrkant, fyrkant och blob (sy-platta-form). All rundning på fyrkantiga plattor (sy-platta-rundning: ingen av dem). Plattor i funktionsrutnät och kontaktlistor (sy-rut-platta, sy-platta-kontakt).
- Ikoner i varumärkesfärg bredvid text, i listor, i sidhuvudet och i rutnät (sy-farg-*). Gråa bockar. Ljusgrå sekundärikoner (sy-farg-gra).
- Ikon före rubriker (sy-emoji-rubrik). Ikoner i toppmenyn (sy-nav-toppmeny).
- Emoji i listor, rutnät, rubriker, knappar och meddelanden (sy-emoji-*).
- Bock i cirkel i punktlistor, oavsett cirkelstil (sy-lista-bockcirkel: ingen av dem). Samma bock på alla rader i en fördelslista (sy-lista-olika). Rött kryss i jämförelser (sy-lista-negativ).
- Siffermarkörer i lodräta steglistor utan förbindelselinje (sy-siffra-form, sy-siffra-fyllning, sy-siffra-storlek och sy-siffra-format: ingen av dem).
- Tratt som filterikon, strömknapp för logga ut, initialer i cirkel för inloggad, ordet Rensa och texten Visa/Dölj (sy-sym-filter, sy-sym-logga-ut, sy-sym-inloggad, sy-sym-rensa, sy-sym-oga).
- Sociala ikoner i nätverkens färger eller på platta (sy-soc-farg, sy-soc-form).
- Stilla ikoner i funktionsrutnät, ikonanimationer som är snabbare än 0,3 s och byten utan övergång vid meny, bock och hjärta (sy-anim-*).

**Pilar och småbitar**
- Chevron ›, triangel ▸, dubbel chevron », diagonal pil och lång tunn pil efter länkar och i listor (pi-form-lasmer, pi-form-lista, pi-form-kort). Tankstreck mellan platser (pi-form-frantill).
- Typsnittets tecken → som pil (pi-form-tecken). Pil i ring, cirkel eller ruta (pi-form-ring, pi-drag-platta, pi-kh-platta).
- Understruken pil-länk, pil i löptext och pil före text (pi-lank-understrykning, pi-lank-lopande, pi-lank-placering).
- Karusellknappar som är vita med skugga, i rundad fyrkant eller som konturknapp (pi-kar-form). Pilknappar över bilderna (pi-kar-placering). Nedtonad eller dold bakåtknapp (pi-kar-inaktiv). Chevrons i karusellen (pi-kar-pil).
- Triangel i rullgardin och dragspel. Avdelare eller grå ruta vid rullgardinens pil (pi-rull-ikon, pi-rull-avskild, pi-drag-ikon).
- Chevron eller ring vid Tillbaka. Tillbaka i länkfärg (pi-tillbaka-form, pi-tillbaka-farg).
- Pil → eller punkt i brödsmulor (pi-brod-tecken). Linje och pilformade block i stegflöden (pi-steg-riktning).
- Etiketter som pill, rundad fyrkant eller med skarpa hörn på bilder (pi-et-form). Fyllda etiketter och konturetiketter (pi-et-stil). Versaler i etiketter (pi-et-versaler). Ikon eller prick i etiketter (pi-et-ikon). Etikett uppe till höger (pi-et-placering).
- Statusprick för "Öppet nu", oavsett storlek, puls eller textfärg (pi-st-puls, pi-st-storlek och pi-st-text: ingen av dem). Röd, grå eller orange prick för stängt (pi-st-stangt).
- Röda och gröna räknare (pi-bd-farg). Räknare utanför hörnet. Räknare utan ring (pi-bd-position, pi-bd-ring). Exakta stora antal (pi-bd-stora).
- Chips med 4 eller 8 px rundning, chips med bock och antal i bubbla (pi-chip-form, pi-chip-bock, pi-chip-antal). Chips som radbryts på mobil (pi-chip-mobil).
- Streckade linjer och punktrader som avdelare. Tydliga 2 px avdelare (pi-avd-stil, pi-avd-tjocklek). Zebrarandiga tabeller (pi-avd-zebra). "ELLER" i versaler och "eller" i cirkel (pi-avd-eller).
- Punkt, snedstreck och tankstreck mellan metadata (pi-meta-tecken). Metadata ovanför rubriken (pi-meta-placering).
- Synliga rullningslister i vågräta rader (pi-rl-synlig). Rader som tonas ut i kanten (pi-rl-ledtrad).
- Vit tooltip med skugga. Tooltip utan pil eller med 2 px rundning (pi-tt-farg, pi-tt-pil, pi-tt-rundning). Prickad understrykning som utlösare (pi-tt-utlosare).
- Engelska citattecken och gåsögon (pi-ct-tecken).
- Överstrykning, handritad båge, tjock understrykning och färgade ord i rubriker (pi-mk-stil, pi-mk-hojd, pi-mk-form, pi-mk-tjocklek och pi-mk-mangd: ingen av dem).
- Kort streck under eller ovanför rubriker. Detalj före överrubrik (pi-ac-rubrik, pi-ac-overrubrik).
- Plus i kortets hörn (pi-kh-detalj).
- Glans som sveper över skelett (pi-sk-rorelse). Spinner i stället för skelett (pi-sk-detalj, ux-ladd-lista).
- Antalsväljare med ram runt, som pill med kant eller med separata runda knappar (pi-kv-form). Pilar upp och ner (pi-kv-tecken).
- Progressbar på 2, 4 eller 12 px, med raka eller bara lätt rundade ändar och procent inuti stapeln (pi-pb-*).

**Text**
- H1 i 500, 700 eller 800. H1 i Varje Ord Stort eller VERSALER (tx-h1-vikt, tx-h1-versaler).

**UX-mönster**
- Numrerade cirklar och förloppslinje som stegindikator i formulärflöden. Indikatorn överst (ux-flode-indikator, ux-flode-indikator-plats). Klickbara steg (ux-flode-klickbara-steg). Fokusläge med bara logga (ux-flode-meny).
- Ett brett sökfält i headern (ux-sok-placering). Fält som växer ut i headern (ux-sok-oppna).
- En sidopanel med filter till vänster på desktop (ux-filter-placering). Filter som slår igenom direkt (ux-filter-direkt). Kryssrutor och chips som filterval (ux-filter-kontroll). Dolda val som ger noll träffar (ux-filter-noll-traffar).
- Sidnumrering i rutor och "Sida 2 av 8" (ux-sid-stil). En väljare för antal per sida (ux-sid-per-sida). En rund till toppen-knapp nere till höger (ux-sid-till-toppen).
- Karusell med pilar som standard. En bit av nästa kort i karusellen (ux-karusell-eller-rutnat, ux-karusell-kant).
- Förvalda alternativ (ux-val-forvalt). Rullgardin för 2–4 val. Kryssrutor för flerval. Reglage eller kryssruta för ja/nej (ux-val-*).
- Att ta bort direkt med Ångra i stället för att fråga först. "OK" och "Ja" på bekräftelseknappen (ux-bekr-ta-bort, ux-bekr-knapptext).
- En utdragslåda för varukorgen (ux-vagn-typ). Att gå direkt till varukorgen när man lägger något i den (ux-vagn-lagg-till).
- Konto som krav. Kryssruta för att skapa konto i kassan (ux-kassa-gast, ux-kassa-skapa-konto). Separata adressfält (ux-kassa-adress). "Köp nu" och "Lägg beställning" (ux-kassa-kopknapp).
- Styrkemätare och checklista för lösenord (ux-login-losenordskrav).
- Betyg, fördelslista och logotyp-platshållare under knappen i heron (ux-hero-under-knapp). Text bredvid eller ovanför bilden i heron (ux-hero-text-och-bild).
- Popup direkt när sidan öppnas. Popup med hjälp när besökaren är på väg att lämna. "Nej tack"-länkar och "Inte nu"-knappar (ux-popup-*).
- Stor dialog i mitten och smal list för kakor. Lika knappar för Neka och Godkänn. Godkänn plus bara en länk till inställningar (ux-cookie-*).
- Stjärna på obligatoriska fält (ux-exempel-obligatoriskt). Felmeddelanden medan man skriver. En felruta överst. Att fält med fel töms (ux-fel-*).
- En spinner i mitten och texten "Laddar …" (ux-ladd-lista). Grå platta som bildplatshållare (ux-ladd-bilder).
- Notiser uppe till höger (ux-notis-plats-desktop). En notis som ersätter den förra (ux-notis-flera).
- Ni-tilltal och jag-form ("Boka min tid"). Ursäktande eller tekniska felmeddelanden. "Klicka här". Etiketter som frågor ("Vad är din e-post?") (ux-mc-*).
- Kontaktknapp med text eller som flik i kanten. Chattbubbla med automatiskt meddelande (ux-kontakt-fast-knapp, ux-kontakt-chatt).

---

## Öppet

**Hela delar som inte är besvarade** (värdena ovan under "Standard tills beställaren svarat" gäller tills vidare):
- **Typsnitt**: rubrik- och brödtexttypsnitt, typsnitt som aldrig ska användas, siffror, mono, par och vikter per familj.
- **Fält och kontroller**: fältstil (fylld eller kant), form och storlek, etiketter, fokus, felläge, rullgardin, sökfält, kryssrutor, radioknappar, switchar, reglage, datumväljare, filuppladdning och lösenordsfält.
- **Ytor, kort och former**: rundning på kort och paneler, skuggor, kanter, kortets uppbyggnad, bildformat, text på bild, maxbredd, rutnät, avatarer, gradienter och mörkt läge.
- **Navigering och menyer**: headerns layout, höjd och bakgrund, aktiv sida, dropdown och megameny, sticky header, toppfält, mobilmeny, flikar, sidomeny och sidfot.
- **Lägen och återkoppling**: hover på annat än knappar, fokusstil i detalj, vald och aktiv, laddning i knapp och kort, lyckat, fel, varningar, toasts, dialoger, popover-menyer, tomma lägen, offline och sidövergångar.

**Delvis öppet:**
- **Textdetaljer**: bara H1:s vikt och skiftläge är bestämda. Ingress, brödtext, överrubriker, hjälptexter, bildtexter, länkar i text, priser, datum och tid, listor, betoning, text på foto och avstånd är inte frågade.
- **Färg**: inga palettfrågor, med avsikt. Varumärkesfärgen tas fram per kund. Statusfärgernas exakta värden är standard.

**Konflikter som beställaren bör avgöra** (se Konflikter): knapptext (1), skelettets rörelse (15), "Visa fler" eller "Ladda fler" (16), stjärnans form och halva betyg (14) och dragspelets ikon (8).

**Svar som krockar med WCAG och har justerats** (se Tillgänglighet): den diskreta fokusringen, bildspel utan kontroller, den grå skicka-knappen och ångra-notisen på 5 sekunder.
