const inquirer = require("inquirer");
const dbUtil = require("./util/db_util.js");
const util = require("./util/util.js");

function updateMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "Choose an operation.",
                type: 'list',
                choices: ["Update Employee Role", "Update Employee Manager"],
                name: "main"
            }])
        .then(function (res) {
            if (res.main === "Update Employee Role") {
                updateEmployeeRoleMenu(connection); 
            } else if (res.main === "Update Employee Manager"){
                updateEmployeeManagerMenu(connection);
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
        dbUtil.execSQL(connection, dbUtil.sqlStrs.updateEmployeeRole, param);
    })
    .finally(() => { 
        connection.end();
    });
}

module.exports = {
    updateMenu: updateMenu    
};


async function updateEmployeeManagerMenu(connection) { 
    // TODO: Add SQL. Get all employees. 
    var allEmployees = await util.getAllEmployees(connection);

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
            var empId = util.getIdFromRow(res.staff);
            var newManagerId = util.getIdFromRow(res.manager);
            var param = [newManagerId, empId];
            dbUtil.execSQL(connection, dbUtil.sqlStrs.updateEmployeeManager, param);
            console.log(`Updated ${res.staff}'s manager.`);
        })
        .catch(function (err){
            console.log("Error in UpdateEmployeeManager!", err);
        })
        .finally(function (err){
            connection.end();
        })
};
