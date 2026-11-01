import Image from "next/image";
import { pricing } from "@/lib/site";
import { helvetica } from "@/lib/fonts";
import Button from "@/components/Button";
import styles from "./Pricing.module.css";

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 8.5 3.2 3 6.8-7" />
    </svg>
  );
}

export default function Pricing({ data = pricing }: { data?: typeof pricing }) {
  return (
    <section
      className={`section ${styles.sec} ${helvetica.variable}`}
      id="prijzen"
    >
      <div className="container">
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {data.titleLead}{" "}
            <span className={styles.titleMuted}>{data.titleAccent}</span>
          </h2>
          <p className={`lead muted ${styles.body}`} data-reveal>
            {data.body}
          </p>
        </div>

        <div className={styles.grid}>
          {data.plans.map((p) => (
            <article
              key={p.name}
              className={`${styles.card} ${
                p.featured ? styles.cardFeatured : styles.cardPlain
              }`}
              data-reveal
            >
              <Image
                src={p.icon}
                alt=""
                width={44}
                height={44}
                className={styles.cardIcon}
              />

              <div className={styles.cardHead}>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                {p.price && <p className={styles.cardPrice}>{p.price}</p>}
                {p.termijnen && (
                  <p className={styles.cardTermijnen}>{p.termijnen}</p>
                )}
              </div>

              <div className={styles.divide} aria-hidden />

              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f}>
                    <span
                      className={p.featured ? styles.tickOrange : styles.tick}
                      aria-hidden
                    >
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className={styles.cardCta}>
                <Button
                  href={p.cta.href}
                  variant={p.featured ? "primary" : "dark"}
                  className={styles.cardCtaBtn}
                >
                  {p.cta.label}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
