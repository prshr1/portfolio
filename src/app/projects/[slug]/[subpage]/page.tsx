import { Metadata } from 'next';
import {
  getProjectBySlug,
  getProjectSubpage,
  getProjectSubpageMDXContent,
  getSubpageParamsList,
} from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import ProjectSubpageClient from './client';

export async function generateStaticParams() {
  const params = await getSubpageParamsList();
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; subpage: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  const subpage = await getProjectSubpage(params.slug, params.subpage);

  if (!project || !subpage) {
    return { title: 'Not Found' };
  }

  const canonicalUrl = absoluteUrl(`/projects/${params.slug}/${params.subpage}`);

  return {
    title: `${subpage.title} - ${project.title}`,
    description: subpage.description,
    openGraph: {
      title: `${subpage.title} - ${project.title}`,
      description: subpage.description,
      url: canonicalUrl,
      images: [
        {
          url: absoluteUrl(project.heroImage),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectSubpagePage({
  params,
}: {
  params: { slug: string; subpage: string };
}) {
  const project = await getProjectBySlug(params.slug);
  const subpage = await getProjectSubpage(params.slug, params.subpage);
  const SubpageMDXContent = await getProjectSubpageMDXContent(params.slug, params.subpage);
  const shouldRenderSubpageBody =
    Boolean(SubpageMDXContent) && (!subpage?.sections || subpage.sections.length === 0);

  if (!project || !subpage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Not Found</h1>
          <p className="text-gray-400">This subpage does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <ProjectSubpageClient project={project} subpage={subpage}>
      {shouldRenderSubpageBody && SubpageMDXContent && (
        <div className="max-w-3xl">
          <SubpageMDXContent components={mdxComponents} />
        </div>
      )}
    </ProjectSubpageClient>
  );
}
