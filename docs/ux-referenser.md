# UX-referenser

Referensbank för agenten `ux-designer` (`.claude/agents/ux-designer.md`).

**Urvalet är gjort av beställaren, inte av agenten.** 80 sajter bedömdes i två omgångar i november 2026: 29 godkändes och 47 underkändes. Facit är SJ.se och Lantmännen. Typsnitt, färger och radier är uppmätta i renderad DOM med Playwright. Där en sajt blockerar automatiska besök står det "ej uppmätt".

---

## Smaken i en mening

**Varmt, mänskligt och fotodrivet, med uppgiften i bilden.** Ett stort foto av landskap eller människor i ett vardagsögonblick, och bokningen eller sökningen direkt på eller under fotot. Lugnt och utan kampanjbrus.

## Det starkaste mönstret: resor och turism

Alla 14 rese- och turismsajter som bedömdes på allvar godkändes, utom NS och Airbnb. Godkända: SJ, Vy, DSB, VR, Öresundståg, Norrtåg, Nightjet, Destination Gotland, Viking Line, Hurtigruten, Svenska Turistföreningen, SkiStar, Visit Sweden och Visit Norway. Formeln är densamma överallt:

1. **Ett fullbreddsfoto** av landskap, stad eller resenärer.
2. **En hälsning eller fråga som rubrik** ("Hej! Vart vill du resa?", "Hei, hvor vil du reise?", "Här börjar din resa i Norrtågland").
3. **Bokningsrutan på eller direkt under fotot** med Från/Till, datum och resenärer.
4. **Säsongsinnehåll med stora foton** under bokningen (julbord, skidsäsong, julmys).

NS och Airbnb underkändes. NS är platt gult med UI-paneler, och Airbnb har sökning i app-stil utan foto.

## Vad de godkända har gemensamt

1. **Fotot bär sidan.** Landskap (Lantmännen, Visit Sweden, Öresundståg, Norrtåg) eller människor i ett varmt ögonblick: mormor och barn vid frukostbordet (Skånemejerier), kvinna med kaffekopp (Löfbergs), vänner i kyla (Woolpower), en familj i soffan (Allbirds).
2. **Uppgiften ligger i bilden.** Bokning, sökning eller en tydlig knapp direkt på fotot.
3. **Färgen får vara stark, men den ligger på ett foto.** Grönt (SJ, Vy, VR, Arla, Lantmännen), rött (DSB, Öresundståg, Viking Line, SkiStar), blått (Skånemejerier, Valio, Destination Gotland) och lila (Löfbergs) är alla godkända. Avgörande är att färgen används i knappar, logotyp och detaljer, inte som stora platta fält.
4. **Varm grund.** Varm off-white eller sand bakom innehållet (Lantmännen `#F4EEE6`, Bolia `#F7F4EA`, Skånemejerier `#F1EFEA`, Valio `#F7F3ED`, SkiStar `#F1F0EE`).
5. **Lugnt.** Få budskap per skärm, ingen procentcirkel och inget Black Week-block i hero.

## Vad de underkända har gemensamt

| Mönster | Underkända exempel |
|---|---|
| **Kampanj i hero.** Black Week, procent och rabattkoder tar över, även när fotot är bra | Mio, Svenssons, Jotex, Rum21, Ferm Living, IKEA, Apoteket, Clas Ohlson, Nordic Nest |
| **Förpackningen som hjälte.** Produktbilder i reklamstil i stället för människor och mat i ett sammanhang | Pågen, Kungsörnen |
| **Platt app-UI.** Ikonrutor, flikar och kort utan bärande bild | Kry, Länsförsäkringar, NS, Kivra |
| **Skrikiga platta färgfält** | Wise, Oda, Mathem, ICA, Oatly, Tibber |
| **Kall lyx och tech-minimalism.** Produkt på grått eller svart | Apple, Polestar, Volvo Cars, Byredo, Estrid, Aesop, Arket, Muji, HAY |
| **Mörka eller konstnärliga foton**, tunn text och blogglayout | Norrøna, Nudie Jeans, Bjurfors, Röjk, Svenskt Tenn, Marimekko |
| **Bostad och inredning** har överlag underkänts. Bara Hemnet, Granit och Bolia godkändes | Svensk Fastighetsförmedling, Booli, Klippan Yllefabrik |

---

## Facit

### SJ: sj.se
- **System:** sj_sans. Svart `#000`, grön `#00AB3B` för handling, gul `#FFD700` för etiketter. Pill-knappar och 16 px kort. Rubriker 32 / 26 / 20 px.
- **Det som gör det:** Ett stämningsfoto (norrsken) och "Vart vill du resa?" med bokningen. Säsongsinnehåll med foto.

