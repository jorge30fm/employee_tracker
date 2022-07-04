const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//GET ALL departments name and ID
router.get('/departments', (req, res) => {
        const sql =`SELECT * FROM departments`

        db.query(sql, (err, rows) => {
                if (err) {
                        res.status(500).json({
                                error: err.message
                        });
                        return;
                }
                res.json({
                        message: 'success',
                        DEPARTMENTS: rows
                });
        });
});
//POST a department
router.post('/departments', ({body}, res) => {
        const sql = `
                INSERT INTO departments (department_name)
                VALUES (?)`;
        const params = [body.department_name];

        db.query(sql, params, (err, result) => {
                if (err){
                        res.status(400).json({
                                error: err.message
                        });
                        return;
                }
                res.json({
                        message: 'success',
                        newDepartment: body
                });
        });
});

//DELETE deparment
router.delete('/department/:id', (req, res) => {
        const sql = `DELETE FROM departments WHERE id = ?`;
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({
                                error: res.message
                        });
                } else if (!result.affectedRows){
                        res.json({
                                message: 'Department not found'
                        });
                } else{
                        res.json({
                                message: 'deleted',
                                changes: result.affectedRows,
                                id: req.params.id
                        });
                }
        });
});

module.exports = router;
