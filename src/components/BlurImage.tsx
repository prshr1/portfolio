'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type BlurImageProps = Omit<ImageProps, 'onLoad'> & {
  // Extra class applied to the wrapper div. The wrapper is positioned relative.
  wrapperClassName?: string;
};

// next/image wrapper with a lightweight skeleton that fades out after load.
export function BlurImage({ wrapperClassName, className, alt, ...rest }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const isFill = 'fill' in rest && rest.fill;
  const handleLoaded = () => setLoaded(true);

  return (
    <div className={`relative overflow-hidden ${isFill ? 'w-full h-full' : ''} ${wrapperClassName ?? ''}`}>
      <Image
        {...rest}
        alt={alt}
        className={`transition-opacity duration-500 opacity-100 ${className ?? ''}`}
        onLoad={handleLoaded}
        onError={handleLoaded}
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-white/5 transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}

