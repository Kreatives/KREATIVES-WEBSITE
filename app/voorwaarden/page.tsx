import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { termsConditions } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden die van toepassing zijn op offertes, opdrachten en overeenkomsten met KREATIVES.",
  alternates: { canonical: "/voorwaarden" },
  robots: { index: true, follow: true },
};

export default function VoorwaardenPage() {
  return <LegalPage doc={termsConditions} />;
}
