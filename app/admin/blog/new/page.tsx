import BlogForm from "@/components/admin/BlogForm";
import styles from "../../admin.module.css";

export default function NewPostPage() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuw artikel</h1>
      </div>
      <BlogForm />
    </div>
  );
}
