# Playwright Test Agents — planner, generator, healer (with human review)

**Status: partial** — the toolchain is set up and verified; **the AI agent loop has not been run yet** (see TODO).
Nothing in this folder is AI output presented as if it were. What *is* verified, with real output in
[`samples/setup-run.txt`](samples/setup-run.txt):

- `npx playwright init-agents --loop=claude` generated the three agent definitions
  ([`.claude/agents/`](.claude/agents/)) and the MCP config ([`.mcp.json`](.mcp.json)) — Playwright 1.65.0.
- [`probe-mcp.mjs`](probe-mcp.mjs) starts the Playwright Test MCP server (the tool layer the agents call), completes
  the MCP handshake and lists its tools: 92 in total, including `planner_setup_page`, `planner_save_plan`,
  `generator_setup_page`, `generator_write_test`, `test_run`, `test_debug`.
- The seed test passes against the production app; the staged healer input fails exactly as intended.

## What

[Playwright Test Agents](https://playwright.dev/docs/test-agents) are three LLM agent definitions that drive a real
browser through the Playwright MCP server:

| agent | input | output |
| --- | --- | --- |
| planner | the seed test + a goal ("plan tests for the CV page") | a Markdown test plan in `specs/` |
| generator | a plan | `.spec.ts` files, with locators it verified live in the browser |
| healer | a failing test | a patched test, or `test.fixme()` with a reason when it believes the app is wrong |

## Why

AI-generated tests are cheap to produce and expensive to trust. The value of this module is the **review step**:
every proposal from an agent is treated like a pull request from a new colleague — read, reproduced, and accepted or
rejected for a stated reason. The healer is the riskiest of the three: a "fix" that makes a red test green by
asserting whatever the page shows *now* can turn a real regression into a passing test.

## How to run

```bash
cd test-agents
npm ci
npx playwright install chromium
npx playwright test              # seed test (+ generated tests once they exist)
node probe-mcp.mjs               # the agents' MCP tool layer starts and answers
```

The agent loop itself needs an AI client with MCP support. With Claude Code, from this folder:

```text
claude                                    # picks up .claude/agents/*.md and .mcp.json
> Use the playwright-test-planner agent: plan tests for the /cv/ page (print layout, section headings, contact links). Seed: tests/seed.spec.ts
> Use the playwright-test-generator agent on specs/<plan>.md
> HEALER_DEMO=1 — use the playwright-test-healer agent on tests/healer-input.spec.ts
```

`init-agents` also supports `--loop=vscode` (Copilot agent mode), `codex`, `copilot` and `opencode`.
Note: the generated `.mcp.json` launches the server through `cmd /c npx …` because it was generated on Windows;
re-run `npm run init-agents` on macOS/Linux.

CI: [`.github/workflows/test-agents.yml`](../.github/workflows/test-agents.yml) runs no LLM. It checks the tool
layer (`probe-mcp.mjs`) and runs the committed tests, so generated tests keep passing after review.

## The staged healer exercise

[`tests/healer-input.spec.ts`](tests/healer-input.spec.ts) (skipped unless `HEALER_DEMO=1`) is a deliberately broken
first draft with two typical faults:

1. a hashed CSS-module class as a locator (`.vSHQBG_name_old`) — brittle; the right fix is a role-based locator;
2. a heading the app no longer uses (`Work history`; the page says `Experience`) — **the trap**: the healer can make
   it pass by copying the current text, but whether that is a fix or a masked regression is a product decision.

Review checklist applied to every healer patch:

- [ ] Reproduce the failure first (`HEALER_DEMO=1 npx playwright test tests/healer-input.spec.ts`).
- [ ] Locator changes: role/label/text-based, unique, no hashed classes, no `nth()` without a reason.
- [ ] Assertion changes: each one traced to an intended product change (commit, ticket or owner), never to "the
      page says so now".
- [ ] No new waits/timeouts used to hide a race; no assertion deleted or weakened without a written reason.
- [ ] The patched test fails again when the original defect is re-introduced (mutate, run, revert).

## TODO (not done yet — honest status)

- [ ] Run planner → generator against `/cv/` and commit the plan + generated spec after review.
- [ ] Run the healer on `tests/healer-input.spec.ts`; record here, verbatim, **what it proposed, what was wrong with
      it, and how it was reviewed** (accepted / changed / rejected and why), using the checklist above.

Why it is not done: these runs drive an AI session through the agent definitions, which needs an interactive,
authorised AI client; the build of this repo ran unattended overnight without one, and a recorded run that did not
happen is worth less than an honest TODO. For a worked example of reviewing AI-proposed fixes and checks on a real
project, see the case studies in the [public test suite](https://github.com/RomulusMirauta/personal-web-page-tests/blob/main/docs/case-studies.md).
