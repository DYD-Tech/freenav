# Content Guide

## Curation Principles

1. **Free first** — only genuinely free resources
2. **Official sources preferred** — direct from the creator/project
3. **Long-term viability** — avoid services that disappear
4. **No garbage** — no cracked, pirated, or low-quality content

## Resource Requirements

Every resource must have:
- ✅ A valid URL (official site)
- ✅ A description (40–120 chars)
- ✅ A category
- ✅ 3–8 tags

## Content Quality Standards

Each resource must answer:
1. What is it?
2. How free is it?
3. Who is it for?
4. Why is it worth recommending?

## Pricing Tiers

| Tier      | Definition                                |
|-----------|-------------------------------------------|
| `free`    | Completely free, no signup required       |
| `freemium`| Free tier exists, paid upgrades available |
| `open-source` | Open-source project, self-hostable      |

## Tags

Use lowercase, hyphenated tags. Examples: `ai`, `design`, `video-editing`, `no-signup`

## Daily Workflow

1. Collect candidates from sources (GitHub Trending, Product Hunt, HN, Reddit, etc.)
2. AI judges: free? official? already collected? category? tags? description?
3. Deduplicate by URL, name, and similarity
4. Update `resources.json`, regenerate sitemap/RSS/search index
5. Auto-commit and deploy