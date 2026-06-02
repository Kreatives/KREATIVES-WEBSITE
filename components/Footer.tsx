import { footer, site } from "@/lib/site";
import Logo from "@/components/Logo";
import { LinkedIn, TikTok, Instagram } from "@/components/icons";
import styles from "./Footer.module.css";

const socialIcons = {
  linkedin: LinkedIn,
  tiktok: TikTok,
  instagram: Instagram,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo className={styles.brand} />
            <p className={styles.tagline}>{footer.tagline}</p>
            <div className={styles.social}>
              {footer.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className={styles.socialLink}
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

          {footer.columns.map((c) => (
            <nav
              key={c.title}
              className={`${styles.col} ${c.cols === 2 ? styles.colWide : ""}`}
              aria-label={c.title}
            >
              <span className={styles.colTitle}>{c.title}</span>
              <ul className={c.cols === 2 ? styles.linksTwo : ""}>
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
            <span className={styles.contactSub}>{footer.contact.response}</span>
            <span className={styles.contactSub}>{footer.contact.location}</span>
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
