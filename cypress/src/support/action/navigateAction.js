Cypress.Commands.add("i_access_to_the_webstorefront", () => {
    cy.get("@bag").then((bag) => {
        cy.visit(bag.environment.start_url);
    });
});

Cypress.Commands.add("i_accept_the_cookies", () => {
    cy.get("@bag").then((bag) => {
        cy.log("Accept cookie");
        bag.pages.header.acceptCookieBtn;
        cy.wait(500);
        bag.pages.header.acceptCookieBtn.click();
    });

})

Cypress.Commands.add("i_access_the_product_page", (product_ref) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];
        cy.log("Access to product page " + product.url);
        bag.pages.category.productBox(product.url).click();
    });
})