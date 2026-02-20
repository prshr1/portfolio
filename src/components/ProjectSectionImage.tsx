'use client';

import { MarkdownText } from '@/components/MarkdownText';
import { shouldUseWhiteImageBg } from '@/lib/imagePresentation';
import { uiTextStyles } from '@/lib/ui';

interface ProjectSectionImageProps {
  src: string;
  alt: string;
  caption?: string;
  onOpen?: (src: string) => void;
}

export function ProjectSectionImage({ src, alt, caption, onOpen }: ProjectSectionImageProps) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  const useWhiteBg = shouldUseWhiteImageBg(src);

  return (
    <div className="space-y-3 w-full flex flex-col items-center">
      {isVideo ? (
        <video
          className="block w-full h-auto rounded-[1.25rem]"
          controls
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => onOpen?.(src)}
          disabled={!onOpen}
          className="block w-full text-left cursor-zoom-in disabled:cursor-default"
          aria-label="Open image"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`block w-full h-auto rounded-[1.25rem] ${useWhiteBg ? 'bg-white' : ''}`.trim()}
          />
        </button>
      )}
      {caption && (
        <MarkdownText
          content={caption}
          paragraphClassName={`${uiTextStyles.caption} mb-0`}
        />
      )}
    </div>
  );
}
