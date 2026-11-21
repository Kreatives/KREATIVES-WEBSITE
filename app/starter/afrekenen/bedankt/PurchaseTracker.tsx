"use client";

import { useEffect } from "react";
import {
  trackPixel,
  laadMetaPixel,
  heeftCookieToestemming,
} from "@/lib/meta-pixel";

/**
 * Vuurt het Meta Purchase-event op de bedankpagina, maar alleen bij een
 * geslaagde betaling en hooguit één keer per betaling (dedup via
 * localStorage, zodat verversen niet dubbeltelt). De pixel vuurt sowieso
 * niets als de bezoeker geen cookies heeft geaccepteerd.
 */
export default function PurchaseTracker({
  value,
  paymentId,
  pakket,
}: {
  value: number;
  paymentId?: string;
  pakket?: string;
}) {
  useEffect(() => {
    if (!Number.isFinite(value) || value <= 0) return;
    const key = paymentId ? `kreatives-purchase-${paymentId}` : null;
    try {
      if (key && window.localStorage.getItem(key)) return;
      if (key) window.localStorage.setItem(key, "1");
    } catch {
      // localStorage niet beschikbaar — dan gewoon één keer vuren.
    }
    // Deze pagina komt na een externe redirect van Mollie: de pixel is hier
    // mogelijk nog niet geladen. Heeft de bezoeker toestemming gegeven, dan
    // laden we 'm hier eerst (idempotent) zodat het Purchase-event niet
    // verloren gaat door de volgorde van effects.
    if (heeftCookieToestemming()) laadMetaPixel();
    trackPixel(
      "Purchase",
      { value, currency: "EUR", ...(pakket ? { content_name: pakket } : {}) },
      paymentId
    );
  }, [value, paymentId, pakket]);

  return null;
}
