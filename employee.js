const inquirer = require("inquirer");
const mysql = require("mysql");
const viewMenu = require("./menu_view.js");
const updateMenu = require("./menu_update.js");
const deleteMenu = require("./menu_delete.js");
const insertMenu = require("./menu_insert.js");
const util = require("./util/util.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emp_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    util.displayBanner();
    mainMenu();
});

function mainMenu() { 
    inquirer
        .prompt([
            {
                message: "Choose an operation type.",
                type: 'list',
                choices: ["View", "Add", "Update", "Delete"],
                name: "main"
            }])
        .then((res) => {
            if (res.main === "View") {
                viewMenu.viewMenu(connection);
            } else if (res.main === "Add") {
                insertMenu.insertMenu(connection);
            } else if (res.main === "Update") {
                updateMenu.updateMenu(connection);
            } else if (res.main === "Delete") { 
                deleteMenu.deleteMenu(connection);
            } 
        })
        .catch(function (err) { 
            console.log("Error in main menu!", err);
        })
}
