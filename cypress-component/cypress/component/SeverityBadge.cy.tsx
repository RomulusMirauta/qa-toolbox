import { SEVERITIES, SeverityBadge } from '../../src/SeverityBadge';

describe('SeverityBadge', () => {
  it('renders a readable label for every severity', () => {
    const expected = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
    for (const severity of SEVERITIES) {
      cy.mount(<SeverityBadge severity={severity} />);
      cy.get('[data-severity]')
        .should('have.text', expected[severity])
        .and('have.attr', 'data-severity', severity)
        .and('have.attr', 'aria-label', `Severity: ${expected[severity]}`)
        .and('have.class', `badge--${severity}`);
    }
  });

  it('uses a distinct background color per severity (color is a second cue, not the only one)', () => {
    const colors = new Set<string>();
    for (const severity of SEVERITIES) {
      cy.mount(<SeverityBadge severity={severity} />);
      cy.get('[data-severity]').then(($badge) => {
        colors.add(getComputedStyle($badge[0]).backgroundColor);
      });
    }
    cy.wrap(colors).its('size').should('eq', SEVERITIES.length);
  });
});
