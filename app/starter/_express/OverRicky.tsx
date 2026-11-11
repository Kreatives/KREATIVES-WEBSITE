import { footer } from "@/lib/site";
import { LinkedIn, TikTok, Instagram } from "@/components/icons";
import styles from "./express.module.css";

const socialIcons = {
  linkedin: LinkedIn,
  tiktok: TikTok,
  instagram: Instagram,
};

const STATS = [
  { num: "100+", label: "Websites gemaakt" },
  { num: "100%", label: "Tevredenheid" },
  { num: "5+", label: "Jaar ervaring" },
];

export default function OverRicky() {
  return (
    <section className={styles.over} data-reveal>
      <div className={`${styles.container} ${styles.overInner}`}>
        <div>
          <h2 className={styles.overTitle}>
            Ik ben Ricky, en{" "}
            <span className={styles.accent}>ik ontwerp je website zelf.</span>
          </h2>
          <div className={styles.overBody}>
            <p>
              Ik bouw al vijf jaar websites en heb er inmiddels meer dan honderd
              gemaakt, van bakkers en sportscholen tot coaches en webshops. Mijn
              eerste klant was een klasgenoot met een transportbedrijf.
            </p>
            <p>
              Jij vult één formulier in en ik doe de rest. Je hoeft nergens voor
              te bellen of langs te komen.
            </p>
          </div>
          <div className={styles.overSocials}>
            {footer.social.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons];
              if (!Icon) return null;
              return (
                <a
                  key={s.label}
                  className={styles.overSocial}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.overPhoto}>
          <img src="/team/ricky-express.webp" alt="Ricky" />
          <div className={styles.overStats}>
            {STATS.map((s) => (
              <div className={styles.overStat} key={s.label}>
                <span className={styles.overStatNum}>{s.num}</span>
                <span className={styles.overStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
