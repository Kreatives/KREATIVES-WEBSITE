"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { savePost, generatePostImage } from "@/app/admin/actions";
import type { CmsPost } from "@/lib/cms";
import styles from "./forms.module.css";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({ post }: { post?: CmsPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [date, setDate] = useState(post?.date ?? "");
  const [readingMinutes, setReadingMinutes] = useState(
    String(post?.readingMinutes ?? 4)
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [imageAlt, setImageAlt] = useState(post?.heroAlt ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [body, setBody] = useState((post?.body ?? []).join("\n\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genBusy, setGenBusy] = useState(false);
  const [genMsg, setGenMsg] = useState<string | null>(null);

  async function generateImage() {
    if (!title.trim() && !body.trim()) {
      setGenMsg("Vul eerst een titel of tekst in.");
      return;
    }
    setGenBusy(true);
    setGenMsg("Bezig… de AI maakt een foto op basis van dit artikel (~30-60s).");
    try {
      const res = await generatePostImage({
        title: title.trim(),
        body: body.trim(),
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        storedPrompt: post?.heroPrompt,
        slug: slug.trim() || slugify(title),
      });
      if (res.ok && res.url) {
        setImage(res.url);
        if (res.alt) setImageAlt(res.alt);
        setGenMsg("Foto gegenereerd en ingesteld als hoofdafbeelding. Vergeet niet op te slaan.");
      } else {
        setGenMsg(res.error ?? "Genereren mislukt.");
      }
    } catch (err) {
      setGenMsg(err instanceof Error ? err.message : "Genereren mislukt.");
    } finally {
      setGenBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await savePost({
      id: post?.id,
      slug: (slug.trim() || slugify(title)).trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      date: date.trim(),
      readingMinutes: parseInt(readingMinutes, 10) || 4,
      image: image.trim(),
      imageAlt: imageAlt.trim(),
      body: body.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label>Titel</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Slug (in de URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={slugify(title) || "bijv. waarom-maatwerk-loont"}
          />
        </div>
        <div className={styles.field}>
          <label>Datum</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Leestijd (minuten)</label>
          <input
            type="number"
            min={1}
            value={readingMinutes}
            onChange={(e) => setReadingMinutes(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Tags (komma-gescheiden)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Strategie, Webdesign" />
        </div>
      </div>

      <div className={styles.field}>
        <label>Korte samenvatting</label>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
      </div>

      <div className={styles.field}>
        <label>Hoofdafbeelding</label>
        <ImageInput value={image} onChange={setImage} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginTop: "0.6rem" }}>
          <button
            type="button"
            onClick={generateImage}
            disabled={genBusy}
            className={styles.btnPrimary}
            style={{ opacity: genBusy ? 0.6 : 1 }}
          >
            {genBusy ? "Foto genereren…" : "✨ Genereer AI-foto"}
          </button>
          <span className={styles.hint} style={{ margin: 0 }}>
            Maakt een .webp-foto (16:9) op basis van dit artikel, in de KREATIVES-stijl.
          </span>
        </div>
        {genMsg && (
          <p className={styles.hint} style={{ marginTop: "0.5rem" }}>
            {genMsg}
          </p>
        )}
        {image && (
          <div style={{ marginTop: "0.75rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt || "voorbeeld hoofdafbeelding"}
              style={{ maxWidth: 320, width: "100%", borderRadius: 10, display: "block" }}
            />
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label>Alt-tekst hoofdafbeelding (SEO)</label>
        <input
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          placeholder="Beschrijf de foto voor Google en screenreaders"
        />
      </div>

      <div className={styles.field}>
        <label>Artikel</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          placeholder="Schrijf je artikel. Laat een lege regel tussen alinea's."
        />
        <span className={styles.hint}>
          Laat een lege regel tussen blokken. Opmaak met Markdown:
          <code>## Kop</code>, <code>### Subkop</code>, <code>- lijst</code>,
          genummerde lijst, <code>| tabel |</code>, <code>&gt; citaat</code>,
          links <code>[tekst](/diensten/webdesign)</code>, <code>**vet**</code> en{" "}
          <code>*cursief*</code>.
        </span>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? "Bezig…" : "Opslaan"}
        </button>
        <a href="/admin/blog" className={styles.btnGhost}>
          Annuleren
        </a>
      </div>
    </form>
  );
}
