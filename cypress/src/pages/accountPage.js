exports.accountPage = class accountPage {

    get address_card() {
        return cy.get('[data-cy*="address-card"]', { timeout: 5000 });
    }

    get last_name_input() {
        return cy.get('[data-test="v-create-account-last-name"] input', { timeout: 5000 })
    }

    get first_name_input() {
        return cy.get('[data-test="v-create-account-first-name"] input', { timeout: 5000 });
    }

    get email_input() {
        return cy.get('[data-test="v-create-account-email"] input', { timeout: 5000 });
    }

    get password_input() {
        return cy.get('[data-test="c-password-input"] input', { timeout: 5000 });
    }

    get submit_account_creation() {
        return cy.get('[data-test="v-create-account-submit-button"]', { timeout: 5000 });
    }

    get successfulConnexion() {
        return cy.get('[data-cy="ens-global-alert"] > .idf-text-icon', { timeout: 5000 });
    }
}