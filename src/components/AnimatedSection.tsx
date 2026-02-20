'use client';

<<<<<<< HEAD
import { motion, Variants } from 'framer-motion';
import { fadeIn, fadeInUp, standardDuration, standardEase } from '@/lib/animations';
=======
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

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
<<<<<<< HEAD
  const variants: Record<'fadeInUp' | 'fadeIn', Variants> = {
    fadeInUp,
    fadeIn,
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: standardDuration, delay, ease: standardEase }}
=======
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const variants = {
    fadeInUp: {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
    },
  };

  // If not on client, render visible immediately
  if (!isClient) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[variant].initial}
      animate={inView ? variants[variant].animate : variants[variant].initial}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
      className={className}
    >
      {children}
    </motion.div>
  );
}
