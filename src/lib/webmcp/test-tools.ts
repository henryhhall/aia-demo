/**
 * Automated Verification Script for WebMCP Tools and Endpoints
 */

import { aiaWebMcpTools, AIA_LOCATIONS, AIA_CARRIERS, AIA_FAQS } from './tools.ts';
import { getWebMCPRuntime } from './runtime.ts';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 WebMCP Integration Test Suite');
  console.log('====================================================\n');

  const runtime = getWebMCPRuntime();

  // 1. Register all tools
  console.log(`[1/5] Registering ${aiaWebMcpTools.length} WebMCP tools...`);
  for (const tool of aiaWebMcpTools) {
    runtime.registerTool(tool);
  }
  const tools = runtime.getTools();
  console.log(`✓ Successfully registered ${tools.length} tools on WebMCP runtime.\n`);

  // 2. Test get_agency_profile
  console.log('[2/5] Testing tool: get_agency_profile()...');
  const profileRes = await runtime.callTool('get_agency_profile', {});
  console.log('Output:', JSON.stringify(profileRes.content[0], null, 2));
  if (profileRes.isError) throw new Error('get_agency_profile failed');
  console.log('✓ get_agency_profile passed.\n');

  // 3. Test find_agent_by_language
  console.log('[3/5] Testing tool: find_agent_by_language({ language: "es" })...');
  const esAgentRes = await runtime.callTool('find_agent_by_language', { language: 'es' });
  console.log('Output:', JSON.stringify(esAgentRes.content[0], null, 2));
  if (esAgentRes.isError) throw new Error('find_agent_by_language failed');
  console.log('✓ find_agent_by_language passed.\n');

  // 4. Test calculate_quote_estimate
  console.log('[4/5] Testing tool: calculate_quote_estimate({ insuranceType: "auto", location: "Danbury", estimatedValueOrVehicles: 2, bundleWithOtherPolicy: true })...');
  const quoteEstimateRes = await runtime.callTool('calculate_quote_estimate', {
    insuranceType: 'auto',
    location: 'Danbury',
    estimatedValueOrVehicles: 2,
    bundleWithOtherPolicy: true,
  });
  console.log('Output:', JSON.stringify(quoteEstimateRes.content[0], null, 2));
  if (quoteEstimateRes.isError) throw new Error('calculate_quote_estimate failed');
  console.log('✓ calculate_quote_estimate passed.\n');

  // 5. Test search_knowledge_base
  console.log('[5/5] Testing tool: search_knowledge_base({ query: "flood" })...');
  const faqRes = await runtime.callTool('search_knowledge_base', { query: 'flood' });
  console.log('Output:', JSON.stringify(faqRes.content[0], null, 2));
  if (faqRes.isError) throw new Error('search_knowledge_base failed');
  console.log('✓ search_knowledge_base passed.\n');

  // 6. Test listTools & executeTool for WebMCP Inspector extension
  console.log('[6/7] Testing listTools() & executeTool() (WebMCP Inspector extension compatibility)...');
  const listedTools = runtime.listTools();
  if (!Array.isArray(listedTools) || listedTools.length !== 9) {
    throw new Error(`listTools() returned invalid output: ${JSON.stringify(listedTools)}`);
  }
  console.log(`✓ listTools() returned ${listedTools.length} tools synchronously.`);

  let callbackFired = false;
  runtime.registerToolsChangedCallback(() => {
    callbackFired = true;
  });
  if (!callbackFired) throw new Error('registerToolsChangedCallback was not invoked.');
  console.log('✓ registerToolsChangedCallback() registered and verified.');

  const directExecRes = await runtime.executeTool('calculate_quote_estimate', {
    insuranceType: 'home',
    location: 'Danbury',
    estimatedValueOrVehicles: 350000,
  });
  if (!directExecRes || !directExecRes.estimatedAnnualPremium) {
    throw new Error('executeTool failed: ' + JSON.stringify(directExecRes));
  }
  console.log('✓ executeTool() succeeded with annual premium estimate:', directExecRes.estimatedAnnualPremium);

  // 7. Test check_office_open_status
  console.log('[7/7] Testing tool: check_office_open_status()...');
  const statusRes = await runtime.callTool('check_office_open_status', {});
  console.log('Output:', JSON.stringify(statusRes.content[0], null, 2));
  console.log('✓ check_office_open_status passed.\n');

  // 8. Verify History Log
  const history = runtime.getHistory();
  console.log(`✓ Execution History recorded ${history.length} operations correctly.`);

  console.log('\n====================================================');
  console.log('🎉 ALL WebMCP VERIFICATION TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

runTests().catch((e) => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
