import React, { useState, useEffect } from 'react';
import type { WebMCPToolDefinition, WebMCPCallLog } from '../lib/webmcp/types.ts';
import { aiaWebMcpTools } from '../lib/webmcp/tools.ts';

const SAMPLE_INPUTS: Record<string, any> = {
  get_agency_profile: {},
  get_office_locations: { officeId: 'all', includeStaffRoster: true },
  get_team_members: { office: 'all', language: 'Spanish', specialty: 'Commercial' },
  get_employee_profile: { memberIdOrName: 'ronald-boucher', locale: 'en' },
  find_agent_by_language: { language: 'es', preferredCity: 'Bridgeport' },
  get_insurance_products: { category: 'personal' },
  submit_quote_request: {
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '203-555-0192',
    insuranceType: 'home',
    preferredOffice: 'Danbury',
    preferredLanguage: 'es',
    notes: 'Single family home in Danbury, looking for bundle discount',
  },
  get_carrier_billing_directory: { carrierName: 'Progressive' },
  search_knowledge_base: { query: 'minimum liability' },
  check_office_open_status: { branchId: 'danbury-hq' },
  request_certificate_of_insurance: {
    insuredName: 'Apex Contracting LLC',
    requestorName: 'Carlos Mendez',
    requestorEmail: 'carlos@apexcontracting.com',
    requestorPhone: '203-748-9272',
    holderName: 'City of Danbury',
    holderAddress: '155 Deer Hill Ave, Danbury, CT 06810',
    deliveryMethod: 'Email',
    coverages: ['General Liability', "Workers' Compensation"],
    isAdditionalInsured: true,
    waiverOfSubrogation: true,
    jobNumberOrContract: 'BID-2026-089',
  },
};

