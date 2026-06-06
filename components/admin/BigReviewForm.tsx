"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { saveBigReview } from "@/app/admin/actions";
import type { CmsBigReview } from "@/lib/cms";
import styles from "./forms.module.css";

export default function BigReviewForm({
  review,
  count = 0,
  limit = 12,
  backHref = "/admin/grote-reviews",
}: {
  review?: CmsBigReview;
  count?: number;
  limit?: number;
  backHref?: string;
}) {
  const router = useRouter();
  const [author, setAuthor] = useState(review?.author ?? "");
  const [role, setRole] = useState(review?.role ?? "");
  const [company, setCompany] = useState(review?.company ?? "");
  const [title, setTitle] = useState(review?.title ?? "");
  const [quote, setQuote] = useState(review?.quote ?? "");
  const [color, setColor] = useState(review?.color ?? "#FD6D17");
  const [photo, setPhoto] = useState(review?.photo ?? "");
  const [logo, setLogo] = useState(review?.logo ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !review;
  const full = isNew && count >= limit;
  const words = quote.trim() ? quote.trim().split(/\s+/).length : 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await saveBigReview({
      id: review?.id,
      author: author.trim(),
      role: role.trim(),
      company: company.trim(),
      title: title.trim(),
      quote: quote.trim(),
      photo: photo.trim() || null,
      logo: logo.trim() || null,
      color: color.trim() || "#FD6D17",
    });
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    router.push(backHref);
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.sectionCard}>
        <span className={styles.sectionLabel}>Grote review</span>
        <span className={styles.hint}>
          Een eigen blok met een grote verticale foto, in de foto-carrousel op
          de diensten- en werkwijze-pagina&apos;s. Staat los van de gewone
          reviews — verwijderen hier raakt de homepage en reviews-pagina niet.
        </span>
        <span className={styles.hint}>
          {count + (isNew ? 1 : 0)} van {limit} plekken gebruikt.
          {full ? " Vol — haal eerst een andere grote review weg." : ""}
        </span>
      </div>

      <div className={styles.field}>
        <label>Titel van de review</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nu sturen we klanten er juist naartoe"
          required
        />
      </div>
      <div className={styles.field}>
        <label>Review (volledige tekst)</label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={4}
          maxLength={320}
          required
        />
        <span className={styles.hint}>
          Houd het kort voor de grote-review card: max ~45 woorden ({words}/45).
        </span>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Naam</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label>Functie</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Eigenaar" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Bedrijf</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Accentkleur (achter de initialen, als er geen foto is)</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </div>
      <div className={styles.field}>
        <label>Foto (verticaal / 2:3 — vult de hele linkerkant van de card)</label>
        <ImageInput value={photo} onChange={setPhoto} />
      </div>
      <div className={styles.field}>
        <label>Logo (optioneel — zwarte versie, rechtsonder in de card)</label>
        <ImageInput value={logo} onChange={setLogo} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving || full}>
          {saving ? "Bezig…" : "Opslaan"}
        </button>
        <a href={backHref} className={styles.btnGhost}>
          Annuleren
        </a>
      </div>
    </form>
  );
}
