import type { APIRoute } from 'astro';

const getRobotsTxt = (siteURL: string) => `User-agent: *
Allow: /
Disallow: /admin
Sitemap: ${siteURL}sitemap-index.xml`;

export const GET: APIRoute = ({ site }) => {
  return new Response(getRobotsTxt(site?.toString() || 'https://aia-danbury.com/'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
