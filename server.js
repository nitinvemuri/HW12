const inquirer = require("inquirer")
const express = require('express');
const connection = require('./lib/sqllogin')

connection.connect((error) => {
    if (error) throw error;
    promptUser();
  });


const promptUser = () => {
    inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: 'select a prompt',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee',
                'Update Manager',
                'Quit'
                
            ]
        }
    ]).then((answers) => {
        const select = answers.select;
        if (select === 'View All Employees') {
            viewAllEmployee();
        }
    })
    .then((answers) => {
        const  select  = answers.select;
        if (select === 'View All Employees by Department') {
            viewAllDepartment();
        }
    })
    .then((answers) => {
        const select = answers.select;
        if (select === 'View All Employees by Manager') {
            viewAllmanager();
        }
    })
    .then((answers) => {
        const select = answers.select;
        if (select === 'Add Employee') {
            addEmployee();
        }
    }).then((answers) => {
        const select  = answers.select;
        if(select === 'Remove Employee') {
            removeEmployee();
        }
    }).then((answers) => {
        const select = answers.select;
        if (select === 'Update Employee') {
            updateEmployee();
        }
    }).then((answers) => {
        const select = answers.select;
        if (select === 'Update Manager') {
            updateManager();
        }
    }).then((answers) => {
        const select = answers.select;
        if (select === 'Quit') {
            connection.end();
            console.log('Bye')
        }
    })
};


const viewAllEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data)
        promptUser();
    })
}
const viewAllDepartment = () => {

}

const viewAllmanager = () => {
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the Employee First Name?',
            validate: addFirstName => {
                if (addFirstName){
                    return true;
                } else {
                    console.log('input a name')
                    return false;
                }
            }
        },
        {
            type:'input',
            name: 'lastName',
            message: 'What is Employee Last Name?',
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log('input a last name')
                    return false;
                }
            }
        },
    ]).then(answer => {
        const crit = [answer.firstName, answer.lastName]
        const roleSql = `SELECT worker.id, worker.title_name FROM worker`;
        connection.promise().query(roleSql, (err,data) => {
            if (err) throw(err);
            const roles = data.map(({ id, title}) => ({ name: title, value: id}));
            inquirer.prompt([ 
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is employee Role?',
                    choices: roles
                }
            ]).then(roleChoice => {
              const role = roleChoice.role;
              crit.push(role);
              const managerSql =  `SELECT * FROM employee`;
              connection.promise().query(managerSql, (error, data) => {
                if (error) throw error;
                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ]).then(managerChoice => {
                    const manager = managerChoice.manager;
                    crit.push(manager);
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
                    connection.query(sql,crit, (err) => {
                        if (err) throw (err);
                        console.log('added')
                        viewAllEmployee();
                    })
                })
            });
        });
    });
});
}





const removeEmployee = () => {}

const updateEmployee = () => {}

const updateManager = () => {}