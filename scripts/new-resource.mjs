#!/usr/bin/env node
/**
 * new-resource.mjs
 * CLI helper to scaffold a new resource entry.
 * Usage: npm run new:resource -- --title "My Tool" --url "https://example.com" --category ai
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const RESOURCES_PATH = path.join(DATA_DIR, 'resources.json');

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1];
      result[key] = val;
      i++;
    }
  }
  return result;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function main() {
  const args = parseArgs();

  if (!args.title || !args.url || !args.category) {
    console.error('Usage: npm run new:resource -- --title "Tool Name" --url "https://example.com" --category ai');
    process.exit(1);
  }

  const resource = {
    id: randomUUID(),
    title: args.title,
    description: args.description || '',
    url: args.url,
    official: args.official === 'true' || undefined,
    category: args.category,
    tags: args.tags ? args.tags.split(',') : [],
    pricing: args.pricing || 'free',
    language: args.language || 'en',
    platform: args.platform || undefined,
    screenshot: args.screenshot || undefined,
    logo: args.logo || undefined,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verifiedAt: new Date().toISOString(),
    rating: args.rating ? parseFloat(args.rating) : undefined,
    featured: args.featured === 'true' || false,
    slug: slugify(args.title)
  };

  // Load existing
  let data = { meta: { total: 0, lastUpdated: '', version: '1.0' }, resources: [] };
  try {
    data = JSON.parse(fs.readFileSync(RESOURCES_PATH, 'utf-8'));
  } catch {}

  // Check for duplicates
  const existing = data.resources.find((r) => r.url === resource.url || r.id === resource.id);
  if (existing) {
    console.error(`❌ Resource already exists: ${existing.title} (${existing.id})`);
    process.exit(1);
  }

  data.resources.push(resource);
  data.resources.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  data.meta.total = data.resources.length;
  data.meta.lastUpdated = new Date().toISOString();

  fs.writeFileSync(RESOURCES_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(`✅ Added: ${resource.title} → /resource/${resource.slug}`);
}

main();