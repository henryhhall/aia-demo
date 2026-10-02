import type { APIRoute } from 'astro';

const getRobotsTxt = (siteUrl: string) => `# Associated Insurance Agency (Demo / Development Site)
# Discourage all search engine crawlers from indexing
User-agent: *
Disallow: /

# Agent & LLM Discovery (Permitted for AI Assistants & WebMCP Tools)
# WebMCP Endpoint: ${siteUrl}api/mcp
# LLM Context: ${siteUrl}llms.txt
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
