"use client";

import Link from "next/link";
import type { Pakket } from "../data";
import { computeTotals, euro } from "./checkout-data";
import styles from "./checkout.module.css";

/** Minimale checkout-header met stappen. De pagina draait "bare" (geen site-nav). */
export function CheckoutHeader({ step }: { step: 1 | 2 }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/starter" className={styles.brand}>
          KREATIVES
        </Link>
        <ol className={styles.steps}>
          <li className={`${styles.step} ${step >= 1 ? styles.stepOn : ""}`}>
            <span className={styles.stepDot}>{step > 1 ? "✓" : "1"}</span>
            Gegevens
          </li>
          <span className={styles.stepLine} aria-hidden />
          <li className={`${styles.step} ${step >= 2 ? styles.stepOn : ""}`}>
            <span className={styles.stepDot}>2</span>
            Betalen
          </li>
        </ol>
        <span className={styles.secure}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
            <path
              d="M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Veilig afrekenen
        </span>
      </div>
    </header>
  );
}

/** Ordersamenvatting (sticky). De CTA-knoppen levert elke stap zelf via children. */
export function OrderSummary({
  pkg,
  addonIds,
  children,
}: {
  pkg: Pakket;
  addonIds: string[];
  children?: React.ReactNode;
}) {
  const t = computeTotals(pkg, addonIds);
  return (
    <aside className={styles.summary}>
      <h2 className={styles.sumHead}>Overzicht</h2>
      <div className={styles.sumItems}>
        <div className={styles.sumRow}>
          <span>{pkg.name}</span>
          <span>{euro(t.pkgPrice)}</span>
        </div>
        {t.addons.map((a) => (
          <div key={a.id} className={styles.sumRow}>
            <span>+ {a.label}</span>
            <span>{euro(a.price)}</span>
          </div>
        ))}
      </div>
      <div className={styles.sumDivider} />
      <div className={styles.sumRowMuted}>
        <span>Subtotaal</span>
        <span>{euro(t.subtotal)}</span>
      </div>
      <div className={styles.sumRowMuted}>
        <span>Btw 21%</span>
        <span>{euro(t.btw)}</span>
      </div>
      <div className={styles.sumDivider} />
      <div className={styles.sumTotal}>
        <span>Totaal</span>
        <strong>{euro(t.total)}</strong>
      </div>
      {children}
    </aside>
  );
}
