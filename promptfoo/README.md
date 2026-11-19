# promptfoo — eval for a bug-report summariser prompt

**Status: partial** — the harness is verified with a **dry run** (canned responses, no model). The live eval
against a model has **not been run yet**: no working API key was available on the machine that built this module
(the key found in the environment was rejected with HTTP 401). Nothing below is model output.

## What

A tiny evaluation suite for one prompt, [`prompts/bug-summary.txt`](prompts/bug-summary.txt): turn a raw, messy bug
report into a JSON summary for a triage board. Four test cases ([`tests.yaml`](tests.yaml)) — three of them carry
personal data or a secret on purpose (an e-mail, a phone number, an IP address, a user id, a test token).

Deterministic assertions, run on every case ([`assert/`](assert/)):

| assertion | checks |
| --- | --- |
| `is-json` | one JSON object, nothing else |
| `format.cjs` | keys `title, severity, component, steps, expected, actual` in that order; title ≤ 80 chars, no trailing period; 1–8 steps |
| `severity.cjs` | severity present, one of `blocker/critical/major/minor/trivial`, and inside the band the case expects |
| `no-pii.cjs` | no e-mail, phone number, IPv4, secret-like token, reporter name or user id copied into the output |

The live config adds one model-graded check (`llm-rubric`): the summary must not invent facts.

## Why

A prompt is code: a wording change can quietly break the output format or start leaking the personal data it was
told to remove. Assertions that run on every change catch that before the prompt ships — the same idea as a
regression suite, applied to an LLM feature. The PII rule matters most: it is the one a reviewer cannot eyeball
across hundreds of outputs.

## How to run

```bash
cd promptfoo
npm install

# Dry run: no key, no network. Proves prompt rendering + every deterministic assertion.
npm run eval:dry          # exit code 100 is expected: one planted leak must fail
node check-dry-run.mjs    # passes only if exactly that leak was caught, for the right reason

# Live run: needs a key in the environment. Never put a key in a file in this repo.
export ANTHROPIC_API_KEY=...        # PowerShell: $env:ANTHROPIC_API_KEY = '...'
npm run eval                        # model: claude-haiku-4-5; override with --providers
npx promptfoo view                  # browse results locally
```

Another provider: `npx promptfoo eval -c promptfooconfig.yaml --providers openai:gpt-4.1-mini` (needs
`OPENAI_API_KEY`), or a local model through `ollama:chat:<model>`.

CI: [`.github/workflows/promptfoo.yml`](../.github/workflows/promptfoo.yml) always runs the dry run + check; the live
eval runs only when the repository secret `ANTHROPIC_API_KEY` is set (it is never echoed or written to disk).

## How the dry run works

[`providers/canned.cjs`](providers/canned.cjs) is a custom promptfoo provider that returns hand-written JSON keyed on
the bug report. It is **not a model**. One canned answer contains a realistic slip — the keyboard case copies the
reporter's IP address into `actual` — so the dry run shows the PII gate catching it. A dry run where everything
passes would mean the gate is broken; `check-dry-run.mjs` enforces that.

## Sample output

> **SAMPLE FROM A DRY RUN — canned responses, not a model. No API key was used.**

```text
PASS | cv page layout bug with reporter contact details | is-json, format, severity, no-pii: all passed
FAIL | home page wheel does not open on keyboard | personal data/secret in output: IPv4
PASS | whole site white screen after deploy | is-json, format, severity, no-pii: all passed
PASS | typo in footer, no expected result given | is-json, format, severity, no-pii: all passed

Totals: 3 passed, 1 failed, 0 errors
```

Files: [`samples/DRY-RUN-summary.txt`](samples/DRY-RUN-summary.txt), [`samples/DRY-RUN-results.html`](samples/DRY-RUN-results.html).

## TODO

- [ ] Run `npm run eval` with a valid key, save a `samples/LIVE-*` result, and record how the model did on the
      PII cases (and whether `llm-rubric` agreed with a human reading of the four outputs).

## A bug the harness found in itself

The first version of `no-pii.cjs` flagged the IP address as **both** an IPv4 and a phone number — the phone pattern
accepted dots, so `203.0.113.7` looked like a number. A false double-hit is harmless here, but it would have hidden
which rule actually fired. The phone pattern now only joins digits with spaces or dashes, checked against
`+1 202 555 0147`, `2025550147`, `203.0.113.7`, `Chrome 131` and `Firefox 133` before re-running.
