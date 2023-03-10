const fs = require("fs"); // fs = file system
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config(); // require the .env file to protect password

// SQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
});

// initialize application after creating connection to db
connection.connect((err) => {
  if (err) throw err;
  init();
});

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
      if (answers.purpose === "View All Employees") {
        viewE();
      } else if (answers.purpose === "Add Employee") {
        addE();
      } else if (answers.purpose === "Add Department") {
        addD();
      } else if (answers.purpose === "Add Role") {
        addR();
      } else if (answers.purpose === "View All Departments") {
        viewD();
      } else if (answers.purpose === "View All Roles") {
        viewR();
      } else if (answers.purpose === "Update Employee Role") {
        upE();
      } else if (answers.purpose === "Quit"){
       quit();
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
};

function upE(){
  connection.query("SELECT * FROM role", (err, roleResults) => {
    if (err) throw err;
    let roleArr = roleResults.map((x) => ({ name: x.title, value: x.id }));
  
    connection.query("SELECT * FROM employee", (err, employeeResults) => {
      if (err) throw err;
      let emArr = employeeResults.map((x) => ({name: x.first_name, value: x.id,}));
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee's role would you like to upate?",
            choices: emArr,
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's new role name?",
            choices: roleArr,
          }
        ])
        .then((answers) => {
          console.log(answers.id);
          connection.query(
            "UPDATE employee SET answers.role_id = ? WHERE answer_id = ?",
            answers,
            function (error) {
              if (error) {
                throw error;
              }
              console.log("update emplyoee's role");
              init(); // workflow - want within callback
            }
          );
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    });
  });
}

function quit(){
  inquirer
  .prompt([
    {
      type: "list",
      name: "end",
      message: "Would you like to exit this CLI?",
      choices: [
        "yes",
        "no"
      ]
    },
  ]).then((answers) => {
    if (answers == "yes") {
      return console.log("Goodbye");
    } else {
      init();
    }
  }
  )
};


function viewE() {
  connection.query("SELECT * FROM employee", (err, employeeResults) => {
    if (err) throw err;
    console.table(employeeResults);
    init();
  });
}

function viewD() {
  connection.query("SELECT * FROM department", (err, deptResults) => {
    if (err) throw err;
    console.table(deptResults);
    init();
  });
}

function viewR() {
  connection.query("SELECT * FROM role", (err, roleResults) => {
    if (err) throw err;
    console.table(roleResults);
    init();
  });
}

// add an employee to table 'employee'
function addE() {
  connection.query("SELECT * FROM role", (err, roleResults) => {
    if (err) throw err;
    let roleArr = roleResults.map((x) => ({ name: x.title, value: x.id }));
  
    connection.query("SELECT * FROM employee", (err, employeeResults) => {
      if (err) throw err;
      let emArr = employeeResults.map((x) => ({name: x.first_name, value: x.id,}));
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
          connection.query(
            "INSERT INTO employee SET ?",
            answers,
            function (error) {
              if (error) {
                throw error;
              }
              console.log("added emplyoee");
              init(); // workflow - want within callback
            }
          );
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    });
  });
}

// add an department to table 'department'
function addD() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      connection.query(
        "INSERT INTO department SET ?",
        answers,
        function (error) {
          if (error) {
            throw error;
          }
          console.log("added department");
          init(); // workflow - want within callback
        }
      );
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}

// add an role to table 'role'
function addR() {
  connection.query("SELECT * FROM department", (err, deptResults) => {
    if (err) throw err;
  let deptArr = deptResults.map((x) => ({name: x.name, value: x.id}))

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What department does the role belong to?",
        choices: deptArr,
      },
    ])
    .then((answers) => {
      connection.query("INSERT INTO role SET ?", answers, function (error) {
        if (error) {
          throw error;
        }
        console.log("added role");
        init(); // workflow - want within callback
      });
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    })
  })
};
