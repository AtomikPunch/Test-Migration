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

    get change_store(){
        return cy.get('.is-tertiary', {timeout : 20000});
    }

    get confirm_store_change(){
        return cy.get('.ens-store-locator-warning-modal__footer .is-tertiary', {timeout : 5000});
    }
}