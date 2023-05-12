Cypress.Commands.add("i_access_to_the_webstore", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_webstore");
        cy.visit(bag.environment.start_url);
        
        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });

    });
})

Cypress.Commands.add("i_access_to_the_login_page", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_login_page");
        bag.pages.home.signin_link.click();
        
        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../pages/commonsPage');
            const commons = new commonsPage();
            
            // #HACK : We should not have to accept th cookies twice 
            cy.wait(3000);
            cy.get('body').then((body) => {
                if (body.find(commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                    commons.accept_cookies.click();
            });
        });
    });

})

Cypress.Commands.add("i_access_to_the_registration_page", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_registration_page");
        bag.pages.home.signin_link.click();
        
        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../pages/commonsPage');
            const commons = new commonsPage();
            const { signonPage } = Cypress.require('../../pages/signonPage');
            const signon = new signonPage();

            // #HACK : We should not have to accept th cookies twice 
            cy.wait(3000);
            cy.get('body').then((body) => {
                if (body.find(commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                    commons.accept_cookies.click();
            });
            signon.access_to_account_registration.trigger('click');
        });
    });
})

Cypress.Commands.add("i_access_to_my_account", () => {
    cy.get("@bag").then((bag) => {
        bag.pages.home.signin_link.click();
    });
})

Cypress.Commands.add("i_access_cart_from_header", () => {
    cy.get("@bag").then((bag) => {
        bag.pages.home.cart_link.click();
    });
})

Cypress.Commands.add('i_access_PLP',() => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_PLP");
        cy.visit(bag.environment.product_list_url);
        bag.pages.commons.accept_cookies.click();
        bag.pages.commons.close_choose_store.click();
    });
})

Cypress.Commands.add('i_access_a_category', (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.product.existing_product[product_reference];
        cy.log("i_access_a_category");
        cy.visit( bag.environment.start_url + 'c/' + product.category );
        bag.pages.list.product_list.should('be.visible');
    });
});