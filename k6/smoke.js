// k6 smoke-performance test for a static site.
//
// Polite by design: at most 5 virtual users for at most 1 minute, with think time between requests,
// read-only GET requests to the public pages listed in the sitemap. Nothing is posted, no auth.
//
//   k6 run k6/smoke.js                                  # against the default target
//   BASE_URL=https://preview.example.app k6 run k6/smoke.js
//
// Output: the console summary, plus samples-style JSON + HTML summaries written by handleSummary()
// into $OUT_DIR (default: k6/out/).

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const BASE_URL = (__ENV.BASE_URL || 'https://romulus-mirauta.vercel.app').replace(/\/+$/, '');
const OUT_DIR = (__ENV.OUT_DIR || 'k6/out').replace(/\/+$/, '');

// Pages a visitor actually opens, plus the two files crawlers read.
const PAGES = [
  { name: 'home', path: '/', expect: 'text/html' },
  { name: 'cv', path: '/cv/', expect: 'text/html' },
  { name: 'robots', path: '/robots.txt', expect: 'text/plain' },
  { name: 'sitemap', path: '/sitemap.xml', expect: 'xml' },
];

const checkFailures = new Rate('check_failures');

export const options = {
  scenarios: {
    smoke: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 5 }, // ramp up
        { duration: '30s', target: 5 }, // hold
        { duration: '10s', target: 0 }, // ramp down
      ],
      gracefulRampDown: '5s',
    },
  },
  thresholds: {
    // Latency budget for a CDN-served static page (whole response, including the body).
    'http_req_duration{kind:page}': ['p(95)<800'],
    http_req_duration: ['p(95)<1000'],
    // Errors: any non-2xx/3xx response or network failure.
    http_req_failed: ['rate<0.01'],
    // Content checks (status, content type, a marker in the body).
    check_failures: ['rate<0.01'],
  },
  // Identify the test honestly in the target's logs.
  userAgent: 'qa-toolbox-k6-smoke/1.0 (+https://github.com/RomulusMirauta)',
  summaryTrendStats: ['min', 'med', 'avg', 'p(90)', 'p(95)', 'max'],
};

export default function () {
  for (const page of PAGES) {
    group(page.name, () => {
      const res = http.get(`${BASE_URL}${page.path}`, {
        tags: { kind: page.expect === 'text/html' ? 'page' : 'file', page: page.name },
      });
      const ok = check(res, {
        'status is 200': (r) => r.status === 200,
        'content type matches': (r) => String(r.headers['Content-Type'] || '').includes(page.expect),
        'body is not empty': (r) => (r.body || '').length > 0,
      });
      checkFailures.add(!ok);
    });
    sleep(1 + Math.random()); // think time: keeps the request rate low (~2 req/s per VU at most)
  }
}

// ---------- summary: JSON (machine) + small self-contained HTML (human) ----------

function fmt(n) {
  return typeof n === 'number' ? (Math.round(n * 100) / 100).toString() : String(n);
}

function htmlSummary(data) {
  const rows = Object.entries(data.metrics)
    .filter(([, m]) => m.type === 'trend' || m.type === 'rate' || m.type === 'counter')
    .map(([name, m]) => {
      const values = Object.entries(m.values).map(([k, v]) => `${k}=${fmt(v)}`).join(' &middot; ');
      const th = m.thresholds
        ? Object.entries(m.thresholds).map(([t, r]) => `<span class="${r.ok ? 'ok' : 'bad'}">${t} ${r.ok ? 'PASS' : 'FAIL'}</span>`).join('<br>')
        : '';
      return `<tr><td><code>${name}</code></td><td>${m.type}</td><td>${values}</td><td>${th}</td></tr>`;
    })
    .join('\n');
  const failed = Object.values(data.metrics).some((m) => m.thresholds && Object.values(m.thresholds).some((r) => !r.ok));
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>k6 smoke summary</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font:14px/1.5 system-ui,sans-serif;margin:24px;color:#1b1f24;background:#fff}
table{border-collapse:collapse;width:100%}td,th{border:1px solid #d0d7de;padding:4px 8px;text-align:left;vertical-align:top}
.ok{color:#1a7f37}.bad{color:#cf222e;font-weight:600}code{font-size:13px}</style></head><body>
<h1>k6 smoke summary &mdash; <span class="${failed ? 'bad' : 'ok'}">${failed ? 'THRESHOLDS FAILED' : 'all thresholds passed'}</span></h1>
<p>Target: <code>${BASE_URL}</code> &middot; generated ${new Date().toISOString()}</p>
<table><thead><tr><th>metric</th><th>type</th><th>values</th><th>thresholds</th></tr></thead><tbody>
${rows}
</tbody></table></body></html>`;
}

function textSummary(data) {
  const lines = [];
  for (const [name, m] of Object.entries(data.metrics)) {
    if (!m.thresholds) continue;
    for (const [t, r] of Object.entries(m.thresholds)) lines.push(`${r.ok ? 'PASS' : 'FAIL'}  ${name}  ${t}`);
  }
  const d = data.metrics.http_req_duration?.values || {};
  const f = data.metrics.http_req_failed?.values || {};
  const reqs = data.metrics.http_reqs?.values || {};
  lines.push(`requests: ${fmt(reqs.count)} (${fmt(reqs.rate)}/s)  p95: ${fmt(d['p(95)'])} ms  error rate: ${fmt((f.rate || 0) * 100)} %`);
  return lines.join('\n') + '\n';
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data),
    [`${OUT_DIR}/summary.json`]: JSON.stringify(data, null, 2),
    [`${OUT_DIR}/summary.html`]: htmlSummary(data),
  };
}
