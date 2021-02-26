const mysql = require('mysql');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  user: 'root',
  password: 'Pass1on103',
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
        type: 'list',
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
            viewAllEmployee();
            break;

        case "View all department":
            viewAllDpt();
            break;

        case "View all role":
            viewAllRole();
            break;

        case "Add employee":
            addEmployee();
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

//view all emplyee
const viewAllEmployee = () => {
    connection.query(`SELECT employee.first_name, employee.last_name, roles.title, dept.name FROM companyDB.employee as employee
    JOIN companyDB.roles as roles
    on employee.role_id = roles.id
    JOIN companyDB.department as dept
    on roles.department_id = dept.id
    ;`
    , (err, res) => {
        if (err) throw err;
        
        console.log(`Employee list`)
        console.table(res)
        runfirstPromt()
    } )
};

//view department
const viewAllDpt = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        
        console.log(`Department list`)
        console.table('All Department: ', res)
        runfirstPromt()
    } )
};

//view 
const viewAllRole = () => {
    connection.query('SELECT * FROM roles', (err, result) => {
        if (err) throw err;
        
        console.log(`All Roles`)
        console.table('Roles: ', res)
        runfirstPromt()
    } )
};

//Adding an employee
const addEmployee = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
    inquirer
    .prompt([
        {
            name: 'first_name',
            type: 'input', 
            message: "What is the employee's fist name? ",
        },
        {
            name: 'last_name',
            type: 'input', 
            message: "What is the employee's last name? "
        },
        {
            name: 'role',
            type: 'rawlist',
            message: "What is the employee's role? ",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineert",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
            ]
        },
        {
            name: 'manager_id',
            type: 'input', 
            message: "What is the employee's manager's ID? "
        },
    ])
    .then((answer) => {
        if(answer.role === role.title){
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("answer.first_name", "answer.last_name", "answer.role", "answer.manager_id")';
        connection.query(query, (err, result) =>{
            if(err)throw err;
            console.log("new employee added")
        })
        }

    })
    })
}
    //INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
