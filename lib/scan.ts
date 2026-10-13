// Website-scan: types, stap-opties en mock-rapport.
// Fase 1 draait volledig op dit mock-rapport zodat het design te reviewen is.
// Fase 2 vervangt getMockReport() door de echte server-side analyse (Claude +
// screenshots), met hetzelfde schema.

export const scan = {
  name: "KREATIVES Website Scan",
  route: "/website-scan",
};

export type Branche =
  | "Horeca & food"
  | "Coach of personal brand"
  | "Dienstverlening"
  | "Webshop"
  | "Anders";

export const brancheOpties: { value: Branche; label: string }[] = [
  { value: "Horeca & food", label: "Horeca & food" },
  { value: "Coach of personal brand", label: "Coach of personal brand" },
  {
    value: "Dienstverlening",
    label: "Dienstverlening (installatie, bouw, schoonmaak)",
  },
  { value: "Webshop", label: "Webshop" },
  { value: "Anders", label: "Anders" },
];

export const doelOpties = [
  "Meer aanvragen of offertes",
  "Meer boekingen of afspraken",
  "Meer online verkoop",
  "Een sterker en professioneler merk",
] as const;

export const timingOpties = [
  "Zo snel mogelijk",
  "Binnen 3 maanden",
  "Ik oriënteer me nog",
] as const;

export const budgetOpties = [
  "Onder €1.500",
  "€1.500 – €3.500",
  "€3.500 – €7.500",
  "€7.500 of meer",
  "Weet ik nog niet",
] as const;

// De checks die tijdens de analyse één voor één worden afgevinkt.
export const scanChecks = [
  "Je website bekijken als je klant",
  "Je doelgroep in kaart brengen",
  "De opbouw van boven naar beneden lezen",
  "Zoeken naar bewijs en vertrouwen",
  "Checken wat de bezoeker moet doen",
  "Je branding naast je doelgroep leggen",
];

export type ScanAnswers = {
  url: string;
  geenWebsite: boolean;
  branche: Branche | "";
  brancheAnders: string;
  idealeKlant: string;
  doel: string;
  timing: string;
  budget: string;
};

export const emptyAnswers: ScanAnswers = {
  url: "",
  geenWebsite: false,
  branche: "",
  brancheAnders: "",
  idealeKlant: "",
  doel: "",
  timing: "",
  budget: "",
};

// ---------- Rapport-schema ----------

export type Verdict = "ja" | "twijfelachtig" | "nee";

export type ScanCategorie = {
  naam: string;
  score: number; // 0-10
  observatie: string;
  waaromHetUitmaakt: string;
  verbetering: string;
};

export type WalkthroughStap = {
  sectie: string;
  watDeKlantDenkt: string;
  blijftOfHaaktAf: "blijft" | "twijfelt" | "haakt af";
};

export type ScanReport = {
  domein: string;
  eindoordeel: { zouActieOndernemen: Verdict; uitleg: string };
  doelgroep: {
    opgegeven: string;
    watDeSiteUitstraalt: string;
    match: "goed" | "deels" | "slecht";
    toelichting: string;
  };
  doorDeOgenVanJeKlant: WalkthroughStap[];
  categorieen: ScanCategorie[];
  ontbrekendeElementen: string[];
  voorgesteldeOpbouw: string[];
  topPijnpunten: { titel: string; uitleg: string; zelfOplossen: string }[];
  watGoedGaat: string[];
  nieuweKop: {
    huidigeKop: string;
    voorgesteldeKop: string;
    voorgesteldeSubkop: string;
  };
  // Afgeleide totaalscore (0-100), in code berekend, niet door de AI.
  totaalscore: number;
};

// Gewogen totaalscore (0-100). Volgorde categorieën = gewichten hieronder.
const WEGING = [0.2, 0.2, 0.15, 0.2, 0.15, 0.1];

export function berekenTotaalscore(categorieen: ScanCategorie[]): number {
  const som = categorieen.reduce(
    (acc, c, i) => acc + c.score * (WEGING[i] ?? 0),
    0
  );
  return Math.round(som * 10); // 0-10 gewogen → 0-100
}

