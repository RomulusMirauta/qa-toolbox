import { BugReportForm, TITLE_MAX } from '../../src/BugReportForm';

const field = (label: string) =>
  cy
    .contains('label', label)
    .invoke('attr', 'for')
    .then((id) => cy.get(`#${CSS.escape(String(id))}`));

describe('BugReportForm', () => {
  beforeEach(() => {
    cy.mount(<BugReportForm onSubmit={cy.stub().as('onSubmit')} />);
  });

  it('renders a labeled form with every field and the submit button', () => {
    cy.get('form').should('have.attr', 'aria-labelledby');
    cy.contains('h2', 'Report a bug').should('be.visible');
    field('Title').should('have.prop', 'tagName', 'INPUT');
    field('Steps to reproduce').should('have.prop', 'tagName', 'TEXTAREA');
    field('Severity').should('have.prop', 'tagName', 'SELECT');
    cy.contains('button', 'Submit report').should('have.attr', 'type', 'submit');
    cy.get('[role="status"]').should('be.empty');
  });

  it('shows every error on an empty submit, marks fields invalid and does not call onSubmit', () => {
    cy.contains('button', 'Submit report').click();
    cy.contains('.error', 'Title is required.').should('be.visible');
    cy.contains('.error', 'Steps to reproduce are required.').should('be.visible');
    cy.contains('.error', 'Choose a severity.').should('be.visible');
    field('Title').should('have.attr', 'aria-invalid', 'true');
    field('Severity').should('have.attr', 'aria-invalid', 'true');
    cy.get('@onSubmit').should('not.have.been.called');
  });

  it('links each error message to its field with aria-describedby', () => {
    cy.contains('button', 'Submit report').click();
    field('Title')
      .invoke('attr', 'aria-describedby')
      .then((errorId) => {
        cy.get(`#${CSS.escape(String(errorId))}`).should('have.text', 'Title is required.');
      });
  });

  it('validates the title length at both bounds', () => {
    field('Title').type('short');
    cy.contains('button', 'Submit report').click();
    cy.contains('.error', 'Title needs at least 8 characters.').should('be.visible');

    field('Title').clear().type('x'.repeat(TITLE_MAX + 1), { delay: 0 });
    cy.contains('button', 'Submit report').click();
    cy.contains('.error', `Title can have at most ${TITLE_MAX} characters.`).should('be.visible');
  });

  it('moves focus to the first invalid field', () => {
    field('Title').type('Login button does nothing');
    cy.contains('button', 'Submit report').click();
    field('Steps to reproduce').should('be.focused');
  });

  it('shows a live severity preview with the badge', () => {
    cy.get('.preview').should('not.exist');
    field('Severity').select('High');
    cy.get('.preview [data-severity="high"]').should('have.text', 'High');
  });

  it('submits a trimmed report to onSubmit exactly once, then resets', () => {
    field('Title').type('  Checkout total ignores the discount code  ');
    field('Steps to reproduce').type('1. Add an item\n2. Apply SAVE10\n3. Total is unchanged');
    field('Severity').select('Critical');
    cy.contains('button', 'Submit report').click();

    cy.get('@onSubmit').should('have.been.calledOnceWithExactly', {
      title: 'Checkout total ignores the discount code',
      steps: '1. Add an item\n2. Apply SAVE10\n3. Total is unchanged',
      severity: 'critical',
    });
    cy.get('[role="status"]').should('have.text', 'Report "Checkout total ignores the discount code" submitted.');
    field('Title').should('have.value', '');
    field('Severity').should('have.value', '');
    cy.get('.error').should('not.exist');
  });

  it('works with the keyboard only: Tab order and Enter to submit', () => {
    field('Title').focus().type('Search returns stale results');
    cy.press(Cypress.Keyboard.Keys.TAB);
    field('Steps to reproduce').should('be.focused').type('Search "abc", edit an item, search again');
    cy.press(Cypress.Keyboard.Keys.TAB);
    field('Severity').should('be.focused').select('Medium');
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.contains('button', 'Submit report').should('be.focused');

    // Enter in a text input submits the form (implicit submission).
    field('Title').type('Search returns stale results{enter}');
    cy.get('@onSubmit').should('have.been.calledOnce');
    cy.get('@onSubmit').its('firstCall.args.0.severity').should('eq', 'medium');
  });
});
