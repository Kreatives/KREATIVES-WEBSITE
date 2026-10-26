import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Button from "@/components/Button";
import FaqList from "@/components/funnel/FaqList";
import ClosingCta from "@/components/funnel/ClosingCta";
import { CALENDLY, site } from "@/lib/site";
import styles from "./prijzen.module.css";

export const metadata: Metadata = {
  title: "Prijzen: drie trajecten, vaste prijs",
  description:
    "Drie trajecten met een vaste prijs: Landing (€2.499), Herbouw (€4.995) en Signatuur (€9.945). Je ziet het ontwerp voordat er gebouwd wordt, en per traject staat erbij wat er niet in zit.",
  alternates: { canonical: "/prijzen" },
  openGraph: {
    title: "Prijzen — KREATIVES",
    description:
      "Drie trajecten, vaste prijzen, en per traject staat erbij wat er niet in zit.",
    url: "/prijzen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen — KREATIVES",
    description:
      "Drie trajecten, vaste prijzen, en per traject staat erbij wat er niet in zit.",
  },
};

type Plan = {
  no: string;
  name: string;
  price: string;
  priceNumber: string;
  tag?: string;
  featured?: boolean;
  intro: string;
  pitch: string;
  krijgt: string[];
  niet: string[];
  doorlooptijd: string;
};

const plans: Plan[] = [
  {
    no: "01",
    name: "Landing",
    price: "€2.499",
    priceNumber: "2499",
    intro:
      "Voor bedrijven die al adverteren, via een eigen marketingverantwoordelijke of een bureau, en merken dat de pagina waar de klik landt de campagne afremt.",
    pitch:
      "Eén pagina die het gesprek voorbereidt. Je bureau draait de campagne, wij maken de plek waar die landt.",
    krijgt: [
      "Gesprek over de campagne, het aanbod en wie er op de pagina komt",
      "Copy geschreven door ons, jij levert cijfers en namen",
      "Ontwerp in twee rondes, goedgekeurd voordat we bouwen",
      "Bouw, formulier en meting op jouw eigen GA4",
      "Briefing voor het bureau dat de campagne draait",
      "Eén aanpassing na de eerste dertig dagen op basis van de cijfers",
    ],
    niet: [
      "De campagne zelf en het advertentiebudget",
      "Meerdere varianten om te testen",
      "Pagina's buiten de campagne",
    ],
    doorlooptijd: "Twee weken na akkoord op de copy.",
  },
  {
    no: "02",
    name: "Herbouw",
    price: "€4.995",
    priceNumber: "4995",
    tag: "Meest gekozen",
    featured: true,
    intro:
      "Voor bedrijven die de afgelopen jaren hard zijn gegroeid en waarvan de website nog laat zien waar ze vier jaar geleden stonden.",
    pitch:
      "Tot tien pagina's in vier weken, en je ziet het ontwerp voordat er één regel code wordt geschreven.",
    krijgt: [
      "Strategiegesprek met de eigenaar: wie je dient, wie je weigert en welke drie claims je kunt bewijzen",
      "Boodschap en volgorde per pagina, zodat de site het salesgesprek alvast begint",
      "Copy geschreven door ons voor alle pagina's, jij levert cases, cijfers en namen via een lijst die je op dag één krijgt",
      "Tot tien pagina's: home, diensten, cases, team, over ons, contact en wat jouw bedrijf verder nodig heeft",
      "Ontwerp in drie rondes, goedgekeurd voordat de bouw start",
      "Bouw, SEO-basis, GA4 en Search Console op jouw naam",
      "Fotobriefing en regie, zodat je niet met losse beelden blijft zitten",
      "Drie maanden beheer inbegrepen",
      "24 maanden herstelgarantie op de techniek",
    ],
    niet: [
      "Fotografie, wel de briefing en de regie",
      "Advertenties, SEO-strategie en doorlopende content",
      "Meer dan tien pagina's",
    ],
    doorlooptijd: "Vier weken na akkoord op de copy.",
  },
  {
    no: "03",
    name: "Signatuur",
    price: "€9.945",
    priceNumber: "9945",
    intro:
      "Voor bedrijven waarbij niet alleen de site, maar ook het logo en de uitstraling achterlopen op het niveau van het werk.",
    pitch:
      "Alles uit Herbouw, plus een merk dat klopt met waar je nu staat. Twaalf pagina's in zes weken, met een fotodag op locatie.",
    krijgt: [
      "Alles uit Herbouw",
      "Logo verfijnen of een nieuw beeldmerk",
      "Typografie, kleursysteem en beeldtaal",
      "Tone of voice: hoe je bedrijf schrijft en praat, op één pagina",
      "Merkhandleiding van acht pagina's, zodat ook je team en je bureau het kunnen toepassen",
      "LinkedIn-sjablonen: banner, profielopmaak en drie postformats",
      "Fotodag op locatie, inclusief fotograaf, voor team, werk en portretten",
      "Tot twaalf pagina's",
    ],
    niet: [
      "Een nieuwe bedrijfsnaam",
      "Campagnemateriaal, print en verpakking",
      "Doorlopend merkbeheer",
    ],
    doorlooptijd: "Zes weken na akkoord op de copy.",
  },
];

