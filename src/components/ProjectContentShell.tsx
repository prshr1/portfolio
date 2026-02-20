'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { clsx } from '@/lib/utils';

interface ProjectContentShellProps {
  children: ReactNode;
  className?: string;
  motionKey?: string;
}

export function ProjectContentShell({
  children,
  className,
  motionKey,
}: ProjectContentShellProps) {
  return (
    <motion.section
      key={motionKey}
      className={clsx(className)}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.section>
  );
}
