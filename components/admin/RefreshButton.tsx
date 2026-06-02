"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { refreshContent } from "@/app/admin/actions";
import styles from "./forms.module.css";

export default function RefreshButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className={styles.btnGhost}
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await refreshContent();
          if (res && !res.ok) {
            alert("Verversen mislukt:\n\n" + res.error);
          } else {
            setDone(true);
            setTimeout(() => setDone(false), 2500);
          }
          router.refresh();
        })
      }
    >
      {pending ? "Bezig…" : done ? "Bijgewerkt ✓" : "Inhoud ophalen & verversen"}
    </button>
  );
}
