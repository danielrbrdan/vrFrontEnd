

describe('Courses', () => {
  it('Visits the initial project page', () => {
    cy.visit('/courses')

    cy.get('.card').should('have.length.greaterThan', 0);
  })

  it('should add a new course when the form is submitted', () => {
    cy.visit('/courses')

    cy.get('.floating-action-button').click();
    cy.get('input[name="description"]').type('New Course');
    cy.get('input[name="subject"]').type('Course Subject');
    cy.get('.modal-footer button[type="submit"]').click();

    cy.get('.card').should('have.length.greaterThan', 0);
  });

})