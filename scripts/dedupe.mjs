#!/usr/bin/env node
/**
 * dedupe.mjs
 * Checks all resources for duplicates and broken links, removes them.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const RESOURCES_PATH = path.join(DATA_DIR, 'resources.json');

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function checkUrl(url) {
  try {
    // Try HEAD first (faster)
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    if (res.ok || res.status === 302 || res.status === 301) return true;

    // Fallback: try GET if HEAD fails
    res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    return res.ok || res.status === 302 || res.status === 301;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🔍 Running deduplication and link check...');

  let data = JSON.parse(fs.readFileSync(RESOURCES_PATH, 'utf-8'));
  const resources = Array.isArray(data) ? data : data.resources;
  const originalCount = resources.length;

  // Deduplicate by URL
  const seenUrls = new Set();
  const unique = [];
  let dupCount = 0;

  for (const r of resources) {
    const url = r.url.toLowerCase().trim().replace(/\/$/, '');
    if (seenUrls.has(url)) {
      dupCount++;
      console.log(`  Duplicate removed: ${r.title}`);
      continue;
    }
    seenUrls.add(url);

    // Ensure slug exists
    if (!r.slug) {
      r.slug = slugify(r.title);
    }
    unique.push(r);
  }

  console.log(`  ${dupCount} duplicates removed (${originalCount - dupCount} remaining)`);

  // Check for broken links
  console.log('  Checking links...');
  const valid = [];
  let brokenCount = 0;

  for (const r of unique) {
    const ok = await checkUrl(r.url);
    if (ok) {
      valid.push(r);
    } else {
      brokenCount++;
      console.log(`  Broken link: ${r.title} → ${r.url}`);
    }
  }

  console.log(`  ${brokenCount} broken links removed`);

  // Sort by addedAt desc
  valid.sort((a, b) => new Date(b.addedAt || b.dateAdded || 0) - new Date(a.addedAt || a.dateAdded || 0));

  // Save as plain array (consistent with resources.json format)
  fs.writeFileSync(RESOURCES_PATH, JSON.stringify(valid, null, 2) + '\n');
  console.log(`✅ Done: ${valid.length} resources, ${dupCount} duplicates removed, ${brokenCount} broken links removed`);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});