const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor");

Given('I access PDP {string}',(product_reference) => {cy.i_access_PDP(product_reference);})
Cypress.Commands.add("i_access_PDP", (product_reference) => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_PDP " + product_reference);
        let product_url = bag.environment.product_url_prefix + bag.data.products[product_reference].id;
        cy.visit(product_url);

        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });

    });
})

Then("I choose a store from header {string}", (product_reference) => {cy.i_choose_a_store_from_header(product_reference)})
Cypress.Commands.add('i_choose_a_store_from_header', (store_reference) => {
    cy.get("@bag").then((bag) => {
        let store = bag.data.store[store_reference];
        bag.pages.commons.choose_store.click();
        bag.pages.product.postal_code_input.type(store.postal_code);
        cy.wait(3000);
        bag.pages.product.postal_code_input.type('{enter}');
        bag.pages.product.first_store.should('be.visible').click();
        bag.data.clients.last.store = store_reference;
    });
})

Then("I add product to cart", () => {cy.i_add_product_to_cart();})
Cypress.Commands.add('i_add_product_to_cart',() => {
    cy.get('@bag').then((bag) => {
        bag.pages.product.add_to_cart_button.should('be.visible').click();
    });
})

Cypress.Commands.add('i_pick_up_product_in_store',()=> {
    cy.get('@bag').then((bag) => {
        bag.pages.product.click_and_collect_in_store.should('be.visible').click();
    });
})

Then("I access to cart from pop up", () => {cy.i_access_to_cart_from_pop_up();})
Cypress.Commands.add('i_access_to_cart_from_pop_up',() => {
    cy.get('@bag').then((bag) => {
        bag.pages.product.access_to_cart.click();
    });
})

When("I continue shopping", () => {cy.i_continue_shopping();})
Cypress.Commands.add('i_continue_shopping',() => {
    cy.get('@bag').then((bag)=> {
        bag.pages.product.continue_shopping.click();
    });
})

Cypress.Commands.add('i_verify_access_to_PDP', () => {
    cy.get('@bag').then((bag)=> {
        bag.pages.product.product_sheet.should('be.visible');
    });
})