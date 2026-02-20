'use client';

import { useState } from 'react';
import { MarkdownText } from '@/components/MarkdownText';
import { shouldUseWhiteImageBg } from '@/lib/imagePresentation';
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  isVideoMedia,
} from '@/lib/media';
import { uiTextStyles } from '@/lib/ui';

interface ProjectSectionImageProps {
  src: string;
  alt: string;
  caption?: string;
  onOpen?: (src: string) => void;
}

export function ProjectSectionImage({ src, alt, caption, onOpen }: ProjectSectionImageProps) {
  const [isYouTubePlaying, setIsYouTubePlaying] = useState(false);
  const isVideo = isVideoMedia(src);
  const youTubeId = getYouTubeVideoId(src);
  const hasYouTube = Boolean(youTubeId);
  const useWhiteBg = shouldUseWhiteImageBg(src);

  return (
    <div className="space-y-3 w-full flex flex-col items-center">
      {hasYouTube ? (
        isYouTubePlaying && youTubeId ? (
          <div className="relative w-full overflow-hidden rounded-[1.25rem] aspect-video bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={getYouTubeEmbedUrl(youTubeId)}
              title={alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsYouTubePlaying(true)}
            className="relative block w-full text-left rounded-[1.25rem] overflow-hidden cursor-pointer group"
            aria-label={`Play video: ${alt}`}
          >
            {youTubeId && (
              <img
                src={getYouTubeThumbnailUrl(youTubeId)}
                alt={alt}
                loading="lazy"
                className="block w-full h-auto aspect-video object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-900 px-4 py-2 text-sm font-semibold">
                <span aria-hidden="true">{'>'}</span>
                Play on YouTube
              </span>
            </span>
          </button>
        )
      ) : isVideo ? (
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
