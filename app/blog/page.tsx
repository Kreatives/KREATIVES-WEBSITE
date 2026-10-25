import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import BlogArchive from "@/components/BlogArchive";
import { getPosts } from "@/lib/cms";
import { steden } from "@/lib/steden";
import styles from "./blog.module.css";
import regios from "./regios.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikelen over webdesign, strategie en hoe we bij KREATIVES denken over maatwerk en het bouwen van sites die werken.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = (await getPosts())
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <>
      <RevealInit />

      <section className={`section--dark cosmos-bg ${styles.head}`}>
        <div className="container">
          <div className={styles.headInner}>
            <span className="eyebrow" data-reveal>
              Blog
            </span>
            <h1 className={styles.title} data-reveal>
              Korte notities{" "}
              <span className="accent accent--orange">vanuit de praktijk.</span>
            </h1>
            <p className={styles.body} data-reveal>
              Stukjes over webdesign, strategie en hoe we bij KREATIVES naar
              maatwerk kijken. Niet wekelijks, wel als we iets te zeggen
              hebben.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BlogArchive
            posts={posts.map((p) => ({
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              date: p.date,
              readingMinutes: p.readingMinutes,
              image: p.image,
              tags: p.tags,
            }))}
          />
        </div>
      </section>

      <section className={`section section--alt ${regios.sec}`} id="regios">
        <div className="container">
          <div className={regios.head}>
            <span className="eyebrow" data-reveal>
              Regio's
            </span>
            <h2 className="h2" data-reveal>
              Webdesign{" "}
              <span className="accent accent--orange">in jouw stad.</span>
            </h2>
            <p className={`lead muted ${regios.intro}`} data-reveal>
              Voor bedrijven waarvan de website niet is meegegroeid met het
              bedrijf. Lees de aanpak voor jouw regio, met de prijzen en
              doorlooptijd die overal gelden.
            </p>
          </div>
          <ul className={regios.grid}>
            {steden.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className={regios.card} data-reveal>
                  <span className={regios.city}>
                    <span>Webdesign {s.city}</span>
                    <span aria-hidden>→</span>
                  </span>
                  <span className={regios.sub}>{s.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
