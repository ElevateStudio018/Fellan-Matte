# SJ – faktaunderlag för konceptsajt

Underlag som Elevate Studio tagit fram inför ett möte. Det är inget material från SJ. Uppgifterna samlades in **24 november 2026**.

## Om källorna

**sj.se gick inte att läsa direkt.** Sajten renderas helt i webbläsaren med JavaScript, så varje sida (även FAQ-sidorna) ger samma tomma HTML-skal utan text, både med WebFetch och med vanlig hämtning. Från sj.se används därför bara:
- sitemap.xml, för att se vilka sidor och produkter som finns
- sajtens publika JS-filer för designtokens och typsnitt (se Visuell identitet)

Sajtens JS innehåller också nycklar till SJ:s interna API. Dem har vi **inte** använt.

Innehållet bygger i stället på SJ:s egna publicerade dokument och pressmeddelanden, SJ:s designsystem och vissa sekundärkällor. Märkningar i texten:

- **[ÅHR25]** SJ Års- och hållbarhetsredovisning 2025, PDF på cdn.sj.se (publicerad 2026). https://cdn.sj.se/files/hulddl9x/production/80bf35f01f083aa970bee79612688dc340b78473.pdf/SJ-A%CC%8AHR-2025-t.pdf
- **[TKR25]** SJ AB Tjänstekvalitetsrapport 2025, PDF på cdn.sj.se. https://cdn.sj.se/files/hulddl9x/production/5e6c4ad0d8621d474c736ef1a26c4cb08ce9bd53.pdf/SJ%20AB%20-%20Tja%CC%88nstekvalitetsrapport%202025.pdf
- **[PM åååå-mm-dd]** SJ:s pressmeddelande på via.tt.se, SJ:s pressrum: https://via.tt.se/pressrum/3237297/sj. (nyhetsrum.sj.se svarade 403 på automatisk hämtning och lästes inte.)
- **[DS]** SJ:s designsystem, https://design.sj.se/sv/riktlinjer/…, läst 2026-11-24.
- **[IDM]** SJ Identitetsmanual 2.2 (juli 2025), länkad från design.sj.se. Läst för text. Ingen logotypfil är sparad.
- **[sj.no]** SJ Norges sida https://sj.no/en/highspeed, läst 2026-11-24.
- **[SÖK]** Utdrag ur sj.se-sidor som de syns i sökmotorresultat (2026-11-24). Det är SJ:s egen text, men den kan vara äldre än dagens sida. **Räkna med en viss osäkerhet.**
- **[WP]** Wikipedia: sv/en "SJ AB", sv "X 2000", sv "X55", läst 2026-11-24. Sekundärkälla.
- **[S61]** seat61.com/trains-and-routes/x2000.htm (märkt "UPDATE 2026"). Sekundärkälla.
- **[TV4]** tv4.se om SJ:s ombokningsbara biljetter (artiklarna saknar tydligt datum).

⚠️ = osäker uppgift eller motstridiga källor. Kontrollera innan den används i skarp text.

---

## 1. Företaget i korthet

- SJ AB ägs till 100 % av svenska staten. Huvudkontoret ligger på Vasagatan 10 i Stockholm. [WP], [pressrum via.tt.se]
- 2025 hade koncernen cirka 7 100 medarbetare och en omsättning på cirka 14,5 miljarder kronor. [TKR25] (I pressrummets presentation står 6 500 medarbetare i Sverige och Norge.)
- 2025 trafikerade SJ stora delar av Sverige och Norge och körde till Oslo, Köpenhamn, Hamburg och Berlin. [ÅHR25], [TKR25]
- Vision: **"Ett SJ att lita på och längta till."** [TKR25]
- Kundlöfte: **"SJ gör det enkelt för dig att resa. Du kan lita på att vi alltid gör vårt yttersta för att du ska känna dig sedd och väl omhändertagen."** [ÅHR25], [TKR25]
- Värdeord: Pålitliga, Enkelt, Framåt, Mänskliga, Lyckas tillsammans. [DS /vardeord]
- Dotterbolag med tågtrafik: SJ Götalandståg (Västtåg m.fl.), SJ Stockholmståg (Stockholms pendeltåg sedan 3 mars 2024) och SJ Norge (varumärket SJ Nord). [ÅHR25], [WP]
- Punktlighet 2025 (RT+5): 88 % totalt, 63 % för långdistanståg och 90 % för medeldistanståg. [TKR25]
- Nöjd kundindex för SJ AB var 71 under 2025 (67 året innan) och NPS för resenärer 13 (5). [TKR25] Under tredje kvartalet 2026 steg NKI till 73. [PM 2026-10-23]
- VD sedan 1 februari 2026 är Jonas Abrahamsson. [WP], och han citeras som vd i PM hösten 2026.
- I Differs undersökning PUSH utsågs SJ till "Sveriges mest hållbara företag" av svenska folket. [TKR25]

