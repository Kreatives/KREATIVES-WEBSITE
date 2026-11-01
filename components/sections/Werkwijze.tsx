"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { werkwijze } from "@/lib/site";
import styles from "./Werkwijze.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Werkwijze({
  data = werkwijze,
}: {
  data?: typeof werkwijze;
}) {
  const secRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Terwijl je door de sectie scrollt, loopt de actieve stap mee (01 → 04).
  // Alleen op desktop; op mobiel is het een gewone klik-accordion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 860px)").matches;
    if (reduce || mobile) return;

    const n = data.steps.length;
    const st = ScrollTrigger.create({
      trigger: secRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(n - 1, Math.floor(self.progress * n));
        setActive(idx);
      },
    });
    return () => st.kill();
  }, [data.steps.length]);

  return (
    <section ref={secRef} className={`section ${styles.sec}`} id="werkwijze">
      <div className={styles.sticky}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.left}>
              <span className="eyebrow" data-reveal>
                {data.eyebrow}
              </span>
              <h2 className={`h2 ${styles.title}`} data-reveal>
                {data.titleLead}{" "}
                <span className="accent accent--orange">{data.titleAccent}</span>
              </h2>
              <div className={styles.visual}>
                {data.steps.map((s, i) => (
                  <div
                    key={s.no}
                    className={`${styles.visualImg} ${
                      i === active ? styles.visualActive : ""
                    }`}
                    style={{ backgroundImage: `url(${s.image})` }}
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            <ol className={styles.steps}>
              {data.steps.map((s, i) => (
                <li
                  key={s.no}
                  className={`${styles.step} ${
                    i === active ? styles.stepActive : ""
                  }`}
                >
                  <button
                    type="button"
                    className={styles.stepHead}
                    aria-expanded={i === active}
                    onClick={() => setActive(i)}
                  >
                    <span className={styles.stepNo}>{s.no}</span>
                    <span className={styles.stepTitle}>{s.title}</span>
                  </button>
                  <div className={styles.stepBody}>
                    <div className={styles.stepBodyInner}>
                      <p>{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
