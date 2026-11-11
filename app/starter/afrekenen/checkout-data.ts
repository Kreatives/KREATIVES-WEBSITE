// Data en rekenhulp voor de checkout. Bewust zonder "use client", zodat de
// server-pagina's findPakket mogen gebruiken en de client-componenten de rest.
import { packages, type Pakket } from "../data";

export const ADDONS = [
  {
    id: "spoedstart",
    label: "Spoedstart",
    body: "Je ontwerp binnen 24 uur in plaats van vijf werkdagen.",
    price: 95,
  },
  {
    id: "teksten",
    label: "Teksten",
    body: "Ik schrijf de tekst per pagina, jij leest en keurt goed.",
    price: 295,
  },
  {
    id: "tracking",
    label: "Tracking",
    body: "GA4 en pixels ingericht, zodat je je resultaten ziet.",
    price: 195,
  },
] as const;

export type Addon = (typeof ADDONS)[number];

/** Pakket bij een id, met Premium als veilige standaard. */
export function findPakket(id?: string): Pakket {
  return packages.find((p) => p.id === id) ?? packages[1];
}

/** Bedrag als € zonder nutteloze ,00. 1790 → €1.790, 375.9 → €375,90. */
export function euro(n: number): string {
  const s = n.toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return "€" + s.replace(/,00$/, "");
}

export function computeTotals(pkg: Pakket, addonIds: string[]) {
  const pkgPrice = Number(pkg.priceNumber);
  const addons = ADDONS.filter((a) => addonIds.includes(a.id));
  const subtotal = pkgPrice + addons.reduce((s, a) => s + a.price, 0);
  const btw = Math.round(subtotal * 21) / 100;
  const total = Math.round((subtotal + btw) * 100) / 100;
  const termijn = Math.round((total / 2) * 100) / 100;
  return { pkgPrice, addons, subtotal, btw, total, termijn };
}
