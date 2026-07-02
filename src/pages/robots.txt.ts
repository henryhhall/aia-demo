import type { APIRoute } from 'astro';

// Generate robots.txt contents to discourage all crawlers
const getRobotsTxt = () => `User-agent: *
Disallow: /`;

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
