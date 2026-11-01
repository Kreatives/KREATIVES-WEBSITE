import type { Metadata } from "next";
import Image from "next/image";
import RevealInit from "@/components/RevealInit";
import Button from "@/components/Button";
import FaqList from "@/components/funnel/FaqList";
import ClosingCta from "@/components/funnel/ClosingCta";
import { CALENDLY, site, OG_IMAGE } from "@/lib/site";
import { helvetica } from "@/lib/fonts";
import PlanCards from "./PlanCards";
import styles from "./prijzen.module.css";

export const metadata: Metadata = {
  title: "Prijzen: drie trajecten, vaste prijs",
  description:
    "Drie trajecten met een vaste prijs: Landing (€1.499), Herbouw (€3.995) en Signatuur (€8.945). Je ziet het ontwerp voordat er gebouwd wordt.",
  alternates: { canonical: "/prijzen" },
  openGraph: {
    title: "Prijzen | KREATIVES",
    description:
      "Drie trajecten met een vaste prijs, en per traject zie je precies wat erin zit.",
    url: "/prijzen",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen | KREATIVES",
    description:
      "Drie trajecten met een vaste prijs, en per traject zie je precies wat erin zit.",
    images: [OG_IMAGE],
  },
};

type Plan = {
  no: string;
  name: string;
  icon: string;
  price: string;
  priceNumber: string;
  featured?: boolean;
  intro: string;
  krijgt: string[];
  termijnen: string;
  doorlooptijd: string;
};

const plans: Plan[] = [
  {
    no: "01",
    name: "Landing",
    icon: "/icons/prijzen/landing.png",
    price: "€1.499",
    priceNumber: "1499",
    intro:
      "Voor bedrijven die al adverteren, via een eigen marketingverantwoordelijke of een bureau, en merken dat de pagina waar de klik landt de campagne afremt.",
    krijgt: [
      "Marketing & brand deepdive",
      "Figma-bestand",
      "Copywriting",
      "2 feedbackrondes",
      "Koppeling met analytics (GA4, pixels)",
      "Revisieronde na 30 dagen",
      "Web development in WordPress",
      "Website training",
    ],
    termijnen: "Start al vanaf €750",
    doorlooptijd: "twee weken na akkoord op de copy",
  },
  {
    no: "02",
    name: "Herbouw",
    icon: "/icons/prijzen/herbouw.png",
    price: "€3.995",
    priceNumber: "3995",
    featured: true,
    intro:
      "Voor bedrijven die de afgelopen jaren hard zijn gegroeid en waarvan de website nog laat zien waar ze vier jaar geleden stonden.",
    krijgt: [
      "Marketing & brand deepdive",
      "Strategische wireframing",
      "Copywriting",
      "Tot 10 pagina's",
      "3 feedbackrondes",
      "SEO-basis",
      "Koppeling met analytics (GA4, pixels)",
      "Design system",
      "Eerste jaar hosting & onderhoud inbegrepen",
      "Revisieronde na 30 dagen",
      "24 maanden herstelgarantie",
      "Web development in WordPress",
      "Website training",
    ],
    termijnen: "Start al vanaf €1.332",
    doorlooptijd: "vier weken na akkoord op de copy",
  },
  {
    no: "03",
    name: "Signatuur",
    icon: "/icons/prijzen/signatuur.png",
    price: "€8.945",
    priceNumber: "8945",
    intro:
      "Voor bedrijven waarbij niet alleen de site, maar ook het logo en de uitstraling achterlopen op het niveau van het werk.",
    krijgt: [
      "Alles uit Herbouw",
      "Volledig brandbook",
      "LinkedIn-sjablonen: banner, profielopmaak en drie postformats",
      "Fotodag op locatie, inclusief fotograaf, voor team, werk en portretten",
      "Tot 15 pagina's",
      "Web development in WordPress",
      "Website training",
    ],
    termijnen: "Start al vanaf €2.982",
    doorlooptijd: "zes weken na akkoord op de copy",
  },
];

