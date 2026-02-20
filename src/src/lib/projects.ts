export interface ProjectSection {
  title: string;
  insight: string;
  description: string;
  media?: string;
  caption?: string;
  layout?: 'image-left' | 'image-right';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  heroImage: string;
  gallery: string[];
  videoDemo?: string;
  technologies: string[];
  links: {
    github?: string;
    paper?: string;
    demo?: string;
    external?: string;
  };
  dates: {
    start: string;
    end: string;
  };
  featured: boolean;
  order: number;
  sections?: ProjectSection[];
}

export interface ProjectsData {
  projects: Project[];
}

// Simulate fetching from JSON file (Next.js 14 allows importing JSON directly)
import projectsData from '@/content/projects.json';

export async function getProjects(): Promise<Project[]> {
  // Sort by featured first, then by order
  const projects = (projectsData as ProjectsData).projects;
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.order - b.order;
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}
