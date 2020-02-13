const inquirer = require("inquirer");
const dbSelect = require("./db/db_select.js");

function viewMenu(connection) { 
    inquirer
        .prompt([
            {
                message: "Choose view.",
                type: 'list',
                choices: ["View All Employees By Department",
                        //"View All Employees By Manager",
                        "View All Departments",
                        "View All Roles"],
                name: "main"
            }])
        .then(async function (res) {
            let dbResult;
            if (res.main === "View All Employees By Department") {
                dbResult = await dbSelect.selectEmployeesByDepartment(connection);
                console.table(dbResult);
            } else if (res.main === "View All Employees By Manager") {
                dbResult = await dbSelect.selectEmployeesByManager(connection);
                console.table(dbResult);
            } else if (res.main === "View All Departments") { 
                dbResult = await dbSelect.selectDepartments(connection);
                console.table(dbResult);
            } else if (res.main === "View All Roles"){
                dbResult = await dbSelect.selectRoles(connection);
                console.table(dbResult);
            } 
        })
        .catch(function (err) { 
            console.log("Error in main menu!", err);
        })
        .finally(function() { 
            connection.end();
        });
}

module.exports = {
    viewMenu: viewMenu    
};
