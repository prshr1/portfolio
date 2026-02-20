'use client';

import Image from 'next/image';

interface ProjectSectionImageProps {
  src: string;
  alt: string;
  caption?: string;
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
      )}
    </div>
  );
}
