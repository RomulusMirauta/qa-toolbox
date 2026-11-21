# dependency-scanning — npm audit, Semgrep and Snyk as a CI gate

**Status: verified** — in CI on 2026-11-21: npm audit 0 advisories, unit tests 3/3, Semgrep 0 findings, Snyk Open
Source 0 issues and Snyk Code 0 issues (the module's own source; `.snyk` keeps installed packages out of the code scan).
Locally: npm audit and the tests (npm 12.2, Node 26, Windows 11); Semgrep and Snyk run only in CI.

## What

A tiny Node project — one module, [`src/bug-report.js`](src/bug-report.js), that validates an incoming bug report
with [zod](https://zod.dev) and turns it into a one-line summary, plus [its tests](src/bug-report.test.js) — and a
committed `package-lock.json`. Three scanners read it on every change and once a week:

| scanner | checks | fails the build on | results |
| --- | --- | --- | --- |
| **npm audit** | every package in `package-lock.json` against the GitHub Advisory Database | a high or critical advisory (`--audit-level=high`) | job summary (all severities) + `npm-audit.json` artifact |
| **Semgrep** (OSS) | the source code: rulesets [`p/javascript`](https://semgrep.dev/p/javascript), [`p/typescript`](https://semgrep.dev/p/typescript), [`p/secrets`](https://semgrep.dev/p/secrets) (injection, unsafe APIs, hard-coded keys) | any finding (`--error`) | job summary + SARIF in **Security → Code scanning** (category `semgrep`) |
| **Snyk Open Source** | the dependency tree against Snyk's vulnerability database (often earlier or richer than the advisory database) | high or critical (`--severity-threshold=high`) | job summary + SARIF (category `snyk-open-source`) |
| **Snyk Code** | the source code (Snyk's own SAST engine) | nothing: informational, `continue-on-error` | job summary + SARIF (category `snyk-code`) |

**Dependabot** covers the rest: [`.github/dependabot.yml`](../.github/dependabot.yml) opens one monthly pull request
per ecosystem (npm in this folder, `promptfoo/`, `test-agents/` and `cypress-component/`; the pinned GitHub Actions; the Docker Compose
image), and each of those pull requests runs this workflow again. Dependabot alerts (security advisories for the
dependency graph) are a repository setting, independent of the version-update file.

## Why

Two different risks, two kinds of tools. A dependency can turn vulnerable without a single line of our code
changing — hence the **weekly schedule**, not only push/PR. And our own code can introduce the bug — hence a static
scan of the source. Running more than one dependency scanner is deliberate: npm audit is free and built in, Snyk's
database adds advisories and fix advice; their overlap shows how much the choice of database matters.

The sample is deliberately clean and small: a public repository should not carry known-vulnerable packages just
to make a scanner light up. The gate proves that it **stays** clean as the code and the advisory databases change.

## How to run

```bash
cd dependency-scanning
npm ci
npm test                 # node:test, 3 tests
npm run audit:summary    # readable table of every severity (also writes out/npm-audit.json)
npm run audit            # the gate: npm audit --audit-level=high

# Semgrep, from the repo root, with the same pinned image as CI (Docker Desktop):
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:1.186.0 semgrep scan \
  --config p/javascript --config p/typescript --config p/secrets --metrics=off --error dependency-scanning
# (or: pipx install semgrep && semgrep scan --config p/javascript ... dependency-scanning)

# Snyk (needs a free Snyk account): npm install -g snyk && snyk auth
snyk test --file=dependency-scanning/package-lock.json --severity-threshold=high
snyk code test dependency-scanning
```

On Windows, run the `docker run` line from PowerShell with `${PWD}` instead of `$PWD`, or from Git Bash with
`MSYS_NO_PATHCONV=1` in front.

CI: [`.github/workflows/dependency-scanning.yml`](../.github/workflows/dependency-scanning.yml), on changes to
`dependency-scanning/**`, on demand, and every Monday. Three parallel jobs:

- `npm-audit` — `npm ci`, the tests, the summary ([`audit-summary.mjs`](audit-summary.mjs)), then the gate.
- `semgrep` — the pinned `semgrep/semgrep` image with public registry rulesets: **no Semgrep account or token**,
  metrics off. SARIF is uploaded with `github/codeql-action/upload-sarif` (the job's only extra permission is
  `security-events: write`); fork PRs are still scanned but skip the upload.
- `snyk` — runs only when the `SNYK_TOKEN` secret exists. Without it the job succeeds with a "Snyk skipped" notice,
  so forks and a fresh clone never fail on a missing token.

[`sarif-summary.mjs`](sarif-summary.mjs) turns any SARIF file into the Markdown table shown in the job summary.

## Sample output

Real run, 2026-11-21, locally ([`samples/npm-audit-summary.md`](samples/npm-audit-summary.md)):

```text
## npm audit

Dependencies scanned (from package-lock.json): 1.

| severity | count |
| --- | --- |
| critical | 0 |
| high | 0 |
| moderate | 0 |
| low | 0 |
| info | 0 |

Result: **pass** (no high or critical advisories).
```

## Setup and tuning

- **Snyk**: create a token in the Snyk account settings, then add it as the repository secret `SNYK_TOKEN`
  (Settings → Secrets and variables → Actions). Snyk Code also has to be enabled in the Snyk organization settings.
- **Code scanning**: SARIF uploads appear under Security → Code scanning, one category per tool, and new alerts are
  annotated on pull requests. Public repositories get this for free.
- **Pins**: actions are pinned to a commit SHA (Dependabot updates them); the Semgrep image is pinned to an exact tag
  in the workflow and needs a manual bump. The Snyk action runs Snyk's `snyk/snyk:node` image, which Snyk updates.
- **Thresholds**: lower `--audit-level` / `--severity-threshold` to `moderate` for stricter projects; for a false
  positive, prefer a `// nosemgrep: <rule-id>` comment with a reason over dropping a ruleset.
