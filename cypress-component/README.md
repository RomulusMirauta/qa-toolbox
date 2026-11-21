# cypress-component — React components tested in isolation with Cypress

**Status: verified** — locally on 2026-11-21: 10/10 component tests pass (Cypress 16.3, headless Electron; Node 26,
Windows 11). A deliberately broken build (the title no longer trimmed) fails the gate with exactly one red test and a
screenshot. CI: [`cypress-component.yml`](../.github/workflows/cypress-component.yml), first run on the push of this module.

## What

A tiny React 19 + Vite project with two QA-flavored components and their Cypress **component** tests — no app, no
server, no target URL. Cypress mounts each component on its own in a real browser, through the Vite dev server
(`component.devServer: { framework: 'react', bundler: 'vite' }` in [`cypress.config.js`](cypress.config.js)).

| component | does | tests |
| --- | --- | --- |
| [`BugReportForm`](src/BugReportForm.tsx) | title, steps to reproduce and severity; validates on submit, focuses the first invalid field, calls `onSubmit` with a trimmed report, then resets | [8 tests](cypress/component/BugReportForm.cy.tsx) |
| [`SeverityBadge`](src/SeverityBadge.tsx) | a labeled, colored severity pill (critical / high / medium / low) | [2 tests](cypress/component/SeverityBadge.cy.tsx) |

What the tests cover:

- **Rendering** — every field, heading and button is present; one readable label per severity.
- **User interaction** — typing, selecting, the live severity preview, the form resetting after a submit.
- **Validation** — required fields, the title length on both sides (too short, and one character over the 120 maximum),
  error text shown and cleared after a valid submit.
- **Accessibility basics** — fields are found **through their visible labels** (`<label for>`), errors are tied to
  their field with `aria-describedby` and `aria-invalid`, the form is named by its heading, a `role="status"` region
  announces the result, focus moves to the first invalid field, and the whole form works by **keyboard only** (Tab
  order with `cy.press`, Enter to submit). Severity is never conveyed by color alone.
- **Stubbed callback** — `onSubmit` is a `cy.stub()`: never called on invalid input, called exactly once with the exact
  trimmed payload on valid input.

## Why

Component tests sit between unit tests and E2E: a real browser, real events and real CSS, but one component at a
time — seconds per run, no deployment, no flaky network. Validation rules, edge cases and accessibility attributes
are cheaper and clearer to pin down here than through a full page; the E2E suite (see [`docker/`](../docker/)) then
only has to prove the pieces work together.

## How to run

```bash
cd cypress-component
npm ci
npx cypress install          # downloads the Cypress binary once (into the user cache) if npm ci did not
npm run test:component       # cypress run --component: headless, every spec
npm run test:summary         # same run via the Module API + a pass/fail table in out/summary.md
npm run cy:open              # interactive runner, to watch the components while you edit
```

On a failure, screenshots land in `out/screenshots/` (videos are off; turn on `video` in the config if wanted).

Notes for local runs:

- npm 12 blocks install scripts by default, so `npm ci` may not download the binary; `npx cypress install` does.
- If Cypress reports `bad option: --smoke-test`, the shell has `ELECTRON_RUN_AS_NODE=1` set (some editor terminals do);
  unset it for the run (`env -u ELECTRON_RUN_AS_NODE npm run test:component` in Git Bash).

CI: [`.github/workflows/cypress-component.yml`](../.github/workflows/cypress-component.yml), on changes to
`cypress-component/**` or the workflow, and on demand. Ubuntu, Node 24, `npm ci`, then [`run.mjs`](run.mjs) runs the
specs headless with the Cypress Module API and writes the pass/fail table to the job summary. Screenshots and
videos are uploaded as the `cypress-component-failures` artifact only when the job fails; the summary is always
uploaded. Read-only token (`contents: read`), no secrets.

## Sample output

Real run, 2026-11-21, locally ([`samples/summary.md`](samples/summary.md)):

```text
## Cypress component tests

Cypress 16.3.0, electron 150.0.7871.250, 2565 ms.

| spec | tests | passed | failed | pending | skipped | result |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| cypress/component/BugReportForm.cy.tsx | 8 | 8 | 0 | 0 | 0 | pass |
| cypress/component/SeverityBadge.cy.tsx | 2 | 2 | 0 | 0 | 0 | pass |
| **total** | **10** | **10** | **0** | **0** | **0** | **pass** |

Result: **pass**.
```

## Status

Verified locally (10/10). The `.tsx` files are transpiled by Vite for the tests; [`tsconfig.json`](tsconfig.json) is
there for editor support only — there is no separate type-check step.
