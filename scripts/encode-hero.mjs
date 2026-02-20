#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULTS = {
  source: 'public/HeroVideo.mp4',
  outputDir: 'public/heroes/main-tabs',
  baseName: 'home-hero',
  start: '00:00:03',
  duration: '8',
  fps: '24',
  width: '1280',
  posterTime: '00:00:04',
  posterWidth: '1920',
  crfMp4: '25',
  crfWebm: '34',
  mp4Preset: 'slow',
};

const ENV_TO_KEY = {
  HERO_SOURCE: 'source',
  HERO_OUTPUT_DIR: 'outputDir',
  HERO_BASE_NAME: 'baseName',
  HERO_START: 'start',
  HERO_DURATION: 'duration',
  HERO_FPS: 'fps',
  HERO_WIDTH: 'width',
  HERO_POSTER_TIME: 'posterTime',
  HERO_POSTER_WIDTH: 'posterWidth',
  HERO_CRF_MP4: 'crfMp4',
  HERO_CRF_WEBM: 'crfWebm',
  HERO_MP4_PRESET: 'mp4Preset',
};

function printUsage() {
  console.log(`
Encode lightweight hero media from a source video.

Usage:
  npm run encode:hero -- [options]

Options:
  --source <path>         Source video file
  --output-dir <path>     Output directory
  --base-name <name>      Output base name (e.g. home-hero)
  --start <HH:MM:SS>      Clip start time
  --duration <seconds>    Clip duration
  --fps <number>          Output FPS
  --width <pixels>        Max video width
  --poster-time <time>    Poster capture timestamp
  --poster-width <pixels> Max poster width
  --crf-mp4 <number>      MP4 quality factor
  --crf-webm <number>     WebM quality factor
  --mp4-preset <preset>   x264 preset (ultrafast..veryslow)
  --help                  Show this message

Environment variable equivalents:
  HERO_SOURCE, HERO_OUTPUT_DIR, HERO_BASE_NAME, HERO_START, HERO_DURATION,
  HERO_FPS, HERO_WIDTH, HERO_POSTER_TIME, HERO_POSTER_WIDTH,
  HERO_CRF_MP4, HERO_CRF_WEBM, HERO_MP4_PRESET

Notes:
  - The source file is preserved.
  - Script aborts if any output path resolves to the same file as source.
`);
}

function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      opts.help = true;
      continue;
    }

    if (!token.startsWith('--')) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const body = token.slice(2);
    const eq = body.indexOf('=');
    let rawKey;
    let value;

    if (eq >= 0) {
      rawKey = body.slice(0, eq);
      value = body.slice(eq + 1);
    } else {
      rawKey = body;
      value = argv[i + 1];
      i += 1;
    }

    if (value === undefined || value.startsWith('--')) {
      throw new Error(`Missing value for --${rawKey}`);
    }

    opts[rawKey] = value;
  }
  return opts;
}

function normalizeKey(key) {
  const map = {
    source: 'source',
    'output-dir': 'outputDir',
    'base-name': 'baseName',
    start: 'start',
    duration: 'duration',
    fps: 'fps',
    width: 'width',
    'poster-time': 'posterTime',
    'poster-width': 'posterWidth',
    'crf-mp4': 'crfMp4',
    'crf-webm': 'crfWebm',
    'mp4-preset': 'mp4Preset',
  };
  return map[key] || null;
}

function asPositiveNumber(name, value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error(`${name} must be a positive number, got: ${value}`);
  }
  return String(n);
}

