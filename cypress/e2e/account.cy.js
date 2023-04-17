const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { signonPage } = require('../src/pages/signonPage');

describe('Account', () => {
    beforeEach(() => {
        cy.fixture("dataset.json").then((dataset) => {
            cy.fixture("environment.json").then((env) => {
                var initial_bag = {
                    environment: env,
                    data: dataset,
                    pages: {
                        "commons": new commonsPage(),
                        "home": new homePage(),
                        "signon": new signonPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    it('i can log-in with an existing account from the header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_to_the_login_page();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_should_be_loggedin();
    })
})