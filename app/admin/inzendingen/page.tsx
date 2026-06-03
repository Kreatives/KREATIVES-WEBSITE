import { dbSubmissions } from "@/lib/cms";
import SubmissionList from "@/components/admin/SubmissionList";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminInzendingen() {
  const submissions = await dbSubmissions();
  const unread = submissions.filter((s) => !s.read).length;

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.head} style={{ marginBottom: 0 }}>
          <h1 className={styles.title}>E-mail inzendingen</h1>
          <p className={styles.lead}>
            Alles wat via de contactformulieren op de site binnenkomt.
            {unread > 0 ? ` ${unread} nieuw.` : ""}
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <p className={styles.empty}>
          Nog geen inzendingen. Zodra iemand een formulier invult, verschijnt
          het hier.
        </p>
      ) : (
        <SubmissionList submissions={submissions} />
      )}
    </div>
  );
}
