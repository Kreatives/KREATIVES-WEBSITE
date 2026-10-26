"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Vangt klikken op Calendly-links (de boekings-CTA's door de hele site) in één
 * globale listener op, zodat we niet elke losse knop hoeven aan te raken.
 */
export default function AnalyticsListeners() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (href.includes("calendly.com")) {
        track("calendly_click", { href });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
