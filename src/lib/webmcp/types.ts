/**
 * WebMCP (Web Model Context Protocol) Type Definitions
 * Compatible with W3C WebModelContext and WebMCP Inspector Chrome Extension
 */

export interface WebMCPToolAnnotation {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
  idempotentHint?: boolean;
  priority?: number;
}

export interface WebMCPJSONSchema {
  type: string;
  description?: string;
  properties?: Record<string, {
    type: string;
    description?: string;
    enum?: string[];
    items?: Record<string, any>;
    default?: any;
  }>;
  required?: string[];
}

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: WebMCPJSONSchema;
  annotations?: WebMCPToolAnnotation;
  type?: string;
  kind?: string;
  source?: string;
  window?: any;
  execute: (params: any) => Promise<any> | any;
}

export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: WebMCPJSONSchema;
  annotations?: WebMCPToolAnnotation;
  type?: string;
  kind?: string;
  source?: string;
  window?: any;
  execute?: (params: any) => Promise<any> | any;
}

export interface WebMCPCallLog {
  id: string;
  timestamp: string;
  toolName: string;
  input: any;
  output: any;
  durationMs: number;
  status: 'success' | 'error';
  errorMessage?: string;
}

export interface ModelContextAPI {
  version: string;
  ontoolchange?: ((...args: any[]) => void) | null;
  ontoolactivated?: ((...args: any[]) => void) | null;
  ontoolcancel?: ((...args: any[]) => void) | null;
  listTools: () => any[];
  getTools: (options?: { fromOrigins?: any }) => any[] | Promise<any[]>;
  getTool: (toolName: string) => WebMCPTool | undefined;
  executeTool: (nameOrEnvelopeOrTool: any, inputArgs?: any) => Promise<any>;
  callTool: (toolName: string, params?: any) => Promise<{ content: Array<{ type: 'text' | 'json'; text?: string; json?: any }>; isError?: boolean }>;
  registerTool: (tool: WebMCPTool) => void;
  unregisterTool: (toolName: string) => boolean;
  registerToolsChangedCallback: (callback: () => void) => void;
  unregisterToolsChangedCallback: (callback: () => void) => void;
  getCrossDocumentScriptToolResult: () => Promise<any> | any;
  provideContext?: (context: any) => void;
  clearContext?: () => void;
  getHistory: () => WebMCPCallLog[];
  clearHistory: () => void;
  addEventListener: (event: string, handler: (e: any) => void) => void;
  removeEventListener: (event: string, handler: (e: any) => void) => void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContextAPI;
    modelContextTesting?: ModelContextAPI;
  }
  interface Document {
    modelContext?: ModelContextAPI;
  }
  interface Window {
    modelContext?: ModelContextAPI;
    modelContextTesting?: ModelContextAPI;
    WebMCP?: any;
    __AIA_WEBMCP__?: any;
    __WEBMCP_INITIALIZED__?: boolean;
    __WEBMCP_TOOLS__?: any[];
  }
}
