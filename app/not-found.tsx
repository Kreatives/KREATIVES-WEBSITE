import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { CALENDLY } from "@/lib/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

const POPULAIR = [
  { label: "Webdesign", href: "/diensten/webdesign" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Cases", href: "/projecten" },
  { label: "Website-scan", href: "/website-scan" },
  { label: "Kennisbank", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className={`section--dark cosmos-bg ${styles.sec}`}>
      <div className="container">
        <div className={styles.inner}>
          <span className="eyebrow">404</span>
          <h1 className={styles.title}>
            Deze pagina{" "}
            <span className="accent accent--orange">bestaat niet.</span>
          </h1>
          <p className={styles.body}>
            De pagina is verplaatst of heeft nooit bestaan. Hieronder vind je de
            plekken waar de meeste mensen naartoe gaan.
          </p>

          <ul className={styles.links}>
            {POPULAIR.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  <span>{l.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.cta}>
            <Button href={CALENDLY} variant="white">
              Plan een strategiegesprek
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
