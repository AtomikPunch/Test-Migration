const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("J'accede au site web", () => {cy.i_access_to_the_webstore();})
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

Then("J'accede à la page de connection", () => {cy.i_access_to_the_login_page();})
Cypress.Commands.add("i_access_to_the_login_page", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_login_page");
        bag.pages.home.signin_link.click();
        
        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../src/pages/commonsPage');
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

Then("J'accede à la page de création de compte", () => {cy.i_access_to_the_registration_page();})
Cypress.Commands.add("i_access_to_the_registration_page", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_to_the_registration_page");
        bag.pages.home.signin_link.click();
        
        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../src/pages/commonsPage');
            const commons = new commonsPage();
            const { signonPage } = Cypress.require('../../src/pages/signonPage');
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

Then("J'accede au panier depuis le header", () => {cy.i_access_cart_from_header();})
Cypress.Commands.add("i_access_cart_from_header", () => {
    cy.get("@bag").then((bag) => {
        bag.pages.home.cart_link.click();
    });
})

Then("J'accède à la PLP {string}", (plp_reference) => {cy.i_access_PLP(plp_reference);})
Cypress.Commands.add('i_access_PLP',(plp_reference) => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_access_PLP");
        cy.visit(bag.data.categories[plp_reference].url);
        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });
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