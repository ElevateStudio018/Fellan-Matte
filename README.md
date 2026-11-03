# Fellan Matte

En lugn, ren matteapp för klassrummet: **boken**, en **AI-lärare som aldrig ger svaret** och en **digital handuppräckning** som säger till läraren (även på Apple Watch) exakt vem som behöver hjälp, var hen sitter och vad hen fastnat på.

**Förhandsvisning:** https://elevatestudio018.github.io/Fellan-Matte/

Testa båda sidor: öppna länken i två olika webbläsare (eller ett vanligt och ett privat fönster). Välj **Lärare** i det ena, starta en lektion och skriv in klasskoden som **Elev** i det andra.

---

## Funktioner

### För eleven
- **Boken** – kapitel, teori i korthet och alla uppgifter med nivå (●●○).
- **Hjälpsteg** – Ledtråd 1 → Ledtråd 2 → Regel/formel → Liknande exempel med *andra* tal. Öppnas ett i taget.
- **AI-läraren** (egen sida i menyn) – fyra lägen: **Hjälp med ett kapitel**, **Prata om matte**, **Jag har fastnat** (text eller foto av uppgiften) och **Förhör mig**. Guidad problemlösning med ledtrådstrappa i fyra nivåer, förklaringar på fem olika sätt, felanalys och minne under samtalet. Ger **aldrig** det färdiga svaret.
- **Ledtrådstrappa** – Liten ledtråd → Tydligare ledtråd → Vägledning med liknande exempel → Extra pedagogisk hjälp. Eleven kan be om nästa nivå, men svaret avslöjas aldrig.
- **Förhör** – en fråga i taget från bokens kapitel (eller ett valt moment), nivå som anpassas efter svaren, feedback på resonemanget och en ny liknande fråga när eleven förstått. Facit används bara för rättning och visas aldrig.
- **Förklara på annat sätt** – enklare förklaring, steg för steg, visuellt, vardagsexempel eller en annan metod.
- **AI-läraren i uppgiften** – chatten bredvid varje uppgift förklarar vilken regel som gäller, ställer ledande frågor, visar en alternativ lösning med andra tal och pekar ut första felsteget i elevens uträkning.
- **Facitkoll** – eleven skriver sitt svar och får rätt/fel, utan att facit visas. Förstår `x = 13`, `896 kr`, `0,5` och uttryck som `2(x+6)`.
- **Räck upp handen** – välj uppgift och typ av problem (”förstår inte frågan”, ”fastnat på ett steg”, ”vill kolla min lösning”) och skriv vad du provat. Läraren ser också vad du frågat AI:n.
- **Medan du väntar** – köplats, ungefärlig väntetid, länk till nästa hjälpsteg, ”hoppa till nästa uppgift så länge” och **kompishjälp** från klasskamrater som redan klarat uppgiften.
- **”Jag löste det själv”** – handen åker ner automatiskt när facitkollen visar rätt.
- **Dagens lektion**, kommande **prov** med nedräkning och övningslänkar, och **genomgångar** (YouTube/video).
- **Räknare** (enkel eller vetenskaplig) – bara när läraren tillåter det.
- **Exit ticket** när lektionen avslutas.

### För läraren
- **Live-kö** sorterad efter väntetid, med bänknummer, uppgift (klicka för att se uppgiften), kategori, elevens anteckning och AI-sammanfattning.
- **Jag kommer / Klar** – eleven ser direkt att du är på väg. En timer visar hur länge du hjälpt (gul efter 3 min, röd efter 5).
- **Gruppförslag** – när flera fastnat på samma uppgift: ”Samla dem vid tavlan” = en minigenomgång istället för fem separata.
- **Klassrumskarta** – vem som räcker upp handen, mår bra/sådär och vem som lämnat appen.
- **Fokusläge** – appen körs i helskärm. Byter eleven flik, minimerar eller lämnar helskärm syns det i fokusloggen, på kartan och (efter 5 s) på klockan.
- **Lektionsplanering** – uppgifter, räknare av/enkel/vetenskaplig, fokusläge, facitkoll, mål, instruktion och genomgångar per lektion.
- **Prov och genomgångar** – läggs in en gång och syns hos alla elever.
- **Boken** – fotografera sidor (AI skriver av), klistra in text eller ladda upp JSON.
- **Ljud + skrivbordsnotis** vid handuppräckning.

---

## Apple Watch

