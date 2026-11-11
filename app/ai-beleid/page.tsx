import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { aiBeleid } from "@/lib/ai-beleid";

export const metadata: Metadata = {
  title: "AI-beleid: hoe wij AI inzetten en wat crawlers mogen",
  description:
    "Hoe KREATIVES AI inzet bij ontwerp, tekst en bouw, wat er met jouw gegevens gebeurt en hoe AI-crawlers deze site mogen gebruiken. Met llms.txt voor agents.",
  alternates: { canonical: "/ai-beleid" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI-beleid | KREATIVES",
    description:
      "Hoe wij AI inzetten, wat er met jouw gegevens gebeurt en hoe AI-crawlers deze site mogen lezen.",
    url: "/ai-beleid",
    type: "article",
  },
};

export default function AiBeleidPage() {
  return <LegalPage doc={aiBeleid} />;
}
