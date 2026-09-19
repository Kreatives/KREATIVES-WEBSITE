"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { probleem, usps } from "@/lib/site";
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

    gsap.set(words, { opacity: 0.2 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 55%",
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
        {/* Scalient about-stijl: label links, groot statement rechts */}
        <div className={styles.grid}>
          <p className={styles.label}>{probleem.eyebrow}</p>
          <p ref={ref} className={styles.statement}>
            {words.map((w, i) => (
              <span key={i} className={styles.word} data-w>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>

        <ul className={styles.cards}>
          {usps.items.map((u) => (
            <li key={u.title} className={styles.card} data-reveal>
              <span className={styles.stat}>{u.stat}</span>
              <h3 className={styles.cardTitle}>{u.title}</h3>
              <p className={styles.cardBody}>{u.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
