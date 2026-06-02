"use client";

import { useState } from "react";
import { faqHome } from "@/lib/site";
import styles from "./FaqHome.module.css";

export default function FaqHome() {
  const [active, setActive] = useState("Alle");
  const filters = ["Alle", ...faqHome.categories];
  const items =
    active === "Alle"
      ? faqHome.items
      : faqHome.items.filter((i) => i.category === active);

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
          {items.map((item) => (
            <details key={item.q} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.q}>{item.q}</span>
                <span className={styles.tag}>{item.category}</span>
                <span className={styles.mark} aria-hidden />
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
