import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScanResult from "@/components/scan/ScanResult";
import { getScanRow } from "@/lib/scan-server";
import styles from "@/components/scan/scan.module.css";

export const metadata: Metadata = {
  title: "Jouw website-diagnose",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ScanResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getScanRow(id);
  if (!row) notFound();

  return (
    <main className={styles.page}>
      <ScanResult
        id={row.id}
        geenWebsite={row.geen_website}
        answers={row.answers}
        report={row.report}
      />
    </main>
  );
}
