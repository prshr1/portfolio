'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Container } from '@/components/LayoutPrimitives';
import { ThemeToggle } from '@/components/ThemeToggle';
import { interactionDuration, standardEase } from '@/lib/animations';
import { MAIN_NAV_ITEMS, RESUME_PATH } from '@/lib/site';
import { uiLinkStyles } from '@/lib/ui';
=======
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 text-slate-800 backdrop-blur border-b border-slate-200/80 dark:bg-dark/80 dark:text-white dark:border-white/10">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text font-display">
=======
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold gradient-text">
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
          JC
        </Link>

        {/* Desktop Navigation */}
<<<<<<< HEAD
        <div className="hidden md:flex items-center gap-8">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={uiLinkStyles.nav}
=======
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-cyan-400 transition-colors"
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            >
              {item.label}
            </Link>
          ))}
<<<<<<< HEAD
          <a
            href={RESUME_PATH}
            download
            className={uiLinkStyles.navResume}
          >
            Resume
          </a>
          <ThemeToggle />
=======
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
<<<<<<< HEAD
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
=======
            className="h-0.5 bg-white origin-center"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 bg-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 bg-white origin-center"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
          />
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
<<<<<<< HEAD
            transition={{ duration: interactionDuration, ease: standardEase }}
            className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-darker/95 border-t border-slate-200/80 dark:border-white/10 backdrop-blur flex flex-col gap-4 p-6 md:hidden"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={uiLinkStyles.nav}
=======
            className="absolute top-16 left-0 right-0 bg-darker/95 backdrop-blur flex flex-col gap-4 p-6 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-cyan-400 transition-colors"
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
<<<<<<< HEAD
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
=======
          </motion.div>
        )}
      </div>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
    </nav>
  );
}