Appen skickar notiser via [ntfy](https://ntfy.sh) – en gratis notistjänst med iPhone-app. iPhone speglar notiserna till klockan.

1. Logga in som lärare → **Inställningar**.
2. Installera **ntfy** från App Store, tryck **+** och prenumerera på kanalen som visas (t.ex. `fm-abc123-klocka`) – eller skanna QR-koden.
3. Tryck **Skicka testnotis**.
4. När en elev räcker upp handen kommer notisen med en **Jag kommer**-knapp direkt på klockan.

---

## AI-läraren (Claude)

Utan inställning körs ett inbyggt hjälpläge med bokens ledtrådar. För riktig AI används en liten server (Cloudflare Worker) som håller API-nyckeln hemlig:

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # nyckel från console.anthropic.com
npx wrangler secret put TEACHER_PIN         # samma PIN som i lärarläget (för att fotografera boksidor)
npx wrangler deploy
```

Klistra in adressen du får (t.ex. `https://fellan-matte-ai.<namn>.workers.dev`) under **Inställningar → AI-adress**. Den skickas automatiskt till elevernas datorer när lektionen startar. I `worker/wrangler.toml` kan du låsa AI:n till era klasskoder (`CLASS_CODES`).

Modell: `claude-opus-5-5` med låg ”effort” för snabba svar. De pedagogiska reglerna är systeminstruktioner på servern (`worker/src/index.js`): guidad problemlösning, ledtrådsnivåer, felanalys och förbud mot färdiga svar.

Servern har tre vägar: `/chat` (strömmar samtalet), `/quiz` (skapar en förhörsfråga med dolt facit) och `/extract` (lärarens boksidor).

**Svarsskydd:** eftersom en språkmodell inte kan garantera reglerna bara genom en instruktion kontrolleras svaren också maskinellt i `shared/tutor-core.js`. Om ett svar innehåller det slutliga svaret på elevens uppgift stoppas det – servern håller tillbaka de sista tecknen i strömmen och byter ut hela svaret mot en vänlig omdirigering, och klienten gör samma kontroll en gång till. Elevens egna svar får däremot bekräftas. Kontrollen har enhetstester (`npm test`).

---

## Läsa in er mattebok

Exempelboken i appen är egenskriven. Så här lägger ni in er egen:

- **Fotografera sidor** (Lärare → Boken) – AI:n skriver av varje uppgift ordagrant och föreslår regel, ledtrådar och facit.
- **Klistra in text**:
  ```
  # 2 Procent
  Teori: Procent betyder hundradelar.
  2101 Hur mycket är 15 % av 240 kr?
  Svar: 36
  Ledtråd: Skriv 15 % som decimaltal.
  Regel: Delen = andelen · det hela – multiplicera
  ```
- **Dela med hela klassen:** tryck **Exportera**, lägg filen som `data/book.json` i repot och pusha. Alla elever får boken nästa gång de öppnar appen.

> Upphovsrätt: läs bara in material som skolan har licens för och håll det inom klassen. Är ni osäkra – fråga förlaget om digital användning.

---

## Bra att veta

- **Realtid** går via ntfy-kanaler som heter som klasskoden. Den publika servern `ntfy.sh` är gratis men har gränser per IP-adress, och en hel skola delar ofta samma IP. Kör gärna en egen ntfy-server (`docker run -p 80:80 binwiederhier/ntfy serve`) och skriv adressen under Inställningar. Det är också bättre för integriteten (GDPR), eftersom elevnamn skickas över kanalen. Ett alternativ är att eleverna bara skriver förnamn eller initialer.
- **Fokusläget** kan inte fysiskt låsa en dator – ingen webbsida kan det. Det upptäcker och rapporterar istället när eleven lämnar. För helt låsta enheter: Guidad åtkomst (iPad), kioskläge (Chromebook) eller Safe Exam Browser.
- Allt sparas lokalt i webbläsaren (localStorage). Lärarens lektioner/prov/genomgångar skickas till eleverna när de sparas (knappen **Skicka om allt innehåll** finns under Inställningar).
- AI-lärarnas minne (kapitel, ledtrådsnivå, återkommande misstag och samtalet) sparas också bara lokalt. Eleven ser och rensar det under **AI-läraren → Ditt minne**. Inga bilder sparas – de skickas bara med i den fråga eleven ställer.

## Teknik

Ren HTML/CSS/JavaScript (ES-moduler) utan byggsteg – fungerar direkt på GitHub Pages.

```
index.html          appens skal
css/app.css         design (ljust/mörkt läge)
js/app.js           routing och layout
js/student.js       elevvyer, handuppräckning, AI-chatt i uppgiften
js/coach.js         AI-läraren: startvy, fyra lägen, förhör, minne
js/teacher.js       klassrum, lektioner, prov, bok, inställningar
js/sync.js          realtid (ntfy + BroadcastChannel)
js/focus.js         fokusläge
js/tutor.js         AI-klient, förhörsfrågor + inbyggt hjälpläge
js/calc.js          säker räknare och facitkoll
js/content.js       exempelbok, lektioner, prov
shared/tutor-core.js  pedagogisk kärna: ledtrådsnivåer, svarsskydd, felanalys
worker/             AI-server (Cloudflare Worker + Claude)
tests/              enhetstester för svarsskyddet (`npm test`)
```

Kör lokalt: `python3 -m http.server` och öppna http://localhost:8000.

Tester: `npm test` (Node 18+). De kontrollerar att svarsskyddet stoppar facit men släpper igenom ledtrådar, att elevens egna svar får bekräftas, felanalysen och nivåanpassningen.
