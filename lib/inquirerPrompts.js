const inquirer = require('inquirer');

const employeesPrompt = () => {
        return  inquirer.prompt({
                type: 'list',
                name: 'employeesMenu',
                message: "What would you like to do: ",
                choices: [
                "View all employees.",
                "View employees by manager.",
                "Add a new employee.",
                "Update an employee's role.",
                "Update an employee's manager.",
                "Delete an employee.",
                "Delete employees by department."
                ]
        })
};
const departmentsPrompt = () => {
        return inquirer.prompt({
                type: 'list',
                name: 'departmentsMenu',
                message: "What would you like to do: ",
                choices: [
                        "View all departments.",
                        "Add a new department.",
                        "Delete a department.",
                        "View total utilized budget of a department."
                ]
        })
};
const rolesPrompt = () => {
        return inquirer.prompt({
                type: 'list',
                name: 'rolesMenu',
                message: "What would you like to do: ",
                choices: [
                        "View all roles.",
                        "Delete a role.",
                        "Add a new role."
                ]
        })
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputDepName = () => {
        return inquirer.prompt({
                type: 'input',
                name: 'depName',
                message: "Enter the department's name: ",
                validate: nameInput => {
                        if (nameInput) {
                                return true;
                        } else {
                                console.log(' Deparment name required. Try again.');
                                return false;
                        }
                }
        })
};
const inputDepID = () => {
        return inquirer.prompt({
                type: 'number',
                name: 'depID',
                message: "Enter the department's ID: ",
                validate: idInput => {
                        if (idInput) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.');
                                return false
                        }
                }
        })
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputEmplInfo = () => {
        return inquirer.prompt([
                {
                type: 'input',
                name: 'first_name',
                message: "Enter employee's first name: ",
                validate: firstName => {
                        if (firstName) {
                                return true;
                        } else {
                                console.log(' First name required. Try again.')
                                return false
                        }
                }
                },
                {
                type: 'input',
                name: 'last_name',
                message: "Enter employee's last name: ",
                validate: lastName => {
                        if (lastName) {
                                return true;
                        } else {
                                console.log(' Last name required. Try again.')
                                return false
                        }
                }
                },
                {
                type: 'number',
                name: 'role_id',
                message: "Enter employee's role ID: ",
                validate: Id => {
                        if (Id) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
                },
                {
                type: 'number',
                name: 'man_id',
                message: "Enter the employee's manager's ID: ",
                validate: manId => {
                        if (manId) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
                }
        ])
};
const inputManID = () => {
        return inquirer.prompt(
                {
                type: 'number',
                name: 'man_ID',
                message: "Enter manager's ID: ",
                validate: manId => {
                        if (manId) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
                }
        )
};
const inputEmplID= () => {
        return inquirer.prompt({
                type:'number',
                name: 'empl_id',
                message: "Enter the employee's ID: ",
                validate: emplID => {
                        if (emplID) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
        })
};
const inputEmplIdAndManId =() => {
        return inquirer.prompt([
                {
                        type: 'number',
                        name: 'man_ID',
                        message: "Enter manager's ID: ",
                        validate: manID => {
                                if (manID) {
                                        return true;
                                } else {
                                        console.log(' Numerical ID required. Try again.')
                                        return false
                                }
                        }
                },
                {
                        type:'number',
                        name: 'empl_id',
                        message: "Enter the employee's ID: ",
                        validate: emplID => {
                                if (emplID) {
                                        return true;
                                } else {
                                        console.log(' Numerical ID required.Try again')
                                        return false
                                }
                        }
                }

        ]);
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputRoleID = () => {
        return inquirer.prompt({
                type: 'number',
                name: 'role_id',
                message: "Enter the ID of the role ID: ",
                validate: ID => {
                        if (ID) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
        })
};
const inputRoleIdAndEmplID = () => {
        return inquirer.prompt([
                {
                type:'number',
                name: 'empl_id',
                message: "Enter the employee's ID: ",
                validate: ID => {
                        if (ID) {
                                return true;
                        } else {
                                console.log(' Numerical ID required. Try again.')
                                return false
                        }
                }
                },
                {
                type: 'input',
                name: 'role_id',
                message: "Enter the ID of the employee's new role: ",
                validate: ID => {
                        if (ID) {
                                return true;
                        } else {
                                console.log('ID required. Try again.')
                                return false
                        }
                }
                }])
};
const inputRoleInfo = () => {
        return inquirer.prompt([
                {
                        type: 'input',
                        name: 'title',
                        message: "Enter role's title: ",
                        validate: title => {
                                if (title) {
                                        return true;
                                } else {
                                        console.log(' Role title required. Try again.')
                                        return false
                                }
                        }
                },
                {
                        type: 'number',
                        name: 'salary',
                        message: 'Enter a salary for this role: ',
                        validate: salary => {
                                if (salary) {
                                        return true;
                                } else {
                                        console.log('Role salary required. Please enter a number and try again.')
                                        return false
                                }
                        }
                },
                {
                        type: 'number',
                        name: 'deparment_id',
                        message: "Enter the deparment ID for this role: ",
                        validate: ID => {
                                if (ID) {
                                        return true;
                                } else {
                                        console.log(' Numerical ID required. Try again.')
                                        return false
                                }
                        }
                }
        ])
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const  menu = () => {
        return inquirer.prompt({
                type: 'list',
                name: 'Option_selected',
                message:'Select action to take: ',
                choices: [
                        "View and edit employees.",
                        "View and edit departments.",
                        "View and edit roles.",
                        "Exit application."
                ]
        })
};

module.exports = {
        employeesPrompt,
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
        menu
}