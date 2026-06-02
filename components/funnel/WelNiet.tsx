import styles from "./WelNiet.module.css";

type Column = { title: string; items: string[] };
type WelNietData = {
  eyebrow: string;
  title: string;
  accent?: string;
  wel: Column;
  niet: Column;
};

export default function WelNiet({ data }: { data: WelNietData }) {
  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

  return (
    <section className="section">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {parts ? (
              <>
                {parts[0]}
                <span className="accent accent--orange">{data.accent}</span>
                {parts[1]}
              </>
            ) : (
              data.title
            )}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.col} ${styles.colWel}`} data-reveal>
            <span className={styles.colTitle}>{data.wel.title}</span>
            <ul className={styles.list}>
              {data.wel.items.map((item) => (
                <li key={item}>
                  <span className={`${styles.mark} ${styles.markWel}`} aria-hidden>
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="m3 8.5 3.2 3 6.8-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.colNiet}`} data-reveal>
            <span className={styles.colTitle}>{data.niet.title}</span>
            <ul className={styles.list}>
              {data.niet.items.map((item) => (
                <li key={item}>
                  <span className={`${styles.mark} ${styles.markNiet}`} aria-hidden>
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 8h8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
