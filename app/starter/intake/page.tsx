import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";
import { type Pakket } from "./questions";

export const metadata: Metadata = {
  title: "Intake — KREATIVES Express",
  robots: { index: false, follow: false },
};

const VALID: Pakket[] = ["basis", "website", "website-plus"];

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string; email?: string }>;
}) {
  const sp = await searchParams;
  const pakket = VALID.includes(sp.pakket as Pakket) ? (sp.pakket as Pakket) : undefined;
  const email = typeof sp.email === "string" ? sp.email : undefined;

  return <IntakeForm pakket={pakket} email={email} />;
}
