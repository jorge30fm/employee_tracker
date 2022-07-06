const inquirer = require('inquirer');
const express = require('express')
const mysql = require('mysql2')
const {getDepartments,
        addDepartment,
        deleteDepartment,
        getBudget} = require('./departments');
const {getRoles, addRole} = require('./roles');
const {getEmployees,
        addEmployee,
        updateEmployeeManager,
        deleteEmployee} = require('./employees');
const db = require('./db/connection');

