// Dynamische checkout-data per pakket (KREATIVES Express).
// Bedragen eenmalig, excl. gedoe: btw 21%, totaal, en de eerste termijn (helft).

export type Addon = { id: string; label: string; desc: string; price: number };

// Een regel in "Je bestelling". `plus` = de opgewaardeerde variant bij het "+"-pakket
// (dan tonen we de oude waarde gedimd met een pijl naar de nieuwe).
export type OrderItem = { text: string; plus?: string };

export type Pakket = {
  id: string;
  name: string;
  price: number;
  // De "+"-upsell-kaart (linkerkaart op de opties-pagina)
  plus: {
    name: string;
    price: number;
    diff: string;
    features: string[];
  };
  // "Ga verder met X" — subregel
  continueSub: string;
  // Rechterkolom "Je bestelling"
  order: OrderItem[];
  // Regels die er alleen bij het "+"-pakket bij komen
  plusExtra: string[];
  // Bij te bestellen extra's (met stepper)
  addons: Addon[];
};

export const PAKKETTEN: Record<string, Pakket> = {
  basis: {
    id: "basis",
    name: "Basis",
    price: 695,
    plus: {
      name: "Basis+",
      price: 895,
      diff: "€200 meer dan Basis",
      features: [
        "Eerste ontwerp binnen 24 uur in plaats van 48",
        "Drie revisierondes in plaats van één",
        "Geld terug als het ontwerp niet bevalt",
      ],
    },
    continueSub: "Eén pagina · 1 revisieronde · €695",
    order: [
      { text: "Eén pagina, op maat ontworpen" },
      { text: "Eerste ontwerp binnen 48 uur", plus: "Eerste ontwerp binnen 24 uur" },
      { text: "1 revisieronde", plus: "3 revisierondes" },
      { text: "Contactformulier en WhatsApp-knop" },
      { text: "Goed leesbaar op elke telefoon" },
      { text: "Zelf je teksten en foto's aanpassen" },
      { text: "Alles op jouw naam, geen abonnement" },
    ],
    plusExtra: ["Geld terug als het ontwerp niet bevalt"],
    addons: [
      { id: "concept", label: "Extra ontwerpconcept", desc: "Een tweede richting voor je pagina, zodat je kunt kiezen.", price: 150 },
      { id: "revisie", label: "Extra revisieronde", desc: "Nog een ronde aanpassingen na je eerste.", price: 95 },
    ],
  },
  website: {
    id: "website",
    name: "Website",
    price: 1295,
    plus: {
      name: "Website+",
      price: 1495,
      diff: "€200 meer dan Website",
      features: [
        "Eerste ontwerp binnen 24 uur in plaats van 48",
        "Drie revisierondes in plaats van twee",
        "Metingen van je bezoekers en aanvragen",
        "Geld terug als het ontwerp niet bevalt",
      ],
    },
    continueSub: "Vijf pagina's · 2 revisierondes · €1.295",
    order: [
      { text: "Vijf pagina's, op maat ontworpen" },
      { text: "Eerste ontwerp binnen 48 uur", plus: "Eerste ontwerp binnen 24 uur" },
      { text: "2 revisierondes", plus: "3 revisierondes" },
      { text: "Aanvraag- of offertepagina" },
      { text: "Ik scherp je teksten aan" },
      { text: "Subtiele animaties" },
      { text: "Alles op jouw naam, geen abonnement" },
    ],
    plusExtra: [
      "Metingen van je bezoekers en aanvragen",
      "Geld terug als het ontwerp niet bevalt",
    ],
    addons: [
      { id: "pagina", label: "Extra pagina", desc: "Een pagina erbij, naast de vijf uit je pakket.", price: 125 },
      { id: "concept", label: "Extra ontwerpconcept", desc: "Een tweede richting voor je homepage, zodat je kunt kiezen.", price: 150 },
    ],
  },
  "website-plus": {
    id: "website-plus",
    name: "Website Plus",
    price: 1795,
    plus: {
      name: "Website Plus+",
      price: 1995,
      diff: "€200 meer dan Website Plus",
      features: [
        "Eerste ontwerp binnen 24 uur in plaats van 48",
        "Een tweede ontwerpconcept erbij",
        "Geld terug als het ontwerp niet bevalt",
      ],
    },
    continueSub: "Tot acht pagina's · 3 revisierondes · €1.795",
    order: [
      { text: "Tot acht pagina's, op maat ontworpen" },
      { text: "Eerste ontwerp binnen 48 uur", plus: "Eerste ontwerp binnen 24 uur" },
      { text: "3 revisierondes" },
      { text: "Ik schrijf je teksten voor je" },
      { text: "Pagina met je projecten of nieuws" },
      { text: "Subtiele animaties" },
      { text: "30 dagen nazorg" },
      { text: "Alles op jouw naam, geen abonnement" },
    ],
    plusExtra: [
      "Een tweede ontwerpconcept erbij",
      "Geld terug als het ontwerp niet bevalt",
    ],
    addons: [
      { id: "pagina", label: "Extra pagina", desc: "Een pagina erbij, naast de acht uit je pakket.", price: 125 },
      { id: "concept", label: "Extra ontwerpconcept", desc: "Een tweede richting voor je homepage, zodat je kunt kiezen.", price: 150 },
    ],
  },
};

export function findPakket(id?: string): Pakket {
  return (id && PAKKETTEN[id]) || PAKKETTEN.website;
}

export function euro(n: number): string {
  return "€" + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function euroShort(n: number): string {
  const s = n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "€" + s.replace(/,00$/, "");
}

/** Prijs van het gekozen pakket (base of plus) + add-ons → bedragen. */
export function totals(pkg: Pakket, usePlus: boolean, counts: Record<string, number>) {
  const base = usePlus ? pkg.plus.price : pkg.price;
  const addonsTotal = pkg.addons.reduce((s, a) => s + (counts[a.id] || 0) * a.price, 0);
  const sub = base + addonsTotal;
  const btw = Math.round(sub * 21) / 100;
  const total = Math.round((sub + btw) * 100) / 100;
  const termijn = Math.round((total / 2) * 100) / 100;
  return { base, sub, btw, total, termijn };
}
