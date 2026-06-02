import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { formatDate } from "@/lib/blog";
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
          <ul className={styles.grid}>
            {posts.map((p) => (
              <li key={p.slug} className={styles.card} data-reveal>
                <Link href={`/blog/${p.slug}`} className={styles.link}>
                  <div className={styles.media}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.metaLine}>
                      {formatDate(p.date)} · {p.readingMinutes} min lezen
                    </span>
                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <p className={styles.cardExcerpt}>{p.excerpt}</p>
                    <ul className={styles.tags}>
                      {p.tags.map((t) => (
                        <li key={t} className={styles.tag}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
