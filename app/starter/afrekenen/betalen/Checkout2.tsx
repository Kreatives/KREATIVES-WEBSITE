"use client";

import { useState } from "react";
import Link from "next/link";
import { computeTotals, euro, findPakket } from "../checkout-data";
import { CheckoutHeader, OrderSummary } from "../checkout-ui";
import styles from "../checkout.module.css";

export default function Checkout2({
  pakketId,
  addonIds,
}: {
  pakketId: string;
  addonIds: string[];
}) {
  const pkg = findPakket(pakketId);
  const t = computeTotals(pkg, addonIds);

  const [method, setMethod] = useState<"ideal" | "card">("ideal");
  const [termijn, setTermijn] = useState<"twee" | "een">("twee");
  const [akkoord, setAkkoord] = useState(true);
  const [status, setStatus] = useState<"idle" | "bezig" | "klaar">("idle");

  const nu = termijn === "twee" ? t.termijn : t.total;

  // De echte Stripe-sessie wordt later gekoppeld. Voor nu een nette
  // front-end bevestiging zodat de flow volledig te doorlopen is.
  function betaal() {
    setStatus("bezig");
    setTimeout(() => setStatus("klaar"), 1100);
  }

  const back = `/starter/afrekenen?pakket=${pkg.id}${
    addonIds.length ? `&addons=${addonIds.join(",")}` : ""
  }`;

  return (
    <div className={styles.wrap}>
      <CheckoutHeader step={2} />

      <div className={styles.body}>
        <div className={styles.main}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Betaalmethode</h2>
            <div className={styles.methods}>
              <Option
                title="iDEAL"
                body="Betaal direct via je eigen bank."
                on={method === "ideal"}
                onClick={() => setMethod("ideal")}
              />
              <Option
                title="Creditcard"
                body="Visa, Mastercard of American Express."
                on={method === "card"}
                onClick={() => setMethod("card")}
              />
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Betaaltermijn</h2>
            <div className={styles.methods}>
              <Option
                title="In twee termijnen"
                body="Nu de helft, de rest bij oplevering."
                right={euro(t.termijn)}
                on={termijn === "twee"}
                onClick={() => setTermijn("twee")}
              />
              <Option
                title="In één keer"
                body="Alles ineens, scheelt je niets extra."
                right={euro(t.total)}
                on={termijn === "een"}
                onClick={() => setTermijn("een")}
              />
            </div>
          </section>

          <label className={styles.agree}>
            <span
              className={`${styles.check} ${akkoord ? styles.checkOn : ""}`}
              aria-hidden
            >
              {akkoord ? "✓" : ""}
            </span>
            <input
              type="checkbox"
              className={styles.srOnly}
              checked={akkoord}
              onChange={(e) => setAkkoord(e.target.checked)}
            />
            <span>
              Ik ga akkoord met de{" "}
              <Link href="/voorwaarden">algemene voorwaarden</Link> en het{" "}
              <Link href="/privacy">privacybeleid</Link>. Ik bestel zakelijk met
              een KvK-nummer, dus zonder herroepingsrecht van veertien dagen.
            </span>
          </label>
        </div>

        <OrderSummary pkg={pkg} addonIds={addonIds}>
          <div className={styles.nowBox}>
            <span className={styles.nowLabel}>
              Nu te betalen
              <small>{termijn === "twee" ? "1e termijn" : "volledig bedrag"}</small>
            </span>
            <span className={styles.nowPrice}>{euro(nu)}</span>
          </div>

          {status === "klaar" ? (
            <p className={styles.trust} role="status">
              Bedankt. Je bestelling staat klaar. De betaling via Stripe wordt
              hier binnenkort gekoppeld, dan reken je direct {euro(nu)} af.
            </p>
          ) : (
            <>
              <button
                type="button"
                className={styles.payBtn}
                onClick={betaal}
                disabled={!akkoord || status === "bezig"}
              >
                {status === "bezig" ? "Veilig doorsturen…" : `Betaal ${euro(nu)}`}
              </button>
              <p className={styles.trust}>
                {termijn === "twee"
                  ? "Je betaalt nu de eerste termijn. De tweede volgt bij oplevering."
                  : "Je betaalt het volledige bedrag in één keer."}
              </p>
            </>
          )}

          <Link href={back} className={styles.backLink}>
            ← Terug naar gegevens
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}

function Option({
  title,
  body,
  right,
  on,
  onClick,
}: {
  title: string;
  body: string;
  right?: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`${styles.method} ${on ? styles.methodOn : ""}`}
    >
      <span className={`${styles.radio} ${on ? styles.radioOn : ""}`} aria-hidden />
      <span className={styles.methodText}>
        <span className={styles.methodTitle}>{title}</span>
        <span className={styles.methodBody}>{body}</span>
      </span>
      {right && <span className={styles.methodPrice}>{right}</span>}
    </button>
  );
}
