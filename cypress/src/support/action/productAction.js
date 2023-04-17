Cypress.Commands.add("i_add_the_product_to_the_cart", (product_ref)=>{
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];
        cy.log("Add to cart the product "+ product.product_uid);
        bag.pages.product.product_uid = product.product_uid
        bag.pages.product.addToCartBtn.click();
        if(product.click_collect)
            bag.pages.product.chooseFirstStoreBtn.click();
        bag.pages.product.seeQuoteBtn.should('be.visible');           
    });
})

Cypress.Commands.add("i_access_to_the_cart_page_using_the_popin", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Click to access to cart page on popin");
        bag.pages.product.seeQuoteBtn.click();
        bag.pages.cart.cartPage.should('be.visible');
    });
})

Cypress.Commands.add("i_close_the_add_to_cart_popin", (product_ref)=>{
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];
        cy.log("Click to close popin");
        bag.pages.product.closePopin.click();
        if(product.click_collect)
            bag.pages.product.closeChooseStorePopin.click();        
    });
})

Cypress.Commands.add("i_control_the_product_page", (product_ref)=>{
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];

        cy.log("Control product page for " + product.product_uid);
        bag.pages.product.productPage.should('be.visible');
        bag.pages.product.nameProduct.should('have.text', product.name);
        cy.convertPriceToString(product.price).then(price => bag.pages.product.priceProduct.contains(price));        
    });
})