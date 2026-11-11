"use client";

import { useState } from "react";
import Link from "next/link";
import { ADDONS, computeTotals, euro, findPakket } from "./checkout-data";
import { CheckoutHeader, OrderSummary } from "./checkout-ui";
import styles from "./checkout.module.css";

export default function Checkout1({ pakketId }: { pakketId: string }) {
  const pkg = findPakket(pakketId);
  const [addons, setAddons] = useState<string[]>([]);
  const t = computeTotals(pkg, addons);

  const toggle = (id: string) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const next = `/starter/afrekenen/betalen?pakket=${pkg.id}${
    addons.length ? `&addons=${addons.join(",")}` : ""
  }`;

  return (
    <div className={styles.wrap}>
      <CheckoutHeader step={1} />

      <div className={styles.body}>
        <div className={styles.main}>
          <section className={styles.card}>
            <div className={styles.pkg}>
              <div>
                <span className={styles.kicker}>Je pakket</span>
                <div className={styles.pkgName}>
                  {pkg.name} <span className={styles.pkgTag}>{pkg.tagline}</span>
                </div>
              </div>
              <div className={styles.pkgRight}>
                <span className={styles.pkgPrice}>{pkg.price}</span>
                <Link href="/starter#pakketten" className={styles.pkgChange}>
                  Wijzig pakket
                </Link>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Extra&apos;s erbij?</h2>
            <div className={styles.addons}>
              {ADDONS.map((a) => {
                const on = addons.includes(a.id);
                return (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    aria-pressed={on}
                    className={`${styles.addon} ${on ? styles.addonOn : ""}`}
                  >
                    <span
                      className={`${styles.check} ${on ? styles.checkOn : ""}`}
                      aria-hidden
                    >
                      {on ? "✓" : ""}
                    </span>
                    <span className={styles.addonText}>
                      <span className={styles.addonTitle}>{a.label}</span>
                      <span className={styles.addonBody}>{a.body}</span>
                    </span>
                    <span className={styles.addonPrice}>+ {euro(a.price)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Jouw gegevens</h2>
            <div className={styles.fieldGrid}>
              <Field label="Naam *" name="naam" placeholder="Je naam" />
              <Field label="E-mail *" name="email" type="email" placeholder="jij@bedrijf.nl" />
            </div>
            <Field label="Bedrijfsnaam *" name="bedrijf" placeholder="Naam van je zaak" />
            <div className={styles.fieldGrid}>
              <Field label="KvK-nummer *" name="kvk" placeholder="12345678" />
              <Field label="WhatsApp" name="whatsapp" type="tel" placeholder="06 ..." />
            </div>
          </section>
        </div>

        <OrderSummary pkg={pkg} addonIds={addons}>
          <p className={styles.sumTermijn}>of 2 termijnen van {euro(t.termijn)}</p>
          <Link href={next} className={styles.payBtn}>
            Naar betalen →
          </Link>
          <p className={styles.trust}>Veilig betalen · iDEAL &amp; creditcard</p>
        </OrderSummary>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input className={styles.input} type={type} name={name} placeholder={placeholder} />
    </label>
  );
}
