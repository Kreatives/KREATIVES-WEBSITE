"use client";

import { useState } from "react";
import { faqHome } from "@/lib/site";
import styles from "./FaqHome.module.css";

export type FaqItem = { category: string; question: string; answer: string };

export default function FaqHome({ items }: { items: FaqItem[] }) {
  const [active, setActive] = useState("Alle");

  const categories = Array.from(
    new Set(items.map((i) => i.category).filter(Boolean))
  );
  const filters = ["Alle", ...categories];
  const shown =
    active === "Alle" ? items : items.filter((i) => i.category === active);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{faqHome.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {faqHome.titleLead}{" "}
            <span className="accent accent--orange">{faqHome.titleAccent}</span>
          </h2>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter vragen">
          {filters.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              className={`${styles.chip} ${active === c ? styles.chipOn : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {shown.map((item, i) => (
            <details key={`${item.question}-${i}`} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.q}>{item.question}</span>
                {item.category && (
                  <span className={styles.tag}>{item.category}</span>
                )}
                <span className={styles.mark} aria-hidden />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
