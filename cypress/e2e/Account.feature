@All @Account
Feature: Account

  @AC01
  Scenario: I can log-in with an existing account from the header
    Given I will use a client "with_existing_account"
    And I access to the webstore
    When I access to the login page
    And I fill the login form
    And I submit the login form 
    Then I should be loggedin

  @AC03
  Scenario: I can create account from the header
    Given I generate a random email for the client "without_account"
    And I will use a client "without_account"
    And I access to the webstore
    When I access to the registration page
    And I fill the account registration form
    And I submit the account registration form
    Then I should be loggedin

  @AC04
  Scenario: I can create account from checkout
    Given I generate a random email for the client "without_account"
    And I will use a client "without_account"
    And I access to the webstore
    And I access to the PDP of a product "available_in_delivery"
    And I choose the store "main_store" from header
    And I add the product to the cart selecting the home delivery offer
    And I continue shopping
    And I access to the cart from the header
    And I go to the checkout
    When I choose to register an account from the checkout
    And I fill the account registration form
    And I submit the account registration form