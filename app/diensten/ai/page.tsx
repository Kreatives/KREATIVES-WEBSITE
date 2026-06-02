import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import FunnelHero from "@/components/funnel/FunnelHero";
import WelNiet from "@/components/funnel/WelNiet";
import IconCards from "@/components/funnel/IconCards";
import Recognition from "@/components/funnel/Recognition";
import ClosingCta from "@/components/funnel/ClosingCta";
import { aiFunnel } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI",
  description:
    "AI als werktool binnen een doordacht proces. Snellere oplevering, slimmere mogelijkheden en lagere kosten, zonder in te leveren op vakmanschap.",
  alternates: { canonical: "/diensten/ai" },
  openGraph: {
    title: "AI — KREATIVES",
    description:
      "AI maakt ons sneller, niet onnadenkender. Visuals, widgets en automatisering voor jouw merk.",
    url: "/diensten/ai",
  },
};

export default function AiPage() {
  return (
    <>
      <RevealInit />
      <FunnelHero data={aiFunnel.hero} />
      <WelNiet data={aiFunnel.welNiet} />
      <IconCards data={aiFunnel.toepassingen} variant="cosmos" />
      <Recognition data={aiFunnel.positionering} />
      <ClosingCta data={aiFunnel.closing} />
    </>
  );
}
