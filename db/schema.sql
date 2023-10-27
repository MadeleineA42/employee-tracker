-- THEN I am presented with the following options: 
-- view all departments, 
-- view all roles, view all 
-- employees, add a department, 
-- add a role, 
-- add an employee, 
-- and update an employee role
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- department
-- id: INT PRIMARY KEY
-- name: VARCHAR(30) to hold department name

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- role
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) to hold role title
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role belongs to

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

-- employee
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold reference to employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);