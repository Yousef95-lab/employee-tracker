DROP DATABASE IF EXISTS employeetracker_db;
CREATE database employeetracker_db;
USE employeetracker_db;

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
	salary INT,
    department_id INT,
    PRIMARY KEY(id)
);