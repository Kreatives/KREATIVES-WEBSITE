// Alle copy en data voor /starter op één plek, zodat de pagina zelf leesbaar
// blijft. Geschreven volgens de KREATIVES tone-of-voice: volle zinnen, geen
// "geen X maar Y", geen streepjes, geen staccato.

export type Pakket = {
  id: string;
  no: string;
  name: string;
  tagline: string;
  droom: string;
  price: string;
  priceNumber: string;
  termijn: string;
  featured?: boolean;
  doorlooptijd: string;
  revisies: string;
  krijgt: string[];
  bump: { label: string; body: string; price: string };
};

export const packages: Pakket[] = [
  {
    id: "basis",
    no: "01",
    name: "Basis",
    tagline: "Eén pagina",
    droom: "Stop met je schamen voor je link.",
    price: "€695",
    priceNumber: "695",
    termijn: "Of in twee termijnen van €347,50",
    doorlooptijd: "5 werkdagen",
    revisies: "1 revisieronde",
    krijgt: [
      "Eén pagina, volledig op maat ontworpen",
      "Ontworpen voor telefoon én desktop",
      "Contactformulier",
      "Basis-SEO, zodat je gevonden kunt worden",
      "Het Figma-bronbestand, van jou",
      "Volledig eigendom en copyright",
      "Bouw in WordPress, jij beheert het zelf",
      "Overdracht op jouw domein en hosting",
    ],
    bump: {
      label: "Spoedstart",
      body: "Je ontwerp binnen 24 uur in plaats van vijf werkdagen.",
      price: "€95",
    },
  },
  {
    id: "premium",
    no: "02",
    name: "Premium",
    tagline: "Vijf pagina's",
    droom: "De eerste van je stad zijn, online.",
    price: "€1.495",
    priceNumber: "1495",
    termijn: "Of in twee termijnen van €747,50",
    featured: true,
    doorlooptijd: "10 werkdagen",
    revisies: "2 revisierondes",
    krijgt: [
      "Alles uit Basis",
      "Vijf pagina's: home, over, diensten, contact en één naar keuze",
      "Paginastructuur opgebouwd rond één actie per pagina",
      "Offerte- of aanvraagpagina",
      "Volledige paginaset in Figma, van jou",
      "Basis-SEO per pagina",
    ],
    bump: {
      label: "Teksten",
      body: "Ik schrijf de tekst per pagina, jij leest en keurt goed.",
      price: "€295",
    },
  },
  {
    id: "ecosysteem",
    no: "03",
    name: "Ecosysteem",
    tagline: "Tot acht pagina's",
    droom: "Een site die aanvragen oplevert zonder dat je erbij zit.",
    price: "€2.495",
    priceNumber: "2495",
    termijn: "Of in twee termijnen van €1.247,50",
    doorlooptijd: "15 werkdagen",
    revisies: "3 revisierondes",
    krijgt: [
      "Alles uit Premium",
      "Tot acht pagina's naar keuze",
      "Conversie-analyse van je huidige site",
      "Twee paginavarianten die je kunt testen",
      "Volledige Figma-bibliotheek met alle componenten",
      "Begeleiding bij livegang",
    ],
    bump: {
      label: "Extra pagina",
      body: "Nog één pagina erbij bovenop de acht.",
      price: "€95",
    },
  },
];

export const heroQuote = {
  quote:
    "Ricky luisterde goed naar onze wensen en het resultaat werd snel opgeleverd. Ik raad hem 100% aan.",
  author: "S. R.",
  company: "Mazar Skin Clinic",
};

export const upsells = [
  "Tracking (GA4 en pixels) kost €195 extra.",
  "Een extra revisieronde na je laatste ronde kost €75.",
  "Hosting en onderhoud laat je bij mij? Dat is €50 per maand.",
];

export const bonussen = [
  {
    title: "Het Figma-bronbestand",
    price: "€295",
    body: "Elke pagina, elke laag, elke guideline. Open het, klik het door, pas het aan met je eigen team of geef het later aan een andere partij. Zo zie je zwart op wit dat er een mens aan heeft gezeten.",
  },
  {
    title: "Dertig dagen kleine fixes",
    price: "€195",
    body: "Tot drie kleine dingen die je na livegang tegenkomt. Even mailen en het wordt opgelost, zonder dat je een nieuwe factuur krijgt.",
  },
  {
    title: "De laatste controle",
    price: "€145",
    body: "Voor overdracht loop ik je site na op dode links, snelheid en mobiel gebruik. Je krijgt het rapport erbij, zodat je weet wat er staat.",
  },
];

