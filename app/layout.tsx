import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsListeners from "@/components/AnalyticsListeners";
import { dmMono, helvetica, TYPEKIT_CSS } from "@/lib/fonts";
import { site, footer } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Webdesign & Branding uit Arnhem | KREATIVES",
    template: "%s | KREATIVES",
  },
  description: site.description,
  keywords: [
    "webdesign Arnhem",
    "webdesignbureau Arnhem",
    "website laten maken Arnhem",
    "webdesign",
    "maatwerk website",
    "branding",
    "website laten maken",
  ],
  authors: [{ name: "KREATIVES" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.domain,
    siteName: site.name,
    title: "Webdesign & Branding uit Arnhem | KREATIVES",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Webdesign & Branding uit Arnhem | KREATIVES",
    description: site.description,
    images: [`${site.domain}/twitter-image.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "light",
};

// Google Analytics 4. Alleen in productie laden, zodat lokale en preview-
// bezoeken de statistieken niet vervuilen.
const GA_ID = "G-L33R5LCKY7";
const gaEnabled = process.env.NODE_ENV === "production";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.domain}/#organization`,
  name: site.name,
  alternateName: "KREATIVES Webdesign",
  description: site.description,
  url: site.domain,
  email: site.email,
  telephone: "+31613066250",
  image: `${site.domain}/opengraph-image.png`,
  logo: `${site.domain}/opengraph-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hortensialaan 1-a",
    postalCode: "6851 TB",
    addressLocality: "Huissen",
    addressRegion: "Gelderland",
    addressCountry: "NL",
  },
  areaServed: [
    { "@type": "City", name: "Arnhem" },
    { "@type": "City", name: "Nijmegen" },
    { "@type": "City", name: "Apeldoorn" },
    { "@type": "City", name: "Utrecht" },
    { "@type": "City", name: "Rotterdam" },
    { "@type": "City", name: "Amsterdam" },
    { "@type": "Country", name: "Nederland" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.9355,
    longitude: 5.9056,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "17:00",
  },
  knowsLanguage: "nl",
  serviceType: "Webdesign, website-ontwikkeling en branding",
  priceRange: "€1499 - €8945",
  // Openbaar prijsaanbod in het schema zelf. LLM's en rich results pakken dit
  // eerder op dan een bedrag dat alleen in lopende tekst staat.
  makesOffer: [
    {
      "@type": "Offer",
      name: "Landing",
      description:
        "Eén landingspagina met copywriting, ontwerp en bouw. Twee weken doorlooptijd.",
      price: "1499",
      priceCurrency: "EUR",
      url: `${site.domain}/prijzen`,
    },
    {
      "@type": "Offer",
      name: "Herbouw",
      description:
        "Volledige site tot tien pagina's met strategie, copywriting en SEO-basis. Vier weken doorlooptijd.",
      price: "3995",
      priceCurrency: "EUR",
      url: `${site.domain}/prijzen`,
    },
    {
      "@type": "Offer",
      name: "Signatuur",
      description:
        "Site tot vijftien pagina's plus merk, brandbook en fotodag op locatie. Zes weken doorlooptijd.",
      price: "8945",
      priceCurrency: "EUR",
      url: `${site.domain}/prijzen`,
    },
  ],
  founder: {
    "@type": "Person",
    name: "Ricky Kai",
    sameAs: "https://www.linkedin.com/in/ricky-kai/",
  },
  hasMap: "https://share.google/OLE4MAebPLwhoCjU5",
  // sameAs is de identiteitsbevestiging die LLM's en knowledge graphs
  // gebruiken om een merk aan externe bronnen te koppelen. Alleen profielen
  // die daadwerkelijk bestaan.
  sameAs: [
    ...footer.social.map((s) => s.href),
    "https://share.google/OLE4MAebPLwhoCjU5",
    "https://www.kvk.nl/zoeken/?source=web&q=kreatives",
    "https://nl.trustpilot.com/review/kreatives.nl",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";
  const bare =
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/starter");
  // Engelse variant op /en: schakelt de taal van <html>, de nav en de footer om.
  const locale: "nl" | "en" = pathname.startsWith("/en") ? "en" : "nl";

  return (
    <html
      lang={locale}
      className={`${dmMono.variable} ${helvetica.variable}`}
    >
      <head>
        {/* Forma DJR Deck — Adobe Typekit (kit jop8nvp) */}
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
        {gaEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body>
        {bare ? (
          children
        ) : (
          <SmoothScroll>
            <Nav locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
            <BookCallButton />
          </SmoothScroll>
        )}
        <Analytics />
        <AnalyticsListeners />
      </body>
    </html>
  );
}
