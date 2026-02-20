# Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS, and Framer Motion. Static export is enabled for GitHub Pages.

## Quick Start

1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Build a static export: `npm run build`

## Project Content

Projects are discovered from [src/content/projects](src/content/projects). Each project lives in `src/content/projects/<slug>/index.mdx` and optional subpages in `src/content/projects/<slug>/subpages/*.mdx`.

Minimal example:

```json
{
	"id": "unique-id",
	"slug": "my-project",
	"title": "My Project",
	"shortDescription": "One-sentence summary.",
	"fullDescription": "Longer narrative for the project page.",
	"tags": ["astrophysics", "numerical-simulation"],
	"heroImage": "/projects/my-project/hero.jpg",
	"gallery": ["/projects/my-project/image-1.jpg"],
	"technologies": ["Python", "NumPy"],
	"links": {
		"github": "https://github.com/user/repo",
		"paper": "https://example.com/paper"
	},
	"dates": { "start": "2025-01", "end": "2025-06" },
	"featured": true,
	"order": 1,
	"sections": [
		{
			"title": "The Challenge",
			"insight": "Short key insight line",
			"description": "Paragraph explaining context.",
			"media": "/projects/my-project/section-1.jpg",
			"caption": "Optional caption",
			"layout": "image-right"
		}
	]
}
```

### Optional: Subpages (Subprojects)

If a project encompasses multiple distinct technical deep-dives or phases, you can add optional subpages. Each subpage appears as a tab on the project detail page and gets its own URL and metadata.

**Example with subpages:**

```json
{
	"id": "complex-project",
	"slug": "complex-project",
	"title": "Complex Project",
	...
	"subpages": [
		{
			"id": "component-one",
			"slug": "component-one",
			"title": "Component One: Thermal Analysis",
			"description": "Deep-dive into thermal design",
			"order": 1,
			"sections": [
				{
					"title": "Heat Transfer Model",
					"insight": "1D discretization with boundary layers",
					"description": "...",
					"media": "/projects/complex-project/thermal-model.jpg"
				}
			]
		},
		{
			"id": "component-two",
			"slug": "component-two",
			"title": "Component Two: Fabrication",
			"description": "Manufacturing process and results",
			"order": 2,
			"sections": [...]
		}
	]
}
```

**URL structure:**
- Main project: `/projects/complex-project/`
- Subpage: `/projects/complex-project/component-one/`
- Another subpage: `/projects/complex-project/component-two/`

**Navigation:**
- A sticky tab bar appears below the header when a project has subpages
- Each tab links to the corresponding subpage
- Each subpage has a "Back to [Project Name]" link

**SEO:**
- Each subpage generates its own metadata (title, description, Open Graph tags)
- Subpages are pre-rendered at build time and work with static export

**When to use subpages:**
- Multi-phase projects (design -> fabrication -> testing)
- Complex projects with distinct technical subsystems
- Projects that deserve multiple wiki-style documentation pages
- Avoid for simple projects; use regular `sections` instead

### Images and Media

Store images and videos under [public/projects](public/projects) in a folder matching the `slug`. Refer to them with paths like `/projects/my-project/hero.jpg`.

If you add a video demo, use the `videoDemo` field in the JSON entry. Supported format in the UI is MP4.

### Writing Content and Project Links

Writing entries are defined in [src/content/writing.json](src/content/writing.json) and typed in [src/lib/writing.ts](src/lib/writing.ts).

Minimal example:

```json
{
	"id": "my-writing-id",
	"slug": "my-writing-slug",
	"title": "My Writing Title",
	"type": "research",
	"abstract": "Summary text.",
	"date": "2026",
	"tags": ["astrophysics", "numerical-methods"],
	"status": "published",
	"relatedProjects": ["my-project"],
	"links": {
		"pdf": "/writing/my-writing-slug/paper.pdf"
	}
}
```

`relatedProjects` is optional. If omitted, no project page links are rendered.

Published writing files should live in [public/writing](public/writing). Use:

`npm run publish:writing -- --slug <writing-slug> --source <uploads-path> --target paper.pdf`

This command moves files from `uploads/` into `public/writing/<slug>/` (no duplicate copy by default) and removes the source file if it is an exact duplicate.

