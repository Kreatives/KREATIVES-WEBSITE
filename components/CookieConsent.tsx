"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_KEY, laadMetaPixel } from "@/lib/meta-pixel";
import styles from "./CookieConsent.module.css";

/**
 * Cookiebanner. De Meta Pixel laadt pas nadat de bezoeker hier op
 * "Accepteren" klikt. Bij een eerder akkoord (opgeslagen in localStorage)
 * laadt de pixel meteen en blijft de banner weg.
 */
export default function CookieConsent() {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    let keuze: string | null = null;
    try {
      keuze = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // localStorage niet beschikbaar — toon de banner.
    }
    if (keuze === "accepted") {
      laadMetaPixel();
    } else if (keuze !== "declined") {
      setZichtbaar(true);
    }
  }, []);

  const kies = (keuze: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, keuze);
    } catch {
      // Niets opslaan kan — keuze geldt dan alleen voor deze sessie.
    }
    setZichtbaar(false);
    if (keuze === "accepted") laadMetaPixel();
  };

  if (!zichtbaar) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-label="Cookies"
      aria-live="polite"
    >
      <div className={styles.inner}>
        <p className={styles.tekst}>
          We plaatsen alleen marketingcookies (de Meta Pixel) als je daarmee
          akkoord gaat, zodat we onze advertenties kunnen meten. Meer hierover
          lees je in ons{" "}
          <Link href="/privacy" className={styles.link}>
            privacybeleid
          </Link>
          .
        </p>
        <div className={styles.acties}>
          <button
            type="button"
            className={styles.weiger}
            onClick={() => kies("declined")}
          >
            Weigeren
          </button>
          <button
            type="button"
            className={styles.accept}
            onClick={() => kies("accepted")}
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
