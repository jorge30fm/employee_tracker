

# employee_tracker

<!-- View and manage:
        - departments
        - roles
        - employees -->


<!-- start application:
        TODO: Start Menu:
                * View all departments
                * View all roles
                * View all employees
                * Add department
                * add role
                * add employee
                * update employee role-->
<!-- TODO: View all departments
        * Table:
                * Department name
                * department Ids -->
<!-- TODO: View all roles
        * Table:
                * Job title
                * role id
                * Department for the role
                * salary-->
<!-- TODO: View all employees:
        * Table:
                * emplooyee data
                * employee ids
                * first name
                * last name
                * job title
                * salaries
                * managers employees report to-->
<!-- TODO: Add deparment:
        * Questions:
                * Enter name,
                * add department to database-->
<!-- TODO: Add role:
        *Questions:
                * Enter name
                * Enter salary
                * Enter department
                * add to database -->
<!-- TODO: Add employee:
        * Questions:
                * Enter first name
                * Enter last name
                * Enter role
                * Enter reporting manager
                * add to database-->
<!-- TODO: Update employee role:
        * Questions:
                * select employee
                * enter role to update to
                * save to database -->


<!-- DEPARTMENT
        - ID: INT PRIMARY KEY
        - NAME: VARCHAR(30) -->

<!-- ROLE
        - ID: INT PRIMARY KEY
        - TITLE: VARCHAR(30)
        - SALARY: DECIMAL
        - DEPARTMEMT_ID: INT-->

<!-- EMPLOYEE
        - ID: INT PRIMARY KEY
        - FIRST_NAME: VARCHAR(30)
        - LAST_NAME: VARCHAR(30)
        - ROLE_ID: INT
        - MANAGER_ID: INT -->

<!-- BONUS:
        - update employee manager
        - view employees by manager
        - delete employees by department
        - delete departments, roles, and eployees
        - view total utilized budget of a department (all salaries of employees) -->