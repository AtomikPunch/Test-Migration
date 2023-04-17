exports.commonsPage = class commonsPage{
    
    get accept_cookies(){
        // #HACK should get timeout from a config file
        return cy.get('#axeptio_overlay #axeptio_btn_acceptAll', {timeout : 5000});
    }

}