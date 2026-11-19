#!/usr/bin/env node
// Runs the OWASP ZAP *baseline* scan (passive only: spider + passive rules, no attacks) in Docker.
//
//   node zap/run.mjs                         # default target, reports in zap/out/
//   node zap/run.mjs https://preview.example.app
//
// Exit code follows zap-baseline.py: 0 = clean, 1 = at least one FAIL, 2 = only WARNs, 3 = error.
// Use -I semantics (WARNs do not fail) by setting ZAP_WARN_OK=1.
import { spawnSync } from 'node:child_process';
import { mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const target = (process.argv[2] || process.env.TARGET_URL || 'https://romulus-mirauta.vercel.app').replace(/\/+$/, '');
const image = process.env.ZAP_IMAGE || 'zaproxy/zap-stable:2.17.0';
const out = resolve(here, 'out');
mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'rules.tsv'), join(out, 'rules.tsv')); // the container only sees /zap/wrk

const args = [
  'run', '--rm',
  ...(process.stdout.isTTY ? ['-t'] : []), // a TTY only when there is one (CI has none)
  '-v', `${out}:/zap/wrk:rw`,
  image,
  'zap-baseline.py',
  '-t', target,
  '-c', 'rules.tsv',          // our rule actions (IGNORE / INFO / WARN / FAIL)
  '-m', '1',                  // spider for at most 1 minute: a small site, and polite
  '-r', 'report.html',
  '-J', 'report.json',
  '-w', 'report.md',
  ...(process.env.ZAP_WARN_OK ? ['-I'] : []),
  '-z', '-config connection.defaultUserAgent=qa-toolbox-zap-baseline/1.0',
];

console.log(`ZAP baseline (passive) -> ${target}\nreports: ${out}`);
const res = spawnSync('docker', args, { stdio: 'inherit', env: { ...process.env, MSYS_NO_PATHCONV: '1' } });
if (res.error) {
  console.error(`could not start docker: ${res.error.message}`);
  process.exit(3);
}
process.exit(res.status ?? 3);
