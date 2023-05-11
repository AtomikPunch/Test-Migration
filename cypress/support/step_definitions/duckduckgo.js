const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("I visit duckduckgo.com", () => {
  cy.get("@bag").then((bag) => {
    cy.visit(bag.environment.start_url);
  })
});

Then("I should see a search bar", () => {
  cy.get("@bag").then((bag) => {
  bag.pages.test.search_bar.should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
})
  assert.deepEqual({}, {});
});

Then("I search something", () => {
  cy.get("@bag").then((bag) => {
    bag.pages.test.search_input.type("test").type("{enter}");
  });
})
