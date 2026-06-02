import { overOnsResultaten } from "@/lib/site";
import styles from "./Resultaten.module.css";

export default function Resultaten() {
  return (
    <section className={`section section--dark cosmos-bg ${styles.sec}`} id="resultaten">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {overOnsResultaten.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {overOnsResultaten.titleLead}{" "}
            <span className="accent accent--orange">
              {overOnsResultaten.titleAccent}
            </span>
          </h2>
        </div>

        <ul className={styles.grid}>
          {overOnsResultaten.items.map((s) => (
            <li key={s.label} className={styles.card} data-reveal>
              <span className={styles.no}>{s.number}</span>
              <div className={styles.meta}>
                <h3 className={styles.label}>{s.label}</h3>
                <p className={styles.body}>{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
