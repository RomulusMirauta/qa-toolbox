# k6 — smoke performance test

**Status: verified** — run locally (k6 2.4.0, Windows 11) against the production app; sample output below and in [`samples/`](samples/).

## What

A short, polite load test of a static site: up to **5 virtual users for 50 seconds**, read-only `GET`s of the
pages a visitor opens (`/`, `/cv/`) and the files crawlers read (`/robots.txt`, `/sitemap.xml`), with 1–2 s of
think time between requests (about 2–3 requests per second in total).

Thresholds (the run fails if any is broken):

| metric | threshold | why |
| --- | --- | --- |
| `http_req_duration{kind:page}` | p95 < 800 ms | HTML pages, whole body, from a CDN |
| `http_req_duration` | p95 < 1000 ms | every request |
| `http_req_failed` | rate < 1 % | non-2xx/3xx or network errors |
| `check_failures` | rate < 1 % | status 200, the right content type, a non-empty body |

## Why

A smoke-level performance check catches the regressions that matter for a small site — a page that suddenly
weighs megabytes, a broken CDN cache, a redirect loop, 5xx under light concurrency — in under a minute, without
treating a public site like a load-test target. It is a gate, not a capacity test.

## How to run

```bash
# install: winget install GrafanaLabs.k6   |   brew install k6   |   https://grafana.com/docs/k6/latest/set-up/install-k6/
k6 run k6/smoke.js                                    # from the repo root
BASE_URL=https://my-preview.vercel.app k6 run k6/smoke.js
```

Outputs, written by `handleSummary()` into `k6/out/` (`OUT_DIR` changes it):

- `summary.json` — the full k6 summary (machine-readable, e.g. for trend charts)
- `summary.html` — a small self-contained page with every metric and threshold verdict

For k6's richer built-in dashboard, add `K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=k6/out/dashboard.html`.

CI: [`.github/workflows/k6.yml`](../.github/workflows/k6.yml) runs on changes to `k6/**` (and on demand with any
`base_url`), and uploads `k6/out/` as an artifact.

## Sample output

Real run, 2026-11-18, from a home connection in Romania:

```text
PASS  http_req_duration  p(95)<1000
PASS  http_req_failed  rate<0.01
PASS  http_req_duration{kind:page}  p(95)<800
PASS  check_failures  rate<0.01
requests: 136 (2.63/s)  p95: 101.24 ms  error rate: 0 %
```

HTML pages alone: median 84 ms, p95 105 ms, max 124 ms; 5 VUs at peak; 34 full iterations.
Files: [`samples/summary.html`](samples/summary.html), [`samples/summary.json`](samples/summary.json).

## Tuning

- The thresholds are deliberately loose for a CDN-served site; tighten them once you have a few weeks of runs.
- Keep `stages` and `sleep()` as they are when the target is not yours: the point is to notice regressions, not
  to find the breaking point.
