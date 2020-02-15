const inquirer = require("inquirer");
const viewMenu = require("./menu_view.js");
const updateMenu = require("./menu_update.js");
const deleteMenu = require("./menu_delete.js");
const insertMenu = require("./menu_insert.js");
const util = require("./util/util.js");
const dbUtil = require("./util/db_util.js");

main();

function main(){
    dbUtil.setupConnection()
    .then(()=>{
        util.displayBanner();
        mainMenu();
    })
    .catch((err)=>{
        console.log("Database setup error!",err);
    })
}

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
                viewMenu.viewMenu();
            } else if (res.main === "Add") {
                insertMenu.insertMenu();
            } else if (res.main === "Update") {
                updateMenu.updateMenu();
            } else if (res.main === "Delete") { 
                deleteMenu.deleteMenu();
            } 
        })
        .catch(function (err) { 
            console.log("Error in main menu!", err);
        })
}
