Feature: 

 @Regression
    Scenario Outline: Login and search for an existing employee in the Employee List page.
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to PIM Page 
    Then Check that the PIM url is displayed
    Then Click on Employee List Tab
    And Search with an existing employee name "<employeename>" in the Employee List 
    Then Check that the search results matchs the entered employee value "<employeename>"
   #  And Click on the corresponding table to see the employee details

 Examples:
      | employeename |
      | hugo hernandez |   

@smoke
 Scenario Outline: Login and search for an non-existing employee in the Employee List page.
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to PIM Page 
    Then Check that the PIM url is displayed
    Then Click on Employee List Tab
    And Search with non-existing employee name "<employeename>" in the Employee List
    Then No records found message is displayed in the search results

    Examples:
      | employeename |
      | aaaaa |  

@Sanity
Scenario Outline: Create a new employee and verify it is displayed in the Employee List page.
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to PIM Page 
    Then Check that the PIM url is displayed
    Then Click on Employee List Tab
    And Click on Add Employee button and assert the Add Employee tab is selected
    When Fill the employee details "<firstname>" and "<lastname>" and "<employeeId>" and click on Save button
    Then Click on Employee List Tab
    And Search with an existing employee name "<firstname>" in the Employee List 
    Then Check that the search results matchs the entered employee value "<employeename>"

    Examples:
      | firstname | lastname | employeeId |employeename|
      | Omar | Doe | 12345 | Omar Doe |