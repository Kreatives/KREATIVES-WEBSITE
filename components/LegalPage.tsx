import RevealInit from "@/components/RevealInit";
import type { LegalDoc } from "@/lib/legal";
import styles from "./LegalPage.module.css";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <RevealInit />
      <section className={`section ${styles.sec}`}>
        <div className="container">
          <header className={styles.head} data-reveal>
            <span className="eyebrow">Juridisch</span>
            <h1 className={styles.title}>{doc.title}</h1>
            <p className={styles.updated}>{doc.updated}</p>
            <p className={styles.intro}>{doc.intro}</p>
          </header>

          <div className={styles.body}>
            {doc.sections.map((s) => (
              <section key={s.heading} className={styles.block} data-reveal>
                <h2 className={styles.heading}>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className={styles.p}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
