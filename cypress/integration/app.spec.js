describe('Landing page', () => {
    it('should open default application', () => {
        cy.visit('/');

        cy.get('[data-cy=application-wrapper]').should('be.visible');
    });
});
