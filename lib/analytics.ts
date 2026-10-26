import { track } from "@vercel/analytics";

type Params = Record<string, string | number | boolean>;

type Gtag = (command: string, event: string, params?: Params) => void;

/**
 * Eén helper voor alle conversie-events. Stuurt elk event naar zowel GA4
 * (gtag) als Vercel Analytics, zodat we het maar op één plek hoeven aan te
 * roepen. Faalt stil als een van beide (nog) niet geladen is.
 */
export function trackEvent(name: string, params?: Params) {
  try {
    track(name, params);
  } catch {
    // Vercel Analytics nog niet geladen — negeren.
  }
  if (typeof window !== "undefined") {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") {
      gtag("event", name, params);
    }
  }
}
