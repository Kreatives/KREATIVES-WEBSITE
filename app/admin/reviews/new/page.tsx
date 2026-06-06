import ReviewForm from "@/components/admin/ReviewForm";
import {
  featuredReviewCount,
  quoteReviewCount,
  HOMEPAGE_REVIEW_LIMIT,
  QUOTE_REVIEW_LIMIT,
} from "@/lib/cms";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function NewReviewPage() {
  const [featuredCount, quoteCount] = await Promise.all([
    featuredReviewCount(),
    quoteReviewCount(),
  ]);
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuwe review</h1>
      </div>
      <ReviewForm
        featuredCount={featuredCount}
        limit={HOMEPAGE_REVIEW_LIMIT}
        quoteCount={quoteCount}
        quoteLimit={QUOTE_REVIEW_LIMIT}
      />
    </div>
  );
}
