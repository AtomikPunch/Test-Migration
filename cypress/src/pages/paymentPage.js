class paymentPage{

    //payment page
    get paymentPage(){
        return cy.get("div.payment-method");
    }

    get paymentModeLabel(){
        return cy.get(".payment-method > div > .radio-selector:nth-child(1)");
    }

    get confirmPaymentBtn(){
		return cy.get(".cart-total__btn-command");
	}

    //confirmation sms page

    get confirmationSMSPage(){
        return cy.get(".code-confirmation__card");
    }

    get codeSMSInput(){
        return cy.get("[data-cy='code-confirmation-input']");
    }

    get submitCodeBtn(){
        return cy.get('.code-confirmation__btn-command');
    }

    get orderConfirmationTitle(){
        return cy.get("[data-cy='order-confirmation-title']");
    }

    get orderBlock(){
        return cy.get("[data-cy='order-block']");
    }
}
export default paymentPage