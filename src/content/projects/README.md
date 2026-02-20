# Projects MDX Authoring Guide

Use this folder as the source of truth for project content.

## Folder Structure

```text
src/content/projects/
  my-project-slug/
    index.mdx
    subpages/
      2026-milestone.mdx
```

Assets should live in:

```text
public/projects/my-project-slug/
```

Then reference them as:

```text
/projects/my-project-slug/filename.jpg
```

## Project Template (`index.mdx`)

```mdx
export const project = {
  "title": "Project Title",
  "shortDescription": "Optional: card-only subtitle; if omitted, cards auto-generate one",
  "tags": ["tag-a", "tag-b"],
  "heroImage": "/projects/my-project-slug/hero.jpg",
  "gallery": [
    "/projects/my-project-slug/shot-1.jpg",
    "/projects/my-project-slug/shot-2.jpg"
  ],
  "videoDemo": "/projects/my-project-slug/demo.mp4",
  "technologies": ["Python", "Next.js", "MATLAB"],
  "links": {
    "github": "https://github.com/org/repo",
    "paper": "",
    "documentation": ""
  },
  "dates": {
    "start": "2025-01",
    "end": "Present"
  },
  "draft": true,
  "featured": true,
  "order": 1,
  "accentColor": "#22d3ee"
}

Intro paragraph(s). This becomes the project overview.

## Section Title
**Insight:** One-line key takeaway (highlighted)

Section text paragraph(s) here.

![Section image](/projects/my-project-slug/section-image.jpg)
*Optional image caption*

![Optional second image](/projects/my-project-slug/section-image-2.jpg)
*Optional second image caption*
```

## Subpage Template (`subpages/<slug>.mdx`)

```mdx
export const meta = {
  "title": "2026: Milestone Title",
  "order": 1,
  "heroMedia": "/projects/my-project-slug/subpages/milestone-hero.jpg"
}

Short subpage intro paragraph.

## Section Title
**Insight:** One-line key takeaway

Section text paragraph(s) here.

![Section image](/projects/my-project-slug/subpages/milestone-image.jpg)
*Optional image caption*
```

## Rich Text Crash Course

- Bold: `**bold**`
- Italic: `*italic*`
- Inline code: `` `code` ``
- Code block:

```md
```ts
const x = 42;
```
```

- Links: `[label](https://example.com)`
- Bullets:

```md
- item one
- item two
```

- Numbered list:

```md
1. first
2. second
```

## Math (LaTeX)

Inline math:

```md
The bound is $2\sqrt{2}\,v_{\infty}$.
```

Block math:

```md
$$
\Delta v = \sqrt{\mu\left(\frac{2}{r} - \frac{1}{a}\right)}
$$
```

## Transparent Images on White

For transparent PNG/WebP assets that need a white backing, append `?bg=white` to the image path:

```md
![CAD render](/projects/my-project/nozzle.png?bg=white)
```

This keeps the original aspect ratio and resolution behavior while rendering transparent pixels on white.

## Section Parsing Rules (Important)

For each `##` section in body content:

1. First `**Insight:** ...` line becomes section insight.
2. Any markdown image lines become section media items (stacked vertically when rendered).
3. An italic line immediately after an image is used as that image's caption.
4. If no inline image caption is found, a trailing italic line is treated as caption for the last image (legacy behavior).
5. Everything else becomes section description text.

## Notes

- Do not store large narrative blocks in metadata.
- Keep prose in MDX body.
- Keep media paths under `public/projects/...`.
- Use `"draft": true` while developing a project. Drafts are hidden by default in both local and production.
- Set `INCLUDE_DRAFT_PROJECTS=true` to preview drafts locally; set `INCLUDE_DRAFT_PROJECTS=false` to force-hide drafts.
