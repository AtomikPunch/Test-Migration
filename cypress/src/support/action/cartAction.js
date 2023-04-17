function calculTaxes(totalHTC, taxesPercent){
    return Math.round((totalHTC * taxesPercent / 100) * 100) / 100;
}

function calculTTC(totalHTC, taxesAmount){
    return Math.round((totalHTC + taxesAmount)  * 100) / 100;
}

Cypress.Commands.add("i_control_the_product_line_in_the_cart", (product_ref)=>{
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];
        cy.log("Control product line " +  product.product_uid);
        bag.pages.cart.productName(product.url).should('have.text', product.offerName);
        cy.convertPriceToString(product.price).then((price) =>  bag.pages.cart.productTotalPrice(product.url).contains(price));        
    });
})

Cypress.Commands.add("i_control_the_cart_summary", (product_ref, taxe_ref)=>{
    cy.get("@bag").then((bag) => {
        let product = bag.data.product[product_ref];
        let taxe = bag.data.taxe[taxe_ref];
        cy.log("Control cart resume " + JSON.stringify(product));
        let basePrice = product.price;
        let taxesPrice = calculTaxes(basePrice, taxe);
        let ttcPrice = calculTTC(basePrice, taxesPrice);

        cy.log("Expected basePrice : " + basePrice);
        cy.log("Expected taxesPrice : " + taxesPrice);
        cy.log("Expected ttcPrice : " + ttcPrice);

        cy.convertPriceToString(basePrice).then((price) =>  bag.pages.cart.totalPriceProducts.contains(price));
        cy.convertPriceToString(basePrice).then((price) =>  bag.pages.cart.totalPriceHTC.contains(price));
        cy.convertPriceToString(taxesPrice).then((price) =>  bag.pages.cart.taxesAmount.contains(price));
        cy.convertPriceToString(ttcPrice).then((price) =>   bag.pages.cart.totalPriceCart.contains(price));
    });
})

Cypress.Commands.add("i_confirm_the_cart",()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Confirm cart");
        bag.pages.cart.confirmCartBtn.click();
        bag.pages.delivery.deliveryModePage.should('be.visible');        
    });
})

Cypress.Commands.add("i_access_to_the_cartpage", () => {
    cy.get("@bag").then((bag) => {
        cy.log("Click on access to cart");
        bag.pages.cart.cartAmount.click();
        bag.pages.cart.cartPage.should('be.visible');        
    });
})

Cypress.Commands.add("i_empty_the_cart", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Empty old cart");
        cy.i_search_using("basic_search");
        cy.i_access_to_the_cartpage();

        bag.pages.cart.cartPage.should('be.visible');
        bag.pages.cart.deleteCart.scrollIntoView();
        bag.pages.cart.deleteCart.click({force: true});
        bag.pages.cart.confirmDeleteCart.click();
        bag.pages.cart.cartAmount.contains("0,00");
        //TODO 
        //if exists, le POM ne fonctionne pas pour faire ça
        //Meilleur solution possible?
        cy.get("body").then(body=>{
            body.find(bag.pages.cart.closePopInNewPath).length;
            if(body.find(bag.pages.cart.closePopInNewPath).length > 0) {
                cy.wait(500);
                bag.pages.cart.closePopInNew.click();
            }
        })             
    });

})