const garanties = [
  {
    title: "Tevreden over wat er online komt.",
    icon: "/icons/prijzen/garantie-design.png",
    body: "Drie rondes, en je geeft pas akkoord als het klopt. Keur je na de derde ronde nog af, dan betaal je alleen het strategiedeel van €2.000 en houd je alles wat we tot dan toe hebben gemaakt. De bouw gaat dan niet door en je zit nergens aan vast.",
  },
  {
    title: "Zekerheid over wanneer je online gaat.",
    icon: "/icons/prijzen/garantie-deadline.png",
    body: "De klok start bij akkoord op de copy. Loopt het door onze schuld uit, dan gaat er €250 per week van de prijs af, tot maximaal €1.000. De klok stopt als wij op jou wachten. Daarom krijg je op dag één een lijst met precies wat we van je nodig hebben, en briefen wij de fotograaf.",
  },
];

const alleTrajecten = [
  "Domein, hosting en CMS staan op jouw naam.",
  "Je werkt rechtstreeks met de mensen die je site maken.",
  "Alle bedragen zijn exclusief 21% btw.",
];

const faq = {
  eyebrow: "Veelgestelde vragen",
  title: "Voordat je een gesprek plant",
  items: [
    {
      q: "Waarom €3.995 en niet €1.250?",
      a: "Bij €1.250 krijg je drie tot vijf pagina's in je bestaande huisstijl, zonder tekst en zonder iemand die meedenkt over de volgorde. Bij €3.995 zit de boodschap per pagina erin, de copy, het ontwerp, de bouw, de meting en het eerste jaar hosting en onderhoud. Dat is het verschil tussen een site die er staat en een site die het gesprek voor je doet.",
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
      a: "Prima. Zij doen de campagne, wij de pagina's waar de klik landt. Bij Landing krijgt jouw bureau een briefing van ons, zodat de boodschap in de advertentie en op de pagina hetzelfde is.",
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
    <div className={helvetica.variable}>
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
              De prijs staat vast,{" "}
              <span className="accent accent--orange">voordat we beginnen.</span>
            </h1>
            <p className={styles.heroLead} data-reveal>
              Drie trajecten met een vaste prijs. Per traject zie je precies wat
              erin zit, zodat je vooraf weet waar je aan toe bent en niet hoeft te
              onderhandelen over de scope.
            </p>
            <div className={styles.heroCta} data-reveal>
              <Button href={CALENDLY} variant="white">
                Plan een strategiegesprek
              </Button>
              <a href="/prijs-berekenen" className={styles.heroCalcLink}>
                Of bereken zelf een indicatie
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.plansSec}`}>
        <div className="container">
          <div className={styles.plansHead}>
            <span className="eyebrow" data-reveal>
              Onze pakketten
            </span>
            <h2 className={`h2 ${styles.plansTitle}`} data-reveal>
              Wat het kost, en wat je{" "}
              <span className="accent accent--orange">ervoor krijgt.</span>
            </h2>
          </div>

          <PlanCards plans={plans} calendly={CALENDLY} />

          <div className={styles.trajecten} data-reveal>
            <p className={styles.trajectenLabel}>Bij alle trajecten</p>
            <ul className={styles.trajectenList}>
              {alleTrajecten.map((t) => (
                <li key={t}>
                  <span className={styles.tickOrange} aria-hidden>
                    <Check />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--dark cosmos-bg">
        <div className="container">
          <div className={styles.garantieHead}>
            <h2 className={`h2 ${styles.garantieHeading}`} data-reveal>
              <span className="accent accent--orange">100%</span> tevredenheids-
              en deadline-garantie
            </h2>
          </div>
          <div className={styles.garantieGrid}>
            {garanties.map((g) => (
              <article key={g.title} className={styles.garantieCard} data-reveal>
                <Image
                  src={g.icon}
                  alt=""
                  width={48}
                  height={48}
                  className={styles.garantieIcon}
                />
                <h3 className={styles.garantieTitle}>{g.title}</h3>
                <p className={styles.garantieBody}>{g.body}</p>
              </article>
            ))}
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
    </div>
  );
}