## 2. Tågtyper och produkter

SJ:s egna produktlinjer heter **SJ Snabbtåg, SJ InterCity, SJ Regional och SJ Nattåg**, plus **SJ EuroNight**. [ÅHR25 s. 12], [WP]

| Produkt / tåg | Vad det är | Skillnader och nyckeltal |
|---|---|---|
| **SJ Snabbtåg – X 2000 (X2)** | Ett snabbtåg med korglutning som rullat sedan 1990. Byggt av Kalmar Verkstad och ABB. [WP] | Toppfart 200 km/h. Korgen lutar inåt i kurvor och klarar därför kurvor snabbare. 36 tågsätt. Körs främst på Stockholm–Göteborg och Stockholm–Malmö. [WP] |
| ↳ **Moderniserade X 2000 (X2C)** | Hela flottan på 36 tåg byggs om. Det första ombyggda tåget gick 16 november 2021. [WP] | Nya stolar med elektrisk justering, större benutrymme, smart belysning, radiotransparenta fönster för bättre mobil och wifi, bättre tillgänglighet och fler platser. [ÅHR25] I oktober 2026 var **14 av 36** moderniserade tåg i trafik. [PM 2026-10-23] Enligt [WP] har ombyggda tåg cirka 360 platser, mot tidigare 310–330. ⚠️ |
| **SJ Snabbtåg – SJ 3000 (X55)** | Bombardier Regina, i trafik sedan 6 februari 2012. [WP] | 200 km/h och 20 fyrvagnarståg. Används på Stockholm–Sundsvall–Umeå, Östersund/Åre, Dalarna, Karlstad och Oslo. [WP] Satellituppkoppling beslutades 2025. [ÅHR25] Upprustningen har börjat. [PM 2026-10-23] |
| **SJ InterCity** | Lokdragna tåg med Rc6-lok och vagnar. [WP] | Långsammare än snabbtåget och stannar oftare. Vagnarna rustas upp invändigt med nya golv och eluttag men behåller den "blekta blå exteriören". [ÅHR25] |
| **SJ Regional** | Främst dubbeldäckare (X40, Alstom Coradia Duplex) sedan 2006. [WP] | 27 dubbeldäckare moderniseras med arbetsvänliga säten, USB-uttag, nya skärmar, cykelplatser och 5G-baserat wifi. [ÅHR25] I oktober 2026 var 14 av 27 klara. [PM 2026-10-23] |
| **SJ Nattåg** | Lokdragna tåg (Rc-lok) med sittvagn, liggvagn och sovvagn. [WP], [ÅHR25] | SJ har kört sovvagnar sedan 1886. 57 nattågsvagnar renoveras, bland annat med rullstolslyftar i sovvagnar, och 15 av 57 var klara i oktober 2026. [ÅHR25], [PM 2026-10-23] |
| **SJ EuroNight** | Nattåg Stockholm–Hamburg/Berlin tillsammans med RDC. | Startar på nytt **13 december 2026**, se avsnitt 6. [PM 2026-11-12] |
| **Nya snabbtåg (Alstom Zefiro Express, kallas ofta "SJ 250")** | 25 tåg byggda av Alstom i Tyskland. [ÅHR25] | 250 km/h, alltså 50 km/h mer än X 2000, och 30 % fler platser. Ljuddämpade vagnar, cykelplatser och moderna bistrovagnar. Den första sträckan blir Stockholm–Göteborg. [ÅHR25] ⚠️ **Startdatum:** ÅHR25 anger inget datum. Engelska [WP] skriver "december 2027". Namnet "SJ 250" används i media och på Wikipedia. Vi har inte sett att SJ använder det officiellt. |
| **Nya regionaltåg (CAF Civity Nordic, X45)** | 25 tåg för cirka 3 miljarder kronor. [ÅHR25] | 5G, radiotransparenta fönster och plats för cyklar och barnvagnar. Klimattestade ner till −40 grader. Trafiken startar Stockholm–Västerås och Linköping–Gävle. Datum anges inte. [ÅHR25] Enligt [PM 2026-10-23] testkörs nya snabb- och regionaltåg i Tjeckien. |

## 3. Klasser och biljettyper

