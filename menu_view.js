const inquirer = require("inquirer");
const dbUtil = require("./util/db_util.js");

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
                dbResult = await dbUtil.execSQL(connection, dbUtil.sqlStrs.selectEmployeesByDepartment);
                console.table(dbResult);
            } else if (res.main === "View All Employees By Manager") {
                dbResult = await dbUtil.execSQL(connection, dbUtil.sqlStrs.selectEmployeesByManager);
                console.table(dbResult);
            } else if (res.main === "View All Departments") { 
                dbResult = await dbUtil.execSQL(connection, dbUtil.sqlStrs.selectDepartments);
                console.table(dbResult);
            } else if (res.main === "View All Roles"){
                dbResult = await dbUtil.execSQL(connection, dbUtil.sqlStrs.selectRoles);
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
