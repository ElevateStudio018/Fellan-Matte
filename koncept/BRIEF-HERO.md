# Uppdrag: gör om heron på 21 konceptsajter

Beställaren tyckte att heron på sajterna var för lika varandra och för tråkiga, ibland bara vita. Varje sajt ska nu få en **egen hero-typ** enligt listan nedan, och ingen typ får användas två gånger. Heron ska fånga blicken direkt och aldrig vara vit eller tom. Läs regel 19b i din agentdefinition.

## Regler
- Ändra BARA heron på `index.html`: HTML för hero-sektionen plus den CSS och JS som heron behöver. Lägg CSS:en i sajtens befintliga stilfil under en tydlig kommentar `/* Hero (ny) */`. Resten av sajten och flödena ska fungera som förut. Har heron ett fält som fyllde i ett flöde ska den kopplingen ligga kvar.
- Övriga Elevate-regler gäller fortfarande: pill-knapp med pil →, en primärknapp, H1 halvfet med prick, linjeikoner, WCAG 2.2 AA (kontrollera kontrasten för texten på bild eller färg), mobil först, inga JS-fel och ingen sidledsskroll från 320 till 1440 px.
- Bilder: använd sajtens egna i `img/`, eller kopiera fler från `verktyg/elevate-quiz/img/` (och lägg till dem i sajtens `img/KALLOR.md`). Mörkläggningen av foton ska vara lätt så att bilden lyser. Använd hellre en gradient från ett håll eller en platta än en grå hinna.
- Rörelse: diskret och respektera `prefers-reduced-motion`.
- Ta nya skärmdumpar i sajtens `skarmdumpar/` (JPEG kvalitet 80, deviceScaleFactor 2): `dator.jpg` (helsida), `mobil.jpg` (helsida) och `hero.jpg` (bara första skärmen på dator, 1440 × 900).
- Committa inte. Rör bara dina egna mappar. Använd din egen port.
- Rapportera kort per sajt: vad heron är nu och eventuella brister.

## Hero-typ per sajt
| Sajt (mapp) | Hero-typ |
|---|---|
| restaurang | Foto i full höjd med texten nere till vänster och gradient nerifrån. Ljusare än i dag, så att maten lyser. Dagens lunch som liten flytande ruta. |
| elektriker | Delad 50/50: mättad blå varumärkesyta med stor text till vänster och foto till höger, plus ett rundat "Svar inom 24 h"-märke som korsar skarven. |
| snickare | Foto i full bredd med en stor varm brun platta som överlappar fotots nederkant och innehåller rubriken och postnummerfältet. |
| badrum | Interaktivt före/efter-reglage med två bilder i full bredd (gör "före" med CSS-filter på samma bild om ingen annan finns). Texten står på en mörk platta. |
| tradgard | Årstidsväxling: stor bild med fyra årstidsflikar (vår, sommar, höst, vinter) som byter färgton och text. Postnummerfältet ligger under. |
| frisor | Tonad varumärkesbakgrund (rost, mörk) med stor typografi till vänster och ett högt porträttfoto i en rundad båge till höger. Lediga tider idag som chips. |
| spa | Lugn mörk plommonyta, stort centrerat foto i cirkel- eller ellipsmask, mjuk ljusglöd och typografi i två rader runt bilden. |
| tandlakare | Ljus koboltyta (inte vit), foto i rundad ram och flytande infokort ("Nästa lediga tid: tor 10.30", "Nya patienter välkomna"). |
| fysio | Mörk rostfärgad yta med ett stort sökfält "Var gör det ont?" och kroppszonchips (Rygg, Nacke, Knä, Axel) som stora pill-knappar. Fotot ligger som ett smalt band. |
| redovisning | Mörk bläckblå yta med en levande minikalkylator i heron (bolagsform och antal verifikationer, månadspriset uppdateras direkt). Texten till vänster. |
| saas | Mörk violett yta med en stor lutad UI-skiss av schemat (HTML/CSS), svävande notiskort och e-postfält med "Prova gratis". |
| skor | Färgblock: en stor sko på en mättad konjakyta, jättestor rubrik som går bakom och framför produkten och tre färgprickar som byter bakgrundsfärg. |
| hudvard | Redaktionell: delad med en stor produktbild på en ljungtonad yta, ett tunt citat och knappen "Gör hudtestet" med en liten tre-stegsindikator. |
| mobler | Rumsbild i full höjd med två eller tre "shop the look"-punkter som visar produktkort (namn, pris och pil) när man klickar eller hovrar. |
| klader | Collage med tre bilder i olika storlek och en terrakotta- eller plommonruta med rubriken, i asymmetriskt rutnät. |
| hotell | Panoramafoto i full höjd med en bokningsrad (datum, gäster, Visa lediga rum) som ligger över fotots nederkant och sticker ut nedanför. |
| maklare | Foto av en bostad med ett stort adressfält "Vad är din bostad värd?" och en rullande rad med nyligen sålda bostäder nertill. |
| gym | Mörk, energisk: diagonalt beskuret foto, mycket stor kompakt rubrik, en "Nästa pass 17.30 – Spinning"-rad som räknar ner och en primärknapp. |
| bilverkstad | Grafitmörk yta med ett stort registreringsskyltfält i svensk skyltstil (blå EU-kant, vit platta), med fotot av verkstaden till höger. |
| kafe | Varm kanelton med tre runda produktfoton i olika storlek, rubrik i stor text och en "Bakat i natt"-rad. |
| stugby | Mycket bred panoramabild över sjön, texten i himlen och ett frostat sökfält för datum och gäster nertill. |