### Reseklasser på dagtåg
- **2 klass:** grundklassen.
- **2 klass Lugn:** en tystare vagn på **snabbtågen**. [ÅHR25] Enligt [SÖK] (sj.se/allt-om-resan/reseklasser) är mobilen på ljudlöst och samtal hålls dämpade. Wifi och fritt kaffe och te från bistron ingår. På avgångar före kl. 09 ingår en enklare frukost med fralla, juice och kaffe eller te, som man hämtar i bistron senast 09.30. Barnrabatter och barnerbjudandet gäller inte i 2 klass Lugn. Studenter och pensionärer får samma rabatt som i 2 klass. Gruppresor kan inte bokas. ⚠️ Detaljerna kommer från sökutdrag.
- **1 klass:** breda säten och tillgång till SJ:s lounger i Stockholm, Göteborg och Malmö. Enligt [SÖK] serveras en frukostbox vid platsen på snabbtåg före kl. 9, och förbeställd mat serveras också vid platsen. Enligt [S61] ingår kaffe och te. ⚠️ Där står också att frukosten kräver flexibel biljett, vilket motsäger SJ-utdraget.
- **Nattåg:** sittvagn 2 klass, liggvagnskupé 2 klass (delad, sex bäddar, man bäddar själv), sovvagnskupé 2 klass (1–3 personer, handfat, dusch och WC i vagnsänden) och sovvagnskupé 1 klass (1–2 personer, egen WC och dusch, frukost ingår). [SÖK] Det finns också delad kupé (villkoren ligger på en FAQ-sida enligt sitemap).

### Flexibilitet (biljettyper)
- Det finns tre nivåer: **Kan ej ombokas**, **Kan ombokas** och **Kan återbetalas** (namnen kommer från [TV4] och sökträffar ⚠️).
- "Kan ombokas" togs bort under bytet av bokningssystem, från 1 april 2024 ([TV4], Affärsvärlden). Den återlanserades för privatresenärer **i september 2025**. [ÅHR25]
- Med **Kan ombokas** byter man till annan dag och tid **på samma sträcka**, mot en avgift. Är den nya resan dyrare betalar man mellanskillnaden. Är den billigare får man tillbaka skillnaden. [TV4]
- **Kan återbetalas** betyder avbokning med pengarna tillbaka minus en avgift. **Kan ej ombokas** kan varken ombokas eller återbetalas. [TV4] ⚠️ Avgifternas storlek har vi inte kunnat belägga.
- Priserna styrs av utbud och efterfrågan. Billigast är det oftast vid biljettsläppet. **Sista minuten-biljetter** släpps mindre än 24 timmar före avgång till studenter, ungdomar, barn och pensionärer. [TKR25]
- SJ-biljetter köps på sj.se, i appen, via resebyråer, SJ Kundservice och hos Pressbyrån och 7-Eleven. [TKR25] SJ:s sista resebutiker stängde 28 februari 2021 och de sista biljettautomaterna togs bort i september 2023. [WP] Man kan inte köpa biljett ombord, utom på sträckan Luleå–Narvik. [SÖK]

## 4. Tjänster ombord

- **Bistro:** På snabbtågen finns ett brett utbud av ekologiska maträtter, fika, dryck och klassiker. [ÅHR25] Mat kan förbeställas, och i 1 klass serveras den vid platsen. [SÖK] Gamla kioskvagnar från 1980-talet har byggts om till moderna bistrovagnar, som införs i Dalarnatrafiken under 2025. [ÅHR25] SJ har bytt ut cirka 3,5 miljoner plastbelagda pappersmuggar om året mot muggar utan plastfilm. [PM 2026-11-04] Nattågen har bistro på alla linjer utom Stockholm–Malmö. [WP] ⚠️
- **Wifi:** Gratis på X 2000, SJ 3000 och dubbeldäckarna. Man ansluter till nätet "SJ". [SÖK, ombord.sj.se] På nattåg beror det på avgången. [SÖK] SJ 3000 får satellituppkoppling. [ÅHR25]
- **Eluttag:** Finns vid platserna på tågen Stockholm–Göteborg. [SÖK] Enligt [S61] sitter det uttag mellan varje stolspar på X 2000. De renoverade dubbeldäckarna har fler uttag och USB. [ÅHR25], [SÖK]
- **Djur:** Man bokar platsegenskapen "Djur tillåtet", och djur får bara vara i djurvagnar eller djuravdelningar. Den som är allergisk kan boka en "Djurfri plats" i både 1 och 2 klass på dagtåg. På nattåg reser djur i särskilda djurkupéer. Ledarhundar och assistanshundar får följa med i andra delar av tåget, men platsen bokas via Kundservice. [SÖK] Under 2025 dubblerades djurplatserna på dubbeldäckarna från 8 till 16 bokningsbara, plus 2 obokade. [ÅHR25] Enligt [S61] tillåts djur bara i 2 klass på X 2000.
- **Cykel:** En hopfällbar cykel ska vara ihopfälld och ligga i väska i bagageutrymmet vid vagnsänden. [SÖK, ordningsföreskrifter] På X 2000 ska cykeln vara delvis isärplockad och ligga i väska, högst 140 × 85 × 30 cm och 25 kg. [S61] ⚠️ De renoverade dubbeldäckarna och de nya tågen får cykelplatser. [ÅHR25]
- **Barn:** Se rabatter i avsnitt 5. Barn till och med 6 år får inte resa ensamma. [SÖK] Sitemap och FAQ visar att det finns sidor om skötbord, barnvagn, barnvänlig mat och om barn får resa i 1 klass. Innehållet har vi inte kunnat läsa.
- **Lounger:** SJ Lounge finns i Stockholm, Göteborg och Malmö och har gratis wifi, kaffe och arbetsytor. [ÅHR25] I början av 2027 öppnar en lounge på Oslo S, Norges första tåglounge, för 1 klass Stockholm–Oslo och medlemmar i SJ Prio Premium. [PM 2026-09-07]
- **Tillgänglighet:** Ledsagning bokas senast 24 timmar före avresa via Samtrafikens ledsagningsportal. 18 132 ledsagningar bokades 2025. [TKR25]
- **Luft och städning:** Tågen grundstädas varje dygn, och luften byts varannan till var åttonde minut. [TKR25]

