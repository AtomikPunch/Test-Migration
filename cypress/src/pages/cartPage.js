exports.cartPage = class cartPage {

    get check_in() {
        return cy.get('.ds-ens-prices-bottom__action', { timeout: 10000 })
    }

    get checkbox_click_and_collect() {
        return cy.get('[data-test*="click_and_collect"] .idf-radio__field:checked', { timeout: 5000 });
    }

    get create_new_account() {
        return cy.get('.create-account', { timeout: 5000 });
    }

    get reduced_price() {
        return cy.get('.ds-ens-product-card-line__price .ds-ens-pricing__price-amount--xxl', { timeout: 5000 });
    }

    get total_price() {
        return cy.get('.ds-ens-prices-bottom__total .ds-ens-pricing', { timeout: 5000 });
    }

    get empty_cart() {
        return cy.get('.empty-cart', { timeout: 5000 });
    }

    get checkbox_home_delivery() {
        return cy.get('[data-test*="home_delivery"] .idf-radio__field:checked', { timeout: 5000 });
    }

    get option_title(){
        return cy.get('h3',{timeout : 5000});
    }

    product_in_block(product_reference){
        return cy.get('.ds-ens-product-card-line__content [href*='+ product_reference + ']', {timeout : 5000})
    }

    get discount_amount(){
        return cy.get(".ds-ens-pricing__discount-amount", {timeout : 5000});
    }

    checkbox_not_checked(delivery_option) {
        return cy.get('[data-test*="'+ delivery_option +'"] .idf-radio__field', { timeout: 5000 });
    }

    get delivery_fee(){
        return cy.get('.ens-common-line-prices-lines__fees .ds-ens-pricing__price', {timeout : 5000});
    }
}