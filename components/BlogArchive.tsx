"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/blog";
import styles from "@/app/blog/blog.module.css";

export type ArchivePost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  image: string;
  tags: string[];
};

export default function BlogArchive({ posts }: { posts: ArchivePost[] }) {
  const [active, setActive] = useState("Alle");

  // Filter puur op het hoofdonderwerp van een artikel (de eerste tag). Zo
  // krijg je alleen echte blog-categorieën, elk met minstens één artikel.
  const categoryOf = (p: ArchivePost) => p.tags[0] ?? "";
  const categories = Array.from(
    new Set(posts.map(categoryOf).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, "nl"));
  const filters = ["Alle", ...categories];
  const shown =
    active === "Alle"
      ? posts
      : posts.filter((p) => categoryOf(p) === active);

  return (
    <>
      <div className={styles.filters} role="tablist" aria-label="Filter artikelen">
        {filters.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            className={`${styles.chip} ${active === c ? styles.chipOn : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className={styles.grid}>
        {shown.map((p) => (
          <li key={p.slug} className={styles.card}>
            <Link href={`/blog/${p.slug}`} className={styles.link}>
              <div className={styles.media}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.metaLine}>
                  {formatDate(p.date)} · {p.readingMinutes} min lezen
                </span>
                <h2 className={styles.cardTitle}>{p.title}</h2>
                <p className={styles.cardExcerpt}>{p.excerpt}</p>
                <ul className={styles.tags}>
                  {p.tags.map((t) => (
                    <li key={t} className={styles.tag}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
