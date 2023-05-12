const { Given, Then, When } = require("@badeball/cypress-cucumber-preprocessor");

Then("I fill the login form {string}", (client_reference) => {cy.i_fill_the_login_form(client_reference);})
Cypress.Commands.add("i_fill_the_login_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference];
        bag.data.clients.last = client;
        cy.log("i_access_to_the_webstore as " + client_reference);

        bag.pages.signon.login.type(client.email);
        bag.pages.signon.password.type(client.password);
    });
})

Then("I submit the login form", () => {cy.i_submit_the_login_form();})
Cypress.Commands.add("i_submit_the_login_form", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_submit_the_login_form");

        cy.intercept("POST", "https://invivo-jardiland-test.eu.auth0.com/oauth/token").as("loginResponse");
        bag.pages.signon.login_submit.click();

        cy.wait("@loginResponse").then((intercept) => {
            bag.data.clients.last.access_token = intercept.response.body.access_token;
            // #HACK : We should not have to accept th cookies twice 
            bag.pages.commons.accept_cookies.click();
        });
    });
})

When("I should be loggedin", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_should_be_loggedin");
        bag.pages.home.signin_link.should('have.class', 'ens-signin__text-icon--active');
    });
})

Cypress.Commands.add("i_create_a_new_account_by_filling_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        cy.log("i_create_a_new_account");
        bag.pages.cart.create_new_account.trigger('click');
        bag.pages.account.first_name_input.clear().type(client.first_name);
        bag.pages.account.last_name_input.type(client.last_name);
        bag.pages.account.email_input.type(client.email);
        bag.pages.account.password_input.type(client.password);
        bag.pages.account.submit_account_creation.click();
        bag.pages.account.successfulConnexion.should('exist');

        // #HACK : We should not have to accept th cookies twice 
        bag.pages.commons.accept_cookies.click();
    });
})

Cypress.Commands.add("i_create_a_new_account_from_header", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        cy.log("i_create_new_account_from_header");
        bag.pages.account.first_name_input.clear().type(client.first_name);
        bag.pages.account.last_name_input.type(client.last_name);
        bag.pages.account.email_input.type(client.email);
        bag.pages.account.password_input.type(client.password);
        bag.pages.account.submit_account_creation.click();

        // #HACK : We should not have to accept th cookies twice 
        bag.pages.commons.accept_cookies.click();
    })
})


Cypress.Commands.add("generate_email_random", (client_reference) => {
    function generateRandomEmail() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += characters[Math.floor(Math.random() * characters.length)];
        }
        return `test.${randomString}@getnada.com`;
    }

    cy.get("@bag").then((bag) => {    
        const randomEmail = generateRandomEmail();
        let client = bag.data.clients[client_reference]
        client.email = randomEmail;
    })
})


