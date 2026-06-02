"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setPreviewPassword } from "@/app/admin/actions";
import styles from "./forms.module.css";

export default function PreviewPasswordForm({ current }: { current: string }) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await setPreviewPassword(value.trim());
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    setDone(true);
    setSaving(false);
    router.refresh();
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} style={{ maxWidth: "30rem" }}>
      <div className={styles.field}>
        <label>Site-wachtwoord</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="bijv. kreatives"
          required
        />
        <span className={styles.hint}>
          Bezoekers die dit wachtwoord invullen op de &ldquo;binnenkort
          live&rdquo;-screen, zien de echte site.
        </span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? "Bezig…" : done ? "Opgeslagen ✓" : "Opslaan"}
        </button>
      </div>
    </form>
  );
}
