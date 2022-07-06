// const inquirer = require('inquirer')


function getDepartments() {
        fetch('/api/departments', {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                },
        }) .then(response => {console.log(response)});
    }

module.exports = {getDepartments}