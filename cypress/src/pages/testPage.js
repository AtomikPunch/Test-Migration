exports.testPage = class testPage{

    get search_bar(){
        return cy.get('input', {timeout : 5000});
    }

    get search_input(){
        return cy.get('#search_form_input_homepage', {timeout : 5000});
    }
}