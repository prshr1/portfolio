#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;

    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }

  return args;
}

async function sha256(filePath) {
  const file = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(file).digest('hex');
}

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
  } catch (error) {
    if (error && error.code === 'EXDEV') {
      await fs.copyFile(source, destination);
      await fs.unlink(source);
      return;
    }
    throw error;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = typeof args.slug === 'string' ? args.slug.trim() : '';
  const sourceArg = typeof args.source === 'string' ? args.source.trim() : '';
  const targetNameArg = typeof args.target === 'string' ? args.target.trim() : '';
  const keepSource = Boolean(args['keep-source']);

  if (!slug || !sourceArg) {
    console.error(
      [
        'Usage:',
        '  npm run publish:writing -- --slug <writing-slug> --source <uploads-path> [--target paper.pdf] [--keep-source]',
      ].join('\n')
    );
    process.exit(1);
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(scriptDir, '..');
  const sourcePath = path.resolve(projectRoot, sourceArg);
  const targetName = targetNameArg || path.basename(sourcePath);
  const destinationDir = path.join(projectRoot, 'public', 'writing', slug);
  const destinationPath = path.join(destinationDir, targetName);

  await fs.access(sourcePath);
  await fs.mkdir(destinationDir, { recursive: true });

  try {
    await fs.access(destinationPath);
    const [sourceHash, destinationHash] = await Promise.all([
      sha256(sourcePath),
      sha256(destinationPath),
    ]);

    if (sourceHash === destinationHash) {
      if (!keepSource) {
        await fs.unlink(sourcePath);
        console.log(`Removed duplicate source file: ${sourceArg}`);
      }

      console.log(`No publish needed. File already exists: /writing/${slug}/${targetName}`);
      return;
    }

    console.error(
      [
        'Destination already exists with different contents:',
        `  ${path.relative(projectRoot, destinationPath)}`,
        'Choose a different --target name or replace the destination manually.',
      ].join('\n')
    );
    process.exit(1);
  } catch (error) {
    if (!error || error.code !== 'ENOENT') {
      throw error;
    }
  }

  if (keepSource) {
    await fs.copyFile(sourcePath, destinationPath);
    console.log(`Copied file to: /writing/${slug}/${targetName}`);
  } else {
    await moveFile(sourcePath, destinationPath);
    console.log(`Moved file to: /writing/${slug}/${targetName}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
