const { Given, Then ,When, attach} = require("@badeball/cypress-cucumber-preprocessor");

Given("Je vais utiliser un client {string}", (client_reference) => {cy.i_will_use_client(client_reference);})
Cypress.Commands.add("i_will_use_client", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference];
        bag.data.clients.last = client;
        attach(JSON.stringify(client));
    });
})

Then("Je me connecte en tant que client {string}", (client_reference) => {cy.i_log_in(client_reference);})
Then("Je me connecte", () => {cy.i_log_in("last");})
Cypress.Commands.add("i_log_in", (client_reference) => {
    cy.i_access_to_the_login_page();
    cy.i_fill_the_login_form(client_reference);
    cy.i_submit_the_login_form();
})

Then("je remplis le formulaire de connection pour un client {string}", (client_reference) => {cy.i_fill_the_login_form(client_reference);})
Then("Je remplis le formulaire de connection", () => {cy.i_fill_the_login_form("last");})
Cypress.Commands.add("i_fill_the_login_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        
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
        });
        let client = bag.data.clients[client_reference];
        bag.data.clients.last = client;
        console.log("LOG WITH " + JSON.stringify(bag.data.clients.last));

        cy.log("i_fill_the_login_form as " + client_reference);
        bag.pages.signon.login.type(client.email);
        bag.pages.signon.password.type(client.password);
    });
})

Then("Je soumets le formulaire de connection", () => {cy.i_submit_the_login_form();})
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

When("Je me deconnecte", () => {cy.i_log_out();})
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

When("Je devrais etre connecté", () => {cy.i_should_be_loggedin();})
Cypress.Commands.add("i_should_be_loggedin", () => {
    cy.get("@bag").then((bag) => {
        cy.log("i_should_be_loggedin");
        bag.pages.home.signin_link.should('have.class', 'ens-signin__text-icon--active');
    });
})

Then("I create a new account by filling form {string}", (client_reference) => {cy.i_fill_the_registration_form(client_reference);})
Then("Je remplis le formulaire de création de compte", () => {cy.i_fill_the_registration_form("last");})
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

Then("Je soumets le formulaire de création de compte", () => {cy.i_submit_the_registration_form("last");})
Cypress.Commands.add("i_submit_the_registration_form", (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        
        cy.intercept("POST", "https://invivo-jardiland-test.eu.auth0.com/oauth/token").as("loginResponse");
        bag.pages.account.submit_account_creation.click();
        bag.pages.account.successfulConnexion.should('exist');

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

Given("Je genere un email aléatoire pour un client {string}", (client_reference) => {cy.generate_email_random(client_reference);})
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


