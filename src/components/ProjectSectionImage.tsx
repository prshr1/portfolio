'use client';

<<<<<<< HEAD
import { MarkdownText } from '@/components/MarkdownText';
import { shouldUseWhiteImageBg } from '@/lib/imagePresentation';
import { uiTextStyles } from '@/lib/ui';
=======
import Image from 'next/image';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

interface ProjectSectionImageProps {
  src: string;
  alt: string;
  caption?: string;
<<<<<<< HEAD
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
=======
}

export function ProjectSectionImage({ src, alt, caption }: ProjectSectionImageProps) {
  return (
    <div className="space-y-3">
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {caption && (
        <p className="text-sm text-gray-400 italic text-center">{caption}</p>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
      )}
    </div>
  );
}
