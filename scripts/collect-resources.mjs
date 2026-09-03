#!/usr/bin/env node
/**
 * collect-resources.mjs
 * Daily resource collection & curation pipeline (Step 1-5 of the automation spec).
 *
 * This is the entry point run by GitHub Actions. It:
 *   1. Collects resources from various sources
 *   2. Uses AI to judge free/official/duplicate/category/tags/desc
 *   3. Deduplicates
 *   4. Generates resources.json, sitemap, RSS, search index
 *   5. Commits & pushes (if GITHUB_TOKEN available)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- Config ---
const DATA_DIR = path.join(root, 'src', 'data');
const RESOURCES_PATH = path.join(DATA_DIR, 'resources.json');

async function main() {
  console.log('🚀 Starting resource collection pipeline...');

  // Step 1: Collect from sources
  console.log('📥 Step 1: Collecting resources...');
  const candidates = await collectFromSources();
  console.log(`   Found ${candidates.length} candidates`);

  // Step 2: AI judgment (stub - LLM integration happens here)
  console.log('🤖 Step 2: AI judgment...');
  const judged = await aiJudge(candidates);
  console.log(`   ${judged.length} passed curation`);

  // Step 3: Deduplicate
  console.log('🔍 Step 3: Deduplicating...');
  const unique = deduplicate(judged);
  console.log(`   ${unique.length} unique resources after dedup`);

  // Step 4: Generate data
  console.log('📝 Step 4: Generating data files...');
  const existing = loadExistingResources();
  const allResources = mergeResources(existing, unique);
  saveResources(allResources);
  await generateSitemap(allResources);
  await generateRSS(allResources);
  await generateSearchIndex(allResources);
  console.log('   Data files generated');

  // Step 5: Commit (only in CI)
  if (process.env.GITHUB_ACTIONS) {
    console.log('📤 Step 5: Committing changes...');
    await commitAndPush();
  }

  console.log('✅ Pipeline complete!');
}

// --- Source collectors (stubs to be implemented) ---

async function collectFromSources() {
  const sources = [];
  // GitHub Trending
  sources.push(...(await collectGitHubTrending()));
  // Product Hunt
  sources.push(...(await collectProductHunt()));
  // Hacker News
  sources.push(...(await collectHN()));
  return sources;
}

async function collectGitHubTrending() {
  console.log('   📡 Fetching GitHub Trending...');
  // This will be replaced with actual API calls / web scraping
  return [];
}

async function collectProductHunt() {
  console.log('   📡 Fetching Product Hunt (free)...');
  return [];
}

async function collectHN() {
  console.log('   📡 Fetching Hacker News...');
  return [];
}

// --- AI judgment (stub) ---

async function aiJudge(candidates) {
  // This is where an LLM would classify each candidate
  // For now, we pass through nothing (production will call OpenAI/anthropic)
  return [];
}

// --- Deduplication ---

function deduplicate(resources) {
  const seen = new Set();
  return resources.filter((r) => {
    const key = r.url || `${r.title}-${r.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// --- Data utilities ---

function loadExistingResources() {
  try {
    const data = JSON.parse(fs.readFileSync(RESOURCES_PATH, 'utf-8'));
    return data.resources || [];
  } catch {
    return [];
  }
}

function saveResources(resources) {
  const data = {
    meta: {
      total: resources.length,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    },
    resources
  };
  fs.writeFileSync(RESOURCES_PATH, JSON.stringify(data, null, 2) + '\n');
}

function mergeResources(existing, incoming) {
  const map = new Map();
  for (const r of existing) {
    map.set(r.id, r);
  }
  for (const r of incoming) {
    if (map.has(r.id)) {
      map.set(r.id, { ...map.get(r.id), ...r, updatedAt: new Date().toISOString() });
    } else {
      map.set(r.id, r);
    }
  }
  return Array.from(map.values()).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.addedAt) - new Date(a.addedAt));
}

async function generateSitemap(resources) {
  const urls = [
    'https://freenav.dev/',
    'https://freenav.dev/search'
  ];
  for (const r of resources) {
    urls.push(`https://freenav.dev/resource/${r.slug}`);
  }
  const categories = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'categories.json'), 'utf-8'));
  for (const c of categories.categories) {
    urls.push(`https://freenav.dev/category/${c.slug}`);
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += `  <url><loc>${url}</loc></url>\n`;
  }
  xml += '</urlset>\n';
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(root, 'dist', 'sitemap.xml'), xml);
}

async function generateRSS(resources) {
  const latest = resources.slice(0, 20);
  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rss += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  rss += `<title>FreeNav — New Resources</title>\n`;
  rss += `<link href="https://freenav.dev/rss.xml" rel="self"/>\n`;
  rss += `<link href="https://freenav.dev/"/>\n`;
  rss += `<updated>${new Date().toISOString()}</updated>\n`;
  for (const r of latest) {
    rss += `<entry>\n`;
    rss += `  <title>${r.title}</title>\n`;
    rss += `  <link href="https://freenav.dev/resource/${r.slug}"/>\n`;
    rss += `  <id>${r.id}</id>\n`;
    rss += `  <updated>${r.updatedAt}</updated>\n`;
    rss += `  <content>${r.description}</content>\n`;
    rss += `</entry>\n`;
  }
  rss += `</feed>\n`;
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(root, 'dist', 'rss.xml'), rss);
}

async function generateSearchIndex(resources) {
  const index = resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    tags: r.tags,
    category: r.category,
    pricing: r.pricing,
    slug: r.slug
  }));
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(root, 'dist', 'search-index.json'), JSON.stringify(index));
}

async function commitAndPush() {
  // In CI, this commits and pushes automatically
  console.log('   (commit logic runs in CI only)');
}

main().catch((err) => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});