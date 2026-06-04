"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usps } from "@/lib/site";
import styles from "./UspsMobile.module.css";

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

/**
 * Mobiele variant van "Waarom ons": een eenvoudige carrousel met pijlen
 * eronder (overzichtelijker dan een scroll-effect). Alleen zichtbaar op
 * mobiel; desktop gebruikt de twee-koloms USPs.
 */
export default function UspsMobile() {
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
    const amount = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className={`section--dark ${styles.sec}`}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`}>
            {usps.titleLead}{" "}
            <span className="accent accent--orange">{usps.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{usps.intro}</p>
        </div>

        <ul className={styles.track} ref={trackRef} onScroll={update}>
          {usps.items.map((u) => (
            <li key={u.no} className={styles.card} data-card>
              <Image
                src={u.image}
                alt=""
                fill
                quality={90}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.scrim} aria-hidden />
              <div className={styles.content}>
                <span className={styles.no}>{u.no}</span>
                <h3 className={styles.cardTitle}>{u.title}</h3>
                <p className={styles.cardBody}>{u.body}</p>
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
