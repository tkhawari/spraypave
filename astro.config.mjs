// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],

  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
