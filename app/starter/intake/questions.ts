// Vragen voor het intakeformulier (/starter/intake). Gedeeld tussen het
// formulier (client) en de verwerking/e-mail (server), zodat de labels gelijk zijn.

export type Pakket = "basis" | "website" | "website-plus";

export type Choice = {
  value: string;
  label: string;
  withInput?: boolean;
  inputPlaceholder?: string;
};

export type QType =
  | "email"
  | "tel"
  | "text"
  | "longtext"
  | "url"
  | "choice"
  | "choiceInput"
  | "websites"
  | "consent";

export type Question = {
  id: string;
  num: string; // kort label zoals in de brief: A, B, 1, 2 …
  type: QType;
  title: string;
  help?: string;
  helpByPakket?: Partial<Record<Pakket, string>>;
  extraByPakket?: Partial<Record<Pakket, string>>;
  optional?: boolean;
  options?: Choice[];
  placeholder?: string;
  reasonLabel?: string; // label voor het "waarom"-veld bij de websites-vraag
  minRows?: number; // aantal verplichte rijen bij de websites-vraag
  onlyPakket?: Pakket[]; // toon de vraag alleen bij deze pakketten
  askIfNoPakket?: boolean; // de pakket-vraag: alleen tonen als ?pakket ontbreekt
};

export const PAKKET_LABEL: Record<Pakket, string> = {
  basis: "Basis",
  website: "Website",
  "website-plus": "Website Plus",
};

