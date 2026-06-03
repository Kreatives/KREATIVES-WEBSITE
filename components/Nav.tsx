"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, hero } from "@/lib/site";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import styles from "./Nav.module.css";

// Pagina's met een donkere hero bovenaan: daar mag de header transparant
// (met witte tekst) zijn zolang je nog niet gescrold hebt.
const DARK_HERO_PREFIXES = [
  "/diensten/webdesign",
  "/diensten/ai",
  "/werkwijze",
  "/over-ons",
  "/blog",
  "/projecten",
  "/contact",
];

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={styles.chev}>
      <path
        d="m3 4.5 3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkHero =
    pathname === "/" ||
    DARK_HERO_PREFIXES.some((p) => pathname.startsWith(p));
  const transparent = darkHero && !scrolled && !open;

  return (
    <header
      className={`${styles.header} ${transparent ? styles.transparent : ""}`}
    >
      <div className={styles.bar}>
        <a href="/" className={styles.logo} aria-label="KREATIVES home">
          <Logo className={styles.logoMark} />
        </a>

        <nav className={styles.links} aria-label="Hoofdmenu">
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className={styles.hasSub}>
                {n.href ? (
                  <a href={n.href} className={styles.subTrigger}>
                    {n.label}
                    <Chevron />
                  </a>
                ) : (
                  <button type="button" className={styles.subTrigger}>
                    {n.label}
                    <Chevron />
                  </button>
                )}
                <div className={styles.dropdown}>
                  {n.children.map((c) => (
                    <a key={c.href} href={c.href}>
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            )
          )}
        </nav>

        <Button href={hero.primary.href} variant="primary" className={styles.cta}>
          {hero.primary.label}
        </Button>

        <button
          className={styles.burger}
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles.burgerOpen : ""} />
          <span className={open ? styles.burgerOpen : ""} />
        </button>
      </div>

      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={styles.overlayClose}
          aria-label="Sluit menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <nav className={styles.overlayNav}>
          {nav.map((n, i) => {
            const delay = { transitionDelay: `${0.05 + i * 0.05}s` };
            const index = (
              <span className={styles.overlayIndex}>
                ({String(i + 1).padStart(2, "0")})
              </span>
            );
            if (n.children) {
              const isOpen = openSub === n.label;
              return (
                <div key={n.label} className={styles.overlayGroup} style={delay}>
                  <div className={styles.overlayRow}>
                    {n.href ? (
                      <a
                        href={n.href}
                        className={styles.overlayItem}
                        onClick={() => setOpen(false)}
                      >
                        {index}
                        {n.label}
                      </a>
                    ) : (
                      <span className={styles.overlayItem}>
                        {index}
                        {n.label}
                      </span>
                    )}
                    <button
                      type="button"
                      className={styles.overlayToggle}
                      aria-expanded={isOpen}
                      aria-label={`Toon ${n.label}`}
                      onClick={() =>
                        setOpenSub((v) => (v === n.label ? null : n.label))
                      }
                    >
                      <Chevron />
                    </button>
                  </div>
                  <div
                    className={`${styles.overlaySub} ${
                      isOpen ? styles.overlaySubOpen : ""
                    }`}
                  >
                    <div className={styles.overlaySubInner}>
                      {n.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={n.href}
                href={n.href}
                className={styles.overlayItem}
                onClick={() => setOpen(false)}
                style={delay}
              >
                {index}
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className={styles.overlayFoot}>
          <span className="eyebrow">Direct contact</span>
          <a href="mailto:info@kreatives.nl">info@kreatives.nl</a>
          <a href="tel:+31613066250">+31 6 13 06 62 50</a>
        </div>
      </div>
    </header>
  );
}
