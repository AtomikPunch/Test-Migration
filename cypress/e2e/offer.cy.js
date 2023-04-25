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

    //OF01
    it('i can access PLP level 1', () => {
        cy.i_access_a_category('level_1');
    });

    //OF02
    it('i can access PLP level 2', () => {
        cy.i_access_a_category('level_2');
    });

    //OF03
    it('i can access PLP level 3', () => {
        cy.i_access_a_category('level_3');
    });

    //OF05
    it('i can access PDP without selected store', () => {
        cy.i_access_PDP();
        cy.i_verify_access_to_PDP();
    });

    //OF06
    it('i can access PDP with selected store', () => {
        cy.i_access_to_the_webstore();
        cy.i_choose_a_store_from_header();
        cy.i_access_PDP();
        cy.i_verify_access_to_PDP();
    });
})