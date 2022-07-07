const db = require('../db/connection');

const getDepartments = () => {

        const sql =`SELECT * FROM departments`;

        db.query(sql, (err, rows) => {
                if (err) {
                        console.log('Error: ' + err);
                        return;
                } else {
                console.table(rows)
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
                        console.log('Error: ' + err);
                        return;
                }
                console.log(department_name + ' department added to the database!')
                return;
        });
}
function deleteDepartment(department_id){
        const sql = `DELETE FROM departments WHERE id = ?`;
        const params = department_id;

        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: res.message
                        });
                } else if (!result.affectedRows){
                        console.log('Department not found')
                } else {
                        console.log('Department deleted')
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
                        res.status(500).json({ error: res.message});
                        return;
                 } else if (!rows[0].total_budget) {
                        console.log('Department not found')
                        return;
                }
                console.table(rows)
        });
};
module.exports = {
        getDepartments,
        addDepartment,
        deleteDepartment,
        getBudget
}