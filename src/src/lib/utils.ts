export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function getDuration(startStr: string, endStr: string): string {
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
