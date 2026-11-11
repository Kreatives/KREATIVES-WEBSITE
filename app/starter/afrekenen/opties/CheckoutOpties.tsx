"use client";

import { useState } from "react";
import Link from "next/link";
import { findPakket, totals, euro, euroShort } from "../checkout-express-data";
import styles from "../checkout.module.css";

function Check({ orange }: { orange?: boolean }) {
  return (
    <span className={orange ? styles.sumCheck : undefined} style={!orange ? { color: "#111", flex: "none", marginTop: 1 } : undefined}>
      <svg viewBox="0 0 16 16" width="15" height="15" fill="none">
        <path d="m3 8.5 3.2 3 6.8-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Steps() {
  return (
    <ol className={styles.steps}>
      <li className={`${styles.step} ${styles.stepDone}`}>
        <span className={styles.stepDot}>✓</span>Gegevens
      </li>
      <span className={styles.stepLine} />
      <li className={`${styles.step} ${styles.stepOn} ${styles.stepCur}`}>
        <span className={styles.stepDot}>2</span>Opties
      </li>
      <span className={styles.stepLine} />
      <li className={styles.step}>
        <span className={styles.stepDot}>3</span>Betalen
      </li>
      <span className={styles.stepLine} />
      <li className={styles.step}>
        <span className={styles.stepDot}>4</span>Intake
      </li>
    </ol>
  );
}

export default function CheckoutOpties({
  pakketId,
  email = "",
}: {
  pakketId: string;
  email?: string;
}) {
  const pkg = findPakket(pakketId);
  const [usePlus, setUsePlus] = useState(false);
  const [method, setMethod] = useState<"ideal" | "card">("ideal");
  const [plan, setPlan] = useState<"full" | "split">("full");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const t = totals(pkg, usePlus, counts);
  const orderName = usePlus ? pkg.plus.name : pkg.name;
  const payNow = plan === "split" ? t.termijn : t.total;
  const rest = Math.round((t.total - t.termijn) * 100) / 100;

  const bump = (id: string, d: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }));

  async function pay() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/checkout/mollie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pakket: pkg.id, usePlus, method, plan, counts, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Er ging iets mis bij het starten van de betaling.");
      }
      window.location.href = data.checkoutUrl;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Betaling kon niet worden gestart.");
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <span className={styles.brand}>KREATIVES Express</span>
          <Steps />
          <span style={{ width: 1 }} />
        </div>
      </header>

      <main className={styles.opties}>
        <div className={styles.container}>
          <div className={styles.optiesTop}>
            <h1 className={styles.optiesTitle}>Jouw opties</h1>
            <div className={styles.rating}>
              <span className={styles.stars}>★★★★★</span>
              <span>
                <b>5/5</b> · 100+ websites gemaakt
              </span>
            </div>
          </div>

          <div className={styles.optiesGrid}>
            {/* LINKS */}
            <div className={styles.col}>
              <button
                type="button"
                className={`${styles.upsell} ${usePlus ? styles.upsellOn : ""}`}
                onClick={() => setUsePlus(true)}
              >
                <div className={styles.upsellHd}>
                  <div className={styles.upsellName}>
                    <span className={styles.radioDot} />
                    {pkg.plus.name}
                  </div>
                  <span className={styles.upsellBadge}>Aanrader</span>
                </div>
                <div className={styles.upsellPrice}>
                  <b>{euroShort(pkg.plus.price)}</b>
                  <span className={styles.upsellDiff}>{pkg.plus.diff}</span>
                </div>
                <ul className={styles.upsellList}>
                  {pkg.plus.features.map((f) => (
                    <li key={f}>
                      <Check orange /> {f}
                    </li>
                  ))}
                </ul>
              </button>

              <button
                type="button"
                className={`${styles.choice} ${!usePlus ? styles.choiceOn : ""}`}
                onClick={() => setUsePlus(false)}
              >
                <span className={styles.choiceRadio} />
                <span className={styles.choiceText}>
                  <div className={styles.choiceName}>Ga verder met {pkg.name}</div>
                  <div className={styles.choiceSub}>{pkg.continueSub}</div>
                </span>
              </button>

              <div className={styles.sectionLabel}>Betaalmethode</div>
              <button
                type="button"
                className={`${styles.method} ${method === "ideal" ? styles.methodOn : ""}`}
                onClick={() => setMethod("ideal")}
              >
                <span className={styles.choiceRadio} />
                <span className={styles.methodText}>
                  <div className={styles.methodName}>iDEAL</div>
                  <div className={styles.methodSub}>Je betaalt via je eigen bank</div>
                </span>
                <img src="/starter/icons/ideal.svg" alt="iDEAL" className={styles.idealLogo} />
              </button>
              <button
                type="button"
                className={`${styles.method} ${method === "card" ? styles.methodOn : ""}`}
                onClick={() => setMethod("card")}
              >
                <span className={styles.choiceRadio} />
                <span className={styles.methodText}>
                  <div className={styles.methodName}>Creditcard</div>
                  <div className={styles.methodSub}>Je gegevens worden niet bewaard</div>
                </span>
                <span className={styles.cardTags}>
                  <span className={styles.cardTag}>Visa</span>
                  <span className={styles.cardTag}>Mastercard</span>
                  <span className={styles.cardTag}>Amex</span>
                </span>
              </button>

              <div className={styles.trustGrid}>
                <div className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                  <span><b>Veilig betalen.</b> Via een beveiligde verbinding.</span>
                </div>
                <div className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 17.3l-5.5 3 1-6-4.5-4.3 6.1-.9L12 3l2.9 5.9 6.1.9-4.5 4.3 1 6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                  <span><b>100+ websites gemaakt</b> voor ondernemers door heel Nederland.</span>
                </div>
                <div className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4L16 5l3 3L8 19z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                  <span><b>Door een mens ontworpen.</b> Ricky maakt elk ontwerp zelf.</span>
                </div>
                <div className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-4 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                  <span><b>Een vraag?</b> Stuur een appje, antwoord binnen een werkdag.</span>
                </div>
              </div>
            </div>

            {/* RECHTS — Je bestelling */}
            <aside className={styles.summary}>
              <div className={styles.sumHd}>
                <span className={styles.sumTitle}>Je bestelling</span>
                <Link href="/starter#pakketten" className={styles.sumChange}>Wijzig pakket</Link>
              </div>
              <div className={styles.sumPkg}>{orderName}</div>
              <ul className={styles.sumList}>
                {pkg.order.map((o) => (
                  <li key={o.text}>
                    <Check orange />
                    {usePlus && o.plus ? (
                      <span className={styles.upgradeItem}>
                        <s className={styles.wasText}>{o.text}</s>
                        <span className={styles.upgradeArrow} aria-hidden>
                          →
                        </span>
                        <span className={styles.nowText}>{o.plus}</span>
                      </span>
                    ) : (
                      <span>{o.text}</span>
                    )}
                  </li>
                ))}
                {usePlus &&
                  pkg.plusExtra.map((f) => (
                    <li key={f}>
                      <Check orange />
                      <span className={styles.nowText}>{f}</span>
                    </li>
                  ))}
              </ul>

              <span className={styles.addToggle}>★ Voeg toe aan je bestelling</span>
              {pkg.addons.map((a) => (
                <div className={styles.addRow} key={a.id}>
                  <div className={styles.addInfo}>
                    <div className={styles.addName}>{a.label}</div>
                    <div className={styles.addDesc}>{a.desc}</div>
                    <div className={styles.addPrice}>+ {euroShort(a.price)} per stuk</div>
                  </div>
                  <div className={styles.stepper}>
                    <button type="button" onClick={() => bump(a.id, -1)} aria-label="Minder">–</button>
                    <span>{counts[a.id] || 0}</span>
                    <button type="button" onClick={() => bump(a.id, 1)} aria-label="Meer">+</button>
                  </div>
                </div>
              ))}

              <div className={styles.sumDivider} />
              <div className={styles.sumLine}>
                <span>{orderName}</span>
                <span>{euro(t.base)}</span>
              </div>
              {pkg.addons.map((a) =>
                counts[a.id] ? (
                  <div className={styles.sumLine} key={a.id}>
                    <span>{a.label} × {counts[a.id]}</span>
                    <span>{euro(counts[a.id] * a.price)}</span>
                  </div>
                ) : null
              )}
              <div className={styles.sumLine}>
                <span>Btw 21%</span>
                <span>{euro(t.btw)}</span>
              </div>
              <div className={styles.sumDivider} />
              <div className={styles.sumTotal}>
                <span>Totaal</span>
                <b>{euro(t.total)}</b>
              </div>

              <div className={styles.planToggle} role="radiogroup" aria-label="Betaalplan">
                <button
                  type="button"
                  className={`${styles.plan} ${plan === "full" ? styles.planOn : ""}`}
                  onClick={() => setPlan("full")}
                  role="radio"
                  aria-checked={plan === "full"}
                >
                  <span className={styles.choiceRadio} />
                  <span className={styles.planText}>
                    <span className={styles.planName}>In één keer betalen</span>
                    <span className={styles.planSub}>{euro(t.total)} nu</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={`${styles.plan} ${plan === "split" ? styles.planOn : ""}`}
                  onClick={() => setPlan("split")}
                  role="radio"
                  aria-checked={plan === "split"}
                >
                  <span className={styles.choiceRadio} />
                  <span className={styles.planText}>
                    <span className={styles.planName}>In 2 termijnen</span>
                    <span className={styles.planSub}>
                      Nu {euro(t.termijn)} · rest na goedkeuring
                    </span>
                  </span>
                </button>
              </div>
              <div className={styles.sumMeta}>
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                Eerste ontwerp: <b>binnen 48 uur na je intake</b>
              </div>
              <div className={styles.sumMeta}>
                <span className={styles.dotOrange} />
                Nog <b>2 plekken</b> deze week
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={pay}
                disabled={loading}
                style={loading ? { opacity: 0.7, cursor: "wait" } : undefined}
              >
                <span className={styles.lbl}>
                  {loading ? "Bezig…" : `Verder naar betalen · ${euro(payNow)}`}
                </span>
                <span className={styles.arw} aria-hidden>
                  <svg viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {plan === "split" && (
                <p className={styles.sumTermijn}>
                  Je betaalt nu <b>{euro(t.termijn)}</b>. De 2e termijn van{" "}
                  <b>{euro(rest)}</b> wordt automatisch via Mollie afgeschreven zodra
                  je het ontwerp hebt goedgekeurd.
                </p>
              )}
              {err && (
                <p className={styles.sumTermijn} role="alert" style={{ color: "#e23b3b" }}>
                  {err}
                </p>
              )}

              <div className={styles.payIcons}>
                <span>iDEAL</span>
                <span>Visa</span>
                <span>Mastercard</span>
                <span>Apple Pay</span>
              </div>

              <div className={styles.guarantee}>
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>
                  <b>Geld terug als het ontwerp niet bevalt.</b> Ben je na je
                  revisierondes niet tevreden, dan krijg je je aanbetaling terug.
                </span>
              </div>

              <div className={styles.sumTrust}>
                <div><Check /> <span><b>Alles komt op jouw naam.</b> Ontwerp, domein en inloggegevens.</span></div>
                <div><Check /> <span><b>Je betaalt één keer.</b> Geen abonnement voor je site.</span></div>
                <div><Check /> <span><b>Na het betalen vul je de intake in.</b> Dat is één formulier, daarna doe ik de rest.</span></div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <div className={styles.mobileBar}>
        <div className={styles.mobileBarInfo}>
          <span className={styles.mobileBarLabel}>
            {plan === "split" ? "Nu te betalen" : "Totaal"}
          </span>
          <span className={styles.mobileBarAmt}>{euro(payNow)}</span>
        </div>
        <button
          type="button"
          className={styles.mobileBarBtn}
          onClick={pay}
          disabled={loading}
        >
          {loading ? "Bezig…" : "Verder naar betalen"}
          <span aria-hidden>
            <svg viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
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
