"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  markSubmissionRead,
  deleteSubmission,
  deleteSpamSubmissions,
} from "@/app/admin/actions";
import type { CmsSubmission } from "@/lib/cms";
import styles from "./SubmissionList.module.css";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubmissionList({
  submissions,
  spamIds = [],
}: {
  submissions: CmsSubmission[];
  spamIds?: string[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const spam = new Set(spamIds);

  function onDeleteSpam() {
    if (
      !confirm(
        `${spam.size} bericht${
          spam.size === 1 ? "" : "en"
        } herkend als spam. Definitief verwijderen?`
      )
    )
      return;
    start(async () => {
      await deleteSpamSubmissions();
      router.refresh();
    });
  }

  function toggle(s: CmsSubmission) {
    const next = open === s.id ? null : s.id;
    setOpen(next);
    if (next && !s.read) {
      start(async () => {
        await markSubmissionRead(s.id, true);
        router.refresh();
      });
    }
  }

  function onDelete(id: string) {
    if (!confirm("Deze inzending verwijderen?")) return;
    start(async () => {
      await deleteSubmission(id);
      router.refresh();
    });
  }

  function onToggleRead(s: CmsSubmission) {
    start(async () => {
      await markSubmissionRead(s.id, !s.read);
      router.refresh();
    });
  }

  return (
    <div className={styles.list}>
      {spam.size > 0 && (
        <div className={styles.spamBar}>
          <span>
            {spam.size} bericht{spam.size === 1 ? "" : "en"} herkend als spam.
          </span>
          <button
            type="button"
            className={styles.spamClear}
            onClick={onDeleteSpam}
            disabled={pending}
          >
            Verwijder alle spam
          </button>
        </div>
      )}

      {submissions.map((s) => {
        const isOpen = open === s.id;
        const isSpamRow = spam.has(s.id);
        return (
          <div
            key={s.id}
            className={`${styles.row} ${s.read ? "" : styles.unread} ${
              isSpamRow ? styles.spamRow : ""
            }`}
          >
            <button
              type="button"
              className={styles.summary}
              onClick={() => toggle(s)}
              aria-expanded={isOpen}
            >
              <span className={styles.dot} data-on={!s.read} aria-hidden />
              <span className={styles.main}>
                <span className={styles.name}>
                  {s.name}
                  {s.company ? ` · ${s.company}` : ""}
                </span>
                <span className={styles.preview}>{s.message}</span>
              </span>
              <span className={styles.meta}>
                {isSpamRow && <span className={styles.spamTag}>Spam</span>}
                {s.subject && <span className={styles.tag}>{s.subject}</span>}
                <span className={styles.date}>{formatDate(s.createdAt)}</span>
              </span>
            </button>

            {isOpen && (
              <div className={styles.body}>
                <dl className={styles.facts}>
                  <div>
                    <dt>E-mail</dt>
                    <dd>
                      <a href={`mailto:${s.email}`}>{s.email}</a>
                    </dd>
                  </div>
                  {s.company && (
                    <div>
                      <dt>Bedrijf</dt>
                      <dd>{s.company}</dd>
                    </div>
                  )}
                  {s.website && (
                    <div>
                      <dt>Website</dt>
                      <dd>
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.website}
                        </a>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Via</dt>
                    <dd>{s.source}</dd>
                  </div>
                </dl>

                <p className={styles.message}>{s.message}</p>

                <div className={styles.actions}>
                  <a className={styles.reply} href={`mailto:${s.email}`}>
                    Beantwoorden
                  </a>
                  <button
                    type="button"
                    className={styles.ghost}
                    onClick={() => onToggleRead(s)}
                    disabled={pending}
                  >
                    {s.read ? "Markeer als ongelezen" : "Markeer als gelezen"}
                  </button>
                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => onDelete(s.id)}
                    disabled={pending}
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
