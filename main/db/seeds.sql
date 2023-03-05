INSERT INTO department (id, name)
VALUES (1,"Katie"),
       (2,"Bill"),
       (3,"Rose"),
       (4,"Evan");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Engineer", 100000, 002),
       (2,"Manager", 150500, 001),
       (3,"Supply Chain", 95400, 003),
       (4,"HR", 92500, 010);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Jane", "Doe", 82345, 101),
       (2,"John", "Andersen", 82346, 98);
   

         