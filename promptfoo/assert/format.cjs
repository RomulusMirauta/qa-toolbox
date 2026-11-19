// Format check: one JSON object, the six keys in order, a short title and 1-8 steps.
module.exports = (output) => {
  let o;
  try { o = JSON.parse(output); } catch { return { pass: false, score: 0, reason: 'not JSON' }; }
  const keys = ['title', 'severity', 'component', 'steps', 'expected', 'actual'];
  if (JSON.stringify(Object.keys(o)) !== JSON.stringify(keys)) return { pass: false, score: 0, reason: `keys ${Object.keys(o).join(',')}` };
  if (typeof o.title !== 'string' || o.title.length > 80 || /\.$/.test(o.title)) return { pass: false, score: 0, reason: `bad title (${String(o.title).length} chars)` };
  if (!Array.isArray(o.steps) || o.steps.length < 1 || o.steps.length > 8) return { pass: false, score: 0, reason: 'steps must be an array of 1-8' };
  return { pass: true, score: 1, reason: 'format ok' };
};
