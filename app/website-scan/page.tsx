import type { Metadata } from "next";
import WebsiteScanFlow from "@/components/scan/WebsiteScanFlow";
import { scan } from "@/lib/scan";
import styles from "@/components/scan/scan.module.css";

export const metadata: Metadata = {
  // Title volgt het implementatiepakket; de "| KREATIVES" komt uit de template.
  title: "Website-scan: matcht je site nog bij je bedrijf?",
  // Meta onder 155 tekens en kloppend met de live AI-scan (geen "twaalf vragen",
  // want dat is de losse quiz die niet geplaatst is).
  description:
    "Laat je homepage analyseren door de ogen van je ideale klant. In een paar minuten zie je waar bezoekers afhaken en waarom. Voor bedrijven met een team.",
  alternates: { canonical: "/website-scan" },
};

export default function WebsiteScanPage() {
  return (
    <main className={styles.scanPage}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{scan.name}</span>
          <h1 className={styles.heroKop}>
            Zou jouw klant op je website{" "}
            <span className={styles.heroAccent}>actie ondernemen?</span>
          </h1>
          <p className={styles.heroLead}>
            In een paar minuten bekijk ik je homepage door de ogen van je ideale
            klant en geef ik een eerlijke, concrete diagnose. Geen laadsnelheid
            of SEO, alleen of je bezoeker overtuigd raakt en contact opneemt.
          </p>
        </div>
      </section>

      <section className={styles.flowWrap}>
        <WebsiteScanFlow />
      </section>
    </main>
  );
}
