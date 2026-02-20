'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface ContentPreloaderProps {
  routes: string[];
}

type NetworkProfile = 'slow' | 'moderate' | 'fast';

function getNetworkProfile(): NetworkProfile {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;

  if (!connection) return 'moderate';
  if (connection.saveData) return 'slow';

  const effectiveType = connection.effectiveType ?? '';
  if (effectiveType.includes('2g')) return 'slow';
  if (effectiveType === '3g') return 'moderate';
  return 'fast';
}

function getLikelyNextRoutes(pathname: string): string[] {
  if (pathname === '/') return ['/projects', '/writing'];
  if (pathname === '/projects') return ['/writing'];
  if (pathname === '/writing') return ['/projects'];
  if (pathname.startsWith('/projects/')) return ['/projects', '/writing'];
  return ['/projects'];
}

function normalizeRoute(href: string): string {
  const pathOnly = href.split('#')[0].split('?')[0] || '/';
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
}

export function ContentPreloader({ routes }: ContentPreloaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefetchedRoutesRef = useRef(new Set<string>());

  const routeCandidates = useMemo(
    () => Array.from(new Set(routes)).filter((route) => route !== pathname),
    [pathname, routes]
  );

  useEffect(() => {
    const profile = getNetworkProfile();
    const immediateBudget = profile === 'fast' ? 2 : profile === 'moderate' ? 1 : 0;
    const idleBudget = profile === 'fast' ? 3 : profile === 'moderate' ? 1 : 0;
    const imageBudget = 0;

    let cancelled = false;
    const timeoutIds: number[] = [];
    let idleId: number | undefined;

    const prefetchRoute = (route: string) => {
      const normalized = normalizeRoute(route);
      const current = normalizeRoute(pathname);
      if (normalized === current || prefetchedRoutesRef.current.has(normalized)) return;
      prefetchedRoutesRef.current.add(normalized);
      router.prefetch(normalized);
    };

    const likelyRoutes = getLikelyNextRoutes(pathname)
      .filter((route) => routeCandidates.includes(route))
      .slice(0, immediateBudget);

    likelyRoutes.forEach((route, index) => {
      const id = window.setTimeout(() => {
        if (!cancelled) {
          prefetchRoute(route);
        }
      }, index * 120);
      timeoutIds.push(id);
    });

    if (idleBudget > 0) {
      const idleRoutes = routeCandidates
        .filter((route) => !likelyRoutes.includes(route))
        .slice(0, idleBudget);

      const warmIdleRoutes = () => {
        idleRoutes.forEach((route, index) => {
          const id = window.setTimeout(() => {
            if (!cancelled) {
              prefetchRoute(route);
            }
          }, index * 140);
          timeoutIds.push(id);
        });
      };

      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(warmIdleRoutes, { timeout: 2500 });
      } else {
        warmIdleRoutes();
      }
    }

    const handleIntentPrefetch = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest('a[href^="/"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('/#')) return;
      prefetchRoute(href);
    };

    document.addEventListener('mouseover', handleIntentPrefetch, { passive: true });
    document.addEventListener('touchstart', handleIntentPrefetch, { passive: true });

    return () => {
      cancelled = true;
      document.removeEventListener('mouseover', handleIntentPrefetch);
      document.removeEventListener('touchstart', handleIntentPrefetch);
      timeoutIds.forEach((id) => window.clearTimeout(id));
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [pathname, routeCandidates, router]);

  return null;
}
