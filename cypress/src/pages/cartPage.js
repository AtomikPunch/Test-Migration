exports.cartPage = class cartPage {

    get check_in() {
        return cy.get('.ds-ens-prices-bottom__action', { timeout: 5000 })
    }

    get checkbox_checked() {
        return cy.get('[data-test*="click_and_collect"] .idf-radio__field', { timeout: 5000 });
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
        return cy.get('[data-test*="home_delivery"] .idf-radio__frame', { timeout: 5000 });
    }
}