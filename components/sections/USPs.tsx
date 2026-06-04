"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usps } from "@/lib/site";
import styles from "./USPs.module.css";

export default function USPs() {
  const [active, setActive] = useState(0);
  const driverRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    driverRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={`section--dark ${styles.sec}`} id="waarom">
      <div className="container">
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`}>
            {usps.titleLead}{" "}
            <span className="accent accent--orange">{usps.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{usps.intro}</p>
        </div>
      </div>

      {/* Vastgezet beeldframe dat wisselt terwijl je scrollt. */}
      <div
        className={styles.stage}
        style={{ height: `${usps.items.length * 100}vh` }}
      >
        <div className={styles.sticky}>
          {usps.items.map((u, i) => (
            <div
              key={u.no}
              className={`${styles.frame} ${active === i ? styles.frameOn : ""}`}
              aria-hidden={active !== i}
            >
              <Image
                src={u.image}
                alt=""
                fill
                quality={90}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.overlay} />
            </div>
          ))}

          <div className="container">
            <div className={styles.content}>
              <div className={styles.progress} aria-hidden>
                {usps.items.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.bar} ${
                      i <= active ? styles.barOn : ""
                    }`}
                  />
                ))}
              </div>
              <div className={styles.copyStack}>
                {usps.items.map((u, i) => (
                  <div
                    key={u.no}
                    className={`${styles.copy} ${
                      active === i ? styles.copyOn : ""
                    }`}
                    aria-hidden={active !== i}
                  >
                    <span className={styles.stepNo}>{u.no}</span>
                    <h3 className={styles.itemTitle}>{u.title}</h3>
                    <p className={styles.itemBody}>{u.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {usps.items.map((_, i) => (
          <div
            key={i}
            className={styles.driver}
            data-idx={i}
            style={{ top: `${i * 100}vh` }}
            ref={(el) => {
              driverRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
