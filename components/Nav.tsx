"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, hero, CALENDLY } from "@/lib/site";
import { navEn } from "@/lib/content-en";
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
  "/website-scan",
  "/prijzen",
  "/webdesign-",
  "/sitemap-overzicht",
  "/en",
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

export default function Nav({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const items = locale === "en" ? navEn : nav;
  const home = locale === "en" ? "/en" : "/";
  const cta =
    locale === "en"
      ? { label: "Book a strategy call", href: CALENDLY }
      : hero.primary;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape sluit het mobiele menu, net als bij de andere overlays.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const darkHero =
    pathname === "/" ||
    DARK_HERO_PREFIXES.some((p) => pathname.startsWith(p));
  const transparent = darkHero && !scrolled && !open;

  return (
    <header
      className={`${styles.header} ${transparent ? styles.transparent : ""}`}
    >
      <div className={styles.bar}>
        <Link href={home} className={styles.logo} aria-label="KREATIVES home">
          <Logo className={styles.logoMark} />
        </Link>

        <nav className={styles.links} aria-label="Hoofdmenu">
          {items.map((n) =>
            n.children ? (
              <div key={n.label} className={styles.hasSub}>
                {n.href ? (
                  <Link href={n.href} className={styles.subTrigger}>
                    {n.label}
                    <Chevron />
                  </Link>
                ) : (
                  <button type="button" className={styles.subTrigger}>
                    {n.label}
                    <Chevron />
                  </button>
                )}
                <div className={styles.dropdown}>
                  {n.children.map((c) => (
                    <Link key={c.href} href={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href ?? "/"}>
                {n.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={cta.href}
          className={styles.cta}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {cta.label}
        </a>

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
          {items.map((n, i) => {
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
                      <Link
                        href={n.href}
                        className={styles.overlayItem}
                        onClick={() => setOpen(false)}
                      >
                        {index}
                        {n.label}
                      </Link>
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
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={n.href}
                href={n.href ?? "/"}
                className={styles.overlayItem}
                onClick={() => setOpen(false)}
                style={delay}
              >
                {index}
                {n.label}
              </Link>
            );
          })}
        </nav>
        <a
          href={cta.href}
          className={styles.overlayCta}
          onClick={() => setOpen(false)}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {cta.label}
        </a>

        <div className={styles.overlayFoot}>
          <span className="eyebrow">Direct contact</span>
          <a href="mailto:info@kreatives.nl">info@kreatives.nl</a>
          <a href="tel:+31613066250">+31 6 13 06 62 50</a>
        </div>
      </div>
    </header>
  );
}
