import '../../src/api/services/jardiland-services';
const { Given, Then ,When} = require("@badeball/cypress-cucumber-preprocessor");

When("J'accede au checkout", () => {cy.i_go_to_checkout();})
Cypress.Commands.add("i_go_to_checkout", () => {
    cy.get("@bag").then((bag) => {
        
        cy.log("i_go_to_checkout");
        bag.pages.cart.check_in.click();

        // #HACK : We should not have to accept th cookies twice
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(bag.pages.commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                bag.pages.commons.accept_cookies.click();
        });
    });
})

When("Je choisis de créer un compte depuis le checkout", () => {cy.i_choose_to_register_from_checkout();})
Cypress.Commands.add("i_choose_to_register_from_checkout", () => { 
    cy.get('@bag').then((bag) => {
        cy.origin(bag.environment.origins.auth, () => {
            const { commonsPage } = Cypress.require('../../src/pages/commonsPage');
            const commons = new commonsPage();
            const { signonPage } = Cypress.require('../../src/pages/signonPage');
            const signon = new signonPage();

            // #HACK : We should not have to accept th cookies twice 
            cy.wait(3000);
            cy.get('body').then((body) => {
                if (body.find(commons.accept_cookies_selector, {timeout : 5000}).length > 0)
                    commons.accept_cookies.click();
            });
        });
        bag.pages.cart.create_new_account.trigger('click');
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

When("Je vérifie que la page de livraison est visible", () => {cy.i_verify_delivery_page_is_visible();})
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


Then("Je remplis le forulaire de payment en utilisant la carte {string}", (card_reference) => {cy.i_fill_payment_form(card_reference);})
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

Then("Je paie ma commande", () => {cy.i_pay_for_my_order();})
Cypress.Commands.add('i_pay_for_my_order', () => {
    cy.get('@bag').then((bag) => {
        cy.log("i_pay_for_my_order");
        bag.pages.payment.accept_condition.click();
        bag.pages.payment.pay_command.click();
    });
})

When("Je reçois la confirmation de ma commande sur le site", () => {cy.i_get_order_confirmation_in_checkout();})
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

Cypress.Commands.add('i_verify_cart_is_empty', () => {
    cy.get('@bag').then((bag) => {
        bag.pages.cart.empty_cart.should('be.visible');
    });
})

Cypress.Commands.add('i_change_delivery_option', () => {
    cy.get('@bag').then((bag) => {
        bag.pages.cart.checkbox_home_delivery.click();
    });
})

Cypress.Commands.add('i_verify_total_changed', (product_reference) => {
    cy.wait(4000);
    cy.get('@bag').then((bag) => {
        let product = bag.data.product[product_reference];
        bag.pages.cart.total_price.invoke('text').then((text) => {
            expect(text.trim().replace(/\u00a0/g, ' ')).not.equal(product.price)
        });
    });
})

Then("Je vide le panier en utilisant une API", () => {cy.i_empty_the_cart_using_the_API();})
Cypress.Commands.add('i_empty_the_cart_using_the_API', () => {
    cy.get('@bag').then((bag) => {
        cy.INVIVO_API_get_cart(bag.data.clients.last).then((cart) => {
            bag.data.clients.last.cart = cart;
            let cart_id = bag.data.clients.last.cart.id;
            let cart_lines = bag.data.clients.last.cart.lines;
            cart_lines.forEach((cart_line) => {
                cy.INVIVO_API_remove_cart_line(bag.data.clients.last, cart_id, cart_line).then((response) => {
                    bag.data.clients.last.cart = response;
                });
            });
        });
    });
})

Then("Je vérifie la réception de l'email en utilisant une API", () => {cy.i_verify_mail_successfully_received_using_the_API('last');})
Cypress.Commands.add("i_verify_mail_successfully_received_using_the_API", (client_reference) => {
    cy.get('@bag').then((bag) => {
        cy.wait(15000)
        let client = bag.data.clients[client_reference];
        let email = client.email;
        let inboxes = client.inboxes;
        cy.GETNADA_API_retrieve_mail(inboxes, email).then((response) => {

            expect(response.body.msgs[0].s).to.be.equal(client.subject)
            let uid = response.body.msgs[0].uid;
            let messages = client.messages
            cy.GETNADA_API_retrieve_mail(messages, uid).then((response)=> {
                expect(response.body).to.contain(client.mail_content);
            });
            let delete_url = client.delete ;
            cy.GETNADA_API_delete_mail(delete_url,uid);
        });
    });
});

Then("Je vérifie l'afficage du block livraison à domicile", () => {cy.i_verify_block_displayed_in_home_delivery();})
Cypress.Commands.add('i_verify_block_displayed_in_home_delivery', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.cart.option_title.should('contain',bag.data.block.delivery);
    })
});

Then("Je vérifie le produit {string} dans le block", (product_reference) => {cy.i_verify_product_in_block(product_reference);})
Cypress.Commands.add('i_verify_product_in_block', (product_reference) => {
    cy.get("@bag").then((bag) => {
        let product = bag.data.products[product_reference];
        bag.pages.cart.product_in_block(product.id).should('exist');
    });
});

Then("Je vérifie que la méthode de livraison est bien livraison à domicile", () => {cy.i_verify_home_delivery_option_is_checked();})
Cypress.Commands.add('i_verify_home_delivery_option_is_checked',() => {
    cy.get("@bag").then((bag) => { 
       bag.pages.cart.checkbox_home_delivery.invoke('show').should('exist');
    })
})

Then("Je vérifie l'affichage du block click and collect", () => {cy.i_verify_block_displayed_in_click_and_collect();})
Cypress.Commands.add('i_verify_block_displayed_in_click_and_collect', () => {
    cy.get("@bag").then((bag) => {
        bag.pages.cart.option_title.should('contain',bag.data.block.click_and_collect);
    })
});

Then("Je vérifie que la méthode de livraison est bien click and collect", () => {cy.i_verify_click_and_collect_option_is_checked();})
Cypress.Commands.add('i_verify_click_and_collect_option_is_checked',() => {
    cy.get("@bag").then((bag) => {
        bag.pages.cart.checkbox_click_and_collect.invoke('show').should('exist');
    })
})