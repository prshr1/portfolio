const VIDEO_MEDIA_REGEX = /\.(mp4|mov|webm)(?:[?#].*)?$/i;
const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

function readIdFromPathSegment(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null;
  const value = pathname.slice(prefix.length).split('/')[0];
  if (!value) return null;
  return YOUTUBE_ID_REGEX.test(value) ? value : null;
}

export function isVideoMedia(media: string): boolean {
  return VIDEO_MEDIA_REGEX.test(media.trim());
}

export function getYouTubeVideoId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;

  if (host === 'youtu.be' || host === 'www.youtu.be') {
    const candidate = pathname.replace(/^\/+/, '').split('/')[0];
    return YOUTUBE_ID_REGEX.test(candidate) ? candidate : null;
  }

  const isYouTubeHost =
    host === 'youtube.com' ||
    host === 'www.youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'youtube-nocookie.com' ||
    host === 'www.youtube-nocookie.com';

  if (!isYouTubeHost) return null;

  const watchId = parsed.searchParams.get('v');
  if (watchId && YOUTUBE_ID_REGEX.test(watchId)) {
    return watchId;
  }

  const embeddedId =
    readIdFromPathSegment(pathname, '/embed/') ||
    readIdFromPathSegment(pathname, '/shorts/') ||
    readIdFromPathSegment(pathname, '/live/') ||
    readIdFromPathSegment(pathname, '/v/');

  return embeddedId;
}

export function isYouTubeUrl(input: string): boolean {
  return getYouTubeVideoId(input) !== null;
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}
