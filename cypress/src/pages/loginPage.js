class loginPage {

	get emailInput() {
		return cy.get('[data-test="v-login-jd-email"]');
	}

	get passwordInput() {
		return cy.get('[data-test="v-login-jd-password"]');
	}

	get submitBtn() {
		return cy.get('[data-test="v-login-jd-submit-button"]');
	}

	get loggedInfo() {
		return cy.get('.ens-signin > .idf-text-icon');
	}

	get successfulConnexion() {
		return cy.get('[data-cy="ens-global-alert"] > .idf-text-icon');
	}

	get createAccountBtn() {
		return cy.get('[class="create-account idf-button is-secondary"]');
	}
}
export default loginPage;