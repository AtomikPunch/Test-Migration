class deliveryPage{

	constructor(){
    }

    //Delivery mode page
	get deliveryModePage(){
		return cy.get("[data-cy='shipping-method-radio']");
	}

	get farmChoice(){
		return cy.get("[value='farm']").parent("label")
	}

	get pickUpChoice(){
		return cy.get("[value='pickup_point']").parent("label");
	}
 
	get confirmDeliveryMode(){
		return cy.get(".cart-total__btn-command");
	}	
	//delivery address page
	get deliveryAddressChoiceBtn(){
		return cy.get("[data-cy='shipping-method']");
	}

	deliveryPickUpPointBtn(valuePickUp){
		return cy.get("[data-cy='radio-selector-pickup_point'][value='" + valuePickUp + "']");
	}

	get seeMorePickUpPointBtn(){
		return cy.get("[data-test='show-more-addresses']");
	}

	deliveryPickUpPointPopin(valuePickUp){
		return cy.get("[data-test='radio-selector-" + valuePickUp + "']");
	}

	get confirmPickUpPointChoicePopin(){
		return cy.get("[data-test='additional-addresses-confirm']");
	}

	get instructionTextArea(){
		return cy.get("#constraint");
	}
	
	get confirmDeliveryAddress(){
		return cy.get(".cart-total__btn-command");
	}
}
export default deliveryPage;