describe('CFA Dashboard is working', () => {
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
        cy.get('#userInput').should('be.visible');
        cy.get('[data-cy=cy-statuses-dropdown]')
            .should('be.visible')
            .click();
        cy.get('[data-cy=cy-statuses-dropdown-alert]')
            .should('be.visible')
            .click();
        cy.get('[data-cy=cy-statuses-dropdown]')
            .should('be.visible')
            .click();
        cy.get('[data-cy=cy-statuses-dropdown-up]')
            .should('be.visible')
            .click();
        cy.get('.chi-checkbox__label').should('be.visible');
        cy.get('[data-cy=cy-clear-cache-button]').should('be.visible');
        cy.get('.sc-chi-button-h')
            .should('be.visible')
            .click();
        cy.get('[data-cy=cy-pause-refresh-button]')
            .should('be.visible')
            .click();
        cy.get(':nth-child(2) > .chi-data-table__row > .-expandable > .chi-button > .chi-button__content > .chi-icon')
            .should('be.visible')
            .click();
        cy.get('#expand-all-01998')
            .should('be.visible')
            .click();
        cy.get('#collapse-all-01998')
            .should('be.visible')
            .click();
        cy.get('#nested-accordions-01998 > :nth-child(3) > :nth-child(1) > :nth-child(1) > .chi-icon')
            .should('be.visible')
            .click();
        cy.get('.-expanded > :nth-child(1) > .chi-icon')
            .should('be.visible')
            .click();
        cy.get(':nth-child(2) > .chi-data-table__row > .-expandable > .chi-button > .chi-button__content > .chi-icon')
            .should('be.visible')
            .click();
        cy.get(':nth-child(3) > .chi-data-table__row > .-expandable > .chi-button > .chi-button__content > .chi-icon')
            .should('be.visible')
            .click();
        cy.get('#expand-all-01764')
            .should('be.visible')
            .click();
        cy.get('#collapse-all-01764')
            .should('be.visible')
            .click();
        cy.get('#nested-accordions-01764 > :nth-child(3) > :nth-child(1) > :nth-child(1) > .chi-icon')
            .should('be.visible')
            .click();
        cy.get('.-expanded > :nth-child(1) > .chi-icon')
            .should('be.visible')
            .click();
        cy.get(':nth-child(3) > .chi-data-table__row > .-expandable > .chi-button > .chi-button__content > .chi-icon')
            .should('be.visible')
            .click();
    });
});
