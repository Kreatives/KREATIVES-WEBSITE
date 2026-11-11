import type { Metadata } from "next";
import { findPakket } from "./checkout-data";
import Checkout1 from "./Checkout1";

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
  return <Checkout1 pakketId={findPakket(pakket).id} />;
}
