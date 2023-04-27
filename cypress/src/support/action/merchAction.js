Cypress.Commands.add('i_filter_by_max_price', () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_filter_by_max_price");
        bag.pages.list.filter.click();
        bag.pages.list.max_price_filter.type('100').type('{enter}');
    });
});

Cypress.Commands.add('i_filter_by_min_price', () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_filter_by_min_price");
        bag.pages.list.min_price_filter.type('10').type('{enter}');
    });
});

Cypress.Commands.add('i_filter_by_brand', () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_verify_filter_tag_added");
        //bag.pages.list.filter.click();
        bag.pages.list.filter.then($button => {
            if($button.is(':visible'))
            {
                bag.pages.list.filter.click();
            }
        })
        bag.pages.list.brand_list.click();
        bag.pages.list.first_brand.click({force: true});
    });
});

Cypress.Commands.add('i_verify_filter_tag_added', (filter_number) => {
    cy.get("@bag").then((bag) => {
        cy.log("i_verify_filter_tag_added");
        bag.pages.list.filter_tag.should('be.visible').should('have.length', filter_number);
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