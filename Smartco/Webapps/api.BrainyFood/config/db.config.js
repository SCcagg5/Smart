'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host     : 'dark-sql',
    user     : 'user',
    password : 'testtest',
    database : 'brainyfood'
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;
