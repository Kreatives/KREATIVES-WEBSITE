import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Klaar voor je nieuwe site? Vertel kort wat je in gedachten hebt. Binnen één werkdag hoor je van ons terug met een eerste reactie en concrete vervolgstappen.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KREATIVES",
    description:
      "Vertel kort wat je in gedachten hebt. Binnen één werkdag hoor je van ons terug.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <RevealInit />
      <Contact />
    </>
  );
}
