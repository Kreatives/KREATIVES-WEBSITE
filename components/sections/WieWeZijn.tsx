import { wieWeZijn } from "@/lib/site";
import styles from "./WieWeZijn.module.css";

export default function WieWeZijn({
  data = wieWeZijn,
}: {
  data?: typeof wieWeZijn;
}) {
  return (
    <section className={`section ${styles.sec}`} id="wie-we-zijn">
      <div className="container">
        <div className={styles.head}>
          <span className={`eyebrow ${styles.label}`} data-reveal>
            {data.eyebrow}
          </span>
          <p className={styles.statement} data-reveal>
            {data.statementLead}{" "}
            <span className={styles.statementRest}>{data.statementRest}</span>
          </p>
        </div>

        <div className={styles.grid}>
          {data.items.map((it) => (
            <article key={it.no} className={styles.card} data-reveal>
              <span className={styles.cardNo}>{it.no}</span>
              <span className={styles.cardIcon} aria-hidden />
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
