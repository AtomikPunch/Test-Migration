Cypress.Commands.add("i_log_in_with_user", (user_ref) => {
    cy.get("@bag").then((bag) => {
        let user = bag.data.user[user_ref];
        cy.log("Log with account " + user.email);
        bag.pages.header.connexionBtn.click();
        bag.pages.login.emailInput.type(user.email);
        bag.pages.login.passwordInput.type(user.password);
        bag.pages.login.submitBtn.click();
        bag.pages.login.successfulConnexion.should('have.text', " \n  Connexion réussie\n ");
        bag.pages.login.loggedInfo.should('have.text', " \n    Mon compte\n   ");
    });
})