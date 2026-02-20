'use client';

import { ProjectSection as ProjectSectionBlock } from '@/components/ProjectSection';
import { ProjectSectionImage } from '@/components/ProjectSectionImage';
import type { ProjectSection as ProjectSectionType } from '@/lib/projects';
import { clsx } from '@/lib/utils';

interface ProjectSectionListProps {
  sections: ProjectSectionType[];
  onOpenImage?: (src: string) => void;
  className?: string;
}

export function ProjectSectionList({
  sections,
  onOpenImage,
  className,
}: ProjectSectionListProps) {
  return (
    <div className={clsx(className)}>
      {sections.map((section, idx) => {
        const mediaItems =
          section.mediaItems && section.mediaItems.length > 0
            ? section.mediaItems
            : section.media
              ? [{ src: section.media, caption: section.caption }]
              : [];

        return (
        <ProjectSectionBlock
          key={`${section.title}-${idx}`}
          title={section.title}
          insight={section.insight}
          description={section.description}
          layout={section.layout || (idx % 2 === 0 ? 'image-right' : 'image-left')}
          delay={idx * 0.1}
        >
          {mediaItems.length > 0 && (
            <div className="w-full space-y-4">
              {mediaItems.map((item, mediaIdx) => (
                <ProjectSectionImage
                  key={`${section.title}-media-${mediaIdx}`}
                  src={item.src}
                  alt={`${section.title} figure ${mediaIdx + 1}`}
                  caption={item.caption}
                  onOpen={onOpenImage}
                />
              ))}
            </div>
          )}
        </ProjectSectionBlock>
        );
      })}
    </div>
  );
}
