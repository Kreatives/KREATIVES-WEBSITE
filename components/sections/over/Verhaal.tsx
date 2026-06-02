import Image from "next/image";
import { overOnsVerhaal } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./Verhaal.module.css";

export default function Verhaal() {
  return (
    <section className={`section ${styles.sec}`} id="verhaal">
      <span className={styles.floatLeft} aria-hidden data-reveal>
        <Image
          src={overOnsVerhaal.media.left}
          alt=""
          fill
          sizes="200px"
          style={{ objectFit: "cover" }}
        />
      </span>
      <span className={styles.floatRight} aria-hidden data-reveal>
        <Image
          src={overOnsVerhaal.media.right}
          alt=""
          fill
          sizes="220px"
          style={{ objectFit: "cover" }}
        />
      </span>

      <div className="container">
        <div className={styles.stage}>
          <h2 className={styles.title} data-reveal>
            <span className={styles.titleLead}>{overOnsVerhaal.titleLead}</span>{" "}
            <span className="accent accent--orange">
              {overOnsVerhaal.titleAccent}
            </span>
          </h2>

          <div className={styles.mainMedia} data-reveal>
            <Image
              src={overOnsVerhaal.media.main}
              alt=""
              fill
              sizes="(max-width: 720px) 92vw, 640px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.copy}>
          <h3 className={styles.subheading} data-reveal>
            {overOnsVerhaal.subheading}
          </h3>
          {overOnsVerhaal.paragraphs.map((p, i) => (
            <p key={i} className={styles.p} data-reveal>
              {p}
            </p>
          ))}
          <div className={styles.actions} data-reveal>
            <Button href={overOnsVerhaal.primaryCta.href} variant="primary">
              {overOnsVerhaal.primaryCta.label}
            </Button>
            <Button href={overOnsVerhaal.cta.href} variant="ghost">
              {overOnsVerhaal.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
