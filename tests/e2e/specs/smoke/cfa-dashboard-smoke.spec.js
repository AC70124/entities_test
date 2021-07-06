describe('Smoke test - CFA Dashboard is working', () => {
    before(function() {
        cy.server();
        cy.fixture('technologies-all-new.json').then(technologiesAllNew => {
            cy.route('GET', '/stores/technologies/all/new', technologiesAllNew);
            cy.route('GET', '/Enterprise/v1/Security/adaptiveNetwork/technologies/all/new ', technologiesAllNew);

            cy.fixture('technologies-uniquestores').then(uniqueStores => {
                cy.route('GET', '/stores/technologies/uniquestores', uniqueStores);

                cy.fixture('clear-cache').then(clearCache => {
                    cy.route('GET', '/stores/technologies/uniquestores', clearCache);
                    cy.backdoorLogin('/adap/dashboard');
                });
            });
        });
    });

    it('Refresh Button is visible', () => {
        cy.get('.sc-chi-button-h > .chi-button')
            .should('be.visible')
            .click();
        cy.get('[data-cy=cy-pause-refresh-button]')
            .should('be.visible')
            .click();
    });
});
