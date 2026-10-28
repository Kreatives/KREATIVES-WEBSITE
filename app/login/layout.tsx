import type { Metadata } from "next";

// De loginpagina is een client component en kan zelf geen metadata exporteren.
export const metadata: Metadata = {
  title: "Inloggen",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
