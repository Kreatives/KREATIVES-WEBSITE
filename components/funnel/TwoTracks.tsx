import Button from "@/components/Button";
import styles from "./TwoTracks.module.css";

type Track = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
};

type TwoTracksData = {
  eyebrow: string;
  title: string;
  accent?: string;
  items: Track[];
};

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={styles.check}>
      <path
        d="m3 8.5 3.2 3 6.8-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TwoTracks({ data }: { data: TwoTracksData }) {
  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

  return (
    <section className="section">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {parts ? (
              <>
                {parts[0]}
                <span className="accent accent--orange">{data.accent}</span>
                {parts[1]}
              </>
            ) : (
              data.title
            )}
          </h2>
        </div>

        <div className={styles.grid}>
          {data.items.map((track, i) => {
            const featured = i === 0;
            return (
              <article
                key={track.tag}
                className={`${styles.card} ${
                  featured ? styles.cardFeatured : styles.cardPlain
                }`}
                data-reveal
              >
                <div className={styles.cardHead}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.name}>{track.title}</h3>
                    <span className={styles.tag}>{track.tag}</span>
                  </div>
                  <p className={styles.cardBody}>{track.body}</p>
                </div>

                <div className={styles.divide} aria-hidden />

                <ul className={styles.points}>
                  {track.points.map((p) => (
                    <li key={p}>
                      <span className={styles.tick} aria-hidden>
                        <Check />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardCta}>
                  <Button
                    href={track.cta.href}
                    variant={featured ? "primary" : "dark"}
                  >
                    {track.cta.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
