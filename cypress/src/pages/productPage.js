class productPage{

	constructor(){
		this.product_uid = "";
	}

    get productPage(){
        return cy.get('.product-detail');
    }
	
	get addToCartBtn(){
		return cy.get("li[data-cy*='" + this.product_uid + "']:nth-child(1)").find("button.adn-button--primary").first();
	}
	
	get seeQuoteBtn(){
		return cy.get("body > [data-cy='add-to-cart-modal']").find(".popup__buttons > .adn-button--primary");
	}
	
	get nameProduct(){
		return cy.get("[data-cy='product-name']");
	}
	
	get priceProduct(){
		return cy.get(".offer-total-price__total >span:nth-child(2)");
	}

	get chooseFirstStoreBtn(){
		return cy.get(".stores-modal__add-to-cart").first();
	}

	get closeChooseStorePopin(){
		return cy.get("body > .adn-modal").find(".adn-icon--navigation-close");
	}

	get closePopin(){
		return cy.get("body > [data-cy='add-to-cart-modal']").find(".popup__buttons > .adn-button--secondary:nth-child(1)");
	}
}
export default productPage;