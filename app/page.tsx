import RevealInit from "@/components/RevealInit";
import Hero from "@/components/sections/Hero";
import ProjectMarquee from "@/components/sections/ProjectMarquee";
import Probleem from "@/components/sections/Probleem";
import USPs from "@/components/sections/USPs";
import Werkwijze from "@/components/sections/Werkwijze";
import Cases from "@/components/sections/Cases";
import Reviews from "@/components/sections/Reviews";
import OverMij from "@/components/sections/OverMij";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <RevealInit />
      <Hero />
      <ProjectMarquee />
      <Probleem />
      <USPs />
      <Werkwijze />
      <div className="cosmos-bg cosmos-wrap">
        <Cases />
        <Reviews />
      </div>
      <OverMij />
      <Pricing />
    </>
  );
}
