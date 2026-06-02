import ProjectForm from "@/components/admin/ProjectForm";
import { featuredProjectCount, HOMEPAGE_PROJECT_LIMIT } from "@/lib/cms";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const featuredCount = await featuredProjectCount();
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuw project</h1>
      </div>
      <ProjectForm featuredCount={featuredCount} limit={HOMEPAGE_PROJECT_LIMIT} />
    </div>
  );
}
