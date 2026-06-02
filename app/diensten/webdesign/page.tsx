import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import FunnelHero from "@/components/funnel/FunnelHero";
import TwoTracks from "@/components/funnel/TwoTracks";
import PortfolioStrip from "@/components/funnel/PortfolioStrip";
import IconCards from "@/components/funnel/IconCards";
import FounderWords from "@/components/funnel/FounderWords";
import FaqList from "@/components/funnel/FaqList";
import ClosingCta from "@/components/funnel/ClosingCta";
import { webdesignFunnel } from "@/lib/site";

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

export default function WebdesignPage() {
  return (
    <>
      <RevealInit />
      <FunnelHero data={webdesignFunnel.hero} />
      <TwoTracks data={webdesignFunnel.tracks} />
      <PortfolioStrip data={webdesignFunnel.portfolio} />
      <IconCards data={webdesignFunnel.usps} variant="dark" />
      <FounderWords data={webdesignFunnel.socialProof} />
      <FaqList data={webdesignFunnel.faq} />
      <ClosingCta data={webdesignFunnel.closing} />
    </>
  );
}
