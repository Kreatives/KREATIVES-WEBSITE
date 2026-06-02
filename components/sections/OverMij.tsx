import Image from "next/image";
import { over } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./OverMij.module.css";

export default function OverMij() {
  return (
    <section className="section" id="over">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.portrait}>
            {over.portrait ? (
              <Image
                src={over.portrait}
                alt="Ricky van KREATIVES"
                fill
                sizes="(max-width: 880px) 80vw, 30vw"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            ) : (
              <div className={styles.portraitPh} aria-hidden>
                <span>Portretfoto</span>
              </div>
            )}
          </div>

          <div className={styles.body}>
            <span className="eyebrow">{over.eyebrow}</span>
            <h2 className={`h2 ${styles.title}`}>
              {over.titleLead}{" "}
              <span className="accent accent--orange">{over.titleAccent}</span>
            </h2>
            <p className={styles.text}>{over.body}</p>
            <Button href={over.cta.href} variant="primary" className={styles.btn}>
              {over.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
