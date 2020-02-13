DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department ( 
	id INTEGER AUTO_INCREMENT,
	name VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE role ( 
	id INTEGER AUTO_INCREMENT,
	title VARCHAR(30),
	salary DECIMAL(10, 2),
	department_id INTEGER,
	PRIMARY KEY (id),
	CONSTRAINT FK_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER, 
	manager_id INTEGER,
	PRIMARY KEY (id),
	CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES role(id),
	CONSTRAINT FK_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)
);
