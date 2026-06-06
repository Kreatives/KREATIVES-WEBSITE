import BigReviewForm from "@/components/admin/BigReviewForm";
import { bigReviewCount, BIG_REVIEW_LIMIT } from "@/lib/cms";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function NewGroteReviewPage() {
  const count = await bigReviewCount();
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuwe grote review</h1>
      </div>
      <BigReviewForm count={count} limit={BIG_REVIEW_LIMIT} />
    </div>
  );
}
