"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findPakket, euroShort } from "./checkout-express-data";
import styles from "./checkout.module.css";

export default function CheckoutEmail({ pakketId }: { pakketId: string }) {
  const pkg = findPakket(pakketId);
  const router = useRouter();
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = `pakket=${pkg.id}${email ? `&email=${encodeURIComponent(email)}` : ""}`;
    router.push(`/starter/afrekenen/opties?${q}`);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.emailPage}>
        <div className={styles.floaties} aria-hidden>
          <div className={`${styles.floaty} ${styles.f1}`}>
            <img className={styles.floatyImg} src="/team/ricky-express.webp" alt="" />
            <div className={styles.floatyCap}>Ricky, je ontwerper</div>
          </div>
          <div className={`${styles.floaty} ${styles.f2}`}>
            <img className={styles.floatyImg} src="/starter/hero/dev5.webp" alt="" />
            <div className={styles.floatyCap}>Recent werk</div>
          </div>
          <div className={`${styles.floaty} ${styles.f3}`}>
            <img className={styles.floatyImg} src="/projects/mazadesign.webp" alt="" />
            <div className={styles.floatyCap}>Recent werk</div>
          </div>
          <div className={styles.floatyReview}>
            <span className={styles.stars}>★★★★★</span>
            <p className={styles.rq}>
              &ldquo;Ricky snapte precies wat ik wilde. Strakke site, snel
              geregeld en het ziet er echt professioneel uit.&rdquo;
            </p>
            <div className={styles.raRow}>
              <img
                className={styles.raAvatar}
                src="/projects/mazadesign-testimonial-poster.webp"
                alt=""
              />
              <div>
                <div className={styles.raName}>Mahmut Mazlum</div>
                <div className={styles.ra}>Maza Design</div>
              </div>
            </div>
          </div>
        </div>

        <form className={styles.emailCard} onSubmit={submit}>
          <span className={styles.pill}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Duurt 2 minuten
          </span>
          <div className={styles.expressName}>KREATIVES Express</div>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span>
              <b>5/5</b> · 100+ websites gemaakt
            </span>
          </div>

          <div className={styles.pkgBar}>
            <div>
              <div className={styles.pkgBarLabel}>Jouw pakket</div>
              <div className={styles.pkgBarName}>
                {pkg.name} · {euroShort(pkg.price)}
              </div>
            </div>
            <Link href="/starter#pakketten" className={styles.pkgBarBtn}>
              Wijzig
            </Link>
          </div>

          <h1 className={styles.emailTitle}>
            Waar mag je <span className={styles.accent}>eerste ontwerp</span> naartoe?
          </h1>
          <p className={styles.emailSub}>Je betaalt nog niets in deze stap.</p>

          <input
            className={styles.input}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Je e-mailadres"
            autoComplete="email"
          />

          <button type="submit" className={styles.primaryBtn}>
            <span className={styles.lbl}>Bekijk mijn opties</span>
            <span className={styles.arw} aria-hidden>
              <svg viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <p className={styles.emailNote}>
            Alles komt op jouw naam: ontwerp, domein en inloggegevens.
          </p>
          <p className={styles.emailFine}>
            Door verder te gaan ga je akkoord met de{" "}
            <Link href="/voorwaarden">algemene voorwaarden</Link> en het{" "}
            <Link href="/privacy">privacybeleid</Link>.
          </p>
        </form>
      </div>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span>© 2026 KREATIVES · KvK [nummer] · Hortensialaan 1-a, 6851 TB Huissen</span>
          <nav className={styles.footerLinks}>
            <Link href="/voorwaarden">Algemene voorwaarden</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
