const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const db = require('../db/connection');
const { employeesPrompt,
        departmentsPrompt,
        rolesPrompt,
        inputDepName,
        inputDepID,
        inputEmplInfo,
        inputManID,
        inputEmplID,
        inputEmplIdAndManId,
        inputRoleID,
        inputRoleIdAndEmplID,
        inputRoleInfo,
        menu} = require('./inquirerPrompts')
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getEmployees() {
        const sql = `
        SELECT
                employees.id,
                employees.first_name,
                employees.last_name,
                roles.title AS role,
                roles.salary,
                managers.manager_name AS manager
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN managers
        ON employees.manager_id = managers.id;
                `
        db.query(sql, (err, rows) => {
                if(err) {
                        console.log(err);
                        initializeApp();
                        return;
                }
                console.table(rows)
                initializeApp();
        });
}
function getEmplbyMan(man_id) {
        const sql = `
        SELECT
                employees.id,
                employees.first_name,
                employees.last_name,
                roles.title AS role,
                roles.salary
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        WHERE manager_id = ?
        `;
        const params = [man_id];
        db.query(sql, params, (err, rows) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                } else {
                console.table(rows);
                initializeApp();
                }
        });
}
function addEmployee(first_name, last_name, role_id, manager_id) {
        const sql = `
        INSERT INTO employees (
                first_name,
                last_name,
                role_id,
                manager_id
                )
        VALUES (?, ?, ?, ?)
        `;
        const params = [
                first_name,
                last_name,
                role_id,
                manager_id
        ];
        db.query(sql, params, (err, result) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else {
                console.log('Employee added to database')}
                initializeApp();
        });
}
function updateEmplRole(id, role_id) {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [role_id, id];
        db.query(sql, params, (err, res) => {
                if(err) {
                        console.log(err);
                        initializeApp();
                } else {
                console.log("Employee's role updated!")}
                initializeApp();
        })
}
function updateEmplMan(manager_id, id) {
        const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
        const params = [manager_id, id];
        db.query(sql, params, (err, result) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else if (!result.affectedRows) {
                        console.log('Employee not found')
                } else {
                        console.log("Emplyee's manager updated")
                        initializeApp();
                }
        });
}
function deleteEmplByDep(id) {
        const sql = `
        DELETE FROM employees
        WHERE EXISTS
                (SELECT *
                FROM roles
                WHERE roles.id = employees.role_id
                AND roles.department_id = ?)
        `;
        const params = [id];
        db.query(sql, params, (err, result) => {
                if(err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else if (!result.affectedRows) {
                        console.log('Department not found');
                } else {
                        console.log('Employee deleted from database')
                        initializeApp();
                }
        });
}
function deleteEmpl(id) {
        const sql =   `DELETE FROM employees WHERE id = ?`
        const params = id;
        db.query(sql, params, (err, res) => {
                if(err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else {
                        console.log('Employee deleted');
                        initializeApp();
                }
        })
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getDepartments = () => {

        const sql =`SELECT * FROM departments`;

        db.query(sql, (err, rows) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else {
                console.table(rows);
                initializeApp();
                }
        });
}
function addDepartment(department_name) {
        const sql = `
                INSERT INTO departments (department_name)
                VALUES (?)`;
        const params = [department_name];

        db.query(sql, params, (err, result) => {
                if (err){
                        console.log(err);
                        initializeApp();
                        return;
                }
                console.log(department_name + ' department added to the database!')
                initializeApp();
        });
}
function deleteDepartment(department_id){
        const sql = `DELETE FROM departments WHERE id = ?`;
        const params = department_id;

        db.query(sql, params, (err, result) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else if (!result.affectedRows){
                        console.log('Department not found')
                } else {
                        console.log('Department deleted');
                        initializeApp();
                }
        });
}
function getBudget(deparment_id) {
        const sql = `
        SELECT SUM( roles.salary) AS total_budget
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        WHERE roles.department_id = ?;
                `;
        const params =[deparment_id];
        db.query(sql, params, (err, rows) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                 } else if (!rows[0].total_budget) {
                        console.log('Department not found');
                        return;
                }
                console.table(rows);
                initializeApp();
        });
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getRoles() {
        const sql = `
        SELECT
                roles.id,
                roles.title,
                roles.salary,
                departments.department_name AS department
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id;
        `

        db.query(sql, (err, rows) => {
                if(err){
                        console.log(err);
                        initializeApp();
                        return;
                }
                console.table(rows);
                initializeApp();
        });
}
function deleteRole(role_id){
        const sql = `
        DELETE FROM roles WHERE id = ?`;
        const params = [role_id];
        db.query(sql, params, (err, res) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                } else {
                        console.log('Role deleted!');
                        initializeApp();
                }
        })
}
function addRole(title, salary, department_id) {
        const sql =`
        INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?)`;
        const params = [title, salary, department_id];

        db.query(sql, params, (err, result) => {
                if (err) {
                        console.log(err);
                        initializeApp();
                        return;
                }
               console.log(title + ' role added');
               initializeApp();
        });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function emplMenu(option) {
        switch(option) {
                case "View all employees.":
                        getEmployees();
                        break;
                case "View employees by manager.":
                        inputManID().then(({man_ID}) => {
                                getEmplbyMan(man_ID)
                        });
                        break;
                case "Add a new employee.":
                        inputEmplInfo().then(({first_name, last_name, role_id, man_id}) => {
                                addEmployee(first_name, last_name, role_id, man_id)
                        });
                        break;
                case "Update an employee's role.":
                        inputRoleIdAndEmplID().then(({empl_id, role_id}) => {
                                updateEmplRole(empl_id, role_id);
                        });
                        break;
                case "Update an employee's manager.":
                        inputEmplIdAndManId().then(({man_ID, empl_id,}) => {
                                updateEmplMan(man_ID, empl_id);
                        });
                        break;
                case "Delete an employee.":
                        inputEmplID().then(({empl_id}) => {deleteEmpl(empl_id)});
                        break;
                case "Delete employees by department.":
                        inputDepID().then(({depID}) => {
                                deleteEmplByDep(depID)
                        });
                        break;
        }
}
async function depMenu(option) {
        switch(option){
                case "View all departments.":
                        getDepartments();
                        break;
                case "Add a new department.":
                        inputDepName().then(({depName})=>{
                                addDepartment(depName);
                        });
                        break;
                case "Delete a department.":
                        inputDepID().then(({depID}) =>{
                                deleteDepartment(depID);
                        });
                        break;
                case "View total utilized budget of a department.":
                        inputDepID().then(({depID}) => {
                                getBudget(depID);
                        });
                        break;
        }
}
async function rolMenu(option) {
        switch(option) {
                case "View all roles.":
                        getRoles();
                        break;
                case "Delete a role.":
                        inputRoleID().then(({role_id}) => {
                                deleteRole(role_id)
                        });
                        break;
                case "Add a new role.":
                        inputRoleInfo().then(({title, salary, department_ID})=>
                        addRole(title, salary, department_ID));
                        break;
        }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const initializeApp = () => {
        menu().then(({Option_selected}) =>{
        switch (Option_selected) {
                case "View and edit employees.":
                        employeesPrompt().then(({employeesMenu}) =>{
                                emplMenu(employeesMenu)
                        })
                        break;
                case "View and edit departments.":
                        departmentsPrompt().then(({departmentsMenu})=>{
                                depMenu(departmentsMenu);
                        })
                        break;
                case "View and edit roles.":
                        rolesPrompt().then(({rolesMenu}) => {
                                rolMenu(rolesMenu);
                        })
                        break;
                case "Exit application.":
                        console.log('GoodBye');
                        break;

        }

        })
}
initializeApp()



