# FreeNav - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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