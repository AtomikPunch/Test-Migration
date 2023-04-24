exports.listPage = class listPage{

    get find_store(){
        return cy.get('.ens-product-list-template__locate-cta', {timeout : 5000});
    }
}