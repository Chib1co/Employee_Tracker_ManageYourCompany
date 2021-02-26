ALTER USER 'root'@'localhost' IDENTIFIED BY 'Pass1on103';
DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;



USE companyDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL ,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL ,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM  department;
select * from  roles;
select * from  employee;
