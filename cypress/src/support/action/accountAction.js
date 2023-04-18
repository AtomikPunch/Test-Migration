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

Cypress.Commands.add('i_add_new_delivery_address', (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        cy.log("i_add_new_delivery_address");
        bag.pages.account.my_addresses.click();
        bag.pages.account.add_address.should('be.visible').click();
        bag.pages.account.new_first_name_input.type(client.new_address_firstname);
        bag.pages.account.new_last_name_input.type(client.new_address_lastname);
        bag.pages.account.new_address_input.type(client.new_address);
        bag.pages.account.new_postal_code_input.type(client.new_postal_code);
        bag.pages.account.new_city_input.type(client.new_city);
        bag.pages.account.new_number_input.type(client.new_number);
        bag.pages.account.save_new_address.click();
    });
})

Cypress.Commands.add('i_verify_new_address_successfully_added', () => {
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_new_address_successfully_added");
        bag.pages.account.address_card.should('have.length', 2);
    });
})