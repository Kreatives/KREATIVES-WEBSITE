"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { seedDatabase } from "@/app/admin/actions";
import styles from "./forms.module.css";

export default function SeedButton() {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      className={styles.btnPrimary}
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await seedDatabase();
          if (res && !res.ok) {
            alert("Importeren mislukt:\n\n" + res.error);
          }
          router.refresh();
        })
      }
    >
      {pending ? "Bezig met importeren…" : "Importeer huidige website-inhoud"}
    </button>
  );
}
