"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./forms.module.css";

export default function DeleteButton({
  action,
  id,
  label = "Verwijderen",
}: {
  action: (id: string) => Promise<{ ok: boolean; error?: string }>;
  id: string;
  label?: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onClick() {
    if (!confirm("Weet je zeker dat je dit wilt verwijderen?")) return;
    start(async () => {
      await action(id);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className={styles.btnDanger}
      onClick={onClick}
      disabled={pending}
    >
      {pending ? "Bezig…" : label}
    </button>
  );
}
