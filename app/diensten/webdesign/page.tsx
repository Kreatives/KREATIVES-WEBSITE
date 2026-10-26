import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import FunnelHero from "@/components/funnel/FunnelHero";
import Recognition from "@/components/funnel/Recognition";
import TwoTracks from "@/components/funnel/TwoTracks";
import PortfolioStrip from "@/components/funnel/PortfolioStrip";
import IconCards from "@/components/funnel/IconCards";
import FounderWords from "@/components/funnel/FounderWords";
import FaqList from "@/components/funnel/FaqList";
import ClosingCta from "@/components/funnel/ClosingCta";
import { webdesignFunnel } from "@/lib/site";
import { getBigReviewItems, getFeaturedProjects } from "@/lib/cms";
import { steden } from "@/lib/steden";
import stedenStyles from "./steden.module.css";

export const metadata: Metadata = {
  title: "Webdesign laten maken voor bedrijven met een team",
  description:
    "Redesigns en landingspagina's voor ondernemers die meer willen dan een nette site. Maatwerk webdesign gebouwd op uitstraling én conversie.",
  alternates: { canonical: "/diensten/webdesign" },
  openGraph: {
    title: "Webdesign — KREATIVES",
    description:
      "Redesigns en landingspagina's gebouwd op uitstraling én conversie.",
    url: "/diensten/webdesign",
  },
};

export const dynamic = "force-dynamic";

export default async function WebdesignPage() {
  const [quoteItems, projects] = await Promise.all([
    getBigReviewItems(),
    getFeaturedProjects(),
  ]);
  const socialProof =
    quoteItems.length > 0
      ? { ...webdesignFunnel.socialProof, items: quoteItems }
      : webdesignFunnel.socialProof;

  // Portfolio-strip vullen vanuit het CMS i.p.v. de statische lijst.
  const portfolio = {
    ...webdesignFunnel.portfolio,
    items: projects.map((p) => ({
      name: p.name,
      tags: p.tags,
      image: p.image,
      href: `/projecten/${p.slug}`,
    })),
  };

  // FAQPage-schema → rich results en betere zichtbaarheid in AI-antwoorden.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: webdesignFunnel.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <RevealInit />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <FunnelHero data={webdesignFunnel.hero} />
      <Recognition data={webdesignFunnel.herkenning} />
      <TwoTracks data={webdesignFunnel.tracks} />
      <PortfolioStrip data={portfolio} />
      <IconCards data={webdesignFunnel.usps} variant="dark" />
      <FounderWords data={socialProof} />
      <FaqList data={webdesignFunnel.faq} />

      <section className={`section section--alt ${stedenStyles.sec}`}>
        <div className="container">
          <div className={stedenStyles.head}>
            <span className="eyebrow" data-reveal>
              Webdesign per stad
            </span>
            <h2 className="h2" data-reveal>
              Waar we{" "}
              <span className="accent accent--orange">bouwen.</span>
            </h2>
            <p className={`lead muted ${stedenStyles.intro}`} data-reveal>
              Vaste prijs, zes weken, en een site die past bij waar je bedrijf
              nu staat. Kies je stad voor de aanpak in jouw regio.
            </p>
          </div>
          <ul className={stedenStyles.grid}>
            {steden.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className={stedenStyles.cityLink}>
                  <span>{s.city}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={stedenStyles.scanLine} data-reveal>
            <Link href="/website-scan">Check eerst je eigen site</Link> in een
            paar minuten.
          </p>
        </div>
      </section>

      <ClosingCta data={webdesignFunnel.closing} />
    </>
  );
}