export default function WebMcpInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tools' | 'playground' | 'logs' | 'agent-docs'>('tools');
  const [tools, setTools] = useState<WebMCPToolDefinition[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('get_agency_profile');
  const [paramsInput, setParamsInput] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<WebMCPCallLog[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    const normalizeTool = (t: any): WebMCPToolDefinition => ({
      name: t.name,
      description: t.description || '',
      inputSchema: t.inputSchema || t.parameters || { type: 'object', properties: {} },
      annotations: t.annotations,
      type: t.type || 'imperative',
      kind: t.kind || 'function',
      source: t.source || 'script',
    });

    // Initial fetch of tools
    if (typeof window !== 'undefined' && window.modelContext) {
      Promise.resolve(window.modelContext.getTools()).then((toolsList) => {
        if (Array.isArray(toolsList)) {
          setTools(toolsList.map(normalizeTool));
        }
      });
      if (typeof window.modelContext.getHistory === 'function') {
        setLogs(window.modelContext.getHistory());
      }
    } else {
      // Fallback from static definitions
      setTools(aiaWebMcpTools.map(normalizeTool));
    }

    const handleToolExecuted = (e: any) => {
      if (e.detail) {
        setLogs((prev) => [e.detail, ...prev.slice(0, 49)]);
      }
    };

    window.addEventListener('modelcontexttoolexecuted', handleToolExecuted);
    return () => {
      window.removeEventListener('modelcontexttoolexecuted', handleToolExecuted);
    };
  }, []);

  // Keyboard shortcut to close inspector with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (selectedTool && SAMPLE_INPUTS[selectedTool] !== undefined) {
      setParamsInput(JSON.stringify(SAMPLE_INPUTS[selectedTool], null, 2));
    } else {
      setParamsInput('{}');
    }
    setExecutionResult(null);
  }, [selectedTool]);

  const handleExecuteTool = async () => {
    setIsExecuting(true);
    setExecutionResult(null);

    try {
      let parsedParams = {};
      if (paramsInput.trim()) {
        parsedParams = JSON.parse(paramsInput);
      }

      if (typeof window !== 'undefined' && window.modelContext) {
        const res = await window.modelContext.callTool(selectedTool, parsedParams);
        setExecutionResult(res);
      } else {
        // Fallback directly to tool implementation
        const toolObj = aiaWebMcpTools.find((t) => t.name === selectedTool);
        if (toolObj) {
          const raw = await toolObj.execute(parsedParams);
          setExecutionResult({
            isError: false,
            content: [{ type: 'json', json: raw }],
          });
        }
      }
    } catch (err: any) {
      setExecutionResult({
        isError: true,
        content: [{ type: 'text', text: `Syntax / Execution Error: ${err?.message || String(err)}` }],
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedUrl(label);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (Desktop & Tablet only to preserve mobile lead gen touch targets) */}
      <div className="hidden md:block fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-accent text-white shadow-xl hover:shadow-2xl hover:bg-accent/95 active:scale-95 transition-all border border-accent-gold/40 cursor-pointer"
          title="Open WebMCP AI Agent Inspector"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-gold"></span>
          </span>
          <span className="text-xs font-mono font-medium tracking-wide">
            WebMCP <span className="text-accent-gold font-semibold">• {tools.length || 9} Tools</span>
          </span>
          <svg
            className="w-4 h-4 text-accent-gold group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </button>
      </div>

      {/* Slide-over Inspector Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl h-full max-h-[100dvh] bg-[#0d1117] text-zinc-100 flex flex-col shadow-2xl border-l border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161b22]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center border border-accent-gold/50">
                  <span className="text-accent-gold text-sm font-bold">🤖</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    WebMCP Runtime Inspector
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                      Standard Active
                    </span>
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    navigator.modelContext • {tools.length} Tools Registered
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
                aria-label="Close WebMCP Inspector"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Links Bar */}
            <div className="px-6 py-2 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono overflow-x-auto">
              <div className="flex items-center gap-3">
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-gold hover:underline flex items-center gap-1"
                >
                  📄 /llms.txt
                </a>
                <a
                  href="/api/mcp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:underline flex items-center gap-1"
                >
                  🔌 /api/mcp
                </a>
                <a
                  href="/.well-known/mcp.json"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:underline"
                >
                  .well-known/mcp.json
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(window.location.origin + '/api/mcp', 'mcp-url')}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-1"
              >
                {copiedUrl === 'mcp-url' ? '✓ Copied Endpoint' : 'Copy MCP URL'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-zinc-800 bg-[#161b22] px-6 text-xs font-mono">
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'tools'
                    ? 'border-accent-gold text-accent-gold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tool Catalog ({tools.length})
              </button>
              <button
                onClick={() => setActiveTab('playground')}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'playground'
                    ? 'border-accent-gold text-accent-gold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Interactive Sandbox
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'logs'
                    ? 'border-accent-gold text-accent-gold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Execution Logs
                {logs.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-800 text-accent-gold font-bold">
                    {logs.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('agent-docs')}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === 'agent-docs'
                    ? 'border-accent-gold text-accent-gold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Agent Instructions
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: TOOL CATALOG */}
              {activeTab === 'tools' && (
                <div className="space-y-4">
                  <div className="text-xs text-zinc-400">
                    Below are all JavaScript tools exposed to AI browser subagents, extensions, and the MCP HTTP server.
                  </div>
                  <div className="space-y-3">
                    {tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="border border-zinc-800 rounded-lg p-4 bg-[#161b22] hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="font-mono text-sm font-bold text-accent-gold">
                            {tool.name}()
                          </div>
                          <div className="flex items-center gap-1.5">
                            {tool.annotations?.readOnlyHint && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800 font-mono">
                                readOnly
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setSelectedTool(tool.name);
                                setActiveTab('playground');
                              }}
                              className="text-[11px] px-2 py-0.5 rounded bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold font-sans font-medium transition-colors cursor-pointer"
                            >
                              Test Tool →
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 mb-3">{tool.description}</p>
                        <div className="bg-[#0d1117] p-2.5 rounded border border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                          <span className="text-zinc-500 uppercase text-[9px] block mb-1">Input Parameters Schema:</span>
                          <pre className="overflow-x-auto text-zinc-300">
                            {JSON.stringify(tool.inputSchema?.properties || (tool as any)?.parameters?.properties || {}, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: PLAYGROUND / SANDBOX */}
              {activeTab === 'playground' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-zinc-300 block">
                      Select WebMCP Tool to Invoke:
                    </label>
                    <select
                      value={selectedTool}
                      onChange={(e) => setSelectedTool(e.target.value)}
                      className="w-full bg-[#161b22] border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 font-mono focus:outline-none focus:border-accent-gold"
                    >
                      {tools.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name} — {(t.description || '').substring(0, 50)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-medium text-zinc-300">
                        Tool Arguments (JSON):
                      </label>
                      <button
                        onClick={() => {
                          if (SAMPLE_INPUTS[selectedTool]) {
                            setParamsInput(JSON.stringify(SAMPLE_INPUTS[selectedTool], null, 2));
                          }
                        }}
                        className="text-[11px] text-accent-gold hover:underline font-mono"
                      >
                        Reset to Sample Input
                      </button>
                    </div>
                    <textarea
                      rows={6}
                      value={paramsInput}
                      onChange={(e) => setParamsInput(e.target.value)}
                      className="w-full bg-[#0d1117] border border-zinc-700 rounded-md p-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-accent-gold"
                      placeholder="{}"
                    />
                  </div>

                  <button
                    onClick={handleExecuteTool}
                    disabled={isExecuting}
                    className="w-full py-2.5 px-4 rounded bg-accent-gold hover:bg-accent-gold-hover text-zinc-950 font-bold text-xs uppercase tracking-wider font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isExecuting ? (
                      <>
                        <span className="animate-spin rounded-full h-3 w-3 border-2 border-zinc-950 border-t-transparent"></span>
                        Executing in WebMCP Runtime...
                      </>
                    ) : (
                      <>
                        <span>▶</span> Run Tool via navigator.modelContext.callTool()
                      </>
                    )}
                  </button>

                  {executionResult && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-zinc-300">
                          Execution Output:
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            executionResult.isError
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {executionResult.isError ? 'Error' : '200 OK'}
                        </span>
                      </div>
                      <div className="bg-[#161b22] border border-zinc-800 rounded-lg p-3 font-mono text-xs overflow-x-auto max-h-72">
                        <pre className="text-zinc-200">
                          {JSON.stringify(executionResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: EXECUTION LOGS */}
              {activeTab === 'logs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">
                      Recent tool invocations captured by the WebMCP event bus.
                    </span>
                    {logs.length > 0 && (
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.modelContext) {
                            window.modelContext.clearHistory();
                            setLogs([]);
                          }
                        }}
                        className="text-[11px] text-zinc-400 hover:text-zinc-200 font-mono"
                      >
                        Clear History
                      </button>
                    )}
                  </div>

                  {logs.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs border border-zinc-800 rounded-lg">
                      No tool calls executed yet. Run a tool in the Sandbox or via client scripts to see live logs.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="border border-zinc-800 bg-[#161b22] rounded-lg p-3 space-y-2 text-xs font-mono"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-accent-gold">{log.toolName}</span>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                              <span>{log.durationMs}ms</span>
                              <span
                                className={`px-1.5 py-0.2 rounded ${
                                  log.status === 'success'
                                    ? 'bg-emerald-950 text-emerald-400'
                                    : 'bg-rose-950 text-rose-400'
                                }`}
                              >
                                {log.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-zinc-400 text-[11px]">
                            <span className="text-zinc-500">Input: </span>
                            {JSON.stringify(log.input)}
                          </div>
                          <div className="text-zinc-300 text-[11px] max-h-32 overflow-y-auto bg-[#0d1117] p-2 rounded">
                            <span className="text-zinc-500 block">Result:</span>
                            <pre className="text-[10px] text-zinc-300">
                              {JSON.stringify(log.output, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AGENT INSTRUCTIONS */}
              {activeTab === 'agent-docs' && (
                <div className="space-y-4 text-xs font-sans text-zinc-300 leading-relaxed">
                  <div className="bg-[#161b22] border border-zinc-800 p-4 rounded-lg space-y-2">
                    <h3 className="font-bold font-mono text-sm text-accent-gold">
                      How AI Agents Connect to AIA
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Associated Insurance Agency provides two official channels for AI agents:
                    </p>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-300 pt-1">
                      <li>
                        <strong className="text-white">In-Browser WebMCP:</strong> In browser contexts (e.g. Chrome with WebMCP or browser subagents), call <code className="text-accent-gold bg-zinc-900 px-1 py-0.5 rounded">navigator.modelContext.callTool(name, params)</code>.
                      </li>
                      <li>
                        <strong className="text-white">HTTP MCP Endpoint:</strong> In external IDEs/frameworks (Cursor, Claude Desktop, LangChain), send JSON-RPC 2.0 requests to <code className="text-accent-gold bg-zinc-900 px-1 py-0.5 rounded">POST https://aia-danbury.com/api/mcp</code>.
                      </li>
                      <li>
                        <strong className="text-white">LLM Context File:</strong> Read <code className="text-accent-gold bg-zinc-900 px-1 py-0.5 rounded">/llms.txt</code> or <code className="text-accent-gold bg-zinc-900 px-1 py-0.5 rounded">/llms-full.txt</code> for raw structured context.
                      </li>
                    </ol>
                  </div>

                  <div className="bg-[#161b22] border border-zinc-800 p-4 rounded-lg space-y-2">
                    <h4 className="font-mono font-bold text-xs text-white">Example Cursor / Claude MCP Config:</h4>
                    <pre className="bg-[#0d1117] p-3 rounded text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`{
  "mcpServers": {
    "aia-insurance": {
      "url": "https://aia-danbury.com/api/mcp",
      "transport": "http"
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
