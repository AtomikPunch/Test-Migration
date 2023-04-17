import cartPage from "../src/pages/cartPage";
import headerPage from "../src/pages/headerPage";
import loginPage from "../src/pages/loginPage";
import creationAccountPage from "../src/pages/creationAccountPage";


describe('Create and connect to account jardiland', () => {
    beforeEach(() => {
        cy.fixture("dataset.json").then((dataset) => {
            cy.fixture("environment.json").then((env) => {
                var initial_bag = {
                    environment: env,
                    data: dataset,
                    pages: {
                        "header": new headerPage(),
                        "login": new loginPage(),
                        "creationAccount": new creationAccountPage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    it('Create account by header page', () => {
        cy.i_access_to_the_webstorefront();
        cy.i_accept_the_cookies();
        cy.i_create_account_user('client01');
    })

    it('Login by header page', () => {
        cy.i_access_to_the_webstorefront();
        cy.i_accept_the_cookies();
        cy.i_log_in_with_user('client02');
    })

})