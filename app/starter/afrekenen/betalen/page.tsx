import type { Metadata } from "next";
import { findPakket } from "../checkout-data";
import Checkout2 from "./Checkout2";

export const metadata: Metadata = {
  title: "Betalen",
  robots: { index: false, follow: false },
};

export default async function CheckoutStap2({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string; addons?: string }>;
}) {
  const { pakket, addons } = await searchParams;
  const addonIds = (addons ?? "").split(",").filter(Boolean);
  return <Checkout2 pakketId={findPakket(pakket).id} addonIds={addonIds} />;
}