## 5. SJ Prio, appen, rabatter och periodkort

### SJ Prio (lojalitetsprogram)
- Programmet har cirka **1,8 miljoner medlemmar**. [ÅHR25], [TKR25]
- Nivåerna heter sedan 2025 **Prio, Prio Plus och Prio Premium**. Numera räknas antalet resor in i nivån, inte bara poängen. Nya förmåner är dubbla poäng på förbeställd mat och lägre poängpriser i bistron för Prio Plus och Prio Premium. [ÅHR25]
- Poäng tjänas på resor och hos partner och kan användas till nya resor eller reserelaterade upplevelser. De kan också skänkas till SJ:s ideella partner. [TKR25] Det finns också en poängshop och **SJ Prio Mastercard** som SEB Kort ger ut. [sitemap], [SÖK]
- Prio Premium ger tillgång till loungen i Oslo. [PM 2026-09-07]

### Appen och sj.se
- Appen och sj.se hade sammanlagt 286 miljoner besök 2025. [ÅHR25]
- Nyheter i appen 2025: betalning med Apple Pay och Google Pay, byte av sittplats i appen, "Var ska jag stå på plattformen?" (tillbaka i Android), förbättrad "Var är mitt tåg" som visar tågets hastighet, personliga erbjudanden och bättre störningsinformation. [ÅHR25]

### Rabatter
- **Student och ungdom:** alltid 15 % i 2 klass. [ÅHR25], [TKR25] Rabatten gäller upp till 25 år. [SÖK] ⚠️ Den engelska sidan anger 16–25 år. Studenter visar studentkort (STUK, Mecenat eller ISIC). [SÖK]
- **Pensionärer:** alltid 10 % i 2 klass. [ÅHR25], [TKR25] ⚠️ Åldersgränsen har vi inte kunnat belägga.
- **Barn 0–15 år:** 15 % i 2 klass och på vissa periodkort. [SÖK]
- **Familjeerbjudande:** upp till två barn (0–15 år) i 2 klass får 85 % rabatt på dagtåg och 50 % på nattåg. [ÅHR25]
- Det finns också SJ Biz för företag, grupprabatter, Interrail/Eurail och erbjudanden kring evenemang som Gothia Cup. [ÅHR25], [sitemap]

### Periodkort och pendling
- **SJ 30-dagarskort, SJ 90-dagarskort och SJ Årskort** är personliga och visas tillsammans med legitimation. Ett 30- eller 90-dagarskort återbetalas före första giltighetsdag mot en avgift på 150 respektive 450 kr. [SÖK, köpvillkor]
- **SJ 10-kort Regional** och **10-kort för företag** finns. [SÖK], [sitemap]
- **Movingo** är ett pendlarkort för Mälardalen som gäller 30 dagar, 90 dagar eller ett år på SJ Regional och i lokaltrafiken (SL, UL, VL, Sörmlandstrafiken, Östgötatrafiken och Länstrafiken Örebro). SJ säljer det på uppdrag av Mälardalstrafiken. [SÖK]
- 2026 ökade pendlarresorna med 15 % under sommaren. [PM 2026-09-14]

