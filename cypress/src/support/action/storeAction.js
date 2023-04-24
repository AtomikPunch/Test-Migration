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

Cypress.Commands.add('i_fill_search_store',(store_reference) =>{
    cy.get("@bag").then((bag) => {
        let store = bag.data.store[store_reference];
        bag.pages.product.postal_code_input.type(store.postal_code);
        cy.wait(3000);
        bag.pages.product.postal_code_input.type('{enter}');
        cy.get('[data-test-store-locator-modal-card="'+store.card_number+'"] .ens-store-locator-card__cta').should('be.visible');
    });
})

Cypress.Commands.add('i_select_favorite_store', (store_reference) => {
    cy.get("@bag").then((bag) => {
        let store = bag.data.store[store_reference]
        cy.get('[data-test-store-locator-modal-card="'+store.card_number+'"] .ens-store-locator-card__cta').should('be.visible').click();
        bag.pages.commons.store_name.invoke('text').then((text) =>{
            expect(text.trim()).equal(store.name);
        });
    });
})