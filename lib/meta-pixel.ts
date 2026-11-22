// Meta Pixel (Facebook Pixel). De pixel laadt PAS nadat de bezoeker de
// cookies heeft geaccepteerd — zie components/CookieConsent.tsx. De Pixel ID
// staat hier als default (net als het GA-ID), maar is te overschrijven met
// NEXT_PUBLIC_META_PIXEL_ID zonder de code aan te raken.

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "971510185251202";

// localStorage-sleutel waarin de cookiekeuze ("accepted" | "declined") staat.
export const CONSENT_KEY = "kreatives-cookie-consent";

type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | null {
  if (typeof window === "undefined") return null;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === "function" ? fbq : null;
}

/** True zodra de pixel geladen is — dus alleen na toestemming. */
export function pixelActief(): boolean {
  return getFbq() !== null;
}

export function heeftCookieToestemming(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Injecteert de Meta Pixel basiscode (eenmalig) en vuurt PageView. Doet niets
 * op de server, zonder Pixel ID, of als de pixel al geladen is.
 */
export function laadMetaPixel(): void {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  if (getFbq()) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const fbq = getFbq();
  if (!fbq) return;
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * Vuurt een Meta standard event, maar alleen als de pixel geladen is (dus
 * alleen na toestemming). eventId maakt deduplicatie mogelijk als er later
 * server-side (Conversions API) bijkomt.
 */
export function trackPixel(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string
): void {
  vuur("track", event, params, eventId);
}

/**
 * Zoals trackPixel, maar voor eigen (niet-standaard) events. Meta wil deze via
 * "trackCustom" binnenkrijgen, anders ziet het ze als een onbekend standaard-event.
 */
export function trackPixelCustom(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string
): void {
  vuur("trackCustom", event, params, eventId);
}

function vuur(
  methode: "track" | "trackCustom",
  event: string,
  params?: Record<string, unknown>,
  eventId?: string
): void {
  const fbq = getFbq();
  if (!fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  if (params && opts) fbq(methode, event, params, opts);
  else if (params) fbq(methode, event, params);
  else fbq(methode, event);
}
