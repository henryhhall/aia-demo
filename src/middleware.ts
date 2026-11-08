import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Core security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  const pathname = context.url.pathname;

  // Enforce noindex strictly on permanent removal routes (410 Gone) and internal API endpoints
  if (pathname === '/410' || pathname.startsWith('/410/') || response.status === 410) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  } else if (!pathname.startsWith('/api/') && response.status < 400) {
    // Explicitly guarantee search indexing for all public content pages and posts across all languages
    response.headers.set(
      'X-Robots-Tag',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  }

  return response;
});
