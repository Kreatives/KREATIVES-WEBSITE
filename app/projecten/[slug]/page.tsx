import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RevealInit from "@/components/RevealInit";
import ProjectDetailView from "@/components/ProjectDetailView";
import { getProjectBySlug, getProjects } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project niet gevonden" };
  return {
    title: project.name,
    description: project.excerpt,
    alternates: { canonical: `/projecten/${project.slug}` },
    openGraph: {
      title: `${project.name} | KREATIVES`,
      description: project.excerpt,
      url: `/projecten/${project.slug}`,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const related = (await getProjects())
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <RevealInit />
      <ProjectDetailView
        project={project}
        related={related}
        locale="nl"
        basePath="/projecten"
      />
    </>
  );
}
