
INSERT INTO department (id, name) value(1, 'Sales');
INSERT INTO department (id, name) value(2, 'Finance');
INSERT INTO department (id, name) value(3, 'Engineering');
INSERT INTO department (id, name) value(4, 'Legal');

INSERT INTO role (id, title, salary, department_id) value(1,'Sales Lead', 100000, 1);
INSERT INTO role (id, title, salary, department_id) value(2,'Salesperson', 80000, 1);
INSERT INTO role (id, title, salary, department_id) value(3,'Account', 125000, 2);
INSERT INTO role (id, title, salary, department_id) value(4,'Lead Engineer', 150000, 3);
INSERT INTO role (id, title, salary, department_id) value(5,'Software Engineer', 120000, 3);
INSERT INTO role (id, title, salary, department_id) value(6,'Legal Team Lead',250000, 4);
INSERT INTO role (id, title, salary, department_id) value(7,'Lawyer', 250000, 4);

INSERT INTO employee (id, first_name, last_name, role_id) value (1, 'John', 'Doe', 1);
INSERT INTO employee (id, first_name, last_name, role_id) value (2, 'Mike', 'Chan', 2);
INSERT INTO employee (id, first_name, last_name, role_id) value (3, 'Ashley', 'RodriguezJohn', 4);
INSERT INTO employee (id, first_name, last_name, role_id) value (4, 'Kevin', 'Tupik', 5);
INSERT INTO employee (id, first_name, last_name, role_id) value (5, 'Malia', 'Brown', 3);
INSERT INTO employee (id, first_name, last_name, role_id) value (6, 'Sarah', 'Lourd', 6);
INSERT INTO employee (id, first_name, last_name, role_id) value (7, 'Tom', 'Allen', 7);
INSERT INTO employee (id, first_name, last_name, role_id) value (8, 'Malia', 'Brown', 3);

UPDATE employee SET manager_id = 3 where first_name = 'John' and last_name = 'Doe';
UPDATE employee SET manager_id = 1 where first_name = 'Mike' and last_name = 'Chan';
UPDATE employee SET manager_id = 5 where first_name = 'Tammer' and last_name = 'Galal';
