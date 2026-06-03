"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BookCallButton.module.css";

const CALENDLY_URL = "https://calendly.com/info-jtw/gratis-adviesgesprek-v2";
const WHATSAPP_URL = "https://wa.me/31613066250";
const EMAIL = "info@kreatives.nl";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={styles.optSvg}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-3.2 4.43c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.55 2.46 3.83 3.34 1.9.74 2.28.59 2.69.55.41-.04 1.32-.54 1.51-1.06.19-.52.19-.96.13-1.06-.06-.09-.2-.15-.43-.26-.22-.11-1.32-.65-1.52-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.78-1.1-.66-.59-1.1-1.31-1.23-1.53-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.68-1.66-.18-.43-.36-.37-.5-.38h-.42Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden className={styles.optSvg}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden className={styles.optSvg}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

const OPTIONS = [
  {
    label: "WhatsApp",
    sub: "Stuur een berichtje",
    href: WHATSAPP_URL,
    external: true,
    icon: <WhatsappIcon />,
  },
  {
    label: "E-mail",
    sub: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    icon: <MailIcon />,
  },
  {
    label: "Plan een gesprek",
    sub: "Gratis & vrijblijvend",
    href: CALENDLY_URL,
    external: true,
    icon: <CalendarIcon />,
  },
];

export default function BookCallButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={ref}>
      <div
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        role="menu"
        aria-hidden={!open}
      >
        {OPTIONS.map((o, i) => (
          <a
            key={o.label}
            href={o.href}
            target={o.external ? "_blank" : undefined}
            rel={o.external ? "noopener noreferrer" : undefined}
            className={styles.option}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${0.04 * (OPTIONS.length - i)}s` : "0s" }}
            onClick={() => setOpen(false)}
          >
            <span className={styles.optIcon} aria-hidden>
              {o.icon}
            </span>
            <span className={styles.optText}>
              <span className={styles.optLabel}>{o.label}</span>
              <span className={styles.optSub}>{o.sub}</span>
            </span>
          </a>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-label="Contactopties openen"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.avatar} aria-hidden>
          <Image
            src="/team/dylan.webp"
            alt=""
            fill
            sizes="56px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </span>
        <span className={styles.text}>
          <span className={styles.title}>Plan een gesprek</span>
          <span className={styles.sub}>Gratis &amp; vrijblijvend</span>
        </span>
        <span
          className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
          aria-hidden
        >
          <svg viewBox="0 0 16 16" fill="none" className={styles.svg}>
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
