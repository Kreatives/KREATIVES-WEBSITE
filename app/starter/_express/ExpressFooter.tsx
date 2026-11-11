import Link from "next/link";
import { footer } from "@/lib/site";
import styles from "./express.module.css";

export default function ExpressFooter() {
  return (
    <footer className={styles.expFooter}>
      <div className={`${styles.container} ${styles.expFooterInner}`}>
        <div>
          <div className={styles.expFooterBrand}>KREATIVES</div>
          <p className={styles.expFooterMeta}>
            © 2026 KREATIVES · KvK {footer.contact.kvk || "[nummer]"}
            <br />
            {footer.contact.address}
          </p>
        </div>
        <nav className={styles.expFooterLinks}>
          <Link href="/voorwaarden">Algemene voorwaarden</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
