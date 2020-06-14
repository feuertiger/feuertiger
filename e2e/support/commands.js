Cypress.Commands.add(
    'login',
    (email = 'feuertiger@feuertiger.com', password = 'feuertiger') => {
        cy.get('#login-dialog').should('exist');
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#login-submit-button').click();
        cy.get('#login-dialog').should('not.exist');
    }
);

Cypress.Commands.add('logout', () => {
    cy.get('#login-dialog').should('not.exist');
    cy.get('#app-bar-exit-button').click();
    cy.get('#login-dialog').should('exist');
});
