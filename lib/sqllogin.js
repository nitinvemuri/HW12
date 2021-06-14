const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Jaycritch1',
  database: 'employee_tracker_db'
});

module.exports = connection;