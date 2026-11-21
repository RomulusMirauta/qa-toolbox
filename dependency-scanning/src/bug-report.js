// A small, real piece of code for the scanners to read: validate an incoming bug report and turn it into a
// one-line summary. No network, no file system, no eval: Semgrep should find nothing here, and the CI gate
// proves that it keeps finding nothing as the code changes.
import { z } from 'zod';

export const Severity = z.enum(['low', 'medium', 'high', 'critical']);

export const BugReport = z
  .object({
    title: z.string().trim().min(5).max(120),
    severity: Severity,
    steps: z.array(z.string().trim().min(1)).min(1).max(20),
    expected: z.string().trim().min(1),
    actual: z.string().trim().min(1),
    url: z.url({ protocol: /^https$/ }).optional(),
  })
  .strict();

/**
 * Validates untrusted input. Returns `{ ok: true, report }` or `{ ok: false, errors }` and never throws.
 * @param {unknown} input
 */
export function parseBugReport(input) {
  const result = BugReport.safeParse(input);
  if (result.success) return { ok: true, report: result.data };
  return {
    ok: false,
    errors: result.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`),
  };
}

/**
 * One line for a triage board, e.g. "[HIGH] Login button does nothing (3 steps)".
 * @param {z.infer<typeof BugReport>} report
 */
export function summarize(report) {
  const steps = report.steps.length === 1 ? '1 step' : `${report.steps.length} steps`;
  return `[${report.severity.toUpperCase()}] ${report.title} (${steps})`;
}
