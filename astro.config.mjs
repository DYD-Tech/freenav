import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://freenav.dev',
  output: 'static',
  integrations: [mdx(), tailwind(), sitemap()],
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});