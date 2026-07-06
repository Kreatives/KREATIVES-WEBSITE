import Link from "next/link";
import { dbPosts } from "@/lib/cms";
import { deletePost } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import PipelinePanel from "@/components/admin/PipelinePanel";
import DraftActions from "@/components/admin/DraftActions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const all = await dbPosts();
  const drafts = all.filter((p) => p.status === "pending_review");
  const published = all.filter(
    (p) => p.status !== "pending_review" && p.status !== "rejected"
  );

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.lead}>
            Schrijf artikelen, keur concepten goed of verwijder ze.
          </p>
        </div>
        <Link href="/admin/blog/new" className={styles.newBtn}>
          + Nieuw artikel
        </Link>
      </div>

      <PipelinePanel />

      {drafts.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 className={styles.title} style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>
            Nog goed te keuren{" "}
            <span
              style={{
                fontSize: "0.8rem",
                background: "var(--orange, #fd6d17)",
                color: "#fff",
                borderRadius: 999,
                padding: "0.1rem 0.55rem",
                verticalAlign: "middle",
              }}
            >
              {drafts.length}
            </span>
          </h2>

          <div className={styles.list}>
            {drafts.map((p) => (
              <div
                key={p.id}
                className={styles.listRow}
                style={{ alignItems: "flex-start", flexWrap: "wrap" }}
              >
                <div className={styles.listMain} style={{ minWidth: 260 }}>
                  <div className={styles.listTitle}>{p.title}</div>
                  <div className={styles.listSub}>
                    Zoekwoord: <strong>{p.targetKeyword}</strong>
                    {p.tags?.length ? ` · ${p.tags.join(", ")}` : ""} ·{" "}
                    {p.readingMinutes} min · /{p.slug}
                  </div>
                  {p.keywordRationale && (
                    <div
                      className={styles.listSub}
                      style={{ fontStyle: "italic", marginTop: 4 }}
                    >
                      Waarom: {p.keywordRationale}
                    </div>
                  )}
                  {p.thumbnailAlt && (
                    <div className={styles.listSub} style={{ marginTop: 4 }}>
                      Beeld:{" "}
                      {p.imageStatus === "pending"
                        ? "prompts klaar (Higgsfield nog te draaien)"
                        : p.imageStatus}{" "}
                      · alt: “{p.thumbnailAlt}”
                    </div>
                  )}
                </div>
                <div
                  className={styles.listActions}
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  <DraftActions id={p.id} />
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <Link href={`/admin/blog/${p.id}`} className={styles.editLink}>
                      Bewerken
                    </Link>
                    <DeleteButton action={deletePost} id={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className={styles.title} style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>
        Gepubliceerd
      </h2>
      {published.length === 0 ? (
        <p className={styles.empty}>Nog geen gepubliceerde artikelen.</p>
      ) : (
        <div className={styles.list}>
          {published.map((p) => (
            <div key={p.id} className={styles.listRow}>
              <div className={styles.listThumb}>
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" />
                )}
              </div>
              <div className={styles.listMain}>
                <div className={styles.listTitle}>{p.title}</div>
                <div className={styles.listSub}>
                  {p.date} · {p.readingMinutes} min · /{p.slug}
                </div>
              </div>
              <div className={styles.listActions}>
                <Link href={`/admin/blog/${p.id}`} className={styles.editLink}>
                  Bewerken
                </Link>
                <DeleteButton action={deletePost} id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
