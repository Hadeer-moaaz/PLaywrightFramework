Feature: OrangeHRM authentication
  As an OrangeHRM user
  I want to sign in with valid credentials
  So that I can access the employee dashboard

  @smoke @regression
  Scenario: Sign in with the valid demo account
    Given I am on the OrangeHRM login page
    When I sign in with the valid demo account
    Then I should see the dashboard

  @regression
  Scenario Outline: Reject login when credentials are missing
    Given I am on the OrangeHRM login page
    When I submit the login form with username "<username>" and password "<password>"
    Then I should remain on the login page
    And I should see <requiredCount> required-field messages

    Examples:
      | username | password | requiredCount |
      |          |          | 2             |
      | Admin    |          | 1             |
      |          | admin123 | 1             |