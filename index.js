// dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./db/connection");

// Welcome message
console.table("\n---- Hello! Welcome to my employee tracker! ----\n");

// inquirer to prompt initial question 
const promptQuestion = async () => {
  try {
    let answer = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    });
    switch (answer.action) {
      case "View all departments":
        viewAllDepartments();
        break;

      case "View all roles":
        viewAllRoles();
        break;

      case "View all employees":
        viewAllEmployees();
        break;

      case "Add a department":
        addDepartment();
        break;

      case "Add a role":
        addaRole();
        break;

      case "Add an employee":
        addAnEmployee();
        break;

      case "Update an employee role":
        updateEmployeeRole();
        break;

      case "Exit":
        connection.end();
        break;
    }
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// view all departments option 
const viewAllDepartments = async () => {
  console.log("Department View");
  try {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let deptArr = [];
      res.forEach((department) => deptArr.push(department));
      console.table(deptArr);
      promptQuestion();
    });
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// view all roles option 
const viewAllRoles = async () => {
  console.log("List of roles");
  try {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach((role) => roleArray.push(role));
      console.table(roleArray);
      promptQuestion();
    });
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// View all of the employees option
const viewAllEmployees = async () => {
  console.log("List of Employees");
  try {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let employeeArray = [];
      res.forEach((employee) => employeeArray.push(employee));
      console.table(employeeArray);
      promptQuestion();
    });
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// add a department option
const addDepartment = async () => {
  try {
    console.log("Add a department");

    let answer = await inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the name of your new department?",
      },
    ]);

    let result = await connection.query("INSERT INTO department SET ?", {
      department_name: answer.deptName,
    });

    console.log(`${answer.deptName} added successfully to departments.\n`);
    promptQuestion();
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// add a new role option
const addaRole = async () => {
  try {
    console.log("Add a Role");

    let departments = await connection.query("SELECT * FROM department");

    let answer = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of your new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What salary will this role provide?",
      },
      {
        name: "departmentId",
        type: "list",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
        message: "What department ID is this role associated with?",
      },
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === answer.choice) {
        chosenDepartment = departments[i];
      }
    }
    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId,
    });

    console.log(`${answer.title} role added successfully.\n`);
    promptQuestion();
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// add an employee option
const addAnEmployee = async () => {
  try {
    console.log("Add an employee");

    let roles = await connection.query("SELECT * FROM role");

    let managers = await connection.query("SELECT * FROM employee");

    let answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of this Employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of this Employee?",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
        message: "What is this Employee's role id?",
      },
      {
        name: "employeeManagerId",
        type: "list",
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          };
        }),
        message: "What is this Employee's Manager's Id?",
      },
    ]);

    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: answer.employeeRoleId,
      manager_id: answer.employeeManagerId,
    });

    console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
    promptQuestion();
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// update an employee role option
const updateEmployeeRole = async () => {
  try {
    console.log("Update an employee");

    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id,
          };
        }),
        message: "Which employee would you like to update?",
      },
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
      {
        name: "role",
        type: "list",
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id,
          };
        }),
        message: "Which role would you like to give your employee?",
      },
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleSelection.role },
      { id: employeeSelection.employee },
    ]);

    console.log(`Role successfully updated!\n`);
    promptQuestion();
  } catch (err) {
    console.log(err);
    promptQuestion();
  }
};

// Begin the application after establishing the connection.
connection.connect(function (err) {
  if (err) throw err;
  promptQuestion();
});