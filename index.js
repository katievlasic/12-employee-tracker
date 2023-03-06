const fs = require("fs"); // fs = file system
const inquirer = require("inquirer"); 
const mysql = require('mysql2'); 

// SQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});


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
        console.log(answers)
    //   if (answers.purpose === "View All Employees"){
    //    // ??? how to
    //   } else if (answers.purpose === "Add Employee"){
    //     addE();
    //   } else if (answers.purpose === "Add Department"){
    //     addD();
    //   } else if (answers.purpose === "Add Role"){
    //     addR();
    //   } else {
    //     console.log(answers);
    //   }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}

// Function call to initialize app
init();

// add an employee to table 'employee'
function addE(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: [
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
            "Customer Service",
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
        ],
      },
      {
        type: "list",
        name: "manId",
        message: "Who is the employee's manager",
        choices: [
            // how to populate from sql????
        ]
      },
    ])
    .then((answers) => {
        // write to table employee 
    init(); // return to beginning of application
    })
     .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
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
    connection.query("INSERT INTO department SET ?", {
        name: answers.deptName
    }, function(error){
        if (error) {
            throw error}
            console.log("added department")
    });
    init(); // return to beginning of application
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