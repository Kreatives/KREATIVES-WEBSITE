"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { saveProject, type ProjectInput } from "@/app/admin/actions";
import type { CmsProject } from "@/lib/cms";
import styles from "./forms.module.css";

type Section = { heading: string; body: string; bodyExtra: string; image: string };

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectForm({
  project,
  featuredCount = 0,
  limit = 4,
}: {
  project?: CmsProject;
  featuredCount?: number;
  limit?: number;
}) {
  const router = useRouter();
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [type, setType] = useState(project?.type ?? "");
  const [year, setYear] = useState(project?.year ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [excerpt, setExcerpt] = useState(project?.excerpt ?? "");
  const [intro, setIntro] = useState(project?.intro ?? "");
  const [image, setImage] = useState(project?.image ?? "");
  const [tags, setTags] = useState((project?.tags ?? []).join(", "));
  const [sections, setSections] = useState<Section[]>(
    project?.sections.map((s) => ({
      heading: s.heading ?? "",
      body: s.body ?? "",
      bodyExtra: s.bodyExtra ?? "",
      image: s.image ?? "",
    })) ?? [{ heading: "De uitdaging", body: "", bodyExtra: "", image: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patchSection(i: number, patch: Partial<Section>) {
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const input: ProjectInput = {
      id: project?.id,
      slug: (slug.trim() || slugify(name)).trim(),
      name: name.trim(),
      type: type.trim(),
      year: year.trim(),
      client: client.trim(),
      excerpt: excerpt.trim(),
      intro: intro.trim(),
      image: image.trim(),
      featured,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      sections: sections
        .filter((s) => s.body.trim() || s.heading.trim())
        .map((s) => ({
          heading: s.heading.trim() || undefined,
          body: s.body.trim(),
          bodyExtra: s.bodyExtra.trim() || undefined,
          image: s.image.trim() || undefined,
        })),
    };

    const res = await saveProject(input);
    if (!res.ok) {
      setError(res.error ?? "Opslaan mislukt.");
      setSaving(false);
      return;
    }
    router.push("/admin/projecten");
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.sectionCard}>
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
          Tonen op de homepage
        </label>
        <span className={styles.hint}>
          {featuredCount + (featured ? 1 : 0)} van {limit} homepage-plekken
          gebruikt.
          {!featured && featuredCount >= limit
            ? " De homepage zit vol — haal eerst een ander project van de homepage af."
            : ""}
        </span>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Projectnaam</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label>Slug (in de URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={slugify(name) || "bijv. smokey-joes"}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Type</label>
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Horeca" />
        </div>
        <div className={styles.field}>
          <label>Jaar</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Klant</label>
          <input value={client} onChange={(e) => setClient(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Tags (komma-gescheiden)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Horeca, Maatwerk" />
        </div>
      </div>

      <div className={styles.field}>
        <label>Korte omschrijving (kaart-tekst)</label>
        <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label>Intro (onder de hero)</label>
        <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={3} />
      </div>

      <div className={styles.field}>
        <label>Hoofdafbeelding</label>
        <ImageInput value={image} onChange={setImage} />
      </div>

      <div className={styles.field}>
        <label>Secties (bijv. De uitdaging, De aanpak, Het resultaat)</label>
        <div className={styles.sections}>
          {sections.map((s, i) => (
            <div key={i} className={styles.sectionCard}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionLabel}>Sectie {i + 1}</span>
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => setSections((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  Verwijderen
                </button>
              </div>
              <div className={styles.field}>
                <label>Titel</label>
                <input
                  value={s.heading}
                  onChange={(e) => patchSection(i, { heading: e.target.value })}
                  placeholder="De uitdaging"
                />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Tekst (kolom 1)</label>
                  <textarea value={s.body} onChange={(e) => patchSection(i, { body: e.target.value })} />
                </div>
                <div className={styles.field}>
                  <label>Tekst (kolom 2, optioneel)</label>
                  <textarea
                    value={s.bodyExtra}
                    onChange={(e) => patchSection(i, { bodyExtra: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Afbeelding bij deze sectie (optioneel)</label>
                <ImageInput value={s.image} onChange={(url) => patchSection(i, { image: url })} />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={() =>
            setSections((prev) => [...prev, { heading: "", body: "", bodyExtra: "", image: "" }])
          }
        >
          + Sectie toevoegen
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? "Bezig…" : "Opslaan"}
        </button>
        <a href="/admin/projecten" className={styles.btnGhost}>
          Annuleren
        </a>
      </div>
    </form>
  );
}
