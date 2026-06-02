import { notFound } from "next/navigation";
import { dbFaq } from "@/lib/cms";
import FaqForm from "@/components/admin/FaqForm";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await dbFaq(id);
  if (!faq) notFound();

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Vraag bewerken</h1>
      </div>
      <FaqForm faq={faq} />
    </div>
  );
}
