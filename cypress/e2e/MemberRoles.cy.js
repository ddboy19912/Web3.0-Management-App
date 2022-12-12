/// <reference types='Cypress' />

describe('App Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('send inputed agent address', () => {
    cy.get('[ data-cy="roleType-Input"]').type('');
    cy.get('[ data-cy="roleType-Input"]').click();
  });
});
