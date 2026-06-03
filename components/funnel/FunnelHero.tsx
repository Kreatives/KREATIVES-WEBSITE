import Image from "next/image";
import Button from "@/components/Button";
import styles from "./FunnelHero.module.css";

type HeroData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  background: string;
  cta?: { label: string; href: string };
};

export default function FunnelHero({ data }: { data: HeroData }) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg} aria-hidden>
        <Image
          src={data.background}
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
          {data.eyebrow}
        </span>
        <h1 className={styles.title} data-reveal>
          {data.titleLead}{" "}
          <span className="accent">{data.titleAccent}</span>
        </h1>
        <p className={styles.body} data-reveal>
          {data.body}
        </p>
        {data.cta && (
          <div className={styles.cta} data-reveal>
            <Button href={data.cta.href} variant="primary">
              {data.cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
