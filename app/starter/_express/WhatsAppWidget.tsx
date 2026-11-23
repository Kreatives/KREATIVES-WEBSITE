"use client";

import { useEffect, useState } from "react";
import styles from "./WhatsAppWidget.module.css";

const WA_HREF =
  "https://wa.me/31613066250?text=" +
  encodeURIComponent("Hoi Ricky, ik heb een vraag over de pakketten.");

/**
 * Zwevende WhatsApp-knop rechtsonder op /starter. Standaard een ronde knop in
 * de brandkleur; op hover/focus groeit hij soepel uit tot "Stuur een appje
 * eerst". Eén keer per sessie klapt hij vanzelf even open ("peek"), zodat ook
 * bezoekers zonder muis zien dat er tekst in zit. De hele knop is één link, dus
 * een tik gaat altijd naar WhatsApp.
 */
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let gepiekt = false;
    try {
      gepiekt = window.sessionStorage.getItem("kreatives-wa-peeked") === "1";
    } catch {
      // storage niet beschikbaar — dan desnoods elke keer peeken
    }
    if (reduce || gepiekt) return;

    const open1 = window.setTimeout(() => setOpen(true), 1200);
    const dicht = window.setTimeout(() => setOpen(false), 4000);
    try {
      window.sessionStorage.setItem("kreatives-wa-peeked", "1");
    } catch {
      // niets op te slaan — geen probleem
    }
    return () => {
      window.clearTimeout(open1);
      window.clearTimeout(dicht);
    };
  }, []);

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      data-open={open ? "true" : undefined}
      aria-label="Stuur een appje eerst via WhatsApp"
    >
      <span className={styles.icon} aria-hidden>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23zm-3.2 4.4c-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.21.93 2.36.11.15 1.6 2.56 3.95 3.49.56.24 1 .38 1.33.49.56.18 1.07.15 1.47.09.45-.07 1.38-.56 1.57-1.11.19-.55.19-1.02.14-1.11-.06-.1-.21-.15-.44-.27-.23-.11-1.38-.68-1.59-.76-.21-.08-.37-.11-.52.12-.15.22-.59.76-.73.91-.13.16-.27.18-.5.06-.23-.12-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.29-1.6-.13-.23-.01-.35.1-.47.1-.1.23-.27.34-.4.11-.14.15-.23.23-.39.08-.15.04-.29-.02-.4-.06-.12-.52-1.27-.72-1.73-.19-.46-.38-.4-.52-.4z" />
        </svg>
      </span>
      <span className={styles.label}>Stuur een appje eerst</span>
    </a>
  );
}
