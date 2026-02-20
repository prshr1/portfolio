'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  variant?: 'fadeInUp' | 'fadeIn';
  className?: string;
}

export function AnimatedSection({
  children,
  delay = 0,
  variant = 'fadeInUp',
  className = '',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const variants = {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[variant].initial}
      animate={inView ? variants[variant].animate : variants[variant].initial}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
