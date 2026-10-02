import type { APIRoute } from 'astro';
import { aiaWebMcpTools } from '../../lib/webmcp/tools.ts';

export const prerender = false;

/**
 * Model Context Protocol (MCP) JSON-RPC 2.0 & Discovery Endpoint
 * Enables external AI agents (Claude, Cursor, Antigravity, custom agents)
 * to list and execute AIA tools over HTTP.
 */

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  // Return full JSON-RPC tool specifications if requested as JSON
  const toolsList = aiaWebMcpTools.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
    annotations: t.annotations,
  }));

  return new Response(
    JSON.stringify(
      {
        jsonrpc: '2.0',
        name: 'associated-insurance-agency-mcp',
        version: '1.0.0',
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {
            listChanged: false,
          },
        },
        tools: toolsList,
        documentation: 'https://aia-danbury.com/llms.txt',
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id = 1, method, params } = body;

    // Handle MCP protocol methods
    switch (method) {
      case 'initialize': {
        return createJsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: 'associated-insurance-agency-mcp',
              version: '1.0.0',
            },
          },
        });
      }

      case 'ping': {
        return createJsonResponse({
          jsonrpc: '2.0',
          id,
          result: {},
        });
      }

      case 'tools/list': {
        const tools = aiaWebMcpTools.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
          annotations: t.annotations,
        }));

        return createJsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            tools,
          },
        });
      }

      case 'tools/call': {
        const toolName = params?.name;
        const toolArgs = params?.arguments || {};

        const tool = aiaWebMcpTools.find((t) => t.name === toolName);
        if (!tool) {
          return createJsonResponse({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method / Tool not found: "${toolName}"`,
              data: {
                availableTools: aiaWebMcpTools.map((t) => t.name),
              },
            },
          });
        }

        try {
          const result = await tool.execute(toolArgs);
          return createJsonResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
                },
              ],
              isError: false,
            },
          });
        } catch (err: any) {
          return createJsonResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: `Tool execution error: ${err?.message || String(err)}`,
                },
              ],
              isError: true,
            },
          });
        }
      }

      default: {
        return createJsonResponse({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Unsupported MCP method: "${method}". Supported: initialize, ping, tools/list, tools/call`,
          },
        });
      }
    }
  } catch (e: any) {
    return createJsonResponse(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: `Parse error / invalid JSON: ${e?.message || String(e)}`,
        },
      },
      400
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

function createJsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
