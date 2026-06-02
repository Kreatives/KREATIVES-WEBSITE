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
import { getFeaturedProjects, getFeaturedReviews, initialsOf } from "@/lib/cms";

/**
 * De volledige KREATIVES-homepage. Tijdelijk vervangen door de
 * "binnenkort live"-screen (zie app/page.tsx). Zet terug door in
 * app/page.tsx <HomeContent /> te renderen i.p.v. <ComingSoon />.
 */
export default async function HomeContent() {
  const [featuredProjects, featuredReviews] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedReviews(),
  ]);

  const cases = featuredProjects.map((p) => ({
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
  }));

  return (
    <>
      <RevealInit />
      <Hero />
      <ProjectMarquee />
      <Probleem />
      <USPs />
      <Werkwijze />
      <div className="cosmos-bg cosmos-wrap">
        <Cases items={cases} />
        <Reviews items={reviewItems} />
      </div>
      <OverMij />
      <Pricing />
    </>
  );
}