export const garantie = {
  title: "Niet live op de afgesproken dag?",
  accent: "Dan betaal je niets.",
  body:
    "Staat je site niet live binnen de termijn die we afspreken, dan krijg je alles terug, inclusief de eerste termijn. Je houdt het Figma-bestand, ook als je stopt.",
  voorwaarden:
    "De klok start op de dag dat jij je teksten en foto's aanlevert. Ben je daar zelf te laat mee, dan schuift de termijn mee en vervalt de garantie voor die dagen.",
};

export const vergelijking = [
  {
    tag: "Marktplaats",
    title: "Iemand via een marktplaats",
    from: "€150 tot €400",
    punten: [
      { ok: false, text: "Je gokt op iemand die je niet kunt checken" },
      { ok: false, text: "Een thema dat je bij duizend anderen terugziet" },
      { ok: false, text: "Elke wijziging is opnieuw afrekenen" },
      { ok: false, text: "Een bronbestand? Vaak niet" },
    ],
    cta: "Vanaf €150",
  },
  {
    tag: "Hier",
    title: "Een pakket hier",
    from: "Vanaf €695",
    featured: true,
    punten: [
      { ok: true, text: "Ontworpen in Figma en zelf gebouwd" },
      { ok: true, text: "Eerste ontwerp binnen vijf werkdagen" },
      { ok: true, text: "Revisierondes zitten in de prijs" },
      { ok: true, text: "Figma, code en copyright van jou" },
      { ok: true, text: "Live of je geld terug" },
    ],
    cta: "Vanaf €695",
  },
  {
    tag: "Abonnement",
    title: "Huren bij een abonnementsbureau",
    from: "€45 tot €69 per maand",
    punten: [
      { ok: false, text: "Twaalf maanden vast" },
      { ok: false, text: "Na twee jaar heb je niets in handen" },
      { ok: false, text: "Stoppen betekent de site inleveren" },
      { ok: false, text: "Opzeggen kost je je eigen site" },
    ],
    cta: "€45 tot €69 per maand",
  },
];

export const figmaTegels = [
  {
    title: "Drie richtingen",
    body: "Drie verschillende ontwerpen, elk met de onderbouwing erbij. Jij kiest tussen opties in plaats van tussen één gok.",
  },
  {
    title: "Structuur die werkt",
    body: "Volgorde, hiërarchie en knoppen die de bezoeker naar het formulier of de offerte leiden.",
  },
  {
    title: "Telefoon eerst",
    body: "De meeste bezoekers komen via hun telefoon. Daar begint het ontwerp, daarna gaat het naar desktop.",
  },
  {
    title: "Gebouwd, niet getekend",
    body: "Je krijgt geen plaatje. Je krijgt een werkende site op je eigen domein en hosting.",
  },
];

export const overdracht = [
  "Het volledige Figma-bestand, elke pagina en elke laag",
  "De gebouwde website, live op jouw domein",
  "Alle code, in jouw WordPress-omgeving",
  "Het copyright, zwart op wit in de overeenkomst",
];

