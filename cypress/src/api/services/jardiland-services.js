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

