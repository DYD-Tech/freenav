import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dyd-tech.github.io/freenav/',
  base: '/freenav',
  output: 'static',
  integrations: [tailwind(), sitemap()],
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});