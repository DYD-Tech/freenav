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
- Static pages: Home, Category, Resource Detail, Search
- Placeholder data: `categories.json`, `resources.json`
- Automation scripts: `collect-resources.mjs`, `new-resource.mjs`, `dedupe.mjs`
- GitHub Actions workflows: `pages.yml` (build/deploy), `daily-collection.yml` (daily cron)
- MIT License
- Project README with quick start and structure overview