import styles from "./IntroSplit.module.css";

type IntroSplitData = {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
};

/**
 * Twee-koloms intro: links eyebrow + grote kop, rechts ondersteunende tekst.
 * (Layout in de stijl van de "WE ARE"-referentie.)
 */
export default function IntroSplit({ data }: { data: IntroSplitData }) {
  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

  return (
    <section className="section section--alt">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left} data-reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className={styles.title}>
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
          {data.body && (
            <p className={styles.body} data-reveal>
              {data.body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
