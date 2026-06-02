import Link from "next/link";
import { dbProjects } from "@/lib/cms";
import { deleteProject } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminProjecten() {
  const projects = await dbProjects();

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Projecten</h1>
          <p className={styles.lead}>Voeg projecten toe, bewerk of verwijder ze.</p>
        </div>
        <Link href="/admin/projecten/new" className={styles.newBtn}>
          + Nieuw project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className={styles.empty}>Nog geen projecten.</p>
      ) : (
        <div className={styles.list}>
          {projects.map((p) => (
            <div key={p.id} className={styles.listRow}>
              <div className={styles.listThumb}>
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" />
                )}
              </div>
              <div className={styles.listMain}>
                <div className={styles.listTitle}>{p.name}</div>
                <div className={styles.listSub}>
                  {p.type} · /{p.slug}
                </div>
              </div>
              <div className={styles.listActions}>
                <Link href={`/admin/projecten/${p.id}`} className={styles.editLink}>
                  Bewerken
                </Link>
                <DeleteButton action={deleteProject} id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
