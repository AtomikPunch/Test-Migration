exports.cartPage = class cartPage{

    get check_in(){
        return cy.get('.ds-ens-prices-bottom__action', {timeout : 5000})
    }

    get checkbox_checked(){
        return cy.get('[data-test*="click_and_collect"] .idf-radio__field', {timeout : 5000});
    }

    get user_default_address(){
        return cy.get('[data-cy*="line1-standard-input-address"]  span',{timeout : 5000})
    }

    get delivery_page(){
        return cy.get('.ens-checkout-shipping', {timeout : 40000});
    }
}