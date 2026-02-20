'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { canonicalTags, getCanonicalLabels } from '@/lib/canonicalTags';
import { ProjectCardData } from '@/lib/projects';

interface UseProjectTagFiltersResult {
  allTags: string[];
  filteredProjects: ProjectCardData[];
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
}

export function useProjectTagFilters(projects: ProjectCardData[]): UseProjectTagFiltersResult {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    return canonicalTags
      .filter((canonical) =>
        projects.some((project) =>
          project.tags.some((tag) => canonical.matchTags.includes(tag))
        )
      )
      .map((canonical) => canonical.label);
  }, [projects]);

  const projectCanonicalTags = useMemo(() => {
    const tagMap = new Map<string, string[]>();
    projects.forEach((project) => {
      tagMap.set(project.id, getCanonicalLabels(project.tags));
    });
    return tagMap;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => projectCanonicalTags.get(project.id)?.includes(selectedTag));
  }, [projects, projectCanonicalTags, selectedTag]);

  useEffect(() => {
    if (selectedTag && !allTags.includes(selectedTag)) {
      setSelectedTag(null);
    }
  }, [allTags, selectedTag]);

  return {
    allTags,
    filteredProjects,
    selectedTag,
    setSelectedTag,
  };
}
