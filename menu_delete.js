const inquirer = require("inquirer");
const util = require("./util/util.js");
const dbUtil = require("./util/db_util.js");
const EmployeeOperations = require("./util/EmployeeOperations.js");
const RoleOperations = require("./util/RoleOperations.js");
const DepartmentOperations = require("./util/DepartmentOperations.js");

function deleteMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "Choose view.",
                type: 'list',
                choices: ["Remove Employee",
                        "Remove Department",
                        "Remove Role"],
                name: "main"
            }])
        .then(async function (res) {
            if (res.main === "Remove Employee") {
                var emp = new EmployeeOperations();
                removeAnyMenu(connection, "employee");
            } else if (res.main === "Remove Department") {
                var department = new DepartmentOperations();
                removeAnyMenu(connection, "department");
            } else if (res.main === "Remove Role") {
                var role = new RoleOperations();
                removeAnyMenu(connection, "role");
            }
        })
        .catch(function (err) { 
            console.log("Error in delete menu!", err);
            connection.end();
        })
}


async function removeAnyMenu(connection, typeStr) {
    // These are functions to get all the employees, departments or roles for diplaying in menu. 
    var getMenuItemsForDelete = { 
        department: util.getAllDepartments,
        employee: util.getAllRoles,
        role: util.getAllRoles
    }
    var deleteMessages = {
        department: "Which department do you want to remove?",
        employee: "Which employee do you want to remove?",
        role: "Which role do you want to remove?"
    }
    // These are different SQL statement for Employee, Department or Role
    var deleteSqls = {
        department: dbUtil.sqlStrs.deleteDepartment,
        employee:  dbUtil.sqlStrs.deleteEmployee, 
        role: dbUtil.sqlStrs.deleteRole
    }
    
    // This gets all employees, departments or roles. 
    var func = getMenuItemsForDelete[typeStr];
    var menuItems = await func(connection);
    inquirer
        .prompt([
            {
                message: deleteMessages[typeStr],
                type: 'list',
                choices: menuItems,
                name: 'chosen'
            }])
        .then(async(res)=>{
            var id = util.getIdFromRow(res.chosen);
            sqlStr = deleteSqls[typeStr];
            await dbUtil.execSQL(connection, sqlStr, [id]);        
            console.log(res.chosen, " was deleted.");
        })
        .catch((err)=>{
            console.log("Error in removeAny!", err);
        })
        .finally(()=>{
            connection.end();
        })
}

module.exports = {
    deleteMenu: deleteMenu
};
