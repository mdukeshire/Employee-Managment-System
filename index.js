const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user:process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_HOST,
      port: 3306
    },
    console.log(`company_db connected`)
);

db.connect(err => {
    if(err) throw err;
    console.log('connected');
    menu()
})

function menu() {
inquirer
    .prompt([
        {
            name: 'init',
            type: 'list',
            message: 'Choose one',
            choices: ['Add Employee', 'View All Employees', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
    .then((answers) => {
        if(answers.init === 'Add Employee') {
            addEmployee();
        }else if (answers.init === 'View All Departments') {
            viewDept();
        }else if(answers.init === 'Add Department') {
            addDept();
        }else if (answers.init === 'Add Role') {
            addRole();
        }else if(answers.init === 'View All Employees') {
            viewEmplyees();
        }else if(answers.init === 'View All Roles') {
            viewRoles();
        }else {
            finish();
        }
    })
}

function addEmployee() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter first name?',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter last name?',    
    },
    {
        type: 'input',
        name: 'role',
        message: 'Enter role?',  
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Enter manager name?', 
    },
    ])
    .then((answers) => {
        // console.log(answers);
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.role}', '${answers.manager}');`;
        db.promise().query(query).then(function(err, res){
            if(err){
                // console.error(err);
            }
            // console.log(res);
            console.log('Employee Added');
            menu();
        });

    });
}

function viewDept() {
    db.query('SELECT * FROM department', (err, data) => {
          if(err) throw err;
          console.table(data);
          menu();
    })
 }
 
 function addDept() {
     inquirer.prompt({
         type: 'input',
         name: 'newDept',
         message: 'Add new department',
     })
     .then((answers) => {
         let query = `INSERT INTO department (name) VALUES ('${answers.newDept}')`;
         db.promise().query(query).then(function(err, res){
            if(err){
                // console.error(err);
            }
            // console.log(res);
            console.log('Department Added');
            menu();
        });
     }) 
 }
 
 function addRole() {
     inquirer.prompt([
     {
         type: 'input',
         name: 'newRole',
         message: 'Add new Role',
     },
     {
         type: 'input',
         name: 'salary',
         message: 'Add salary for role?',
     },
     {
         type: 'input',
         name: 'department',
         message: 'What department is role in?',
     },
     ])
     .then((answers) => {
         let query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.newRole}', ${answers.salary}, ${answers.department})`;
         db.promise().query(query).then(function(err, res){
            if(err){
            }
            console.log('Role Added');
            menu();
        });
     }) 
 }
 
 function viewEmplyees() {
     db.query('SELECT * FROM employee', (err, data) => {
         if(err) throw err;
         console.table(data);
         menu();
   })
 }

 function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if(err) throw err;
        console.table(data);
        menu();
  })
 }
 
 function finish() {
    console.log('Success!')
 }