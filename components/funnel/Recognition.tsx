"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Recognition.module.css";

gsap.registerPlugin(ScrollTrigger);

type RecognitionData = {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
};

/**
 * Gecentreerde statement-band met GSAP word-highlight (woorden lichten op
 * tijdens het scrollen). Alles in één lettertype; het accent-fragment blijft
 * oranje.
 */
export default function Recognition({ data }: { data: RecognitionData }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.2 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        end: "bottom 58%",
        scrub: 0.4,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const accentIdx = data.accent ? data.title.indexOf(data.accent) : -1;
  const accentEnd = accentIdx + (data.accent?.length ?? 0);

  let offset = 0;
  const parts = data.title.split(" ");
  const words = parts.map((w, i) => {
    const start = offset;
    const end = offset + w.length;
    offset = end + 1;
    const isAccent = accentIdx >= 0 && start < accentEnd && end > accentIdx;
    return (
      <span
        key={i}
        data-w
        className={isAccent ? styles.accentWord : styles.word}
      >
        {w}
        {i < parts.length - 1 ? " " : ""}
      </span>
    );
  });

  return (
    <section className="section section--alt">
      <div className="container">
        <div className={styles.inner}>
          <span className="eyebrow" data-reveal>
            {data.eyebrow}
          </span>
          <p ref={ref} className={styles.statement}>
            {words}
          </p>
          {data.body && <p className={styles.body}>{data.body}</p>}
        </div>
      </div>
    </section>
  );
}
