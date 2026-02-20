'use client';

import { useCallback, useState } from 'react';

export function useLightbox(images: string[]) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightboxBySrc = useCallback(
    (src: string) => {
      const index = images.indexOf(src);
      if (index === -1) return;
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    },
    [images]
  );

  return {
    lightboxIndex,
    setLightboxIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    openLightboxBySrc,
  };
}
