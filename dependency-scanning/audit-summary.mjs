// Runs `npm audit --json` and prints a readable Markdown summary: to the GitHub Actions job summary when
// GITHUB_STEP_SUMMARY is set, otherwise to stdout. It only reports; the gate is `npm audit --audit-level=high`.
import { execFileSync } from 'node:child_process';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';

// Under `npm run`, npm_execpath points at npm's own CLI script: running it with this Node binary needs no shell
// (and no npm.cmd on Windows). Called directly, plain `npm` works on Linux and macOS.
const [command, prefix] = process.env.npm_execpath ? [process.execPath, [process.env.npm_execpath]] : ['npm', []];
let raw;
try {
  raw = execFileSync(command, [...prefix, 'audit', '--json'], { encoding: 'utf8' });
} catch (error) {
  raw = error.stdout; // npm audit exits non-zero when it finds anything; the JSON is still on stdout
}

const audit = JSON.parse(raw || '{}');
mkdirSync('out', { recursive: true });
writeFileSync('out/npm-audit.json', JSON.stringify(audit, null, 2));

const counts = audit.metadata?.vulnerabilities ?? {};
const deps = audit.metadata?.dependencies ?? {};
const levels = ['critical', 'high', 'moderate', 'low', 'info'];
const blocking = (counts.critical ?? 0) + (counts.high ?? 0);
const lines = [
  '## npm audit',
  '',
  `Dependencies scanned (from package-lock.json): ${deps.total ?? '?'}.`,
  '',
  '| severity | count |',
  '| --- | --- |',
  ...levels.map((level) => `| ${level} | ${counts[level] ?? 0} |`),
  '',
  blocking === 0 ? 'Result: **pass** (no high or critical advisories).' : `Result: **fail** (${blocking} high/critical).`,
];

const vulns = Object.values(audit.vulnerabilities ?? {});
if (vulns.length > 0) {
  lines.push('', '| package | severity | direct | fix available |', '| --- | --- | --- | --- |');
  for (const v of vulns) {
    const fix = v.fixAvailable === true ? 'yes' : v.fixAvailable ? `yes (${v.fixAvailable.name}@${v.fixAvailable.version})` : 'no';
    lines.push(`| ${v.name} | ${v.severity} | ${v.isDirect ? 'yes' : 'no'} | ${fix} |`);
  }
}

const markdown = `${lines.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
process.stdout.write(markdown);
