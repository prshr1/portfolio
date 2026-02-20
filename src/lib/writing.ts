export interface Writing {
  id: string;
  slug: string;
  title: string;
  type: 'research' | 'technical' | 'essay';
  abstract: string;
  date: string;
  tags: string[];
  status: 'published' | 'in-progress' | 'preprint';
  relatedProjects?: string[];
  links: {
    pdf?: string;
    arxiv?: string;
    doi?: string;
    external?: string;
  };
}

interface WritingsData {
  writings: Writing[];
}

import writingsData from '@/content/writing.json';

const statusPriority: Record<Writing['status'], number> = {
  'in-progress': 0,
  preprint: 1,
  published: 2,
};

function parseWritingDate(date: string): { year: number; rank: number } {
  const parts = date.trim().match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (!parts) {
    return { year: -1, rank: Number.NEGATIVE_INFINITY };
  }

  const year = Number(parts[1]);
  const month = Number(parts[2] ?? 0);
  const day = Number(parts[3] ?? 0);

  return {
    year,
    rank: year * 10000 + month * 100 + day,
  };
}

export async function getWritings(): Promise<Writing[]> {
  const writings = [...(writingsData as WritingsData).writings];

  writings.sort((a, b) => {
    const aDate = parseWritingDate(a.date);
    const bDate = parseWritingDate(b.date);

    if (aDate.rank !== bDate.rank) {
      return bDate.rank - aDate.rank;
    }

    if (aDate.year === bDate.year) {
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      if (statusDiff !== 0) {
        return statusDiff;
      }
    }

    return a.title.localeCompare(b.title);
  });

  return writings;
}

export async function getWritingBySlug(slug: string): Promise<Writing | undefined> {
  const all = await getWritings();
  return all.find((w) => w.slug === slug);
}

export async function getWritingsByProjectSlug(projectSlug: string): Promise<Writing[]> {
  const all = await getWritings();
  return all.filter((w) => (w.relatedProjects || []).includes(projectSlug));
}
