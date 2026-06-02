import styles from "./FaqList.module.css";

type FaqData = {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
};

export default function FaqList({ data }: { data: FaqData }) {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.head} data-reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={`h2 ${styles.title}`}>{data.title}</h2>
          </div>

          <div className={styles.list}>
            {data.items.map((item) => (
              <details key={item.q} className={styles.item} data-reveal>
                <summary className={styles.summary}>
                  <span>{item.q}</span>
                  <span className={styles.mark} aria-hidden />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