## 6. Populära sträckor och ungefärliga restider

| Sträcka | Restid och trafik | Källa |
|---|---|---|
| Stockholm–Göteborg | Cirka 3–3,5 timmar med snabbtåg, snabbaste avgången cirka 3 h 01 min. Flera avgångar per timme vissa tider. | [SÖK sj.se/…/stockholm-goteborg], [S61] |
| Stockholm–Malmö | Cirka 4,5 timmar (S61: 4 h 28 min). | [S61] ⚠️ (inga färska SJ-siffror hittades) |
| Stockholm–Köpenhamn | ⚠️ Direkttågen med X 2000 är tillfälligt inställda på grund av tågbrist. Resenärer byter till Öresundståg i Lund eller Malmö. SJ:s egen sida säger "just nu kör vi endast till Malmö". Enligt [S61] kan några direkttåg komma tillbaka från 13 december 2026, men det är inte bekräftat. Direkt restid har varit cirka 5 h 15 min. | [SÖK], [S61] |
| Stockholm–Oslo | 5 avgångar per riktning på vardagar, 3 på lördagar och 4 på söndagar. Restid cirka 5–6 timmar. ⚠️ sj.no anger både "under five hours" och "less than 6 hours". Fler än någonsin reste sträckan sommaren 2026. | [sj.no], [PM 2026-09-14] |
| Göteborg–Malmö | 2 h 18 min. Med de nya snabbtågen är målet under två timmar. | [SÖK: PM dec 2025 "Kortare restid med SJ mellan Göteborg och Malmö"] |
| Stockholm–Östersund–Åre/Duved (snabbtåg) | Daglig avgång 16.50, framme i Östersund 22.05 och i Åre 23.21. Gjordes permanent efter ett försök vintern 2025/26. | [PM 2026-02-19] |
| Stockholm–Mora–Sälen (ny vintersäsong) | Söndagar 17 januari–4 april 2027. Stockholm–Mora 09.44–13.31 och sedan anslutningsbuss till Lindvallen, Högfjällshotellet, Tandådalen och Hundfjället. Från 590 kr enkel. | [PM 2026-10-22] |
| **Nattåg** Stockholm–Narvik via Umeå, Luleå och Kiruna (och Abisko) | Upphandlat av Trafikverket för december 2026–december 2028. Ett dagligt tur- och returtåg, med sov- och liggvagnar direkt utan byte i Boden. Restid cirka 18 timmar. ⚠️ Uppgiften kommer från ett äldre utdrag. | [PM 2026-06-25], [SÖK] |
| **Nattåg** Stockholm–Umeå | Ett dagligt tur- och returtåg, samma avtal. | [PM 2026-06-25] |
| **Nattåg** Stockholm–Östersund–Duved | Upphandlat från 12/13 december 2026 i upp till fem år. | [PM 2026-09-09] |
| **Nattåg** Stockholm–Malmö | Ingår i SJ Nattåg. | [WP] ⚠️ |
| **SJ EuroNight** Stockholm–Hamburg–Berlin | Startar på nytt 13 december 2026 med tre avgångar i veckan per riktning, varav två till Berlin under en övergångsperiod. Från 19 januari 2027 går två avgångar i veckan till Hamburg, och en av dem fortsätter till Berlin. SJ sköter trafiken i Sverige och Danmark och RDC i Tyskland. Biljetter till och med 31 januari 2027 säljs via nachtexpress.de och nattexpressen.se. Från 1 februari 2027 säljs de på sj.se, i appen, i DB Navigator och på bahn.de. | [PM 2026-11-12] |

## 7. Villkor: ombokning, återbetalning och förseningsersättning

- Om ombokning och återbetalning, se avsnitt 3.
- **Ersättning vid försening (EVF)** enligt [TKR25]:
  - **Tåg som kör 150 km eller längre** (räknat på hela tågets sträcka): 25 % av biljettpriset vid minst 60 minuters försening och 50 % vid minst 120 minuter. Vid väntan över 60 minuter ingår förtäring och vid behov logi.
  - **Tåg som kör kortare än 150 km:** 50 % vid 20 minuter, 75 % vid 40 minuter och 100 % vid 60 minuter. Riskerar tåget att bli minst 20 minuter sent får man ta ett annat färdmedel och få ersättning.
  - Man ansöker via ett formulär på sj.se. 2025 kom cirka 302 000 ansökningar. Ungefär hälften behandlades automatiskt, och svar och utbetalning kom i snitt inom 2,5 arbetsdagar.
