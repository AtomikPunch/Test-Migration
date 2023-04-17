//delivery mode commands
Cypress.Commands.add("i_select_the_delivery_mode", (deliveryModeRef) => {
    cy.get("@bag").then((bag) => {
        let deliveryMode = bag.data.deliveryMode[deliveryModeRef];

        cy.log("Select delivery mode " + deliveryMode.mode);
        if (deliveryMode.mode == "farm")
            bag.pages.delivery.farmChoice.click();
        else
            bag.pages.delivery.pickUpChoice.click();
    });
})

Cypress.Commands.add("i_confirm_the_delivery_mode_choice", () => {
    cy.get("@bag").then((bag) => {
        cy.log("Confirm delivery mode");
        bag.pages.delivery.confirmDeliveryMode.click();
        bag.pages.delivery.deliveryAddressChoiceBtn.should('be.visible');
    });
})

//delivery address commands
Cypress.Commands.add("i_select_the_delivery_address", (deliveryModeRef) => {
    cy.get("@bag").then((bag) => {
        let deliveryMode = bag.data.deliveryMode[deliveryModeRef];

        cy.log("Select delivery address" + deliveryMode.address);
        if (deliveryMode.address == "home")
            bag.pages.delivery.deliveryAddressChoiceBtn.click();
        else {
            bag.pages.delivery.seeMorePickUpPointBtn.click();
            bag.pages.delivery.deliveryPickUpPointPopin(deliveryMode.address).click();
            bag.pages.delivery.confirmPickUpPointChoicePopin.click();
        }
    });
})

Cypress.Commands.add("i_fill_the_delivery_instructions", (deliveryModeRef) => {
    cy.get("@bag").then((bag) => {
        let deliveryMode = bag.data.deliveryMode[deliveryModeRef];

        cy.log("Fill delivery instruction");
        bag.pages.delivery.instructionTextArea.type(deliveryMode.instruction);
    });
})

Cypress.Commands.add("i_confirm_the_delivery_address_choice", () => {
    cy.get("@bag").then((bag) => {
        cy.log("Confirm delivery address");
        bag.pages.delivery.confirmDeliveryAddress.click();
        bag.pages.payment.paymentPage.should('be.visible');
    });
})