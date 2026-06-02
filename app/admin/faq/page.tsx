import Link from "next/link";
import { dbFaqs } from "@/lib/cms";
import { deleteFaq } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminFaq() {
  const faqs = await dbFaqs();

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>Veelgestelde vragen</h1>
          <p className={styles.lead}>Voeg vragen toe, bewerk of verwijder ze.</p>
        </div>
        <Link href="/admin/faq/new" className={styles.newBtn}>
          + Nieuwe vraag
        </Link>
      </div>

      {faqs.length === 0 ? (
        <p className={styles.empty}>Nog geen vragen.</p>
      ) : (
        <div className={styles.list}>
          {faqs.map((f) => (
            <div key={f.id} className={styles.listRow}>
              <div className={styles.listMain}>
                <div className={styles.listTitle}>{f.question}</div>
                <div className={styles.listSub}>
                  <span className={styles.listTag}>{f.category}</span> · {f.answer}
                </div>
              </div>
              <div className={styles.listActions}>
                <Link href={`/admin/faq/${f.id}`} className={styles.editLink}>
                  Bewerken
                </Link>
                <DeleteButton action={deleteFaq} id={f.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
