exports.listPage = class listPage{

    get find_store(){
        return cy.get('.ens-product-list-template__locate-cta', {timeout : 5000});
    }

    get product_list(){
        return cy.get('.ens-product-list', {timeout : 5000});
    }

    get filter(){
        return cy.get('.ens-product-list-template__button-filter', {timeout : 5000});
    }

    get max_price_filter(){
        return cy.get('#range-filter-max', {timeout : 5000});
    }

    get min_price_filter(){
        return cy.get('#range-filter-min', {timeout : 5000});
    }

    get brand_list(){
        return cy.get('[displayattribute*="brand"]', {timeout : 5000});
    }

    get first_brand(){
        return cy.get('#filter_Fertiligène_0', {timeout : 5000});
    }

    get filter_tag(){
        return cy.get('.filter-tags__selected-facets > ', {timeout : 5000});
    }

    get see_more_product(){
        return cy.get('.ens-product-list-template__main-navigation--footer .ens-product-list-template__more-products', {timeout : 5000});
    }

    product_in_PLP(store_id){
        return cy.get("#" + store_id, {timeout : 5000});
    }

    get header_seo(){
        return cy.get('.ens-product-list-header__heading', {timeout : 5000});
    }

    get cta_store_choice(){
        return cy.get('.ens-product-list-template__locate-cta' , {timeout : 5000});
    }

    get product_counter(){
        return cy.get('.ens-product-list-template__products-counter' , {timeout : 5000});
    }
}