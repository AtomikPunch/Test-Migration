exports.homePage = class homePage{
    
    get signin_link(){
        return cy.get('.ens-header .ens-signin [role="button"]', {timeout : 5000});
    }

}