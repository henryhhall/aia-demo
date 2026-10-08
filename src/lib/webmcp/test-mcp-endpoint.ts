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
  console.log('[4/6] Testing POST /api/mcp (tools/call: calculate_quote_estimate)...');
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
  console.log('✓ tools/call (calculate_quote_estimate) execution passed.\n');

  // Test 5: POST JSON-RPC tools/call (get_team_members)
  console.log('[5/6] Testing POST /api/mcp (tools/call: get_team_members)...');
  const teamReq = new Request('http://localhost:4321/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'get_team_members',
        arguments: {
          language: 'Spanish',
          producersOnly: true,
        },
      },
    }),
  });
  const teamRes = await POST({ request: teamReq } as any);
  const teamJson = await teamRes.json();
  const parsedTeam = JSON.parse(teamJson.result.content[0].text);
  if (!parsedTeam || parsedTeam.total < 1) {
    throw new Error('get_team_members JSON-RPC call returned empty result');
  }
  console.log(`✓ tools/call (get_team_members) execution passed: returned ${parsedTeam.total} producers.\n`);

  // Test 6: POST JSON-RPC tools/call (get_employee_profile)
  console.log('[6/6] Testing POST /api/mcp (tools/call: get_employee_profile)...');
  const profileReq = new Request('http://localhost:4321/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'get_employee_profile',
        arguments: {
          memberIdOrName: 'ronald-boucher',
        },
      },
    }),
  });
  const profileRes = await POST({ request: profileReq } as any);
  const profileJson = await profileRes.json();
  const parsedProfile = JSON.parse(profileJson.result.content[0].text);
  if (!parsedProfile.found || parsedProfile.profile.name !== 'Ronald T. Boucher') {
    throw new Error('get_employee_profile JSON-RPC call failed');
  }
  console.log(`✓ tools/call (get_employee_profile) execution passed for ${parsedProfile.profile.name}.\n`);

  console.log('====================================================');
  console.log('🎉 ALL MCP JSON-RPC TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

testMcpEndpoint().catch((err) => {
  console.error('❌ MCP endpoint test failed:', err);
  process.exit(1);
});
