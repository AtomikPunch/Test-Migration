@All @Account
Feature: Account

  @AC01
  Scenario: I can log-in with an existing account from the header
    Given I access to the webstore
    Then I access to the login page
    Then I fill the login form "existing_client"
    Then I submit the login form 
    When I should be loggedin
