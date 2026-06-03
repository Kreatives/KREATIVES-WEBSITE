import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import HeroOver from "@/components/sections/over/HeroOver";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Verhaal from "@/components/sections/over/Verhaal";
import Kernwaarden from "@/components/sections/over/Kernwaarden";
import OverOnsTeam from "@/components/sections/over/OverOnsTeam";
import VoorWie from "@/components/sections/over/VoorWie";
import Resultaten from "@/components/sections/over/Resultaten";
import StartProject from "@/components/sections/over/StartProject";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "KREATIVES bouwt maatwerk websites voor merken en ondernemers die toe zijn aan een online uitstraling die klopt met waar ze nu staan. Lees ons verhaal, onze kernwaarden, en voor wie we werken.",
  alternates: { canonical: "/over-ons" },
  openGraph: {
    title: "Over ons — KREATIVES",
    description:
      "Ons verhaal, kernwaarden en voor wie we werken. Maatwerk websites uit Nederland.",
    url: "/over-ons",
  },
};

export default function OverOnsPage() {
  return (
    <>
      <RevealInit />
      <HeroOver />
      <LogoMarquee label="Vertrouwd door 95+ bedrijven" />
      <Verhaal />
      <Kernwaarden />
      <OverOnsTeam />
      <VoorWie />
      <Resultaten />
      <StartProject />
    </>
  );
}
