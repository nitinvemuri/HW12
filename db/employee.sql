  
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT(10)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
    department_name VARCHAR(30),
    department_id INT(10)
);

CREATE TABLE worker (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10),
    manager_id INT(10) NULL
);