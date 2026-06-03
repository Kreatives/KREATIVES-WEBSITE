import { closingCta } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./ClosingCta.module.css";

export default function ClosingCta() {
  return (
    <section className={`section--dark cosmos-bg ${styles.sec}`} id="contact">
      <div className="container">
        <div className={styles.inner} data-reveal>
          <h2 className={`h2 ${styles.title}`}>
            {closingCta.titleLead}{" "}
            <span className="accent accent--orange">
              {closingCta.titleAccent}
            </span>
          </h2>
          <p className={styles.body}>{closingCta.body}</p>
          <Button
            href={closingCta.cta.href}
            variant="primary"
            className={styles.btn}
          >
            {closingCta.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
