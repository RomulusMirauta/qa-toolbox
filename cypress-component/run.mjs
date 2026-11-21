// Runs the component tests through the Cypress Module API, then writes a pass/fail table
// to out/summary.md (and to the GitHub job summary when GITHUB_STEP_SUMMARY is set).
// Exit code: 0 when every test passed, 1 otherwise.
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import cypress from 'cypress';

const result = await cypress.run({ testingType: 'component', quiet: false });

mkdirSync('out', { recursive: true });

let markdown;
let ok;
if (result.status === 'failed') {
  // Cypress itself could not run (binary, browser or config problem).
  markdown = `## Cypress component tests\n\nCypress failed to run: ${result.message}\n`;
  ok = false;
} else {
  const rows = result.runs.map((run) => {
    const s = run.stats;
    const icon = s.failures > 0 ? 'fail' : 'pass';
    return `| ${run.spec.relative.split(path.sep).join('/')} | ${s.tests} | ${s.passes} | ${s.failures} | ${s.pending} | ${s.skipped} | ${icon} |`;
  });
  ok = result.totalFailed === 0 && result.totalTests > 0;
  markdown = [
    '## Cypress component tests',
    '',
    `Cypress ${result.cypressVersion}, ${result.browserName} ${result.browserVersion}, ${result.totalDuration} ms.`,
    '',
    '| spec | tests | passed | failed | pending | skipped | result |',
    '| --- | ---: | ---: | ---: | ---: | ---: | --- |',
    ...rows,
    `| **total** | **${result.totalTests}** | **${result.totalPassed}** | **${result.totalFailed}** | **${result.totalPending}** | **${result.totalSkipped}** | **${ok ? 'pass' : 'fail'}** |`,
    '',
    ok ? 'Result: **pass**.' : 'Result: **fail** (screenshots are in the `cypress-component-failures` artifact).',
    '',
  ].join('\n');
}

writeFileSync('out/summary.md', markdown);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(`\n${markdown}`);
process.exit(ok ? 0 : 1);
