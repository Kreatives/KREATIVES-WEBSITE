// Centrale content + configuratie. Alle copy is geschreven volgens de
// KREATIVES tone-of-voice skill (geen "geen X maar Y", geen staccato,
// geen em-dashes, geen lege bureautaal, Nederlands, ondernemer-aan-tafel).

export const site = {
  name: "KREATIVES",
  domain: "https://www.kreatives.nl",
  email: "info@kreatives.nl",
  description:
    "Webdesignbureau uit Arnhem dat 100+ websites bouwde voor ondernemers door heel Nederland. Van webdesign tot branding. Vraag een gratis strategiegesprek aan.",
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
  // het tweede deel (kleur erft van de witte tekst op de foto).
  titleLead: "Jouw merk is sterker dan",
  titleAccent: "je website laat zien.",
  body:
    "Wij bouwen maatwerk websites voor ondernemers die er online even goed uit willen zien als ze offline al zijn.",
  primary: { label: "Gratis re-design", href: "/contact" },
  secondary: { label: "Bekijk ons werk", href: "/projecten" },
  // Social-proof widget
  socialProof: {
    avatars: [
      { initials: "DL", color: "#FD6D17", photo: "/team/dylan.webp" },
      { initials: "SF", color: "#1A1A1A", photo: "/team/safa.webp" },
      { initials: "YS", color: "#9aa3a8", photo: "/team/youssef.webp" },
      { initials: "AN", color: "#5b3b1f", photo: "/team/angela.webp" },
    ],
    rating: "5/5",
    label: "op Google",
    trust: "Vertrouwd door 95+ ondernemers",
  },
  background: "/brand/home-hero.webp",
  // Iets naar links croppen zodat de presentator in beeld blijft.
  backgroundPosition: "30% center",
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
    "Je site staat er nog, maar hij klopt niet meer. Je bent gegroeid, je aanbod is verschoven, je prijzen zijn omhoog gegaan, de website niet. Ondertussen ziet je concurrent er online strakker uit dan jij, terwijl jij weet dat jij het betere werk levert.",
};

export const usps = {
  eyebrow: "Waarom ons",
  titleLead: "Waarom ondernemers voor",
  titleAccent: "ons kiezen.",
  intro:
    "Je werkt rechtstreeks met de mensen die je site bouwen. Geen doorgeefluik, geen sjabloon dat wordt aangepast. Een aanpak die vooraf duidelijk is, en een eindresultaat dat bij je merk past.",
  items: [
    {
      no: "01",
      title: "Vaste aanpak",
      body:
        "Vooraf weet je wat er wanneer gebeurt en wat het kost. We starten niet zonder dat alles op papier staat.",
      image: "/brand/brand-1.webp",
    },
    {
      no: "02",
      title: "Volledig op maat",
      body:
        "We werken niet met thema's of kant-en-klare blokken. Elke site wordt gebouwd rond jouw merk, zodat hij er nergens anders uitziet.",
      image: "/brand/brand-2.webp",
    },
    {
      no: "03",
      title: "Twee revisierondes",
      body:
        "Je krijgt de ruimte om het design aan te scherpen totdat het echt klopt. De prijs verandert daardoor niet.",
      image: "/brand/work-2.webp",
    },
  ],
};

