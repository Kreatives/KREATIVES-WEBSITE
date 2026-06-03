import Image from "next/image";
import styles from "./BookCallButton.module.css";

const CALENDLY_URL = "https://calendly.com/info-jtw/gratis-adviesgesprek-v2";

function PlusGrid() {
  // 3x3 stippenraster dat bij hover roteert / oranje wordt (image #82 stijl)
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden
      className={styles.svg}
    >
      {[...Array(9)].map((_, i) => {
        const x = (i % 3) * 7 + 1;
        const y = Math.floor(i / 3) * 7 + 1;
        return <circle key={i} cx={x} cy={y} r="0.9" />;
      })}
    </svg>
  );
}

export default function BookCallButton() {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Plan een gratis adviesgesprek"
    >
      <div className={styles.avatar} aria-hidden>
        <Image
          src="/team/dylan.webp"
          alt=""
          fill
          sizes="56px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      <div className={styles.text}>
        <span className={styles.title}>Plan een gesprek</span>
        <span className={styles.sub}>Gratis & vrijblijvend</span>
      </div>
      <div className={styles.icon} aria-hidden>
        <PlusGrid />
      </div>
    </a>
  );
}
