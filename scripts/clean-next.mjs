#!/usr/bin/env node

import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const NEXT_DIR = '.next';

function cleanOnWindows() {
  const command = `if exist ${NEXT_DIR}\\* attrib -P -U /S /D ${NEXT_DIR}\\* & if exist ${NEXT_DIR} rmdir /s /q ${NEXT_DIR}`;
  const result = spawnSync('cmd.exe', ['/c', command], { stdio: 'inherit' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Windows clean command failed with code ${result.status}`);
  }
}

function cleanOnPosix() {
  fs.rmSync(NEXT_DIR, { recursive: true, force: true });
}

try {
  if (process.platform === 'win32') {
    cleanOnWindows();
  } else {
    cleanOnPosix();
  }
  console.log('[clean-next] Cleared .next successfully.');
} catch (error) {
  console.error(`[clean-next] Failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
