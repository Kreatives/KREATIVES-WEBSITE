import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Cases from "@/components/sections/Cases";
import { getProjects } from "@/lib/cms";
import { CALENDLY } from "@/lib/site";
import { casesEn, projectLinesEn } from "@/lib/content-en";
import styles from "../en.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of custom websites, shops and branding we built for brands across the Netherlands.",
  alternates: { canonical: "/en/projects" },
  openGraph: {
    title: "Projects — KREATIVES",
    description: "Custom websites, shops and branding for ambitious brands.",
    url: "/en/projects",
  },
};

export const dynamic = "force-dynamic";

export default async function EnProjects() {
  const projects = await getProjects();
  const items = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    excerpt: projectLinesEn[p.slug] ?? p.excerpt,
    image: p.image,
    tags: p.tags,
  }));

  return (
    <>
      <RevealInit />
      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="eyebrow" data-reveal>
              Projects
            </span>
            <h1 className={styles.heroTitle} data-reveal>
              Work that speaks{" "}
              <span className="accent accent--orange">for itself.</span>
            </h1>
            <p className={styles.heroLead} data-reveal>
              Custom websites, shops and branding for brands across the
              Netherlands. A few of the projects we're proud of.
            </p>
          </div>
        </div>
      </section>

      <Cases
        items={items}
        meta={{
          eyebrow: casesEn.eyebrow,
          titleLead: "Selected",
          titleAccent: "work.",
        }}
        allHref={CALENDLY}
        allLabel="Book a strategy call"
      />
    </>
  );
}
