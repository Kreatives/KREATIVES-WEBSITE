import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import { findPakket } from "../checkout-express-data";
import CheckoutOpties from "./CheckoutOpties";

export const metadata: Metadata = {
  title: "Opties",
  robots: { index: false, follow: false },
};

export default async function CheckoutStap2({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string; email?: string }>;
}) {
  const { pakket, email } = await searchParams;
  return (
    <>
      <RevealInit />
      <CheckoutOpties pakketId={findPakket(pakket).id} email={email ?? ""} />
    </>
  );
}
