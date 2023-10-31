INSERT INTO department (name)
VALUES ("Practical Magic"),
       ("Potions"),
       ("Unseen Arts"),
       ("Magical Creatures");

-- title, salary, department

INSERT INTO role (title, salary, department_id)
VALUES ("Demonologist", 100000, 1),
       ("Lead Exorcist", 80000, 1),
       ("Potion Brewer", 150000, 2),
       ("Recipe Creator", 120000, 2),
       ("Spellcasting Master", 160000, 3),
       ("Broomstick Instructor", 125000, 3),
       ("Creature Care Instructor", 200000, 4),
       ("Creature Groomer", 160000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mary', 'Shelley', 1, 4),
    ('Shirley', 'Jackson', 3, 2),
    ('Sabrina', 'Spellman', 5, 3),
    ('Elle', 'Vira', 7, 1);
