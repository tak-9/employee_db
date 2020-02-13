const inquirer = require("inquirer");
const dbUpdate = require("./db/db_update.js");
const util = require("./util.js");

function updateMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "Choose an operation.",
                type: 'list',
                choices: ["Update Employee Role"],
                name: "main"
            }])
        .then(function (res) {
            if (res.main === "Update Employee Role") {
                updateEmployeeRoleMenu(connection); 
            } 
        })
        .catch(function (err) { 
            console.log("Error in update menu!", err);
            connection.end();
        })
};


async function updateEmployeeRoleMenu(connection) {
    var rolesArray = await util.getAllRoles(connection);
    var employeesArray = await util.getAllEmployees(connection);
    // TODO: Consider using Promise.all instead.
    inquirer
    .prompt([
        {
            message: "Which employee do you want to update?",
            type: 'list',
            choices: employeesArray,
            name: "employeeNameWithID"
        },{
            message: "What is the new role?",
            type: 'list',
            choices: rolesArray,
            name: "roleWithID"
        }])
    .then((res) => {
        var empId = util.getIdFromRow(res.employeeNameWithID);
        var roleId = util.getIdFromRow(res.roleWithID);
        let param = [roleId, empId];
        //console.log(`empId: ${empId} roleId: ${roleId}`);
        dbUpdate.updateEmployeeRole(connection, param);
    })
    .finally(() => { 
        connection.end();
    });
}

module.exports = {
    updateMenu: updateMenu    
};


/*
function UpdateEmployeeManager() { 
    // TODO: Add SQL. Get all employees. 
    var allEmployees = [];

    inquirer
        .prompt([
            {
                message: "Which employee's manager do you want to update?",
                type: 'list',
                choices: allEmployees,
                name: "staff"
            }, { 
                message: "Which employee do you want to set as manager for the selected employee?",
                type: 'list', 
                choices: allEmployees,
                name: "manager"
            }])
        .then(function (res) {
            console.log(res.staff, res.manager);
            // TODO: Add SQL. Update employee's manager.
            console.log("Updated employee's manager.");
            mainMenu();
        })
        .catch(function (err){
            console.log("Error in UpdateEmployeeManager!", err);
        })
};

function updateEmployeeRole() {
    console.log("Update Employee Role");
    // TODO: Add SQL. Get all employees. 
    var allEmployees = [];
    // TODO: Add SQL. Get all Roles. 
    var allRoles = [];

    inquirer
        .prompt([
            {
                message: "Which employee's role do you want to update?",
                type: 'list',
                choices: allEmployees,
                name: "employee"
            }, { 
                message: "Which is the employee's new role?",
                type: 'list', 
                choices: allRoles,
                name: "role"
            }])
        .then(function (res) {
            console.log(res.employee, res.role);
            // TODO: Add SQL. Update employee's manager.
            mainMenu();
        })
        .catch(function (err){
            console.log("Error in updateEmployeeRole!", err);
        })
}
*/
