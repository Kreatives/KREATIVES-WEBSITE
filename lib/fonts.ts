import { DM_Mono } from "next/font/google";

// DM Mono: eyebrow-labels boven H2 en meta/info-tekst, met ~10% tracking.
export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

// Forma DJR Deck komt van Ricky's Adobe Typekit-kit (weights 500 body / 700
// headlines). Adobe Fonts kan niet via next/font; we laden de kit via een
// <link> in de root layout en verwijzen hier alleen naar de variabele-waarde.
export const TYPEKIT_CSS = "https://use.typekit.net/jop8nvp.css";
