Feature: OrangeHRM authentication
  As an OrangeHRM user
  I want to login with valid credentials
  So that I can access the employee dashboard

@smoke
  Scenario: Login with a valid credentials
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    Then The dashboard is displayed

  Scenario Outline: login is rejected when credentials are missing
    Given User navigates to OrangeHRM login page
    When User submit the login with username "<username>" and password "<password>"
    Then User should remain on the login page
    And User should see required-field message is displayed

    Examples:
      | username | password |
      |          |          |
      | Admin    |          | 
      |          | admin123 |

@smoke
  Scenario Outline: Login with an invalid credentials
    Given User navigates to OrangeHRM login page
    When User submit the login with username "<username>" and password "<password>"
    Then User should remain on the login page
    And Invalid credentials error message is displayed 

      Examples:
      | username | password | 
      | Erroruser  | Errorpass | 