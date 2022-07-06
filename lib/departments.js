// const inquirer = require('inquirer')


function getDepartments() {
        const  appURL = 'https://fathomless-oasis-68627.herokuapp.com/'

        fetch(appURL + '/api/departments', {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                },
        }) .then(response => {console.log(response)});
    }

module.exports = {getDepartments}