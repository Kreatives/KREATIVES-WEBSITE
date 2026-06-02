import styles from "./StatsBlock.module.css";

type StatsData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  stats: { number: string; label: string; body: string }[];
};

export default function StatsBlock({ data }: { data: StatsData }) {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headLeft} data-reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={styles.title}>
              {data.titleLead}{" "}
              <span className="accent accent--orange">{data.titleAccent}</span>
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            {data.body}
          </p>
        </div>

        <ul className={styles.stats}>
          {data.stats.map((s) => (
            <li key={s.label} className={styles.stat} data-reveal>
              <span className={styles.number}>{s.number}</span>
              <span className={styles.label}>{s.label}</span>
              <p className={styles.statBody}>{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
