import FaqForm from "@/components/admin/FaqForm";
import styles from "../../admin.module.css";

export default function NewFaqPage() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuwe vraag</h1>
      </div>
      <FaqForm />
    </div>
  );
}
