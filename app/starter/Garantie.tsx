import { garantie, beloften } from "./data";
import styles from "./starters.module.css";

export default function Garantie() {
  return (
    <section className={`section section--dark cosmos-bg ${styles.garSec}`}>
      <div className="container">
        <div className={styles.garKaart} data-reveal>
          <span className={styles.garIco} aria-hidden>
            <svg viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3 5 6.5v7c0 5.5 3.8 9.7 9 11.5 5.2-1.8 9-6 9-11.5v-7L14 3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="m10 13.5 2.8 2.8L18.5 11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className={`h2 ${styles.garTitel}`}>
            {garantie.title}{" "}
            <span className="accent accent--orange">{garantie.accent}</span>
          </h2>
          <p className={styles.garBody}>{garantie.body}</p>
          <p className={styles.garVoorwaarden}>{garantie.voorwaarden}</p>
        </div>

        <ul className={styles.beloftes}>
          {beloften.map((b) => (
            <li key={b.title} data-reveal>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
