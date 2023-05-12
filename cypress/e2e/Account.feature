@All @Account
Feature: Account

  @AC01
  Scenario: I can log-in with an existing account from the header
    Given I will use client "existing_client"
    Given I access to the webstore
    Then I access to the login page
    Then I fill the login form "last"
    Then I submit the login form 
    When I should be loggedin

  @AC03
  Scenario: I can create account from the header
    Given Generate email random "new_client"
    Given I will use client "new_client"
    Given I access to the webstore
    Then I access to the registration page
    Then I create a new account from header "last"
    When I should be loggedin