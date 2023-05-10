//https://getnada.com/api/v1/inboxes/ + mail
//https://getnada.com/api/v1/messages/ + uid 


Cypress.Commands.add('API_getnada', (client_reference) =>{
    cy.wait(10000);
    cy.get('@bag').then((bag) =>{
        let client = bag.data.clients[client_reference];
        cy.request({
            method: 'GET',
            url: 'https://getnada.com/api/v1/inboxes/' + client.email,
            
        }).then((response) => {
            const subject = response.body.msgs[0].s;
            const sender = response.body.msgs[0].fe;
            expect(subject).to.be.equal(client.subject);
            expect(sender).to.be.equal(client.sender);
            const uid = response.body.msgs[0].uid;
            client.uid = uid; // add what we've just found in the bag
            cy.wrap(bag).as('bag');//wrap the bag to save the new values
        })
    });
})


Cypress.Commands.add('API_delete_mail', (client_reference) => {
    cy.get('@bag').then((bag) =>{
        let client = bag.data.clients[client_reference];
        cy.request({
            method: 'DELETE',
            url: 'https://getnada.com/api/v1/messages/' + client.uid,
        });
    });
})
