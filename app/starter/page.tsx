import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Button from "@/components/Button";
import { helvetica } from "@/lib/fonts";
import { CALENDLY, site, OG_IMAGE } from "@/lib/site";
import { packages, upsells, WHATS_NEXT } from "./data";
import DeliveryBar from "./DeliveryBar";
import StartersHero from "./StartersHero";
import EigenKapitaal from "./EigenKapitaal";
import Vergelijking from "./Vergelijking";
import VoorNa from "./VoorNa";
import FigmaBewijs from "./FigmaBewijs";
import Pakketten from "./Pakketten";
import Proces from "./Proces";
import Garantie from "./Garantie";
import OverMij from "./OverMij";
import StartersFaq from "./StartersFaq";
import ExitBlok from "./ExitBlok";
import StickyDock from "./StickyDock";
import IntakeForm from "./IntakeForm";
import styles from "./starters.module.css";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Een website vanaf €695, binnen 5 werkdagen",
  description:
    "Een website die je serieus neemt. Ontworpen en gebouwd in Figma, eerste ontwerp binnen 5 werkdagen, vanaf €695. In twee termijnen te betalen en alles komt op jouw naam te staan.",
  alternates: { canonical: "/starter" },
  openGraph: {
    title: "Een website vanaf €695 | KREATIVES",
    description:
      "Ontworpen en gebouwd in Figma. Eerste ontwerp binnen 5 werkdagen, alles komt op jouw naam te staan.",
    url: "/starter",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Een website vanaf €695 | KREATIVES",
    description:
      "Ontworpen en gebouwd in Figma. Eerste ontwerp binnen 5 werkdagen.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/** Eerstvolgende werkdag vanaf vandaag. */
function volgendeWerkdag(from: Date): Date {
  const d = new Date(from);
  do {
    d.setDate(d.getDate() + 1);
  } while (d.getDay() === 0 || d.getDay() === 6);
  return d;
}

/** Werkdag `n` werkdagen verder, zodat de belofte geen weekend telt. */
function werkdagenVerder(from: Date, n: number): Date {
  const d = new Date(from);
  let left = n;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) left -= 1;
  }
  return d;
}

function datum(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

type SearchParams = Promise<{ pakket?: string }>;

export default async function StartersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { pakket } = await searchParams;
  const nu = new Date();
  const startDatum = volgendeWerkdag(nu);
  const eersteOntwerp = datum(werkdagenVerder(nu, 5));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.domain}/starter#service`,
    serviceType: "Webdesign en websiteontwikkeling",
    name: "Starterspakketten",
    description:
      "Productiepakketten voor een website: ontwerp in Figma, bouw in WordPress en volledige overdracht.",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${site.domain}/#organization`,
      name: "KREATIVES",
    },
    areaServed: { "@type": "Country", name: "Nederland" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Starterspakketten",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.priceNumber,
        priceCurrency: "EUR",
        url: `${site.domain}/starter#pakketten`,
        itemOffered: { "@type": "Service", name: `Website pakket ${p.name}` },
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WHATS_NEXT.map((f) => ({
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
        name: "Starterspakketten",
        item: `${site.domain}/starter`,
      },
    ],
  };

  return (
    <div className={`${helvetica.variable} ${styles.page}`}>
      <RevealInit />
      {[serviceLd, faqLd, breadcrumbLd].map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}

      <DeliveryBar startDatum={startDatum} eersteOntwerp={eersteOntwerp} />

      <StartersHero eersteOntwerp={eersteOntwerp} />

      <EigenKapitaal />

      <Vergelijking />

      <VoorNa />

      <FigmaBewijs />

      <Pakketten upsells={upsells} />

      <Proces />

      <Garantie />

      <section className={`section ${styles.aanvraagSec}`} id="aanvraag">
        <div className="container">
          <div className={styles.aanvraagGrid}>
            <div className={styles.aanvraagHead} data-reveal>
              <span className="eyebrow">Aanvragen</span>
              <h2 className={`h2 ${styles.aanvraagTitle}`}>
                Vertel over je zaak,{" "}
                <span className="accent accent--orange">dan begin ik.</span>
              </h2>
              <p className={styles.aanvraagBody}>
                Dit formulier is de intake. Hoe concreter je invult wat je doet
                en voor wie, hoe sneller het eerste ontwerp er ligt. Je hoort
                binnen één werkdag of je pakket past, met de betaallink erbij.
              </p>
              <ul className={styles.aanvraagList}>
                <li>Je zit nergens aan vast voordat je betaalt.</li>
                <li>KvK-nummer nodig, je bestelt zakelijk.</li>
                <li>Liever eerst even appen? Dat mag.</li>
              </ul>
              <Button href={CALENDLY} variant="ghost" className={styles.aanvraagCall}>
                Plan toch een gesprek
              </Button>
            </div>
            <IntakeForm defaultPackage={pakket} />
          </div>
        </div>
      </section>

      <OverMij />

      <StartersFaq />

      <ExitBlok />

      <StickyDock />
    </div>
  );
}
