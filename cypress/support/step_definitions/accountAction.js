const { Given, Then ,When, attach} = require("@badeball/cypress-cucumber-preprocessor");

Given("I will use a client {string}", (client_reference) => {cy.i_will_use_client(client_reference);})
Cypress.Commands.add("i_will_use_client", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference];
        bag.data.clients.last = client;
        attach(JSON.stringify(client));
    });
})

Then("I log in as a client {string}", (client_reference) => {cy.i_log_in(client_reference);})
Then("I log in", () => {cy.i_log_in("last");})
Cypress.Commands.add("i_log_in", (client_reference) => {
    cy.i_access_to_the_login_page();
    cy.i_fill_the_login_form(client_reference);
    cy.i_submit_the_login_form();
})

Then("I fill the login form for a client {string}", (client_reference) => {cy.i_fill_the_login_form(client_reference);})
Then("I fill the login form", () => {cy.i_fill_the_login_form("last");})
Cypress.Commands.add("i_fill_the_login_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference];
        bag.data.clients.last = client;
        console.log("LOG WITH " + JSON.stringify(bag.data.clients.last));

        cy.log("i_fill_the_login_form as " + client_reference);
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
            cy.wait(3000);
            cy.get('body').then((body) => {
                if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                    bag.pages.commons.accept_cookies.click();
            });
        });
    });
})

When("I log out", () => {cy.i_log_out();})
Cypress.Commands.add("i_log_out", () => {
    cy.get("@bag").then((bag) => {
        cy.visit(bag.environment.start_url + 'mon-compte/mes-commandes');
        
        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });

        bag.pages.account.logout.click();
        bag.pages.home.signin_link.should('be.visible');
    });
})

When("I should be loggedin", () => {cy.i_should_be_loggedin();})
Cypress.Commands.add("i_should_be_loggedin", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_should_be_loggedin");
        bag.pages.home.signin_link.should('have.class', 'ens-signin__text-icon--active');
    });
})

Then("I create a new account by filling form {string}", (client_reference) => {cy.i_fill_the_registration_form(client_reference);})
Then("I fill the account registration form", () => {cy.i_fill_the_registration_form("last");})
Cypress.Commands.add("i_fill_the_registration_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        
        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });
        
        bag.pages.account.first_name_input.clear().type(client.first_name);
        bag.pages.account.last_name_input.type(client.last_name);
        bag.pages.account.email_input.type(client.email);
        bag.pages.account.password_input.type(client.password);
        cy.screenshot({overwrite: true});
    });
})

Then("I submit the account registration form", () => {cy.i_submit_the_registration_form("last");})
Cypress.Commands.add("i_submit_the_registration_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        
        bag.pages.account.submit_account_creation.click();
        bag.pages.account.successfulConnexion.should('exist');

        // #HACK : We should not have to accept th cookies twice 
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });
    });
})

Given("I generate a random email for the client {string}", (client_reference) => {cy.generate_email_random(client_reference);})
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


