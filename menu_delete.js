const inquirer = require("inquirer");
const dbDelete = require("./db_delete.js");
const util = require("./util.js");

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
                removeEmployee(connection);
            } else if (res.main === "Remove Department") {
                removeDepartment(connection);
            } else if (res.main === "Remove Role") {
                removeRole(connection);
            }
        })
        .catch(function (err) { 
            console.log("Error in delete menu!", err);
            connection.end();
        })
}

async function removeEmployee(connection) { 
    var menuItems = await util.getAllEmployees(connection);
    inquirer
        .prompt([
            {
                message: "Which employee do you want to remove?",
                type: 'list',
                choices: menuItems,
                name: 'chosen'
            }])
        .then(async(res)=>{
            var id = util.getIdFromRow(res.chosen);
            await dbDelete.deleteEmployee(connection, [id]);
            console.log(res.chosen, " was deleted.");
        })
        .catch((err)=>{
            console.log("Error in removeEmployee!", err);
        })
        .finally(()=>{
            connection.end();
        })
}

async function removeDepartment(connection) { 
    var menuItems = await util.getAllDepartments(connection);
    inquirer
        .prompt([
            {
                message: "Which department do you want to remove?",
                type: 'list',
                choices: menuItems,
                name: 'chosen'
            }])
        .then(async (res)=>{
            var id = util.getIdFromRow(res.chosen);
            await dbDelete.deleteDepartment(connection, [id]);
            console.log(res.chosen, " was deleted.");
        })
        .catch((err)=>{
            console.log("Error in removeDepartment!", err);
        })
        .finally(()=>{
            connection.end();
        })
}

async function removeRole(connection) { 
    var menuItems = await util.getAllRoles(connection);
    inquirer
        .prompt([
            {
                message: "Which role do you want to remove?",
                type: 'list',
                choices: menuItems,
                name: 'chosen'
            }])
        .then(async (res)=>{
            var id = util.getIdFromRow(res.chosen);
            await dbDelete.deleteRole(connection, [id]);
            console.log(res.chosen, " was deleted.");
        })
        .catch((err)=>{
            console.log("Error in removeRole!", err);
        })
        .finally(()=>{
            connection.end();
        })
}


module.exports = {
    deleteMenu: deleteMenu
};

