import type { FaqPair } from "./PostContent";
import { parseInline } from "./PostContent";
import faq from "./sections/FaqHome.module.css";
import styles from "./PostFaq.module.css";

export default function PostFaq({
  id,
  items,
}: {
  id: string;
  items: FaqPair[];
}) {
  if (!items.length) return null;
  return (
    <section id={id} className={styles.section} aria-label="Veelgestelde vragen">
      <h2 className={styles.title} data-reveal>
        Veelgestelde vragen
      </h2>
      <div className={faq.list}>
        {items.map((item, i) => (
          <details
            key={`${item.question}-${i}`}
            className={`${faq.item} ${styles.item}`}
          >
            <summary className={faq.summary}>
              <span className={faq.q}>{item.question}</span>
              <span className={faq.mark} aria-hidden />
            </summary>
            <p className={`${faq.answer} ${styles.answer}`}>
              {parseInline(item.answer, `faq-${i}`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
