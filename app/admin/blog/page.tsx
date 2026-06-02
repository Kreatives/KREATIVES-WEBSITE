import Link from "next/link";
import { dbPosts } from "@/lib/cms";
import { deletePost } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const posts = await dbPosts();

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.lead}>Schrijf artikelen, bewerk of verwijder ze.</p>
        </div>
        <Link href="/admin/blog/new" className={styles.newBtn}>
          + Nieuw artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nog geen artikelen.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((p) => (
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