export const QUESTIONS: Question[] = [
  {
    id: "email",
    num: "A",
    type: "email",
    title: "Wat is je e-mailadres?",
    help: "Gebruik het adres waarmee je hebt besteld. Zo vind ik je bestelling terug.",
    placeholder: "jij@voorbeeld.nl",
  },
  {
    id: "whatsapp",
    num: "B",
    type: "tel",
    title: "Wat is je WhatsApp-nummer?",
    help: "Alleen om je bestelling terug te vinden en je te laten weten dat je ontwerp klaar is.",
    placeholder: "06 12345678",
  },
  {
    id: "pakket",
    num: "C",
    type: "choice",
    title: "Welk pakket heb je gekocht?",
    askIfNoPakket: true,
    options: [
      { value: "basis", label: "Basis" },
      { value: "website", label: "Website" },
      { value: "website-plus", label: "Website Plus" },
    ],
  },
  {
    id: "bedrijf",
    num: "1",
    type: "text",
    title: "Wat is de naam van je bedrijf?",
    placeholder: "Je bedrijfsnaam",
  },
  {
    id: "huidige_site",
    num: "2",
    type: "longtext",
    optional: true,
    title: "Heb je nu al een website?",
    help: "Stuur de link en schrijf wat je er niet goed aan vindt. Geef voorbeelden.",
  },
  {
    id: "wat_doe_je",
    num: "3",
    type: "longtext",
    title: "Wat doe je precies?",
    help: 'Leg het uit alsof je het aan iemand vertelt die je bedrijf niet kent. Niet "ik ben coach", maar "ik help vrouwen boven de 40 om in 12 weken af te vallen, met een voedingsschema en twee trainingen per week".',
  },
  {
    id: "klanten",
    num: "4",
    type: "longtext",
    title: "Wie zijn je klanten?",
    help: "Beschrijf één echte klant. Hoe oud, wat voor werk, waar woont hij of zij, en waarom kwam die persoon bij jou?",
  },
  {
    id: "probleem",
    num: "5",
    type: "longtext",
    title: "Met welk probleem komen klanten bij je?",
    help: "Gebruik de woorden die klanten zelf gebruiken. Wat zeggen ze letterlijk als ze je voor het eerst bellen of appen?",
  },
  {
    id: "waarom_jou",
    num: "6",
    type: "longtext",
    title: "Waarom kiezen klanten voor jou en niet voor een ander?",
    help: 'Wees concreet. "Goede service" zegt iedereen. Wat doe jij dat een ander niet doet?',
  },
  {
    id: "actie",
    num: "7",
    type: "choice",
    title: "Wat moet een bezoeker op je website doen?",
    help: "Kies er één. De hele site wordt daaromheen gebouwd.",
    options: [
      { value: "bellen", label: "Bellen" },
      { value: "appen", label: "Appen" },
      { value: "formulier", label: "Een formulier invullen" },
      { value: "afspraak", label: "Een afspraak maken" },
      { value: "langskomen", label: "Langskomen" },
    ],
  },
  {
    id: "mooie_sites",
    num: "8",
    type: "websites",
    title: "Stuur minimaal 5 websites die je mooi vindt, en leg per website uit waarom.",
    reasonLabel: "Waarom vind je deze mooi?",
    minRows: 5,
    help: 'Zonder uitleg kan ik er niets mee. "Mooi" is niet genoeg. Schrijf bijvoorbeeld: "De kleuren zijn rustig", "Ik zie meteen wat ze doen" of "Het voelt duur". Het hoeven geen websites uit jouw branche te zijn.',
  },
  {
    id: "lelijke_sites",
    num: "9",
    type: "websites",
    title: "Stuur minimaal 5 websites die je niet mooi vindt, en leg per website uit waarom.",
    reasonLabel: "Waarom vind je deze niet mooi?",
    minRows: 5,
    help: 'Dit is net zo belangrijk als de vorige vraag. Zo weet ik wat ik moet vermijden. Schrijf bijvoorbeeld: "Te druk", "Te veel tekst" of "Het lijkt op elke andere site".',
  },
  {
    id: "gevoel",
    num: "10",
    type: "longtext",
    title: "Welk gevoel moet iemand krijgen als hij op je website komt?",
    help: "Kies drie woorden, bijvoorbeeld: luxe, vertrouwd, stoer, rustig, vrolijk, strak, warm. Leg er per woord één zin bij uit.",
  },
  {
    id: "huisstijl",
    num: "11",
    type: "longtext",
    title: "Heb je al vaste kleuren of een huisstijl?",
    help: "Zo ja, noem de kleuren of zet je huisstijl in de map van vraag 14. Zo nee, schrijf welke kleuren je mooi vindt en welke absoluut niet.",
  },
  {
    id: "verboden",
    num: "12",
    type: "longtext",
    optional: true,
    title: "Is er iets wat absoluut niet op je website mag?",
    help: "Bijvoorbeeld een kleur, een woord, een soort foto of een stijl.",
  },
  {
    id: "paginas",
    num: "13",
    type: "longtext",
    title: "Welke pagina's wil je?",
    onlyPakket: ["website", "website-plus"],
    helpByPakket: {
      website:
        "Je pakket heeft vijf pagina's. De meeste klanten kiezen: home, over mij, diensten, contact en één eigen pagina.",
      "website-plus":
        "Je pakket heeft maximaal acht pagina's. Schrijf ze hier op.",
    },
  },
  {
    id: "drive",
    num: "14",
    type: "url",
    title: "Deel de link naar je map met je logo, teksten en foto's.",
    placeholder: "https://drive.google.com/…",
    help: 'Maak één map op Google Drive en zet daar alles in: je logo, een document met je teksten per pagina, en minimaal 5 foto\'s van jou, je werk, je team of je zaak. Zet het delen op "iedereen met de link", anders kan ik de map niet openen. Gebruik geen foto\'s van internet waar je geen rechten op hebt. Heb je geen logo of geen foto\'s? Schrijf dat bij vraag 20.',
    extraByPakket: {
      website:
        "Ik scherp je teksten aan, dus ze hoeven niet mooi geschreven te zijn. Wel moet alles erin staan.",
      "website-plus":
        "Ik schrijf je teksten. Steekwoorden en losse zinnen zijn genoeg.",
    },
  },
  {
    id: "reviews",
    num: "15",
    type: "longtext",
    optional: true,
    title: "Heb je reviews die op de site mogen?",
    help: "Plak ze hier met de naam van de klant erbij, of stuur de link naar je Google-reviews.",
  },
  {
    id: "contactgegevens",
    num: "16",
    type: "longtext",
    title: "Welke contactgegevens komen op de website?",
    help: "Telefoonnummer, e-mailadres, adres als je een zaak hebt, openingstijden, en de links naar je Instagram, Facebook of LinkedIn.",
  },
  {
    id: "contact_email",
    num: "17",
    type: "email",
    title: "Naar welk e-mailadres moeten berichten van het contactformulier?",
    placeholder: "info@jouwbedrijf.nl",
  },
  {
    id: "domein",
    num: "18",
    type: "choiceInput",
    title: "Heb je al een domeinnaam?",
    help: "Een domeinnaam is je adres op internet, bijvoorbeeld jouwbedrijf.nl.",
    options: [
      { value: "ja", label: "Ja", withInput: true, inputPlaceholder: "jouwbedrijf.nl" },
      { value: "nee", label: "Nee", withInput: true, inputPlaceholder: "Gewenste naam" },
      { value: "weet-niet", label: "Ik weet het niet" },
    ],
  },
  {
    id: "hosting",
    num: "19",
    type: "choiceInput",
    title: "Heb je al hosting?",
    help: "Hosting is de plek waar je website staat. Heb je het niet of weet je het niet, dan help ik je het af te sluiten.",
    options: [
      { value: "ja", label: "Ja", withInput: true, inputPlaceholder: "Welke aanbieder?" },
      { value: "nee", label: "Nee" },
      { value: "weet-niet", label: "Ik weet het niet" },
    ],
  },
  {
    id: "overig",
    num: "20",
    type: "longtext",
    optional: true,
    title: "Is er nog iets wat ik moet weten voordat ik begin?",
  },
  {
    id: "consent",
    num: "21",
    type: "consent",
    title:
      "Ik heb alles zo duidelijk mogelijk ingevuld. Ik begrijp dat de 48 uur ingaan zodra dit formulier compleet is, en dat ik krijg wat er in mijn pakket staat.",
  },
];
