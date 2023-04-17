import homePage from "../src/pages/homePage";

describe('Feature name', () => {
    beforeEach(() => {
        cy.fixture("dataset.json").then((dataset) => {
            cy.fixture("environment.json").then((env) => {
                var initial_bag = {
                    environment: env,
                    data: dataset,
                    pages: {
                        "home": new homePage()
                    }
                };
                cy.wrap(initial_bag).as('bag');
            });
        });
    });

    it('Scenario name', () => {
        cy.a_step_name();
    })
})