function domeinUit(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url || "je-website.nl";
  }
}

// Mock-rapport. Vult het schema met realistische NL-content zodat het design
// te beoordelen is. Reflecteert waar mogelijk de ingevulde antwoorden.
export function getMockReport(answers?: Partial<ScanAnswers>): ScanReport {
  const domein = domeinUit(answers?.url ?? "je-website.nl");
  const categorieen: ScanCategorie[] = [
    {
      naam: "Doelgroep & boodschap",
      score: 5,
      observatie:
        "Bovenaan staat “Welkom bij ons bedrijf”. Dat zegt een bezoeker niets. Nergens staat voor wie je het maakt of wat het oplevert.",
      waaromHetUitmaakt:
        "Herkent je ideale klant zich niet binnen een paar seconden, dan scrolt hij weg voordat je iets hebt kunnen zeggen.",
      verbetering:
        "Vervang de kop door wie je helpt en welk resultaat je levert, in de taal van je klant.",
    },
    {
      naam: "Opbouw van boven naar beneden",
      score: 4,
      observatie:
        "Na de kop komt direct een lange “over ons”-tekst. De bezoeker wil eerst weten of jij zijn probleem oplost, niet je geschiedenis.",
      waaromHetUitmaakt:
        "De volgorde beantwoordt de vragen van je klant niet, waardoor hij afhaakt voor hij bij je aanbod is.",
      verbetering:
        "Zet eerst herkenning en resultaat, dan bewijs, dan pas je verhaal.",
    },
    {
      naam: "Vertrouwen & bewijs",
      score: 6,
      observatie:
        "Er staan reviews, maar pas helemaal onderaan. In het bovenste stuk is geen enkel bewijs te zien.",
      waaromHetUitmaakt:
        "De twijfel ontstaat bovenaan. Staat het bewijs daar niet, dan haakt een deel af voordat het het ziet.",
      verbetering:
        "Zet één sterke review of een paar cijfers direct onder de kop.",
    },
    {
      naam: "De actie",
      score: 5,
      observatie:
        "Er staan drie verschillende knoppen door elkaar: “Contact”, “Meer info” en “Offerte”. De bezoeker weet niet wat de bedoeling is.",
      waaromHetUitmaakt:
        "Te veel keuzes leidt tot geen keuze. Eén duidelijke actie levert meer aanvragen op.",
      verbetering:
        "Kies één hoofdactie en laat die op elke sectie terugkomen.",
    },
    {
      naam: "Branding vs doelgroep",
      score: 6,
      observatie:
        "De kleuren en het logo ogen verzorgd, maar de foto's zijn duidelijk stockbeelden van mensen die niet bij jouw bedrijf horen.",
      waaromHetUitmaakt:
        "Stockfoto's voelen onpersoonlijk. Je klant wil zien met wie hij echt te maken krijgt.",
      verbetering:
        "Vervang de belangrijkste stockfoto's door echte beelden van jou en je werk.",
    },
    {
      naam: "Onderscheid",
      score: 4,
      observatie:
        "De tekst “kwaliteit en service staan bij ons voorop” kan op elke concurrent slaan. Nergens staat waarom juist jij.",
      waaromHetUitmaakt:
        "Zonder onderscheid vergelijkt je klant alleen op prijs, en dat verlies je bijna altijd.",
      verbetering:
        "Benoem concreet wat jij anders doet dan de rest, met een voorbeeld.",
    },
  ];

  return {
    domein,
    eindoordeel: {
      zouActieOndernemen: "twijfelachtig",
      uitleg:
        "Je site ziet er verzorgd uit, maar maakt binnen de eerste schermen niet duidelijk voor wie het is en wat het oplevert. Een deel van je bezoekers twijfelt en neemt daardoor geen contact op.",
    },
    doelgroep: {
      opgegeven:
        answers?.idealeKlant?.trim() ||
        "Ondernemers die een betere website willen",
      watDeSiteUitstraalt:
        "Een breed, algemeen publiek, zonder duidelijke keuze voor één type klant.",
      match: "deels",
      toelichting:
        "Je richt je op een specifieke klant, maar de site praat tegen iedereen. Daardoor voelt niemand zich echt aangesproken.",
    },
    doorDeOgenVanJeKlant: [
      {
        sectie: "Bovenste stuk",
        watDeKlantDenkt:
          "Ik zie een mooie foto, maar ik weet nog niet of dit voor mij is.",
        blijftOfHaaktAf: "twijfelt",
      },
      {
        sectie: "Over ons",
        watDeKlantDenkt:
          "Dit gaat over hen, niet over mijn probleem. Ik scroll verder.",
        blijftOfHaaktAf: "twijfelt",
      },
      {
        sectie: "Diensten",
        watDeKlantDenkt:
          "Oké, nu snap ik wat ze doen. Dit lijkt op wat ik zoek.",
        blijftOfHaaktAf: "blijft",
      },
      {
        sectie: "Reviews",
        watDeKlantDenkt:
          "Fijn, andere mensen zijn tevreden. Maar waarom zie ik dit nu pas?",
        blijftOfHaaktAf: "blijft",
      },
      {
        sectie: "Contact",
        watDeKlantDenkt:
          "Er zijn drie knoppen. Welke moet ik hebben? Ik denk er nog even over.",
        blijftOfHaaktAf: "haakt af",
      },
    ],
    categorieen,
    ontbrekendeElementen: [
      "Een duidelijke belofte bovenaan: voor wie en welk resultaat",
      "Bewijs in het bovenste stuk (review of cijfer)",
      "Een zichtbaar gezicht van de ondernemer",
      "Een heldere, terugkerende hoofdactie",
      "Een korte uitleg van hoe het werken met jou eruitziet",
    ],
    voorgesteldeOpbouw: [
      "Belofte + hoofdactie",
      "Herkenning van het probleem",
      "Bewijs (reviews, cijfers, logo's)",
      "Je aanbod in het kort",
      "Hoe het werkt (stappen)",
      "Over jou, met een echt gezicht",
      "Veelgestelde vragen",
      "Afsluitende actie",
    ],
    topPijnpunten: [
      {
        titel: "Je klant weet niet of het voor hem is",
        uitleg:
          "In het bovenste stuk staat geen belofte voor een specifieke klant. Wie jouw ideale klant is, moet dat zelf uit de tekst halen, en dat doet bijna niemand.",
        zelfOplossen:
          "Schrijf één zin bovenaan: wie je helpt en welk resultaat je levert. Test hem op iemand buiten je bedrijf.",
      },
      {
        titel: "Het bewijs staat op de verkeerde plek",
        uitleg:
          "Je reviews staan onderaan, terwijl de twijfel bovenaan ontstaat. Een bezoeker die daar al afhaakt, ziet je bewijs nooit.",
        zelfOplossen:
          "Verplaats één sterke review of een paar cijfers naar vlak onder de kop.",
      },
      {
        titel: "Te veel knoppen, geen duidelijke keuze",
        uitleg:
          "Er staan meerdere acties door elkaar. Daardoor weet de bezoeker niet wat de bedoeling is en doet hij uiteindelijk niets.",
        zelfOplossen:
          "Kies één hoofdactie en herhaal die consequent op de hele pagina.",
      },
    ],
    watGoedGaat: [
      "De kleuren en het logo ogen verzorgd en consistent.",
      "De reviews die er staan, zijn concreet en geloofwaardig.",
    ],
    nieuweKop: {
      huidigeKop: "Welkom bij ons bedrijf",
      voorgesteldeKop: "Zo haal je meer aanvragen uit je website",
      voorgesteldeSubkop:
        "We laten je in een paar seconden zien waarom bezoekers afhaken, en wat je als eerste moet aanpakken.",
    },
    totaalscore: berekenTotaalscore(categorieen),
  };
}
