INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

-- title, salary, department

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 200000, 4),
       ("Lawyer", 160000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mary', 'Shelley', 1, 4),
    ('Shirley', 'Jackson', 2, 3),
    ('Sabrina', 'Spellman', 3, 2),
    ('Elle', 'Vira', 4, 1);
