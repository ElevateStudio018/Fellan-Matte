# Uppdrag: 20 konceptsajter i olika branscher

Syfte: visa att Elevate UX-reglerna fungerar i alla branscher. Varje agent bygger två sajter. Lägg tiden på **design och tempo**. Fakta spelar ingen roll, så hitta på rimligt innehåll fritt: tjänster, priser, öppettider, texter och omdömen. Omdömen märks som exempel.

## Regler
- Följ din agentdefinition och `docs/elevate/designregler.md` strikt: pill-knapp med pil →, en primärknapp per sektion, linjeikoner, pil-länkar, hörnband på bilder, H1 halvfet med prick och så vidare. Regler märkta som standard (typsnitt Inter, fält, kort och header) gäller också.
- Varje sajt får en egen varumärkesfärg som passar branschen. Kontrollera kontrasten (WCAG 2.2 AA).
- Påhittat företag med svenskt namn och svensk ort. Inga riktiga varumärken. Telefon `010-000 00 00` och e-post `hej@<namn>.example`.
- Mobil först. Statisk HTML/CSS/JS. Inga JS-fel och ingen sidledsskroll från 320 till 1440 px.
- Använd `noindex` på alla sidor. Sidfoten har raden "Designkoncept av Elevate Studio. Påhittat företag med exempelinnehåll." och en länk till Bildkällor (`img/KALLOR.md`).

## Varje sajt
- Mapp: `koncept/<slug>/`. Sluggen anges i ditt uppdrag.
- `index.html`: en startsida med 5–7 block som passar branschen: hero, tjänster eller produkter, förtroende, så går det till, omdömen, priser, kontakt och liknande.
- Två undersidor som passar branschen, till exempel `tjanster.html`, `priser.html`, `produkt.html` eller `kontakt.html`.
- **Ett nyckelflöde som är typiskt för branschen**, byggt i ett steg i taget enligt reglerna: offertförfrågan, tidsbokning, varukorg och kassa, bokning av rum eller visning, provträning med mera. Använd native `<dialog>` (bottenark på mobil) eller en egen sida. Det ska vara klickbart hela vägen och sluta med en bekräftelse. Ingenting skickas.
- Typsnittet Inter, självhostat. Kopiera `koncept/restaurang/fonts/` (inter-latin-wght.woff2 och OFL.txt).
- Bilder: kopiera de som passar från `verktyg/elevate-quiz/img/` till `koncept/<slug>/img/` och skriv en kort `KALLOR.md` utifrån `verktyg/elevate-quiz/img/KALLOR.md`. Porträtt får bara användas som personal med påhittade namn, aldrig som riktiga kunder. Finns ingen bra bild, använd en snygg typografisk eller färgad yta i stället för en bild som inte passar.
- Variera layouten mellan sajterna inom reglerna, så att de 20 inte ser likadana ut.

## Kontroll och leverans
- Stickprov med Playwright i 1440 och 390 px. Använd din egen port enligt uppdraget och döda servern efteråt.
- Skärmdumpar i `koncept/<slug>/skarmdumpar/` (JPEG kvalitet 80, deviceScaleFactor 2): `dator.jpg` (helsida), `mobil.jpg` (helsida) och `flode.jpg` (ett steg i nyckelflödet).
- Committa inte. Rör bara dina egna mappar.
- Rapportera kort per sajt: namn, färg, sidor, nyckelflöde och brister.
