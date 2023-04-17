// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '../support/action/loginAction';
import '../support/action/headerAction';
import '../support/action/cartAction';
import '../support/action/productAction';
import '../support/action/categoryAction';
import '../support/action/deliveryAction';
import '../support/action/paymentAction';
import '../support/action/navigateAction';
import '../support/action/creationAccountAction';

function convertPriceToString(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price).replace(/\u00a0/g, " ");
}

Cypress.Commands.add('convertPriceToString', (price) => {
    return cy.wrap(convertPriceToString(price));
})

Cypress.Commands.overwrite('log', (subject, message) => {
    cy.task('log', message)
});
