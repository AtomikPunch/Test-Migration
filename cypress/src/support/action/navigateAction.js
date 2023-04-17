Cypress.Commands.add("a_step_name", () => {
    cy.get("@bag").then((bag) => {
        cy.log("The step has started");
        bag.pages.home.the_object.click();
    });

})