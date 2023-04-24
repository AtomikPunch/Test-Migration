const { homePage } = require('../src/pages/homePage');
const { commonsPage } = require('../src/pages/commonsPage');
const { productPage } = require('../src/pages/productPage');
const { listPage } = require('../src/pages/listPage');

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
                        "product" : new productPage(),
                        "list" : new listPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    //SH01
    it('i can search a store from header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store();
    });

    //SH02
    it('i can search a store from PDP', () => {
        cy.i_access_PDP();
        cy.i_access_store_choice_from_PDP();
        cy.i_fill_search_store();
    });

    //SH03
    it('i can searh a store from PLP', () => {
        cy.i_access_PLP();
        cy.i_access_store_choice_from_PLP();
        cy.i_fill_search_store();
    })

    //SH04
    it('i can select a favorite store from header', () => {
        cy.i_access_to_the_webstore();
        cy.i_access_store_choice_from_header();
        cy.i_fill_search_store();
        cy.i_select_favorite_store();
    });

    //SH05
    it('i can select a favorite store from PDP', () => {
        cy.i_access_PDP();
        cy.i_access_store_choice_from_PDP();
        cy.i_fill_search_store();
        cy.i_select_favorite_store();
    });

    //SH06
    it('i can select a favorite store from PLP', () => {
        cy.i_access_PLP();
        cy.i_access_store_choice_from_PLP();
        cy.i_fill_search_store();
        cy.i_select_favorite_store();
    });

});