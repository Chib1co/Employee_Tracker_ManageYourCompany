INSERT INTO department (name)
VALUES 
('IT'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 70000, 6),
('Salesperson', 50000, 6),
('Lead Engineer', 90000, 3),
('Software Engineer', 70000, 1),
('Account Manager', 70000, 2),
('Accountant', 80000, 2),
('Legal Team Lead', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Smith', 8, null),
('Ronald', 'Young', 8, null),
('David', 'Miller', 9, null),
('Maria', 'Hall', 10, null),
('Linda', 'Martin', 11, null),
('Taylor', 'Wilson', 12, null);

