'use client';

import { motion } from 'framer-motion';
<<<<<<< HEAD
import { standardDuration, standardEase } from '@/lib/animations';
import { MarkdownText } from '@/components/MarkdownText';
import { uiTextStyles } from '@/lib/ui';
=======
import { useInView } from 'react-intersection-observer';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

interface ProjectSectionProps {
  title: string;
  insight: string;
  description: string;
  children?: React.ReactNode;
  layout?: 'image-left' | 'image-right';
  delay?: number;
}

export function ProjectSection({
  title,
  insight,
  description,
  children,
  layout = 'image-right',
  delay = 0,
}: ProjectSectionProps) {
<<<<<<< HEAD
  const isImageRight = layout === 'image-right';
  const hasMedia = Boolean(children);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: standardDuration, ease: standardEase, delay }}
      className="mb-20 md:mb-24"
    >
      <div
        className={`grid grid-cols-1 ${hasMedia ? 'lg:grid-cols-2' : ''} gap-12 items-center ${
=======
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isImageRight = layout === 'image-right';

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-24"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
          isImageRight ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
        }`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? -20 : 20 }}
<<<<<<< HEAD
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: standardDuration, ease: standardEase, delay: delay + 0.1 }}
          className={isImageRight ? 'lg:pr-8' : 'lg:pl-8'}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
          <MarkdownText
            content={insight}
            paragraphClassName={`${uiTextStyles.insight} mb-6`}
          />
          <MarkdownText
            content={description}
            paragraphClassName={uiTextStyles.bodyParagraph}
          />
        </motion.div>

        {/* Media Content */}
        {hasMedia && (
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: standardDuration, ease: standardEase, delay: delay + 0.2 }}
            className={`${isImageRight ? '' : 'lg:col-start-1'} flex items-center justify-center`}
          >
            {children}
          </motion.div>
        )}
=======
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isImageRight ? -20 : 20 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
          className={isImageRight ? 'lg:pr-8' : 'lg:pl-8'}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
          <div className="flex items-start gap-3 mb-6">
            <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
            <p className="text-lg text-cyan-300 font-semibold leading-relaxed">{insight}</p>
          </div>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg">{description}</p>
        </motion.div>

        {/* Media Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? 20 : -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isImageRight ? 20 : -20 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className={isImageRight ? '' : 'lg:col-start-1'}
        >
          {children}
        </motion.div>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
      </div>
    </motion.section>
  );
}
