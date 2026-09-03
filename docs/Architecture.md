# Architecture

## Tech Stack

| Layer       | Technology         | Rationale                              |
|-------------|--------------------|----------------------------------------|
| Framework   | Astro              | Static-site generation, edge-ready     |
| Styling     | Tailwind CSS       | Utility-first, tiny bundle             |
| Language    | TypeScript         | Type safety on frontend and scripts    |
| Search      | Static JSON index  | No backend, instant search             |
| Data        | JSON               | Simple, fast, no DB                    |
| CI/CD       | GitHub Actions     | Free, reliable, triggers on push/cron  |
| Hosting     | GitHub Pages       | Zero cost, global CDN                  |

## Directory Structure

```
freenav/
├── .github/
│   └── workflows/
│       ├── pages.yml              # Build & deploy
│       └── daily-collection.yml   # Daily resource collection
├── public/                         # Static assets (favicon, OG images)
├── scripts/                        # Automation scripts
│   ├── collect-resources.mjs      # Daily collection pipeline
│   ├── dedupe.mjs                 # Deduplication & link checking
│   └── new-resource.mjs           # CLI to add a new resource
├── src/
│   ├── components/                 # UI components
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── ResourceCard.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── MainLayout.astro
│   ├── pages/                      # Astro pages (routes)
│   │   ├── index.astro             # Homepage
│   │   ├── search.astro            # Search page
│   │   ├── category/
│   │   │   └── [category].astro    # Category listing
│   │   └── resource/
│   │       └── [slug].astro        # Individual resource page
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   └── index.ts
│   └── data/                       # Static data
│       ├── resources.json
│       └── categories.json
├── content/                        # Auto-generated content
├── docs/                           # Documentation
│   ├── Architecture.md
│   ├── DesignSystem.md
│   ├── ContentGuide.md
│   ├── Automation.md
│   ├── Deployment.md
│   ├── SEO.md
│   ├── Monetization.md
│   └── Changelog.md
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── postcss.config.mjs
```

## Build Pipeline

```
1. Source Collection (scripts/collect-resources.mjs)
   ↓
2. AI Curation & Classification
   ↓
3. Deduplication & Link Check (scripts/dedupe.mjs)
   ↓
4. Data Generation (resources.json, sitemap.xml, rss.xml, search-index.json)
   ↓
5. Astro Build (static site generation)
   ↓
6. GitHub Actions → Deploy to GitHub Pages
```

## Performance Targets

- **Lighthouse**: ≥95
- **FCP**: <2 seconds
- **JS bundle**: <100KB
- **Images**: WebP/AVIF, lazy-loaded
- **CLS**: ≈0