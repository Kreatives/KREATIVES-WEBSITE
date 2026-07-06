"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateBlogDraft } from "@/app/admin/actions";
import styles from "../../app/admin/admin.module.css";

export default function PipelinePanel() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setMsg("Bezig… de bot analyseert zoekwoorden en schrijft een concept (dit duurt ~1 min).");
    try {
      const res = await generateBlogDraft();
      if (res.ok && !res.skipped) {
        setMsg(`Klaar. Nieuw concept voor "${res.keyword}" staat onder "Nog goed te keuren".`);
      } else if (res.skipped) {
        setMsg(res.reason ?? "Er staat vandaag al een concept klaar.");
      } else {
        setMsg(`Mislukt: ${res.error}`);
      }
    } catch (e) {
      setMsg(`Mislukt: ${e instanceof Error ? e.message : "onbekende fout"}`);
    } finally {
      setBusy(false);
      router.refresh();
    }
  }

  return (
    <div
      style={{
        border: "1px solid var(--line, #e5e3db)",
        borderRadius: 14,
        padding: "1.1rem 1.25rem",
        marginBottom: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1, minWidth: 220 }}>
        <strong>Automatische blog</strong>
        <div style={{ color: "var(--muted, #6b6b66)", fontSize: "0.9rem" }}>
          Laat de bot nu een SEO-concept schrijven (max 1 per dag automatisch).
          Niets gaat live zonder jouw goedkeuring.
        </div>
      </div>
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className={styles.newBtn}
        style={{ opacity: busy ? 0.6 : 1 }}
      >
        {busy ? "Bezig…" : "Genereer nu een blog"}
      </button>
      {msg && (
        <div style={{ flexBasis: "100%", fontSize: "0.9rem", color: "var(--ink, #1a1a1a)" }}>
          {msg}
        </div>
      )}
    </div>
  );
}
