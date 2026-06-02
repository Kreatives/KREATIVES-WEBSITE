import ReviewForm from "@/components/admin/ReviewForm";
import styles from "../../admin.module.css";

export default function NewReviewPage() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuwe review</h1>
      </div>
      <ReviewForm />
    </div>
  );
}
