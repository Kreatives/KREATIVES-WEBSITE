import Image from "next/image";
import Button from "@/components/Button";
import { Star } from "@/components/icons";
import styles from "./starters.module.css";
import { heroQuote } from "./data";

const KEUZES = [
  { label: "Bekijk wat het kost", href: "#pakketten" },
  { label: "Bekijk werk", href: "#werk" },
];

/**
 * Hero. Geen stockfoto: een echt opgeleverd werk als bewijs, met de
 * review-score en de drie zekerheden eronder.
 */
export default function StartersHero({ eersteOntwerp }: { eersteOntwerp: string }) {
  const eerste = heroQuote;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <div className={styles.proof} data-reveal>
            <span className={styles.stars} aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
            <span className={styles.proofText}>
              <strong>5,0 uit 23 reviews</strong> op Google
            </span>
          </div>

          <h1 className={styles.heroTitle} data-reveal>
            Een website die je serieus neemt.{" "}
            <span className="accent accent--orange">Zonder bureau.</span>
          </h1>

          <p className={styles.heroLead} data-reveal>
            Ontworpen in Figma en zelf gebouwd. Eerste ontwerp binnen vijf
            werkdagen, vanaf €695. Alles komt op jouw naam te staan, dus je
            houdt je site ook als je later iemand anders neemt.
          </p>

          <div className={styles.heroCta} data-reveal>
            <Button href="#pakketten" variant="primary">
              {KEUZES[0].label}
            </Button>
            <Button href="#werk" variant="ghost">
              {KEUZES[1].label}
            </Button>
          </div>

          <p className={styles.heroMicro} data-reveal>
            Eerste ontwerp {eersteOntwerp} · Nog 4 plekken deze week
          </p>

          <ul className={styles.heroZeker} data-reveal>
            <li>90+ sites gebouwd</li>
            <li>Jij bent volledig eigenaar</li>
            <li>Twee termijnen mogelijk</li>
            <li>Live of je geld terug</li>
          </ul>
        </div>

        <div className={styles.heroMedia} data-reveal>
          <div className={styles.heroShot}>
            <Image
              src="/projects/mazadesign.webp"
              alt="Landingspagina die we voor Mazadesign bouwden"
              width={1000}
              height={639}
              priority
              className={styles.heroImg}
            />
          </div>

          <figure className={styles.heroQuote}>
            <blockquote>&ldquo;{eerste.quote}&rdquo;</blockquote>
            <figcaption>
              {eerste.author}, {eerste.company}
            </figcaption>
          </figure>

          <div className={styles.heroBadge}>
            <strong>Figma-bestand</strong>
            <span>zit in elk pakket</span>
          </div>
        </div>
      </div>
    </section>
  );
}
