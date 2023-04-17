class cartPage{
	
	closePopInNewPath = "#closeModalBtn";

	constructor(){
		this.product = "";
		this.taxesPrice = 0;
		this.ttcPrice = 0;
	}

	get cartAmount(){
        return cy.get(".shopping-list a");
    }
	
	get cartPage(){
		return cy.get("article.shopping-list__article");
	}

	get deleteCart(){
		return cy.get(".adn-icon--function-delete");
	}

	get confirmDeleteCart(){
		return cy.get("body > div.adn-modal > div.adn-modal__modal > div > div > footer > .adn-button--primary");
	}
	
	productName(product_url){
		return cy.get("a[href='" + product_url + "']");
	}
	
	productTotalPrice(product_url){
		return this.productName(product_url).parents(".item").find(".line-item-price__total-price > span > span");
	}
	
	get totalPriceProducts(){
		return cy.get("table > tr:nth-child(1) >td.price >span > strong");
	}
	
	get totalPriceHTC(){
		return cy.get("table > tr:nth-child(3) >td.price > span > strong");
	}
	
	get taxesAmount(){
		return cy.get("table > tr:nth-child(4) >td.price > span > strong");
	}
	
	get totalPriceCart(){
		return cy.get("table > tr:nth-child(6) >td.price > span > strong");
	}
	
	get confirmCartBtn(){
		return cy.get(".order > div > button");
	}
	
	get closePopInNew(){
		return cy.get(this.closePopInNewPath);
	}
	
}
export default cartPage;