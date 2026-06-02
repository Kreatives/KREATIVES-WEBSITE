// Centrale content + configuratie. Alle copy is geschreven volgens de
// KREATIVES tone-of-voice skill (geen "geen X maar Y", geen staccato,
// geen em-dashes, geen lege bureautaal, Nederlands, ondernemer-aan-tafel).

export const site = {
  name: "KREATIVES",
  domain: "https://rkcreatives.nl",
  email: "info@kreatives.nl",
  description:
    "KREATIVES bouwt maatwerk websites voor klinieken, merken en ondernemers die er online net zo sterk uit willen zien als ze offline al zijn.",
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Diensten",
    href: "/diensten",
    children: [
      { label: "Webdesign", href: "/diensten/webdesign" },
      { label: "AI", href: "/diensten/ai" },
    ],
  },
  { label: "Projecten", href: "/projecten" },
  {
    label: "Over ons",
    href: "/over-ons",
    children: [
      { label: "Werkwijze", href: "/werkwijze" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [{ label: "Veelgestelde vragen", href: "/faq" }],
  },
];

export const hero = {
  // Headline volgt Ricky's eigen formulering. Instrument Serif italic op
  // "waar je trots op bent." (kleur erft van de witte tekst op de foto).
  titleLead: "Eindelijk een website",
  titleAccent: "waar je trots op bent.",
  body:
    "Wij ontwerpen maatwerk websites voor ondernemers die hun online uitstraling in lijn willen brengen met de rest van hun bedrijf.",
  primary: { label: "Gratis offerte", href: "/contact" },
  secondary: { label: "Bekijk ons werk", href: "#cases" },
  // Social-proof widget
  socialProof: {
    avatars: [
      { initials: "LV", color: "#FD6D17" },
      { initials: "JD", color: "#1A1A1A" },
      { initials: "RM", color: "#9aa3a8" },
      { initials: "KS", color: "#5b3b1f" },
    ],
    rating: "5/5",
    label: "op Google",
  },
  background: "/placeholder.png",
};

export const marquee = {
  label: "Vertrouwd door ondernemers door heel Nederland",
  // logos 1..6 in /public/logos
  logos: [1, 2, 3, 4, 5, 6],
};

export const probleem = {
  eyebrow: "Herkenbaar?",
  // Eén statement dat woord-voor-woord oplicht tijdens scrollen (GSAP).
  statement:
    "Je site is van een paar jaar terug en sluit niet meer aan bij wat je nu doet. Je deelt je kaartje uit en hoopt eigenlijk dat ze hem niet meteen openen, terwijl je concurrent er online scherper uit ziet dan jij.",
};

export const usps = {
  eyebrow: "Waarom samenwerken",
  titleLead: "Waarom samenwerken",
  titleAccent: "met ons?",
  intro:
    "Je werkt rechtstreeks met de mensen die je site bouwen, met een aanpak die vooraf duidelijk is en een resultaat dat klopt met je merk.",
  items: [
    {
      no: "01",
      title: "Een vaste aanpak",
      body:
        "Je weet vooraf wat er gebeurt, wanneer het gebeurt, en wat het kost. Geen verrassingen halverwege het traject.",
      image: "/placeholder.png",
    },
    {
      no: "02",
      title: "Alles op maat",
      body:
        "We werken niet met thema's of sjablonen. Elke site bouwen we vanaf nul rond jouw merk, zodat je hem nergens anders terugziet.",
      image: "/placeholder.png",
    },
    {
      no: "03",
      title: "Twee revisierondes",
      body:
        "We scherpen het ontwerp aan tot het echt klopt, zonder dat de prijs onderweg verandert.",
      image: "/placeholder.png",
    },
    {
      no: "04",
      title: "Snel en vindbaar",
      body:
        "Elke site laadt snel en staat technisch goed, zodat je gevonden wordt door de mensen die naar je zoeken.",
      image: "/placeholder.png",
    },
  ],
};

export const werkwijze = {
  eyebrow: "Onze aanpak",
  titleLead: "Zo zorgen wij dat jij tevreden bent over het",
  titleAccent: "eindresultaat",
  steps: [
    {
      no: "01",
      title: "Strategiegesprek",
      body:
        "We beginnen met een gesprek over je merk, je doelgroep en wat de site concreet moet opleveren.",
      image: "/projects/5.webp",
    },
    {
      no: "02",
      title: "Design",
      body:
        "Je krijgt een ontwerp op maat, met twee revisierondes om alles aan te scherpen tot het klopt.",
      image: "/projects/2.webp",
    },
    {
      no: "03",
      title: "Development",
      body:
        "We bouwen de site snel, schaalbaar en technisch op orde, gericht op goede vindbaarheid.",
      image: "/projects/7.webp",
    },
    {
      no: "04",
      title: "Livegang",
      body:
        "De site gaat live en je kunt daarna zelf je teksten en projecten blijven aanpassen.",
      image: "/projects/3.webp",
    },
  ],
};

export const cases = {
  eyebrow: "Geselecteerd werk",
  titleLead: "Werk dat we leverden voor merken zoals het",
  titleAccent: "jouwe",
  // Placeholder-cases met je echte projectbeelden. Vervang naam/type/omschrijving
  // door de echte gegevens; detailpagina's volgen in ronde 2.
  items: [
    {
      name: "Smokey Joe's",
      line: "Maatwerk site voor een groeiend horecaconcept.",
      image: "/projects/1.webp",
      tags: ["Horeca", "Maatwerk", "Branding"],
    },
    {
      name: "Pure Panelen",
      line: "Productcatalogus en offerteflow voor een groothandel.",
      image: "/projects/2.webp",
      tags: ["Groothandel", "B2B", "Catalogus"],
    },
    {
      name: "Future Cards",
      line: "Configurator voor volledig gepersonaliseerde kaarten.",
      image: "/projects/3.webp",
      tags: ["E-commerce", "Configurator"],
    },
    {
      name: "Negentigtien",
      line: "Merkwebsite met een uitgesproken eigen stijl.",
      image: "/projects/4.webp",
      tags: ["Merk", "Editorial"],
    },
  ],
};

export const reviews = {
  eyebrow: "Wat klanten zeggen",
  titleLead: "Ondernemers die ons",
  titleAccent: "aanraden",
  rating: "5/5",
  ratingLabel: "gemiddeld op Google Reviews",
  // Placeholder-reviews in KREATIVES tone-of-voice. Vervang door echte reviews.
  items: [
    {
      quote:
        "We hadden jarenlang een site waar we ons eigenlijk voor schaamden. Nu sturen we klanten er juist actief naartoe, omdat het klopt met hoe we werken.",
      author: "Lardy Verheijden",
      company: "Smokey Joe's",
      initials: "LV",
      color: "#FD6D17",
    },
    {
      quote:
        "Vooraf wisten we precies wat er ging gebeuren en wat het kostte. Twee revisierondes waren genoeg om het echt scherp te krijgen.",
      author: "Jeroen de Wit",
      company: "Pure Panelen",
      initials: "JW",
      color: "#1A1A1A",
    },
    {
      quote:
        "De site laadt snel en we worden beter gevonden dan voorheen. Het verschil met onze oude site is voor onze klanten meteen zichtbaar.",
      author: "Robin Meijer",
      company: "Future Cards",
      initials: "RM",
      color: "#5b3b1f",
    },
    {
      quote:
        "Geen ruis, geen meerwerk-discussies. Het ontwerp klopte na de tweede ronde en sindsdien krijgen we vaker complimenten over hoe de site eruitziet.",
      author: "Kim Smeets",
      company: "Negentigtien",
      initials: "KS",
      color: "#9aa3a8",
    },
    {
      quote:
        "Ze begrepen wat we wilden uitstralen na één gesprek. Dat scheelde een hoop heen-en-weer en het resultaat staat als een huis.",
      author: "Mark van Dijk",
      company: "Kroftman",
      initials: "MD",
      color: "#FD6D17",
    },
  ],
};

// ============================================================
// /reviews — masonry met alle reviews
// ============================================================

export type Review = {
  title: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  logo?: string;
};

export const reviewsPage = {
  eyebrow: "Reviews",
  titleLead: "Wat klanten over ons",
  titleAccent: "zeggen.",
  body:
    "Een greep uit de reacties van ondernemers en merken waar we mee werkten. Ongefilterd en in hun eigen woorden.",
  items: [
    {
      title: "Nu sturen we klanten er juist naartoe",
      quote:
        "We hadden jarenlang een site waar we ons eigenlijk voor schaamden. Nu sturen we klanten er juist actief naartoe, omdat het klopt met hoe we werken.",
      author: "Lardy Verheijden",
      role: "Eigenaar",
      company: "Smokey Joe's",
      initials: "LV",
      color: "#FD6D17",
    },
    {
      title: "Vooraf precies duidelijk wat het kostte",
      quote:
        "Vooraf wisten we precies wat er ging gebeuren en wat het kostte. Twee revisierondes waren genoeg om het echt scherp te krijgen, zonder meerwerk achteraf.",
      author: "Jeroen de Wit",
      role: "Eigenaar",
      company: "Pure Panelen",
      initials: "JW",
      color: "#1A1A1A",
    },
    {
      title: "Sneller gevonden dan voorheen",
      quote:
        "De site laadt snel en we worden beter gevonden dan voorheen. Het verschil met onze oude site is voor onze klanten meteen zichtbaar.",
      author: "Robin Meijer",
      role: "Marketing",
      company: "Future Cards",
      initials: "RM",
      color: "#5b3b1f",
    },
    {
      title: "Geen ruis, geen meerwerk-discussies",
      quote:
        "Geen ruis, geen meerwerk-discussies. Het ontwerp klopte na de tweede ronde en sindsdien krijgen we vaker complimenten over hoe de site eruitziet.",
      author: "Kim Smeets",
      role: "Oprichter",
      company: "Negentigtien",
      initials: "KS",
      color: "#9aa3a8",
    },
    {
      title: "Begrepen ons na één gesprek",
      quote:
        "Ze begrepen wat we wilden uitstralen na één gesprek. Dat scheelde een hoop heen-en-weer en het resultaat staat als een huis.",
      author: "Mark van Dijk",
      role: "Directeur",
      company: "Kroftman",
      initials: "MD",
      color: "#FD6D17",
    },
    {
      title: "Eindelijk een site die werkt",
      quote:
        "De landingspagina voor onze campagne leverde direct meer aanvragen op. Eindelijk een pagina die echt iets doet in plaats van alleen mooi staan.",
      author: "Sanne Bakker",
      role: "Marketing",
      company: "Brightwork",
      initials: "SB",
      color: "#1A1A1A",
    },
    {
      title: "Rechtstreeks contact, geen tussenlaag",
      quote:
        "Je werkt rechtstreeks met de mensen die je site bouwen. Dat merk je in het tempo en in hoe goed ze meedenken over de inhoud.",
      author: "Tom Bos",
      role: "Eigenaar",
      company: "Studio Noord",
      initials: "TB",
      color: "#5b3b1f",
    },
    {
      title: "Binnen vier weken live",
      quote:
        "Van eerste gesprek tot livegang zaten we precies op de planning die we vooraf afspraken. Binnen vier weken stond alles online.",
      author: "Eva Visser",
      role: "Oprichter",
      company: "Helloday",
      initials: "EV",
      color: "#9aa3a8",
    },
    {
      title: "Onze uitstraling klopt weer",
      quote:
        "Offline waren we al jaren doorgegroeid, online liepen we achter. Nu past de site weer bij waar we als bedrijf staan.",
      author: "Pieter Willemsen",
      role: "Directeur",
      company: "Vakwerk B.V.",
      initials: "PW",
      color: "#FD6D17",
    },
  ] as Review[],
};

// ============================================================
// FAQ onder Contact (homepage) — filterbaar op label
// ============================================================

export const faqHome = {
  eyebrow: "Veelgestelde vragen",
  titleLead: "Antwoord op de",
  titleAccent: "meeste vragen.",
  categories: ["Algemeen", "Proces", "Prijzen", "Techniek"],
  items: [
    {
      category: "Proces",
      q: "Hoe lang duurt een project?",
      a: "Gemiddeld vier weken van kennismaking tot livegang. Bij een grotere site of webshop loopt dat iets op, maar je kent de planning vanaf de start.",
    },
    {
      category: "Algemeen",
      q: "Wat als ik al een site heb?",
      a: "Dan kijken we eerlijk naar wat er staat. We houden wat werkt en bouwen de rest opnieuw, zonder dat je opnieuw bij nul begint.",
    },
    {
      category: "Prijzen",
      q: "Wat kost een website globaal?",
      a: "Een maatwerk site begint bij een vaste prijs die we vooraf afspreken. In het kennismakingsgesprek geven we een concrete richting voor jouw situatie.",
    },
    {
      category: "Prijzen",
      q: "Komen er kosten achteraf bij?",
      a: "Nee. We werken met één heldere prijs vooraf, inclusief twee revisierondes. Wat we afspreken is wat je betaalt.",
    },
    {
      category: "Proces",
      q: "Wat moet ik zelf aanleveren?",
      a: "Idealiter goede beelden en een idee van je boodschap. Heb je dat nog niet? We denken mee en kunnen de teksten verzorgen.",
    },
    {
      category: "Algemeen",
      q: "Voor wie werken jullie?",
      a: "Voor ondernemers, merken en klinieken die toe zijn aan een site die klopt met waar ze nu staan, zonder de prijs van een grote agency.",
    },
    {
      category: "Techniek",
      q: "Kan ik de site daarna zelf aanpassen?",
      a: "Ja. Je kunt na livegang zelf je teksten en projecten aanpassen. Voor grotere wijzigingen blijven we beschikbaar.",
    },
    {
      category: "Techniek",
      q: "Zorgen jullie ook voor hosting en onderhoud?",
      a: "Het eerste jaar hosting en onderhoud zit standaard inbegrepen. Daarna kun je dit bij ons verlengen of zelf overnemen.",
    },
    {
      category: "Prijzen",
      q: "Wat kost een losse landingspagina?",
      a: "Een losse landingspagina ligt lager dan een volledige site. In het gesprek geven we een concrete richtprijs, zonder verrassingen achteraf.",
    },
  ],
};

export const over = {
  eyebrow: "Over ons",
  titleLead: "Maatwerk dat tussen te duur en te generiek",
  titleAccent: "in zit",
  body:
    "KREATIVES is opgezet vanuit één idee: de meeste ondernemers verdienen een betere site dan ze hebben, en krijgen die niet omdat het of te duur is of te generiek. Wij bouwen maatwerk dat daar precies tussenin zit, met een directe lijn naar de mensen die het bouwen.",
  cta: { label: "Lees meer over ons", href: "/over-ons" },
  // Tot de uitgesneden portretfoto er is gebruiken we de placeholder.
  portrait: "/placeholder.png" as string | null,
};

export const pricing = {
  eyebrow: "Prijzen",
  titleLead: "Transparante prijzen,",
  titleAccent: "geen verrassingen",
  body:
    "Vooraf duidelijk wat je krijgt en wat het kost. Eén vaste prijs, twee revisierondes inbegrepen, en de site staat live binnen vier weken.",
  plans: [
    {
      name: "Maatwerk website",
      tag: "Meest gekozen",
      body:
        "Een complete maatwerk website voor jouw merk, klaar om mee te groeien.",
      price: "€2.495",
      priceUnit: "eenmalig",
      featured: true,
      features: [
        "Maatwerk ontwerp, geen sjablonen",
        "Tot 7 pagina's",
        "Mobiel-first responsive",
        "SEO-fundament + sitemap",
        "Twee revisierondes inbegrepen",
        "Livegang binnen vier weken",
        "Eerste jaar hosting en onderhoud",
      ],
      cta: { label: "Plan een gesprek", href: "/contact" },
    },
    {
      name: "Maatwerk webshop",
      body:
        "Alles uit het website-pakket, uitgebreid met een complete webshop op maat van jouw assortiment.",
      price: "€4.995",
      priceUnit: "eenmalig",
      featured: false,
      features: [
        "Alles uit Maatwerk website",
        "Volledige productcatalogus",
        "Mollie of Stripe als betaalprovider",
        "Voorraad en orderbeheer",
        "Klantaccounts en bestelhistorie",
        "Tot 50 producten klaar bij oplevering",
        "Koppeling met je boekhouding",
      ],
      cta: { label: "Plan een gesprek", href: "/contact" },
    },
  ],
};

// ============================================================
// /diensten — webdesign + ai
// ============================================================

export type Dienst = {
  slug: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  intro: string;
  items: { title: string; body: string }[];
  cta: { label: string; href: string };
  background: string;
};

export const diensten: Dienst[] = [
  {
    slug: "webdesign",
    eyebrow: "Diensten — Webdesign",
    titleLead: "Maatwerk webdesign dat",
    titleAccent: "blijft hangen.",
    body:
      "We ontwerpen en bouwen websites vanaf nul rond jouw merk. Geen thema's of sjablonen, maar een ontwerp dat klopt met hoe je gezien wilt worden en dat technisch op orde staat.",
    intro:
      "Van eerste schets tot livegang werk je rechtstreeks met de mensen die je site bouwen. Helder traject, vaste prijs, twee revisierondes inbegrepen.",
    items: [
      {
        title: "Strategie en concept",
        body:
          "We beginnen bij je merk, je doelgroep en wat de site concreet moet opleveren, en vertalen dat naar een richting waar je achter staat.",
      },
      {
        title: "Maatwerk ontwerp",
        body:
          "Ieder ontwerp maken we vanaf nul. Typografie, kleur en ritme passen we toe op jouw merk, zodat je site nergens anders te zien is.",
      },
      {
        title: "Development",
        body:
          "We bouwen snel, schaalbaar en technisch op orde, met een fundament voor goede vindbaarheid en pagina's die in een oogwenk laden.",
      },
      {
        title: "Beheer na livegang",
        body:
          "Na de livegang pas je zelf teksten en projecten aan, en blijven wij beschikbaar voor onderhoud en doorontwikkeling.",
      },
    ],
    cta: { label: "Plan een gesprek", href: "/contact" },
    background: "/projects/2.webp",
  },
  {
    slug: "ai",
    eyebrow: "Diensten — AI",
    titleLead: "AI die echt werk uit",
    titleAccent: "handen neemt.",
    body:
      "We bouwen AI-oplossingen die aansluiten op hoe jij werkt: van slimme chat en contentgeneratie tot het automatiseren van terugkerende taken in je bedrijf.",
    intro:
      "Geen losse experimenten, maar AI die we direct in je website en processen verweven, met aandacht voor privacy en betrouwbaarheid.",
    items: [
      {
        title: "AI-chat en assistenten",
        body:
          "Een assistent op je site die bezoekers direct helpt, vragen beantwoordt en leads kwalificeert, getraind op jouw eigen content.",
      },
      {
        title: "Content en copy",
        body:
          "Workflows die concepten, teksten en productbeschrijvingen genereren in jouw tone of voice, klaar om te finetunen en te publiceren.",
      },
      {
        title: "Automatisering",
        body:
          "We koppelen AI aan je bestaande tools en automatiseren terugkerende taken, zodat jij tijd overhoudt voor het werk dat ertoe doet.",
      },
      {
        title: "Integratie op maat",
        body:
          "Alles bouwen we passend op jouw situatie, met aandacht voor privacy, kosten en betrouwbaarheid in productie.",
      },
    ],
    cta: { label: "Plan een gesprek", href: "/contact" },
    background: "/projects/7.webp",
  },
];

export const dienstenOverzicht = {
  eyebrow: "Diensten",
  titleLead: "Wat we",
  titleAccent: "doen.",
  body:
    "Twee dingen waar we goed in zijn en die elkaar versterken: maatwerk websites die kloppen met je merk, en AI die echt werk uit handen neemt.",
  cards: [
    {
      slug: "webdesign",
      title: "Webdesign",
      body:
        "Maatwerk websites vanaf nul rond jouw merk. Snel, vindbaar en gebouwd om mee te groeien.",
    },
    {
      slug: "ai",
      title: "AI",
      body:
        "Slimme chat, contentgeneratie en automatisering, direct verweven in je site en processen.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  titleLead: "Klaar voor je nieuwe site?",
  titleAccent: "Laten we bouwen.",
  body:
    "Vertel kort wat je in gedachten hebt. Binnen één werkdag hoor je van ons terug, met een eerste reactie en concrete vervolgstappen.",
  email: site.email,
  projectTypes: [
    "Maatwerk website",
    "Maatwerk webshop",
    "Iets anders",
  ],
  // Avatar-rij bovenaan (placeholders met initialen tot er echte teamfoto's zijn)
  team: [
    { initials: "RK", color: "#FD6D17" },
    { initials: "LV", color: "#1A1A1A" },
    { initials: "JW", color: "#5b3b1f" },
    { initials: "RM", color: "#9aa3a8" },
    { initials: "KS", color: "#FD6D17" },
    { initials: "MD", color: "#1A1A1A" },
    { initials: "TB", color: "#5b3b1f" },
    { initials: "AS", color: "#9aa3a8" },
    { initials: "EV", color: "#FD6D17" },
    { initials: "PW", color: "#1A1A1A" },
  ],
  privacy:
    "Door op verzenden te klikken ga je akkoord met onze privacyverklaring.",
};

export const footer = {
  tagline:
    "Maatwerk websites voor ondernemers die hun online uitstraling in lijn willen brengen met hun bedrijf.",
  social: [
    { label: "LinkedIn", href: "#", icon: "linkedin" as const },
    { label: "TikTok", href: "#", icon: "tiktok" as const },
    { label: "Instagram", href: "#", icon: "instagram" as const },
  ],
  columns: [
    {
      title: "Menu",
      cols: 2,
      links: [
        { label: "Werkwijze", href: "/werkwijze" },
        { label: "Diensten", href: "/diensten" },
        { label: "Projecten", href: "/projecten" },
        { label: "Reviews", href: "/reviews" },
        { label: "Over ons", href: "/over-ons" },
        { label: "Blog", href: "/blog" },
        { label: "Prijzen", href: "/#prijzen" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Diensten",
      cols: 1,
      links: [
        { label: "Maatwerk website", href: "/#prijzen" },
        { label: "Maatwerk webshop", href: "/#prijzen" },
        { label: "Redesign", href: "/contact" },
      ],
    },
  ],
  contact: {
    title: "Direct contact",
    email: site.email,
    response: "Reactie binnen één werkdag",
    location: "Nederland, op afstand",
  },
};

// ============================================================
// /over-ons page content
// ============================================================

export const overOnsHero = {
  eyebrow: "Over ons",
  titleLead: "Maatwerk websites die werken",
  titleAccent: "voor wie ze gebruikt.",
  body:
    "KREATIVES is opgezet omdat de meeste ondernemers vastzitten tussen twee uitersten: templates die je nergens vrolijk van wordt en agencies waar je 25.000 voor een homepage betaalt. Daar zit een gat, en daar bouwen wij in.",
  background: "/placeholder.png",
};

export const overOnsVerhaal = {
  badge: "01 — Ons verhaal",
  titleLead: "Begonnen vanuit",
  titleAccent: "een goede ergernis.",
  subheading: "Sites die er verzorgd uitzien, zonder het prijskaartje van een groot bureau.",
  paragraphs: [
    "Te veel sites in Nederland zien er nog steeds uit alsof ze in 2018 zijn opgeleverd. De ondernemers erachter zijn doorgegroeid, maar de site staat al jaren stil. Niet omdat de ambitie ontbreekt, maar omdat goede webdesigners vaak onbetaalbaar zijn of een wachtrij van drie maanden hebben.",
    "KREATIVES is opgezet om dat te veranderen. We bouwen maatwerk websites die snel laden en technisch op orde staan, voor een prijs die past bij wat een ondernemer redelijk kan investeren.",
  ],
  primaryCta: { label: "Plan een gesprek", href: "/contact" },
  cta: { label: "Bekijk ons werk", href: "/#cases" },
  media: {
    main: "/projects/5.webp",
    left: "/projects/2.webp",
    right: "/projects/4.webp",
  },
};

export const overOnsKernwaarden = {
  eyebrow: "Kernwaarden",
  intro:
    "Vier dingen die je altijd terugziet in hoe we werken. Geen poster aan de muur, maar afspraken die we per project waar willen maken.",
  items: [
    {
      title: "Maatwerk",
      body:
        "Iedere site bouwen we vanaf nul rond het merk. We werken niet met thema's of sjablonen, zodat je site nergens anders te zien is.",
    },
    {
      title: "Transparant",
      body:
        "Vooraf weet je wat er gebeurt, wanneer, en wat het kost. Twee revisierondes inbegrepen, zonder dat de prijs onderweg verandert.",
    },
    {
      title: "Concreet",
      body:
        "We praten in revisierondes, oplevertermijnen en prijzen, in plaats van in visies en synergieën. Wat je leest is wat je krijgt.",
    },
    {
      title: "Persoonlijk",
      body:
        "Je werkt rechtstreeks met de mensen die de site bouwen. Geen account-laag ertussen, geen wachtrij van zes weken voor een tekstaanpassing.",
    },
  ],
};

export const overOnsTeam = {
  eyebrow: "Wie we zijn",
  titleLead: "Een klein team",
  titleAccent: "met één focus.",
  body:
    "KREATIVES is gebouwd op de gedachte dat goed werk niet groot opgeschaald hoeft te worden om waardevol te zijn. We pakken een beperkt aantal projecten tegelijk aan, zodat iedere site de aandacht krijgt die hij verdient. Dat scheelt onze klanten tijd en levert sterkere websites op.",
  portrait: "/placeholder.png",
};

export const overOnsVoorWie = {
  eyebrow: "Voor wie we werken",
  titleLead: "Voor wie het",
  titleAccent: "klopt.",
  voor: {
    title: "Voor jou als",
    items: [
      "Je site nog van een paar jaar terug is en je er stilletjes voor begint terug te deinzen",
      "Je merk inmiddels professioneler oogt offline dan online",
      "Je een maatwerk site wilt, zonder de prijs van een grote agency",
      "Je rechtstreeks contact wilt met de mensen die je site bouwen",
      "Je bereid bent om mee te denken over strategie en boodschap",
    ],
  },
  niet: {
    title: "Minder geschikt als",
    items: [
      "Je een 200-euro template zoekt om snel iets online te zetten",
      "Je verwacht dat we binnen één week alles klaar hebben",
      "Je de regie volledig wilt vasthouden en geen advies wilt over UX of copy",
      "Je niet wilt investeren in goede foto's en concrete content",
    ],
  },
};

export const overOnsResultaten = {
  eyebrow: "In cijfers",
  titleLead: "Onze resultaten in",
  titleAccent: "cijfers.",
  items: [
    {
      number: "95+",
      label: "Projecten opgeleverd",
      body:
        "Sinds de start hebben we voor merken door heel Nederland maatwerk websites en webshops gebouwd.",
    },
    {
      number: "5/5",
      label: "Gemiddelde Google rating",
      body:
        "Iedere klant die een review achterliet, beoordeelde de samenwerking met de hoogst mogelijke score.",
    },
    {
      number: "4 wk",
      label: "Gemiddelde livegang",
      body:
        "Van strategiegesprek tot livegang doen we gemiddeld vier weken, ongeacht of het een site of webshop is.",
    },
    {
      number: "100%",
      label: "Maatwerk",
      body:
        "Iedere site bouwen we vanaf nul rond het merk. Geen sjablonen, geen recyclede ontwerpen.",
    },
  ],
};

// ============================================================
// /diensten/webdesign — volledige funnel
// ============================================================

export const webdesignFunnel = {
  hero: {
    eyebrow: "Webdesign",
    titleLead: "Een website die er goed uitziet",
    titleAccent: "én aanvragen oplevert.",
    body:
      "Redesigns en landingspagina's voor ondernemers die meer willen dan een nette site. Gebouwd op uitstraling én op conversie.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    background: "/projects/2.webp",
  },
  herkenning: {
    eyebrow: "Voor wie dit is",
    title:
      "Een site die je zelf liever niet meer doorstuurt. Of een landingspagina die kliks krijgt, maar geen aanvragen.",
    body:
      "Als één van die twee herkenbaar is, zit je hier goed. We pakken allebei aan.",
  },
  tracks: {
    eyebrow: "Hoe wij jou kunnen helpen",
    title: "Twee duidelijke trajecten",
    accent: "trajecten",
    items: [
      {
        tag: "Redesign",
        title: "Een site die weer klopt met je bedrijf",
        body:
          "Voor wie een bestaande site heeft die niet meer past bij waar het bedrijf nu staat. We herontwerpen de uitstraling, scherpen de structuur aan en zorgen dat de site weer voor je werkt.",
        points: [
          "Volledig nieuw ontwerp rond je merk",
          "Heldere structuur en betere vindbaarheid",
          "Snel, technisch op orde en makkelijk te beheren",
        ],
        cta: { label: "Meer weten? Plan een gesprek", href: "/contact" },
      },
      {
        tag: "Landingspagina",
        title: "Eén pagina die één ding doet: converteren",
        body:
          "Voor een campagne, dienst of product dat een eigen pagina verdient. Eén heldere boodschap, één duidelijke actie, gebouwd om bezoekers om te zetten in aanvragen.",
        points: [
          "Eén scherpe boodschap zonder afleiding",
          "Opgebouwd rond een meetbare conversie",
          "Klaar om aan je campagnes te koppelen",
        ],
        cta: { label: "Meer weten? Plan een gesprek", href: "/contact" },
      },
    ],
  },
  portfolio: {
    eyebrow: "Geselecteerd werk",
    titleLead: "Liever laten zien dan",
    titleAccent: "vertellen.",
    cta: { label: "Bekijk alle projecten", href: "/projecten" },
    items: [
      { name: "Smokey Joe's", type: "Redesign", branche: "Horeca", image: "/projects/1.webp" },
      { name: "Pure Panelen", type: "Redesign", branche: "Groothandel", image: "/projects/2.webp" },
      { name: "Future Cards", type: "Landingspagina", branche: "E-commerce", image: "/projects/3.webp" },
      { name: "Negentigtien", type: "Redesign", branche: "Merk", image: "/projects/4.webp" },
    ],
  },
  usps: {
    eyebrow: "Waarom KREATIVES",
    titleLead: "Wat je bij ons",
    titleAccent: "anders merkt",
    intro:
      "Rustig, concreet en gebouwd op resultaat. Dit is wat je bij ons anders merkt dan bij een doorsnee bureau.",
    cta: { label: "Plan een gesprek", href: "/contact" },
    items: [
      {
        title: "Gebouwd op conversie",
        body:
          "We ontwerpen niet alleen op looks, maar op wat de pagina moet opleveren: aanvragen, niet alleen complimenten.",
      },
      {
        title: "Eén vast aanspreekpunt",
        body:
          "Je werkt rechtstreeks met de mensen die je site bouwen. Geen account-laag, geen telefoonspel.",
      },
      {
        title: "Maatwerk, geen template",
        body:
          "Een site die past bij jouw merk en die je makkelijk zelf beheert, zonder dat je vastzit aan een logge standaardtemplate.",
      },
    ],
  },
  socialProof: {
    eyebrow: "Wat klanten zeggen",
    title: "In hun eigen woorden",
    accent: "woorden",
    items: [
      {
        quote:
          "Onze oude site stuurden we eigenlijk niemand meer. Na de redesign sturen we klanten er juist actief naartoe, omdat het nu klopt met hoe we werken.",
        author: "Lardy Verheijden",
        role: "Eigenaar",
        company: "Smokey Joe's",
        initials: "LV",
        color: "#FD6D17",
      },
      {
        quote:
          "De landingspagina voor onze campagne leverde direct meer aanvragen op. Eindelijk een pagina die echt iets doet in plaats van alleen mooi staan.",
        author: "Robin Meijer",
        role: "Marketing",
        company: "Future Cards",
        initials: "RM",
        color: "#1A1A1A",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Voordat je contact opneemt",
    items: [
      {
        q: "Wat als ik al een designer heb gehad?",
        a: "Geen probleem. We pakken vaker projecten op waar al iets ligt. We kijken eerlijk naar wat er staat, houden wat werkt en bouwen de rest opnieuw op.",
      },
      {
        q: "Hoe lang duurt een redesign?",
        a: "Gemiddeld vier weken, van strategiegesprek tot livegang. Bij een grotere site of webshop loopt dat iets op, maar je weet de planning vooraf.",
      },
      {
        q: "Lever ik zelf de teksten aan?",
        a: "Dat mag, maar het hoeft niet. We denken mee over de boodschap en kunnen de copy verzorgen. Goede content en beeld maken het verschil, daar helpen we je graag bij.",
      },
      {
        q: "Wat kost een landingspagina globaal?",
        a: "Een losse landingspagina ligt lager dan een volledige site. In het kennismakingsgesprek geven we een concrete richtprijs, zonder verrassingen achteraf.",
      },
    ],
  },
  closing: {
    title: "Klaar om je site weer voor je te laten werken?",
    accent: "voor je",
    body:
      "Eén gesprek is genoeg om te kijken of het past. We denken alvast mee, ook als je nog twijfelt.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    micro: "Geen offerte, geen verplichtingen. Gewoon kijken of het klikt.",
  },
};

// ============================================================
// /diensten/ai — volledige funnel
// ============================================================

export const aiFunnel = {
  hero: {
    eyebrow: "Diensten — AI",
    titleLead: "AI maakt ons sneller,",
    titleAccent: "niet onnadenkender.",
    body:
      "We zetten AI in als werktool binnen een doordacht proces. Dat betekent voor jou: snellere oplevering, slimmere mogelijkheden en lagere kosten op onderdelen waar dat kan.",
    background: "/projects/7.webp",
  },
  welNiet: {
    eyebrow: "Eerlijk over AI",
    title: "Wat AI bij ons wel en niet is",
    accent: "wel en niet",
    wel: {
      title: "Wat het wel is",
      items: [
        "Een werktool binnen een doordacht proces",
        "Sneller werken zonder in te leveren op kwaliteit",
        "Betere visuals en slimmere widgets, waar het past",
        "Vakmanschap dat bepaalt hoe de tool wordt ingezet",
      ],
    },
    niet: {
      title: "Wat het niet is",
      items: [
        "Een prompt intypen en de output opsturen",
        "Generieke beelden die overal opduiken",
        "Een shortcut op kwaliteit of aandacht",
        "Een vervanger van het ontwerpwerk zelf",
      ],
    },
  },
  toepassingen: {
    eyebrow: "Wat je eraan hebt",
    titleLead: "Concrete toepassingen voor",
    titleAccent: "jouw bedrijf",
    intro:
      "Vier manieren waarop we AI direct laten werken voor jouw merk, je site en je klanten. Geen losse experimenten, maar tools die we verweven in je website en je dagelijkse processen, zodat je er meteen iets aan hebt.",
    items: [
      {
        title: "AI-visuals",
        body:
          "Product- en merkbeelden zonder fotoshoot. Voor merken die sterk beeld nodig hebben, maar geen budget voor een dure shoot.",
      },
      {
        title: "AI-widgets",
        body:
          "Een chatbot, calculator of tool op je site die 24/7 voor je werkt. Minder telefoontjes, meer gekwalificeerde aanvragen.",
      },
      {
        title: "Snelheid",
        body:
          "Wat vroeger twee weken duurde, duurt nu korter. Niet omdat er minder werk in zit, maar omdat de repeterende stappen geautomatiseerd zijn.",
      },
      {
        title: "Copy & content",
        body:
          "Teksten als startpunt, niet als eindproduct. Wij schrijven mee in jouw tone of voice, AI versnelt het proces.",
      },
    ],
  },
  voorbeelden: {
    eyebrow: "Hoe het eruitziet",
    titleLead: "AI-output in",
    titleAccent: "vakkundige handen.",
    items: [
      { name: "Merkvisual", type: "AI-visual", branche: "E-commerce", image: "/projects/3.webp" },
      { name: "Slimme widget", type: "AI-widget", branche: "Dienstverlening", image: "/projects/6.webp" },
      { name: "Campagnebeeld", type: "AI-visual", branche: "Horeca", image: "/projects/1.webp" },
    ],
  },
  positionering: {
    eyebrow: "Tot slot",
    title:
      "We gebruiken AI omdat het je tijd en geld bespaart, en mogelijkheden opent die eerder alleen voor grote budgetten waren weggelegd. Het vakmanschap zit in hoe het wordt toegepast.",
    accent: "hoe het wordt toegepast",
  },
  closing: {
    title: "Benieuwd wat AI voor jouw website kan betekenen?",
    accent: "jouw website",
    body:
      "We laten je in een kort gesprek concreet zien wat er mogelijk is voor jouw merk en budget.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    micro: "Geen verplichtingen, gewoon een goed gesprek.",
  },
};

// ============================================================
// /werkwijze — volledige funnel
// ============================================================

export const werkwijzePage = {
  hero: {
    eyebrow: "Werkwijze",
    titleLead: "Van brief naar live,",
    titleAccent: "zonder verrassingen.",
    body:
      "Een heldere lijn voor ondernemers die controle willen en geen tijd hebben voor verrassing-rekeningen of eindeloze ping-pong.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    background: "/projects/5.webp",
  },
  statement: {
    heading:
      "Een webbureau inhuren voelt vaak als een sprong in het diepe. Bij ons weet je vanaf dag één waar je aan toe bent.",
    accent: "vanaf dag één",
    body: [
      "Onduidelijkheid, vertraging, een resultaat dat „niet helemaal” klopt.",
      "Dat hoort er niet bij. Wij maken het traject voorspelbaar, met vaste momenten en revisierondes inbegrepen.",
    ],
    cta: { label: "Leer ons kennen", href: "/over-ons" },
    image: "/projects/2.webp",
  },
  steps: {
    eyebrow: "De aanpak",
    titleLead: "Vijf stappen naar een site",
    titleAccent: "waar je achter staat.",
    items: [
      {
        no: "01",
        title: "Kennismaking",
        body: "Gratis en zonder pitch. We kijken samen of het klikt en of we de juiste partij voor je zijn.",
      },
      {
        no: "02",
        title: "Briefing & strategie",
        body: "Jij vertelt, wij luisteren en denken mee. We bepalen de boodschap, de doelgroep en wat de site moet opleveren.",
      },
      {
        no: "03",
        title: "Ontwerp",
        body: "Je krijgt de eerste concepten. Jij geeft feedback, wij scherpen aan tot het ontwerp echt klopt.",
      },
      {
        no: "04",
        title: "Bouw & verfijning",
        body: "We bouwen de site in een live-omgeving, met de revisierondes inbegrepen. Snel, schaalbaar en technisch op orde.",
      },
      {
        no: "05",
        title: "Oplevering & nazorg",
        body: "De site gaat live en we blijven een korte periode bereikbaar voor kleine aanpassingen en vragen.",
      },
    ],
  },
  verwachten: {
    eyebrow: "Wat je kunt verwachten",
    titleLead: "Concrete beloftes,",
    titleAccent: "geen superlatieven.",
    body:
      "Vier dingen die bij elk traject vaststaan, zodat je nooit voor verrassingen komt te staan.",
    stats: [
      { number: "4", label: "Weken tot oplevering", body: "Van eerste gesprek tot livegang werk je met een planning die we vooraf vastleggen." },
      { number: "1", label: "Vast aanspreekpunt", body: "Eén persoon die je project kent, van begin tot eind. Geen doorverbinden." },
      { number: "0", label: "Verborgen kosten", body: "Eén heldere prijs vooraf. Wat we afspreken is wat je betaalt." },
      { number: "2", label: "Revisierondes inbegrepen", body: "Ruimte om aan te scherpen tot het klopt, zonder meerwerk-discussie." },
    ],
  },
  socialProof: {
    eyebrow: "Wat klanten zeggen",
    title: "Hoe het is om met ons te werken",
    accent: "te werken",
    items: [
      {
        quote:
          "Vooraf wisten we precies wat er ging gebeuren en wat het kostte. Twee revisierondes waren genoeg om het echt scherp te krijgen.",
        author: "Jeroen de Wit",
        role: "Eigenaar",
        company: "Pure Panelen",
        initials: "JW",
        color: "#1A1A1A",
      },
      {
        quote:
          "Geen ruis, geen meerwerk-discussies. Het voelde de hele rit alsof we in goede handen waren, en dat zie je terug in het resultaat.",
        author: "Kim Smeets",
        role: "Oprichter",
        company: "Negentigtien",
        initials: "KS",
        color: "#FD6D17",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Voordat je het gesprek aanvraagt",
    items: [
      {
        q: "Hoe lang duurt een project?",
        a: "Gemiddeld vier weken van kennismaking tot livegang. Grotere projecten lopen iets uit, maar je kent de planning vanaf de start.",
      },
      {
        q: "Wat als ik al een site heb?",
        a: "Dan kijken we eerlijk naar wat er staat. We houden wat werkt en bouwen de rest opnieuw, zonder dat je opnieuw bij nul begint.",
      },
      {
        q: "Wat kost het globaal?",
        a: "Een maatwerk site begint rond een vaste prijs die we vooraf afspreken. In het kennismakingsgesprek geven we een concrete richting voor jouw situatie.",
      },
      {
        q: "Wat moet ik zelf aanleveren?",
        a: "Idealiter goede beelden en een idee van je boodschap. Heb je dat nog niet? We denken mee en kunnen de teksten verzorgen.",
      },
    ],
  },
  closing: {
    title: "Het enige wat jij hoeft te doen is dit gesprek aanvragen.",
    accent: "dit gesprek",
    body:
      "Wij regelen de rest van het traject. Jij houdt de controle, zonder verrassingen.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    micro: "Geen verplichtingen, geen offerte-regen. Gewoon een goed gesprek.",
  },
};

export const overOnsCta = {
  pill: "Jouw nieuwe site",
  titleLead: "Start jouw",
  titleAccent: "project.",
  body:
    "Sluit aan bij de ondernemers die hun online uitstraling wel kloppend hebben. Plan een vrijblijvend kennismakingsgesprek en bekijk samen wat er nodig is.",
  calendly: "https://calendly.com/info-jtw/gratis-adviesgesprek-v2",
  calendlyLabel: "Plan een gesprek",
  subjects: ["Maatwerk website", "Maatwerk webshop", "Redesign", "Iets anders"],
  privacy:
    "Door op verzenden te klikken ga je akkoord met onze privacyverklaring.",
};

// ============================================================
// "Binnenkort live" — tijdelijke linktree-style screen
// Verwijderen: in app/page.tsx <HomeContent /> renderen i.p.v. <ComingSoon />.
// ============================================================

export const comingSoon = {
  status: "Wij zijn bezig met de website",
  title: "KREATIVES",
  subtitle:
    "Onze nieuwe site staat bijna live. Tot die tijd bereik je ons hier direct.",
  background: hero.background,
  // TODO: echte telefoonnummer invullen (nu placeholder).
  links: [
    {
      label: "Bel ons",
      sub: "+31 6 13 06 62 50",
      href: "tel:+31613066250",
    },
    {
      label: "WhatsApp",
      sub: "Stuur ons een berichtje",
      href: "https://wa.me/31613066250",
    },
    {
      label: "Mail ons",
      sub: site.email,
      href: `mailto:${site.email}`,
    },
    {
      label: "Plan een gesprek",
      sub: "Gratis & vrijblijvend",
      href: overOnsCta.calendly,
      primary: true,
    },
  ],
};
