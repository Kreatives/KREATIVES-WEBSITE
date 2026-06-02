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
  name: string;
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
    slug: "smokey-joes",
    name: "Smokey Joe's",
    type: "Horeca",
    excerpt: "Maatwerk site voor een groeiend horecaconcept.",
    intro:
      "Smokey Joe's groeide in twee jaar van één locatie naar een groeiend concept met afhaal en bezorging. De oude site liep daar in alles op achter, met trage laadtijden en een navigatie die niet meer klopte met het aanbod.",
    image: "/projects/1.webp",
    tags: ["Horeca", "Maatwerk", "Branding"],
    client: "Smokey Joe's",
    year: "2025",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Een site die zowel de in-store ervaring als de bezorg- en afhaalflow moest dragen, zonder dat het ten koste ging van de speelse merkpersoonlijkheid die Smokey Joe's offline al had opgebouwd.",
        bodyExtra:
          "Daarbovenop kwam de wens om de menukaart vanuit één plek te beheren, zodat een wijziging in de keuken direct zichtbaar is in de bestelflow én op het bord boven de toonbank.",
        image: "/projects/1.webp",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben de menu-structuur opnieuw opgebouwd rond hoe gasten daadwerkelijk bestellen, met grote productfoto's en een prominente bestelflow op iedere pagina. De huisstijl is doorgetrokken naar de hele site, met de oranje accenten als rode draad.",
        bodyExtra:
          "Voor het beheer is er een eenvoudige back-office gebouwd waarin het team in seconden producten kan toevoegen, prijzen kan aanpassen of items op pauze kan zetten. Geen omwegen via developers meer.",
        image: "/projects/2.webp",
      },
      {
        heading: "Het resultaat",
        body:
          "De site laadt nu binnen één seconde, het aantal online bestellingen is verdubbeld in de eerste twee maanden na livegang, en gasten vinden de actuele menukaart sneller terug.",
        bodyExtra:
          "De binnendienst rapporteert dat het aantal telefonische bestelvragen met de helft is afgenomen. De informatie op de site is voor gasten kennelijk duidelijk genoeg om zelfstandig te bestellen.",
      },
    ],
    related: ["pure-panelen", "future-cards"],
  },
  {
    slug: "pure-panelen",
    name: "Pure Panelen",
    type: "Groothandel",
    excerpt: "Productcatalogus en offerteflow voor een groothandel.",
    intro:
      "Pure Panelen levert akoestische panelen en wandafwerking aan zakelijke klanten door heel Nederland. De vraag was om de catalogus toegankelijker te maken zonder de zakelijke offerteflow te verstoren.",
    image: "/projects/2.webp",
    tags: ["Groothandel", "B2B", "Catalogus"],
    client: "Pure Panelen B.V.",
    year: "2024",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "De oude site was opgezet als een platte productlijst zonder filters of categorie-overzichten. Klanten haakten af voordat ze bij de offerteknop kwamen.",
        bodyExtra:
          "Daarbij ontbrak het inzicht in welke producten goed verkochten. Het zakelijke marketingteam had geen handvat om de catalogus richting de juiste doelgroepen te sturen.",
        image: "/projects/2.webp",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben de catalogus opnieuw opgebouwd met categorieën, filters op materiaal en geluidsabsorptie, en een offerteflow die per product begint en bij meer producten samen wordt afgerond.",
        bodyExtra:
          "De binnendienst heeft een dashboard gekregen waarin offertes binnenkomen, kunnen worden toegekend en opgevolgd. Geen losse mailtjes meer die tussen wal en schip vallen.",
        image: "/projects/5.webp",
      },
      {
        heading: "Het resultaat",
        body:
          "Het aantal ingediende offertes is met 60% gestegen, en de gemiddelde tijd op productpagina's is bijna verdubbeld. De binnendienst kan offertes nu ook direct vanuit de site afhandelen.",
        bodyExtra:
          "De doorlooptijd van offerte-aanvraag tot eerste reactie is gedaald van drie werkdagen naar dezelfde dag. Voor klanten een merkbaar verschil in de relatie.",
      },
    ],
    related: ["smokey-joes", "negentigtien"],
  },
  {
    slug: "future-cards",
    name: "Future Cards",
    type: "E-commerce",
    excerpt: "Configurator voor volledig gepersonaliseerde kaarten.",
    intro:
      "Future Cards levert luxe gepersonaliseerde betaalpassen. De doelgroep wil zelf ontwerpen, maar het oude proces zat vol formulieren en e-mail-uitwisselingen voordat er iets concreets op tafel lag.",
    image: "/projects/3.webp",
    tags: ["E-commerce", "Configurator"],
    client: "Future Cards",
    year: "2024",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Klanten een configurator geven waarin ze hun kaart live kunnen ontwerpen, terwijl het bestelproces robuust blijft en geschikt is voor zowel particulieren als zakelijke aanvragen.",
        bodyExtra:
          "De configurator moest snel werken op mobiele apparaten en aansluiten op het bestaande productiesysteem dat de kaarten daadwerkelijk graveert en levert.",
        image: "/projects/3.webp",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben een live preview-configurator gebouwd waarmee je je naam, logo en kleur direct op een 3D-kaart ziet veranderen. De rest van de site sluit aan op die ervaring, met dezelfde rust en focus op het product.",
        bodyExtra:
          "Voor zakelijke aanvragen is een aparte flow gemaakt waarin batches kunnen worden besteld met variabele klantgegevens, direct gekoppeld aan een offerte-systeem.",
        image: "/projects/6.webp",
      },
      {
        heading: "Het resultaat",
        body:
          "Bestellingen worden nu in één doorlopend proces afgerond, zonder dat de support-inbox vol komt te zitten met design-vragen. De conversie van bezoek naar bestelling is bijna verdubbeld.",
        bodyExtra:
          "Future Cards kan nu opschalen zonder dat het team groter hoeft te worden. Iedere bestelling die binnenkomt is meteen productie-klaar.",
      },
    ],
    related: ["smokey-joes", "negentigtien"],
  },
  {
    slug: "negentigtien",
    name: "Negentigtien",
    type: "Merk",
    excerpt: "Merkwebsite met een uitgesproken eigen stijl.",
    intro:
      "Negentigtien is een merk dat opvalt door zijn directe toon en uitgesproken visuele taal. De site moest daar volledig op aansluiten, zonder de aandacht weg te trekken van de boodschap.",
    image: "/projects/4.webp",
    tags: ["Merk", "Editorial"],
    client: "Negentigtien",
    year: "2024",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Een merksite die net zo aanwezig is als de campagnes op straat, maar tegelijk leesbaar en gestructureerd voor potentiële klanten.",
        bodyExtra:
          "Daarbij was er een tweede vraag: de site moest het redactionele werk van Negentigtien dragen, met ruimte voor lange artikelen en interviews naast de zakelijke informatie.",
        image: "/projects/4.webp",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben de site editorial opgezet met grote typografische statements en ruime fotografie, gecombineerd met een rustige onderlaag aan informatie en case studies. De huisstijl is doorgetrokken tot in de microcopy.",
        bodyExtra:
          "Voor de redactie is een eenvoudige flow opgezet waarin artikelen, beeld en interviews vanaf één plek worden beheerd, met previews die direct laten zien hoe het op de site oogt.",
        image: "/projects/7.webp",
      },
      {
        heading: "Het resultaat",
        body:
          "De site wordt regelmatig genoemd in de pers en op vakblogs, en de aanvragen voor samenwerkingen zijn sinds livegang met ruim 80% toegenomen.",
        bodyExtra:
          "Het team van Negentigtien noemt de site inmiddels hun belangrijkste verkoopkanaal voor nieuwe partnerships, vóór social en evenementen.",
      },
    ],
    related: ["smokey-joes", "future-cards"],
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
