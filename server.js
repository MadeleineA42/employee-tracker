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
function menuPrompt() {
  inquirer.prompt({
    type: 'list',
    name: 'start',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update and employee role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.start) {
      case 'View all departments':
        viewDepartment();
        break;

      case 'View all roles':
        viewRoles();
        break;

      case 'View all employees':
        viewEmployees();
        break;

      case 'Add a department':
        addDeparment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add an employee':
        addEmployee();
        break;

      case 'Update an employee role':
        updateEmployeeRole();
        break;

      case 'Exit':
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please try again.');
    }
  });
}

// function to view all departments 
function viewDepartment() {
  db.query('select * from department', (err, res) => {
    console.log(err);
    console.log(res);
    menuPrompt();
  });
}

// function to view all roles 
// function viewRoles() 


// function to view all employees 
// function viewEmployees() {
//   db.query('select * from employee', (err, res) => {
//     console.log(err);
//     console.log(res);
//     menuPrompt();
//   });
// }

// function to add a department 
// function addDeparment ()

// function to add a role 
// function addRole ()

// function to add an employee 
// function addEmployee ()

// function to update employee role 
// function updateEmployeeRole ()


menuPrompt();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
