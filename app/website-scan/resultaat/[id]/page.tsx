import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScanResult from "@/components/scan/ScanResult";
import { getScanRow } from "@/lib/scan-server";
import styles from "@/components/scan/scan.module.css";

// Canonical naar de eigen resultaat-URL (niet naar /website-scan): een gedeelde
// link moet zijn eigen pagina canonicaliseren, anders wijst hij naar de flow.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Jouw website-diagnose",
    robots: { index: false, follow: false },
    alternates: { canonical: `/website-scan/resultaat/${id}` },
  };
}

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
    <div className={styles.resultPage}>
      <ScanResult
        id={row.id}
        geenWebsite={row.geen_website}
        answers={row.answers}
        report={row.report}
      />
    </div>
  );
}
