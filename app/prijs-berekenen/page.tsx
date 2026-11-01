import type { Metadata } from "next";
import RevealInit from "@/components/RevealInit";
import Calculator from "./Calculator";
import styles from "./calculator.module.css";

export const metadata: Metadata = {
  title: "Bereken de investering van je website",
  description:
    "Reken zelf uit wat je website of webshop kost. Kies type, aantal pagina's en opties, en zie direct een indicatie van de vaste prijs.",
  alternates: { canonical: "/prijs-berekenen" },
};

export default function PrijsBerekenenPage() {
  return (
    <>
      <RevealInit />
      <section className={`section ${styles.sec}`}>
        <div className="container">
          <div className={styles.hero}>
            <h1 className={`h-hero ${styles.heroTitle}`} data-reveal>
              Bereken{" "}
              <span className="accent accent--orange">de investering</span> van
              je website.
            </h1>
            <p className={styles.heroLead} data-reveal>
              Kies wat je nodig hebt. Je ziet meteen een indicatie van de
              bouwprijs en wat je het eerste jaar kwijt bent, met hosting en
              onderhoud erbij. Alle bedragen zijn exclusief btw.
            </p>
          </div>

          <Calculator />
        </div>
      </section>
    </>
  );
}
