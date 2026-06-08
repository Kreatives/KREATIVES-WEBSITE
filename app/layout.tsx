import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { instrumentSerif, dmMono, TYPEKIT_CSS } from "@/lib/fonts";
import { site, footer } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import RedesignWizard from "@/components/RedesignWizard";
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
    addressLocality: "Arnhem",
    addressRegion: "Gelderland",
    addressCountry: "NL",
  },
  areaServed: [
    { "@type": "City", name: "Arnhem" },
    { "@type": "Country", name: "Nederland" },
  ],
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
  founder: { "@type": "Person", name: "Ricky" },
  hasMap: "https://share.google/OLE4MAebPLwhoCjU5",
  sameAs: [
    ...footer.social.map((s) => s.href),
    "https://share.google/OLE4MAebPLwhoCjU5",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";
  const bare = pathname.startsWith("/login") || pathname.startsWith("/admin");

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
        {bare ? (
          children
        ) : (
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
            <BookCallButton />
            <RedesignWizard />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