function runOrThrow(bin, args, label) {
  console.log(`\n[encode-hero] ${label}`);
  console.log(`[encode-hero] ${bin} ${args.join(' ')}`);
  const result = spawnSync(bin, args, { stdio: 'inherit' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
}

function fileSizeLabel(filePath) {
  const bytes = fs.statSync(filePath).size;
  const mb = (bytes / 1024 / 1024).toFixed(2);
  return `${path.relative(process.cwd(), filePath)} (${mb} MB)`;
}

function main() {
  const cli = parseArgs(process.argv.slice(2));
  if (cli.help) {
    printUsage();
    return;
  }

  const config = { ...DEFAULTS };

  for (const [envName, key] of Object.entries(ENV_TO_KEY)) {
    if (process.env[envName]) {
      config[key] = process.env[envName];
    }
  }

  for (const [rawKey, value] of Object.entries(cli)) {
    const key = normalizeKey(rawKey);
    if (!key) {
      throw new Error(`Unknown option: --${rawKey}`);
    }
    config[key] = value;
  }

  config.duration = asPositiveNumber('duration', config.duration);
  config.fps = asPositiveNumber('fps', config.fps);
  config.width = asPositiveNumber('width', config.width);
  config.posterWidth = asPositiveNumber('poster-width', config.posterWidth);
  config.crfMp4 = asPositiveNumber('crf-mp4', config.crfMp4);
  config.crfWebm = asPositiveNumber('crf-webm', config.crfWebm);

  const sourceAbs = path.resolve(config.source);
  const outputDirAbs = path.resolve(config.outputDir);
  const mp4Abs = path.join(outputDirAbs, `${config.baseName}.mp4`);
  const webmAbs = path.join(outputDirAbs, `${config.baseName}.webm`);
  const posterAbs = path.join(outputDirAbs, `${config.baseName}-poster.jpg`);

  if (!fs.existsSync(sourceAbs)) {
    throw new Error(`Source file not found: ${sourceAbs}`);
  }

  fs.mkdirSync(outputDirAbs, { recursive: true });

  const protectedPaths = new Set([mp4Abs, webmAbs, posterAbs].map((p) => path.resolve(p)));
  if (protectedPaths.has(sourceAbs)) {
    throw new Error('Source path conflicts with an output path. Choose a different --output-dir or --base-name.');
  }

  const ffmpegCheck = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  if (ffmpegCheck.error || ffmpegCheck.status !== 0) {
    throw new Error('ffmpeg is required but not available in PATH.');
  }

  const videoFilterMp4 = `scale=w=${config.width}:h=-2:force_original_aspect_ratio=decrease:flags=lanczos,fps=${config.fps},format=yuv420p`;
  const videoFilterWebm = `scale=w=${config.width}:h=-2:force_original_aspect_ratio=decrease:flags=lanczos,fps=${config.fps}`;
  const posterFilter = `scale=w=${config.posterWidth}:h=-2:force_original_aspect_ratio=decrease:flags=lanczos`;

  runOrThrow(
    'ffmpeg',
    [
      '-y',
      '-ss',
      config.start,
      '-t',
      config.duration,
      '-i',
      sourceAbs,
      '-an',
      '-vf',
      videoFilterMp4,
      '-c:v',
      'libx264',
      '-preset',
      config.mp4Preset,
      '-crf',
      config.crfMp4,
      '-movflags',
      '+faststart',
      mp4Abs,
    ],
    'Encoding MP4'
  );

  runOrThrow(
    'ffmpeg',
    [
      '-y',
      '-ss',
      config.start,
      '-t',
      config.duration,
      '-i',
      sourceAbs,
      '-an',
      '-vf',
      videoFilterWebm,
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      config.crfWebm,
      '-row-mt',
      '1',
      '-tile-columns',
      '2',
      '-deadline',
      'good',
      webmAbs,
    ],
    'Encoding WebM'
  );

  runOrThrow(
    'ffmpeg',
    [
      '-y',
      '-ss',
      config.posterTime,
      '-i',
      sourceAbs,
      '-update',
      '1',
      '-frames:v',
      '1',
      '-vf',
      posterFilter,
      posterAbs,
    ],
    'Exporting poster'
  );

  console.log('\n[encode-hero] Done.');
  console.log(`[encode-hero] Source preserved: ${path.relative(process.cwd(), sourceAbs)}`);
  console.log(`[encode-hero] Output: ${fileSizeLabel(mp4Abs)}`);
  console.log(`[encode-hero] Output: ${fileSizeLabel(webmAbs)}`);
  console.log(`[encode-hero] Output: ${fileSizeLabel(posterAbs)}`);
}

try {
  main();
} catch (err) {
  console.error(`\n[encode-hero] ERROR: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
