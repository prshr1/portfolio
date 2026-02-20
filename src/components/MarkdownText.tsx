'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { shouldUseWhiteImageBg } from '@/lib/imagePresentation';
import { uiTextStyles } from '@/lib/ui';
import { clsx } from '@/lib/utils';

interface MarkdownTextProps {
  content: string;
  className?: string;
  paragraphClassName?: string;
}

export function MarkdownText({
  content,
  className,
  paragraphClassName = uiTextStyles.bodyParagraph,
}: MarkdownTextProps) {
  if (!content || !content.trim()) return null;

  return (
    <div className={clsx(className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className={paragraphClassName}>{children}</p>,
          ul: ({ children }) => <ul className={uiTextStyles.bodyList}>{children}</ul>,
          ol: ({ children }) => <ol className={uiTextStyles.bodyListOrdered}>{children}</ol>,
          li: ({ children }) => <li className={uiTextStyles.bodyListItem}>{children}</li>,
          strong: ({ children }) => <strong className={uiTextStyles.strong}>{children}</strong>,
          em: ({ children }) => <em className={uiTextStyles.emphasis}>{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={uiTextStyles.link}
            >
              {children}
            </a>
          ),
          img: ({ src, alt = '' }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src || ''}
              alt={alt}
              loading="lazy"
              className={`block max-w-full h-auto rounded-[1.25rem] my-4 mx-auto ${
                shouldUseWhiteImageBg(src) ? 'bg-white' : ''
              }`.trim()}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
