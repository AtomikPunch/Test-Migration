exports.cartPage = class cartPage{

    get check_in(){
        return cy.get('.ds-ens-prices-bottom__action', {timeout : 5000})
    }

    get checkbox_checked(){
        return cy.get('[data-test*="click_and_collect"] .idf-radio__field', {timeout : 5000});
    }
}