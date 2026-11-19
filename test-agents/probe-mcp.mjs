#!/usr/bin/env node
// Starts the Playwright Test MCP server (the tool layer the planner/generator/healer agents call)
// over stdio, performs the MCP handshake and prints the tools it exposes. No LLM involved:
// it proves the agent toolchain works on this machine/runner before an AI loop is attached.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const cli = createRequire(import.meta.url).resolve('@playwright/test/cli');
const p = spawn(process.execPath, [cli, 'run-test-mcp-server'], { stdio: ['pipe', 'pipe', 'inherit'] });
const send = (m) => p.stdin.write(JSON.stringify(m) + '\n');
const timer = setTimeout(() => { console.error('timeout: no MCP answer in 30 s'); p.kill(); process.exit(1); }, 30_000);
let buf = '';
p.stdout.on('data', (d) => {
  buf += d;
  for (let i; (i = buf.indexOf('\n')) >= 0; ) {
    const line = buf.slice(0, i).trim();
    buf = buf.slice(i + 1);
    if (!line) continue;
    const m = JSON.parse(line);
    if (m.id === 1) {
      console.log(`server: ${m.result.serverInfo.name} ${m.result.serverInfo.version}`);
      send({ jsonrpc: '2.0', method: 'notifications/initialized' });
      send({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
    } else if (m.id === 2) {
      const names = m.result.tools.map((t) => t.name);
      const agentTools = names.filter((n) => /^(planner_|generator_|test_)/.test(n));
      console.log(`tools: ${names.length} (${names.length - agentTools.length} browser_* + agent tools below)`);
      console.log(`agent tools: ${agentTools.join(', ')}`);
      clearTimeout(timer);
      p.kill();
      process.exit(0);
    }
  }
});
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'qa-toolbox-probe', version: '1.0.0' } } });
