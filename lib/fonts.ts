import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

// DM Mono: eyebrow-labels boven H2 en meta/info-tekst, met ~10% tracking.
export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

// Helvetica Neue zelf-gehost. Gedeeld door /prijzen en de homepage-pakketten,
// zodat het font maar één keer geladen wordt. Koppen blijven forma (merkfont).
export const helvetica = localFont({
  src: [
    { path: "../app/fonts/HelveticaNeue-Roman.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/HelveticaNeue-Medium.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/HelveticaNeue-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

// Forma DJR Deck komt van Ricky's Adobe Typekit-kit (weights 500 body / 700
// headlines). Adobe Fonts kan niet via next/font; we laden de kit via een
// <link> in de root layout en verwijzen hier alleen naar de variabele-waarde.
export const TYPEKIT_CSS = "https://use.typekit.net/jop8nvp.css";
