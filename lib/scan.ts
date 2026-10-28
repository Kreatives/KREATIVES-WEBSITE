// Website-scan: types, stap-opties en de gewogen totaalscore. De analyse zelf
// draait server-side in lib/scan-server.ts (Claude + screenshots).

export const scan = {
  name: "KREATIVES Website Scan",
  route: "/website-scan",
};

// Aparte boekingslink voor de website-analyse call (resultaatpagina + foutstatus).
export const SCAN_BOOKING = "https://calendly.com/info-jtw/website-analyse";

export type Branche =
  | "Horeca & food"
  | "Coach of personal brand"
  | "Dienstverlening"
  | "Webshop"
  | "Anders";

export const brancheOpties: { value: Branche; label: string }[] = [
  { value: "Horeca & food", label: "Horeca & food" },
  { value: "Coach of personal brand", label: "Coach of personal brand" },
  {
    value: "Dienstverlening",
    label: "Dienstverlening (installatie, bouw, schoonmaak)",
  },
  { value: "Webshop", label: "Webshop" },
  { value: "Anders", label: "Anders" },
];

export const doelOpties = [
  "Meer aanvragen of offertes",
  "Meer boekingen of afspraken",
  "Meer online verkoop",
  "Een sterker en professioneler merk",
] as const;

export const timingOpties = [
  "Zo snel mogelijk",
  "Binnen 3 maanden",
  "Ik oriënteer me nog",
] as const;

export const budgetOpties = [
  "Onder €1.500",
  "€1.500 – €3.500",
  "€3.500 – €7.500",
  "€7.500 of meer",
  "Weet ik nog niet",
] as const;

// De checks die tijdens de analyse één voor één worden afgevinkt.
export const scanChecks = [
  "Je website bekijken als je klant",
  "Je doelgroep in kaart brengen",
  "De opbouw van boven naar beneden lezen",
  "Zoeken naar bewijs en vertrouwen",
  "Checken wat de bezoeker moet doen",
  "Je branding naast je doelgroep leggen",
];

export type ScanAnswers = {
  url: string;
  geenWebsite: boolean;
  branche: Branche | "";
  brancheAnders: string;
  idealeKlant: string;
  doel: string[]; // meerdere doelen mogelijk
  timing: string;
  budget: string;
};

export const emptyAnswers: ScanAnswers = {
  url: "",
  geenWebsite: false,
  branche: "",
  brancheAnders: "",
  idealeKlant: "",
  doel: [],
  timing: "",
  budget: "",
};

// ---------- Rapport-schema ----------

export type Verdict = "ja" | "twijfelachtig" | "nee";

export type ScanCategorie = {
  naam: string;
  score: number; // 0-10
  observatie: string;
  waaromHetUitmaakt: string;
  verbetering: string;
};

export type WalkthroughStap = {
  sectie: string;
  watDeKlantDenkt: string;
  blijftOfHaaktAf: "blijft" | "twijfelt" | "haakt af";
};

export type ScanReport = {
  domein: string;
  eindoordeel: { zouActieOndernemen: Verdict; uitleg: string };
  doelgroep: {
    opgegeven: string;
    watDeSiteUitstraalt: string;
    match: "goed" | "deels" | "slecht";
    toelichting: string;
  };
  doorDeOgenVanJeKlant: WalkthroughStap[];
  categorieen: ScanCategorie[];
  ontbrekendeElementen: string[];
  voorgesteldeOpbouw: string[];
  topPijnpunten: { titel: string; uitleg: string; zelfOplossen: string }[];
  watGoedGaat: string[];
  nieuweKop: {
    huidigeKop: string;
    voorgesteldeKop: string;
    voorgesteldeSubkop: string;
  };
  // Afgeleide totaalscore (0-100), in code berekend, niet door de AI.
  totaalscore: number;
};

// Gewogen totaalscore (0-100). Volgorde categorieën = gewichten hieronder.
const WEGING = [0.2, 0.2, 0.15, 0.2, 0.15, 0.1];

export function berekenTotaalscore(categorieen: ScanCategorie[]): number {
  const som = categorieen.reduce(
    (acc, c, i) => acc + c.score * (WEGING[i] ?? 0),
    0
  );
  return Math.round(som * 10); // 0-10 gewogen → 0-100
}
