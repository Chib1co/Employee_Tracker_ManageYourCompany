const mysql = require('mysql');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  user: 'root',
  password: 'Paas1on103',
  database: 'companyDB',
});

// Initiate MySQL Connection.
connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
    runfirstPromt();
  })
//first action function
const runfirstPromt = () => {
    inquirer
    .prompt({
        name:'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            "View all employees",
            "View all employees by role",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Add role",
            "Add department",
            "Update employee role",
            "Update employee manager",
            "Delete employee",
            "Delete role",
            "Delete department",
            "View department budgets"
        ]
    })
.then((answer) => {
     // Switch case depending on user option
     switch (answer.action) {
        case "View all employees":
            viewAllEmp();
            break;

        case "View all employees by department":
            viewAllEmpByDept();
            break;

        case "View all employees by role":
            viewAllEmpByRole();
            break;

        case "Add employee":
            addEmp();
            break;

        case "Add department":
            addDept();
            break;
        case "Add role":
            addRole();
            break;
        case "Update employee role":
            updateEmpRole();
            break;
        case "Update employee manager":
            updateEmpMngr();
            break;
        case "View all employees by manager":
            viewAllEmpByMngr();
            break;
        case "Delete employee":
            deleteEmp();
            break;
        case "View department budgets":
            viewDeptBudget();
            break;
        case "Delete role":
            deleteRole();
            break;
        case "Delete department":
            deleteDept();
            break;
    }
});

}