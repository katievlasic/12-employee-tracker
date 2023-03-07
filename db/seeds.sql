INSERT INTO department (id, name)
VALUES (1,"Katie"),
       (2,"Bill"),
       (3,"Rose"),
       (4,"Evan");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Engineer", 100000, 2),
       (2,"Manager", 150500, 1),
       (3,"Supply Chain", 95400, 3),
       (4,"HR", 92500, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Jane", "Doe", 2, NULL),
       (2,"John", "Andersen", 1, 1);
   

         