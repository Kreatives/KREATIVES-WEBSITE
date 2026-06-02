import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import FaqHome from "@/components/sections/FaqHome";
import { getFaqs } from "@/lib/cms";

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

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();
  const items = faqs.map((f) => ({
    category: f.category,
    question: f.question,
    answer: f.answer,
  }));
  return (
    <>
      <RevealInit />
      <FaqHome items={items} />
    </>
  );
}
