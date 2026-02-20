'use client';

import { motion } from 'framer-motion';
import { standardDuration, standardEase } from '@/lib/animations';

interface SectionDividerProps {
  variant?: 'line' | 'minimal';
  className?: string;
}

export function SectionDivider({ variant = 'minimal', className = '' }: SectionDividerProps) {
  if (variant === 'line') {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: standardDuration, ease: standardEase }}
        viewport={{ once: true }}
        className={`h-px bg-white/10 my-12 ${className}`}
      />
    );
  }

  // minimal variant (default)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: standardDuration, ease: standardEase }}
      viewport={{ once: true }}
      className={`h-px bg-white/10 my-8 ${className}`}
    />
  );
}


