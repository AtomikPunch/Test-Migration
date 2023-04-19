Cypress.Commands.add("i_access_to_the_webstore", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_webstore");
        cy.visit(bag.environment.start_url);
        bag.pages.commons.accept_cookies.click();
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
            commons.accept_cookies.click();
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
            commons.accept_cookies.click();
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