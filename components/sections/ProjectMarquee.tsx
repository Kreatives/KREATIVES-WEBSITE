import Image from "next/image";
import styles from "./ProjectMarquee.module.css";

const projects = [1, 2, 3, 4, 5, 6, 7];

export default function ProjectMarquee() {
  // Twee keer renderen voor naadloze loop
  const items = [...projects, ...projects];

  return (
    <section className={styles.sec} aria-label="Geselecteerde projecten">
      <div className="marquee">
        <div
          className={`marquee__track ${styles.track}`}
          style={{ "--marquee-dur": "55s" } as React.CSSProperties}
        >
          {items.map((n, i) => (
            <a
              key={i}
              href="/projecten"
              className={styles.card}
              aria-hidden={i >= projects.length}
            >
              <div className={styles.media}>
                <Image
                  src={`/projects/${n}.webp`}
                  alt=""
                  fill
                  sizes="22rem"
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.tag}>Bekijk case</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
