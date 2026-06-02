"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import formStyles from "@/components/admin/forms.module.css";
import styles from "../admin.module.css";

type MediaFile = { name: string; url: string };

// Bestaande beelden die al in de website zitten (map /public).
const PUBLIC_IMAGES = [
  "/placeholder.png",
  "/projects/1.webp",
  "/projects/2.webp",
  "/projects/3.webp",
  "/projects/4.webp",
  "/projects/5.webp",
  "/projects/6.webp",
  "/projects/7.webp",
  "/logos/1.png",
  "/logos/2.png",
  "/logos/3.png",
  "/logos/4.png",
  "/logos/5.png",
  "/logos/6.png",
];

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("media")
      .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (data) {
      setFiles(
        data
          .filter((f) => f.id)
          .map((f) => ({
            name: f.name,
            url: supabase.storage.from("media").getPublicUrl(f.name).data
              .publicUrl,
          }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    await supabase.storage
      .from("media")
      .upload(`${crypto.randomUUID()}.${ext}`, file);
    setUploading(false);
    e.target.value = "";
    load();
  }

  async function remove(name: string) {
    if (!confirm("Deze foto verwijderen?")) return;
    const supabase = createClient();
    await supabase.storage.from("media").remove([name]);
    load();
  }

  function copy(url: string) {
    navigator.clipboard?.writeText(url);
  }

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Afbeeldingen</h1>
        <p className={styles.lead}>
          Upload foto&apos;s en gebruik ze in projecten en reviews. Klik op een
          foto om de link te kopiëren.
        </p>
      </div>

      <label
        className={formStyles.btnPrimary}
        style={{ display: "inline-block" }}
      >
        {uploading ? "Bezig met uploaden…" : "Foto uploaden"}
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </label>

      <h2
        style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          margin: "2rem 0 0.75rem",
        }}
      >
        Geüploade foto&apos;s
      </h2>
      {loading ? (
        <p className={styles.empty}>Laden…</p>
      ) : files.length === 0 ? (
        <p className={styles.empty}>Nog geen foto&apos;s geüpload.</p>
      ) : (
        <div className={styles.mediaGrid}>
          {files.map((f) => (
            <div key={f.name} className={styles.mediaItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.url}
                alt=""
                onClick={() => copy(f.url)}
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                onClick={() => remove(f.name)}
                aria-label="Verwijderen"
                style={{
                  position: "absolute",
                  top: "0.4rem",
                  right: "0.4rem",
                  width: "1.6rem",
                  height: "1.6rem",
                  borderRadius: "999px",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <h2
        style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          margin: "2.5rem 0 0.5rem",
        }}
      >
        Bestaande foto&apos;s op de site
      </h2>
      <p className={styles.lead} style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
        Foto&apos;s die al in de website zitten. Klik om het pad te kopiëren en
        ergens in te plakken.
      </p>
      <div className={styles.mediaGrid}>
        {PUBLIC_IMAGES.map((src) => (
          <div key={src} className={styles.mediaItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              onClick={() => copy(src)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
