class categoryPage {

    constructor() {
    }

    get cartAmount() {
        return cy.get(".cart-button > span  > strong");
    }

    get categoryPage() {
        return cy.get('.search');
    }

    productBox(product) {
        return cy.get("a[href='" + product + "']");
    }

    get changeMembership() {
        return cy.get(".change-membership-button");
    }

    get choiceListMembership() {
        return cy.get(".customer-list-modal__list > li:nth-child(2) > div");
    }

    get membership() {
        return cy.get(".membership-details-column > strong");
    }
}
export default categoryPage;