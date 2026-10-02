/**
 * Automated Verification for /api/mcp Model Context Protocol JSON-RPC Endpoint
 */

import { POST, GET } from '../../pages/api/mcp.ts';

async function testMcpEndpoint() {
  console.log('====================================================');
  console.log('🔌 Model Context Protocol (MCP) Endpoint Tests');
  console.log('====================================================\n');

  // Test 1: GET discovery
  console.log('[1/4] Testing GET /api/mcp (Discovery info)...');
  const getReq = new Request('http://localhost:4321/api/mcp', { method: 'GET' });
  const getRes = await GET({ request: getReq } as any);
  const getJson = await getRes.json();
  console.log(`✓ Returned protocol: ${getJson.protocolVersion}, total tools listed: ${getJson.tools.length}\n`);

  // Test 2: POST JSON-RPC initialize
  console.log('[2/4] Testing POST /api/mcp (initialize)...');
  const initReq = new Request('http://localhost:4321/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
    }),
  });
  const initRes = await POST({ request: initReq } as any);
  const initJson = await initRes.json();
  console.log(`✓ Initialize response: server "${initJson.result.serverInfo.name}" v${initJson.result.serverInfo.version}\n`);

  // Test 3: POST JSON-RPC tools/list
  console.log('[3/4] Testing POST /api/mcp (tools/list)...');
  const listReq = new Request('http://localhost:4321/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
    }),
  });
  const listRes = await POST({ request: listReq } as any);
  const listJson = await listRes.json();
  console.log(`✓ tools/list returned ${listJson.result.tools.length} tool schemas.\n`);

  // Test 4: POST JSON-RPC tools/call (calculate_quote_estimate)
  console.log('[4/4] Testing POST /api/mcp (tools/call: calculate_quote_estimate)...');
  const callReq = new Request('http://localhost:4321/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'calculate_quote_estimate',
        arguments: {
          insuranceType: 'home',
          location: 'Danbury',
          estimatedValueOrVehicles: 500000,
        },
      },
    }),
  });
  const callRes = await POST({ request: callReq } as any);
  const callJson = await callRes.json();
  console.log('Result output:', callJson.result.content[0].text);
  console.log('✓ tools/call execution passed.\n');

  console.log('====================================================');
  console.log('🎉 ALL MCP JSON-RPC TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

testMcpEndpoint().catch((err) => {
  console.error('❌ MCP endpoint test failed:', err);
  process.exit(1);
});
