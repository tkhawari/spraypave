# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro + Tailwind static marketing site for **Illawarra Spray Pave**, deployed via GitHub Actions to a self-hosted Caddy container behind a Cloudflare Tunnel.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/ — run before every push
npm run preview   # Preview the production build locally
npm run astro     # Run Astro CLI commands (e.g. astro check, astro add)
```

There is no test suite.

## Git workflow

- `main` is protected — never push directly to it
- All changes go through PRs: `gh pr create`
- Branch naming: `feature/x`, `fix/x`, `content/x`
- Commit messages: imperative mood (e.g. "Add hero section", not "Added hero section")
- Always run `npm run build` successfully before pushing

## Architecture

Astro 6 static site with Tailwind CSS v4 (loaded via `@tailwindcss/vite`, not a PostCSS plugin), MDX, RSS, and sitemap integrations.

### Project structure

| Path | Purpose |
|---|---|
| `src/pages/` | File-based routes |
| `src/content/blog/` | Blog posts (`.md` / `.mdx`) |
| `src/components/` | Astro components |
| `src/consts.ts` | `SITE_TITLE`, `SITE_DESCRIPTION`, and other site-wide constants |
| `src/layouts/BlogPost.astro` | Layout wrapper for all blog posts |
| `src/styles/global.css` | Global Tailwind/CSS styles |
| `astro.config.mjs` | Integrations, site URL, local font config |

### Content collections

Blog posts in `src/content/blog/` use this frontmatter schema (defined in `src/content.config.ts`):

```ts
title: string
description: string
pubDate: Date
updatedDate?: Date
heroImage?: image()
```

### Styling

Prefer Tailwind utilities over custom CSS. Reserve `global.css` for base resets or styles that genuinely cannot be expressed as utilities.

### Deployment

The GHA workflow (`.github/workflows/deploy.yml`) triggers on push to `main`: builds the site, connects via Tailscale, and rsyncs `./dist/` to the Caddy container. Required secrets: `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET`, `SSH_PRIVATE_KEY`, `DEPLOY_HOST`.

Before going live, update `site` in `astro.config.mjs` from `https://example.com` to the real domain — this affects sitemap and RSS URLs.
