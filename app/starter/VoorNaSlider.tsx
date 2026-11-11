"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import styles from "./starters.module.css";

/**
 * Voor/na-slider. Beweegt met slepen, met de pijltjestoetsen en met een tik.
 * De posities worden in procenten bijgehouden, dus hij blijft kloppen bij elke
 * schermbreedte.
 */
export default function VoorNaSlider({
  voor,
  na,
  alt,
}: {
  voor: string;
  na: string;
  alt: string;
}) {
  const [pos, setPos] = useState(52);
  const [sleep, setSleep] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  const zet = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(2, p - 4));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(98, p + 4));
    }
  }

  return (
    <div
      className={`${styles.ba} ${sleep ? styles.baSleep : ""}`}
      ref={box}
      onPointerDown={(e) => {
        setSleep(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        zet(e.clientX);
      }}
      onPointerMove={(e) => {
        if (sleep) zet(e.clientX);
      }}
      onPointerUp={() => setSleep(false)}
      onPointerCancel={() => setSleep(false)}
    >
      <Image src={na} alt={`${alt}, nieuwe versie`} fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.baImg} />
      <div className={styles.baOnder} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={voor} alt={`${alt}, oude versie`} fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.baImg} />
      </div>

      <span className={styles.baLabel} data-kant="voor">
        Voor
      </span>
      <span className={styles.baLabel} data-kant="na">
        Na
      </span>

      <button
        type="button"
        className={styles.baHandle}
        style={{ left: `${pos}%` }}
        aria-label="Verschuif de vergelijking"
        aria-describedby={id}
        onKeyDown={onKey}
      >
        <span className={styles.baGrip} aria-hidden>
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 5 4 10l3.5 5m5-10L16 10l-3.5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p id={id} className={styles.baHint}>
        Sleep of gebruik de pijltjes
      </p>
    </div>
  );
}
