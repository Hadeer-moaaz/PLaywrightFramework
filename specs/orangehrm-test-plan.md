# OrangeHRM Open-Source Demo Test Plan

## Application Overview

Test plan for the OrangeHRM Open Source demo (OS 5.9) at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. Exploration confirmed the public demo credentials Admin/admin123, required-field feedback for blank login and employee creation, a Dashboard with module navigation, and PIM, Leave, and Admin list workflows. Use a fresh browser context per scenario and the published demo account unless stated otherwise. Demo records are shared and may change; use unique data for creation tests and remove created records during cleanup when permitted.

## Test Scenarios

### 1. Authentication and Dashboard

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login rejects empty credentials

**File:** `tests/authentication/login-empty.spec.ts`

**Steps:**
  1. Start from the OrangeHRM login page in a fresh browser context. Leave Username and Password empty, then select Login.
    - expect: The user remains on the login page and is not authenticated.
    - expect: Required-field feedback is displayed for the missing credentials; no dashboard content is shown.
  2. Enter a username but leave Password empty, then select Login.
    - expect: Authentication is blocked and the user remains on the login page.
    - expect: Password receives required-field feedback.

#### 1.2. Invalid credentials do not authenticate

**File:** `tests/authentication/login-invalid.spec.ts`

**Steps:**
  1. From a fresh login page, enter a nonexistent username and an incorrect password, then select Login.
    - expect: The user remains on the login page.
    - expect: An authentication error is displayed and no authenticated navigation or dashboard is available.
  2. Replace the values with the published demo username and an incorrect password, then submit again.
    - expect: Authentication remains blocked and an error is displayed without exposing account details.

#### 1.3. Valid demo login opens dashboard and logout ends session

**File:** `tests/authentication/login-success-logout.spec.ts`

**Steps:**
  1. From a fresh login page, enter username Admin and password admin123, then select Login.
    - expect: The browser navigates to the authenticated Dashboard.
    - expect: The signed-in demo user and dashboard widgets are visible.
    - expect: The side navigation exposes the main modules, including Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz.
  2. Open the signed-in user menu and select Logout.
    - expect: The user is returned to the login page.
    - expect: Protected pages are no longer accessible without signing in again.

### 2. PIM Employee Management

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search and reset employee list filters

**File:** `tests/pim/employee-search-reset.spec.ts`

**Steps:**
  1. login and open PIM > Employee List.
    - expect: Employee Information filters and the employee results table are visible.
  2. Search using a known employee name or ID available in the current demo data.
    - expect: Search results match the entered employee criteria and the table reports the corresponding result count.
  3. Search using a distinctive value that does not match any employee.
    - expect: The page shows zero matching records and no unrelated employee rows.
  4. Select Reset.
    - expect: All filter controls return to their defaults and the unfiltered employee list is restored.

#### 2.2. Add employee validates required name fields

**File:** `tests/pim/add-employee-required-fields.spec.ts`

**Steps:**
  1. Sign in and open PIM > Add Employee.
    - expect: The Add Employee form shows First Name, Middle Name, Last Name, Employee Id, a Create Login Details option, and Save/Cancel actions.
  2. Leave First Name and Last Name empty and select Save.
    - expect: The form remains open and Required feedback is shown for First Name and Last Name.
    - expect: No employee is created.
  3. Enter only First Name and submit while Last Name is empty.
    - expect: The form remains open and Last Name continues to show required-field feedback.
    - expect: No employee is created.

#### 2.3. Create and find an employee with unique test data

**File:** `tests/pim/add-and-find-employee.spec.ts`

**Steps:**
  1. Sign in with the demo account and open PIM > Add Employee. Generate a unique test name and enter First Name and Last Name; leave Create Login Details disabled unless the test explicitly covers account provisioning. Save the employee.
    - expect: The employee profile opens and displays the submitted name.
    - expect: The system assigns an Employee Id when one was not supplied, or retains a valid supplied ID.
  2. Return to Employee List and search for the unique test employee by name or assigned ID.
    - expect: Exactly the created employee is returned with the expected name and ID.
  3. Remove the test employee if the demo account permits deletion, or record the unique test identifier for cleanup.
    - expect: The temporary employee is removed when permitted; shared demo records unrelated to this test remain unchanged.

### 3. Leave Workflows

**Seed:** `tests/seed.spec.ts`

#### 3.1. Filter and reset Leave List

**File:** `tests/leave/leave-list-filter-reset.spec.ts`

**Steps:**
  1. Sign in with the demo account and open Leave > Leave List.
    - expect: The leave filters for From Date, To Date, status, leave type, employee name, and sub-unit are visible with Search and Reset actions.
    - expect: The list displays leave records and their dates, employee, type, days, status, comments, and available actions.
  2. Filter using a valid date range and a status such as Pending Approval, then select Search.
    - expect: Only records matching the selected range and status are shown.
    - expect: The record count agrees with the displayed matching rows.
  3. Use a date range with the end date earlier than the start date, then select Search.
    - expect: The form rejects or returns no matching records for the invalid range without showing unrelated leave entries.
    - expect: Any validation feedback is clear and the page remains usable.
  4. Select Reset.
    - expect: Date and selection filters return to their defaults and the unfiltered Leave List is restored.

#### 3.2. Apply leave validates and submits a valid request

**File:** `tests/leave/apply-leave.spec.ts`

**Steps:**
  1. Sign in with the demo account and open Leave > Apply.
    - expect: The leave application form is displayed with leave type, date selection, and submission controls.
  2. Submit without selecting a leave type or dates.
    - expect: The request is not submitted and required-field feedback identifies missing values.
  3. Select an available leave type, choose a valid future date range within the displayed balance, and submit.
    - expect: The request is accepted or a clear confirmation is displayed.
    - expect: The request appears in My Leave with the selected dates, leave type, number of days, and pending status.

### 4. Admin User Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. Search system users by username, role, and status

**File:** `tests/admin/system-user-search.spec.ts`

**Steps:**
  1. Sign in with the demo account and open Admin > User Management > System Users.
    - expect: Username, User Role, Employee Name, and Status filters are visible with Search and Reset actions.
    - expect: The system user table displays username, role, employee name, status, and row actions.
  2. Search for the Admin username using the username filter and select Search.
    - expect: The results include the Admin account and match the filter; unrelated usernames are excluded.
  3. Search for a combination that does not match any account.
    - expect: The table shows zero matching records without unrelated accounts.
  4. Select Reset.
    - expect: All filters return to their defaults and the full system-user result set is restored.
