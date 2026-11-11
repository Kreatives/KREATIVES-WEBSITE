import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import RevealInit from "@/components/RevealInit";
import Topbar from "./_express/Topbar";
import Hero from "./_express/Hero";
import WatJeKrijgt from "./_express/WatJeKrijgt";
import DrieManieren from "./_express/DrieManieren";
import MijnWerk from "./_express/MijnWerk";
import VanJou from "./_express/VanJou";
import Pakketten from "./_express/Pakketten";
import Beloftes from "./_express/Beloftes";
import Werkwijze from "./_express/Werkwijze";
import Reviews from "./_express/Reviews";
import OverRicky from "./_express/OverRicky";
import KiesMens from "./_express/KiesMens";
import FaqExpress from "./_express/FaqExpress";
import Vergelijking from "./_express/Vergelijking";
import Footer from "@/components/Footer";
import styles from "./_express/express.module.css";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Een website vanaf €695, binnen 5 werkdagen",
  description:
    "KREATIVES Express: een website die je serieus neemt. Door een mens ontworpen, eerste ontwerp binnen 48 uur, vanaf €695. In twee termijnen te betalen en alles komt op jouw naam te staan.",
  alternates: { canonical: "/starter" },
  openGraph: {
    title: "Een website vanaf €695 | KREATIVES",
    description:
      "Door een mens ontworpen. Eerste ontwerp binnen 48 uur, alles komt op jouw naam te staan.",
    url: "/starter",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Een website vanaf €695 | KREATIVES",
    description:
      "Door een mens ontworpen. Eerste ontwerp binnen 48 uur, alles komt op jouw naam te staan.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function StarterPage() {
  return (
    <>
      <RevealInit />
      <main className={styles.page}>
        <Topbar />
        <Hero />
        <WatJeKrijgt />
        <DrieManieren />
        <MijnWerk />
        <VanJou />
        <Pakketten />
        <Beloftes />
        <Werkwijze />
        <Reviews />
        <OverRicky />
        <KiesMens />
        <FaqExpress />
        <Vergelijking />
      </main>
      <Footer />
    </>
  );
}
