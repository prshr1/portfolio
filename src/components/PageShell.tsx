'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { clsx } from '@/lib/utils';

interface PageShellProps {
  children: ReactNode;
  topSlot?: ReactNode;
  rootClassName?: string;
  mainClassName?: string;
  rootStyle?: CSSProperties;
}

export function PageShell({
  children,
  topSlot,
  rootClassName,
  mainClassName,
  rootStyle,
}: PageShellProps) {
  return (
    <div className={clsx('min-h-screen flex flex-col', rootClassName)} style={rootStyle}>
      <Navigation />
      {topSlot && <div className="mt-[var(--nav-height)]">{topSlot}</div>}
      <main className={clsx('flex-1', mainClassName)}>{children}</main>
      <Footer />
    </div>
  );
}
