import { notFound } from "next/navigation";
import { dbBigReview, bigReviewCount, BIG_REVIEW_LIMIT } from "@/lib/cms";
import BigReviewForm from "@/components/admin/BigReviewForm";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditGroteReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await dbBigReview(id);
  if (!review) notFound();
  const count = await bigReviewCount(id);

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Grote review bewerken</h1>
      </div>
      <BigReviewForm review={review} count={count} limit={BIG_REVIEW_LIMIT} />
    </div>
  );
}
