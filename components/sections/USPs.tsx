import { usps } from "@/lib/site";
import styles from "./USPs.module.css";

export default function USPs() {
  return (
    <section className={`section ${styles.sec}`} id="waarom">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{usps.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {usps.titleLead}{" "}
            <span className="accent accent--orange">{usps.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{usps.intro}</p>
        </div>

        <ul className={styles.grid}>
          {usps.items.map((u) => (
            <li key={u.title} className={styles.card} data-reveal>
              <span className={styles.stat}>{u.stat}</span>
              <h3 className={styles.cardTitle}>{u.title}</h3>
              <p className={styles.cardBody}>{u.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
