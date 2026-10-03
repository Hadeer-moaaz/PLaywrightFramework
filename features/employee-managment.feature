Feature: 
@Regression
Scenario Outline: Create a new employee and search for it in the Employee List page then delete all the records in the Employee List page.
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to PIM Page 
    Then Check that the PIM url is displayed
    Then Click on Employee List Tab
    And Click on Add Employee button and assert the Add Employee tab is selected
    When Fill the employee details "<firstname>" and "<lastname>" and "<employeeId>" and click on Save button
    Then Click on Employee List Tab
    And Search with an existing employee name "<employeename>" in the Employee List 
    Then Check that the search results matchs the entered employee value "<firstname>"
    When Click on Reset button
    Then Verify that the employee name search field is cleared
    And Print all the Records count in the Employee List page after Reset button is clicked
    Then User deletes all records in the Employee List page
    And Assert that successfully deleted message is displayed in the Employee List page

    Examples:
      | firstname | lastname | employeeId |employeename|
      | David|  Omar|  5343|  David Omar| 

@Regression2
 Scenario Outline: Search for an non-existing employee in the Employee List page.
    Given User navigates to OrangeHRM login page
    When User login with a valid credentials
    When User navigates to PIM Page 
    Then Check that the PIM url is displayed
    Then Click on Employee List Tab
    And Search with non-existing employee name "<employeename2>" in the Employee List
    Then No records found message is displayed in the search results
    

    Examples:
      | employeename2 |
      | Dora |  

