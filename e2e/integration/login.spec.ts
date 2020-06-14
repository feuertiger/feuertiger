describe('Testing login', () => {
    it('login', () => {
        cy.visit('/');
        cy.login();
    });
    it('logout', () => {
        cy.logout();
    });
});
