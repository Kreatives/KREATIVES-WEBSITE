"use client";

import { useEffect, useRef, useState } from "react";
import { overOnsResultaten } from "@/lib/site";
import styles from "./Resultaten.module.css";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Resultaten() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      className={`section section--dark cosmos-bg ${styles.sec}`}
      id="resultaten"
    >
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="eyebrow">{overOnsResultaten.eyebrow}</span>
          <h2 className={`h2 ${styles.title}`}>
            {overOnsResultaten.titleLead}{" "}
            <span className="accent accent--orange">
              {overOnsResultaten.titleAccent}
            </span>
          </h2>
        </div>

        <ul className={styles.track} ref={trackRef} onScroll={update}>
          {overOnsResultaten.items.map((s) => (
            <li key={s.label} className={styles.card} data-card data-reveal>
              <span className={styles.no}>{s.number}</span>
              <div className={styles.meta}>
                <h3 className={styles.label}>{s.label}</h3>
                <p className={styles.body}>{s.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Vorige"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Volgende"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
