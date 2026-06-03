import RevealInit from "@/components/RevealInit";
import Hero from "@/components/sections/Hero";
import Probleem from "@/components/sections/Probleem";
import USPs from "@/components/sections/USPs";
import Werkwijze from "@/components/sections/Werkwijze";
import OverMij from "@/components/sections/OverMij";
import Pricing from "@/components/sections/Pricing";
import ClosingCta from "@/components/sections/ClosingCta";

/**
 * De KREATIVES-homepage. Opbouw volgt de copy-brief (7 secties):
 * 01 Hero → 02 Probleem → 03 Waarom ons → 04 Aanpak →
 * 05 Over ons → 06 Prijzen → 07 Sluit-CTA.
 *
 * Cases en reviews staan nu op hun eigen pagina's (/projecten, /reviews),
 * bereikbaar via de hero-CTA en het menu. De componenten Cases, Reviews en
 * ProjectMarquee blijven in de codebase voor als ze terug op de homepage
 * moeten.
 */
export default function HomeContent() {
  return (
    <>
      <RevealInit />
      <Hero />
      <Probleem />
      <USPs />
      <Werkwijze />
      <OverMij />
      <Pricing />
      <ClosingCta />
    </>
  );
}
