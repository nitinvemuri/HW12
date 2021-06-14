const inquirer = require("inquirer")
const express = require('express');
const connection = require('./lib/sqllogin');
const QueryString = require("qs");

connection.connect((error) => {
    if (error) throw error;
    promptUser();
  });


const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'select a prompt',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View Roles',
                'Add Role',
                'Add Employee',
                'Add Department',
                'Update Employee',
                'Quit'
                
            ],
            name: 'choice',
        }
    ]).then(answers => {
        switch (answers.choice) {
            case 'View All Employees':
                viewAllEmployee();
                break;

            case 'View All Employees by Department':
                viewAllDepartment();
                break;
            case 'View Roles':
                viewRoles();
                break;

            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Update Employee':
                updateEmployee();
                break;

            case 'Quit':
                quit();
                break;
        }
    })
};

const quit = () => {
    connection.end();
    console.log('bye')
}

function addRole() {
    inquirer.prompt ([ 
        {
            type: 'input',
            name: 'title',
            message: 'title?'

        },
        {
            type: 'number',
            name: 'salary',
            message: 'salary?'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Department id?'
        }
    ]).then(function(response) {
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.department_id], function(err,data) {
            console.table(data)
        })
        promptUser();
    })
}

function viewAllEmployee() {
    connection.query("SELECT * FROM worker", function (err, data) {
        console.table(data)
        promptUser();
    })
}
function viewAllDepartment() {
    connection.query("SELECT * FROM department", function (error, data) {
        console.log(data)
        promptUser();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (error, data) {
        console.log(data)
        promptUser();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: 'Department you want to add?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Department id?'
        }
    ]).then(function(response) {
        connection.query('INSERT INTO department (department_name, department_id) VALUES (?,?)', [response.title, response.id], function(err, data) {
            if (err) 
            throw err;
            console.table("Success");
            promptUser();
        })
    })
};


function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: 'First Name?'
        }, 
        {
            type: "input",
            name: "lastName",
            message: 'Last Name?'
        }, 
        {
            type: "number",
            name: 'role',
            message: 'role id?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'manager id?'
        }
    ]).then(function (response) {
        connection.query("INSERT INTO worker (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?);", [response.title, response.lastName, response.role ,response.manager], function (err, data) {
            console.table(data);
        })
        promptUser();
    })

}



function updateEmployee() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE worker SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        promptUser();
    })

}

