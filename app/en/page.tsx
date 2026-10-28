import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Probleem from "@/components/sections/Probleem";
import Werkwijze from "@/components/sections/Werkwijze";
import Cases from "@/components/sections/Cases";
import Reviews from "@/components/sections/Reviews";
import Pricing from "@/components/sections/Pricing";
import ClosingCta from "@/components/sections/ClosingCta";
import { getFeaturedProjects, initialsOf } from "@/lib/cms";
import { site } from "@/lib/site";
import {
  heroEn,
  marqueeEn,
  probleemEn,
  uspsEn,
  werkwijzeEn,
  casesEn,
  reviewsMetaEn,
  reviewsPageEn,
  pricingEn,
  closingCtaEn,
  projectLinesEn,
} from "@/lib/content-en";

export const metadata: Metadata = {
  title: "Web design & branding from Arnhem | KREATIVES",
  description:
    "Custom websites for businesses whose online presence no longer matches their growth. 100+ sites built, live within six weeks. Book a strategy call.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "KREATIVES — custom websites that win you clients",
    description:
      "Custom websites for businesses whose online presence no longer matches their growth.",
    url: "/en",
  },
};

export const dynamic = "force-dynamic";

export default async function EnHome() {
  const featured = await getFeaturedProjects();

  const caseItems = featured.slice(0, 4).map((p) => ({
    slug: p.slug,
    name: p.name,
    excerpt: projectLinesEn[p.slug] ?? p.excerpt,
    image: p.image,
    tags: p.tags,
  }));

  const reviewItems = reviewsPageEn.items.map((r) => ({
    quote: r.quote,
    author: r.author,
    company: r.company,
    initials: initialsOf(r.author),
    color: r.color,
    photo: r.photo ?? undefined,
  }));

  return (
    <>
      <RevealInit />
      <div className="hero-stack">
        <Hero data={heroEn} />
        <LogoMarquee label={marqueeEn.label} />
      </div>
      <Probleem data={probleemEn} usps={uspsEn} />
      <Werkwijze data={werkwijzeEn} />
      <div className="cosmos-bg cosmos-wrap">
        <Cases
          items={caseItems}
          meta={casesEn}
          allHref={casesEn.allHref}
          allLabel={casesEn.allLabel}
        />
        <Reviews items={reviewItems} meta={reviewsMetaEn} />
      </div>
      <Pricing data={pricingEn} />
      <ClosingCta data={closingCtaEn} locale="en" />
      <SiteJsonLd />
    </>
  );
}

function SiteJsonLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.domain}/en#webpage`,
    url: `${site.domain}/en`,
    name: "KREATIVES — custom websites",
    inLanguage: "en",
    isPartOf: { "@id": `${site.domain}/#organization` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
