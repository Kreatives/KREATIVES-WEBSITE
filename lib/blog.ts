// Blog CMS — file-based content store.
// Eén entry per artikel. /blog/[slug] leest hier uit en pre-rendert
// alle artikelen statisch via generateStaticParams.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  image: string;
  body: string[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "wat-kost-een-website-laten-maken-in-2026",
    title: "Wat kost een website laten maken in 2026?",
    excerpt:
      "Een eerlijke uitleg van de prijzen in 2026, wat de kosten bepaalt en wat je per branche mag verwachten. Inclusief prijstabel.",
    date: "2026-06-24",
    readingMinutes: 8,
    image: "/projects/3.webp",
    tags: ["Prijzen", "Webdesign"],
    body: [
      "> **TL;DR:** Een professionele website laten maken kost in 2026 grofweg tussen de 750 euro voor een enkele landingspagina en 15.000 euro of meer voor uitgebreid maatwerk met webshop of koppelingen. De meeste ondernemers zitten tussen de 2.500 en 6.000 euro. De prijs hangt vooral af van het aantal pagina's, de mate van maatwerk en of er techniek zoals een webshop of boekingssysteem bij komt kijken.",
      "Vraag tien bureaus wat een website kost en je krijgt tien verschillende antwoorden. Dat is niet omdat iemand je iets probeert aan te smeren, maar omdat een website net zoiets is als een huis. Een studio bouw je anders dan een vrijstaande woning, en de prijs volgt de vraag. Hieronder lees je precies wat je in 2026 mag verwachten en waar je geld naartoe gaat.",
      "## Prijzen per type website in 2026",
      "Dit zijn de richtprijzen die wij in de markt zien. Ze gelden voor een site die door een professional wordt gebouwd, niet voor een kant-en-klaar sjabloon dat je zelf invult.",
      "| Type website | Indicatieve prijs | Voor wie |\n| --- | --- | --- |\n| Losse landingspagina | 750 tot 1.500 euro | Eén aanbod of campagne |\n| Website van 5 tot 8 pagina's | 2.000 tot 5.000 euro | De meeste mkb-ondernemers |\n| Maatwerk website | 5.000 tot 12.000 euro | Merken die willen opvallen |\n| Webshop | 4.000 tot 15.000 euro | Verkoop van producten |\n| Website met koppelingen | 8.000 euro en meer | Boekingen, CRM, klantportaal |",
      "Let op: dit zijn eenmalige bouwkosten. Reken daarnaast op terugkerende kosten voor hosting, domein en onderhoud. Daar komen we verderop op terug.",
      "## Wat bepaalt de prijs van je website?",
      "De meeste ondernemers denken dat het aantal pagina's de prijs bepaalt. Dat is maar deels waar. Vier dingen wegen zwaarder.",
      "### 1. De mate van maatwerk",
      "Een template is snel en goedkoop, maar past zich aan jou aan in plaats van andersom. Echt [maatwerk webdesign](/diensten/webdesign) wordt rond jouw aanbod en merk gebouwd, en dat kost meer uren. Die uren verdienen zich terug in een site die beter converteert, maar ze zitten wel in de offerte.",
      "### 2. De hoeveelheid content",
      "Wie zelf goede teksten en beeld aanlevert, is goedkoper uit dan wie het bureau laat schrijven en fotograferen. Copywriting, fotografie en het opzetten van een goede structuur zijn losse posten die snel oplopen.",
      "### 3. De techniek eronder",
      "Een etalagesite is een ander verhaal dan een site met een webshop, een boekingssysteem of een koppeling met je boekhouding. Elke koppeling is bouwwerk en testwerk, en dat zie je terug in de prijs.",
      "### 4. Wie het bouwt",
      "Een zzp'er is doorgaans goedkoper dan een bureau, maar levert ook een ander pakket. Bij een bureau betaal je mee aan strategie, meerdere specialisten en continuïteit als er over een jaar iets moet worden aangepast.",
      "## Website laten maken: prijs per branche",
      "De branche waarin je zit, stuurt de prijs meer dan je denkt. Niet omdat de ene ondernemer meer betaalt dan de andere, maar omdat elke branche zijn eigen eisen heeft.",
      "| Branche | Typische prijs | Waarom |\n| --- | --- | --- |\n| Coach of adviseur | 2.000 tot 4.500 euro | Vertrouwen en autoriteit uitstralen |\n| Restaurant of horeca | 1.500 tot 4.000 euro | Sfeer, menu en reserveringen |\n| Webshop of retail | 4.000 tot 15.000 euro | Productbeheer en betalingen |\n| Bouw of installatie | 2.500 tot 5.000 euro | Portfolio en offerteaanvragen |\n| Zorg of praktijk | 3.000 tot 6.000 euro | Afspraken en privacy |",
      "Zoek je specifiek uit wat een site in jouw vak kost? Lees dan ook onze gidsen over een [website voor een restaurant](/blog/website-voor-restaurant-laten-maken) of een [website voor coaches](/blog/website-voor-coaches).",
      "[[NOTE: Voeg hier een echte offerte of prijsopbouw toe uit een recent project (bedragen weggelakt) zodat lezers zien hoe een posten-overzicht er in de praktijk uitziet.]]",
      "## Wat kost een website per maand?",
      "Naast de eenmalige bouwkosten heb je terugkerende kosten. Die worden vaak vergeten, terwijl ze bepalen of je site over drie jaar nog goed werkt.",
      "- Domeinnaam: 10 tot 20 euro per jaar\n- Hosting: 5 tot 40 euro per maand, afhankelijk van de zwaarte\n- Onderhoud en updates: 25 tot 150 euro per maand\n- Eventuele licenties voor plug-ins of een webshop-platform",
      "Wie kiest voor een goedkope losse bouwer en daarna zelf het onderhoud laat versloffen, betaalt dat vaak dubbel terug bij de eerstvolgende storing. Reken onderhoud dus mee vanaf dag één.",
      "## Waarom een goedkope website duur kan uitpakken",
      "Een site van een paar honderd euro klinkt aantrekkelijk, en soms is het genoeg. Maar de rekening komt vaak later. Een template die niet is gebouwd rond jouw aanbod, converteert minder, is lastig uit te breiden en moet binnen een paar jaar alsnog opnieuw. In [onze cases](/projecten) zie je wat er gebeurt als een site wél rond het merk wordt opgebouwd: minder bezoekers die afhaken, meer die contact opnemen.",
      "De eerlijke vuistregel: kijk naar de waarde van één klant. Is een klant in jouw vak een paar honderd euro of meer waard, dan verdient een goed gebouwde site zich vaak binnen een jaar terug.",
      "## Veelgestelde vragen over de kosten van een website",
      "### Wat is de goedkoopste manier om een website te laten maken?",
      "Een losse landingspagina of een template die je zelf invult. Reken op 0 tot 1.500 euro. Prima voor een eerste stap of een campagne, maar beperkt in groei en uitstraling.",
      "### Waarom lopen offertes zo uiteen?",
      "Omdat 'een website' alles kan betekenen, van één pagina tot een platform met koppelingen. Vraag altijd naar een uitgesplitste offerte, zodat je posten kunt vergelijken in plaats van eindbedragen.",
      "### Kan ik in termijnen betalen?",
      "Bij de meeste bureaus wel, meestal een deel vooraf en de rest bij oplevering. Vraag dit gerust, het is gebruikelijk.",
      "### Hoe weet ik welke prijs klopt voor mijn situatie?",
      "Dat weet je pas als je aanbod, doelen en techniek helder zijn. Daarom beginnen wij met een [gratis blueprint-sessie](/blauwdruk): daarin bepalen we samen wat je écht nodig hebt, zodat de offerte klopt en er achteraf geen verrassingen zijn.",
      "Wil je een concreet bedrag voor jouw plannen? Plan een [vrijblijvende blueprint-sessie](/blauwdruk) of bekijk eerst [wat we voor andere ondernemers bouwden](/projecten).",
    ],
  },
  {
    slug: "ai-website-laten-maken",
    title: "AI-website laten maken: wat het is, wat het kost en wanneer het slim is",
    excerpt:
      "AI verandert hoe websites gebouwd worden. Wat betekent een AI-website voor jou, wat levert het op en waar zitten de valkuilen?",
    date: "2026-06-10",
    readingMinutes: 7,
    image: "/projects/7.webp",
    tags: ["AI", "Webdesign"],
    body: [
      "> **TL;DR:** Een AI-website laten maken betekent dat kunstmatige intelligentie wordt ingezet bij het bouwen én het draaien van je site, van slimmere teksten en beeld tot een chat die bezoekers direct helpt. Het kan sneller en goedkoper, maar alleen als een mens de strategie en de kwaliteit bewaakt. Puur door AI gegenereerde sites voelen vaak generiek en converteren slecht.",
      "AI is in korte tijd van speeltje naar gereedschap gegroeid. Voor websites betekent dat twee dingen: je kunt AI gebruiken om sneller te bouwen, en je kunt AI ín je site stoppen zodat bezoekers slimmer geholpen worden. Beide zijn interessant, maar geen van beide is een wondermiddel. Hieronder lees je wat wel en niet werkt.",
      "## Wat is een AI-website eigenlijk?",
      "De term wordt voor twee verschillende dingen gebruikt. Het helpt om ze uit elkaar te houden.",
      "### AI in het bouwproces",
      "Hierbij gebruikt de maker AI om onderdelen sneller te maken: teksten schrijven, beeld genereren, code versnellen, varianten testen. Jij ziet het resultaat, niet het gereedschap. Goed ingezet levert dit een scherpere prijs en een kortere doorlooptijd op.",
      "### AI in de website zelf",
      "Hierbij zit de slimheid in de live site. Denk aan een chatbot die vragen van bezoekers beantwoordt, aanbevelingen op maat, of content die zich aanpast aan wie er kijkt. Dit is waar onze [AI-diensten](/diensten/ai) over gaan: techniek die bezoekers écht verder helpt in plaats van een gimmick.",
      "## Wat levert een AI-website op?",
      "De winst zit niet in het woord 'AI', maar in wat het voor je bezoeker doet. De drie effecten die we in de praktijk zien:",
      "- Bezoekers krijgen sneller antwoord, dus haken minder af\n- Je vangt vragen op buiten kantooruren, zonder extra personeel\n- Je bespaart tijd op teksten en beheer, die je in je bedrijf steekt",
      "[[NOTE: Voeg hier een concreet resultaat toe van een AI-project, bijvoorbeeld hoeveel aanvragen de chat-assistent per maand afvangt of hoeveel sneller de site live stond.]]",
      "## Wat kost een AI-website?",
      "Een site die met behulp van AI wordt gebouwd, hoeft niet duurder te zijn dan een reguliere site, en is soms zelfs goedkoper omdat het bouwproces sneller gaat. AI-functies ín de site kosten wel extra, omdat er techniek en koppelingen bij komen kijken.",
      "| Onderdeel | Indicatieve prijs |\n| --- | --- |\n| Website gebouwd met AI-ondersteuning | 2.000 tot 6.000 euro |\n| Slimme chat-assistent toevoegen | 750 tot 3.000 euro |\n| Content of aanbevelingen op maat | vanaf 2.500 euro |\n| Doorlopende AI-kosten (tokens, licenties) | 20 tot 200 euro per maand |",
      "Wil je weten hoe dit zich verhoudt tot een gewone site? Lees dan [wat een website laten maken in 2026 kost](/blog/wat-kost-een-website-laten-maken-in-2026).",
      "## De valkuil: een site die ruikt naar AI",
      "Er verschijnen nu overal sites die volledig door AI zijn volgeschreven. Ze zien er op het eerste gezicht net uit, maar lezen vlak en zeggen niets wat een concurrent niet ook zegt. Zoekmachines en bezoekers prikken daar snel doorheen.",
      "Onze regel is simpel: AI doet het zware werk, een mens bepaalt de richting en bewaakt de toon. Zo hou je snelheid zonder dat je merk verwatert. Bekijk [onze recente projecten](/projecten) om te zien hoe dat eruitziet.",
      "## Wanneer is een AI-website slim voor jou?",
      "Niet elk bedrijf heeft AI-functies nodig. Deze drie situaties zijn een goede reden om erover na te denken.",
      "1. Je krijgt veel terugkerende vragen die een assistent kan afvangen\n2. Je hebt een groot aanbod waarin bezoekers moeten kunnen zoeken of kiezen\n3. Je wilt sneller en met minder budget een sterke site online hebben",
      "Herken je jezelf hierin niet, dan is een goed gebouwde reguliere site waarschijnlijk de betere keuze. Eerlijk advies hoort erbij.",
      "## Veelgestelde vragen over AI-websites",
      "### Vervangt AI de webdesigner?",
      "Nee. AI versnelt het werk, maar strategie, smaak en het bewaken van je merk blijven mensenwerk. De beste resultaten komen uit de combinatie.",
      "### Is een AI-website beter voor Google?",
      "Niet automatisch. Google beoordeelt de kwaliteit en bruikbaarheid van je content, niet of er AI aan te pas kwam. Slecht ingezette AI schaadt je vindbaarheid juist.",
      "### Kan ik later AI-functies toevoegen aan mijn bestaande site?",
      "Vaak wel, mits je site technisch gezond is. In een [blueprint-sessie](/blauwdruk) kijken we of dat in jouw geval kan.",
      "Benieuwd wat AI concreet voor jouw site kan betekenen? Bekijk onze [AI-diensten](/diensten/ai) of plan een [vrijblijvende blueprint-sessie](/blauwdruk).",
    ],
  },
  {
    slug: "wanneer-is-het-tijd-om-je-website-te-vernieuwen",
    title: "Wanneer is het tijd om je website te vernieuwen? 7 signalen",
    excerpt:
      "Niet elke oude site hoeft vervangen. Maar deze zeven signalen laten zien dat het tijd wordt voor een nieuwe website.",
    date: "2026-05-22",
    readingMinutes: 6,
    image: "/projects/6.webp",
    tags: ["Redesign", "Strategie"],
    body: [
      "> **TL;DR:** Het is tijd om je website te vernieuwen als de site niet meer klopt met wat je doet, traag of niet mobielvriendelijk is, slecht scoort in Google, of als je je er stiekem voor schaamt. Één signaal is geen ramp. Zodra er twee of drie tegelijk spelen, verdient een nieuwe site zich bijna altijd terug.",
      "Een website veroudert langzaam, en juist daarom zie je het zelf vaak niet. Je kijkt er dagelijks naar en went aan de scheurtjes. Toch beslist je bezoeker binnen enkele seconden of hij blijft of wegklikt. Deze zeven signalen helpen je eerlijk te bepalen of het tijd is.",
      "## 1. Je site klopt niet meer met wat je doet",
      "Je bent begonnen met één dienst en levert er inmiddels vijf. Of je richt je op een heel andere doelgroep dan drie jaar geleden. Als je site structureel om je aanbod heen moet worden geplooid, is hij versleten. Bezoekers zien dan niet in één oogopslag wat je nu doet.",
      "## 2. De site is traag",
      "Laadt je site in meer dan drie seconden, dan ben je een deel van je bezoekers al kwijt voordat ze iets hebben gezien. Snelheid weegt bovendien mee in je positie bij Google. Trage sites zakken weg, en die schade stapelt zich op.",
      "## 3. Hij werkt niet goed op mobiel",
      "Meer dan de helft van je bezoekers komt via de telefoon. Moet iemand knijpen, scrollen en zoeken om je knop te vinden, dan haakt hij af. Een site die niet meebeweegt met het scherm is in 2026 niet meer houdbaar.",
      "## 4. Je scoort slecht in Google",
      "Kom je niet voor op de zoekwoorden die er voor jou toe doen, dan mis je elke dag bezoekers aan je concurrent. Vaak ligt dat aan een verouderde structuur, dunne content of trage techniek. Een [redesign](/diensten/webdesign) pakt die dingen in één keer aan.",
      "## 5. De site levert niets op",
      "Veel bezoekers, maar weinig aanvragen? Dan lekt er ergens iets weg. Een site hoort bezoekers naar één duidelijke actie te leiden. Gebeurt dat niet, dan is hij mooi maar zonder functie.",
      "[[NOTE: Voeg hier een voor-en-na van een recent redesign toe, bijvoorbeeld het aantal aanvragen per maand voor en na de nieuwe site.]]",
      "## 6. Aanpassen kost te veel moeite",
      "Moet je voor elke kleine wijziging je bureau bellen, of durf je niets aan te raken uit angst dat er iets breekt? Dan werkt de site tegen je in plaats van voor je. Een gezonde site pas je zelf eenvoudig aan.",
      "## 7. Je schaamt je er een beetje voor",
      "Dit klinkt subjectief, maar het is de meest betrouwbare graadmeter. Deel je je kaartje uit en hoop je stiekem dat de ander de site niet meteen opent? Dan weet je genoeg.",
      "## Vernieuwen of opnieuw bouwen?",
      "Niet elk signaal vraagt om een complete herbouw. Soms is een opfrisbeurt genoeg. Dit is het verschil.",
      "| Situatie | Aanpak |\n| --- | --- |\n| Verouderde uitstraling, techniek is gezond | Opfrissen |\n| Trage of onveilige techniek | Herbouwen |\n| Aanbod en doelgroep zijn veranderd | Herbouwen |\n| Losse pagina presteert slecht | Landingspagina vernieuwen |",
      "Twijfel je tussen opfrissen en opnieuw bouwen? Bekijk [wat we voor anderen deden](/projecten) of laat ons in een [blueprint-sessie](/blauwdruk) meekijken.",
      "## Veelgestelde vragen over het vernieuwen van je website",
      "### Hoe vaak moet een website vernieuwd worden?",
      "Als vuistregel elke drie tot vijf jaar. Techniek en verwachtingen verschuiven snel, en na die periode loopt een site meestal op meerdere vlakken achter.",
      "### Wat kost het vernieuwen van een website?",
      "Een opfrisbeurt is er soms al vanaf een paar honderd euro, een volledige herbouw begint meestal rond 2.500 euro. Lees onze uitleg over [wat een website in 2026 kost](/blog/wat-kost-een-website-laten-maken-in-2026).",
      "### Verlies ik mijn Google-posities bij een nieuwe site?",
      "Niet als het goed gebeurt. Met de juiste doorverwijzingen en behoud van je content houd je je posities, en vaak verbeter je ze zelfs.",
      "Herken je twee of meer signalen? Plan dan een [vrijblijvende blueprint-sessie](/blauwdruk) en ontdek wat een [nieuwe website](/diensten/webdesign) je oplevert.",
    ],
  },
  {
    slug: "website-voor-restaurant-laten-maken",
    title: "Website voor een restaurant laten maken: de complete gids",
    excerpt:
      "Wat maakt een restaurantwebsite goed, wat kost het en welke onderdelen mag je niet vergeten? Een praktische gids voor horecaondernemers.",
    date: "2026-05-08",
    readingMinutes: 7,
    image: "/projects/burgers-frites.webp",
    tags: ["Horeca", "Webdesign"],
    body: [
      "> **TL;DR:** Een goede restaurantwebsite laat in één oogopslag de sfeer proeven, toont een actueel menu, maakt reserveren makkelijk en werkt vlekkeloos op mobiel. Reken in 2026 op 1.500 tot 4.000 euro, afhankelijk van of je online reserveren of bestellen toevoegt. Sfeer en snelheid wegen zwaarder dan een lange tekst.",
      "Je gast beslist vaak al op de bank, telefoon in de hand, of hij vanavond bij jou aanschuift. Je website is dat eerste tafeltje: is het gedekt en gastvrij, dan komt hij. Rommelig of traag, en hij boekt bij de buurman. Hieronder lees je hoe je een site bouwt die honger opwekt en tafels vult.",
      "## Wat maakt een restaurantwebsite goed?",
      "Bij horeca draait het om beleving. Bezoekers willen geen lap tekst, ze willen voelen hoe het is om bij jou te zitten. Dat vraagt om andere keuzes dan bij een zakelijke site.",
      "### Sfeer die je meteen voelt",
      "Goede fotografie is bij horeca geen luxe maar de kern. Een warme foto van je gerechten en je zaak doet meer dan tien zinnen. Investeer hierin, het is het eerste wat een gast ziet.",
      "### Een menu dat altijd klopt",
      "Niets frustreert een gast zo als een verouderde kaart of een menu dat alleen als pdf te openen is. Zorg dat je menu direct op de pagina staat, leesbaar op de telefoon, en dat je het zelf kunt bijwerken.",
      "### Reserveren zonder drempel",
      "Elke extra klik kost je reserveringen. Of het nu een knop naar je reserveringssysteem is of een simpel formulier, maak het onmogelijk om te verdwalen.",
      "## Onmisbare onderdelen op een rij",
      "- Openingstijden die kloppen, ook rond feestdagen\n- Adres met een kaart en een routeknop\n- Telefoonnummer dat op mobiel direct belt\n- Actueel menu met prijzen\n- Reserveren of bestellen met één druk op de knop\n- Sfeerbeeld van de zaak en de gerechten\n- Vindbaarheid in Google voor 'restaurant + jouw plaats'",
      "[[NOTE: Voeg hier een screenshot of resultaat toe van een horecaproject, bijvoorbeeld de burgerzaak uit onze cases, met een cijfer over reserveringen of bezoekers.]]",
      "## Wat kost een restaurantwebsite?",
      "De prijs hangt vooral af van wat je gasten online moeten kunnen doen: alleen kijken, of ook reserveren en bestellen.",
      "| Type | Indicatieve prijs |\n| --- | --- |\n| Etalagesite met menu en sfeer | 1.500 tot 2.500 euro |\n| Site met online reserveren | 2.500 tot 3.500 euro |\n| Site met online bestellen of afhalen | 3.000 tot 4.000 euro |",
      "Wil je de prijzen naast andere branches leggen? Bekijk onze uitleg over [wat een website in 2026 kost](/blog/wat-kost-een-website-laten-maken-in-2026).",
      "## Fouten die restaurants online maken",
      "Deze drie zien we het vaakst, en ze kosten stuk voor stuk gasten.",
      "1. Het menu alleen als pdf, die op mobiel amper te openen is\n2. Verouderde openingstijden waardoor gasten voor een dichte deur staan\n3. Zware foto's die de site traag maken, precies op het moment dat iemand honger heeft",
      "Een site die deze dingen goed doet, is precies waar [maatwerk webdesign](/diensten/webdesign) voor bedoeld is: gebouwd rond hoe jouw gasten kiezen. Bekijk [onze projecten](/projecten) voor voorbeelden.",
      "## Veelgestelde vragen over restaurantwebsites",
      "### Heb ik een website nodig als ik al op social media zit?",
      "Ja. Social media leent je publiek, maar je website is van jezelf. Reserveringen, openingstijden en je vindbaarheid in Google horen op een plek die jij beheert.",
      "### Hoe zorg ik dat mijn restaurant in Google verschijnt?",
      "Met een snelle site, je adres en openingstijden goed vermeld, en een gekoppeld Google-bedrijfsprofiel. Zo verschijn je bij zoekopdrachten als 'eten + jouw plaats'.",
      "### Kan ik het menu zelf bijwerken?",
      "Bij een goed gebouwde site wel. Vraag hier vooraf naar, want een menu dat je zelf beheert scheelt je op termijn veel tijd en geld.",
      "Klaar om je tafels voller te krijgen? Plan een [vrijblijvende blueprint-sessie](/blauwdruk) of bekijk eerst [wat we voor andere ondernemers bouwden](/projecten).",
    ],
  },
  {
    slug: "website-voor-coaches",
    title: "Website voor coaches: zo bouw je een site die klanten oplevert",
    excerpt:
      "Als coach verkoop je vertrouwen. Zo bouw je een website die dat vertrouwen wekt en van bezoekers klanten maakt.",
    date: "2026-04-24",
    readingMinutes: 7,
    image: "/projects/sabreen-mia.webp",
    tags: ["Coaches", "Webdesign"],
    body: [
      "> **TL;DR:** Een goede coachingwebsite bouwt vertrouwen op en maakt de stap naar een gesprek klein. Dat lukt met een helder verhaal over wie je helpt en waarmee, echte social proof, een duidelijke volgende stap en een gezicht dat de bezoeker herkent. Reken op 2.000 tot 4.500 euro. Als coach verkoop je jezelf, dus je site mag niet als een sjabloon voelen.",
      "Mensen kiezen geen coach op basis van je pakketten, maar op basis van een gevoel: snapt deze persoon mij, en durf ik me kwetsbaar op te stellen? Je website is de eerste plek waar dat gevoel ontstaat. Hieronder lees je hoe je een site bouwt die dat vertrouwen wekt en bezoekers naar een gesprek leidt.",
      "## Waarom een coachingwebsite anders werkt",
      "Bij de meeste bedrijven verkoopt de website een product of dienst. Bij jou verkoopt hij een relatie. Dat verandert waar de nadruk ligt.",
      "### Jij bent het merk",
      "Een bezoeker wil weten wie je bent voordat hij zich meldt. Een echte foto, je eigen verhaal en je manier van praten wegen zwaarder dan een lijst met certificaten. Een generieke template werkt hier tegen je, want die voelt als iedereen behalve jij.",
      "### Vertrouwen gaat voor volledigheid",
      "Je hoeft niet alles te vertellen. Je moet vertrouwen wekken. Dat doe je met rust, ruimte en een verhaal dat de bezoeker in zichzelf herkent, niet met een pagina volgepropt met tekst.",
      "## De onderdelen die het verschil maken",
      "- Een heldere belofte: wie help je, waarmee, en wat levert het op\n- Jouw verhaal en een echte foto, zodat je een gezicht krijgt\n- Social proof: ervaringen van mensen die je hebt geholpen\n- Eén duidelijke volgende stap, meestal een kennismakingsgesprek\n- Een eenvoudige manier om die afspraak te plannen",
      "### Maak de eerste stap zo klein mogelijk",
      "Een bezoeker durft zich zelden meteen aan een heel traject te binden. Bied daarom een kleine, veilige eerste stap aan: een gratis kennismaking of een vrijblijvend gesprek. Zo verlaag je de drempel precies op het moment dat iemand twijfelt.",
      "[[NOTE: Voeg hier een echte klantervaring of een citaat van een coachee toe (met naam of anoniem), zodat de social proof concreet wordt.]]",
      "## Wat kost een website voor coaches?",
      "Een coachingsite is qua omvang overzichtelijk, maar de uitstraling moet kloppen. Daar zit het werk.",
      "| Type | Indicatieve prijs |\n| --- | --- |\n| Eén sterke landingspagina | 750 tot 1.500 euro |\n| Complete coachingwebsite | 2.000 tot 3.500 euro |\n| Website met online agenda of programma | 3.500 tot 4.500 euro |",
      "Wil je deze prijzen in perspectief zien? Lees onze uitleg over [wat een website in 2026 kost](/blog/wat-kost-een-website-laten-maken-in-2026).",
      "## Veelgemaakte fouten bij coachingwebsites",
      "1. Praten over jezelf in plaats van over het probleem van de bezoeker\n2. Vakjargon gebruiken waar de klant gewone taal verwacht\n3. Geen duidelijke volgende stap, waardoor een warme bezoeker afkoelt",
      "Een site die dit goed doet, is gebouwd rond jouw manier van werken. Dat is precies waar [maatwerk webdesign](/diensten/webdesign) voor bedoeld is. Bekijk [onze cases](/projecten) om te zien hoe persoonlijkheid en rust samengaan.",
      "## Veelgestelde vragen over coachingwebsites",
      "### Heb ik meer nodig dan een landingspagina?",
      "In het begin niet altijd. Eén sterke pagina die vertrouwen wekt en naar een gesprek leidt, is vaak genoeg om te starten. Groei je, dan bouw je uit.",
      "### Hoe kom ik als coach hoger in Google?",
      "Door te schrijven over de vragen waar jouw doelgroep mee worstelt. Elk artikel dat een echt probleem beantwoordt, trekt precies de mensen die je zoekt.",
      "### Moet ik mijn tarieven op de site zetten?",
      "Dat mag, maar het hoeft niet. Belangrijker is dat de bezoeker de waarde voelt en makkelijk een gesprek kan plannen, waarin je de prijs in context zet.",
      "Klaar voor een site die klanten oplevert in plaats van alleen bezoekers? Plan een [vrijblijvende blueprint-sessie](/blauwdruk) of bekijk [wat we voor anderen bouwden](/projecten).",
    ],
  },
  {
    slug: "waarom-maatwerk-in-2026-nog-loont",
    title: "Waarom maatwerk in 2026 nog steeds loont",
    excerpt:
      "Templates zijn snel en goedkoop, maar de echte kosten zitten in wat je daarna niet meer kunt.",
    date: "2026-04-12",
    readingMinutes: 5,
    image: "/projects/2.webp",
    tags: ["Strategie", "Webdesign"],
    body: [
      "Je hoort het steeds vaker: waarom zou je nog maatwerk laten bouwen als een template binnen een dag online staat. Templates zijn snel, ze zijn goedkoop, en voor sommige gevallen werken ze prima. Maar er zit een rekening achteraan die je pas ziet als je een jaar verder bent.",
      "Een template is geoptimaliseerd voor wat de meeste mensen gemiddeld willen. Dat betekent dat jouw kernactiviteit waarschijnlijk maar half wordt afgedekt, en de unieke punten van je merk verdwijnen in een algemeen sjabloon. Voor een bakkerij op de hoek is dat geen probleem, voor een ondernemer die echt wil opvallen wel.",
      "Maatwerk verdient zich vaak vanzelf terug. Een site die exact rond jouw aanbod is gebouwd, converteert in onze praktijk vaak twee tot drie keer beter dan een vergelijkbare template. Voor één extra klant per maand is je investering binnen een jaar al rond.",
      "De tweede kostenpost zit in onderhoud en uitbreidingen. Templates zijn lastig aan te passen zonder dat je tegen beperkingen aanloopt. Maatwerk is opgebouwd in jouw eigen architectuur, en daar kun je in jaar drie nog dezelfde kant op uitbouwen als toen je begon.",
      "Voor wie nu twijfelt: kijk vooral naar de waarde per klant in jouw branche. Als één klant gemiddeld een paar honderd euro waard is, is maatwerk waarschijnlijk de juiste keuze.",
    ],
  },
  {
    slug: "hoe-een-strategiegesprek-de-prijs-bepaalt",
    title: "Hoe een strategiegesprek de prijs van je site bepaalt",
    excerpt:
      "De grootste kostenposten in een webdesign-traject ontstaan bijna altijd vóór er ook maar één ontwerp wordt gemaakt.",
    date: "2026-03-20",
    readingMinutes: 4,
    image: "/projects/5.webp",
    tags: ["Prijzen", "Werkwijze"],
    body: [
      "Veel ondernemers willen vooraf weten wat een site precies kost, en daar is niets mis mee. Maar de eerlijke prijs hangt af van een aantal vragen die je pas in een strategiegesprek goed kunt beantwoorden.",
      "Hoe groot is je aanbod, hoeveel pagina's heb je nodig, en hoe diep moet de structuur worden. Werkt de site op zichzelf of hangt er een webshop, een boekingssysteem of een klant-omgeving aan. Welke koppelingen met andere systemen zijn nodig.",
      "Vaak komt in dat eerste gesprek al naar boven dat de helft van wat de klant initieel had bedacht eigenlijk niet nodig is. Dat scheelt direct in de offerte. Andersom zien we ook regelmatig dat een ondernemer pas tijdens het gesprek bedenkt dat er een onderdeel ontbreekt dat juist heel belangrijk is.",
      "Onze prijzen op de site geven daarom een richtindicatie. De definitieve offerte krijg je na het eerste gesprek, met heldere posten en zonder verrassingen achteraf.",
    ],
  },
  {
    slug: "drie-redenen-om-je-site-opnieuw-te-laten-bouwen",
    title: "Drie redenen om je site opnieuw te laten bouwen",
    excerpt:
      "Niet elke verouderde site hoeft direct vervangen te worden. Maar deze drie signalen geven aan dat het tijd wordt.",
    date: "2026-02-05",
    readingMinutes: 6,
    image: "/projects/4.webp",
    tags: ["Redesign", "Strategie"],
    body: [
      "Een nieuwe site bouwen is een investering, en het is niet altijd nodig. Soms is een opfrisbeurt of een aantal aanpassingen genoeg. Maar deze drie signalen wijzen er bijna altijd op dat een complete herbouw de juiste keuze is.",
      "Het eerste signaal: de site klopt niet meer met wat je doet. Misschien ben je gestart met één product en lever je inmiddels vijf, of richt je je nu op een heel andere doelgroep dan vier jaar geleden. Een site die structureel om die verandering heen moet worden geplooid, raakt op een gegeven moment versleten.",
      "Het tweede signaal: de techniek loopt achter. Sites die laden in meer dan drie seconden, niet goed op mobiel werken, of nog op een verouderde CMS-versie draaien, schrikken bezoekers af voordat ze überhaupt aan je content toekomen. Hier geldt ook dat zoekmachines je positie verlagen, dus de schade stapelt zich op.",
      "Het derde signaal: je schaamt je een beetje. Dat klinkt subjectief, maar in de praktijk is het de meest betrouwbare indicator. Als je je kaartje uitdeelt en stiekem hoopt dat de ontvanger de site niet meteen opent, is het tijd om iets te doen.",
      "Geen van deze signalen op zichzelf maakt een herbouw direct noodzakelijk. Maar zodra twee of drie van toepassing zijn, is het bijna altijd verstandiger om een nieuwe site te laten bouwen dan om door te blijven aanpassen.",
    ],
  },
];

export function getAllPostSlugs() {
  return posts.map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date > b.date ? -1 : 1));
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", DATE_FORMAT);
}
