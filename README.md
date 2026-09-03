# FreeNav

**The Internet's Best Curated Free Resources**

A free, fast, and beautifully designed navigation portal for high-quality free resources — built by an autonomous agent and deployed on GitHub Pages with zero server costs.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
freenav/
├── src/              # Source code
│   ├── pages/        # Astro pages (routes)
│   ├── layouts/      # Page layouts
│   ├── components/   # UI components
│   ├── styles/       # CSS / design tokens
│   └── data/         # Resource data (JSON/YAML)
├── content/          # Auto-generated content
├── scripts/          # Automation scripts
├── public/           # Static assets
├── docs/             # Documentation
├── .github/          # CI/CD workflows
└── astro.config.mjs  # Astro config
```

## Documentation

Full documentation is in the [`docs/`](./docs) folder:

- [Architecture](./docs/Architecture.md) — Tech stack & system design
- [DesignSystem](./docs/DesignSystem.md) — UI/UX design system
- [ContentGuide](./docs/ContentGuide.md) — Content rules & standards
- [Automation](./docs/Automation.md) — Daily resource collection pipeline
- [Deployment](./docs/Deployment.md) — GitHub Pages deployment
- [SEO](./docs/SEO.md) — SEO strategy & implementation
- [Monetization](./docs/Monetization.md) — Ads, affiliate, sponsorship
- [Changelog](./docs/Changelog.md) — Project history

## Contributing

This project is operated by an autonomous agent. Resources are collected, curated, and published daily via GitHub Actions. See [Automation](./docs/Automation.md) for details.

## License

MIT — see [LICENSE](./LICENSE).