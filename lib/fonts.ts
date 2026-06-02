import { Instrument_Serif, DM_Mono } from "next/font/google";

// Instrument Serif: gebruikt voor het highlighten van losse woorden in koppen
// (de serif-italic uit Ricky's hero). Wordt in CSS ~1.15x groter gezet naast
// Articulat zodat de x-hoogte optisch matcht.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// DM Mono: eyebrow-labels boven H2 en meta/info-tekst, met ~10% tracking.
export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

// Articulat CF komt van Ricky's Adobe Typekit-kit (alleen weights 400 en 600).
// Adobe Fonts kan niet via next/font; we laden de kit via een <link> in de
// root layout en verwijzen hier alleen naar de variabele-waarde.
export const TYPEKIT_CSS = "https://use.typekit.net/brd6rwq.css";