export const werkwijze = {
  eyebrow: "Aanpak",
  titleLead: "Zo werken we, van eerste gesprek tot",
  titleAccent: "live site.",
  steps: [
    {
      no: "01",
      title: "Strategiegesprek",
      body:
        "We beginnen met een gesprek over je merk, je doelgroep en wat de site concreet moet opleveren.",
      image: "/brand/work-1.webp",
    },
    {
      no: "02",
      title: "Design",
      body:
        "Je krijgt een ontwerp op maat, met twee revisierondes om alles aan te scherpen tot het klopt.",
      image: "/brand/work-3.webp",
    },
    {
      no: "03",
      title: "Development",
      body:
        "We bouwen de site snel, schaalbaar en technisch op orde, gericht op goede vindbaarheid.",
      image: "/brand/work-4.webp",
    },
    {
      no: "04",
      title: "Livegang",
      body:
        "De site gaat live en je kunt daarna zelf je teksten en projecten blijven aanpassen.",
      image: "/brand/work-5.webp",
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
  photo?: string;
};

export const reviewsPage = {
  eyebrow: "Reviews",
  titleLead: "Wat klanten over ons",
  titleAccent: "zeggen.",
  body:
    "Een greep uit de reacties van ondernemers en merken waar we mee werkten. Ongefilterd en in hun eigen woorden.",
  items: [
    {
      title: "CTR van 1% naar 6%",
      quote:
        "Sinds de lancering van onze nieuwe website is onze online zichtbaarheid flink verbeterd. Waar onze CTR eerst rond de 1% lag, is die nu gestegen naar maar liefst 6%! Dit komt volledig door de fantastische nieuwe website: visueel sterk én technisch goed in elkaar. De gebruiksvriendelijkheid, snelheid en structuur zorgen ervoor dat bezoekers langer blijven en sneller doorklikken. Ik ben enorm tevreden en raad dit team aan iedereen aan!",
      author: "Isslam Younes",
      role: "Local Guide",
      company: "",
      initials: "IY",
      color: "#FD6D17",
    },
    {
      title: "Snel leveren, minder revisies",
      quote:
        "We werken inmiddels bijna een jaar met Ricky samen en zijn erg blij met de samenwerking! Hij reageert snel, met zijn ontwerpen kunnen wij sneller leveren, en het aantal revisies per klant is gedaald. We zetten deze samenwerking graag voort!",
      author: "Studio BIC",
      role: "Klant",
      company: "Studio BIC",
      initials: "SB",
      color: "#1A1A1A",
    },
    {
      title: "Ricky 100% aanrader",
      quote:
        "Ricky heeft een website gemaakt voor onze Mazar Skin Clinic en we zijn er ontzettend blij mee. Het begon met een gesprek waarin Ricky goed luisterde naar onze wensen en waardevol advies gaf, met een prachtige website als resultaat. Kortom: Ricky is niet alleen een vakkundige websitebouwer, maar ook een prettige partij om mee te communiceren. Het resultaat werd bovendien snel opgeleverd. Ik raad Ricky 100% aan!",
      author: "S. R.",
      role: "Klant",
      company: "Mazar Skin Clinic",
      initials: "SR",
      color: "#5b3b1f",
    },
    {
      title: "Pas af als alles perfect was",
      quote:
        "Ik heb Ricky meerdere keren verschillende projecten toevertrouwd. Hij denkt ontzettend goed mee met mijn wensen, en het project was pas af als alles perfect was. Top service, zeer professioneel en nauwkeurig; ik raad hem zeker aan! Nogmaals bedankt voor alles 🙌",
      author: "Zeinab H.",
      role: "Klant",
      company: "",
      initials: "ZH",
      color: "#9aa3a8",
    },
    {
      title: "Hoogwaardig en onderscheidend",
      quote:
        "Hoogwaardig, conversiegericht en onderscheidend. Superblij met de website die RKCreatives voor me heeft gebouwd! Naast de site was ook de service top. Je input wordt gewaardeerd en waar nodig goed aangevuld!",
      author: "Stap Voor Stap Onderwijs",
      role: "Klant",
      company: "Stap Voor Stap Onderwijs",
      initials: "SO",
      color: "#1A1A1A",
    },
    {
      title: "Alles luisterde naar mijn wensen",
      quote:
        "De communicatie was professioneel en helder, waardoor het hele proces soepel verliep. Er werd goed geluisterd naar mijn wensen en ideeën, zodat het eindresultaat precies werd wat ik voor ogen had.",
      author: "Sarmen Jallal",
      role: "Klant",
      company: "",
      initials: "SJ",
      color: "#FD6D17",
    },
    {
      title: "Fantastische site, nieuw concept",
      quote:
        "Super blij met Ricky! Hij heeft een fantastische website voor me gemaakt. Echt een topper. Het was best een uitdaging met een compleet nieuw concept, maar ondanks dat heeft hij toch een geweldige website neergezet! Ga zo door!",
      author: "Pogosian",
      role: "Klant",
      company: "",
      initials: "PO",
      color: "#5b3b1f",
    },
    {
      title: "Goede, snelle service",
      quote:
        "Ricky heeft de website voor ons bedrijf gebouwd. We zijn tevreden en raden RK Creatives aan iedereen aan. Goede en snelle service voor een redelijke prijs, en Ricky is erg vriendelijk.",
      author: "R. Meijboom",
      role: "Klant",
      company: "",
      initials: "RM",
      color: "#9aa3a8",
    },
    {
      title: "Website, logo én drukwerk",
      quote:
        "Ik heb meerdere keren gebruikgemaakt van RKCreatives. Ze hebben mijn website, logo en drukwerk ontworpen. Ik ben erg tevreden met hun uitstekende en snelle service. Echt proactief en professioneel. Een aanrader!",
      author: "Maya Zen",
      role: "Klant",
      company: "",
      initials: "MZ",
      color: "#1A1A1A",
      photo: "/team/mayazen.webp",
    },
    {
      title: "Het mooiste logo dat ik me kon wensen",
      quote:
        "Ik heb een fantastische ervaring gehad met Ricky. Hij is enorm vaardig in zijn werk. Hij ontwierp het mooiste logo voor mijn bedrijf dat ik me had kunnen wensen!",
      author: "Sharda Marwa",
      role: "Klant",
      company: "",
      initials: "SM",
      color: "#FD6D17",
    },
    {
      title: "Snel klaar, met extra's",
      quote:
        "RKCreatives leverde fantastische service! De website was heel snel klaar en precies zoals ik het wilde. Ze voegden ook nog wat extra's toe waardoor de website nog strakker werd. Een echte aanrader!",
      author: "Labran Hamidu",
      role: "Klant",
      company: "",
      initials: "LH",
      color: "#5b3b1f",
    },
    {
      title: "Precies zoals ik wilde",
      quote:
        "Ik ben zo blij met de website! Hij is precies geworden zoals ik wilde, en dat is te danken aan Rick. Hij heeft er zoveel tijd en energie in gestoken. Dank je wel daarvoor.",
      author: "Lemmies Skin",
      role: "Klant",
      company: "Lemmies Skin",
      initials: "LS",
      color: "#9aa3a8",
    },
    {
      title: "Duidelijk en makkelijk te vinden",
      quote:
        "Ik ben zo blij met mijn website!! Hij ziet er prachtig uit en alles is duidelijk en makkelijk te vinden voor onze klanten. Bedankt!!!",
      author: "S.",
      role: "Klant",
      company: "",
      initials: "S",
      color: "#1A1A1A",
    },
    {
      title: "Blij met mijn professionele site",
      quote:
        "Uitstekende service, en ontzettend blij met mijn nieuwe professionele website. Bedankt RK Creatives!",
      author: "Wobaboba",
      role: "Klant",
      company: "",
      initials: "WB",
      color: "#FD6D17",
    },
    {
      title: "Komt afspraken uitstekend na",
      quote:
        "Sterke communicatie, komt afspraken uitstekend na, oplossingsgericht, deskundig en met oog voor kwaliteit. Bedankt voor deze samenwerking!",
      author: "Ekkie Pets",
      role: "Klant",
      company: "Ekkie Pets",
      initials: "EP",
      color: "#5b3b1f",
    },
    {
      title: "Snel werken, hoge kwaliteit",
      quote:
        "Zeer prettige samenwerking met Ricky; hij werkt snel en bovenal is de kwaliteit erg goed. Een aanrader voor iedereen die zijn website serieus neemt en zich zakelijk wil onderscheiden van andere websites!",
      author: "Safa Doestzada",
      role: "Klant",
      company: "",
      initials: "SD",
      color: "#9aa3a8",
      photo: "/team/safa.webp",
    },
    {
      title: "Reageert altijd, top communicatie",
      quote:
        "Ik ben supertevreden met RKCreatives. Hij heeft een prachtige website voor me gebouwd en we hebben goede communicatie. Reageert altijd! 22thelabel to the moon 🚀",
      author: "Dilan",
      role: "Klant",
      company: "22thelabel",
      initials: "DI",
      color: "#1A1A1A",
      photo: "/team/dylan.webp",
    },
    {
      title: "Strak en professioneel",
      quote:
        "Ik ben supertevreden met het eindresultaat. De communicatie was erg prettig en er werd goed geluisterd naar mijn wensen. Het ziet er strak en professioneel uit, precies wat ik voor ogen had. Liefs, Ohmybeauty",
      author: "Savo Hamad",
      role: "Klant",
      company: "Ohmybeauty",
      initials: "SH",
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
  titleLead: "Gebouwd door de mensen",
  titleAccent: "met wie je belt.",
  body:
    "KREATIVES is opgezet vanuit één idee: de meeste ondernemers verdienen een betere site dan ze hebben. We houden het klein zodat je altijd weet wie er aan je site zit, en waarom we iets doen zoals we het doen.",
  cta: { label: "Lees meer over ons", href: "/over-ons" },
  portrait: "/brand/brand-1.webp" as string | null,
};

export const pricing = {
  eyebrow: "Prijzen",
  titleLead: "Transparante prijzen,",
  titleAccent: "geen verrassingen",
  body:
    "Vooraf duidelijk wat je krijgt en wat het kost. Eén vaste prijs, twee revisierondes inbegrepen, live binnen vier weken.",
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
        "Voorraad en orderbeheer",
        "Klantaccounts en bestelhistorie",
        "Tot 30 producten klaar bij oplevering",
        "30 dagen CRO",
      ],
      cta: { label: "Plan een gesprek", href: "/contact" },
    },
  ],
};

// Sluit-CTA onderaan de homepage (vervangt het formulier daar).
export const closingCta = {
  // Urgentie-regel boven de titel; {maand} wordt in de component ingevuld.
  pulse: "4 plekken beschikbaar in",
  titleLead: "Klaar om je site",
  titleAccent: "kloppend te maken?",
  body:
    "Plan een vrijblijvend gesprek. We kijken samen wat er nodig is en wat het kost.",
  cta: { label: "Plan een gesprek", href: "/contact" },
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
    eyebrow: "Webdesign",
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
    eyebrow: "AI",
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
  // Avatar-rij bovenaan: echte teamfoto's (initialen + kleur als fallback)
  team: [
    { initials: "DL", color: "#1A1A1A", photo: "/team/dylan.webp" },
    { initials: "SA", color: "#FD6D17", photo: "/team/safa.webp" },
    { initials: "YO", color: "#5b3b1f", photo: "/team/youssef.webp" },
    { initials: "AN", color: "#9aa3a8", photo: "/team/angela.webp" },
    { initials: "MZ", color: "#FD6D17", photo: "/team/mayazen.webp" },
    { initials: "SF", color: "#1A1A1A", photo: "/team/stefan.webp" },
    { initials: "GB", color: "#5b3b1f", photo: "/team/galbin.webp" },
  ],
  privacy:
    "Door op verzenden te klikken ga je akkoord met onze privacyverklaring.",
};

export const footer = {
  tagline:
    "Maatwerk websites voor ondernemers die hun online uitstraling in lijn willen brengen met hun bedrijf.",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ricky-kai/",
      icon: "linkedin" as const,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@ricksooo",
      icon: "tiktok" as const,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/ricky.webdesign",
      icon: "instagram" as const,
    },
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
        { label: "Gratis blauwdruk", href: "/blauwdruk" },
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
  titleLead: "Klein bureau,",
  titleAccent: "serieus werk.",
  body:
    "KREATIVES is opgericht omdat de meeste ondernemers een betere website verdienen dan ze hebben. We houden het klein, werken met een vast team en pakken een beperkt aantal projecten aan, zodat elke site de aandacht krijgt die hij verdient.",
  background: "/brand/brand-1.webp",
};

