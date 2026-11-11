"use client";

import { useEffect, useState } from "react";
import { packages } from "./data";
import styles from "./starters.module.css";

/**
 * Sticky onderbalk op mobiel: pakket kiezen, prijs en de CTA bij de hand.
 * Verschijnt pas als de hero uit beeld is, zodat hij bovenaan niet in de weg zit.
 */
export default function StickyDock() {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const onScroll = () => setZichtbaar(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.dock} ${zichtbaar ? styles.dockOn : ""}`}>
      <div className={styles.dockInner}>
        <div className={styles.dockPrijs}>
          <span>Vanaf</span>
          <strong>{packages[0].price}</strong>
          <em>2 termijnen mogelijk</em>
        </div>
        <a href="#aanvraag" className={styles.dockCta}>
          Start mijn website
          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M4 12 12 4m0 0H6m6 0v6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
