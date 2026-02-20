import type { HTMLAttributes, ReactNode } from 'react';
import { clsx } from '@/lib/utils';

type ContainerTag = 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main' | 'article';
type SectionSpacing = 'regular' | 'tight' | 'none';

const sectionSpacingClasses: Record<SectionSpacing, string> = {
  regular: 'section-block',
  tight: 'section-block-tight',
  none: '',
};

export const layoutClassNames = {
  container: 'container-max',
  sectionRegular: 'section-block container-max',
  sectionTight: 'section-block-tight container-max',
  projectContentStandard: 'container-max pt-10 md:pt-12 pb-10',
  projectContentExtended: 'container-max pt-10 md:pt-12 pb-16 md:pb-20',
} as const;

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerTag;
  children: ReactNode;
}

interface SectionBlockProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  spacing?: SectionSpacing;
  withContainer?: boolean;
  children: ReactNode;
}

export function Container({
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={clsx(layoutClassNames.container, className)} {...props}>
      {children}
    </Tag>
  );
}

export function SectionBlock({
  as: Tag = 'section',
  spacing = 'regular',
  withContainer = true,
  className,
  children,
  ...props
}: SectionBlockProps) {
  return (
    <Tag
      className={clsx(
        withContainer && layoutClassNames.container,
        sectionSpacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