### Home Hero Video Encoding

Use the helper script to generate optimized hero assets (`.mp4`, `.webm`, and poster image):

`npm run encode:hero`

Custom example:

`npm run encode:hero -- --source public/HeroVideo.mp4 --start 00:00:05 --duration 6 --width 960 --fps 20 --crf-mp4 27 --crf-webm 36`

Notes:
- The source file is preserved.
- The script writes outputs to `public/heroes/main-tabs/` by default.
- It will stop with an error if an output path would overwrite the source.

### Canonical Project Filters

The Projects page uses a simplified, canonical filter list. Update mappings in [src/lib/canonicalTags.ts](src/lib/canonicalTags.ts).

If you add a new tag in JSON, either map it there or it will only be visible in individual project pages.

## Resume

Place your resume at [public/resume.pdf](public/resume.pdf). The navigation and hero buttons link to this file.

## Global Site Content

- Home page copy and sections: [src/app/HomeClient.tsx](src/app/HomeClient.tsx)
- Projects index UI: [src/app/projects/client.tsx](src/app/projects/client.tsx)
- Projects filter bar/dropdown behavior: [src/components/ProjectFilters.tsx](src/components/ProjectFilters.tsx)
- Projects tag filtering hook: [src/lib/useProjectTagFilters.ts](src/lib/useProjectTagFilters.ts)
- Project detail view: [src/app/projects/[slug]/client.tsx](src/app/projects/[slug]/client.tsx)
- Project detail shared content/section primitives: [src/components/ProjectContentShell.tsx](src/components/ProjectContentShell.tsx), [src/components/ProjectSectionList.tsx](src/components/ProjectSectionList.tsx)
- Navigation and footer: [src/components/Navigation.tsx](src/components/Navigation.tsx), [src/components/Footer.tsx](src/components/Footer.tsx)
- Site-wide links/constants (email, social, resume, nav, main-tab hero media): [src/lib/site.ts](src/lib/site.ts)
- Main-tab hero section component: [src/components/MainTabHero.tsx](src/components/MainTabHero.tsx)
- Shared empty-state component: [src/components/EmptyState.tsx](src/components/EmptyState.tsx)

## Styling and Theme

- Global styles: [src/app/globals.css](src/app/globals.css)
- Tailwind tokens: [tailwind.config.js](tailwind.config.js)
- Animation variants: [src/lib/animations.ts](src/lib/animations.ts)
- Shared layout primitives and section/container class tokens: [src/components/LayoutPrimitives.tsx](src/components/LayoutPrimitives.tsx)
- Smart network-aware route prefetch + hover intent prefetch: [src/components/ContentPreloader.tsx](src/components/ContentPreloader.tsx), [src/lib/preloadManifest.ts](src/lib/preloadManifest.ts)
- Browser-level speculative prefetch hints: [src/components/SpeculationRules.tsx](src/components/SpeculationRules.tsx)
- Route loading skeletons: [src/app/projects/loading.tsx](src/app/projects/loading.tsx), [src/app/writing/loading.tsx](src/app/writing/loading.tsx)

## SEO and Metadata

Update site-level metadata in [src/app/layout.tsx](src/app/layout.tsx). Project-level metadata is generated per project in [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx).

## Deployment Notes

Static export is enabled in [next.config.js](next.config.js) with `output: 'export'` and `trailingSlash: true` for GitHub Pages.

If deploying elsewhere, you can remove the export settings and configure normal Next.js hosting.

## Common Maintenance Tasks

- Add a project: create `src/content/projects/<slug>/index.mdx` and add assets under [public/projects](public/projects).
- Add a writing piece: publish the file into [public/writing](public/writing), then add metadata in [src/content/writing.json](src/content/writing.json).
- Add subpages to a project: add a `subpages` array to the project JSON (see example above). Each subpage will automatically appear as a tab on the project page and get its own URL.
- Reorder projects: update each project's exported metadata (`order` / `featured`) in `index.mdx`.
- Reorder subpages within a project: update the `order` value in each subpage object.
- Update social links: edit [src/lib/site.ts](src/lib/site.ts).
- Update contact email: edit [src/lib/site.ts](src/lib/site.ts).

