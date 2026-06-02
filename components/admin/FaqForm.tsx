"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveFaq } from "@/app/admin/actions";
import type { CmsFaq } from "@/lib/cms";
import styles from "./forms.module.css";

const CATEGORIES = ["Algemeen", "Proces", "Prijzen", "Techniek"];

export default function FaqForm({ faq }: { faq?: CmsFaq }) {
  const router = useRouter();
  const [category, setCategory] = useState(faq?.category ?? CATEGORIES[0]);
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await saveFaq({
      id: faq?.id,
      category: category.trim(),
      question: question.trim(),
      answer: answer.trim(),
    });
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    router.push("/admin/faq");
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label>Categorie</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="faq-categories"
          placeholder="Algemeen"
        />
        <datalist id="faq-categories">
          {CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <span className={styles.hint}>
          Kies een bestaande of typ een nieuwe. Hierop kan op de site gefilterd
          worden.
        </span>
      </div>
      <div className={styles.field}>
        <label>Vraag</label>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label>Antwoord</label>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} required />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? "Bezig…" : "Opslaan"}
        </button>
        <a href="/admin/faq" className={styles.btnGhost}>
          Annuleren
        </a>
      </div>
    </form>
  );
}
