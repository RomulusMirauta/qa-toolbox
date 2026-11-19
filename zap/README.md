# ZAP — baseline (passive) security scan

**Status: verified** — run locally (ZAP 2.17.0 in Docker, `zaproxy/zap-stable:2.17.0`) against the production app;
reports in [`samples/`](samples/).

## What

The OWASP ZAP **baseline** scan: a spider of at most one minute, then **passive rules only** — ZAP reads the
responses (headers, cookies, markup) and sends **no attacks**. Safe for a site you do not own, as long as you keep
it to the baseline. (Never point ZAP's *active* scan or the full scan at a site you do not have permission to attack.)

[`rules.tsv`](rules.tsv) tunes the result. Each line is `plugin id`, an action and the reason:

| action | used for |
| --- | --- |
| `FAIL` | protections the app has today and must keep: CSP, HSTS, anti-clickjacking (`frame-ancestors`), no `X-Powered-By`, no PII, no private IPs |
| `WARN` | real, accepted risks still worth seeing in every report (`'unsafe-inline'` in the CSP; no SRI on the third-party analytics script) |
| `INFO` | findings on files the hosting platform serves, not the app |
| `IGNORE` | false positives for a public, static, cookie-less site (e.g. `Access-Control-Allow-Origin: *` on public files, COEP/COOP) |

Every `IGNORE` and `INFO` carries its reason in the file, so the next reviewer can disagree with it.

## Why

Security headers drift: a hosting change, a new framework version or a rewritten config can silently drop HSTS
or the CSP. A passive baseline in CI turns "we have a CSP" into a check that fails the day it stops being true,
and the rules file documents which findings were triaged and why.

## How to run

Needs Docker (Docker Desktop on Windows/macOS) and Node 18+:

```bash
node zap/run.mjs                                  # production app, reports in zap/out/
node zap/run.mjs https://my-preview.vercel.app    # any deployment
ZAP_WARN_OK=1 node zap/run.mjs                    # WARNs reported, only FAILs break (what CI does)
```

Exit codes follow `zap-baseline.py`: `0` clean, `1` at least one FAIL, `2` WARNs only, `3` error.
Reports: `zap/out/report.html`, `report.md`, `report.json`.

CI: [`.github/workflows/zap.yml`](../.github/workflows/zap.yml) runs the same script (same image, same rules) on
changes to `zap/**` and on demand; it uploads the reports. Running the identical script locally and in CI keeps the
two from disagreeing.

## Sample output

Real run, 2026-11-18 (console summary; PASS lines trimmed):

```text
IGNORE: Cross-Domain Misconfiguration [10098] x 5
IGNORE: Modern Web Application [10109] x 2
IGNORE: Cross-Origin-Embedder-Policy Header Missing or Invalid [90004] x 8
INFO: X-Content-Type-Options Header Missing [10021] x 1
	https://romulus-mirauta.vercel.app/_vercel/insights/script.js (200 OK)
INFO: Permissions Policy Header Not Set [10063] x 1
	https://romulus-mirauta.vercel.app/_vercel/insights/script.js (200 OK)
WARN-NEW: CSP: script-src unsafe-inline [10055] x 6
WARN-NEW: Sub Resource Integrity Attribute Missing [90003] x 3
FAIL-NEW: 0	FAIL-INPROG: 0	WARN-NEW: 2	WARN-INPROG: 0	INFO: 2	IGNORE: 7	PASS: 57
```

Before tuning, the same scan reported 7 WARN-NEW findings and nothing else; after triage, 2 real, accepted
WARNs remain and 7 regression guards are armed as FAIL. Full reports:
[`samples/report.html`](samples/report.html), [`samples/report.md`](samples/report.md).

## Triage notes (for the app owner)

- `10055` — `'unsafe-inline'` in `script-src`/`style-src`: the static export uses inline bootstrap scripts.
  Hash- or nonce-based CSP would remove it; tracked as hardening, not a bug.
- `90003` — the analytics script is loaded without `integrity`. The vendor serves an unversioned file, so a hash
  would break on their next update; self-hosting the script would allow SRI.
