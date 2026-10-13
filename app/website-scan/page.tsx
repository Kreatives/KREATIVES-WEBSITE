import type { Metadata } from "next";
import WebsiteScanFlow from "@/components/scan/WebsiteScanFlow";
import { scan } from "@/lib/scan";
import styles from "@/components/scan/scan.module.css";

export const metadata: Metadata = {
  title: "Gratis website-scan",
  description:
    "Laat je website in een paar minuten analyseren op overtuiging: zou je doelgroep hier actie ondernemen, en zo niet, waarom niet? Geen techniek, alleen resultaat.",
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
