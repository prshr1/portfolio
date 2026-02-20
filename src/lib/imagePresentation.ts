const WHITE_BG_VALUES = new Set(['white', 'light']);

export function shouldUseWhiteImageBg(src?: string | null): boolean {
  if (!src) return false;

  try {
    const parsed = new URL(src, 'http://localhost');
    const bg = parsed.searchParams.get('bg');
    if (bg && WHITE_BG_VALUES.has(bg.toLowerCase())) {
      return true;
    }

    const whiteBg = parsed.searchParams.get('whiteBg');
    if (whiteBg && ['1', 'true', 'yes'].includes(whiteBg.toLowerCase())) {
      return true;
    }
  } catch {
    // Ignore parse failures and fallback to simple token matching.
  }

  return /(?:[?#&]|^)white-bg(?:[=&]|$)/i.test(src);
}
