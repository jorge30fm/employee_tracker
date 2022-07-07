const inquirer = require('inquirer');
const express = require('express')
const mysql = require('mysql2')
const {getDepartments,
        addDepartment,
        deleteDepartment,
        getBudget} = require('./departments');
const {getRoles, addRole, deleteRole} = require('./roles');
const {getEmployees,
        addEmployee,
        getEmplbyMan,
        updateEmplRole,
        updateEmplMan,
        deleteEmplByDep,
        deleteEmpl} = require('./employees');


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const employeesPrompt = () => {
        return  inquirer.prompt({
                type: 'list',
                pageSize: 7,
                name: 'emmployeesMenu',
                message: "What would you like to do:",
                choices: [
                "View all employees.",
                "View employees by manager",
                "Add a new employee.",
                "Update an employee's role.",
                "Update an employee's manager",
                "Delete an employee",
                "Delete employees by department"
                ]
        })
};
const departmentsPrompt = () => {
        return inquirer.prompt({
                type: 'list',
                name: 'departmentsMenu',
                message: "What would you like to do:",
                choices: [
                        "View all departments.",
                        "Add a new department.",
                        "Delete a department",
                        "View total utilized budget of a department"
                ]
        })
};
const rolesPrompt = () => {
        return inquirer.prompt({
                type: 'list',
                name: 'rolesMenu',
                message: "What would you like to do:",
                choices: [
                        "View all roles.",
                        "Delete a role",
                        "Add a new role."
                ]
        })
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputDepName = () => {
        return inquirer.prompt({
                type: 'input',
                name: 'depName',
                message: "Enter the department's name"
        })
};
const inputDepID = () => {
        return inquirer.prompt({
                type: 'input',
                name: 'depID',
                message: "Enter the department's ID"
        })
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputEmplInfo = () => {
        return inquirer.prompt([
                {
                type: 'input',
                name: 'first_name',
                message: "Enter employee's first name: "
                },
                {
                type: 'input',
                name: 'last_name',
                message: "Enter employee's last name: "
                },
                {
                type: 'input',
                name: 'role_id',
                message: "Enter employee's role ID: "
                },
                {
                type: 'input',
                name: 'man_id',
                message: "Enter the employee's manager's ID: "
                }
        ])
};
const inputManID = () => {
        return inquirer.prompt(
                {
                type: 'input',
                name: 'man_ID',
                message: "Enter manager's ID: "
                }
        )
};
const inputEmplID= () => {
        return inquirer.prompt({
                type:'input',
                name: 'empl_id',
                message: "Enter the employee's ID: "
        })
};
const inputEmplIdAndManId =() => {
        return inquirer.prompt([
                {
                        type:'input',
                        name: 'empl_id',
                        message: "Enter the employee's ID: "
                },
                {
                        type: 'input',
                        name: 'man_ID',
                        message: "Enter manager's ID: "
                }
        ]);
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputRoleID = () => {
        return inquirer.prompt({
                type: 'input',
                name: 'role_id',
                message: "Enter the ID of the employee's new role: "
        })
};
const inputRoleIdAndEmplID = () => {
        return inquirer.prompt([
                {
                type:'input',
                name: 'empl_id',
                message: "Enter the employee's ID: "
                },
                {
                type: 'input',
                name: 'role_id',
                message: "Enter the ID of the employee's new role: "
                }])
};
const inputRoleInfo = () => {
        return inquirer.prompt([
                {
                        type: 'input',
                        name: 'title',
                        message: "Enter role's title: "
                },
                {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter a salary for this role'
                },
                {
                        type: 'input',
                        name: 'deparment_id',
                        message: "Enter the deparment ID for this role: "
                }
        ])
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const line = '______________________________________________________';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const  menu = () => {
        return inquirer.prompt({
                type: 'list',
                pageSize: 15,
                name: 'Option_selected',
                message:'Select action to take:',
                choices: [
                        "View and edit employees",
                        "View and edit departments",
                        "View and edit roles",
                        "Exit application"
                ]
        })
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function emplMenu(option) {
        switch(option) {
                case "View all employees.":
                        console.log(line);
                        getEmployees();
                        break;
                case "View employees by manager":
                        console.log(line);
                        inputManID().then(({man_ID}) => {
                                getEmplbyMan(man_ID)
                        });
                        break;
                case "Add a new employee.":
                        console.log(line);
                        inputEmplInfo().then(({first_name, last_name, role_id, man_id}) => {
                                addEmployee(first_name, last_name, role_id, man_id)
                        });
                        break;
                case "Update an employee's role.":
                        console.log(line);
                        inputRoleIdAndEmplID().then(({empl_id, role_id}) => {
                                updateEmplRole(empl_id, role_id);
                        });
                        break;
                case "Update an employee's manager":
                        console.log(line);
                        inputEmplIdAndManId().then(({empl_id, man_id}) => {
                                updateEmplMan(empl_id, man_id);
                        });
                        break;
                case "Delete an employee":
                        console.log(line);
                        inputEmplID().then(({empl_id}) => {deleteEmpl(empl_id)});
                        break;
                case "Delete employees by department":
                        console.log(line);
                        inputDepID().then(({depID}) => {
                                deleteEmplByDep(depID)
                        });
                        break;
        }
}
async function depMenu(option) {
        switch(option){
                case "View all departments.":
                        console.log(line);
                        getDepartments();
                        break;
                case "Add a new department.":
                        console.log(line);
                        inputDepName().then(({depName})=>{
                                addDepartment(depName);
                        });
                        break;
                case "Delete a department":
                        console.log(line);
                        inputDepID().then(({depID}) =>{
                                deleteDepartment(depID);
                        });
                        break;
                case "View total utilized budget of a department":
                        console.log(line);
                        inputDepID(),then(({depID}) => {
                                deleteDepartment(depID);
                        });
                        break;
        }
}
async function rolMenu(option) {
        switch(option) {
                case "View all roles.":
                        console.log(line);
                        getRoles();
                        break;
                case "Delete a role":
                        console.log(line);
                        inputRoleID().then(({role_id}) => {
                                deleteRole(role_id)
                        });
                        break;
                case "Add a new role.":
                        console.log(line);
                        inputRoleInfo().then(({title, salary, department_ID})=>
                        addRole(title, salary, department_ID));
                        break;
        }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
menu().then(({Option_selected}) =>{
        switch (Option_selected) {
                case "View and edit employees":
                        console.log(line);
                        employeesPrompt().then(({employeesMenu}) =>{
                                emplMenu(employeesMenu);
                        })
                        break;
                case "View and edit departments":
                        console.log(line);
                        departmentsPrompt().then(({departmentsMenu})=>{
                                depMenu(departmentsMenu);
                        })
                        break;
                case "View and edit roles":
                        console.log(line);
                        rolesPrompt().then(({rolesMenu}) => {
                                rolMenu(rolesMenu);
                        })
                        break;
                case "Exit application":
                        break;

        }
})




