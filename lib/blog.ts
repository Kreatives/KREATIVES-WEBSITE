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
    tags: ["Werkwijze", "Prijzen"],
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
    tags: ["Strategie", "Redesign"],
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
