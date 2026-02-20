import { Metadata } from 'next';
<<<<<<< HEAD
import { getProjectSlugs, getProjectBySlug, getProjectMDXContent } from '@/lib/projects';
import { getWritingsByProjectSlug } from '@/lib/writing';
import { mdxComponents } from '@/components/mdx/MDXComponents';
=======
import { getProjectSlugs, getProjectBySlug, getProjects } from '@/lib/projects';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
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
<<<<<<< HEAD
=======
  const allProjects = await getProjects();
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400">Project not found</p>
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  // Load MDX content (rendered server-side, passed as children)
  const MDXContent = await getProjectMDXContent(params.slug);
  const relatedWritings = await getWritingsByProjectSlug(params.slug);
  const shouldRenderProjectBody =
    Boolean(MDXContent) && (!project.sections || project.sections.length === 0);

  return (
    <ProjectDetailClient project={project} relatedWritings={relatedWritings}>
      {shouldRenderProjectBody && MDXContent && (
        <div className="max-w-3xl">
          <MDXContent components={mdxComponents} />
        </div>
      )}
    </ProjectDetailClient>
  );
=======
  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.slug !== params.slug &&
        p.tags.some((tag) => project.tags.includes(tag))
    )
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
}
