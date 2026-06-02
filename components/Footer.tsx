import { footer, site } from "@/lib/site";
import Logo from "@/components/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo className={styles.brand} />
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          {footer.columns.map((c) => (
            <nav key={c.title} className={styles.col} aria-label={c.title}>
              <span className={styles.colTitle}>{c.title}</span>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.contactCol}>
            <span className={styles.colTitle}>{footer.contact.title}</span>
            <a
              href={`mailto:${footer.contact.email}`}
              className={styles.contactMail}
            >
              {footer.contact.email}
            </a>
            <span className={styles.contactSub}>
              {footer.contact.response}
            </span>
            <span className={styles.contactSub}>
              {footer.contact.location}
            </span>
          </div>
        </div>

        <div className={styles.base}>
          <span>
            © {new Date().getFullYear()} {site.name}. Alle rechten voorbehouden.
          </span>
          <div className={styles.legal}>
            <a href="#">Privacy</a>
            <a href="#">Algemene voorwaarden</a>
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden>
        <Logo className={styles.wordmark} title="" />
      </div>
    </footer>
  );
}
