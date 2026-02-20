'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin accent-coloured progress bar anchored to the top of the viewport.
 * Shows how far the user has scrolled through the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-cyan-400"
      style={{ scaleX }}
    />
  );
}
