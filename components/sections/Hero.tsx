import Image from "next/image";
import { hero } from "@/lib/site";
import Button from "@/components/Button";
import SocialProof from "@/components/SocialProof";
import HeroVideo from "./HeroVideo";
import styles from "./Hero.module.css";

export default function Hero({ data = hero }: { data?: typeof hero }) {
  return (
    <section className={styles.hero} id="top">
      {/* Achtergrondfoto (placeholder) + verplichte donkere overlay (Fase 5) */}
      <div className={styles.bg} aria-hidden>
        <Image
          src={data.background}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: data.backgroundPosition }}
        />
        <HeroVideo poster="/brand/hero-poster.webp" />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <SocialProof
            align="left"
            tone="dark"
            rating={data.socialProof.rating}
            label={data.socialProof.label}
            trust={data.socialProof.trust}
          />

          <h1 className={`h-hero ${styles.title}`} data-reveal>
            {data.titleLead}
            <br />
            <span className="accent">
              <span className={styles.underline}>{data.titleUnderline}</span>
              {data.titleAccentTail}
            </span>
          </h1>

          <p className={`lead ${styles.body}`} data-reveal>
            {data.body}
          </p>

          <div className={styles.actions} data-reveal>
            <Button href={data.contactCta.href} variant="primary">
              {data.contactCta.label}
            </Button>
            <a
              href={data.secondary.href}
              className={styles.secondaryLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {data.secondary.label}
            </a>
          </div>
          {data.ctaMicro && (
            <p className={styles.micro} data-reveal>
              {data.ctaMicro}
            </p>
          )}
        </div>
      </div>

      {/* Onderrand vloeit over in de kleur van de logo-marquee eronder */}
      <div className={styles.fade} aria-hidden />
    </section>
  );
}
