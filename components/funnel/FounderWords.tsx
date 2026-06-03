"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FounderWords.module.css";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  photo?: string;
  logo?: string;
};

type FounderData = {
  eyebrow: string;
  title: string;
  accent?: string;
  items: Testimonial[];
};

export default function FounderWords({
  data,
  allHref = "/reviews",
  allLabel = "Bekijk alle reviews",
}: {
  data: FounderData;
  allHref?: string;
  allLabel?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const parts =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : null;

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
    const amount = card ? card.offsetWidth + 20 : 360;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="section section--alt">
      <div className="container">
        <div className={styles.head} data-reveal>
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

        <ul className={styles.track} ref={trackRef} onScroll={update}>
          {data.items.map((t) => (
          <li key={t.author} className={styles.card} data-card data-reveal>
            <div className={styles.photo} style={{ background: t.color }}>
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt={t.author}
                  fill
                  sizes="160px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span className={styles.initials} aria-hidden>
                  {t.initials}
                </span>
              )}
            </div>

            <div className={styles.body}>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.foot}>
                <div className={styles.author}>
                  <span className={styles.name}>{t.author}</span>
                  <span className={styles.role}>
                    {t.role}, {t.company}
                  </span>
                </div>
                <span className={styles.logo}>
                  {t.logo ? (
                    <Image
                      src={t.logo}
                      alt={t.company}
                      width={120}
                      height={32}
                      style={{
                        objectFit: "contain",
                        height: "1.5rem",
                        width: "auto",
                      }}
                    />
                  ) : (
                    t.company
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
        </ul>

        <div className={styles.controls}>
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
          <Link href={allHref} className={styles.allBtn}>
            {allLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

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
