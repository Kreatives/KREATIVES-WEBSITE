import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { createMollieClient } from "@mollie/api-client";
import styles from "../checkout.module.css";

export const metadata: Metadata = {
  title: "Bedankt",
  robots: { index: false, follow: false },
};

type View = {
  state: "paid" | "pending" | "failed" | "unknown";
  title: string;
  body: string;
  amount?: string;
  desc?: string;
};

async function resolve(): Promise<View> {
  const pid = (await cookies()).get("mollie_pid")?.value;
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!pid || !apiKey) {
    return {
      state: "unknown",
      title: "Geen betaling gevonden",
      body: "We konden geen recente betaling terugvinden. Begin opnieuw vanaf je opties.",
    };
  }
  try {
    const mollie = createMollieClient({ apiKey });
    const p = await mollie.payments.get(pid);
    const amount = `€${Number(p.amount.value).toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    if (p.status === "paid") {
      return {
        state: "paid",
        title: "Betaling gelukt",
        body: "Je bestelling staat klaar. Je ontvangt een bevestiging per e-mail en daarna vul je nog even de intake in.",
        amount,
        desc: p.description,
      };
    }
    if (p.status === "open" || p.status === "pending" || p.status === "authorized") {
      return {
        state: "pending",
        title: "Betaling in behandeling",
        body: "Je betaling wordt nog verwerkt. Ververs deze pagina over een paar seconden.",
        amount,
        desc: p.description,
      };
    }
    return {
      state: "failed",
      title: "Betaling niet afgerond",
      body: "De betaling is geannuleerd of mislukt. Geen zorgen — er is niets afgeschreven. Je kunt het opnieuw proberen.",
      amount,
      desc: p.description,
    };
  } catch {
    return {
      state: "unknown",
      title: "Status onbekend",
      body: "We konden de status van je betaling nu niet ophalen. Probeer de pagina te verversen.",
    };
  }
}

export default async function Bedankt() {
  const v = await resolve();
  const ok = v.state === "paid";

  return (
    <div className={styles.wrap}>
      <div className={styles.emailPage}>
        <div className={styles.emailCard} style={{ textAlign: "center", alignItems: "center" }}>
          <span
            aria-hidden
            style={{
              display: "grid",
              placeItems: "center",
              width: 64,
              height: 64,
              borderRadius: 999,
              background: ok ? "#e9f7ee" : v.state === "failed" ? "#fdecec" : "#fff4ea",
              color: ok ? "#1fab54" : v.state === "failed" ? "#e23b3b" : "#fe6d17",
            }}
          >
            {ok ? (
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
                <path d="m6 12.5 3.5 3.5L18 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : v.state === "failed" ? (
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
                <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </span>

          <h1 className={styles.emailTitle} style={{ marginTop: 0 }}>
            {v.title}
          </h1>
          {v.amount && (
            <p className={styles.emailSub} style={{ marginTop: "-0.4rem" }}>
              {v.desc} · <b style={{ color: "#111" }}>{v.amount}</b>
            </p>
          )}
          <p className={styles.emailSub}>{v.body}</p>

          <Link href="/starter" className={styles.primaryBtn} style={{ marginTop: "0.6rem" }}>
            <span className={styles.lbl}>{ok ? "Terug naar de site" : "Opnieuw proberen"}</span>
            <span className={styles.arw} aria-hidden>
              <svg viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span>© 2026 KREATIVES</span>
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
