const mysql = require('mysql');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: 'localhost',
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
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View all employees",
                "View all role",
                "View all department",
                "Add employee",
                "Add department",
                "Add role",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View employee by Manager",
                "Update employee managers",
                "EXIT"
            ]
        })
        .then((answer) => {
            // Switch case depending on user option
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployee();
                    break;
                case "View all role":
                    viewAllRole();
                    break;
                case "View all department":
                    viewAllDpt();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDpt();
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
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete department":
                    deleteDept();
                    break;
                case "View employee by Manager":
                    viewByManager();
                    break;
                case "Update employee managers":
                    updateEmpManag();
                    break;
                case "EXIT":
                    finishEdit();
                    break
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
        })
};


//view role
const viewAllRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        console.log(`Role list`)
        console.table(res)
        runfirstPromt()
    });
}
//view department
const viewAllDpt = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        console.log(`Department list`)
        console.table(res)
        runfirstPromt()
    });
}
//Adding an employee
const addEmployee = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
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
                    type: 'list',
                    message: "What is the employee's role? ",
                    choices: function () {
                        var roleSelect = [];
                        for (let i = 0; i < res.length; i++) {
                            roleSelect.push(res[i].title);
                        } return roleSelect;
                    }
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID? "
                },
            ])
            .then((answer) => {
                let role_id;
                for (let x = 0; x < res.length; x++) {
                    if (res[x].title === answer.role) {
                        role_id = res[x].id;
                    }
                }
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    }, function (err) {
                        if (err) throw err;
                        console.log("new employee added");
                        connection.query('SELECT * FROM employee', (err, res) => {
                            if (err) throw err;

                            console.log(`Employee list`)
                            console.table(res)
                            runfirstPromt()
                        })
                    })
            })
    })
}

//adding department
const addDpt = () => {

    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: "What is the department name to add? ",
            }
        ]).then((answer) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: answer.newDepartment
                })
            connection.query('SELECT * FROM department', function (err, res) {
                if (err) throw err;
                console.log(`New Department added`)
                console.table(res)
                runfirstPromt()
            })
        })
}

//adding role
const addRole = () => {

    inquirer
        .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: "What is the role title to add? ",
            }
        ]).then((answer) => {
            connection.query('INSERT INTO roles SET ?',
                {
                    title: answer.newRole
                })
            connection.query('SELECT * FROM roles', function (err, res) {
                if (err) throw err;
                console.log(`New role added`)
                console.table(res)
                runfirstPromt()
            })
        })
}

const updateEmpRole = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        const employee = res;
        // console.log(res)
        inquirer
            .prompt([
                {
                    name: 'selectEmp',
                    type: 'list',
                    message: "which employee's would you like to update? ",
                    choices: function () {
                        var empList = [];
                        for (let i = 0; i < employee.length; i++) {
                            empList.push({ name: employee[i].first_name + employee[i].last_name, value: employee[i].id });
                        } return empList;
                    }
                }
            ]).then((answer) => {
                console.log(answer.selectEmp)
                connection.query('SELECT * FROM roles ', function (err, res) {
                    if (err) throw err;
                    const role = res
                    inquirer
                        .prompt([
                            {
                                name: 'updateRole',
                                type: 'list',
                                message: 'What is new role for the employee ?',
                                choices: function () {
                                    var roleList = [];
                                    for (let i = 0; i < role.length; i++) {
                                        roleList.push({ name: role[i].title, value: role[i].id });
                                    } return roleList;
                                }
                            }

                        ])
                        .then((roleAnswer) => {
                            connection.query('update employee SET role_id = ? WHERE id = ?', [roleAnswer.updateRole, answer.selectEmp], function (err, res) {
                                if (err) throw err;

                                connection.query('SELECT * FROM employee', function (err, res) {
                                    if (err) throw err;
                                    console.log(`roles updated`)
                                    console.table(res)
                                    runfirstPromt()
                                })
                            })
                        }).catch(err => console.log(err));
                })
            }).catch(err => console.log(err));
    })
}

