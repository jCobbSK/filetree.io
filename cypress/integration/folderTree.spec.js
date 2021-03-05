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

    it('shows menu action items after hovering and clicking on menu icon', () => {
        cy.get('[data-cy="folder-name"]').eq(0).trigger('mouseover');
        cy.get('[data-cy="menu-button"]').should('have.length', 1).should('be.visible');
        cy.get('[data-cy="menu-button"]').click();
        cy.get('[data-cy="menu-wrapper"]').should('be.visible');
        cy.get('[data-cy="add-child"]').should('have.length', 1).should('be.visible');
        cy.get('[data-cy="rename"]').should('have.length', 1).should('be.visible');
        cy.get('[data-cy="delete"]').should('have.length', 1).should('be.visible');
    });

    it('adds new sub folder with menu item action', () => {
        cy.get('[data-cy="folder-name"]').eq(0).trigger('mouseover');
        cy.get('[data-cy="menu-button"]').click();
        cy.get('[data-cy="add-child"]').click();
        cy.get('[data-cy="folder-name"]').eq(1).should('contain', 'Newly added folder');
    });

    it('deletes folder with menu item action', () => {
        cy.get('[data-cy="folder-name"]').eq(0).should('contain', 'Adidas');
        cy.get('[data-cy="folder-name"]').eq(0).trigger('mouseover');
        cy.get('[data-cy="menu-button"]').click();
        cy.get('[data-cy="delete"]').click();
        cy.get('[data-cy="folder-name"]').should('contain', 'Bata');
    });

    it('renames folder with menu item action', () => {
        cy.get('[data-cy="folder-name"]').eq(0).should('contain', 'Adidas');
        cy.get('[data-cy="folder-name"]').eq(0).trigger('mouseover');
        cy.get('[data-cy="menu-button"]').click();
        cy.get('[data-cy="rename"]').click();
        cy.get('[data-cy="rename-folder-input"]').should('have.length', 1).should('be.visible');
        cy.get('[data-cy="rename-folder-input"]').type('New name').trigger('blur');
        cy.get('[data-cy="folder-name"]').should('contain', 'New name');
    });
});
