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
    <main className={styles.page}>
      <section className={styles.intro}>
        <span className="eyebrow">{scan.name}</span>
        <h1 className={styles.introTitle}>
          Zou jouw klant op je website{" "}
          <span className="accent accent--orange">actie ondernemen?</span>
        </h1>
        <p className={styles.introBody}>
          We bekijken je homepage door de ogen van je ideale klant en geven een
          eerlijke, concrete diagnose. Geen laadsnelheid of SEO, alleen of je
          bezoeker overtuigd raakt en contact opneemt.
        </p>
      </section>

      <section className={styles.flowWrap}>
        <WebsiteScanFlow />
      </section>
    </main>
  );
}
