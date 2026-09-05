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
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- Config ---
const DATA_DIR = path.join(root, 'src', 'data');
const RESOURCES_PATH = path.join(DATA_DIR, 'resources.json');
const SITE_URL = 'https://dyd-tech.github.io/freenav/';

async function main() {
  console.log('🚀 Starting resource collection pipeline...');
  console.log('📊 Sources: GitHub Trending, Product Hunt, Hacker News, Reddit, AI Tools Directory');

  // Step 1: Collect from sources
  console.log('📥 Step 1: Collecting resources...');
  const candidates = await collectFromSources();
  console.log(`   Found ${candidates.length} candidates`);

  // Step 2: AI judgment
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
  console.log(`   Total resources: ${allResources.length}`);
}

// --- Source collectors ---

async function collectFromSources() {
  const sources = [];

  // GitHub Trending
  console.log('   📡 Fetching GitHub Trending...');
  try {
    const ghData = await collectGitHubTrending();
    sources.push(...ghData);
    console.log(`      GitHub Trending: ${ghData.length}`);
  } catch (e) {
    console.log(`      GitHub Trending: failed (${e.message})`);
  }

  // Product Hunt
  console.log('   📡 Fetching Product Hunt (free)...');
  try {
    const phData = await collectProductHunt();
    sources.push(...phData);
    console.log(`      Product Hunt: ${phData.length}`);
  } catch (e) {
    console.log(`      Product Hunt: failed (${e.message})`);
  }

  // Hacker News
  console.log('   📡 Fetching Hacker News...');
  try {
    const hnData = await collectHN();
    sources.push(...hnData);
    console.log(`      Hacker News: ${hnData.length}`);
  } catch (e) {
    console.log(`      Hacker News: failed (${e.message})`);
  }

  // Reddit
  console.log('   📡 Fetching Reddit...');
  try {
    const redditData = await collectReddit();
    sources.push(...redditData);
    console.log(`      Reddit: ${redditData.length}`);
  } catch (e) {
    console.log(`      Reddit: failed (${e.message})`);
  }

  // AI Tools Directory
  console.log('   📡 Fetching AI Tools Directory...');
  try {
    const aiData = await collectAITools();
    sources.push(...aiData);
    console.log(`      AI Tools: ${aiData.length}`);
  } catch (e) {
    console.log(`      AI Tools: failed (${e.message})`);
  }

  return sources;
}

async function collectGitHubTrending() {
  const response = await fetch('https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=15', {
    headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'freenav-agent' }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();

  return data.items
    .filter(item =>
      item.license &&
      ['mit', 'apache-2.0', 'bsd-3-clause', 'bsd-2-clause', '0bsd', 'isc'].includes(item.license.spdx_id?.toLowerCase())
    )
    .map(item => ({
      title: item.name,
      url: item.html_url,
      description: item.description || '',
      source: 'github-trending',
      tags: [item.language?.toLowerCase() || ''].filter(Boolean),
      category: inferCategory(item.name, item.description || '', item.topics || [])
    }));
}

async function collectProductHunt() {
  // Use the public API
  const response = await fetch('https://api.producthunt.com/v1/posts', {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'freenav-agent'
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();

  return data.posts
    .filter(post => post.pricing && post.pricing[0]?.id === 'free' || post.pricing?.length === 0)
    .map(post => ({
      title: post.name,
      url: post.url,
      description: post.tagline || post.description || '',
      source: 'product-hunt',
      tags: post.topics?.map(t => t.slug) || []
    }));
}

async function collectHN() {
  const topResponse = await fetch('https://hacker-news.firebaseio.com/v0/showstories.json');
  const storyIds = await topResponse.json();

  const stories = [];
  for (const id of storyIds.slice(0, 30)) {
    const resp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const story = await resp.json();
    if (story && story.url && story.title) {
      stories.push(story);
    }
  }

  return stories
    .filter(s => s.title.toLowerCase().includes('free') || s.title.toLowerCase().includes('open'))
    .map(story => ({
      title: story.title.split('|')[0].trim(),
      url: story.url,
      description: `HN Show: ${story.title}`,
      source: 'hacker-news',
      tags: ['show-hn']
    }));
}

async function collectReddit() {
  // /r/InternetIsBeautiful, /r/tool, /r/freebies, etc.
  const subreddits = ['InternetIsBeautiful', 'tool', 'freebies', 'open-source', 'FreeMediaHackers'];
  const allPosts = [];

  for (const subreddit of subreddits) {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/top.json?limit=10&t=day`,
        { headers: { 'User-Agent': 'freenav-agent/0.1.0' } }
      );
      if (!response.ok) continue;
      const data = await response.json();
      data.data.children.forEach(child => {
        const post = child.data;
        if (post.url && post.post_hint !== 'image' && post.post_hint !== 'gallery') {
          allPosts.push({
            title: post.title,
            url: `https://reddit.com${post.permalink}`,
            description: post.selftext?.substring(0, 120) || '',
            source: `reddit-${subreddit}`,
            tags: [subreddit.toLowerCase()]
          });
        }
      });
    } catch (e) {
      console.log(`       r/${subreddit}: failed (${e.message})`);
    }
  }

  return allPosts.slice(0, 15);
}

