require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { sqlViewDept, sqlViewRoles, sqlViewEmployees, sqlAddDept, sqlSelectDept, sqlAddRole, sqlAddEmployee, updateEmployeeRole } = require('./sql');

console.log('ahhhhhhhhhhhhhhhh');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(err => {
  if (err) throw err;
  console.log("tesssssssssting 111111111");
  console.log('Connected to the database.');
  startApp();
});

async function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRoleIN();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

function viewDepartments() {
  connection.query(sqlViewDept, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function viewRoles() {
  connection.query(sqlViewRoles, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function viewEmployees() {
  connection.query(sqlViewEmployees, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

function addDepartment() {
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:'
  }).then(answer => {
    connection.query(sqlAddDept, [answer.name], (err, result) => {
      console.log('Department added successfully.');
      if (err) throw err;
      console.log('second log');

      connection.query(sqlSelectDept, (err, rows) => {
        if (err) {
          console.error('Error executing SELECT query: ' + err.message);
          return;
        }
        console.log('Department data retrieved:');
        console.log(rows);
        startApp(); 
      });
    });
  });
}


function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:'
    }
  ]).then(answer => {
    connection.query(sqlAddRole, [answer.title, answer.salary, answer.department_id], (err, result) => {
      if (err) throw err;
      console.log('Role added successfully.');
      startApp();
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee:'
    }
  ]).then(answer => {
    connection.query(sqlAddEmployee, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id, answer.manager_id, answer.manager_id], (err, result) => {
      if (err) throw err;
      console.log('Employee added successfully.');
      startApp();
    });
  });
}

function updateEmployeeRoleIN() {
  connection.query(sqlViewEmployees, (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: results.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.employee_id }))
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: 'Enter the new role ID for the employee:'
      }
    ]).then(answer => {
      connection.query(updateEmployeeRole, [answer.new_role_id, answer.employee_id], (err, result) => {
        if (err) throw err;
        console.log('Employee role updated successfully.');
        startApp();
      });
    });
  });
}



























// const inquirer = require('inquirer');
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'your_password',
//   database: 'employee_tracker_db'
// });

// const {
//   sqlViewDept,
//   sqlViewRoles,
//   sqlViewEmployees,
//   sqlAddDept,
//   sqlAddRole,
//   sqlAddEmployee,
//   updateEmployeeRole
// } = require('./sql');

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Connected to the database.');
//   startApp();
// });

// function startApp() {
//   inquirer
//     .prompt({
//       type: 'list',
//       name: 'action',
//       message: 'What would you like to do?',
//       choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//         'Exit'
//       ]
//     })
//     .then(answer => {
//       switch (answer.action) {
//         case 'View all departments':
//           viewDepartments();
//           break;
//         case 'View all roles':
//           viewRoles();
//           break;
//         case 'View all employees':
//           viewEmployees();
//           break;
//         case 'Add a department':
//           addDepartment();
//           break;
//         case 'Add a role':
//           addRole();
//           break;
//         case 'Add an employee':
//           addEmployee();
//           break;
//         case 'Update an employee role':
//           updateEmployeeRole();
//           break;
//         case 'Exit':
//           connection.end();
//           break;
//       }
//     });
// }

// function viewDepartments() {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'title',
//       message: 'Enter the title of the role:'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter the salary for the role:'
//     },
//     {
//       type: 'input',
//       name: 'department_id',
//       message: 'Enter the department ID for the role:'
//     }
//   ])
//   .then(anser => {
//     connection.query(
//       'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
//       [answer.title, answer.salary, answer.department_id],
//       (err, result) => {
//         if (err) throw err;
//         console.log('Role added successfully.');
//         startApp();
//       }
//     )
//   })
// }

// function viewRoles() {
//   // Query to view all roles
// }

// function viewEmployees() {
//   // Query to view all employees
// }

// function addDepartment() {
//   // Prompt to add a department
// }

// function addRole() {
//   // Prompt to add a role
// }

// function addEmployee() {
//   // Prompt to add an employee
// }

// function updateEmployeeRole() {
//   // Prompt to update an employee role
// }