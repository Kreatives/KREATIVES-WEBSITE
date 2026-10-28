import Image from "next/image";
import { overOnsVerhaal } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./Verhaal.module.css";

export default function Verhaal({ data = overOnsVerhaal }: { data?: typeof overOnsVerhaal }) {
  return (
    <section className={`section ${styles.sec}`} id="verhaal">
      <span className={styles.floatLeft} aria-hidden data-reveal>
        <Image
          src={data.media.left}
          alt=""
          fill
          quality={90}          sizes="200px"
          style={{ objectFit: "cover" }}
        />
      </span>
      <span className={styles.floatRight} aria-hidden data-reveal>
        <Image
          src={data.media.right}
          alt=""
          fill
          quality={90}          sizes="220px"
          style={{ objectFit: "cover" }}
        />
      </span>

      <div className="container">
        <div className={styles.stage}>
          <h2 className={styles.title} data-reveal>
            <span className={styles.titleLead}>{data.titleLead}</span>{" "}
            <span className="accent accent--orange">
              {data.titleAccent}
            </span>
          </h2>

          <div className={styles.mainMedia} data-reveal>
            <Image
              src={data.media.main}
              alt=""
              fill
              quality={90}              sizes="(max-width: 720px) 92vw, 640px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.copy}>
          <h3 className={styles.subheading} data-reveal>
            {data.subheading}
          </h3>
          {data.paragraphs.map((p, i) => (
            <p key={i} className={styles.p} data-reveal>
              {p}
            </p>
          ))}
          <div className={styles.actions} data-reveal>
            <Button href={data.primaryCta.href} variant="primary">
              {data.primaryCta.label}
            </Button>
            <Button href={data.cta.href} variant="ghost">
              {data.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
