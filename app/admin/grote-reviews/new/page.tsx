import ReviewForm from "@/components/admin/ReviewForm";
import {
  featuredReviewCount,
  quoteReviewCount,
  bigReviewCount,
  HOMEPAGE_REVIEW_LIMIT,
  QUOTE_REVIEW_LIMIT,
  BIG_REVIEW_LIMIT,
} from "@/lib/cms";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function NewGroteReviewPage() {
  const [featuredCount, quoteCount, bigCount] = await Promise.all([
    featuredReviewCount(),
    quoteReviewCount(),
    bigReviewCount(),
  ]);
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuwe grote review</h1>
      </div>
      <ReviewForm
        featuredCount={featuredCount}
        limit={HOMEPAGE_REVIEW_LIMIT}
        quoteCount={quoteCount}
        quoteLimit={QUOTE_REVIEW_LIMIT}
        bigCount={bigCount}
        bigLimit={BIG_REVIEW_LIMIT}
        defaultBig
        backHref="/admin/grote-reviews"
      />
    </div>
  );
}
