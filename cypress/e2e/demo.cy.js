const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { signonPage } = require('../src/pages/signonPage');
const { productPage } = require('../src/pages/productPage');
const { cartPage } = require('../src/pages/cartPage');
const { accountPage } = require('../src/pages/accountPage');
const { deliveryPage } = require('../src/pages/deliveryPage');
const { paymentPage } = require('../src/pages/paymentPage');
const { listPage } = require('../src/pages/listPage');

describe('Demo', () => {
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
                        "product": new productPage(),
                        "cart": new cartPage(),
                        "account": new accountPage(),
                        "delivery": new deliveryPage(),
                        "payment": new paymentPage(),
                        "list" : new listPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    it('i can create account from the header', () => {
        cy.generate_email_random('new_client');
        cy.i_will_use_client('new_client');
        cy.i_access_to_the_webstore();
        cy.i_access_to_the_registration_page();
        cy.i_create_a_new_account_from_header('last');
        cy.i_should_be_loggedin();
    })

    it('i can create account from checkout', () => {
        cy.generate_email_random('new_client_checkout');
        cy.i_will_use_client('new_client_checkout');
        cy.i_access_PDP('available_in_delivery');
        cy.i_choose_a_store_from_header("main_store");
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkout();
        cy.i_create_a_new_account_by_filling_form('last');
    })

    it('i can log-in with an existing account from the header', () => {
        cy.i_will_use_client('existing_client');
        cy.i_access_to_the_webstore();
        cy.i_access_to_the_login_page();
        cy.i_fill_the_login_form('last');
        cy.i_submit_the_login_form();
        cy.i_should_be_loggedin();
    })

    it('i can log-in with an existing account from checkout', () => {
        cy.i_will_use_client('existing_client');
        cy.i_access_to_the_webstore();
        cy.i_log_in('last');
        cy.i_empty_the_cart_using_the_API();
        cy.i_log_out();
        cy.i_access_PDP('available_in_delivery');
        cy.i_choose_a_store_from_header("main_store");
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_go_to_checkout();
        cy.i_fill_the_login_form('last');
        cy.i_submit_the_login_form();
    })

    it('i can log-in from delivery page and come back to it', () => {
        cy.i_will_use_client('existing_client');
        cy.i_access_to_the_webstore();
        cy.i_log_in('last');
        cy.i_empty_the_cart_using_the_API();
        cy.i_log_out();
        cy.i_access_PDP('available_in_delivery');
        cy.i_choose_a_store_from_header('main_store');
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_go_to_checkout();
        cy.i_fill_the_login_form('last');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
    });

    //SH01
    it('i can search a store from header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store('main_store');
    });

    //SH02
    it('i can search a store from PDP', () => {
        cy.i_access_PDP('available_in_delivery');
        cy.i_access_store_choice_from_PDP();
        cy.i_fill_search_store('main_store');
    });

    //SH03
    it('i can searh a store from PLP', () => {
        cy.i_access_PLP("standard_category");
        cy.i_access_store_choice_from_PLP();
        cy.i_fill_search_store('main_store');
    })

    //SH04
    it('i can select a favorite store from header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store('main_store');
        cy.i_select_favorite_store('main_store');
    });

    //SH05
    it('i can select a favorite store from PDP', () => {
        cy.i_access_PDP('available_in_delivery');
        cy.i_access_store_choice_from_PDP();
        cy.i_fill_search_store('main_store');
        cy.i_select_favorite_store('main_store');
    });

    //SH06
    it('i can select a favorite store from PLP', () => {
        cy.i_access_PLP("standard_category");
        cy.i_access_store_choice_from_PLP();
        cy.i_fill_search_store('main_store');
        cy.i_select_favorite_store('main_store');
    });

    
    it('i get an order validation from checkout and mail', () => {
        cy.i_will_use_client('getnada_client');
        cy.i_access_to_the_webstore();
        cy.i_log_in('last');
        cy.i_empty_the_cart_using_the_API();
        cy.i_access_PDP('available_in_delivery');
        cy.i_choose_a_store_from_header('main_store');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkout();
        cy.i_verify_delivery_page_is_visible();
        cy.i_fill_payment_form('3DS_frictionless');
        cy.i_pay_for_my_order();
        cy.i_get_order_confirmation_in_checkout();
        cy.API_getnada('getnada_client');
        cy.API_delete_mail('getnada_client');
    })

})