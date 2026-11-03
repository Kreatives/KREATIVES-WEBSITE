import { contact, hero } from "@/lib/site";
import { Star } from "@/components/icons";
import styles from "./SocialProof.module.css";

/**
 * Avatar-rij + sterren + "Vertrouwd door 95+ ondernemers".
 * Gebruikt op donkere secties (contact, start-project) onder/naast het team.
 */
export default function SocialProof({
  align = "center",
  tone = "dark",
  rating = hero.socialProof.rating,
  label = hero.socialProof.label,
  trust = hero.socialProof.trust,
}: {
  align?: "center" | "left";
  tone?: "dark" | "light";
  rating?: string;
  label?: string;
  trust?: string;
}) {
  return (
    <div
      className={`${styles.proof} ${align === "left" ? styles.left : ""} ${
        tone === "light" ? styles.toneLight : ""
      }`}
      data-reveal
    >
      <div className={styles.avatars} aria-hidden>
        {contact.team.map((m, i) => (
          <span
            key={i}
            className={styles.avatar}
            style={
              m.photo
                ? {
                    backgroundImage: `url(${m.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { background: m.color }
            }
          >
            {!m.photo && m.initials}
          </span>
        ))}
      </div>
      <div className={styles.meta}>
        <div className={styles.top}>
          <span className={styles.stars} aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} />
            ))}
          </span>
          <span className={styles.rating}>
            <strong>{rating}</strong> {label}
          </span>
        </div>
        <span className={styles.trust}>{trust}</span>
      </div>
    </div>
  );
}