export const overOnsVerhaal = {
  badge: "Ons verhaal",
  titleLead: "Begonnen vanuit",
  titleAccent: "een goede ergernis.",
  subheading: "Sites die er verzorgd uitzien, zonder het prijskaartje van een groot bureau.",
  paragraphs: [
    "Ik zag te veel ondernemers rondlopen met een site die niet meer paste bij wat ze inmiddels deden. Niet omdat ze er niet in wilden investeren, maar omdat de opties niet klopten: te duur, te generiek, of een wachtrij van drie maanden.",
    "KREATIVES is daar direct op gebouwd. Maatwerk websites die snel laden en technisch op orde staan, voor een prijs die past bij wat een serieuze ondernemer redelijk kan investeren.",
  ],
  primaryCta: { label: "Plan een gesprek", href: "/contact" },
  cta: { label: "Bekijk ons werk", href: "/projecten" },
  media: {
    main: "/brand/over-verhaal.webp",
    left: "/brand/work-1.webp",
    right: "/brand/work-4.webp",
  },
};

export const overOnsKernwaarden = {
  eyebrow: "Kernwaarden",
  intro:
    "Vier dingen die je altijd terugziet in hoe we werken.",
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
  titleLead: "Wie er aan je site",
  titleAccent: "zit.",
  body:
    "KREATIVES is een klein team. We pakken een beperkt aantal projecten tegelijk aan, zodat je altijd weet wie er aan jouw site werkt en waarom we iets doen zoals we het doen. Geen wachtrij, geen doorgeefluik.",
  portrait: "/brand/work-2.webp",
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
  eyebrow: "Resultaten",
  titleLead: "In",
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
    titleLead: "Een site die er",
    titleAccent: "weer bij past.",
    body:
      "Voor ondernemers die gegroeid zijn, maar waarvan de website dat nog niet laat zien. We bouwen hem opnieuw, of beter, of allebei.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    background: "/brand/work-3.webp",
  },
  herkenning: {
    eyebrow: "Voor wie dit is",
    title:
      "Je hebt een website die je zelf liever niet meer doorstuurt. Of een landingspagina die wel kliks krijgt, maar geen aanvragen. Als één van die twee herkenbaar is, zit je hier goed.",
    accent: "geen aanvragen",
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
          "Je site ziet er misschien nog prima uit van buiten, maar hij werkt niet meer mee. De structuur klopt niet, de uitstraling is achtergebleven, of bezoekers klikken weg zonder iets te doen. We herontwerpen hem volledig, zodat hij weer past bij waar je nu staat.",
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
          "Je lanceert iets nieuws, je start een campagne, of je hebt een dienst die een eigen plek verdient. Een landingspagina heeft één boodschap en één doel: de bezoeker zet de stap. We bouwen hem zo dat hij dat ook doet.",
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
    eyebrow: "Liever laten zien dan vertellen",
    titleLead: "Werk dat voor zichzelf",
    titleAccent: "spreekt.",
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
    titleAccent: "anders merkt.",
    cta: { label: "Plan een gesprek", href: "/contact" },
    items: [
      {
        title: "We ontwerpen op wat de site moet doen",
        body:
          "Niet alleen op hoe hij eruitziet. We kijken vooraf wat de pagina moet opleveren en bouwen daar het ontwerp omheen.",
        icon: "/icons/goals.svg",
      },
      {
        title: "Eén vast aanspreekpunt",
        body:
          "Je werkt rechtstreeks met de mensen die je site bouwen. Geen accountlaag, geen doorgeefluik.",
        icon: "/icons/contact.svg",
      },
      {
        title: "Volledig op maat, makkelijk te beheren",
        body:
          "Een site die past bij jouw merk en die je daarna zelf in de hand hebt, zonder dat je afhankelijk blijft van ons voor elke kleine aanpassing.",
        icon: "/icons/custom.svg",
      },
    ],
  },
  socialProof: {
    eyebrow: "Reviews",
    title: "Wat klanten zeggen.",
    accent: "zeggen.",
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
    title: "Klaar om je site weer kloppend te maken?",
    accent: "kloppend te maken?",
    body:
      "Eén gesprek is genoeg om te zien wat er nodig is. Geen offerte, geen verplichtingen.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
  },
};

