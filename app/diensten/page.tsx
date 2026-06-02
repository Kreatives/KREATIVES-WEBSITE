import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/RevealInit";
import { dienstenOverzicht } from "@/lib/site";
import { Arrow } from "@/components/icons";
import styles from "./diensten.module.css";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Maatwerk webdesign en AI-oplossingen van KREATIVES. Twee diensten die elkaar versterken: websites die kloppen met je merk en AI die werk uit handen neemt.",
  alternates: { canonical: "/diensten" },
  openGraph: {
    title: "Diensten — KREATIVES",
    description:
      "Maatwerk webdesign en AI-oplossingen die elkaar versterken.",
    url: "/diensten",
  },
};

export default function DienstenPage() {
  return (
    <>
      <RevealInit />
      <section className={`section ${styles.sec}`} id="top">
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow" data-reveal>
              {dienstenOverzicht.eyebrow}
            </span>
            <h1 className={`h2 ${styles.title}`} data-reveal>
              {dienstenOverzicht.titleLead}{" "}
              <span className="accent accent--orange">
                {dienstenOverzicht.titleAccent}
              </span>
            </h1>
            <p className={`lead muted ${styles.body}`} data-reveal>
              {dienstenOverzicht.body}
            </p>
          </div>

          <div className={styles.grid}>
            {dienstenOverzicht.cards.map((c) => (
              <Link
                key={c.slug}
                href={`/diensten/${c.slug}`}
                className={styles.card}
                data-reveal
              >
                <h2 className={styles.cardTitle}>{c.title}</h2>
                <p className={styles.cardBody}>{c.body}</p>
                <span className={styles.cardLink}>
                  Bekijk dienst
                  <span className={styles.cardIco} aria-hidden>
                    <Arrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
