exports.accountPage = class accountPage{

    get my_addresses(){
        return cy.get('[href="#mes-adresses"] ',{timeout : 5000})
    }

    get add_address(){
        return cy.get('.ens-my-addresses__button', {timeout : 5000});
    }

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

    get address_card(){
        return cy.get('[data-cy*="address-card"]', {timeout : 5000});
    }
}