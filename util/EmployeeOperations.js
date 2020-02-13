const Operations = require("./Operations");
const util = require("../util.js");
const dbDelete = require("../db_delete");

class EmployeeOperatins extends Operations {

    getDeleteMessage(){
        return "Which employee do you want to remove?";
    }

    getMenuItemsForDelete(connection){
        return new Promise((resolve, reject) => {
            util.getAllEmployees(connection)
            .then((res)=>{
                resolve(res);    
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }

    execDelete(connection, id) {
        return new Promise((resolve, reject) => {
            dbDelete.deleteEmployee(connection, [id])
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });    
        })
    }
}

module.exports = EmployeeOperatins;
