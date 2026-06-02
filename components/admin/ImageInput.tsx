"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./forms.module.css";

export default function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (upErr) {
      setError("Uploaden mislukt: " + upErr.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className={styles.image}>
      <div className={styles.preview}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <span className={styles.previewEmpty}>geen foto</span>
        )}
      </div>
      <div className={styles.uploadCol}>
        <input type="file" accept="image/*" onChange={onFile} disabled={uploading} />
        {uploading && <span className={styles.hint}>Bezig met uploaden…</span>}
        {error && <span className={styles.error}>{error}</span>}
        <input
          type="text"
          placeholder="of plak een afbeeldings-URL of pad"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
