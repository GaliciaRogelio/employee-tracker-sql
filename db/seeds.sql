INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Obi-Wan', 'Kenobi', 1, null),
('Luke', 'Skywalker', 1, 1),
('Han', 'Solo', 4, 1),
('Darth', 'Maul', 5, 1),
('Leia', 'Organa', 3, 1),
('Anakin', 'Skywalker', 1, 2),
('Boba', 'Fett', 2, null);

INSERT INTO department (department_name)
VALUES 
('Sith'),
('Mandalorian'),
('Galactic Republic'),
('Jedi Order'),
('Rebel Alliance');

INSERT INTO role (title, salary, department_id)
VALUES 
('Jedy', 133420000, 1),
('Bounty Hunter', 8054000, 2),
('Princess', 9250000, 3),
('Smuggler', 40000000, 4),
('Dark Lord', 12000000, 5);