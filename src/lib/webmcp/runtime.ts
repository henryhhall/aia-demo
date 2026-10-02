/**
 * WebMCP Client-side Runtime & Polyfill
 * Exposes navigator.modelContext, navigator.modelContextTesting, document.modelContext, and window.modelContext
 * Compatible with WebMCP Inspector Chrome Extension & W3C WebModelContext standard.
 */

import type {
  WebMCPTool,
  WebMCPToolDefinition,
  WebMCPCallLog,
  ModelContextAPI,
} from './types.ts';

class WebMCPRuntime implements ModelContextAPI {
  public version = '1.0.0';
  public ontoolchange: ((...args: any[]) => void) | null = null;
  public ontoolactivated: ((...args: any[]) => void) | null = null;
  public ontoolcancel: ((...args: any[]) => void) | null = null;
  private tools: Map<string, WebMCPTool> = new Map();
  private history: WebMCPCallLog[] = [];
  private eventTarget = new EventTarget();
  private toolsChangedCallbacks: Set<() => void> = new Set();
  private lastResult: any = null;
  private nativeBackend: any = null;

  constructor() {
    this.setupMessageBridge();
  }

  public setNativeBackend(backend: any) {
    if (backend && backend !== this) {
      this.nativeBackend = backend;
    }
  }

