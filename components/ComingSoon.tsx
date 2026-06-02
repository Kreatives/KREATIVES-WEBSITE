"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { comingSoon } from "@/lib/site";
import { Arrow } from "@/components/icons";
import { unlockPreview } from "@/lib/gate";
import Logo from "@/components/Logo";
import styles from "./ComingSoon.module.css";

export default function ComingSoon() {
  const router = useRouter();
  const [showGate, setShowGate] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Voorkom scrollen zodat de screen het hele scherm vult (nav/footer eronder).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  async function onUnlock(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    const res = await unlockPreview(password);
    if (!res.ok) {
      setError(res.error ?? "Onjuist wachtwoord.");
      setChecking(false);
      return;
    }
    router.refresh();
  }

  return (
    <section className={styles.screen}>
      <div className={styles.bg} aria-hidden>
        <Image
          src={comingSoon.background}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden />
          {comingSoon.status}
        </span>

        <Logo className={styles.logo} />

        <p className={styles.subtitle}>{comingSoon.subtitle}</p>

        <div className={styles.links}>
          {comingSoon.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                href={l.href}
                className={`${styles.link} ${
                  l.primary ? styles.linkPrimary : ""
                }`}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{l.label}</span>
                  <span className={styles.linkSub}>{l.sub}</span>
                </span>
                <span className={styles.linkIco} aria-hidden>
                  <Arrow />
                </span>
              </a>
            );
          })}
        </div>

        {showGate ? (
          <form className={styles.gate} onSubmit={onUnlock}>
            <input
              type="password"
              className={styles.gateInput}
              placeholder="Wachtwoord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className={styles.gateBtn}
              disabled={checking}
            >
              {checking ? "…" : "Toegang"}
            </button>
            {error && <span className={styles.gateError}>{error}</span>}
          </form>
        ) : (
          <button
            type="button"
            className={styles.gateToggle}
            onClick={() => setShowGate(true)}
          >
            Toegang met wachtwoord
          </button>
        )}

        <span className={styles.footnote}>
          © {new Date().getFullYear()} KREATIVES
        </span>
      </div>
    </section>
  );
}
