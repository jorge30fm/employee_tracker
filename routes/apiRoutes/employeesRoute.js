const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//GET ALL employees: employee id, name, last name, role, salaries, manager
router.get('/employees', (req, res) => {
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
                        res.status(500).json({
                                error: err.message
                        });
                        return;
                }
                res.json({
                        message: 'success',
                        EMPLOYEES: rows
                });
        });
});

//GET employee by manager
router.get('/employees/manager/:manager_id', (req, res) =>{
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
        const params = [req.params.manager_id];
        db.query(sql, params, (err, row) => {
                if (err) {
                        res.status(400).json({ error:err.message});
                }
                res.json({
                        message: 'success',
                        EMPLOYEES: row
                });
        });
});
//POST single employee
router.post('/employees',({body}, res) => {
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
                body.first_name,
                body.last_name,
                body.role_id,
                body.manager_id
        ];
        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: err.message
                        });
                        return;
                }
                res.json({
                        message: 'success',
                        employees: body
                });
        });
});
//UPDATE employee role
router.put('/employee/role/:id', (req, res) => {
        const sql =`UPDATE employees SET role_id = ? WHERE id = ?`
        const params = [req.body.role_id, req.params.id];
        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: err.message
                        });
                } else if (!result.affectedRows) {
                        res.json({
                                message: 'Employee not found'
                        });
                } else {
                        res.json({
                                message: 'success', employee: req.body,
                                changes: result.affectedRows
                        });
                }
        });
});
//UPDATE employee manager
router.put('/employee/manager/:id', (req, res) => {
        const sql =`UPDATE employees SET manager_id = ? WHERE id = ?`
        const params = [req.body.manager_id, req.params.id];
        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: err.message
                        });
                } else if (!result.affectedRows) {
                        res.json({
                                message: 'Employee not found'
                        });
                } else {
                        res.json({
                                message: 'success', employee: req.body,
                                changes: result.affectedRows
                        });
                }
        });
});

//DELETE employee by deparment
router.delete('/employees/department/:id', (req, res) => {
        const sql = `
        DELETE FROM employees
        WHERE EXISTS
                (SELECT *
                FROM roles
                WHERE roles.id = employees.role_id
                AND roles.department_id = ?)
        `;
        const params = [req.params.id];
        db.query(sql, params, (err, result) => {
                if(err) {
                        res.status(400).json({error: res.message});
                } else if (!result.affectedRows) {
                        res.json({
                                message: 'Department not found'
                        });
                } else {
                        res.json({
                                message: 'deleted',
                                changes: result.affectedRows,
                                department_id: req.params.id
                        });
                }
        });
});



module.exports = router;