### Lantmännen: lantmannen.se
- **System:** LMSerif (700) för rubriker och LMSans för text. Grön `#1E6E37`, off-white `#F4EEE6`, varm svart `#201E1A`. Skarpa 2 px.
- **Det som gör det:** Ett fullbreddsfoto av en åker i motljus och en serifrubrik på 192 px, "Från jord till bord".

---

## Godkända: resor och turism

| Sajt | System (uppmätt) | Ta med |
|---|---|---|
| **Vy** vy.no | Vy Sans och Vy Display. Grön `#00685E`, mint `#CCEAE4`. Radie 18–30 px | "Hei, hvor vil du reise?" med Från/Till direkt under. Kampanjkort med stora foton |
| **VR** vr.fi | VR Sans och Suisse Intl. Grön `#00B451`, mint `#7AD6A3`. Pill | "Hej! Vart vill du resa?" med bokningen på fotot. Snabbval för vanliga sträckor under fälten |
| **Öresundståg** oresundstag.se | Gotham. Röd `#D72B14`. Radie 8–20 px och pill | Fullbredds landskapsfoto (kanal och grönska) med sökfältet "Hej! Vart vill du resa?" ovanpå |
| **Norrtåg** norrtag.se | Montserrat med ett skriptsnitt för ett ord. Marin `#002561`, orange `#FAA61A`. Radie 16 px | "Här börjar din resa i Norrtågland" på ett sjöfoto, med två knappar: Sök resa och Köp periodbiljett |
| **DSB** dsb.dk | via_office. Röd `#B41730`. Radie 8–16 px | "Find rejse og pris" ovanpå fotot. Trafikmeddelanden som stängbara rader |
| **Destination Gotland** destinationgotland.se | Archivo. Skifferblå `#375D75`, ljusblå `#EBF6FD`. Pill | Bokningspanel till vänster och ett vinterfoto av Visby med "Julmys på Gotland" och pris |
| **Viking Line** vikingline.se | Sharp Sans och Open Sans. Röd `#D90A08`. Radie 8–24 px | Flikar för Kryssning, Reguljär och Hotellpaket ovanpå fotot "Kryssning med julbord" |
| **Svenska Turistföreningen** svenskaturistforeningen.se | Ej uppmätt | "Friluftsliv för alla, sedan 1885" på ett fjällfoto, bokningsrad, sedan boendekort med eld, norrsken och skidåkare |
| **SkiStar** skistar.com | Nohemi och Open Sans. Röd `#BA0C2F`, varm `#F1F0EE`. Radie 8 px | Bokningsrad överst och säsongsnyheter med foto |
| **Visit Sweden** visitsweden.se | swedenSans. Gul `#FFDB00`, marin `#1A3050`. Pill | Fullbreddsfoto av en sjö i solnedgång med "Upplevelser i hela Sverige" och en enda knapp, "Välj en region" |
| **ÖBB Nightjet, Hurtigruten, Visit Norway** | Ej uppmätta | Godkända efter granskning direkt på sajten |

## Godkända: mat och dagligt liv

| Sajt | System (uppmätt) | Ta med |
|---|---|---|
| **Arla** arla.se | Arla InterFace och Arla Life. Grön `#02462F`, skiffer `#384241` | Riktiga människor i fullbreddsfoto. Recept med frågan som rubrik |
| **Skånemejerier** skanemejerier.se | Sofia Sans och Noto Sans. Blå `#003A80`, varm `#F1EFEA`. Radie 6–12 px | Mormor och barn vid frukostbordet med "Allt gott börjar nära". Mänskligt och nära |
| **Löfbergs** lofbergs.se | Brown Pro. Lila `#3C1053`, gul `#FFE378`. Pill | En kvinna med kaffekopp vid bokhyllan och "Vi går upp för ett bättre morgonkaffe!" |
| **Valio** valio.se | Valio Sans och Playfair Display. Marin `#002F6D`, varm `#F7F3ED`. Radie 16–24 px | Stora matfoton (lussebullar) och serifrubriker |
| **Systembolaget** systembolaget.se | Inter Variable och eget displaysnitt. `#262626`, mjuk grön `#C7E5CE` | Lugnet och det vänliga tilltalet |
| **Wasa** wasa.com | Ej uppmätt | Godkänd efter granskning direkt på sajten |

## Godkända: handel, friluftsliv och bostad

