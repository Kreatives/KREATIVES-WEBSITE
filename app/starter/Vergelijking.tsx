import Button from "@/components/Button";
import { vergelijking } from "./data";
import styles from "./starters.module.css";

export default function Vergelijking() {
  return (
    <section className={`section section--alt ${styles.vergSec}`}>
      <div className="container">
        <div className={styles.vergHead} data-reveal>
          <span className="eyebrow">Drie manieren</span>
          <h2 className={`h2 ${styles.vergTitle}`}>
            Drie manieren om aan een website te{" "}
            <span className="accent accent--orange">komen.</span>
          </h2>
          <p className={styles.vergSub}>
            Een marktplaats, een abonnement of dit. Ze kosten je alle drie geld,
            alleen niet op dezelfde manier.
          </p>
        </div>

        <div className={styles.vergGrid}>
          {vergelijking.map((v) => (
            <article
              key={v.title}
              className={`${styles.vergCard} ${
                v.featured ? styles.vergCardOn : ""
              }`}
              data-reveal
            >
              <div className={styles.vergTop}>
                <span className={styles.vergTag}>{v.tag}</span>
                <h3 className={styles.vergName}>{v.title}</h3>
                <p className={styles.vergFrom}>{v.from}</p>
              </div>

              <ul className={styles.vergList}>
                {v.punten.map((p) => (
                  <li key={p.text}>
                    <span
                      className={p.ok ? styles.vergOk : styles.vergNee}
                      aria-hidden
                    >
                      {p.ok ? (
                        <svg viewBox="0 0 16 16" fill="none">
                          <path
                            d="m3 8.5 3.2 3 6.8-7"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" fill="none">
                          <path
                            d="m4.5 4.5 7 7m0-7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>

              {v.featured && (
                <Button href="#pakketten" variant="primary" className={styles.vergCta}>
                  Bekijk de pakketten
                </Button>
              )}
            </article>
          ))}
        </div>

        <p className={styles.vergFoot} data-reveal>
          Bij een abonnement van €49 per maand heb je na twee jaar €1.176
          betaald en is de site nog steeds niet van jou.
        </p>
      </div>
    </section>
  );
}
