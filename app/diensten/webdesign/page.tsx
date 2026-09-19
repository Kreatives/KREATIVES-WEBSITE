import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Webdesign",
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
      type: p.type,
      branche:
        p.tags.find((t) => t.toLowerCase() !== p.type.toLowerCase()) ??
        p.tags[0] ??
        "",
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
      <ClosingCta data={webdesignFunnel.closing} />
    </>
  );
}
