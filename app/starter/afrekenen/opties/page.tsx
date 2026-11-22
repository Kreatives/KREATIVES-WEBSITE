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
  searchParams: Promise<{ pakket?: string }>;
}) {
  const { pakket } = await searchParams;
  // De e-mail komt niet meer via de URL binnen (geen PII in de URL), maar uit
  // sessionStorage — CheckoutOpties leest 'm client-side om voor te vullen.
  return (
    <>
      <RevealInit />
      <CheckoutOpties pakketId={findPakket(pakket).id} />
    </>
  );
}
