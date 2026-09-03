# Deployment

## Platform

- **Hosting**: GitHub Pages
- **Build**: Astro static site generation
- **CDN**: GitHub Pages CDN (global)
- **Cost**: Free

## Prerequisites

1. GitHub repository created (e.g., `freenav/freenav`)
2. GitHub Pages enabled in repository settings (source: `gh-pages` branch or GitHub Actions)
3. `GITHUB_TOKEN` available in Actions (automatic)

## Manual Deploy

```bash
# Build
npm run build

# The dist/ folder contains the static site
# Push to trigger the deploy workflow
git add dist/
git commit -m "chore: deploy"
git push
```

## Auto Deploy (GitHub Actions)

The `pages.yml` workflow handles everything on push to `main`:

1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build site
5. Deploy to GitHub Pages

## Custom Domain

To use a custom domain (e.g., `freenav.dev`):

1. Add a `CNAME` file in `public/` with the domain name
2. Configure DNS with a CNAME record pointing to `freenav.github.io`

## Verifying Deployment

After deploy, check:
- `https://freenav.github.io/` loads
- `https://freenav.dev/` loads (if custom domain)
- Sitemap, RSS, and search index are accessible