"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { werkwijze } from "@/lib/site";
import styles from "./Werkwijze.module.css";

export default function Werkwijze() {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const followRef = useRef<HTMLDivElement>(null);

  const placeAt = (x: number, y: number) => {
    const el = followRef.current;
    if (!el) return;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onMove = (e: React.MouseEvent) => placeAt(e.clientX, e.clientY);

  return (
    <section
      className={`section ${styles.sec}`}
      id="werkwijze"
      onMouseMove={onMove}
    >
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {werkwijze.eyebrow}
          </span>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {werkwijze.titleLead}{" "}
            <span className="accent accent--orange">
              {werkwijze.titleAccent}
            </span>
          </h2>
        </div>

        <ul className={styles.list}>
          {werkwijze.steps.map((s, i) => {
            const isOpen = open === i;
            return (
              <li
                key={s.no}
                className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`step-panel-${i}`}
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    setHover(null);
                  }}
                  onMouseEnter={(e) => {
                    if (open !== i) {
                      placeAt(e.clientX, e.clientY);
                      setHover(i);
                    }
                  }}
                  onMouseLeave={() => setHover(null)}
                >
                  <span className={styles.no}>({s.no})</span>
                  <span className={styles.name}>{s.title}</span>
                  <span className={styles.toggle} aria-hidden>
                    <span className={styles.bar} />
                    <span className={`${styles.bar} ${styles.barV}`} />
                  </span>
                </button>

                <div
                  id={`step-panel-${i}`}
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.desc}>{s.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cursor-volgende afbeelding op hover */}
      <div
        ref={followRef}
        className={`${styles.follow} ${hover !== null ? styles.followOn : ""}`}
        aria-hidden
      >
        {werkwijze.steps.map((s, i) => (
          <div
            key={s.no}
            className={styles.followImg}
            style={{ opacity: hover === i ? 1 : 0 }}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="320px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
