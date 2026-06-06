import { reviews } from "@/lib/site";
import { Star } from "@/components/icons";
import styles from "./Reviews.module.css";

export type ReviewItem = {
  quote: string;
  author: string;
  company: string;
  initials: string;
  color: string;
  photo?: string | null;
};

function Avatar({ r, className }: { r: ReviewItem; className: string }) {
  if (r.photo) {
    return (
      <span
        className={className}
        style={{
          backgroundImage: `url(${r.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    );
  }
  return (
    <span className={className} style={{ background: r.color }} aria-hidden>
      {r.initials}
    </span>
  );
}

function Card({ r, hidden }: { r: ReviewItem; hidden: boolean }) {
  return (
    <article className={styles.card} aria-hidden={hidden}>
      <span className={styles.quoteMark} aria-hidden>
        &ldquo;
      </span>
      <p className={styles.quote}>{r.quote}</p>
      <div className={styles.author}>
        <Avatar r={r} className={styles.avatar} />
        <div className={styles.authorMeta}>
          <span className={styles.name}>{r.author}</span>
          <span className={styles.company}>{r.company}</span>
        </div>
      </div>
    </article>
  );
}

export default function Reviews({ items: source }: { items: ReviewItem[] }) {
  // Verdeel de reviews over twee rijen zodat ze niet allemaal hetzelfde tonen.
  const mid = Math.ceil(source.length / 2);
  const rowA = source.slice(0, mid);
  const rowB = source.slice(mid).length ? source.slice(mid) : source.slice(0, mid);
  // Per rij dupliceren voor een naadloze marquee.
  const trackA = [...rowA, ...rowA];
  const trackB = [...rowB, ...rowB];

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
          {trackA.map((r, i) => (
            <Card key={`a-${i}`} r={r} hidden={i >= rowA.length} />
          ))}
        </div>
      </div>

      <div className={`marquee ${styles.rowSecond}`}>
        <div
          className={`marquee__track ${styles.track} ${styles.trackReverse}`}
          style={{ "--marquee-dur": "60s" } as React.CSSProperties}
        >
          {trackB.map((r, i) => (
            <Card key={`b-${i}`} r={r} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
