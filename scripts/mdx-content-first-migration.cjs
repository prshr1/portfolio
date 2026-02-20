const fs = require('fs');
const path = require('path');

const projectsRoot = path.join(process.cwd(), 'src', 'content', 'projects');

function parseNamedExport(source, exportName) {
  const marker = `export const ${exportName} =`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;

  const startObjIndex = source.indexOf('{', markerIndex);
  if (startObjIndex < 0) return null;

  let depth = 0;
  let inString = false;
  let quote = '';
  let escaped = false;
  let endObjIndex = -1;

  for (let i = startObjIndex; i < source.length; i += 1) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === quote) {
        inString = false;
        quote = '';
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        endObjIndex = i;
        break;
      }
    }
  }

  if (endObjIndex < 0) return null;

  const objText = source.slice(startObjIndex, endObjIndex + 1);
  const obj = JSON.parse(objText);
  const body = source.slice(endObjIndex + 1).trim();

  return { obj, body };
}

function sectionToMarkdown(section) {
  const lines = [];
  lines.push(`## ${section.title}`);
  if (section.insight && section.insight.trim()) {
    lines.push(`**Insight:** ${section.insight.trim()}`);
  }
  if (section.description && section.description.trim()) {
    lines.push('');
    lines.push(section.description.trim());
  }
  if (section.media && section.media.trim()) {
    lines.push('');
    const alt = section.title || 'Section image';
    lines.push(`![${alt}](${section.media.trim()})`);
  }
  if (section.caption && section.caption.trim()) {
    lines.push('');
    lines.push(`*${section.caption.trim()}*`);
  }
  return lines.join('\n').trim();
}

function rewriteFile(filepath, exportName) {
  const source = fs.readFileSync(filepath, 'utf8').replace(/^\uFEFF/, '');
  const parsed = parseNamedExport(source, exportName);
  if (!parsed) return false;

  const { obj } = parsed;
  let body = parsed.body.trim();

  const hasSectionsInBody = /^##\s+/m.test(body);
  const mdxSections = Array.isArray(obj.sections)
    ? obj.sections.map(sectionToMarkdown).filter(Boolean)
    : [];

  const bodyParts = [];
  if (body) {
    bodyParts.push(body);
  } else if (exportName === 'project' && typeof obj.fullDescription === 'string' && obj.fullDescription.trim()) {
    bodyParts.push(obj.fullDescription.trim());
  } else if (exportName === 'meta' && typeof obj.description === 'string' && obj.description.trim()) {
    bodyParts.push(obj.description.trim());
  }

  if (!hasSectionsInBody && mdxSections.length > 0) {
    bodyParts.push(mdxSections.join('\n\n'));
  }

  if (exportName === 'project') {
    delete obj.fullDescription;
  } else {
    delete obj.description;
  }
  delete obj.sections;

  const rewritten = [
    `export const ${exportName} = ${JSON.stringify(obj, null, 2)}`,
    bodyParts.join('\n\n').trim(),
  ]
    .filter((part) => Boolean(part && part.trim()))
    .join('\n\n')
    .trim() + '\n';

  fs.writeFileSync(filepath, rewritten);
  return true;
}

function main() {
  const projectDirs = fs.readdirSync(projectsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  let rewrittenProjects = 0;
  let rewrittenSubpages = 0;

  for (const entry of projectDirs) {
    const indexPath = path.join(projectsRoot, entry.name, 'index.mdx');
    if (fs.existsSync(indexPath) && rewriteFile(indexPath, 'project')) {
      rewrittenProjects += 1;
    }

    const subpagesDir = path.join(projectsRoot, entry.name, 'subpages');
    if (!fs.existsSync(subpagesDir)) continue;

    const subpageFiles = fs
      .readdirSync(subpagesDir, { withFileTypes: true })
      .filter((file) => file.isFile() && file.name.endsWith('.mdx'));

    for (const file of subpageFiles) {
      if (rewriteFile(path.join(subpagesDir, file.name), 'meta')) {
        rewrittenSubpages += 1;
      }
    }
  }

  console.log(`Rewrote ${rewrittenProjects} project files and ${rewrittenSubpages} subpage files.`);
}

main();
