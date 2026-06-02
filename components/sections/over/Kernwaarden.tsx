"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { overOnsKernwaarden } from "@/lib/site";
import styles from "./Kernwaarden.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Kernwaarden() {
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = introRef.current;
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

  const introWords = overOnsKernwaarden.intro.split(" ");

  return (
    <section className="section section--alt" id="kernwaarden">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {overOnsKernwaarden.eyebrow}
          </span>
          <p ref={introRef} className={styles.intro}>
            {introWords.map((w, i) => (
              <span key={i} className={styles.word} data-w>
                {w}
                {i < introWords.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>

        <ul className={styles.grid}>
          {overOnsKernwaarden.items.map((item) => (
            <li key={item.title} className={styles.item} data-reveal>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
