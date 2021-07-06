describe('checks the side menus are loaded', () => {
    before(function() {
        cy.backdoorLogin('/adap/dashboard');
    });
    it('Checks the side menus are loaded and works fine', () => {
        cy.get('enterprise-nav-menu').within(() => {
            cy.get('ul.chi-sidenav__list li', { timeout: 10000 })
                .should('have.class', '-active')
                .contains(/^Adaptive Networks$/);
        });
        cy.get('enterprise-nav-menu-drawer').within(() => {
            cy.get('ul.chi-sidenav__drawer-list li', { timeout: 10000 })
                .eq(0)
                .should('have.class', '-active')
                .contains('CFA Dashboard');
        });
    });
});
