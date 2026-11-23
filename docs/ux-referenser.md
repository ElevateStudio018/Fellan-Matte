# UX-referenser: ren, nordisk och säljande

Referensbank för agenten `ux-designer` (`.claude/agents/ux-designer.md`). Facit är **SJ.se** och **Lantmännen**. De 20 sajterna nedan har samma kvaliteter: en tydlig huvuduppgift, ett typsnittssystem, en handlingsfärg, ett formspråk och riktiga bilder.

Typsnitt, färger och radier är **uppmätta i renderad DOM** (Playwright, 1440 px, 23 november 2026), inte gissade. Innehållet var mitt i Black Week, så kampanjer kommer och går, men systemen ligger fast.

---

## Facit

| | SJ.se | Lantmännen |
|---|---|---|
| Roll | Tjänsten först | Varumärket och ursprunget |
| Typsnitt | sj_sans (eget), 16 px brödtext | LMSerif för rubriker, LMSans för text |
| Rubrikskala | 32 / 26 / 20 px (lugn) | 192 px hero, sedan 64 / 48 / 32 / 24 |
| Färg | Svart `#000`, grön `#00AB3B` för handling, gul `#FFD700` för etiketter | Grön `#1E6E37`, off-white `#F4EEE6`, varm svart `#201E1A` |
| Form | Pill-knappar, 16 px kort | 2 px, skarpt |
| Hero | "Vart vill du resa?" med bokningen direkt | Fullbreddsfoto och "Från jord till bord" |
| Bild | Riktiga resefoton | Riktiga landskap och mat, inga illustrationer |

---

## Tjänsten först (som SJ)

### 1. Vy: vy.no
- **System:** Vy Sans och Vy Display. Mörkgrön `#00685E`, mint `#CCEAE4` som yta, text `#2B2B2C`. Radie 30 px på fält och 18 px på kort.
- **Säljer genom:** Hälsningen "Hei, hvor vil du reise?" (40 px) har fälten Från och Till direkt under sig, med "Se trafikkstatus" som liten chip. Kampanjkort kommer först därefter.
- **Låna:** Reseplaneraren som hero. En tonad varumärkesfärg (mint) som yta i stället för grått.

### 2. NS: ns.nl
- **System:** NS Sans. Gul som varumärkesyta, blå `#0063D3` och `#003082` för handling, röd `#E2103D` bara för störningar. Radie 6 och 12 px.
- **Säljer genom:** "Plan je reis" är det första och största på sidan. Biljetter och tillägg kommer som snabbval under.
- **Låna:** Håll isär varumärkesfärg och handlingsfärg. Ytan får vara gul så länge knapparna alltid är blå.

### 3. DSB: dsb.dk
- **System:** via_office. Röd `#B41730` för varumärke och knapp, ljusa tonade ytor för meddelanden. Radie 8 och 16 px.
- **Säljer genom:** Rubriken "Find rejse og pris" (48 px) lovar priset redan i rubriken. Formuläret har Fra, Til, antal resenärer och "Søg rejse". Trafikmeddelanden ligger som stängbara rader överst, inte som popup.
- **Låna:** Ta med pris i uppgiftens rubrik. Visa driftinformation inline.

### 4. Airbnb: airbnb.se
- **System:** Airbnb Cereal. Text `#222`, sekundär `#6C6C6C`, en enda accent `#FF385C`. Sökfältet har 32 px radie och korten 8 px.
- **Säljer genom:** Ett segmenterat sökfält med Var, När och Vem, där den röda sökknappen är det enda färgade på skärmen. Inspiration kommer som flikar under.
- **Låna:** Reservera accentfärgen för den enda huvudhandlingen. Dela upp sökningen i användarens egna frågor.

### 5. Wise: wise.com
- **System:** Wise Sans för rubriker och Inter för text. Lime `#9FE870` och skogsgrön `#163300`. Alla knappar är pill.
- **Säljer genom:** Ett löfte i klartext: "Low fees. Lightning-fast. 100% transparent." Siffror med fotnot ("Over 70% arrive in 20 seconds¹"). En tydlig primärknapp ("Open an account in minutes") och en sekundär.
- **Låna:** Konkreta siffror med källa som tillit. Tydlig rangordning mellan två knappar.
- **Låna inte:** Limegrönt och rubriker på 103 px är Wise varumärke, inte en mall.

### 6. Kry: kry.se
- **System:** Eget typsnitt i 900-vikt för rubriker. Petrol `#1B4349`, mint `#ECF3ED`. Radie 20 och 30 px.
- **Säljer genom:** En lärobokshero. Rubriken "Träffa erfaren vårdpersonal" följs av tre rader med bock, primärknappen "Sök vård" och sekundärknappen "Hitta vårdcentral", och sist en sifferrad: **34** vårdcentraler, **14 miljoner** vårdmöten, **4,9** i App Store.
- **Låna:** Hero-formeln *rubrik, tre bevis, två knappar, siffror*. Riktiga människor på foto.

