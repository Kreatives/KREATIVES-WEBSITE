import { marquee } from "@/lib/site";
import styles from "./LogoMarquee.module.css";

export default function LogoMarquee() {
  const logos = [...marquee.logos, ...marquee.logos];
  return (
    <section className={styles.wrap} aria-label="Klanten">
      <div className="container">
        <p className={`eyebrow ${styles.label}`}>{marquee.label}</p>
      </div>
      <div className="marquee">
        <div
          className="marquee__track"
          style={{ "--marquee-dur": "34s" } as React.CSSProperties}
        >
          {logos.map((n, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`/logos/${n}.png`}
              alt=""
              className={styles.logo}
              loading="lazy"
              aria-hidden={i >= marquee.logos.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
