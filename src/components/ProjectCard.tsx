'use client';

<<<<<<< HEAD
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ProjectCardData } from '@/lib/projects';
import { staggerItem, hoverLift } from '@/lib/animations';
import { accentVars } from '@/lib/utils';
import { BlurImage } from '@/components/BlurImage';
import { TiltCard } from '@/components/TiltCard';
import { getCanonicalLabels } from '@/lib/canonicalTags';
import { MarkdownText } from '@/components/MarkdownText';

interface ProjectCardProps {
  project: ProjectCardData;
  variant?: 'compact' | 'featured';
  effect?: 'tilt' | 'none';
}

export function ProjectCard({ project, variant = 'compact', effect = 'tilt' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isSingleLineTitle, setIsSingleLineTitle] = useState(false);
  const canonicalTag = getCanonicalLabels(project.tags)[0];
  const secondaryTag = project.tags.find(
    (tag) => !canonicalTag || tag.toLowerCase() !== canonicalTag.toLowerCase()
  );
  const displayTags = [canonicalTag, secondaryTag].filter(
    (tag): tag is string => typeof tag === 'string' && tag.length > 0
  );
  const displaySet = new Set(displayTags.map((tag) => tag.toLowerCase()));
  const remainingTags = project.tags.filter((tag) => !displaySet.has(tag.toLowerCase()));

  useEffect(() => {
    const measureTitleLines = () => {
      const el = titleRef.current;
      if (!el) return;
      const computed = window.getComputedStyle(el);
      let lineHeight = Number.parseFloat(computed.lineHeight);
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
        const fontSize = Number.parseFloat(computed.fontSize);
        lineHeight = Number.isFinite(fontSize) && fontSize > 0 ? fontSize * 1.2 : 0;
      }
      if (lineHeight <= 0) return;
      const titleHeight = el.getBoundingClientRect().height;
      const lineCount = Math.round(titleHeight / lineHeight);
      setIsSingleLineTitle(lineCount <= 1);
    };

    measureTitleLines();

    const observer =
      typeof ResizeObserver !== 'undefined' && titleRef.current
        ? new ResizeObserver(measureTitleLines)
        : null;
    if (observer && titleRef.current) {
      observer.observe(titleRef.current);
    }

    window.addEventListener('resize', measureTitleLines);
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(measureTitleLines).catch(() => undefined);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measureTitleLines);
    };
  }, [project.title]);

  const card = (
      <motion.div
        variants={staggerItem}
        whileHover="hover"
        whileTap="tap"
        style={accentVars(project.accentColor)}
        className={`group cv-auto glass-morphism ambient-panel overflow-hidden transition-all duration-300 accent-glow border border-white/10 hover:border-white/20 will-change-transform ${
          isFeatured ? 'col-span-1 md:col-span-2' : ''
        }`}
      >
      <Link href={`/projects/${project.slug}`} className="block w-full text-left">
        <motion.div variants={hoverLift} className="relative overflow-hidden aspect-video">
          {project.heroImage ? (
            <BlurImage
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover brightness-110 transition-transform duration-300 group-hover:scale-110"
              sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
              <span className="text-4xl opacity-20 font-display font-bold accent-text">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/12 group-hover:bg-black/20 transition-colors" />
        </motion.div>

        <div className="p-7 flex flex-col items-start">
          <h3
            ref={titleRef}
            className="w-full text-left text-lg leading-6 font-bold mb-2 group-hover:accent-text transition-colors font-display line-clamp-2"
          >
            {project.title}
          </h3>
          <MarkdownText
            content={project.shortDescription}
            paragraphClassName={`text-sm leading-6 text-gray-300 mb-4 text-left ${
              isSingleLineTitle ? 'line-clamp-3 min-h-[4.5rem]' : 'line-clamp-2 min-h-[3rem]'
            }`}
          />
          <div className="w-full self-start flex items-center justify-start gap-2 mb-5 text-left overflow-hidden whitespace-nowrap -ml-3 pr-3">
            {displayTags.map((tag, idx) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1.5 accent-tag rounded-full transition-all leading-tight text-left ${
                  idx === 0 ? 'max-w-[45%] shrink truncate' : 'max-w-[45%] shrink min-w-0 truncate'
                }`}
              >
                {tag.toLowerCase()}
              </span>
            ))}
            {remainingTags.length > 0 && (
              <span
                className="text-xs px-3 py-1.5 accent-tag rounded-full transition-all leading-tight text-left shrink-0"
                title={`more tags: ${remainingTags.map((tag) => tag.toLowerCase()).join(', ')}`}
                aria-label={`${remainingTags.length} more tags`}
              >
                ...
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 accent-text transition-colors">
            <span className="text-xs font-semibold">View Project</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
=======
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
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
<<<<<<< HEAD

  if (effect === 'none') {
    return card;
  }

  return <TiltCard>{card}</TiltCard>;
=======
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
}