### 7. Länsförsäkringar: lansforsakringar.se
- **System:** LF Rubrik (serif) och IBM Plex Sans. Blå `#00427A`, ljusblå `#E3F4FC`. Radie 2–8 px.
- **Säljer genom:** Rubriken "Besiktning värd upp till 10 000 kr ingår i vår villaförsäkring" anger ett konkret värde i kronor. Under den finns snabbval med linjeikon och etikett: Hemförsäkring, Bolån, Barnförsäkring, Anmäl skada.
- **Låna:** Sälj med ett konkret värde, inte med adjektiv. Lägg det vanligaste ärendet bland produkterna.

### 8. Kivra: kivra.se
- **System:** Kivra Sans och DM Sans. Grön `#178000`, mörkgrön `#003004`, ljus `#EDF9E1`. Radie 12 och 20 px.
- **Säljer genom:** Rubriken "För dig som älskar att samla" (64 px) och en kort text om problemet ("Ett papper här, ett kvitto där…"). Där finns *en* knapp, "Skapa konto", och ett riktigt foto med humor (en hund med tennisbollar). Längre ner visar räknare hur många som redan använder tjänsten.
- **Låna:** Personligheten kommer från foto och text, inte från grafik. Levande siffror som socialt bevis.

---

## Mat och ursprung (som Lantmännen)

### 9. Oda: oda.com/no
- **System:** Galaxie Copernicus (serif) för rubriker och Inter för text. Orange `#FFA424`, varm off-white `#F3EEE6`, aubergine `#190F24` som textfärg. Radie 8 och 16 px.
- **Säljer genom:** Ett kort med "Velkommen til Oda!", en primärknapp med låg tröskel ("Se om vi leverer til deg") och en sekundär ("Åpne butikken"). Bredvid står beviset: vinnare i Norsk Kundebarometer sex år i rad.
- **Låna:** Ett första steg som inte kostar något, som att kolla leverans före köp. Utmärkelsen ligger bredvid knappen.

### 10. Mathem: mathem.se
- **System:** Samma designsystem som Oda (samma koncern). ABC Ginto, orange `#FFA424`, pill-knappar och 16 px kort.
- **Säljer genom:** Produktkort med etiketten "Extrapris", namn, vikt och ursprung ("ca 900 g, Guldfågeln"). Varukorgens summa syns alltid uppe till höger. Erbjudandet till nya kunder ligger som tunn rad: "gratis leverans i 3 månader".
- **Låna:** Produktkortets anatomi med vikt och ursprung. Varukorgssumman alltid synlig. Visar också att ett starkt system kan bära två varumärken.

### 11. ICA: ica.se
- **System:** ICA Rubrik och ICA Text. Röd `#CF2005` med mjukt rosa ytor (`#FCECE7`). Pill-knappar.
- **Säljer genom:** En säsongsstyrd startsida ("Nu julbakar vi", 48 px/900) med stora matfoton, och sedan tre tydliga ingångar: Handla online, Ladda ner appen, Stammis.
- **Låna:** Låt säsongen styra startsidan. Använd starka varumärkesfärger på ljusa, tonade ytor i stället för stora röda block.

### 12. Arla: arla.se
- **System:** Arla InterFace och Arla Life. Mörkgrön `#02462F`, skiffergrå `#384241` som textfärg. Radie 4 px.
- **Säljer genom:** Recept som innehåll: "Vad ska vi äta idag?", "Nya recept", "Populära artiklar". Matfoton i fasta proportioner.
- **Låna:** Användarens egen fråga som rubrik. Produkten säljs genom användning (receptet), inte genom förpackningen. Närmast Lantmännen i kategori.

---

## E-handel och sortiment

### 13. IKEA: ikea.com/se
- **System:** Eget typsnitt. Text `#111`, sekundär `#484848`, blå `#0058A3`. Pill-form (64 px).
- **Säljer genom:** Sökfältet "Vad letar du efter?" i mitten av headern. Kategorichips med produktbild (Erbjudanden, Julbutiken, Förvaring, Kök). Erbjudandekort med etiketter som "IKEA Family pris" och "3 för 2". Toppraden visar postnummer och varuhus.
- **Låna:** Bildchips för kategorier. Prisetiketter som badges på bilden. Lokal kontext (postnummer och varuhus) högst upp.

### 14. Systembolaget: systembolaget.se
- **System:** Inter Variable för text och ett eget displaytypsnitt. Nästan svart `#262626`, en mjuk grön `#C7E5CE`. Radie 4 och 8 px samt pill.
- **Säljer genom:** Även en obligatorisk åldersspärr är gjord vänligt: ett lugnt kort med "Hej, får vi be om legitimation?" och två likvärdiga knappar. Innehållet är säsongsstyrt ("Säsongens mat", "Alkoholfri glögg & andra juldrycker").
- **Låna:** Tvingande steg kan formuleras som ett samtal. En nästan svartvit palett med en enda mjuk färg.

