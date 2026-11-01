// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const isBuild = process.argv.includes('build') || process.env.npm_lifecycle_event === 'build';

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
    // Sitemap & Security feeds
    '/sitemap.xml': '/sitemap-index.xml',
    '/security.txt': '/.well-known/security.txt',
    '/es/security.txt': '/.well-known/security-es.txt',
    '/pt/security.txt': '/.well-known/security-pt.txt',
    '/tr/security.txt': '/.well-known/security-tr.txt',

    // Existing internal & localized route aliases
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
    '/tr/quote/homeowners': '/tr/quote?type=home',
    '/offices': '/locations',
    '/es/offices': '/es/locations',
    '/pt/offices': '/pt/locations',
    '/tr/offices': '/tr/locations',
    '/locations/danbury-hq': '/locations/danbury',
    '/es/locations/danbury-hq': '/es/locations/danbury',
    '/pt/locations/danbury-hq': '/pt/locations/danbury',
    '/tr/locations/danbury-hq': '/tr/locations/danbury',

    // CRITICAL POST-HACK & LEGACY WORDPRESS 301 REDIRECTS
    // 1. Purges the 'shbet' Vietnamese casino hack indexed at /personal-insurance/
    '/personal-insurance': '/personal',
    '/es/personal-insurance': '/es/personal',
    '/pt/personal-insurance': '/pt/personal',
    '/tr/personal-insurance': '/tr/personal',

    // 2. Legacy 2014-2016 WordPress nested paths (still showing 3860 Main St Bridgeport)
    '/personal-insurance-lines': '/personal',
    '/personal-insurance-lines/homeowners-insurance': '/personal/homeowners',
    '/personal-insurance-lines/auto-insurance': '/personal/auto',
    '/personal-insurance-lines/umbrella-insurance': '/personal/umbrella',
    '/personal-insurance-lines/renters-insurance': '/personal/renters',
    '/personal-insurance-lines/recreational-vehicle-insurance': '/personal/auto',
    '/personal-insurance-lines/pet-insurance': '/personal',

    // 3. Legacy May 2026 GoDaddy / Beaver Builder WordPress Personal Lines slugs
    '/home-owners-insurance': '/personal/homeowners',
    '/homeowners-insurance': '/personal/homeowners',
    '/auto-insurance': '/personal/auto',
    '/recreational-vehicle-insurance': '/personal/auto',
    '/umbrella-insurance': '/personal/umbrella',
    '/renters-insurance': '/personal/renters',
    '/pet-insurance': '/personal',

    // 4. Legacy May 2026 GoDaddy / Beaver Builder WordPress Commercial Lines slugs
    '/commercial-insurance': '/commercial',
    '/commercial-auto-insurance': '/commercial/auto',
    '/truckers-insurance': '/commercial/auto',
    '/general-liability-insurance': '/commercial/general-liability',
    '/excess-liability-insurance': '/commercial/general-liability',
    '/workers-compensation-insurance': '/commercial/workers-compensation',

    // 5. Legacy May 2026 GoDaddy / Beaver Builder WordPress Service & Contact slugs
    '/service-center': '/service',
    '/pay-your-bill': '/pay-bill',
    '/file-a-claim': '/service',
    '/frequently-asked-questions': '/service',
    '/contact-us': '/contact',
    '/es/contact-us': '/es/contact',
    '/pt/contact-us': '/pt/contact',
    '/tr/contact-us': '/tr/contact',
  },
  integrations: [
    react(),
    sitemap({
      // Exclude admin and error utility routes from XML sitemaps
      filter: (page) =>
        !page.includes('/admin') &&
        !page.endsWith('/404') &&
        !page.endsWith('/410'),
      // CRITICAL: Enables bidirectional <xhtml:link rel="alternate" hreflang="..." />
      // across EN, ES, PT, and TR routes in sitemap-0.xml
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-US',
          pt: 'pt-BR',
          tr: 'tr-TR',
        },
      },
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    cacheDir: isBuild ? 'node_modules/.vite/build' : 'node_modules/.vite/dev',
    resolve: {
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      exclude: ['@react-email/components', '@react-email/render']
    }
  }
});