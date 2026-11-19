# docker — the public Playwright suite in the official Playwright image

**Status: verified** — run locally on Docker Desktop 29.2.1 (WSL 2, Windows 11): the whole public suite, 442 passed and 2 skipped in 18.7 min with 2 workers; the fast tier, 76 passed in 2.2 min. Excerpt in [`samples/run-summary.txt`](samples/run-summary.txt).

## What

One command that runs the public black-box E2E suite,
[RomulusMirauta/personal-web-page-tests](https://github.com/RomulusMirauta/personal-web-page-tests), inside the
official Playwright Docker image (`mcr.microsoft.com/playwright:v1.65.0-noble`), with nothing installed on the host
except Docker.

[`compose.yaml`](compose.yaml) has two services:

1. `fetch` (`alpine/git:v2.54.1`) — a shallow, **read-only** clone of the suite into a throw-away volume. Nothing is
   ever committed or pushed from it.
2. `tests` — waits for the clone, runs `npm ci` and `npx playwright test` against the deployment in `BASE_URL`, and
   copies `playwright-report/` and `test-results/` back to `docker/out/`. The exit code is the suite's.

## Why

"Works on my machine" is the oldest flaky-test excuse. The image pins the browsers and their system libraries to
the exact Playwright version the suite uses, so a local run, a teammate's run and the CI run see the same Chromium.
Cloning the suite at a ref (`SUITE_REF`) also makes any past run reproducible.

## How to run

From the repo root, with Docker running:

```bash
docker compose -f docker/compose.yaml run --rm tests                                   # the whole suite
TEST_ARGS='--grep "@smoke|@critical"' docker compose -f docker/compose.yaml run --rm tests   # fast tier
BASE_URL=https://my-preview.vercel.app docker compose -f docker/compose.yaml run --rm tests  # another deployment
SUITE_REF=v1.2.0 docker compose -f docker/compose.yaml run --rm tests                  # a tag/branch of the suite
```

PowerShell: set variables first, e.g. `$env:TEST_ARGS = '--grep @smoke'`. Defaults: `WORKERS=2` (polite to the
target), `SUITE_REF=main`, `BASE_URL` = the production app. Open the report with
`npx playwright show-report docker/out/playwright-report`.

Keep the image tag equal to the suite's `@playwright/test` version: the browsers are baked into the image, and a
mismatch fails at launch with "Executable doesn't exist".

CI: [`.github/workflows/docker.yml`](../.github/workflows/docker.yml) runs the fast tier (`@smoke|@critical`) on
changes to `docker/**`, and any arguments on demand; it uploads `docker/out/` as an artifact.

## Sample output

Real run, 2026-11-18, suite `main` at `a87ed9e` (excerpt; full output trimmed):

```text
Running 444 tests using 2 workers
  ✓    1 [desktop-chromium] › e2e/a11y-matrix.spec.ts:88:7 › axe matrix › dark theme, keys off, 1920×1080 › …
  …
  ✓  443 [phone-chromium] › e2e/smoke.spec.ts:40:3 › smoke › loads as a visitor sees it, without console errors @smoke @all-devices (3.2s)
  2 skipped
  442 passed (18.7m)
```

Fast tier (`TEST_ARGS='--grep "@smoke|@critical"'`): `Running 76 tests using 2 workers` → `76 passed (2.2m)`.

The 2 skipped tests are skipped by the suite itself, not by this module.
