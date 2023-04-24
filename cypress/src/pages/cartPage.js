exports.cartPage = class cartPage{

    get check_in(){
        return cy.get('.ds-ens-prices-bottom__action', {timeout : 5000})
    }

    get checkbox_checked(){
        return cy.get('[data-test*="click_and_collect"] .idf-radio__field', {timeout : 5000});
    }

    get create_new_account(){
        return cy.get('.create-account', {timeout : 5000});
    }

    get last_name_input(){
        return cy.get('[data-test="v-create-account-last-name"] input' , {timeout : 5000})
    }

    get first_name_input(){
        return cy.get('[data-test="v-create-account-first-name"] input', {timeout : 5000});
    }

    get email_input(){
        return cy.get('[data-test="v-create-account-email"] input', {timeout : 5000});
    }

    get password_input(){
        return cy.get('[data-test="c-password-input"]' , {timeout : 5000});
    }

    get submit_account_creation(){
        return cy.get('[data-test="v-create-account-submit-button"]', {timeout : 5000});
    }

    get reduced_price(){
        return cy.get('.ds-ens-product-card-line__price .ds-ens-pricing__price-amount--xxl', {timeout : 5000});
    }
}