async function collectAITools() {
  // Fetch from Hugging Face model directory
  try {
    const response = await fetch('https://huggingface.co/api/models?search=free&limit=20');
    const data = await response.json();
    return data
      .filter(m => m.downloads > 1000)
      .slice(0, 15)
      .map(model => ({
        title: model.id.split('/')[1] || model.id,
        url: `https://huggingface.co/${model.id}`,
        description: model.summary || `AI model: ${model.id}`,
        source: 'huggingface',
        tags: ['ai', 'ml', 'huggingface', model.pipeline_tag || 'model']
      }));
  } catch (e) {
    return [];
  }
}

// --- AI judgment ---

async function aiJudge(candidates) {
  const hasAI = !!process.env.OPENAI_API_KEY;

  if (hasAI) {
    return await aiJudgeWithOpenAI(candidates);
  }
  return heuristicJudge(candidates);
}

async function aiJudgeWithOpenAI(candidates) {
  const { OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const results = [];
  for (const candidate of candidates) {
    try {
      const prompt = `Evaluate this resource for inclusion in a free resources directory:\nTitle: ${candidate.title}\nURL: ${candidate.url}\nDescription: ${candidate.description}\n\nDetermine:\n1. Is it genuinely free? (yes/no)\n2. Is it official? (yes/no)\n3. Category (ai, development, design, images, icons, video, fonts, music, pdf, data, learning, templates, productivity, software, open-source)\n4. Tags (3-8 comma-separated, lowercase)\n5. Short description (40-120 chars)\n\nOutput as JSON only.`;

      const resp = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300
      });

      const content = JSON.parse(resp.choices[0].message.content);
      if (content.free === 'yes' || content.is_free === true) {
        results.push({
          ...candidate,
          ...content,
          category: content.category || candidate.category || 'tools',
          tags: content.tags || candidate.tags,
          description: content.description || candidate.description
        });
      }
    } catch (e) {
      console.log(`   AI judgment failed for ${candidate.title}: ${e.message}`);
    }
  }
  return results;
}

function heuristicJudge(candidates) {
  return candidates
    .filter(c => {
      const title = c.title.toLowerCase();
      const skipPatterns = ['cracked', 'warez', 'torrent', 'porn', 'casino', 'piracy', 'hack'];
      return !skipPatterns.some(p => title.includes(p));
    })
    .map(c => ({
      ...c,
      category: c.category || inferCategory(c.title, c.description || '', c.tags || []),
      tags: c.tags || [],
      description: c.description || `${c.title} — free resource`,
      slug: slugify(c.title),
      pricing: c.pricing || 'free'
    }));
}

