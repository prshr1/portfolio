'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/LayoutPrimitives';
import { ProjectSubpage } from '@/lib/projects';
import { uiSubpageNavStyles } from '@/lib/ui';

interface ProjectSubpageNavProps {
  projectSlug: string;
  subpages: ProjectSubpage[];
  activeSubpageSlug?: string;
}

export function ProjectSubpageNav({
  projectSlug,
  subpages,
  activeSubpageSlug,
}: ProjectSubpageNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [desktopOverflow, setDesktopOverflow] = useState(false);
  const desktopMeasureRef = useRef<HTMLDivElement | null>(null);

  if (!subpages || subpages.length === 0) {
    return null;
  }

  const orderedSubpages = useMemo(
    () => [...subpages].sort((a, b) => a.order - b.order),
    [subpages]
  );

  const activeLabel =
    activeSubpageSlug
      ? orderedSubpages.find((subpage) => subpage.slug === activeSubpageSlug)?.title || 'Overview'
      : 'Overview';

  useEffect(() => {
    const checkOverflow = () => {
      const row = desktopMeasureRef.current;
      if (!row) return;
      const doesOverflow = row.scrollWidth > row.clientWidth + 1;
      setDesktopOverflow(doesOverflow);
      if (!doesOverflow) {
        setIsDesktopDropdownOpen(false);
      }
    };

    const runCheck = () => {
      requestAnimationFrame(checkOverflow);
    };

    runCheck();

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(runCheck)
        : null;
    if (observer && desktopMeasureRef.current) {
      observer.observe(desktopMeasureRef.current);
    }

    window.addEventListener('resize', runCheck);

    const fonts = (document as Document & {
      fonts?: { ready?: Promise<unknown> };
    }).fonts;
    fonts?.ready?.then(runCheck).catch(() => undefined);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', runCheck);
    };
  }, [orderedSubpages]);

  const getDropdownLinkClass = (isActive: boolean) =>
    isActive ? uiSubpageNavStyles.dropdownLinkActive : uiSubpageNavStyles.dropdownLink;

  return (
    <div className={uiSubpageNavStyles.wrapper}>
      <div
        ref={desktopMeasureRef}
        className={uiSubpageNavStyles.measureRow}
        aria-hidden="true"
      >
        <span className={uiSubpageNavStyles.measureItem}>Overview</span>
        {orderedSubpages.map((subpage) => (
          <span
            key={`measure-${subpage.slug}`}
            className={uiSubpageNavStyles.measureItem}
          >
            {subpage.title}
          </span>
        ))}
      </div>

      <Container className={uiSubpageNavStyles.mobileContainer}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className={uiSubpageNavStyles.dropdownTrigger}
            aria-expanded={isMobileOpen}
            aria-controls="subpage-mobile-menu"
          >
            <span className="truncate">{activeLabel}</span>
            <span aria-hidden="true">{isMobileOpen ? '^' : 'v'}</span>
          </button>

          {isMobileOpen && (
            <div
              id="subpage-mobile-menu"
              className={uiSubpageNavStyles.dropdownPanel}
            >
              <Link
                href={`/projects/${projectSlug}/`}
                className={getDropdownLinkClass(!activeSubpageSlug)}
                onClick={() => setIsMobileOpen(false)}
              >
                Overview
              </Link>

              {orderedSubpages.map((subpage) => {
                const isActive = subpage.slug === activeSubpageSlug;
                return (
                  <Link
                    key={subpage.slug}
                    href={`/projects/${projectSlug}/${subpage.slug}/`}
                    className={getDropdownLinkClass(isActive)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {subpage.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </Container>

      {desktopOverflow ? (
        <Container className={uiSubpageNavStyles.desktopContainer}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDesktopDropdownOpen((prev) => !prev)}
              className={uiSubpageNavStyles.dropdownTrigger}
              aria-expanded={isDesktopDropdownOpen}
              aria-controls="subpage-desktop-menu"
            >
              <span className="truncate">{activeLabel}</span>
              <span aria-hidden="true">{isDesktopDropdownOpen ? '^' : 'v'}</span>
            </button>

            {isDesktopDropdownOpen && (
              <div
                id="subpage-desktop-menu"
                className={uiSubpageNavStyles.dropdownPanel}
              >
                <Link
                  href={`/projects/${projectSlug}/`}
                  className={getDropdownLinkClass(!activeSubpageSlug)}
                  onClick={() => setIsDesktopDropdownOpen(false)}
                >
                  Overview
                </Link>

                {orderedSubpages.map((subpage) => {
                  const isActive = subpage.slug === activeSubpageSlug;
                  return (
                    <Link
                      key={subpage.slug}
                      href={`/projects/${projectSlug}/${subpage.slug}/`}
                      className={getDropdownLinkClass(isActive)}
                      onClick={() => setIsDesktopDropdownOpen(false)}
                    >
                      {subpage.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      ) : (
        <div className={uiSubpageNavStyles.tabsRow}>
          <Link
            href={`/projects/${projectSlug}/`}
            className={!activeSubpageSlug ? uiSubpageNavStyles.tabActive : uiSubpageNavStyles.tab}
          >
            Overview
          </Link>

          {orderedSubpages.map((subpage) => {
            const isActive = subpage.slug === activeSubpageSlug;
            return (
              <Link
                key={subpage.slug}
                href={`/projects/${projectSlug}/${subpage.slug}/`}
                className={isActive ? uiSubpageNavStyles.tabActive : uiSubpageNavStyles.tab}
              >
                {subpage.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
