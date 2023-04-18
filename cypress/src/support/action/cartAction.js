Cypress.Commands.add("i_go_to_checkin", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_go_to_checkin");
        bag.pages.cart.check_in.click();

        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../pages/commonsPage');
            const commons = new commonsPage();
                        
            // #HACK : We should not have to accept th cookies twice 
            commons.accept_cookies.click();
        });
    });
})


Cypress.Commands.add("i_verify_checkbox_checked", () => { 
    cy.get('@bag').then((bag) => { 
        cy.log("i_verify_checkbox_click_and_collect");
        bag.pages.cart.checkbox_checked.check({ force: true }).should('be.checked');
    }); 
})

Cypress.Commands.add("i_verify_user_default_address", (client_reference) => {
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_user_default_address");
        let client = bag.data.clients[client_reference];
        bag.pages.cart.user_default_address.invoke('text').then((text) =>{
            expect(text.trim()).equal(client.default_address);
        });
    });
})

Cypress.Commands.add("i_verify_delivery_page_is_visible",() =>{
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_delivery_page_is_visible");
        bag.pages.cart.delivery_page.should('be.visible');
    });
})