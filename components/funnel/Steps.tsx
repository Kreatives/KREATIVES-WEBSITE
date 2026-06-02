import styles from "./Steps.module.css";

type StepsData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  items: { no: string; title: string; body: string }[];
};

export default function Steps({ data }: { data: StepsData }) {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.head} data-reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={styles.title}>
              {data.titleLead}{" "}
              <span className="accent accent--orange">{data.titleAccent}</span>
            </h2>
          </div>

          <ol className={styles.list}>
            {data.items.map((step) => (
              <li key={step.no} className={styles.step} data-reveal>
                <span className={styles.no} aria-hidden>
                  {step.no}
                </span>
                <div className={styles.stepText}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
