"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { probleem } from "@/lib/site";
import styles from "./Probleem.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Probleem() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");

    if (reduce) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.18 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 50%",
        scrub: 0.4,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const words = probleem.statement.split(" ");

  return (
    <section className="section" id="probleem">
      <div className="container">
        {/* Label inline aan het begin van de heading; tekst wrapt onder zichzelf */}
        <p ref={ref} className={styles.statement}>
          <span className={styles.label}>{probleem.eyebrow}</span>
          {words.map((w, i) => (
            <span key={i} className={styles.word} data-w>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