| Sajt | System (uppmätt) | Ta med |
|---|---|---|
| **Granit** granit.com | Euclid Circular B. Varmgrått `#E5E4E1`, skarpa 2 px | Rumsfoto med budskapet stort ovanpå. Produktnamn med material och mått |
| **Bolia** bolia.com | Cormorant och Montserrat. Beige `#F7F4EA`, vinröd `#57363B`. Skarpa 1–2 px | Varm beige grund, serifrubriker och möbler i riktiga rum |
| **Houdini** houdinisportswear.com | Helvetica. Varmt `#F1EFEA`. Skarpa 2 px | Fullbreddsfoto med Reuse, Rent och Repair som tre små knappar |
| **Allbirds** allbirds.com | Geograph. Sand `#E0DACF`. Pill | Livsstilsfoto i vardagsmiljö med rubrik och två knappar. Inte rabattpopupen |
| **Woolpower** woolpower.se | Gotham. Marin `#10293E`, rost `#AF3F2F`. Radie 3 px | Människor i kyla och "Redo för kylan?", sedan "Hitta rätt plagg för varje lager" |
| **Naturkompaniet** naturkompaniet.se | Egna typsnitt. Grön `#00421B`, mint `#E5ECE8`. Radie 4–8 px | Butiken som friluftsmiljö |
| **Hemnet, Klarna, Patagonia, Tierra** | Ej uppmätta (Klarna delvis: `#0B051D`, `#F9F8F5`, pill) | Godkända efter granskning direkt på sajten |

---

## Regler för agenten som följer av urvalet

- **Varje startsida börjar med ett stort foto** av landskap eller människor i ett varmt vardagsögonblick. Ingen startsida utan bild, och ingen produkt på grått.
- **Lägg uppgiften i bilden:** bokningsruta, sökning eller en tydlig knapp på eller direkt under fotot. För resor gäller formeln foto, hälsning som rubrik, bokning och säsong.
- **Varumärkesfärgen får vara stark** (grön, röd, blå eller annan), men bara i knappar, logotyp och detaljer. Grunden är varm off-white eller sand.
- **Inga kampanjer i hero.** Erbjudanden ligger längre ner som kort med foto, aldrig som procent-block överst.
- **Mat och produkter visas i användning**, med människor eller dukat bord, inte som förpackningsreklam.
- **Undvik mörka foton med tunn text.** Välj ljusa foton. Text på foto får mörkläggning nertill och kraftig vikt.

---

## Stillabbet: designregler (beställarens val, november 2026)

54 prover testades med samma exempelinnehåll så att bara stilen skilde. De här reglerna går före referenssajternas egna typsnitt och former. Lantmännen, Bolia och Valio är godkända för foto, färg och tilltal, men deras serifer och skarpa hörn ska inte användas.

| | Godkänt | Underkänt | Standardval |
|---|---|---|---|
| **Typsnitt** | Hanken Grotesk, Nunito Sans, Archivo, Montserrat + Source Sans 3, Bricolage Grotesque + Figtree, Manrope | Alla serif-par (Source Serif, Fraunces, Playfair, Cormorant, DM Serif, Libre Caslon, Newsreader, Lora) och Sofia Sans | Hanken Grotesk, 800 för rubriker |
| **Färger** | Skog och havre `#1D5B3A`/`#F6F1E9`, klargrön `#00873A`, åkergrön och linne `#1E6E37`/`#F4EEE6`, tallgrön `#00421B`, signalröd `#C8250F`, marinblå och havre `#003A80`/`#F1EFEA`, plommon och smör `#3C1053`/`#FFE378`, natt och rost `#10293E`/`#AF3F2F` | Fjordgrön och mint, tegelröd och kalk, skifferblå och is, sand och vinrött (dova och pastelliga) | Skog och havre |
| **Knappar** | Pill, rundad 8 px, stor rundad 12 px, med pil | Skarpa 0–2 px, versaler, tonad sekundär, sekundär som länk, skugga, full bredd | Pill, sekundär som konturknapp |
| **Fält** | Fylld utan kant, understruken | Tunn kantlinje på vit ruta | Fylld utan kant |
| **Hero** | Text på fotot med mörkläggning nertill, bokning som överlappar fotots kant | Ljus panel på fotot, delad layout, jätterubrik | Text på fotot |
| **Bokningsruta** | Panel i två kolumner, med flikar, ett sökfält med snabbval | Alla fält på en rad | Panel |
| **Kort** | Bild och text under, text på bilden, bild bredvid | (inget) | Bild och text under |

Beställarens egen kombination i "Testa ihop": Hanken Grotesk, skog och havre, pill, fylld utan kant, text på fotot, panel och bild med text under.
