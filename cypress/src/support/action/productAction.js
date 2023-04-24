Cypress.Commands.add("i_access_PDP", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_PDP");
        cy.visit(bag.environment.product_url);
        bag.pages.commons.accept_cookies.click();
    });
})

Cypress.Commands.add('i_choose_a_store_from_header', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.commons.choose_store.click();
        bag.pages.product.postal_code_input.type('95410')
        cy.wait(3000);
        bag.pages.product.postal_code_input.type('{enter}');
        bag.pages.product.first_store.should('be.visible').click();
    });
})

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

Cypress.Commands.add('i_access_to_cart_from_pop_up',() => {
    cy.get('@bag').then((bag) => {
        bag.pages.product.access_to_cart.click();
    });
})

Cypress.Commands.add('i_continue_shopping',() => {
    cy.get('@bag').then((bag)=> {
        bag.pages.product.continue_shopping.click();
    });
})