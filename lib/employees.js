const db = require('../db/connection');

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
                        res.status(500).json({
                                error: err.message
                        });
                        return;
                }
                console.table(rows)
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
                        res.status(400).json({
                                error: err.message
                        });
                        return;
                }
                console.log('Employee added to database')
        });
}

function updateEmployeeManager(id, manager_id) {
        const sql =`UPDATE employees SET manager_id = ? WHERE id = ?`
        const params = [manager_id, id];
        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: err.message
                        });
                } else if (!result.affectedRows) {
                        console.log('Employee not found')
                } else {
                        console.log("Emplyee's manager updated")
                }
        });
}
function deleteEmployee(id) {
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
                        res.status(400).json({error: res.message});
                } else if (!result.affectedRows) {
                        console.log('Department not found');
                } else {
                        console.log('Employee deleted from database')
                }
        });
}

module.exports = {
        getEmployees,
        addEmployee,
        updateEmployeeManager,
        deleteEmployee
}