import Image from "next/image";
import { overOnsHero } from "@/lib/site";
import styles from "./HeroOver.module.css";

export default function HeroOver() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg} aria-hidden>
        <Image
          src={overOnsHero.background}
          alt=""
          fill
          quality={90}          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <span className={`eyebrow ${styles.eyebrow}`} data-reveal>
          {overOnsHero.eyebrow}
        </span>

        <h1 className={styles.title} data-reveal>
          {overOnsHero.titleLead}{" "}
          <span className="accent">{overOnsHero.titleAccent}</span>
        </h1>

        <p className={styles.body} data-reveal>
          {overOnsHero.body}
        </p>
      </div>
    </section>
  );
}
