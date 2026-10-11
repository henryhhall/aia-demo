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
    '/sitemap.xml': '/sitemap-index.xml',
    '/meet-the-team': '/team',
    '/es/meet-the-team': '/es/team',
    '/pt/meet-the-team': '/pt/team',
    '/tr/meet-the-team': '/tr/team',
    '/coi': '/certificate-request',
    '/certificates': '/certificate-request',
    '/es/coi': '/es/certificate-request',
    '/pt/coi': '/pt/certificate-request',
    '/tr/coi': '/tr/certificate-request',
    '/quote/homeowners': '/quote?type=home',
    '/es/quote/homeowners': '/es/quote?type=home',
    '/pt/quote/homeowners': '/pt/quote?type=home',
    '/tr/quote/homeowners': '/tr/quote?type=home'
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin')
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      exclude: ['@react-email/components', '@react-email/render']
    }
  }
});