import Link from "next/link";
import { dbReviews, initialsOf } from "@/lib/cms";
import { deleteReview } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminReviews() {
  const reviews = await dbReviews();

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.lead}>Voeg reviews toe, bewerk of verwijder ze.</p>
        </div>
        <Link href="/admin/reviews/new" className={styles.newBtn}>
          + Nieuwe review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.empty}>Nog geen reviews.</p>
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
                  {r.featured && (
                    <span className={styles.listTag}> · homepage</span>
                  )}
                  {r.quoteFeatured && (
                    <span className={styles.listTag}>
                      {" "}
                      · in hun eigen woorden
                    </span>
                  )}
                </div>
                <div className={styles.listSub}>
                  {r.author}
                  {r.company ? ` · ${r.company}` : ""}
                </div>
              </div>
              <div className={styles.listActions}>
                <Link href={`/admin/reviews/${r.id}`} className={styles.editLink}>
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