### 15. Nordic Nest: nordicnest.se
- **System:** InterVariable och Haptik. Svart och vitt med varmgul accent (`#FFC166`). Radie 4 och 16 px.
- **Säljer genom:** Kategorirad med tunna, enhetliga linjeikoner och etikett (Julklappstips, Tallrikar, Belysning, Vaser, Möbler). "Öppet köp 30 dagar" står i toppraden.
- **Låna:** Tillitslöftet i toppraden. En ikonserie i samma tjocklek, alltid med text.

### 16. Granit: granit.com
- **System:** Euclid Circular B. Vitt med varmgrått (`#E5E4E1`) och skarp 2 px radie.
- **Säljer genom:** Beskrivande produktnamn ("Elljusstake Träd 7 Ljus Valnöt", "Cappucinokopp/Fat 16cl"). Toppraden visar "4,4 av 5 på Trustpilot" och erbjudandet för första köpet.
- **Låna:** Produktnamn med material och mått, så att man förstår utan att klicka. Ett riktigt omdömesbetyg högt upp.

---

## Premium produkt och varumärke

### 17. Apple: apple.com/se
- **System:** SF Pro Display och SF Pro Text. Text `#1D1D1F`, yta `#F5F5F7`, blå `#0071E3` *endast* för handling. Pill-knappar.
- **Säljer genom:** En produkt per sektion. "iPhone" (56 px), en mening och två knappar: "Läs mer" (fylld) och "Handla iPhone" (kontur). Produktfotot är hjälten.
- **Låna:** En sak per skärm och två vägar: förstå eller köpa.

### 18. Polestar: polestar.com/se
- **System:** Polestar Unica. Svart, vitt och `#F0F0F0`, med orange `#F06E00` som liten accent. Radie 8–12 px. Rubriker i 400-vikt.
- **Säljer genom:** Heron har modellnamnet, "Leverans inom några veckor", "Förmånsvärde från 2 815 kr/mån" och knapparna "Tillgängliga bilar →" och "Provkör". Pris och leveranstid syns direkt.
- **Låna:** Pris och leveranstid i hero. Lätt typografi som låter produktfotot bära.

### 19. HAY: hay.com
- **System:** Neue Helvetica och New Baskerville. Svart, vitt och `#F2F2F2`. Liten navigering i versaler (NEWS, INSPIRATION, PROFESSIONALS, FIND STORE).
- **Säljer genom:** Ett fullbreddsfoto av ett riktigt rum där produkterna står i sitt sammanhang. Navigeringen tar nästan ingen plats.
- **Låna:** Låt miljön sälja produkten. Navigering som inte konkurrerar med bilden.

### 20. Houdini: houdinisportswear.com
- **System:** Helvetica. Vitt, varmt `#F1EFEA` och svart, med skarp 2 px radie.
- **Säljer genom:** Fullbreddsfoto med "Houdini Circle" och tre små knappar: Reuse, Rent, Repair. Hållbarhet visas som tjänster man kan använda, inte som påståenden.
- **Låna:** Gör värderingar till konkreta handlingar. Ett strikt och skarpt formspråk hela vägen.

---

## Bortvalda och varför

Dessa granskades men är exempel på vad agenten *inte* ska göra:

- **Apoteket:** Black Week-cirklar på "50%" och "Köp 2 få" i varje kort gör att för många budskap tävlar.
- **Clas Ohlson:** Heron är ett moln av ikoner i stället för en produkt eller ett erbjudande man förstår.
- **Allbirds:** En rabattpopup täcker innehållet innan man sett något, ovanpå en cookie-banner.
- **Estrid:** Guld, glöd och gnistor ligger nära förbjudet-listan, även om flödet med startkit i tre steg är bra.

Hemnet, Aesop, Arket, Volvo Cars, Fjällräven, Klarna och Patagonia var tänkta som referenser men blockerar automatiska besök, så de kunde inte mätas. De kan granskas manuellt vid behov.

---

## Det alla 20 har gemensamt

1. **En huvuduppgift ovanför vecket:** sök, boka, kolla leverans eller handla.
2. **Ett typsnittssystem**, oftast eget. Max två familjer.
3. **En handlingsfärg** som skiljs från varumärkesytor.
4. **Ett formspråk:** pill (SJ, Apple, Airbnb, Wise) eller skarpt (Lantmännen, Granit, Houdini). Aldrig både och.
5. **Riktiga foton** i fasta proportioner. Inga illustrationer som ersätter produkten.
6. **Konkret text:** pris i kronor, leveranstid, siffror med källa och produktnamn med mått.
7. **Tillit nära handlingen:** betyg, öppet köp, utmärkelser och fri frakt i toppraden eller vid knappen.
