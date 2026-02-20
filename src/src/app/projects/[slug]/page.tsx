import { Metadata } from 'next';
import { getProjectSlugs, getProjectBySlug, getProjects } from '@/lib/projects';
import ProjectDetailClient from './client';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.title} - Jorge Casas`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  const allProjects = await getProjects();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400">Project not found</p>
        </div>
      </div>
    );
  }

  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.slug !== params.slug &&
        p.tags.some((tag) => project.tags.includes(tag))
    )
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
