import ProjectForm from "@/components/admin/ProjectForm";
import styles from "../../admin.module.css";

export default function NewProjectPage() {
  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Nieuw project</h1>
      </div>
      <ProjectForm />
    </div>
  );
}
