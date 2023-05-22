const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor");
const { productPage } = require("../../src/pages/productPage");

Cypress.Commands.add('i_filter_by_max_price', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_max_price");
        bag.pages.list.filter.click();
        bag.pages.list.max_price_filter.type(filter.option).type('{enter}');
    });
});

Cypress.Commands.add('i_filter_by_min_price', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_min_price");
        bag.pages.list.min_price_filter.type(filter.option).type('{enter}');
    });
});

Cypress.Commands.add('i_filter_by_brand', (FilterBy_reference) => {
    cy.get("@bag").then((bag) => {
        let filter = bag.data.FilterBy[FilterBy_reference];
        cy.log("i_filter_by_brand");
        bag.pages.list.filter.then($button => {
            if($button.is(':visible'))
            {
                bag.pages.list.filter.click();
            }
        })
        bag.pages.list.brand_list.click();
        cy.get('[id*=' + filter.option + ']+.checkbox-frame').click();
    });
});

Cypress.Commands.add('i_verify_filter_tag_added', (filter_count,filter_reference) => {
    cy.get("@bag").then((bag) => {
        let filter_selected = bag.data.FilterBy[filter_reference];
        cy.log("i_verify_filter_tag_added");
        bag.pages.list.filter_tag.should('have.length', filter_count);
        bag.pages.list.filter_tag.contains(filter_selected.option);
    });
});

Cypress.Commands.add("i_search_a_product", (product_reference) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_search_a_product");
        let product = bag.data.product.existing_product[product_reference];
        bag.pages.home.search_bar.type(product)
        bag.pages.home.research_button.click();
    });
})

Cypress.Commands.add("i_verify_product_in_PLP", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_reference];
        cy.log("i_verify_product_in_PLP");
        while (cy.get(`[href*="${product.id}"]`).should('be.visible').then(isVisible => !isVisible)) {
            bag.pages.list.see_more_product.should('be.visible').click();
          }
    });
});

Then("Je cherche un produit {string} en utilisant son unité de besoin",(product_reference) => {cy.i_search_a_product_using_its_name(product_reference);})
Cypress.Commands.add("i_search_a_product_using_its_name", (product_reference) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_search_a_product");
        let product = bag.data.products[product_reference];
        bag.pages.home.search_bar.type(product.name).type('{enter}')
    });
})

Then("Je verifie la présence du produit {string} dans la PLP", (product_reference) => { cy.i_verify_product_in_PLP(product_reference);})
Cypress.Commands.add("i_verify_product_in_PLP", (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        cy.wait(3000);
            bag.pages.list.product_list.then($body => {
            if ($body.find("#" + product.id).length > 0) {   
                //evaluates as true if button exists at all
                bag.pages.list.product_in_PLP(product.id).then($element => {
                if ($element.is(':visible')){
                    cy.log("element is visible and exist")
                    }
                });
                } else {
                    cy.log("element is not visible and doesn't exist")
                    bag.pages.list.see_more_product.scrollIntoView().click();
                    cy.wait(5000);
                    cy.i_verify_product_in_PLP(product_reference);
                    assert.isOk('everything','everything is OK');
                }
            });
        
        })
    });