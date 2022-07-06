const db = require('./db/connection');
const express = require('express')
// const fetch = require('node-fetch');
const mysql = require('mysql2')
const apiRoutes = require('./routes/apiRoutes');
const Departments = require('./lib/departments');

const PORT= process.env.PORT || 3001;
const app = express();

//set up express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apir routes
app.use('/api', apiRoutes);

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

// function getDepartments() {
//         const  appURL = 'https://fathomless-oasis-68627.herokuapp.com'

//         fetch(appURL + '/api/departments', {
//                 method: 'GET',
//                 headers: {
//                         'Content-Type': 'application/json',
//                 },
//         }) .then(response => {console.log(response)});
//     }
// getDepartments();