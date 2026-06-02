import { notFound } from "next/navigation";
import { dbReview } from "@/lib/cms";
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

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Review bewerken</h1>
      </div>
      <ReviewForm review={review} />
    </div>
  );
}
