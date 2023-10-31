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
      'Update an employee role',
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

// function to view all employees along with their roles and salaries
function viewEmployees() {
  const sql = `
  SELECT 
  employee.id,
  employee.first_name,
  employee.last_name,
  title,
  name AS department,
  salary
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    ORDER BY employee.id;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
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

// callback function for department list 
function getDepartmentChoices(callback) {
  const sql = 'SELECT id, name FROM department';
  db.query(sql, (err, results) => {
    if (err) throw err;
    const departmentChoices = results.map(department => ({
      value: department.id,
      name: department.name
    }));
    callback(departmentChoices);
  });
}

// function to add a new role 
function addRole() {
  getDepartmentChoices(departmentChoices => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the new role:',
          
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the new role:',
          
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for the new role:',
          choices: departmentChoices,
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
  });
}

// callback function to list roles for addEmployee function 
function getRoleChoices(callback) {
  const sql = 'SELECT id, title FROM role';
  db.query(sql, (err, results) => {
    if (err) throw err;
    const roleChoices = results.map(role => ({
      value: role.id,
      name: role.title
    }));
    callback(roleChoices);
  });
}

// function to add an employee 
function addEmployee() {
  getRoleChoices(roleChoices => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's FIRST name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's LAST name:",
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the employee's manager's ID 1-4 (optional, press Enter to skip):",
          validate: function (input) {
            if (input.trim() === '') {
              return true; // Allow empty input for manager ID (null id)
            }
            if (isNaN(input) || parseInt(input) <= 0) {
              return "Invalid manager ID. Please enter a valid number greater than 0.";
            }
            return true;
          }
        }
      ])
      .then(answer => {
        const { firstName, lastName, roleId, managerId } = answer;
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, roleId, managerId || null], (err, res) => {
          if (err) throw err;
          console.log(`Employee "${firstName} ${lastName}" has been added successfully!`);
          menuPrompt(); // Go back to the main menu after adding the employee
        });
      });
  });
}

// function to update employee role 
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        validate: function (input) {
          if (input.trim() === '') {
            return "First name cannot be empty. Please enter a valid name.";
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        validate: function (input) {
          if (input.trim() === '') {
            return "Last name cannot be empty. Please enter a valid name.";
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'newTitle',
        message: 'Enter the new role title for the employee:',
        validate: function (input) {
          if (input.trim() === '') {
            return 'Role title cannot be empty. Please enter a valid title.';
          }
          return true;
        }
      }
    ])
    .then(answer => {
      const { firstName, lastName, newTitle } = answer;
      const sql = `UPDATE employee e
                   JOIN role r ON e.role_id = r.id
                   SET r.title = ?
                   WHERE e.first_name = ? AND e.last_name = ?`;
      db.query(sql, [newTitle, firstName, lastName], (err, res) => {
        if (err) throw err;
        if (res.affectedRows > 0) {
          console.log(`Employee ${firstName} ${lastName}'s role has been updated to "${newTitle}" successfully!`);
        } else {
          console.log(`No employee found with the given name. Please check the name and try again.`);
        }
        menuPrompt(); // Go back to the main menu after updating the employee's role title
      });
    });
}

menuPrompt();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


