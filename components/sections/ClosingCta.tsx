import { closingCta } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./ClosingCta.module.css";

export default function ClosingCta({ data = closingCta, locale = "nl" }: { data?: typeof closingCta; locale?: "nl" | "en" }) {
  const maand = new Date().toLocaleString(locale === "en" ? "en-US" : "nl-NL", { month: "long" });
  return (
    <section className={`section--dark cosmos-bg ${styles.sec}`} id="contact">
      <div className="container">
        <div className={styles.inner} data-reveal>
          {data.pulse && (
            <span className={styles.pulse}>
              <span className={styles.pulseDot} aria-hidden />
              {data.pulse} {maand}.
            </span>
          )}
          <h2 className={`h2 ${styles.title}`}>
            {data.titleLead}{" "}
            <span className="accent accent--orange">
              {data.titleAccent}
            </span>
          </h2>
          <p className={styles.body}>{data.body}</p>
          <Button
            href={data.cta.href}
            variant="primary"
            className={styles.btn}
          >
            {data.cta.label}
          </Button>
          {data.ctaMicro && (
            <p className={styles.micro}>{data.ctaMicro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
