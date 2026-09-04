# FreeNav - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- 60 curated free resources across all 15 categories (AI, development, design, images, icons, video, fonts, music, PDF, data, education, productivity, templates, software, open-source, entertainment)
- Multi-language (i18n) support for 6 languages: English (default), Chinese (Simplified), Japanese, Korean, Spanish, French
- Language switcher dropdown in Navbar component
- Translation files in `src/i18n/` (`en.json`, `zh.json`, `ja.json`, `ko.json`, `es.json`, `fr.json`)
- i18n helper module (`src/i18n/index.ts`) with `t()` function, locale detection, and path utilities
- Resource detail pages showing full info (title, description, pricing badges, tags, official badge)
- Homepage now displays "Recently Added" and "Trending" resource grids
- Category pages now list all resources within each category
- Client-side search with category filtering on search page
- ResourceCard component for consistent resource display
- Multi-language support documented in Architecture.md

### Fixed
- Fixed corrupted API key in `collect-resources.mjs` (was `proces..._KEY`)
- Fixed resource links to use `BASE_URL` prefix for GitHub Pages subdirectory support
- Fixed `getStaticPaths` and resource lookup to use `slug || id` fallback
- Added `continue-on-error` to daily collection workflow so site deploys even if collection fails
- Removed `@astrojs/mdx` integration (not needed, was causing version conflicts)

## [0.1.0] - 2026-09-03

### Added
- Initial project scaffold with Astro.js
- Project structure: `src/`, `content/`, `scripts/`, `public/`, `docs/`, `.github/workflows/`
- Design system: Apple/Linear/Notion-inspired design with dark mode
- Tailwind CSS with custom color palette (primary, surface, background, border)
- Responsive layout components: Navbar, Footer, BaseLayout
- Static pages: Home, Category (15), Resource Detail, Search, About, Categories, Submit
- Placeholder data: `categories.json`, `resources.json`, `categories.ts`
- Automation scripts: `collect-resources.mjs`, `new-resource.mjs`, `dedupe.mjs`
- GitHub Actions workflows: `pages.yml` (build/deploy), `daily-collection.yml` (daily cron at 06:00 UTC)
- MIT License
- Project README with quick start and structure overview

### Deployed
- Live at `https://dyd-tech.github.io/freenav/`
- GitHub Pages configured with `base: '/freenav'` for subdirectory support
- CSS and assets loading correctly with base path prefix
- 20 static pages generated successfully