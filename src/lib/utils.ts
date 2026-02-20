export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(dateStr: string): string {
  if (dateStr.toLowerCase() === 'present') {
    return 'Present';
  }
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function getDuration(startStr: string, endStr: string): string {
  if (endStr.toLowerCase() === 'present') {
    const [startYear, startMonth] = startStr.split('-').map(Number);
    const start = new Date(startYear, startMonth - 1);
    const now = new Date();

    const monthsDiff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }

  const [startYear, startMonth] = startStr.split('-').map(Number);
  const [endYear, endMonth] = endStr.split('-').map(Number);

  const start = new Date(startYear, startMonth - 1);
  const end = new Date(endYear, endMonth - 1);

  const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;

  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
}

export function clsx(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Convert a hex colour to an RGB triplet string (e.g. "167 139 250").
 * Used to build rgba() via CSS custom properties with opacity support.
 */
export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Default project accent (site cyan). */
export const DEFAULT_ACCENT = '#6ee7ff';

/**
 * Returns inline style object that sets --accent and --accent-rgb
 * CSS custom properties for a given project accent colour.
 */
export function accentVars(hex: string | undefined): React.CSSProperties {
  const colour = hex || DEFAULT_ACCENT;
  return {
    '--accent': colour,
    '--accent-rgb': hexToRgb(colour),
  } as React.CSSProperties;
}
