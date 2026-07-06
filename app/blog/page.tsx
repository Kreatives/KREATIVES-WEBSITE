import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import BlogArchive from "@/components/BlogArchive";
import { getPosts } from "@/lib/cms";
import styles from "./blog.module.css";

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
    </>
  );
}
