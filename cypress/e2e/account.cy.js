const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { signonPage } = require('../src/pages/signonPage');
const { productPage } = require('../src/pages/productPage');
const { cartPage } = require('../src/pages/cartPage');

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
                        "signon": new signonPage(),
                        "product" : new productPage(),
                        "cart" : new cartPage()
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

    it('i can log-in with an existing account from checkout', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header();
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
    })
})