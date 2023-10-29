const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();


// Connecting the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      database: 'employee_db',
      password: 'Mont@na456'
    },
    console.log(`Connected to employee database,`)
);
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

// THEN I am presented with the following options: 
// view all departments, 
// view all roles, view all 
// employees, add a department, 
// add a role, 
// add an employee, 
// and update an employee role
// function menuPrompt() {
//     inquirer.prompt ({
//         type: 'list',
//         name: 'start',
//         message: 'What would you like to do?',
//         choices: [
//             'View all department',
//             'View all roles',
//             'View all employees',
//             'Add a department',
//             'Add a role',
//             'Add an employee',
//             'Update and employee role',
//             'Exit'
//         ],
//     })
// }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
