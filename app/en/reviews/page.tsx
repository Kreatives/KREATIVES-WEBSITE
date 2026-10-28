import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import { initialsOf } from "@/lib/cms";
import { reviewsPageEn } from "@/lib/content-en";
import styles from "../en.module.css";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What business owners and brands say about working with KREATIVES. In their own words, translated from Dutch.",
  alternates: { canonical: "/en/reviews" },
  openGraph: {
    title: "Reviews — KREATIVES",
    description: "What clients say about working with us.",
    url: "/en/reviews",
  },
};

export default function EnReviews() {
  return (
    <>
      <RevealInit />
      <section className={`section--dark cosmos-bg ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="eyebrow" data-reveal>
              {reviewsPageEn.eyebrow}
            </span>
            <h1 className={styles.heroTitle} data-reveal>
              {reviewsPageEn.titleLead}{" "}
              <span className="accent accent--orange">
                {reviewsPageEn.titleAccent}
              </span>
            </h1>
            <p className={styles.heroLead} data-reveal>
              {reviewsPageEn.body}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.masonry}>
            {reviewsPageEn.items.map((r, i) => (
              <article key={`${r.author}-${i}`} className={styles.reviewCard}>
                <h2 className={styles.reviewTitle}>{r.title}</h2>
                <p className={styles.reviewQuote}>{r.quote}</p>
                <div className={styles.reviewFoot}>
                  {r.photo ? (
                    <span
                      className={styles.avatar}
                      style={{
                        backgroundImage: `url(${r.photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      aria-hidden
                    />
                  ) : (
                    <span
                      className={styles.avatar}
                      style={{ background: r.color }}
                      aria-hidden
                    >
                      {initialsOf(r.author)}
                    </span>
                  )}
                  <span>
                    <span className={styles.reviewName}>{r.author}</span>
                    <span className={styles.reviewRole}>
                      {r.role}
                      {r.company ? `, ${r.company}` : ""}
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
