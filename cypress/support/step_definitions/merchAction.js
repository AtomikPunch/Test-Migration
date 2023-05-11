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