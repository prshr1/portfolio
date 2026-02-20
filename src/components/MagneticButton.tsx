'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { interactionSpring, interactionTapScale } from '@/lib/animations';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (px). Default: 8 */
  strength?: number;
}

/**
 * Wraps any element and applies a subtle magnetic follow-the-cursor
 * displacement on hover, giving CTA buttons a tactile feel.
 */
export function MagneticButton({ children, className = '', strength = 8 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, interactionSpring);
  const springY = useSpring(y, interactionSpring);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / (rect.width / 2) * strength);
    y.set((e.clientY - cy) / (rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: interactionTapScale }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
