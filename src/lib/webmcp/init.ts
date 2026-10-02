/**
 * WebMCP Bootstrap and Registration Script
 * Runs in the browser to register all AIA tools on navigator.modelContext and window.modelContext
 */

import { initWebMCP, getWebMCPRuntime } from './runtime.ts';
import { aiaWebMcpTools } from './tools.ts';

export function bootstrapWebMCP(): void {
  if (typeof window === 'undefined') return;

  const runtime = initWebMCP();

  // Register all AIA tools
  for (const tool of aiaWebMcpTools) {
    try {
      runtime.registerTool(tool);
    } catch (e) {
      console.warn(`[WebMCP] Failed to register tool ${tool.name}:`, e);
    }
  }

  // Scan and connect declarative HTML markup (forms with data-mcp-tool)
  setupDeclarativeTools();

  // Expose global debug helper
  (window as any).__AIA_WEBMCP__ = {
    version: runtime.version,
    tools: runtime.getTools(),
    call: (toolName: string, params: any) => runtime.callTool(toolName, params),
    history: () => runtime.getHistory(),
  };

  console.log(
    `%c🤖 [WebMCP] Model Context Protocol Initialized with ${aiaWebMcpTools.length} tools`,
    'color: #bda07a; font-weight: bold; font-size: 11px;'
  );
}

function setupDeclarativeTools() {
  if (typeof document === 'undefined') return;

  const connectForms = () => {
    const forms = document.querySelectorAll('form[data-mcp-tool]');
    forms.forEach((form) => {
      const toolName = form.getAttribute('data-mcp-tool');
      if (!toolName) return;

      // Ensure form has agent-friendly metadata attributes
      form.setAttribute('aria-label', `WebMCP Interactive Tool: ${toolName}`);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectForms);
  } else {
    connectForms();
  }
}

// Auto-run if loaded via script tag in browser
if (typeof window !== 'undefined') {
  bootstrapWebMCP();
}
