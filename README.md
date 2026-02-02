# personal-portfolio

Ethan Luxton’s personal portfolio site, built with React + Vite + React Router + Tailwind.

## Dev

- `yarn dev`
- `yarn lint`
- `yarn build`
- `yarn preview`

## On-site articles

On-site articles are authored as Markdown files in `content/articles/` and are published at:

- Index: `/articles` (shows on-site articles + existing external links)
- Article page: `/articles/:slug`

### Create a new article stub

```bash
npm run new:article -- --title "My New Post"
```

This creates a draft file in `content/articles/` with frontmatter. Set `draft: false` to publish.

### Frontmatter fields

Each article supports frontmatter like:

```yaml
---
title: "..."
slug: "..."            # optional (defaults from filename)
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"  # optional
excerpt: "..."
tags: ["...", "..."]   # optional
draft: false           # drafts excluded from production builds
coverImage: "/images/..." # optional
canonical: "https://..."  # optional
allowHtml: false          # optional (when true, HTML is sanitized)
---
```

### Markdown features

- GitHub-flavored markdown (tables, strikethrough, etc.)
- Autolinked headings and optional table of contents
- Syntax highlighted code blocks
- Simple callouts:

```md
> [!NOTE]
> A helpful note.

> [!WARNING]
> A warning.
```

### Images

Put images under `public/` (example: `public/images/articles/`) and reference them with absolute paths:

```md
![Alt text](/images/articles/my-image.png)
```

### Raw HTML (sanitized)

Raw HTML in Markdown is disabled by default. If you set `allowHtml: true`, HTML blocks are sanitized to a safe subset to avoid XSS (scripts/iframes/inline event handlers are not allowed).

### Validation and sitemap

- `yarn check:articles` validates frontmatter (dates, duplicate slugs, etc.)
- `yarn generate:sitemap` writes `public/sitemap.xml`
- `yarn build` runs both via `prebuild`
