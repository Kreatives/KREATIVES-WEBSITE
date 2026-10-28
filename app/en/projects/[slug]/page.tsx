import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RevealInit from "@/components/RevealInit";
import ProjectDetailView from "@/components/ProjectDetailView";
import {
  projectenEn,
  getProjectEn,
  getRelatedProjectsEn,
} from "@/lib/projecten-en";

export function generateStaticParams() {
  return projectenEn.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectEn(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.excerpt,
    alternates: { canonical: `/en/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | KREATIVES`,
      description: project.excerpt,
      url: `/en/projects/${project.slug}`,
      images: [project.image],
    },
  };
}

export default async function EnProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectEn(slug);
  if (!project) notFound();
  const related = getRelatedProjectsEn(slug).map((p) => ({
    slug: p.slug,
    name: p.name,
    type: p.type,
    image: p.image,
  }));

  return (
    <>
      <RevealInit />
      <ProjectDetailView
        project={project}
        related={related}
        locale="en"
        basePath="/en/projects"
      />
    </>
  );
}
