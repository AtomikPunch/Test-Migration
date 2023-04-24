Cypress.Commands.add("i_go_to_checkin", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_go_to_checkin");
        bag.pages.cart.check_in.click();

        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../pages/commonsPage');
            const commons = new commonsPage();
                        
            // #HACK : We should not have to accept th cookies twice 
            commons.accept_cookies.click();
        });
    });
})


Cypress.Commands.add("i_verify_checkbox_checked", () => { 
    cy.get('@bag').then((bag) => { 
        cy.log("i_verify_checkbox_click_and_collect");
        bag.pages.cart.checkbox_checked.check({ force: true }).should('be.checked');
    }); 
})

Cypress.Commands.add("i_verify_user_default_address", (client_reference) => {
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_user_default_address");
        let client = bag.data.clients[client_reference];
        bag.pages.delivery.user_default_address.invoke('text').then((text) =>{
            expect(text.trim()).equal(client.default_address);
        });
    });
})

Cypress.Commands.add("i_verify_delivery_page_is_visible",() =>{
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_delivery_page_is_visible");
        bag.pages.delivery.delivery_page.should('be.visible');
    });
})

Cypress.Commands.add('i_add_new_delivery_address', (client_reference) => {
    cy.get("@bag").then((bag) => {
        let client = bag.data.clients[client_reference]
        cy.log("i_add_new_delivery_address");

        bag.pages.delivery.modify_address.then($button => {
            if ($button.is(':visible')){
              $button.click();
            }
          })
        bag.pages.delivery.new_first_name_input.clear().type(client.new_address_firstname);
        bag.pages.delivery.new_last_name_input.clear().type(client.new_address_lastname);
        bag.pages.delivery.new_address_input.clear().type(client.new_address);
        bag.pages.delivery.new_postal_code_input.clear().type(client.new_postal_code);
        bag.pages.delivery.new_city_input.clear().type(client.new_city);
        bag.pages.delivery.new_number_input.clear().type(client.new_number);
        bag.pages.delivery.save_new_address.click();
    });
})

Cypress.Commands.add('i_verify_new_address_successfully_added', () => {
    cy.get('@bag').then((bag) => {
        cy.log("i_verify_new_address_successfully_added");
        bag.pages.delivery.address_successfully_modified.should('be.visible');
    });
})


const getIframe = (card_reference , iframe, test) => {
    cy.get('@bag').then((bag) => {
        let card = bag.data.credit_card[card_reference];
        cy.get(iframe).invoke('contents').should((doc) => {
            const input = doc.find('input')
            expect(input.length).to.equal(1)
            }).then((doc) => {
                cy.wrap(doc.find('input')).type(test)
            })
        })
}


Cypress.Commands.add("i_fill_payment_form", (card_reference) =>{
    cy.get('@bag').then((bag) => {
        let card = bag.data.credit_card[card_reference];
        cy.log("i_fill_payment_form");
        bag.pages.delivery.procede_to_payment.click();
        bag.pages.payment.card_number_input.type(card.number);
        getIframe(card_reference , 'iframe[id*="card"]', card.number)
        getIframe(card_reference , 'iframe[id*="expiry"]', card.expiry)
        getIframe(card_reference , 'iframe[id*="cryptogram"]', card.cvv)
        bag.pages.payment.card_holder_input.type(card.holder);
    });
});

Cypress.Commands.add('i_pay_for_my_order', () => {
    cy.get('@bag').then((bag) => {
        cy.log("i_pay_for_my_order");
        bag.pages.payment.accept_condition.click();
        bag.pages.payment.pay_command.click();
    });
})

Cypress.Commands.add('i_get_order_confirmation_in_checkout', () => {
    cy.get('@bag').then((bag) => {
        bag.pages.payment.checkout_confirmation.should('be.visible');
    });
})

Cypress.Commands.add('i_verify_discount', (product_reference) => {
    cy.get('@bag').then((bag) => {
        let product = bag.data.product[product_reference];
        bag.pages.cart.reduced_price.should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).not.equal(product.price);
        });
    });
})