  /**
   * Primary method used by WebMCP Inspector Chrome Extension
   */
  public listTools(): any[] {
    const currentWindow = typeof window !== 'undefined' ? window : null;
    return Array.from(this.tools.values()).map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
      type: tool.type || 'imperative',
      kind: tool.kind || 'function',
      source: tool.source || 'script',
      execute: tool.execute,
      window: currentWindow,
    }));
  }

  public getTools(options?: { fromOrigins?: any }): any[] {
    return this.listTools();
  }

  public getTool(toolName: string): WebMCPTool | undefined {
    return this.tools.get(toolName);
  }

  public registerTool(tool: WebMCPTool): void {
    if (!tool.name) {
      throw new Error('WebMCP: Tool name is required');
    }
    const currentWindow = typeof window !== 'undefined' ? window : null;
    tool.window = currentWindow;
    this.tools.set(tool.name, tool);

    // Also register on native browser WebMCP engine if available
    if (this.nativeBackend && typeof this.nativeBackend.registerTool === 'function') {
      try {
        this.nativeBackend.registerTool({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          annotations: tool.annotations,
          execute: async (params: any) => {
            return await this.executeTool(tool.name, params);
          },
        });
      } catch (err) {
        console.debug('[WebMCP] Native browser registerTool delegation:', err);
      }
    }

    const definition = this.getToolDefinition(tool);

    // Notify tools changed callbacks
    this.notifyToolsChanged();

    // Dispatch DOM events
    const event = new CustomEvent('modelcontexttooladded', {
      detail: { toolName: tool.name, definition },
    });
    this.eventTarget.dispatchEvent(event);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
      window.dispatchEvent(new CustomEvent('toolregistered', { detail: { tool: definition } }));
      window.__WEBMCP_TOOLS__ = this.listTools();
    }
  }

  public unregisterTool(toolName: string): boolean {
    const deleted = this.tools.delete(toolName);
    if (deleted) {
      if (this.nativeBackend && typeof this.nativeBackend.unregisterTool === 'function') {
        try {
          this.nativeBackend.unregisterTool(toolName);
        } catch {}
      }
      this.notifyToolsChanged();
      const event = new CustomEvent('modelcontexttoolremoved', {
        detail: { toolName },
      });
      this.eventTarget.dispatchEvent(event);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(event);
        window.__WEBMCP_TOOLS__ = this.listTools();
      }
    }
    return deleted;
  }

  public registerToolsChangedCallback(callback: () => void): void {
    if (typeof callback === 'function') {
      this.toolsChangedCallbacks.add(callback);
      // Immediately invoke so the caller gets current tools
      try {
        callback();
      } catch (err) {
        console.debug('[WebMCP] Error in toolsChangedCallback:', err);
      }
    }
  }

  public unregisterToolsChangedCallback(callback: () => void): void {
    this.toolsChangedCallbacks.delete(callback);
  }

  private notifyToolsChanged(): void {
    for (const cb of this.toolsChangedCallbacks) {
      try {
        cb();
      } catch (err) {
        console.debug('[WebMCP] Error notifying tools changed:', err);
      }
    }
    if (typeof this.ontoolchange === 'function') {
      try {
        this.ontoolchange();
      } catch (err) {
        console.debug('[WebMCP] Error calling ontoolchange:', err);
      }
    }
  }

  /**
   * Execution method called by WebMCP Inspector Chrome Extension
   */
  public async executeTool(
    nameOrEnvelope: any,
    inputArgs?: any
  ): Promise<any> {
    let toolName = '';
    let parsedParams: any = {};

    if (typeof nameOrEnvelope === 'object' && nameOrEnvelope !== null) {
      toolName = nameOrEnvelope.name;
      // In the extension: document.modelContext.executeTool(tool, JSON.parse(inputArgs))
      // 2nd argument takes precedence if provided!
      if (inputArgs !== undefined) {
        parsedParams = inputArgs;
      } else if (nameOrEnvelope.inputArgs !== undefined) {
        parsedParams = nameOrEnvelope.inputArgs;
      } else if (nameOrEnvelope.params !== undefined) {
        parsedParams = nameOrEnvelope.params;
      }
    } else {
      toolName = String(nameOrEnvelope || '');
      parsedParams = inputArgs;
    }

    if (typeof parsedParams === 'string') {
      try {
        parsedParams = JSON.parse(parsedParams);
      } catch {
        // Keep as string if not JSON
      }
    }

    const tool = this.tools.get(toolName);
    const startTime = performance.now();
    const logId = 'call_' + Math.random().toString(36).substring(2, 9);

    if (!tool) {
      const errLog: WebMCPCallLog = {
        id: logId,
        timestamp: new Date().toISOString(),
        toolName,
        input: parsedParams,
        output: null,
        durationMs: Math.round(performance.now() - startTime),
        status: 'error',
        errorMessage: `Tool "${toolName}" not found in WebMCP registry`,
      };
      this.history.unshift(errLog);
      this.dispatchExecutionEvent(errLog);
      throw new Error(`Tool "${toolName}" not found`);
    }

    try {
      if (typeof window !== 'undefined') {
        const actEvent = new CustomEvent('toolactivated', { detail: { toolName } });
        this.eventTarget.dispatchEvent(actEvent);
        window.dispatchEvent(actEvent);
        if (typeof document !== 'undefined') document.dispatchEvent(actEvent);
        if (typeof this.ontoolactivated === 'function') {
          try {
            (this.ontoolactivated as any)({ toolName });
          } catch {}
        }
      }

      const result = await tool.execute(parsedParams || {});
      this.lastResult = result;
      const durationMs = Math.round(performance.now() - startTime);

      const log: WebMCPCallLog = {
        id: logId,
        timestamp: new Date().toISOString(),
        toolName,
        input: parsedParams,
        output: result,
        durationMs,
        status: 'success',
      };
      this.history.unshift(log);
      if (this.history.length > 50) this.history.pop();
      this.dispatchExecutionEvent(log);

      return result;
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - startTime);
      const errorMessage = err?.message || String(err);

      const errLog: WebMCPCallLog = {
        id: logId,
        timestamp: new Date().toISOString(),
        toolName,
        input: parsedParams,
        output: null,
        durationMs,
        status: 'error',
        errorMessage,
      };
      this.history.unshift(errLog);
      this.dispatchExecutionEvent(errLog);

      if (typeof window !== 'undefined') {
        const cancelEvent = new CustomEvent('toolcancel', {
          detail: { toolName, error: errorMessage },
        });
        this.eventTarget.dispatchEvent(cancelEvent);
        window.dispatchEvent(cancelEvent);
        if (typeof document !== 'undefined') document.dispatchEvent(cancelEvent);
        if (typeof this.ontoolcancel === 'function') {
          try {
            (this.ontoolcancel as any)({ toolName, error: errorMessage });
          } catch {}
        }
      }

      throw err;
    }
  }

  public async getCrossDocumentScriptToolResult(): Promise<any> {
    return this.lastResult;
  }

  public async callTool(
    toolName: string,
    params: any = {}
  ): Promise<{
    content: Array<{ type: 'text' | 'json'; text?: string; json?: any }>;
    isError?: boolean;
  }> {
    try {
      const rawResult = await this.executeTool(toolName, params);
      return {
        isError: false,
        content: [
          {
            type: 'json',
            json: rawResult,
          },
          {
            type: 'text',
            text: typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Execution failed for tool "${toolName}": ${err?.message || String(err)}`,
          },
        ],
      };
    }
  }

  public provideContext(context: any): void {
    console.debug('[WebMCP] Context provided:', context);
  }

  public clearContext(): void {
    this.lastResult = null;
  }

  public getHistory(): WebMCPCallLog[] {
    return [...this.history];
  }

  public clearHistory(): void {
    this.history = [];
  }

  public addEventListener(event: string, handler: (e: any) => void): void {
    this.eventTarget.addEventListener(event, handler);
  }

  public removeEventListener(event: string, handler: (e: any) => void): void {
    this.eventTarget.removeEventListener(event, handler);
  }

  private getToolDefinition(tool: WebMCPTool): WebMCPToolDefinition {
    const currentWindow = typeof window !== 'undefined' ? window : null;
    return {
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
      type: tool.type || 'imperative',
      kind: tool.kind || 'function',
      source: tool.source || 'script',
      window: currentWindow,
      execute: tool.execute,
    };
  }

  private dispatchExecutionEvent(log: WebMCPCallLog) {
    const event = new CustomEvent('modelcontexttoolexecuted', { detail: log });
    this.eventTarget.dispatchEvent(event);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
  }

  private setupMessageBridge() {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', async (event) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'WEBMCP_GET_TOOLS') {
        window.postMessage(
          {
            type: 'WEBMCP_TOOLS_RESPONSE',
            requestId: data.requestId,
            tools: this.listTools(),
          },
          '*'
        );
      } else if (data.type === 'WEBMCP_CALL_TOOL' || data.type === 'WEBMCP_EXECUTE_TOOL') {
        const { toolName, params, inputArgs, requestId } = data;
        try {
          const result = await this.executeTool(toolName, params || inputArgs);
          window.postMessage(
            {
              type: 'WEBMCP_TOOL_RESULT',
              requestId,
              toolName,
              result,
              success: true,
            },
            '*'
          );
        } catch (err: any) {
          window.postMessage(
            {
              type: 'WEBMCP_TOOL_RESULT',
              requestId,
              toolName,
              error: err?.message || String(err),
              success: false,
            },
            '*'
          );
        }
      }
    });
  }
}

// Singleton runtime instance
let runtimeInstance: WebMCPRuntime | null = null;

export function getWebMCPRuntime(): WebMCPRuntime {
  if (!runtimeInstance) {
    runtimeInstance = new WebMCPRuntime();
  }
  return runtimeInstance;
}

/**
 * Initializes the WebMCP environment in navigator, navigator.modelContextTesting, document, and window
 */
export function initWebMCP(): WebMCPRuntime {
  const runtime = getWebMCPRuntime();

  if (typeof window !== 'undefined') {
    // Detect existing native implementations before assignment
    const existingDoc = typeof document !== 'undefined' ? (document as any).modelContext : null;
    const existingNav = typeof navigator !== 'undefined' ? (navigator as any).modelContext : null;
    if (existingDoc && existingDoc !== runtime && typeof existingDoc.registerTool === 'function') {
      runtime.setNativeBackend(existingDoc);
    } else if (existingNav && existingNav !== runtime && typeof existingNav.registerTool === 'function') {
      runtime.setNativeBackend(existingNav);
    }

    // 1. window.modelContext & window.modelContextTesting
    window.modelContext = runtime;
    window.modelContextTesting = runtime;

    // 2. window.WebMCP (WebMCP standard shorthand)
    window.WebMCP = {
      registerTool: (t: any) => runtime.registerTool(t),
      unregisterTool: (name: string) => runtime.unregisterTool(name),
      listTools: () => runtime.listTools(),
      getTools: (opts?: any) => runtime.getTools(opts),
      executeTool: (name: any, args?: any) => runtime.executeTool(name, args),
    };

    // 3. navigator.modelContext & navigator.modelContextTesting
    if (typeof navigator !== 'undefined') {
      try {
        Object.defineProperty(navigator, 'modelContext', {
          value: runtime,
          writable: true,
          configurable: true,
        });
      } catch {
        (navigator as any).modelContext = runtime;
      }

      try {
        Object.defineProperty(navigator, 'modelContextTesting', {
          value: runtime,
          writable: true,
          configurable: true,
        });
      } catch {
        (navigator as any).modelContextTesting = runtime;
      }
    }

    // 4. document.modelContext
    if (typeof document !== 'undefined') {
      try {
        Object.defineProperty(document, 'modelContext', {
          value: runtime,
          writable: true,
          configurable: true,
        });
      } catch {
        (document as any).modelContext = runtime;
      }
    }

    window.__WEBMCP_INITIALIZED__ = true;
    window.__WEBMCP_TOOLS__ = runtime.listTools();

    // Dispatch standard ready events
    window.dispatchEvent(
      new CustomEvent('modelcontextready', {
        detail: {
          version: runtime.version,
          toolsCount: runtime.listTools().length,
        },
      })
    );
  }

  return runtime;
}
