exports.productPage = class productPage{

    get choose_store(){
        return cy.get('.ens-store-locator-header__content', {timeout : 5000});
    }

    get postal_code_input(){
        return cy.get('.ens-store-locator-search__input .idf-input__field', {timeout : 5000});
    }

    get first_store(){
        return cy.get('[data-test-store-locator-modal-card="188"] .ens-store-locator-card__cta', {timeout : 5000});
    }

    get add_to_cart_button(){
        return cy.get('.ds-ens-store-card__button.is-secondary', {timeout : 5000});
    }

    get click_and_collect_in_store(){
        return cy.get('.ds-ens-store-card__button.is-primary', {timeout : 3000});
    }

    get access_to_cart(){
        return cy.get('.ds-ens-addtocart-modal__actions .is-primary', {timeout : 5000});
    }

    get continue_shopping(){
        return cy.get('.is-tertiary', {timeout : 5000});
    }
}