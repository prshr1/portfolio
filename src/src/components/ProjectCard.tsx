'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';
import { staggerItem } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  variant?: 'compact' | 'featured';
}

export function ProjectCard({ project, variant = 'compact' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      variants={staggerItem}
      className={`group glass-morphism overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isFeatured ? 'col-span-1 md:col-span-2' : ''
      }`}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden aspect-video bg-gradient-radial from-blue-500/10 to-transparent">
          {project.heroImage && (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-cyan-400 font-semibold">View Project</span>
            <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7 7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
