exports.homePage = class homePage{
    
    get signin_link(){
        return cy.get('.ens-header .ens-signin [role="button"]', {timeout : 5000});
    }

    get cart_link(){
        return cy.get('.ens-cart-header__link',{timeout : 5000});
    }

    get search_bar(){
        return cy.get('.ens-search-form__field [data-cy="common-search"]', {timeout : 5000});
    }

    get research_button(){
        return cy.get('.ens-search-form__submit', {timeout : 5000});
    }
}