import { reviews } from "@/lib/site";
import { Star } from "@/components/icons";
import styles from "./Reviews.module.css";

export default function Reviews() {
  // Dupliceren voor naadloze marquee
  const items = [...reviews.items, ...reviews.items];

  return (
    <section className={`section section--dark ${styles.sec}`} id="reviews">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {reviews.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {reviews.titleLead}{" "}
            <span className="accent accent--orange">
              {reviews.titleAccent}
            </span>
          </h2>
          <div className={styles.rating} data-reveal>
            <span className={styles.stars} aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
            <span className={styles.ratingLabel}>
              <strong>{reviews.rating}</strong> {reviews.ratingLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div
          className={`marquee__track ${styles.track}`}
          style={{ "--marquee-dur": "60s" } as React.CSSProperties}
        >
          {items.map((r, i) => (
            <article
              key={i}
              className={styles.card}
              aria-hidden={i >= reviews.items.length}
            >
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>
              <p className={styles.quote}>{r.quote}</p>
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
                  <span className={styles.company}>{r.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Tweede marquee in tegenovergestelde richting */}
      <div className={`marquee ${styles.rowSecond}`}>
        <div
          className={`marquee__track ${styles.track} ${styles.trackReverse}`}
          style={{ "--marquee-dur": "60s" } as React.CSSProperties}
        >
          {items.map((r, i) => (
            <article
              key={`r-${i}`}
              className={styles.card}
              aria-hidden={true}
            >
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>
              <p className={styles.quote}>{r.quote}</p>
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
                  <span className={styles.company}>{r.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
