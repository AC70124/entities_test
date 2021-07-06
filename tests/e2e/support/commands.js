let clonedeep = require('lodash.clonedeep');
function getDefaultTestData(uid, env) {
    var user_id, env_label;

    if (!!uid && !!env) {
        return cy.wrap({ uid: uid, env: env });
    } else {
        return cy
            .request({
                method: 'GET',
                url: 'https://po-auth-master.kubeodc-test.corp.intranet/backdoor/default_test_user',
            })
            .then(response => {
                user_id = !!uid ? uid : response.body.uid;
                env_label = !!env ? env : response.body.env;
                return { uid: user_id, env: env_label };
            });
    }
}

Cypress.Commands.add('backdoorLogin', (path, uid, env) => {
    getDefaultTestData(uid, env).then(testData => {
        cy.request({
            method: 'PUT',
            url: 'https://po-auth-master.kubeodc-test.corp.intranet/backdoor/token?dont-verify&env=' + testData.env,
            body: {
                uid: testData.uid,
                type: 'enterprise',
                schema: 'http://elasticbox.net/schemas/token-request',
            },
            headers: {
                'Content-Type': 'application/json',
                Host: 'po-auth-master.kubeodc-test.corp.intranet',
            },
        }).then(response => {
            window.localStorage.setItem('token', response.body.refresh_token);
            if (!!path) {
                cy.server();
                cy.route('/Enterprise/v1/Security/portalIdentity/profile').as('profile');

                cy.fixture('endpoints.json').then(endpoints => {
                    endpoints[path] &&
                        Object.keys(endpoints[path]).forEach(type => {
                            Object.keys(endpoints[path][type]).forEach(endpoint => {
                                cy.route(type.toUpperCase(), endpoints[path][type][endpoint]).as(endpoint);
                                cy.log(endpoint, `[${type} - ${endpoints[path][type][endpoint]}]`);
                            });
                        });
                });

                cy.visit(path, { timeout: 30000 })
                    .injectAxe()
                    .then(() => {
                        cy.get('[data-cy=cy-parent-router__element', { timeout: 30000 }).should('be.visible');
                        cy.wait('@profile');

                        cy.fixture('endpoints.json').then(endpoints => {
                            endpoints[path] &&
                                Object.keys(endpoints[path]).forEach(type => {
                                    Object.keys(endpoints[path][type]).forEach(endpoint => {
                                        cy.wait(`@${endpoint}`);
                                        cy.log(`@${endpoint}`);
                                    });
                                });
                        });
                    });
                cy.setTestMenus();
            }
        });
    });
});

Cypress.Commands.add('getStore', objectName => {
    if (!!objectName) {
        cy.window({ timeout: 30000 })
            .its('app.$store')
            .its('state')
            .its(objectName);
    } else {
        cy.window({ timeout: 30000 }).its('app.$store');
    }
});
Cypress.Commands.add('setTestMenus', () => {
    cy.getStore().then(store => {
        let userContext = clonedeep(store.getters.userContext);
        userContext.menus = [
            {
                'Control Center': {
                    origin: [
                        {
                            PF: 'https://controlcenter-test1.lumen.com/enterprise/',
                        },
                    ],
                    menu: [],
                },
            },
        ];
        store.dispatch('userContext', userContext);
    });
});
