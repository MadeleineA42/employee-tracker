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
        addDepartment();
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
    if (err) throw err;
    console.log('Departments:');
    console.table(res);
    menuPrompt();
  });
}

// function to view all roles 
function viewRoles() {
  db.query('select * from role', (err, res) => {
    if (err) throw err;
    console.log('Roles:');
    console.table(res);
    menuPrompt();
  });
}


// function to view all employees 
function viewEmployees() {
  db.query('select * from employee', (err, res) => {
    if (err) throw err;
    console.log('Employees:');
    console.table(res);
    menuPrompt();
  });
}

// function to add a department 
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: function (input) {
          if (input.trim() === '') {
            return 'Department name cannot be empty. Please try again.';
          }
          return true;
        }
      }
    ])
    .then(answer => {
      const departmentName = answer.departmentName;
      const sql = 'INSERT INTO department (name) VALUES (?)';
      db.query(sql, [departmentName], (err, res) => {
        if (err) throw err;
        console.log(`Department "${departmentName}" has been added successfully!`);
        menuPrompt(); // Go back to the main menu after adding the department
      });
    });
}


// function to add a role 
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: function(input) {
          if (input.trim() === '') {
            return 'Role title cannot be empty. Please enter a valid title.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: function(input) {
          if (isNaN(input) || parseFloat(input) <= 0) {
            return 'Invalid salary. Please enter a valid number greater than 0.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the new role: (Must be between 1-4)',
        validate: function(input) {
          if (isNaN(input) || parseInt(input) <= 0) {
            return 'Invalid department ID. Please enter a valid number greater than 0.';
          }
          return true;
        }
      }
    ])
    .then(answer => {
      const { title, salary, departmentId } = answer;
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(sql, [title, salary, departmentId], (err, res) => {
        if (err) throw err;
        console.log(`Role "${title}" has been added successfully!`);
        menuPrompt(); // Go back to the main menu after adding the role
      });
    });
}


// function to add an employee 
// function addEmployee ()

// function to update employee role 
// function updateEmployeeRole ()


menuPrompt();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
