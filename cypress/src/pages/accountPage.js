exports.accountPage = class accountPage{

    get address_card(){
        return cy.get('[data-cy*="address-card"]', {timeout : 5000});
    }
}