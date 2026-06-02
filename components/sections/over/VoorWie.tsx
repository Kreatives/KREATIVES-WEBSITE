import { overOnsVoorWie } from "@/lib/site";
import styles from "./VoorWie.module.css";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3 8.5 3.2 3 6.8-7" />
    </svg>
  );
}
function Cross() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4l8 8" />
      <path d="M12 4l-8 8" />
    </svg>
  );
}

export default function VoorWie() {
  return (
    <section className="section" id="voor-wie">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {overOnsVoorWie.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {overOnsVoorWie.titleLead}{" "}
            <span className="accent accent--orange">
              {overOnsVoorWie.titleAccent}
            </span>
          </h2>
        </div>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.cardYes}`} data-reveal>
            <h3 className={styles.cardTitle}>{overOnsVoorWie.voor.title}</h3>
            <ul className={styles.list}>
              {overOnsVoorWie.voor.items.map((t) => (
                <li key={t}>
                  <span className={`${styles.tick} ${styles.tickYes}`}>
                    <Check />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.card} ${styles.cardNo}`} data-reveal>
            <h3 className={styles.cardTitle}>{overOnsVoorWie.niet.title}</h3>
            <ul className={styles.list}>
              {overOnsVoorWie.niet.items.map((t) => (
                <li key={t}>
                  <span className={`${styles.tick} ${styles.tickNo}`}>
                    <Cross />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
