
Cypress.Commands.add('INVIVO_API_perform_GET', (route, token) => {
    cy.get('@bag').then((bag) => {
        cy.request({
            method: 'GET',
            url: bag.environment.api_url_prefix + route,
            headers: {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            }
        }).then((response) => {
            return cy.wrap(response);        
        });        
    });
})

Cypress.Commands.add('INVIVO_API_perform_DELETE', (route, token) => {
    cy.get('@bag').then((bag) => {
        cy.request({
            method: 'DELETE',
            url: bag.environment.api_url_prefix + route,
            headers: {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            }
        }).then((response) => {
            return cy.wrap(response);        
        });        
    });
})