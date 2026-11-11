import Link from "next/link";
import styles from "./starters.module.css";

export default function StartersFaq() {
  const items = FAQ;
  return (
    <section className={`section ${styles.faqSec}`} id="faq">
      <div className="container">
        <div className={styles.faqGrid}>
          <div className={styles.faqHead} data-reveal>
            <span className="eyebrow">Vragen</span>
            <h2 className={`h2 ${styles.faqTitel}`}>
              Voordat je{" "}
              <span className="accent accent--orange">bestelt.</span>
            </h2>
            <p className={styles.faqSub}>
              Staat je vraag er niet bij? App me, dan antwoord ik zelf.
            </p>
            <a
              href="https://wa.me/31613066250"
              className={styles.faqApp}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Stuur een appje
            </a>
          </div>

          <div className={styles.faqList}>
            {items.map((f) => (
              <details key={f.q} className={styles.faqItem} data-reveal>
                <summary className={styles.faqQ}>
                  <span>{f.q}</span>
                  <span className={styles.faqMark} aria-hidden />
                </summary>
                <p className={styles.faqA}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <p className={styles.faqFoot} data-reveal>
          Bekijk ook de{" "}
          <Link href="/voorwaarden">algemene voorwaarden</Link> en{" "}
          <Link href="/privacy">het privacybeleid</Link>.
        </p>
      </div>
    </section>
  );
}

import { WHATS_NEXT as FAQ } from "./data";
