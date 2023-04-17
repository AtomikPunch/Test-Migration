function callAPIorder(){
    let code;
    cy.request("POST", url, {}).then((response)=>{
        return code;
    })
}

Cypress.Commands.add("i_select_the_payment_mode", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Select payment mode");
        bag.pages.payment.paymentModeLabel.click();        
    });
})

Cypress.Commands.add("i_confirm_the_payment_choice", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Confirm payment mode");

        getUrl();
        cy.get("@url").then(url=>{
            cy.intercept("POST", url).as("intercept");
            bag.pages.payment.confirmPaymentBtn.click();
            bag.pages.payment.confirmationSMSPage.should('be.visible');
        });
    });
})

Cypress.Commands.add("i_fill_the_confirmation_code", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Fill confirmation code");
        cy.wait("@intercept").then(intercept=>{
            intercept.response.body.code;
            bag.pages.payment.codeSMSInput.type(intercept.response.body.code);
            bag.pages.payment.submitCodeBtn.click();
        });
    });
})

Cypress.Commands.add("i_control_the_order_confirmation_page", ()=>{
    cy.get("@bag").then((bag) => {
        cy.log("Control confirmation page");
        bag.pages.payment.orderConfirmationTitle.should('be.visible');
        bag.pages.payment.orderBlock.should('be.visible');        
    });
})

function getOrderId(){
    cy.url().then(url=>{
        cy.wrap(url.match(/\d{9}/)).as("orderId");
    })
}

function getUrl(){
    getOrderId();
    cy.get("@orderId").then(orderId=>{
        cy.log("Order id : " + orderId);
        cy.wrap("https://shop-api.marketplace-qua.invivodigitalfactory.com/v1/checkouts/" + orderId +"/codes").as("url");
    })
}