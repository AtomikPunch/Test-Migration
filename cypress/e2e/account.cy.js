const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { signonPage } = require('../src/pages/signonPage');
const { productPage } = require('../src/pages/productPage');
const { cartPage } = require('../src/pages/cartPage');
const { accountPage } = require('../src/pages/accountPage');

describe('Account', () => {
    beforeEach(() => {

        // generate random email for account creation from header and checkout 
        cy.fixture("dataset.json").then((dataset) => {

            cy.fixture("environment.json").then((env) => {
                var initial_bag = {
                    environment: env,
                    data: dataset,
                    pages: {
                        "commons": new commonsPage(),
                        "home": new homePage(),
                        "signon": new signonPage(),
                        "product": new productPage(),
                        "cart": new cartPage(),
                        "account": new accountPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');

                //cy.generate_email_random();
            });
        });
    });

    // AC03 : Un client peut créer un compte depuis le header 
    // TODO : add verification of account creation in the database (API)
    it('i can create account from the header', () => {
        cy.generate_email_random('new_client');
        cy.i_access_to_the_webstore();
        cy.i_access_to_the_registration_page();
        cy.i_create_a_new_account_from_header('new_client');
        cy.i_should_be_loggedin();
        // TODO : add verification of account creation in the database (API)
    })

    // AC04 : Un client peut créer un compte depuis le checkout 
    // TODO : add verification of account creation in the database (API)
    it('i can create account from checkout', () => {
        cy.generate_email_random('new_client_checkout');
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header();
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkin();
        cy.i_create_a_new_account_by_filling_form('new_client_checkout');
        // TODO : add verification of account creation in the database (API)
    })


    it('i can log-in with an existing account from the header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_to_the_login_page();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_should_be_loggedin();
    })

    // KO 1/2 : la vérification du magasin dans la popup de la liste des magasins est KO (on vérifie le premier sur la liste)
    // Timed out retrying after 5000ms: expected '<button.ens-store-locator-card__cta.idf-button.is-primary>' to be 'visible'
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