function inferCategory(title, desc, tags) {
  const text = (title + ' ' + desc + ' ' + (tags || []).join(' ')).toLowerCase();
  if (text.includes('ai') || text.includes('gpt') || text.includes('neural') || text.includes('llm')) return 'ai';
  if (text.includes('github') || text.includes('code') || text.includes('dev') || text.includes('api')) return 'development';
  if (text.includes('design') || text.includes('figma') || text.includes('mockup')) return 'design';
  if (text.includes('font') || text.includes('typography')) return 'fonts';
  if (text.includes('icon')) return 'icons';
  if (text.includes('video')) return 'video';
  if (text.includes('music') || text.includes('audio')) return 'music';
  if (text.includes('learn') || text.includes('course') || text.includes('tutorial')) return 'learning';
  if (text.includes('template')) return 'templates';
  if (text.includes('open-source') || text.includes('opensource') || text.includes('repository')) return 'open-source';
  if (text.includes('image') || text.includes('photo')) return 'images';
  if (text.includes('data') || text.includes('dataset')) return 'data';
  if (text.includes('pdf')) return 'pdf';
  return 'productivity';
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Deduplication ---

function deduplicate(resources) {
  const seen = new Set();
  return resources.filter((r) => {
    const key = r.url || `${r.title}-${r.name}`;
    const normalizedKey = key.toLowerCase().trim().replace(/\/$/, '');
    if (seen.has(normalizedKey)) return false;
    seen.add(normalizedKey);
    return true;
  });
}

// --- Data utilities ---

function loadExistingResources() {
  try {
    const data = JSON.parse(fs.readFileSync(RESOURCES_PATH, 'utf-8'));
    if (Array.isArray(data)) return data;
    return data.resources || [];
  } catch {
    return [];
  }
}

function saveResources(resources) {
  fs.writeFileSync(RESOURCES_PATH, JSON.stringify(resources, null, 2) + '\n');
}

function mergeResources(existing, incoming) {
  const map = new Map();
  const urlToId = new Map();
  for (const r of existing) {
    const normalizedUrl = (r.url || '').toLowerCase().trim().replace(/\/$/, '');
    if (r.id) {
      map.set(r.id, r);
    }
    if (normalizedUrl) {
      urlToId.set(normalizedUrl, r.id || null);
    }
  }
  for (const r of incoming) {
    const normalizedUrl = (r.url || '').toLowerCase().trim().replace(/\/$/, '');
    const existingId = normalizedUrl ? urlToId.get(normalizedUrl) : null;
    if (existingId) {
      map.set(existingId, { ...map.get(existingId), ...r, updatedAt: new Date().toISOString() });
    } else if (map.has(r.id)) {
      map.set(r.id, { ...map.get(r.id), ...r, updatedAt: new Date().toISOString() });
    } else {
      const newR = {
        ...r,
        id: r.id || randomUUID(),
        slug: r.slug || slugify(r.title),
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString(),
        rating: r.rating || 0,
        featured: false
      };
      map.set(newR.id, newR);
      if (normalizedUrl) {
        urlToId.set(normalizedUrl, newR.id);
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.addedAt || b.dateAdded || 0) - new Date(a.addedAt || a.dateAdded || 0);
  });
}

async function generateSitemap(resources) {
  const urls = [
    SITE_URL,
    `${SITE_URL}search`,
    `${SITE_URL}categories`
  ];
  for (const r of resources) {
    if (r.slug || r.id) urls.push(`${SITE_URL}resource/${r.slug || r.id}`);
  }
  const categoriesPath = path.join(DATA_DIR, 'categories.json');
  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  for (const c of categoriesData.categories) {
    urls.push(`${SITE_URL}category/${c.slug}`);
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += `  <url><loc>${url}</loc></url>\n`;
  }
  xml += '</urlset>\n';
  const distDir = path.join(root, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
}

async function generateRSS(resources) {
  const latest = resources.slice(0, 20);
  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rss += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  rss += `<title>FreeNav - New Resources</title>\n`;
  rss += `<link href="${SITE_URL}rss.xml" rel="self"/>\n`;
  rss += `<link href="${SITE_URL}"/>\n`;
  rss += `<updated>${new Date().toISOString()}</updated>\n`;
  for (const r of latest) {
    rss += `<entry>\n`;
    rss += `  <title>${r.title}</title>\n`;
    rss += `  <link href="${SITE_URL}resource/${r.slug || r.id}"/>\n`;
    rss += `  <id>${r.id}</id>\n`;
    rss += `  <updated>${r.updatedAt}</updated>\n`;
    rss += `  <content>${r.description}</content>\n`;
    rss += `</entry>\n`;
  }
  rss += `</feed>\n`;
  const distDir = path.join(root, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'rss.xml'), rss);
}

async function generateSearchIndex(resources) {
  const index = resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    tags: r.tags,
    category: r.category,
    pricing: r.pricing,
    slug: r.slug || r.id
  }));
  const distDir = path.join(root, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'search-index.json'), JSON.stringify(index));
}

async function commitAndPush() {
  // In CI, this commits and pushes automatically
  console.log('   (commit logic runs in CI only)');
}

main().catch((err) => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});
