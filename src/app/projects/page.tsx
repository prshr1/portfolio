<<<<<<< HEAD
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
=======
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectGrid } from '@/components/ProjectGrid';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Project } from '@/lib/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await import('@/content/projects.json');
      let allProjects = projectsData.projects as Project[];
      
      // Extract all unique tags
      const tags = Array.from(
        new Set(allProjects.flatMap((p) => p.tags))
      ).sort();
      
      setAllTags(tags);
      
      // Sort projects
      allProjects = allProjects.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return a.order - b.order;
      });
      
      setProjects(allProjects);
    };
    loadProjects();
  }, []);

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <motion.section
          className="pt-32 pb-20 container-max"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">All Projects</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              A collection of my research, engineering projects, and technical explorations spanning astrophysics, optimization, and aerospace.
            </p>
          </motion.div>
        </motion.section>

        {/* Filter Tags */}
        <section className="py-12 container-max">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-cyan-500 text-dark'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Projects
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-cyan-500 text-dark'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Projects Grid */}
        <section className="py-12 container-max">
          <ProjectGrid projects={filteredProjects} />
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No projects found for this tag.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
}
