Cypress.Commands.add("i_create_account_user", (user_ref) => {
    cy.get("@bag").then((bag) => {
        let user = bag.data.user[user_ref];
        cy.log("Creation account " + user.email);
        bag.pages.header.connexionBtn.click();
        bag.pages.login.createAccountBtn.trigger('click');
        bag.pages.creationAccount.lastNameInput.type(user.lastname);
        bag.pages.creationAccount.firstNameInput.type(user.firstname);
        bag.pages.creationAccount.emailInput.type(user.email);
        bag.pages.creationAccount.passwordInput.type(user.password);
        bag.pages.creationAccount.submitBtn.click();
        bag.pages.creationAccount.successfulConnexion.should('have.text', " \n  Connexion réussie\n ");
        bag.pages.creationAccount.loggedInfo.should('have.text', " \n    Mon compte\n   ");
    });
});