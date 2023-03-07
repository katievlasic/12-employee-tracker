const fs = require("fs"); // fs = file system
const inquirer = require("inquirer"); 
const mysql = require('mysql2'); 
require("dotenv").config() // require the .env file to protect password

// SQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
});

// initialize application after creating connection to db
connection.connect((err) => {
    if (err) throw err;
    init();
})

// function querying(answers){
//     let name = answers;
//     connection.query(
//         `INSERT INTO employee (id,name)
//         VALUES (name)`
//         connection.end()
//       );
// }


// Function to initialize app
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "purpose",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
      },
    ])
    .then((answers) => {
      if (answers.purpose === "View All Employees"){
       viewE();
      } else if (answers.purpose === "Add Employee"){
        addE();
      } else if (answers.purpose === "Add Department"){
        addD();
      } else if (answers.purpose === "Add Role"){
        addR();
      } else {
        console.log(answers);
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
};

function viewE(){
    connection.query('SELECT * FROM employee', (err, employeeResults) => {
        if (err) throw err;
        console.table(employeeResults);
        init();
}
)};

// add an employee to table 'employee'
function addE(){
    connection.query('SELECT * FROM role', (err, roleResults) => {
        if (err) throw err;
        let roleArr = roleResults.map(x => ({name: x.title, value: x.id}))
        connection.query('SELECT * FROM employee', (err, employeeResults) => {
            if (err) throw err;
            let emArr = employeeResults.map(x => ({name: x.first_name, value: x.id}))
            inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the last name of the employee?",
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the employee's role?",
                choices: roleArr,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Who is the employee's manager",
                choices: emArr,
              },
            ])
            .then((answers) => {
                connection.query("INSERT INTO employee SET ?", answers
                , function(error){
                    if (error) {
                        throw error}
                        console.log("added emplyoee")
                        init(); // workflow - want within callback
                });
            })
             .catch((error) => {
              if (error) {
                console.log(error);
              }
            });
        })
    })
};

// add an department to table 'department'
function addD(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the Department?",
      },
    ])
    .then((answers) => {
    })
     .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
};

// add an role to table 'role'
function addR(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the role?",
      },
      {
        type: "list",
        name: "roleDept",
        message: "What department does the role belong to?",
        choices: [
            "Engineering",
            "Finance",
            "Legal",
            "Sales",
            "Service",
        ],
      },
    ])
    .then((answers) => {
        // write to role department
    init(); // return to beginning of application
    })
     .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
};