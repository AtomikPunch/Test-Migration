exports.listPage = class listPage{

    get find_store(){
        return cy.get('.ens-product-list-template__locate-cta', {timeout : 5000});
    }

    get product_list(){
        return cy.get('.ens-product-list', {timeout : 5000});
    }
}