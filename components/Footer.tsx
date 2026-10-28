import Link from "next/link";
import { footer, site } from "@/lib/site";
import { footerEn } from "@/lib/content-en";
import Logo from "@/components/Logo";
import { LinkedIn, TikTok, Instagram } from "@/components/icons";
import styles from "./Footer.module.css";

const socialIcons = {
  linkedin: LinkedIn,
  tiktok: TikTok,
  instagram: Instagram,
};

export default function Footer({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const en = locale === "en";
  const tagline = en ? footerEn.tagline : footer.tagline;
  const columns = en ? footerEn.columns : footer.columns;
  const contactTitle = en ? footerEn.contact.title : footer.contact.title;
  const contactResponse = en ? footerEn.contact.response : footer.contact.response;
  const contactLocation = en ? footerEn.contact.location : footer.contact.location;
  const kvk = en ? "" : footer.contact.kvk;
  const rights = en ? footerEn.rights : "Alle rechten voorbehouden.";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo className={styles.brand} />
            <p className={styles.tagline}>{tagline}</p>
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

          {columns.map((c) => (
            <nav
              key={c.title}
              className={`${styles.col} ${c.cols === 2 ? styles.colWide : ""}`}
              aria-label={c.title}
            >
              <span className={styles.colTitle}>{c.title}</span>
              <ul className={c.cols === 2 ? styles.linksTwo : ""}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.contactCol}>
            <span className={styles.colTitle}>{contactTitle}</span>
            <a
              href={`mailto:${site.email}`}
              className={styles.contactMail}
            >
              {site.email}
            </a>
            <span className={styles.contactSub}>{contactResponse}</span>
            <span className={styles.contactSub}>{contactLocation}</span>
            {kvk && <span className={styles.contactSub}>KvK {kvk}</span>}
          </div>
        </div>

        <div className={styles.base}>
          <span>
            © {new Date().getFullYear()} {site.name}. {rights}
          </span>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/voorwaarden">
              {en ? "Terms" : "Algemene voorwaarden"}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden>
        <Logo className={styles.wordmark} title="" />
      </div>
    </footer>
  );
}
