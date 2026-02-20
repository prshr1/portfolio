'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function ProjectFilters({ tags, selectedTag, onSelectTag }: ProjectFiltersProps) {
  const [useCompactFilters, setUseCompactFilters] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterViewportRef = useRef<HTMLDivElement | null>(null);
  const filterMeasureRef = useRef<HTMLDivElement | null>(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);

  const getPillClass = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
      isActive ? 'bg-cyan-500 text-dark' : 'bg-white/10 text-gray-300 hover:bg-white/20'
    }`;

  useEffect(() => {
    const viewport = filterViewportRef.current;
    const measure = filterMeasureRef.current;
    if (!viewport || !measure) return;

    const updateOverflowState = () => {
      const availableWidth = viewport.clientWidth;
      const requiredWidth = measure.scrollWidth;
      setUseCompactFilters(requiredWidth > availableWidth);
    };

    updateOverflowState();

    const observer = new ResizeObserver(updateOverflowState);
    observer.observe(viewport);
    observer.observe(measure);
    window.addEventListener('resize', updateOverflowState);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateOverflowState);
    };
  }, [tags]);

  useEffect(() => {
    if (!useCompactFilters) {
      setIsFilterMenuOpen(false);
    }
  }, [useCompactFilters]);

  useEffect(() => {
    if (!isFilterMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!filterMenuRef.current?.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFilterMenuOpen]);

  return (
    <div ref={filterViewportRef} className="relative">
      <div ref={filterMeasureRef} className="absolute h-0 overflow-hidden invisible pointer-events-none">
        <div className="inline-flex items-center gap-3 whitespace-nowrap">
          <span className={getPillClass(selectedTag === null)}>All Projects</span>
          {tags.map((tag) => (
            <span key={`measure-${tag}`} className={getPillClass(selectedTag === tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {useCompactFilters ? (
        <div className="flex items-center justify-start gap-3">
          <button
            type="button"
            onClick={() => {
              onSelectTag(null);
              setIsFilterMenuOpen(false);
            }}
            className={getPillClass(selectedTag === null)}
          >
            All Projects
          </button>

          <div ref={filterMenuRef} className="relative">
            <button
              type="button"
              aria-label="Open filters menu"
              aria-haspopup="menu"
              aria-expanded={isFilterMenuOpen}
              onClick={() => setIsFilterMenuOpen((prev) => !prev)}
              className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
                selectedTag
                  ? 'border-cyan-500/70 text-cyan-300 bg-cyan-500/10'
                  : 'border-white/20 text-gray-300 bg-white/10 hover:bg-white/20'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span>Filters</span>
            </button>

            {isFilterMenuOpen && (
              <div className="absolute left-0 mt-2 min-w-[14rem] glass-morphism p-2 z-20" role="menu" aria-label="Project filters">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      onSelectTag(tag);
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedTag === tag
                        ? 'bg-cyan-500 text-dark'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                    role="menuitem"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-nowrap items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className={getPillClass(selectedTag === null)}
          >
            All Projects
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag(tag)}
              className={getPillClass(selectedTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
