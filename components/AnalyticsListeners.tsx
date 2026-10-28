"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Vangt in één globale listener de kliks op die er voor conversie toe doen,
 * zodat we niet elke losse knop hoeven aan te raken:
 * - calendly_click  → elke "Plan een (strategie)gesprek"-CTA (Calendly)
 * - scan_cta_click  → elke link naar de website-scan (/website-scan)
 */
export default function AnalyticsListeners() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (href.includes("calendly.com")) {
        trackEvent("calendly_click", { href });
      } else if (/^\/website-scan(\/|$|\?|#)/.test(href)) {
        trackEvent("scan_cta_click", { href });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
