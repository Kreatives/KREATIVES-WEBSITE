import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import FaqHome from "@/components/sections/FaqHome";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoord op de meest gestelde vragen over werken met KREATIVES: proces, prijzen, techniek en meer. Filter op onderwerp.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Veelgestelde vragen — KREATIVES",
    description:
      "Antwoord op de meest gestelde vragen over proces, prijzen en techniek.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <RevealInit />
      <FaqHome />
    </>
  );
}
