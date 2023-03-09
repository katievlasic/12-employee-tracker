INSERT INTO department (id, name)
VALUES (1,"Engineering"),
       (2,"Finance"),
       (3,"Legal"),
       (4,"Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Software Engineer II", 100000, 2),
       (2,"Manager", 150500, 1),
       (3,"Supply Chain Analyst", 95400, 3),
       (4,"Financial Analyst", 92500, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Jane", "Doe", 2, NULL),
       (2,"John", "Andersen", 1, 1);
   

         