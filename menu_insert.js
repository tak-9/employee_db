const inquirer = require("inquirer");
const util = require("./util/util.js");
const dbUtil = require("./util/db_util.js");

function insertMenu() { 
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
                insertDepartmentMenu(); 
            } else if (res.main === "Add Role") {
                insertRoleMenu(); 
            } else if (res.main === "Add Employee") {
                insertEmployeeMenu();
            }
        })
        .catch(function (err) { 
            console.log("Error in update menu!", err);
            dbUtil.endConnection();
        })
};


function insertDepartmentMenu() { 
    inquirer
        .prompt([
            {
                message: "What is the name of department?",
                type: 'input',
                name: "department",
                validate: util.checkMandatory
            }])
        .then(async function (res) {
            await dbUtil.execSQL(dbUtil.sqlStrs.insertDepartment, [res.department]);
            console.log("Added a new department ", res.department);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            dbUtil.endConnection();
        })
};

async function insertRoleMenu() { 
    var departments = await util.getAllDepartments();
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
            await dbUtil.execSQL(dbUtil.sqlStrs.insertRole, param)
            console.log("Added a new role ", res.title);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            dbUtil.endConnection();
        })
    }

async function insertEmployeeMenu() { 
    Promise.all([util.getAllRoles(), util.getAllEmployees()])
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
            await dbUtil.execSQL(dbUtil.sqlStrs.insertEmployee, param)
            console.log("Added a new employee ", res.first, res.last);
        })
        .catch(function (err){
            console.log("Error in addEmployee!", err);
        })
        .finally(function() { 
            dbUtil.endConnection();
        })
    })
};

module.exports = {
    insertMenu: insertMenu    
};