- **Service Recovery:** Vid kvalitetsbrister eller extraordinära händelser kompenserar SJ alla resenärer i ett tåg eller en vagn automatiskt med värdebevis, utan att de behöver ansöka. [TKR25]
- Vid trafikstörning kan SJ boka om till annat tåg, sätta in buss eller taxi, betala tillbaka om resan avbryts och ersätta rimliga kostnader mot kvitto. [TKR25]
- **Resegaranti eller restidsgaranti:** ⚠️ Vi har inte hittat någon aktuell, separat "resegaranti" utöver EVF och Service Recovery. SJ:s äldre restidsgaranti gjordes om 1 maj 2015 (Sveriges Radio). Periodkort har egna ersättningsregler, och Movingo ger till exempel 100 % vid 60 minuter. [SÖK]

## 8. Kundservice

- **Telefon:** 0771-75 75 75, måndag–fredag 08–17. För trafikstörningar och för kunder med funktionsnedsättning gäller längre tider (06–22) via tonval 5. [SÖK, sj.se/en/customer-service] ⚠️ Telefontiderna kommer från sökutdrag.
- **Chatt:** chattboten **Sonja** finns dygnet runt via "Hjälp" på sj.se, och en medarbetare tar över vid behov. [TKR25], [SÖK]
- **E-post:** kundservice@sj.se. Klagomål kan också lämnas via formulär på sj.se eller till tågvärd eller kundvärd. Skriftliga reklamationer hanteras inom 7 dagar, och ärendet kan överklagas till **SJ:s kundombudsman**. [TKR25]
- **Fakturafrågor för privatkunder:** 0771-75 75 99. **SJ Prio Mastercard:** SEB Kort, 08-14 74 20. [SÖK] ⚠️
- **Kundvärdar** på stationerna hjälper till med köp och ombokning i appen och på sj.se. [TKR25]
- Det finns också hittegods i Stockholm, Göteborg och Malmö och sociala medier. [sitemap/FAQ]
- **Växel (inte resefrågor):** 010-751 60 00. **Press:** 010-751 51 84, press@sj.se. [pressrum via.tt.se]

## 9. Aktuella nyheter och kampanjer (hösten 2026)

| Datum | Nyhet | Källa |
|---|---|---|
| 2026-11-18 | Vinnarna av Årets Framtidsresenär 2026 utsedda (Jakob Koranyi, 1000skis och Stockholm Top Gymnastics) | PM |
| 2026-11-12 | SJ återupptar nattåget till Tyskland (EuroNight) från 13 december 2026 | PM |
| 2026-11-04 | 3,5 miljoner pappersmuggar med plastfilm ersatta | PM |
| 2026-10-28 | VR-resa genom 170 år av svensk järnvägshistoria på Stockholm C (med Järnvägsmuseet och Jernhusen). Ny svarvanläggning för hjul ska ge punktligare tåg. | PM |
| 2026-10-23 | Q3: 6 % fler resenärer, NKI 73 och rörelseresultat 462 MSEK. Programmet för nya och moderniserade tåg är på 19 miljarder kronor. | PM |
| 2026-10-22 | Ny destination: **Sälen** (tåg till Mora och sedan buss) från 17 januari 2027 | PM |
| 2026-10-21 | Biljetter släppta för 11 januari–4 april 2027 (sportlov och påsk), 19 834 avgångar | PM |
| 2026-10-19 | Julresor med nattåg till övre Norrland och Narvik bokningsbara för 13 december–10 januari | PM |
| 2026-09-14 | "Rekordtryck" sommaren 2026. Juli var den starkaste månaden någonsin och turister stod för 14 % av resandet. | PM |
| 2026-09-07 | Lounge på Oslo S öppnar i början av 2027 | PM |
| 2026-06-25 / 2026-09-09 | SJ tilldelas nattågen till övre Norrland och Umeå och Stockholm–Duved | PM |
| Löpande | Nya snabbtåg (Zefiro) och regionaltåg (CAF) testas. X 2000, dubbeldäckare och nattågsvagnar moderniseras. | ÅHR25, PM |
| ⚠️ | sj.se har en sida för "Black Friday / Black Week" (syns i sitemap), men vi har inte kunnat läsa innehållet eller bekräfta något erbjudande för 2026. | sitemap |

## 10. Varumärkets ton

**Beskrivning:** SJ beskriver sin röst som **varm, lättsam och i ögonhöjd**, mänsklig och vardaglig med lite humor. Den ska inte vara pratig, distanserad, högtravande eller "låtsas-kompis". Kunden kallas "du" och SJ "vi". Meningarna är korta med en tanke per mening, utan jargong eller onödiga synonymer, och fokus ligger på vad kunden *kan* göra. Tonen ska vara optimistisk i positiva lägen, neutral när den vägleder och empatisk med tydliga nästa steg när något gått fel. [DS /tonlage, /ux-writing] I kampanjer och pressmeddelanden återkommer temat att **resan i sig är en del av upplevelsen**.

