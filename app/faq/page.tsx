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

// Verwijdert lichte Markdown-opmaak zodat FAQPage-schema schone tekst bevat.
function toPlain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*`_>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const items = faqs.map((f) => ({
    category: f.category,
    question: f.question,
    answer: f.answer,
  }));

  // FAQPage-schema → geschikt voor rich results en AI-antwoordmachines.
  const faqJsonLd =
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: toPlain(f.question),
            acceptedAnswer: {
              "@type": "Answer",
              text: toPlain(f.answer),
            },
          })),
        }
      : null;

  return (
    <>
      <RevealInit />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <FaqHome items={items} />
    </>
  );
}
