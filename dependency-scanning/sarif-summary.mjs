// Prints a short Markdown summary of one or more SARIF files (Semgrep, Snyk): findings per rule and level, plus
// where they are. Writes to the GitHub Actions job summary when GITHUB_STEP_SUMMARY is set, otherwise to stdout.
// Usage: node sarif-summary.mjs "<title>" <file.sarif> [more.sarif ...]   (missing files are reported, not fatal)
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const [title = 'SARIF', ...files] = process.argv.slice(2);
const lines = [`## ${title}`, ''];

for (const file of files) {
  if (!existsSync(file)) {
    lines.push(`\`${file}\`: not produced (the scan did not run or failed before writing results).`, '');
    continue;
  }
  const sarif = JSON.parse(readFileSync(file, 'utf8'));
  for (const run of sarif.runs ?? []) {
    const tool = run.tool?.driver;
    const results = run.results ?? [];
    lines.push(`**${tool?.name ?? 'tool'}** ${tool?.semanticVersion ?? tool?.version ?? ''} (\`${file}\`): ${results.length} finding(s).`);
    if (results.length > 0) {
      lines.push('', '| level | rule | location |', '| --- | --- | --- |');
      for (const r of results.slice(0, 50)) {
        const loc = r.locations?.[0]?.physicalLocation;
        const where = loc ? `${loc.artifactLocation?.uri ?? '?'}:${loc.region?.startLine ?? '?'}` : '-';
        lines.push(`| ${r.level ?? 'warning'} | ${r.ruleId ?? '?'} | ${where} |`);
      }
      if (results.length > 50) lines.push('', `...and ${results.length - 50} more (see the code scanning alerts).`);
    }
    lines.push('');
  }
}

const markdown = `${lines.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
process.stdout.write(markdown);
