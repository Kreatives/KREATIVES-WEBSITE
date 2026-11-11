import { stappen } from "./data";
import styles from "./starters.module.css";

export default function Proces() {
  return (
    <section className={`section ${styles.procesSec}`}>
      <div className="container">
        <div className={styles.procesGrid}>
          <div className={styles.procesHead} data-reveal>
            <span className="eyebrow">Hoe het loopt</span>
            <h2 className={`h2 ${styles.procesTitle}`}>
              Vier stappen,{" "}
              <span className="accent accent--orange">geen gesprek nodig.</span>
            </h2>
            <p className={styles.procesSub}>
              Je hoeft niet eerst te bellen. Invullen, betalen, ontwerpen. Wil je
              wel even iemand spreken voor je begint, dan pak ik de telefoon.
            </p>
          </div>

          <ol className={styles.procesList}>
            {stappen.map((s) => (
              <li key={s.no} data-reveal>
                <span className={styles.procesNo} aria-hidden>
                  {s.no}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
