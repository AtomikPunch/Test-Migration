class homePage{
    
    get the_object(){
        // #HACK should get timeout from a config file
        return cy.get('#the_object_id', {timeout : 5000});
    }
}
export default homePage;