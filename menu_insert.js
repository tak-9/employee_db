const inquirer = require("inquirer");
const util = require("./util/util.js");
const dbUtil = require("./util/db_util.js");

function insertMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "Choose an operation.",
                type: 'list',
                choices: ["Add Department", "Add Role", "Add Employee"],
                name: "main"
            }])
        .then(function (res) {
            if (res.main === "Add Department") {
                insertDepartmentMenu(connection); 
            } else if (res.main === "Add Role") {
                insertRoleMenu(connection); 
            } else if (res.main === "Add Employee") {
                insertEmployeeMenu(connection);
            }
        })
        .catch(function (err) { 
            console.log("Error in update menu!", err);
            connection.end();
        })
};


function insertDepartmentMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "What is the name of department?",
                type: 'input',
                name: "department",
                validate: util.checkMandatory
            }])
        .then(async function (res) {
            await dbUtil.execSQL(connection, dbUtil.sqlStrs.insertDepartment, [res.department]);
            console.log("Added a new department ", res.department);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            connection.end();
        })
};

async function insertRoleMenu(connection) { 
    var departments = await util.getAllDepartments(connection);
    inquirer
        .prompt([
            {
                message: "What is the title of role?",
                type: 'input',
                name: "title",
                validate: util.checkMandatory
            }, { 
                message: "What is the salary?",
                type: 'input',
                name: "salary",
                validate: util.checkNumber
            }, {
                message: "Which department?",
                type: 'list',
                choices: departments,
                name: "department"
            }])
        .then(async function (res) {
            var deptId = util.getIdFromRow(res.department);
            var param = [res.title, res.salary, deptId];
            await dbUtil.execSQL(connection, dbUtil.sqlStrs.insertRole, param)
            console.log("Added a new role ", res.title);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            connection.end();
        })
    }

async function insertEmployeeMenu(connection) { 
    Promise.all([util.getAllRoles(connection), util.getAllEmployees(connection)])
    .then((results) => {
        var roles = results[0];
        var employees = results[1];
        inquirer
        .prompt([
            {
                message: "What is the employee's first name?",
                type: 'input',
                name: "first",
                validate: util.checkMandatory
            }, { 
                message: "What is the employee's last name?",
                type: 'input',
                name: "last",
                validate: util.checkMandatory
            }, {
                message: "What is the employee's role?",
                type: 'list',
                choices: roles,
                name: "role"
            }, {
                message: "Who is the employee's manager?",
                type: 'list',
                choices: employees,
                name: "manager"
            }])
        .then(async function (res) {
            var roleId = util.getIdFromRow(res.role);
            var managerId = util.getIdFromRow(res.manager);
            var param = [res.first, res.last, roleId, managerId];
            await dbUtil.execSQL(connection, dbUtil.sqlStrs.insertEmployee, param)
            console.log("Added a new employee ", res.first, res.last);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            connection.end();
        })
    })
};

module.exports = {
    insertMenu: insertMenu    
};
