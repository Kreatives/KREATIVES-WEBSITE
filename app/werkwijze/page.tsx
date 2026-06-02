import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import FunnelHero from "@/components/funnel/FunnelHero";
import Statement from "@/components/funnel/Statement";
import Steps from "@/components/funnel/Steps";
import StatsBlock from "@/components/funnel/StatsBlock";
import FounderWords from "@/components/funnel/FounderWords";
import FaqList from "@/components/funnel/FaqList";
import ClosingCta from "@/components/funnel/ClosingCta";
import { werkwijzePage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Werkwijze",
  description:
    "Van brief naar live, zonder verrassingen. Een heldere lijn in vijf stappen, met een vaste tijdlijn, één aanspreekpunt en revisierondes inbegrepen.",
  alternates: { canonical: "/werkwijze" },
  openGraph: {
    title: "Werkwijze — KREATIVES",
    description:
      "Een voorspelbaar traject van brief naar live, in vijf heldere stappen.",
    url: "/werkwijze",
  },
};

export default function WerkwijzePage() {
  return (
    <>
      <RevealInit />
      <FunnelHero data={werkwijzePage.hero} />
      <Statement data={werkwijzePage.statement} />
      <Steps data={werkwijzePage.steps} />
      <StatsBlock data={werkwijzePage.verwachten} />
      <FounderWords data={werkwijzePage.socialProof} />
      <FaqList data={werkwijzePage.faq} />
      <ClosingCta data={werkwijzePage.closing} />
    </>
  );
}
