describe('Tree panel resize', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('tree panel have default width', () => {
        cy.get('[data-cy="folder-tree-container"]').invoke('css', 'width').should('eq', '300px');
    });

    it('changes tree panel width when separator is dragged', () => {
        cy.get('[data-cy="content-separator"]').trigger('dragstart');
        cy.get('[data-cy="content-separator"]').trigger('dragover', {
            clientX: 600,
        });
        cy.get('[data-cy="content-separator"]').trigger('dragend');
        cy.get('[data-cy="folder-tree-container"]').invoke('css', 'width').should('eq', '580px');
    });
});
