// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://aia-danbury.com',
  trailingSlash: 'never',
  adapter: vercel(),
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'tr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml'
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});