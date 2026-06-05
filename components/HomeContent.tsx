import RevealInit from "@/components/RevealInit";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Probleem from "@/components/sections/Probleem";
import USPs from "@/components/sections/USPs";
import Werkwijze from "@/components/sections/Werkwijze";
import Cases from "@/components/sections/Cases";
import Reviews from "@/components/sections/Reviews";
import OverMij from "@/components/sections/OverMij";
import Pricing from "@/components/sections/Pricing";
import ClosingCta from "@/components/sections/ClosingCta";
import { getFeaturedProjects, getFeaturedReviews, initialsOf } from "@/lib/cms";

/**
 * De KREATIVES-homepage. Hero → Probleem → Waarom ons → Aanpak →
 * Cases (CMS) → Reviews (CMS, 2 rijen marquee) → Over ons → Prijzen → Sluit-CTA.
 */
export default async function HomeContent() {
  const [featuredProjects, featuredReviews] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedReviews(),
  ]);

  const cases = featuredProjects.slice(0, 2).map((p) => ({
    slug: p.slug,
    name: p.name,
    excerpt: p.excerpt,
    image: p.image,
    tags: p.tags,
  }));

  const reviewItems = featuredReviews.map((r) => ({
    quote: r.quote,
    author: r.author,
    company: r.company,
    initials: initialsOf(r.author),
    color: r.color,
    photo: r.photo,
  }));

  return (
    <>
      <RevealInit />
      <Hero />
      <div className="mobile-only">
        <LogoMarquee label="Vertrouwd door 95+ bedrijven" />
      </div>
      <Probleem />
      <USPs />
      <Werkwijze />
      <div className="cosmos-bg cosmos-wrap">
        <Cases items={cases} />
        <Reviews items={reviewItems} />
      </div>
      <OverMij />
      <Pricing />
      <ClosingCta />
    </>
  );
}
