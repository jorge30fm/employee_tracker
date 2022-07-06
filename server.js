
const express = require('express')
const mysql = require('mysql2')
const {getDepartments,
        addDepartment,
        deleteDepartment,
        getBudget} = require('./lib/departments');
const db = require('./db/connection');
const PORT= process.env.PORT || 3001;
const app = express();

//set up express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apir routes

//default response for not found requests
app.use((req, res) => {
        res.status(404).end();
});

//start server after connection to database
db.connect(err => {
        if (err) throw err;
        console.log('Database connected');
        app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
        });
});



