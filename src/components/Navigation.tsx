'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/LayoutPrimitives';
import { ThemeToggle } from '@/components/ThemeToggle';
import { interactionDuration, standardEase } from '@/lib/animations';
import { MAIN_NAV_ITEMS, RESUME_PATH } from '@/lib/site';
import { uiLinkStyles } from '@/lib/ui';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 text-slate-800 backdrop-blur border-b border-slate-200/80 dark:bg-dark/80 dark:text-white dark:border-white/10">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text font-display">
          JC
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={uiLinkStyles.nav}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={RESUME_PATH}
            download
            className={uiLinkStyles.navResume}
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="h-0.5 bg-slate-700 dark:bg-white origin-center"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: interactionDuration, ease: standardEase }}
          />
          <motion.span
            className="h-0.5 bg-slate-700 dark:bg-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: interactionDuration, ease: standardEase }}
          />
          <motion.span
            className="h-0.5 bg-slate-700 dark:bg-white origin-center"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: interactionDuration, ease: standardEase }}
          />
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: interactionDuration, ease: standardEase }}
            className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-darker/95 border-t border-slate-200/80 dark:border-white/10 backdrop-blur flex flex-col gap-4 p-6 md:hidden"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={uiLinkStyles.nav}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={RESUME_PATH}
              download
              className={uiLinkStyles.navResumeMobile}
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
          </motion.div>
        )}
      </Container>
    </nav>
  );
}
