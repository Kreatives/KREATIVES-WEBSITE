"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approvePost, rejectPost } from "@/app/admin/actions";
import styles from "../../app/admin/admin.module.css";

export default function DraftActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function approve() {
    if (!confirm("Dit artikel goedkeuren en direct publiceren?")) return;
    setBusy(true);
    const res = await approvePost(id);
    setBusy(false);
    if (!res.ok) alert(res.error ?? "Publiceren mislukt.");
    router.refresh();
  }

  async function reject() {
    if (!confirm("Dit concept afwijzen?")) return;
    setBusy(true);
    const res = await rejectPost(id);
    setBusy(false);
    if (!res.ok) alert(res.error ?? "Afwijzen mislukt.");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <button
        type="button"
        onClick={approve}
        disabled={busy}
        className={styles.newBtn}
        style={{ padding: "0.5rem 0.9rem", fontSize: "0.85rem" }}
      >
        Goedkeuren &amp; publiceren
      </button>
      <button
        type="button"
        onClick={reject}
        disabled={busy}
        className={styles.editLink}
        style={{ background: "transparent", cursor: "pointer" }}
      >
        Afwijzen
      </button>
    </div>
  );
}