export const WHATS_NEXT = [
  {
    q: "Is dit echt geen AI?",
    a: "Het ontwerp is van mij. Ik teken de structuur en de pagina's in Figma en bouw ze daarna zelf in WordPress. Het bewijs zit in het Figma-bestand dat je meekrijgt: open het en je ziet elke laag en elke guideline. Voor de teksten gebruik ik AI als versnelling, jij leest en keurt ze goed.",
  },
  {
    q: "Waarom krijg ik het Figma-bestand?",
    a: "Omdat het van jou is. Je kunt het zelf aanpassen, je team laten gebruiken of later aan een andere partij geven die er zo mee verder werkt. Zo zit je nooit aan mij vast.",
  },
  {
    q: "Ben ik echt eigenaar?",
    a: "Ja, volledig. Domein, hosting, code, Figma-bestand en copyright staan op jouw naam. Na de laatste termijn is alles van jou, dat staat in de overeenkomst.",
  },
  {
    q: "Is dit wel te vertrouwen?",
    a: "Ik heb meer dan 90 sites gebouwd en sta op 5,0 uit 23 reviews op Google. Je betaalt via Mollie met iDEAL of creditcard, en je krijgt een KvK- en btw-factuur. De helft bij de start, de helft bij oplevering.",
  },
  {
    q: "Echt binnen vijf werkdagen?",
    a: "Het eerste ontwerp ligt er binnen vijf werkdagen na je betaling. Daarna verfijn je het met mij, bouw ik en gaat het live. De klok start pas als jouw teksten en foto's er zijn, en dat staat ook in de garantie.",
  },
  {
    q: "Kan ik iemand spreken voor ik bestel?",
    a: "Ja. Je kunt altijd even appen of een gesprek plannen. Het hoeft niet, want het formulier is de intake, maar als je liever eerst iemand hoort dan bel ik je.",
  },
  {
    q: "Wat als ik het niet mooi vind?",
    a: "Je zegt wat er niet klopt en ik herzie binnen je revisierondes. Zijn de ontwerpen daarna nog steeds niet goed, dan krijg je je geld terug. Je houdt het Figma-bestand.",
  },
  {
    q: "Wie bouwt mijn site?",
    a: "Ik. Van ontwerp tot build tot livegang tot overdracht. Er zit geen accountmanager tussen en er is geen wisselend team.",
  },
  {
    q: "Waarom ben je zo veel goedkoper dan een bureau?",
    a: "Omdat ik geen pitchtraject, geen accountmanager en geen meetingslaag heb. Je betaalt voor het werk en niet voor de overhead. Een bureau rekent al snel €5.000 en meer voor hetzelfde aantal pagina's.",
  },
  {
    q: "Kan ik in termijnen betalen?",
    a: "Altijd. De helft bij de start en de helft bij oplevering. Eén keer betalen mag ook, dat scheelt je niets.",
  },
  {
    q: "Wat valt buiten een pakket?",
    a: "Webshops, boekingssystemen, koppelingen met andere software, meertaligheid en 3D. Dat is maatwerk en dat loopt via kreatives.nl. Een extra pagina, teksten of tracking kun je wel bijbestellen.",
  },
  {
    q: "Kunnen jullie een NDA tekenen?",
    a: "Ja. Standaard werk ik met een overeenkomst waarin de volledige overdracht staat. Wil je daarnaast een NDA, dan teken ik die.",
  },
  {
    q: "Voor wie is dit?",
    a: "Voor ondernemers die beginnen of die al langer een site hadden moeten hebben. Je hebt een KvK en je bestelt zakelijk, dus je krijgt geen herroepingsrecht van veertien dagen. Dat is ook de reden dat de prijzen zo kunnen blijven.",
  },
];

export const stappen = [
  {
    no: "01",
    title: "Je vult de intake in",
    body: "Wat je doet, voor wie en wat er op de site moet staan. Een begeleid formulier van een paar minuten, geen gesprek nodig. Je hoort binnen één werkdag of het past, met de betaallink erbij.",
  },
  {
    no: "02",
    title: "Ik ontwerp",
    body: "Ik kijk naar je markt en je concurrenten en zet drie richtingen neer, met de onderbouwing erbij. Binnen vijf werkdagen ligt het eerste ontwerp in je inbox, in Figma.",
  },
  {
    no: "03",
    title: "Je stuurt bij en keurt goed",
    body: "Binnen je revisierondes zeg je wat er niet klopt en ik herzie het. Zodra je goedkeurt, bouw ik in WordPress.",
  },
  {
    no: "04",
    title: "Live en overdracht",
    body: "De site gaat live op jouw domein en hosting. Je krijgt het Figma-bestand, de code en de copyright, en ik loop met je door de omgeving zodat je zelf kunt aanpassen.",
  },
];

export const beloften = [
  {
    title: "Door mij ontworpen",
    body: "Elk ontwerp komt uit mijn handen, in Figma. Geen thema en geen generator.",
  },
  {
    title: "Eén aanspreekpunt",
    body: "Van je intake tot de overdracht heb je met mij te maken. Niet met een team dat wisselt.",
  },
  {
    title: "Revisies tot het klopt",
    body: "Wat in je pakket zit, zit er echt in. Daarna kost een ronde €75 en dat zeg ik vooraf.",
  },
  {
    title: "Alles op jouw naam",
    body: "Domein, hosting, code en copyright. Je houdt je site ook als je nooit meer iets met mij doet.",
  },
];
