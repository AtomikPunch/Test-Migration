const { homePage } = require('../../../src/pages/homePage');
const { commonsPage } = require('../../../src/pages/commonsPage');
const { signonPage } = require('../../../src/pages/signonPage');
const { productPage } = require('../../../src/pages/productPage');
const { cartPage } = require('../../../src/pages/cartPage');
const { accountPage } = require('../../../src/pages/accountPage');
const { deliveryPage } = require('../../../src/pages/deliveryPage');
const { paymentPage } = require('../../../src/pages/paymentPage');
const { listPage } = require('../../../src/pages/listPage');

beforeEach(() => {
  cy.log("This will run before every scenario");
  cy.fixture("dataset.json").then((dataset) => {
    cy.fixture("environment.json").then((env) => {
        var initial_bag = {
            environment: env,
            data: dataset,
            pages : {
              "commons": new commonsPage(),
              "home": new homePage(),
              "signon": new signonPage(),
              "product": new productPage(),
              "cart": new cartPage(),
              "account": new accountPage(),
              "delivery": new deliveryPage(),
              "payment": new paymentPage(),
              "list": new listPage()
            }
        };
        cy.wrap(initial_bag).as('bag');
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

});


