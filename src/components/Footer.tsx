<<<<<<< HEAD
﻿'use client';

import Link from 'next/link';
import { Container } from '@/components/LayoutPrimitives';
import { RESUME_PATH, SOCIAL_LINKS } from '@/lib/site';
import { uiLinkStyles } from '@/lib/ui';
=======
'use client';

import Link from 'next/link';
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<<<<<<< HEAD
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-darker/50 backdrop-blur mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2 font-display">Jorge Casas</h3>
=======
    <footer className="border-t border-white/10 bg-darker/50 backdrop-blur mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">Jorge Casas</h3>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            <p className="text-sm text-gray-400">
              Computational astrophysicist & mechanical engineer exploring the cosmos and designing solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
<<<<<<< HEAD
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-xs">
              <li>
                <Link href="/" className={uiLinkStyles.footer}>
=======
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                  Home
                </Link>
              </li>
              <li>
<<<<<<< HEAD
                <Link href="/projects" className={uiLinkStyles.footer}>
=======
                <Link href="/projects" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                  Projects
                </Link>
              </li>
              <li>
<<<<<<< HEAD
                <Link href="/#about" className={uiLinkStyles.footer}>
                  About
                </Link>
              </li>
              <li>
                <a href={RESUME_PATH} download className={uiLinkStyles.footer}>
                  Resume
                </a>
              </li>
=======
                <Link href="/#about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            </ul>
          </div>

          {/* Social Links */}
          <div>
<<<<<<< HEAD
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Follow</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={uiLinkStyles.footer}
=======
            <h4 className="text-sm font-semibold mb-4">Follow</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
<<<<<<< HEAD
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={uiLinkStyles.footer}
=======
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                >
                  LinkedIn
                </a>
              </li>
<<<<<<< HEAD
=======
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            </ul>
          </div>
        </div>

<<<<<<< HEAD
        <div className="border-t border-slate-200/80 dark:border-white/10 pt-8">
=======
        <div className="border-t border-white/10 pt-8">
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
          <p className="text-xs text-gray-500 text-center">
            © {currentYear} Jorge Casas. Built with Next.js, deployed via GitHub Pages.
          </p>
        </div>
<<<<<<< HEAD
      </Container>
    </footer>
  );
}


=======
      </div>
    </footer>
  );
}
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
