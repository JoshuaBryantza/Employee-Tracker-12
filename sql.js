const sqlViewDept =
    `SELECT * FROM department`;

const sqlViewRoles =
    `SELECT title, role.id as role_id, salary, department.name as department
FROM role
LEFT JOIN department ON role.department_id = department.id;`

const sqlViewEmployees =
    `SELECT employee.id as employee_id, employee.first_name, employee.last_name, role.title as job_title, department.name as department, role.salary, manager.manager_first_name
FROM employee
JOIN role ON role.id = employee.role_id
JOIN department ON role.department_id = department.id
LEFT OUTER JOIN (SELECT employee.id as manager_id, employee.first_name as manager_first_name, employee.last_name as manager_last_name FROM employee) manager ON employee.manager_id = manager.manager_id;`


const sqlAddDept = `INSERT INTO department (name) VALUES (?)`;
const sqlSelectDept = `SELECT * FROM department`;


// Prepare statement to account for user data  
const sqlAddRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;

// Prepare statement to account for user data  
// const sqlAddEmployee = `
// INSERT INTO employee (first_name, last_name, role_id, manager_id)
// VALUES (?, ?, ?, ?)`;

const sqlAddEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, CASE WHEN ? IS NULL OR ? = '' THEN NULL ELSE ? END )`;

// const sqlAddEmployee =
//     `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//     SELECT ?, ?, role.id, employee.id
//     FROM role, employee
//     WHERE role.id = ? 
//     AND employee.id = ?`

// Prepare statement to account for user data  
const updateEmployeeRole =
    `UPDATE employee
    SET role_id = (SELECT role.id FROM role WHERE role.id = ?)
    WHERE id = ?;`


module.exports = { sqlViewDept, sqlViewRoles, sqlViewEmployees, sqlAddDept, sqlSelectDept, sqlAddRole, sqlAddEmployee, updateEmployeeRole }

