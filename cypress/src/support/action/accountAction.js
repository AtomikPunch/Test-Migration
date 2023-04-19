Cypress.Commands.add("i_fill_the_login_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference];

        cy.log("i_access_to_the_webstore as " + client_reference);
        
        cy.log("client: " + JSON.stringify(client));
        bag.pages.signon.login.type(client.email);
        bag.pages.signon.password.type(client.password);
    });
})

Cypress.Commands.add("i_submit_the_login_form", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_submit_the_login_form");
        bag.pages.signon.login_submit.click();
        cy.wait(5000);
        // #HACK : We should not have to accept th cookies twice 
        bag.pages.commons.accept_cookies.click();
    });
})

Cypress.Commands.add("i_should_be_loggedin", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_should_be_loggedin");
        bag.pages.home.signin_link.should('have.class', 'ens-signin__text-icon--active');
    });
})
