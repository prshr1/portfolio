import { SITE_URL } from '@/lib/site';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
