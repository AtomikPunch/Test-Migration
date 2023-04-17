class creationAccountPage {

    get lastNameInput() {
        return cy.get('[data-test="v-create-account-last-name"]');
    }

    get firstNameInput() {
        return cy.get('[data-test="v-create-account-first-name"]')
    }

    get emailInput() {
        return cy.get('[data-test="v-create-account-email"]');
    }

    get passwordInput() {
        return cy.get('[data-test="c-password-standard-input"]');
    }

    get submitBtn() {
        return cy.get('[data-test="v-create-account-submit-button"]');
    }

    get loggedInfo() {
        return cy.get('.ens-signin > .idf-text-icon');
    }

    get successfulConnexion() {
        return cy.get('[data-cy="ens-global-alert"] > .idf-text-icon');
    }
}
export default creationAccountPage;