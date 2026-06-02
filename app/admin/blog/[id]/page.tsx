import { notFound } from "next/navigation";
import { dbPost } from "@/lib/cms";
import BlogForm from "@/components/admin/BlogForm";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await dbPost(id);
  if (!post) notFound();

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Artikel bewerken</h1>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