const garanties = [
  {
    title: "Je ziet het ontwerp voordat er gebouwd wordt.",
    body: "Drie rondes, en je geeft pas akkoord als het klopt. Keur je na de derde ronde nog af, dan betaal je alleen het strategiedeel van €2.000 en houd je alles wat we tot dan toe hebben gemaakt. De bouw gaat dan niet door en je zit nergens aan vast.",
    voorwaarde:
      "Voorwaarde: het strategiegesprek is geweest en de boodschap per pagina ligt vast voordat we ontwerpen.",
  },
  {
    title: "Vier weken, gerekend vanaf akkoord op de copy.",
    body: "Loopt het door onze schuld uit, dan gaat er €250 per week van de prijs af, tot maximaal €1.000. De klok stopt als wij op jou wachten. Daarom krijg je op dag één een lijst met precies wat we van je nodig hebben, en briefen wij de fotograaf.",
    voorwaarde:
      "Voorwaarde: cases, cijfers en namen zijn binnen vijf werkdagen na de start compleet.",
  },
];

const alleTrajecten = [
  "Domein, hosting en CMS staan op jouw naam. Je zit nooit vast aan ons voor de techniek.",
  "Je werkt rechtstreeks met de mensen die je site maken, van het eerste gesprek tot de livegang.",
  "Alle bedragen zijn exclusief 21% btw.",
];

const faq = {
  eyebrow: "Veelgestelde vragen",
  title: "Voordat je een gesprek plant",
  items: [
    {
      q: "Waarom €4.995 en niet €1.250?",
      a: "Bij €1.250 krijg je drie tot vijf pagina's in je bestaande huisstijl, zonder tekst en zonder iemand die meedenkt over de volgorde. Bij €4.995 zit de boodschap per pagina erin, de copy, het ontwerp, de bouw, de meting en drie maanden beheer. Dat is het verschil tussen een site die er staat en een site die het gesprek voor je doet.",
    },
    {
      q: "Kan ik in termijnen betalen?",
      a: "Ja. De helft bij de start, de helft bij oplevering. Bij Signatuur in drie termijnen: 40% bij de start, 30% bij ontwerpakkoord, 30% na livegang. Landing betaal je vooraf.",
    },
    {
      q: "Wat als het meer werk blijkt dan gedacht?",
      a: "Dan lossen wij dat op en de prijs staat vast. Wil je onderweg iets toevoegen dat buiten de scope valt, dan krijg je daar vooraf een bedrag voor en beslis je zelf.",
    },
    {
      q: "We hebben net een nieuwe site. Heeft dit dan zin?",
      a: "Dan kijken we eerst wat er staat. Soms is de structuur en de boodschap aanpassen genoeg en hoef je niet opnieuw te bouwen. Dat zeggen we je eerlijk in het strategiegesprek, ook als het betekent dat je niets bij ons afneemt.",
    },
    {
      q: "Ons marketingbureau doet de campagnes. Hoe werkt dat samen?",
      a: "Prima. Zij doen de campagne, wij de pagina's waar de klik landt. Bij Landing krijgt je bureau een briefing van ons, zodat de boodschap in de advertentie en op de pagina hetzelfde is.",
    },
  ],
};

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 8.5 3.2 3 6.8-7" />
    </svg>
  );
}

function Minus() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M3.5 8h9" />
    </svg>
  );
}

