import '../requesters/jardiland-requester';

Cypress.Commands.add('INVIVO_API_get_cart', (user) => {
    cy.get('@bag').then((bag) => {
        let store = bag.data.store[user.store];
        let route = '/v1/carts?storeSlugId=' + store.slug_id + '&storeId=' + store.store_id;
        let token = user.access_token;

        cy.INVIVO_API_perform_GET(route, token).then((response) => {
            if (response.status == '200')
                return cy.wrap(response.body);
            else if (response.status == '422')
                return cy.wrap(response.body.cart);       
        });        
    });
})

Cypress.Commands.add('INVIVO_API_remove_cart_line', (user, cart_id, cart_line) => {
    cy.get('@bag').then((bag) => {
        let store = bag.data.store[user.store];
        let route = '/v1/carts/' + cart_id + '/lines/' + cart_line.id + '?storeId=' + store.store_id;
        let token = user.access_token;

        cy.INVIVO_API_perform_DELETE(route, token).then((response) => {
            return cy.wrap(response.body);        
        });
    });
})

Cypress.Commands.add('GETNADA_API_retrieve_mail', (url ,value) => {
    cy.get('@bag').then((bag) => {
        let route = url + value;
        let remaining_tentative = 10;
        cy.API_GetNada_perform_GET(route).then((response) => {
            while(response.body.last == 0){
            if(response.body.last != '0'){
            return cy.wrap(response.body);
            }
            else{
                cy.log("no mail in inboxe");
            }
            cy.wait(3000);
            remaining_tentative --;
        }
        });
    });
});

Cypress.Commands.add('GETNADA_API_delete_mail',(url , uid) => {
    cy.get('@bag').then((bag) => {
        let route = url + uid;
        cy.API_GetNada_perform_DELETE(route).then((response) => {
            if(response.status == 201)
            {
                cy.log("mail deleted successfully")
            }
            else
            {
                cy.log("mail not deleted")
            }
        });
    });
})
