const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { productPage } = require('../src/pages/productPage');
const { listPage } = require('../src/pages/listPage');
const { cartPage } = require('../src/pages/cartPage');

describe('Cart', () => {
    beforeEach(() => {
        cy.fixture("dataset.json").then((dataset) => {
            cy.fixture("environment.json").then((env) => {
                var initial_bag = {
                    environment: env,
                    data: dataset,
                    pages: {
                        "commons": new commonsPage(),
                        "home": new homePage(),
                        "product" : new productPage(),
                        "list" : new listPage(),
                        "cart" : new cartPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    //CA01
    it('i can add a product with promotion', () => {
        cy.i_access_PDP();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store('store_with_promotion');
        cy.i_select_favorite_store('store_with_promotion');
        cy.i_pick_up_product_in_store();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_verify_discount('existing_product');
    });

    //CA02
    it('i can change store from cart and the product will be unavailable', () => {
        cy.i_access_PDP();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store('Groslay');
        cy.i_select_favorite_store('Groslay');
        cy.i_pick_up_product_in_store();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_access_store_choice_from_header();
        cy.i_change_store();
        cy.i_fill_search_store('unavailable_product');
        cy.i_select_a_new_store('unavailable_product');
        cy.i_verify_cart_is_empty();
    }); 

    //CA04
    it('i can change delivery options and observe price change', () => {
        cy.i_access_PDP();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store('Groslay');
        cy.i_select_favorite_store('Groslay');
        cy.i_pick_up_product_in_store();
        cy.i_continue_shopping();
        cy.i_access_cart_from_header();
        cy.i_change_delivery_option();
        cy.i_verify_total_changed('existing_product');
    });
})