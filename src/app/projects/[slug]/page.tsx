import React from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCaseStudyClient from "@/components/ProjectCaseStudyClient";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyClient project={project} />;
}
