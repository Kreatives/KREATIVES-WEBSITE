"use client";

import { useEffect } from "react";
import Image from "next/image";
import { comingSoon } from "@/lib/site";
import { Arrow } from "@/components/icons";
import Logo from "@/components/Logo";
import styles from "./ComingSoon.module.css";

export default function ComingSoon() {
  // Voorkom scrollen zodat de screen het hele scherm vult (nav/footer eronder).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <section className={styles.screen}>
      <div className={styles.bg} aria-hidden>
        <Image
          src={comingSoon.background}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden />
          {comingSoon.status}
        </span>

        <Logo className={styles.logo} />

        <p className={styles.subtitle}>{comingSoon.subtitle}</p>

        <div className={styles.links}>
          {comingSoon.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                href={l.href}
                className={`${styles.link} ${
                  l.primary ? styles.linkPrimary : ""
                }`}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{l.label}</span>
                  <span className={styles.linkSub}>{l.sub}</span>
                </span>
                <span className={styles.linkIco} aria-hidden>
                  <Arrow />
                </span>
              </a>
            );
          })}
        </div>

        <span className={styles.footnote}>
          © {new Date().getFullYear()} KREATIVES
        </span>
      </div>
    </section>
  );
}
