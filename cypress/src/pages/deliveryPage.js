exports.deliveryPage = class deliveryPage{

    get user_default_address(){
        return cy.get('[data-cy*="line1-standard-input-address"]  span',{timeout : 5000})
    }

    get delivery_page(){
        return cy.get('.ens-checkout-shipping', {timeout : 40000});
    }

    //-------------------------------------------------------------------------
    get procede_to_payment(){
        return cy.get('.ds-ens-prices-bottom__action', {timeout : 5000});
    }
    //-------------------------------------------------------------------------

    get new_first_name_input(){
        return cy.get('[data-cy="last-name-input-address"] input', {timeout : 5000});
    }

    get new_last_name_input(){
        return cy.get('[data-cy="first-name-input-address"] input', {timeout : 5000});
    }

    get new_address_input(){
        return cy.get('[data-cy="line1-input-address"] input', {timeout : 5000});
    }

    get new_postal_code_input(){
        return cy.get('[data-cy="postal-code-input-address"] input', {timeout : 5000});
    }

    get new_city_input(){
        return cy.get('[data-cy="city-name-input-address"] input', {timeout : 5000});
    }

    get new_number_input(){
        return cy.get('[data-cy="mobile-phone-number-input-address"] input', {timeout : 5000});
    }

    get save_new_address(){
        return cy.get('#submit-button', {timeout : 5000});
    }

    get modify_address(){
        return cy.get('.ens-checkout-shipping-address-form__edit', {timeout : 5000});
    }

    get address_successfully_modified(){
        return cy.get('[data-cy="ens-global-alert"]', {timeout : 5000});
    }
}