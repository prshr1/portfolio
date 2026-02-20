'use client';

import { motion } from 'framer-motion';
import { standardDuration, standardEase } from '@/lib/animations';
import { MarkdownText } from '@/components/MarkdownText';
import { uiTextStyles } from '@/lib/ui';

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
          isImageRight ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
        }`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? -20 : 20 }}
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
      </div>
    </motion.section>
  );
}
