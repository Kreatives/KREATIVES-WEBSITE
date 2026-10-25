import RevealInit from "@/components/RevealInit";
import PostContent, { splitPostBlocks, stripInline } from "@/components/PostContent";
import PostFaq from "@/components/PostFaq";
import { getStad } from "@/lib/steden";
import { site } from "@/lib/site";
import styles from "./stad.module.css";

const FAQ_ID = "veelgestelde-vragen";

/**
 * Deelt de renderlogica voor alle /webdesign-[stad]-pagina's. De copy komt uit
 * lib/steden.ts (ongewijzigd), de FAQ en het schema worden hier opgebouwd.
 */
export default function StadPage({ slug }: { slug: string }) {
  const stad = getStad(slug);
  if (!stad) return null;

  const { mainBlocks, faqItems, afterBlocks } = splitPostBlocks(stad.body);
  const url = `${site.domain}/${stad.slug}`;

  // Service — de dienst in deze stad (sjabloon uit schema/service-city.json).
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: "Webdesign en websiteontwikkeling",
    name: `Webdesign ${stad.city}`,
    description: `Webdesign voor gevestigde bedrijven met 5 tot 10 medewerkers in ${stad.city} waarvan de website niet is meegegroeid met het bedrijf.`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${site.domain}/#organization`,
      name: "KREATIVES",
    },
    areaServed: {
      "@type": "City",
      name: stad.city,
      containedInPlace: { "@type": "AdministrativeArea", name: "Nederland" },
    },
    audience: {
      "@type": "BusinessAudience",
      name: "Gevestigde bedrijven met 5 tot 10 medewerkers",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "2500",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "2500",
        maxPrice: "4500",
        priceCurrency: "EUR",
      },
      availability: "https://schema.org/InStock",
      url,
    },
  };

  // ProfessionalService met areaServed + geo voor déze stad, en de
  // aggregateRating die als tekst ("5,0 uit 22 Google-reviews") op de pagina staat.
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.domain}/#organization`,
    name: "KREATIVES",
    url: site.domain,
    telephone: "+31613066250",
    email: site.email,
    priceRange: "€2500 - €4500",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arnhem",
      addressRegion: "Gelderland",
      addressCountry: "NL",
    },
    areaServed: { "@type": "City", name: stad.city },
    geo: {
      "@type": "GeoCoordinates",
      latitude: stad.geo.lat,
      longitude: stad.geo.lon,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "22",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: stripInline(f.answer) },
          })),
        }
      : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Webdesign",
        item: `${site.domain}/diensten/webdesign`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Webdesign ${stad.city}`,
        item: url,
      },
    ],
  };

  const blobs = [serviceLd, orgLd, faqLd, breadcrumbLd].filter(Boolean);

  return (
    <>
      <RevealInit />
      {blobs.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}

      <article>
        <section className={`section--dark cosmos-bg ${styles.hero}`}>
          <div className="container">
            <span className="eyebrow" data-reveal>
              Webdesign {stad.city}
            </span>
            <h1 className={styles.title} data-reveal>
              {stad.h1}
            </h1>
          </div>
        </section>

        <section className={`section ${styles.bodySec}`}>
          <div className="container">
            <div className={styles.column}>
              <PostContent blocks={mainBlocks} />
              <PostFaq id={FAQ_ID} items={faqItems} />
              {afterBlocks.length > 0 && (
                <div className={styles.after}>
                  <PostContent blocks={afterBlocks} />
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
