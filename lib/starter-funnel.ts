// Client-side funnel-metingen voor /starter (Meta Pixel). Elke stap:
//  - vuurt alleen als de pixel actief is (de pixel laadt pas na toestemming
//    voor marketingcookies — zie components/CookieConsent.tsx), zodat de
//    dedup-vlag nooit gezet wordt terwijl er niets is verstuurd;
//  - telt hooguit één keer per sessie via sessionStorage, dat navigatie binnen
//    hetzelfde tabblad overleeft. Zo tellen dubbelklikken én verversen niet dubbel;
//  - stuurt vanaf de pakketkeuze het gekozen pakket mee (basis/website/website-plus),
//    en nooit e-mail, telefoon, naam of adres.

import { pixelActief, trackPixel, trackPixelCustom } from "@/lib/meta-pixel";

const PAKKET_IDS = ["basis", "website", "website-plus"] as const;
export type StarterPakket = (typeof PAKKET_IDS)[number];

/** Alleen basis/website/website-plus; anders undefined (geen rare of PII-waarden). */
export function normaliseerPakket(id?: string | null): StarterPakket | undefined {
  return PAKKET_IDS.includes(id as StarterPakket)
    ? (id as StarterPakket)
    : undefined;
}

/**
 * Markeert een sleutel als "gevuurd" voor deze sessie. Geeft true terug als dat
 * al eerder gebeurd is. Valt terug op "niet blokkeren" als sessionStorage niet
 * beschikbaar is.
 */
function alGevuurd(sleutel: string): boolean {
  try {
    const k = `kreatives-funnel-${sleutel}`;
    if (window.sessionStorage.getItem(k)) return true;
    window.sessionStorage.setItem(k, "1");
    return false;
  } catch {
    return false;
  }
}

/**
 * Vuurt een funnel-event. Met `onceKey` telt de stap hooguit één keer per sessie.
 * `pakket` wordt genormaliseerd en als enige parameter meegestuurd.
 */
export function trackStarterStep(
  event: string,
  opts: { pakket?: string; onceKey?: string } = {}
): void {
  if (!pixelActief()) return;
  if (opts.onceKey && alGevuurd(opts.onceKey)) return;
  const pakket = normaliseerPakket(opts.pakket);
  trackPixelCustom(event, pakket ? { pakket } : undefined);
}

/**
 * Pakketkeuze op /starter. Vuurt StarterPackageSelected (met pakket, één keer
 * per pakket — je mag van gedachten veranderen) plus het bestaande standaard-
 * event InitiateCheckout (één keer per sessie, met waarde en valuta).
 */
export function trackPakketKeuze(pakketId: string, prijs: number): void {
  if (!pixelActief()) return;
  const pakket = normaliseerPakket(pakketId);
  if (!pakket) return;
  if (!alGevuurd(`selected-${pakket}`)) {
    trackPixelCustom("StarterPackageSelected", { pakket });
  }
  if (!alGevuurd("initiatecheckout")) {
    trackPixel("InitiateCheckout", {
      value: prijs,
      currency: "EUR",
      content_name: pakket,
    });
  }
}
