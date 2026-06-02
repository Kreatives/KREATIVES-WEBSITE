import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import { reviewsPage } from "@/lib/site";
import { getReviews, initialsOf } from "@/lib/cms";
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

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await getReviews();

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
            {reviews.map((r) => (
              <article key={r.id} className={styles.card} data-reveal>
                <h2 className={styles.cardTitle}>{r.title}</h2>
                <p className={styles.quote}>{r.quote}</p>
                <div className={styles.foot}>
                  <div className={styles.author}>
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
                    <div className={styles.authorMeta}>
                      <span className={styles.name}>{r.author}</span>
                      <span className={styles.role}>
                        {r.role}
                        {r.company ? `, ${r.company}` : ""}
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
