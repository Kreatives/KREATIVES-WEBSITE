import type { Metadata } from "next";
import ScanResult from "@/components/scan/ScanResult";
import styles from "@/components/scan/scan.module.css";

export const metadata: Metadata = {
  title: "Jouw website-diagnose",
  robots: { index: false, follow: false },
};

// Fase 1: resultaat komt uit sessionStorage (mock). Fase 2: via [id] uit de DB.
export default function ScanResultPage() {
  return (
    <main className={styles.page}>
      <ScanResult />
    </main>
  );
}
