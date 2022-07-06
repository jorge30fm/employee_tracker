const db = require('../db/connection');

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
                        res.status(500).json({ error: err.message });
                        return;
                }
                console.table(rows);
        });
}

function addRole(title, salary, department_id) {
        const sql =`
        INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?)`;
        const params = [title, salary, department_id];

        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json( {error: err.message});
                        return;
                }
               console.log(title + ' role added')
               console.table(result);
        });
}

module.exports = {
        getRoles,
        addRole
}