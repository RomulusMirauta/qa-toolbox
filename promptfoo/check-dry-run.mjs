#!/usr/bin/env node
// Verifies the dry run did exactly what it is meant to: three clean summaries pass, and the one
// canned response that leaks an IP address is caught by the no-PII assertion (and only by it).
// A dry run that passes everything would mean the PII gate is broken.
import { readFileSync } from 'node:fs';

const r = JSON.parse(readFileSync(new URL('./out/dry-results.json', import.meta.url), 'utf8'));
const rows = r.results.results.map((x) => ({
  name: x.testCase.description,
  pass: x.success,
  reasons: (x.gradingResult?.componentResults ?? []).filter((c) => !c.pass).map((c) => c.reason),
}));
const failed = rows.filter((x) => !x.pass);
const ok =
  rows.length === 4 &&
  failed.length === 1 &&
  failed[0].name.includes('keyboard') &&
  failed[0].reasons.length === 1 &&
  /personal data\/secret in output: IPv4/.test(failed[0].reasons[0]);
for (const x of rows) console.log(`${x.pass ? 'PASS' : 'FAIL'}  ${x.name}${x.reasons.length ? `  <- ${x.reasons.join('; ')}` : ''}`);
console.log(ok ? '\ndry run behaved as designed (the PII gate caught the planted leak)' : '\nUNEXPECTED dry-run result');
process.exit(ok ? 0 : 1);
