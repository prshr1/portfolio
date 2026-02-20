'use client';

import { motion } from 'framer-motion';
<<<<<<< HEAD
import { ProjectCardData } from '@/lib/projects';
=======
import { Project } from '@/lib/projects';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
import { ProjectCard } from './ProjectCard';
import { staggerContainer } from '@/lib/animations';

interface ProjectGridProps {
<<<<<<< HEAD
  projects: ProjectCardData[];
  trigger?: 'mount' | 'inView';
  cardEffect?: 'tilt' | 'none';
}

export function ProjectGrid({ projects, trigger = 'inView', cardEffect = 'tilt' }: ProjectGridProps) {
  const animationProps =
    trigger === 'mount'
      ? { animate: 'animate' as const }
      : {
          whileInView: 'animate' as const,
          viewport: { once: true, amount: 0.08 },
        };

=======
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
<<<<<<< HEAD
      {...animationProps}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} effect={cardEffect} />
=======
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
      ))}
    </motion.div>
  );
}
