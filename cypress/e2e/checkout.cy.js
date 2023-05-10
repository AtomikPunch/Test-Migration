const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { signonPage } = require('../src/pages/signonPage');
const { productPage } = require('../src/pages/productPage');
const { cartPage } = require('../src/pages/cartPage');
const { accountPage } = require('../src/pages/accountPage');
const { deliveryPage } = require('../src/pages/deliveryPage');
const { paymentPage } = require('../src/pages/paymentPage');

describe('Checkout', () => {
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
                        "payment": new paymentPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    //CO01
    it('i can log-in from delivery page and come back to it', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
    });

    //CO02
    it('i can form a cart filled with both delivery methods', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_pick_up_product_in_store();
        cy.i_access_to_cart_from_pop_up();
        cy.i_verify_checkbox_checked();
    });
    
    //CO03
    it('i can form a cart filled with home delivery method only ', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_verify_checkbox_checked();
        
    });

    //CO04
    it('i can form a cart filled with click and collect method only ', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_pick_up_product_in_store();
        cy.i_continue_shopping();
        cy.i_pick_up_product_in_store();
        cy.i_access_to_cart_from_pop_up();
        cy.i_verify_checkbox_checked();
    });
    //CO05
    it('i can use my default delivery address as a known user', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_access_to_cart_from_pop_up();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
        cy.i_verify_user_default_address('existing_client');
    });

    //CO06 
    // TODO : il faut vider le panier du compte connu car après plusieurs relances l'article n'est plus disponible en quantité suffisante 
    it('i can modify address as a known user', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
        cy.clearCookies();
        cy.i_add_new_delivery_address('existing_client');
        cy.i_verify_new_address_successfully_added();
    });

    //CO07
    // TODO : il faut ajouter une adresse via appel API (on le fera plus tard)
    it('i can add a new address as a new user', () => {
        cy.generate_email_random('new_client');
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkin();
        // TODO : il faut ajouter une adresse via appel API (on le fera plus tard)
        cy.i_create_a_new_account_by_filling_form('new_client');
        cy.i_add_new_delivery_address('new_client');
        cy.i_verify_new_address_successfully_added();
    });

    //CO08
    it('i can pay with my credit card 3DS', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('existing_client');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
        cy.i_fill_payment_form('3DS_frictionless');
        cy.i_pay_for_my_order();
    });

    //CO09
    it('i get an order validation from checkout and mail', () => {
        cy.i_access_PDP();
        cy.i_choose_a_store_from_header('Groslay');
        cy.i_add_product_to_cart();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_go_to_checkin();
        cy.i_fill_the_login_form('getnada_client');
        cy.i_submit_the_login_form();
        cy.i_verify_delivery_page_is_visible();
        cy.i_fill_payment_form('3DS_frictionless');
        cy.i_pay_for_my_order();
        cy.i_get_order_confirmation_in_checkout();
        cy.API_getnada('getnada_client');
        cy.API_delete_mail('getnada_client');
    });

})