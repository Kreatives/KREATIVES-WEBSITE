import { pricing } from "@/lib/site";
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

export default function Pricing() {
  const maand = new Date().toLocaleString("nl-NL", { month: "long" });
  return (
    <section className={`section ${styles.sec}`} id="prijzen">
      <div className="container">
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`} data-reveal>
            {pricing.titleLead}{" "}
            <span className={styles.titleMuted}>{pricing.titleAccent}</span>
          </h2>
          <p className={`lead muted ${styles.body}`} data-reveal>
            {pricing.body}
          </p>
          {pricing.pulse && (
            <span className={styles.pulse} data-reveal>
              <span className={styles.pulseDot} aria-hidden />
              {pricing.pulse} {maand}.
            </span>
          )}
        </div>

        <div className={styles.grid}>
          {pricing.plans.map((p) => (
            <article
              key={p.name}
              className={`${styles.card} ${
                p.featured ? styles.cardFeatured : styles.cardPlain
              }`}
              data-reveal
            >
              <div className={styles.cardHead}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardName}>{p.name}</h3>
                  {p.tag && <span className={styles.cardTag}>{p.tag}</span>}
                </div>
                <p className={styles.cardBody}>{p.body}</p>
              </div>

              <div className={styles.cardCta}>
                <Button
                  href={p.cta.href}
                  variant={p.featured ? "primary" : "dark"}
                >
                  {p.cta.label}
                </Button>
              </div>

              <div className={styles.divide} aria-hidden />

              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f}>
                    <span className={styles.tick} aria-hidden>
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
