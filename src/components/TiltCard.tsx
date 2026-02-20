'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interactionSpring } from '@/lib/animations';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default: 4 */
  maxTilt?: number;
}

/**
 * Wraps content in a container that tilts subtly toward the cursor on hover,
 * giving project cards a tactile 3D perspective feel.
 */
export function TiltCard({ children, className = '', maxTilt = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, interactionSpring);
  const springRotateY = useSpring(rotateY, interactionSpring);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // normalise -1 … +1
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
    // rotateX is driven by vertical position (negative because CSS convention)
    rotateX.set(-ny * maxTilt);
    rotateY.set(nx * maxTilt);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        willChange: 'transform',
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
