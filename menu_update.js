const inquirer = require("inquirer");
const dbUtil = require("./util/db_util.js");
const util = require("./util/util.js");

function updateMenu() { 
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
                updateEmployeeRoleMenu(); 
            } else if (res.main === "Update Employee Manager"){
                updateEmployeeManagerMenu();
            }
        })
        .catch(function (err) { 
            console.log("Error in update menu!", err);
            dbUtil.endConnection();
        })
};


async function updateEmployeeRoleMenu() {
    Promise.all([util.getAllRoles(), util.getAllEmployees()])
    .then((results)=>{
        var rolesArray = results[0];
        var employeesArray = results[1];
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
            dbUtil.execSQL(dbUtil.sqlStrs.updateEmployeeRole, param);
            console.log(`Updated ${res.employeeNameWithID}'s role.`);
        })
        .finally(() => { 
            dbUtil.endConnection();
        });
    })
}

module.exports = {
    updateMenu: updateMenu    
};


async function updateEmployeeManagerMenu() { 
    var allEmployees = await util.getAllEmployees();

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
            dbUtil.execSQL(dbUtil.sqlStrs.updateEmployeeManager, param);
            console.log(`Updated ${res.staff}'s manager.`);
        })
        .catch(function (err){
            console.log("Error in UpdateEmployeeManager!", err);
        })
        .finally(function (err){
            dbUtil.endConnection();
        })
};
