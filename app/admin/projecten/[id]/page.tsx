import { notFound } from "next/navigation";
import { dbProject } from "@/lib/cms";
import ProjectForm from "@/components/admin/ProjectForm";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await dbProject(id);
  if (!project) notFound();

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Project bewerken</h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
