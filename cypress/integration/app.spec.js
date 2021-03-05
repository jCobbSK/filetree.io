describe('Landing page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('opens default application', () => {
        cy.get('[data-cy=application-wrapper]').should('be.visible');
    });

    it('shows Hello world content', () => {
        cy.get('[data-cy=content]').should('be.visible').should('contain', 'Hello World!');
    });
});
