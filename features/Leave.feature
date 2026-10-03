Feature: Feature name

@Sanity
Scenario Outline: Create a new Leave Type and assert that the Leave Type is created successfully.

    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to Leave Page   
    Then Click on Configure Tab 
    And click on Leave types Tab
    Then Click on Add button and assert the Add Leave Type tab is displayed
    When Fill the Leave Type details with "<leavename>" and save button 
    And Assert successfully saved message is displayed

Examples:
      | leavename |
      | Maternity4563 Leave |


@Sanity2
Scenario Outline: Create an existing Leave Type and assert that Already exists message is displayed.

    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to Leave Page   
    Then Click on Configure Tab 
    And click on Leave types Tab
    Then Click on Add button and assert the Add Leave Type tab is displayed
    When Fill the Leave Type details with "<leavename>" and save button 
    And Assert that "Already exists" message is displayed
    
Examples:
      | leavename |
      | CAN - Bereavement   |