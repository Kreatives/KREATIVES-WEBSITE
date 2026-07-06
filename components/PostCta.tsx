import Image from "next/image";
import Link from "next/link";
import styles from "./PostCta.module.css";

export default function PostCta() {
  return (
    <aside className={styles.card}>
      <div className={styles.media}>
        <Image
          src="/team/ricky.webp"
          alt="Ricky van KREATIVES"
          fill
          sizes="16rem"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>Start je project</h3>
        <p className={styles.text}>
          Plan een vrijblijvende blueprint-sessie. We kijken samen wat jouw
          site echt nodig heeft.
        </p>
        <Link href="/contact" className={styles.btn}>
          Plan een gesprek
        </Link>
      </div>
    </aside>
  );
}
