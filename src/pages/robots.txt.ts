import type { APIRoute } from 'astro';

const getRobotsTxt = (siteUrl: string) => `User-agent: *
Allow: /
Disallow: /admin

# Dedicated AI Agent Directives
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Agent & LLM Discovery
# WebMCP Endpoint: ${siteUrl}api/mcp
# LLM Context: ${siteUrl}llms.txt

Sitemap: ${siteUrl}sitemap-index.xml
`;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString() || 'https://aia-danbury.com/';
  return new Response(getRobotsTxt(siteUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
