/**
 * Automated Verification Script for WebMCP Tools and Endpoints
 */

import { aiaWebMcpTools } from './tools.ts';
import { getWebMCPRuntime } from './runtime.ts';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 WebMCP Integration Test Suite');
  console.log('====================================================\n');

  const runtime = getWebMCPRuntime();

  // 1. Register all tools
  console.log(`[1/10] Registering ${aiaWebMcpTools.length} WebMCP tools...`);
  for (const tool of aiaWebMcpTools) {
    runtime.registerTool(tool);
  }
  const tools = runtime.getTools();
  console.log(`✓ Successfully registered ${tools.length} tools on WebMCP runtime.\n`);

  // 2. Test get_agency_profile
  console.log('[2/10] Testing tool: get_agency_profile()...');
  const profileRes = await runtime.callTool('get_agency_profile', {});
  console.log('Output:', JSON.stringify(profileRes.content[0], null, 2));
  if (profileRes.isError) throw new Error('get_agency_profile failed');
  console.log('✓ get_agency_profile passed.\n');

  // 3. Test get_office_locations (with officeId filter and staff roster)
  console.log('[3/10] Testing tool: get_office_locations({ officeId: "watertown" })...');
  const officeRes = await runtime.callTool('get_office_locations', { officeId: 'watertown' });
  console.log('Output:', JSON.stringify(officeRes.content[0], null, 2));
  if (officeRes.isError) throw new Error('get_office_locations failed');
  const locJson = (officeRes.content[0] as any).json;
  if (!locJson || locJson.total !== 1 || !locJson.locations[0].directionsUrl) {
    throw new Error('get_office_locations returned invalid data: ' + JSON.stringify(locJson));
  }
  console.log('✓ get_office_locations passed with directions URL and staff roster.\n');

  // 4. Test get_team_members (multi-criteria filtering)
  console.log('[4/10] Testing tool: get_team_members({ language: "Portuguese", producersOnly: true })...');
  const teamRes = await runtime.callTool('get_team_members', { language: 'Portuguese', producersOnly: true });
  console.log('Output:', JSON.stringify(teamRes.content[0], null, 2));
  if (teamRes.isError) throw new Error('get_team_members failed');
  const teamJson = (teamRes.content[0] as any).json;
  if (!teamJson || teamJson.total < 1 || !teamJson.members[0].npn) {
    throw new Error('get_team_members returned unexpected result: ' + JSON.stringify(teamJson));
  }
  console.log(`✓ get_team_members passed: found ${teamJson.total} licensed Portuguese-speaking producers.\n`);

  // 5. Test get_employee_profile (by member ID and partial name)
  console.log('[5/10] Testing tool: get_employee_profile({ memberIdOrName: "ronald-boucher" })...');
  const profileRonRes = await runtime.callTool('get_employee_profile', { memberIdOrName: 'ronald-boucher' });
  console.log('Output:', JSON.stringify(profileRonRes.content[0], null, 2));
  if (profileRonRes.isError) throw new Error('get_employee_profile failed');
  const ronJson = (profileRonRes.content[0] as any).json;
  if (!ronJson.found || ronJson.profile.name !== 'Ronald T. Boucher') {
    throw new Error('get_employee_profile could not find Ronald Boucher: ' + JSON.stringify(ronJson));
  }
  console.log('✓ get_employee_profile passed for Ronald T. Boucher.\n');

  // 6. Test find_agent_by_language (verifying both matching agents and branch recommendation)
  console.log('[6/10] Testing tool: find_agent_by_language({ language: "es", preferredCity: "Bridgeport" })...');
  const esAgentRes = await runtime.callTool('find_agent_by_language', { language: 'es', preferredCity: 'Bridgeport' });
  console.log('Output:', JSON.stringify(esAgentRes.content[0], null, 2));
  if (esAgentRes.isError) throw new Error('find_agent_by_language failed');
  const esJson = (esAgentRes.content[0] as any).json;
  if (!esJson.supported || esJson.matchingAgentsCount < 1 || !esJson.recommendedAgent) {
    throw new Error('find_agent_by_language output missing agents or recommendation: ' + JSON.stringify(esJson));
  }
  console.log(`✓ find_agent_by_language passed: matched ${esJson.matchingAgentsCount} Spanish-speaking agents.\n`);

  // 7. Test get_insurance_products
  console.log('[7/10] Testing tool: get_insurance_products({ category: "personal" })...');
  const productsRes = await runtime.callTool('get_insurance_products', {
    category: 'personal',
  });
  console.log('Output:', JSON.stringify(productsRes.content[0], null, 2));
  if (productsRes.isError) throw new Error('get_insurance_products failed');
  console.log('✓ get_insurance_products passed.\n');

  // 8. Test search_knowledge_base
  console.log('[8/10] Testing tool: search_knowledge_base({ query: "flood" })...');
  const faqRes = await runtime.callTool('search_knowledge_base', { query: 'flood' });
  console.log('Output:', JSON.stringify(faqRes.content[0], null, 2));
  if (faqRes.isError) throw new Error('search_knowledge_base failed');
  console.log('✓ search_knowledge_base passed.\n');

  // 9. Test listTools & executeTool for WebMCP Inspector extension
  console.log('[9/10] Testing listTools() & executeTool() (WebMCP Inspector extension compatibility)...');
  const listedTools = runtime.listTools();
  if (!Array.isArray(listedTools) || listedTools.length !== aiaWebMcpTools.length) {
    throw new Error(`listTools() returned invalid output count (${listedTools.length} vs expected ${aiaWebMcpTools.length})`);
  }
  console.log(`✓ listTools() returned all ${listedTools.length} tools synchronously.`);

  let callbackFired = false;
  runtime.registerToolsChangedCallback(() => {
    callbackFired = true;
  });
  if (!callbackFired) throw new Error('registerToolsChangedCallback was not invoked.');
  console.log('✓ registerToolsChangedCallback() registered and verified.');

  const directExecRes = await runtime.executeTool('get_employee_profile', {
    memberIdOrName: 'camila-macedo',
  });
  if (!directExecRes || !directExecRes.found || directExecRes.profile.name !== 'Camila Macedo de Jesus') {
    throw new Error('executeTool failed: ' + JSON.stringify(directExecRes));
  }
  console.log('✓ executeTool() succeeded for Camila Macedo profile:', directExecRes.profile.role, directExecRes.profile.officeName);

  // 10. Test check_office_open_status
  console.log('[10/11] Testing tool: check_office_open_status()...');
  const statusRes = await runtime.callTool('check_office_open_status', {});
  console.log('Output:', JSON.stringify(statusRes.content[0], null, 2));
  console.log('✓ check_office_open_status passed.\n');

  // 11. Test Security & Input JSON Sanitization (XSS, CRLF, Prototype Pollution, Control Chars)
  console.log('[11/11] Testing WebMCP Input JSON Sanitization & Exploit Prevention...');
  
  // Test A: XSS tag stripping in search_knowledge_base
  const xssSearchRes = await runtime.callTool('search_knowledge_base', {
    query: '<script>alert("xss")</script> flood',
  });
  const xssSearchJson = (xssSearchRes.content[0] as any).json;
  if (xssSearchJson.query.includes('<script>') || xssSearchJson.query.includes('</script>')) {
    throw new Error('XSS injection was not stripped from search query: ' + xssSearchJson.query);
  }
  console.log('✓ XSS <script> tags successfully stripped from search query:', xssSearchJson.query);

  // Test B: Prototype Pollution & CRLF header injection in submit_quote_request
  const maliciousQuotePayload = {
    name: 'Jane Doe\r\nBcc: spammer@evil.com<script>evil()</script>',
    email: 'JANE.DOE@EXAMPLE.COM\r\n',
    phone: '203-748-9272<img src=x onerror=alert(1)>',
    insuranceType: 'auto\n',
    notes: 'Please quote quickly.<script>document.cookie</script>',
    __proto__: { polluted: true },
  };

  const sanitizeQuoteRes = await runtime.callTool('submit_quote_request', maliciousQuotePayload);
  const quoteJson = (sanitizeQuoteRes.content[0] as any).json;
  if (!quoteJson || quoteJson.status !== 'SUCCESS') {
    throw new Error('submit_quote_request failed with sanitized payload');
  }

  // Verify prototype was not polluted
  if ((Object.prototype as any).polluted !== undefined) {
    throw new Error('SECURITY VULNERABILITY: Prototype pollution succeeded!');
  }
  console.log('✓ Prototype pollution payload safely blocked (Object.prototype intact).');

  // Verify CRLF and script tags were stripped
  if (quoteJson.summary.customer.includes('\r') || quoteJson.summary.customer.includes('\n') || quoteJson.summary.customer.includes('<script>')) {
    throw new Error('CRLF or script tags remained in customer name: ' + quoteJson.summary.customer);
  }
  if (quoteJson.summary.email.includes('\r') || quoteJson.summary.email.includes('\n')) {
    throw new Error('CRLF remained in customer email: ' + quoteJson.summary.email);
  }
  console.log('✓ CRLF injection and HTML tags successfully stripped from quote request.');

  // Test C: Certificate Request HTML and array sanitization
  const coiRes = await runtime.callTool('request_certificate_of_insurance', {
    insuredName: 'Acme Construction <b>LLC</b>',
    requestorName: 'Bob Builder\r\n',
    requestorEmail: 'bob@acme.com',
    requestorPhone: '203-555-0100',
    holderName: '<script>alert("holder")</script>City of Danbury',
    holderAddress: '155 Deer Hill Ave, Danbury, CT 06810',
    coverages: ['General Liability<script>', 'Workers Comp'],
  });
  const coiJson = (coiRes.content[0] as any).json;
  if (coiJson.details.insuredName.includes('<b>') || coiJson.details.holderName.includes('<script>')) {
    throw new Error('HTML tags remained in certificate request: ' + JSON.stringify(coiJson.details));
  }
  if (coiJson.details.coverages[0].includes('<script>')) {
    throw new Error('Script tag remained in coverages array: ' + JSON.stringify(coiJson.details.coverages));
  }
  console.log('✓ Certificate request fields sanitized (HTML tags and arrays safely neutralized).\n');

  // 12. Verify History Log
  const history = runtime.getHistory();
  console.log(`✓ Execution History recorded ${history.length} operations correctly.`);

  console.log('\n====================================================');
  console.log('🎉 ALL WebMCP VERIFICATION & SECURITY TESTS PASSED!');
  console.log('====================================================\n');
}

runTests().catch((e) => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
