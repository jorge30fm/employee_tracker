INSERT INTO departments (department_name)
VALUES
        ('Human Resources'),
        ('Accounting'),
        ('Sales');


INSERT INTO managers (manager_name)
VALUES
        ('Michael Scott'),
        ('Charles Minor'),
        ('David Wallace');

INSERT INTO roles (title, salary, department_id)
VALUES
        ('HR Rep', 56000, 1),
        ('Lead Accountant', 60000, 2),
        ('Lead Salesman', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ('Toby', 'Flenderson', 1, 3),
        ('Kelvin', 'Malone', 2, 1),
        ('Dwight', 'Schrute', 3, 2);