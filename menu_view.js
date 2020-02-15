const inquirer = require("inquirer");
const dbUtil = require("./util/db_util.js");

function viewMenu() { 
    inquirer
        .prompt([
            {
                message: "Choose view.",
                type: 'list',
                choices: ["View All Employees By Department",
                        "View All Employees By Manager",
                        "View All Departments",
                        "View All Roles",
                        "View the total utilized budget of a department"
                    ],
                name: "main"
            }])
        .then(async function (res) {
            let dbResult;
            if (res.main === "View All Employees By Department") {
                dbResult = await dbUtil.execSQL(dbUtil.sqlStrs.selectEmployeesByDepartment);
                console.table(dbResult);
            } else if (res.main === "View All Employees By Manager") {
                dbResult = await dbUtil.execSQL(dbUtil.sqlStrs.selectEmployeesByManager);
                console.table(dbResult);
            } else if (res.main === "View All Departments") { 
                dbResult = await dbUtil.execSQL(dbUtil.sqlStrs.selectDepartments);
                console.table(dbResult);
            } else if (res.main === "View All Roles"){
                dbResult = await dbUtil.execSQL(dbUtil.sqlStrs.selectRoles);
                console.table(dbResult);
            } else if (res.main === "View the total utilized budget of a department") {
                dbResult = await dbUtil.execSQL(dbUtil.sqlStrs.selectSumSalaryOfDepartment);
                console.table(dbResult);
            } 
        })
        .catch(function (err) { 
            console.log("Error in main menu!", err);
        })
        .finally(function() { 
            dbUtil.endConnection();
        });
}

module.exports = {
    viewMenu: viewMenu    
};
