"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usps } from "@/lib/site";
import styles from "./USPs.module.css";

export default function USPs() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={`section--dark ${styles.sec}`} id="waarom">
      <div className={styles.grid}>
        <aside className={styles.left}>
          <div className={styles.leftInner}>
            <h2 className={`h2 ${styles.title}`}>
              {usps.titleLead}
              <br />
              <span className="accent accent--orange">
                {usps.titleAccent}
              </span>
            </h2>
            <p className={styles.intro}>{usps.intro}</p>
            <div
              className={styles.progress}
              role="progressbar"
              aria-valuenow={active + 1}
              aria-valuemin={1}
              aria-valuemax={usps.items.length}
            >
              {usps.items.map((_, i) => (
                <span
                  key={i}
                  className={i <= active ? styles.dotOn : styles.dot}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.right}>
          {usps.items.map((u, i) => (
            <div
              key={u.no}
              data-idx={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={styles.item}
            >
              <Image
                src={u.image}
                alt=""
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.itemOverlay} />
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{u.title}</h3>
                <p className={styles.itemBody}>{u.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
