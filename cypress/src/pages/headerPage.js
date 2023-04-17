class headerPage {

	get connexionBtn() {
		return cy.get('[class="idf-text-icon ens-signin__text-icon"]');
	}
	get searchInput() {
		return cy.get('.search-form .adn-input__container input.adn-input__input');
	}

	get acceptCookieBtn() {
		return cy.get('#axeptio_btn_acceptAll', { timeout: 5000 });
	}
}
export default headerPage;