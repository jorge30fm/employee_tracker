const mysql = require('mysql2');

const db = mysql.createConnection(
        {
                host: 'localhost',
                user: 'root',
                password: 'jorgeWebDeveloper12484820!?',
                database: 'business_data'
        },
        console.log('Connected to the business_data database')
);

module.exports = db;
