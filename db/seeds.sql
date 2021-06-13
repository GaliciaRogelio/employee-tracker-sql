INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Obi-Wan', 'Kenobi', 1, null),
('Luke', 'Skywalker', 2, 1),
('Han', 'Solo', 2, 1),
('Darth', 'Maul', 4, 1),
('Leia', 'Organa', 3, 1),
('Anakin', 'Skywalker', 5, 2),
('Boba', 'Fett', 6, null);

INSERT INTO department (department_name)
VALUES 
('Management'),
('Sales'),
('Accounting'),
('Reception'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES 
('General Manager', 120000, 1),
('Salesman', 80000, 2),
('Accountant', 90000, 4),
('Receptionist', 40000, 3),
('Human Resource Officer', 75000, 5),
('CEO', 250000, null);