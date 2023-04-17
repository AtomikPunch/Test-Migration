Cypress.Commands.add("i_search_using", (search_ref) => {
    cy.get("@bag").then((bag) => {
        let search = bag.data.search[search_ref];

        cy.log("Search value : " + search.criteria);
        bag.pages.header.searchInput.type(search.criteria)
            .type('{enter}');
        bag.pages.category.categoryPage.should('be.visible');
    });
})

Cypress.Commands.add("i_search_using_product", (product_ref) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];

        cy.log("Search value : " + product.product_uid);
        bag.pages.header.searchInput.type(product.product_uid)
            .type('{enter}');
        bag.pages.category.categoryPage.should('be.visible');
    });
})