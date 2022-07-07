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
                        console.log('Error: ' + err)
                        return;
                }
                console.table(rows);
                return;
        });
}
function deleteRole(role_id){
        const sql = `
        DELETE FROM roles WHERE id = ?`;
        const params = [role_id];
        db.query(sql, params, (err, res) => {
                if (err) {
                        console.log('Error: ' + err);
                        return;
                } else {
                        console.log('Role deleted!')
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
                        console.log('Error: ' + err)
                        return;
                }
               console.log(title + ' role added')
               return;
        });
}

module.exports = {
        getRoles,
        addRole,
        deleteRole
}