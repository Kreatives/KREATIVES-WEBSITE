import { getPreviewPassword } from "@/lib/cms";
import PreviewPasswordForm from "@/components/admin/PreviewPasswordForm";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const current = await getPreviewPassword();

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Instellingen</h1>
        <p className={styles.lead}>
          Beheer het wachtwoord waarmee mensen de site alvast kunnen bekijken,
          zolang die nog op de &ldquo;binnenkort live&rdquo;-screen staat.
        </p>
      </div>
      <PreviewPasswordForm current={current} />
    </div>
  );
}