// ============================================================
// /diensten/ai — volledige funnel
// ============================================================

export const aiFunnel = {
  hero: {
    eyebrow: "AI",
    titleLead: "Wat vroeger duur was,",
    titleAccent: "is dat nu niet meer.",
    body:
      "We zetten AI in als werktool binnen een doordacht proces. Dat betekent voor jou: snellere oplevering, betere beelden en mogelijkheden die eerder alleen voor grote budgetten waren weggelegd.",
    background: "/brand/brand-3.webp",
  },
  welNiet: {
    eyebrow: "AI in de praktijk",
    title: "Eerlijk over hoe we het gebruiken.",
    accent: "gebruiken.",
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
        "Stockbeelden die je overal terugziet",
        "Een reden om minder aandacht aan jouw project te besteden",
        "Een vervanger van het ontwerpwerk zelf",
      ],
    },
  },
  toepassingen: {
    eyebrow: "Wat je eraan hebt",
    titleLead: "Wat je er concreet",
    titleAccent: "aan hebt.",
    intro:
      "Vier manieren waarop we AI verweven in je site en processen, zodat je er direct iets aan hebt.",
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
        title: "Snellere oplevering",
        body:
          "Repeterende stappen zijn geautomatiseerd. Dat betekent dat je project korter duurt zonder dat er minder werk in zit.",
      },
      {
        title: "Teksten in jouw stem",
        body:
          "We schrijven mee in jouw tone of voice. AI versnelt het proces, wij bewaken of het ook echt klinkt zoals jij.",
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
    title: "Benieuwd wat dit voor jouw website betekent?",
    accent: "jouw website",
    body:
      "In een kort gesprek laten we je zien wat er concreet mogelijk is voor jouw merk en budget. Geen verplichtingen.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
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
      "We leggen vooraf vast wat er wanneer gebeurt en wat het kost. Geen verrassing-rekeningen, geen weken zonder update, geen resultaat dat “niet helemaal” klopt.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
    background: "/brand/work-5.webp",
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
    image: "/brand/work-1.webp",
  },
  steps: {
    eyebrow: "De aanpak",
    titleLead: "Zo ziet het traject",
    titleAccent: "eruit.",
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
        body: "We bouwen de site in een live-omgeving zodat je ziet hoe hij er echt uitziet. De twee revisierondes zitten in deze fase.",
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
    titleLead: "Wat bij elk traject",
    titleAccent: "vaststaat.",
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
    title: "Wat klanten zeggen.",
    accent: "zeggen.",
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
    title: "Ziet dit eruit als wat je zoekt?",
    accent: "wat je zoekt?",
    body:
      "Plan een gesprek. We kijken samen of het past en leggen direct vast wat er nodig is. Geen verplichtingen.",
    cta: { label: "Plan een gratis kennismaking", href: "/contact" },
  },
};

export const overOnsCta = {
  pill: "Jouw nieuwe site",
  titleLead: "Klinkt dit als",
  titleAccent: "wat je zoekt?",
  body:
    "Plan een gesprek. We kijken samen of het past en wat er nodig is. Geen offerte, geen verplichtingen.",
  calendly: "https://calendly.com/info-jtw/blueprint-sessie",
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
