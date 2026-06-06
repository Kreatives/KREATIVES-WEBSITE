import { notFound } from "next/navigation";
import {
  dbReview,
  featuredReviewCount,
  quoteReviewCount,
  bigReviewCount,
  HOMEPAGE_REVIEW_LIMIT,
  QUOTE_REVIEW_LIMIT,
  BIG_REVIEW_LIMIT,
} from "@/lib/cms";
import ReviewForm from "@/components/admin/ReviewForm";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await dbReview(id);
  if (!review) notFound();
  const [featuredCount, quoteCount, bigCount] = await Promise.all([
    featuredReviewCount(id),
    quoteReviewCount(id),
    bigReviewCount(id),
  ]);

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Review bewerken</h1>
      </div>
      <ReviewForm
        review={review}
        featuredCount={featuredCount}
        limit={HOMEPAGE_REVIEW_LIMIT}
        quoteCount={quoteCount}
        quoteLimit={QUOTE_REVIEW_LIMIT}
        bigCount={bigCount}
        bigLimit={BIG_REVIEW_LIMIT}
      />
    </div>
  );
}
