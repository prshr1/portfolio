'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface LightboxProps {
  images: string[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (nextIndex: number) => void;
}

export function Lightbox({ images, index, isOpen, onClose, onIndexChange }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const hasImages = images.length > 0;
  const safeIndex = hasImages ? Math.max(0, Math.min(index, images.length - 1)) : 0;

  const showNext = useCallback(() => {
    if (!hasImages) return;
    onIndexChange((safeIndex + 1) % images.length);
  }, [hasImages, images.length, onIndexChange, safeIndex]);

  const showPrev = useCallback(() => {
    if (!hasImages) return;
    onIndexChange((safeIndex - 1 + images.length) % images.length);
  }, [hasImages, images.length, onIndexChange, safeIndex]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, showNext, showPrev]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!mounted || !isOpen || !hasImages) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Close gallery"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-16 md:px-10 md:py-10">
        <div className="relative h-full w-full max-w-6xl">
          <Image
            src={images[safeIndex]}
            alt={`Gallery image ${safeIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-2 md:top-6 md:right-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm uppercase tracking-[0.2em] bg-white/10 text-white rounded-full hover:bg-white/20 transition"
        >
          Close
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 px-4 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
            aria-label="Previous image"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 px-4 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
            aria-label="Next image"
          >
            {'>'}
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-sm text-white/80">
            {safeIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>,
    document.body
  );
}
