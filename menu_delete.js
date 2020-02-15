const inquirer = require("inquirer");
const util = require("./util/util.js");
const dbUtil = require("./util/db_util.js");

function deleteMenu() { 
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
                removeAnyTypeMenu("employee");
            } else if (res.main === "Remove Department") {
                removeAnyTypeMenu("department");
            } else if (res.main === "Remove Role") {
                removeAnyTypeMenu("role");
            }
        })
        .catch(function (err) { 
            console.log("Error in delete menu!", err);
            dbUtil.endConnection();
        })
}


async function removeAnyTypeMenu(typeStr) {
    // These are functions to get all the employees, departments or roles for diplaying in menu. 
    var getMenuItemsForDelete = { 
        department: util.getAllDepartments,
        employee: util.getAllEmployees,
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
    var menuItems = await func();
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
            await dbUtil.execSQL(sqlStr, [id]);        
            console.log(res.chosen, " was deleted.");
        })
        .catch((err)=>{
            console.log("Error in removeAny!", err);
        })
        .finally(()=>{
            dbUtil.endConnection();
        })
}

module.exports = {
    deleteMenu: deleteMenu
};
