const { Given, Then ,When} = require("@badeball/cypress-cucumber-preprocessor");

Then("J'accède au choix du magasin a partir du header", () => {cy.i_access_store_choice_from_header();})
Cypress.Commands.add('i_access_store_choice_from_header', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.commons.choose_store.click();
    });
})

Then("J'accède au choix du magasin à partir de la PDP", () => {cy.i_access_store_choice_from_PDP();})
Cypress.Commands.add('i_access_store_choice_from_PDP', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.product.verify_disponibility.click();
    });
})

Then("J'accède au choix du magasin à partir de la PLP", () => {cy.i_access_store_choice_from_PLP();})
Cypress.Commands.add('i_access_store_choice_from_PLP', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.list.find_store.click();
    });
})

Then("Je remplis la recherche de magasin avec {string}", (store_reference) => {cy.i_fill_search_store(store_reference);})
Cypress.Commands.add('i_fill_search_store',(store_reference) =>{
    cy.get("@bag").then((bag) => {
        let store = bag.data.store[store_reference];
        bag.pages.product.postal_code_input.type(store.postal_code);
        cy.wait(3000);
        bag.pages.product.postal_code_input.type('{enter}');
        cy.get('[data-test-store-locator-modal-card="'+store.store_id+'"] .ens-store-locator-card__cta').should('be.visible');
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

Cypress.Commands.add('i_change_store', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.commons.change_store.should('be.visible').click(); 
    });
})

Cypress.Commands.add('i_select_a_new_store', (store_reference) => {
    cy.get("@bag").then((bag) => {
        let store = bag.data.store[store_reference]
        cy.get('[data-test-store-locator-modal-card="'+store.card_number+'"] .ens-store-locator-card__cta').should('be.visible').click();
        bag.pages.commons.confirm_store_change.should('be.visible').click();
    });
})