export default function PrijzenPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.domain}/prijzen#service`,
    serviceType: "Webdesign en websiteontwikkeling",
    name: "Webdesign-trajecten",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${site.domain}/#organization`,
      name: "KREATIVES",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Webdesign-trajecten",
      itemListElement: plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.priceNumber,
        priceCurrency: "EUR",
        url: `${site.domain}/prijzen`,
        itemOffered: { "@type": "Service", name: `Webdesign ${p.name}` },
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Prijzen",
        item: `${site.domain}/prijzen`,
      },
    ],
  };

  return (
    <>
      <RevealInit />
      {[serviceLd, faqLd, breadcrumbLd].map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}

      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="eyebrow" data-reveal>
              Prijzen
            </span>
            <h1 className={styles.heroTitle} data-reveal>
              Je bedrijf is verder dan je{" "}
              <span className="accent accent--orange">website laat zien.</span>
            </h1>
            <p className={styles.heroLead} data-reveal>
              Drie trajecten, vaste prijzen, en per traject staat erbij wat er
              niet in zit. Zo weet je vooraf waar je aan toe bent en hoef je niet
              te onderhandelen over de scope.
            </p>
            <div className={styles.heroCta} data-reveal>
              <Button href={CALENDLY} variant="white">
                Plan een strategiegesprek
              </Button>
              <span className={styles.heroMicro}>
                Dertig minuten, en je weet welk traject bij je situatie past.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.plansSec}`}>
        <div className="container">
          <div className={styles.plansHead}>
            <h2 className={`h2 ${styles.plansTitle}`} data-reveal>
              Wat het kost, en wat je{" "}
              <span className="accent accent--orange">ervoor krijgt.</span>
            </h2>
          </div>

          <div className={styles.grid}>
            {plans.map((p) => (
              <article
                key={p.name}
                className={`${styles.card} ${
                  p.featured ? styles.cardFeatured : ""
                }`}
                data-reveal
              >
                <div className={styles.cardHead}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.cardNo}>
                      {p.no} · {p.name}
                    </span>
                    {p.tag && <span className={styles.cardTag}>{p.tag}</span>}
                  </div>
                  <p className={styles.cardPrice}>
                    {p.price} <span className={styles.cardPriceUnit}>eenmalig</span>
                  </p>
                  <p className={styles.cardIntro}>{p.intro}</p>
                  <p className={styles.cardPitch}>{p.pitch}</p>
                </div>

                <Button
                  href={CALENDLY}
                  variant={p.featured ? "white" : "dark"}
                  className={styles.cardCta}
                >
                  Plan een gesprek
                </Button>

                <div className={styles.block}>
                  <p className={styles.blockLabel}>Wat je krijgt</p>
                  <ul className={styles.listKrijgt}>
                    {p.krijgt.map((f) => (
                      <li key={f}>
                        <span className={styles.tick} aria-hidden>
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.block}>
                  <p className={styles.blockLabel}>Wat er niet in zit</p>
                  <ul className={styles.listNiet}>
                    {p.niet.map((f) => (
                      <li key={f}>
                        <span className={styles.cross} aria-hidden>
                          <Minus />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={styles.doorlooptijd}>
                  Doorlooptijd: {p.doorlooptijd}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section--alt ${styles.garantieSec}`}>
        <div className="container">
          <div className={styles.garantieHead}>
            <span className="eyebrow" data-reveal>
              De twee garanties
            </span>
          </div>
          <div className={styles.garantieGrid}>
            {garanties.map((g) => (
              <article key={g.title} className={styles.garantieCard} data-reveal>
                <h3 className={styles.garantieTitle}>{g.title}</h3>
                <p className={styles.garantieBody}>{g.body}</p>
                <p className={styles.garantieVoorwaarde}>{g.voorwaarde}</p>
              </article>
            ))}
          </div>
          <p className={styles.geenBelofte} data-reveal>
            Wat we bewust niet beloven: omzet. De site is één variabele; wat je
            met de bezoekers doet bepaalt of het werkt. Daarom staat de meting op
            jouw eigen accounts, zodat je na dertig dagen zelf ziet wat er
            gebeurt.
          </p>

          <div className={styles.trajectenBox} data-reveal>
            <p className={styles.blockLabel}>Bij alle trajecten</p>
            <ul className={styles.listKrijgt}>
              {alleTrajecten.map((t) => (
                <li key={t}>
                  <span className={styles.tick} aria-hidden>
                    <Check />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqList data={faq} />

      <ClosingCta
        data={{
          title: "Welk traject past bij jou?",
          accent: "bij jou?",
          body: "Plan een gesprek van dertig minuten. We kijken samen naar waar je nu staat en welk traject dat oplost. Geen offerte, geen verplichtingen.",
          cta: { label: "Plan een strategiegesprek", href: CALENDLY },
        }}
      />
    </>
  );
}