**Citat (ordagrant):**
1. "Vi pratar med människor som de pratar med varandra." [DS /tonlage]
2. "En varm och lättsam röst, i ögonhöjd med resenärerna." [DS /tonlage]
3. "Fjällsemestern börjar med resan." (Jonas Abrahamsson) [PM 2026-10-22]
4. "Semestern kan börja redan ombord." (Sofie Struwe) [PM 2026-10-21]
5. "För oss är bistron hjärtat i tåget – och nu får det hjärtat slå lite starkare." [ÅHR25]

Fler att välja på: "Res bekvämt i en tystare vagn. Njut av lugn och ro, wifi samt fritt kaffe och te." [SÖK, om 2 klass Lugn] och "SJ står starkt." [PM 2026-10-23]

---

## Visuell identitet

Källor: SJ:s designsystem design.sj.se [DS], Identitetsmanual 2.2 [IDM] och tokens ur sj.se:s egna JS-filer (`/assets/sj-component-library/DesignTokens-*.js` och `fonts-*.js`, hämtade 2026-11-24). Själva sj.se kunde vi inte se renderad, så helhetsintrycket nedan bygger på tokens och riktlinjer.

### Helhetsintryck
Ytorna är vita och det mesta av text och grafik är svart. Färgen kommer in som klara, "pigga" naturfärger: grönt, himmelsblått och rapsgult. I gränssnittet används färgen sparsamt, som accenter och status. Formerna är mjukt rundade, med standardradien 1rem och kapselformade knappar. Det finns ett mörkt läge med egna färgvärden. Grunden sammanfattas i [IDM]: det pålitliga och enkla bärs av logotypen, typsnittet och tydliga symboler, medan det mänskliga och härliga kommer från typsnittets rundade karaktär, färgerna och de mänskliga bilderna.

### Färger (hex från design.sj.se; värdena bekräftas av sj.se:s tokens)
**Primärfärger** ("distinkta, pigga färger hämtade från svensk natur" [IDM]):
| Namn | Hex | Kommentar |
|---|---|---|
| Löv 1 | `#00AB3B` | Den gröna huvudfärgen. På sj.se används den bland annat för valt läge ("selected") och ikoner. |
| Löv 2 | `#00892F` | Mörkare grön, används bara när kontrasten annars blir för låg |
| Gräs | `#62DB5A` | Ljus, klar grön |
| Himmel 1 | `#22BCE8` | Himmelsblå |
| Himmel 2 | `#1B96BA` | Mörkare blå. På sj.se används den för fokusmarkering. |
| Raps | `#FFD700` | Gul |

**Sekundär- och accentfärger:** Sten `#252525`, Granit `#696B57`, Höstlöv 1 `#F56200`, Höstlöv 2 `#C44E00`, Lera `#A57D4C`, Sjö `#00749A`. De passar "när vi vill 'vrida ner' volymen".

**Bakgrundstoner:** Äng `#E8F7E4`, Mossa `#E8F7F6`, Sand `#F9F4CF`, Snö `#F5F5EE`. Grundfärgerna är Vitt `#FFFFFF` och Svart `#000000` ("Bakgrunder är oftast vita", "Text och grafik är oftast svart").

**Varning:** Varning `#DE1F26` och Smultron `#FCE9E9`. I tryck motsvarar Löv PMS 354 och Himmel PMS 306. [IDM]

UI-tokens på sj.se: sekundär text `rgba(0,0,0,0.6)`, kantlinjer `rgba(0,0,0,0.12)` och grå bakgrund `#F5F5F5`. Mörkt läge använder `#121212`, `#1E1E1E` och `#2A2A2A`. SJ Prio-korten har egna färger (Prio grå `#E1E1DD`, svart och vit).

### Typografi
- **SJ Sans** är SJ:s eget typsnitt, med webbfiler från sj.se/fonts. Vikter: **Bold** för huvud- och mellanrubriker, **Medium** för ingresser, bildtexter och korta faktatexter, **Regular** för brödtext och **Regular Italic**. Arial används som reserv. Typsnittet har en "rundad karaktär". [DS /typografi], [IDM] Standardligaturer ska alltid vara på.
- Skala enligt sj.se:s tokens (storlek/radavstånd i px): display 66/80, 52/64 och 41/52, largeTitle 32/40, title1 26/32, title2 20/28, title3 18/24, subtitle 18/28 (Medium), body 16/24, subheadline 14/20, footnote 13/20 och caption 11/16 och 10/16.
- ⚠️ SJ Sans är SJ:s egendom och får inte användas i ett koncept utan tillstånd. En neutral ersättare med rundad karaktär behövs.

