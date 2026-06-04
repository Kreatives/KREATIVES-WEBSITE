import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe KREATIVES omgaat met je persoonsgegevens. We verwerken alleen gegevens uit contactformulieren, gebruiken geen cookies en houden ons aan de AVG.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
