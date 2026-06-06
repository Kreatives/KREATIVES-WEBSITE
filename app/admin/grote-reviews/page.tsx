import Link from "next/link";
import { dbReviews, initialsOf } from "@/lib/cms";
import { deleteReview } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminGroteReviews() {
  const reviews = (await dbReviews()).filter((r) => r.bigFeatured);

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Grote reviews</h1>
          <p className={styles.lead}>
            De reviews met een grote 2:3 foto, in de foto-carrousel op de
            diensten- en werkwijze-pagina&apos;s.
          </p>
        </div>
        <Link href="/admin/grote-reviews/new" className={styles.newBtn}>
          + Nieuwe grote review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.empty}>
          Nog geen grote reviews. Voeg er één toe, of zet een bestaande review
          op &ldquo;grote review&rdquo; in de gewone reviews-lijst.
        </p>
      ) : (
        <div className={styles.list}>
          {reviews.map((r) => (
            <div key={r.id} className={styles.listRow}>
              {r.photo ? (
                <div className={styles.listThumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" />
                </div>
              ) : (
                <span
                  className={styles.listAvatar}
                  style={{ background: r.color }}
                >
                  {initialsOf(r.author)}
                </span>
              )}
              <div className={styles.listMain}>
                <div className={styles.listTitle}>
                  {r.title || r.author}
                  {!r.photo && (
                    <span className={styles.listTag}> · geen foto</span>
                  )}
                </div>
                <div className={styles.listSub}>
                  {r.author}
                  {r.company ? ` · ${r.company}` : ""}
                </div>
              </div>
              <div className={styles.listActions}>
                <Link
                  href={`/admin/grote-reviews/${r.id}`}
                  className={styles.editLink}
                >
                  Bewerken
                </Link>
                <DeleteButton action={deleteReview} id={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
