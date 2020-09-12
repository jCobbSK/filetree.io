describe('Folder tree', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders all default folders with sub-folders', () => {
        cy.get('[data-cy="folder-name"]').should('have.length', 13);
    });

    it('filters folders based on query', () => {
        cy.get('[data-cy="search-input"]').type('adid');
        cy.get('[data-cy="folder-name"]').should('have.length', 1).should('contain', 'Adidas');
    });

    it('highlights query in folder name', () => {
        cy.get('[data-cy="search-input"]').type('adid');
        cy.get('[data-cy="folder-name"] > mark').should('have.length', 1).should('contain', 'Adid');
    });
});
