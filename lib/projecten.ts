// Projecten CMS — file-based content store.
// Eén entry per project. /projecten/[slug] leest hier uit en pre-rendert
// alle pagina's statisch via generateStaticParams.

export type ProjectSection = {
  heading?: string;
  body: string;
  bodyExtra?: string; // optionele tweede tekstkolom
  image?: string;
};

export type Project = {
  slug: string;
  name: string; // bedrijfsnaam (klein boven de titel)
  headline: string; // grote, beschrijvende titel op de detailpagina
  type: string;
  excerpt: string;
  intro: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  url?: string;
  sections: ProjectSection[];
  related?: string[]; // andere slugs
};

export const projecten: Project[] = [
  {
    slug: "burgers-frites",
    name: "Burgers&Frites Rotterdam",
    headline:
      "Hoe wij Burgers&Frites hun webdesign vertaalden naar 200% meer conversie",
    type: "Webdesign",
    excerpt:
      "Een conversiegerichte site voor het best beoordeelde bezorgrestaurant van Nederland.",
    intro:
      "Burgers&Frites is een uitgesproken Rotterdamse zaak met een eigen smoel en bezorging van hoge kwaliteit. Ondanks de titel van best beoordeelde bezorgrestaurant van Nederland liep de online uitstraling daar in alles op achter.",
    image: "/projects/burgers-frites.webp",
    tags: ["Webdesign", "Horeca", "Conversie"],
    client: "Burgers&Frites Rotterdam",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "De zaak zelf straalde karakter en kwaliteit uit, maar de website deed vermoeden dat het om een heel ander bedrijf ging. De wens was om de in-store ervaring en de site weer op één lijn te krijgen.",
        bodyExtra:
          "Tegelijk moest de site investeerders aantrekken voor het franchise-concept, en dus ook zakelijk overtuigen, niet alleen culinair.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn langsgegaan om de sfeer van het merk in het echt te voelen. De branding is funky en vrolijk gehouden, maar strak genoeg om serieus genomen te worden door investeerders.",
        bodyExtra:
          "Door onderzoek te doen naar franchise-pagina's van concurrenten konden we conversie vooropstellen in plaats van puur op ontwerp te leunen.",
      },
      {
        heading: "Het resultaat",
        body:
          "De nieuwe site vertegenwoordigt het merk eindelijk zoals het hoort, en sluit naadloos aan op de ervaring in de zaak.",
        bodyExtra:
          "Na livegang ging de conversie van de franchise-pagina met meer dan 500% omhoog. Online en offline vertellen nu hetzelfde verhaal.",
      },
    ],
    related: ["mazar-skin-clinic", "swims-official"],
  },
  {
    slug: "sabreen-mia",
    name: "Sabreen MIA",
    headline: "Uitverkocht in de eerste week na lancering",
    type: "Webshop",
    excerpt:
      "Van verkopen via Instagram-DM's naar een luxe webshop die zichzelf in een week terugverdiende.",
    intro:
      "Sabreen MIA is een stijlvol modemerk uit Amsterdam Osdorp met duizenden volgers en een sterke community. Verkopen ging volledig via Instagram-DM's, terwijl het merk toe was aan een webshop die net zo luxe aanvoelt als de stukken zelf.",
    image: "/projects/sabreen-mia.webp",
    tags: ["Webshop", "E-commerce", "Fashion"],
    client: "Sabreen MIA",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Verkopen via DM's was intensief en niet schaalbaar. Er was behoefte aan een webshop die aansluit op de bestaande branding, met een luxe uitstraling en heldere navigatie.",
        bodyExtra:
          "Daarbij moest het ontwerp conversiegericht en mobiel-first zijn, en tegelijk makkelijk te beheren voor het merk zelf.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn naar de fysieke winkel gegaan om de sfeer en merkidentiteit te voelen, en hebben die vertaald naar een digitaal concept. Veel witruimte en typografie die het merk ademt.",
        bodyExtra:
          "Alles is maatwerk gebouwd, zonder templates, met een soepele launch zodat het merk vanaf dag één zelfstandig kon verkopen.",
      },
      {
        heading: "Het resultaat",
        body:
          "De volledige investering was binnen één week terugverdiend. Klanten en volgers reageerden enthousiast op de nieuwe ervaring.",
        bodyExtra:
          "De verkoopstructuur is overzichtelijker, het vertrouwen groter, en de webshop voelt net zo luxe als de winkel zelf.",
      },
    ],
    related: ["swims-official", "the-goody-foody"],
  },
  {
    slug: "swims-official",
    name: "Swimss Official",
    headline: "20.000 volgers in het eerste jaar na lancering",
    type: "Webshop",
    excerpt:
      "Een premium e-commerce ervaring met een Mix and Match-configurator voor luxe badmode.",
    intro:
      "Swimss Official richt zich op veeleisende klanten die zoeken naar stijlvolle én functionele badmode. Ze wilden een platform dat hun unieke concept en premium branding perfect zou vertegenwoordigen, met een innovatieve aanpak binnen e-commerce.",
    image: "/projects/swims-official.webp",
    tags: ["Webdesign", "E-commerce", "Branding"],
    client: "Swimss Official",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Een visuele stijl die luxe en exclusiviteit uitstraalt, terwijl de Mix and Match-functie om badmode te combineren intuïtief moest blijven werken.",
        bodyExtra:
          "Daarbij moest de site conversiegericht zijn en complexe technische onderdelen naadloos integreren, zonder de ervaring te verstoren.",
      },
      {
        heading: "De aanpak",
        body:
          "Maatwerk webdesign dat intuïtieve navigatie en visuele aantrekkingskracht in balans brengt, met een eigen merkidentiteit als basis.",
        bodyExtra:
          "De e-commerce is geoptimaliseerd met een soepele checkout en een gebruiksvriendelijke Mix and Match-plugin die het combineren tot een spel maakt.",
      },
      {
        heading: "Het resultaat",
        body:
          "De eerste collectie was binnen een week volledig uitverkocht, zonder advertentiekosten. Bezoekers roemden de bruikbaarheid en het intuïtieve gebruik.",
        bodyExtra:
          "De nieuwe branding positioneerde Swimss als herkenbaar merk binnen de premium-niche, goed voor 20.000 volgers in het eerste jaar na lancering.",
      },
    ],
    related: ["sabreen-mia", "burgers-frites"],
  },
  {
    slug: "van-niets-naar-iets",
    name: "Van Niets Naar Iets Podcast",
    headline:
      "Hoe “Van Niets Naar Iets Podcast” een frisse, moderne branding kreeg",
    type: "Branding",
    excerpt:
      "Een eigentijdse merkidentiteit voor dé nummer één podcast voor multiculturele ondernemers.",
    intro:
      "Van Niets Naar Iets is dé nummer één podcast voor multiculturele ondernemers, met meer dan 3 miljoen views. De visuele identiteit liep achter op die professionele status en de verwachtingen van het publiek.",
    image: "/projects/van-niets-naar-iets.webp",
    tags: ["Branding", "Logo", "Podcast"],
    client: "Van Niets Naar Iets Podcast",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Ondanks de sterke positie in de markt ondermijnde de verouderde uitstraling de geloofwaardigheid. Het doel was een eigentijdse branding die de groei en invloed van de podcast weerspiegelt.",
        bodyExtra:
          "De identiteit moest professioneel ogen, maar tegelijk toegankelijk blijven voor een breed, ondernemend publiek.",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben een grondige merkanalyse en doelgroeponderzoek gedaan en op basis daarvan een nieuw logo ontwikkeld dat professionaliteit en toegankelijkheid combineert.",
        bodyExtra:
          "Daarbovenop kwamen eigen Instagram-iconen die de social-media presence versterken, met elk element afgestemd op de kernwaarden van de podcast.",
      },
      {
        heading: "Het resultaat",
        body:
          "Een modern, herkenbaar logo en een set social-iconen die consistentie en professionaliteit uitstralen over alle kanalen.",
        bodyExtra:
          "De reacties van luisteraars waren positief en de merkperceptie ging merkbaar omhoog.",
      },
    ],
    related: ["the-goody-foody", "sabreen-mia"],
  },
  {
    slug: "the-goody-foody",
    name: "TheGoodyFoody",
    headline:
      "Hoe wij TheGoodyFoody een gezicht gaven dat net zo lekker is als hun maaltijden",
    type: "Branding",
    excerpt:
      "Een verpakkingsontwerp dat het verhaal van verse, gezonde maaltijden eindelijk vertelt.",
    intro:
      "TheGoodyFoody is het merk van Opa Norma: verse, gezonde maaltijden voor mensen die goed willen eten zonder er veel tijd aan kwijt te zijn. Het product was sterk, maar de verpakking vertelde dat verhaal nog niet.",
    image: "/projects/the-goody-foody.webp",
    tags: ["Branding", "Verpakking", "Webdesign"],
    client: "TheGoodyFoody",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Op kantoor bij Opa Norma zagen we een sterk merkfundament, maar een verpakking die achterliep. De sleeves voelden vlak aan en lieten niet zien wat erin zat.",
        bodyExtra:
          "TheGoodyFoody groeide hard online met een groeiende community, terwijl de oude sleeves niet onderscheidend genoeg waren voor het merk dat ze inmiddels waren.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn uitgegaan van de kern van het merk: zelfgemaakt, eerlijk, energiek en recht voor zijn raap. Het logo is subtiel opgewaardeerd en de voedingsinformatie beter zichtbaar gemaakt.",
        bodyExtra:
          "Elke maaltijd kreeg een eigen kleuraccent en een ingrediënten-illustratie, zodat er een familie ontstaat die samenhangt én ieder gerecht zijn eigen karakter houdt.",
      },
      {
        heading: "Het resultaat",
        body:
          "De nieuwe sleeves brengen het merk tot leven, met heldere communicatie en een professionele uitstraling.",
        bodyExtra:
          "Na de launch groeide de merkherkenning flink. Klanten delen hun maaltijden op social media en de verpakking is onderdeel geworden van de merkidentiteit.",
      },
    ],
    related: ["sabreen-mia", "van-niets-naar-iets"],
  },
  {
    slug: "mazar-skin-clinic",
    name: "Mazar Skin Clinic",
    headline: "120%+ conversie en volgeboekt binnen 3 weken na hun rebranding",
    type: "Webdesign",
    excerpt:
      "120%+ conversie en volgeboekt binnen drie weken na de rebranding.",
    intro:
      "Mazar Skin Clinic is een huidkliniek die toe was aan een uitstraling die past bij de kwaliteit van de behandelingen. De oude site bracht de premium ervaring niet over en liet kansen op nieuwe afspraken liggen.",
    image: "/projects/mazar-skin-clinic.webp",
    tags: ["Webdesign", "CRO", "Zorg"],
    client: "Mazar Skin Clinic",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "De kliniek wilde een site die net zo verzorgd en betrouwbaar oogt als de behandelkamer, met een boekingsflow die bezoekers moeiteloos naar een afspraak leidt.",
        bodyExtra:
          "De bestaande site miste hiërarchie en focus, waardoor bezoekers afhaakten voordat ze een afspraak inplanden.",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben de huisstijl doorgetrokken naar een rustige, premium website met een heldere structuur en een conversiegerichte opbouw per pagina.",
        bodyExtra:
          "De afspraakflow staat centraal en is op elke pagina binnen handbereik, zodat de stap van interesse naar boeking zo klein mogelijk is.",
      },
      {
        heading: "Het resultaat",
        body:
          "Na de rebranding steeg de conversie met meer dan 120% en zat de agenda binnen drie weken vol.",
        bodyExtra:
          "De kliniek straalt online nu dezelfde kwaliteit uit als in de praktijk, en trekt structureel meer afspraken aan.",
      },
    ],
    related: ["burgers-frites", "swims-official"],
  },
];

export function getAllProjectSlugs() {
  return projecten.map((p) => p.slug);
}

export function getProject(slug: string): Project | undefined {
  return projecten.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string): Project[] {
  const project = getProject(slug);
  if (!project?.related) return [];
  return project.related
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
}
