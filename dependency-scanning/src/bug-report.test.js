import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBugReport, summarize } from './bug-report.js';

const valid = {
  title: 'Login button does nothing',
  severity: 'high',
  steps: ['Open /login', 'Fill in the form', 'Click "Log in"'],
  expected: 'The dashboard opens',
  actual: 'Nothing happens',
  url: 'https://example.com/login',
};

test('accepts a complete report and summarizes it', () => {
  const result = parseBugReport(valid);
  assert.equal(result.ok, true);
  assert.equal(summarize(result.report), '[HIGH] Login button does nothing (3 steps)');
});

test('rejects unknown fields, bad severities and non-https URLs without throwing', () => {
  const result = parseBugReport({ ...valid, severity: 'urgent', url: 'http://example.com', extra: 1 });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.startsWith('severity:')));
  assert.ok(result.errors.some((e) => e.startsWith('url:')));
  assert.ok(result.errors.some((e) => e.includes('extra')));
});

test('rejects input that is not an object', () => {
  assert.equal(parseBugReport('not a report').ok, false);
  assert.equal(parseBugReport(null).ok, false);
});
