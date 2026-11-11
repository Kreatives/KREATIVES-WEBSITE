"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./express.module.css";

const ITEMS = [
  {
    title: "Eerst zien, dan bouwen",
    body: "Je keurt het ontwerp goed voordat ik ga bouwen. Zo weet je precies wat je krijgt.",
  },
  {
    title: "Een opbouw die aanvragen oplevert",
    body: "De pagina is opgebouwd rond één duidelijke actie, zodat bezoekers sneller contact opnemen of een offerte aanvragen.",
  },
  {
    title: "Ziet er goed uit op elke telefoon",
    body: "Het ontwerp begint bij de telefoon en werkt daarna net zo goed op tablet en desktop.",
  },
  {
    title: "Zelf aan te passen in WordPress",
    body: "Je past teksten en foto's zelf aan in WordPress. Je krijgt een korte uitlegvideo zodat je meteen weg kunt.",
  },
];

export default function VanJou() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el || window.innerWidth < 820) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        const idx = Math.min(ITEMS.length - 1, Math.floor(p * ITEMS.length + 0.0001));
        setActive(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.vanjouScroll} ref={wrapRef}>
      <div className={styles.vanjouSticky}>
        <section className={styles.vanjou}>
          <div className={`${styles.container} ${styles.vanjouInner}`}>
            <div>
              <h2 className={styles.vanjouTitle}>
                Een ontwerp dat <span className={styles.accent}>100% van jou</span>{" "}
                is, door een mens.
              </h2>
              <p className={styles.vanjouSub}>
                Elke site begint met een leeg vel. Ik bedenk de opbouw, ontwerp de
                pagina&apos;s zelf en jij krijgt alles mee.
              </p>
              <div className={styles.vanjouList}>
                {ITEMS.map((it, i) => (
                  <button
                    type="button"
                    key={it.title}
                    className={`${styles.vanjouItem} ${i === active ? styles.vanjouItemOpen : ""}`}
                    onClick={() => setActive(i)}
                    aria-expanded={i === active}
                  >
                    <span className={styles.vanjouItemHead}>
                      <span className={styles.vanjouItemTitle}>{it.title}</span>
                      <span className={styles.vanjouToggle} aria-hidden />
                    </span>
                    <span className={styles.vanjouItemBodyWrap}>
                      <span className={styles.vanjouItemBody}>{it.body}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.vanjouImg}>
              <img className={styles.vanjouBg} src="/starter/vanjou-bg.webp" alt="" />
              <img className={styles.vanjouPen} src="/starter/vanjou-pen.webp" alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