### Layout (tokens)
Gridet har 12 kolumner, max 1200 px, 16 px gutter och 16 px marginal. Brytpunkterna ligger på 600 och 1240 px. Spacing följer en skala i steg om 0,25 och 0,5 rem. Bilder har formatet 3:2 som standard, med 16:9, 21:9 och 1:1 som alternativ.

### Logotyp (bara beskriven, ingen fil nedladdad)
- SJ har **bara en logotyp** [DS], [IDM]. Den består av bokstäverna **"SJ"** i en kraftig, kompakt sans-serif med mjuka former. Under dem sitter ett **symmetriskt emblem** med två breda, stiliserade vingar som sveper ut horisontellt åt var sitt håll och möts i en bred U-formad båge i mitten, ungefär som en skål eller ett halvt hjul. Vingarna har räfflade, fjäderlika avslut i ytterkanterna. Bokstäverna står centrerade ovanför emblemet och helheten är kompakt och nästan kvadratisk. (Att formen anspelar på järnvägens klassiska bevingade hjul är vår tolkning ⚠️.)
- Logotypen är **enfärgad**: svart på ljus botten (positiv) eller vit på mörk botten (negativ). I undantagsfall kan den vara **folierad i silver eller guld**, men aldrig illustrerad. [IDM], [DS]
- Friytan motsvarar höjden på bokstaven S. Minsta storlek är 10 mm i tryck och 50 px digitalt. Står logotypen ensam ska den vara stor och gärna centrerad, och den får "aldrig [vara] otydlig eller underordnad". [IDM]
- I sociala medier och som appikon står logotypen på en primärfärg eller en bild och tar upp 2/4 av höjden. [IDM]
- ⚠️ Logotypen är ett skyddat varumärke. I ett konceptförslag bör det framgå att det är en skiss och inget SJ-material.

### Grafiska element
- **Ikoner:** linjeikoner med rundade avslut på ett grid om 24 × 24 px. Mini-ikoner är 20 px och illustrationsikoner 96 px. [DS /ikonografi]
- **Pratlådor:** pratbubblor ritade som en tunn linje med samma linjetjocklek och grid som illustrationsikonerna. Formerna är cirkel, rundad rektangel och vimpel, och texten står i versaler eller fetstil i en identitetsfärg ovanpå foto, till exempel "UPP TILL 50%" eller "Välkommen till bistron!". De används för att lyfta budskap som priskampanjer och "stärka SJs personliga röst". [IDM s. 48–50]

### Bildstil (bildmanér)
- Bilderna ska visa ett "mänskligt och härligt SJ som är till för alla". De ska vara naturliga, inkluderande, optimistiska och milda, med hudtoner och naturfärger, naturligt ljus och en varm ton. [DS /bildmaner]
- **Motiv:**
  - Tåg i rörelse, inifrån och utifrån, med tydlig logotyp, gärna centralt
  - Stolt personal i arbetsmiljö
  - Svensk natur och landsbygd sedd från tågfönstrets höjd
  - Igenkännbara, befolkade resmål som inte är klichéartade
  - Vardagliga resögonblick före, under och efter resan, med fokus på möten och glädje
- **Komposition:** ögonhöjd, lugn bakgrund, liggande beskärning med låg kamerahöjd som från ett tågfönster och lagom avstånd. Lämna lugn yta för text till vänster, till höger eller upptill.
- **Undvik:** konstruerade och uppställda bilder, onaturliga vinklar, flygbilder och vyer från hög höjd, kyliga, öde eller distanserade bilder, för nära förgrund, kraftig vinjettering och stark oskärpa. ("Undvik bilder som känns onaturliga och alltför konstruerade.")

---

## Det som inte gick att få fram eller belägga
- Text direkt från sj.se, eftersom sajten renderas med JavaScript. Därför finns inga färska citat från sj.se:s sidor, bara sökutdrag.
- Avgifter för ombokning och återbetalning, åldersgräns för pensionärsrabatt och priser på periodkort.
- Aktuell, verifierad restid Stockholm–Malmö och exakt status för direkttåg till Köpenhamn efter 13 december 2026.
- Officiellt startdatum och officiellt produktnamn för de nya snabbtågen ("SJ 250").
- Innehållet i en eventuell Black Week-kampanj 2026.
- Pressrummet nyhetsrum.sj.se, som svarade 403 på automatisk hämtning.
