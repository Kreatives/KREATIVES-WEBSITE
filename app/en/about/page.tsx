import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import HeroOver from "@/components/sections/over/HeroOver";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Verhaal from "@/components/sections/over/Verhaal";
import Kernwaarden from "@/components/sections/over/Kernwaarden";
import OverOnsTeam from "@/components/sections/over/OverOnsTeam";
import VoorWie from "@/components/sections/over/VoorWie";
import Resultaten from "@/components/sections/over/Resultaten";
import ClosingCta from "@/components/funnel/ClosingCta";
import { aboutEn } from "@/lib/content-en";

export const metadata: Metadata = {
  title: "About us",
  description:
    "KREATIVES builds custom websites for brands and business owners ready for an online presence that matches where they stand. Our story and who we work for.",
  alternates: { canonical: "/en/about" },
  openGraph: {
    title: "About us — KREATIVES",
    description: "Our story, values and who we work for.",
    url: "/en/about",
  },
};

export default function EnAbout() {
  const a = aboutEn;
  return (
    <>
      <RevealInit />
      <HeroOver data={a.hero} />
      <LogoMarquee label={a.marqueeLabel} />
      <Verhaal data={a.verhaal} />
      <Kernwaarden data={a.kernwaarden} />
      <OverOnsTeam data={a.team} />
      <VoorWie data={a.voorWie} />
      <Resultaten data={a.resultaten} />
      <ClosingCta
        data={{
          title: `${a.closing.titleLead} ${a.closing.titleAccent}`,
          accent: a.closing.titleAccent,
          body: a.closing.body,
          cta: { label: a.closing.cta.label, href: a.closing.cta.href },
        }}
      />
    </>
  );
}
