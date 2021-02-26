USE companyDB;

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
('John', 'Smith', 1, 458),
('Ronald', 'Young', 2, 276),
('David', 'Miller', 3, 486),
('Maria', 'Hall', 4, 126),
('Linda', 'Martin', 5, 724),
('Taylor', 'Wilson', 6, 157);

