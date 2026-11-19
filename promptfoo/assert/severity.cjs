// Severity check: present, one of the allowed values, and inside the band the test case expects.
const ALLOWED = ['blocker', 'critical', 'major', 'minor', 'trivial'];
module.exports = (output, context) => {
  let o;
  try { o = JSON.parse(output); } catch { return { pass: false, score: 0, reason: 'not JSON' }; }
  if (!ALLOWED.includes(o.severity)) return { pass: false, score: 0, reason: `severity "${o.severity}" not allowed` };
  const band = context?.test?.metadata?.expectSeverity;
  if (band && !band.includes(o.severity)) return { pass: false, score: 0, reason: `severity ${o.severity}, expected one of ${band.join('/')}` };
  return { pass: true, score: 1, reason: `severity ${o.severity}` };
};
