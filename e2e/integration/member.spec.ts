describe('Member Page', () => {
    it('login', () => {
        cy.visit('/member');
        cy.login();
        cy.get('#add-member-button').click();
    });
});