const deleteEmp = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'deleteEmp',
                    type: 'list',
                    message: 'Which employee would you like to delete from the list?',
                    choices: function () {
                        var deleteempList = [];
                        for (let i = 0; i < res.length; i++) {
                            // roleList.push({name: role[i].title, value: role[i].id});
                            deleteempList.push({ name: res[i].first_name + res[i].last_name, value: res[i].id });
                        } return deleteempList;
                    }
                }

            ]).then((answer) => {
                console.log(answer)
                connection.query('DELETE FROM employee WHERE id = ?', [answer.deleteEmp], function (err, res) {
                    if (err) throw err;
                    console.log("selected employee deleted");
                    connection.query('SELECT * FROM employee', (err, res) => {
                        if (err) throw err;

                        console.log(`New employee list`)
                        console.table(res)
                        runfirstPromt()
                    })
                })

            })
    })
};


const deleteRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'deleteRole',
                    type: 'list',
                    message: 'Which role would you like to delete from the list?',
                    choices: function () {
                        var deleteRoleList = [];
                        for (let i = 0; i < res.length; i++) {
                            // roleList.push({name: role[i].title, value: role[i].id});
                            deleteRoleList.push({ name: res[i].title, value: res[i].id });
                        } return deleteRoleList;
                    }
                }

            ]).then((answer) => {
                console.log(answer)
                connection.query('DELETE FROM roles WHERE id = ?', [answer.deleteRole], function (err, res) {
                    if (err) throw err;
                    console.log("selected role deleted");
                    connection.query('SELECT * FROM roles', (err, res) => {
                        if (err) throw err;

                        console.log(`New role list`)
                        console.table(res)
                        runfirstPromt()
                    })
                })

            })
    })
};


const deleteDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'deleteDept',
                    type: 'list',
                    message: 'Which department would you like to delete from the list?',
                    choices: function () {
                        var deleteDeptList = [];
                        for (let i = 0; i < res.length; i++) {
                           deleteDeptList.push({ name: res[i].name, value: res[i].id });
                        } returndeleteDeptList;
                    }
                }

            ]).then((answer) => {
                console.log(answer)
                connection.query('DELETE FROM department WHERE id = ?', [answer.deleteDept], function (err, res) {
                    if (err) throw err;
                    console.log("selected department deleted");
                    connection.query('SELECT * FROM roles', (err, res) => {
                        if (err) throw err;

                        console.log(`New dept list`)
                        console.table(res)
                        runfirstPromt()
                    })
                })

            })
    })
};

const viewByManager = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
    inquirer
    .prompt([
        {
            name: 'viewbyManag',
            type: 'list',
            message: 'Select manager name to show the team member',
            choices: function() {
                var viewManager = [];
                for(let i = 0; i< res.length; i++){
                    viewManager.push({ name: res[i].first_name + res[i].last_name, value: res[i].id });
                } return viewManager
            }

        }
    ]).then((answer) => {
        connection.query('SELECT * FROM employee WHERE manager_id =?', [answer.viewbyManag], function(err, res){
            if (err) throw err;
            console.log(`Employee with manager ${answer.viewbyManag.name}`)
                        console.table(res)
                        runfirstPromt()
        })

    })
    
})
}
const updateEmpManag = () => {
    connection.query('SELECT * FROM employee', function(err, res){
        if(err) throw err;
    inquirer
      .prompt([
          {
              name: 'updateEmpManag',
              type: 'list',
              message: 'Select employee name who has new manager',
              choices: function(){
                  var updateEmpMng = []
                  for(let i = 0; i < res.length; i++){
                      updateEmpMng.push({name: res[i].first_name + res[i].last_name, value: res[i].id});
                  } return updateEmpMng
              }

          }
      ]).then((answer) => {
          connection.query('SELECT * FROM employee', function(err, res){
              if(err) throw err;
        inquirer
        .prompt([
            {
                name: 'newManager',
                type: 'list',
                message: 'Select new managers name',
                choices: function(){
                    var newManager = []
                    for(let i = 0; i < res.length; i++){
                        newManager.push({name: res[i].first_name + res[i].last_name, value: res[i].id});
                    } return newManager       
            }
            }
        ]).then((managerAnswer) => {
            connection.query('update employee SET manager_id = ? WHERE id = ?', [managerAnswer.newManage, answer.updateEmpManag], function(err, res){
                if(err) throw err;
            })
            connection.query('SELECT * FROM employee', function (err, res){
                if(err) throw err;
                console.log('updated employees new manager');
                console.table(res)
                runfirstPromt()
            })

        })
    
      })
    })
})
}

function finishEdit() {
    connection.end();
};