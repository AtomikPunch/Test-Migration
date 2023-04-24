exports.commonsPage = class commonsPage{
    
    get accept_cookies(){
        // #HACK should get timeout from a config file
        return cy.get('#axeptio_overlay #axeptio_btn_acceptAll', {timeout : 5000});
    }

    get choose_store(){
        return cy.get('.ens-store-locator-header__content', {timeout : 5000});
    }

    get store_name(){
        return cy.get('.ens-store-locator-header__content' , {timeout : 5000});
    }
}