import { Metadata } from 'next';
import { getProjectCards } from '@/lib/projects';
import ProjectsPageClient from './client';

export const metadata: Metadata = {
  title: 'Projects — Jorge Casas',
  description: 'Research, engineering, and technical exploration projects.',
};

export default async function ProjectsPage() {
  const projects = await getProjectCards();
  return <ProjectsPageClient projects={projects} />;
}
