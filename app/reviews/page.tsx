import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import { reviewsPage } from "@/lib/site";
import styles from "./reviews.module.css";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Lees wat ondernemers en merken over de samenwerking met KREATIVES zeggen. Ongefilterde reviews over proces, resultaat en uitstraling.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reviews — KREATIVES",
    description: "Wat klanten over ons zeggen, in hun eigen woorden.",
    url: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <>
      <RevealInit />
      <section className={`section ${styles.sec}`} id="top">
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow" data-reveal>
              {reviewsPage.eyebrow}
            </span>
            <h1 className={`h2 ${styles.title}`} data-reveal>
              {reviewsPage.titleLead}{" "}
              <span className="accent accent--orange">
                {reviewsPage.titleAccent}
              </span>
            </h1>
            <p className={`lead muted ${styles.body}`} data-reveal>
              {reviewsPage.body}
            </p>
          </div>

          <div className={styles.masonry}>
            {reviewsPage.items.map((r) => (
              <article key={r.author} className={styles.card} data-reveal>
                <h2 className={styles.cardTitle}>{r.title}</h2>
                <p className={styles.quote}>{r.quote}</p>
                <div className={styles.foot}>
                  <div className={styles.author}>
                    <span
                      className={styles.avatar}
                      style={{ background: r.color }}
                      aria-hidden
                    >
                      {r.initials}
                    </span>
                    <div className={styles.authorMeta}>
                      <span className={styles.name}>{r.author}</span>
                      <span className={styles.role}>
                        {r.role}, {r.company}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
