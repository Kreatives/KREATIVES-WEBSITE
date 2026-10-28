import Image from "next/image";
import { hero } from "@/lib/site";
import { Star } from "@/components/icons";
import Button from "@/components/Button";
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
          <div className={styles.proof} data-reveal>
            <div className={styles.avatars} aria-hidden>
              {data.socialProof.avatars.map((a, i) => (
                <span
                  key={i}
                  className={styles.avatar}
                  style={
                    a.photo
                      ? {
                          backgroundImage: `url(${a.photo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : { background: a.color }
                  }
                >
                  {!a.photo && a.initials}
                </span>
              ))}
            </div>
            <div className={styles.proofMeta}>
              <span className={styles.proofTop}>
                <span className={styles.stars} aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span className={styles.proofRating}>
                  <strong>{data.socialProof.rating}</strong>{" "}
                  {data.socialProof.label}
                </span>
              </span>
              <span className={styles.proofLabel}>
                {data.socialProof.trust}
              </span>
            </div>
          </div>

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
