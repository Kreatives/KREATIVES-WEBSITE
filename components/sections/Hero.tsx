import Image from "next/image";
import { hero, marquee } from "@/lib/site";
import { Star } from "@/components/icons";
import Button from "@/components/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* Achtergrondfoto (placeholder) + verplichte donkere overlay (Fase 5) */}
      <div className={styles.bg} aria-hidden>
        <Image
          src={hero.background}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: hero.backgroundPosition }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.proof} data-reveal>
            <div className={styles.avatars} aria-hidden>
              {hero.socialProof.avatars.map((a, i) => (
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
                  <strong>{hero.socialProof.rating}</strong>{" "}
                  {hero.socialProof.label}
                </span>
              </span>
              <span className={styles.proofLabel}>
                {hero.socialProof.trust}
              </span>
            </div>
          </div>

          <h1 className={`h-hero ${styles.title}`} data-reveal>
            {hero.titleLead}
            <br />
            <span className="accent">{hero.titleAccent}</span>
          </h1>

          <p className={`lead ${styles.body}`} data-reveal>
            {hero.body}
          </p>

          <div className={styles.actions} data-reveal>
            <Button href={hero.primary.href} variant="primary">
              {hero.primary.label}
            </Button>
            <a href={hero.secondary.href} className={styles.secondaryLink}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Logo-strip op de hero (image #53), met dunne verticale lijntjes */}
      <div className={styles.logos} aria-label="Vertrouwd door ondernemers">
        {marquee.logos.map((n) => (
          <div key={n} className={styles.logoCell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${n}.png`}
              alt=""
              className={styles.logoImg}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
