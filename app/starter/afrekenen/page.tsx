import type { Metadata } from "next";
import { findPakket } from "./checkout-express-data";
import CheckoutEmail from "./CheckoutEmail";

export const metadata: Metadata = {
  title: "Afrekenen",
  robots: { index: false, follow: false },
};

export default async function CheckoutStap1({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string }>;
}) {
  const { pakket } = await searchParams;
  return <CheckoutEmail pakketId={findPakket(pakket).id} />;
}
