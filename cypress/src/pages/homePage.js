class homePage{
    
    get acceptCookie(){
        return cy.get('#axeptio_btn_acceptAll', {timeout : 5000});
    }
}
export default homePage;