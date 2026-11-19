// Dry-run provider: returns hand-written responses keyed on the bug report text.
// They were written to look like typical model output, including one realistic mistake
// (the keyboard case copies the reporter's IP address) so the PII assertion has something to catch.
// This is NOT a model and its output must never be presented as one.
const CANNED = [
  [/Print|PDF/i, {
    title: 'CV page: print to PDF splits the skills table across pages', severity: 'minor', component: 'CV page / print',
    steps: ['Open /cv/ in Chrome 131 on Windows', 'Press Ctrl+P', 'Choose Save as PDF'],
    expected: 'The skills table moves to page 2 whole', actual: 'Page 2 starts with an empty header and the table is cut in half',
  }],
  [/Keyboard users/i, {
    title: 'Skill wheel: Enter and Space do not open a category from the keyboard', severity: 'major', component: 'Home / skill wheel',
    steps: ['Open the home page in Firefox 133 on macOS', 'Tab to a wheel segment', 'Press Enter, then Space'],
    expected: 'The category opens', actual: 'Enter does nothing; Space scrolls the page (reported from 203.0.113.7)',
  }],
  [/white page/i, {
    title: 'Whole site: blank white page after deploy (ChunkLoadError)', severity: 'blocker', component: 'Build / deploy',
    steps: ['Open any page after the latest deploy', 'Open the browser console'],
    expected: 'unknown', actual: 'Blank page; console shows "ChunkLoadError: Loading chunk 412 failed"; a token was redacted: [redacted]',
  }],
  [/Experiance/i, {
    title: 'Footer: typo "Experiance" instead of "Experience"', severity: 'trivial', component: 'Footer',
    steps: ['Open any page', 'Read the footer'], expected: 'unknown', actual: 'Footer reads "Experiance"',
  }],
];

class CannedProvider {
  id() { return 'canned-responses'; }
  async callApi(prompt) {
    const hit = CANNED.find(([re]) => re.test(prompt));
    return hit ? { output: JSON.stringify(hit[1]) } : { error: 'no canned response for this prompt' };
  }
}
module.exports = CannedProvider;
