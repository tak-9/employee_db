const inquirer = require("inquirer");
const util = require("./util.js");
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
                removeAnyMenu(connection, emp);
            } else if (res.main === "Remove Department") {
                var department = new DepartmentOperations();
                removeAnyMenu(connection, department);
            } else if (res.main === "Remove Role") {
                var role = new RoleOperations();
                removeAnyMenu(connection, role);
            }
        })
        .catch(function (err) { 
            console.log("Error in delete menu!", err);
            connection.end();
        })
}

async function removeAnyMenu(connection, type) {
    var menuItems = await type.getMenuItemsForDelete(connection);
    inquirer
        .prompt([
            {
                message: type.getDeleteMessage(),
                type: 'list',
                choices: menuItems,
                name: 'chosen'
            }])
        .then(async(res)=>{
            var id = util.getIdFromRow(res.chosen);
            await type.execDelete(connection, [id]);
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
