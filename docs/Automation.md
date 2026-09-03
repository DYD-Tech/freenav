# Automation

## Overview

The collection pipeline runs daily via GitHub Actions at 06:00 UTC.

## Pipeline Steps

### Step 1: Collect
Sources:
- GitHub Trending (repositories)
- Product Hunt (free tools)
- Hacker News (Show HN posts)
- Reddit (r/InternetIsBeautiful, r/tool, etc.)
- Official blogs
- Awesome Lists
- AI tool directories
- Free course sites
- Free material sites

### Step 2: AI Judgment
For each candidate, an LLM determines:
- Is it free?
- Is it official?
- Has it been collected before?
- Category assignment
- Tag assignment
- Description generation (40–120 chars)

### Step 3: Deduplicate
By URL, name, and similarity score.

### Step 4: Generate Data
- `resources.json` — all resource metadata
- `sitemap.xml` — SEO sitemap
- `rss.xml` — RSS feed for new resources
- `search-index.json` — client-side search index

### Step 5: Commit & Deploy
- Auto-commit data changes
- Build Astro site
- Deploy to GitHub Pages

## Scripts

| Script                    | Description                        |
|---------------------------|------------------------------------|
| `npm run collect`         | Run collection pipeline            |
| `npm run new:resource`    | Add a single resource via CLI      |
| `npm run dedupe`          | Deduplicate & check links          |

## GitHub Actions

- `daily-collection.yml` — runs at 06:00 UTC daily
- `pages.yml` — builds & deploys on push to `main`