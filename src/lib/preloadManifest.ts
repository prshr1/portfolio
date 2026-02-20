import 'server-only';

import fs from 'fs';
import path from 'path';
import { PRELOAD_ROUTES } from '@/lib/site';

export interface PreloadManifest {
  routeCandidates: string[];
}

export function getPreloadManifest(): PreloadManifest {
  const routes = new Set<string>(['/', ...PRELOAD_ROUTES]);
  const projectsRoot = path.join(process.cwd(), 'src', 'content', 'projects');

  if (fs.existsSync(projectsRoot)) {
    const projectEntries = fs.readdirSync(projectsRoot, { withFileTypes: true });
    projectEntries
      .filter((entry) => entry.isDirectory())
      .forEach((projectDir) => {
        routes.add(`/projects/${projectDir.name}`);

        const subpagesDir = path.join(projectsRoot, projectDir.name, 'subpages');
        if (!fs.existsSync(subpagesDir)) return;

        const subpageEntries = fs.readdirSync(subpagesDir, { withFileTypes: true });
        subpageEntries
          .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
          .forEach((entry) => {
            const subpageSlug = entry.name.replace(/\.mdx$/, '');
            routes.add(`/projects/${projectDir.name}/${subpageSlug}`);
          });
      });
  }

  return {
    routeCandidates: Array.from(routes),
  };
}
