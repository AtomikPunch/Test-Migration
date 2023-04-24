Cypress.Commands.add('i_access_store_choice_from_header', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.commons.choose_store.click();
    });
})

Cypress.Commands.add('i_access_store_choice_from_PDP', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.product.verify_disponibility.click();
    });
})

Cypress.Commands.add('i_access_store_choice_from_PLP', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.list.find_store.click();
    });
})

Cypress.Commands.add('i_fill_search_store',() =>{
    cy.get("@bag").then((bag) => {
        bag.pages.product.postal_code_input.type('95410')
        cy.wait(3000);
        bag.pages.product.postal_code_input.type('{enter}');
        bag.pages.product.first_store.should('be.visible');
    });
})

Cypress.Commands.add('i_select_favorite_store', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.product.first_store.should('be.visible').click();
        bag.pages.commons.store_name.invoke('text').then((text) =>{
            expect(text.trim()).equal("Groslay");
        });
    });
})