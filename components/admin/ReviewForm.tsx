"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { saveReview } from "@/app/admin/actions";
import type { CmsReview } from "@/lib/cms";
import styles from "./forms.module.css";

export default function ReviewForm({
  review,
  featuredCount = 0,
  limit = 6,
  quoteCount = 0,
  quoteLimit = 4,
}: {
  review?: CmsReview;
  featuredCount?: number;
  limit?: number;
  quoteCount?: number;
  quoteLimit?: number;
}) {
  const router = useRouter();
  const [featured, setFeatured] = useState(review?.featured ?? false);
  const [quoteFeatured, setQuoteFeatured] = useState(
    review?.quoteFeatured ?? false
  );
  const [author, setAuthor] = useState(review?.author ?? "");
  const [role, setRole] = useState(review?.role ?? "");
  const [company, setCompany] = useState(review?.company ?? "");
  const [title, setTitle] = useState(review?.title ?? "");
  const [quote, setQuote] = useState(review?.quote ?? "");
  const [color, setColor] = useState(review?.color ?? "#FD6D17");
  const [photo, setPhoto] = useState(review?.photo ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await saveReview({
      id: review?.id,
      featured,
      quoteFeatured,
      author: author.trim(),
      role: role.trim(),
      company: company.trim(),
      title: title.trim(),
      quote: quote.trim(),
      photo: photo.trim() || null,
      color: color.trim() || "#FD6D17",
    });
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    router.push("/admin/reviews");
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.sectionCard}>
        <span className={styles.sectionLabel}>Waar verschijnt deze review?</span>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 500,
            cursor: !featured && featuredCount >= limit ? "default" : "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={featured}
            disabled={!featured && featuredCount >= limit}
            onChange={(e) => setFeatured(e.target.checked)}
            style={{ width: "auto" }}
          />
          Homepage (de reviews-carrousel)
        </label>
        <span className={styles.hint} style={{ marginTop: "-0.4rem" }}>
          {featuredCount + (featured ? 1 : 0)} van {limit} plekken gebruikt.
          {!featured && featuredCount >= limit
            ? " Vol — haal eerst een andere review weg."
            : ""}
        </span>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 500,
            marginTop: "0.5rem",
            cursor:
              !quoteFeatured && quoteCount >= quoteLimit ? "default" : "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={quoteFeatured}
            disabled={!quoteFeatured && quoteCount >= quoteLimit}
            onChange={(e) => setQuoteFeatured(e.target.checked)}
            style={{ width: "auto" }}
          />
          &ldquo;In hun eigen woorden&rdquo; (horizontale kaarten op de
          diensten- en werkwijze-pagina)
        </label>
        <span className={styles.hint} style={{ marginTop: "-0.4rem" }}>
          {quoteCount + (quoteFeatured ? 1 : 0)} van {quoteLimit} plekken
          gebruikt.
          {!quoteFeatured && quoteCount >= quoteLimit
            ? " Vol — haal eerst een andere review weg."
            : ""}
        </span>

        <span className={styles.hint}>
          Alle reviews staan sowieso op de aparte reviews-pagina.
        </span>
      </div>

      <div className={styles.field}>
        <label>Titel van de review</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nu sturen we klanten er juist naartoe" required />
      </div>
      <div className={styles.field}>
        <label>Review (volledige tekst)</label>
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={4} required />
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
          <label>Accentkleur (van de profielcirkel)</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </div>
      <div className={styles.field}>
        <label>Profielfoto (optioneel)</label>
        <ImageInput value={photo} onChange={setPhoto} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? "Bezig…" : "Opslaan"}
        </button>
        <a href="/admin/reviews" className={styles.btnGhost}>
          Annuleren
        </a>
      </div>
    </form>
  );
}
