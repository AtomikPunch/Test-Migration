exports.paymentPage = class paymentPage{

    get card_number_input(){
        return cy.get('#card-number-field', {timeout : 10000});
    }

    get iframe_expiry(){
        return cy.get('iframe[id*="expiry"]', {timeout : 5000});
    }

    get card_expiry_input(){
        return cy.get('#hosted-fields-expiry' , {timeout : 5000});
    }

    get iframe_cvv(){
        return cy.get('iframe[id*="cryptogram"]', {timeout : 5000});
    }

    get card_cvv_input(){
        return cy.get('#card-cvv-field' , {timeout : 5000});
    }

    get card_holder_input(){
        return cy.get('#cardHolder' , {timeout : 5000});
    }

    get accept_condition(){
        return cy.get('.checkbox-frame', {timeout : 5000});
    }

    get pay_command(){
        return cy.get('.ds-ens-prices-bottom__action', {timeout : 5000});
    }

    get checkout_confirmation(){
        return cy.get('[data-cy="ens-checkout-confirmation"]' , {timeout : 40000});
    }
}