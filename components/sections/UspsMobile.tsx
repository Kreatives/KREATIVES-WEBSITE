"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usps } from "@/lib/site";
import styles from "./UspsMobile.module.css";

/**
 * Mobiele variant van de "Waarom ons"-sectie: een contained kaart waarvan
 * het beeld per scroll-stap van rechts mee-swipet. Alleen zichtbaar op
 * mobiel (zie .sec in UspsMobile.module.css); op desktop toont USPs.tsx de
 * originele twee-koloms layout.
 */
export default function UspsMobile() {
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
    <section className={`section--dark ${styles.sec}`}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`}>
            {usps.titleLead}{" "}
            <span className="accent accent--orange">{usps.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{usps.intro}</p>
        </div>
      </div>

      <div
        className={styles.stage}
        style={{ height: `${usps.items.length * 100}vh` }}
      >
        <div className={styles.sticky}>
          <div className={styles.slider}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {usps.items.map((u) => (
                <div key={u.no} className={styles.frame}>
                  <Image
                    src={u.image}
                    alt=""
                    fill
                    quality={90}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.scrim} aria-hidden />

            <div className={styles.foreground}>
              <div className={styles.fgInner}>
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
                      <div className={styles.copyHead}>
                        <span className={styles.stepNo}>{u.no}</span>
                        <h3 className={styles.itemTitle}>{u.title}</h3>
                      </div>
                      <p className={styles.itemBody}>{u.body}</p>
                    </div>
                  ))}
                </div>
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
