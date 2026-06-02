import type { Metadata, Viewport } from "next";
import { instrumentSerif, dmMono, TYPEKIT_CSS } from "@/lib/fonts";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "KREATIVES — Maatwerk webdesign voor ambitieuze ondernemers",
    template: "%s — KREATIVES",
  },
  description: site.description,
  keywords: [
    "webdesign",
    "maatwerk website",
    "website laten maken",
    "webdesign bureau",
    "premium website",
  ],
  authors: [{ name: "KREATIVES" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.domain,
    siteName: site.name,
    title: "KREATIVES — Maatwerk webdesign voor ambitieuze ondernemers",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KREATIVES — Maatwerk webdesign",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.domain,
  email: site.email,
  areaServed: "NL",
  knowsLanguage: "nl",
  serviceType: "Webdesign en website-ontwikkeling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${instrumentSerif.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Articulat CF — Adobe Typekit (kit brd6rwq) */}
        <link rel="stylesheet" href={TYPEKIT_CSS} />
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin=""
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
          <BookCallButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
